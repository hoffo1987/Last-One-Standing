// Regressioni di coerenza: alleanze, tono degli eventi, contesti e finale. node tools/test-relations.js
const path = require('path'), fs = require('fs'), assert = require('assert');
const src = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine-systems.js', 'engine-geography.js', 'engine.js']) require(path.join(src, f));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA;
const DEEP = new Set(['nemesi', 'vendetta', 'odio']);
let checks = 0;
const C = { alliances: 0, deepAlliances: 0, allyPhases: 0, allyDeep: 0, warm: 0, warmDeep: 0 };
const games = [];
for (const th of D.themes) for (let i = 0; i < 3; i++) games.push(LOS.simulate({ cast: LOS.randomCast([10, 16, 20][i], 'rel' + th.id + i, 1 + (i % 3)), theme: th.id, seed: 'r' + i, teamsAllied: i !== 1, maxDays: 20 }));
for (const r of games) {
  const T = r.tributes;
  let prevL = null, prev = null;
  r.phases.forEach((p, k) => {
    const s = p.snap, L = new Map();
    (s.edges || []).forEach(([ai, bi, , , , la, lb]) => { L.set(T[ai].id + '>' + T[bi].id, la); L.set(T[bi].id + '>' + T[ai].id, lb); });
    Object.entries(s.rel || {}).forEach(([a, x]) => (x.g || []).forEach(([b]) => L.set('g:' + a + '>' + b, 1)));
    p.events.forEach((e) => {
      const ids = e.ids || [];
      assert.equal(new Set(ids).size, ids.length, 'la stessa persona compare in due ruoli: ' + e.plain);
      assert.ok(!/Fatti precedenti ricordati|Preparazione: giorno|Confronto opposto/.test(e.reason || ''), 'contesto con formule tecniche: ' + e.reason);
      if (prevL && ids.length >= 2 && /^(ally|love|heal)$/.test(e.cat) && !e.note && e.why !== 'complotto' && !/Legame|Alleanza finita|Scissione/.test(e.whyTxt || '')) {
        // conta il rapporto tra chi compie il gesto e chi lo riceve (nelle mediazioni i due litiganti sono gli altri)
        C.warm++; if (e.why !== 'legame' && ids.slice(1).some((y) => DEEP.has(prevL.get(ids[0] + '>' + y)) || DEEP.has(prevL.get(y + '>' + ids[0])))) C.warmDeep++;
      }
    });
    if (prev) s.alive.forEach((a) => s.alive.forEach((b) => {
      if (a >= b) return;
      const now = s.allies[a] != null && s.allies[a] === s.allies[b], was = prev.allies[a] != null && prev.allies[a] === prev.allies[b];
      if (now) { C.allyPhases++; if (DEEP.has(L.get(a + '>' + b)) || DEEP.has(L.get(b + '>' + a))) C.allyDeep++; }
      if (now && !was) { C.alliances++; if (DEEP.has(prevL.get(a + '>' + b)) || DEEP.has(prevL.get(b + '>' + a)) || prevL.get('g:' + a + '>' + b) || prevL.get('g:' + b + '>' + a)) C.deepAlliances++; }
    }));
    prev = s; prevL = L;
  });
}
// i duelli finali: «l'ultimo scontro» solo quando restano in due
for (const r of games) r.phases.forEach((p, k) => { if (p.kind !== 'finale') return; const before = k ? r.phases[k - 1].snap.alive.length : 99; p.events.forEach((e) => { if (/ultimo scontro|ultima sfida|vince la partita|fine della partita/i.test(e.plain || '')) assert.ok(before <= 2 || p.title === 'Il duello finale' || p.title === 'La sfida finale' || p.title === 'Faccia a faccia', 'frase conclusiva con più di due superstiti: ' + e.plain); }); });
checks++;
const rate = (a, b) => (b ? a / b : 0);
assert.ok(C.alliances > 50, 'campione troppo piccolo: ' + C.alliances + ' alleanze');
assert.ok(rate(C.deepAlliances, C.alliances) <= 0.015, 'alleanze nate tra persone che si odiano: ' + C.deepAlliances + ' su ' + C.alliances); checks++;
assert.ok(rate(C.allyDeep, C.allyPhases) <= 0.015, 'alleati che si odiano: ' + C.allyDeep + ' su ' + C.allyPhases); checks++;
assert.ok(rate(C.warmDeep, C.warm) <= 0.03, 'gesti affettuosi tra nemici: ' + C.warmDeep + ' su ' + C.warm); checks++;
console.log('OK: ' + checks + ' gruppi di regressioni di coerenza su ' + games.length + ' partite (alleanze ' + C.alliances + ', tra nemici ' + C.deepAlliances + '; gesti affettuosi tra nemici ' + C.warmDeep + ' su ' + C.warm + ')');
