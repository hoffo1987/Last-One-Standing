// Catalogo degli oggetti: schede complete, zaino con peso e capienza, effetti applicati. node tools/test-items-catalog.js
const path = require('path'), fs = require('fs'), assert = require('assert');
const src = path.join(__dirname, '..', 'src');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter((x) => x.endsWith('.js')).sort().map((x) => 'content/' + x), 'engine-systems.js', 'engine-geography.js', 'engine.js']) require(path.join(src, f));
const LOS = globalThis.LOS, D = globalThis.LOS_DATA;
let n = 0; const ok = (m) => { n++; console.log('  OK ' + m); };

// 1. ogni oggetto che il gioco può creare ha descrizione ed effetti scritti a mano
let roots = 0, lex = 0;
for (const th of D.themes) {
  const W = D.worldItemData;
  for (const [type, v] of Object.entries(W.roots[th.id])) for (const name of W.split(v)) {
    roots++; const i = D.itemInfo(th.id, type, name + ' ' + W.tails[type][0], th.soft);
    assert.ok(i.known && i.d.length > 20, 'manca la scheda: ' + th.id + '/' + name);
    assert.ok(D.itemUses(i, 'Freddo').length >= 1);
  }
  const L = LOS.buildPools(th, [], true).lex;
  for (const type of ['arma', 'cibo', 'amuleto', 'alcol', 'veleno', 'mappa', 'esplosivo', 'armatura', 'attrezzo', 'valore', 'ricordo']) (L[type] || []).forEach((name) => { lex++; assert.ok(D.itemInfo(th.id, type, name, th.soft).known, 'manca la scheda: ' + th.id + '/' + type + '/' + name); });
}
ok(roots + ' varianti del mondo e ' + lex + ' oggetti dei lessici hanno descrizione ed effetti');

// 2. finiture con effetto e lettere personali
const a = D.itemInfo('classico', 'arma', 'una lancia da caccia'), b = D.itemInfo('classico', 'arma', 'una lancia da caccia con contrappeso ad anello');
assert.equal(b.p.forza, a.p.forza + 0.5); assert.equal(a.p.posti, 3);
assert.ok(D.itemInfo('liceo', 'arma', 'un quaderno delle verifiche con una copia firmata', true).p.forza > D.itemInfo('liceo', 'arma', 'un quaderno delle verifiche', true).p.forza);
assert.ok(D.itemInfo('zombie', 'ricordo', 'una lettera di Giada').known);
ok('le finiture cambiano gli effetti e le lettere personali hanno una scheda');

// 3. nelle partite lo zaino non supera mai otto oggetti né il peso sopportabile
let games = 0, over = 0, dropped = 0;
for (const th of D.themes) for (let i = 0; i < 3; i++) {
  const r = LOS.simulate({ cast: LOS.randomCast(16, 'cat' + th.id + i, 2), theme: th.id, seed: 'c' + i }); games++; dropped += r.stats.dropped || 0;
  const by = Object.fromEntries(r.tributes.map((t) => [t.id, t]));
  r.phases.forEach((p) => Object.entries(p.snap.inv || {}).forEach(([id, inv]) => {
    if (!p.snap.alive.includes(id)) return;
    const cap = 8 + Math.floor(((by[id].attr.for != null ? by[id].attr.for : 5) - 5) / 2);
    const load = inv.reduce((s, it) => s + (D.itemInfo(th.id, it.t, it.n, th.soft).p.posti || 0), 0);
    if (inv.length > 8 || load > cap) over++;
  }));
}
assert.equal(over, 0, 'zaini oltre la capienza: ' + over);
ok('in ' + games + ' partite nessuno zaino supera 8 oggetti o il peso sopportabile (' + dropped + ' oggetti lasciati a terra)');
console.log('\nOK: ' + n + ' gruppi di regressioni del catalogo degli oggetti');
