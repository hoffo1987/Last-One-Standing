// Crea dist/last-one-standing.html con CSS e JS incorporati.
const fs = require('fs'), path = require('path');
const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
const content = fs.readdirSync(path.join(__dirname, '..', 'src', 'content')).filter((f) => f.endsWith('.js')).sort().map((f) => 'content/' + f);
// immagini in assets/ incorporate come data URI
const A = path.join(__dirname, '..', 'assets');
const DOCS = path.join(__dirname, '..', 'docs');
// due modi di includere le immagini: incorporate (file unico, per l'artifact) oppure come file
// separati con l'impronta del contenuto nel nome (per il sito: pagina più leggera e cache lunga)
const inline = (f, type) => 'data:' + type + ';base64,' + fs.readFileSync(path.join(A, f)).toString('base64');
const written = new Set();
const linked = (f) => {
  const buf = fs.readFileSync(path.join(A, f));
  const hash = require('crypto').createHash('sha1').update(buf).digest('hex').slice(0, 10);
  const name = 'img/' + f.replace(/\//g, '-').replace(/(\.\w+)$/, '.' + hash + '$1');
  const dest = path.join(DOCS, name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!written.has(dest)) { fs.writeFileSync(dest, buf); written.add(dest); }
  return name;
};
function assetsFor(uri) {
  const arene = {};
  fs.readdirSync(path.join(A, 'arene')).filter((f) => f.endsWith('.webp')).forEach((f) => (arene[f.replace('.webp', '')] = uri('arene/' + f, 'image/webp')));
  const sagome = fs.readdirSync(path.join(A, 'sagome')).filter((f) => f.endsWith('.webp')).sort().map((f) => uri('sagome/' + f, 'image/webp'));
  // Le armi sono disponibili anche nel file portatile; i grandi fondali
  // dell'atlante restano esterni nella sola versione web.
  const atlas = {};
  const MIME = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', avif: 'image/avif' };
  {
    fs.readdirSync(path.join(A, 'arene'), { withFileTypes: true }).filter((d) => d.isDirectory()).forEach((th) => {
      fs.readdirSync(path.join(A, 'arene', th.name), { withFileTypes: true }).filter((d) => d.isDirectory() && (uri === linked || d.name === 'armi')).forEach((kd) => {
        fs.readdirSync(path.join(A, 'arene', th.name, kd.name)).forEach((f) => {
          const m = f.match(/^(.+)\.(webp|png|jpe?g|avif)$/i); if (!m) return;
          ((atlas[th.name] = atlas[th.name] || {})[kd.name] = atlas[th.name][kd.name] || {})[m[1].toLowerCase()] = uri('arene/' + th.name + '/' + kd.name + '/' + f, MIME[m[2].toLowerCase()]);
        });
      });
    });
  }
  // pennellate, sigilli e grana degli «stacchi»: maschere trasparenti, piccole, incorporate anche nel file portatile
  // Il «look»: forme, impatto, mezzitoni e fasce sugli occhi sono piccoli e vanno ovunque; fondali delle arene,
  // volti e vincitori a figura intera sono grandi e restano esterni nella sola versione web (come l'atlante).
  const web = uri === linked;
  const fx = { pennellate: [], sigilli: {}, grana: null, forme: {}, impatto: null, mezzitoni: null, occhi: {}, fondali: {}, volti: {}, vincitori: {} };
  if (fs.existsSync(path.join(A, 'fx'))) fs.readdirSync(path.join(A, 'fx')).sort().forEach((f) => {
    const u = () => uri('fx/' + f, 'image/webp'); let m;
    if (/^pennellata-\d+\.webp$/.test(f)) fx.pennellate.push(u());
    else if ((m = f.match(/^sigillo-([\w-]+)\.webp$/))) fx.sigilli[m[1]] = u();
    else if (f === 'grana.webp') fx.grana = u();
    else if ((m = f.match(/^forma-([\w-]+)\.webp$/))) fx.forme[m[1]] = u();
    else if (f === 'impatto.webp') fx.impatto = u();
    else if (f === 'mezzitoni.webp') fx.mezzitoni = u();
    else if ((m = f.match(/^occhi-([mfn]-\d+)\.webp$/))) fx.occhi[m[1]] = u();
    else if (web && (m = f.match(/^fondale-([\w-]+)\.webp$/))) fx.fondali[m[1]] = u();
    else if (web && (m = f.match(/^volto-([mfn]-\d+)\.webp$/))) fx.volti[m[1]] = u();
  });
  if (web && fs.existsSync(path.join(A, 'vincitori'))) fs.readdirSync(path.join(A, 'vincitori')).sort().forEach((f) => {
    const m = f.match(/^vincitore-([mfn]-\d+)\.webp$/); if (m) fx.vincitori[m[1]] = uri('vincitori/' + f, 'image/webp');
  });
  return 'window.LOS_ASSETS = ' + JSON.stringify({ logo: uri('logo.webp', 'image/webp'), icona: uri('icona.webp', 'image/webp'), favicon: uri('favicon.png', 'image/png'), panoramica: uri('panoramica.webp', 'image/webp'), sagome, arene, atlas, fx }) + ';';
}
const engineScripts = ['data-core.js', 'data-themes.js', ...content, 'engine-systems.js', 'engine-geography.js', 'engine.js'];
const appScripts = ['art.js', 'atlas.js', 'anim.js', 'look.js', 'regia.js', 'simulator.js', 'replay.js', 'experiments.js', 'map-view.js', 'studio.js', 'photo-search.js', 'ui.js'];
const scripts = [...engineScripts, ...appScripts];
// Impronta dei sorgenti, indipendente dai fine riga del checkout e dagli output generati.
const buildHash = require('crypto').createHash('sha256');
for (const f of [...scripts, 'style.css', 'look.css', 'shell.html']) buildHash.update(f + '\0' + src(f).replace(/\r\n/g, '\n') + '\0');
buildHash.update(fs.readFileSync(__filename, 'utf8').replace(/\r\n/g, '\n'));
const buildId = buildHash.digest('hex');
const engineCode = engineScripts.map(src).join('\n;\n');
const code = 'window.LOS_BUILD = ' + JSON.stringify(buildId) + ';\n;\n' + appScripts.map(src).join('\n;\n');
const page = (assetsJs) => {
  const js = assetsJs + '\n;\n' + code;
  if (/<\/script/i.test(js + engineCode)) throw new Error('Il JS contiene </script>');
  return src('shell.html').replace('/*@CSS@*/', () => src('style.css') + '\n' + src('look.css')).replace('/*@ENGINE@*/', () => engineCode).replace('/*@JS@*/', () => js);
};
fs.rmSync(path.join(DOCS, 'img'), { recursive: true, force: true });
const html = page(assetsFor(inline));
const webHtml = page(assetsFor(linked));
const out = path.join(__dirname, '..', 'dist', 'last-one-standing.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
// versione completa per il web (GitHub Pages): documento intero con anteprima dei link e icone
const head = '<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  '<meta property="og:type" content="website">\n<meta property="og:title" content="Last One Standing">\n<meta property="og:description" content="Simulatore di battle royale in italiano: crea il cast, scegli l\'arena e guarda chi resta in piedi.">\n<meta property="og:image" content="anteprima.jpg">\n<meta name="twitter:card" content="summary_large_image">\n' +
  '<link rel="icon" type="image/png" href="favicon.png">\n<link rel="apple-touch-icon" href="icona-180.png">\n<meta name="theme-color" content="#06231d">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n';
fs.writeFileSync(path.join(__dirname, '..', 'dist', 'index.html'), head + html + '\n</body>\n</html>\n');
fs.mkdirSync(DOCS, { recursive: true });
const preload = '<link rel="preload" as="image" href="' + linked('logo.webp') + '">\n';
fs.writeFileSync(path.join(DOCS, 'index.html'), head.replace('</head>', preload + '</head>') + webHtml + '\n</body>\n</html>\n');
['anteprima.jpg', 'favicon.png', 'icona-180.png'].forEach((f) => { fs.copyFileSync(path.join(A, f), path.join(__dirname, '..', 'dist', f)); fs.copyFileSync(path.join(A, f), path.join(DOCS, f)); });
fs.writeFileSync(path.join(DOCS, '.nojekyll'), '');
console.log('Creato', path.relative(process.cwd(), out), (html.length / 1024).toFixed(1) + ' KB · sito web', (fs.statSync(path.join(DOCS, 'index.html')).size / 1024).toFixed(1) + ' KB + ' + written.size + ' immagini');
