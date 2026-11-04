// Documentazione delle immagini della guida delle arene, pensata per Midjourney v8.2.
// Per ora copre luoghi, pericoli e armi: per ognuno nome del file, cosa mostrare e il comando
// Midjourney completo (soggetto scritto in tools/atlas-brief.js + inquadratura, stile e parametri).
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
const BRIEF = require('./atlas-brief.js'), MJ = BRIEF.mj;

const KINDS = ['luoghi', 'pericoli', 'armi'];
// le voci che la guida mostra davvero (devono restare allineate con src/ui.js)
const itemsOf = (t, kind) => (kind === 'luoghi' ? t.lex.luogo : kind === 'pericoli' ? t.lex.mostro : t.lex.arma.slice(0, 10));
const strip = (x) => x.replace(/^(il |lo |la |l'|i |gli |le |un |uno |una |un'|delle |dei |degli |del |della |dell')/i, '');
const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const EXT = ['webp', 'png', 'jpg', 'jpeg', 'avif'];
const existing = (theme, kind, key) => EXT.some((e) => fs.existsSync(path.join(ROOT, 'assets/arene', theme, kind, key + '.' + e)));

const SPEC = {
  luoghi: {
    titolo: 'Luoghi', ratio: '16:9', size: '1280 × 720 px', fondo: 'pieno',
    sito: 'Scheda della zona nel capitolo Mappa. Al computer l\'immagine sta in alto nella scheda, in 16:9, larga circa 270 px. Sul telefono diventa una colonna a sinistra di circa 120 × 140 px: si vede solo la **fascia centrale verticale**.',
    scegli: 'Tra le quattro proposte scegli quella con il luogo **più riconoscibile al centro** e meno dettagli minuti: deve funzionare anche piccola.',
  },
  pericoli: {
    titolo: 'Pericoli', ratio: '4:3', size: '960 × 720 px', fondo: 'pieno e scuro',
    sito: 'Manifesto «ricercato» appeso nel capitolo Mappa: carta color avorio, puntina rossa, leggermente inclinato. L\'immagine è un 4:3 largo circa 190 px al computer e 150 px sul telefono, con il nome scritto sotto dal sito.',
    scegli: 'Scegli quella con il soggetto **centrato, che guarda verso di te**, e i bordi scuri. Nel Liceo e nell\'Ufficio deve far sorridere, non paura.',
  },
  armi: {
    titolo: 'Armi', ratio: '1:1', size: '512 × 512 px', fondo: 'trasparente (lo scontorno lo faccio io)',
    sito: 'Rastrelliera dell\'armeria nel capitolo Mappa: ogni arma sta in una piastrella arrotondata di **62 × 62 px**, sia su fondo chiaro sia su fondo scuro.',
    scegli: 'Scegli quella con **un solo oggetto intero**, ben staccato dal fondo grigio uniforme, senza ombre a terra: così lo scontorno viene pulito.',
  },
};

const params = (p) => '--v ' + MJ.version + ' --ar ' + p.ar + ' --s ' + p.s + ' --chaos ' + p.chaos;
const command = (t, kind, en) => {
  const B = BRIEF.arenas[t.id], M = MJ[kind], soft = !!t.soft;
  const shot = soft && M.soft ? M.soft : M.shot;
  const no = soft && M.noSoft ? M.noSoft : M.no;
  return cap(en) + ', ' + shot + ', ' + B.style + ', ' + MJ.medium + ' ' + params(M.params) + ' --sref ' + MJ.sref(t.id) + ' --sw ' + M.params.sw + ' --no ' + no;
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
      rows.push({ arena: t.id, nome: t.name, kind, key, label: cap(strip(name)), file: 'assets/arene/' + t.id + '/' + kind + '/' + key + '.webp', it: br[0], cmd: command(t, kind, br[1]), ok: existing(t.id, kind, key) });
    });
  });
});
if (missingBrief.length) { console.error('Manca il brief per: ' + missingBrief.join(', ') + '\nAggiungilo in tools/atlas-brief.js.'); process.exit(1); }

// CSV
const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.csv'), ['arena,sezione,file,nome,cosa_mostrare,proporzioni,dimensioni_finali,presente,comando_midjourney']
  .concat(rows.map((r) => [r.arena, r.kind, r.file, r.label, r.it, SPEC[r.kind].ratio, SPEC[r.kind].size, r.ok ? 'si' : 'no', r.cmd].map(q).join(','))).join('\n') + '\n');

