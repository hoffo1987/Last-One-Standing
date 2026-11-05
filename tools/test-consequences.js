// Regressioni delle conseguenze: usa il motore pubblico con piccoli scenari isolati.
// node tools/test-consequences.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const src = path.join(__dirname, '..', 'src');
const files = ['data-core.js', 'data-themes.js', 'content/_systems.js', 'content/_ecology.js', 'content/_items.js', 'content/_relazioni.js', 'engine-systems.js', 'engine-geography.js', 'engine.js'];
const sources = files.map((f) => [f, fs.readFileSync(path.join(src, f), 'utf8')]);
let passed = 0;
function test(name, run) {
  try { run(); passed++; console.log('OK: ' + name); }
  catch (err) { console.error('ERRORE: ' + name); throw err; }
}
function load() {
  const ctx = vm.createContext({});
  for (const [filename, code] of sources) vm.runInContext(code, ctx, { filename });
  return ctx;
}
// Si controlla la prima giornata, prima dei sistemi notturni. Nessun accesso alle
// funzioni private e nessuna modifica del codice del motore sotto test.
function scenario({ item = 'cibo', effects, setupA = '', setupB, participants = 2, seed = 'conseguenze', expectEvent = true, eventLine } = {}) {
  const ctx = load(), D = ctx.LOS_DATA;
  const ordinary = D.themes[0];
  const pool = {
    b: '1 att:A>int9 ' + setupA + ' | {A} prepara il proprio zaino.\n' +
      '1 att:A<int2 ' + (setupB == null ? '+' + item + ':A hp:A-70 food:A-30' : setupB) + ' | {A} raccoglie le provviste.',
    d: (participants === 1 ? '1 att:A>int9 ' : '2 att:A>int9 att:B<int2 ') + effects +
      (participants === 1 ? ' | {A} esegue l\'operazione.' : ' | {A} esegue l\'operazione con {B}.'),
    n: '1 | {A} riposa.', fallback: '1 | {A} aspetta.',
    finale: '2 k:A>B | {A} elimina {B}.',
  };
  if (eventLine) pool.d = eventLine.replace('|', 'att:A>int9 att:B<int2 |');
  D.themes = [{ ...ordinary, id: 'audit', soft: true, pool, disasters: [], extra: {} }];
  D.packs = []; D.more = {}; D.coreExtra = {};
  D.eco.arenas.audit = { key: [], drain: { food: 0, en: 0, mo: 0 }, mods: { forage: 0, beast: 0 }, zones: [[0, 0, 1]], meteo: [], meter: null };
  D.themes[0].lex = { ...ordinary.lex, luogo: ['il laboratorio'] };
  const cast = [
    { id: 'a', name: 'Ada', gender: 'F', team: 1, traits: [], attr: { int: 10 } },
    { id: 'b', name: 'Bruno', gender: 'M', team: 2, traits: [], attr: { int: 1 } },
  ];
  const result = ctx.LOS.simulate({ cast, theme: 'audit', mapVersion: 0, seed, difficulty: 'normale', teamsAllied: false, maxDays: 3 });
  const opening = result.phases.find((p) => p.kind === 'b');
  const day = result.phases.find((p) => p.kind === 'd');
  assert.ok(opening && day, 'lo scenario deve raggiungere la prima giornata');
  const event = day.events.find((e) => eventLine ? e.ids.length === 2 : e.plain.includes("esegue l'operazione"));
  if (expectEvent) assert.ok(event, 'l\'evento richiesto deve essere selezionabile');
  return { result, opening: opening.snap, day: day.snap, event };
}
const bag = (snap, id, type) => snap.inv[id].filter((it) => it.t === type);
const vital = (snap, id, index) => snap.vit[id][index];
const record = (result, id) => result.tributes.find((t) => t.id === id);

