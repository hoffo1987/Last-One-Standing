// Copertura delle armi effettivamente ottenibili e conservazione dell'alfa WebP.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(root, 'src/content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f), 'engine.js']) require(path.join(root, 'src', f));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/armi-manifest.json'), 'utf8'));
const assets = { atlas: {} };
for (const m of manifest) ((assets.atlas[m.arena] ||= {}).armi ||= {})[m.key] = m.file;
const ctx = vm.createContext({ LOS_ASSETS: assets });
vm.runInContext(fs.readFileSync(path.join(root, 'src/atlas.js'), 'utf8'), ctx);
const atlas = ctx.LOS_ATLAS, want = new Set(); let variants = 0;
for (const theme of LOS_DATA.themes) {
  const weapons = [...theme.lex.arma, ...(LOS.buildPools(theme, [], false).world?.items || []).filter(it => it.type === 'arma').map(it => it.name)];
  for (const name of weapons) {
    const key = atlas.weaponKey(name); want.add(theme.id + '/' + key); variants++;
    assert.ok(atlas.has(theme.id, 'armi', key), theme.id + ': immagine mancante per ' + name);
    const html = atlas.pic(theme.id, 'armi', name, theme.hue);
    assert.match(html, /<img /); assert.doesNotMatch(html, /<svg/);
    assert.match(html, /alt=""/); assert.match(html, /loading="lazy"/);
  }
}
assert.deepEqual([...new Set(manifest.map(m => m.arena + '/' + m.key))].sort(), [...want].sort(), 'Manifesto esattamente allineato al repertorio');
assert.equal(manifest.length, want.size, 'Un solo file per modello');
for (const m of manifest) {
  assert.equal(m.file, 'assets/arene/' + m.arena + '/armi/' + m.key + '.webp');
  const data = fs.readFileSync(path.join(root, m.file));
  assert.equal(data.toString('ascii', 0, 4), 'RIFF'); assert.equal(data.toString('ascii', 8, 12), 'WEBP');
  assert.equal(data.toString('ascii', 12, 16), 'VP8X');
  assert.ok(data[20] & 0x10, m.file + ': canale alfa necessario');
  const width = 1 + data.readUIntLE(24, 3), height = 1 + data.readUIntLE(27, 3);
  assert.ok(width <= 384 && height <= 384 && width >= 256 && height >= 256);
  assert.ok(data.length < 150000, m.file + ': risorsa troppo pesante');
  assert.equal(m.generator, 'image_gen'); assert.ok(m.prompt.length > 100);
}
assert.equal(atlas.weaponKey('una pistola smart con modalità silenziosa'), 'pistola-smart');
assert.equal(atlas.weaponKey('un’accetta da soccorso con presa in cuoio'), 'accetta-da-soccorso');
assert.match(atlas.pic('classico', 'armi', 'un oggetto personalizzato sconosciuto', 140), /<svg/);
for (const file of ['docs/index.html', 'dist/last-one-standing.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const data = JSON.parse(html.match(/window\.LOS_ASSETS = (\{[^\n]+\});/)[1]);
  for (const m of manifest) {
    const url = data.atlas[m.arena]?.armi?.[m.key];
    assert.ok(url, file + ': immagine assente per ' + m.name);
    if (file.startsWith('dist/')) assert.match(url, /^data:image\/webp;base64,/, 'Il file portatile deve incorporare le armi');
    else assert.ok(fs.existsSync(path.join(root, 'docs', url)), file + ': risorsa web assente');
  }
}
console.log('OK: ' + manifest.length + ' modelli illustrati, ' + variants + ' nomi risolti nelle dieci arene, alfa WebP, risorse leggere e ripiego per nomi personalizzati.');
