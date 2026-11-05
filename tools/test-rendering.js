// Regressioni di grammatica, voci e coerenza degli esiti narrati.
// node tools/test-rendering.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const src = path.join(__dirname, '..', 'src');
const files = ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((f) => f.endsWith('.js')).sort().map((f) => 'content/' + f), 'engine-systems.js', 'engine-geography.js', 'engine.js'];
const sources = files.map((f) => [f, fs.readFileSync(path.join(src, f), 'utf8')]);
let passed = 0;
function test(name, run) {
  try { run(); passed++; console.log('OK: ' + name); }
  catch (err) { console.error('ERRORE: ' + name); throw err; }
}
function load() {
  const ctx = vm.createContext({});
  sources.forEach(([filename, code]) => vm.runInContext(code, ctx, { filename }));
  return ctx;
}
function fixture({ opening, day = '1 | {A} aspetta.', seed = 'voci-0', traitsA = [], traitsB = [], attrA = {}, attrB = {}, allied = false, voices } = {}) {
  const ctx = load(), D = ctx.LOS_DATA, ordinary = D.themes[0];
  D.themes = [{ ...ordinary, id: 'audit', soft: true, lex: { ...ordinary.lex, luogo: ['il laboratorio'] },
    pool: { b: opening, d: day, n: '1 | {A} riposa.', fallback: '1 | {A} aspetta.', finale: '2 k:A>B | {A} elimina {B}.' }, disasters: [], extra: {} }];
  D.packs = []; D.more = {}; D.coreExtra = {};
  D.eco.arenas.audit = { key: [], drain: { food: 0, en: 0, mo: 0 }, mods: { forage: 0, beast: 0 }, zones: [[0, 0, 1]], meteo: [], meter: null };
  if (voices) { D.voice = voices; D.voiceSoft = {}; }
  const cast = [
    { id: 'a', name: 'Ada', gender: 'F', team: 1, traits: traitsA, attr: { int: 10, res: 1, fort: 1, emp: 1, ...attrA } },
    { id: 'b', name: 'Bruno', gender: 'M', team: allied ? 1 : 2, traits: traitsB, attr: { int: 1, res: 1, fort: 1, emp: 1, ...attrB } },
    { id: 'c', name: 'Carla', gender: 'F', team: 3, traits: [], attr: { int: 5, res: 1, fort: 1, emp: 1 } },
  ];
  return ctx.LOS.simulate({ cast, theme: 'audit', mapVersion: 0, seed, difficulty: 'normale', teamsAllied: allied, maxDays: 3 });
}
const directed = (effects, text = '{A} affronta {B}.') => '2 att:A>int9 att:B<int2 ' + effects + ' | ' + text;

test('le prove dichiarate 2d6 hanno minimo 2 e massimo 12 prima dei modificatori', () => {
  const engine = sources.find(([name]) => name === 'engine.js')[1];
  const start = engine.indexOf('    function rollTest('), end = engine.indexOf('    function isEnded(', start);
  assert.ok(start >= 0 && end > start);
  const c = { rng: { int: () => 0 }, traitSum: () => 0, hasTrait: () => false, hasItem: () => false,
    meterBad: () => false, wx: () => null, phases: [] };
  vm.createContext(c); vm.runInContext(engine.slice(start, end), c);
  const person = { attr: { int: 5, fort: 5 }, st: {}, hp: 100, mo: 50, planPh: -100 };
  assert.equal(c.rollTest(person, 'int', 7).roll, 7);
  assert.equal(c.rollTest(person, 'int', 7).pass, true);
  assert.equal(c.rollTest(person, 'int', 8).pass, false);
  c.rng.int = (sides) => { assert.equal(sides, 6); return 5; };
  assert.equal(c.rollTest(person, 'int', 17).roll, 17);
  assert.equal(c.rollTest(person, 'int', 17).pass, true);
  assert.equal(c.rollTest(person, 'int', 18).pass, false);
});

