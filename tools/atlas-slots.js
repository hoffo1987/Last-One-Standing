// Elenca tutte le immagini che la guida delle arene può mostrare, con nome del file,
// formato, dimensioni, priorità e una traccia per generarle.
// Scrive docs-dev/immagini-arene.md e docs-dev/immagini-arene.csv e dice quante sono già presenti.
//   node tools/atlas-slots.js            elenco completo
//   node tools/atlas-slots.js --mancanti solo quelle che mancano (nel riepilogo a schermo)
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'src/data-core.js')); require(path.join(ROOT, 'src/data-themes.js'));
fs.readdirSync(path.join(ROOT, 'src/content')).filter((f) => f.endsWith('.js')).sort().forEach((f) => require(path.join(ROOT, 'src/content', f)));
require(path.join(ROOT, 'src/engine.js')); require(path.join(ROOT, 'src/atlas.js'));
const D = global.LOS_DATA, L = global.LOS, A = global.LOS_ATLAS;

const SPEC = {
  luoghi: { ratio: '16:9', size: '1280×720', fondo: 'pieno', peso: '≤ 150 KB', note: 'Veduta del luogo, soggetto al centro: sul telefono si vede una striscia verticale centrale.' },
  pericoli: { ratio: '4:3', size: '960×720', fondo: 'pieno, scuro', peso: '≤ 120 KB', note: 'Ritratto da manifesto «ricercato»: soggetto centrato, sguardo verso chi guarda.' },
  armi: { ratio: '1:1', size: '512×512', fondo: 'trasparente', peso: '≤ 60 KB', note: 'Oggetto singolo, centrato, con circa il 12% di margine; leggibile anche a 60 px.' },
  meteo: { ratio: '16:10', size: '1200×750', fondo: 'pieno', peso: '≤ 120 KB', note: 'Paesaggio dell\'arena con quel tempo: deve leggersi a colpo d\'occhio anche piccolo.' },
  disastri: { ratio: '16:9', size: '1280×720', fondo: 'pieno', peso: '≤ 150 KB', note: 'Il momento del disastro, drammatico; tenere il soggetto nella fascia centrale.' },
  oggetti: { ratio: '1:1', size: '512×512', fondo: 'trasparente', peso: '≤ 60 KB', note: 'Oggetto singolo in versione dell\'arena, centrato, con circa il 12% di margine; viene mostrato su un alone colorato.' },
};
const PALETTE = {
  classico: 'ambra, ocra e marroni caldi da tramonto nel bosco', fantasy: 'viola, magenta e blu notte con bagliori magici', scifi: 'blu, ciano e acciaio con luci al neon',
  zombie: 'verdi malati, grigi e ruggine di città abbandonata', royale: 'blu tropicale, verde giungla e arancio da tramonto', horror: 'cremisi, nero e oro di candela',
  wasteland: 'ocra, ruggine e sabbia sotto un sole bruciato', liceo: 'rosa, lilla e pastello da corridoio scolastico', ufficio: 'verde petrolio, grigi e luci al neon da open space',
};
const STYLE = 'Illustrazione digitale pittorica nello stile dei banner di Last One Standing (assets/arene/<arena>.webp): pennellate morbide, luce drammatica, contorni puliti, nessun testo, nessun logo, nessuna persona realistica riconoscibile.';
const strip = (x) => x.replace(/^(il |lo |la |l'|i |gli |le |un |uno |una |un'|delle |dei |degli |del |della |dell')/i, '');
const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const existing = (theme, kind, key) => ['webp', 'png', 'jpg', 'jpeg', 'avif'].some((e) => fs.existsSync(path.join(ROOT, 'assets/arene', theme, kind, key + '.' + e)));

const rows = [];
D.themes.forEach((t) => {
  const E = D.eco.arenas[t.id] || {}, pal = PALETTE[t.id] || '';
  const seen = new Set();
  const add = (kind, key, subject, desc, prio, extra) => {
    if (seen.has(kind + '/' + key)) return; seen.add(kind + '/' + key);
    const sp = SPEC[kind];
    const trasp = sp.fondo === 'trasparente' ? ' Sfondo trasparente.' : '';
    const prompt = cap(subject) + (desc ? ': ' + desc : '') + '. Arena «' + t.name + '» (' + t.tag.replace(/\.$/, '') + '). Palette: ' + pal + '. Formato ' + sp.ratio + '.' + trasp;
    rows.push({ arena: t.id, nome: t.name, kind, file: 'assets/arene/' + t.id + '/' + kind + '/' + key + '.webp', soggetto: subject, desc: desc || '', prio, ratio: sp.ratio, size: sp.size, fondo: sp.fondo, peso: sp.peso, prompt, ok: existing(t.id, kind, key), extra: extra || '' });
  };
  t.lex.luogo.forEach((x) => add('luoghi', A.slug(x), cap(strip(x)), 'il luogo dell\'arena visto da vicino', 'alta'));
  t.lex.mostro.forEach((x) => add('pericoli', A.slug(x), cap(strip(x)), t.soft ? 'figura minacciosa ma non violenta' : 'creatura o minaccia pronta ad attaccare', 'alta'));
  t.lex.arma.slice(0, 10).forEach((x) => add('armi', A.slug(x), cap(strip(x)), t.soft ? 'oggetto d\'ufficio o di scuola usato come arma impropria' : 'arma o oggetto usato come arma', 'media'));
  (E.meteo || []).forEach((w) => add('meteo', A.slug(w.n), w.n, w.d, 'alta'));
  const names = Object.assign({}, (D.items.names || {})._ || {}, (D.items.names || {})[t.id] || {});
  (D.items.order || []).forEach((k) => {
    const ty = (t.soft && (D.items.typesSoft || {})[k]) || D.items.types[k];
    const ex = (names[k] || []).slice(0, 2).map(strip).join(', ');
    add('oggetti', k, ty.label + (ex ? ' (per esempio ' + ex + ')' : ''), ty.desc, 'alta');
  });
  const base = new Set(L.buildPools(t, [], false).disasters.map((d) => d.n));
  L.buildPools(t, [], !t.noAdult).disasters.forEach((d, i) => add('disastri', A.slug(d.n), d.n, d.intro, base.has(d.n) ? (i < 9 ? 'alta' : 'media') : 'bassa', base.has(d.n) ? '' : '18+'));
});

// tabella CSV
const csvq = (v) => '"' + String(v).replace(/"/g, '""') + '"';
const csv = ['arena,sezione,file,soggetto,descrizione,priorita,proporzioni,dimensioni,sfondo,peso,presente,note,traccia'].concat(rows.map((r) => [r.arena, r.kind, r.file, r.soggetto, r.desc, r.prio, r.ratio, r.size, r.fondo, r.peso, r.ok ? 'si' : 'no', r.extra, r.prompt].map(csvq).join(','))).join('\n');
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.csv'), csv + '\n');

// documento
const by = (f) => rows.reduce((m, r) => ((m[f(r)] = m[f(r)] || []).push(r), m), {});
const tot = rows.length, have = rows.filter((r) => r.ok).length;
const kinds = Object.keys(SPEC);
let md = '# Immagini delle arene\n\n_File generato da `node tools/atlas-slots.js`: non modificarlo a mano._\n\n' +
  'La guida di ogni arena mostra un\'immagine per ogni luogo, pericolo, arma, meteo, disastro e oggetto. Se il file esiste, il sito usa quello; altrimenti disegna un\'illustrazione provvisoria con i colori dell\'arena. ' +
  'Basta mettere i file nella cartella indicata e ricostruire (`node tools/build.js`): non serve toccare il codice.\n\n' +
  '**Presenti: ' + have + ' su ' + tot + '.**\n\n## Regole per tutti i file\n\n' +
  '- **Formato**: WebP (qualità 80–85). Vanno bene anche PNG, JPG o AVIF con lo stesso nome; per gli sfondi trasparenti usare WebP o PNG con canale alfa.\n' +
  '- **Colore**: sRGB, senza profili strani. Nessun testo, logo o filigrana dentro l\'immagine (i nomi li scrive il sito).\n' +
  '- **Nomi**: esattamente quelli dell\'elenco, tutto minuscolo, senza accenti, parole separate da trattini.\n' +
  '- **Stile**: ' + STYLE + '\n' +
  '- **Il file unico** `dist/last-one-standing.html` non incorpora queste immagini (resterebbe troppo pesante): le mostra solo il sito.\n\n' +
  '| Sezione | Proporzioni | Dimensioni consigliate | Sfondo | Peso | Note |\n| --- | --- | --- | --- | --- | --- |\n' +
  kinds.map((k) => '| ' + k + ' | ' + SPEC[k].ratio + ' | ' + SPEC[k].size + ' | ' + SPEC[k].fondo + ' | ' + SPEC[k].peso + ' | ' + SPEC[k].note + ' |').join('\n') +
  '\n\n### Scorciatoia per i disastri\n\nI disastri sono tanti. Oltre all\'immagine del singolo disastro si può fornire un\'immagine per famiglia, usata da tutti i disastri e i meteo di quella famiglia che non hanno la loro: `assets/arene/<arena>/disastri/_<famiglia>.webp` (e lo stesso in `meteo/`). Famiglie: ' +
  A.families.filter((f, i, a) => a.indexOf(f) === i).map((f) => '`' + f + '`').join(', ') + '. Nell\'elenco qui sotto ogni disastro riporta la sua famiglia.\n\n' +
  '### Priorità\n\n- **alta**: si vede subito (luoghi, pericoli, meteo, oggetti e i primi nove disastri di ogni arena).\n- **media**: armi e disastri visibili con «Mostra tutti».\n- **bassa**: disastri che compaiono solo con i contenuti 18+.\n\n## Riepilogo\n\n| Arena | ' + kinds.join(' | ') + ' | Totale |\n| --- |' + kinds.map(() => ' --- |').join('') + ' --- |\n' +
  D.themes.map((t) => { const rs = rows.filter((r) => r.arena === t.id); return '| ' + t.name + ' | ' + kinds.map((k) => rs.filter((r) => r.kind === k).length).join(' | ') + ' | ' + rs.length + ' |'; }).join('\n') +
  '\n| **Tutte** | ' + kinds.map((k) => rows.filter((r) => r.kind === k).length).join(' | ') + ' | **' + tot + '** |\n';
Object.entries(by((r) => r.arena)).forEach(([arena, rs]) => {
  md += '\n## ' + rs[0].nome + '\n\nCartella: `assets/arene/' + arena + '/`. Palette: ' + PALETTE[arena] + '.\n';
  kinds.forEach((k) => {
    const list = rs.filter((r) => r.kind === k); if (!list.length) return;
    md += '\n### ' + cap(k) + ' (' + SPEC[k].ratio + ', ' + SPEC[k].size + ', sfondo ' + SPEC[k].fondo + ')\n\n| | File | Soggetto | Priorità | Traccia |\n| --- | --- | --- | --- | --- |\n' +
      list.map((r) => '| ' + (r.ok ? '✓' : '') + ' | `' + r.file.split('/').slice(3).join('/') + '` | ' + r.soggetto.replace(/\|/g, '/') + (k === 'disastri' ? ' · famiglia `' + A.family(r.soggetto, r.desc, arena) + '`' : '') + (r.extra ? ' · ' + r.extra : '') + ' | ' + r.prio + ' | ' + r.prompt.replace(/\|/g, '/') + ' |').join('\n') + '\n';
  });
});
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.md'), md);

const miss = rows.filter((r) => !r.ok);
console.log('Immagini previste: ' + tot + ' · presenti: ' + have + ' · mancanti: ' + miss.length);
kinds.forEach((k) => console.log('  ' + k.padEnd(9) + rows.filter((r) => r.kind === k).length + ' (alta priorità: ' + rows.filter((r) => r.kind === k && r.prio === 'alta').length + ')'));
if (process.argv.includes('--mancanti')) miss.forEach((r) => console.log(r.file));
console.log('Scritti docs-dev/immagini-arene.md e docs-dev/immagini-arene.csv');
