/* Oggetti: peso, finiture e lettura del catalogo.
 * Ogni oggetto del mondo è «radice + finitura» (una lancia da caccia + con laccio da polso).
 * Le radici di ogni arena stanno in _oggetti-<arene>.js con descrizione ed effetti scritti a mano;
 * qui ci sono i posti occupati nello zaino, le finiture (anche loro con un effetto vero) e le funzioni
 * che il motore e l'interfaccia usano per leggere descrizione, effetti e utilità.
 *
 * Effetti (proprietà), tutti applicati dal motore:
 *   posti:N        posti occupati nello zaino (nel catalogo: il peso dell'oggetto; nelle finiture: in più o in meno).
 *                  Lo zaino ne ha 8, ±1 ogni 2 punti di Forza oltre o sotto 5
 *   forza:N        potenza in più negli scontri (armi)
 *   usi:N          colpi in più prima di rompersi (armi, protezioni)
 *   assorbe:N      punti percentuali di danno assorbito in più o in meno rispetto al normale (38)
 *   prova:car+N    bonus alle prove di quella caratteristica (in tutto al massimo +3 dagli oggetti)
 *   belve:N        difesa in più dalle aggressioni notturne
 *   indicatore:N   riduce del N% l'accumulo dell'indicatore dell'arena (freddo, ansia, radiazioni…)
 *   cura:N         salute minima dopo la cura, in più o in meno rispetto al normale (70)
 *   guarisce:x,y   toglie quegli stati (avvelenato, malato, ferito)
 *   cibo:N         quanto sfama, in più o in meno rispetto al normale (50)
 *   energia:N, morale:N   energia o morale in più quando si consuma; per amuleti e ricordi: conforto
 *                  quando il morale crolla, una volta per notte
 *   raccolta:N     probabilità in più (punti percentuali) di trovare cibo di notte
 *   scambio:N      valore negli scambi (merce)
 *   trappola:N     danno in più di una trappola piazzata
 *   impianto:1     impianto installato (Night City): si usa come gli altri oggetti del tipo, ma nessuno
 *                  può rubarlo, riceverlo in dono o in scambio, prenderlo come bottino o trovarlo a terra */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});
  D.itemCatalog = D.itemCatalog || {};
  D.itemSlots = { arma: 2, armatura: 3, attrezzo: 1, mappa: 1, trap: 2, med: 1, amuleto: 0, valore: 1, ricordo: 0, cibo: 1, veleno: 1, esplosivo: 2, alcol: 1 };
  D.itemTails = {
    arma: `con presa in tessuto|La presa fasciata non scivola: regge un colpo in più prima di cedere.|usi:1
con laccio da polso|Il laccio la tiene legata al polso: in una zuffa non vola via.|prova:agi+1
con presa in cuoio|Il cuoio tiene anche con le mani sudate: si colpisce con tutto il peso.|prova:for+1
con contrappeso ad anello|Il contrappeso rende ogni colpo più pesante.|forza:0.5
con fodero di recupero|Il fodero la tiene nascosta e muta finché non serve.|prova:furt+1`,
    armatura: `con bordi rivestiti|I bordi rivestiti non segano il collo: si sopporta a lungo.|prova:res+1
con fodera trapuntata|La fodera attutisce anche i colpi che passano.|assorbe:5
con fissaggi intrecciati|Si allaccia stretta e non impaccia i movimenti.|prova:agi+1
con cuciture doppie|Le cuciture doppie reggono un colpo in più prima di cedere.|usi:1
con rinforzi sulle giunture|Rinforzata dove si piega: protegge meglio, ma pesa di più.|assorbe:8 posti:1`,
    attrezzo: `in una custodia rigida|Dentro la custodia ogni pezzo resta al suo posto: si lavora con metodo.|prova:int+1
in un astuccio avvolgibile|Si arrotola e sta in una tasca: non occupa spazio.|posti:-1
in una sacca cerata|La sacca cerata resta asciutta anche sotto la pioggia.|prova:sop+1
in un involto di tessuto|Avvolto nel tessuto non tintinna: utile quando bisogna muoversi in silenzio.|prova:furt+1
in una scatola a scomparti|Tutto in ordine, anche al buio: la cosa giusta si trova al primo colpo.|belve:1`,
    mappa: `con riferimenti numerati|I numeri a margine aiutano a orientarsi senza esitare.|prova:int+1
con legenda a colori|Un colore per l'acqua e uno per il cibo: le scorte si trovano prima.|raccolta:8
con annotazioni a margine|Qualcuno ha segnato a matita dove dormire tranquilli.|belve:2
con simboli in rilievo|I simboli in rilievo si leggono anche al buio, con le dita.|prova:sop+1
con indice delle sezioni|L'indice porta alla via di fuga in pochi secondi.|prova:agi+1`,
    trap: `con innesco a pressione|L'innesco a pressione scatta sotto il primo passo distratto.|trappola:4
con tirante laterale|Il tirante si nasconde lungo il bordo del passaggio.|prova:furt+1
con fermo a scatto|Il fermo a scatto chiude di colpo e non molla.|trappola:6
con contrappeso nascosto|Il contrappeso è sepolto: a vista non c'è niente di strano.|prova:furt+1 trappola:2
con chiusura a caduta|Piazzata vicino al bivacco tiene lontane le visite notturne.|belve:2`,
    med: `in una custodia rigida|Nella custodia rigida niente si schiaccia: le dosi restano intatte.|cura:5
in un astuccio di tessuto|Leggero: entra in qualunque tasca.|posti:-1
in una scatola sigillata|Sigillata e sterile: serve anche contro le febbri.|guarisce:malato
in una sacca impermeabile|L'acqua non la rovina: si medica anche sotto la pioggia.|cura:5
in un contenitore a scomparti|Ogni cosa al suo scomparto: si medica in fretta e bene.|prova:emp+1`,
    amuleto: `con un nodo di filo rosso|Il nodo rosso si stringe tra le dita quando la paura sale.|morale:4
con un bordo inciso|Le incisioni sul bordo si toccano prima delle decisioni azzardate.|prova:fort+1
con un segno a spirale|Fissare la spirale calma il respiro.|indicatore:5
con un anello di rame|L'anello di rame scalda le dita fredde e il coraggio.|prova:cor+1
con un frammento di quarzo|Il quarzo cattura la luce: anche al buio, qualcosa brilla.|morale:3`,
    valore: `in un piccolo involto|Un involto piccolo si infila ovunque.|posti:-1
in una tasca cucita|Cucito in una tasca segreta: sembra più prezioso di quanto è.|scambio:1
in una scatola piatta|La scatola piatta lo tiene in ordine e presentabile.|scambio:1
in una custodia pieghevole|Si piega e sparisce in una manica.|posti:-1
in un sacchetto annodato|Tintinna in modo rassicurante.|morale:2`,
    ricordo: `con una dedica a matita|La dedica, rilette cento volte, dà forza nei momenti brutti.|morale:3
con una data sul retro|La data ricorda per cosa si sta resistendo.|prova:cor+1
con una piccola stella disegnata|La stellina sembra fatta apposta per le notti peggiori.|morale:2
con le iniziali sul bordo|Le iniziali, toccate di nascosto, sono una promessa da mantenere.|prova:res+1
con una nota ripiegata|La nota ripiegata dice una cosa sola: torna.|morale:4`,
    cibo: `in un involto di carta|La carta si strappa e qualcosa si perde per strada.|cibo:-5
in un piccolo cestino|Il cestino protegge tutto: niente si schiaccia.|cibo:5
in una scatola di latta|La latta conserva il sapore e un po' di dignità.|cibo:5 morale:2
in un contenitore di legno|Porzioni abbondanti, ben stipate.|energia:5
in un sacchetto di tessuto|Leggerissimo: quasi non si sente nello zaino.|posti:-1`,
  };
  // nelle arene senza violenza armi, protezioni, trappole e cure sono documenti e risorse di carta
  D.itemPaper = `con riferimenti datati|Le date in ordine rendono ogni argomento difficile da smontare.|prova:int+1
con annotazioni verificabili|Ogni affermazione ha la sua prova: si convince con più facilità.|prova:car+1
con una copia firmata|Una firma in fondo pesa più di mille parole.|forza:0.5
con indice analitico|L'indice porta subito al punto giusto, anche sotto pressione.|prova:int+1
con allegati numerati|Gli allegati in ordine fanno durare l'effetto più a lungo.|usi:1`;

  const ATTRS = { for: 'Forza', agi: 'Agilità', int: 'Intelligenza', car: 'Carisma', fort: 'Fortuna', res: 'Resistenza', furt: 'Furtività', cor: 'Coraggio', emp: 'Empatia', sop: 'Sopravvivenza' };
  const STATI = { avvelenato: 'avvelenamento', malato: 'febbre e infezioni', ferito: 'ferite' };
  function parseProps(s) {
    const p = {};
    String(s || '').trim().split(/\s+/).filter(Boolean).forEach((tok) => {
      const m = tok.match(/^([a-z]+):(.+)$/); if (!m) throw new Error('Proprietà non valida: ' + tok);
      const [, k, v] = m;
      if (k === 'prova') { const x = v.match(/^(for|agi|int|car|fort|res|furt|cor|emp|sop)([+-]\d+)$/); if (!x) throw new Error('Prova non valida: ' + tok); (p.prova = p.prova || {})[x[1]] = (p.prova[x[1]] || 0) + +x[2]; }
      else if (k === 'guarisce') p.guarisce = (p.guarisce || []).concat(v.split(',').filter((x) => STATI[x] || (() => { throw new Error('Stato non valido: ' + x); })()));
      else if (['posti', 'forza', 'usi', 'assorbe', 'belve', 'indicatore', 'cura', 'cibo', 'energia', 'morale', 'raccolta', 'scambio', 'trappola', 'impianto'].includes(k)) { if (!Number.isFinite(+v)) throw new Error('Valore non valido: ' + tok); p[k] = (p[k] || 0) + +v; }
      else throw new Error('Proprietà sconosciuta: ' + tok);
    });
    return p;
  }
  function merge(a, b) {
    const out = Object.assign({}, a);
    for (const k in b) {
      if (k === 'prova') { out.prova = Object.assign({}, a.prova || {}); for (const x in b.prova) out.prova[x] = (out.prova[x] || 0) + b.prova[x]; }
      else if (k === 'guarisce') out.guarisce = [...new Set((a.guarisce || []).concat(b.guarisce))];
      else out[k] = (out[k] || 0) + b[k];
    }
    return out;
  }
  const parseRows = (src) => String(src || '').trim().split('\n').filter((l) => l.trim()).map((l) => {
    const p = l.split('|'); if (p.length !== 3 && p.length !== 4) throw new Error('Riga di oggetto incompleta: ' + l);
    return p.length === 4 ? { type: p[0].trim(), name: p[1].trim(), d: p[2].trim(), p: parseProps(p[3]) } : { name: p[0].trim(), d: p[1].trim(), p: parseProps(p[2]) };
  });
  const cache = new Map();
  function catalog(themeId) {
    if (cache.has(themeId)) return cache.get(themeId);
    const rows = parseRows(D.itemCatalog[themeId]);
    const roots = {}; rows.forEach((r) => { (roots[r.type] = roots[r.type] || []).push(r); });
    // finiture: quelle proprie dell'arena, se ci sono, altrimenti le comuni
    const own = (D.itemTailsArena || {})[themeId] || {};
    const tails = {}; for (const t in D.itemTails) tails[t] = parseRows(own[t] || D.itemTails[t]);
    // oggetti dei lessici: quelli dell'arena e quelli comuni a tutte
    const lex = parseRows(D.itemLexCatalog && D.itemLexCatalog[themeId]).concat(parseRows(D.itemLexCatalog && D.itemLexCatalog._));
    const out = { roots, tails, paper: parseRows(D.itemPaper), lex };
    cache.set(themeId, out); return out;
  }
  // le arene con impianti installati (oggetti che non si possono rubare, cedere né perdere a terra)
  const implantCache = new Map();
  D.itemHasImplants = (themeId) => {
    if (!implantCache.has(themeId)) { const c = catalog(themeId); implantCache.set(themeId, Object.values(c.roots).some((rs) => rs.some((r) => r.p.impianto)) || c.lex.some((r) => r.p.impianto)); }
    return implantCache.get(themeId);
  };
  // radici per arena e tipo, nello stesso formato di worldItemData (usato da zz-world.js)
  D.itemRoots = (themeId) => { const c = catalog(themeId), out = {}; for (const t in c.roots) out[t] = c.roots[t].map((r) => r.name).join('|'); return out; };
  /* Descrizione ed effetti di un oggetto dal suo nome. Restituisce sempre qualcosa:
   * per i nomi fuori catalogo (oggetti delle vecchie partite, eventi personalizzati) solo il peso del tipo. */
  D.itemInfo = function (themeId, type, name, soft) {
    const c = catalog(themeId), n = String(name || '');
    let root = (c.roots[type] || []).find((r) => n === r.name || n.startsWith(r.name + ' '));
    // nomi dei lessici: prima lo stesso tipo, poi lo stesso nome; le lettere personali («una lettera di Giada») come una lettera
    if (!root) root = c.lex.find((r) => r.type === type && r.name === n) || c.lex.find((r) => r.name === n) || (/^una lettera di /.test(n) ? c.lex.find((r) => r.name === 'una lettera') : null);
    const fromLex = !!root && c.lex.includes(root);
    const rest = root && !fromLex ? n.slice(root.name.length).trim() : '';
    const tailList = soft && ['arma', 'armatura', 'trap', 'med'].includes(type) ? c.paper : c.tails[type] || [];
    const tail = rest ? tailList.find((t) => t.name === rest) : null;
    // i posti scritti nel catalogo sostituiscono il peso del tipo; quelli delle finiture si sommano
    let p = { posti: D.itemSlots[type] != null ? D.itemSlots[type] : 1 };
    if (root) { const { posti, ...rest } = root.p; p = merge(p, rest); if (posti != null) p.posti = posti; }
    if (tail) p = merge(p, tail.p);
    p.posti = Math.max(0, p.posti);
    return { type, name: n, root: root ? root.name : '', d: root ? root.d : '', td: tail ? tail.d : '', p, known: !!root };
  };
  // l'utilità detta in parole, dagli stessi numeri che usa il motore: niente promesse che il gioco non mantiene
  D.itemUses = function (info, meterName) {
    const p = info.p || {}, out = [];
    if (p.forza) out.push((p.forza > 0 ? 'Più' : 'Meno') + ' forza negli scontri (' + (p.forza > 0 ? '+' : '') + p.forza + ')');
    if (p.assorbe) out.push('Assorbe il ' + (38 + p.assorbe) + '% dei colpi');
    if (p.usi) out.push((p.usi > 0 ? '+' : '') + p.usi + (Math.abs(p.usi) === 1 ? ' colpo' : ' colpi') + ' prima di rompersi');
    if (p.prova) Object.entries(p.prova).forEach(([a, v]) => v && out.push((v > 0 ? '+' : '') + v + ' alle prove di ' + ATTRS[a]));
    if (p.belve) out.push('+' + p.belve + ' contro le aggressioni notturne');
    if (p.indicatore && meterName) out.push('Ripara dal ' + meterName.toLowerCase() + ' (−' + p.indicatore + '% di accumulo)');
    if (p.cura) out.push('Riporta la salute almeno a ' + (70 + p.cura));
    if (p.guarisce) out.push('Guarisce ' + p.guarisce.map((s) => STATI[s]).join(' e '));
    if (p.cibo) out.push('Sfama per ' + (50 + p.cibo));
    if (p.energia) out.push('+' + p.energia + ' energia quando si consuma');
    if (p.morale) out.push(info.type === 'amuleto' || info.type === 'ricordo' || info.type === 'valore' ? '+' + p.morale + ' morale nelle notti peggiori' : '+' + p.morale + ' morale quando si consuma');
    if (p.raccolta) out.push('+' + p.raccolta + '% di trovare cibo di notte');
    if (p.scambio) out.push('Vale di più negli scambi (+' + p.scambio + ')');
    if (p.trappola) out.push('Trappola più dannosa (+' + p.trappola + ')');
    if (p.impianto) out.push('Impianto installato: non si può rubare, cedere né lasciare a terra');
    out.push(p.posti ? 'Occupa ' + p.posti + (p.posti === 1 ? ' posto' : ' posti') + ' nello zaino' : 'Non occupa spazio nello zaino');
    return out;
  };
  D.itemAttrs = ATTRS;
})(typeof window === 'object' ? window : globalThis);
