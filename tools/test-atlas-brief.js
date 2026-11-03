// Il brief delle immagini (tools/atlas-brief.js) deve coprire esattamente i luoghi, i pericoli
// e le armi che la guida delle arene mostra, con testi e prompt completi.
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'src/data-core.js')); require(path.join(ROOT, 'src/data-themes.js'));
fs.readdirSync(path.join(ROOT, 'src/content')).filter((f) => f.endsWith('.js')).sort().forEach((f) => require(path.join(ROOT, 'src/content', f)));
require(path.join(ROOT, 'src/engine.js')); require(path.join(ROOT, 'src/atlas.js'));
const D = global.LOS_DATA, A = global.LOS_ATLAS, B = require('./atlas-brief.js');
const itemsOf = (t, kind) => (kind === 'luoghi' ? t.lex.luogo : kind === 'pericoli' ? t.lex.mostro : t.lex.arma.slice(0, 10));
// la guida mostra le prime dieci armi: se cambia in src/ui.js, va cambiato anche qui e in atlas-slots
assert.ok(/t\.lex\.arma\.slice\(0, 10\)/.test(fs.readFileSync(path.join(ROOT, 'src/ui.js'), 'utf8')), 'la guida mostra ancora le prime dieci armi');
let n = 0;
assert.deepStrictEqual(Object.keys(B.arenas).sort(), D.themes.map((t) => t.id).sort(), 'una voce del brief per ogni arena');
D.themes.forEach((t) => {
  const ar = B.arenas[t.id];
  assert.ok(ar.look && ar.style, t.id + ': atmosfera e stile');
  ['luoghi', 'pericoli', 'armi'].forEach((kind) => {
    const want = [...new Set(itemsOf(t, kind).map(A.slug))].sort();
    const have = Object.keys(ar[kind] || {}).sort();
    assert.deepStrictEqual(have, want, t.id + '/' + kind + ': il brief deve avere esattamente queste voci');
    have.forEach((k) => {
      const [it, en] = ar[kind][k];
      assert.ok(it && it.length > 15 && /[.!]$/.test(it), t.id + '/' + kind + '/' + k + ': descrizione italiana completa');
      assert.ok(en && en.length > 20 && !/\.$/.test(en), t.id + '/' + kind + '/' + k + ': prompt inglese senza punto finale');
      assert.ok(!/["«»]/.test(en), t.id + '/' + kind + '/' + k + ': niente virgolette nel prompt');
      n++;
    });
  });
});
console.log('OK: brief delle immagini completo per ' + n + ' luoghi, pericoli e armi');
