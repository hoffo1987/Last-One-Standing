// Crea dist/last-one-standing.html con CSS e JS incorporati.
const fs = require('fs'), path = require('path');
const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
const js = ['data-core.js', 'data-themes.js', 'engine.js', 'ui.js'].map(src).join('\n;\n');
if (/<\/script/i.test(js)) throw new Error('Il JS contiene </script>');
const html = src('shell.html').replace('/*@CSS@*/', () => src('style.css')).replace('/*@JS@*/', () => js);
const out = path.join(__dirname, '..', 'dist', 'last-one-standing.html');
fs.writeFileSync(out, html);
console.log('Creato', path.relative(process.cwd(), out), (html.length / 1024).toFixed(1) + ' KB');
