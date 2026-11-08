/* Isola Battle Royale — quarto pacchetto: il cerchio che si stringe, le casse, la chat in diretta,
 * le emote, gli streamer e i tributi che giocano per la vita e per le visualizzazioni. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'royale',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+armatura:A ko:s:A=ferito | {A} si lancia dall'aereo per prim[A:o/a], apre il paracadute all'ultimo e atterra direttamente su una cassa: {arma} e {armatura}. || {A} si lancia dall'aereo per prim[A:o/a], apre il paracadute tardi e atterra direttamente sul tetto di un fienile. Di faccia.
1 +mappa:A @int | {A} atterra lontano da tutti e prende {mappa} dal cruscotto di un furgone. Sa già dove si stringerà il cerchio.
1 @cow +cibo:A | {A} atterra in mezzo al nulla, con {cibo} e la chat che scrive «ma che fa?». Sopravvive al primo minuto: la chat si ricrede.
2 al:AB @soc | {A} e {B} atterrano sullo stesso tetto e si guardano. Nessuno dei due ha un'arma. Si stringono la mano: squadra.
2 hit:A>B steal:A<B=arma @agg | {A} e {B} aprono la stessa cassa nello stesso istante. {A} è più veloce, e {B} resta con un pugno di trucioli.
1 test:A=fort12 ok:+esplosivo:A ko:mo:A-10 | {A} apre la prima cassa che trova: dentro c'è {esplosivo}. La chat impazzisce. || {A} apre la prima cassa che trova: dentro ci sono solo bende e una skin color senape. La chat l[A:o/a] prende in giro per ore.
`,
      d: `
1 test:A=agi13 ok:mo:A+10 ko:hp:A-15 | Il cerchio si stringe e {A} corre attraverso mezza isola per rientrare nella zona sicura. Ce la fa con due secondi di margine. || Il cerchio si stringe e {A} corre attraverso mezza isola, ma la tempesta l[A:o/a] raggiunge prima del confine.
1 @luck +armatura:A mo:A+5 | Una cassa leggendaria atterra a cinque metri da {A}. Dentro c'è {armatura}. La chat scrive «FORTUNATO» in maiuscolo.
1 test:A=furt13 ok:+arma:A ko:s:A=ferito | {A} si infila nella Base militare dal condotto di ventilazione e svuota l'armeria senza farsi sentire: {arma}. || {A} si infila nella Base militare dal condotto di ventilazione. Il condotto cede proprio sopra un'altra squadra.
1 test:A=sop12 ok:+cibo:A ok:+cibo:A ko:food:A-10 | {A} trova la dispensa della Fattoria piena di barattoli di marmellata. || {A} trova la dispensa della Fattoria. Qualcuno l'ha svuotata e ha lasciato una emote disegnata col pennarello.
1 test:A=int13 ok:+med:A ko:hp:A-10 | {A} scopre l'infermeria dell'Aeroporto e prende tutto quello che serve: {med}. || {A} scopre l'infermeria dell'Aeroporto, ma il cane da guardia l'ha scoperta prima.
1 star:A @show mo:A+10 | {A} fa un balletto sul tetto della Centrale elettrica mentre sullo sfondo esplode una cassa. La clip fa dieci milioni di visualizzazioni.
1 star:A @show | {A} saluta la chat, legge i nomi dei sostenitori uno per uno e promette una vittoria. La chat ci crede.
1 @mad mo:A+10 en:A-10 | {A} passa mezz'ora a cercare di guidare un trattore della Fattoria. Ci riesce, in retromarcia, dentro un fienile.
1 en:A+20 | {A} si chiude in un bagno della stazione di servizio e dorme un'ora intera sedut[A:o/a] sul water. È il riposo più strategico della partita.
1 stat:A<mo30 mo:A+15 | {A} legge sullo schermo del telefono i messaggi della chat: «Ce la puoi fare», «Siamo con te», «Ti voglio come capo della mia gilda». Si rialza.
1 need:A=ferito test:A=emp12 ok:hp:A+20 ko:hp:A-5 | {A} si cura con il kit di primo soccorso di un'ambulanza abbandonata, seguendo un tutorial dimenticato. || {A} prova a curarsi con il kit di un'ambulanza, ma il kit era una scatola del pranzo.
1 test:A=agi12 ok:+valore:A ko:hp:A-10 | {A} si arrampica sulla torre di controllo dell'Aeroporto per una cassa bloccata in cima: {valore}. || {A} si arrampica sulla torre di controllo dell'Aeroporto. La cassa scivola, e anche {A}.
1 wx:pericolo s:A=ferito | Un elicottero da caccia pattuglia la Foresta e spara su tutto quello che si muove. {A} si muoveva.
1 wx:abbondanza +cibo:A +med:A | Giornata di rifornimenti abbondanti: {A} trova due casse intatte sulla spiaggia del Villaggio costiero.
1 trait:A=ingegnoso +trap:A | {A} collega un cavo del recinto elettrico della Fattoria al portone di un fienile. Chi entra, fa scintille.
1 trait:A=esibizionista star:A mo:A+10 | {A} indossa la skin più ridicola che trova e combatte con quella addosso. Gli sponsor raddoppiano le offerte.
1 trait:A=stratega mo:A+5 en:A+5 | {A} studia la traiettoria dell'aereo dei rifornimenti e calcola dove cadrà la prossima cassa. Si siede lì e aspetta.
1 trait:A=cacciatore +cibo:A | {A} pesca con la lenza di una barca del Villaggio costiero e prende due sgombri. La chat si annoia, lo stomaco no.
1 trait:A=paranoico en:A-10 +trap:A | {A} non si fida di nessuna porta e piazza un campanello improvvisato su ogni ingresso della casa dove si nasconde.
1 trait:A=goloso food:A+20 | {A} trova un distributore di snack ancora pieno e lo apre con un calcio ben piazzato. Mangia tutto, lentamente.
1 trait:A=solitario mo:A+10 | {A} gioca tutta la giornata da sol[A:o/a], lontano dalla chat e dagli altri. Non ha mai giocato meglio.
2 ally:AB test:A=int12 ok:+arma:A ok:+armatura:B ko:hp:A-10 | {A} e {B} si coordinano via radio per svuotare un hangar: uno copre, l'altro raccoglie. || {A} e {B} si coordinano via radio per svuotare un hangar, ma la radio è sul canale pubblico. Arrivano tutti.
2 friend:AB give:A>B=med rel:AB+10 | {A} lancia a {B} l'ultimo kit medico con un passaggio perfetto. La chat lo chiama «assist dell'anno».
2 save:A>B @heal | {B} è a terra in mezzo alla strada. {A} corre sotto il fuoco nemico e l[B:o/a] rianima dietro un'auto. Il pubblico in piedi.
2 debt:B>A give:A>B=cibo @heal | {A} trova {B} affamat[B:o/a] dietro una roccia e [B:gli/le] lascia una barretta. «Me la ridai in finale», dice.
2 crush:A>B rel:AB+15 | {A} dedica a {B} la sua prima eliminazione, con un cuore disegnato con le dita verso la telecamera.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} fanno la stessa emote nello stesso momento. La chat urla. Gli shipper hanno vinto.
2 hit:A>B @agg | {A} sorprende {B} a fare un'emote davanti al suo cadavere virtuale in una replica e decide di vendicarsi nella realtà.
2 enemy:AB test:A=furt13 ok:steal:A<B=armatura ko:hit:B>A | {A} si avvicina alla base di {B} per rubare il giubbotto lasciato a ricaricare. || {A} si avvicina alla base di {B}, ma {B} è in agguato con la visuale in prima persona.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} una squadra fino al cerchio finale. || {A} propone a {B} una squadra. {B} risponde con un'emote che significa «no» in tutte le lingue.
2 rival:AB @show rel:AB+5 | {A} e {B} fanno a gara di balli sulla collina, con le armi a terra, finché il cerchio non li costringe a correre.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} condivide con {B} la posizione del proprio nascondiglio. Nel royale, è come consegnare la propria vita.
2 fear:A>B en:A-15 | {A} vede {B} eliminare tre persone in dieci secondi e decide di cambiare isola. Purtroppo non si può.
2 ally:AB test:A=cor13 ok:+arma:A ok:rel:AB+10 ko:hp:A-15 ko:hp:B-10 | {A} e {B} abbattono insieme un drone armato e ne recuperano le munizioni. || {A} e {B} provano ad abbattere un drone armato. Il drone mira meglio.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano nella stessa casa e decidono di formare una squadra. Si danno anche un nome di gilda. Terribile.
3 hit:A>B hit:A>C @agg | {A} trova {B} e {C} che si dividono una cassa leggendaria e lancia una granata fumogena. Nel fumo, prende il meglio.
3 ally:AB rel:AB+10 | {A} e {B} si guardano mentre {C} racconta per la terza volta di aver vinto un torneo nel 2019.
2 k:A>B w:A @agg | {A} si apposta sulla torre della Centrale elettrica. {B} attraversa la strada sotto. Un colpo solo.
2 k:A>B grudge:A>B | {A} trova {B} nel cerchio finale e regola il conto, per {caro:A}. La chat scrive «karma».
1 d:A @mad | {A} prova a fare un salto acrobatico dal tetto dell'Aeroporto per la clip. La clip fa il giro del mondo, ma non per le ragioni sperate.
1 d:A wx:pericolo | Il cerchio si chiude troppo in fretta e {A} è dall'altra parte dell'isola.
`,
      n: `
1 test:A=sop12 ok:en:A+15 ko:hp:A-15 | Un cane da guardia addestrato fiuta il nascondiglio di {A}. {A} lo convince a restare con una barretta. Ora ha un cane. || Un cane da guardia addestrato fiuta il nascondiglio di {A} e non accetta barrette.
1 @stl en:A+15 | {A} passa la notte in un fienile, sepolt[A:o/a] nel fieno. Nessun drone l[A:o/a] vede.
1 con:A=amuleto mo:A+10 | {A} stringe {amuleto:A} e legge sottovoce i messaggi dei fan sul telefono, a luminosità minima.
1 @luck +med:A | Di notte un drone degli sponsor lascia {med} sul davanzale della casa dove dorme {A}, con una luce verde lampeggiante.
1 trait:A=sonnambulo en:A-10 | {A} cammina nel sonno fuori dalla zona sicura e si sveglia con la tempesta a cinque metri. Corre in pigiama.
1 trait:A=codardo en:A-15 | {A} passa la notte chius[A:o/a] nel bagagliaio di un'auto, con la mano sulla bocca per non respirare troppo forte.
1 trait:A=folle mo:A+10 | {A} passa la notte a commentare la propria partita ad alta voce, come un telecronista. È molto bravo.
1 mo:A-10 | Nel cielo un dirigibile proietta la classifica con i nomi dei caduti. {A} legge il proprio nome più in basso di quanto sperasse.
2 ally:AB en:A+10 en:B+10 | {A} e {B} fanno turni di guardia di due ore con il visore notturno. Nessuno si avvicina senza essere visto.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} guardano i fuochi d'artificio degli sponsor dalla spiaggia del Villaggio costiero. Per qualche minuto non c'è nessuna gara.
2 crush:A>B rel:AB+10 | {A} scrive il nome di {B} nella sabbia della spiaggia, poi lo cancella prima che il drone lo inquadri. Troppo tardi.
2 friend:AB give:A>B=armatura @heal | {B} è ferit[B:o/a] e scopert[B:o/a]. {A} [B:gli/le] passa il proprio giubbotto e resta senza fino all'alba.
2 enemy:AB test:A=furt13 ok:steal:A<B=arma ko:hit:B>A | {A} entra nella casa dove dorme {B} per rubar[B:gli/le] il fucile. || {A} entra nella casa dove dorme {B}. {B} non dorme.
2 save:A>B @heal | Un elicottero da caccia illumina il nascondiglio di {B}. {A} lo distrae accendendo un falò dall'altra parte della collina.
2 trust:A>B fid:A>B+10 | {A} spegne il visore notturno e dorme. Fa la guardia {B}. Nel royale, fidarsi è il gesto più raro.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia a {B} un kit di razioni: «Siamo pari», scrive sulla scatola.
3 al:ABC @soc | {A}, {B} e {C} accendono un fuoco nella Foresta e scoprono di guardare tutti lo stesso streamer. Al mattino sono una squadra.
2 k:A>B @stl | Nel buio della Foresta, {A} trova {B} che dorme con il visore spento. La classifica si aggiorna all'alba.
1 d:A | {A} si addormenta fuori dal cerchio. La tempesta della notte non fa sconti.
2 k:A>B trap:A | {A} piazza {trap:A} davanti all'unica porta della casa dove si nasconde {B}. All'alba la classifica scende di uno.
`,
      f: `
1 +med:A +armatura:A @luck | Alla cassa leggendaria {A} arriva per prim[A:o/a] e la svuota: {med} e {armatura}.
2 hit:A>B steal:A<B=arma @agg | Alla cassa leggendaria {A} e {B} si scontrano. Vince {A}, con un colpo di padella che entra negli highlights.
2 al:AB @soc | Alla cassa leggendaria {A} e {B} si coprono a vicenda e se ne vanno con il bottino diviso a metà. Da stasera sono squadra.
1 test:A=agi13 ok:+arma:A ok:+armatura:A ko:hp:A-15 | {A} scivola sotto il fuoco incrociato della cassa leggendaria e la apre per prim[A:o/a]. || {A} si lancia verso la cassa leggendaria, ma finisce nel mirino di tre squadre contemporaneamente.
2 k:A>B w:A @agg | Alla cassa leggendaria {A} non lascia a {B} il tempo di aprire il coperchio.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
