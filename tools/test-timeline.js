// Regressioni temporali dell'interfaccia: nessun dato futuro nella diretta.
// node tools/test-timeline.js
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const ui = fs.readFileSync(path.join(__dirname, '..', 'src/ui.js'), 'utf8');
function part(start, end) {
  const a = ui.indexOf(start), b = ui.indexOf(end, a);
  assert.ok(a >= 0 && b > a, 'Blocco dell’interfaccia non trovato: ' + start);
  return ui.slice(a, b);
}
const definitions = part('  /* ---------------- calendario', '  // la durata detta') + part('  function promisesHTML(', '  function nowHTML(') +
  part('  function attrHTML(', '  function relHTML(');
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('  OK ' + name); }
test('Il riepilogo Adesso usa le stesse condizioni delle etichette, secondo arena e genere', () => {
  const c = { own: (o, k) => Object.prototype.hasOwnProperty.call(o, k),
    G3: (g, m, f, n) => g === 'F' ? f : g === 'N' ? n : m,
    plural: (n, s, p) => n + ' ' + (n === 1 ? s : p), esc: String, linkify: String, MND: { goals: {} }, L: { STATUS_LABEL: {} } };
  vm.createContext(c); vm.runInContext(part('  function nowHTML(', '  function peopleHTML(') + part('  function statusLabel(', '  function vbars('), c);
  const person = { id: 'a', gender: 'F' }, theme = { lex: { luogo: ['la Biblioteca'] }, soft: true };
  const snapshot = { mind: {}, vit: { a: [45, 60, 50, 80, -1] }, st: { a: ['ubriaco'] }, zones: { a: 0 }, allies: {}, alive: ['a'] };
  const soft = c.nowHTML(person, snapshot, 0, theme);
  assert.match(soft, /in difficoltà/); assert.match(soft, /poca lucidità/); assert.doesNotMatch(soft, /ferita|ubriaca/);
  const hard = c.nowHTML(person, snapshot, 0, { ...theme, soft: false });
  assert.match(hard, /ferita/); assert.match(hard, /ubriaca/);
  snapshot.vit.a[0] = 20;
  assert.match(c.nowHTML(person, snapshot, 0, theme), /reputazione a pezzi/);
  assert.match(c.nowHTML(person, snapshot, 0, theme), /senza alleati/);
  assert.doesNotMatch(c.nowHTML(person, snapshot, 0, theme), /da sola/);
  snapshot.alive = ['a', 'b']; snapshot.allies = { a: 1, b: 1 };
  assert.match(c.nowHTML(person, snapshot, 0, theme), /in alleanza con 1 alleato/);
});
function fixture() {
  const a = { id: 'a', name: 'Alice', gender: 'F', team: 1, traits: [], attr: { int: 8 }, tests: 3, testsPassed: 2, alive: true, deathPhase: -1, deathDay: 0, promises: [], kills: 7, killerIds: [], diary: [] };
  const b = { ...a, id: 'b', name: 'Bruno', gender: 'M', promises: [] };
  const events = [[], [{ ids: ['b'], test: { who: 'b', pass: true } }, { ids: ['a'], test: { who: 'a', pass: true } }], [{ ids: ['a'], test: { who: 'a', pass: false } }], [{ ids: ['a'], test: { who: 'a', pass: true } }]];
  const phases = events.map((events, i) => ({ kind: 'd', day: i + 1, title: 'Giorno ' + (i + 1), events,
    snap: { kills: { a: i, b: 0 }, alive: ['a', 'b'], allies: {}, st: {}, inv: {}, vit: {}, rel: {} } }));
  const elements = { '#profBody': {}, '#profDlg': { open: false, showModal() { this.open = true; } }, '#phBody': {} };
  const c = { SIM: { tributes: [a, b], phases, theme: 'classico' }, BY: { a, b }, BDS: { promises: { kinds: { fedelta: 'Fedeltà', protezione: 'Protezione', vendetta: 'Vendetta' } } },
    D: { attrs: [{ id: 'int', name: 'Intelligenza' }], attrDesc: {} }, arenaOf: () => ({ key: ['int'] }), resultTheme: () => ({ id: 'classico' }), esc: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    $: (s) => { assert.ok(elements[s], 'Elemento inatteso: ' + s); return elements[s]; }, elements, a, b };
  vm.createContext(c); vm.runInContext(definitions, c); return c;
}
const promise = (extra = {}) => ({ to: 'b', k: 'fedelta', ph: 0, d: 1, done: 'sciolta', end: 2, ...extra });
test('Le prove future restano nascoste e non si contano quelle degli altri', () => {
  const c = fixture();
  assert.doesNotMatch(c.attrHTML(c.a, { id: 'classico' }, 0, false), /prove superate/);
  assert.match(c.attrHTML(c.a, { id: 'classico' }, 1, false), /prove superate 1 su 1/);
  assert.match(c.attrHTML(c.a, { id: 'classico' }, 2, false), /prove superate 1 su 2/);
  assert.match(c.attrHTML(c.a, { id: 'classico' }, 3, false), /prove superate 2 su 3/);
  assert.match(c.attrHTML(c.a, { id: 'classico' }, 0, false), /Intelligenza/);
});
test('L’esito conserva i contatori finali delle prove', () => {
  const c = fixture(); c.a.tests = 8; c.a.testsPassed = 6;
  assert.match(c.attrHTML(c.a, { id: 'classico' }, 3, true), /prove superate 6 su 8/);
  assert.match(c.attrHTML(c.a, { id: 'classico' }, 3, false), /prove superate 2 su 3/);
});
test('Le promesse compaiono quando vengono fatte e cambiano stato alla fase esatta', () => {
  const c = fixture(); c.a.promises = [promise({ ph: 1 })];
  assert.equal(c.promisesHTML(c.a, 0, false), '');
  assert.match(c.promisesHTML(c.a, 1, false), /in corso/);
  assert.doesNotMatch(c.promisesHTML(c.a, 1, false), /sciolta/);
  assert.match(c.promisesHTML(c.a, 2, false), /sciolta/);
});
test('Mantenimento e tradimento non vengono anticipati', () => {
  const c = fixture();
  for (const done of ['mantenuta', 'tradita']) {
    c.a.promises = [promise({ done })];
    assert.doesNotMatch(c.promisesHTML(c.a, 1, false), new RegExp(done));
    assert.match(c.promisesHTML(c.a, 2, false), new RegExp(done));
  }
});
test('Le vecchie promesse sciolte senza data restano in corso finché il termine non è noto', () => {
  const c = fixture(); c.a.promises = [promise({ end: null })];
  assert.match(c.promisesHTML(c.a, 0, false), /in corso/);
  assert.match(c.promisesHTML(c.a, 3, false), /in corso/);
  assert.match(c.promisesHTML(c.a, 3, true), /sciolta/);
  c.a.deathPhase = null;
  assert.match(c.promisesHTML(c.a, 0, false), /in corso/, 'Una fase di morte mancante non equivale alla fase zero');
});
test('Una promessa legacy si scioglie alla morte del promittente, non prima', () => {
  const c = fixture(); c.a.promises = [promise({ end: null })]; c.a.alive = false; c.a.deathPhase = 2;
  assert.match(c.promisesHTML(c.a, 1, false), /in corso/);
  assert.match(c.promisesHTML(c.a, 2, false), /sciolta/);
});
test('La morte del destinatario scioglie fedeltà e protezione, ma non una vendetta', () => {
  const c = fixture(); c.b.alive = false; c.b.deathPhase = 2;
  for (const k of ['fedelta', 'protezione', 'cibo']) {
    c.a.promises = [promise({ k, end: null })];
    assert.match(c.promisesHTML(c.a, 1, false), /in corso/);
    assert.match(c.promisesHTML(c.a, 2, false), /sciolta/);
  }
  c.a.promises = [promise({ k: 'vendetta', end: null })];
  assert.match(c.promisesHTML(c.a, 3, false), /in corso/);
  c.a.alive = false; c.a.deathPhase = 3;
  assert.match(c.promisesHTML(c.a, 3, false), /sciolta/);
});
test('La data esplicita prevale sulle inferenze dei vecchi risultati', () => {
  const c = fixture(); c.a.alive = false; c.a.deathPhase = 1; c.a.promises = [promise({ end: 3 })];
  assert.match(c.promisesHTML(c.a, 2, false), /in corso/);
  assert.match(c.promisesHTML(c.a, 3, false), /sciolta/);
});
test('Le promesse ricevute usano i ruoli corretti per ricostruire lo scioglimento', () => {
  const c = fixture(); c.b.promises = [promise({ to: 'a', end: null })]; c.b.alive = false; c.b.deathPhase = 2;
  assert.match(c.promisesHTML(c.a, 1, false), /in corso/);
  assert.match(c.promisesHTML(c.a, 2, false), /sciolta/);
  assert.match(c.promisesHTML(c.a, 2, false), /da <b>Bruno/);
});
test('Nell’esito i vecchi risultati mantengono gli esiti finali delle promesse', () => {
  const c = fixture();
  for (const done of ['sciolta', 'mantenuta', 'tradita']) {
    c.a.promises = [promise({ done, end: null })];
    assert.match(c.promisesHTML(c.a, 3, true), new RegExp(done));
  }
});
test('Il memoriale usa le uccisioni dello snapshot, senza anticipare i crediti postumi', () => {
  const c = fixture(); c.ph = { kind: 'fallen', deaths: ['a'], snap: { kills: { a: 2 } } };
  c.forward = false; c.soft = false; c.avHTML = () => '';
  vm.runInContext(part('    // contenuto', '    renderSide(i);'), c);
  assert.match(c.elements['#phBody'].innerHTML, /class="mono">2 ucc\./);
  assert.doesNotMatch(c.elements['#phBody'].innerHTML, /class="mono">7 ucc\./);
});
test('La scheda selezionata passa fase e contesto corretti alle statistiche', () => {
  const c = fixture();
  Object.assign(c, { curView: 'diretta', S: { run: { phase: 0 } }, THEMES: { classico: { id: 'classico' } }, TRAITS: {}, KIND: { d: 'Giorno' },
    stopped: 0, stopPlay: () => { c.stopped++; },
    G3: (g, m, f, n) => g === 'F' ? f : g === 'N' ? n : m,
    avHTML: () => '', nowHTML: () => '', vbars: () => '', bagHTML: () => '', relHTML: () => '', peopleHTML: () => '', diaryHTML: () => '',
    plural: (n, s, p) => n + ' ' + (n === 1 ? s : p), linkify: (s) => s });
  c.a.promises = [promise()];
  vm.runInContext(part('  const resultTheme =', '  let mapSelection='), c);
  vm.runInContext(part('  function openProfile(', '  function attrHTML('), c);
  c.openProfile('a');
  assert.doesNotMatch(c.elements['#profBody'].innerHTML, /prove superate|sciolta/);
  c.S.run.phase = 2; c.openProfile('a');
  assert.match(c.elements['#profBody'].innerHTML, /prove superate 1 su 2/);
  assert.match(c.elements['#profBody'].innerHTML, /sciolta/);
  c.curView = 'esito'; c.openProfile('a');
  assert.match(c.elements['#profBody'].innerHTML, /prove superate 2 su 3/);
  assert.equal(c.stopped, 3, 'La riproduzione deve fermarsi mentre si legge una scheda');
});
console.log('\nOK: ' + checks + ' gruppi di regressioni temporali dell’interfaccia');
