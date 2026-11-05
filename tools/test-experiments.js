const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const src = path.join(__dirname, '../src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine.js']) require(path.join(src, f));
const E = require(path.join(src, 'experiments.js'));
const cfg = { cast: LOS.randomCast(4, 'controlled-cast', 2), seed: 'controlled', theme: 'liceo', difficulty: 'normale', maxDays: 5, teamWin: true, teamsAllied: true, adult: false, custom: [] }, id = cfg.cast[0].id;
(async () => {
  const original = structuredClone(cfg), p = E.plan(cfg, id, 'car', 2, 9, 5), inputs = [];
  const report = await E.run(p, { simulate: async input => { inputs.push(structuredClone(input)); return LOS.simulate(input); } });
  assert.equal(report.completed, 5); assert.equal(report.error, null); assert.deepEqual(cfg, original); assert.equal(inputs.length, 10);
  for (let i = 0; i < 10; i += 2) {
    const a = inputs[i], b = inputs[i + 1]; assert.equal(a.seed, b.seed); assert.equal(a.cast[0].attr.car, 2); assert.equal(b.cast[0].attr.car, 9);
    b.cast[0].attr.car = 2; assert.deepEqual(a, b); a.seed = original.seed; a.cast[0].attr.car = original.cast[0].attr.car; assert.deepEqual(a, original);
  }
  const again = await E.run(p, { simulate: async input => LOS.simulate(input) }); assert.deepEqual(report, again);
  const stats = E.summarize([{ low: { winner: true, rank: 1, kills: 0 }, high: { winner: false, rank: 2, kills: 1 } }, { low: { winner: true, rank: 1, kills: 1 }, high: { winner: true, rank: 1, kills: 2 } }]);
  assert.equal(stats.winDifference, -50); assert.equal(stats.rankDifference, 0.5); assert.equal(stats.killsDifference, 1); assert.equal(stats.onlyLow, 1); assert.equal(stats.both, 1); assert.equal(E.summarize([]).winDifference, null);
  let calls = 0, stop = false;
  const cancelled = await E.run(p, { simulate: async input => { calls++; if (calls === 3) stop = true; return LOS.simulate(input); }, cancelled: () => stop });
  assert.equal(cancelled.completed, 1); assert.equal(cancelled.cancelled, true); assert.equal(cancelled.pairs.length, 1);
  const failed = await E.run(p, { simulate: async () => { throw new Error('worker indisponibile'); } }); assert.equal(failed.completed, 0); assert.match(failed.error, /worker/);
  for (const args of [[id, 'toString', 2, 9, 5], [id, 'for', 9, 2, 5], [id, 'for', 2, 9, 0], ['assente', 'for', 2, 9, 5]]) assert.throws(() => E.plan(cfg, ...args));
  const mutated = E.plan(cfg, id, 'for', 1, 10, 5); let first = true;
  const acquired = await E.run(mutated, { simulate: async input => { if (first) { first = false; mutated.configuration.cast[1].name = 'Modificato durante il calcolo'; } return LOS.simulate(input); } });
  assert.equal(acquired.configuration.cast[1].name, original.cast[1].name);
  console.log('OK: coppie controllate, un solo parametro variato, determinismo, vittorie condivise, annullamento a metà, errori e acquisizione della configurazione.');
})().catch(e => { console.error(e); process.exitCode = 1; });
