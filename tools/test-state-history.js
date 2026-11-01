// Regressioni di danno differito, valori vitali e storia delle promesse.
// node tools/test-state-history.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const src = path.join(__dirname, '..', 'src');
const files = ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((f) => f.endsWith('.js')).sort().map((f) => 'content/' + f), 'engine.js'];
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
function fixture({ opening, day = '1 | {A} aspetta.', seed = 'storia-0' }) {
  const ctx = load(), D = ctx.LOS_DATA, ordinary = D.themes[0];
  D.themes = [{ ...ordinary, id: 'audit', soft: true, lex: { ...ordinary.lex, luogo: ['il laboratorio'] },
    pool: { b: opening, d: day, n: '1 | {A} riposa.', fallback: '1 | {A} aspetta.', finale: '2 k:A>B | {A} elimina {B}.' },
    disasters: [], extra: {} }];
  D.packs = []; D.more = {}; D.coreExtra = {};
  D.eco.arenas.audit = { key: [], drain: { food: 0, en: 0, mo: 0 }, mods: { forage: 0, beast: 0 }, zones: [[0, 0, 1]], meteo: [], meter: null };
  const cast = [
    { id: 'a', name: 'Ada', gender: 'F', team: 1, traits: [], attr: { int: 10, res: 1, fort: 1, emp: 1 } },
    { id: 'b', name: 'Bruno', gender: 'M', team: 2, traits: [], attr: { int: 1, res: 1, fort: 1, emp: 1 } },
    { id: 'c', name: 'Carla', gender: 'F', team: 3, traits: [], attr: { int: 5, res: 1, fort: 1, emp: 1 } },
  ];
  return ctx.LOS.simulate({ cast, theme: 'audit', seed, difficulty: 'normale', teamsAllied: false, maxDays: 3 });
}
const find = (result, id) => result.tributes.find((t) => t.id === id);
const openingEvent = (effects) => '2 att:A>int9 att:B<int2 ' + effects + ' | {A} prepara un agguato contro {B}.';
function assertNoActionsAfterDeath(result) {
  const dead = new Set();
  result.phases.forEach((phase) => phase.events.forEach((event) => {
    event.ids.forEach((id) => assert.ok(!dead.has(id), id + ' agisce dopo la propria morte'));
    event.deaths.forEach((id) => dead.add(id));
  }));
}
function assertVitals(result) {
  result.phases.forEach((phase, ph) => Object.entries(phase.snap.vit).forEach(([id, values]) => {
    values.forEach((v, k) => {
      assert.ok(Number.isFinite(v), result.theme + ': valore non finito, fase ' + ph + ', ' + id);
      // -1 indica che questa arena non ha un indicatore o che non è applicabile.
      if (k === 4 && v === -1) return;
      assert.ok(v >= 0 && v <= 100, result.theme + ': valore ' + v + ' fuori intervallo, fase ' + ph + ', ' + id + ', indice ' + k);
    });
  }));
}
function assertPromiseHistory(result) {
  result.tributes.forEach((t) => t.promises.forEach((q) => {
    if (!q.done) return;
    assert.ok(Number.isInteger(q.end), t.id + ': promessa ' + q.done + ' senza fase finale');
    assert.ok(q.end >= q.ph && q.end < result.phases.length, t.id + ': cronologia della promessa non valida');
  }));
}

