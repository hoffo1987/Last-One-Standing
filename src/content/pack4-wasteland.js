/* Terre Desolate — quarto pacchetto: polvere radioattiva, motori truccati, acqua più preziosa dell'oro,
 * predoni con gusti discutibili e tributi che barattano tutto, anche la dignità. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'wasteland',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+armatura:A ko:s:A=ferito | {A} arriva al Deposito per prim[A:o/a] e sfonda un armadietto con un calcio: {arma} e {armatura}. || {A} arriva al Deposito per prim[A:o/a], ma l'armadietto che sfonda è pieno di ruggine e di un vecchio topo molto arrabbiato.
1 +attrezzo:A @int | {A} ignora le armi arrugginite e prende {attrezzo}. Nel deserto, chi aggiusta i motori vive più a lungo.
1 @cow +cibo:A | {A} si infila in un tubo di cemento con una tanica d'acqua e {cibo} e non esce per ore. Sopra, si sentono le urla e i motori.
2 al:AB @soc | {A} e {B} si ritrovano dietro la stessa carcassa di camion mentre volano i bulloni. Si dividono l'unica maschera: alleati.
2 hit:A>B steal:A<B=cibo @agg | {A} e {B} afferrano la stessa tanica. {A} vince con una testata. {B} resta con la sete e il naso storto.
1 test:A=sop12 ok:+mappa:A ko:pr:A+15 | {A} strappa da un furgone dei vecchi esploratori {mappa}, con le cisterne segnate. || {A} cerca una mappa in un furgone dei vecchi esploratori e trova solo un contatore Geiger che impazzisce.
`,
      d: `
1 stat:A>pr45 test:A=sop13 ok:pr:A-30 ko:pr:A+10 | {A} si lava con l'acqua pulita di una cisterna nascosta e si strofina la polvere radioattiva di dosso fino a farsi diventare rossa la pelle. || {A} si lava con l'acqua di una cisterna. Il contatore Geiger, vicino all'acqua, comincia a strillare.
1 con:A=attrezzo pr:A-20 | {A} usa {attrezzo:A} per sostituire il filtro della maschera. Respirare torna quasi gratuito.
1 wx:pericolo pr:A+20 | Una tempesta di sabbia radioattiva attraversa il Cratere. {A} si copre come può, ma la polvere entra ovunque.
1 test:A=int13 ok:+med:A ko:pr:A+10 | {A} trova una vecchia clinica nella Città fantasma e legge le etichette con pazienza: {med}. || {A} trova una vecchia clinica nella Città fantasma. Le medicine sono scadute da trent'anni e brillano al buio.
1 test:A=furt13 ok:+valore:A ko:s:A=ferito | {A} si infila nell'accampamento dei predoni mentre dormono e porta via {valore}. || {A} si infila nell'accampamento dei predoni. I predoni non dormono: stanno solo meditando sui loro errori, con le armi in mano.
1 test:A=sop12 ok:+cibo:A ok:+cibo:A ko:food:A-10 | {A} caccia lucertole tra le rocce della Discarica con una pazienza infinita. A sera ne ha una collana. || {A} caccia lucertole per tutta la mattina. Le lucertole cacciano {A} per tutto il pomeriggio.
1 @luck +cibo:A mo:A+5 | Un dirigibile degli sponsor sgancia un pacco proprio sulla testa di {A}. Dentro c'è {cibo} e un bernoccolo di regalo.
1 @mad mo:A+10 en:A-10 | {A} trova una vecchia moto senza ruote e ci passa sopra tutto il pomeriggio, facendo il rumore del motore con la bocca.
1 star:A @show | {A} si dipinge la faccia con l'olio di motore e lancia un grido di guerra verso la telecamera di un drone. In capitale si vendono magliette.
1 en:A+20 | {A} dorme nella carcassa fresca di un autobus, all'ombra. Il primo sonno vero da giorni.
1 stat:A<mo30 mo:A+15 | {A} trova un vecchio walkman con le pile ancora cariche. Dentro c'è una cassetta di canzoni d'amore. La ascolta tre volte.
1 need:A=ferito test:A=res12 ok:hp:A+20 ko:hp:A-8 | {A} si cuce la ferita con il filo di rame di un motore e l'ago di una bussola. Brutto, ma tiene. || {A} prova a cucirsi la ferita con il filo di rame. Il filo è troppo grosso.
1 test:A=cor14 ok:+arma:A ok:star:A ko:hp:A-20 | {A} affronta da sol[A:o/a] il capo dei predoni nel suo trono di pneumatici e gli porta via {arma}. || {A} affronta il capo dei predoni nel suo trono di pneumatici. Il capo dei predoni ha un trono e tanti amici.
1 test:A=agi12 ok:+valore:A ko:hp:A-12 | {A} si cala dalla Diga con una corda per recuperare una tanica di benzina incastrata. || {A} si cala dalla Diga con una corda. La corda era di un predone, e il predone la rivuole.
1 wx:abbondanza +cibo:A food:A+10 | È caduta la pioggia, per la prima volta in un mese: {A} raccoglie l'acqua in tutti i contenitori che trova e beve finché vuole.
1 trait:A=ingegnoso +trap:A | {A} costruisce una trappola con le molle di un materasso e la lamiera di un'auto. Si chiama «il sandwich».
1 trait:A=paranoico pr:A-10 en:A-10 | {A} si avvolge in tre strati di stagnola contro le radiazioni. Funziona poco, ma il pubblico l[A:o/a] adora.
1 trait:A=goloso food:A+25 s:A=malato | {A} trova una scatola di pesche sciroppate di prima del crollo. Le mangia tutte. Lo stomaco protesta fino a sera.
1 trait:A=cacciatore +cibo:A +cibo:A | {A} segue un branco di iguane fino al Cratere e torna con la cena per due giorni.
1 trait:A=esibizionista star:A mo:A+10 | {A} costruisce un'armatura di tappi di bottiglia e la indossa per le telecamere. Brilla al sole. Anche troppo.
1 trait:A=sopravvissuto pr:A-15 en:A+10 | {A} sa leggere il deserto: dove scavare per l'acqua, quando muoversi, dove stare all'ombra. Non è la prima apocalisse che vive.
1 trait:A=solitario mo:A+10 | {A} cammina un giorno intero sull'Autostrada spezzata senza vedere anima viva. Il silenzio del deserto [A:gli/le] fa compagnia.
2 ally:AB test:A=int12 ok:+attrezzo:A ok:rel:AB+10 ko:pr:A+10 ko:pr:B+10 | {A} e {B} rimettono in moto un generatore della Raffineria e ricaricano tutto quello che hanno. || {A} e {B} provano a rimettere in moto un generatore della Raffineria. Il generatore fa una nuvola di fumo verde e tossiscono per un'ora.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} divide con {B} l'ultima striscia di carne secca, a morsi alternati, come si fa nel deserto.
2 save:A>B @heal | Un verme delle sabbie emerge sotto i piedi di {B}. {A} [B:gli/le] lancia una corda e l[B:o/a] tira fuori dalla buca un attimo prima che si richiuda.
2 debt:B>A give:A>B=med @heal | {A} trova {B} che vomita per le radiazioni e [B:gli/le] lascia {med} accanto alla borraccia.
2 crush:A>B rel:AB+15 | {A} lascia a {B} un fiore di cactus, l'unica cosa bella fiorita nel deserto da mesi.
2 couple:AB pr:A-10 pr:B-10 mo:A+10 mo:B+10 | {A} e {B} si dividono la stessa maschera antigas, un respiro a testa. Non c'è niente di più romantico nelle Terre Desolate.
2 hit:A>B @agg | {A} scopre che {B} ha usato la sua acqua per lavarsi i piedi e glielo fa notare con un colpo di chiave inglese.
2 enemy:AB test:A=furt13 ok:steal:A<B=cibo ko:hit:B>A | {A} aspetta che {B} si addormenti per svuotar[B:gli/le] la borraccia. || {A} prova a svuotare la borraccia di {B}, ma {B} dorme con la borraccia sotto la testa e il coltello sotto la borraccia.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} un patto da viandanti: acqua divisa a metà, sempre. || {A} propone a {B} un patto da viandanti. {B} risponde che l'acqua non si divide, si conquista.
2 rival:AB @show rel:AB+5 | {A} e {B} fanno una gara di macchine senza ruote spinte giù per una duna. Arrivano insieme in fondo, coperti di sabbia.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} mostra a {B} dove ha nascosto la sua riserva d'acqua. Nel deserto, è come mostrare il proprio cuore.
2 fear:A>B en:A-15 | {A} vede {B} mangiare uno scorpione vivo e da quel momento [B:gli/le] sta lontan[A:o/a] il più possibile.
2 ally:AB test:A=cor13 ok:+arma:A ok:rel:AB+10 ko:hp:A-15 ko:hp:B-10 | {A} e {B} tendono un agguato a un predone isolato e gli prendono la balestra. || {A} e {B} tendono un agguato a un predone isolato. Il predone non era isolato.
3 al:ABC @soc | {A}, {B} e {C} rimettono in piedi un vecchio furgone e decidono di viaggiare insieme. Il furgone fa due chilometri e muore. L'alleanza no.
3 hit:A>B hit:A>C @agg | {A} sorprende {B} e {C} a svuotare la cisterna che aveva trovato e li caccia a colpi di catena.
3 ally:AB rel:AB+10 | {A} e {B} si guardano mentre {C} giura, per la terza volta, che quella macchia all'orizzonte è un'oasi.
2 k:A>B w:A @agg | {A} aspetta {B} sull'Autostrada spezzata, nascost[A:o/a] dentro una carcassa. {B} non arriva al prossimo cavalcavia.
2 k:A>B grudge:A>B | {A} lascia {B} nel Cratere senza acqua, per {caro:A}. Il deserto fa il resto.
1 d:A @mad | {A} beve l'acqua della pozza verde del Deposito «per vedere cosa succede». Succede.
1 d:A wx:pericolo | Una tempesta di sabbia radioattiva sorprende {A} in piena Discarica, lontan[A:o/a] da qualunque riparo.
`,
      n: `
1 pr:A+15 | Di notte il vento soffia dal Cratere e porta la polvere sottile. {A} si sveglia con la gola che brucia.
1 test:A=sop12 ok:en:A+15 ko:hp:A-15 | Un branco di cani mutati annusa l'accampamento di {A}. {A} accende un fuoco di copertoni e i cani girano al largo. || Un branco di cani mutati trova l'accampamento di {A} prima che {A} trovi i fiammiferi.
1 @stl en:A+15 pr:A-5 | {A} dorme dentro una cisterna vuota, chius[A:o/a] dall'interno con un bullone. Niente polvere, niente predoni.
1 con:A=amuleto mo:A+10 | {A} stringe {amuleto:A} e guarda le stelle del deserto, così tante che sembrano rumorose.
1 @luck +med:A | Durante la notte un dirigibile degli sponsor lascia cadere {med} a pochi passi da {A}, con un paracadute fatto di lenzuola.
1 trait:A=sonnambulo en:A-10 pr:A+10 | {A} cammina nel sonno fino al bordo del Cratere e si sveglia con un piede nel vuoto. Torna indietro molto piano.
1 trait:A=codardo en:A-15 | {A} sente il rombo dei motori dei predoni e passa la notte sepolt[A:o/a] nella sabbia fino al collo.
1 trait:A=folle mo:A+10 | {A} passa la notte a costruire un altare di lattine dedicato al dio della benzina. Il dio non risponde, ma la notte passa.
1 mo:A-10 | Nel cielo un dirigibile proietta i volti dei caduti sulle nuvole di polvere. {A} si copre gli occhi.
2 ally:AB pr:A-10 pr:B-10 en:A+10 | {A} e {B} si alternano a sorvegliare l'accampamento e a mantenere acceso il fuoco. Nessuno si avvicina.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} guardano le luci lontane della Raffineria che ancora brucia, e fanno finta che sia una città.
2 crush:A>B rel:AB+10 | {A} passa la notte a riparare la maschera di {B}, che dorme. Al mattino la maschera respira come nuova.
2 friend:AB give:A>B=armatura @heal | {B} trema per il freddo del deserto di notte. {A} [B:gli/le] passa la propria giacca da saldatore.
2 enemy:AB test:A=furt13 ok:steal:A<B=attrezzo ko:hit:B>A | {A} striscia fino all'accampamento di {B} per rubare il filtro di ricambio. || {A} striscia fino all'accampamento di {B}, ma {B} ha teso dei barattoli vuoti su un filo.
2 save:A>B @heal | Uno scorpione gigante si avvicina al sacco a pelo di {B}. {A} lo schiaccia con un sasso grande come una testa.
2 trust:A>B fid:A>B+10 | {A} dorme senza la maschera sul viso, fidandosi che {B} l[A:o/a] svegli se cambia il vento.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia a {B} una lattina ammaccata e mezza borraccia: debito saldato.
3 al:ABC @soc | {A}, {B} e {C} dormono nello stesso bunker crollato, schiena contro schiena. Al mattino sono una banda.
2 k:A>B @stl | Nel buio del deserto, {A} si avvicina a {B} senza fare rumore. La sabbia copre tutto.
1 d:A pr:A+30 | {A} si addormenta senza maschera vicino al Cratere. Il vento della notte non perdona.
2 k:A>B trap:A | {A} nasconde {trap:A} nella sabbia lungo il sentiero che {B} percorre ogni notte. All'alba, una nuvola di polvere.
`,
      f: `
1 +med:A +cibo:A @luck | Al convoglio {A} si lancia su un camion in corsa e scende con due casse: {med} e {cibo}.
2 hit:A>B steal:A<B=cibo @agg | Al convoglio {A} e {B} si contendono una tanica d'acqua. La vince {A}, con un calcio volante dal cassone.
2 al:AB @soc | Al convoglio {A} e {B} saltano sullo stesso camion e si coprono le spalle. Scendono alleati.
1 test:A=agi13 ok:+arma:A ok:+cibo:A ko:hp:A-15 | {A} corre accanto al convoglio e salta sul cassone al primo tentativo. || {A} corre accanto al convoglio, salta, e manca il cassone di un soffio.
2 k:A>B w:A @agg | Al convoglio {A} non lascia a {B} il tempo di saltare giù dal camion.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
