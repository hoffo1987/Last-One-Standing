// Interventi del giocatore: il passato resta identico, il futuro cambia, i doni e gli ordini arrivano davvero.
const path = require('path'), fs = require('fs'), assert = require('assert');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(__dirname, '..', 'src', 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine-systems.js', 'engine-geography.js', 'engine.js']) require(path.join(__dirname, '..', 'src', f));
require(path.join(__dirname, '..', 'src', 'replay.js'));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA;
const strip = (p) => JSON.stringify(p);
let checked = 0, t0 = Date.now(), slow = 0;
for (const th of D.themes) {
  for (let i = 0; i < 4; i++) {
    const cast = LOS.randomCast(24, 'int-' + th.id + i, 2);
    const base = { cast, theme: th.id, seed: 'int' + i, difficulty: 'normale', teamsAllied: true, maxDays: 20 };
    const a0 = Date.now(), A = LOS.simulate(base); slow = Math.max(slow, Date.now() - a0);
    assert(LOS_REPLAY.validate(A), th.id + ': partita base non archiviabile');
    // si interviene a metà partita su un concorrente ancora vivo
    const k = Math.max(1, Math.floor(A.phases.length / 3));
    const who = A.phases[k - 1].snap.alive[0];
    const interventi = [{ fase: k, tipo: 'dono', chi: who, cosa: 'med' }, { fase: k, tipo: 'ordine', chi: who, cosa: 'caccia' }];
    const B = LOS.simulate(Object.assign({}, base, { interventi }));
    assert(LOS_REPLAY.validate(B), th.id + ': partita con interventi non archiviabile');
    for (let p = 0; p < k; p++) assert.strictEqual(strip(B.phases[p]), strip(A.phases[p]), th.id + '#' + i + ': la fase ' + p + ' è cambiata prima dell’intervento');
    // la prima fase calcolata da k in poi contiene il dono e l'ordine (salvo che sia una fase di riepilogo dei caduti)
    const at = B.phases.findIndex((p, j) => j >= k && p.events.some((e) => e.dono || e.mentor));
    assert(at >= k, th.id + '#' + i + ': il dono non compare');
    const evs = B.phases[at].events;
    assert(evs.some((e) => e.dono === 'med' && e.ids[0] === who), th.id + ': manca il dono');
    assert(evs.some((e) => e.mentor === 'caccia' && e.ids[0] === who), th.id + ': manca l’ordine');
    // stesso input, stesso risultato
    assert.strictEqual(strip(LOS.simulate(Object.assign({}, base, { interventi })).phases), strip(B.phases), th.id + ': non deterministico');
    // interviste: valgono dall'inizio e non rompono nulla
    const C = LOS.simulate(Object.assign({}, base, { interviste: [{ chi: cast[0].id, effetti: ['fama', 'morale', 'legame:' + cast[1].id] }] }));
    assert(LOS_REPLAY.validate(C), th.id + ': partita con interviste non archiviabile');
    checked++;
  }
}
console.log('OK: interventi su ' + checked + ' partite — passato invariato, doni e ordini presenti, deterministico. Partita più lenta: ' + slow + ' ms (' + ((Date.now() - t0) / 1000).toFixed(1) + ' s in tutto).');
