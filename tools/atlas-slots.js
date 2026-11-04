// Documentazione delle immagini (e dei video in loop) della guida delle arene, per Midjourney v8.2.
// Per ora copre luoghi, pericoli e armi: per ognuno nome del file, cosa mostrare, comando per
// l'immagine e, per luoghi e pericoli, comando per il video d'ambiente in loop.
// I testi stanno in tools/atlas-brief.js; questo script li compone e scrive
// docs-dev/immagini-arene.md e docs-dev/immagini-arene.csv, dicendo quante immagini ci sono già.
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
const IMG = ['webp', 'png', 'jpg', 'jpeg', 'avif'], VID = ['webm', 'mp4'];
const has = (theme, kind, key, exts) => exts.some((e) => fs.existsSync(path.join(ROOT, 'assets/arene', theme, kind, key + '.' + e)));

const SPEC = {
  luoghi: { titolo: 'Luoghi', ratio: '16:9', size: '1280 × 720 px', video: true,
    sito: 'Scheda della zona nel capitolo Mappa: in alto nella scheda, 16:9, larga circa 270 px al computer; sul telefono una colonna di circa 120 × 140 px, quindi si vede la **fascia centrale verticale**.',
    scegli: 'Scegli la proposta con il luogo **più riconoscibile al centro** e meno dettagli minuti: deve funzionare anche piccola.' },
  pericoli: { titolo: 'Pericoli', ratio: '4:3', size: '960 × 720 px', video: true,
    sito: 'Manifesto «ricercato» nel capitolo Mappa: carta avorio, puntina rossa, leggermente inclinato; immagine 4:3 larga circa 190 px al computer e 150 px sul telefono, con il nome scritto sotto dal sito.',
    scegli: 'Scegli quella con il soggetto **centrato che guarda verso di te** e i bordi scuri. Nel Liceo e nell\'Ufficio deve far sorridere, non paura.' },
  armi: { titolo: 'Armi', ratio: '1:1', size: '512 × 512 px', video: false,
    sito: 'Rastrelliera dell\'armeria: ogni arma sta in una piastrella di **62 × 62 px**, su fondo chiaro o scuro; per questo va scontornata (sfondo trasparente).',
    scegli: 'Scegli quella con **un solo oggetto intero**, ben staccato dal fondo grigio uniforme e senza ombra a terra: lo scontorno viene pulito.' },
};

const facet = (B) => (B.facet ? B.facet + ' ' : '');
function imageCmd(t, kind, scene) {
  const B = BRIEF.arenas[t.id], M = MJ[kind], soft = !!t.soft;
  let body;
  if (kind === 'armi') body = scene + ' ' + M.style + ' ' + B.prop;
  else body = scene + ' ' + M.style(facet(B)) + (kind === 'pericoli' && soft ? ' ' + M.soft : '') + ' ' + B.light;
  return body + ' --v ' + MJ.version + ' ' + M.params + ' --no ' + (soft && M.noSoft ? M.noSoft : M.no);
}
const videoCmd = (kind, motion) => MJ.video.lead[kind] + ' ' + cap(motion) + ' ' + MJ.video.params;

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
      rows.push({ arena: t.id, nome: t.name, kind, key, label: cap(strip(name)), base: 'assets/arene/' + t.id + '/' + kind + '/' + key, it: br[0],
        img: imageCmd(t, kind, br[1]), vid: br[2] ? videoCmd(kind, br[2]) : '', ok: has(t.id, kind, key, IMG), okv: has(t.id, kind, key, VID) });
    });
  });
});
if (missingBrief.length) { console.error('Manca il brief per: ' + missingBrief.join(', ') + '\nAggiungilo in tools/atlas-brief.js.'); process.exit(1); }

// CSV
const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.csv'), ['arena,sezione,nome,file_immagine,file_video,cosa_mostrare,proporzioni,immagine_presente,video_presente,comando_immagine,comando_video']
  .concat(rows.map((r) => [r.arena, r.kind, r.label, r.base + '.webp', r.vid ? r.base + '.mp4' : '', r.it, SPEC[r.kind].ratio, r.ok ? 'si' : 'no', r.vid ? (r.okv ? 'si' : 'no') : '', r.img, r.vid].map(q).join(','))).join('\n') + '\n');

