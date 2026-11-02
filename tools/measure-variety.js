// node tools/measure-variety.js [partite per arena] [motore alternativo]
// Stesso cast e stessi semi; identifica le ripetizioni sostituendo i nomi nell'HTML.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const src = path.join(__dirname, '..', 'src'), c = vm.createContext({});
for (const f of ['data-core.js', 'data-themes.js', ...fs.readdirSync(path.join(src, 'content')).filter(f => f.endsWith('.js')).sort().map(f => 'content/' + f)]) vm.runInContext(fs.readFileSync(path.join(src, f), 'utf8'), c);
vm.runInContext(fs.readFileSync(process.argv[3] || path.join(src, 'engine.js'), 'utf8'), c);
for (const theme of c.LOS_DATA.themes) {
  let repeated = 0, total = 0;
  for (let i = 0; i < +(process.argv[2] || 10); i++) {
    const seen = new Set(), seed = 'varieta-' + i;
    const result = c.LOS.simulate({ cast: c.LOS.randomCast(24, seed, 2), theme: theme.id, seed, maxDays: 20, teamsAllied: true });
    for (const phase of result.phases) for (const ev of phase.events) {
      if (ev.note || ev.origin === 'sys') continue;
      const key = ev.html.replace(/<b class="nm"[^>]*>[^<]*<\/b>/g, '{P}').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      total++; if (seen.has(key)) repeated++; seen.add(key);
    }
  }
  console.log(theme.id.padEnd(10) + ' ' + (100 * repeated / total).toFixed(1) + '% ripetizioni su ' + total + ' eventi');
}
