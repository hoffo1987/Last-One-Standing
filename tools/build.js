// Crea dist/last-one-standing.html con CSS e JS incorporati.
const fs = require('fs'), path = require('path');
const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
const content = fs.readdirSync(path.join(__dirname, '..', 'src', 'content')).filter((f) => f.endsWith('.js')).sort().map((f) => 'content/' + f);
// immagini in assets/ incorporate come data URI
const A = path.join(__dirname, '..', 'assets');
const uri = (f, type) => 'data:' + type + ';base64,' + fs.readFileSync(path.join(A, f)).toString('base64');
const arene = {};
fs.readdirSync(path.join(A, 'arene')).filter((f) => f.endsWith('.webp')).forEach((f) => (arene[f.replace('.webp', '')] = uri('arene/' + f, 'image/webp')));
const sagome = fs.readdirSync(path.join(A, 'sagome')).filter((f) => f.endsWith('.webp')).sort().map((f) => uri('sagome/' + f, 'image/webp'));
const assetsJs = 'window.LOS_ASSETS = ' + JSON.stringify({ logo: uri('logo.webp', 'image/webp'), icona: uri('icona.webp', 'image/webp'), favicon: uri('favicon.png', 'image/png'), panoramica: uri('panoramica.webp', 'image/webp'), sagome, arene }) + ';';
const js = [assetsJs].concat(['data-core.js', 'data-themes.js', ...content, 'engine.js', 'art.js', 'anim.js', 'ui.js'].map(src)).join('\n;\n');
if (/<\/script/i.test(js)) throw new Error('Il JS contiene </script>');
const html = src('shell.html').replace('/*@CSS@*/', () => src('style.css')).replace('/*@JS@*/', () => js);
const out = path.join(__dirname, '..', 'dist', 'last-one-standing.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
// versione completa per il web (GitHub Pages): documento intero con anteprima dei link e icone
const head = '<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  '<meta property="og:type" content="website">\n<meta property="og:title" content="Last One Standing">\n<meta property="og:description" content="Simulatore di battle royale in italiano: crea il cast, scegli l\'arena e guarda chi resta in piedi.">\n<meta property="og:image" content="anteprima.jpg">\n<meta name="twitter:card" content="summary_large_image">\n' +
  '<link rel="icon" type="image/png" href="favicon.png">\n<link rel="apple-touch-icon" href="icona-180.png">\n<meta name="theme-color" content="#06231d">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n';
fs.writeFileSync(path.join(__dirname, '..', 'dist', 'index.html'), head + html + '\n</body>\n</html>\n');
const DOCS = path.join(__dirname, '..', 'docs');
fs.mkdirSync(DOCS, { recursive: true });
fs.copyFileSync(path.join(__dirname, '..', 'dist', 'index.html'), path.join(DOCS, 'index.html'));
['anteprima.jpg', 'favicon.png', 'icona-180.png'].forEach((f) => { fs.copyFileSync(path.join(A, f), path.join(__dirname, '..', 'dist', f)); fs.copyFileSync(path.join(A, f), path.join(DOCS, f)); });
fs.writeFileSync(path.join(DOCS, '.nojekyll'), '');
console.log('Creato', path.relative(process.cwd(), out), (html.length / 1024).toFixed(1) + ' KB');
