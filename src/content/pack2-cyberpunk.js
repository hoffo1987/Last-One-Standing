/* Night City — Zona Rossa, secondo pacchetto: la vita del distretto sigillato.
 * Personaggi di contorno originali e ricorrenti (mai al posto dei concorrenti):
 *   Nonna Kiku, fixer di ottantadue anni con un braccio cromato e un debole per i biscotti;
 *   Doc Ferraglia, ripperdoc della Clinica che canta l'opera mentre opera;
 *   DJ Saetta, voce di Radio Zona Rossa, l'unica stazione che trasmette ancora;
 *   Gino, distributore automatico del Mercato con un'intelligenza artificiale permalosa;
 *   Pixel, il gatto olografico del Mercato, che nessuno riesce ad accarezzare;
 *   le corporazioni Kagemura Dynamics, Orbis Pharma e Velltech, inventate.
 * Zone: 0 Mercato · 1 Megablocco · 2 Clinica · 3 Club · 4 Officina · 5 Nodo dati · 6 Piazza.
 * Regole come nel primo pacchetto: ogni fatto raccontato ha il suo effetto, gli attacchi
 * dei netrunner avvengono sul posto e il Sovraccarico cala solo con cure o diagnosi. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'cyberpunk',
    ev: {
      b: `
1 at:6 +arma:A @luck | Una guardia corporativa scivola sul cemento bagnato e perde {arma}. {A} la raccoglie prima che la guardia si rialzi.
1 at:6 test:A=agi13 ok:+valore:A ko:s:A=ferito | {A} si arrampica sulla volante corporativa ferma in mezzo alla Piazza e strappa dal cruscotto {valore}. || {A} si arrampica sulla volante corporativa ferma in mezzo alla Piazza, ma il sistema antifurto si accende e [A:gli/le] dà una scossa che l[A:o/a] butta giù.
1 at:6 mo:A+10 | Mentre tutti scappano, il megaschermo della torre trasmette per sbaglio la pubblicità di un detersivo. {A} ride così forte da dimenticare la paura.
1 at:6 pr:A+8 en:A+10 | {A} si inietta lo stimolante d'emergenza del proprio kit: le gambe volano, ma gli impianti cominciano subito a scaldare.
1 at:6 s:A=ferito | {A} prova a superare una barriera di sicurezza con un salto da film. La barriera non ha visto il film.
1 at:6 @stl en:A+6 | {A} si infila in un cassonetto della Piazza e ci resta finché il primo caos non passa. Odora di noodle, ma è vivo.
1 at:6 +cibo:A @food | Nella fuga {A} travolge un carretto di spiedini. Il venditore urla, {A} si scusa, e si porta via {cibo}.
1 at:6 test:A=int12 ok:+mappa:A ko:mo:A-6 | {A} fotografa con le ottiche la mappa del distretto sul pannello della metropolitana prima che si spenga: ora ha {mappa}. || {A} prova a fotografare la mappa della metropolitana, ma il pannello si spegne a metà e resta solo la scritta «Benvenuti».
2 at:6 test:A=car11 ok:al:AB ko:rel:AB-6 | Sotto il megaschermo, {A} e {B} si riconoscono: stessa linea della metropolitana, tutte le mattine, per anni. {A} propone di uscirne insieme e {B} accetta. || Sotto il megaschermo, {A} saluta {B} come un vecchio amico. {B} non l[A:o/a] ha mai visto prima e si allontana di un passo.
2 at:6 save:A>B @heal | {A} afferra {B} per il colletto un attimo prima che le barriere della Piazza l[B:o/a] schiaccino. Non dice niente, ma {B} se lo ricorderà.
2 at:6 hit:A>B | Nella calca, {A} pianta una gomitata a {B} per passare per prim[A:o/a] sotto la serranda.
2 at:6 k:A>B @agg w:A | {A} punta {arma:A} contro {B} nel caos dello sgombero e non aspetta di sapere da che parte stia.
3 at:6 test:A=car12 ok:al:ABC ko:mo:A-6 | {A} fa da regista nella calca della Piazza: «Tu a destra, tu a sinistra, io in mezzo». Per qualche miracolo {B} e {C} obbediscono, e nasce un gruppo. || {A} prova a dare ordini a {B} e {C} nella calca della Piazza. Nessuno dei due l[A:o/a] ascolta.
3 at:6 k:A>BC *0.4 @agg | {A} fa cadere un'insegna olografica sopra {B} e {C}, che cercavano riparo sotto il portico.
`,
      d: `
1 at:0 test:A=car12 ok:+cibo:A ok:mo:A+6 ko:mo:A-6 | Al Mercato, {A} vince una sfida di karaoke contro un venditore di ottiche usate. Il premio è {cibo} e un applauso di tre bancarelle. || Al Mercato, {A} sfida a karaoke un venditore di ottiche usate e perde contro un uomo che canta con il volume dell'impianto vocale al massimo.
1 at:0 test:A=int11 ok:+valore:A ko:mo:A-5 | Al Mercato, Gino il distributore parlante propone un indovinello. {A} risponde giusto e Gino, offeso, sputa {valore}. || Al Mercato, Gino il distributore parlante propone un indovinello. {A} sbaglia e Gino [A:gli/le] recita per dieci minuti tutte le risposte giuste.
1 at:0 mo:A+8 | Al Mercato, {A} prova ad accarezzare Pixel, il gatto olografico. La mano attraversa il gatto. Pixel fa le fusa lo stesso.
1 at:0 con:A=valore -valore:A +armatura:A | Al Mercato, {A} contratta con un sarto che cuce kevlar nelle giacche dei turisti: cede {valore:A} e si porta via {armatura}.
1 at:0 con:A=valore -valore:A +arma:A | Al Mercato, {A} scambia {valore:A} con {arma} presso un banco che espone le armi tra i peluche, per non dare nell'occhio.
1 at:0 test:A=sop11 ok:+cibo:A ok:+cibo:A ko:s:A=malato | Al Mercato, {A} riconosce al primo assaggio i noodle buoni da quelli fatti con l'acqua del condizionatore e compra solo i primi. || Al Mercato, {A} mangia i noodle del banco più economico. Erano economici per un motivo.
1 at:0 test:A=furt12 ok:+attrezzo:A ko:hp:A-8 | Al Mercato, {A} si infila sotto il tendone di un ricettatore mentre lui dorme e si porta via {attrezzo}. || Al Mercato, {A} si infila sotto il tendone di un ricettatore, ma il ricettatore dorme con un occhio cibernetico aperto e [A:gli/le] tira dietro una sedia.
1 at:0 star:A | Al Mercato, {A} si ferma davanti a una telecamera di un banco di souvenir e saluta. Due minuti dopo vendono già magliette con la sua faccia.
1 at:0 pr:A+6 mo:A+6 | Al Mercato, {A} prova un paio di ottiche usate «solo per vedere com'è». Vede in dodici colori nuovi, e gli impianti se ne lamentano per ore.
1 at:0 s:A=avvelenato | Al Mercato, {A} beve un frullato «al gusto di frutta vera». Di vero c'era solo il bicchiere.
1 at:0 test:A=emp12 ok:+med:A ko:mo:A-4 | Al Mercato, {A} aiuta una bambina a ritrovare la madre tra le bancarelle. La madre vende farmaci e ricambia con {med}. || Al Mercato, {A} aiuta una bambina a cercare la madre per un'ora. Si scopre che la bambina era un ologramma pubblicitario.
2 at:0 test:A=car12 ok:steal:A<B=cibo ko:rel:AB-8 | Al Mercato, {A} distrae {B} indicando Pixel il gatto olografico e intanto [B:gli/le] sfila {cibo:B}. || Al Mercato, {A} indica Pixel il gatto olografico per distrarre {B}, ma {B} odia i gatti e non si gira.
2 at:0 con:A=cibo give:A>B=cibo rel:AB+10 | Al Mercato, {A} offre a {B} {cibo:A} senza dire niente. In un posto dove tutto ha un prezzo, è quasi un gesto rivoluzionario.
2 at:0 enemy:AB test:A=furt12 ok:hit:A>B ko:hit:B>A | Al Mercato, {A} rovescia un pentolone di brodo bollente sulla strada di {B}. || Al Mercato, {A} prova a rovesciare un pentolone sulla strada di {B}, ma {B} lo vede arrivare e glielo rimanda indietro.
2 at:0 k:A>B @agg | Al Mercato, {A} spinge {B} contro un banco di batterie gonfie. Il banco esplode, {B} non si rialza.
2 at:0 trait:A=avido con:B=valore steal:A<B=valore @secret | Al Mercato, {A} si offre di custodire le cose di {B} mentre {B} prova un paio di stivali. Gli stivali restano, {valore:B} no.
1 at:1 en:A+12 mo:A+6 | Al Megablocco, una vicina invita {A} a cena senza fare domande. Il riso è scotto, la compagnia è perfetta.
1 at:1 test:A=agi12 ok:+valore:A ko:s:A=ferito | Al Megablocco, {A} passa da un balcone all'altro al trentesimo piano per entrare in un appartamento vuoto e trova {valore}. || Al Megablocco, {A} prova a passare da un balcone all'altro al trentesimo piano. Il secondo balcone era solo dipinto sul muro, e {A} cade su quello di sotto.
1 at:1 test:A=int12 ok:+attrezzo:A ko:pr:A+8 | Al Megablocco, {A} ripara l'ascensore di servizio con un cavo e tanta fede. Il portinaio ricambia con {attrezzo}. || Al Megablocco, {A} prova a riparare l'ascensore di servizio, ma prende una scarica che passa dritta negli impianti.
1 at:1 mo:A-8 | Al Megablocco, {A} trova sulla porta di un appartamento un biglietto: «Torno subito». La polvere sul biglietto dice che risale a tre anni fa.
1 at:1 @luck +ricordo:A | Al Megablocco, {A} trova in un corridoio {ricordo}. Lo tiene, perché qualcuno dovrebbe farlo.
1 at:1 test:A=res12 ok:mo:A+8 ko:en:A-10 | Al Megablocco, {A} sale a piedi sessanta piani per raggiungere il tetto e vedere com'è il distretto dall'alto. Bellissimo, e terribile. || Al Megablocco, {A} prova a salire a piedi sessanta piani. Al ventesimo si siede sulle scale e ci resta un'ora.
1 at:1 s:A=sconvolto | Al Megablocco, {A} apre la porta sbagliata e trova una famiglia di cinque persone che guarda una braindance tutti insieme, in silenzio, con i visori addosso. Nessuno si gira.
1 at:1 @cow en:A+8 | Al Megablocco, {A} si chiude in una lavanderia comune e passa la giornata a guardare le lavatrici girare. È la cosa più rilassante successa da giorni.
2 at:1 couple:AB mo:A+10 mo:B+10 amo:A>B+5 | Al Megablocco, {A} e {B} trovano un appartamento con la vista su tutto il distretto e fingono, per un'ora, che sia casa loro.
2 at:1 test:A=emp12 ok:forgive:A>B ok:mo:A+6 ko:rel:AB-6 grudge:A>B | Nel corridoio del Megablocco, {A} incrocia {B} davanti al distributore d'acqua. Parlano per la prima volta senza alzare la voce, e il rancore si scioglie. || Nel corridoio del Megablocco, {A} incrocia {B} davanti al distributore d'acqua. Bastano tre parole per ricominciare a litigare.
2 at:1 enemy:AB k:A>B @agg | Al Megablocco, {A} aspetta {B} sul pianerottolo e fa saltare le luci delle scale. Al buio, {B} non arriva al piano di sotto.
2 at:1 ally:AB en:A+8 en:B+8 | Al Megablocco, {A} e {B} si dividono una capsula-letto: uno dorme, l'altr[B:o/a] fa la guardia, poi si cambia.
1 at:2 stat:A>pr50 test:A=int13 ok:pr:A-30 ko:pr:A+8 ko:s:A=ferito | Alla Clinica, Doc Ferraglia lascia {A} da sol[A:o/a] con il diagnostico avanzato «solo per un minuto». {A} lo usa benissimo e il sovraccarico crolla. || Alla Clinica, {A} prova a usare il diagnostico avanzato di Doc Ferraglia e sbaglia leva: il lettino si ribalta e gli impianti mandano una scarica.
1 at:2 mo:A+10 | Alla Clinica, Doc Ferraglia opera un paziente cantando un'aria d'opera a squarciagola. {A} rimane ad ascoltare fino all'ultimo acuto.
1 at:2 stat:A<hp60 test:A=car12 ok:cure:A ko:mo:A-8 | Alla Clinica, {A} convince Doc Ferraglia a curarl[A:o/a] promettendogli di procurargli un disco d'opera originale. Ferite chiuse e impianti ricalibrati. || Alla Clinica, {A} prova a farsi curare a credito, ma Doc Ferraglia appende al muro il cartello «Niente eddie, niente punti».
1 at:2 +med:A @heal | Alla Clinica, {A} aiuta Doc Ferraglia a spostare un frigorifero pieno di reni sintetici. Il Doc ringrazia con {med}.
1 at:2 test:A=furt12 ok:+med:A ok:+med:A ko:s:A=ferito | Alla Clinica, {A} entra nel magazzino del Doc mentre lui canta sotto la doccia e riempie le tasche. || Alla Clinica, {A} entra nel magazzino del Doc, ma il Doc non stava cantando sotto la doccia: stava aspettando dietro la porta con un bisturi.
1 at:2 pr:A+10 mo:A+8 | Alla Clinica, {A} si fa installare gratis un impianto «in prova» per un sondaggio della Orbis Pharma. Ora sa sempre che ore sono, in tre fusi orari. Gli impianti, però, scaldano.
1 at:2 stat:A>pr40 trait:A=paranoico test:A=int12 ok:pr:A-18 ko:pr:A+6 | Alla Clinica, {A} si rifiuta di farsi toccare da chiunque: fa da sol[A:o/a] la diagnosi dei propri impianti, leggendo il manuale ad alta voce. Funziona. || Alla Clinica, {A} prova a fare da sol[A:o/a] la diagnosi degli impianti leggendo il manuale, ma il manuale è in una lingua che non conosce e il sovraccarico sale.
2 at:2 stat:B<hp60 trait:A=guaritore cure:B debt:B>A @heal | Alla Clinica, {A} prende in prestito gli attrezzi di Doc Ferraglia, ricuce {B} e ricalibra gli impianti. Il Doc guarda, annuisce e torna a cantare.
2 at:2 need:B=avvelenato test:A=int11 ok:cure:B ok:debt:B>A ko:hp:B-10 | Alla Clinica, {A} trova nel registro del Doc l'antidoto giusto per {B}. Dieci minuti dopo {B} sta meglio, e anche gli impianti. || Alla Clinica, {A} cerca l'antidoto giusto per {B}, ma confonde due fiale e {B} peggiora.
2 at:2 enemy:AB test:A=furt13 ok:poison:A>B ko:rel:AB-10 | Alla Clinica, {A} scambia di nascosto la flebo di {B} con una sacca di qualcos'altro. || Alla Clinica, {A} prova a manomettere la flebo di {B}, ma Doc Ferraglia l[A:o/a] scopre e l[A:o/a] caccia a colpi di stetoscopio.
1 at:3 s:A=ubriaco mo:A+12 | Al Club, {A} accetta un cocktail che si chiama «Riavvio di sistema». Il riavvio è immediato.
1 at:3 test:A=agi12 ok:star:A ok:mo:A+10 ko:mo:A-8 | Al Club, {A} vince una gara di ballo contro un androide da compagnia. Il pubblico impazzisce, l'androide chiede la rivincita. || Al Club, {A} sfida a ballo un androide da compagnia e perde. L'androide è gentile, ed è peggio.
1 at:3 pr:A+14 test:A=res12 ok:mo:A+10 ko:s:A=sconvolto | Al Club, {A} prova la braindance più venduta della settimana: un salto da un grattacielo. Gli impianti scaldano, ma {A} esce ridendo. || Al Club, {A} prova la braindance più venduta della settimana: un salto da un grattacielo. Gli impianti scaldano, e {A} per ore non riesce a guardare giù da un marciapiede.
1 at:3 test:A=car12 ok:+valore:A ko:mo:A-5 | Al Club, {A} convince il barista a pagarl[A:o/a] per fare il DJ per mezz'ora. Mette solo musica di un secolo fa e il locale si riempie: {valore}. || Al Club, {A} si propone come DJ, ma il barista ha già un DJ: è un frigorifero con le casse.
1 at:3 @stl en:A+10 | Al Club, {A} dorme quattro ore in una poltrona per la braindance, con il visore spento sugli occhi. Nessuno disturba chi sembra in sessione.
2 at:3 test:A=car12 ok:love:AB ko:mo:A-10 crush:A>B | Al Club, {A} chiede al DJ di dedicare una canzone a {B}. {B} arrossisce sotto le luci, poi attraversa la pista e l[A:o/a] bacia. || Al Club, {A} chiede al DJ di dedicare una canzone a {B}. Il DJ sbaglia nome e la dedica va a un buttafuori.
2 at:3 ally:AB s:A=ubriaco s:B=ubriaco mo:A+8 mo:B+8 | Al Club, {A} e {B} festeggiano di essere ancora vivi con troppi cocktail colorati. Domani sarà un problema.
2 at:3 enemy:AB test:A=car13 ok:hit:A>B ko:mo:A-8 | Al Club, {A} convince il buttafuori cromato che {B} ha rubato la giacca di qualcuno. Il buttafuori non chiede prove. || Al Club, {A} prova ad aizzare il buttafuori contro {B}, ma il buttafuori si è appena licenziato.
2 at:3 rival:AB test:A=agi12 ok:ris:B>A+10 ok:star:A ko:mo:A-6 | Al Club, {A} e {B} si sfidano a una partita di un vecchio videogioco a gettoni. Vince {A}, con un record che resterà sullo schermo per sempre. || Al Club, {A} e {B} si sfidano a un vecchio videogioco a gettoni. {B} vince senza nemmeno guardare lo schermo.
1 at:4 test:A=int12 ok:+arma:A ko:s:A=ferito | All'Officina, {A} assembla {arma} con un tubo di scarico, un motorino d'avviamento e una pazienza infinita. || All'Officina, {A} prova ad assemblare un'arma con un tubo di scarico. Il tubo di scarico, offeso, esplode.
1 at:4 test:A=cor13 ok:+armatura:A ok:star:A ko:s:A=ferito | All'Officina, {A} sfida a braccio di ferro un Maelstrom con un braccio idraulico. Perde, ma con tanto stile che il Maelstrom [A:gli/le] regala {armatura}. || All'Officina, {A} sfida a braccio di ferro un Maelstrom con un braccio idraulico. Il braccio idraulico non ha il senso dello stile.
1 at:4 pr:A+12 star:A | All'Officina, i Maelstrom installano a {A} un led rosso in fronte «per la squadra». Non si spegne più, e gli impianti scaldano.
1 at:4 test:A=furt12 ok:+esplosivo:A ko:s:A=ferito | All'Officina, {A} sottrae {esplosivo} dal banco degli artificieri mentre provano un razzo nel cortile. || All'Officina, {A} prova a sottrarre qualcosa dal banco degli artificieri proprio mentre il razzo del cortile torna indietro.
1 at:4 en:A-10 +attrezzo:A | All'Officina, {A} lavora un'ora gratis al banco dei Maelstrom per farsi accettare. Esce sporc[A:o/a] di grasso fino ai capelli, ma con {attrezzo}.
1 at:4 s:A=ferito | All'Officina, {A} accarezza il cane cibernetico dei Maelstrom. Il cane cibernetico ha un'altra opinione sulle carezze.
2 at:4 ally:AB con:A=attrezzo test:A=int12 ok:+armatura:B ko:en:A-8 | All'Officina, {A} usa {attrezzo:A} per montare su {B} una protezione ricavata dal parafango di una moto. {B} ora ha {armatura}. || All'Officina, {A} prova a montare una protezione su {B}, ma il parafango non vuole saperne di diventare un'armatura.
2 at:4 enemy:AB k:A>B @agg | All'Officina, {A} spinge {B} sotto il ponte sollevatore e preme il pulsante sbagliato. Di proposito.
2 at:4 test:A=car12 ok:al:AB ko:hit:B>A | All'Officina, {A} e {B} si ritrovano a riparare la stessa moto e scoprono di odiare gli stessi Maelstrom. Basta per un'alleanza. || All'Officina, {A} prova a farsi prestare una chiave inglese da {B}. {B} gliela presta, ma in faccia.
1 at:5 test:A=int13 ok:+mappa:A ok:+valore:A ko:pr:A+15 ko:s:A=ferito | Al Nodo dati, {A} si collega a un terminale della Kagemura Dynamics e scarica in un colpo solo {mappa} e i dati di un conto dimenticato. || Al Nodo dati, {A} si collega a un terminale della Kagemura Dynamics, ma l'ICE è nuovo di zecca e la scarica [A:gli/le] fa sanguinare il naso.
1 at:5 test:A=int12 ok:star:A ok:mo:A+8 ko:pr:A+10 | Al Nodo dati, {A} si collega al terminale delle comunicazioni e sostituisce lo screensaver di tutti gli uffici della Velltech con la foto di un gatto. || Al Nodo dati, {A} prova a cambiare lo screensaver della Velltech dal terminale, ma l'ICE [A:gli/le] rimanda indietro la foto del gatto direttamente negli impianti.
1 at:5 pr:A+10 s:A=sconvolto | Al Nodo dati, {A} legge per sbaglio sul terminale il piano della Orbis Pharma per il quartiere dopo la riapertura. Gli impianti scaldano, e la voglia di vivere qui cala.
1 at:5 test:A=furt13 ok:+attrezzo:A ko:s:A=ferito | Al Nodo dati, {A} si infila nel condotto di raffreddamento e ne esce dall'altra parte con {attrezzo} preso da un tecnico addormentato. || Al Nodo dati, {A} si infila nel condotto di raffreddamento. Il condotto si accende e [A:gli/le] ustiona le braccia.
1 at:5 test:A=int12 ok:+trap:A ko:pr:A+12 | Al Nodo dati, {A} si collega al pannello di una torretta di sicurezza, la scollega dal sistema e se la porta via: {trap}. || Al Nodo dati, {A} prova a scollegare una torretta dal pannello, ma la torretta si accorge di tutto e risponde con un impulso.
2 at:5 ally:AB test:A=int13 ok:+valore:A ok:+valore:B ko:pr:A+12 ko:pr:B+12 | Al Nodo dati, {A} si collega al terminale e {B} tiene d'occhio le torrette: in tre minuti svuotano un conto della Velltech e se lo dividono. || Al Nodo dati, {A} si collega al terminale mentre {B} sorveglia le torrette, ma l'ICE frigge gli impianti a entrambi.
2 at:5 enemy:AB test:A=int13 ok:k:A>B ko:hit:B>A | Al Nodo dati, {A} chiude la porta stagna proprio mentre {B} ci passa sotto e blocca il comando dal terminale. || Al Nodo dati, {A} prova a chiudere la porta stagna su {B} dal terminale, ma {B} l[A:o/a] raggiunge prima che la porta scenda.
1 at:6 mo:A+6 | In Piazza, il megaschermo della torre trasmette per un'ora la replica di un quiz di trent'anni fa. {A} indovina tutte le risposte, e nessuno lo saprà mai.
1 at:6 test:A=agi12 ok:+valore:A ko:s:A=ferito | In Piazza, {A} raccoglie le chiavette di eddie cadute da un drone pubblicitario abbattuto: {valore}. || In Piazza, {A} corre verso un drone pubblicitario abbattuto, ma un secondo drone pubblicitario non ha ancora finito di cadere.
1 at:6 test:A=car12 ok:star:A ok:mo:A+8 ko:mo:A-8 | In Piazza, {A} sale sul basamento della statua del fondatore della Kagemura Dynamics e tiene un comizio contro le corporazioni. Tre droni registrano tutto. || In Piazza, {A} sale sul basamento della statua del fondatore della Kagemura Dynamics per un comizio, ma il basamento parte con l'inno aziendale e copre la voce.
2 at:6 test:A=cor12 ok:save:A>B ko:s:A=ferito | In Piazza, {A} si mette tra {B} e una volante che atterra e [B:gli/le] fa scudo. || In Piazza, {A} prova a fare scudo a {B} contro una volante che atterra, ma lo spostamento d'aria travolge prima l[A:ui/ei].
2 at:6 grudge:A>B k:A>B @agg | In Piazza, sotto il megaschermo che li inquadra, {A} regola i conti con {B}. Le registrazioni fanno il giro del distretto.
1 test:A=int12 ok:pr:A-15 ko:pr:A+5 stat:A>pr50 | {A} trova in una cabina telefonica abbandonata un diagnostico pubblico «a moneta». Inserisce una moneta, segue le istruzioni, e il sovraccarico scende. || {A} trova un diagnostico pubblico «a moneta» in una cabina abbandonata. Inserisce la moneta: il diagnostico la mangia, resta muto, e il sovraccarico sale ancora.
1 stat:A>pr65 @mad pr:A+6 | Con il sovraccarico oltre la soglia, {A} comincia a sentire DJ Saetta di Radio Zona Rossa anche senza radio. Trasmette solo per l[A:ui/ei], dice.
1 stat:A>pr70 test:A=emp12 ok:mo:A+10 ko:s:A=sconvolto | Con gli impianti al limite, {A} scrive su un muro il proprio nome e quello di tutte le persone che [A:gli/le] vogliono bene, per ricordarsi chi è. Funziona. || Con gli impianti al limite, {A} prova a scrivere su un muro i nomi delle persone care, ma si accorge di non ricordarne uno.
1 stat:A>pr60 trait:A=folle mo:A+12 pr:A+5 | Con il sovraccarico alto, {A} decide che le interferenze nelle ottiche sono arte e le descrive ad alta voce a chiunque passi. Gli impianti protestano, il morale vola.
1 stat:A<hp40 trait:A=sopravvissuto test:A=res12 ok:hp:A+20 ko:hp:A-5 | {A} ricuce da sol[A:o/a] la ferita peggiore con un ago da tappezziere e il filo di una giacca. Non è bello, ma tiene. || {A} prova a ricucire da sol[A:o/a] la ferita peggiore, ma il filo della giacca si spezza a metà.
1 stat:A<food30 test:A=sop12 ok:+cibo:A ko:s:A=affamato | Affamat[A:o/a], {A} trova nel retro di un ristorante chiuso una cella frigorifera ancora in funzione: {cibo}. || Affamat[A:o/a], {A} trova la cella frigorifera di un ristorante chiuso. La corrente è saltata da una settimana.
1 stat:A<mo30 mo:A+15 | Nel momento peggiore, Radio Zona Rossa manda la canzone preferita di {A}. DJ Saetta la dedica «a chi è ancora in piedi là fuori».
1 stat:A<en25 en:A+15 @cow | Sfinit[A:o/a], {A} si sdraia sul sedile posteriore di un taxi automatico fermo. Il taxi parte per un giro panoramico del distretto e {A} dorme per tutto il viaggio.
1 trait:A=stratega con:A=mappa test:A=int11 ok:+trap:A ok:mo:A+5 ko:en:A-6 | {A} studia {mappa:A} e individua l'unico vicolo che tutti dovranno attraversare. Ci prepara {trap}. || {A} studia {mappa:A} per trovare il vicolo giusto, ma la mappa ha due anni e il vicolo è diventato un parcheggio.
1 trait:A=carismatico test:A=car12 ok:+med:A ok:+cibo:A ko:mo:A-5 | {A} convince un gruppo di turisti bloccati nel distretto che è una guida ufficiale. I turisti pagano in natura: {med} e {cibo}. || {A} si presenta a un gruppo di turisti come guida ufficiale. Una turista è davvero una guida ufficiale.
1 trait:A=leader mo:A+10 star:A | {A} organizza nel quartiere una distribuzione d'acqua per i vicini rimasti. I fixer lo raccontano in diretta, e il nome di {A} comincia a girare.
1 trait:A=generoso food:A-8 mo:A+10 | {A} divide il proprio pranzo con un ragazzino che vende biglietti della lotteria olografica. Non vince niente, ma il ragazzino racconta a tutti la storia.
1 trait:A=codardo test:A=furt11 ok:en:A+10 ko:mo:A-10 | {A} passa la giornata travestit[A:o/a] da manichino nella vetrina di un negozio di abbigliamento. Nessuno l[A:o/a] nota. || {A} passa la giornata travestit[A:o/a] da manichino in vetrina, ma un commesso prova a cambiarl[A:o/a] d'abito.
1 trait:A=esibizionista test:A=car12 ok:star:A ok:mo:A+8 ko:mo:A-8 | {A} si fa tingere i capelli di un verde che si vede anche dallo spazio e gira per il distretto salutando i droni. I fixer adorano. || {A} si fa tingere i capelli di verde fluorescente per farsi notare, ma la tinta è difettosa e diventa marrone in un'ora.
1 trait:A=superstizioso +amuleto:A mo:A+6 | {A} riceve in regalo da un predicatore di strada {amuleto} «benedetto da tre santi e da un ingegnere». Lo stringe forte.
1 trait:A=sfortunato s:A=ferito | {A} viene investit[A:o/a] da un monopattino a guida automatica che, secondo il display, stava «evitando un ostacolo».
1 trait:A=fortunato +valore:A @luck | Gino junior, il distributore fratello minore del famoso Gino del Mercato, sputa a {A} {valore} senza motivo. Dice che è un errore, e se ne vergogna.
1 trait:A=ingegnoso con:A=attrezzo test:A=int12 ok:+armatura:A ko:en:A-8 | {A} usa {attrezzo:A} per trasformare un vassoio da cucina e due cinture in {armatura}. || {A} prova a trasformare un vassoio da cucina in una protezione con {attrezzo:A}, ma il vassoio resta un vassoio.
1 trait:A=romantico mo:A+10 | {A} registra un messaggio d'amore per qualcuno fuori dal distretto e lo affida a un drone delle consegne. Il drone parte. Forse arriverà.
1 trait:A=goloso con:A=cibo cibo:A mo:A+8 | {A} si ferma a mangiare {cibo:A} su una panchina sotto un'insegna rosa. Per cinque minuti, nient'altro esiste.
1 trait:A=solitario test:A=sop12 ok:+cibo:A ok:en:A+8 ko:en:A-8 | {A} passa la giornata sui tetti, trova un orto abbandonato in vecchi secchi e baratta gli ultimi pomodori con un vicino in cambio di {cibo}. || {A} cerca un posto tranquillo sui tetti, ma trova solo antenne che ronzano e un vento che non dà tregua.
1 trait:A=bruto test:A=for13 ok:+valore:A ok:star:A ko:s:A=ferito | {A} sfonda a spallate la vetrina blindata di una gioielleria chiusa. La vetrina cede e {A} si porta via {valore}. || {A} prova a sfondare a spallate la vetrina blindata di una gioielleria. La vetrina era blindata davvero, la spalla di {A} no.
1 trait:A=cacciatore test:A=sop12 ok:+cibo:A ko:en:A-6 | {A} segue gli scarafaggi meccanici dello smaltimento rifiuti fino al loro deposito, dove le cucine di strada buttano le razioni del giorno prima: {cibo}. || {A} segue gli scarafaggi meccanici dello smaltimento rifiuti, ma i robot lo portano solo all'inceneritore.
1 trait:A=sonnambulo pr:A+5 | In un pisolino pomeridiano, {A} si collega nel sonno a una presa pubblicitaria e si sveglia canticchiando il jingle di una bevanda energetica. Gli impianti ne risentono.
1 trait:A=impulsivo test:A=fort12 ok:+valore:A ko:mo:A-8 | {A} punta tutto quello che ha su una corsa di droni clandestina. Vince il drone sul quale nessuno aveva puntato, cioè il suo. || {A} punta tutto su una corsa di droni clandestina. Il drone su cui ha puntato decolla al contrario.
1 trait:A=pacifista mo:A+10 | {A} passa la giornata ad aggiustare le insegne rotte di una strada, una lettera alla volta. Alla fine la strada si chiama di nuovo «via della Pace».
1 trait:A=clemente mo:A+8 | {A} trova sul marciapiede il portafoglio di qualcuno con dentro un biglietto «Se lo trovi, chiamami». Lo restituisce. Dall'altra parte del telefono, qualcuno piange.
1 trait:A=traditore mo:A+5 | {A} si allena a sorridere davanti alla vetrina di un negozio. Il riflesso sembra sincero. Il riflesso mente benissimo.
1 trait:A=leale mo:A+8 | {A} disegna con lo spray sul muro di un vicolo i nomi degli alleati, per ricordarsi per chi sta combattendo.
1 trait:A=ubriacone +alcol:A s:A=ubriaco | {A} trova una distilleria clandestina in un garage. Il proprietario offre un assaggio. Poi un altro. Poi regala {alcol}.
1 trait:A=furtivo test:A=furt12 ok:+attrezzo:A ko:mo:A-6 | {A} sfila {attrezzo} dalla cintura di un tecnico della rete mentre il tecnico è al telefono con la moglie. || {A} prova a sfilare un attrezzo dalla cintura di un tecnico della rete, ma il tecnico ha la cintura antifurto.
1 trait:A=guaritore +med:A mo:A+6 | {A} passa la mattina ad aiutare una clinica di strada senza ripperdoc. Gli infermieri, grati, ricambiano con {med}.
1 trait:A=avido test:A=car12 ok:+valore:A ko:hp:A-8 | {A} vende a un turista un «pezzo autentico della torre del colpo»: è un pezzo di marciapiede. Il turista paga con {valore}. || {A} prova a vendere un pezzo di marciapiede come reliquia del colpo a un turista, ma il turista è un poliziotto in vacanza, che [A:gli/le] torce il braccio.
1 trait:A=spietato star:A mo:A+5 | {A} affigge sui muri del quartiere la lista di chi è ancora in gara, con una croce già pronta accanto a ogni nome tranne il proprio.
2 couple:AB test:A=car11 ok:mo:A+12 ok:mo:B+12 ko:mo:A-5 | {A} porta {B} in un ristorante di sushi sintetico con un nastro trasportatore che va troppo veloce. Ridono tanto da dimenticare dove si trovano. || {A} porta {B} in un ristorante di sushi sintetico, ma il nastro trasportatore si inceppa e [B:gli/le] spara un piatto addosso.
2 couple:AB stat:A>pr60 stat:B>pr60 *2 | {A} e {B} hanno entrambi gli impianti al limite. Si tengono per mano e guardano lo stesso sfarfallio nelle ottiche, come due persone che guardano le stelle.
2 couple:AB test:A=fort11 ok:+ricordo:A ko:mo:A-4 | {A} e {B} si fanno fare una foto da una cabina automatica. La cabina stampa la foto con una cornice a cuori, poi la sputa: {ricordo}. || {A} e {B} entrano in una cabina per fototessere, ma la cabina stampa solo il codice a barre di uno sconosciuto.
2 ally:AB test:A=int12 ok:fid:B>A+10 ok:mo:B+8 ko:rel:AB-6 | {A} insegna a {B} come capire dalle insegne quali vicoli sono sorvegliati: i colori più freddi indicano le telecamere nuove. {B} non lo dimenticherà. || {A} spiega a {B} come leggere le insegne per evitare le telecamere, ma sbaglia esempio e li inquadrano entrambi.
2 ally:AB trait:A=traditore test:A=furt13 ok:steal:A<B=arma ok:mo:A+4 ko:rel:AB-15 | {A} si offre di pulire {arma:B} e non la restituisce più. «L'ho persa», dice. || {A} si offre di pulire {arma:B}, ma {B} non si fida e la tiene con sé.
2 ally:AB stat:B<hp50 con:A=med -med:A cure:B debt:B>A @heal | {A} usa {med:A} per rimettere in piedi {B} sotto la tettoia di una fermata dell'autobus, mentre l'annuncio automatico ripete che il servizio è sospeso.
2 friend:AB mo:A+8 mo:B+8 | {A} e {B} passano mezz'ora a inventare il nome della band che fonderanno quando usciranno dal distretto. Vince «I Biochip Spenti».
2 enemy:AB test:A=car12 ok:pau:B>A+15 ko:mo:A-6 | {A} fa recapitare a {B} da un drone delle consegne una corona di fiori di plastica con il suo nome. {B} capisce il messaggio. || {A} manda a {B} una corona di fiori di plastica con un drone delle consegne, ma il drone la consegna a un funerale vero.
2 enemy:AB test:A=furt12 ok:steal:A<B=valore ko:hit:B>A | {A} segue {B} tra la folla e [B:gli/le] sfila {valore:B} con due dita. || {A} segue {B} tra la folla per derubarl[B:o/a], ma {B} se ne accorge e [A:gli/le] pesta la mano.
2 enemy:AB k:A>B w:A @agg | {A} aspetta che {B} esca da un negozio automatico e usa {arma:A} prima che le porte si richiudano.
2 rival:AB test:A=car12 ok:star:A ok:ris:B>A+8 ko:star:B | {A} e {B} vengono intervistat[AB:i/e] da un drone di un notiziario pirata. {A} è brillante, {B} balbetta. || {A} e {B} vengono intervistat[AB:i/e] da un drone di un notiziario pirata. {B} è brillante, {A} guarda dritto nella telecamera sbagliata.
2 fear:A>B test:A=furt12 ok:en:A+6 ko:hit:B>A | {A} vede {B} in fondo alla strada e si nasconde dentro una cabina olografica che proietta un vestito da sposa. {B} passa oltre. || {A} vede {B} e prova a nascondersi in una cabina olografica, ma la cabina annuncia ad alta voce «Benvenut[A:o/a]!» e {B} l[A:o/a] raggiunge subito.
2 owe:A>B test:A=car11 ok:repay:A>B ok:rel:AB+8 ko:mo:A-5 | {A} paga il debito con {B} in un modo molto Night City: [B:gli/le] procura un tavolo al Club senza fare la fila. || {A} prova a pagare il debito con {B} procurandogli un tavolo al Club, ma il buttafuori non fa entrare nessuno dei due.
2 trust:A>B test:A=emp11 ok:promise:A>B=protezione ok:fid:B>A+8 ko:mo:A-4 | Sotto la pioggia acida, {A} promette a {B} di proteggerl[B:o/a] fino alla riapertura del distretto, e poi di portarl[B:o/a] a vedere il mare. Lo dice come se fosse una cosa normale. || Sotto la pioggia acida, {A} prova a promettere qualcosa a {B}, ma il tuono di un trasformatore che salta copre ogni parola.
2 single:A single:B crush:A>B test:A=car12 ok:love:AB ko:mo:A-8 | {A} aspetta che il blackout spenga tutte le insegne della strada e chiede a {B}: «Adesso che non ci vede nessuno?». {B} ride, poi risponde con un bacio. || {A} aspetta il blackout per dichiararsi a {B}, ma il blackout dura troppo poco e le insegne si riaccendono a metà frase.
3 ally:ABC test:A=int12 ok:+mappa:A ok:mo:B+6 ok:mo:C+6 ko:en:A-6 | {A}, {B} e {C} ricostruiscono la mappa del distretto mettendo insieme quello che ognuno ricorda. Il risultato è {mappa}, con molte frecce. || {A}, {B} e {C} provano a ricostruire la mappa del distretto, ma ognuno ricorda un distretto diverso.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano bloccat[ABC:i/e] nello stesso ascensore per un'ora. Quando le porte si riaprono, sono un'alleanza.
3 trait:A=leader ally:AB ally:AC mo:B+8 mo:C+8 star:A | {A} organizza per l'alleanza una cena in un ristorante abbandonato, con le tovaglie e tutto. {B} e {C} ridono come non facevano da giorni.
4 k:AB>CD *0.3 @agg | {A} e {B} attirano {C} e {D} in un parcheggio sotterraneo con una falsa consegna del fixer. La consegna non c'è, l'agguato sì.
`,
      n: `
1 at:0 +cibo:A @food | Di notte, al Mercato, {A} aiuta la signora dei noodle a chiudere il banco. Lei [A:gli/le] lascia gli avanzi: {cibo}.
1 at:0 mo:A+8 | Di notte, Pixel il gatto olografico del Mercato si addormenta accanto a {A}. Non scalda, ma tiene compagnia.
1 at:1 en:A+12 | Nel Megablocco, {A} trova una capsula-letto con le lenzuola pulite. È una cosa così rara che ci mette un'ora ad addormentarsi dall'emozione.
1 at:1 test:A=furt12 ok:+valore:A ko:mo:A-6 | Di notte, nel Megablocco, {A} entra in un appartamento evacuato e trova {valore} sotto un materasso. || Di notte, nel Megablocco, {A} entra in un appartamento evacuato. Non era evacuato.
1 at:2 stat:A>pr45 test:A=res12 ok:pr:A-18 ko:en:A-8 | Di notte, alla Clinica, {A} dorme collegat[A:o/a] al diagnostico mentre Doc Ferraglia russa sul divano. Al mattino il sovraccarico è sceso. || Di notte, alla Clinica, {A} prova a dormire collegat[A:o/a] al diagnostico, ma i bip non l[A:o/a] lasciano chiudere occhio.
1 at:3 s:A=ubriaco mo:A+10 | Di notte, al Club, {A} si lascia convincere a provare tutti i cocktail del menu in ordine alfabetico. Arriva alla «M».
1 at:4 test:A=furt13 ok:+arma:A ko:s:A=ferito | Di notte, all'Officina, {A} scavalca il cancello dei Maelstrom mentre festeggiano e torna con {arma}. || Di notte, all'Officina, {A} scavalca il cancello dei Maelstrom. La festa era una trappola per i ladri, e funziona.
1 at:5 test:A=int13 ok:+valore:A ko:pr:A+12 | Di notte, al Nodo dati, {A} si collega al terminale durante il backup notturno, quando l'ICE dorme, e scarica {valore}. || Di notte, al Nodo dati, {A} si collega al terminale durante il backup. L'ICE non dorme mai.
1 at:6 pr:A+6 mo:A+6 | Di notte, in Piazza, il megaschermo della torre trasmette lo spettacolo di fuochi d'artificio olografici previsto per una festa aziendale annullata. {A} guarda tutto. Le ottiche bruciano un po'.
1 mo:A+10 | Di notte, DJ Saetta di Radio Zona Rossa legge in diretta i messaggi degli ascoltatori. Uno dice soltanto: «Resisti». {A} decide che era per l[A:ui/ei].
1 stat:A>pr60 pr:A+6 | Di notte {A} sogna in codice binario. Si sveglia con il sovraccarico più alto e la sensazione di aver capito qualcosa di importante.
1 stat:A>pr55 test:A=int12 ok:pr:A-14 ko:mo:A-6 | Di notte {A} spegne gli impianti uno alla volta, come le luci di una casa, e lascia acceso solo il cuore. Il sovraccarico scende. || Di notte {A} prova a spegnere gli impianti uno alla volta, ma uno si rifiuta e manda in loop una pubblicità di materassi.
1 trait:A=paranoico pr:A+5 | Di notte {A} copre con il nastro adesivo tutte le spie luminose dei propri impianti. Gli impianti, offesi, scaldano lo stesso.
1 trait:A=goloso con:A=cibo cibo:A | Di notte {A} mangia {cibo:A} sotto le coperte, per non condividerlo con nessuno. Nemmeno con sé stess[A:o/a] di domani.
1 trait:A=romantico mo:A+12 | Di notte {A} trova un'insegna rotta che lampeggia la parola «AMORE» da un ristorante che si chiamava «AMORETTI». Decide che è un segno.
1 trait:A=stratega mo:A+6 | Di notte {A} disegna sul vetro appannato di una finestra il piano per domani, con le frecce. All'alba il piano è sparito, ma {A} lo ricorda tutto.
1 trait:A=furtivo test:A=furt12 ok:+cibo:A ok:+med:A ko:en:A-8 | Di notte {A} passa da un tetto all'altro e svuota la cassetta delle consegne di un palazzo intero. || Di notte {A} prova a passare da un tetto all'altro, ma un drone delle consegne l[A:o/a] scambia per un pacco e l[A:o/a] segue.
1 trait:A=bruto en:A-6 mo:A+6 | Di notte {A} fa flessioni sul tetto finché la gang del palazzo di fronte non comincia ad applaudire.
1 trait:A=sopravvissuto en:A+12 | Di notte {A} dorme dentro una lavatrice industriale spenta. È il posto più sicuro del distretto: nessuno lava niente da giorni.
1 trait:A=ubriacone con:A=alcol alcol:A | Di notte {A} brinda da sol[A:o/a] alla salute del distretto con {alcol:A}. Il distretto non risponde.
1 trait:A=solitario en:A+10 mo:A-3 | Di notte {A} sale sull'insegna più alta del quartiere e si siede dentro la lettera «O». Nessuno l[A:o/a] trova.
1 @stl en:A+8 | Di notte {A} si addormenta in un armadio a muro di un hotel a capsule. Il check-out è alle dieci, ma nessuno controlla.
1 s:A=sconvolto | Di notte, una pubblicità olografica di un'agenzia funebre si accende davanti alla finestra di {A} e recita il suo nome per sbaglio. {A} non dorme più.
2 couple:AB mo:A+12 mo:B+12 | Di notte {A} e {B} ballano in un vicolo sulla musica che esce dal Club tre isolati più in là. Le pozzanghere riflettono le insegne. Sembrano un videoclip.
2 couple:AB stat:B>pr55 test:A=emp12 ok:pr:B-15 ko:en:A-6 | Di notte {A} canta a bassa voce a {B} una ninna nanna mentre il diagnostico riavvia gli impianti di {B}. Il sovraccarico scende. || Di notte {A} prova a cantare una ninna nanna a {B} durante la diagnosi, ma stona e il diagnostico si interrompe.
2 ally:AB mo:A+8 mo:B+8 | Di notte {A} e {B} giocano a carte con un mazzo olografico che bara. Perdono entrambi, ridono entrambi.
2 ally:AB trait:A=leale en:A-6 fid:B>A+8 | Di notte {A} rimane svegli[A:o/a] a guardare le volanti dalla finestra, così {B} può dormire con la luce spenta.
2 ally:AB trait:A=traditore test:A=furt12 ok:steal:A<B=med ko:rel:AB-12 | Di notte {A} fruga nello zaino di {B} con la torcia delle ottiche al minimo e si prende {med:B}. || Di notte {A} fruga nello zaino di {B}, ma la torcia delle ottiche si accende al massimo.
2 enemy:AB test:A=furt13 ok:k:A>B ko:hit:B>A | Di notte {A} raggiunge il nascondiglio di {B} passando dal condotto dell'aria. || Di notte {A} prova a raggiungere {B} dal condotto dell'aria, ma il condotto rimbomba come un tamburo.
2 grudge:A>B pau:B>A+10 | Di notte {A} lascia davanti al nascondiglio di {B} una piccola insegna olografica con scritto: «Ti vedo». {B} non dorme più.
2 crush:A>B test:A=car11 ok:amo:B>A+10 ko:mo:A-6 | Di notte {A} lascia a {B} una lattina di bevanda calda con un cuore disegnato col pennarello. {B} sorride al buio. || Di notte {A} lascia a {B} una lattina con un cuore disegnato. La lattina viene rubata da un drone delle pulizie.
2 trait:A=generoso give:A>B=cibo con:A=cibo rel:AB+10 | Di notte {A} lascia {cibo:A} davanti alla capsula di {B}, con un biglietto: «Mangia, che domani serve».
3 ally:ABC mo:A+8 mo:B+8 mo:C+8 | Di notte {A}, {B} e {C} ascoltano Radio Zona Rossa con una radiolina e votano le canzoni con le dita. DJ Saetta, per una volta, sembra parlare proprio a loro.
`,
      f: `
1 test:A=agi12 ok:+arma:A ok:+armatura:A ko:s:A=ferito | Alla consegna di Nonna Kiku, {A} si infila sotto la rete di sicurezza ed esce con {arma} e {armatura}. || Alla consegna di Nonna Kiku, {A} si infila sotto la rete di sicurezza, ma Nonna Kiku [A:gli/le] dà una bastonata sulle dita «per insegnare l'educazione».
1 +cibo:A mo:A+8 | Alla consegna, Nonna Kiku distribuisce biscotti fatti in casa insieme alle armi. {A} prende {cibo} e due biscotti. I biscotti sono buonissimi.
1 test:A=car12 ok:+med:A ok:+med:A ko:mo:A-6 | Alla consegna, {A} fa i complimenti a Nonna Kiku per il braccio cromato. Nonna Kiku arrossisce e [A:gli/le] regala due kit invece di uno. || Alla consegna, {A} fa i complimenti al braccio cromato di Nonna Kiku. Nonna Kiku dice che è il braccio di suo marito, e lo dice in un modo che mette i brividi.
1 pr:A+8 +attrezzo:A | Alla consegna, {A} trova nella cassa {attrezzo} con un aggiornamento automatico già avviato. Gli impianti lo scaricano senza chiedere: scaldano per un'ora.
1 +esplosivo:A @luck | Alla consegna, {A} apre una cassa con l'etichetta «Giocattoli». Dentro c'è {esplosivo}. Nonna Kiku fa finta di niente.
1 star:A mo:A+6 | Alla consegna, Nonna Kiku stringe la mano a {A} davanti ai droni e dice: «Questo mi piace». La diretta impazzisce.
2 al:AB @soc | Alla consegna, {A} e {B} si mettono in fila insieme per i biscotti di Nonna Kiku e, tra un biscotto e l'altro, decidono di allearsi.
2 test:A=for12 ok:steal:A<B=arma ko:hit:B>A | Alla consegna, {A} e {B} si contendono la stessa cassa a strattoni. Vince {A} e si porta via {arma:B}. || Alla consegna, {A} e {B} si contendono la stessa cassa a strattoni. {B} non molla, e il coperchio finisce in faccia a {A}.
2 k:A>B @agg w:A | Alla consegna, {A} aspetta che {B} apra la cassa e la riempie di piombo prima che possa prendere qualcosa.
2 save:A>B @heal | Alla consegna, {A} tira {B} via da una cassa con l'etichetta «Fragile» proprio prima che esploda. Era fragile davvero.
3 k:A>B k:A>C *0.3 @agg | Alla consegna, {A} trasforma la cassa delle granate di Nonna Kiku in un argomento definitivo per {B} e {C}.
`,
      finale: `
2 k:A>B | In Piazza, sotto il megaschermo che trasmette in diretta lo scontro, {A} e {B} si affrontano. Quando le telecamere tornano a fuoco, in piedi c'è {A}.
2 k:A>B stat:A>pr60 | Gli impianti di {A} sono al limite e vedono tutto al rallentatore. Per una volta, è un vantaggio: {A} anticipa ogni mossa di {B}.
2 k:A>B con:A=esplosivo esplosivo:A | {A} lancia {esplosivo:A} contro il riparo di {B} sotto il portico della Piazza. Il portico non esiste più, e nemmeno {B}.
2 k:A>B trait:A=esibizionista | {A} saluta i droni, si sistema i capelli e solo dopo affronta {B}. Ha tempo per entrambe le cose.
2 k:A>B trait:A=stratega | {A} conduce {B} esattamente dove voleva: sotto le barriere della Piazza, che salgono al momento giusto.
2 k:A>B trait:A=codardo | {A} scappa per tutta la Piazza finché {B} non inciampa nelle barriere. Allora torna indietro.
2 k:A>B stat:B<en25 | {B} non ha più energie: si appoggia a una colonna della torre per riprendere fiato. {A} non gliene lascia il tempo.
2 k:A>B trait:A=ingegnoso con:A=attrezzo | {A} collega {attrezzo:A} al pannello delle barriere della Piazza. Le barriere salgono tutte insieme, e {B} è nel posto sbagliato.
2 k:A>B trait:A=furtivo | {A} sparisce nel vapore delle grate della Piazza. Quando riappare, è alle spalle di {B}.
2 k:A>B trait:A=pacifista | {A} chiede a {B} di fermarsi. {B} non si ferma. {A} fa quello che deve, e non se lo perdonerà.
`,
      sponsor: `
1 +arma:A @gift | Nonna Kiku manda a {A} {arma} in una scatola di biscotti. Sul coperchio c'è scritto: «Mangia anche, mi raccomando».
1 +med:A +cibo:A @gift | Un drone di Nonna Kiku consegna a {A} {med} e {cibo}, con una nota scritta a mano: «Sei troppo magr[A:o/a]».
1 +trap:A @gift | Un fixer anonimo manda a {A} {trap} con un biglietto: «Usala con creatività».
1 +valore:A @gift | La Kagemura Dynamics, che ha comprato i diritti della diretta, manda a {A} {valore} «come incentivo alla partecipazione».
1 +amuleto:A mo:A+8 @gift | Un fan anonimo fa recapitare a {A} {amuleto} con un biglietto pieno di cuori.
1 +attrezzo:A @gift | DJ Saetta annuncia in diretta che Radio Zona Rossa manda a {A} {attrezzo}. Un drone lo lancia dal tetto con tre secondi di ritardo sull'annuncio.
1 +alcol:A mo:A+6 @gift | Un drone del Club lascia a {A} {alcol} con un biglietto: «Offre la casa».
1 +esplosivo:A @gift | Un fixer dal senso dell'umorismo discutibile manda a {A} {esplosivo} in una confezione regalo con il fiocco.
1 +armatura:A @gift | La Orbis Pharma manda a {A} {armatura} con la richiesta di indossarla con il logo ben visibile. Il logo è enorme.
`,
      fallback: `
1 | {A} passa la giornata ad ascoltare DJ Saetta che legge le previsioni del meteo: «Pioggia acida con possibilità di altra pioggia acida».
1 | {A} litiga per dieci minuti con un'insegna pubblicitaria che continua a chiamarl[A:o/a] per nome.
1 | {A} prova a dormire, ma il megaschermo del palazzo di fronte trasmette la pubblicità di un materasso. Ironico.
1 | {A} conta le volanti che attraversano il cielo. Arriva a quarantadue e perde il conto.
1 | {A} guarda la pioggia scivolare sulle insegne e pensa che, da lontano, Night City è quasi bella.
1 | {A} passa davanti a Gino, il distributore parlante. Gino dice «Ciao». {A} non risponde. Gino se la lega al dito.
1 | {A} legge su un muro la scritta «Qui c'era un albergo». Sotto, a mano: «C'è ancora, ma non ti conviene».
1 | {A} fa la fila a un distributore di caffè per un'ora. Il distributore dà solo acqua calda. {A} la beve lo stesso.
1 | {A} osserva un robot delle pulizie che pulisce lo stesso metro di marciapiede da tre ore. Prova una strana solidarietà.
1 | {A} guarda una pubblicità di impianti per la felicità «con il 30% di sconto». Si chiede quanto costi la felicità intera.
1 | {A} si ferma ad ascoltare un artista di strada che suona il violino con quattro braccia. È meraviglioso.
1 | {A} prova a ricordare l'ultima volta che ha visto il sole senza filtri. Non ci riesce.
`,
      ds: `
1 | {A} si nasconde sotto un distributore automatico, che commenta ad alta voce la situazione.
1 @luck | {A} era in fila al Club, e il buttafuori non faceva uscire nessuno.
1 en:A-10 | {A} corre tre isolati per mettersi al sicuro. Ci arriva senza fiato.
1 pr:A+12 | {A} si salva, ma le ottiche registrano ogni dettaglio e gli impianti lo fanno rivivere a ripetizione.
2 save:A>B | Nel caos, {A} afferra {B} per un braccio e l[B:o/a] tira dentro una porta di servizio.
2 hit:A>B | Nel caos, {A} spinge via {B} per passare per prim[A:o/a].
`,
    },
    dis: `
L'aggiornamento obbligatorio | La Kagemura Dynamics lancia un aggiornamento obbligatorio per tutti gli impianti del distretto, alle tre di pomeriggio, senza preavviso. | {A} viene spent[A:o/a] dall'aggiornamento a metà di una scala e non si riaccende più. | {A} si riavvia in mezzo alla strada e cade battendo la testa. | {A} aveva disattivato gli aggiornamenti automatici anni fa.
Il blocco della metropolitana sopraelevata | Il treno della metropolitana si ferma tra due stazioni e le porte si aprono da sole sul vuoto. | {A} cade dalla carrozza aperta. | {A} si aggrappa alla porta e resta appes[A:o/a] per un'ora prima di risalire. | {A} si siede e aspetta i soccorsi, che arrivano davvero.
La pioggia di pubblicità | Cento droni pubblicitari perdono il controllo e precipitano sulle strade del distretto. | {A} viene colpit[A:o/a] da un drone che pubblicizza un'assicurazione sulla vita. | {A} viene colpit[A:o/a] di striscio da un drone che canta un jingle. | {A} si ripara sotto un'insegna robusta.
Il giorno del recupero crediti | Gli esattori della Orbis Pharma girano per il distretto a recuperare gli impianti non pagati. | {A} non ha mai pagato le rate, e gli esattori non accettano scuse. | {A} paga con una ferita e un pezzo di orgoglio. | {A} mostra le ricevute, tutte in regola.
La guerra delle gang al Mercato di Kabuki | Due gang si contendono il Mercato di Kabuki a colpi di arma da fuoco. | {A} resta nel fuoco incrociato tra le bancarelle. | {A} si prende una pallottola di rimbalzo. | {A} si nasconde nel banco dei noodle con la signora che li cucina.
L'inondazione del Megablocco | Le tubature del Megablocco cedono tutte insieme e l'acqua scende dai piani alti come una cascata. | {A} viene trascinat[A:o/a] giù per le scale dall'acqua. | {A} viene sbattut[A:o/a] contro un pianerottolo. | {A} si arrampica su un armadio e aspetta che l'acqua passi.
Il blackout totale della Clinica del ripperdoc | Il generatore della Clinica del ripperdoc si spegne durante tre operazioni insieme. | {A} è sul lettino quando le macchine si spengono. | {A} si sveglia dall'anestesia con un impianto montato a metà. | {A} tiene in mano la torcia per Doc Ferraglia finché la corrente torna.
La rissa al Club della braindance | Al Club della braindance una rissa per un posto al bancone diventa una battaglia. | {A} viene colpit[A:o/a] da una bottiglia cromata e non si rialza. | {A} esce dalla rissa con un occhio nero e un dente in meno. | {A} si nasconde dietro il DJ, che continua a suonare.
La gara clandestina all'Officina dei Maelstrom | I Maelstrom organizzano una gara di moto tra le strade chiuse, e nessuno avverte i pedoni. | {A} viene investit[A:o/a] dal vincitore. | {A} viene sfiorat[A:o/a] da una moto e cade sull'asfalto. | {A} guarda la gara dal balcone con una bibita.
Il furto di dati al Nodo dati corporativo | Al Nodo dati corporativo qualcuno ruba un archivio intero, e la sicurezza spara a chiunque abbia un cavo in mano. | {A} ha un cavo in mano. | {A} getta il cavo appena in tempo, ma non abbastanza da evitare un colpo. | {A} non ha mai toccato un cavo in vita sua, e lo dice.
L'ondata di cyberpsicosi | Un lotto difettoso di impianti a basso costo manda in tilt metà del quartiere: la gente parla con i muri e i muri rispondono. | {A} perde il controllo degli impianti e corre dritt[A:o/a] in mezzo al traffico delle volanti. | {A} passa la giornata a litigare con il proprio braccio cromato. | {A} non ha mai comprato impianti a basso costo. | sconvolto
La festa aziendale in Piazza della torre | La Velltech organizza in Piazza della torre una festa per i dipendenti, con open bar e una sicurezza nervosissima. | {A} si avvicina troppo al palco dei dirigenti. | {A} esagera con l'open bar e viene spint[A:o/a] fuori dal cordone, ubriac[A:o/a] fradic[A:io/ia]. | {A} si gode l'open bar con moderazione e senza farsi notare. | ubriaco
Il gelo dei condizionatori | I condizionatori del distretto impazziscono e soffiano aria gelida per tutta la notte. | {A} si addormenta all'aperto e non si sveglia. | {A} passa la notte a tremare e si sveglia con la febbre. | {A} si avvolge in tre giacche e un tappeto. | malato
Lo sciopero dei robot delle pulizie | I robot delle pulizie incrociano le braccia: in un giorno la spazzatura sommerge le strade. | {A} finisce sepolt[A:o/a] sotto una frana di sacchi della spazzatura. | {A} si taglia su un rifiuto metallico e la ferita si infetta. | {A} si costruisce un passaggio sopra i cassonetti. | malato
L'ispezione della MaxTac | La MaxTac setaccia il distretto a caccia di chiunque abbia troppo cromo addosso. | {A} ha troppo cromo addosso. | {A} viene fermat[A:o/a] e interrogat[A:o/a] con metodi pesanti. | {A} sembra così normale che la MaxTac non l[A:o/a] guarda nemmeno.
`,
  });
  // 18+: solo con il filtro per adulti attivo, come nelle altre arene
  D.packs.push({
    theme: 'cyberpunk', adult: true,
    ev: {
      d: `
2 love:AB at:3 | Al Club, {A} e {B} affittano una cabina privata per la braindance. Non accendono il visore.
1 s:A=ubriaco at:3 | Al Club, {A} beve un cocktail che si accende quando lo tocchi. Poi si accende anche {A}, e balla sul bancone.
2 k:A>B @agg at:4 | All'Officina, {A} usa la pressa idraulica su {B}. I Maelstrom applaudono, e uno prende appunti.
1 @mad s:A=sconvolto | {A} prova una braindance illegale registrata da qualcuno che stava morendo. Ne esce con lo sguardo di chi ha visto qualcosa che non doveva vedere.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a], {A} trascina {B} dentro una cabina per fototessere. La cabina stampa sedici foto che nessuno vedrà mai.
`,
      n: `
2 couple:AB at:1 | Nel Megablocco, {A} e {B} passano la notte in una capsula-letto progettata per una persona. Ci stanno benissimo.
2 k:A>B @stl | Di notte {A} raggiunge {B} che dorme e usa un filo monomolecolare. Un gesto solo, silenzioso.
`,
    },
    dis: `
La notte delle braindance proibite | Al Club della braindance circolano registrazioni vietate in tutta la città. | {A} prova la registrazione sbagliata e il cuore non regge. | {A} ne esce con i ricordi di uno sconosciuto mescolati ai propri. | {A} preferisce un cocktail. | sconvolto
`,
  });
})(typeof window === 'object' ? window : globalThis);