// documento
const tot = rows.length, have = rows.filter((r) => r.ok).length;
const vids = rows.filter((r) => r.vid), haveV = vids.filter((r) => r.okv).length;
const count = (f) => rows.filter(f).length;
const anchor = (s) => s.toLowerCase().replace(/[^\p{L}\p{N} -]/gu, '').replace(/ /g, '-');
let md = '# Immagini e video delle arene con Midjourney v8.2\n\n' +
  '_Generato da `node tools/atlas-slots.js` a partire da `tools/atlas-brief.js`: per cambiare un testo o un prompt modifica il brief e rigenera, non questo file._\n\n' +
  '**Immagini presenti: ' + have + ' su ' + tot + '** (luoghi ' + count((r) => r.kind === 'luoghi' && r.ok) + '/' + count((r) => r.kind === 'luoghi') + ', pericoli ' + count((r) => r.kind === 'pericoli' && r.ok) + '/' + count((r) => r.kind === 'pericoli') + ', armi ' + count((r) => r.kind === 'armi' && r.ok) + '/' + count((r) => r.kind === 'armi') + '). **Video presenti: ' + haveV + ' su ' + vids.length + '** (luoghi e pericoli). Meteo, disastri e oggetti arriveranno dopo.\n\n' +

  '## 1. Lo stile\n\n' +
  'Il riferimento è la Cornucopia che hai generato: **concept art pittorica stilizzata**, pennellate espressive e visibili, piani sfaccettati (rocce, metallo, pietra), una luce calda e forte contro ombre fredde e profonde, nebbia di profondità. Ogni prompt segue la stessa struttura del tuo:\n\n' +
  '1. **la scena**: il soggetto e dove sta nell\'inquadratura (sempre nel terzo centrale), poi il primo piano, poi lo sfondo;\n' +
  '2. **la frase di stile**, uguale per tutta la sezione (ambiente, personaggio o oggetto);\n' +
  '3. **la frase di luce dell\'arena**, uguale per tutte le voci di quell\'arena: è ciò che tiene insieme palette e atmosfera;\n' +
  '4. **i parametri**: solo `--v 8.2`, il formato `--ar` e le esclusioni `--no`. Nessun riferimento alle immagini del sito.\n\n' +
  '`--no` tiene fuori scritte, **firme** (nella Cornucopia è comparsa una firma finta in basso a destra), loghi, cornici e persone. Le esclusioni stanno solo lì: scritte dentro la frase («no people») Midjourney spesso le fa al contrario.\n\n' +
  '**Lunghezza e ordine.** La v8 è più letterale delle versioni precedenti: segue ciò che c\'è scritto e aggiunge meno «abbellimenti» da sola, quindi rende meglio con descrizioni piene e concrete (materiali, posizione delle cose, provenienza della luce). Conta il numero di soggetti e dettagli più delle parole. Per questo ogni testo sta tra **70 e 120 parole**, come quello della Cornucopia (circa 110) che ha funzionato, e **sotto gli 850 caratteri**, così il Prompt Shortener non interviene a tagliare. L\'ordine conta: il soggetto viene sempre per primo, lo stile e la luce dopo, perché Midjourney dà più peso all\'inizio.\n\n' +
  '**Cosa ho controllato in ogni testo**: soggetto nel terzo centrale (sul telefono si vede solo quello); un dettaglio raccontato in primo piano e uno sfondo con profondità; pochi oggetti ben distinti invece di elenchi lunghi; cartelli, schermi e fogli sempre «blank» o con segni astratti, mai con testo; nei pericoli una posa, un\'espressione e una luce sul soggetto; nelle armi materiali, usura e un dettaglio d\'arena, perché a 62 px resta solo la sagoma; nessuna parola che Midjourney possa prendere alla lettera disegnando cornici o manifesti.\n\n' +

  '## 2. Impostazioni di Midjourney\n\n' +
  'Nel pannello **Settings** di midjourney.com (o con `/settings` su Discord), una volta sola:\n\n' +
  '| Impostazione | Valore | Perché |\n| --- | --- | --- |\n' +
  '| **Version** | **8.2** | Il modello richiesto; è anche nel comando (`--v 8.2`). |\n' +
  '| **Stylization** | **100** (predefinito) | È il valore con cui è uscita la Cornucopia: i comandi non lo cambiano. |\n' +
  '| **Raw** | **spento** | Serve l\'estetica pittorica di Midjourney, non quella «grezza». |\n' +
  '| **Weirdness** | **0** | Le immagini devono restare coerenti tra loro. |\n' +
  '| **Variety** | **0** | Le quattro proposte restano fedeli al prompt; se vuoi più idee per una voce, rilancia con Rerun. |\n' +
  '| **Personalization** | **la moodboard dello stile** (vedi sotto) | Tiene la pennellata uguale in tutte le arene. All\'inizio, finché la moodboard non c\'è, lasciala spenta. |\n' +
  '| **HD** | **acceso** (se il tuo piano lo prevede) | Esce più grande e nitida; la riduco io alle misure del sito. |\n' +
  '| **Speed** | Fast o Relax, **non Draft** | Draft è più grezza e non va d\'accordo con l\'HD. |\n\n' +

  '## 3. Fare di questo stile la base, su midjourney.com\n\n' +
  '**A. Una moodboard dello stile (consigliato, vale per tutte le arene).**\n\n' +
  '1. Vai in **Personalize → Moodboards** e crea una moodboard, per esempio «Last One Standing».\n' +
  '2. Aggiungici la Cornucopia (dalla tua galleria o caricandola).\n' +
  '3. Man mano che generi, aggiungi le immagini migliori di **arene diverse**: con 5–10 immagini varie la moodboard impara la pennellata e la luce, non i colori di un\'arena sola.\n' +
  '4. Nel pannello Settings, alla voce **Personalization**, scegli quella moodboard: da quel momento Midjourney aggiunge da solo `--p` con il suo codice a ogni prompt.\n\n' +
  '**B. Un riferimento di stile per arena (per uniformare un\'arena).**\n\n' +
  '1. Genera per prima la voce principale dell\'arena (il primo luogo dell\'elenco) e scegli la versione migliore.\n' +
  '2. Trascinala nella barra «Imagine» nella casella **Style reference** (oppure aprila e premi **Use → Style**). Resta agganciata ai prompt successivi.\n' +
  '3. Genera il resto dell\'arena con il riferimento agganciato, poi **toglilo prima di passare all\'arena successiva**, altrimenti ne trascina i colori.\n' +
  '4. Per l\'Arena Classica puoi usare subito la Cornucopia. Se il riferimento copia troppo la composizione, abbassane il peso (`--sw 60` o `80` in fondo al comando; il predefinito è 100).\n\n' +
  'Le due cose si possono usare insieme: la moodboard dà lo stile comune, il riferimento dell\'arena la sua palette.\n\n' +

  '## 4. I video d\'ambiente in loop\n\n' +
  'Ogni luogo e ogni pericolo ha anche un **prompt per il video**: una scena quasi ferma con poche cose che respirano (nebbia, foglie, luci, fiamme, respiro delle creature), a camera fissa, che si ripete senza stacchi.\n\n' +
  '1. Apri l\'immagine scelta e premi **Animate → Manual** (l\'immagine diventa il fotogramma iniziale).\n' +
  '2. Incolla il prompt del video: comincia dicendo che la camera è ferma e che **il luogo o il soggetto restano immobili** (aiuta molto il loop), poi elenca solo tre o quattro piccoli movimenti; contiene già **`--motion low`** (movimento lieve, adatto ai loop) e **`--loop`** (il fotogramma finale coincide con il primo, così il video ricomincia senza salti).\n' +
  '3. Se il tuo piano lo prevede, scegli **HD**. Delle quattro proposte prendi quella più calma; se qualcosa si muove troppo, rilancia (Rerun) invece di estendere il video.\n' +
  '4. Scarica l\'MP4. Non serve allungarlo: pochi secondi in loop bastano.\n\n' +
  '**Le armi niente video**: stanno in piastrelle di 62 px e devono avere lo sfondo trasparente, che un video non può avere. Se vorrai un tocco di vita lì, aggiungo io un riflesso animato sul sito.\n\n' +
  'Sul sito i video partiranno da soli, muti e in loop, con l\'immagine ferma mentre si caricano; chi ha chiesto di ridurre le animazioni vedrà solo l\'immagine. Il supporto lo aggiungo io quando arrivano i primi video.\n\n' +

  '## 5. Cosa mandarmi e come procedere\n\n' +
  '1. Lavora **un\'arena alla volta**, nella stessa sessione: prima i luoghi, poi i pericoli, poi le armi.\n' +
  '2. Per ogni voce scegli la migliore delle quattro proposte (vedi i consigli qui sotto), usa **Vary (Subtle)** per piccoli ritocchi, evita Vary (Strong).\n' +
  '3. Scarica le immagini in **PNG** e i video in **MP4**. Mandameli così come sono, dicendomi a quale voce corrispondono, oppure rinominali già con il nome indicato.\n' +
  '4. **Al resto penso io**: ritaglio alle proporzioni, riduzione alle misure del sito, scontorno delle armi, conversione (WebP per le immagini, video leggeri per il web), nomi e cartelle.\n\n' +
  '| Sezione | Formato | Misura finale sul sito | Video | Come sceglierla |\n| --- | --- | --- | --- | --- |\n' +
  KINDS.map((k) => '| ' + SPEC[k].titolo + ' | ' + SPEC[k].ratio + ' | ' + SPEC[k].size + ' | ' + (SPEC[k].video ? 'sì, loop' : 'no') + ' | ' + SPEC[k].scegli + ' |').join('\n') + '\n\n' +
  KINDS.map((k) => '- **' + SPEC[k].titolo + '**: ' + SPEC[k].sito).join('\n') + '\n\n' +
  '## Indice\n\n| Arena | Luoghi | Pericoli | Armi |\n| --- | --- | --- | --- |\n' +
  D.themes.map((t) => '| [' + t.name + '](#' + anchor(t.name) + ') | ' + KINDS.map((k) => count((r) => r.arena === t.id && r.kind === k)).join(' | ') + ' |').join('\n') + '\n';

