/* Esperimenti accoppiati: nessun accesso a UI, salvataggi o RNG della partita. */
(function (G) {
  'use strict';
  const clone = (x) => structuredClone(x);
  const ATTRS = new Set(['for', 'agi', 'int', 'car', 'fort', 'res', 'furt', 'cor', 'emp', 'sop']);
  function plan(configuration, person, attribute, low, high, count) {
    if (!configuration || !Array.isArray(configuration.cast) || configuration.cast.length < 2 || configuration.cast.length > 200 || new Set(configuration.cast.map(t => t.id)).size !== configuration.cast.length) throw new Error('Cast dell’esperimento non valido.');
    if (!configuration.cast.some(t => t.id === person) || !ATTRS.has(attribute)) throw new Error('Scegli un concorrente e una caratteristica validi.');
    if (![low, high, count].every(Number.isInteger) || low < 1 || high > 10 || low >= high || count < 5 || count > 200) throw new Error('Usa due valori da 1 a 10, il primo minore del secondo, e da 5 a 200 coppie.');
    if (typeof configuration.seed !== 'string' || !configuration.seed) throw new Error('L’esperimento richiede un seme.');
    return { configuration: clone(configuration), person, attribute, low, high, count };
  }
  function summarize(pairs) {
    const n = pairs.length, counts = { onlyLow: 0, onlyHigh: 0, both: 0, neither: 0 };
    let lowWins = 0, highWins = 0, rankDelta = 0, killsDelta = 0;
    for (const p of pairs) { lowWins += +p.low.winner; highWins += +p.high.winner; rankDelta += p.high.rank - p.low.rank; killsDelta += p.high.kills - p.low.kills; counts[p.low.winner ? p.high.winner ? 'both' : 'onlyLow' : p.high.winner ? 'onlyHigh' : 'neither']++; }
    return { count: n, lowWins, highWins, lowRate: n ? 100 * lowWins / n : null, highRate: n ? 100 * highWins / n : null, winDifference: n ? 100 * (highWins - lowWins) / n : null, rankDifference: n ? rankDelta / n : null, killsDifference: n ? killsDelta / n : null, ...counts };
  }
  function input(p, seed, value) { const cfg = clone(p.configuration), person = cfg.cast.find(t => t.id === p.person); person.attr = { ...person.attr, [p.attribute]: value }; cfg.seed = seed; return cfg; }
  async function run(p, { simulate, onProgress = () => {}, cancelled = () => false }) {
    // Copia acquisita prima del primo await: modificare il cast durante il test non lo altera.
    p = plan(p.configuration, p.person, p.attribute, p.low, p.high, p.count);
    const report = { schema: 1, buildId: G.LOS_BUILD || null, ...clone(p), pairs: [], completed: 0, cancelled: false, error: null, summary: summarize([]) };
    const outcome = (result, seed) => { const t = result.tributes.find(t => t.id === p.person); if (result.seed !== seed || !t || !Number.isInteger(t.rank) || !Number.isInteger(t.kills) || !Array.isArray(result.winners)) throw new Error('Risultato dell’esperimento non coerente con il concorrente o il seme.'); return { winner: result.winners.includes(p.person), rank: t.rank, kills: t.kills }; };
    try {
      for (let i = 0; i < p.count; i++) {
        if (cancelled()) break;
        const seed = p.configuration.seed + '-controllo-' + (i + 1);
        const low = outcome(await simulate(input(p, seed, p.low)), seed); if (cancelled()) break;
        const high = outcome(await simulate(input(p, seed, p.high)), seed); if (cancelled()) break;
        report.pairs.push({ seed, low, high }); report.completed++; report.summary = summarize(report.pairs); onProgress(report);
      }
    } catch (e) { if (!cancelled()) report.error = e.message || 'Errore di simulazione.'; }
    report.cancelled = cancelled(); report.summary = summarize(report.pairs); return report;
  }
  const api = { plan, summarize, run }; G.LOS_EXPERIMENTS = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'object' ? window : globalThis);
