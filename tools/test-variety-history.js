// Scelte variate, ripieghi con pochi candidati e memoria storica completa.
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const src = path.join(__dirname, '..', 'src'), engine = fs.readFileSync(path.join(src, 'engine.js'), 'utf8');
function extract(start, end) { const a = engine.indexOf(start), b = engine.indexOf(end, a); assert.ok(a >= 0 && b > a); return engine.slice(a, b); }
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('OK: ' + name); }
test('copie dello stesso modello condividono frequenza e intervallo di esclusione', () => {
  const c = vm.createContext({}); vm.runInContext(fs.readFileSync(path.join(src, 'engine-systems.js'), 'utf8'), c); c.eventVariety = c.LOS_SYSTEMS.eventVariety;
  const usage = c.eventVariety(), a = { text: '{A} riposa.' }, duplicate = { text: '  {A}  RIPOSA. ' }, other = { text: '{A} legge.' };
  assert.equal(usage.weight(a), 1); usage.record(a);
  assert.equal(usage.recent(duplicate), true); assert.ok(usage.weight(duplicate) < usage.weight(other));
  for (let i = 0; i < 8; i++) usage.record({ text: '{A} conta ' + i + '.' });
  assert.equal(usage.recent(a), false); assert.ok(usage.weight(a) < 1);
  assert.equal(c.eventVariety().weight(a), 1, 'le partite non condividono le frequenze');
});
test('otto ricordi recenti non cancellano fatti o pagine precedenti', () => {
  const c = { phases: [], day: 1, BD: { memfx: {} }, tweak() {} };
  vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(src, 'engine-systems.js'), 'utf8'), c); Object.assign(c, c.LOS_SYSTEMS.createMemory({ ...c, getDay: () => c.day }));
  const a = { id: 'a', mem: {}, memoryHistory: {}, diary: [] }, b = { id: 'b' };
  c.remember(a, b, 'love');
  for (let i = 0; i < 100; i++) { c.phases.push({}); c.remember(a, b, 'shared'); c.remember1(a, '<b>Pagina ' + i + '</b>', 'pensiero'); }
  assert.equal(a.mem.b.length, 8); assert.equal(a.memoryHistory.b.length, 101);
  assert.equal(a.memoryHistory.b[0].k, 'love'); assert.equal(a.memoryHistory.b[0].ph, 0);
  assert.equal(a.diary.length, 100); assert.match(a.diary[0].h, /Pagina 0/);
  c.remember(a, b, 'shared'); assert.equal(a.memoryHistory.b.length, 101, 'lo stesso ricordo nella stessa fase non va duplicato');
});
test('il contesto descrive i requisiti presenti prima dell’evento senza aggiungere motivi', () => {
  const c = { byId: { c: { name: 'Carla' } }, MIND: { goals: {} }, M: null, theme: { soft: true } };
  vm.createContext(c); vm.runInContext(extract('    function eventReason(', '    function apply('), c);
  const a = { name: 'Ada', hp: 18, grudges: { b: { victim: 'c' } } }, b = { id: 'b', name: 'Bruno' };
  const reason = c.eventReason({ req: [{ t: 'stat', r: [0], k: 'hp' }] }, [a, b]);
  a.hp = 100; assert.match(reason, /reputazione 18\/100/);
  assert.match(c.eventReason({ req: [{ t: 'grudge', r: [0, 1] }] }, [a, b]), /Ada.*Bruno.*Carla/);
  assert.equal(c.eventReason({ req: [] }, [a, b]), '');
});
const c = vm.createContext({});
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine-systems.js', 'engine.js']) vm.runInContext(fs.readFileSync(path.join(src, f), 'utf8'), c, { filename: f });
test('anche un catalogo con un solo modello idoneo permette di terminare la partita', () => {
  const D = c.LOS_DATA, ordinary = D.themes[0];
  D.themes = [{ ...ordinary, id: 'audit', soft: true, pool: { b: '1 | {A} aspetta.', d: '1 | {A} aspetta.', n: '1 | {A} aspetta.', fallback: '1 | {A} aspetta.', finale: '2 k:A>B | {A} elimina {B}.' }, disasters: [], extra: {} }];
  D.packs = []; D.more = {}; D.coreExtra = {};
  const cfg = { cast: c.LOS.randomCast(8, 'poco-catalogo', 1), theme: 'audit', seed: 'poco-catalogo', maxDays: 3 };
  const result = c.LOS.simulate(cfg);
  assert.equal(result.winners.length, 1); assert.deepEqual(c.LOS.simulate(cfg), result);
});
console.log('\nOK: ' + passed + ' gruppi di regressioni di varietà e memoria');
