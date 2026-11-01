// Collaudo a tappeto: partite con impostazioni casuali e casi limite.
// node tools/fuzz.js [numero]
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(dir, 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine.js']) require(path.join(dir, f));
const D = globalThis.LOS_DATA, LOS = globalThis.LOS;
const N = +process.argv[2] || 1500;
const r = LOS.makeRng('fuzz');
let fails = 0;
const fail = (m) => { fails++; if (fails <= 20) console.error('✗ ' + m); };
const customs = [
  { phase: 'tutte', n: 2, text: '{A} sfida {B} a scacchi e l[B:o/a] batte.', dies: ['B'], killer: 'A' },
  { phase: 'd', n: 1, text: '{A} canta una canzone stonata.', dies: [], killer: '' },
  { phase: 'n', n: 3, text: '{A}, {B} e {C} giocano a carte fino all\'alba.', dies: [], killer: '' },
];
for (let i = 0; i < N; i++) {
  const th = r.pick(D.themes);
  const n = r.pick([2, 2, 3, 4, 5, 8, 13, 24, 37, 48, 60]);
  const cast = LOS.randomCast(n, 'f' + i, 1 + r.int(4));
  const mode = r.int(6);
  cast.forEach((t) => {
    if (mode === 0) t.gender = 'N';
    if (mode === 1) t.team = 1;
    if (mode === 2) D.attrs.forEach((a) => (t.attr[a.id] = r.chance(0.5) ? 1 : 10));
    if (mode === 3) t.traits = r.shuffle(D.traits).slice(0, 3).map((x) => x.id);
    if (mode === 4) delete t.attr;
  });
  const cfg = { cast, theme: th.id, seed: 'z' + i, difficulty: r.pick(Object.keys(LOS.DIFF)), maxDays: r.pick([3, 5, 10, 20, 40]), teamsAllied: r.chance(0.5), teamWin: r.chance(0.25), adult: r.chance(0.5), custom: r.chance(0.3) ? customs : [] };
  let res;
  try { res = LOS.simulate(cfg); } catch (e) { fail(th.id + ' n=' + n + ' mode=' + mode + ': eccezione ' + e.stack.split('\n').slice(0, 3).join(' | ')); continue; }
  const alive = res.tributes.filter((t) => t.alive);
  if (!alive.length) fail(th.id + ' n=' + n + ': nessun superstite');
  if (!cfg.teamWin && alive.length !== 1) fail(th.id + ' n=' + n + ' mode=' + mode + ': ' + alive.length + ' superstiti');
  if (cfg.teamWin && new Set(alive.map((t) => t.team)).size > 1 && res.days < cfg.maxDays) fail(th.id + ': vittoria di squadra con più squadre prima della fine');
  const ranks = res.tributes.map((t) => t.rank);
  if (ranks.some((x) => !(x >= 1))) fail(th.id + ': posizione non valida');
  const dead = new Set();
  res.phases.forEach((p, pi) => {
    if (!p.snap || !p.title) fail(th.id + ': fase senza titolo o istantanea');
    p.events.forEach((e) => {
      e.ids.forEach((id) => dead.has(id) && fail(th.id + ': ' + id + ' agisce da morto (fase ' + pi + ')'));
      if (/[{}\[\]§]|\b(undefined|NaN|null)\b/.test(e.plain)) fail(th.id + ': testo sporco: ' + e.plain);
      (e.echo || []).forEach((x) => /[{}\[\]§]|\b(undefined|NaN)\b/.test(x.plain) && fail(th.id + ': eco sporca: ' + x.plain));
      if (!cfg.adult && e.origin === 'adult') fail(th.id + ': 18+ senza consenso');
      if (th.noAdult && e.origin === 'adult') fail(th.id + ': 18+ nel Liceo');
      e.deaths.forEach((id) => dead.add(id));
    });
  });
  const deadCount = res.tributes.filter((t) => !t.alive).length;
  if (dead.size !== deadCount) fail(th.id + ': morti registrati ' + dead.size + ' ma morti reali ' + deadCount);
  if (res.tributes.some((t) => t.kills < 0 || t.kills > n)) fail(th.id + ': uccisioni impossibili');
}
console.log(fails ? fails + ' problemi su ' + N + ' partite' : 'OK: ' + N + ' partite casuali senza problemi');
process.exit(fails ? 1 : 0);
