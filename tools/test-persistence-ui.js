// Ripresa della partita attraverso le funzioni effettive dell'interfaccia.
// node tools/test-persistence-ui.js
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const ui = fs.readFileSync(path.join(__dirname, '..', 'src/ui.js'), 'utf8');
function part(start, end) {
  const a = ui.indexOf(start), b = ui.indexOf(end, a);
  assert.ok(a >= 0 && b > a, 'Funzione non trovata: ' + start);
  return ui.slice(a, b);
}
const definitions = part('  function persistRun(', '  function load(') + part('  async function restoreRun(', '  async function boot(');
const result = () => ({ theme: 'classico', tributes: [{ id: 'a', name: 'Ada' }, { id: 'b', name: 'Bruno' }], phases: [{ title: 'Evento originale' }] });
function fixture() {
  const original = result();
  const c = {
    S: { run: { cfg: { seed: 'originale' }, phase: 3, seen: 5, replayId: 'r-originale' }, cast: ['cast conservato'], settings: { theme: 'classico' } },
    SIM: null, BY: {}, runGeneration: 0, RUNNER: null, THEMES: { classico: {} },
    own: (o, k) => Object.prototype.hasOwnProperty.call(o, k), load: { warning: '' }, saves: 0, simulations: 0, stored: [], messages: [],
    save: () => c.saves++, toast: (s) => c.messages.push(s),
    REPLAY: { createId: () => 'r-nuovo', load: async () => structuredClone(original), save: async (id, value) => { c.stored.push({ id, value }); } },
    L: { simulate: () => { c.simulations++; return structuredClone(original); } },
  };
  vm.createContext(c); vm.runInContext(definitions, c); return c;
}
let passed = 0;
async function test(name, run) { await run(); passed++; console.log('  OK ' + name); }
(async () => {
  await test('Una partita salvata riprende testo, fase e cast senza eseguire il motore', async () => {
    const c = fixture(); c.L.simulate = () => { throw new Error('Motore aggiornato: non deve essere usato'); };
    assert.equal(await c.restoreRun(), true);
    assert.deepEqual(c.SIM, result()); assert.equal(c.BY.a.name, 'Ada');
    assert.equal(c.S.run.phase, 3); assert.equal(c.S.run.seen, 5); assert.equal(c.S.run.replaySaved, true);
    assert.equal(c.stored.length, 0); assert.equal(c.load.warning, '');
  });
  await test('La configurazione legacy viene ricostruita una volta, con avviso e salvataggio', async () => {
    const c = fixture(); delete c.S.run.replayId;
    await c.restoreRun();
    assert.equal(c.simulations, 1); assert.equal(c.stored.length, 1); assert.equal(c.S.run.replayId, 'r-nuovo');
    assert.equal(c.S.run.replaySaved, true); assert.match(c.load.warning, /ricostruita/);
    await c.restoreRun(); assert.equal(c.simulations, 1); assert.equal(c.stored.length, 1);
  });
  for (const failure of ['mancante', 'lettura negata', 'arena sconosciuta']) {
    await test('Replay ' + failure + ': nessuna nuova storia e configurazione conservata', async () => {
      const c = fixture(), cast = c.S.cast, settings = c.S.settings;
      c.REPLAY.load = async () => { if (failure === 'lettura negata') throw new Error('SecurityError'); return failure === 'mancante' ? null : { ...result(), theme: 'sconosciuta' }; };
      await c.restoreRun();
      assert.equal(c.simulations, 0); assert.equal(c.SIM, null); assert.equal(c.S.run, null);
      assert.equal(c.S.cast, cast); assert.equal(c.S.settings, settings); assert.match(c.load.warning, /non è disponibile/);
    });
  }
  await test('Un ripristino lento non sovrascrive una partita avviata nel frattempo', async () => {
    const c = fixture(); let resolve;
    c.REPLAY.load = () => new Promise((done) => { resolve = done; });
    const pending = c.restoreRun(), newer = { cfg: { seed: 'nuovo' } }, nextResult = result();
    c.runGeneration++; c.S.run = newer; c.SIM = nextResult;
    resolve(result()); assert.equal(await pending, false);
    assert.equal(c.S.run, newer); assert.equal(c.SIM, nextResult); assert.equal(c.stored.length, 0);
  });
  await test('Un errore tardivo di lettura non cancella una partita più recente', async () => {
    const c = fixture(); let reject;
    c.REPLAY.load = () => new Promise((_, fail) => { reject = fail; });
    const pending = c.restoreRun(), newer = { cfg: { seed: 'nuovo' } };
    c.runGeneration++; c.S.run = newer; c.SIM = result();
    reject(new Error('Errore tardivo')); assert.equal(await pending, false);
    assert.equal(c.S.run, newer); assert.ok(c.SIM); assert.equal(c.load.warning, '');
  });
  await test('Un salvataggio fallito viene segnalato e non dichiarato riuscito', async () => {
    const c = fixture(); c.REPLAY.save = async () => { throw new Error('QuotaExceededError'); };
    assert.equal(await c.persistRun(c.S.run, result()), false);
    assert.equal(c.S.run.replaySaved, false); assert.equal(c.saves, 0); assert.match(c.messages[0], /non è stata salvata/);
  });
  await test('Il completamento di un vecchio salvataggio non modifica il nuovo riferimento', async () => {
    const c = fixture(); let resolve;
    c.REPLAY.save = () => new Promise((done) => { resolve = done; });
    const old = c.S.run, pending = c.persistRun(old, result());
    c.S.run = { cfg: { seed: 'nuovo' }, replayId: 'r-altro', replaySaved: false };
    resolve(); assert.equal(await pending, true);
    assert.equal(c.saves, 0); assert.equal(c.S.run.replayId, 'r-altro'); assert.equal(c.S.run.replaySaved, false);
  });
  console.log('\nOK: ' + passed + ' gruppi di regressioni della ripresa nell’interfaccia');
})().catch((e) => { console.error(e); process.exitCode = 1; });