test('perdere cibo non aumenta la sazietà', () => {
  const s = scenario({ effects: '-cibo:B' });
  assert.equal(bag(s.opening, 'b', 'cibo').length, 1);
  assert.equal(bag(s.day, 'b', 'cibo').length, 0);
  assert.equal(vital(s.day, 'b', 3), vital(s.opening, 'b', 3));
  assert.equal(s.result.itemFacts.filter(f => f.ph === 1 && f.who === 'b' && f.kind === 'consume').length, 0);
});
test('perdere medicine non cura', () => {
  const s = scenario({ item: 'med', effects: '-med:B' });
  assert.equal(vital(s.opening, 'b', 0), 30);
  assert.equal(vital(s.day, 'b', 0), 30);
  assert.equal(bag(s.day, 'b', 'med').length, 0);
});
test('la cura esplicita si applica una sola volta', () => {
  const s = scenario({ item: 'med', effects: '-med:B hp:B+35' });
  assert.equal(vital(s.day, 'b', 0), 65);
});
test('i vecchi comandi di consumo conservano i loro benefici', () => {
  const food = scenario({ effects: 'cibo:B' });
  assert.equal(vital(food.day, 'b', 3), vital(food.opening, 'b', 3) + 40);
  const med = scenario({ item: 'med', effects: 'med:B' });
  assert.equal(vital(med.day, 'b', 0), 70);
  const fact = med.result.itemFacts.find(f => f.ph === 1 && f.who === 'b' && f.kind === 'consume');
  assert.ok(fact); assert.equal(fact.item.t, 'med'); assert.equal(fact.before.hp, 30); assert.equal(fact.after.hp, 70);
});
for (const type of ['cibo', 'med']) {
  test('il furto di ' + type + ' trasferisce l\'oggetto e lascia un ricordo', () => {
    const s = scenario({ item: type, effects: 'steal:A<B=' + type });
    assert.equal(bag(s.opening, 'a', type).length, 0);
    assert.equal(bag(s.opening, 'b', type).length, 1);
    assert.equal(bag(s.day, 'a', type).length, 1);
    assert.equal(bag(s.day, 'b', type).length, 0);
    assert.equal(bag(s.day, 'a', type)[0].n, bag(s.opening, 'b', type)[0].n);
    assert.equal(bag(s.day, 'a', type)[0].h, 'rubato');
    assert.equal(bag(s.day, 'a', type)[0].f, 'b');
    assert.equal(vital(s.day, 'b', 0), vital(s.opening, 'b', 0));
    assert.equal(vital(s.day, 'b', 3), vital(s.opening, 'b', 3));
    assert.ok(record(s.result, 'b').mem.a.some((m) => m.k === 'robbed' && m.ph === 1));
    assert.ok(s.day.rel.b.g.some((g) => g[0] === 'a'));
  });
  test('il furto segreto di ' + type + ' non rivela il responsabile alla vittima', () => {
    const s = scenario({ item: type, effects: 'steal:A<B=' + type + ' @secret' });
    assert.equal(bag(s.day, 'a', type).length, 1);
    assert.equal(bag(s.day, 'b', type).length, 0);
    assert.equal(vital(s.day, 'b', 0), vital(s.opening, 'b', 0));
    assert.equal(vital(s.day, 'b', 3), vital(s.opening, 'b', 3));
    assert.equal(vital(s.day, 'b', 2), vital(s.opening, 'b', 2));
    assert.ok(!(record(s.result, 'b').mem.a || []).some((m) => m.k === 'robbed' && m.ph === 1));
    assert.ok(!s.day.rel.b.g.some((g) => g[0] === 'a'));
  });
}
test('il vecchio furto di armi conserva qualità e usura', () => {
  const s = scenario({ item: 'arma', effects: 'steal:A<B' });
  const before = bag(s.opening, 'b', 'arma')[0], after = bag(s.day, 'a', 'arma')[0];
  for (const key of ['n', 'q', 'u', 'm']) assert.equal(after[key], before[key], key);
  assert.equal(after.h, 'rubato'); assert.equal(after.f, 'b');
  assert.equal(bag(s.day, 'b', 'arma').length, 0);
});
test('un dono trasferisce il cibo senza nutrire il donatore', () => {
  const s = scenario({ effects: 'give:B>A=cibo' });
  assert.equal(bag(s.day, 'b', 'cibo').length, 0);
  assert.equal(bag(s.day, 'a', 'cibo').length, 1);
  assert.equal(vital(s.day, 'b', 3), vital(s.opening, 'b', 3));
  assert.equal(bag(s.day, 'a', 'cibo')[0].h, 'dono');
  assert.equal(bag(s.day, 'a', 'cibo')[0].f, 'b');
  assert.ok(s.day.rel.a.o.includes('b'), 'chi riceve il dono resta in debito');
});
test('un dono non può creare un oggetto che il donatore non possiede', () => {
  const s = scenario({ effects: 'give:A>B=cibo', expectEvent: false });
  assert.equal(s.event, undefined);
  assert.equal(bag(s.day, 'b', 'cibo').length, bag(s.opening, 'b', 'cibo').length);
});
test('il dono non ricrea un oggetto rimosso da un effetto precedente', () => {
  const s = scenario({ effects: '-cibo:B give:B>A=cibo' });
  assert.equal(bag(s.day, 'a', 'cibo').length, 0);
  assert.equal(bag(s.day, 'b', 'cibo').length, 0);
  assert.ok(!s.day.rel.a.o.includes('b'), 'senza dono non nasce un debito');
});
for (const transfer of ['steal:A<B=armatura', 'give:B>A=armatura']) {
  test(transfer + ' non scarta la protezione della vittima quando non migliora quella ricevuta', () => {
    const s = scenario({ item: 'armatura', setupA: '+armatura:A', setupB: '+armatura:A', effects: transfer, expectEvent: false });
    assert.equal(s.event, undefined);
    for (const id of ['a', 'b']) {
      assert.equal(bag(s.day, id, 'armatura').length, 1);
      assert.equal(bag(s.day, id, 'armatura')[0].u, bag(s.opening, id, 'armatura')[0].u);
    }
  });
}
for (const transfer of ['steal:A<B=cibo', 'give:B>A=cibo']) {
  test(transfer + ' richiede spazio per un oggetto ricevuto', () => {
    const s = scenario({ setupA: Array(8).fill('+ricordo:A').join(' '), effects: transfer, expectEvent: false });
    assert.equal(bag(s.opening, 'a', 'ricordo').length, 8);
    assert.equal(s.event, undefined);
    assert.equal(bag(s.day, 'a', 'cibo').length, 0);
    assert.equal(bag(s.day, 'b', 'cibo').length, 1);
  });
}
test('si può consumare il cibo appena rubato, una volta sola', () => {
  const s = scenario({ setupA: 'food:A-29', effects: 'steal:A<B=cibo cibo:A cibo:A' });
  assert.equal(vital(s.opening, 'a', 3), 45);
  assert.equal(vital(s.day, 'a', 3), 85);
  assert.equal(bag(s.day, 'a', 'cibo').length, 0);
});
test('il cibo già mangiato automaticamente non dà un secondo beneficio', () => {
  const s = scenario({ setupA: 'food:A-30', effects: '+cibo:A cibo:A', participants: 1 });
  assert.equal(vital(s.opening, 'a', 3), 44);
  assert.equal(vital(s.day, 'a', 3), 94);
  assert.equal(bag(s.day, 'a', 'cibo').length, 0);
});
test('un salvataggio lascia gratitudine, memoria e contatore', () => {
  const s = scenario({ item: 'med', effects: 'save:A>B' });
  assert.ok(s.day.rel.b.o.includes('a'));
  assert.ok(record(s.result, 'a').saves >= 1);
  assert.ok(record(s.result, 'b').mem.a.some((m) => m.k === 'saved' && m.ph === 1));
});
test('il salvataggio narrato nell\'apertura originale lascia conseguenze reali', () => {
  const original = load().LOS_DATA.core.b.split('\n').find((line) => line.includes('trascina {B} fuori dalla mischia'));
  assert.ok(original, 'il modello del salvataggio deve restare nel catalogo');
  const s = scenario({ eventLine: original });
  assert.ok(s.day.rel.b.o.includes('a'));
  assert.ok(record(s.result, 'b').mem.a.some((m) => m.k === 'saved' && m.ph === 1));
});
test('un furto previsto solo nel ramo superato non avviene se la prova fallisce', () => {
  const s = scenario({ eventLine: '2 test:A=int99 ok:steal:A<B=cibo | {A} ruba il cibo di {B}. || {A} fallisce il furto ai danni di {B}.' });
  assert.equal(s.event.test.pass, false);
  assert.equal(bag(s.day, 'a', 'cibo').length, 0);
  assert.equal(bag(s.day, 'b', 'cibo').length, 1);
  assert.equal(vital(s.day, 'b', 3), vital(s.opening, 'b', 3));
  assert.ok(!(record(s.result, 'b').mem.a || []).some((m) => m.k === 'robbed' && m.ph === 1));
});
test('un dono previsto solo nel ramo superato non genera oggetti o debiti se la prova fallisce', () => {
  const s = scenario({ eventLine: '2 test:A=int99 ok:give:B>A=cibo | {A} riceve il cibo di {B}. || {A} non convince {B} a cedere il cibo.' });
  assert.equal(s.event.test.pass, false);
  assert.equal(bag(s.day, 'a', 'cibo').length, 0);
  assert.equal(bag(s.day, 'b', 'cibo').length, 1);
  assert.ok(!s.day.rel.a.o.includes('b'));
});

