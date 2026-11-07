// Stessi controlli locali e in CI, senza installare dipendenze.
const fs = require('node:fs'), path = require('node:path'), { spawnSync } = require('node:child_process');
const root = path.join(__dirname, '..');
const sourceFiles = ['src', 'api'].flatMap((d) => fs.existsSync(path.join(root, d)) ? fs.readdirSync(path.join(root, d)).filter(f => f.endsWith('.js')).map(f => d + '/' + f) : []);
const tests = fs.readdirSync(__dirname).filter(f => /^test-.*\.js$/.test(f) && f !== 'test-engine.js').sort();
const commands = [...sourceFiles.map(f => ['--check', f]), ['tools/lint-content.js'], ...tests.map(f => ['tools/' + f])];
for (const args of commands) {
  console.log('\n> node ' + args.join(' '));
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  if (result.error) { console.error(result.error.message); process.exit(1); }
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log('\nTutti i controlli mirati sono passati.');
