// Regressioni dell'importazione: usa le stesse funzioni dell'interfaccia, senza DOM.
// node tools/test-import.js
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.join(__dirname, '..');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(root, 'src/content')).filter((f) => f.endsWith('.js')).sort().map((f) => 'content/' + f), 'engine.js']) require(path.join(root, 'src', f));
const L = globalThis.LOS, D = globalThis.LOS_DATA;
const ui = fs.readFileSync(path.join(root, 'src/ui.js'), 'utf8');
function part(start, end) {
  const a = ui.indexOf(start), b = ui.indexOf(end, a);
  assert.ok(a >= 0 && b > a, 'Blocco dell’interfaccia non trovato: ' + start);
  return ui.slice(a, b);
}
const definitions = part('  const own = ', '  const KEY = ') +
  part('  function load() {', '  /* ---------------- utilità') +
  part('  function importJSON(text) {', "  $('#btnIO')") +
  part('  function validateCustom(c) {', '  function updatePreview()');
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('  OK ' + name); }
const defaults = { theme: 'classico', difficulty: 'normale', seed: 'originale', maxDays: 20, speed: 'normale', teamSize: 2, view: 'grid', adult: false, teamsAllied: true, teamWin: false };
const originalCast = [{ id: 'originale', name: 'Originale', team: 1 }];
const originalEvent = { id: 'vecchio', n: 1, phase: 'tutte', text: '{A} riposa.', dies: [], killer: '' };
function context(saved) {
  const c = { L, D, THEMES: Object.fromEntries(D.themes.map((t) => [t.id, t])), TRAITS: Object.fromEntries(D.traits.map((t) => [t.id, t])), SPEED: { lenta: 7000, normale: 3800, veloce: 1700 },
    S: { cast: structuredClone(originalCast), custom: [structuredClone(originalEvent)], settings: { ...defaults }, run: { keep: true }, ui: 'dark' },
    KEY: 'test', teamColor: (n) => L.PALETTE[(n - 1) % L.PALETTE.length], renderCast: () => { c.rendered++; }, save: () => { c.saved++; },
    rendered: 0, saved: 0, localStorage: { getItem: () => saved == null ? null : JSON.stringify(saved) } };
  vm.createContext(c); vm.runInContext(definitions, c); return c;
}
const cast = [{ id: 'alice-1', name: 'Alice', gender: 'F', team: 1, traits: ['leale'], attr: { for: 9 }, img: 'data:image/png;base64,AQ==' }, { id: 'bruno_2', name: 'Bruno', gender: 'M', team: 2 }];
test('Legami iniziali ed eventi avanzati usano la stessa importazione atomica', () => {
  const c = context(), raw = '2 test:A=int12 ok:save:A>B ko:hp:A-10 | {A} aiuta {B}. || {A} non riesce ad aiutare {B}.';
  assert.equal(c.importJSON(JSON.stringify({ cast, legami: [{ from: 'alice-1', to: 'bruno_2', type: 'amicizia' }], eventi: [{ id: 'avanzato', raw, phase: 'd' }] })), null);
  assert.equal(c.S.initialRelations[0].type, 'amicizia'); assert.equal(c.S.custom[0].raw, raw); assert.equal(c.S.custom[0].n, 2);
  const before = JSON.stringify(c.S);
  assert.match(c.importJSON(JSON.stringify({ cast, legami: [{ from: 'alice-1', to: 'assente', type: 'fiducia' }] })), /Legame/);
  assert.equal(JSON.stringify(c.S), before);
  assert.match(c.importJSON(JSON.stringify({ cast, eventi: [{ raw: '1 s:A=inesistente | {A} aspetta.' }] })), /Stato sconosciuto/);
  assert.equal(JSON.stringify(c.S), before);
});
function rejected(data, pattern) {
  const c = context(), before = JSON.stringify(c.S);
  const error = c.importJSON(JSON.stringify(data));
  assert.equal(typeof error, 'string'); if (pattern) assert.match(error, pattern);
  assert.equal(JSON.stringify(c.S), before, 'Un errore non deve cambiare nessuna parte dello stato');
  assert.equal(c.rendered, 0); assert.equal(c.saved, 0);
}
test('JSON null e valori primitivi restituiscono un errore senza cambiare lo stato', () => {
  for (const x of [null, true, 3, 'test']) rejected(x);
  const c = context(); assert.match(c.importJSON('{'), /JSON valido/);
});
test('ID duplicati, riservati, troppo lunghi e non testuali vengono rifiutati', () => {
  rejected({ cast: [{ id: 'uguale' }, { id: 'uguale' }] }, /duplicato/);
  for (const id of ['__proto__', 'constructor', 'toString', 'prototype', 'nome{con}graffe', 'x'.repeat(41), 7]) rejected({ cast: [{ id }, cast[1]] }, /identificativo/);
});
test('ID validi, foto, attributi e formati esportati v2 rimangono compatibili', () => {
  const c = context(); assert.equal(c.importJSON(JSON.stringify({ app: 'last-one-standing', versione: 2, cast, regole: { ...defaults, seed: 'nuovo', maxDays: 10.8, adult: true }, eventi: [] })), null);
  assert.equal(c.S.cast[0].id, cast[0].id); assert.equal(c.S.cast[1].id, cast[1].id);
  assert.equal(c.S.cast[0].img, cast[0].img); assert.equal(c.S.cast[0].attr.for, 9);
  assert.equal(c.S.settings.seed, 'nuovo'); assert.equal(c.S.settings.maxDays, 11);
  assert.equal(c.S.settings.adult, false, 'Il file non deve concedere il consenso 18+');
  assert.equal(c.S.custom.length, 0); assert.equal(c.rendered, 1); assert.equal(c.saved, 1);
});
test('Il consenso per adulti già dato non viene cancellato da un file', () => {
  const c = context(); c.S.settings.adult = true;
  assert.equal(c.importJSON(JSON.stringify({ cast, regole: { adult: false } })), null); assert.equal(c.S.settings.adult, true);
});
test('I cast legacy senza ID ne ricevono di distinti senza collisioni con gli ID presenti', () => {
  const c = context(); assert.equal(c.importJSON(JSON.stringify([{ name: 'A' }, { name: 'B' }, { id: 'gia_presente', name: 'C' }])), null);
  assert.equal(new Set(c.S.cast.map((x) => x.id)).size, 3); assert.equal(c.S.cast[2].id, 'gia_presente');
  assert.equal(c.S.custom[0].id, 'vecchio', 'Un file senza eventi conserva quelli attuali');
  assert.equal(c.importJSON(JSON.stringify([{ id: 'ID storico à', name: 'Storico' }])), null);
  assert.equal(c.S.cast[0].id, 'ID storico à', 'Gli ID storici sicuri non devono essere riscritti');
  assert.equal(c.importJSON(JSON.stringify({ cast, settings: { seed: 'formato-legacy' }, custom: [originalEvent] })), null);
  assert.equal(c.S.settings.seed, 'formato-legacy'); assert.equal(c.S.custom[0].id, 'vecchio');
});
test('Le proprietà ereditate non sono arene, difficoltà, velocità o tratti', () => {
  const c = context(); assert.equal(c.importJSON(JSON.stringify({ cast: [{ ...cast[0], traits: ['toString', '__proto__', 'leale', 'leale'] }, cast[1]], regole: { theme: 'toString', difficulty: '__proto__', speed: 'constructor' } })), null);
  assert.equal(c.S.settings.theme, 'classico'); assert.equal(c.S.settings.difficulty, 'normale'); assert.equal(c.S.settings.speed, 'normale');
  assert.equal(JSON.stringify(c.S.cast[0].traits), '["leale"]');
});
test('Un evento errato dopo un cast valido rende atomica l’intera importazione', () => {
  rejected({ cast, regole: { seed: 'non applicare' }, eventi: [{ n: 2, text: '{A} e {B}.', dies: ['A', 'B'], killer: 'A' }] }, /non può morire/);
  rejected({ cast: [cast[0], null] }, /Concorrente 2/);
  rejected({ cast, eventi: 'no' }, /elenco/); rejected({ cast, regole: [] }, /oggetto/);
});
test('Modulo, import e caricamento condividono i controlli degli eventi', () => {
  const cases = [
    { n: 2, text: '{A} e {B}.', dies: ['A', 'B'], killer: 'A' },
    { n: 2, text: '{A} e {B}.', dies: [], killer: 'A' },
    { n: 1, text: '{A} riposa.', dies: ['B'] },
    { n: 1, text: '{A} riposa.', dies: ['A', 'A'] },
    { n: 2, text: '{A} riposa.' },
    { n: 1, text: '{A} ' + 'x'.repeat(240) },
    { n: 1.5, text: '{A} riposa.' },
    { n: 5, text: '{A} riposa.' },
    { n: 1, phase: 'non-valida', text: '{A} riposa.' },
  ];
  for (const event of cases) {
    const c = context(); assert.equal(typeof c.validateCustom(event), 'string'); assert.equal(c.sanitizeCustom(event), null);
    rejected({ cast, eventi: [event] }, /Evento 1/);
  }
  const c = context(), event = { n: 2, phase: 'n', text: '{A} sfida {B} e l[B:o/a] batte.', dies: ['B'], killer: 'A' };
  assert.equal(c.validateCustom(event), null); assert.equal(c.importJSON(JSON.stringify({ cast, eventi: [event] })), null);
  assert.equal(c.S.custom[0].text, event.text); assert.equal(c.S.custom[0].killer, 'A');
});
test('Gli elenchi troppo grandi e gli ID evento duplicati non vengono tagliati in silenzio', () => {
  rejected({ cast: Array.from({ length: 201 }, (_, i) => ({ id: 't' + i })) }, /200 concorrenti/);
  rejected({ cast, eventi: Array.from({ length: 201 }, (_, i) => ({ ...originalEvent, id: 'e' + i })) }, /200 eventi/);
  rejected({ cast, eventi: [originalEvent, originalEvent] }, /duplicato/);
  rejected({ cast, eventi: [{ ...originalEvent, id: '__proto__' }] }, /identificativo/);
});
test('Il caricamento conserva foto e configurazione v2 e ripristina i riferimenti della partita', () => {
  const event = { ...originalEvent, id: 'custom-1' };
  const c = context({ cast, settings: { ...defaults, adult: true }, custom: [event], ui: 'light', run: { phase: 3, seen: 4, cfg: { cast: [{ ...cast[0], img: '@cast' }, cast[1]], theme: 'classico', seed: 'stabile', custom: [event] } } });
  assert.equal(c.load(), true); assert.equal(c.S.settings.adult, true); assert.equal(c.S.ui, 'light');
  assert.equal(c.S.run.cfg.cast[0].img, cast[0].img); assert.equal(c.S.run.cfg.cast[0].id, cast[0].id);
  assert.equal(c.S.run.phase, 3); assert.equal(c.S.run.cfg.seed, 'stabile'); assert.equal(c.S.run.cfg.custom[0].id, 'custom-1');
});
test('Una partita salvata invalida non impedisce di recuperare il cast valido', () => {
  const c = context({ cast, settings: defaults, run: { cfg: { theme: 'classico', cast: [cast[0], cast[0]] } } });
  assert.equal(c.load(), true); assert.equal(c.S.cast[0].id, cast[0].id); assert.equal(c.S.run, null);
  const invalid = context({ cast: [cast[0], cast[0]], settings: { seed: 'non applicare' } }), before = JSON.stringify(invalid.S);
  assert.equal(invalid.load(), false); assert.equal(JSON.stringify(invalid.S), before);
  assert.match(invalid.load.warning, /duplicato/); assert.match(invalid.load.warning, /non sono stati modificati/);
  assert.equal(invalid.saved, 0, 'Il caricamento fallito non deve riscrivere il salvataggio');
});
test('I vecchi salvataggi recuperano cast, regole ed eventi validi, segnalando quelli esclusi', () => {
  const badEvent = { id: 'prima-consentito', n: 2, text: '{A} e {B}.', dies: ['A', 'B'], killer: 'A' };
  const cfg = { theme: 'classico', cast, custom: [originalEvent, badEvent] };
  const c = context({ cast, settings: { ...defaults, seed: 'da-recuperare', adult: true }, custom: [originalEvent, badEvent], run: { cfg } });
  assert.equal(c.load(), true); assert.equal(c.S.cast[0].id, cast[0].id);
  assert.equal(c.S.settings.seed, 'da-recuperare'); assert.equal(c.S.settings.adult, true);
  assert.equal(c.S.custom.length, 1); assert.equal(c.S.custom[0].id, originalEvent.id);
  assert.equal(c.S.run, null, 'La partita deve mantenere i suoi eventi originali oppure non essere ripresa');
  assert.match(c.load.warning, /1 evento personalizzato non valido escluso/);
  assert.match(c.load.warning, /partita salvata/); assert.equal(c.saved, 0);
  const duplicate = context({ cast, settings: defaults, custom: [originalEvent, originalEvent] });
  assert.equal(duplicate.load(), true); assert.equal(duplicate.S.custom.length, 1);
  assert.match(duplicate.load.warning, /1 evento/);
});
console.log('\nOK: ' + checks + ' gruppi di regressioni dell’importazione');
