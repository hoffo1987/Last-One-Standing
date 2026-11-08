/* Città degli Infetti — quarto pacchetto: supermercati saccheggiati, radio che gracchiano, morsi nascosti,
 * l'orda che sente tutto e tributi che provano a restare umani in una città che non lo è più. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'zombie',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+cibo:A ko:s:A=ferito | {A} sfonda la vetrina di un minimarket mentre gli altri litigano per la jeep dei militari. Esce con {arma} e {cibo}. || {A} sfonda la vetrina di un minimarket e si taglia sul vetro. Esce con le mani vuote e una manica rossa.
1 +attrezzo:A @int | {A} ignora le armi della camionetta e prende {attrezzo}. In città, aprire le porte conta più che sfondarle.
1 @cow +cibo:A | {A} si chiude nel bagno di un bar con una confezione di {cibo} e non apre a nessuno, nemmeno a chi bussa educatamente.
2 al:AB @soc | {A} e {B} si ritrovano sullo stesso tetto, inseguiti dalla stessa orda. Tirano su la scala insieme. Alleati per necessità.
2 hit:A>B steal:A<B=arma @agg | {A} strappa {arma} dalle mani di {B} durante il caos dell'evacuazione. {B} resta disarmat[B:o/a] in mezzo alla strada.
1 test:A=furt12 ok:+mappa:A ko:mo:A-10 | {A} sfila dalla tasca di un soldato caduto {mappa}. || {A} prova a prendere la mappa dalla tasca di un soldato caduto. Il soldato non è caduto del tutto.
`,
      d: `
1 test:A=furt13 ok:+cibo:A ok:+cibo:A ko:s:A=ferito | {A} entra nel Centro commerciale dal tetto e svuota gli scaffali del reparto conserve senza svegliare nessuno. || {A} entra nel Centro commerciale dal tetto. Un carrello cade dal soppalco, e l'orda si sveglia tutta insieme.
1 test:A=int13 ok:+med:A ko:hp:A-10 | {A} trova la farmacia dell'Ospedale e legge le etichette con calma: prende solo quello che serve. {med}. || {A} trova la farmacia dell'Ospedale, ma la porta del magazzino è bloccata da qualcosa che respira.
1 stat:A>pr35 test:A=res13 ok:pr:A-25 ko:pr:A+10 | {A} ha la febbre alta e una vena scura sul braccio. Si chiude in un bagno e la combatte da sol[A:o/a], per ore. All'alba la febbre scende. || {A} ha la febbre alta e la vena scura sul braccio si allunga. La nasconde sotto la manica e finge di stare bene.
1 con:A=med pr:A-20 hp:A+10 | {A} usa {med:A} per pulire il graffio che si era fatt[A:o/a] scavalcando una recinzione. Meglio non rischiare.
1 wx:pericolo pr:A+10 s:A=ferito | Un'orda attraversa la Piazza proprio mentre {A} la sta traversando. Ne esce con un graffio sul polso che non [A:gli/le] piace per niente.
1 @luck +cibo:A mo:A+5 | Un elicottero militare lancia un pacco sopra la Periferia: atterra a tre metri da {A}. Dentro, {cibo} e una pagina di istruzioni in sei lingue.
1 test:A=sop12 ok:+cibo:A ko:food:A-10 | {A} scopre un orto nel cortile della Scuola e raccoglie quello che è rimasto. || {A} scopre un orto nel cortile della Scuola, ma qualcuno è arrivato prima e ha lasciato solo le carote marce.
1 test:A=cor13 ok:+arma:A ko:hp:A-20 | {A} entra nella Stazione di polizia per prendere {arma} dall'armeria. La serratura è rotta, ma qualcosa dentro è ancora in servizio. || {A} entra nella Stazione di polizia per recuperare un'arma. Un agente infetto è ancora in servizio, e prende il lavoro molto sul serio.
1 stat:A<mo30 mo:A+15 | {A} accende una radio trovata in un'auto e sente una voce che chiama da lontano: «Se mi sentite, ci sono ancora sopravvissuti al porto». Forse è registrata. Forse no.
1 @mad mo:A+10 en:A-5 | {A} gioca da sol[A:o/a] a bowling nel Centro commerciale abbandonato, usando bottiglie d'acqua come birilli. Fa strike. Esulta da sol[A:o/a].
1 star:A @show | {A} dipinge sulla vetrina di un negozio un messaggio per le telecamere: «CIAO MAMMA, STO BENE». In capitale la mamma piange in diretta.
1 en:A+20 | {A} trova un letto vero in un appartamento all'ultimo piano, con la porta blindata. Dorme otto ore. Sogna di fare colazione.
1 need:A=ferito test:A=emp12 ok:hp:A+20 ko:hp:A-8 | {A} si fascia la ferita in un bagno del Centro commerciale, seguendo le istruzioni del cartello del primo soccorso. || {A} prova a fasciarsi la ferita, ma il cartello del primo soccorso è in un'altra lingua.
1 test:A=agi12 ok:+valore:A ko:hp:A-12 | {A} scavalca i tornelli della Metropolitana e trova {valore} in una biglietteria. || {A} scavalca i tornelli della Metropolitana e cade dall'altra parte, proprio sopra un infetto addormentato.
1 trait:A=ingegnoso +trap:A | {A} costruisce una trappola con un carrello della spesa, un estintore e un cavo elettrico. Funziona, e fa anche ridere.
1 trait:A=paranoico pr:A-15 en:A-10 | {A} si controlla le braccia ogni ora, sotto ogni luce, cercando morsi. Non ne trova. Non si fida lo stesso.
1 trait:A=goloso food:A+25 mo:A+5 | {A} trova una gelateria con il congelatore ancora acceso grazie a un generatore. Si siede e mangia una vaschetta intera di pistacchio.
1 trait:A=cacciatore +cibo:A | {A} prende un piccione sul tetto con una fionda improvvisata. Arrostito sul barbecue di un balcone, non è nemmeno male.
1 trait:A=esibizionista star:A mo:A+10 | {A} si fa un selfie con un infetto immobilizzato in una cabina telefonica. In capitale diventa la foto dell'anno.
1 trait:A=sopravvissuto pr:A-15 en:A+10 | {A} sa esattamente cosa fare: acqua bollita, porta bloccata, finestra libera per scappare. È già sopravvissut[A:o/a] a peggio.
1 trait:A=solitario mo:A+10 | {A} attraversa mezza città senza incontrare nessuno, vivo o morto. Si sente benissimo.
2 ally:AB test:A=furt12 ok:+cibo:A ok:+cibo:B ko:hp:A-10 ko:hp:B-10 | {A} e {B} saccheggiano insieme un supermercato: uno sorveglia, l'altro riempie gli zaini. || {A} e {B} saccheggiano un supermercato. L'allarme antifurto, misteriosamente, funziona ancora.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} apre una scatoletta di fagioli e ne dà metà a {B}. Mangiano col coltello, a turno.
2 save:A>B @heal | Un infetto corridore piomba su {B} da un vicolo. {A} lo atterra con un colpo di estintore. {B} trema per mezz'ora.
2 debt:B>A give:A>B=med @heal | {A} trova {B} che si fascia un braccio con una maglietta e [B:gli/le] lancia {med} da dietro una macchina.
2 crush:A>B rel:AB+15 | {A} lascia sulla porta del rifugio di {B} un mazzo di fiori di plastica preso da un negozio. È il pensiero che conta.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} ballano un lento nel parcheggio deserto del Centro commerciale, con la musica di un'autoradio. L'orda è lontana, per una volta.
2 hit:A>B @agg | {A} scopre che {B} ha bloccato l'unica uscita del palazzo per tenersi le provviste e glielo fa notare con un calcio.
2 enemy:AB test:A=furt13 ok:steal:A<B=cibo ko:hit:B>A | {A} aspetta che {B} esca a esplorare per svuotare il suo nascondiglio. || {A} prova a svuotare il nascondiglio di {B}, ma {B} l'ha riempito di barattoli che fanno rumore.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} di fare squadra per arrivare al porto. || {A} propone a {B} di fare squadra. {B} [A:gli/le] chiede di mostrare le braccia, e alla fine dice di no.
2 rival:AB @show rel:AB+5 | {A} e {B} fanno a gara a chi colpisce più infetti con le palle da tennis di un negozio di sport. Vince l'orda.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} mostra a {B} un graffio sul braccio. È solo un graffio, ma mostrarlo è un atto di fiducia enorme.
2 fear:A>B en:A-15 | {A} vede {B} tossire sangue e da quel momento si tiene sempre a tre metri di distanza.
2 ally:AB test:A=cor13 ok:+arma:A ok:rel:AB+10 ko:hp:A-15 ko:pr:A+10 | {A} e {B} bloccano un gigante mutato in una porta girevole e recuperano le armi della sua vecchia pattuglia. || {A} e {B} affrontano un gigante mutato. La porta girevole non regge.
3 al:ABC @soc | {A}, {B} e {C} si barricano nello stesso negozio di elettronica e passano la notte a giocare ai videogiochi in esposizione. Al mattino sono una squadra.
3 hit:A>B hit:A>C @agg | {A} sorprende {B} e {C} a svuotare il suo nascondiglio nella Metropolitana e li caccia a colpi di cartello stradale.
3 ally:AB rel:AB+10 | {A} e {B} si guardano mentre {C} canta per la terza volta la stessa canzone stonata. L'orda, per fortuna, non ha orecchio.
2 k:A>B w:A @agg | {A} aspetta {B} in fondo alla scala mobile ferma del Centro commerciale. {B} non arriva al piano terra.
2 k:A>B grudge:A>B | {A} chiude {B} fuori dal rifugio mentre l'orda arriva. Per {caro:A}, dice, e non apre.
1 d:A @mad | {A} accende i fuochi d'artificio di un negozio di articoli per feste «per festeggiare». Tutta l'orda della città viene alla festa.
1 d:A wx:pericolo | Un'orda gigantesca invade la via in cui {A} si nasconde. Non c'è un tetto abbastanza alto.
`,
      n: `
1 pr:A+10 | Durante la notte {A} sente bussare alla porta del suo rifugio, piano e a lungo. Non apre. Non dorme.
1 test:A=sop12 ok:en:A+15 ko:hp:A-15 | Un cane infetto fiuta il rifugio di {A}. {A} lo distrae lanciando una scatoletta dalla finestra opposta. || Un cane infetto fiuta il rifugio di {A} e trova la finestra lasciata socchiusa.
1 @stl en:A+15 | {A} passa la notte dentro un furgone blindato con le chiavi nel cruscotto. È il posto più sicuro della città.
1 con:A=amuleto mo:A+10 | {A} stringe {amuleto:A} e ascolta il silenzio della città morta. Per un momento, sembra solo una città che dorme.
1 @luck +med:A | Durante la notte un drone militare lascia cadere {med} sul balcone di {A}, con la luce rossa che lampeggia.
1 trait:A=sonnambulo en:A-10 | {A} cammina nel sonno fino in strada e si sveglia in mezzo a tre infetti che dormono in piedi. Torna indietro in punta di piedi.
1 trait:A=codardo en:A-15 | {A} sente un rumore e passa la notte chius[A:o/a] in un frigorifero industriale spento. Al mattino non sente più le mani.
1 trait:A=folle mo:A+10 | {A} passa la notte a dare un nome a ogni infetto che passa sotto la finestra. Il preferito si chiama Gianfranco.
1 mo:A-10 | Sui maxischermi della Piazza scorrono i volti dei caduti. Gli infetti si fermano a guardarli. {A} non riesce più a dormire.
2 ally:AB en:A+10 en:B+10 | {A} e {B} fanno la guardia a turno sul tetto, con una torcia e un fischietto. Nessuno sale senza farsi sentire.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} guardano la città spenta dal tetto. Senza luci, si vedono le stelle per la prima volta dopo anni.
2 crush:A>B rel:AB+10 | {A} copre {B} con l'unica coperta mentre dorme, e passa la notte a battere i denti. Ne vale la pena.
2 friend:AB give:A>B=med @heal | {B} ha la febbre alta. {A} [B:gli/le] dà {med} e veglia fino a quando la fronte non si rinfresca.
2 enemy:AB test:A=furt13 ok:steal:A<B=arma ko:hit:B>A | {A} entra nel rifugio di {B} per rubare l'arma che tiene accanto al letto. || {A} entra nel rifugio di {B}, ma {B} dorme con l'arma in mano.
2 save:A>B @heal | Un infetto entra dalla finestra mentre {B} dorme. {A} lo spinge giù con un attaccapanni. {B} si sveglia solo per il tonfo.
2 trust:A>B fid:A>B+10 | {A} dorme senza legarsi le mani, come si fa quando si teme di trasformarsi: si fida di {B} che fa la guardia.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia davanti alla porta di {B} due scatolette: il debito è saldato.
3 al:ABC @soc | {A}, {B} e {C} si chiudono nello stesso appartamento e bloccano la porta con un frigorifero. Al mattino sono una squadra.
2 k:A>B @stl | Nel buio dell'appartamento, {A} si avvicina a {B} che dorme. Al mattino c'è una persona sola a fare colazione.
1 d:A pr:A+25 | {A} si addormenta con la febbre e la vena scura che sale sul collo. Al mattino non è più {A}.
2 k:A>B trap:A | {A} piazza {trap:A} sulle scale del palazzo dove si nasconde {B}. Il rumore sveglia mezza città.
`,
      f: `
1 +med:A +cibo:A @luck | Al lancio dei militari {A} afferra un pacco e scappa in un tombino: dentro, {med} e {cibo}.
2 hit:A>B steal:A<B=cibo @agg | Al lancio dei militari {A} e {B} si contendono lo stesso pacco. Lo vince {A}, che morde.
2 al:AB @soc | Al lancio dei militari {A} e {B} si coprono le spalle e scappano insieme con tre pacchi. Da stasera sono alleati.
1 test:A=agi13 ok:+armatura:A ok:+cibo:A ko:pr:A+15 | {A} corre sotto i paracadute dei militari e afferra due pacchi prima di tutti. || {A} corre verso i paracadute dei militari, ma un infetto l[A:o/a] graffia mentre si china a raccoglierli.
2 k:A>B w:A @agg | Al lancio dei militari {A} non lascia a {B} il tempo di aprire il pacco.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