test('gli accordi maschili e femminili restano distinti', () => {
  const L = load().LOS;
  const text = '{A} è stat[A:o/a] vist[A:o/a]. [A:Gli/Le] parla e pensa a [A:lui/lei].';
  assert.equal(L.renderSample(text, 'classico', 'M'), 'Alfa è stato visto. Gli parla e pensa a lui.');
  assert.equal(L.renderSample(text, 'classico', 'F'), 'Alfa è stata vista. Le parla e pensa a lei.');
});
test('i pronomi neutri mantengono la convenzione singolare della app', () => {
  const L = load().LOS;
  assert.equal(L.renderSample('{A} è stat[A:o/a] vist[A:o/a]. [A:Gli/Le] parla e pensa a [A:lui/lei], poi per l[A:ui/ei] riparte.', 'classico', 'N'),
    'Alfa è statə vistə. Lə parla e pensa a ləi, poi per ləi riparte.');
  assert.equal(L.renderSample('{A} pensa a [A:lui/lei/questa persona].', 'classico', 'N'), 'Alfa pensa a questa persona.');
});
test('le preposizioni articolate funzionano anche a inizio frase e con apostrofi tipografici', () => {
  const L = load().LOS;
  assert.equal(L.renderSample("In il Bosco. A lo Scoglio. Da l'Altopiano. Su gli Alberi. Di le Rovine. In i Boschi.", 'classico', 'M'),
    "Nel Bosco. Allo Scoglio. Dall'Altopiano. Sugli Alberi. Delle Rovine. Nei Boschi.");
  assert.equal(L.renderSample('In l’Altare. Da l’Isola. A l’Ingresso.', 'classico', 'M'), 'Nell’Altare. Dall’Isola. All’Ingresso.');
});
test('il campione e l’anteprima applicano gli stessi aggiustamenti davanti alle vocali', () => {
  const L = load().LOS;
  assert.equal(L.renderSample('A {A} e Epsilon piace riposare a {A}.', 'classico', 'M'), 'Ad Alfa ed Epsilon piace riposare ad Alfa.');
  const preview = L.previewCustom({ n: 2, text: 'A {A} e {B} piace riposare a {A}.', dies: [], killer: '' }, 'classico');
  assert.ok(/^Ad <b/.test(preview));
  assert.ok(/riposare ad <b/.test(preview));
});
test('i possessivi rispettano articoli e plurali senza indovinare il genere di un articolo eliso', () => {
  const ctx = load(), L = ctx.LOS, theme = ctx.LOS_DATA.themes[0];
  const examples = [
    ['un coltello', 'il suo coltello'], ['una spada', 'la sua spada'], ['dei guanti', 'i suoi guanti'],
    ['delle protezioni', 'le sue protezioni'], ['dello spray urticante', 'il suo spray urticante'],
    ["l'armatura", "l'armatura"], ['l’armatura', 'l’armatura'], ["dell'acqua", "l'acqua"], ['un’armatura', 'la sua armatura'],
  ];
  for (const [name, expected] of examples) {
    theme.lex.arma = [name];
    assert.equal(L.renderSample('{A} usa {arma:A}.', theme.id, 'F'), 'Alfa usa ' + expected + '.');
  }
});
test('testo e nomi personalizzati rimangono testo HTML sicuro', () => {
  const L = load().LOS;
  const preview = L.previewCustom({ n: 1, text: '{A} legge <img src=x onerror=alert(1)> & sorride.', dies: [], killer: '' }, 'classico');
  assert.ok(preview.includes('&lt;img'));
  assert.ok(preview.includes('&amp;'));
  assert.ok(!preview.includes('<img'));
});
test('una dichiarazione si rivolge sempre all’altra persona della coppia', () => {
  let found = 0;
  for (let i = 0; i < 12; i++) {
    const result = fixture({ opening: directed('love:AB'), seed: 'amore-' + i, voices: { love: { _: ['Ti scelgo, {1}.'] } } });
    const quotes = result.phases[0].events.flatMap((e) => e.echo || []).filter((e) => e.cls === 'quote' && e.plain.includes('Ti scelgo'));
    quotes.forEach((e) => {
      found++;
      assert.ok(e.plain === 'Ada: «Ti scelgo, Bruno.»' || e.plain === 'Bruno: «Ti scelgo, Ada.»', e.plain);
    });
  }
  assert.ok(found > 0, 'il campione deve contenere una dichiarazione pronunciata');
});
test('le ultime parole ricordano il partner corrente prima della morte', () => {
  let found = 0;
  for (let i = 0; i < 48; i++) {
    const result = fixture({
      opening: '2 att:A<int2 att:B>int4 att:B<int6 love:AB | {A} e {B} si dichiarano.',
      day: directed('k:A>B'), seed: 'ultime-' + i,
      voices: { last: { _: ['Dite a {2} che non dimentico.'] } },
    });
    const quotes = result.phases.find((p) => p.kind === 'd').events.flatMap((e) => e.echo || []).filter((e) => e.cls === 'quote' && e.plain.includes('che non dimentico'));
    quotes.forEach((e) => { found++; assert.equal(e.plain, 'Bruno: «Dite a Carla che non dimentico.»'); });
  }
  assert.ok(found > 0, 'il campione deve contenere le ultime parole del partner ucciso');
});
test('un amuleto che salva tutte le vittime evita il badge Uccisione', () => {
  const result = fixture({ opening: directed('k:A>B'), traitsB: ['superstizioso'] });
  const event = result.phases[0].events.find((e) => e.ids.includes('a') && e.ids.includes('b'));
  assert.ok(event);
  assert.equal(event.deaths.length, 0); assert.equal(event.lethal, false); assert.equal(event.cat, 'hurt');
  assert.ok(event.echo.some((e) => e.cls === 'twist'));
  const fact = result.itemFacts.find(f => f.ph === 0 && f.kind === 'protect' && f.who === 'b');
  assert.ok(fact); assert.equal(fact.item.t, 'amuleto'); assert.equal(fact.owner, 'b'); assert.ok(fact.after.hp < fact.before.hp);
});
test('un tradimento sventato conserva il badge Tradimento senza dichiarare una morte', () => {
  const result = fixture({ opening: directed('tr:A>B'), traitsB: ['superstizioso'], allied: true });
  const event = result.phases[0].events.find((e) => e.ids.includes('a') && e.ids.includes('b'));
  assert.ok(event);
  assert.equal(event.deaths.length, 0); assert.equal(event.lethal, false); assert.equal(event.cat, 'betray');
});
for (const kind of ['tempra', 'pietà']) {
  test(kind + ': chi sopravvive al colpo non risulta ucciso nei metadati', () => {
    let found = 0;
    for (let i = 0; i < 24; i++) {
      const result = fixture({ opening: directed('k:A>B'), seed: kind + '-' + i,
        traitsA: kind === 'pietà' ? ['clemente'] : [], attrA: kind === 'pietà' ? { emp: 10 } : {},
        attrB: kind === 'tempra' ? { res: 10, fort: 10 } : {} });
      const event = result.phases[0].events.find((e) => e.ids.includes('a') && e.ids.includes('b'));
      if (!event || event.deaths.length) continue;
      found++;
      assert.equal(event.lethal, false); assert.equal(event.cat, 'hurt');
      assert.ok(event.echo.some((e) => e.cls === 'twist'));
    }
    assert.ok(found > 0, 'il campione deve contenere un salvataggio per ' + kind);
  });
}
console.log('\nOK: ' + passed + ' regressioni del testo e degli esiti.');
