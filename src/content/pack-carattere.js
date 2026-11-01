/* Prove di abilità ed eventi legati a caratteristiche e tratti.
 * test:A=agi13  prova su una caratteristica (soglia predefinita 11): due testi separati da " || "
 *               (successo || fallimento); ok:… e ko:… valgono solo nel ramo corrispondente.
 * att:A>for8 / att:A<int3  richiede una caratteristica alta o bassa;  trait:A=romantico  richiede un tratto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: '*',
    ev: {
      b: `
1 test:A=agi ok:+arma:A ko:s:A=ferito | {A} scatta verso la Cornucopia, scivola tra due rivali e afferra {arma} al volo. || {A} scatta verso la Cornucopia, scivola tra due rivali e si prende una gomitata in pieno volto.
1 test:A=for ok:+cibo:A ko:s:A=ferito | {A} solleva da sol[A:o/a] una cassa di provviste e se la porta via. || {A} prova a sollevare una cassa di provviste e si strappa la schiena.
1 test:A=furt ok:+med:A ko:s:A=ferito | {A} sgattaiola tra i corpi e ruba un kit medico senza che nessuno se ne accorga. || {A} prova a rubare un kit medico, ma pesta un piede a qualcuno e deve fuggire a mani vuote.
2 test:A=cor ok:k:A>B ko:s:A=ferito | {A} non arretra di un passo davanti a {B}, che invece esita. È l'ultimo errore di {B}. || {A} affronta {B} a viso aperto, ma all'ultimo trema e si prende una ferita.
1 test:A=agi13 ko:d:A | {A} salta da una piattaforma all'altra per arrivare prima di tutti, ed è un salto da circo. || {A} salta da una piattaforma all'altra per arrivare prima di tutti. Non ci arriva.
1 test:A=int ok:+mappa:A ko:s:A=sconvolto | {A} ignora la mischia e studia l'arena dall'alto: in un minuto ha disegnato {mappa}. || {A} prova a ragionare nel caos, ma il rumore e le urla l[A:o/a] mandano in tilt.
`,
      d: `
1 test:A=agi ko:s:A=ferito | {A} salta un crepaccio con una rincorsa perfetta e atterra dall'altra parte con eleganza. || {A} prova a saltare un crepaccio e ci arriva con il mento. Si aggrappa al bordo e risale con le ginocchia a pezzi.
1 test:A=agi13 ko:d:A | {A} attraversa un tronco sospeso sopra il vuoto come un acrobata. Il pubblico applaude. || {A} attraversa un tronco sospeso sopra il vuoto. A metà strada il tronco gira. {A} no.
1 test:A=for ok:+cibo:A ko:s:A=ferito | {A} sposta un masso enorme e scopre sotto un deposito di provviste. || {A} prova a spostare un masso enorme e si schiaccia due dita.
1 test:A=for ok:star:A ko:s:A=ferito @show | {A} sfida un albero a braccio di ferro e lo sradica. Nessuno capisce come, ma il pubblico impazzisce. || {A} sfida un albero a braccio di ferro. Vince l'albero, ai punti e per lussazione.
1 test:A=int ok:+trap:A ko:s:A=ferito | {A} costruisce una trappola ingegnosa con corde e rami piegati. Funziona al primo colpo. || {A} costruisce una trappola ingegnosa con corde e rami piegati, e ci cade dentro per prim[A:o/a].
1 test:A=int ok:+veleno:A ko:s:A=avvelenato | {A} riconosce una pianta velenosa e ne ricava {veleno}. || {A} è sicur[A:o/a] che quella pianta sia commestibile. Non lo è.
1 test:A=sop ok:+cibo:A ko:s:A=affamato | {A} segue le tracce di un animale fino alla tana e torna con la cena. || {A} segue le tracce di un animale per ore e scopre che erano le sue.
1 test:A=sop ok:cure:A ko:s:A=malato | {A} filtra l'acqua con sabbia e carbone come un vero esperto. || {A} beve l'acqua senza filtrarla. Il suo intestino presenta un reclamo formale.
1 test:A=sop ok:+cibo:A ko:s:A=avvelenato | {A} trova dei funghi e riconosce quelli buoni. Cena da re. || {A} trova dei funghi e ne sceglie con cura quelli sbagliati.
1 test:A=furt ok:+arma:A ko:s:A=ferito | {A} si infila nel rifugio di un rivale addormentato e ne esce con {arma}. || {A} si infila nel rifugio di un rivale, inciampa in una pentola e fugge sotto una pioggia di sassi.
1 test:A=furt ok:+med:A | {A} si mimetizza così bene che un altro concorrente [A:gli/le] si siede accanto senza vederl[A:o/a]. {A} ne approfitta per sfilargli il kit medico dalla tasca. || {A} cerca di mimetizzarsi in un cespuglio. Il cespuglio era occupato da un altro concorrente. Imbarazzo, poi fuga.
1 test:A=fort ok:+amuleto:A ko:s:A=ferito @luck | {A} chiude gli occhi e infila la mano in una tana a caso. Ne esce con {amuleto}. || {A} chiude gli occhi e infila la mano in una tana a caso. Ne esce con un morso.
1 test:A=fort13 ko:d:A @luck | Un fulmine cade a un metro da {A}, che ne esce con i capelli dritti e un'ottima storia da raccontare. || Un fulmine cade su {A}. La fortuna, oggi, era altrove.
1 test:A=res ok:cure:A ko:s:A=malato | {A} si sveglia con la febbre, la ignora per orgoglio e la febbre se ne va offesa. || {A} si sveglia con la febbre e passa la giornata a delirare.
1 test:A=res13 ko:d:A | {A} cammina per dieci ore sotto il sole senza acqua. Arriva stremat[A:o/a], ma arriva. || {A} cammina per dieci ore sotto il sole senza acqua. A un certo punto smette di camminare.
1 test:A=cor ok:star:A ko:s:A=sconvolto @show | {A} affronta {mostro} urlando, e {mostro} scappa. Il pubblico non ci crede. || {A} affronta {mostro} urlando. Poi si accorge della stazza e scappa urlando molto più forte.
1 test:A=cor ko:s:A=sconvolto | {A} passa la notte vicino ai resti di un concorrente caduto senza battere ciglio. || {A} passa la notte vicino ai resti di un concorrente caduto e non chiude occhio.
1 test:A=car ok:+cibo:A ok:star:A ko:s:A=ferito @show | {A} fa un discorso commovente alle telecamere: in dieci minuti arrivano tre paracadute di cibo. || {A} fa un discorso alle telecamere. Gli sponsor mandano un unico paracadute, con dentro un sasso e un biglietto: "Ritenta".
1 test:A=emp ok:cure:A ko:s:A=sconvolto | {A} ripensa ai caduti e trova la forza di andare avanti per loro. || {A} ripensa ai caduti e crolla in lacrime per ore.
2 test:A=car ok:al:AB ko:hit:B>A | {A} convince {B} che insieme avranno più possibilità. {B} accetta stringendo la mano. || {A} prova a convincere {B} ad allearsi. {B} risponde con un pugno.
2 test:A=car ok:love:AB ko:rel:BA-20 | {A} fa un complimento a {B} così ben riuscito che {B} arrossisce. Scatta qualcosa. || {A} prova a fare un complimento a {B}, ma sbaglia nome. Due volte.
2 test:A=agi ok:k:A>B ko:hit:B>A | {A} schiva il colpo di {B} all'ultimo istante e contrattacca senza pietà. || {A} prova a schivare il colpo di {B}. Non lo schiva.
2 test:A=for ok:k:A>B ko:hit:B>A | {A} e {B} lottano corpo a corpo nel fango. {A} è più forte, e lo dimostra. || {A} e {B} lottano corpo a corpo nel fango. {A} ha la peggio e si ritira ammaccat[A:o/a].
2 test:A=furt ok:k:A>B ko:hit:B>A @stl | {A} si avvicina a {B} alle spalle in perfetto silenzio. {B} non sente niente, mai più. || {A} si avvicina a {B} alle spalle e pesta un ramo secco. {B} si gira e reagisce.
2 test:A=int ok:k:A>B ko:s:A=ferito | {A} attira {B} in una trappola costruita apposta. Funziona alla perfezione. || {A} prepara una trappola per {B}, ma {B} la evita e {A} ci inciampa sopra mentre scappa.
2 test:A=emp ok:save:A>B ko:hit:B>A @heal | {A} capisce che {B} sta per crollare e l[B:o/a] aiuta prima che sia tardi. || {A} prova ad aiutare {B}, che in preda al panico l[A:o/a] colpisce.
2 test:A=cor ok:save:A>B ko:s:A=ferito | {A} si lancia in mezzo al pericolo per tirare fuori {B}. Ci riesce. || {A} si lancia in mezzo al pericolo per tirare fuori {B}, ma deve tornare indietro ferit[A:o/a].
2 test:A=int ok:steal:A<B ko:rel:BA-30 | {A} distrae {B} con una domanda filosofica e intanto [B:gli/le] sfila l'arma. || {A} prova a distrarre {B} con una domanda filosofica. {B} risponde e poi l[A:o/a] manda a quel paese.
2 test:A=car ok:repay:A>B ko:rel:AB-10 | {A} saluta {B} con un sorriso e [B:gli/le] promette che il debito è saldato. {B} accetta. || {A} prova a convincere {B} che il debito è saldato. {B} non è d'accordo.
3 test:A=car ok:al:ABC ko:hit:B>A | {A} tiene un discorso da leader e convince {B} e {C} a seguirl[A:o/a]. || {A} tiene un discorso da leader. {B} e {C} ridono, e {B} [A:gli/le] tira un sasso.
3 test:A=agi ok:k:A>BC | {A} si muove tra {B} e {C} come un fulmine: due colpi, nessuna risposta. || {A} prova a colpire insieme {B} e {C} e manca entrambi. Fortuna che sono distratti.
`,
      n: `
1 test:A=furt ok:+cibo:A ko:s:A=ferito @stl | Di notte {A} entra in un accampamento nemico e ne esce con le provviste. || Di notte {A} entra in un accampamento nemico, pesta una mano e deve scappare inseguit[A:o/a].
1 test:A=sop ko:s:A=malato | {A} costruisce un rifugio perfetto contro il gelo e dorme come in un albergo. || {A} costruisce un rifugio contro il gelo. Il rifugio crolla alle due di notte.
1 test:A=cor ko:s:A=sconvolto | {A} sente urla lontane per tutta la notte e resta lucid[A:o/a]. || {A} sente urla lontane per tutta la notte e all'alba parla da sol[A:o/a].
1 test:A=res13 ko:d:A | {A} sopravvive alla notte più fredda della stagione stringendo i denti. || {A} non sopravvive alla notte più fredda della stagione.
2 test:A=furt ok:k:A>B ko:hit:B>A @stl | {A} striscia fino al giaciglio di {B} senza fare rumore. Il cannone suonerà all'alba. || {A} striscia fino al giaciglio di {B}, ma {B} dorme con un occhio aperto.
2 test:A=emp ok:rel:AB+40 | Al buio {A} sente {B} piangere e [B:gli/le] parla fino all'alba. Nasce un'amicizia. || Al buio {A} sente {B} piangere e prova a consolarl[B:o/a], ma dice tutte le cose sbagliate.
`,
      f: `
1 test:A=agi ok:+cibo:A ok:+med:A ko:s:A=ferito | {A} attraversa il festino come un fulmine e prende due zaini. || {A} attraversa il festino come un fulmine, ma inciampa in uno zaino e lo calpestano in tre.
2 test:A=for ok:k:A>B ko:hit:B>A | {A} e {B} si contendono lo stesso zaino tirandolo da due lati. {A} tira più forte, e non solo lo zaino. || {A} e {B} si contendono lo stesso zaino. {B} lo lascia andare all'improvviso e {A} cade all'indietro.
`,
      ds: `
1 test:A=sop ko:s:A=ferito | {A} capisce in anticipo dove ripararsi e ne esce senza un graffio. || {A} sceglie il riparo sbagliato e ne esce malconc[A:io/ia].
1 test:A=agi ko:s:A=ferito | {A} si lancia di lato all'ultimo istante. || {A} si lancia di lato all'ultimo istante, ma non abbastanza.
1 test:A=fort13 ko:d:A | Per pura fortuna, tutto quello che cade intorno a {A} manca il bersaglio. || La fortuna di {A} è finita proprio oggi.
`,
    },
  });

  // eventi riservati a certi profili (caratteristiche alte o basse, tratti)
  D.packs.push({
    theme: '*',
    ev: {
      b: `
1 att:A>for8 | {A} solleva un concorrente per la collottola e lo sposta di peso per arrivare prima a uno zaino.
1 att:A<agi3 s:A=ferito | {A} parte per prim[A:o/a], inciampa nei propri piedi e arriva per ultim[A:o/a]. Con un livido nuovo.
1 att:A>furt8 +arma:A @stl | Nessuno vede {A} entrare nella Cornucopia. Nessuno l[A:o/a] vede uscire. Ora ha {arma}.
1 trait:A=goloso +cibo:A | {A} ignora le armi e corre dritt[A:o/a] verso il cibo. Priorità chiare.
1 trait:A=esibizionista star:A @show | {A} si ferma in mezzo alla mischia per salutare la telecamera. Poi scappa, salutando ancora.
`,
      d: `
1 att:A>for9 +arma:A @show | {A} spezza un albero giovane a mani nude e ne fa una clava. Gli altri concorrenti decidono di non disturbarl[A:o/a].
1 att:A>for8 | {A} sposta un masso che bloccava l'unica uscita della grotta. Da sol[A:o/a]. Respirando appena.
1 att:A<for3 | {A} prova ad aprire una scatoletta per mezz'ora. Alla fine la scatoletta vince.
1 att:A>agi8 @show star:A | {A} attraversa la zona più pericolosa saltando da un albero all'altro, senza mai toccare terra.
1 att:A<agi3 s:A=ferito | {A} inciampa su un sasso, poi su un ramo, poi sullo stesso sasso. Tre cadute in un minuto: un record.
1 att:A>int8 +trap:A @int | {A} costruisce un sistema di allarme con lattine e spago che coprirebbe un castello.
1 att:A>int9 | {A} calcola con precisione dove colpirà il prossimo disastro. Lo annota con calma e si sposta.
1 att:A<int3 @mad | {A} prova a fare amicizia con {mostro}. Porta anche un regalo.
1 att:A<int3 s:A=avvelenato | {A} assaggia una bacca blu, poi una rossa, poi una a pois. La terza era quella sbagliata. Anche le prime due.
1 att:A<int2 | {A} chiama le telecamere "signore" e chiede indicazioni per uscire.
1 att:A>car8 +cibo:A @show | {A} sorride a una telecamera: tre minuti dopo piove cibo dagli sponsor.
1 att:A<car3 | {A} prova a farsi un selfie con le telecamere. Le telecamere girano dall'altra parte.
1 att:A>fort9 +amuleto:A @luck | {A} inciampa, cade e atterra su {amuleto}. Certe persone nascono con la camicia.
1 att:A<fort2 s:A=ferito | Un uccello sceglie {A} come bersaglio. Poi un secondo uccello. Poi un ramo cade. Giornata così.
1 att:A>res9 need:A=* cure:A | {A} ignora le ferite come se fossero punture di zanzara. Dopo un sonnellino è come nuov[A:o/a].
1 att:A<res3 s:A=malato | {A} si raffredda guardando una nuvola.
1 att:A>furt9 @stl | {A} passa tutta la giornata a tre metri da un altro concorrente senza che se ne accorga. Per divertimento.
1 att:A>cor8 @agg | {A} cammina al centro della radura gridando "Venite a prendermi!". Nessuno viene.
1 att:A<cor3 @cow | {A} sente un rumore e si nasconde per sei ore. Era il proprio stomaco.
1 att:A>emp8 @heal | {A} piange per ogni concorrente caduto e scrive i loro nomi su un pezzo di corteccia.
1 att:A<emp2 @mad | {A} guarda un concorrente morire e commenta: "Peccato, aveva delle belle scarpe". Poi gliele prende.
1 att:A>sop8 +cibo:A | {A} accende un fuoco con due sassi, caccia un coniglio con un laccio e cucina uno stufato. Il pubblico chiede la ricetta.
1 att:A<sop3 s:A=affamato | {A} prova a cacciare un coniglio. Il coniglio, a un certo punto, sembra quasi dispiaciuto per [A:lui/lei/loro].
2 att:A>for8 k:A>B @agg | {A} solleva {B} sopra la testa e l[B:o/a] scaraventa giù da una roccia.
2 att:A>agi8 k:A>B | {A} danza intorno a {B} così velocemente che {B} non capisce da dove arrivi il colpo.
2 att:A>int8 k:A>B @int | {A} convince {B} che il ponte di corda è sicuro. Aveva calcolato tutto, compresa la corda.
2 att:A>car8 al:AB | {A} parla con {B} per cinque minuti e {B} ne esce convint[B:o/a] che si conoscano da sempre.
2 att:A>car9 love:AB | {A} non deve nemmeno sforzarsi: {B} si innamora al primo sguardo.
2 att:A>emp8 forgive:A>B | {A} guarda {B} negli occhi e capisce che anche {B} sta soffrendo. Il rancore svanisce.
2 att:A<emp3 att:B>emp7 rel:BA-20 | {A} ride della disperazione di {B}. {B} non ride affatto.
2 att:A>cor8 att:B<cor4 @cow | {B} vede {A} venire avanti a petto in fuori e se la dà a gambe senza pensarci.
2 att:A>furt8 steal:A<B @stl | {A} sottrae {arma:B} a {B} mentre [B:gli/le] parla guardandol[B:o/a] negli occhi. Talento.
2 att:A>sop8 give:A>B=cibo @heal | {A} insegna a {B} quali radici si possono mangiare. {B} non dimenticherà la lezione.
2 att:A<int3 att:B<int3 | {A} e {B} discutono per un'ora se il sole giri intorno all'arena o il contrario. Nessuno dei due ha ragione.
2 att:A>int8 att:B>int8 al:AB @int | {A} e {B} si riconoscono come le menti più brillanti dell'arena e decidono di collaborare. Gli altri dovrebbero preoccuparsi.
1 trait:A=romantico @show | {A} incide cuori su tutti gli alberi della zona. Nessuno sa per chi.
2 trait:A=romantico love:AB @show | {A} scrive una poesia a {B} con il carbone sulla roccia. È terribile. Funziona.
2 trait:A=romantico couple:AB save:A>B | {A} si butta davanti a {B} senza pensarci: non lascerà che l[B:o/a] tocchino.
1 trait:A=vendicativo @agg | {A} affila la lama recitando una lista di nomi. La lista è lunga.
2 trait:A=vendicativo grudge:A>B k:A>B *2 | {A} ha atteso giorni questo momento. {B} non sa nemmeno più perché. {A} sì: per {caro:A}.
2 trait:A=clemente forgive:A>B | {A} incontra {B}, che l[A:o/a] aveva ferit[A:o/a], e [B:gli/le] offre da mangiare. {B} non sa come reagire.
2 trait:A=generoso give:A>B=med | {A} dà a {B} il proprio kit medico, anche se ne avrebbe bisogno. "Tu di più."
2 trait:A=generoso give:A>B=cibo | {A} divide le provviste con {B} in parti perfettamente uguali, misurandole con un rametto.
2 trait:A=avido steal:A<B @stl | {A} non riesce a trattenersi: ruba {arma:B} a {B} anche se ne ha già due.
2 trait:A=avido cibo:B +cibo:A rel:BA-30 | {A} si mangia di nascosto la scorta di {B}. Tutta. Anche la parte ammuffita.
1 trait:A=esibizionista star:A @show | {A} improvvisa uno spettacolo di giocoleria con tre coltelli. Ne perde uno. Il pubblico applaude lo stesso.
1 trait:A=esibizionista s:A=ferito @show | {A} fa una capriola per le telecamere su un terreno pieno di spine.
1 trait:A=ubriacone s:A=ubriaco @drunk | {A} trova {alcol} in un posto in cui non dovrebbe esserci alcol. Ha un talento.
1 trait:A=ubriacone need:A=ubriaco s:A=ferito @drunk | Ubriac[A:o/a] per la terza volta in due giorni, {A} cade da un albero su cui non ricorda di essere salit[A:o/a].
1 trait:A=superstizioso @luck | {A} passa la mattina a evitare tutti i gatti neri dell'arena. Nell'arena non ci sono gatti neri. Quasi.
1 trait:A=superstizioso +amuleto:A | {A} costruisce un portafortuna con piume, sassi e speranza. A quanto pare funziona: è {amuleto}.
1 trait:A=goloso need:A=affamato @mad | {A} sogna ad occhi aperti una lasagna. Morde un ramo.
1 trait:A=goloso cibo:A | {A} mangia in un pomeriggio le provviste che dovevano durare tre giorni. Ne è fier[A:o/a].
1 trait:A=sonnambulo s:A=ferito | {A} si sveglia appes[A:o/a] a un ramo a quattro metri d'altezza, senza sapere come ci sia arrivat[A:o/a].
2 trait:A=sonnambulo hit:A>B | Nel sonno, {A} cammina fino all'accampamento di {B} e [B:gli/le] dà uno schiaffo. Poi torna a letto.
3 trait:A=leader al:ABC @soc | {A} raduna {B} e {C} con un discorso breve e chiaro. Nessuno discute.
2 trait:A=leader ally:AB rel:AB+20 | {A} organizza turni di guardia e razioni con {B}. L'alleanza non è mai stata così efficiente.
1 trait:A=solitario @stl | {A} si costruisce un rifugio talmente lontano da tutti che il cameraman deve fare tre ore di cammino.
2 trait:A=solitario rel:BA-10 | {B} propone un'alleanza a {A}, che risponde chiudendo la porta del rifugio. Il rifugio non ha una porta: la disegna.
1 trait:A=codardo @cow | {A} scappa da {mostro}. Poi si accorge che era un cespuglio con la forma di {mostro}. Scappa lo stesso.
1 trait:A=folle @mad | {A} si dichiara imperatore dell'arena e impone una tassa ai sassi.
1 trait:A=fortunato +cibo:A @luck | Un uccello lascia cadere un pesce in testa a {A}. Pranzo servito.
1 trait:A=sfortunato s:A=ferito | {A} trova finalmente un riparo sicuro. Il riparo crolla.
1 trait:A=paranoico | {A} non dorme da tre giorni perché è convint[A:o/a] che gli alberi l[A:o/a] stiano spiando. Gli alberi hanno le telecamere, quindi ha ragione.
1 trait:A=stratega @int | {A} disegna sul terreno un piano in dodici fasi. È arrivat[A:o/a] alla fase due.
1 trait:A=cacciatore +cibo:A | {A} torna dalla caccia con abbastanza carne per tre giorni e una pelliccia nuova.
1 trait:A=guaritore need:A=* cure:A | {A} si medica da sol[A:o/a] con erbe che nessun altro saprebbe riconoscere.
1 trait:A=pacifista @heal | {A} passa la giornata a seppellire i caduti, uno per uno.
1 trait:A=bruto @agg | {A} prende a pugni un albero per sfogarsi. L'albero cade.
`,
      n: `
1 att:A>sop8 | {A} si costruisce un letto di foglie, un tetto di rami e un fuoco che non fa fumo. Dorme benissimo.
1 att:A<cor3 @cow | {A} passa la notte con gli occhi spalancati e un bastone in mano, colpendo ogni rumore.
1 trait:A=sonnambulo @mad | {A} si alza nel sonno, cammina per due chilometri e torna a letto. La telecamera notturna non ci crede.
2 trait:A=romantico couple:AB | {A} veglia su {B} che dorme e conta le sue ciglia. Si ferma a duecento.
1 trait:A=ubriacone s:A=ubriaco @drunk | {A} brinda da sol[A:o/a] alla luna. Poi alla seconda luna. Nell'arena c'è una luna sola.
1 att:A>emp8 | {A} sussurra al buio il nome di ogni concorrente caduto finora.
`,
    },
  });

  // Liceo e Ufficio
  D.packs.push({
    theme: ['liceo', 'ufficio'],
    ev: {
      d: `
1 test:A=int ok:star:A ko:s:A=ferito | {A} risponde a una domanda impossibile davanti a tutti, ed è la risposta giusta. || {A} risponde a una domanda davanti a tutti con grande sicurezza. È sbagliatissima.
1 test:A=car ok:star:A ko:s:A=ferito @show | {A} parla in pubblico per dieci minuti senza appunti e conquista la sala. || {A} parla in pubblico e dimentica cosa stava dicendo a metà della prima frase.
1 test:A=furt ok:+mappa:A ko:s:A=ferito @stl | {A} sbircia un documento riservato e scopre {mappa}. || {A} viene beccat[A:o/a] a sbirciare un documento riservato.
1 test:A=res ko:s:A=malato | {A} lavora fino a sera senza perdere la concentrazione. || {A} crolla sulla scrivania alle quattro del pomeriggio.
1 test:A=fort ok:+amuleto:A ko:s:A=ferito @luck | {A} incrocia per caso la persona più importante dell'edificio, che si ricorderà di [A:lui/lei/loro]. || {A} incrocia per caso la persona più importante dell'edificio e le rovescia addosso il caffè.
1 test:A=cor ok:star:A ko:s:A=sconvolto | {A} dice in faccia al capo quello che tutti pensano. Applauso. || {A} prova a dire in faccia al capo quello che pensa, ma balbetta e chiede scusa.
1 test:A=emp13 ko:d:A | {A} si accorge per tempo che sta per arrivare una bufera, e si mette al riparo. || {A} non si accorge che tutti hanno smesso di parlar[A:gli/le]. È fuori.
2 test:A=car ok:al:AB ko:rel:BA-20 | {A} offre a {B} un caffè e una proposta di collaborazione. {B} accetta entrambi. || {A} offre a {B} un caffè e una proposta. {B} prende il caffè e se ne va.
2 test:A=int ok:k:A>B ko:hit:B>A | {A} smonta il lavoro di {B} davanti a tutti con argomenti inattaccabili. {B} è fuori. || {A} prova a smontare il lavoro di {B} davanti a tutti, ma {B} ribatte punto per punto.
2 test:A=car ok:love:AB ko:rel:BA-15 | {A} invita {B} a uscire con una battuta perfetta. {B} ride e accetta. || {A} invita {B} a uscire con una battuta. {B} non la capisce, e non accetta.
1 att:A>int8 star:A | {A} risolve in cinque minuti un problema che bloccava tutti da settimane.
1 att:A<int3 s:A=ferito | {A} stampa duecento pagine per sbaglio, poi le pinza tutte insieme. Anche il dito.
1 att:A>car8 @show star:A | {A} entra nella stanza e tutti si girano. Non deve nemmeno parlare.
1 att:A<car3 | {A} saluta tutti la mattina. Nessuno risponde. Non per cattiveria: semplicemente non l[A:o/a] vedono.
1 trait:A=romantico @show | {A} lascia bigliettini anonimi con cuoricini sulle scrivanie. Ne lascia quaranta.
1 trait:A=esibizionista star:A @show | {A} si presenta in giacca dorata. Nessuno sa perché. Tutti ne parlano.
1 trait:A=goloso cibo:A | {A} finisce le provviste di una settimana entro le dieci del mattino.
1 trait:A=avido | {A} si porta a casa tutte le penne, le graffette e i bicchieri di plastica disponibili.
2 trait:A=generoso give:A>B=med @heal | {A} copre {B} senza chiedere niente in cambio.
2 trait:A=vendicativo grudge:A>B k:A>B *2 | {A} ha aspettato il momento giusto per settimane. Oggi {B} è fuori, per {caro:A}.
`,
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