test('il veleno conserva il responsabile durante i danni periodici', () => {
  const result = fixture({ opening: openingEvent('hp:B-70 poison:A>B') });
  const b = find(result, 'b');
  assert.ok(result.phases[0].snap.st.b.includes('avvelenato'), 'il veleno deve persistere oltre il primo tick');
  assert.ok(b.deathPhase > 0, 'la vittima deve morire in una fase successiva all\'avvelenamento');
  assert.equal(b.deathCause, 'poison');
  assert.deepEqual(Array.from(b.killerIds), ['a']);
  assert.ok(find(result, 'a').killIds.includes('b'));
  assert.ok(!result.phases[0].snap.rel.b.g.some((g) => g[0] === 'a'), 'la vittima non conosce automaticamente l\'avvelenatore');
  assert.ok(!(b.mem.a || []).some((m) => m.ph === 0 && /robbed|hit|tried/.test(m.k)), 'la scena nascosta non crea un ricordo di aggressione');
  assertNoActionsAfterDeath(result);
});
test('la ferita continua ad attribuire la morte al suo aggressore', () => {
  const result = fixture({ opening: openingEvent('hp:B-65 hit:A>B') });
  const b = find(result, 'b');
  assert.ok(b.deathPhase > 0, 'la vittima deve sopravvivere all\'agguato');
  assert.equal(b.deathCause, 'wound');
  assert.deepEqual(Array.from(b.killerIds), ['a']);
  assertNoActionsAfterDeath(result);
});
test('una nuova lesione anonima non eredita il responsabile della ferita precedente', () => {
  const result = fixture({ opening: openingEvent('hp:B-65 hit:A>B'), day: '1 att:A<int2 hp:A-15 | {A} cade in un fossato.' });
  const b = find(result, 'b');
  assert.equal(b.alive, false);
  assert.equal(b.deathCause, 'wound');
  assert.deepEqual(Array.from(b.killerIds), []);
  assert.ok(!find(result, 'a').killIds.includes('b'));
});
test('curare il veleno e subire poi un incidente non conserva il vecchio avvelenatore', () => {
  const result = fixture({ opening: openingEvent('hp:B-70 poison:A>B'), day: '1 att:A<int2 cure:A hp:A-100 | {A} si cura e poi cade in un fossato.' });
  const b = find(result, 'b');
  const firstDay = result.phases.find((p) => p.kind === 'd');
  assert.ok(!firstDay.snap.st.b.includes('avvelenato'), 'la cura deve rimuovere il veleno');
  assert.equal(b.alive, false);
  assert.notEqual(b.deathCause, 'poison', 'le complicazioni della nuova ferita non sono più il vecchio veleno');
  assert.deepEqual(Array.from(b.killerIds), []);
  assert.ok(!find(result, 'a').killIds.includes('b'));
});
test('una lesione non cancella l\'origine del veleno ancora attivo', () => {
  const result = fixture({ opening: openingEvent('hp:B-70 poison:A>B'), day: '1 att:A<int2 hp:A-15 | {A} cade in un fossato.' });
  const b = find(result, 'b');
  assert.equal(b.alive, false);
  assert.equal(b.deathCause, 'poison');
  assert.deepEqual(Array.from(b.killerIds), ['a']);
  assert.ok(find(result, 'a').killIds.includes('b'));
});
test('un nuovo avvelenamento anonimo sostituisce l\'origine del veleno precedente', () => {
  const result = fixture({ opening: openingEvent('hp:B-70 poison:A>B'), day: '1 att:A<int2 s:A=avvelenato | {A} mangia bacche velenose.' });
  const b = find(result, 'b');
  assert.equal(b.alive, false);
  assert.equal(b.deathCause, 'poison');
  assert.deepEqual(Array.from(b.killerIds), []);
  assert.ok(!find(result, 'a').killIds.includes('b'));
});
test('il veleno può attribuire un\'uccisione postuma senza far agire il morto', () => {
  const result = fixture({ opening: openingEvent('+arma:A hp:B-70 poison:A>B'), day: '1 att:A>int9 d:A | {A} cade in un pozzo.' });
  const a = find(result, 'a'), b = find(result, 'b');
  assert.equal(a.alive, false);
  assert.equal(b.alive, false);
  assert.ok(a.deathPhase <= b.deathPhase, 'l\'aggressore deve morire prima del danno fatale del veleno');
  assert.equal(b.deathCause, 'poison');
  assert.deepEqual(Array.from(b.killerIds), ['a']);
  assert.equal(a.kills, 1);
  assert.ok(a.killIds.includes('b'));
  const weapon = result.phases[0].snap.inv.a.find((it) => it.t === 'arma');
  assert.ok(weapon, 'l\'aggressore deve avere un\'arma per verificare l\'assenza di usura postuma');
  assert.equal(a.bag.find((it) => it.t === 'arma').u, weapon.u);
  assert.equal(a.fame, result.phases[0].snap.rel.a.f, 'il credito postumo non assegna nuova fama al morto');
  assertNoActionsAfterDeath(result);
});
test('la morte scioglie le promesse con una fase finale precisa', () => {
  const result = fixture({
    opening: openingEvent('promise:A>B=cibo promise:A>B=fedelta promise:A>B=protezione promise:B>A=cibo'),
    day: '1 att:A<int2 d:A | {A} cade in un pozzo.',
  });
  const a = find(result, 'a'), b = find(result, 'b');
  assert.equal(b.alive, false);
  const incoming = a.promises.filter((q) => q.to === 'b');
  assert.ok(incoming.some((q) => q.done === 'sciolta'), 'le promesse ricevute dal morto devono sciogliersi');
  incoming.forEach((q) => assert.equal(q.end, b.deathPhase));
  assert.ok(b.promises.length > 0, 'il morto deve avere fatto una promessa');
  b.promises.forEach((q) => { assert.equal(q.done, 'sciolta'); assert.equal(q.end, b.deathPhase); });
  assertPromiseHistory(result);
});
test('il parser protegge anche i riferimenti del nuovo effetto veleno', () => {
  const L = load().LOS;
  assert.throws(() => L.parseLine('1 poison:A>B | {A} si prepara.'));
  assert.throws(() => L.parseLine('1 poison:A>A | {A} si prepara.'));
  assert.throws(() => L.parseLine('1 test:A=int11 ko:poison:A>B | {A} riesce. || {A} fallisce.'));
});

for (const [theme, seed] of [['fantasy', 'extended7'], ['scifi', 'extended2']]) {
  test('tutti i valori vitali restano 0–100: ' + theme + '/' + seed, () => {
    const ctx = load();
    const cast = ctx.LOS.randomCast(24, seed, 2).map((t, k) => ({ ...t, id: 't' + k }));
    const cfg = { cast, theme, seed, difficulty: 'normale', teamsAllied: true, maxDays: 20 };
    const result = ctx.LOS.simulate(cfg);
    assertVitals(result);
    assertPromiseHistory(result);
    assert.equal(JSON.stringify(result), JSON.stringify(ctx.LOS.simulate(cfg)), 'la partita completa deve rimanere deterministica');
  });
}

console.log('\nOK: ' + passed + ' regressioni di stato e cronologia.');