test('il parser rifiuta riferimenti inesistenti nei due esiti di una prova', () => {
  const L = load().LOS;
  for (const branch of ['ok', 'ko']) for (const effect of ['hp:B-20', 'd:B', 'give:A>B=cibo']) {
    assert.throws(() => L.parseLine('1 test:A=agi11 ' + branch + ':' + effect + ' | {A} vince. || {A} perde.'), 'riferimento B fuori dall\'evento');
  }
});
test('il parser rifiuta pesi non finiti o negativi', () => {
  const L = load().LOS;
  for (const weight of ['NaN', 'Infinity', '-2']) assert.throws(() => L.parseLine('1 *' + weight + ' | {A} riposa.'));
});
test('simulate rifiuta ID duplicati anche quando uno è generato automaticamente', () => {
  const L = load().LOS;
  assert.throws(() => L.simulate({ cast: [{ id: 'same' }, { id: 'same' }] }));
  assert.throws(() => L.simulate({ cast: [{}, { id: 't0' }] }));
});
test('simulate rifiuta identificativi riservati o contenenti segnaposto', () => {
  const L = load().LOS;
  for (const id of ['__proto__', 'constructor', 'toString', 'hasOwnProperty', 'prototype', '{A}', 'name}']) {
    assert.throws(() => L.simulate({ cast: [{ id }, { id: 'safe' }] }), id);
  }
});
test('simulate esclude i tratti ereditati dal prototipo', () => {
  const L = load().LOS;
  const result = L.simulate({ cast: [
    { id: 'a', name: 'Ada', team: 1, traits: ['toString', '__proto__', 'constructor', 'leale'] },
    { id: 'b', name: 'Bruno', team: 1 },
  ], teamWin: true, seed: 'tratti' });
  assert.deepEqual(Array.from(record(result, 'a').traits), ['leale']);
});

console.log('\nOK: ' + passed + ' regressioni delle conseguenze.');
