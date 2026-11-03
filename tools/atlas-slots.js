// Documentazione delle immagini della guida delle arene.
// Per ora copre luoghi, pericoli e armi: per ognuno nome del file, cosa mostrare e un prompt
// personalizzato (scritto in tools/atlas-brief.js), più le regole di formato e composizione.
// Scrive docs-dev/immagini-arene.md e docs-dev/immagini-arene.csv e dice quante immagini ci sono già.
//   node tools/atlas-slots.js             aggiorna i documenti
//   node tools/atlas-slots.js --mancanti  elenca anche i file che mancano
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'src/data-core.js')); require(path.join(ROOT, 'src/data-themes.js'));
fs.readdirSync(path.join(ROOT, 'src/content')).filter((f) => f.endsWith('.js')).sort().forEach((f) => require(path.join(ROOT, 'src/content', f)));
require(path.join(ROOT, 'src/engine.js')); require(path.join(ROOT, 'src/atlas.js'));
const D = global.LOS_DATA, A = global.LOS_ATLAS;
const BRIEF = require('./atlas-brief.js');

const KINDS = ['luoghi', 'pericoli', 'armi'];
// le voci che la guida mostra davvero (devono restare allineate con src/ui.js)
const itemsOf = (t, kind) => (kind === 'luoghi' ? t.lex.luogo : kind === 'pericoli' ? t.lex.mostro : t.lex.arma.slice(0, 10));
const strip = (x) => x.replace(/^(il |lo |la |l'|i |gli |le |un |uno |una |un'|delle |dei |degli |del |della |dell')/i, '');
const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const EXT = ['webp', 'png', 'jpg', 'jpeg', 'avif'];
const existing = (theme, kind, key) => EXT.some((e) => fs.existsSync(path.join(ROOT, 'assets/arene', theme, kind, key + '.' + e)));

const SPEC = {
  luoghi: {
    titolo: 'Luoghi', ratio: '16:9', size: '1280 × 720 px', min: '960 × 540 px', fondo: 'pieno', peso: '150 KB',
    sito: 'Scheda della zona nel capitolo Mappa. Al computer l\'immagine occupa la parte alta della scheda in 16:9, larga circa 270 px. Sul telefono diventa una colonna a sinistra di 120 × 140 px circa: si vede solo la **fascia centrale verticale**, poco meno di metà della larghezza.',
    comp: ['Il punto di riconoscimento del luogo (la Cornucopia, la torre, il bancone…) va nel **terzo centrale**.', 'Inquadratura ad altezza d\'occhio, profondità con un po\' di foschia sullo sfondo.', 'Nessuna persona: il luogo deve sembrare pronto per i concorrenti.', 'L\'immagine si vede piccola: servono contrasti netti tra primo piano e sfondo e poche cose ben riconoscibili, non una scena affollata.'],
  },
  pericoli: {
    titolo: 'Pericoli', ratio: '4:3', size: '960 × 720 px', min: '800 × 600 px', fondo: 'pieno e scuro', peso: '120 KB',
    sito: 'Manifesto «ricercato» appeso nel capitolo Mappa: carta color avorio, puntina rossa, leggermente inclinato. L\'immagine è un 4:3 largo circa 190 px al computer e 150 px sul telefono, con il nome scritto sotto dal sito.',
    comp: ['Un solo soggetto (o un gruppo che si legge come uno), **centrato e rivolto verso chi guarda**.', 'Testa e occhi nella metà alta: il ritaglio toglie pochissimo dai bordi, ma i bordi devono essere sacrificabili.', 'Sfondo scuro che sfuma quasi al nero ai bordi: sul manifesto chiaro fa da cornice.', 'Nel Liceo e nell\'Ufficio sono **caricature comiche**, mai minacciose o violente, e non devono somigliare a persone reali.'],
  },
  armi: {
    titolo: 'Armi', ratio: '1:1', size: '512 × 512 px', min: '384 × 384 px', fondo: 'trasparente', peso: '60 KB',
    sito: 'Rastrelliera dell\'armeria nel capitolo Mappa: ogni arma sta in una piastrella arrotondata di **62 × 62 px**, sia su fondo chiaro sia su fondo scuro (tema notte).',
    comp: ['Un solo oggetto, **sfondo completamente trasparente** (WebP o PNG con canale alfa).', 'Disposto in diagonale dal basso a sinistra all\'alto a destra, con circa il **12% di margine** su ogni lato.', 'Sagoma netta con un sottile contorno scuro, così si legge su fondo chiaro e scuro; niente ombra a terra, niente mani.', 'Deve riconoscersi a 62 px: forme semplici, pochi dettagli minuti.'],
  },
};

const prompt = (t, kind, en) => {
  const B = BRIEF.arenas[t.id], soft = !!t.soft;
  const extra = kind === 'pericoli' && soft ? ' Light-hearted comic caricature, not scary, not violent, not resembling any real person.' : kind === 'armi' && soft ? ' An everyday object used as a playful office or school prank, comic tone.' : '';
  return cap(en) + '. ' + cap(B.style) + '. ' + cap(BRIEF.style) + '. ' + cap(BRIEF.sections[kind].en) + '.' + extra + ' ' + cap(BRIEF.avoid) + '.';
};

// righe
const rows = [], missingBrief = [];
D.themes.forEach((t) => {
  const B = BRIEF.arenas[t.id] || {};
  KINDS.forEach((kind) => {
    const seen = new Set();
    itemsOf(t, kind).forEach((name) => {
      const key = A.slug(name); if (seen.has(key)) return; seen.add(key);
      const br = (B[kind] || {})[key];
      if (!br) { missingBrief.push(t.id + '/' + kind + '/' + key); return; }
      rows.push({ arena: t.id, nome: t.name, kind, key, label: cap(strip(name)), file: 'assets/arene/' + t.id + '/' + kind + '/' + key + '.webp', it: br[0], mini: cap(br[1]) + '.', prompt: prompt(t, kind, br[1]), ok: existing(t.id, kind, key) });
    });
  });
});
if (missingBrief.length) { console.error('Manca il brief per: ' + missingBrief.join(', ') + '\nAggiungilo in tools/atlas-brief.js.'); process.exit(1); }

// CSV
const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.csv'), ['arena,sezione,file,nome,cosa_mostrare,proporzioni,dimensioni,sfondo,peso_max,presente,prompt']
  .concat(rows.map((r) => [r.arena, r.kind, r.file, r.label, r.it, SPEC[r.kind].ratio, SPEC[r.kind].size, SPEC[r.kind].fondo, SPEC[r.kind].peso, r.ok ? 'si' : 'no', r.prompt].map(q).join(','))).join('\n') + '\n');

// documento
const tot = rows.length, have = rows.filter((r) => r.ok).length;
const count = (f) => rows.filter(f).length;
let md = '# Immagini delle arene: luoghi, pericoli e armi\n\n' +
  '_Generato da `node tools/atlas-slots.js` a partire da `tools/atlas-brief.js`: per cambiare un testo o un prompt modifica il brief e rigenera, non questo file._\n\n' +
  '**Presenti: ' + have + ' su ' + tot + '** (luoghi ' + count((r) => r.kind === 'luoghi' && r.ok) + '/' + count((r) => r.kind === 'luoghi') + ', pericoli ' + count((r) => r.kind === 'pericoli' && r.ok) + '/' + count((r) => r.kind === 'pericoli') + ', armi ' + count((r) => r.kind === 'armi' && r.ok) + '/' + count((r) => r.kind === 'armi') + '). Meteo, disastri e oggetti arriveranno in un secondo momento.\n\n' +
  '## In breve\n\n' +
  '1. Genera l\'immagine con il prompt della voce (in inglese, perché i generatori lo seguono meglio; sopra c\'è sempre la descrizione in italiano).\n' +
  '2. Esportala in **WebP** con le dimensioni della sua sezione e salvala con il **nome esatto** indicato, nella cartella indicata.\n' +
  '3. Lancia `node tools/build.js`: il sito la usa al posto dell\'illustrazione provvisoria. `node tools/atlas-slots.js` aggiorna i conteggi qui sopra (✓ accanto alle voci presenti).\n\n' +
  '## Regole comuni\n\n' +
  '- **Formato**: WebP con qualità 80–85. Si accettano anche PNG, JPG o AVIF con lo stesso nome (prevale il primo trovato tra webp, png, jpg, jpeg, avif). Profilo colore sRGB.\n' +
  '- **Nomi**: minuscolo, senza accenti né apostrofi, parole separate da trattini, proprio come nell\'elenco. Un nome diverso non viene trovato.\n' +
  '- **Niente testo** dentro le immagini: niente scritte, cartelli leggibili, loghi o filigrane. I nomi li scrive il sito.\n' +
  '- **Stile**: lo stesso dei banner delle arene (`assets/arene/<arena>.webp`). Il modo più sicuro per restare coerenti è dare al generatore **il banner dell\'arena come immagine di riferimento** e creare tutte le immagini di un\'arena nella stessa sessione.\n' +
  '- **Persone**: nessuna persona reale riconoscibile. Nel Liceo e nell\'Ufficio i pericoli sono caricature comiche.\n' +
  '- **Peso**: entro i limiti della tabella; il sito carica le immagini solo quando servono, ma pesi alti rallentano il telefono.\n' +
  '- **Il file unico** `dist/last-one-standing.html` non incorpora queste immagini (diventerebbe enorme): le mostra il sito.\n\n' +
  '| Sezione | Proporzioni | Dimensioni | Minimo | Sfondo | Peso massimo | Quante |\n| --- | --- | --- | --- | --- | --- | --- |\n' +
  KINDS.map((k) => '| ' + SPEC[k].titolo + ' | ' + SPEC[k].ratio + ' | ' + SPEC[k].size + ' | ' + SPEC[k].min + ' | ' + SPEC[k].fondo + ' | ' + SPEC[k].peso + ' | ' + count((r) => r.kind === k) + ' |').join('\n') + '\n\n';
KINDS.forEach((k) => {
  md += '### ' + SPEC[k].titolo + ': come appaiono e come comporle\n\n' + SPEC[k].sito + '\n\n' + SPEC[k].comp.map((x) => '- ' + x).join('\n') + '\n\n';
});
md += '### Come sono fatti i prompt\n\nOgni voce ha un **prompt breve**, scritto apposta per quel soggetto. Il **prompt completo** (si apre sotto ogni voce) aggiunge, nell\'ordine, lo stile dell\'arena, lo stile comune del gioco, le regole della sezione (inquadratura, sfondo, margini) e i divieti (niente testo, loghi, persone reali). Puoi usare il completo così com\'è, oppure impostare stile e regole una volta sola nel generatore e incollare solo i prompt brevi. Se il generatore ha un campo per il «negative prompt», sposta lì la frase dei divieti.\n\n' +
  '## Indice\n\n| Arena | Cartella | Luoghi | Pericoli | Armi |\n| --- | --- | --- | --- | --- |\n' +
  D.themes.map((t) => '| [' + t.name + '](#' + t.name.toLowerCase().replace(/[^\p{L}\p{N} -]/gu, '').replace(/ /g, '-') + ') | `assets/arene/' + t.id + '/` | ' + KINDS.map((k) => count((r) => r.arena === t.id && r.kind === k)).join(' | ') + ' |').join('\n') + '\n';

D.themes.forEach((t) => {
  const B = BRIEF.arenas[t.id];
  md += '\n---\n\n## ' + t.name + '\n\n' + t.tag + '\n\n' +
    '- **Cartella**: `assets/arene/' + t.id + '/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)\n' +
    '- **Riferimento di stile**: `assets/arene/' + t.id + '.webp`\n' +
    '- **Atmosfera**: ' + B.look + '\n' +
    '- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):\n\n```text\n' + cap(B.style) + '. ' + cap(BRIEF.style) + '.\n```\n\n' +
    'Più, a seconda della sezione:\n\n' + KINDS.map((k) => '- ' + SPEC[k].titolo + ': `' + cap(BRIEF.sections[k].en) + '.' + (t.soft && k === 'pericoli' ? ' Light-hearted comic caricature, not scary, not violent, not resembling any real person.' : t.soft && k === 'armi' ? ' An everyday object used as a playful office or school prank, comic tone.' : '') + '`').join('\n') + '\n- Sempre: `' + cap(BRIEF.avoid) + '.`\n';
  KINDS.forEach((k) => {
    const list = rows.filter((r) => r.arena === t.id && r.kind === k);
    md += '\n### ' + SPEC[k].titolo + ' · ' + t.name + ' (' + SPEC[k].ratio + ', ' + SPEC[k].size + ', sfondo ' + SPEC[k].fondo + ')\n';
    list.forEach((r) => {
      md += '\n#### ' + (r.ok ? '✓ ' : '') + r.label + '\n\n- **File**: `' + r.file + '`\n- **Cosa mostrare**: ' + r.it + '\n\n**Prompt**\n\n```text\n' + r.mini + '\n```\n\n<details><summary>Prompt completo, pronto da incollare</summary>\n\n```text\n' + r.prompt + '\n```\n\n</details>\n';
    });
  });
});
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.md'), md);

console.log('Luoghi, pericoli e armi: ' + tot + ' immagini previste · presenti ' + have + ' · mancanti ' + (tot - have));
KINDS.forEach((k) => console.log('  ' + k.padEnd(9) + count((r) => r.kind === k) + ' (presenti ' + count((r) => r.kind === k && r.ok) + ')'));
if (process.argv.includes('--mancanti')) rows.filter((r) => !r.ok).forEach((r) => console.log(r.file));
console.log('Scritti docs-dev/immagini-arene.md e docs-dev/immagini-arene.csv');