// documento
const tot = rows.length, have = rows.filter((r) => r.ok).length;
const count = (f) => rows.filter(f).length;
const P = (k) => MJ[k].params;
let md = '# Immagini delle arene con Midjourney v8.2: luoghi, pericoli e armi\n\n' +
  '_Generato da `node tools/atlas-slots.js` a partire da `tools/atlas-brief.js`: per cambiare un testo o un prompt modifica il brief e rigenera, non questo file._\n\n' +
  '**Presenti: ' + have + ' su ' + tot + '** (luoghi ' + count((r) => r.kind === 'luoghi' && r.ok) + '/' + count((r) => r.kind === 'luoghi') + ', pericoli ' + count((r) => r.kind === 'pericoli' && r.ok) + '/' + count((r) => r.kind === 'pericoli') + ', armi ' + count((r) => r.kind === 'armi' && r.ok) + '/' + count((r) => r.kind === 'armi') + '). Meteo, disastri e oggetti arriveranno dopo.\n\n' +
  '## 1. Impostazioni di Midjourney\n\n' +
  'Ogni comando qui sotto contiene già tutti i parametri: copialo intero nella barra «Imagine» di midjourney.com (o dopo `/imagine` su Discord) e invia. I parametri scritti nel comando hanno la precedenza sul pannello, ma imposta comunque il pannello **Settings** così, una volta sola, per non avere sorprese:\n\n' +
  '| Impostazione | Valore | Perché |\n| --- | --- | --- |\n' +
  '| **Version** | **8.2** | È il modello richiesto; è anche scritto in ogni comando (`--v 8.2`). |\n' +
  '| **Personalization** | **spenta** | Il tuo profilo personale cambierebbe lo stile da un\'immagine all\'altra: deve comandare il banner dell\'arena. |\n' +
  '| **Mode / Raw** | **Standard (Raw spento)** | Il Raw toglie l\'estetica di Midjourney; qui serve proprio quella pittorica, guidata dal riferimento di stile. |\n' +
  '| **Stylization** | lascia il valore predefinito | Ogni comando lo fissa con `--s` (vedi la tabella sotto). |\n' +
  '| **Weirdness** | **0** | Niente stranezze: le immagini devono essere coerenti tra loro. |\n' +
  '| **Variety** | lascia il predefinito | Ogni comando lo fissa con `--chaos`. |\n' +
  '| **HD** | **acceso** (se il tuo abbonamento lo prevede) | Esce a circa 2048 px: poi la riduco io alle misure del sito, più nitida. Se non c\'è, va bene anche la risoluzione normale. |\n' +
  '| **Speed** | Fast o Relax | Non cambia il risultato. Evita la modalità Draft: è più grezza e non va d\'accordo con l\'HD. |\n' +
  '| **Stealth** | come preferisci | Non cambia il risultato. |\n\n' +
  '### Parametri usati in ogni sezione\n\n' +
  '| Sezione | Formato `--ar` | Stile `--s` | Peso del riferimento `--sw` | Varietà `--chaos` | Esclusi `--no` |\n| --- | --- | --- | --- | --- | --- |\n' +
  KINDS.map((k) => '| ' + SPEC[k].titolo + ' | ' + P(k).ar + ' | ' + P(k).s + ' | ' + P(k).sw + ' | ' + P(k).chaos + ' | ' + MJ[k].no + (MJ[k].noSoft ? ' (nel Liceo e nell\'Ufficio anche: blood, gore, weapons, real person)' : '') + ' |').join('\n') + '\n\n' +
  '- **`--sref`** è il banner dell\'arena, preso dal repository pubblico: tutte le immagini di un\'arena ne ereditano palette, luce e pennellata, quindi stanno bene accanto al banner e tra loro. **`--sw`** dice quanto pesa: alto per luoghi e pericoli (devono sembrare la stessa arena), basso per le armi (devono restare oggetti puliti, non paesaggi).\n' +
  '- **`--s`** (stylize) dà a Midjourney spazio per rendere l\'immagine più ricca: più alto nei pericoli, più basso nelle armi, dove serve una sagoma semplice.\n' +
  '- **`--chaos`** a 8 varia un po\' le quattro proposte di luoghi e pericoli; a 0 per le armi, che devono uscire composte sempre allo stesso modo.\n' +
  '- **`--no`** tiene fuori scritte, loghi, cornici e persone: i nomi li scrive il sito, e una cornice disegnata stonerebbe con le schede.\n' +
  '- Se Midjourney rifiuta un parametro (gli aggiornamenti a volte ne cambiano i limiti), toglilo dal comando e rilancia: il resto funziona da solo. Se non riesce a leggere il link del banner, scaricalo dal sito, caricalo nella barra «Imagine» come **Style reference** e togli `--sref …` dal comando.\n\n' +
  '## 2. Come lavorare, arena per arena\n\n' +
  '1. Apri il capitolo dell\'arena qui sotto e genera le voci **una dopo l\'altra nella stessa sessione**: con lo stesso riferimento escono coerenti.\n' +
  '2. Di ogni comando ottieni quattro proposte: scegli la migliore seguendo il consiglio della sezione e, se serve, usa **Vary (Subtle)** per piccoli ritocchi. Evita Vary (Strong): cambia troppo.\n' +
  '3. Scarica l\'immagine scelta in **PNG**. Al nome non pensarci: mandamele anche così, dicendomi a quale voce corrispondono, oppure chiamale già con il nome del file indicato.\n' +
  '4. **Al resto penso io**: ritaglio alle proporzioni giuste, riduzione alle misure del sito, scontorno delle armi (per questo le facciamo su fondo grigio uniforme: Midjourney non crea sfondi trasparenti), conversione in WebP, nomi e cartelle. Poi il sito le usa al posto delle illustrazioni provvisorie.\n\n' +
  '## 3. Come appaiono nel sito\n\n' +
  '| Sezione | Dove si vede | Misura finale | Sfondo finale | Quante |\n| --- | --- | --- | --- | --- |\n' +
  KINDS.map((k) => '| ' + SPEC[k].titolo + ' | ' + SPEC[k].sito.split('. ')[0] + ' | ' + SPEC[k].size + ' (' + SPEC[k].ratio + ') | ' + SPEC[k].fondo + ' | ' + count((r) => r.kind === k) + ' |').join('\n') + '\n\n' +
  KINDS.map((k) => '- **' + SPEC[k].titolo + '**: ' + SPEC[k].sito + ' ' + SPEC[k].scegli).join('\n') + '\n\n' +
  '## Indice\n\n| Arena | Banner usato come stile | Luoghi | Pericoli | Armi |\n| --- | --- | --- | --- | --- |\n' +
  D.themes.map((t) => '| [' + t.name + '](#' + t.name.toLowerCase().replace(/[^\p{L}\p{N} -]/gu, '').replace(/ /g, '-') + ') | [' + t.id + '.webp](' + MJ.sref(t.id) + ') | ' + KINDS.map((k) => count((r) => r.arena === t.id && r.kind === k)).join(' | ') + ' |').join('\n') + '\n';

