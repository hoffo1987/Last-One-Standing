// La classifica deve essere dichiarata salvata soltanto dopo una scrittura riuscita.
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const ui = fs.readFileSync(path.join(__dirname, '../src/ui.js'), 'utf8');
const code = ui.slice(ui.indexOf('  function storeState('), ui.indexOf('  function persistRun('));
function fixture() {
  let fail = false, value = 'salvataggio precedente', serial = 0;
  const pending = new Map(), c = { S: { cast: [{ id: 'a', img: 'foto' }], seasons: [{ id: 's1' }], settings: { seed: 'originale' }, run: { cfg: { cast: [{ id: 'a', img: 'foto' }] } } },
    KEY: 'stato', saveTimer: null, warnedQuota: false, messages: [], toast: message => c.messages.push(message),
    localStorage: { setItem(_key, next) { if (fail) throw new Error('quota'); value = next; } },
    setTimeout(fn) { pending.set(++serial, fn); return serial; }, clearTimeout(id) { pending.delete(id); } };
  vm.createContext(c); vm.runInContext(code, c);
  return { c, setFail: flag => { fail = flag; }, value: () => value, flush: () => { for (const [id, fn] of pending) { pending.delete(id); fn(); } } };
}
const f = fixture(), original = JSON.stringify(f.c.S);
f.setFail(true); assert.equal(f.c.commitSeasons([{ id: 's2' }]), false);
assert.equal(JSON.stringify(f.c.S), original); assert.equal(f.value(), 'salvataggio precedente');
assert.match(f.c.messages[0], /non sono state salvate/);
f.setFail(false); assert.equal(f.c.commitSeasons([{ id: 's2' }]), true);
assert.equal(f.c.S.seasons[0].id, 's2'); assert.equal(JSON.parse(f.value()).seasons[0].id, 's2');
assert.equal(JSON.parse(f.value()).run.cfg.cast[0].img, '@cast'); assert.equal(f.c.S.run.cfg.cast[0].img, 'foto');
f.c.save(); f.c.commitSeasons([{ id: 's3' }]); f.flush(); assert.equal(JSON.parse(f.value()).seasons[0].id, 's3');
console.log('OK: quota esaurita conserva lo stato, una scrittura riuscita aggiorna la stagione e i timer non la sovrascrivono.');
