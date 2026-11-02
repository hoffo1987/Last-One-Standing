/* Eventi e disastri condivisi: lo show, il pubblico, la regia, gli organizzatori.
 * '*' vale per tutte le arene con combattimento; l'ultimo blocco per Liceo e Ufficio. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: '*',
    ev: {
      b: `
1 @cow | {A} resta sulla piattaforma a fare stretching. Quando finisce, la mischia è già finita. Ottimo tempismo.
1 @show star:A | {A} si fa il segno della croce, poi quello delle corna, poi quello della vittoria. Copre tutte le basi.
2 | {A} e {B} afferrano lo stesso zaino, si guardano, si dicono "prego" e "no, prego tu" finché non arriva qualcun altro a prenderlo.
2 k:A>B @luck | {A} lancia lo zaino alla cieca dietro di sé per alleggerirsi. Colpisce {B} in pieno. Fortuna, o destino.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano nello stesso cespuglio e decidono che è un segno.
1 s:A=ferito @mad | {A} corre verso la mischia urlando un grido di battaglia, inciampa al terzo passo e si sloga una spalla. Grido memorabile, comunque.
`,
      d: `
1 @show | {A} saluta la mamma in camera. Poi saluta la nonna. Poi la zia. Poi il cane. La regia stacca.
1 @mad | {A} si convince di essere in un sogno e prova a volare da un masso. Non è un sogno. Ma il masso era basso.
1 @int | {A} tiene un diario dettagliato dell'arena. Il titolo provvisorio è "Come sono sopravvissut[A:o/a] e voi no".
1 | {A} passa un'ora a cercare di ricordare se ha chiuso il gas di casa prima di partire.
1 +cibo:A @luck | {A} trova {cibo} esattamente dove l'aveva sognato la notte prima. Inizia a credere nei sogni.
1 s:A=ferito | {A} prova a fare un salto acrobatico per gli sponsor. Gli sponsor apprezzano il tentativo. Il ginocchio no.
1 @cow | {A} si finge mort[A:o/a] per tutto il giorno, nel dubbio. Funziona benissimo.
1 @soc | {A} organizza un sondaggio tra gli uccelli dell'arena per decidere dove accamparsi. Vince il sì.
1 @mad | {A} dà un nome a ogni sasso della zona. Al tramonto litiga con Gianfranco, il sasso più grosso.
1 +arma:A @luck | {A} inciampa in {arma}. Letteralmente: si fa male, ma ne vale la pena.
1 d:A *0.4 | {A} prova a imitare il verso di {mostro} per spaventare gli altri. Risponde l'originale.
1 @show star:A | {A} insegna alle telecamere a fare una ricetta con quello che c'è nell'arena. Il programma di cucina viene rinnovato per tre stagioni.
1 | {A} prova a contare quanti giorni sono passati e arriva a tre risultati diversi.
1 @int +trap:A | {A} costruisce una trappola così complicata che dimentica come disinnescarla.
1 s:A=malato | {A} si lava in una pozza di acqua stagnante. Si sente pulit[A:o/a] per dieci minuti e mal[A:o/a] per tre giorni.
1 @luck | {A} trova un quadrifoglio. Non succede niente, ma {A} si sente invincibile per tutto il giorno.
1 @mad | {A} prova a parlare con le telecamere nascoste negli alberi, chiedendo un'intervista. La telecamera fa zoom, per gentilezza.
2 | {A} e {B} si incrociano e si accorgono di indossare la stessa giacca. Imbarazzo profondo. Se ne vanno senza una parola.
2 @soc rel:AB+30 | {A} e {B} si sfidano a sasso-carta-forbici per decidere chi deve combattere. Pareggiano quaranta volte e diventano amic[AB:i/he].
2 hit:A>B @agg | {A} lancia una pigna a {B} per scherzo. La pigna era più dura del previsto.
2 k:A>B @luck | {A} starnutisce proprio mentre {B} sta per colpirl[A:o/a]. Il colpo va a vuoto, quello di {A} no.
2 @cow | {A} e {B} si incontrano, si spaventano a vicenda e scappano in direzioni opposte urlando.
2 save:A>B @heal | {A} tira fuori {B} da una pozza di fango in cui stava affondando con grande dignità.
2 k:A>B @mad | {A} sfida {B} a una gara di sguardi. {B} sbatte le palpebre per prim[B:o/a]. {A} prende la cosa molto sul serio.
2 give:A>B=cibo @soc | {A} baratta con {B} metà della propria scorta in cambio di una barzelletta. La barzelletta è pessima. Lo scambio resta valido.
2 steal:A<B @luck | {B} lascia {arma:B} senza sorveglianza per allacciarsi una scarpa. {A} passa di lì. Coincidenze.
2 love:AB @luck | {A} cade da un albero dritt[A:o/a] addosso a {B}. Si guardano. Scatta qualcosa. Probabilmente una costola.
2 couple:AB @mad | {A} e {B} si sposano davanti a un sasso che fa da celebrante. Il sasso non obietta.
2 enemy:AB | {A} e {B} si insultano da una parte all'altra del fiume per un'ora intera. Nessuno dei due sa nuotare.
2 owe:A>B | {A} fa per {B} un disegno di ringraziamento con il carbone. È bruttissimo. {B} lo conserva.
3 k:AB>C @luck | {A} e {B} litigano per un sasso e lo lanciano nello stesso istante. Lo prende {C}, che passava di lì.
3 | {A}, {B} e {C} si contendono un cespuglio pieno di bacche e finiscono per dividerselo. Le bacche erano lassative.
3 al:ABC @show | {A}, {B} e {C} formano una band. Il primo concerto è anche l'ultimo: un'esibizione fa rumore e attira l'attenzione di tutti.
4 | {A}, {B}, {C} e {D} si ritrovano nello stesso posto, si guardano, e capiscono che la prima persona a muoversi sarà l'ultima. Restano immobili fino al tramonto.
`,
      n: `
1 | {A} prova a dormire contando le pecore, ma nell'arena le pecore sono mutanti e fanno paura. Conta i sassi.
1 @mad | {A} racconta una storia dell'orrore alle telecamere. Si spaventa da sol[A:o/a] e non dorme più.
1 | {A} sogna di aver già vinto. Il risveglio è brutale.
1 @int | {A} cerca di capire le stelle dell'arena e scopre che sono disposte a forma di logo dello sponsor principale.
1 s:A=malato | {A} dorme sul terreno umido e al mattino ha la voce di un orco.
1 @show | {A} canta una ninna nanna a se stess[A:o/a]. Il pubblico la scarica tre milioni di volte.
2 | {A} e {B} si accampano a dieci metri di distanza senza saperlo e russano in sincrono tutta la notte.
2 rel:AB+20 @soc | {A} e {B} si scambiano storie imbarazzanti dell'infanzia. Ridono troppo forte. Ne vale la pena.
2 hit:B>A @luck | {A} si alza di notte per fare pipì e cammina dritt[A:o/a] sopra {B}, che reagisce male.
2 k:A>B @stl | {A} si muove nel buio così silenziosamente che persino {B} non si accorge di essere stat[B:o/a] uccis[B:o/a] fino alla mattina dopo. Cioè mai.
`,
      f: `
1 @cow | {A} manda al festino un procione addestrato. Il procione torna con uno zaino e un'aria colpevole.
1 +cibo:A @luck | {A} arriva al festino dopo che è finito tutto e trova dimenticato lo zaino più ricco.
2 k:A>B @luck | {A} e {B} afferrano lo stesso zaino, che si strappa. {B} cade all'indietro nel modo peggiore.
3 | {A}, {B} e {C} arrivano al festino travestiti da cespugli. Si riconoscono subito. Ridono. Poi corrono.
`,
    },
    dis: `
Il pubblico vota | Il pubblico vota in diretta chi colpire con un fulmine artificiale. | {A} è la persona più odiata della stagione. | {A} riceve una scossa leggera ma umiliante. | {A} è troppo amat[A:o/a] per essere votat[A:o/a].
La pausa pubblicitaria | Durante la pubblicità, gli organizzatori si dimenticano di sorvegliare le trappole. | {A} cade in una trappola che nessuno doveva attivare. | {A} viene sfiorat[A:o/a] da una lama impazzita. | {A} approfitta della pausa per riposarsi.
Il cambio di regia | Arriva un nuovo regista che vuole più azione. | {A} viene scelt[A:o/a] come primo bersaglio della nuova regia. | {A} si ritrova inseguit[A:o/a] da un drone con la telecamera e una lama. | {A} non è abbastanza interessante per il nuovo regista.
La pioggia di coriandoli | Per festeggiare la metà della stagione, gli organizzatori fanno piovere coriandoli. Di vetro. | {A} viene ridott[A:o/a] a brandelli in un'atmosfera di festa. | {A} si riempie di tagli sottilissimi. | {A} si ripara sotto una roccia e guarda lo spettacolo.
L'ospite speciale | Una celebrità entra nell'arena per un giorno, con una squadra di guardie del corpo armate. | {A} chiede un autografo nel momento sbagliato. | {A} viene allontanat[A:o/a] a calci da una guardia del corpo. | {A} ottiene un selfie e un panino.
Lo sponsor ritirato | Uno sponsor si ritira e reclama indietro tutti i regali. Con i droni. | {A} non vuole restituire il regalo e viene colpit[A:o/a] dal drone. | {A} restituisce il regalo e si ferisce cercando di nasconderne una parte. | {A} non aveva ricevuto regali. Per una volta, è un vantaggio.
Il gioco a quiz | Gli organizzatori interrompono tutto per un quiz di cultura generale. Chi sbaglia paga. | {A} sbaglia la capitale dell'Australia. | {A} sbaglia una domanda facile e prende una scossa. | {A} risponde a tutto e vince un frigorifero, che non sa dove mettere.
Lo sciopero dei tecnici | I tecnici dell'arena scioperano e nessuno controlla più i sistemi. | {A} si trova vicino a un macchinario che esplode senza motivo. | {A} viene colpit[A:o/a] da un riflettore caduto. | {A} si gode un giorno di pace.
La replica | Per problemi tecnici, l'arena ripete il disastro di due giorni fa, ma più forte. | {A} non se l'aspettava due volte. | {A} se l'aspettava, ma non così forte. | {A} si era già mess[A:o/a] al riparo, ricordando la volta prima.
La giornata dei bambini | Gli organizzatori fanno disegnare le trappole del giorno ai bambini. Sono molto creativi. | {A} finisce in una trappola a forma di unicorno che spara spine. | {A} si fa male in una trappola a forma di arcobaleno. | {A} trova le trappole adorabili e le evita.
L'asta dei concorrenti | Il pubblico può comprare il diritto di decidere la sorte di un concorrente. | {A} viene acquistat[A:o/a] da un fan molto deluso. | {A} viene acquistat[A:o/a] e costrett[A:o/a] a ballare per ore. | {A} si compra da sol[A:o/a] con i soldi degli sponsor.
Il terremoto della produzione | Un camion della produzione si ribalta dentro l'arena e libera tutto quello che trasportava. | {A} viene travolt[A:o/a] da una cassa di riflettori. | {A} viene colpit[A:o/a] da un cavo elettrico. | {A} trova tra i rottami un panino del catering.
Il blackout delle telecamere | Le telecamere si spengono per un'ora. Senza testimoni, le regole saltano. | {A} viene sorpres[A:o/a] nel buio da qualcuno che nessuno vedrà mai. | {A} si ferisce in una colluttazione senza testimoni. | {A} passa l'ora a fare cose che nessuno saprà mai.
La musica a tutto volume | Gli organizzatori diffondono la stessa canzone estiva per ventiquattro ore. | {A} perde la ragione e corre verso le trappole cantando. | {A} non dorme e si indebolisce. | {A} impara tutti i balli della canzone. | sconvolto
Il doppio disastro | Due disastri si attivano nello stesso momento per un errore di programmazione. | {A} viene colpit[A:o/a] da entrambi. | {A} viene colpit[A:o/a] da uno dei due. | {A} non viene colpit[A:o/a] da nessuno dei due e non ci crede.
La maratona | Gli organizzatori obbligano tutti a correre per due ore. Chi si ferma viene punito. | {A} si ferma per un crampo e viene punit[A:o/a]. | {A} finisce la corsa con i piedi a pezzi. | {A} corre tutto il tempo e vince una medaglia di latta.
Il sondaggio della crudeltà | Il pubblico vota il disastro più crudele. Vince "tutti insieme". | {A} non regge tutto insieme. | {A} regge, ma a fatica. | {A} trova un buco tra i disastri e si nasconde.
L'invasione dei fan | Un gruppo di fan scavalca le recinzioni e invade l'arena per conoscere i propri idoli. | {A} viene abbracciat[A:o/a] da cinquanta fan contemporaneamente fino a soffocare. | {A} viene strattonat[A:o/a] e perde metà dei vestiti. | {A} firma autografi e si fa regalare da mangiare.
Il gioco delle sedie | Gli organizzatori mettono al centro dell'arena una sedia in meno dei concorrenti. Chi resta in piedi viene punito. | {A} resta in piedi. | {A} si siede su metà sedia e viene punit[A:o/a] a metà. | {A} si siede per prim[A:o/a] e non si alza più.
La nebbia delle risate registrate | Dagli altoparlanti partono risate registrate a ogni sfortuna. È psicologicamente devastante. | {A} cade in un burrone accompagnat[A:o/a] da una risata registrata. | {A} si ferisce e sente il pubblico ridere. Non si riprende. | {A} ride più forte del pubblico. | sconvolto
`,
  });
  D.packs.push({
    theme: '*', adult: true,
    dis: `
La notte rossa | Gli organizzatori sospendono ogni regola per una notte: niente telecamere sui dettagli, niente limiti. | {A} viene trovat[A:o/a] all'alba in uno stato che la regia descrive soltanto come "irrecuperabile". | {A} si sveglia senza ricordi e con un dente in meno. | {A} si chiude da qualche parte e aspetta l'alba con un sasso in mano. | sconvolto
Il bar aperto | Un bar con alcol illimitato compare nel mezzo dell'arena. Gratis, per un'ora. | {A} beve fino a non reggersi in piedi e cade nel posto sbagliato. | {A} si sveglia con la peggior sbornia della propria vita. | {A} beve un bicchiere solo e osserva la catastrofe. | ubriaco
La pioggia di sangue | Una pioggia di sangue animale cade sull'arena per motivi puramente estetici. | {A} scivola nel fango rosso e si spacca la testa. | {A} vomita per ore. | {A} si cosparge di sangue e diventa irriconoscibile e terrificante. | sconvolto
Lo spettacolo del pudore | Gli organizzatori fanno sparire tutti i vestiti dei concorrenti per un giorno. | {A} muore di freddo e d'imbarazzo, nell'ordine. | {A} si scotta al sole in punti che non vedevano il sole da anni. | {A} si fa un vestito di foglie e lancia una nuova moda. | malato
Le spore del desiderio | Le spore di un fungo rendono tutti irresistibilmente attratti dalla persona più vicina. | {A} si distrae nel momento sbagliato con la persona sbagliata, vicino a una trappola. | {A} passa un pomeriggio molto imbarazzante. | {A} trattiene il respiro e si allontana con dignità. | ubriaco
Il macello | Gli organizzatori aprono le gabbie di tutti i mostri insieme e chiamano l'evento "Il macello". Il nome è accurato. | {A} viene fatt[A:o/a] a pezzi in diretta. | {A} perde un orecchio e un po' di dignità. | {A} si nasconde sotto un mucchio di cadaveri finché non è tutto finito. | sconvolto
`,
  });
  D.packs.push({
    theme: ['liceo', 'ufficio'],
    ev: {
      d: `
1 @show | {A} saluta la mamma nella telecamera di sicurezza del corridoio. La mamma, misteriosamente, risponde.
1 @mad | {A} parla con la pianta in vaso dell'angolo come se fosse una collega. La pianta è più simpatica di molti.
1 | {A} passa la giornata a fingersi impegnat[A:o/a]. Nessuno se ne accorge. Talento puro.
1 s:A=malato | {A} beve il caffè della macchinetta guasta. Sa di detersivo. Lo è.
1 @int | {A} crea un foglio di calcolo con tutti i punti deboli dei rivali. Il file si chiama "Vacanze 2019".
1 @cow | {A} si nasconde in bagno per tre ore. Quando esce, nessuno si era accorto della sua assenza.
1 @show star:A | {A} fa una presentazione così bella che qualcuno, in fondo alla sala, piange.
1 s:A=ferito | {A} si incastra la cravatta, o i capelli, nella fotocopiatrice. Non è chiaro chi abbia vinto.
1 @luck | {A} trova venti euro per terra. È la giornata migliore della sua vita.
2 rel:AB+30 @soc | {A} e {B} scoprono di avere lo stesso compleanno. Festeggiano con una merendina divisa in due.
2 hit:A>B @agg | {A} si prende la sedia di {B} mentre si alza un secondo. {B} si siede sul nulla.
2 | {A} e {B} si mandano messaggi passivo-aggressivi tutto il giorno. Firmano tutti con "Cordiali saluti".
2 save:A>B | {A} avvisa {B} che sta arrivando il capo, appena in tempo per chiudere la finestra del gioco.
2 love:AB @luck | {A} e {B} si ritrovano chius[AB:i/e] in ascensore per un'ora. Escono innamorat[AB:i/e] e senza batteria del telefono.
2 couple:AB | {A} e {B} si mandano cuoricini con le graffette sulla scrivania. Tutti fingono di non vedere.
2 enemy:AB | {A} e {B} si contendono l'ultima sedia buona della sala. Arrivano a litigare con la carta da lettere intestata.
2 k:A>B @int | {A} fa notare con estrema educazione e davanti a tutti un errore gravissimo di {B}. Educazione letale.
2 owe:A>B | {A} porta a {B} un caffè senza che glielo abbia chiesto. Un debito pagato in rate da novanta centesimi.
3 al:ABC @soc | {A}, {B} e {C} formano un gruppo segreto per decidere chi far fuori. Nome del gruppo: "Pausa pranzo".
3 k:AB>C | {A} e {B} si accordano per mettere {C} in cattiva luce. Ci riescono benissimo.
`,
      n: `
1 | {A} passa la sera a ripassare quello che dirà domani. Domani dice tutt'altro.
1 @mad | {A} scrive alle due di notte un messaggio molto sincero. Poi lo cancella. Poi lo riscrive.
2 rel:AB+20 | {A} e {B} si scrivono fino a tardi e scoprono di avere lo stesso cartone animato preferito.
2 hit:A>B @stl | {A} lascia a {B} una recensione anonima molto dettagliata. {B} la legge e non dorme.
`,
    },
    dis: `
Il guasto della macchinetta | La macchinetta del caffè si rompe per tre giorni. | {A} non regge l'astinenza e se ne va. | {A} lavora a metà della velocità. | {A} beve tè e non capisce il problema. | malato
La telecamera nuova | Viene installata una telecamera che riprende tutti. | {A} viene ripres[A:o/a] mentre fa una cosa molto stupida. | {A} viene ripres[A:o/a] mentre sbadiglia durante un discorso importante. | {A} saluta la telecamera e diventa un meme simpatico.
Il trasloco di piano | Tutti devono cambiare piano in un'ora. | {A} perde tutto ciò che aveva e non si riprende. | {A} si fa male portando uno scatolone. | {A} porta solo la tazza e la pianta.
La circolare in maiuscolo | Arriva una circolare scritta tutta in maiuscolo. Nessuno sa cosa voglia dire, ma fa paura. | {A} la interpreta nel modo sbagliato e fa un disastro. | {A} passa la giornata in ansia. | {A} non la legge. | sconvolto
La festa a sorpresa | Viene organizzata una festa a sorpresa per una persona che nessuno conosce. | {A} fa un discorso imbarazzante su quella persona ed è fuori. | {A} mangia troppa torta e sta male. | {A} si gode la torta. | malato
Lo sciopero del riscaldamento | Il riscaldamento si spegne in pieno inverno. | {A} si ammala e non torna più. | {A} lavora con il cappotto e i guanti e si raffredda. | {A} si porta una coperta da casa. | malato
La password scaduta | Tutte le password scadono contemporaneamente. | {A} resta chius[A:o/a] fuori dal sistema per sempre. | {A} perde una giornata a recuperare la password. | {A} aveva la password scritta su un post-it.
L'ispezione dei bagni | Qualcuno ha lasciato il bagno in condizioni indicibili e parte un'indagine. | {A} viene accusat[A:o/a] ingiustamente ed è fuori. | {A} viene interrogat[A:o/a] per un'ora. | {A} ha un alibi di ferro.
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
