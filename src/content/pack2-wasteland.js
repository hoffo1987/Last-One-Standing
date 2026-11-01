/* Terre Desolate — secondo pacchetto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'wasteland',
    ev: {
      b: `
1 +armatura:A @luck | Al deposito, {A} afferra {armatura}. Puzza di benzina, ma ferma i proiettili.
1 +attrezzo:A @int | {A} prende {attrezzo} invece di un'arma. Nel deserto, chi ripara vive più a lungo.
2 al:AB @soc | {A} e {B} si contendono una tanica d'acqua, poi decidono che si beve meglio in due.
2 k:A>B @agg | {A} investe {B} con un carrello della spesa truccato con un motore da tosaerba.
1 test:A=sop12 ok:+cibo:A ko:food:A-25 | {A} riconosce una cassa di razioni intatte sotto la sabbia. || {A} scava per un'ora sotto la sabbia. Trova solo uno scorpione arrabbiato e più sete.
`,
      d: `
1 stat:A>pr50 con:A=med -med:A pr:A-45 | {A} si inietta un antiradiazioni scaduto da vent'anni. Funziona a metà. Meglio di niente.
1 stat:A>pr60 s:A=malato | {A} vomita verde dietro una carcassa d'auto e scopre di avere un neo nuovo. Che brilla.
1 stat:A<hp45 @heal hp:A+20 | {A} si cuce una ferita con un filo di nylon e un ago da pesca.
1 stat:A<food30 +cibo:A | {A} trova un distributore abbandonato con un'ultima lattina dentro. La scuote, la apre: è ancora frizzante.
1 stat:A<food20 hp:A-15 | {A} beve da una pozzanghera perché non ce la fa più. La pozzanghera era di un colore che non esiste in natura.
1 con:A=attrezzo +cibo:A @int | {A} usa {attrezzo:A} per filtrare l'acqua di un tombino. Ne esce acqua bevibile e un tappo di bottiglia.
1 con:A=valore -valore:A +med:A | {A} baratta {valore} con un mercante di passaggio. Ottiene {med:A} e un'occhiata di compassione.
1 con:A=ricordo mo:A+15 | {A} pulisce {ricordo:A} dalla sabbia, con cura. È l'unica cosa pulita nel raggio di cento chilometri.
1 wx:buio @stl | Nella tempesta di sabbia, {A} attraversa l'accampamento dei predoni senza farsi vedere.
1 wx:abbondanza +cibo:A | {A} incrocia una carovana di mercanti di buon umore: ne esce con una borsa di cibo e un cappello.
1 wx:pericolo s:A=ferito | Il caldo di oggi spacca la pelle delle mani di {A}, che fatica a stringere qualunque cosa.
1 trait:A=ingegnoso con:A=attrezzo +trap:A | {A} costruisce una trappola con una molla di materasso e una latta. Non è bella, ma è cattiva.
1 trait:A=avido +valore:A | {A} scava sotto un vecchio casinò e trova {valore}. Non lo dirà a nessuno.
2 crush:A>B rel:AB+15 @soc | {A} regala a {B} l'ultimo sorso della propria borraccia. Nel deserto, è una dichiarazione d'amore.
2 crush:A>B love:AB *2 | {A} e {B} guardano il tramonto radioattivo dal tetto di un autobus. È verde e bellissimo. Si baciano.
2 plot:A>B rel:AB+10 | {A} insegna a {B} come guidare il motore truccato. Lascia fuori un dettaglio importante sui freni.
2 plot:A>B -cibo:B +cibo:A @stl | {A} travasa, un sorso alla volta, la borraccia di {B} nella propria. Fa parte del piano.
2 goal:A=vendetta grudge:A>B hit:A>B | {A} insegue {B} con un pick-up per tre chilometri per {caro:A}. L[B:o/a] colpisce di striscio.
2 goal:A=caccia k:A>B @agg | {A} segue le tracce di pneumatico di {B} nel deserto. Le tracce finiscono, e anche {B}.
2 goal:A=cibo give:B>A=cibo debt:A>B | {B} lancia a {A} una lattina ammaccata. «Quando trovi acqua, ricordati di me.»
2 con:A=armatura hit:B>A | {B} colpisce {A} con una spranga, ma {armatura:A} fa un rumore di campana e regge.
2 con:A=alcol give:A>B=alcol rel:AB+20 | {A} e {B} si passano {alcol} attorno a un fuoco di copertoni. Non sono amici. Stasera, quasi.
2 steal:A<B @stl trait:A=avido | {A} sfila {arma:B} dalla cintura di {B} mentre [B:gli/le] offre da bere.
2 owe:A>B repay:A>B rel:AB+10 | {A} tira fuori {B} dalle sabbie mobili con una catena da moto. Debito saldato.
3 plot:A>B ally:ABC rel:AC+20 | {A} dice a {C} di aver visto {B} contare le razioni del gruppo di notte. {C} comincia a contare quelle di {B}.
`,
      n: `
1 stat:A>pr60 pr:A+10 | {A} non riesce a dormire: le proprie mani brillano leggermente al buio.
1 stat:A<en25 s:A=ferito | {A} si addormenta su un'auto e scivola giù dal cofano. Il cofano era in pendenza. L'atterraggio, sui sassi.
1 con:A=ricordo | {A} si addormenta con {ricordo:A} sotto la testa, a mo' di cuscino.
1 wx:pericolo s:A=sconvolto | Tutta la notte, motori lontani. {A} spegne il fuoco e trema fino all'alba.
2 crush:A>B @soc | {A} copre {B} con la propria giacca mentre dorme. Il deserto, di notte, è gelido.
2 plot:A>B tr:A>B *2 | {A} aspetta che {B} si addormenti vicino al fuoco di copertoni. Il fuoco si spegne. Anche {B}.
2 plot:A>B br:A | {A} se ne va con la moto e l'acqua del gruppo. {B} si sveglia e vede solo una scia di polvere.
2 couple:AB pr:A-10 pr:B-10 | {A} e {B} dormono abbracciati dentro una cisterna vuota. Per una notte, il mondo sta fuori.
2 couple:AB stat:B<hp40 save:A>B | {A} porta {B} sulle spalle fino al bunker crollato, sotto la luna.
2 hit:A>B trait:A=sonnambulo | {A} cammina nel sonno e, convint[A:o/a] che {B} sia un predone, [B:gli/le] tira una padella.
`,
      f: `
2 crush:A>B save:A>B | Al convoglio, {A} tira {B} giù da un camion un attimo prima che esploda.
2 plot:A>B k:A>B *2 | All'assalto del convoglio, {A} spinge {B} sotto le ruote del camion. Era il piano dall'inizio.
1 con:A=valore -valore:A +armatura:A | Al convoglio, {A} paga un predone pentito con {valore} e ottiene {armatura}.
`,
      sponsor: `
1 +armatura:A @gift | Un drone degli sponsor lascia cadere per {A} {armatura} e una bottiglia d'acqua.
1 +attrezzo:A @gift | Gli sponsor mandano a {A} {attrezzo}, con le istruzioni in sette lingue.
1 +ricordo:A mo:A+20 @gift | Gli sponsor mandano a {A} una vecchia fotografia di casa e {ricordo}.
`,
      finale: `
2 k:A>B | Sulla Diga, con il sole che spacca le pietre, {A} e {B} si affrontano con quello che resta. Resta in piedi {A}.
2 k:A>B stat:B>pr60 | {B} è consumat[B:o/a] dalle radiazioni: attacca {A} con le ultime forze. {A} ne ha di più.
`,
    },
    dis: `
La tempesta di vetro | Il vento solleva milioni di schegge di vetro fuso. | {A} viene sorpres[A:o/a] allo scoperto. | {A} si ritrova con la schiena piena di schegge. | {A} si nasconde in un tubo di cemento. | ferito
L'esplosione della Raffineria | La Raffineria salta in aria con un boato che si sente a cento chilometri. | {A} era troppo vicin[A:o/a]. | {A} viene ustionat[A:o/a] dall'onda di calore. | {A} si butta dietro un muro di sacchi di sabbia. | ferito
La pioggia acida | Dal cielo cade una pioggia che corrode il metallo. | {A} non trova riparo. | {A} si ritrova la pelle piena di piccole ustioni. | {A} si infila sotto un camion ribaltato. | ferito
I vermi delle dune | Vermi giganti emergono dalla sabbia. | {A} viene inghiottit[A:o/a] da un verme. | {A} viene sbalzat[A:o/a] in aria da una duna che esplode. | {A} resta immobile finché i vermi non se ne vanno. | ferito
Il crollo della Diga | La Diga cede: un muro d'acqua attraversa il deserto. | {A} viene travolt[A:o/a] dall'acqua. | {A} viene trascinat[A:o/a] per un chilometro e beve molta acqua sporca. | {A} sale sulla carcassa di un aereo. | malato
L'invasione dei predoni | Una banda di predoni attraversa l'arena bruciando tutto. | {A} viene catturat[A:o/a] e non torna. | {A} viene derubat[A:o/a] e picchiat[A:o/a]. | {A} si finge mort[A:o/a] e i predoni passano oltre. | ferito
La siccità | Per un giorno intero non si trova una goccia d'acqua. | {A} crolla disidratat[A:o/a]. | {A} si trascina per ore con la lingua gonfia. | {A} aveva una tanica nascosta sotto la sabbia. | affamato
Il cratere che si apre | Il terreno sprofonda in un nuovo cratere radioattivo. | {A} cade nel cratere. | {A} si ferma sul bordo, ma respira polvere velenosa. | {A} sente il terreno tremare e si allontana di corsa. | malato
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
