// Test headless del motore: node tools/test-engine.js [partite per tema]
const path = require('path');
for (const f of ['data-core.js', 'data-themes.js', ...require('fs').readdirSync(path.join(__dirname, '..', 'src', 'content')).map((x) => 'content/' + x), 'engine.js']) require(path.join(__dirname, '..', 'src', f));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA;
const N = +process.argv[2] || 40;
let fail = 0, games = 0;
const err = (m) => { fail++; if (fail < 25) console.error('  ✗ ' + m); };
console.log('Modelli:', LOS.countTemplates());
// ogni tema deve compilare
for (const th of D.themes) LOS.buildPools(th, []);
const diffs = ['bassa', 'normale', 'alta', 'massacro'];
for (const th of D.themes) {
  let days = 0, t0 = Date.now();
  for (let i = 0; i < N; i++) {
    const n = [2, 3, 6, 12, 24, 36, 48][i % 7];
    const teamWin = i % 5 === 4, teamsAllied = i % 3 !== 0;
    const cast = LOS.randomCast(n, th.id + i, 1 + (i % 3));
    const r = LOS.simulate({ cast, theme: th.id, seed: 's' + i, difficulty: diffs[i % 4], teamWin, teamsAllied, maxDays: 20 });
    games++; days += r.days;
    const alive = r.tributes.filter((t) => t.alive);
    if (!teamWin && alive.length !== 1) err(`${th.id}#${i}: ${alive.length} vincitori`);
    if (teamWin && (alive.length < 1 || new Set(alive.map((t) => t.team)).size !== 1)) err(`${th.id}#${i}: vittoria di squadra non valida`);
    // nessun morto agisce dopo la morte
    const deadAt = {};
    r.phases.forEach((p, pi) => {
      p.events.forEach((e) => {
        e.ids.forEach((id) => { if (deadAt[id] != null) err(`${th.id}#${i}: ${id} agisce da morto nella fase ${pi}`); });
        if (/[{}\[\]]/.test(e.plain)) err(`${th.id}#${i}: segnaposto non risolto: ${e.plain}`);
        e.deaths.forEach((id) => (deadAt[id] = pi));
      });
    });
    const s = r.seed;
    const r2 = LOS.simulate({ cast, theme: th.id, seed: s, difficulty: diffs[i % 4], teamWin, teamsAllied, maxDays: 20 });
    if (JSON.stringify(r2.winners) !== JSON.stringify(r.winners) || r2.phases.length !== r.phases.length) err(`${th.id}#${i}: non deterministico`);
  }
  console.log(`  ${th.name.padEnd(22)} ${N} partite · ${(days / N).toFixed(1)} giorni medi · ${Date.now() - t0} ms`);
}
console.log(fail ? `\n${fail} errori su ${games} partite` : `\nOK: ${games} partite senza errori`);
process.exit(fail ? 1 : 0);
