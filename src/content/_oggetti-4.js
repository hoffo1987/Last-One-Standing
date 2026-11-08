/* Catalogo degli oggetti: Night City — Zona Rossa. Formato in _oggetti-1.js.
 * Gli impianti (impianto:1) funzionano come gli altri oggetti del loro tipo, ma restano
 * addosso a chi li ha installati: nessuno può rubarli, riceverli, prenderli come bottino
 * o trovarli a terra. Le finiture di quest'arena sono tutte tecnologiche, così valgono
 * anche per un impianto («una placcatura subdermale con gel antiurto»). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.itemCatalog = D.itemCatalog || {};
  D.itemCatalog.cyberpunk = `
arma|una pistola smart|Una pistola con proiettili a guida intelligente collegati alle ottiche: il colpo curva verso il bersaglio.|forza:1 prova:int+1
arma|una katana termica|La lama si arroventa con un pulsante sull'elsa. Taglia, e cauterizza mentre taglia.|forza:1.5 posti:3 prova:agi-1
arma|un fucile a pompa elettromagnetico|Due bobine al posto delle canne: un colpo solo, che sposta anche i muri sottili.|forza:1.5 posti:3 belve:3
arma|una mazza a impulsi|Un manganello da buttafuori con una scarica che piega le ginocchia.|forza:0.5 prova:for+1
arma|un coltello vibrante in ceramica|La lama vibra e taglia il kevlar, e non suona ai metal detector.|forza:-0.5 posti:1 prova:furt+2
arma|una pistola a rotaia artigianale|Assemblata in un garage con pezzi di tre marche diverse. Spara lontano, quando non si surriscalda.|forza:1 usi:-1 prova:agi+1
armatura|una giacca balistica|Kevlar sotto il tessuto lucido: protegge, e al Club fa anche la sua figura.|assorbe:6
armatura|un giubbotto in fibra di carbonio|Leggero e rigido: ferma le lame, un po' meno i proiettili.|assorbe:4 prova:agi+1
armatura|uno scudo antisommossa recuperato|Policarbonato graffiato, con il logo di una corporazione coperto di vernice.|assorbe:14 posti:4 usi:1
armatura|un casco con visiera schermata|La visiera filtra i lampi e il rumore della rete: gli impianti si scaldano meno.|assorbe:2 indicatore:15
armatura|una placcatura subdermale|Placche sottili installate sotto la pelle del torace. Non si toglie, e non si può rubare.|assorbe:8 posti:0 impianto:1
armatura|un rivestimento dermico ignifugo|Una pellicola installata sulla pelle delle braccia: regge calore e scintille, e disperde il calore degli impianti.|assorbe:3 indicatore:10 posti:0 impianto:1
attrezzo|un cyberdeck portatile|Il computer dei netrunner: con il cavo giusto apre porte, telecamere e terminali a portata di presa.|prova:int+2
attrezzo|un kit da scasso elettronico|Grimaldelli digitali e pinze isolate per le serrature a codice.|prova:furt+2
attrezzo|un multiattrezzo da tecnico|Cacciaviti, pinze e un tester in un solo pezzo.|prova:int+1 prova:for+1
attrezzo|un rilevatore di segnali|Ascolta le frequenze dei droni e vibra quando passano vicino.|belve:3 prova:sop+1
attrezzo|una fascia di raffreddamento neurale|Si stringe alla nuca e assorbe il calore degli impianti.|indicatore:25
attrezzo|un’interfaccia neurale da polso|Una presa installata nel polso: collega mente e macchine senza cavi volanti.|prova:int+1 indicatore:10 posti:0 impianto:1
mappa|uno schema dei condotti di servizio|Ogni condotto tra i palazzi, con le grate che si aprono a mano: si gira senza farsi vedere dai droni.|prova:furt+1 belve:2
mappa|una mappa dei punti ciechi delle telecamere|Gli angoli che le telecamere non vedono, segnati in rosso.|prova:furt+2
mappa|un elenco dei distributori ancora pieni|Ogni distributore automatico non ancora svuotato, con l'orario del rifornimento.|raccolta:14
mappa|una pianta del Nodo dati|Corridoi, sale server e porte stagne del nodo, con le procedure di emergenza.|prova:int+2
mappa|un registro delle ronde corporative|Orari e percorsi delle squadre di sicurezza: dove non trovarsi di notte.|belve:4
mappa|un’ottica cartografica|Un impianto oculare che proietta la mappa del quartiere sopra quello che si vede.|prova:agi+1 prova:sop+1 posti:0 impianto:1
trap|una mina a prossimità|Si attacca a un muro e scatta quando qualcuno passa troppo vicino.|trappola:8
trap|un filo monomolecolare|Un filo così sottile che non si vede: teso in un corridoio, taglia tutto quello che ci passa.|trappola:7 posti:1
trap|una torretta automatica riprogrammata|Una torretta di sicurezza con il bersaglio cambiato. Tiene lontano anche le visite notturne.|trappola:6 posti:4 belve:3
trap|una granata a impulso collegata a un sensore|Quando scatta, spegne luci e impianti di chi è nel raggio.|trappola:4
trap|una rete elettrificata|Una rete da cantiere collegata a una batteria: ferma e scuote.|trappola:5 belve:2
trap|un detonatore a pressione|Nascosto sotto una piastrella, aspetta il primo passo distratto.|trappola:6 posti:1 prova:furt+1
med|un iniettore medico|Una siringa a pressione con antidolorifici e coagulanti: rimette in piedi in pochi secondi.|cura:10
med|un kit da ripperdoc|Bisturi, colla chirurgica e garze, per chi sa cosa sta facendo.|cura:15 guarisce:ferito posti:2 prova:emp+1
med|una dose di stabilizzante neurale|Una dose sempre pronta in tasca: chi la porta con sé dosa meglio gli impianti e accumula meno sovraccarico.|cura:-5 indicatore:15 posti:0
med|una bomboletta di colla chirurgica|Chiude un taglio in tre secondi. Brucia come il fuoco.|cura:5 guarisce:ferito posti:0
med|una scatola di antibiotici del Mercato|Antibiotici veri, forse. L'etichetta dice di sì.|cura:0 guarisce:malato
med|un antidoto universale|Un neutralizzatore di tossine da bar: funziona quasi sempre.|cura:0 guarisce:avvelenato
amuleto|un portachiavi a forma di gatto fortunato|Un gatto di plastica che saluta con la zampa. Lo ha toccato mezzo Mercato.|prova:fort+2
amuleto|un biochip di backup|Una copia dei ricordi più importanti, salvata su un chip da collo. Se va male, almeno resta qualcosa.|morale:5
amuleto|una medaglietta della scuola di quartiere|Una medaglia di latta per una corsa vinta a dieci anni.|prova:cor+1 morale:3
amuleto|un dado di metallo inciso|Un dado pesante con un sei su ogni faccia: almeno lui vince sempre.|prova:fort+1 prova:cor+1
amuleto|un nastro dei santi di strada|Un nastro con le facce dei santi del quartiere stampate sopra. Calma i pensieri.|morale:4 indicatore:5
amuleto|un santino olografico|Un ologramma tascabile che recita una preghiera in tre lingue.|morale:3 prova:res+1
valore|una chiavetta di eddie|Una chiavetta con un saldo di eurodollari non tracciabili. Al Mercato apre ogni porta.|scambio:3 posti:0
valore|uno shard di dati rubati|Un frammento dei dati del colpo andato male: qualcuno pagherebbe molto, qualcun altro ucciderebbe.|scambio:3 posti:0
valore|una scheda di accesso corporativa|Il badge di un impiegato che non tornerà a reclamarlo. Apre qualche porta di servizio.|scambio:2 prova:furt+1 posti:0
valore|una bobina di cavo in fibra|Fibra ottica nuova: i tecnici del Megablocco la pagano bene.|scambio:2
valore|un pacchetto di chip di memoria|Chip vergini, ancora sigillati.|scambio:2 posti:0
valore|un orologio meccanico vero|Un orologio con le lancette e senza schermo. Un pezzo da collezione.|scambio:3 morale:2
ricordo|una foto stampata su carta|Una foto vera, su carta, di una famiglia in un parco che non esiste più.|morale:6
ricordo|un vecchio disco musicale|Un disco rock del secolo scorso, autografato da nessuno sa chi.|morale:5 prova:cor+1
ricordo|un braccialetto dell’ospedale|Il braccialetto di una nascita, conservato in un portafoglio.|morale:6
ricordo|un biglietto della metropolitana sopraelevata|Un biglietto mai obliterato: doveva servire per andarsene dal distretto.|morale:5 prova:res+1
ricordo|un vecchio telefono a conchiglia|Dentro c'è solo un messaggio vocale: trenta secondi di una voce che dice «torna a casa per cena».|morale:7
ricordo|un peluche bruciacchiato|Un orsetto con un occhio di bottone e la pelliccia annerita dal fumo.|morale:6
cibo|delle barrette di proteine sintetiche|Sanno di cartone alla fragola, ma sfamano.|cibo:5
cibo|delle scatole di noodle istantanei|Basta acqua calda, e c'è sempre un distributore che la dà.|cibo:10
cibo|delle pastiglie di caffeina|Non sfamano quasi per niente, ma tengono svegli per un'altra notte.|cibo:-30 energia:20 posti:0
cibo|dei panini di soia in busta|Pane di soia e salsa di soia: un pasto completo, dicono.|cibo:5 energia:5
cibo|degli spiedini di carne coltivata|Carne di laboratorio cotta sulla griglia di un banco del Mercato.|cibo:15 morale:3
cibo|delle gallette di alghe|Croccanti, salate, leggere: si portano ovunque.|cibo:-10 energia:5 posti:0
`;
  // finiture di Night City, con il loro effetto (i nomi stanno in world-items.js)
  D.itemTailsArena = D.itemTailsArena || {};
  D.itemTailsArena.cyberpunk = {
    arma: `con firmware aggiornato|Il firmware nuovo corregge rinculo e inceppamenti: regge un colpo in più prima di cedere.|usi:1
con modulo di puntamento|Un piccolo modulo collegato alle ottiche guida la mano.|prova:agi+1
con batteria potenziata|Più energia a ogni colpo.|forza:0.5
con circuiti schermati|Le interferenze di rete non la bloccano: si combatte senza esitare.|prova:cor+1
con modalità silenziosa|Spegne luci, suoni e firme elettroniche finché non serve.|prova:furt+1`,
    armatura: `con fibre di kevlar intrecciate|Uno strato in più dove serve di più.|assorbe:5
con gel antiurto|Il gel si indurisce all'impatto: regge un colpo in più prima di cedere.|usi:1
con sensori di impatto|Avverte un istante prima del colpo: ci si sposta d'istinto.|prova:agi+1
con schermatura termica|Il calore degli impianti si disperde meglio.|indicatore:5
con piastre rinforzate|Protegge meglio, ma pesa di più.|assorbe:8 posti:1`,
    attrezzo: `con firmware aggiornato|Programmi nuovi, meno errori.|prova:int+1
con batteria di riserva|Funziona anche durante i blackout: ci si orienta al buio.|prova:sop+1
con schermatura antintrusione|Nessun segnale la tradisce: si lavora senza farsi notare.|prova:furt+1
con dissipatore di calore|Scalda meno, e scalda meno chi la usa.|indicatore:5
con guscio ultraleggero|Pesa quasi niente.|posti:-1`,
    mappa: `con aggiornamento in tempo reale|I dati si aggiornano da soli quando passa una rete libera.|prova:int+1
con percorsi colorati|Un colore per il cibo, uno per le cure: le scorte si trovano prima.|raccolta:8
con note di un fixer|Qualcuno ha segnato dove dormire senza ricevere visite.|belve:2
con codici di emergenza|I codici aprono le porte di servizio: si scappa più in fretta.|prova:agi+1
con livelli dei piani|I piani dei palazzi uno sopra l'altro: si trovano scale che nessuno usa.|prova:furt+1`,
    trap: `con sensore di movimento|Scatta al primo movimento, anche lento.|trappola:4
con innesco a infrarossi|Un raggio invisibile attraversa il passaggio.|prova:furt+1
con carica raddoppiata|Doppia potenza, doppio rumore.|trappola:6
con mimetica olografica|Un ologramma la fa sembrare un pezzo di muro qualunque.|prova:furt+1 trappola:2
con allarme di prossimità|Piazzata vicino al riparo, avverte chi dorme se qualcuno si avvicina.|belve:2`,
    med: `in una custodia sterile|Sigillato e pulito: le dosi restano intatte.|cura:5
in una cartuccia compatta|Leggero: entra in qualunque tasca.|posti:-1
con antibiotici aggiunti|Ferma anche le infezioni.|guarisce:malato
con dosatore automatico|Il dosatore calcola la dose giusta.|cura:5
con istruzioni vocali|Una voce spiega cosa fare passo per passo: anche chi non sa medicare ci riesce.|prova:emp+1`,
    amuleto: `con un led che lampeggia piano|Il lampeggio lento calma il respiro e i pensieri.|indicatore:5
con una dedica incisa al laser|Le parole incise si toccano prima delle decisioni azzardate.|prova:fort+1
con una catenella di rame|Il rame scalda le dita fredde, e il coraggio.|prova:cor+1
con un ologramma di famiglia|Un volto sorride ogni volta che lo si apre.|morale:4
con un adesivo di una band|L'adesivo ricorda un concerto in cui andava tutto bene.|morale:3`,
    valore: `in una custodia antiurto|Arriva intatto a chi lo compra.|scambio:1
con certificato di provenienza|Il certificato, vero o falso, alza il prezzo.|scambio:1
in una busta schermata|Piatta e sottile: non occupa spazio.|posti:-1
con sigillo intatto|Mai aperto: vale più della parola di chi lo vende.|scambio:1
con un codice di riscatto|Il codice di riscatto mette di buon umore.|morale:2`,
    ricordo: `con una dedica scritta a mano|La dedica, riletta cento volte, dà forza nei momenti brutti.|morale:3
con una data incisa|La data ricorda per cosa si sta resistendo.|prova:cor+1
con un adesivo a forma di stella|La stellina sembra fatta apposta per le notti peggiori.|morale:2
con le iniziali incise|Le iniziali, toccate di nascosto, sono una promessa da mantenere.|prova:res+1
con una nota ripiegata|La nota ripiegata dice una cosa sola: torna.|morale:4`,
    cibo: `in una busta sottovuoto|Conservato bene: sfama di più.|cibo:5
in una vaschetta da asporto|Ancora tiepido, quasi come al banco.|cibo:5 morale:2
in una confezione da distributore|Porzione da distributore: piccola.|cibo:-5
in un sacchetto di carta oleata|Unto e sostanzioso: dà energia.|energia:5
in una scatola richiudibile|Si richiude e si incastra nello zaino.|posti:-1`,
  };
})(typeof window === 'object' ? window : globalThis);
