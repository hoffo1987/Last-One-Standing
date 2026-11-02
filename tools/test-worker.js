// Verifica con un vero thread Node che il sorgente usato dal browser dia lo stesso risultato.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const { Worker } = require('node:worker_threads');
const src = path.join(__dirname, '..', 'src');
const engine = ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine.js'].map(f => fs.readFileSync(path.join(src, f), 'utf8')).join('\n;\n');
const main = vm.createContext({}); vm.runInContext(engine, main);
const moduleCode = fs.readFileSync(path.join(src, 'simulator.js'), 'utf8');
function context(withWorker) {
  const urls = new Map(); let serial = 0;
  class BrowserWorker {
    constructor(url) {
      this.ready = urls.get(url).text().then(source => {
        if (this.stopped) return;
        this.thread = new Worker("const {parentPort}=require('node:worker_threads');globalThis.self=globalThis;self.postMessage=x=>parentPort.postMessage(x);parentPort.on('message',data=>self.onmessage({data}));\n" + source, { eval: true });
        this.thread.on('message', data => this.onmessage?.({ data })); this.thread.on('error', error => this.onerror?.(error));
      });
    }
    postMessage(data) { this.ready.then(() => { if (!this.stopped) this.thread.postMessage(data); }); }
    terminate() { this.stopped = true; if (this.thread) this.thread.terminate(); }
  }
  const c = { LOS: main.LOS, structuredClone, setTimeout, Blob,
    URL: { createObjectURL: b => { const id = 'blob:' + ++serial; urls.set(id, b); return id; }, revokeObjectURL: id => urls.delete(id) },
    document: { getElementById: () => ({ textContent: engine }) }, Worker: withWorker ? BrowserWorker : null };
  vm.createContext(c); vm.runInContext(moduleCode, c); return c.LOS_SIMULATOR;
}
(async () => {
  const worker = context(true);
  try {
    for (const theme of main.LOS_DATA.themes) {
      const cfg = { cast: main.LOS.randomCast(12, 'worker', 2), theme: theme.id, seed: 'worker', maxDays: 10, adult: true };
      const expected = JSON.parse(JSON.stringify(main.LOS.simulate(cfg)));
      assert.deepEqual(JSON.parse(JSON.stringify(await worker.simulate(cfg))), expected, theme.id);
    }
    console.log('OK: risultati del worker identici al motore principale in tutte le nove arene');
    await assert.rejects(worker.simulate({ cast: [] }), /almeno 2/);
    const cfg = { cast: main.LOS.randomCast(200, 'cancel', 2), theme: 'classico', seed: 'cancel' };
    const pending = worker.simulate(cfg); worker.cancel(); await assert.rejects(pending, e => e.name === 'AbortError');
    console.log('OK: errori e annullamento non lasciano richieste pendenti');
    const small = { ...cfg, cast: cfg.cast.slice(0, 4) };
    assert.ok((await worker.simulate(small)).winners.length, 'dopo l’annullamento si può ripartire');
    const fallback = context(false), copy = structuredClone(small), expected = JSON.parse(JSON.stringify(main.LOS.simulate(copy)));
    const saved = fallback.simulate(small); small.cast[0].name = 'Cambiato dopo l’avvio';
    assert.deepEqual(JSON.parse(JSON.stringify(await saved)), expected);
    console.log('OK: ripiego senza Worker e configurazione acquisita prima dell’attesa');
  } finally { worker.cancel(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
