// Audit dei testi generati: node tools/audit-narrative.js [partite per arena] [--esempi]
// Cerca quello che un lettore nota subito: segnaposto rimasti, frasi ripetute nella stessa partita,
// morti che agiscono, riferimenti temporali sbagliati e meccaniche che si ripetono troppo.
const path = require('path'), fs = require('fs');
const src = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine-systems.js', 'engine-geography.js', 'engine.js']) require(path.join(src, f));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA;
const N = +process.argv[2] || 6, SHOW = process.argv.includes('--esempi');
const C = { games: 0, events: 0, dupRoles: 0, leftovers: 0, repeats: 0, deadActs: 0, badYesterday: 0, intrigue: 0, finaleRepeat: 0 };
const ex = { dupRoles: [], leftovers: [], repeats: [], deadActs: [], badYesterday: [], perMechanic: {} };
const mech = {};
for (const th of D.themes) for (let i = 0; i < N; i++) {
  const r = LOS.simulate({ cast: LOS.randomCast([12, 16, 24][i % 3], 'nar' + th.id + i, 1 + (i % 3)), theme: th.id, seed: 'n' + i, maxDays: 20, adult: false });
  C.games++;
  const names = r.tributes.map((t) => t.name).sort((a, b) => b.length - a.length);
  const norm = (s) => names.reduce((x, n) => x.split(n).join('§'), s).replace(/\d+/g, '#');
  const seen = new Map(), deadAt = {};
  r.tributes.forEach((t) => { if (!t.alive) deadAt[t.id] = t.deathPhase; });
  r.phases.forEach((p, k) => p.events.forEach((e) => {
    C.events++;
    const txt = (e.plain || '') + ' ' + (e.reason || '');
    if (new Set(e.ids || []).size !== (e.ids || []).length) { C.dupRoles++; if (ex.dupRoles.length < 6) ex.dupRoles.push(th.id + ': ' + (e.plain || '').slice(0, 160)); }
    if (/\{[A-Z0-9a-z:]*\}|\[[0-9A-F]:|undefined|NaN|\bnull\b|\[object/.test(txt)) { C.leftovers++; if (ex.leftovers.length < 8) ex.leftovers.push(th.id + ': ' + txt.slice(0, 200)); }
    if (!e.note) {
      const n = norm(e.plain || ''); seen.set(n, (seen.get(n) || 0) + 1);
      if (seen.get(n) === 3) { C.repeats++; if (ex.repeats.length < 12) ex.repeats.push(th.id + ' (×3+): ' + n.slice(0, 160)); }
    }
    // chi è morto prima di questa fase non può comparire come protagonista
    (e.ids || []).forEach((id) => { if (deadAt[id] != null && deadAt[id] < k && !e.note && p.kind !== 'fallen') { C.deadActs++; if (ex.deadActs.length < 6) ex.deadActs.push(th.id + ' fase ' + (k + 1) + ': ' + e.plain.slice(0, 160)); } });
    if (/\bieri\b/.test(e.plain || '') && (p.day || 1) === 1 && p.kind !== 'n') { C.badYesterday++; if (ex.badYesterday.length < 6) ex.badYesterday.push(th.id + ' ' + p.title + ': ' + e.plain.slice(0, 160)); }
    const m = e.why === 'complotto' ? 'complotto' : e.whyTxt || e.why || e.cat;
    mech[m] = (mech[m] || 0) + 1;
  }));
}
const pc = (a, b) => (b ? (100 * a / b).toFixed(2) + '%' : '-');
console.log('Partite: ' + C.games + ', eventi: ' + C.events);
console.log('Segnaposto o valori rimasti nel testo: ' + C.leftovers + ' · stessa persona in due ruoli dello stesso evento: ' + C.dupRoles);
console.log('Frasi ripetute 3+ volte nella stessa partita: ' + C.repeats + ' (' + (C.repeats / C.games).toFixed(1) + ' per partita)');
console.log('Morti che compaiono dopo la morte: ' + C.deadActs);
console.log('«Ieri» nel primo giorno: ' + C.badYesterday);
console.log('Meccaniche più frequenti (per partita): ' + Object.entries(mech).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, v]) => k + ' ' + (v / C.games).toFixed(1)).join(' · '));
if (SHOW) for (const k of ['dupRoles', 'leftovers', 'repeats', 'deadActs', 'badYesterday']) { console.log('\n— ' + k); ex[k].forEach((x) => console.log('  ' + x)); }
