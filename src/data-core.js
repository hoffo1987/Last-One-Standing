/* Last One Standing — eventi di base (italiano).
 * Formato riga:  <n> <tag...> | <testo>
 *  n            numero di concorrenti coinvolti (A, B, C, ...)
 *  k:AB>CD      A e B uccidono C e D           d:AB   A e B muoiono (ambiente)
 *  tr:A>B       A tradisce e uccide l'alleato B br:A   A abbandona la sua alleanza
 *  al:AB        A e B si alleano               ally:AB richiede che siano alleati
 *  w:A          A deve avere un'arma           +arma:A A ottiene {arma}
 *  -arma:A      A perde l'arma                 steal:A<B A ruba l'arma di B
 *  +cibo:A / cibo:A   ottiene / consuma cibo   +med:A / med:A  ottiene / usa medicine
 *  +trap:A / trap:A   ottiene / usa trappola   s:A=ferito  imposta uno stato
 *  need:A=ferito (o need:A=*) richiede uno stato  cure:A rimuove gli stati
 *  @agg @soc @stl @int @heal @luck @mad @cow  indole dell'evento   *2  peso
 * Segnaposto: {A} nome, [A:o/a/ə] accordo di genere, [AB:i/e] accordo di gruppo,
 *  {arma} {cibo} {luogo} {mostro} {trappola} {rifugio} {dono}  lessico del tema,
 *  {arma:A} l'arma posseduta da A con possessivo ("il suo arco").
 */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});

  D.core = {
    b: `
1 | {A} afferra uno zaino e fugge senza voltarsi.
1 +arma:A | {A} recupera {arma} dal mucchio dei rifornimenti.
1 @stl | {A} si allontana di soppiatto prima che qualcuno l[A:o/a] noti.
1 +cibo:A | {A} arraffa {cibo} e corre verso {luogo}.
1 +med:A | {A} trova un kit medico e se lo stringe al petto.
1 @cow | {A} scappa a mani vuote, senza nemmeno provarci.
1 s:A=ferito | {A} inciampa nella calca e si ferisce a una gamba.
1 +trap:A @int | {A} raccoglie corde e fili per costruire trappole.
1 +arma:A +cibo:A @luck | {A} riempie uno zaino di provviste e ci trova dentro anche {arma}.
1 | {A} resta paralizzat[A:o/a] dalla paura per qualche secondo, poi corre via.
1 d:A | {A} si lancia troppo presto e finisce dritt[A:o/a] in {trappola}.
1 @int | {A} studia il campo di battaglia da lontano prima di muoversi.
1 +cibo:A @stl | {A} sgattaiola tra le casse e si porta via {cibo}.
2 k:A>B +arma:A @agg | {A} strappa {arma} dalle mani di {B} e l[B:o/a] colpisce a morte.
2 k:A>B @agg | {A} sorprende {B} alle spalle e non [B:gli/le] lascia scampo.
2 k:A>B | {A} e {B} si contendono uno zaino: {A} ha la meglio e {B} non si rialza più.
2 k:A>B +arma:A | {A} scaglia {arma} contro {B}, che crolla a terra.
2 k:A>B w:A @agg | {A} trafigge {B} con {arma:A}.
2 k:A>B k:B>A | {A} e {B} si colpiscono nello stesso istante: nessuno dei due sopravvive.
2 al:AB @soc | {A} e {B} si scambiano uno sguardo e decidono di fuggire insieme.
2 | {A} e {B} lottano per una borraccia, poi scappano in direzioni opposte.
2 s:B=ferito @agg | {A} colpisce {B} con un sasso e l[B:o/a] lascia stordit[B:o/a].
2 | {A} spinge via {B} per arrivare per prim[A:o/a] a uno zaino.
2 @heal | {A} trascina {B} fuori dalla mischia e [B:gli/le] salva la vita.
2 k:A>B @mad | {A} ride mentre colpisce {B} ancora e ancora.
2 @cow | {A} si nasconde dietro una cassa mentre {B} passa lì accanto senza vederl[A:o/a].
3 k:AB>C al:AB @agg | {A} e {B} uniscono le forze per eliminare {C}.
3 k:A>BC @agg *0.6 | {A} fa strage: {B} e {C} cadono un[BC:o/a] dopo l'altr[BC:o/a].
3 al:ABC @soc | {A}, {B} e {C} formano un'alleanza in mezzo al caos.
3 k:A>B | {A} uccide {B} mentre {C} approfitta della distrazione per fuggire.
3 | {A}, {B} e {C} arrivano insieme allo stesso zaino e se lo strappano a vicenda.
4 k:AB>CD @agg *0.6 | {A} e {B} tendono un agguato a {C} e {D}: nessuno dei due sopravvive.
4 al:AB al:CD | {A} e {B} si alleano, mentre poco lontano fanno lo stesso {C} e {D}.
`,
    d: `
1 | {A} esplora i dintorni di {luogo} senza incontrare nessuno.
1 +cibo:A @int | {A} trova {cibo} e fa scorta.
1 cibo:A | {A} si concede un pasto con le provviste messe da parte.
1 +trap:A @int | {A} prepara una trappola rudimentale.
1 +arma:A @luck | {A} trova {arma} sotto un cumulo di detriti.
1 | {A} si allena lanciando sassi contro un bersaglio improvvisato.
1 @stl | {A} segue a distanza le tracce di un altro concorrente.
1 s:A=ferito | {A} scivola su una roccia e si sloga una caviglia.
1 s:A=avvelenato | {A} mangia qualcosa dall'aspetto strano e si sente subito male.
1 need:A=* med:A cure:A *3 | {A} usa il kit medico e si rimette in sesto.
1 need:A=* cure:A @heal | {A} si medica con bende improvvisate e si sente meglio.
1 need:A=ferito d:A *2 | {A} soccombe alle ferite riportate.
1 need:A=avvelenato d:A *2 | {A} crolla a terra: il veleno ha fatto il suo effetto.
1 need:A=malato d:A *1.5 | {A} cede alla febbre che l[A:o/a] consumava da giorni.
1 d:A | {A} mette un piede in fallo e finisce in {trappola}.
1 d:A | {A} viene sorpres[A:o/a] da {mostro} e non ha scampo.
1 s:A=ferito | {A} sfugge a {mostro}, ma non senza ferite.
1 @cow | {A} passa la giornata nascost[A:o/a] in {rifugio}.
1 | {A} cerca una fonte d'acqua verso {luogo}.
1 +med:A @soc | {A} riceve {dono}: dentro c'è un kit medico.
1 +arma:A @soc | {A} riceve {dono}: dentro c'è {arma}.
1 +cibo:A @soc | {A} riceve {dono}: dentro c'è {cibo}.
1 @mad | {A} parla da sol[A:o/a] per ore, ridendo a battute che sente solo [A:lui/lei/loro].
1 | {A} chiude gli occhi e prega di poter tornare a casa.
1 s:A=malato | {A} beve acqua stagnante e si ammala.
1 trap:A @int | {A} piazza una trappola verso {luogo} e aspetta.
1 @luck +cibo:A +med:A | {A} scopre un deposito dimenticato con cibo e medicine.
1 | {A} si arrampica su un punto alto per osservare l'arena.
1 @stl | {A} cancella le proprie tracce con cura maniacale.
1 -arma:A w:A | {A} perde {arma:A} attraversando un tratto impervio.
2 al:AB @soc | {A} e {B} decidono di allearsi.
2 al:AB @heal | {A} trova {B} in difficoltà e decide di aiutarl[B:o/a]: da oggi sono alleati.
2 ally:AB | {A} e {B} vanno a caccia insieme e dividono il bottino.
2 ally:AB | {A} e {B} si raccontano storie di casa per farsi coraggio.
2 ally:AB br:A @betray | {A} approfitta di una distrazione di {B} per abbandonarl[B:o/a] con tutte le provviste.
2 tr:A>B | {A} tradisce {B} e l[B:o/a] colpisce alle spalle.
2 k:A>B w:A @agg | {A} insegue {B} e l[B:o/a] uccide con {arma:A}.
2 k:A>B @agg | {A} sorprende {B} verso {luogo} e non [B:gli/le] lascia scampo.
2 k:A>B @stl | {A} tende un agguato a {B} e l[B:o/a] elimina in silenzio.
2 k:A>B trap:A @int *2 | {B} finisce nella trappola preparata da {A}.
2 k:A>B | {A} e {B} si affrontano in duello: {B} non sopravvive.
2 k:A>B k:B>A *0.5 | {A} e {B} si feriscono a morte a vicenda.
2 s:B=ferito @agg | {A} attacca {B}, che riesce a fuggire ferit[B:o/a].
2 | {A} e {B} si incrociano, si studiano a lungo e poi se ne vanno ognuno per la propria strada.
2 cibo:B +cibo:A @stl | {A} ruba le provviste di {B} mentre è distratt[B:o/a].
2 steal:A<B @stl | {A} sottrae {arma:B} a {B} senza farsi vedere.
2 need:B=* cure:B @heal | {A} medica le ferite di {B}.
2 d:B | {A} assiste impotente mentre {B} viene trascinat[B:o/a] via da {mostro}.
2 k:A>B @mad | {A} perde il controllo e massacra {B} senza un motivo apparente.
2 al:AB | {A} salva {B} da {mostro}: i due stringono un patto.
2 @cow | {A} vede {B} da lontano e cambia strada di corsa.
2 s:A=ferito | {A} prova ad attaccare {B}, ma ha la peggio e deve ritirarsi.
3 al:ABC @soc | {A}, {B} e {C} formano un'alleanza.
3 k:AB>C @agg | {A} e {B} danno la caccia a {C} e l[C:o/a] raggiungono verso {luogo}.
3 k:A>C | {A} uccide {C} mentre {B} osserva la scena da un nascondiglio.
3 k:C>AB *0.5 | {C} elimina sia {A} che {B} con un'unica imboscata.
3 | {A}, {B} e {C} si contendono la stessa fonte d'acqua, ma nessuno osa attaccare per prim[ABC:o/a].
3 ally:AB k:AB>C | {A} e {B} difendono il loro accampamento da {C}, che resta a terra.
3 ally:AB s:C=ferito | {A} e {B} respingono l'assalto di {C}.
3 @heal need:C=* cure:C | {A} e {B} trovano {C} in fin di vita e l[C:o/a] curano.
4 al:ABCD @soc *0.6 | {A}, {B}, {C} e {D} uniscono le forze in un'unica alleanza.
4 k:AB>CD *0.5 | Le alleanze si scontrano: {A} e {B} hanno la meglio su {C} e {D}.
4 k:A>B s:C=ferito | {A} uccide {B} e ferisce {C}, mentre {D} fugge.
`,
    n: `
1 | {A} accende un piccolo fuoco e si scalda le mani.
1 @stl | {A} rinuncia al fuoco per non farsi notare.
1 | {A} non riesce a chiudere occhio.
1 | {A} dorme profondamente in {rifugio}.
1 @mad | {A} canta a bassa voce nel buio.
1 | {A} piange in silenzio pensando a casa.
1 | {A} ripensa ai volti di chi è cadut[A:o/a] prima di [A:lui/lei/loro].
1 s:A=malato | {A} passa la notte al freddo e si prende la febbre.
1 d:A *0.6 | {A} non sopravvive al gelo della notte.
1 d:A | {A} viene attaccat[A:o/a] nel sonno da {mostro}.
1 need:A=* d:A *2 | {A} non arriva all'alba: le sue condizioni erano troppo gravi.
1 need:A=* cure:A *1.5 | {A} si riposa e al risveglio si sente meglio.
1 +cibo:A @soc | {A} riceve {dono}: dentro c'è una cena calda.
1 @int | {A} disegna una mappa dell'arena alla luce fioca delle stelle.
1 cibo:A | {A} mangia quel che resta delle provviste.
1 s:A=affamato | {A} si addormenta con lo stomaco vuoto.
1 need:A=affamato d:A *2 | {A} muore di stenti.
1 need:A=affamato +cibo:A cure:A *2 | {A} trova {cibo} e finalmente mangia.
1 @luck | {A} trova un angolo riparato e passa una notte tranquilla.
1 +trap:A @int | {A} circonda il proprio accampamento di trappole.
1 | {A} sente dei passi nel buio e resta immobile fino all'alba.
2 ally:AB | {A} e {B} si danno il cambio per fare la guardia.
2 ally:AB | {A} e {B} dormono schiena contro schiena.
2 ally:AB tr:A>B | {A} soffoca {B} nel sonno.
2 ally:AB br:A @betray | {A} se ne va prima dell'alba, lasciando {B} da sol[B:o/a].
2 k:A>B @stl | {A} si avvicina all'accampamento di {B} e l[B:o/a] uccide nel sonno.
2 k:A>B @agg | {A} individua il fuoco di {B} e l[B:o/a] attacca.
2 s:B=ferito | {A} attacca {B} al buio, ma {B} riesce a scappare.
2 | {A} e {B} parlano tutta la notte, senza fidarsi davvero.
2 al:AB @soc | {A} e {B} condividono un fuoco e decidono di restare insieme.
2 @cow | {A} sente {B} piangere nel buio e decide di non attaccare.
2 need:B=* cure:B @heal | {A} veglia su {B} per tutta la notte e ne cura le ferite.
2 k:A>B trap:A *2 | Nel buio, {B} cammina dritt[B:o/a] nella trappola di {A}.
2 d:AB *0.5 | {A} e {B} vengono sorpres[AB:i/e] nel sonno da {mostro}.
3 ally:ABC | {A}, {B} e {C} si raccontano storie attorno al fuoco.
3 k:A>BC @stl *0.5 | {A} lancia un attacco notturno: {B} e {C} non si svegliano più.
3 ally:AB tr:A>B | {A} uccide {B} nel sonno, mentre {C} finge di dormire poco lontano.
3 k:AB>C @agg | {A} e {B} attaccano di notte l'accampamento di {C}.
3 | {A}, {B} e {C} si accampano a pochi metri l'uno dall'altro senza saperlo.
4 ally:ABCD | Il gruppo di {A}, {B}, {C} e {D} passa la notte senza incidenti.
`,
    f: `
1 +arma:A +cibo:A | {A} arriva per prim[A:o/a] al festino e si porta via due zaini.
1 @cow | {A} decide di non partecipare al festino.
1 +med:A @stl | {A} si infiltra al festino, prende un kit medico e sparisce.
1 need:A=* cure:A *3 | {A} recupera esattamente ciò che serve per guarire.
1 d:A | {A} cade in {trappola} piazzata attorno al banchetto.
1 +arma:A | {A} apre il proprio zaino e ci trova {arma}.
1 | {A} osserva il festino da lontano e aspetta che torni la calma.
2 k:A>B @agg | {A} aspetta {B} al festino e l[B:o/a] uccide.
2 k:A>B w:A | {A} difende il proprio zaino e abbatte {B} con {arma:A}.
2 | {A} e {B} si contendono lo stesso zaino: {B} riesce a fuggire per un soffio.
2 s:B=ferito +cibo:A | {A} ferisce {B} e [B:gli/le] strappa lo zaino.
2 tr:A>B | {A} sfrutta la confusione del festino per sbarazzarsi di {B}.
2 al:AB @soc | {A} e {B} decidono di dividersi le provviste invece di combattere.
2 k:A>B k:B>A *0.4 | {A} e {B} si lanciano sullo stesso zaino e si uccidono a vicenda.
3 k:A>BC *0.6 | {A} fa piazza pulita: {B} e {C} cadono attorno al banchetto.
3 k:AB>C al:AB | {A} e {B} si coprono le spalle ed eliminano {C}.
3 | {A}, {B} e {C} arrivano insieme, si guardano e se ne vanno ognuno con il proprio zaino.
4 k:AB>CD *0.6 | {A} e {B} tendono un'imboscata al festino: {C} e {D} non tornano indietro.
5 k:A>BCDE *0.25 | {A} trasforma il festino in un massacro: {B}, {C}, {D} e {E} cadono un[BCDE:o/a] dopo l'altr[BCDE:o/a].
`,
    finale: `
2 k:A>B | Nello scontro finale {A} ha la meglio su {B}.
2 k:A>B w:A | {A} affronta {B} un'ultima volta e vince con {arma:A}.
2 k:A>B @stl | {A} sorprende {B} con un'ultima mossa astuta.
2 k:A>B | {A} e {B} lottano fino allo stremo: alla fine resta in piedi solo {A}.
2 k:A>B @luck | {B} scivola nel momento decisivo e {A} ne approfitta.
2 k:A>B | {A} spinge {B} in {trappola}.
`,
    ds: `
1 | {A} trova riparo appena in tempo.
1 @luck | {A} se la cava per un soffio.
1 s:A=ferito | {A} sopravvive, ma con brutte ferite.
1 @stl | {A} si rifugia in {rifugio} e aspetta che passi tutto.
1 @int | {A} aveva capito tutto in anticipo ed era già lontan[A:o/a].
2 ally:AB | {A} e {B} si aiutano a vicenda e ne escono san[AB:i/e] e salv[AB:i/e].
2 @heal | {A} trascina in salvo {B}.
2 k:A>B @agg | Nel caos, {A} spinge indietro {B} per salvarsi.
`,
    fallback: `
1 | {A} passa il tempo senza che accada nulla di rilevante.
`,
  };

  /* ---------- Caratteristiche e tratti ---------- */
  D.attrs = [
    { id: 'for', name: 'Forza' },
    { id: 'agi', name: 'Agilità' },
    { id: 'int', name: 'Intelligenza' },
    { id: 'car', name: 'Carisma' },
    { id: 'fort', name: 'Fortuna' },
    { id: 'res', name: 'Resistenza' },
    { id: 'furt', name: 'Furtività' },
    { id: 'cor', name: 'Coraggio' },
    { id: 'emp', name: 'Empatia' },
    { id: 'sop', name: 'Sopravvivenza' },
  ];
  D.attrDesc = {
    for: 'Colpisce più forte e vince le prove di forza.', agi: 'Schiva, salta, scappa: conta in combattimento e nelle prove di agilità.',
    int: 'Trappole, piani e prove di ingegno.', car: 'Stringe alleanze, conquista il pubblico e gli sponsor.',
    fort: 'Aggiunge un bonus a ogni prova e protegge dagli incidenti.', res: 'Sopporta ferite, veleni e malattie.',
    furt: 'Agguati, furti e fughe silenziose.', cor: 'Meno fughe e meno shock; più voglia di combattere.',
    emp: 'Aiuta e cura gli altri, ma soffre di più per i lutti e giura vendetta più facilmente.', sop: 'Trova cibo, resiste alla fame e se la cava nei disastri.',
  };

  // m: moltiplicatori per indole evento; c: bonus combattimento; s: bonus sopravvivenza
  D.traits = [
    { id: 'leale', name: 'Leale', desc: 'Difende gli alleati e non tradisce quasi mai.', m: { soc: 1.5, betray: 0.1 } },
    { id: 'traditore', name: 'Traditore', desc: 'Stringe alleanze solo per romperle.', m: { betray: 3, soc: 1.2 } },
    { id: 'codardo', name: 'Codardo', desc: 'Scappa invece di combattere.', m: { cow: 2.5, agg: 0.4 }, c: -2, s: 1 },
    { id: 'spietato', name: 'Spietato', desc: 'Cerca lo scontro e non fa prigionieri.', m: { agg: 2, heal: 0.3 }, c: 2 },
    { id: 'pacifista', name: 'Pacifista', desc: 'Evita la violenza e aiuta chi soffre.', m: { agg: 0.2, heal: 2, soc: 1.4 }, c: -2 },
    { id: 'stratega', name: 'Stratega', desc: 'Pianifica ogni mossa.', m: { int: 2, stl: 1.2 }, c: 1, s: 1 },
    { id: 'impulsivo', name: 'Impulsivo', desc: 'Agisce prima di pensare.', m: { agg: 1.5, int: 0.5 }, s: -1 },
    { id: 'cacciatore', name: 'Cacciatore', desc: 'Sa seguire le tracce e procurarsi il cibo.', m: { agg: 1.4, stl: 1.3 }, c: 2 },
    { id: 'guaritore', name: 'Guaritore', desc: 'Sa curare sé e gli altri.', m: { heal: 2.5, soc: 1.2 }, s: 1 },
    { id: 'sopravvissuto', name: 'Sopravvissuto', desc: 'Resiste a tutto ciò che l\'arena gli scaglia contro.', m: {}, s: 3 },
    { id: 'carismatico', name: 'Carismatico', desc: 'Conquista alleati e sponsor.', m: { soc: 2 } },
    { id: 'paranoico', name: 'Paranoico', desc: 'Non si fida di nessuno.', m: { soc: 0.4, betray: 1.5, stl: 1.3 }, s: 1 },
    { id: 'fortunato', name: 'Fortunato', desc: 'La sorte sembra sempre dalla sua parte.', m: { luck: 2 }, s: 2 },
    { id: 'sfortunato', name: 'Sfortunato', desc: 'Se qualcosa può andare storto, andrà storto.', m: { luck: 0.3 }, s: -3 },
    { id: 'furtivo', name: 'Furtivo', desc: 'Si muove senza fare rumore.', m: { stl: 2.2 }, s: 1 },
    { id: 'bruto', name: 'Bruto', desc: 'Forza bruta, poca strategia.', m: { agg: 1.6, int: 0.6 }, c: 3 },
    { id: 'ingegnoso', name: 'Ingegnoso', desc: 'Costruisce trappole e soluzioni.', m: { int: 2 }, c: 1 },
    { id: 'folle', name: 'Folle', desc: 'Imprevedibile, in ogni senso.', m: { mad: 3, agg: 1.3 } },
    { id: 'romantico', name: 'Romantico', desc: 'Si innamora facilmente e vive per la propria coppia.', m: { love: 2.8, soc: 1.2 } },
    { id: 'vendicativo', name: 'Vendicativo', desc: 'Non dimentica un torto: giura vendetta per poco e la insegue ovunque.', m: { revenge: 2.5, forgive: 0.2 } },
    { id: 'clemente', name: 'Clemente', desc: 'Perdona facilmente e raramente cerca vendetta.', m: { forgive: 3.5, revenge: 0.4, agg: 0.7 } },
    { id: 'generoso', name: 'Generoso', desc: 'Regala, salva e divide il cibo.', m: { give: 2.5, heal: 1.3 } },
    { id: 'avido', name: 'Avido', desc: 'Ruba appena può e non regala niente.', m: { steal: 2.5, give: 0.3, betray: 1.4 } },
    { id: 'esibizionista', name: 'Esibizionista', desc: 'Vive per le telecamere: fa spettacolo e guadagna fama in fretta.', m: { show: 2.6 } },
    { id: 'ubriacone', name: 'Ubriacone', desc: 'Trova sempre una bottiglia, e la finisce.', m: { drunk: 3, mad: 1.3 }, c: -1 },
    { id: 'superstizioso', name: 'Superstizioso', desc: 'Il suo portafortuna non l\'ha mai tradito: lo salva sempre.', m: { luck: 1.4 } },
    { id: 'goloso', name: 'Goloso', desc: 'Pensa sempre al cibo e patisce la fame prima degli altri.', m: { food: 2.5 } },
    { id: 'sonnambulo', name: 'Sonnambulo', desc: 'Di notte vaga, e combina guai.', m: { mad: 1.6 } },
    { id: 'leader', name: 'Leader', desc: 'Raduna gli altri: alleanze più grandi e più frequenti.', m: { ally: 2, soc: 1.5 } },
    { id: 'solitario', name: 'Solitario', desc: 'Sta meglio da solo: poche alleanze, molta furtività.', m: { ally: 0.3, soc: 0.5, stl: 1.5 }, s: 1 },
  ];

  D.names = {
    M: ['Bruno', 'Dario', 'Fabio', 'Ivo', 'Marco', 'Oscar', 'Rocco', 'Tommaso', 'Ugo', 'Walter', 'Enea', 'Leone', 'Nico', 'Pietro', 'Silvio', 'Vito', 'Brando', 'Cesare', 'Furio', 'Ettore', 'Lapo', 'Orlando', 'Romeo', 'Gianni', 'Luca', 'Matteo', 'Elia', 'Riccardo', 'Saverio', 'Teo', 'Aldo', 'Ivan'],
    F: ['Aurora', 'Chiara', 'Elena', 'Giada', 'Lara', 'Nadia', 'Paola', 'Sara', 'Vera', 'Zoe', 'Alba', 'Ilaria', 'Mirta', 'Ottavia', 'Rebecca', 'Tea', 'Agata', 'Dafne', 'Emma', 'Gemma', 'Irene', 'Matilde', 'Nora', 'Priscilla', 'Sveva', 'Bianca', 'Carla', 'Livia', 'Marta', 'Noemi', 'Viola', 'Greta'],
    N: ['Ariel', 'Sasha', 'Noa', 'Eden', 'Alex', 'Andrea', 'Sole', 'Kai'],
  };
})(typeof window !== 'undefined' ? window : globalThis);
