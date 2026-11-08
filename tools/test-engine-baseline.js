// Confronto di TUTTI i campi storici, inclusi undefined, -0 e buchi negli array.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict'), crypto = require('node:crypto');
const root = path.join(__dirname, '..'), src = path.join(root, 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine.js']) require(path.join(src, f));
function canonical(x) {
  if (x === undefined) return ['undefined'];
  if (typeof x === 'number') return ['number', Object.is(x, -0) ? '-0' : String(x)];
  if (x === null || typeof x !== 'object') return [typeof x, x];
  if (Array.isArray(x)) return ['array', Array.from({ length: x.length }, (_, i) => Object.hasOwn(x, i) ? canonical(x[i]) : ['hole'])];
  return ['object', Object.keys(x).sort().map(k => [k, canonical(x[k])])];
}
const digest = value => crypto.createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
const fixturePath = path.join(__dirname, 'fixtures', 'engine-baseline.json');
if (process.argv.includes('--record')) {
  const cases = [];
  for (const theme of globalThis.LOS_DATA.themes) for (let i = 0; i < 4; i++) {
    const cfg = { cast: LOS.randomCast([2, 12, 24, 48][i], 'baseline-cast-' + i, i % 2 ? 3 : 1), theme: theme.id, seed: 'baseline-' + theme.id + '-' + i, difficulty: ['bassa', 'normale', 'alta', 'massacro'][i], maxDays: i === 3 ? 40 : 12, adult: !!(i % 2) && !theme.noAdult, teamsAllied: !!(i % 2), teamWin: i === 2, custom: i === 1 ? [{ raw: '2 test:A=int12 ok:save:A>B ko:hp:A-10 | {A} aiuta {B}. || {A} non riesce.', phase: 'd' }] : [] };
    if (i === 3) cfg.initialRelations = [{ from: cfg.cast[0].id, to: cfg.cast[1].id, type: 'coppia' }];
    const result = LOS.simulate({ ...cfg, mapVersion: 0 }); delete result.itemFacts; cases.push({ cfg, digest: digest(result) });
  }
  fs.mkdirSync(path.dirname(fixturePath), { recursive: true }); fs.writeFileSync(fixturePath, JSON.stringify({ revision: process.env.BASELINE_REVISION || 'relazioni-coerenti', cases }, null, 2));
  console.log('Registrati ' + cases.length + ' risultati completi di riferimento.');
} else {
  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  for (const test of fixture.cases) { const result = LOS.simulate({...test.cfg,mapVersion:0}); delete result.itemFacts; assert.equal(digest(result), test.digest, 'Risultato storico cambiato: ' + test.cfg.seed); }
  console.log('OK: ' + fixture.cases.length + ' risultati completi identici alla registrazione «' + fixture.revision + '».');
}
