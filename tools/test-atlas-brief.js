// Il brief delle immagini (tools/atlas-brief.js) deve coprire esattamente i luoghi, i pericoli
// e le armi che la guida delle arene mostra, con testi e prompt completi.
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'src/data-core.js')); require(path.join(ROOT, 'src/data-themes.js'));
fs.readdirSync(path.join(ROOT, 'src/content')).filter((f) => f.endsWith('.js')).sort().forEach((f) => require(path.join(ROOT, 'src/content', f)));
require(path.join(ROOT, 'src/engine.js')); require(path.join(ROOT, 'src/atlas.js'));
const D = global.LOS_DATA, A = global.LOS_ATLAS, B = require('./atlas-brief.js');
const itemsOf = (t, kind) => (kind === 'luoghi' ? global.LOS_GEOGRAPHY.describe(t,D.eco.arenas[t.id]).map(z=>z.name) : kind === 'pericoli' ? t.lex.mostro : t.lex.arma.slice(0, 10));
// la guida mostra le prime dieci armi: se cambia in src/ui.js, va cambiato anche qui e in atlas-slots
assert.ok(/t\.lex\.arma\.slice\(0, 10\)/.test(fs.readFileSync(path.join(ROOT, 'src/ui.js'), 'utf8')), 'la guida mostra ancora le prime dieci armi');
let n = 0;
assert.deepStrictEqual(Object.keys(B.arenas).sort(), D.themes.map((t) => t.id).sort(), 'una voce del brief per ogni arena');
D.themes.forEach((t) => {
  const ar = B.arenas[t.id];
  assert.ok(ar.look && ar.light && ar.prop && typeof ar.facet === 'string', t.id + ': atmosfera, luce e stile');
  ['luoghi', 'pericoli', 'armi'].forEach((kind) => {
    const want = [...new Set(itemsOf(t, kind).map(A.slug))].sort();
    const have = Object.keys(ar[kind] || {}).sort();
    assert.deepStrictEqual(have, want, t.id + '/' + kind + ': il brief deve avere esattamente queste voci');
    have.forEach((k) => {
      const [it, en, motion] = ar[kind][k], id = t.id + '/' + kind + '/' + k;
      assert.ok(it && it.length > 15 && /[.!]$/.test(it), id + ': descrizione italiana completa');
      assert.ok(en && en.length > 20 && /\.$/.test(en) && /^[A-Z]/.test(en), id + ': scena in inglese in frasi complete');
      assert.ok(!/["«»]/.test(en) && !/\bno (people|text|readable)\b/i.test(en), id + ': niente virgolette né negazioni nella scena (vanno in --no)');
      if (kind === 'armi') assert.strictEqual(motion, undefined, id + ': le armi non hanno il video');
      else assert.ok(motion && motion.length > 25 && /\.$/.test(motion), id + ': movimento per il video in loop');
      n++;
    });
  });
});
console.log('OK: brief delle immagini completo per ' + n + ' luoghi, pericoli e armi');
