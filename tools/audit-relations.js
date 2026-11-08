// Audit della coerenza di legami, alleanze e contesti: node tools/audit-relations.js [partite per arena] [--esempi]
// Simula molte partite e conta, fase per fase, le incoerenze che un lettore noterebbe.
const path = require('path'), fs = require('fs');
const src = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine-systems.js', 'engine-geography.js', 'engine.js']) require(path.join(src, f));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA;
const N = +process.argv[2] || 12, SHOW = process.argv.includes('--esempi');

const HOSTILE = new Set(['nemesi', 'vendetta', 'odio', 'terrore', 'complotto', 'rivaleAmore', 'diffidenza', 'antipatia', 'paura']);
const DEEP = new Set(['nemesi', 'vendetta', 'odio', 'terrore', 'complotto']);
const WARM = new Set(['amore', 'fratelli', 'amico', 'gratitudine', 'mentore', 'protetto', 'complice']);
const C = { games: 0, phases: 0, newAlliances: 0, hostileAlliance: 0, deepHostileAlliance: 0, allyPhasesHostile: 0, allyPhases: 0, flips: 0, flipsNoEvent: 0, warmToHate: 0, hateToWarm: 0, events: 0, warmEv: 0, warmClash: 0, hostEv: 0, hostClash: 0, reasons: 0, recalled: 0, recalledOff: 0 };
const ex = { hostileAlliance: [], flipsNoEvent: [], recalledOff: [], warmClash: [], hostClash: [] };
const pairKey = (a, b) => (a < b ? a + '|' + b : b + '|' + a);

