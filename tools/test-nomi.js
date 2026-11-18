// Nessuna funzione dichiarata due volte nello stesso file: la seconda sostituirebbe in silenzio la prima
// (è successo con renderCast: la telecronaca cancellava la pagina dei Concorrenti).
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'src');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).map((f) => path.join(dir, f))
  .concat(fs.readdirSync(path.join(dir, 'skin')).filter((f) => f.endsWith('.js')).map((f) => path.join(dir, 'skin', f)));
let bad = 0;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  // dichiarazioni allo stesso rientro dentro il modulo (due spazi): sono quelle che condividono lo stesso ambito
  const names = [...src.matchAll(/\n {2}(?:async )?function (\w+)\s*\(/g)].map((m) => m[1]);
  const dup = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
  if (dup.length) { bad++; console.error('✗ ' + path.relative(dir, f) + ': funzioni dichiarate due volte: ' + dup.join(', ')); }
}
if (bad) process.exit(1);
console.log('OK: nessuna funzione dichiarata due volte in ' + files.length + ' file.');
