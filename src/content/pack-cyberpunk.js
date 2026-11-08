/* Night City — Zona Rossa: eventi d'autore, consegne del fixer, finale e disastri.
 * Zone: 0 Mercato di Kabuki · 1 Megablocco · 2 Clinica del ripperdoc · 3 Club della braindance
 *       4 Officina dei Maelstrom · 5 Nodo dati corporativo · 6 Piazza della torre.
 * Regole: ogni fatto raccontato ha l'effetto corrispondente; le azioni dei netrunner
 * avvengono sempre sul posto, con un cavo, una presa o un terminale (niente attacchi a distanza);
 * il Sovraccarico neurale (pr) cala solo con cure, diagnosi riuscite o riposo assistito. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'cyberpunk',
    ev: {
      b: `
1 at:6 +med:A @int | {A} sfonda la vetrina di una farmacia automatica in Piazza e si porta via {med} prima che scattino le serrande.
1 at:6 +valore:A @luck | Nella calca della Piazza, {A} raccoglie da terra quello che un corriere in fuga ha perso: {valore}.
1 at:6 @stl en:A+5 | {A} spegne il proprio biochip, si mescola a un gruppo di turisti terrorizzati e supera il primo posto di blocco senza un controllo.
1 at:6 test:A=agi12 ok:+cibo:A ko:s:A=ferito | {A} si lancia sotto una serranda che scende e la supera con le braccia piene di {cibo}. || {A} prova a passare sotto una serranda che scende, ma la serranda arriva prima e [A:gli/le] schiaccia una gamba.
1 at:6 pr:A+10 | Le ottiche di {A} registrano tutta la sparatoria del colpo andato male, fotogramma per fotogramma. Il sovraccarico neurale parte già alto.
1 at:6 +attrezzo:A @int | {A} stacca da un'auto della sicurezza in fiamme {attrezzo} ancora funzionante.
2 at:6 al:AB @soc | {A} e {B} si nascondono nello stesso vano di un ascensore della torre e decidono di uscirne insieme.
2 at:6 k:A>B @agg | Nella calca della Piazza, {A} usa {B} come scudo contro una raffica dei droni.
2 at:6 test:A=car12 ok:al:AB ko:mo:A-8 | {A} convince {B} che in due si passano i controlli meglio che da soli. Funziona: nasce un'alleanza. || {A} propone a {B} di passare i controlli insieme. {B} sparisce tra la folla senza rispondere.
2 at:6 steal:A<B=cibo @stl | Mentre {B} guarda le serrande scendere, {A} [B:gli/le] sfila dallo zaino {cibo:B}.
3 at:6 al:ABC @soc | {A}, {B} e {C} si ritrovano dietro lo stesso furgone blindato in mezzo alla Piazza. Un'occhiata, e decidono di coprirsi le spalle a vicenda.
`,
      d: `
1 at:0 +cibo:A @food | Al Mercato di Kabuki, {A} racconta una storia inventata a una signora dei noodle. Lei ride così tanto che [A:gli/le] regala {cibo}.
1 at:0 test:A=car12 ok:+attrezzo:A ko:mo:A-6 | {A} contratta per mezz'ora con un venditore di ricambi del Mercato e se ne va con {attrezzo} a un prezzo ridicolo. || {A} contratta con un venditore di ricambi del Mercato, ma il venditore ride e chiude la tenda.
1 at:0 con:A=valore -valore:A +med:A | Al Mercato, {A} paga un banco di medicinali con {valore:A} e riceve in cambio {med}.
1 at:0 test:A=furt12 ok:+valore:A ko:s:A=ferito | Mentre due venditori del Mercato litigano, {A} si infila dietro i banchi e recupera {valore} da una cassa lasciata aperta. || {A} prova a infilarsi dietro i banchi del Mercato, ma un venditore se ne accorge e [A:gli/le] spacca una bottiglia sul braccio.
1 at:0 test:A=int11 ok:+mappa:A ko:mo:A-5 | Al Mercato, {A} riconosce un falso tra le mappe in vendita e il venditore, pur di farl[A:o/a] stare zitt[A:o/a], [A:gli/le] regala quella vera: {mappa}. || Al Mercato, {A} compra la mappa di un distretto sigillato. A metà strada scopre che è la mappa di un altro distretto.
2 at:0 al:AB @soc | {A} offre a {B} metà di uno spiedino comprato al Mercato. Tra un boccone e l'altro, nasce un'alleanza.
2 at:0 k:A>B @agg | Al Mercato di Kabuki, {A} segue {B} tra le bancarelle e chiude il conto in un vicolo senza testimoni.
1 at:1 en:A+15 | {A} trova una capsula-letto del Megablocco con la serratura rotta e ci dorme sei ore di fila, per la prima volta da giorni.
1 at:1 test:A=emp12 ok:+cibo:A ok:mo:A+6 ko:mo:A-6 | Al Megablocco, {A} aiuta un'anziana a riparare la porta di casa. Lei ricambia con {cibo} e un sorriso. || Al Megablocco, {A} bussa a dieci porte per chiedere aiuto. Non se ne apre nessuna.
1 at:1 test:A=agi12 ok:mo:A+6 ko:s:A=ferito | {A} scende quaranta piani del Megablocco lungo la scala antincendio esterna, più in fretta della pattuglia che l[A:o/a] cerca. || {A} scende la scala antincendio del Megablocco, ma un gradino cede e [A:gli/le] apre un taglio sulla gamba.
2 at:1 test:A=emp12 ok:al:AB ko:rel:AB-8 | Nel corridoio del Megablocco, {A} riconosce in {B} la stessa paura che ha l[A:ui/ei]. Lo dice ad alta voce, e {B} accetta di restare insieme. || Nel corridoio del Megablocco, {A} prova a parlare con {B}, ma sceglie la frase sbagliata e {B} [A:gli/le] chiude la porta in faccia.
2 at:1 steal:A<B=valore @stl @secret | Mentre {B} dorme in una capsula del Megablocco, {A} forza lo sportello e si porta via {valore:B}.
1 at:2 stat:A>pr45 test:A=int12 ok:pr:A-25 ko:pr:A+6 | Alla Clinica del ripperdoc, {A} collega i propri impianti al diagnostico e trova il modulo che scalda. Lo spegne: il sovraccarico neurale scende. || Alla Clinica, {A} prova a fare da sol[A:o/a] la diagnosi degli impianti, ma sbaglia sequenza e il diagnostico manda una scarica.
1 at:2 stat:A<hp70 test:A=emp11 ok:cure:A ko:hp:A-8 | {A} convince il ripperdoc a curarl[A:o/a] in cambio di una promessa: un'ora sul lettino, ferite chiuse e impianti ricalibrati. || {A} chiede al ripperdoc di curarl[A:o/a], ma il ripperdoc vuole eddie veri. {A} ci prova da sol[A:o/a] e peggiora la ferita.
1 at:2 +med:A @heal | Nel retro della Clinica, {A} trova un armadietto con il lucchetto rotto: dentro c'è {med}.
1 at:2 stat:A<hp60 con:A=valore -valore:A cure:A | {A} paga il ripperdoc con {valore:A}. In mezz'ora le ferite sono chiuse e gli impianti ricalibrati.
2 at:2 stat:B>pr50 test:A=emp12 ok:pr:B-20 ok:fid:B>A+8 ko:pr:B+5 | Alla Clinica, {A} legge i valori di {B} sul monitor e capisce prima di {B} cosa non va. Un riavvio guidato, e il sovraccarico di {B} scende. || Alla Clinica, {A} prova a leggere i valori degli impianti di {B}, ma li interpreta al contrario e il riavvio peggiora le cose.
2 at:2 need:B=ferito con:A=med -med:A cure:B debt:B>A @heal | Sul lettino della Clinica, {A} usa {med:A} per rimettere in piedi {B}. {B} ringrazia a denti stretti: adesso è in debito.
1 at:3 test:A=car12 ok:star:A ok:mo:A+10 ko:mo:A-8 | Al Club della braindance, {A} sale sul palco e improvvisa un discorso contro le corporazioni. Le registrazioni girano in tutto il distretto. || Al Club, {A} sale sul palco per farsi notare, ma il microfono è spento e nessuno se ne accorge.
1 at:3 pr:A+12 mo:A+12 | {A} si concede una braindance di dieci minuti al Club: una spiaggia, il sole, nessuna paura. Esce sorridendo, ma con gli impianti bollenti.
1 at:3 test:A=furt12 ok:+valore:A ko:s:A=ferito | Al Club, {A} si mescola ai ballerini e sfila {valore} dalla giacca di un dirigente ubriaco. || Al Club, {A} prova a sfilare il portafoglio a un dirigente ubriaco, ma la guardia del corpo se ne accorge e [A:gli/le] torce il braccio.
2 at:3 crush:A>B test:A=car12 ok:love:AB ko:mo:A-10 | Sotto le luci del Club, {A} invita {B} a ballare. Al terzo pezzo, si baciano. || Sotto le luci del Club, {A} invita {B} a ballare. {B} guarda l'ora e dice che deve andare.
2 at:3 al:AB @soc | Al bancone del Club, {A} e {B} scoprono di essere stat[AB:i/e] fregat[AB:i/e] dallo stesso fixer. Brindano e decidono di fregarlo insieme.
2 at:3 k:A>B @agg | Al Club della braindance, {A} manomette il visore di {B} durante una sessione. {B} non si sveglia più.
1 at:4 test:A=furt13 ok:+arma:A ko:s:A=ferito | {A} si infila nell'Officina dei Maelstrom durante il cambio della guardia ed esce con {arma}. || {A} prova a infilarsi nell'Officina dei Maelstrom, ma i Maelstrom l[A:o/a] vedono e [A:gli/le] lasciano un ricordo con una chiave inglese.
1 at:4 test:A=int12 ok:+armatura:A ko:en:A-10 | All'Officina, {A} assembla {armatura} con le lamiere di una moto smontata. || All'Officina, {A} prova ad assemblare una protezione con le lamiere di una moto, ma i pezzi non combaciano e la giornata se ne va in tentativi.
1 at:4 pr:A+12 | Per pagare il passaggio, {A} accetta di provare per un'ora un impianto dei Maelstrom. L'impianto se ne va, il sovraccarico neurale resta.
2 at:4 enemy:AB test:A=int12 ok:hit:A>B ko:hit:B>A | All'Officina, {A} sabota la moto di {B}: i freni cedono alla prima curva e {B} finisce contro un muro. || All'Officina, {A} prova a sabotare la moto di {B}, ma {B} l[A:o/a] sorprende con le mani nel motore e [A:gli/le] chiude il cofano sulle dita.
2 at:4 k:A>B @agg | {A} attira {B} nell'Officina dei Maelstrom e l[B:o/a] spinge nel campo di tiro della torretta.
2 at:4 al:AB @soc | All'Officina, {A} e {B} rimettono in moto insieme una vecchia moto. Il motore parte al terzo tentativo, e anche l'alleanza.
1 at:5 test:A=int13 ok:+valore:A ok:pr:A+6 ko:pr:A+16 ko:s:A=ferito | Al Nodo dati corporativo, {A} si collega a un terminale, aggira l'ICE e scarica {valore}. Gli impianti scaldano, ma ne vale la pena. || Al Nodo dati, {A} prova a forzare l'ICE di un terminale. L'ICE risponde con una scarica di ritorno: naso che sanguina e impianti in fiamme.
1 at:5 con:A=attrezzo test:A=int12 ok:+mappa:A ko:pr:A+12 | Con {attrezzo:A}, {A} entra nella rete di servizio del Nodo dati e si stampa {mappa}. || Con {attrezzo:A}, {A} prova a entrare nella rete di servizio del Nodo dati, ma l'ICE l[A:o/a] respinge e la scarica arriva dritta agli impianti.
1 at:5 test:A=furt12 ok:+armatura:A ko:s:A=ferito | {A} passa strisciando sotto le torrette del Nodo dati e recupera {armatura} da un armadietto della sicurezza. || {A} prova a passare sotto le torrette del Nodo dati, ma una torretta l[A:o/a] vede e spara.
2 at:5 test:A=int12 ok:al:AB ko:pr:A+10 | Al Nodo dati, {A} mostra a {B} come entrare in un terminale senza farsi friggere. {B} decide che conviene restare con chi sa queste cose. || Al Nodo dati, {A} prova a mostrare a {B} come entrare in un terminale, ma è {A} a prendersi la scarica dell'ICE.
2 at:5 enemy:AB test:A=int13 ok:hit:A>B ok:pr:B+15 ko:pr:A+15 | Al Nodo dati, {A} manda un picco di corrente nella presa a cui è collegat[B:o/a] {B}. Lo schermo di {B} diventa bianco, e per un attimo anche le sue ottiche. || Al Nodo dati, {A} prova a mandare un picco nella presa di {B}, ma sbaglia cavo e il picco torna indietro.
1 at:6 test:A=furt12 ok:star:A ko:s:A=ferito | {A} attraversa la Piazza della torre sotto il naso delle volanti corporative e lo fa sembrare facile. Il video gira tra i fixer. || {A} prova ad attraversare di corsa la Piazza della torre, ma una volante l[A:o/a] inquadra e i colpi di avvertimento non sono solo di avvertimento.
1 at:6 pr:A+8 | In Piazza, il megaschermo della torre manda in loop le facce dei ricercati per il colpo. Tra queste c'è anche quella di {A}.
2 at:6 k:A>B @agg | Sotto il megaschermo della Piazza, {A} sfida {B} davanti a tutti. Dura poco.
1 stat:A>pr60 test:A=res12 ok:mo:A+8 ko:s:A=sconvolto | Per colpa del sovraccarico neurale, {A} vede insegne che non esistono. Si concentra sul respiro finché le visioni passano. || Per colpa del sovraccarico neurale, {A} vede insegne che non esistono. Prova a ignorarle, ma un'insegna [A:gli/le] parla con la voce di sua madre.
1 stat:A>pr70 trait:A=paranoico pr:A+6 | Con gli impianti al limite, {A} si convince che le telecamere trasmettano i suoi pensieri. Copre tutte le lenti del quartiere con il nastro adesivo, una per una.
1 stat:A>pr55 trait:A=sopravvissuto test:A=res11 ok:pr:A-12 ko:en:A-8 | {A} ha già visto impianti andare in sovraccarico: fa partire il diagnostico di emergenza e spegne i moduli che scaldano, uno alla volta. Funziona. || {A} prova a lanciare il diagnostico di emergenza, ma il sistema chiede una password che non ricorda. La giornata se ne va così.
1 trait:A=ingegnoso con:A=attrezzo test:A=int12 ok:+trap:A ko:pr:A+8 | {A} usa {attrezzo:A} per riprogrammare un congegno di sicurezza abbandonato e ne ricava {trap}. || {A} prova a riprogrammare un congegno di sicurezza con {attrezzo:A}, ma il congegno risponde con un impulso che fa friggere gli impianti.
1 trait:A=esibizionista star:A pr:A+5 | {A} fa una diretta dalla zona sigillata e racconta il colpo andato male come se fosse un film. I fixer prendono nota del nome.
1 trait:A=avido test:A=furt12 ok:+valore:A ko:s:A=ferito | {A} svuota una banca automatica mezza rotta e se ne va con {valore}. || {A} prova a forzare una banca automatica, ma il sistema di difesa risponde con una scarica che [A:gli/le] brucia le dita.
1 wx:buio test:A=furt11 ok:+cibo:A ok:+med:A ko:en:A-10 | Approfittando del buio, {A} entra in un supermercato automatico con le porte bloccate e riempie lo zaino: {cibo} e {med}. || Approfittando del buio, {A} prova a entrare in un supermercato automatico, ma le porte si richiudono e deve girare intorno all'isolato per ore.
1 wx:pericolo stat:A<hp50 @cow en:A+10 | Con il quartiere così pericoloso e le ferite che bruciano, {A} decide che oggi non si muove dal proprio nascondiglio. Riposa, e nessuno l[A:o/a] trova.
1 wx:abbondanza test:A=agi11 ok:+cibo:A ok:+cibo:A ko:en:A-8 | {A} arriva in tempo allo scarico delle razioni e ne afferra due prima della ressa. || {A} corre verso lo scarico delle razioni, ma arriva quando le casse sono già vuote.
1 trait:A=goloso stat:A<food40 test:A=furt11 ok:+cibo:A ko:mo:A-6 | {A} segue l'odore di una cucina di strada fino al retro di un ristorante e si porta via {cibo}. || {A} segue l'odore di una cucina di strada, ma il cuoco l[A:o/a] caccia via con un mestolo.
1 trait:A=solitario @stl en:A+8 | {A} passa la giornata sui tetti, da un'antenna all'altra, senza incontrare nessuno. Le gambe ringraziano.
1 trait:A=sfortunato pr:A+8 | Un'insegna olografica difettosa si accende in faccia a {A} con un lampo bianco. Le ottiche ci mettono un'ora a riprendersi, gli impianti molto di più.
1 trait:A=fortunato +valore:A @luck | {A} infila la mano in un tombino per recuperare una moneta e tira fuori {valore}.
1 trait:A=cacciatore test:A=sop12 ok:+cibo:A ko:en:A-8 | {A} segue le tracce dei corrieri del Mercato fino a un deposito di razioni dimenticato: {cibo}. || {A} segue le tracce dei corrieri, ma porta solo a un deposito già svuotato.
1 trait:A=codardo @cow mo:A-6 | Al primo drone che passa, {A} si chiude in un cassonetto e ci resta fino a sera.
2 couple:AB stat:B>pr60 test:A=emp11 ok:pr:B-18 ok:amo:B>A+6 ko:mo:A-6 | {A} resta accanto a {B} e [B:gli/le] guida il respiro mentre il diagnostico riavvia gli impianti uno alla volta. Il sovraccarico di {B} scende. || {A} prova ad aiutare {B} a riavviare gli impianti, ma {B} è troppo agitat[B:o/a] e l[A:o/a] manda via.
2 ally:AB trait:A=traditore test:A=furt12 ok:steal:A<B=valore ko:rel:AB-15 | {A} fa una copia della chiave di cifratura di {B} e si prende {valore:B}. || {A} prova a copiare la chiave di cifratura di {B}, ma {B} se ne accorge.
2 grudge:A>B test:A=furt12 ok:hit:A>B ko:mo:A-8 | {A} si avvicina a {B} nella folla e infila uno shard infetto nella sua presa. Gli impianti di {B} vanno in tilt e {B} crolla a terra. || {A} prova a infilare uno shard infetto nella presa di {B}, ma {B} si gira all'ultimo momento.
2 owe:A>B con:A=valore give:A>B=valore repay:A>B | {A} salda il debito con {B} come si fa a Night City: [B:gli/le] consegna {valore:A} senza dire una parola.
2 trait:A=guaritore need:B=ferito cure:B debt:B>A @heal | {A} improvvisa una sala operatoria sul tavolo di una cucina di strada, ricuce {B} e già che c'è [B:gli/le] ricalibra gli impianti. {B} resta in debito.
2 trait:A=carismatico test:A=car11 ok:al:AB ko:mo:A-5 | {A} propone a {B} un contratto in due: metà dei rischi, metà della paga. {B} stringe la mano. || {A} propone a {B} un contratto in due, ma {B} ha già sentito parlare di l[A:ui/ei].
2 fear:A>B test:A=cor12 ok:pau:A>B-15 ok:mo:A+8 ko:mo:A-8 | {A} ha paura di {B} da giorni. Oggi l[B:o/a] guarda negli occhi in mezzo alla strada e scopre che anche {B} trema. || {A} ha paura di {B} da giorni. Oggi prova a guardarl[B:o/a] negli occhi, ma abbassa lo sguardo per prim[A:o/a].
2 rival:AB test:A=int12 ok:ris:B>A+12 ok:mo:A+8 ko:mo:A-6 | {A} e {B} si sfidano a chi apre per prim[A:o/a] una serratura a codice. Vince {A}, e {B} se lo ricorda. || {A} e {B} si sfidano a chi apre per prim[A:o/a] una serratura a codice. {B} la apre mentre {A} sta ancora leggendo il codice.
2 ally:AB stat:B<mo30 trait:A=leader test:A=car12 ok:mo:B+15 ko:mo:B-5 | {A} vede {B} crollare e [B:gli/le] affida un compito preciso: tenere d'occhio i droni per un'ora. {B} si rimette in moto. || {A} prova a tirare su {B} con un discorso, ma {B} lo trova motivante come una pubblicità di impianti.
2 trust:A>B trait:A=generoso con:A=med give:A>B=med @give | {A} passa a {B} {med:A}, la cosa più preziosa che ha. Non chiede niente in cambio.
2 enemy:AB trait:A=pacifista test:A=car13 ok:rel:AB+15 ko:hit:B>A | {A} offre a {B} una lattina e propone di lasciar perdere: il nemico vero sono le corporazioni. {B} accetta. || {A} offre a {B} una lattina e una tregua. {B} prende la lattina e [A:gli/le] dà un pugno.
3 trait:A=leader test:A=car12 ok:al:ABC ko:mo:A-8 | {A} raduna {B} e {C} sotto una tettoia e propone un piano per uscire dal distretto. Accettano tutti. || {A} raduna {B} e {C} e propone un piano per uscire dal distretto. Nessuno ci crede.
3 k:AB>C @agg *0.6 | {A} e {B} vendono {C} a una squadra corporativa in cambio di un lasciapassare. La squadra porta via {C}; il lasciapassare non arriverà mai.
`,
      n: `
1 at:1 en:A+10 | Nel Megablocco, {A} dorme in una capsula-letto con la porta chiusa dall'interno. Fuori, i droni passano senza fermarsi.
1 stat:A>pr60 test:A=int12 ok:pr:A-15 ko:pr:A+5 | Di notte, {A} lancia il diagnostico degli impianti modulo per modulo e spegne quelli che scaldano. Al mattino il sovraccarico è più basso. || Di notte, {A} prova a lanciare il diagnostico, ma si addormenta a metà: un modulo resta acceso fino all'alba e il sovraccarico sale ancora.
1 trait:A=solitario en:A+10 mo:A-4 | {A} passa la notte da sol[A:o/a] su un tetto, a guardare le volanti che attraversano lo smog.
1 test:A=furt12 ok:+cibo:A ko:s:A=ferito | Di notte, {A} scavalca la grata di un distributore automatico e si serve: {cibo}. || Di notte, {A} prova a scavalcare la grata di un distributore, ma l'allarme spara una scarica e [A:gli/le] brucia la mano.
1 trait:A=romantico mo:A+10 | {A} ascolta per tutta la notte una vecchia canzone d'amore nelle cuffie. Le insegne fanno il resto.
1 trait:A=paranoico test:A=int11 ok:+trap:A ko:en:A-8 | {A} passa la notte a cablare la porta del proprio nascondiglio. Al mattino ha {trap}. || {A} passa la notte a cablare la porta del proprio nascondiglio, ma il circuito salta a ogni prova.
1 @mad pr:A+5 | {A} passa la notte a parlare con la pubblicità di un'insegna olografica. L'insegna, per fortuna, risponde solo con offerte.
1 trait:A=sonnambulo pr:A+6 | Nel dormiveglia, {A} si collega a una presa pubblica e sogna i ricordi di qualcun altro. Si sveglia con gli impianti caldi e il nome di uno sconosciuto in bocca.
1 stat:A<en30 en:A+15 | Sfinit[A:o/a], {A} si addormenta su un sedile della metropolitana ferma. Nessuno l[A:o/a] sveglia fino all'alba.
2 couple:AB mo:A+10 mo:B+10 | {A} e {B} si chiudono in una capsula-letto e guardano le insegne dalla finestrella, come due turisti in vacanza.
2 ally:AB trait:A=leale en:A-8 en:B+12 | {A} resta svegli[A:o/a] tutta la notte con il rilevatore in mano, perché {B} possa dormire.
2 k:A>B @stl | Durante un blackout, {A} trova {B} addormentat[B:o/a] e chiude il conto senza fare rumore.
2 enemy:AB test:A=furt12 ok:steal:A<B=arma ko:hit:B>A | Di notte, {A} striscia fino al nascondiglio di {B} e [B:gli/le] porta via {arma:B}. || Di notte, {A} striscia fino al nascondiglio di {B}, ma {B} dorme con un occhio aperto e colpisce per prim[B:o/a].
2 grudge:A>B forgive:A>B | Sotto la pioggia acida, {A} e {B} si ritrovano sotto la stessa tettoia. Due ore di silenzio, poi {A} decide che il rancore pesa troppo.
2 trait:A=furtivo test:A=furt12 ok:steal:A<B=valore ko:rel:AB-10 | Di notte, {A} si avvicina a {B} che dorme e [B:gli/le] sfila {valore:B} dalla giacca. || Di notte, {A} si avvicina a {B} che dorme, ma {B} si sveglia proprio mentre {A} allunga la mano.
2 ally:AB stat:B>pr55 test:A=int12 ok:pr:B-15 ko:en:A-8 | {A} passa la notte a collegare gli impianti di {B} a un dissipatore improvvisato con una ventola da computer. Al mattino il sovraccarico di {B} è più basso. || {A} prova a raffreddare gli impianti di {B} con una ventola da computer, ma la ventola si brucia prima dell'alba.
3 ally:ABC mo:A+6 mo:B+6 mo:C+6 | {A}, {B} e {C} dividono una scatola di noodle su un tetto e si raccontano cosa faranno con gli eddie, se usciranno vivi.
`,
      f: `
1 +arma:A | Alla consegna del fixer, {A} arriva per prim[A:o/a] e afferra {arma}.
1 +med:A +cibo:A | {A} riempie lo zaino alla consegna: {med} e {cibo}.
1 test:A=agi12 ok:+armatura:A ko:s:A=ferito | {A} si lancia sulla cassa più grande della consegna e ne esce con {armatura}. || {A} si lancia sulla cassa più grande della consegna, ma qualcuno [A:gli/le] chiude il coperchio sulle mani.
1 pr:A+8 star:A | {A} apre una cassa della consegna e dentro trova un drone con la telecamera accesa: il fixer vuole vedere le facce. {A} saluta. Il sovraccarico sale, la fama pure.
1 @luck +valore:A | In fondo a una cassa, {A} trova {valore} con un biglietto: «Per il prossimo lavoro».
1 @stl +attrezzo:A | Mentre gli altri si contendono le casse grandi, {A} apre quella piccola che nessuno guarda: dentro c'è {attrezzo}.
2 k:A>B @agg | Alla consegna, {A} e {B} afferrano la stessa cassa. Solo {A} se ne va.
2 al:AB @soc | Alla consegna, {A} e {B} si coprono a vicenda: uno prende le casse, l'altro tiene d'occhio i droni. Funziona così bene che decidono di continuare.
2 steal:A<B=arma @stl | Mentre {B} apre una cassa della consegna, {A} [B:gli/le] sfila {arma:B} dalla cintura.
3 k:A>BC *0.5 @agg | Alla consegna, {A} lascia che {B} e {C} si contendano la cassa giusta, poi chiude il conto con entrambi.
`,
      finale: `
2 k:A>B | Sotto la torre, tra le volanti che girano, {A} e {B} si affrontano con quello che resta. Resta in piedi {A}.
2 k:A>B stat:B>pr60 | Gli impianti di {B} sono al limite: {B} attacca per prim[B:o/a], ma il braccio cromato non risponde. {A} non sbaglia.
2 k:A>B w:A | {A} punta {arma:A} contro {B} sotto il megaschermo della Piazza. Il colpo parte prima che {B} possa parlare.
2 k:A>B | Le barriere della Piazza salgono e lasciano a {A} e {B} un quadrato di cemento. Ne esce solo {A}.
2 k:A>B con:A=attrezzo | {A} collega {attrezzo:A} a una torretta della Piazza e la gira contro {B}.
2 k:A>B trait:A=spietato | {A} non dice niente: aspetta che {B} esca dal riparo e chiude il conto.
2 k:A>B grudge:A>B | {A} ricorda a {B} ogni torto subito nella zona sigillata, poi chiude il conto.
2 k:A>B stat:A<hp40 | Ferit[A:o/a] e senza fiato, {A} gioca l'ultima carta contro {B}, e la gioca bene.
`,
      sponsor: `
1 +armatura:A @gift | Un drone del fixer lascia per {A} {armatura} e un messaggio: «Ti tengo d'occhio. Non deludermi».
1 +med:A @gift | Il fixer manda a {A} {med}, con un biglietto: «Il prossimo lavoro te lo pago in eddie».
1 +attrezzo:A @gift | Un corriere in moto lancia a {A} {attrezzo} senza fermarsi. Il fixer non spiega mai niente.
1 +arma:A @gift | Il fixer fa arrivare a {A} {arma}: «Hai fatto notizia. Adesso fai il resto».
1 +mappa:A @gift | Il fixer manda a {A} {mappa}: «Così almeno non ti perdi».
1 +cibo:A mo:A+8 @gift | Un drone del fixer lascia a {A} {cibo} e una lattina fredda. Per una volta, qualcuno si ricorda di l[A:ui/ei].
`,
      fallback: `
1 | {A} passa la giornata a cambiare vicolo ogni volta che passa un drone.
1 | {A} guarda per un'ora la stessa pubblicità di impianti in offerta. Non se li può permettere.
1 | {A} resta sotto una tettoia ad aspettare che smetta di piovere acido. Non smette.
1 | {A} conta i colpi rimasti e le ore di batteria. Il conto non è incoraggiante.
1 | {A} cammina tra la folla con il cappuccio alzato e non parla con nessuno.
1 | {A} prova a chiamare qualcuno fuori dal distretto. La linea è sigillata come le strade.
`,
      ds: `
1 | {A} si chiude in un vano tecnico e aspetta che passi.
1 @luck | {A} si trovava dall'altra parte del distretto.
1 s:A=ferito | {A} se la cava, ma con una ferita da ricucire.
1 pr:A+10 | {A} ne esce senza un graffio, ma gli impianti non smettono di scaldare.
2 ally:AB | {A} e {B} si coprono le spalle a vicenda finché il peggio non passa.
2 k:A>B | Nel caos, {A} spinge {B} nella direzione sbagliata. {B} non torna.
`,
    },
    dis: `
Il blackout del Megablocco | La corrente salta in tutto il Megablocco: ascensori fermi, porte bloccate, scale al buio. | {A} cade nella tromba di un ascensore senza porte. | {A} ruzzola giù per tre rampe di scale al buio. | {A} accende la torcia del multiattrezzo e scende un gradino alla volta.
L'incendio al Mercato di Kabuki | Una cucina di strada prende fuoco e le fiamme corrono da un tendone all'altro. | {A} resta intrappolat[A:o/a] tra i tendoni in fiamme. | {A} attraversa le fiamme con la giacca sopra la testa e ne esce ustionat[A:o/a]. | {A} si infila in un vicolo che il fuoco non raggiunge.
Il raid dei Maelstrom | I Maelstrom escono dall'Officina sulle moto e attraversano il distretto in cerca di cromo da strappare. | {A} viene raggiunt[A:o/a] dai Maelstrom e non se ne sa più niente. | {A} sfugge ai Maelstrom, ma una catena [A:gli/le] lascia il segno sulla schiena. | {A} si sdraia sotto un'auto finché i motori non si allontanano.
La braindance contaminata del Club | Al Club della braindance circola una registrazione contaminata: chi la prova non distingue più i ricordi veri. | {A} prova la registrazione e il cuore non regge. | {A} strappa il visore troppo tardi e resta stordit[A:o/a] per ore. | {A} si rifiuta di indossare il visore e se ne va. | sconvolto
L'allarme del Nodo dati corporativo | Al Nodo dati scatta l'allarme totale: le torrette si accendono e le porte stagne si chiudono. | {A} resta chius[A:o/a] tra due porte stagne con una torretta accesa. | {A} supera le torrette, ma non senza un colpo nella spalla. | {A} resta immobile nell'angolo cieco di una telecamera finché l'allarme non rientra.
Lo sciame di droni | Uno sciame di droni corporativi scende sul distretto e scansiona ogni volto. | {A} viene scansionat[A:o/a], riconosciut[A:o/a] e colpit[A:o/a] senza preavviso. | {A} scappa dai droni, ma un colpo [A:gli/le] prende di striscio la gamba. | {A} si copre il volto con la sciarpa e cammina piano, come tutti gli altri.
La ronda degli Scav | Una banda di Scav gira per il distretto in cerca di impianti da rivendere. | {A} finisce nelle mani degli Scav e non torna. | {A} sfugge agli Scav, ma con un taglio profondo sul braccio. | {A} si finge mort[A:o/a] in mezzo ai rifiuti e gli Scav passano oltre.
Il cyberpsicotico in libertà | Qualcuno è andato in cyberpsicosi e cammina per le strade con le lame da avambraccio aperte. | {A} incrocia il cyberpsicotico in un vicolo senza uscita. | {A} scappa dal cyberpsicotico con un taglio sulla schiena. | {A} si chiude in un negozio e abbassa la serranda.
Il crollo della passerella sopraelevata | Una passerella pedonale tra due palazzi cede sotto il peso della folla in fuga. | {A} precipita con la passerella. | {A} si aggrappa a un cavo e cade solo per l'ultimo piano. | {A} era già sull'altro lato quando la passerella ha ceduto.
La fuga di gas dalla Clinica del ripperdoc | Un serbatoio di anestetico si rompe e il gas riempie la Clinica. | {A} si addormenta nel gas e non si risveglia. | {A} esce dalla Clinica barcollando e batte la testa sullo stipite. | {A} trattiene il respiro e raggiunge l'uscita di servizio.
Il virus delle ottiche | Un virus attraversa la rete del quartiere e manda in tilt le ottiche di chi è collegato. | {A} attraversa la strada con le ottiche spente e viene investit[A:o/a] da una volante. | {A} perde la vista per ore e va a sbattere ovunque. | {A} aveva già scollegato le ottiche dalla rete. | sconvolto
Lo smog tossico | Una nube di smog tossico scende dai camini delle fabbriche fino all'altezza della strada. | {A} respira lo smog per troppe ore e non si rialza. | {A} tossisce per tutta la notte e si sveglia con la febbre. | {A} si chiude in una capsula-letto e sigilla le fessure con il nastro. | malato
Il blocco totale della Piazza della torre | La sicurezza corporativa chiude la Piazza della torre e spara a chiunque provi a uscire. | {A} prova a uscire dalla Piazza e i cecchini non sbagliano. | {A} esce dalla Piazza con un proiettile nella gamba. | {A} resta nascost[A:o/a] sotto la pensilina della metro finché il blocco non si allenta.
`,
  });
})(typeof window === 'object' ? window : globalThis);
