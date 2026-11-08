/* Catalogo degli oggetti: Città degli Infetti, Isola Battle Royale, Villa Maledetta. Formato in _oggetti-1.js. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.itemCatalog = D.itemCatalog || {};
  D.itemCatalog.zombie = `
arma|un coltello da campeggio|Apre scatolette e finisce i problemi da vicino.|forza:-0.5 posti:1 raccolta:8
arma|un machete da potatura|Fa strada tra le siepi dei giardini e tra le mani che spuntano dalle siepi.|forza:1 belve:3
arma|una mazza da lavoro|Ferro pieno: un colpo e la porta, o la testa, cede.|forza:1.5 posti:3 prova:agi-1
arma|un’accetta da soccorso|Rossa, appesa vicino agli estintori. Sfonda vetri e tiene lontani gli infetti.|forza:1 belve:2 prova:for+1
arma|un piede di porco|Apre porte, casse e crani. L'arma più utile della città.|forza:0.5 raccolta:10 prova:furt+1
arma|un martello da carpentiere|Leggero, preciso e silenzioso: non richiama l'orda.|forza:0 posti:1 prova:furt+2
armatura|un giubbotto da motociclista|Pelle spessa e protezioni rigide: i morsi non passano.|assorbe:6 indicatore:20
armatura|una protezione da cantiere|Casco e pettorina gialla: si vede da lontano, ma regge i calcinacci.|assorbe:8 prova:furt-1
armatura|uno scudo antisommossa|Trasparente e pesante: si spinge indietro un'orda intera.|assorbe:14 posti:4 belve:3 prova:agi-1
armatura|un corpetto da baseball|Imbottito per le palle veloci. Funziona anche con i pugni.|assorbe:2
armatura|una giacca da lavoro|Tela robusta con cento tasche: protegge poco, porta molto.|assorbe:-8 raccolta:5 posti:2
armatura|un parabraccio sportivo|Si mette sull'avambraccio da offrire al morso, invece della carne.|assorbe:-12 indicatore:25 posti:1
attrezzo|una pinza universale|Taglia lucchetti, filo spinato e recinzioni del campo militare.|prova:furt+1 prova:int+1
attrezzo|un set di cacciaviti|Smonta grate, sportelli e casse dei distributori.|raccolta:8 prova:int+1
attrezzo|un apriscatole|Il vero tesoro della città: senza, le scatolette sono soprammobili.|raccolta:12
attrezzo|un set di chiavi|Chiavi di cantine e garage: porte che gli altri non possono aprire.|prova:furt+2 belve:1
attrezzo|una pietra abrasiva|Lame affilate tagliano prima che la mano tremi.|prova:for+1
attrezzo|un set da cucito|Per i vestiti strappati e, in mancanza d'altro, per le ferite.|prova:emp+2
mappa|una pianta dei quartieri|Quali quartieri sono caduti e quali resistono ancora.|prova:sop+2 belve:1
mappa|un elenco dei passaggi|Cortili, scale antincendio e tetti che collegano gli isolati.|prova:agi+2
mappa|una carta delle pendenze|In discesa si scappa meglio. Gli infetti, in salita, inciampano.|prova:agi+1 prova:sop+1
mappa|uno schema dei collegamenti|Fogne, metro e cunicoli: la città sotto la città.|prova:furt+2
mappa|un rilievo degli isolati|Farmacie, supermercati e magazzini non ancora svuotati.|raccolta:14
mappa|un taccuino delle vie laterali|Appunti di un fattorino: tutte le strade senza traffico. Senza infetti, di solito.|prova:agi+1 belve:2
trap|una rete da cantiere|Arancione e resistente: blocca un vicolo intero.|trappola:3 belve:3 posti:3
trap|un laccio da cattura|Prende gli infetti per le caviglie. Anche i vivi.|trappola:4 posti:1
trap|un telaio di recinzione|Un pezzo di recinzione teso come una porta che si chiude.|trappola:5 belve:2 posti:3
trap|una gabbia pieghevole|Per animali domestici smarriti. Ora per cose peggiori.|trappola:4
trap|un blocco di porta|Blocca una porta dall'esterno. Chi entra, resta.|trappola:7
trap|un cavo da traino|Teso tra due auto, all'altezza delle ginocchia.|trappola:6 posti:3
med|un rotolo di garze|Garze per pulire i graffi prima che diventino qualcosa di peggio.|cura:0 guarisce:malato
med|un pacco di bende|Tante bende, per tante ferite.|cura:5
med|un set da pronto soccorso|La valigetta rossa del pronto soccorso, quasi intatta.|cura:15 guarisce:ferito posti:2
med|una fascia sterile|Sterile e sigillata: un morso pulito subito è un morso che forse non infetta.|cura:-5 guarisce:malato posti:0
med|un tampone medico|Tampone con disinfettante forte. Brucia come l'inferno.|cura:0 guarisce:avvelenato
med|un set da medicazione|Forbici, cerotti grandi e un flacone di iodio.|cura:10
amuleto|un gettone del vecchio bar|Del bar sotto casa, quello che non riaprirà più.|morale:5
amuleto|un ciondolo di rame|Il rame, dicono, tiene lontane le malattie.|indicatore:15
amuleto|una pietra dipinta|Dipinta da un bambino con una faccina sorridente.|morale:6
amuleto|un anello di corda|Intrecciato durante la quarantena, per non impazzire.|prova:res+1 morale:3
amuleto|una medaglia del quartiere|Medaglia della maratona di quartiere. Ricorda alle gambe che sanno correre.|prova:agi+1 prova:fort+1
amuleto|un bottone portafortuna|Era sulla giacca di qualcuno che è sopravvissuto. Speriamo sia contagioso.|prova:fort+2
valore|un pacchetto di batterie|Batterie cariche: in città valgono più dei soldi.|scambio:3 posti:0
valore|un rotolo di nastro|Nastro americano: ripara tutto, chiude tutto.|scambio:2 prova:int+1
valore|un mazzo di fascette|Legano porte, armi improvvisate e prigionieri.|scambio:1 posti:0
valore|una serie di fusibili|Fanno ripartire un generatore. Chi ha un generatore paga.|scambio:2 posti:0
valore|una manciata di viti|Poche, ma della misura giusta.|scambio:1 posti:0
valore|un tubetto di colla|Attacca tutto, anche le scarpe che si aprono durante la fuga.|scambio:1 prova:agi+1 posti:0
ricordo|una fotografia scolorita|Una famiglia in vacanza, prima di tutto questo.|morale:6
ricordo|una cartolina del mare|Il mare non è infetto. Prima o poi ci si arriva.|morale:5 prova:cor+1
ricordo|un biglietto del cinema|L'ultimo film visto prima della fine del mondo. Era brutto.|morale:4
ricordo|un disegno a pennarello|Un sole, una casa, quattro persone. Una era tu.|morale:7
ricordo|una lettera di saluto|Scritta di fretta durante l'evacuazione: «Ci vediamo al campo».|morale:6 prova:res+1
ricordo|una foto di compleanno|Candeline, torta, risate. Prova che le cose belle sono esistite.|morale:5
cibo|dei cracker salati|Il sale fa venire sete, ma riempie.|cibo:0
cibo|delle gallette di riso|Leggere come il polistirolo e quasi altrettanto buone.|cibo:-10 posti:0
cibo|delle prugne secche|Dolci, appiccicose, energetiche.|cibo:-5 energia:10 posti:0
cibo|dei biscotti semplici|Biscotti da colazione: sanno di una vita normale.|cibo:0 morale:6
cibo|delle arachidi tostate|Tante calorie in un pugno.|cibo:-10 energia:15 posti:0
cibo|delle fette biscottate|Si sbriciolano tutte nello zaino, ma si mangiano anche le briciole.|cibo:5
`;
  D.itemCatalog.royale = `
arma|un coltello tattico|Lama annerita e manico in gomma: affidabile in ogni situazione.|forza:0 posti:1 prova:agi+1
arma|una carabina compatta|Colpisce da lontano: chi la porta sceglie quando iniziare lo scontro.|forza:1.5 usi:-1 posti:3 prova:agi+1
arma|un manganello|Tozzo e infallibile da vicino.|forza:0.5 prova:for+1
arma|una pistola da segnalazione modificata|Spara un razzo che acceca e incendia. Una volta. Forse due.|forza:1 usi:-2 belve:3 posti:1
arma|una scure da campo|Taglia legna e ripari, e poi chi prova a entrarci.|forza:1 raccolta:5 posti:3
arma|una lancia da sopravvivenza|Un coltello legato a un bastone, ma fatto bene.|forza:0.5 belve:3 raccolta:5 posti:3
armatura|un corpetto tattico|Livello 2, dicono gli streamer. Protegge davvero.|assorbe:8
armatura|una pettorina da allenamento|Gialla fluorescente. Protegge, ma ti vedono da un chilometro.|assorbe:2 prova:furt-2
armatura|uno scudo composito|Uno scudo da squadra speciale: si avanza coperti.|assorbe:14 posti:4 prova:agi-1
armatura|una giacca imbottita|Morbida, calda, protegge dalle cadute dall'alto.|assorbe:-2 prova:agi+1
armatura|una protezione da pattuglia|Ginocchiere, gomitiere e un casco con la visiera graffiata.|assorbe:5 prova:res+1
armatura|un parabraccio tecnico|Leggero e con una tasca per il medkit.|assorbe:-12 posti:1 prova:emp+1
attrezzo|una pinza tascabile|Taglia le fascette delle casse prima degli altri.|raccolta:8 prova:agi+1
attrezzo|un set di chiavi esagonali|Smonta mirini, sportelli e casse rinforzate.|prova:int+1 raccolta:5
attrezzo|un acciarino|Un fuoco nella notte dell'isola: caldo, luce, coraggio.|belve:2 prova:sop+1 morale:0
attrezzo|un set di aghi|Per cucire le ferite tra un cerchio e l'altro.|prova:emp+2
attrezzo|un avvitatore manuale|Rimonta porte e barricate in pochi minuti.|belve:2 prova:int+1
attrezzo|una lima corta|Affila lame e apre lucchetti di bassa qualità.|prova:for+1 prova:furt+1
mappa|una carta topografica|Curve di livello e punti alti: si vede arrivare tutti.|prova:sop+2 prova:int+1
mappa|un rilievo degli approdi|Dove arrivano le casse rifornimenti, ogni volta.|raccolta:14
mappa|una pianta dei settori|I settori dell'isola con l'ordine in cui il cerchio li chiude.|prova:int+2 prova:agi+1
mappa|un taccuino dei dislivelli|Scogliere, scale, scorciatoie verticali.|prova:agi+2
mappa|uno schema dei tracciati|Le strade asfaltate: si corre veloci e si viene visti.|prova:agi+1 prova:sop+1
mappa|una carta delle coperture|Muri, rocce e ruderi dietro cui ripararsi.|prova:furt+2 belve:1
trap|un telaio da cattura|Un telaio a scatto che blocca le gambe.|trappola:5
trap|una rete tattica|Si lancia o si tende: chi ci finisce sotto è uno spettatore.|trappola:4 belve:2
trap|un cavo da arresto|Teso in un corridoio di cemento.|trappola:6 posti:1
trap|una morsa pieghevole|Pieghevole e cattivissima.|trappola:7
trap|un blocco da passaggio|Chiude un ponte o una porta mentre il cerchio si stringe.|trappola:8 posti:3
trap|un laccio mimetico|Invisibile tra l'erba alta.|trappola:4 prova:furt+1 posti:1
med|una fascia compressiva|Ferma il sangue e si mette con una mano sola.|cura:5 posti:0
med|un set di garze|Garze in quantità: per sé e per la squadra.|cura:5
med|un rotolo di bende|Standard, affidabile, mai abbastanza.|cura:0
med|un tampone sterile|Pulisce la ferita e tiene lontane le infezioni.|guarisce:malato posti:0
med|un impacco refrigerante|Rimette in piedi dopo una caduta e un colpo di calore.|cura:-5 energia:15
med|un set da soccorso|Il kit completo del medico di squadra.|cura:15 guarisce:ferito guarisce:avvelenato posti:2
amuleto|un gettone della squadra|Il gettone che la squadra tocca prima di ogni partita.|prova:car+1 morale:3
amuleto|un ciondolo di ceramica|Fragile e bellissimo: va protetto, e quindi bisogna sopravvivere.|morale:5
amuleto|una moneta commemorativa|Della prima edizione dei giochi. Il pubblico la adora.|prova:car+2
amuleto|una pietra dipinta|Dipinta con i colori della propria squadra.|morale:4 prova:fort+1
amuleto|un anello di corda|Annodato con il nodo che si usa per scalare.|prova:agi+1 morale:2
amuleto|un disco di rame|Lucido come uno specchio: ci si guarda e ci si ricorda chi si è.|prova:cor+1 morale:3
valore|un pacchetto di celle|Celle di energia per qualunque dispositivo.|scambio:3 posti:0
valore|un set di ottiche di ricambio|Un mirino nuovo cambia la partita.|scambio:3 prova:agi+1
valore|un rotolo di nastro tecnico|Ripara impugnature, scarpe e barricate.|scambio:2
valore|un set di fibbie|Fibbie di zaino: senza, si perde metà del bottino.|scambio:1 posti:0
valore|un pacchetto di fascette|Chiudono casse, legano prigionieri, fermano porte.|scambio:1 posti:0
valore|una serie di connettori|Ricambi per droni e radio.|scambio:2 posti:0
ricordo|una fotografia di squadra|La squadra al completo, prima che il cerchio iniziasse a stringersi.|morale:6 prova:car+1
ricordo|un biglietto della finale|Il biglietto della finale vista dal pubblico, anni fa. Ora sei dall'altra parte.|morale:5 prova:cor+1
ricordo|una cartolina dell’isola|Spiagge bianche e cielo blu, come nelle pubblicità.|morale:4
ricordo|un foglio di autografi|Gli autografi dei campioni delle edizioni passate.|morale:5
ricordo|un disegno del vecchio campo|Il campetto dove tutto è iniziato.|morale:6
ricordo|una lettera piegata|Una lettera da aprire «solo se arrivi tra gli ultimi dieci».|morale:8
cibo|delle barrette ai cereali|Gusto cioccolato, sapore di sponsor.|cibo:-5 energia:10 posti:0
cibo|delle noci tostate|Croccanti e nutrienti.|cibo:-10 energia:15 posti:0
cibo|dei cracker integrali|Riempiono e non sporcano le mani.|cibo:5
cibo|delle fette di frutta secca|Zucchero naturale tra un combattimento e l'altro.|cibo:-10 morale:8 posti:0
cibo|delle gallette salate|Il pasto tipico di chi si nasconde in un cespuglio.|cibo:5
cibo|dei biscotti d’avena|Biscotti d'avena della mensa ufficiale dei giochi.|cibo:5 morale:3
`;
  D.itemCatalog.horror = `
arma|un coltello d’argento|L'argento ferisce ciò che non dovrebbe camminare. Dicono.|forza:0 posti:1 indicatore:15
arma|un attizzatoio|Ferro del camino: pesante, lungo, ancora caldo di brace.|forza:1 belve:2
arma|una daga da cerimonia|Incisa con simboli che nessuno vuole tradurre.|forza:0.5 posti:1 prova:cor+1
arma|una scure da legna|Quella della legnaia. Ha visto cose.|forza:1.5 posti:3 prova:agi-1
arma|un bastone da passeggio|Pomolo d'argento e anima di piombo: elegante e micidiale.|forza:0.5 prova:res+1
arma|un pugnale d’epoca|Antico e affilato. Si dice appartenesse al primo padrone di casa.|forza:0 posti:1 prova:furt+2
armatura|un corpetto da scherma|Imbottito e bianco: protegge da lame sottili.|assorbe:4 prova:agi+1
armatura|un cappotto imbottito|Lungo e pesante: nelle stanze gelate della villa è una salvezza.|assorbe:-4 indicatore:15 posti:2
armatura|uno scudo da cerimonia|Uno scudo appeso nel salone, con lo stemma di famiglia.|assorbe:10 posti:3
armatura|una protezione da giardiniere|Guanti, grembiule e stivali: le spine del labirinto non passano.|assorbe:2 prova:sop+1
armatura|una giacca di cuoio|Cuoio vecchio e morbido, odora di sigaro.|assorbe:2 morale:0
armatura|un parabraccio antico|Ferro battuto, con una preghiera incisa all'interno.|assorbe:-10 indicatore:15 posti:1
attrezzo|un set di chiavi|Le chiavi della villa, quasi tutte. Manca quella della soffitta. Meglio così.|prova:furt+2 belve:1
attrezzo|una pinza da restauro|Toglie chiodi da cornici e assi del pavimento.|prova:int+1 raccolta:5
attrezzo|un punteruolo|Apre i cassetti segreti delle scrivanie antiche.|prova:furt+1 prova:int+1
attrezzo|un acciarino|Accende le candele. Al buio, nella villa, è la cosa più importante che esista.|indicatore:25 belve:2
attrezzo|un set di aghi|Ricuce ferite e bambole. Le bambole lo preferiscono.|prova:emp+2
attrezzo|un piccolo scalpello|Scalpella pareti dove si sente qualcosa di cavo.|prova:int+2
mappa|una pianta delle ali|Le ali della villa, con le stanze che cambiano posto annotate a matita.|prova:int+2 indicatore:10
mappa|un rilievo dei dislivelli|Scale, botole e soffitti bassi: si scappa senza sbattere la testa.|prova:agi+2
mappa|un taccuino dei passaggi|I passaggi nascosti dietro i quadri e le librerie.|prova:furt+2 belve:1
mappa|uno schema delle stanze|Quali stanze hanno la serratura dall'interno.|belve:3 indicatore:10
mappa|una carta dei vani|Dispense, cantine e armadi dove qualcuno ha nascosto da mangiare.|raccolta:14
mappa|un indice delle porte|Quale porta porta dove. In teoria.|prova:int+1 prova:sop+1
trap|una rete da cattura|Una vecchia rete da pesca appesa sopra una porta.|trappola:4
trap|un telaio di ferro|Una tagliola da cacciatore trovata in cantina.|trappola:7
trap|un laccio di seta|Elegante e mortale, tra due colonne del corridoio.|trappola:4 prova:furt+1 posti:1
trap|una gabbia da uccelli|Grande abbastanza per qualcosa che non è un uccello.|trappola:3 belve:2
trap|un fermo da porta|Chiude una porta dall'altra parte. Chi è dentro resta con ciò che c'è dentro.|trappola:6 indicatore:5 posti:1
trap|un contrappeso di ottone|Un contrappeso del lampadario, sganciato al momento giusto.|trappola:8 posti:3
med|un rotolo di bende|Bende ingiallite, ma pulite.|cura:0
med|un impacco di erbe|Erbe della serra: calmano il corpo e i nervi.|cura:-5 indicatore:10
med|una scorta di garze|Trovata in un cassetto dell'infermeria della servitù.|cura:5
med|una fascia di lino pulita|Lino di lenzuolo, tagliato a strisce.|cura:-5 posti:0
med|un vasetto di unguento|Unguento della nonna. Funziona su tutto, anche sui morsi strani.|guarisce:avvelenato guarisce:malato posti:0
med|un set da medicazione|Il kit del medico di famiglia, con un flacone di sali.|cura:15 guarisce:ferito posti:2
amuleto|una medaglia votiva|Una medaglia benedetta: gli spiriti minori la evitano.|indicatore:20
amuleto|un sigillo di cera|Il sigillo di una lettera mai aperta. Protegge chi non la apre.|indicatore:10 prova:fort+1
amuleto|una pietra del rosario|Una sola pietra di un rosario spezzato. Si sgrana lo stesso.|morale:5 indicatore:5
amuleto|un ciondolo d’argento|L'argento scaccia, o almeno così si spera.|belve:2 indicatore:10
amuleto|un anello di rame|Si scalda quando qualcosa di freddo si avvicina. Utile.|prova:cor+1 belve:1
amuleto|un bottone di madreperla|Di un abito da ballo. Ricorda che la villa un tempo era allegra.|morale:6
valore|una posata d’argento|Una forchetta d'argento massiccio. La servitù l'ha contata, e manca.|scambio:2
valore|una moneta antica|Una moneta con un volto che non è di nessun re conosciuto.|scambio:2 posti:0
valore|un fermaglio di ottone|Un fermaglio per capelli, con un capello ancora attaccato.|scambio:1 posti:0
valore|un cristallo da lampada|Un pendente del lampadario. Rifrange la luce in modo inquietante.|scambio:2 posti:0
valore|un cammeo|Un profilo di donna. Il profilo, a volte, sembra voltarsi.|scambio:3 posti:0
valore|un sigillo di famiglia|Apre porte che le chiavi non aprono. O almeno, i domestici obbediscono.|scambio:3 prova:car+1
ricordo|una lettera scolorita|Una lettera d'amore di cento anni fa, mai spedita.|morale:5
ricordo|un ritratto in miniatura|Un volto amato, dentro un medaglione. Il tuo, non quelli della villa.|morale:7
ricordo|una foto del ballo|Una foto della sera del ballo: tutti ridono. Nessuno sa cosa sta per succedere.|morale:4 prova:cor+1
ricordo|una pagina di diario|«Domani si torna a casa», scrive qualcuno. Diventa una promessa.|morale:6 prova:res+1
ricordo|un biglietto di invito|L'invito che ti ha portato qui. Lo tieni per ricordarti di non accettarne più.|morale:3 indicatore:5
ricordo|un disegno della vecchia casa|La tua casa, non questa. Con le finestre accese.|morale:7
cibo|dei biscotti al burro|Dalla dispensa della villa. Freschissimi. Troppo freschi.|cibo:0 morale:5
cibo|delle fette di mela secca|Dolci e leggere, dalla serra.|cibo:-10 energia:8 posti:0
cibo|delle mandorle|Un pugno di mandorle, nascoste in un vaso cinese.|cibo:-10 energia:15 posti:0
cibo|del pane tostato|Pane della colazione, rimasto sul tavolo da giorni.|cibo:5
cibo|delle gallette dolci|Gallette per il tè delle cinque.|cibo:0 morale:4
cibo|delle castagne secche|Si mangiano davanti al camino, se il camino è acceso.|cibo:10
`;
})(typeof window === 'object' ? window : globalThis);
