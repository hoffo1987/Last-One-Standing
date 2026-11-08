/* Arena Classica — quarto pacchetto: la vita nell'arena, gli sponsor, il pubblico della capitale, il freddo,
 * le bestie del Bosco e i tributi che provano a restare umani. Ogni evento ha conseguenze reali. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'classico',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+cibo:A ko:s:A=ferito | {A} scatta al suono del gong e arriva alla Cornucopia mentre gli altri stanno ancora decidendo. Esce con {arma} e {cibo}. || {A} scatta al suono del gong, inciampa nella pedana e arriva alla Cornucopia giusto in tempo per prendersi una gomitata.
1 @cow +ricordo:A | {A} corre nella direzione opposta alla Cornucopia senza voltarsi. Ha solo quello che si era portat[A:o/a] da casa, ma è viv[A:o/a].
1 +trap:A @int | {A} ignora le armi e afferra {trap}. Chi ride adesso, stanotte smetterà.
2 steal:A<B=cibo @agg hit:A>B | {A} e {B} si contendono lo stesso zaino. Vince {A}, con un morso che il pubblico rivedrà al rallentatore.
2 al:AB @soc | {A} e {B} si ritrovano spalla a spalla dietro una cassa rovesciata. Uno sguardo, un cenno: per ora si copre l'uno con l'altr[B:o/a].
1 test:A=furt12 ok:+mappa:A ko:mo:A-10 | {A} striscia sotto i carrelli della Cornucopia e sfila {mappa} da sotto il naso di tutti. || {A} striscia sotto i carrelli, ma la mappa che puntava finisce in mano a qualcun altro. Torna indietro a mani vuote.
3 hit:A>B hit:A>C @agg | {A} difende la sua cassa contro {B} e {C} a colpi di coperchio. Nessuno si fa male sul serio. Nessuno ci riprova.
1 +armatura:A @luck | {A} afferra la prima cosa a portata di mano: {armatura}. Non era quello che cercava, ma le sta bene.
`,
      d: `
1 wx:pericolo pr:A+15 s:A=ferito | Una grandinata improvvisa sorprende {A} in campo aperto. Ne esce livid[A:o/a] e congelat[A:o/a] fino alle ossa.
1 wx:calma food:A+15 @food | Il sole è caldo, l'arena tranquilla: {A} trova un cespuglio di more e se lo mangia quasi tutto.
1 test:A=sop12 ok:+cibo:A ok:mo:A+5 ko:food:A-10 | {A} costruisce una trappola per pesci con dei rami intrecciati. A sera ce ne sono tre. || {A} costruisce una trappola per pesci. Il Fiume se la porta via con tutto il pomeriggio di lavoro.
1 test:A=agi12 ok:+cibo:A ko:hp:A-12 | {A} si arrampica su un faggio per un nido di uova. Torna giù con la colazione. || {A} si arrampica su un faggio per un nido di uova. Torna giù più in fretta del previsto, di schiena.
1 test:A=int13 ok:+med:A ko:s:A=avvelenato | {A} riconosce tra le erbe del Bosco una pianta che ferma le infezioni e ne raccoglie un fascio. || {A} è convint[A:o/a] di aver riconosciuto un'erba medicinale. Si sbagliava: passa il pomeriggio a vomitare.
1 stat:A>pr40 test:A=sop12 ok:pr:A-25 ko:pr:A+10 | {A} batte i denti da ore. Accende un fuoco minuscolo, coperto da tre pietre: nessuno lo vede, e il freddo molla la presa. || {A} prova ad accendere un fuoco con le mani gelate. Non ci riesce, e perde anche il poco calore che aveva.
1 con:A=attrezzo pr:A-20 mo:A+5 | {A} usa {attrezzo:A} per accendere un fuoco al riparo di una roccia. Per un'ora, il freddo è solo un ricordo.
1 star:A @show mo:A+10 | {A} saluta la telecamera nascosta in un tronco cavo, poi fa un inchino. In capitale nasce un fan club.
1 @luck +med:A | Un paracadute argentato atterra ai piedi di {A}: dentro c'è {med} e un biglietto con scritto «Non mollare».
1 @luck +cibo:A mo:A+10 | Gli sponsor mandano a {A} un pane ancora caldo. Lo annusa per un minuto intero prima di morderlo.
1 stat:A<mo30 mo:A+15 | {A} ripete a bassa voce i nomi di casa, uno per uno, finché le mani non smettono di tremare.
1 need:A=ferito test:A=res12 ok:hp:A+15 ko:hp:A-8 | {A} si ricuce da sol[A:o/a] un taglio sul braccio, con il filo di un laccio. Stringe i denti fino all'ultimo punto. || {A} prova a ricucirsi un taglio. A metà sviene, e si risveglia con la ferita aperta e piena di terra.
1 test:A=cor13 ok:+arma:A ko:s:A=ferito | {A} sente ringhiare un orso in una grotta e vede una lancia abbandonata all'ingresso. Entra, la prende, esce. Ci vuole coraggio. || {A} prova a recuperare una lancia all'ingresso di una grotta. L'orso che ci dorme non è d'accordo.
1 en:A+20 | {A} dorme per tutto il pomeriggio in un'ansa del Fiume, cullat[A:o/a] dalla corrente. Si sveglia come nuov[A:o/a].
1 @mad mo:A+5 en:A-10 | {A} decide che i pesci del Fiume hanno bisogno di un capo e passa la mattina a tenere loro un discorso.
1 test:A=furt12 ok:+valore:A ko:mo:A-5 | {A} perlustra le Rovine e trova, sotto una lastra spaccata, {valore}. || {A} perlustra le Rovine per ore e trova solo un mucchio di ossa di topo e un forte senso di inutilità.
1 wx:abbondanza +cibo:A +cibo:A @food | Dopo la pioggia le Paludi sono piene di rane grasse: {A} ne cattura così tante da riempire due fagotti.
1 stat:A<food25 test:A=sop11 ok:food:A+30 ko:s:A=avvelenato | {A} ha così fame che mangia dei funghi trovati sotto un tronco. || {A} ha così fame che mangia dei funghi trovati sotto un tronco. Errore da manuale.
1 con:A=ricordo mo:A+12 | {A} si siede su un masso dell'Altopiano e guarda {ricordo:A} mentre il sole tramonta. Domani ricomincia.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} divide con {B} l'ultima porzione di {cibo}, a metà esatta, misurata col coltello.
2 ally:AB test:A=sop12 ok:+cibo:A ok:+cibo:B ko:en:A-15 ko:en:B-15 | {A} e {B} passano il pomeriggio a pescare con le mani. Vanno a dormire sazi e bagnati fradici. || {A} e {B} passano il pomeriggio a pescare con le mani. Non prendono niente, ma la discussione su chi è stato più incapace dura fino a sera.
2 hit:A>B @agg | {A} sorprende {B} a bere al Fiume e l[B:o/a] spinge in acqua. È solo un avvertimento: questa ansa è sua.
2 enemy:AB test:A=furt13 ok:steal:A<B=cibo ko:hit:B>A | {A} aspetta che {B} si allontani per sfilare le provviste dal suo riparo. || {A} prova a svuotare il riparo di {B}, ma {B} torna prima del previsto, con un sasso in mano.
2 rel:AB+15 @soc | {A} insegna a {B} a fischiare con una foglia d'erba. In capitale il suono diventa la suoneria più scaricata della settimana.
2 crush:A>B rel:AB+10 mo:A+10 | {A} intreccia una coroncina di fiori di palude e la lascia, senza firma, all'ingresso del riparo di {B}.
2 couple:AB pr:A-15 pr:B-15 mo:A+10 mo:B+10 | {A} e {B} si stringono sotto lo stesso mantello mentre il vento gela l'Altopiano. Il freddo, in due, è la metà.
2 ally:AB test:A=int12 ok:+trap:A ko:mo:A-5 | {A} e {B} costruiscono insieme una trappola con un tronco sospeso. {A} ne va molto orgoglios[A:o/a]. || {A} e {B} costruiscono una trappola con un tronco sospeso. Il tronco cade al primo tentativo, mancando {B} di un palmo.
2 save:A>B @heal | {A} vede {B} scivolare nel Fiume in piena e si butta: l[B:o/a] trascina a riva per i capelli. {B} tossisce acqua e gratitudine.
2 debt:B>A give:A>B=med @heal | {A} trova {B} con una ferita brutta al polpaccio e [B:gli/le] lascia {med} senza dire una parola. {B} non dimenticherà.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} prova a convincere {B} che insieme avrebbero più possibilità. || {A} prova a convincere {B} a fare squadra, ma il discorso suona troppo preparato. {B} se ne va con un sopracciglio alzato.
2 rival:AB rel:AB+5 @show | {A} e {B} si sfidano a chi lancia più lontano un sasso nel Fiume. Pareggiano. Nessuno dei due lo ammetterà mai.
2 fear:A>B en:A-15 @cow | {A} vede {B} attraversare la radura e resta immobile dietro un cespuglio per un'ora intera, finché le gambe non si addormentano.
2 hit:A>B hit:B>A @agg | {A} e {B} si incontrano al guado e nessuno dei due vuole cedere il passo. Finisce con due nasi sanguinanti e un sasso conteso.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} racconta a {B} la cosa più imbarazzante che [A:gli/le] sia successa a scuola. {B} non ride. Questo cambia tutto.
3 al:ABC @soc | {A}, {B} e {C} si incontrano alle Rovine e scoprono di essere tutti dello stesso distretto. Si stringono la mano come se fossero a casa.
3 hit:A>C @agg | {A} e {B} discutono su come dividere un coniglio. {C} se lo porta via mentre litigano, ma {A} [C:gli/le] lancia dietro un sasso.
3 ally:AB rel:AB+10 rel:AC-5 | {A} e {B} si scambiano un'occhiata quando {C} racconta per la terza volta la stessa storia. Nasce un'intesa.
1 test:A=fort12 ok:+amuleto:A ko:mo:A-5 | {A} trova una piuma argentata in una pozzanghera. La infila tra i capelli: porterà fortuna. || {A} trova una piuma argentata, ma il vento gliela strappa di mano. Lo prende come un presagio.
1 trait:A=cacciatore +cibo:A +cibo:A | {A} segue le tracce di un cervo per tutta la mattina. Lo trova. Per due giorni nessun problema di cibo.
1 trait:A=esibizionista star:A mo:A+8 | {A} si lava al Fiume a favore di telecamera, con la grazia di una pubblicità di shampoo. Gli sponsor prendono appunti.
1 trait:A=superstizioso pr:A-10 mo:A+5 | {A} dispone sette sassi bianchi attorno al proprio riparo, in cerchio. Il freddo e la sfortuna, dice, devono restare fuori.
1 trait:A=goloso food:A+20 mo:A+5 en:A-5 | {A} scopre un alveare in un tronco cavo e decide che le punture sono un prezzo onesto. Torna con la faccia gonfia e felice.
1 trait:A=paranoico en:A-10 +trap:A | {A} passa la giornata a disseminare il perimetro del suo riparo di rametti secchi e campanelli improvvisati. Nessuno arriverà di sorpresa.
1 trait:A=ingegnoso +attrezzo:A | {A} trasforma una molla della Cornucopia e due sassi in {attrezzo}. Funziona meglio dell'originale.
1 trait:A=solitario mo:A+10 en:A+10 | {A} passa una giornata intera senza vedere nessuno. È il giorno più bello dell'arena.
2 trait:A=leale ally:AB hp:B+15 @heal | {A} veglia {B} tutto il pomeriggio, cambiando[B:gli/le] le bende ogni ora. Non chiede niente in cambio.
2 trait:A=avido steal:A<B=valore | {A} si offre di custodire le cose di {B} «per sicurezza». {B} non rivedrà più {valore}.
2 trait:A=bruto hit:A>B @agg | {A} prende a calci il riparo di {B} solo perché è più bello del suo.
2 trait:A=romantico crush:A>B mo:A+15 | {A} scrive il nome di {B} sulla sabbia del Fiume, poi lo cancella in fretta prima che qualcuno lo veda.
1 d:A @mad | {A} decide di attraversare le Paludi di notte per fare prima. Le Paludi non perdonano chi ha fretta.
1 d:A wx:pericolo | Una frana improvvisa travolge {A} sull'Altopiano. Il cannone suona prima che la polvere si sia posata.
2 k:A>B w:A @agg | {A} aspetta {B} all'unico guado sicuro del Fiume. Quando {B} arriva, l'acqua si colora di rosso.
2 k:A>B grudge:A>B | {A} trova {B} che dorme sotto una quercia e si ricorda di {caro:A}. Non [B:gli/le] dà il tempo di svegliarsi.
`,
      n: `
1 pr:A+15 mo:A-5 | La notte sull'Altopiano è così fredda che {A} non sente più le dita dei piedi. Conta fino a mille, poi ricomincia.
1 test:A=res12 ok:en:A+10 ko:pr:A+20 | {A} si scava una buca nelle foglie secche e ci si infila dentro. Dorme al caldo come un tasso. || {A} prova a scaldarsi coprendosi di foglie. Il vento le porta via una per una.
1 test:A=sop13 ok:en:A+15 ko:hp:A-10 | Un branco di lupi mutanti ulula vicino al riparo di {A}. {A} alimenta il fuoco fino all'alba e i lupi restano al buio. || Un branco di lupi mutanti si avvicina al riparo di {A}. Riesce a scappare su un albero, ma uno dei lupi [A:gli/le] lascia un ricordo sul polpaccio.
1 @stl en:A+15 | {A} trova un albero cavo abbastanza grande da entrarci. Dorme come non dormiva da giorni.
1 con:A=amuleto mo:A+10 pr:A-10 | {A} stringe {amuleto:A} e guarda le stelle. Il freddo fa meno paura con qualcosa di casa in mano.
1 stat:A<hp40 hp:A+10 | Ferit[A:o/a] e sol[A:o/a], {A} si fa forza e si fascia la ferita con la manica della giacca. Domani, forse, andrà meglio.
1 @luck +cibo:A | Nel cuore della notte, un paracadute degli sponsor si impiglia tra i rami sopra {A}. Dentro c'è {cibo} e una coperta.
1 mo:A-10 | Nel cielo proiettano i volti dei caduti. {A} riconosce uno di loro e non riesce più a dormire.
1 test:A=furt12 ok:+arma:A ko:s:A=ferito | {A} si avvicina all'accampamento di un'alleanza addormentata e sfila {arma} dal mucchio. || {A} si avvicina all'accampamento di un'alleanza addormentata. Pesta un ramo. Corre per mezza notte, con un taglio sul fianco.
1 @mad mo:A+5 | {A} parla con la luna per tutta la notte. La luna, a quanto pare, è di ottima compagnia.
1 trait:A=sonnambulo en:A-10 | {A} si sveglia all'alba dentro le Paludi, con l'acqua alle ginocchia e nessuna idea di come ci sia arrivat[A:o/a].
1 trait:A=codardo en:A-15 mo:A-5 | {A} sente un rumore e passa la notte arrampicat[A:o/a] su un albero. Era un riccio.
1 trait:A=cacciatore +cibo:A | {A} piazza un laccio vicino a una tana di conigli e va a dormire. All'alba, la colazione è servita.
2 ally:AB pr:A-15 pr:B-15 | {A} e {B} dormono schiena contro schiena accanto alle braci. Ogni ora uno dei due si sveglia per aggiungere un ramo.
2 ally:AB test:A=cor12 ok:rel:AB+15 ko:hp:A-15 | {A} fa il turno di guardia mentre {B} dorme e scaccia uno sciame di vespe con una torcia. || {A} fa il turno di guardia mentre {B} dorme. Uno sciame di vespe trova {A} prima che {A} trovi loro.
2 couple:AB mo:A+15 mo:B+15 en:A+10 en:B+10 | {A} e {B} si raccontano come sarà la vita dopo l'arena. Non ci credono del tutto, ma è bello dirlo ad alta voce.
2 crush:A>B rel:AB+10 | {A} non riesce a dormire e passa la notte a guardare {B} che russa piano. Russa in un modo che trova adorabile.
2 friend:AB give:A>B=armatura @heal | {B} trema di freddo. {A} si toglie {armatura} e gliela mette sulle spalle senza dire niente.
2 enemy:AB hit:A>B @agg | Nel buio, {A} riconosce il respiro di {B} dietro un tronco. Lancia un sasso. Poi un altro.
2 test:A=furt13 ok:steal:A<B=cibo ko:hit:B>A | {A} striscia fino al riparo di {B} per rubare le provviste. || {A} striscia fino al riparo di {B}, ma {B} dorme con un occhio aperto e una mazza in mano.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia {cibo} davanti al riparo di {B}, ancora addormentat[B:o/a]: il debito è pagato.
2 trust:A>B fid:A>B+10 mo:A+10 | {A} confida a {B} il suo vero nome di battesimo, quello che nessuno usa. {B} lo ripete piano, per ricordarselo.
2 fear:A>B en:A-10 pau:A>B+10 | {A} sente {B} muoversi nel Bosco e non chiude occhio fino all'alba.
2 save:A>B @heal | Un serpente gigante si avvicina a {B} che dorme. {A} lo colpisce con un ramo e lo fa scappare. {B} si sveglia solo per vedere {A} che trema.
3 al:ABC pr:A-10 pr:B-10 pr:C-10 @soc | {A}, {B} e {C} accendono un unico fuoco e si siedono attorno senza parlare. Al mattino sono una squadra.
3 ally:AB ally:AC rel:BC+10 | {A} racconta una storia di fantasmi a {B} e {C}. Nessuno ammette di avere paura. Tutti dormono vicinissimi.
2 k:A>B @stl | {A} si avvicina a {B} che dorme vicino al fuoco. Il fuoco si spegne, e con lui {B}.
1 d:A pr:A+30 | {A} si addormenta sull'Altopiano senza un riparo. Il freddo della notte se lo porta via in silenzio.
2 k:A>B trap:A | {A} piazza {trap:A} davanti all'unico sentiero che porta al riparo di {B}. All'alba, il cannone conferma che ha funzionato.
`,
      f: `
1 +med:A +cibo:A @luck | Al festino {A} afferra il primo zaino e scappa via senza combattere. Dentro, una sorpresa: {med} e {cibo}.
2 hit:A>B steal:A<B=cibo @agg | Al festino {A} e {B} afferrano lo stesso zaino. Lo strappa {A}, insieme a un ciuffo di capelli di {B}.
2 al:AB @soc | Al festino {A} e {B} si coprono le spalle a vicenda e scappano insieme con due zaini. Da stasera sono alleati.
1 test:A=agi13 ok:+armatura:A ok:+cibo:A ko:s:A=ferito | {A} si lancia tra la folla del festino, afferra due zaini e sparisce. || {A} si lancia tra la folla del festino. Ne esce con un livido e nient'altro.
2 k:A>B w:A @agg | Il festino è un macello: {A} non lascia a {B} il tempo di raggiungere il tavolo.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
