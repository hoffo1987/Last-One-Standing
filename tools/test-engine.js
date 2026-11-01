// Test headless del motore: node tools/test-engine.js [partite per tema]
const path = require('path');
for (const f of ['data-core.js', 'data-themes.js', ...require('fs').readdirSync(path.join(__dirname, '..', 'src', 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine.js']) require(path.join(__dirname, '..', 'src', f));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA;
const N = +process.argv[2] || 40;
let fail = 0, games = 0;
const err = (m) => { fail++; if (fail < 25) console.error('  ✗ ' + m); };
const C = LOS.countTemplates(); console.log('Modelli:', { eventi: C.events, disastri: C.disasters, eventi18: C.adultEvents, disastri18: C.adultDisasters, esiti: C.outcomes });
for (const th of D.themes) { const p = C.perTheme[th.id]; console.log('  ' + th.id.padEnd(10), p.events + ' eventi, ' + p.disasters + ' disastri' + (p.adultEvents ? ' (+' + p.adultEvents + '/' + p.adultDisasters + ' 18+)' : '')); }
// ogni tema deve compilare
for (const th of D.themes) { LOS.buildPools(th, [], false); LOS.buildPools(th, [], true); }
const diffs = ['bassa', 'normale', 'alta', 'massacro'];
for (const th of D.themes) {
  let days = 0, t0 = Date.now();
  for (let i = 0; i < N; i++) {
    const n = [2, 3, 6, 12, 24, 36, 48][i % 7];
    const teamWin = i % 5 === 4, teamsAllied = i % 3 !== 0;
    const cast = LOS.randomCast(n, th.id + i, 1 + (i % 3));
    const adult = i % 2 === 1;
    const r = LOS.simulate({ cast, theme: th.id, seed: 's' + i, difficulty: diffs[i % 4], teamWin, teamsAllied, maxDays: 20, adult });
    if (th.noAdult && r.adult) err(th.id + ': contenuti 18+ attivi nel Liceo');
    games++; days += r.days;
    const alive = r.tributes.filter((t) => t.alive);
    if (!teamWin && alive.length !== 1) err(`${th.id}#${i}: ${alive.length} vincitori`);
    if (teamWin && (alive.length < 1 || new Set(alive.map((t) => t.team)).size !== 1)) err(`${th.id}#${i}: vittoria di squadra non valida`);
    // nessun morto agisce dopo la morte
    const deadAt = {};
    r.phases.forEach((p, pi) => {
      p.events.forEach((e) => {
        e.ids.forEach((id) => { if (deadAt[id] != null) err(`${th.id}#${i}: ${id} agisce da morto nella fase ${pi}`); });
        if (/[{}\[\]§]/.test(e.plain)) err(`${th.id}#${i}: segnaposto non risolto: ${e.plain}`);
        (e.echo || []).forEach((x) => { if (/[{}\[\]§]/.test(x.plain)) err(`${th.id}#${i}: eco non risolta: ${x.plain}`); });
        if (!adult && e.origin === 'adult') err(`${th.id}#${i}: evento 18+ senza interruttore`);
        e.deaths.forEach((id) => (deadAt[id] = pi));
      });
    });
    const s = r.seed;
    const r2 = LOS.simulate({ cast, theme: th.id, seed: s, difficulty: diffs[i % 4], teamWin, teamsAllied, maxDays: 20, adult });
    if (JSON.stringify(r2) !== JSON.stringify(r)) err(`${th.id}#${i}: non deterministico (eventi, conseguenze, istantanee o risultato)`);
  }
  console.log(`  ${th.name.padEnd(22)} ${N} partite · ${(days / N).toFixed(1)} giorni medi · ${Date.now() - t0} ms`);
}
console.log(fail ? `\n${fail} errori su ${games} partite` : `\nOK: ${games} partite senza errori`);
process.exit(fail ? 1 : 0);
