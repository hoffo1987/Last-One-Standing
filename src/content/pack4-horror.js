/* Villa Maledetta — quarto pacchetto: stanze che cambiano posto, ritratti che guardano, bambole
 * con opinioni, il terrore che sale e tributi che provano a non urlare. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'horror',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+attrezzo:A ko:pr:A+15 | Quando le luci della cena si spengono, {A} afferra al buio {arma} e {attrezzo} dalla credenza. || Quando le luci della cena si spengono, {A} afferra al buio quella che crede un'arma. È una mano. Fredda.
1 +attrezzo:A @int | Mentre gli altri si contendono i coltelli da tavola, {A} prende un candelabro acceso: {attrezzo}. Nella villa, la luce è tutto.
1 @cow +cibo:A | {A} si infila sotto il tavolo della cena con un vassoio di {cibo} e resta lì finché le urla non finiscono.
2 al:AB @soc | {A} e {B} si ritrovano chiusi nello stesso armadio a muro durante il blackout. Si stringono le mani al buio. Ne escono alleati.
2 hit:A>B steal:A<B=arma @agg | {A} strappa dalle mani di {B} il coltello d'argento della cena, con una forchettata sul dorso della mano.
1 test:A=cor12 ok:+mappa:A ko:pr:A+20 | {A} stacca dal muro del Salone una pianta incorniciata della villa: {mappa}. || {A} stacca dal muro una cornice credendo fosse una pianta della villa. Era un ritratto. Il ritratto apre gli occhi.
`,
      d: `
1 stat:A>pr45 test:A=cor13 ok:pr:A-30 ko:pr:A+10 | {A} si siede in mezzo al Salone e ripete ad alta voce: «Non ho paura di voi». Le candele tremano, poi si calmano. Anche {A}. || {A} prova a dire ad alta voce che non ha paura. La voce che risponde dalla Soffitta l[A:o/a] smentisce.
1 con:A=attrezzo pr:A-20 | {A} accende {attrezzo:A} e lo tiene alto mentre attraversa il corridoio. Le ombre si ritirano negli angoli, offese.
1 wx:pericolo pr:A+20 | Tutti gli specchi della villa si appannano nello stesso momento. Su quello davanti a {A} compare una scritta col dito: il suo nome.
1 test:A=int13 ok:+med:A ko:pr:A+15 | {A} trova la stanza della governante e il suo armadietto dei rimedi: {med}. || {A} trova la stanza della governante. La governante è ancora lì, seduta sulla sedia a dondolo. Da cent'anni.
1 test:A=furt13 ok:+valore:A ko:s:A=ferito | {A} fruga nei cassetti della Biblioteca e trova {valore} dentro un libro svuotato. || {A} fruga nei cassetti della Biblioteca. Un libro si chiude di scatto sulle dita di {A}.
1 test:A=sop12 ok:+cibo:A ok:+cibo:A ko:food:A-10 | {A} scopre una dispensa segreta dietro uno scaffale della Cantina, piena di conserve. || {A} scopre una dispensa segreta nella Cantina. Le conserve hanno un colore che non esiste in natura.
1 @luck +amuleto:A | Una busta nera infilata sotto la porta arriva ai piedi di {A}. Dentro c'è {amuleto} e un biglietto: «Ti servirà».
1 @mad mo:A+10 | {A} organizza un tè con le bambole della Soffitta. Le bambole sono ottime ascoltatrici. Una annuisce.
1 star:A @show | {A} recita un monologo shakespeariano davanti al ritratto del padrone di casa. Il ritratto applaude. Il pubblico in capitale si sente male.
1 en:A+15 pr:A+5 | {A} dorme tutto il pomeriggio su un letto a baldacchino della stanza degli ospiti. Si sveglia riposat[A:o/a] e con la sensazione di essere stat[A:o/a] guardat[A:o/a].
1 stat:A<mo30 mo:A+15 | {A} trova un carillon in una stanza dei bambini e lo carica. Suona una melodia dolce, senza trucchi. Per una volta.
1 need:A=ferito test:A=emp12 ok:hp:A+20 ko:pr:A+10 | {A} si medica la ferita con le bende di lino trovate in un baule della Soffitta. || {A} apre un baule della Soffitta per cercare delle bende. Il baule era occupato.
1 test:A=cor14 ok:+arma:A ok:star:A ko:hp:A-20 | {A} scende nella cripta del Cimitero per recuperare la spada d'argento di un cavaliere sepolto. || {A} scende nella cripta del Cimitero per recuperare una spada d'argento. Il cavaliere sepolto non è d'accordo.
1 wx:calma pr:A-10 mo:A+5 | Per una mattina la villa è silenziosa e piena di sole. {A} si siede in giardino a respirare, e quasi dimentica dove si trova.
1 trait:A=superstizioso pr:A-20 | {A} sparge sale sulla soglia di ogni porta che attraversa. Ci mette un'ora per ogni corridoio, ma nessuno l[A:o/a] segue.
1 trait:A=ingegnoso +trap:A | {A} trasforma un lampadario e una corda in un contrappeso pronto a cadere. Gli ospiti indesiderati sono avvisati.
1 trait:A=goloso food:A+20 pr:A+5 | {A} trova una torta intatta sul tavolo della sala da pranzo. È fresca, anche se la villa è disabitata da decenni. La mangia lo stesso.
1 trait:A=paranoico pr:A-10 en:A-10 | {A} copre tutti gli specchi del suo rifugio con delle lenzuola. Gli specchi, sotto, continuano a riflettere.
1 trait:A=esibizionista star:A mo:A+10 | {A} fa un tour della villa per le telecamere, con commenti da agente immobiliare. «Ottimo stato, solo qualche spettro».
1 trait:A=romantico mo:A+10 pr:A-5 | {A} trova in Biblioteca un pacco di lettere d'amore di cent'anni fa e le legge tutte. Piange. Si sente meglio.
1 trait:A=solitario mo:A+10 | {A} si chiude nella torretta per tutto il giorno. Da sol[A:o/a], anche i fantasmi sembrano meno rumorosi.
2 ally:AB test:A=int12 ok:+mappa:A ko:pr:A+10 ko:pr:B+10 | {A} e {B} trovano un passaggio segreto dietro la libreria e ne disegnano il percorso. || {A} e {B} entrano in un passaggio segreto dietro la libreria. Il passaggio si richiude. Ci mettono ore a uscire.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} divide con {B} una scatola di biscotti al burro, uno per uno, contandoli ad alta voce per non sentire i rumori.
2 save:A>B @heal | Una botola si apre sotto i piedi di {B}. {A} [B:gli/le] afferra il polso all'ultimo istante e l[B:o/a] tira su. Sotto, qualcosa sospira deluso.
2 debt:B>A give:A>B=med @heal | {A} trova {B} che trema in un angolo della Cappella e [B:gli/le] mette in mano {med} senza dire una parola.
2 crush:A>B rel:AB+15 | {A} lascia una rosa del giardino sul cuscino di {B}. La rosa è nera. Nella villa tutte le rose sono nere.
2 couple:AB pr:A-15 pr:B-15 mo:A+10 mo:B+10 | {A} e {B} ballano un valzer nel Salone vuoto, al suono di un grammofono che si è acceso da solo. Per una volta nessuno ha paura.
2 hit:A>B @agg | {A} accusa {B} di aver aperto la porta della Soffitta e di aver liberato «quella cosa». Lo dice con un pugno.
2 enemy:AB test:A=furt13 ok:pr:B+20 ko:pr:A+15 | {A} sposta di notte i ritratti nella stanza di {B}, tutti girati verso il letto. || {A} prova a spostare i ritratti nella stanza di {B}. I ritratti si spostano da soli. Verso {A}.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} di attraversare insieme la villa fino all'alba. || {A} propone a {B} di fare squadra. {B} guarda il riflesso di {A} nello specchio, che sorride quando {A} non sorride. Dice di no.
2 rival:AB @show rel:AB+5 | {A} e {B} si sfidano a chi resta più a lungo nella stanza del pianoforte stregato. Escono nello stesso istante, urlando.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} racconta a {B} cosa ha visto davvero nella Cantina. {B} non ride e non scappa. È tanto.
2 fear:A>B en:A-15 pr:A+10 | {A} vede {B} parlare con una bambola in Soffitta. La bambola risponde. Da quel momento non riesce più a stare nella stessa stanza con {B}.
2 ally:AB test:A=cor13 ok:pr:A-15 ok:pr:B-15 ko:hp:A-15 | {A} e {B} affrontano insieme l'entità senza volto del corridoio, con un crocifisso e tanta voce. || {A} e {B} affrontano l'entità senza volto del corridoio. L'entità ha un volto, dopo tutto. Il loro.
3 al:ABC @soc | {A}, {B} e {C} si chiudono nella Cappella e promettono di non separarsi mai più, come nei film. Nei film va sempre male, ma ci provano.
3 hit:A>B hit:A>C @agg | {A} sorprende {B} e {C} a frugare nel suo baule e li caccia a colpi di attizzatoio.
3 ally:AB rel:AB+10 | {A} e {B} si scambiano uno sguardo quando {C} propone, per la terza volta, di «separarsi per coprire più stanze».
2 k:A>B w:A @agg | {A} aspetta {B} in cima allo scalone, al buio. Il rumore della caduta si sente in tutta la villa.
2 k:A>B grudge:A>B | {A} chiude {B} nella cripta del Cimitero, per {caro:A}. Dall'interno, presto, non si sente più niente.
1 d:A @mad | {A} decide di usare la tavola ouija «per chiedere la strada». La tavola gliela indica. Porta in giù.
1 d:A wx:pericolo | Il pavimento marcio della Soffitta cede sotto {A}, nel momento esatto in cui tutte le candele si spengono.
`,
      n: `
1 pr:A+15 | Durante la notte qualcuno bussa dall'interno dell'armadio di {A}. Tre colpi. Poi altri tre. Poi silenzio, il peggiore.
1 test:A=cor13 ok:pr:A-10 ok:mo:A+10 ko:pr:A+20 | Uno spettro urlante attraversa la stanza di {A}. {A} lo guarda e gli dice, gentilmente, di abbassare la voce. Lo spettro si scusa e se ne va. || Uno spettro urlante attraversa la stanza di {A}. {A} urla più forte. Lo spettro si offende e resta.
1 test:A=sop12 ok:en:A+15 ko:hp:A-15 | Uno stormo di corvi entra dalla finestra rotta. {A} si nasconde sotto il letto con il cuscino sopra la testa finché non se ne vanno. || Uno stormo di corvi entra dalla finestra rotta e {A} non trova un posto abbastanza piccolo dove nascondersi.
1 @stl en:A+15 pr:A-5 | {A} trova un passaggio segreto con una porticina che si chiude da dentro. Dorme in uno spazio stretto come una bara, ma sicuro.
1 con:A=amuleto pr:A-15 | {A} stringe {amuleto:A} e recita la preghiera che la nonna diceva durante i temporali. La stanza si fa più calda.
1 @luck +med:A | Al risveglio, accanto al letto di {A} c'è {med} che prima non c'era. Nessuno è entrato. Nessuno vivo.
1 trait:A=sonnambulo pr:A+15 | {A} cammina nel sonno fino al Cimitero e si sveglia sdraiat[A:o/a] su una tomba con il suo nome scritto sopra. Di uno sconosciuto con lo stesso nome. Forse.
1 trait:A=codardo en:A-15 pr:A+10 | {A} passa la notte con la testa sotto le coperte, fingendo di non esistere. Funziona fino alle tre.
1 trait:A=folle mo:A+10 | {A} passa la notte a giocare a carte con un fantasma in biblioteca. Perde tre volte, poi capisce che il fantasma bara.
1 mo:A-10 pr:A+10 | Le finestre della villa proiettano i volti dei caduti sulle pareti del corridoio. {A} li incontra uno per uno, andando in bagno.
2 ally:AB pr:A-10 pr:B-10 en:A+10 | {A} e {B} dormono nella stessa stanza con tutte le candele accese, raccontandosi barzellette pessime ogni volta che si sente un rumore.
2 couple:AB pr:A-15 pr:B-15 mo:A+10 mo:B+10 | {A} e {B} si stringono sotto le coperte mentre la villa scricchiola. «Sono solo le travi», dice uno. Nessuno ci crede, ma va bene così.
2 crush:A>B rel:AB+10 | {A} non riesce a dormire e veglia sul sonno di {B}, pront[A:o/a] a svegliarl[B:o/a] se il ritratto sopra il letto apre di nuovo gli occhi.
2 friend:AB give:A>B=amuleto @heal | {B} trema di terrore. {A} [B:gli/le] mette al collo {amuleto} e resta a farl[B:o/a] parlare fino all'alba.
2 enemy:AB test:A=furt13 ok:steal:A<B=attrezzo ko:hit:B>A | {A} si avvicina alla stanza di {B} per rubare il candelabro che tiene acceso. || {A} si avvicina alla stanza di {B}, ma il pavimento scricchiola nel punto sbagliato.
2 save:A>B @heal | Una bambola posseduta si avvicina al letto di {B} con un ago da cucito. {A} la butta dalla finestra. La bambola, prima di cadere, saluta.
2 trust:A>B fid:A>B+10 | {A} spegne la propria candela per risparmiarla e si affida alla luce di {B}. Nella villa non c'è fiducia più grande.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia davanti alla porta di {B} un barattolo di marmellata della cantina: il debito è saldato.
3 al:ABC pr:A-10 pr:B-10 pr:C-10 | {A}, {B} e {C} si siedono in cerchio con le spalle verso l'interno, così nessuno può arrivare alle spalle. Al mattino sono una squadra.
2 k:A>B @stl | Nel buio del corridoio, {A} si avvicina a {B}. Il grido si confonde con quelli della villa.
1 d:A pr:A+30 | {A} apre la porta della stanza in fondo al corridoio, quella che tutti evitano. La porta si richiude.
2 k:A>B trap:A | {A} nasconde {trap:A} sotto il tappeto davanti alla stanza di {B}. La villa approva.
`,
      f: `
1 +med:A +amuleto:A @luck | Al ballo in maschera {A} afferra un cofanetto dal tavolo dei premi e scappa: dentro, {med} e {amuleto}.
2 hit:A>B steal:A<B=cibo @agg | Al ballo in maschera {A} e {B} si contendono l'ultimo vassoio di dolci. Lo vince {A}, che non si toglie la maschera.
2 al:AB @soc | Al ballo in maschera {A} e {B} ballano insieme per non essere riconosciuti. Finito il valzer, sono alleati.
1 test:A=furt13 ok:+arma:A ok:+cibo:A ko:pr:A+20 | {A} attraversa il ballo in maschera senza farsi notare e porta via due cofanetti. || {A} prova ad attraversare il ballo in maschera, ma uno degli invitati si toglie la maschera. Sotto non c'è niente.
2 k:A>B w:A @agg | Al ballo in maschera {A} non lascia a {B} il tempo di togliersi la maschera.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
