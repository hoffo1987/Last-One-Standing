/* Catalogo degli oggetti che nascono dai lessici delle arene (gli eventi scritti a mano: «trova {arma}»).
 * Formato come _oggetti-1.js. «_» vale in tutte le arene. Promemoria degli effetti di tipo, sempre attivi:
 * le armi danno forza negli scontri, gli esplosivi +2 di potenza, i veleni si applicano alle armi,
 * gli amuleti salvano una volta da un colpo mortale (e poi si consumano), l'alcol rialza il morale. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.itemLexCatalog = D.itemLexCatalog || {};
  D.itemLexCatalog._ = `
ricordo|una foto di famiglia|Tutti in posa davanti a casa, qualcuno con gli occhi chiusi. La foto più bella del mondo.|morale:7
ricordo|una lettera mai spedita|Una lettera scritta per qualcuno e mai consegnata. Bisogna sopravvivere per farlo.|morale:6 prova:res+1
ricordo|il braccialetto di una sorella|Fili colorati annodati da una sorella piccola. Al polso pesa più di un'armatura.|morale:6 prova:cor+1
ricordo|un disegno fatto da un bambino|Un sole enorme e una figura con le braccia lunghe. Sei tu.|morale:7
ricordo|un medaglione con una ciocca di capelli|Dentro, una ciocca di capelli di qualcuno che aspetta.|morale:6 indicatore:5
ricordo|una cartolina di casa|Casa, vista dalla collina. Ricorda dove si deve tornare.|morale:5 prova:cor+1
ricordo|una lettera|Una lettera scritta di nascosto e consegnata a mano. Si rilegge ogni sera.|morale:6
alcol|una fiaschetta di whisky|Whisky da tasca: scalda, consola, e fa dire cose di cui ci si pente.|morale:6 posti:0
cibo|delle provviste|Un po' di tutto, impacchettato in fretta: niente di speciale, ma riempie.|cibo:0
`;
  D.itemLexCatalog.classico = `
arma|un coltello|Il primo oggetto che tutti afferrano alla Cornucopia. Utile per tutto, decisivo per poco.|forza:-0.5 posti:1 raccolta:6
arma|un arco|Colpisce prima che l'altro si avvicini. Serve occhio, e un po' di silenzio.|forza:1 prova:agi+1 belve:2
arma|una lancia|Lunga e semplice: tiene a distanza persone e animali.|forza:0.5 belve:3 posti:3
arma|un'ascia|Taglia legna e ossa con la stessa facilità.|forza:1 posti:3 indicatore:5
arma|un machete|Apre sentieri nel Bosco e chiude discussioni.|forza:0.5 raccolta:6
arma|un tridente|Tre punte da pescatore: al Fiume si mangia, altrove si combatte.|forza:0.5 raccolta:10 posti:3
arma|una fionda|Sassi ovunque, munizioni infinite. Fa male più di quanto sembri.|forza:-0.5 posti:0 prova:agi+1 raccolta:4
arma|una spada corta|Equilibrata e rapida: l'arma di chi sa usarla.|forza:1 prova:agi+1
arma|un pugnale|Corto, nascosto, letale alle spalle.|forza:0 posti:1 prova:furt+2
arma|una mazza|Legno duro e nodoso. Non serve talento, solo convinzione.|forza:0.5 prova:for+1
cibo|delle bacche|Dolci e sicure, se sono quelle giuste.|cibo:-10 posti:0
cibo|un coniglio|Un coniglio intero: con un fuoco è un banchetto.|cibo:20 morale:4
cibo|del pesce essiccato|Salato e asciutto, resiste giorni.|cibo:10
cibo|delle gallette|Secche ma eterne.|cibo:0
cibo|delle radici commestibili|Amare e fibrose: si mangiano solo quando si deve.|cibo:-5
cibo|una pagnotta|Pane vero, fragrante. Un regalo del distretto.|cibo:15 morale:5
amuleto|un ciondolo portafortuna|Un portafortuna di casa: una volta, chissà, devierà il colpo giusto.|morale:3 prova:fort+1
amuleto|una spilla d'oro a forma di uccello|Un uccello d'oro sul petto: il pubblico la riconosce e tifa per chi la porta.|prova:car+1 prova:cor+1
alcol|una fiaschetta di liquore bianco|Distillato di patate: brucia la gola e il freddo.|morale:5 indicatore:10 posti:0
alcol|una bottiglia di sidro|Sidro di mele: allegro e traditore.|morale:6
veleno|una manciata di bacche mortali|Uguali a quelle buone. Quasi.|posti:0
veleno|una fiala di veleno di serpente|Una goccia sulla lama basta.|posti:0
mappa|una mappa dell'arena disegnata su pelle|Disegnata da uno sponsor generoso: zone, ripari e sorgenti.|prova:sop+2 raccolta:6
esplosivo|una mina disinnescata|Disinnescata, dicono. Si porta con molta delicatezza.|posti:2
esplosivo|un sacchetto di polvere da sparo|Polvere nera: con una scintilla fa più danno di qualunque spada.|posti:1
armatura|un giubbotto di cuoio|Cuoio spesso: ferma le lame corte.|assorbe:3
armatura|uno scudo di legno|Assi inchiodate e una cinghia: para, si scheggia, para ancora.|assorbe:8 usi:1 posti:3
armatura|dei parastinchi di corteccia|Proteggono le gambe da rovi, trappole e calci.|assorbe:-10 posti:1 prova:agi+1
attrezzo|una corda di canapa|Si arrampica, si lega, si costruisce un riparo.|prova:agi+1 prova:sop+1 posti:2
attrezzo|un binocolo da caccia|Vede arrivare tutti prima di essere visti.|prova:int+1 prova:furt+1 belve:1
valore|una manciata di monete d'oro|Oro vero: gli altri tributi farebbero qualunque cosa per averle.|scambio:3 posti:0
valore|un orologio da taschino|Un orologio che funziona ancora: conta le ore che mancano.|scambio:2 posti:0
`;
  D.itemLexCatalog.fantasy = `
arma|una spada runica|Le rune si accendono quando la lama colpisce.|forza:1.5 indicatore:5
arma|un bastone magico|Canalizza la magia di chi ci crede abbastanza.|forza:0.5 prova:int+1 indicatore:10
arma|un arco elfico|Leggerissimo e preciso, anche al buio.|forza:1 prova:agi+1 belve:2
arma|un'ascia nanica|Doppia lama, manico corto, nessuna pietà.|forza:1.5 posti:3
arma|un pugnale avvelenato|Una lama verde, con un veleno che non si lava via.|forza:0.5 posti:1 prova:furt+1
arma|un martello da guerra|Spacca scudi, porte ed elmi.|forza:1.5 posti:3 prova:agi-1
arma|una balestra|Carica lenta, colpo devastante.|forza:1 usi:-1 posti:3
arma|una lancia incantata|Torna nella mano di chi la lancia. Quasi sempre.|forza:1 belve:3 posti:3
cibo|del pane elfico|Un morso sfama per un giorno intero.|cibo:20 energia:5 posti:0
cibo|una fiaschetta di idromele|Dolce, alcolico, nutriente. Un pasto da bere.|cibo:-10 morale:8 posti:0
cibo|dei funghi luminosi|Brillano al buio e saziano. Hanno un retrogusto di sogno.|cibo:-5 belve:1 posti:0
cibo|delle mele dorate|Dicono che allunghino la vita. Di sicuro la addolciscono.|cibo:5 morale:6
cibo|una forma di formaggio|Pesante e deliziosa: dura per giorni.|cibo:20 posti:2
amuleto|un amuleto runico|Le rune assorbono una maledizione al posto tuo. Una volta sola.|indicatore:15
amuleto|un dente di drago incantato|Il dente di un drago vero: chi lo porta non trema.|prova:cor+2
alcol|una caraffa di idromele|L'idromele dei bardi: dopo due sorsi tutti cantano.|morale:6
alcol|una fiasca di vino elfico|Vino leggero come l'aria. Fa dimenticare la paura.|morale:7 indicatore:5 posti:0
veleno|una fiala di sangue di viverna|Velenoso al tatto, mortale sulla lama.|posti:0
veleno|una boccetta di veleno di basilisco|Paralizza prima di uccidere.|posti:0
mappa|una mappa che si ridisegna da sola|Le linee si spostano mentre la guardi: segue i sentieri veri del reame.|prova:sop+2 prova:int+1
esplosivo|una pergamena di palla di fuoco|Si legge ad alta voce e si lancia lontano. Molto lontano.|posti:1
esplosivo|una pozione esplosiva|Una pozione arancione che ribolle. Non va agitata.|posti:1
armatura|una cotta di maglia elfica|Leggera come un vestito, dura come l'acciaio.|assorbe:10 posti:2
armatura|uno scudo runico|Le rune respingono colpi e maledizioni minori.|assorbe:10 indicatore:10 posti:3
armatura|un mantello di scaglie di drago|Il fuoco non lo brucia e le lame scivolano via.|assorbe:12 posti:3
attrezzo|una lanterna fatata|Una luce che non si spegne mai: tiene lontane le creature della notte.|belve:3 indicatore:10
attrezzo|una corda incantata|Si annoda da sola dove serve.|prova:agi+2 posti:1
attrezzo|una bussola che indica i desideri|Non indica il nord: indica quello che vuoi davvero. A volte è il cibo.|raccolta:10 prova:fort+1
valore|un sacchetto di monete d'argento|Argento del reame: compra pane, armi e silenzi.|scambio:2
valore|una gemma che canta|Canta piano quando qualcuno mente. I mercanti la venerano.|scambio:3 posti:0
`;
  D.itemLexCatalog.scifi = `
arma|un fucile al plasma|Spara proiettili di plasma: buca tutto, tranne lo scafo esterno, si spera.|forza:1.5 usi:-1 posti:3
arma|una lama vibrante|Vibra a frequenze che tagliano il metallo.|forza:1 prova:agi+1
arma|una pistola laser|Precisa, silenziosa, a batteria.|forza:1 posti:1 prova:agi+1
arma|una granata EMP|Spegne droni, porte e impianti. Le persone le stordisce.|forza:0.5 usi:-1 posti:1 belve:3
arma|una frusta monofilamento|Un filo invisibile che taglia come un rasoio.|forza:1 prova:agi+1 posti:1
arma|un taser a impulsi|Paralizza senza uccidere. Di solito.|forza:0 posti:1 belve:2
arma|un cannone a rotaia portatile|Accelera proiettili a velocità assurde. Pesa come una persona.|forza:2 usi:-1 posti:4 prova:agi-1
cibo|delle razioni liofilizzate|Si sciolgono in bocca e sanno di niente.|cibo:5 posti:0
cibo|un tubetto di gel proteico|Gel alla vaniglia artificiale: energia in tre secondi.|cibo:-10 energia:15 posti:0
cibo|delle alghe idroponiche|Verdi, croccanti, coltivate sul ponte serra.|cibo:-5 morale:3
cibo|una capsula nutritiva|Una capsula sola, un giorno intero di nutrienti.|cibo:10 posti:0
amuleto|uno scudo energetico personale|Un campo che devia un colpo mortale, poi si scarica.|prova:cor+1
amuleto|un chip di rianimazione|Riavvia il cuore una volta. Una sola.|prova:res+1
alcol|una fiaschetta di liquore sintetico|Sintetizzato in laboratorio, sa di batteria e consolazione.|morale:5 posti:0
alcol|una bottiglia di distillato di alghe|Verde, opaco, potentissimo.|morale:6
veleno|una nanotossina|Nanomacchine che spengono i nervi uno per uno.|posti:0
veleno|una siringa di neurotossina|Una puntura e i muscoli smettono di obbedire.|posti:0
mappa|la planimetria della stazione|La planimetria ufficiale, con i condotti di servizio.|prova:int+2 prova:sop+1
esplosivo|una carica al plasma|Apre paratie, e buchi molto grossi.|posti:2
esplosivo|una granata a frammentazione|Schegge ovunque, in un raggio troppo largo.|posti:1
armatura|una tuta corazzata|Tuta da lavoro esterno, corazzata: protegge da tutto e pesa come tutto.|assorbe:12 indicatore:20 posti:4 prova:agi-1
armatura|uno scudo energetico portatile|Un campo di forza a braccio: respinge colpi e schegge.|assorbe:14 usi:-1 posti:2
attrezzo|un multiattrezzo|Venti utensili in uno: ripara, apre, smonta.|prova:int+1 prova:sop+1
attrezzo|una torcia al plasma|Taglia metallo e illumina corridoi bui.|belve:2 prova:int+1
attrezzo|un tablet di diagnostica|Legge i sistemi della stazione: aria, energia, porte.|indicatore:15 prova:int+1
valore|una chiavetta di crediti|Crediti di bordo: comprano tutto nei distributori ancora attivi.|scambio:3 posti:0
valore|un chip di accesso dorato|Apre le aree riservate agli ufficiali.|scambio:2 prova:furt+1 posti:0
`;
  D.itemLexCatalog.zombie = `
arma|una mazza chiodata|Una mazza da baseball con dei chiodi. Classica.|forza:1 belve:2
arma|un fucile a pompa|Rumoroso: abbatte qualunque cosa e richiama l'orda.|forza:1.5 usi:-1 posti:3 prova:furt-1
arma|una motosega|Rumore assordante e benzina che finisce. Ma finché va...|forza:2 usi:-2 posti:3 prova:furt-2 belve:3
arma|una katana|Presa in un negozio di antiquariato. Taglia davvero.|forza:1 prova:agi+1
arma|una balestra|Silenziosa: perfetta per non richiamare gli infetti.|forza:1 usi:-1 posti:3 prova:furt+1
arma|una pistola|Pochi colpi, da contare uno per uno.|forza:1 usi:-1 posti:1
arma|un'accetta|Leggera e affidabile.|forza:0.5 raccolta:4
cibo|delle scatolette di fagioli|Proteine in scatola. Servono un apriscatole o molta pazienza.|cibo:15 posti:2
cibo|una barretta energetica|Cioccolato e cereali: si mangia correndo.|cibo:-10 energia:15 posti:0
cibo|dell'acqua in bottiglia|Acqua pulita: la cosa più preziosa della città.|cibo:-15 energia:10 indicatore:5
cibo|un sacchetto di patatine|Salate, scadute da poco, buonissime.|cibo:-10 morale:6 posti:0
cibo|una confezione di crackers|Croccanti e leggeri.|cibo:0 posti:0
amuleto|un siero sperimentale|Un siero dei laboratori: blocca il contagio una volta, forse.|indicatore:20
amuleto|un giubbotto antiproiettile ammaccato|Ha già fermato un colpo. Può fermarne un altro.|prova:cor+1
alcol|una bottiglia di whisky|Whisky buono, preso in un bar abbandonato.|morale:6
alcol|una bottiglia di vodka da supermercato|Disinfetta, scalda, dimentica.|morale:5 guarisce:malato
veleno|una scatola di topicida|Per i topi. E per chi ruba le scorte.|posti:0
veleno|una siringa di sangue infetto|L'arma più crudele della città.|posti:0 indicatore:-5
mappa|una mappa della città con le zone sicure|Le zone sicure cerchiate in rosso. Alcune cancellate a penna.|prova:sop+2 belve:2
esplosivo|una cintura di candelotti|Candelotti di un cantiere: aprono un varco nell'orda.|posti:2
esplosivo|una bombola di gas|Basta una scintilla.|posti:3
armatura|un giubbotto antiproiettile|Ferma proiettili e morsi.|assorbe:12 indicatore:15 posti:3
armatura|delle protezioni da hockey|Spalle, ginocchia e gomiti imbottiti: i morsi scivolano.|assorbe:6 indicatore:10
armatura|un casco da motociclista|Protegge la testa e il collo, dove mordono di più.|assorbe:4 indicatore:15 posti:2
attrezzo|una torcia a manovella|Luce senza batterie: si gira e si vede.|belve:2 prova:sop+1
attrezzo|un piede di porco|Apre tutto: porte, casse, auto.|raccolta:10 prova:for+1 posti:2
attrezzo|un walkie-talkie|Si sentono gli altri sopravvissuti, e le pattuglie.|prova:int+1 prova:sop+1
valore|una stecca di sigarette|La moneta della fine del mondo.|scambio:3
valore|una scatola di batterie|Torce, radio, sveglie: tutto torna a funzionare.|scambio:2 posti:0
`;
  D.itemLexCatalog.royale = `
arma|un fucile d'assalto|Raffica rapida e precisa: l'arma di chi vuole vincere.|forza:1.5 usi:-1 posti:3
arma|una pistola|L'arma di partenza. Meglio di niente, peggio di quasi tutto.|forza:0.5 posti:1
arma|un fucile da cecchino|Da lontano non sbaglia: chi la porta sceglie quando iniziare.|forza:1.5 usi:-1 posti:3 prova:furt+1
arma|un fucile a pompa|Devastante a distanza ravvicinata.|forza:1.5 usi:-1 posti:3
arma|una granata|Un lancio, un'esplosione, un cerchio più piccolo.|forza:1 usi:-2 posti:1
arma|una mitraglietta|Leggera, rapida, inaccurata.|forza:1 posti:2 prova:agi+1
arma|un coltello da combattimento|Silenzioso e sempre pronto.|forza:0 posti:1 prova:furt+1 prova:agi+1
arma|una balestra|Silenziosa: nessuno sa da dove arriva il colpo.|forza:1 usi:-1 posti:3 prova:furt+1
cibo|una lattina di energy drink|Zucchero e caffeina: si corre più veloci del cerchio.|cibo:-20 energia:20 posti:0
cibo|delle barrette proteiche|Sponsorizzate, nutrienti, insipide.|cibo:-5 energia:10 posti:0
cibo|un kit di razioni militari|Un pasto completo con riscaldatore chimico.|cibo:20 morale:4 posti:2
amuleto|un giubbotto antiproiettile di livello 3|Il livello massimo: ferma un colpo che avrebbe chiuso la partita.|prova:cor+1
amuleto|un kit di rianimazione|Rimette in piedi dopo un colpo mortale. Una volta.|prova:res+1
alcol|una birra calda|Calda, sgasata, consolante.|morale:4
alcol|una lattina di superalcolico|Un'idea pessima in una lattina.|morale:6 posti:0
veleno|una granata al gas|Gas lacrimogeno potenziato: si applica a frecce e lame.|posti:1
veleno|un dardo tossico|Un dardo che paralizza.|posti:0
mappa|una mappa con la prossima zona sicura|Sa dove si stringerà il cerchio prima degli altri.|prova:sop+2 prova:int+1 indicatore:0
esplosivo|un pacco di C4|Basta un detonatore e un buon motivo.|posti:2
esplosivo|una granata al plasma|Brucia tutto in un raggio di dieci metri.|posti:1
armatura|un giubbotto tattico di livello 2|Protezione seria per chi vuole arrivare in finale.|assorbe:10
armatura|un elmetto da paracadutista|Protegge la testa all'atterraggio e dopo.|assorbe:4 posti:2
armatura|uno zaino corazzato|Uno zaino rinforzato: protegge la schiena e porta di più.|assorbe:2 posti:0
attrezzo|un drone esploratore|Vola sopra la zona e mostra chi si nasconde dove.|prova:int+1 prova:furt+1 belve:1 posti:2
attrezzo|un binocolo|Vede gli altri prima di farsi vedere.|prova:int+1 prova:sop+1
attrezzo|un rampino|Scala muri e scogliere: si scappa dove nessuno può seguire.|prova:agi+2 posti:2
valore|un sacchetto di monete dell'evento|Monete dell'evento: comprano favori nel lancio di rifornimenti.|scambio:2 posti:0
valore|una skin leggendaria|Inutile in combattimento, preziosissima per l'ego. Il pubblico impazzisce.|scambio:3 posti:0 prova:car+1
`;
  D.itemLexCatalog.horror = `
arma|un candelabro d'argento|Pesante, d'argento, ancora con una candela accesa.|forza:0.5 belve:2 indicatore:5
arma|un'ascia|L'ascia della legnaia. Qualcuno l'ha già usata.|forza:1 posti:3
arma|un fucile da caccia|Due colpi, poi bisogna ricaricare al buio.|forza:1.5 usi:-1 posti:3
arma|un pugnale rituale|Inciso con simboli che si muovono se li fissi.|forza:0.5 posti:1 prova:cor+1
arma|un crocifisso appuntito|Benedetto e affilato: doppia utilità.|forza:0 indicatore:15 posti:1
arma|una falce|La falce del giardiniere. O di qualcun altro.|forza:1 belve:2 posti:3
cibo|del vino polveroso|Bottiglie di cent'anni: nutrono poco, scaldano molto.|cibo:-15 morale:8
cibo|del pane raffermo|Duro, ma non ammuffito. Non ancora.|cibo:0
cibo|una scatola di biscotti|Una scatola di latta con dei biscotti. E un bottone.|cibo:5 morale:3
cibo|un barattolo di marmellata|Marmellata di more della cantina. Dolcissima.|cibo:0 morale:6
amuleto|un rosario benedetto|Grani consumati da mille preghiere: proteggono una volta, e calmano sempre.|indicatore:20 morale:3
amuleto|un medaglione con un ricciolo di capelli|Non si sa di chi sia il ricciolo. Ma protegge.|indicatore:10 prova:fort+1
alcol|una bottiglia di brandy della cantina|Brandy invecchiato: scalda le stanze gelide.|morale:6 indicatore:5
alcol|una bottiglia di assenzio|Verde fata: fa vedere cose. Più del solito.|morale:8 indicatore:-10
veleno|un barattolo di zucchero all'arsenico|Sembra zucchero. Non lo è.|posti:0
veleno|una fiala senza etichetta|Nessuno sa cosa contenga. Il topo morto accanto lo sa.|posti:0
mappa|la pianta originale della villa|La pianta dell'architetto, con stanze che oggi non esistono più.|prova:int+2 prova:furt+1 indicatore:5
esplosivo|una lampada a petrolio|Rovesciata, incendia una stanza intera.|posti:2 belve:2
esplosivo|una scatola di polvere da sparo antica|Polvere vecchia di un secolo: instabile e affamata di fuoco.|posti:1
armatura|l'armatura del cavaliere nel salone|L'armatura del salone. Protegge tutto. Cigola in modo terrificante.|assorbe:16 posti:5 prova:agi-2 prova:furt-2
armatura|un vassoio d'argento usato come scudo|Un vassoio da portata: para un colpo e riflette ciò che non dovrebbe riflettere.|assorbe:6 indicatore:5 posti:2
attrezzo|un candelabro|Tre candele accese: nella villa la luce è vita.|belve:3 indicatore:15 posti:2
attrezzo|una chiave che apre tutte le porte|Una chiave sola che apre ogni serratura. Anche quelle che dovrebbero restare chiuse.|prova:furt+2 belve:1 posti:0
attrezzo|una tavola ouija|Risponde alle domande. Le risposte non sempre aiutano.|prova:int+1 indicatore:-5 prova:fort+1
valore|dei gioielli di famiglia|Collane, anelli, spille: valgono una fortuna, e portano sfortuna.|scambio:3 posti:0
valore|un anello con lo stemma della villa|I domestici fantasma si inchinano a chi lo porta.|scambio:2 prova:car+1 posti:0
`;
  D.itemLexCatalog.wasteland = `
arma|un fucile arrugginito|Spara, quando vuole lui.|forza:1 usi:-1 posti:3
arma|una lancia ricavata da un tubo|Un tubo idraulico affilato: tiene lontani i cani.|forza:0.5 belve:3 posti:3
arma|una balestra artigianale|Cavi di freno e molle d'auto: silenziosa e cattiva.|forza:1 posti:3 prova:furt+1
arma|una molotov|Una bottiglia, uno straccio, un accendino: un incendio portatile.|forza:1 usi:-2 posti:1 belve:2
arma|una catena|Di moto o di cancello: fa paura solo a sentirla.|forza:0.5 prova:for+1
arma|una mannaia|Del vecchio macellaio. Affilata ogni giorno.|forza:1 raccolta:4
arma|un lanciachiodi|Un utensile da cantiere riadattato. Chiodi a raffica.|forza:1.5 usi:-1 posti:2
cibo|una lattina ammaccata|Senza etichetta: dentro potrebbe esserci di tutto.|cibo:10 posti:0
cibo|della carne di lucertola|Sa di pollo. Tutto sa di pollo, qui.|cibo:10
cibo|una tanica d'acqua torbida|Acqua, sì. Pulita, no.|cibo:-15 energia:10 indicatore:-5 posti:2
cibo|dei fichi d'India|Spinosi e dissetanti.|cibo:-5 energia:8 posti:0
amuleto|una piastra di metallo cucita nella giacca|Una piastra sul cuore: ha già fermato un proiettile.|prova:cor+1
amuleto|un tappo di bottiglia fortunato|Un tappo con un sole stampato. Ha visto cose.|prova:fort+2 posti:0
alcol|una bottiglia di liquore distillato in un radiatore|Fa male agli occhi solo a guardarla.|morale:7 indicatore:-5
alcol|una tanica di birra di cactus|Amara, tiepida, sociale.|morale:5 posti:2
veleno|una fiala di veleno di scorpione|Raccolta con molta attenzione da uno scorpione molto arrabbiato.|posti:0
veleno|una bottiglia d'acqua radioattiva|Sembra acqua pura. Brilla appena al buio.|posti:1
mappa|una mappa delle sorgenti nascoste|Pozzi e sorgenti che nessuno conosce più.|raccolta:14 prova:sop+1
esplosivo|un barile di carburante|Pesante e infiammabile: un piano B gigante.|posti:4
armatura|un'armatura di copertoni|Gomma di camion tagliata e legata: ferma quasi tutto.|assorbe:10 posti:4 prova:agi-1
armatura|uno scudo ricavato da un cartello stradale|STOP, c'è scritto. Gli altri non sempre obbediscono.|assorbe:12 posti:3
armatura|una maschera antigas|Filtri ancora buoni: si respira dove gli altri tossiscono.|assorbe:-20 indicatore:35 posti:1
attrezzo|un contatore Geiger|Gracchia dove è meglio non stare.|indicatore:25 prova:sop+1
attrezzo|una chiave inglese|Smonta motori, apre valvole, ammacca teste.|prova:int+1 prova:for+1
attrezzo|una borraccia filtrante|Rende bevibile quasi tutto.|raccolta:10 indicatore:10
valore|una manciata di tappi di bottiglia|La moneta del deserto.|scambio:2 posti:0
valore|una tanica di benzina|Il sangue del mondo nuovo. Chi ha un motore la paga qualsiasi cifra.|scambio:3 posti:3
`;
  D.itemLexCatalog.liceo = `
arma|un gossip esplosivo|Una voce vera e potentissima: basta sussurrarla alla persona giusta.|forza:1.5 prova:car+1 posti:0
arma|una foto imbarazzante|Una foto della gita che qualcuno vorrebbe cancellata per sempre.|forza:1 posti:0
arma|un compito copiato|La prova che qualcuno ha copiato. Una bomba in classe.|forza:1 usi:-1 posti:1
arma|un pallone da dodgeball|In palestra è un'arma legale. Fuori, un po' meno.|forza:0.5 prova:agi+1 posti:2
arma|un registro rubato|Voti e note di tutta la classe. Un potere enorme.|forza:1.5 prova:int+1 posti:2
arma|un profilo falso|Un account anonimo con trecento follower. Pericolosissimo.|forza:1 prova:furt+1 posti:0
cibo|una merendina del distributore|L'unica gioia della mattinata.|cibo:-10 morale:5 posti:0
cibo|un trancio di pizza della mensa|La pizza del venerdì: tiepida e indimenticabile.|cibo:15 morale:4
cibo|un caffè della macchinetta|Bollente, amarissimo, necessario.|cibo:-25 energia:20 posti:0
amuleto|una raccomandazione del preside|Una lettera del preside che salva da una espulsione. Una sola.|prova:car+1
amuleto|un certificato medico in bianco|Giustifica un'assenza qualunque. Usarlo è un'arte.|prova:furt+1 indicatore:10
alcol|una lattina di energy drink|Taurina e zucchero: si studia fino all'alba, poi si crolla.|morale:5 posti:0
veleno|un pettegolezzo avvelenato|Una voce falsa che si attacca a chiunque.|posti:0
veleno|uno screenshot compromettente|Una chat che non doveva uscire dal gruppo.|posti:0
mappa|l'orario segreto delle verifiche|Tutte le verifiche del mese, con le date vere.|prova:int+2 indicatore:15
esplosivo|un video virale|Un video che domani avranno visto tutti.|posti:0
esplosivo|una petizione con trecento firme|Trecento firme: perfino il preside deve ascoltare.|posti:1
armatura|un alibi di ferro|Testimoni, orari e uno scontrino: impossibile da smontare.|assorbe:12 posti:1
armatura|una felpa col cappuccio|Ci si nasconde dentro e si diventa invisibili ai prof.|assorbe:-10 prova:furt+2 indicatore:10 posti:1
attrezzo|gli appunti di tutto l'anno|Ordinati, evidenziati, completi: valgono più dell'oro.|prova:int+2 posti:2
attrezzo|un caricabatterie di riserva|Il telefono non muore mai: e nemmeno la reputazione.|prova:car+1 prova:sop+1
valore|dei buoni pasto|Buoni della mensa: si scambiano con favori di ogni tipo.|scambio:2 posti:0
valore|le risposte del compito di domani|Valgono più di qualunque cosa. Fino a domani.|scambio:3 posti:0
ricordo|un portachiavi dell'amicizia|Mezzo cuore. L'altra metà ce l'ha qualcuno che ti aspetta.|morale:6 prova:car+1
ricordo|il quaderno delle confidenze|Pieno di segreti di tutti. Anche dei tuoi.|morale:5 prova:int+1
ricordo|il biglietto del primo concerto|Il primo concerto senza genitori. Si canta ancora quella canzone.|morale:7
`;
  D.itemLexCatalog.ufficio = `
arma|una mail in copia a tutti|Una risposta a tutti con dentro la verità. Irreversibile.|forza:1.5 posti:0
arma|un report pieno di errori altrui|Gli errori di un collega, documentati con cura.|forza:1 prova:int+1 posti:1
arma|una presentazione rubata|Le slide di qualcun altro, presentate per primi.|forza:1 prova:car+1 posti:1
arma|un badge clonato del capo|Apre tutte le porte e tutte le cartelle condivise.|forza:1 prova:furt+2 posti:0
arma|un foglio Excel con le prove|Righe, formule e colpe: un documento che licenzia.|forza:1.5 prova:int+1 posti:0
arma|una nota spese gonfiata|La nota spese di un collega, con le cene di famiglia dentro.|forza:1 usi:-1 posti:0
cibo|un caffè della macchinetta|Il carburante dell'ufficio.|cibo:-25 energia:20 posti:0
cibo|una ciambella della sala riunioni|Avanzata da una riunione importante. Un premio.|cibo:-5 morale:6 posti:0
cibo|un'insalata in vaschetta|Pranzo sano davanti allo schermo.|cibo:5
amuleto|uno zio nel consiglio di amministrazione|Una telefonata, e un licenziamento sparisce. Una volta.|prova:car+1
amuleto|un contratto blindato|Un contratto che il Direttore non può toccare. Quasi.|prova:res+1 indicatore:10
alcol|una bottiglia di prosecco aziendale|Il prosecco della festa di Natale. Si stappa per festeggiare o dimenticare.|morale:6
alcol|una bottiglia di limoncello del capo|Fatto in casa dal capo. Rifiutarlo è un rischio professionale.|morale:5 prova:car+1
veleno|una mail anonima all'ufficio del personale|Poche righe, e qualcuno viene convocato.|posti:0
veleno|una segnalazione anonima|Una segnalazione al Direttore, senza firma.|posti:0
mappa|l'organigramma segreto della riorganizzazione|Chi resta, chi va, chi verrà promosso.|prova:int+2 indicatore:15
esplosivo|un report che fa saltare tutto|Un report che, se letto in riunione, fa saltare un reparto intero.|posti:0
esplosivo|la registrazione di una riunione riservata|Quello che il Direttore ha detto davvero.|posti:0
armatura|una scrivania d'angolo strategica|Spalle al muro e vista su tutto l'open space.|assorbe:10 prova:int+1 posti:0
armatura|delle cuffie antirumore|Silenzio totale: lo stress resta fuori.|assorbe:-10 indicatore:25 posti:1
attrezzo|una chiavetta USB con tutte le password|Tutte le password dell'azienda. Un potere terrificante.|prova:furt+2 prova:int+1 posti:0
attrezzo|una macro di Excel miracolosa|Fa in un minuto il lavoro di una giornata.|prova:int+2 indicatore:10 posti:0
valore|delle ferie arretrate|Giorni di ferie non goduti: valgono oro nelle trattative.|scambio:3 posti:0
valore|dei buoni pasto|La moneta corrente dell'open space.|scambio:2 posti:0
ricordo|la foto del gatto|Il gatto di casa, che dorme sul divano. Ti aspetta.|morale:7
ricordo|una tazza con scritto «Il capo migliore del mondo»|Un regalo ironico. O forse no.|morale:4 prova:car+1 posti:1
ricordo|il badge del primo giorno|La foto del primo giorno: più giovane, più ottimista.|morale:5 prova:cor+1
`;
  D.itemLexCatalog.cyberpunk = `
arma|un fucile a pompa da strada|Canne segate e calcio coperto di adesivi delle gang: fa paura anche scarico.|forza:1.5 posti:3 belve:2
arma|una mazza da baseball chiodata|Legno vero e chiodi veri: un pezzo d'antiquariato con un brutto carattere.|forza:0.5 prova:for+1
arma|un taser da buttafuori|Due elettrodi e una scarica che manda a terra chiunque, impianti compresi.|forza:0 posti:1 belve:2
arma|un mitra compatto|Tanti colpi, poca precisione. Si svuota in fretta.|forza:1 usi:-1 posti:2
arma|un ventaglio da combattimento in titanio|Si apre con uno scatto e ha i bordi affilati come rasoi. Elegante, e fa anche aria.|forza:0.5 prova:agi+1 posti:1
arma|uno sparachiodi riprogrammato|Un utensile da cantiere con il limitatore tolto: spara chiodi a raffica.|forza:1 usi:-1 posti:2 prova:int+1
arma|un tirapugni elettrificato|Quattro anelli di metallo e una batteria: ogni pugno arriva con una scossa.|forza:0.5 posti:0 prova:for+1
cibo|una barretta di proteine sintetiche|Sa di cartone alla fragola, ma sfama.|cibo:0 posti:0
cibo|una scatola di noodle istantanei|Acqua calda, tre minuti, e la giornata migliora.|cibo:5
cibo|una lattina di bevanda energetica|Zucchero, caffeina e qualcosa che non è scritto sull'etichetta.|cibo:-25 energia:20 posti:0
cibo|un panino di soia in busta|Pane di soia e salsa di soia. Sfama.|cibo:0
cibo|una porzione di ramen al vapore|Brodo caldo, uova sintetiche e un cucchiaio di plastica che si scioglie un po'. Rimette in pace con il mondo.|cibo:10 morale:3
cibo|un onigiri di riso sintetico|Un triangolo di riso con un cuore di alghe: compatto e onesto.|cibo:0 posti:0
cibo|un sacchetto di grilli fritti|Croccanti, salati, ricchi di proteine. Non pensarci troppo.|cibo:-5 energia:10 posti:0
cibo|un biscotto di Nonna Kiku|Un biscotto al burro fatto a mano da una fixer di ottantadue anni. Il migliore del distretto, e nessuno osa dire il contrario.|cibo:-25 morale:10 posti:0
alcol|una bottiglia di vodka al neon|Brilla al buio di un azzurro innaturale. Anche chi la beve, per un po'.|morale:7 posti:1
alcol|un cocktail «Riavvio di sistema»|La specialità del Club della braindance: tre strati colorati e un riavvio immediato.|morale:6 energia:-5 posti:0
veleno|un microago avvelenato|Un ago sottile come un capello, da nascondere in una stretta di mano.|posti:0
esplosivo|una granata a impulso|Non fa danni alle cose: spegne impianti e luci di tutti quelli che ha intorno.|posti:1
esplosivo|un drone kamikaze riprogrammato|Un drone delle consegne con un pacco speciale. Lo consegna una volta sola.|posti:2
amuleto|un defibrillatore sottocutaneo|Un impianto sotto lo sterno: se il cuore si ferma, una scarica lo riavvia. Come ogni portafortuna salva una volta sola, poi si brucia.|posti:0 impianto:1
alcol|una bottiglia di sakè sintetico|Sakè di laboratorio: scalda, consola e fa dire cose di cui ci si pente.|morale:6 posti:1
alcol|una lattina di birra di riso|Tiepida, amara e sociale.|morale:5 posti:0
veleno|una fiala di neurotossina|Basta un graffio per mandare in tilt il sistema nervoso, impianti compresi.|posti:0
veleno|una cartuccia di veleno per lame|Una cartuccia da avvitare all'impugnatura: ogni colpo inietta la tossina.|posti:0
esplosivo|una granata a frammentazione|Militare, rubata a un posto di blocco. Il piano B di molti.|posti:1
esplosivo|una carica di plastico|Plastico con un detonatore a tempo: apre porte, e non solo porte.|posti:1
`;
})(typeof window === 'object' ? window : globalThis);
