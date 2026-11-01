/* Città degli Infetti — secondo pacchetto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'zombie',
    ev: {
      b: `
1 +armatura:A @luck | Durante l'evacuazione, {A} trova {armatura} su una barella abbandonata e non fa domande.
1 +attrezzo:A @int | {A} raccoglie {attrezzo} da una macchina della polizia. Sarà più utile di qualunque pistola.
2 al:AB @soc | {A} e {B} si chiudono nello stesso furgone mentre l'orda passa. Quando l'orda se ne va, si danno la mano.
2 k:A>B @agg | {A} spinge {B} verso l'orda per guadagnare tre secondi. Tre secondi bastano.
1 test:A=furt12 ok:+cibo:A ko:s:A=ferito | {A} attraversa il supermercato in punta di piedi e ne esce con lo zaino pieno. || {A} urta uno scaffale di barattoli. Il resto è una corsa con un morso alla caviglia.
`,
      d: `
1 stat:A>pr40 s:A=sconvolto | {A} si guarda il morso allo specchio di un bagno. Poi si guarda gli occhi. Poi smette di guardarsi.
1 stat:A>pr30 con:A=med -med:A pr:A-60 | {A} si inietta l'ultimo antivirale dell'Ospedale. Il nero nelle vene si ritira. Per stavolta.
1 stat:A<hp45 @heal hp:A+20 | {A} si chiude in una farmacia e si medica con quello che trova. Metà delle scatole sono vitamine.
1 stat:A<food30 +cibo:A | {A} apre una lattina senza etichetta. Sono pesche sciroppate. È il giorno più bello della sua vita.
1 con:A=attrezzo +cibo:A @int | {A} usa {attrezzo:A} per forzare la serranda di un alimentari. Dentro è tutto intatto.
1 con:A=valore -valore:A +med:A | {A} baratta {valore} con un vecchio barricato in un negozio. Il vecchio [A:gli/le] dà {med:A} e un consiglio: «Mira alla testa».
1 con:A=ricordo mo:A+15 | {A} accarezza {ricordo:A}. Fuori l'orda geme, ma dentro di l[A:ui/ei] c'è silenzio.
1 wx:buio @stl | Nel blackout, {A} attraversa tre isolati in mezzo agli infetti senza farsi notare.
1 wx:abbondanza +cibo:A | {A} trova una delle casse lanciate dai militari. Dentro c'è perfino della cioccolata.
1 wx:pericolo s:A=ferito | L'orda in migrazione passa a due strade da {A}, che si ferisce scavalcando un cancello per scappare.
1 trait:A=ingegnoso con:A=attrezzo +trap:A | {A} fa una trappola con un allarme d'auto e dei barattoli: gli infetti ci vanno a sbattere, e chiunque altro pure.
2 crush:A>B rel:AB+15 @soc | {A} lascia a {B} l'ultima barretta energetica e dice di non avere fame. Ha fame.
2 crush:A>B love:AB *2 | {A} e {B} si nascondono in un armadio dell'Ospedale per un'ora, stretti, mentre gli infetti passano. Quando escono, si tengono per mano.
2 plot:A>B rel:AB+10 | {A} si offre di controllare i morsi di {B}. Lo fa con molta attenzione. Sta cercando una scusa.
2 plot:A>B steal:A<B=med @stl @secret | {A} sostituisce l'antivirale di {B} con una fiala d'acqua. Fa parte del piano.
2 goal:A=vendetta grudge:A>B hit:A>B | {A} lascia una scia di sangue fino al nascondiglio di {B}: gli infetti fanno il resto. {B} sopravvive, per ora. Per {caro:A}.
2 goal:A=caccia k:A>B @agg | {A} segue {B} per tre isolati, silenzios[A:o/a] come un infetto. Più paziente di un infetto.
2 goal:A=cibo give:B>A=cibo debt:A>B | {B} lancia a {A} una scatoletta dalla finestra di un palazzo. «Non dire a nessuno dove sono.»
2 con:A=armatura hit:B>A | {B} colpisce {A} con una mazza da baseball, ma {armatura:A} attutisce il colpo.
2 con:A=alcol give:A>B=alcol rel:AB+20 | {A} e {B} si scolano {alcol} sul tetto di un palazzo, guardando la città bruciare. È quasi romantico.
2 stat:B>pr60 hit:A>B @agg | {A} vede le vene nere di {B} e l[B:o/a] colpisce prima che sia troppo tardi. Forse è già troppo tardi.
2 stat:B>pr60 save:A>B @heal | {A} vede le vene nere di {B} e invece di scappare l[B:o/a] trascina fino all'Ospedale.
2 owe:A>B repay:A>B rel:AB+10 | {A} copre la ritirata di {B} sparando gli ultimi colpi. Debito saldato.
3 plot:A>B ally:ABC rel:AC+20 | {A} dice a {C} di aver visto un morso sul braccio di {B}. Non è vero. {C} però ci crede.
`,
      n: `
1 stat:A>pr50 pr:A+10 | {A} ha la febbre e sogna di avere fame. Si sveglia affamat[A:o/a] davvero, e non di cibo.
1 stat:A<en25 s:A=ferito | {A} si addormenta di guardia e si sveglia con un infetto che [A:gli/le] mastica lo stivale. Lo stivale si salva, il piede meno.
1 con:A=ricordo | {A} parla sottovoce con {ricordo:A} per non sentire i lamenti in strada.
1 wx:pericolo s:A=sconvolto | Tutta la notte, l'orda graffia la porta del rifugio di {A}. Al mattino la porta regge. {A} un po' meno.
2 crush:A>B @soc | {A} fa la guardia sul tetto tutta la notte perché {B} possa dormire. Al mattino finge di essersi appena svegliat[A:o/a].
2 plot:A>B tr:A>B *2 | {A} apre la porta del rifugio mentre {B} dorme. Gli infetti entrano. {A} esce dall'altra parte.
2 plot:A>B br:A | {A} se ne va prima dell'alba con le chiavi del furgone. {B} sente il motore allontanarsi.
2 couple:AB stat:B>pr60 | {A} controlla il morso di {B} ogni ora. Non dice niente. [B:Gli/Le] stringe solo la mano più forte.
2 couple:AB stat:B<hp40 save:A>B | {A} ricuce {B} con ago e filo da cucito, alla luce di un accendino.
2 hit:A>B trait:A=sonnambulo | {A} cammina nel sonno gemendo come un infetto. {B} si spaventa e l[A:o/a] colpisce con una padella.
`,
      f: `
2 crush:A>B save:A>B | Al lancio dei militari, {A} tira {B} fuori da una folla di infetti per il colletto.
2 plot:A>B k:A>B *2 | Al lancio dei militari, {A} sgambetta {B} in mezzo agli infetti. Faceva parte del piano.
1 con:A=valore -valore:A +arma:A | Al lancio dei militari, {A} paga un soldato con {valore} e riceve {arma}.
`,
      sponsor: `
1 +armatura:A @gift | Un drone militare lascia cadere per {A} {armatura}.
1 +med:A @gift | Gli sponsor mandano a {A} un antivirale sperimentale. L'etichetta dice «forse».
1 +ricordo:A mo:A+20 @gift | Gli sponsor mandano a {A} un vecchio messaggio vocale da casa e {ricordo}.
`,
      finale: `
2 k:A>B | Sul tetto dell'Ospedale, con l'orda che sale le scale, {A} e {B} hanno un solo elicottero e un solo posto. Sale {A}.
2 k:A>B stat:B>pr50 | {B} sta per trasformarsi, e lo sa. {A} lo sa anche. Lo fa in fretta.
`,
    },
    dis: `
L'orda gigante | Centomila infetti invadono la città da nord. | {A} viene travolt[A:o/a] dall'orda. | {A} viene mors[A:o/a] mentre si arrampica su un lampione. | {A} si cosparge di sangue di infetto e cammina in mezzo a loro. | ferito
Il bombardamento | I militari decidono di bombardare la Periferia. | {A} era in Periferia. | {A} viene sbalzat[A:o/a] da un'esplosione. | {A} sente gli aerei arrivare e corre nella Metropolitana. | ferito
Il mutante | Un infetto enorme, grosso come un furgone, sfonda le pareti della Scuola. | {A} si trova sulla sua strada. | {A} viene lanciat[A:o/a] contro un muro. | {A} si nasconde in un armadietto e trattiene il respiro. | ferito
L'acqua contaminata | L'acquedotto è contaminato: chi beve si ammala. | {A} beve dal rubinetto senza pensarci. | {A} ne beve un sorso e passa la notte con la febbre. | {A} beve solo acqua in bottiglia, per principio. | malato
L'incendio dei palazzi | Un incendio si propaga da un palazzo all'altro. | {A} resta intrappolat[A:o/a] all'ultimo piano. | {A} salta da una finestra e atterra su un'auto. | {A} è già in strada e guarda le fiamme da lontano. | ferito
Gli infetti corridori | Una nuova varietà di infetti, velocissimi, esce dalla Metropolitana. | {A} non corre abbastanza veloce. | {A} viene raggiunt[A:o/a] e graffiat[A:o/a]. | {A} sale su un tetto e lascia che passino. | ferito
La sirena dei militari | Gli altoparlanti annunciano un'evacuazione falsa: tutti verso la piazza. | {A} va in piazza. In piazza ci sono solo infetti. | {A} capisce l'inganno all'ultimo e scappa ferit[A:o/a]. | {A} non crede mai agli altoparlanti. | sconvolto
Il gas nervino | I militari rilasciano un gas per fermare gli infetti. Ferma anche i vivi. | {A} respira il gas. | {A} tossisce per ore e trema. | {A} indossa una maschera antigas trovata giorni prima. | malato
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
