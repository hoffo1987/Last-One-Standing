// Crea dist/last-one-standing.html con CSS e JS incorporati.
const fs = require('fs'), path = require('path');
const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
const content = fs.readdirSync(path.join(__dirname, '..', 'src', 'content')).filter((f) => f.endsWith('.js')).sort().map((f) => 'content/' + f);
// immagini in assets/ incorporate come data URI
const A = path.join(__dirname, '..', 'assets');
const uri = (f, type) => 'data:' + type + ';base64,' + fs.readFileSync(path.join(A, f)).toString('base64');
const arene = {};
fs.readdirSync(path.join(A, 'arene')).filter((f) => f.endsWith('.webp')).forEach((f) => (arene[f.replace('.webp', '')] = uri('arene/' + f, 'image/webp')));
const assetsJs = 'window.LOS_ASSETS = ' + JSON.stringify({ logo: uri('logo.webp', 'image/webp'), emblema: uri('emblema.webp', 'image/webp'), favicon: uri('favicon.png', 'image/png'), arene }) + ';';
const js = [assetsJs].concat(['data-core.js', 'data-themes.js', ...content, 'engine.js', 'art.js', 'ui.js'].map(src)).join('\n;\n');
if (/<\/script/i.test(js)) throw new Error('Il JS contiene </script>');
const html = src('shell.html').replace('/*@CSS@*/', () => src('style.css')).replace('/*@JS@*/', () => js);
const out = path.join(__dirname, '..', 'dist', 'last-one-standing.html');
fs.writeFileSync(out, html);
console.log('Creato', path.relative(process.cwd(), out), (html.length / 1024).toFixed(1) + ' KB');