function labels(snap, T) {
  const m = new Map();
  (snap.edges || []).forEach(([ai, bi, , , , la, lb]) => { const a = T[ai].id, b = T[bi].id; m.set(a + '>' + b, la || ''); m.set(b + '>' + a, lb || ''); });
  Object.entries(snap.rel || {}).forEach(([a, r]) => (r.top || []).forEach(([b, like, lbl]) => { m.set(a + '>' + b, lbl); m.set('like:' + a + '>' + b, like); }));
  Object.entries(snap.rel || {}).forEach(([a, r]) => (r.g || []).forEach(([b]) => m.set('grudge:' + a + '>' + b, 1)));
  return m;
}
for (const th of D.themes) {
  for (let i = 0; i < N; i++) {
    const n = [8, 12, 16, 24][i % 4];
    const r = LOS.simulate({ cast: LOS.randomCast(n, 'aud' + th.id + i, 1 + (i % 3)), theme: th.id, seed: 'a' + i, teamsAllied: i % 2 === 0, maxDays: 20, adult: false });
    C.games++;
    const T = r.tributes, name = (id) => (T.find((t) => t.id === id) || {}).name || id;
    let prev = null, prevL = null;
    r.phases.forEach((p, k) => {
      const s = p.snap; if (!s) return;
      C.phases++;
      const L = labels(s, T);
      const together = new Set();
      p.events.forEach((e) => { C.events++; const ids = e.ids || []; for (const a of ids) for (const b of ids) if (a < b) together.add(pairKey(a, b));
        // tono contro sentimento della fase precedente
        if (prevL && ids.length >= 2 && !e.note && e.why !== 'complotto' && e.whyTxt !== 'Alleanza finita' && e.whyTxt !== 'Scissione' && e.whyTxt !== 'Rottura') {
          const warm = /^(ally|love|heal)$/.test(e.cat), host = /^(kill|hurt)$/.test(e.cat) && e.why !== 'Dialogo';
          const lbl = (x, y) => prevL.get(x + '>' + y) || '';
          if (warm) { C.warmEv++; const bad = ids.some((x) => ids.some((y) => x !== y && ['nemesi', 'vendetta', 'odio'].includes(lbl(x, y)))); if (bad) { C.warmClash++; if (ex.warmClash.length < 6) ex.warmClash.push(th.id + ': ' + e.plain.slice(0, 170) + ' [' + ids.map((x) => ids.filter((y) => y !== x).map((y) => name(x) + '→' + name(y) + ' ' + (lbl(x, y) || '-')).join(', ')).join('; ') + ']'); } }
          if (host) { C.hostEv++; const a0 = ids[0]; const bad = ids.slice(1).some((y) => ['amore', 'fratelli', 'amico'].includes(lbl(a0, y))); if (bad) { C.hostClash++; if (ex.hostClash.length < 6) ex.hostClash.push(th.id + ': ' + e.plain.slice(0, 170) + ' [' + ids.slice(1).map((y) => name(a0) + '→' + name(y) + ' ' + (lbl(a0, y) || '-')).join(', ') + ']'); } }
        }
        if (e.reason) { C.reasons++; if (/Fatti precedenti ricordati/.test(e.reason)) { C.recalled++;
          // il fatto ricordato riguarda davvero questo evento? stessa categoria o causa diretta (aiuto→gratitudine, ferita→rancore, morte)
          const m = e.reason.match(/Fatti precedenti ricordati: (.*)$/); const rec = m ? m[1] : '';
          const related = (e.cat === 'ally' && /alle|aiut|salv|protegg|divid/i.test(rec)) || (/kill|death|hurt|betray/.test(e.cat) && /colp|ferit|uccid|tradi|ruba|aggred|attacc|spinge/i.test(rec)) || (e.cat === 'love' && /bacia|abbracc|mano|cuore|cotta|ama/i.test(rec)) || (e.cat === 'heal' && /ferit|cura|aiut/i.test(rec));
          if (!related) { C.recalledOff++; if (ex.recalledOff.length < 8) ex.recalledOff.push(th.id + ' · ' + e.plain + '\n      contesto: ' + e.reason.slice(0, 260)); } } } });
      if (prev) {
        // nuove alleanze e cosa provavano prima
        s.alive.forEach((a) => s.alive.forEach((b) => {
          if (a >= b) return;
          const nowAlly = s.allies[a] != null && s.allies[a] === s.allies[b], wasAlly = prev.allies[a] != null && prev.allies[a] === prev.allies[b];
          if (nowAlly) { C.allyPhases++; const la = L.get(a + '>' + b), lb = L.get(b + '>' + a); if (DEEP.has(la) && la !== 'complotto' || DEEP.has(lb) && lb !== 'complotto') C.allyPhasesHostile++; }
          if (nowAlly && !wasAlly) {
            C.newAlliances++;
            const la = prevL.get(a + '>' + b), lb = prevL.get(b + '>' + a), g = prevL.get('grudge:' + a + '>' + b) || prevL.get('grudge:' + b + '>' + a);
            const la2 = prevL.get('like:' + a + '>' + b), lb2 = prevL.get('like:' + b + '>' + a);
            if (HOSTILE.has(la) || HOSTILE.has(lb) || g || la2 <= -30 || lb2 <= -30) {
              C.hostileAlliance++; if (DEEP.has(la) || DEEP.has(lb) || g) C.deepHostileAlliance++;
              if (ex.hostileAlliance.length < 10) { const ev = p.events.find((e) => (e.ids || []).includes(a) && (e.ids || []).includes(b)); ex.hostileAlliance.push(th.id + ' fase ' + (k + 1) + ': ' + name(a) + ' (' + (la || '-') + ', ' + (la2 ?? '?') + ') + ' + name(b) + ' (' + (lb || '-') + ', ' + (lb2 ?? '?') + ')' + (g ? ' [rancore]' : '') + (ev ? '\n      «' + ev.plain.slice(0, 160) + '»' : ' [nessun evento comune]')); }
            }
          }
          // salti bruschi di sentimento
          for (const [x, y] of [[a, b], [b, a]]) {
            const l0 = prevL.get(x + '>' + y), l1 = L.get(x + '>' + y);
            if (!l0 || !l1 || l0 === l1) continue;
            const w2h = WARM.has(l0) && DEEP.has(l1), h2w = DEEP.has(l0) && WARM.has(l1);
            if (w2h || h2w) { C.flips++; if (w2h) C.warmToHate++; else C.hateToWarm++;
              if (!together.has(pairKey(x, y))) { C.flipsNoEvent++; if (ex.flipsNoEvent.length < 10) ex.flipsNoEvent.push(th.id + ' fase ' + (k + 1) + ': ' + name(x) + ' verso ' + name(y) + ': ' + l0 + ' → ' + l1); } }
          }
        }));
      }
      prev = s; prevL = L;
    });
  }
}
const pc = (a, b) => (b ? (100 * a / b).toFixed(1) + '%' : '-');
console.log('Partite: ' + C.games + ', fasi: ' + C.phases + ', eventi: ' + C.events);
console.log('Alleanze nuove: ' + C.newAlliances + ' · tra persone ostili: ' + C.hostileAlliance + ' (' + pc(C.hostileAlliance, C.newAlliances) + '), con odio/vendetta/rancore: ' + C.deepHostileAlliance + ' (' + pc(C.deepHostileAlliance, C.newAlliances) + ')');
console.log('Coppie alleate che si odiano o cercano vendetta (fase per fase; i complotti segreti non contano): ' + pc(C.allyPhasesHostile, C.allyPhases));
console.log('Salti amicizia↔odio: ' + C.flips + ' (amicizia→odio ' + C.warmToHate + ', odio→amicizia ' + C.hateToWarm + '), senza alcun evento in comune: ' + C.flipsNoEvent);
console.log('Gesti affettuosi tra chi si odia: ' + C.warmClash + ' su ' + C.warmEv + ' (' + pc(C.warmClash, C.warmEv) + ') · aggressioni verso chi si ama o si considera amico: ' + C.hostClash + ' su ' + C.hostEv + ' (' + pc(C.hostClash, C.hostEv) + ')');
console.log('Contesti: ' + C.reasons + ' eventi con contesto (' + pc(C.reasons, C.events) + '), «fatti ricordati»: ' + C.recalled + ', non pertinenti: ' + C.recalledOff + ' (' + pc(C.recalledOff, C.recalled) + ')');
if (SHOW) for (const k in ex) { console.log('\n— ' + k); ex[k].forEach((x) => console.log('  ' + x)); }
module.exports = C;
