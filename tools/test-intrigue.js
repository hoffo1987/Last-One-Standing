// Segretezza prima della rivelazione, preparazione fisica, cancellazioni e finali aperti.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict'), crypto = require('node:crypto');
const src = path.join(__dirname, '../src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine.js', 'replay.js']) require(path.join(src, f));
const Systems = require('../src/engine-systems.js');
function fixture(type, teamWin = false) {
  let ph = 0;
  const people = ['a', 'b', 'c'].map((id, i) => ({ id, zone: 0, alive: true, team: i + 1, partner: null, traits: ['stratega'], attr: { int: 8 }, inv: [], grudges: {} }));
  people[1].inv.push({ type: 'arma', name: 'Arma verificata', q: 3, u: 4 });
  const rng = { chance: () => true, wpick: list => list.find(c => c.owner.id === 'a' && c.target.id === 'b'), pick: list => typeof list[0] === 'string' ? list.includes(type) ? type : list[0] : list[0] };
  const system = Systems.createIntrigue({ rng, people, phase: () => ph, day: () => 1, ally: (a, b) => [a.id, b.id].sort().join('') === 'ac', like: () => 0, teamWin });
  return { people, system, phase: n => { ph = n; } };
}
for (const type of ['imboscata', 'sabotaggio', 'patto']) {
  const f = fixture(type), before = JSON.stringify(f.people);
  assert.equal(f.system.prepare(), true);
  assert.equal(JSON.stringify(f.people), before, 'Preparare un piano non deve scrivere intenzioni nei dati pubblici');
  assert.deepEqual(Object.keys(f.system).sort(), ['prepare', 'take'], 'Nessun registro pubblico dei piani pendenti');
  assert.equal(f.system.take(true), null, 'Nessun piano creato e rivelato nella stessa fase');
  f.phase(1); assert.equal(f.system.take(), null, 'La preparazione ordinaria richiede tempo');
  const p = f.system.take(true); assert.equal(p.type, type); assert.equal(p.ph, 0); assert.equal(p.zone, 0);
  assert.equal(f.system.take(true), null, 'Un piano non può essere eseguito due volte');
}
for (const cancel of ['death', 'item', 'helper', 'partner', 'team']) {
  const f = fixture(cancel === 'item' ? 'sabotaggio' : cancel === 'helper' ? 'patto' : 'imboscata', cancel === 'team');
  f.system.prepare();
  if (cancel === 'death') f.people[0].alive = false;
  if (cancel === 'item') f.people[1].inv = [];
  if (cancel === 'helper') f.people[2].alive = false;
  if (cancel === 'partner') f.people[0].partner = 'b';
  if (cancel === 'team') f.people[1].team = f.people[0].team;
  f.phase(3); assert.equal(f.system.take(true), null, 'Piano impossibile cancellato: ' + cancel);
}
const remote = fixture('patto'); remote.system.prepare(); remote.phase(3); remote.people[2].zone = 1;
assert.equal(remote.system.take(true), null, 'Il complice deve essere presente alla rivelazione');
remote.people[2].zone = 0; assert.equal(remote.system.take(true).type, 'patto');
console.log('OK: piani privati, tempi reali, complici locali, nessun oggetto trasferito o partecipante eliminato usato dal piano.');

const seen = new Set(), approaches = new Set(); let revelations = 0, staged = 0;
const digest = r => crypto.createHash('sha256').update(JSON.stringify(r)).digest('hex');
for (const theme of LOS_DATA.themes) {
  for (let i = 0; i < 8; i++) {
    const cast = LOS.randomCast(18, 'intrighi-cast-' + i, 3).map((t, j) => ({ ...t, id: 'intrigo-' + j, traits: j % 3 === 0 ? ['stratega', 'traditore'] : t.traits }));
    const cfg = { cast, theme: theme.id, seed: 'intrighi-' + i, maxDays: 4, teamsAllied: true, teamWin: i % 3 === 0 };
    const r = LOS.simulate(cfg);
    assert.ok(LOS_REPLAY.validate(r), theme.id + ': replay valido');
    if (i === 0) assert.equal(digest(r), digest(LOS.simulate(cfg)), theme.id + ': risultato completo deterministico');
    if (r.phases.filter(p => p.kind === 'finale').length > 1) staged++;
    for (const [ph, p] of r.phases.entries()) for (const e of p.events) {
      if (e.duel) approaches.add(e.duel.attr);
      if (!e.intrigue) continue;
      revelations++; seen.add(e.intrigue.type); seen.add(e.intrigue.outcome);
      const start = e.intrigue.prepared;
      assert.ok(start.ph < ph);
      assert.ok(e.ids.every(id => r.phases[start.ph].snap.alive.includes(id) && r.phases[start.ph].snap.zones[id] === start.zone));
      assert.ok(e.ids.every(id => e.place.positions[id] === e.place.zone), 'Tutti presenti al momento dell’azione');
      if (cfg.teamWin) {
        const team = id => cast.find(t => t.id === id).team;
        assert.notEqual(team(e.ids[0]), team(e.ids[1]));
        if (e.ids[2]) assert.notEqual(team(e.ids[2]), team(e.intrigue.outcome === 'doppio-gioco' ? e.ids[0] : e.ids[1]));
      }
      const bad = structuredClone(r); bad.phases[ph].events[p.events.indexOf(e)].intrigue.prepared.ph = ph;
      assert.equal(LOS_REPLAY.validate(bad), false, 'Rifiuta una preparazione inventata nella stessa fase');
      assert.equal(r.chronicle.facts[e.memoryId].plain, e.plain, 'La rivelazione entra nella memoria al momento giusto');
    }
  }
  console.log('OK: ' + theme.id + ' — complotti, rivelazioni geografiche, vittorie individuali e di squadra, replay e finali.');
}
for (const type of ['imboscata', 'sabotaggio', 'patto', 'riuscito', 'sventato', 'doppio-gioco']) assert.ok(seen.has(type), 'Percorso coperto: ' + type);
assert.ok(staged >= 9, 'Finali con più passaggi nelle diverse arene');
assert.ok(approaches.size >= 5, 'Il finale non dipende sempre dallo stesso confronto di forza');
console.log('OK: ' + revelations + ' rivelazioni; ' + staged + ' finali in più fasi; approcci ' + [...approaches].sort().join(', ') + '.');