D.themes.forEach((t) => {
  const B = BRIEF.arenas[t.id];
  md += '\n---\n\n## ' + t.name + '\n\n' + t.tag + '\n\n- **Atmosfera**: ' + B.look + '\n- **Frase di luce dell\'arena** (è già nei comandi): `' + B.light + '`\n';
  KINDS.forEach((k) => {
    const list = rows.filter((r) => r.arena === t.id && r.kind === k);
    md += '\n### ' + SPEC[k].titolo + ' · ' + t.name + '\n';
    list.forEach((r) => {
      md += '\n#### ' + (r.ok ? '✓ ' : '') + r.label + '\n\n' + r.it + '  \nFile: `' + r.base + '.webp`' + (r.vid ? ' · video: `' + r.base + '.mp4`' + (r.okv ? ' ✓' : '') : '') + '\n\n' +
        '**Immagine**\n\n```text\n' + r.img + '\n```\n' + (r.vid ? '\n**Video (Animate → Manual)**\n\n```text\n' + r.vid + '\n```\n' : '');
    });
  });
});
fs.writeFileSync(path.join(ROOT, 'docs-dev/immagini-arene.md'), md);

console.log('Luoghi, pericoli e armi: ' + tot + ' immagini (presenti ' + have + ') · ' + vids.length + ' video (presenti ' + haveV + ')');
KINDS.forEach((k) => console.log('  ' + k.padEnd(9) + count((r) => r.kind === k) + ' (presenti ' + count((r) => r.kind === k && r.ok) + ')'));
if (process.argv.includes('--mancanti')) rows.filter((r) => !r.ok).forEach((r) => console.log(r.base + '.webp'));
console.log('Scritti docs-dev/immagini-arene.md e docs-dev/immagini-arene.csv');