D.themes.forEach((t) => {
  const B = BRIEF.arenas[t.id];
  md += '\n---\n\n## ' + t.name + '\n\n' + t.tag + '\n\n' +
    '- **Atmosfera**: ' + B.look + '\n' +
    '- **Riferimento di stile** (`--sref`): [' + MJ.sref(t.id) + '](' + MJ.sref(t.id) + ')\n';
  KINDS.forEach((k) => {
    const list = rows.filter((r) => r.arena === t.id && r.kind === k);
    md += '\n### ' + SPEC[k].titolo + ' · ' + t.name + '\n';
    list.forEach((r) => {
      md += '\n#### ' + (r.ok ? '✓ ' : '') + r.label + '\n\n' + r.it + '  \nFile: `' + r.file + '`\n\n```text\n' + r.cmd + '\n```\n';
    });
  });
});
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.md'), md);

console.log('Luoghi, pericoli e armi: ' + tot + ' immagini previste · presenti ' + have + ' · mancanti ' + (tot - have));
KINDS.forEach((k) => console.log('  ' + k.padEnd(9) + count((r) => r.kind === k) + ' (presenti ' + count((r) => r.kind === k && r.ok) + ')'));
if (process.argv.includes('--mancanti')) rows.filter((r) => !r.ok).forEach((r) => console.log(r.file));
console.log('Scritti docs-dev/immagini-arene.md e docs-dev/immagini-arene.csv');
