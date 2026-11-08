/* Catalogo degli oggetti: Terre Desolate, Liceo Spietato, Ufficio Open Space. Formato in _oggetti-1.js.
 * Nel Liceo e nell'Ufficio «armi», «protezioni», «trappole» e «cure» sono documenti, prove e risorse:
 * gli effetti sono gli stessi del motore, raccontati con un altro lessico. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.itemCatalog = D.itemCatalog || {};
  D.itemCatalog.wasteland = `
arma|una lama di recupero|Una lama di falciatrice affilata su un cordolo. Taglia anche il cuoio delle tende.|forza:0 raccolta:6
arma|una mazza di tubi|Tre tubi saldati insieme e un bullone in cima. Estetica da predone, efficacia da predone.|forza:1 prova:for+1
arma|una lancia di ferraglia|Un'asta di antenna con una punta di lamiera: tiene lontani i cani radioattivi.|forza:0.5 belve:4 posti:3
arma|una scure da demolizione|Butta giù porte, muri e chiunque ci sia dietro.|forza:1.5 posti:3 prova:agi-1
arma|un coltello da strada|Piccolo, sporco, sempre a portata di mano.|forza:-0.5 posti:1 prova:furt+2
arma|un martello da officina|Ripara motori di giorno e altro di notte.|forza:0.5 prova:int+1
armatura|un corpetto di pneumatico|Gomma di camion tagliata a scaglie. Puzza, ma ferma le lame.|assorbe:8 prova:agi-1
armatura|uno scudo di lamiera|Un cofano d'auto con una maniglia. Ha visto incidenti peggiori.|assorbe:14 posti:4 usi:1
armatura|una giacca da saldatore|Resiste al fuoco, alle scintille e alla polvere calda.|assorbe:2 indicatore:15
armatura|una pettorina di cuoio|Cuoio vecchio e spesso, rattoppato tante volte.|assorbe:3 posti:2
armatura|una protezione di placche|Placche di metallo cucite su una tuta: tintinna come un campanaccio.|assorbe:10 prova:furt-2
armatura|un parabraccio di recupero|Un tubo di grondaia tagliato a misura.|assorbe:-12 prova:for+1 posti:1
attrezzo|una chiave regolabile|Stringe bulloni, valvole e, all'occorrenza, il naso di qualcuno.|prova:int+1 prova:for+1
attrezzo|una pinza da officina|Toglie schegge, piega lamiere, ripara filtri.|prova:int+1 indicatore:5
attrezzo|un set di punteruoli|Bucano taniche e lattine: da bere e da mangiare, qualcosa si trova.|raccolta:10
attrezzo|una lima|Affila lame e lima lucchetti arrugginiti.|prova:furt+1 prova:for+1
attrezzo|un acciarino|Fuoco nel deserto: di notte si gela e i predatori girano.|belve:3 prova:sop+1
attrezzo|un set di aghi grossi|Ricuce tende, scarpe e ferite larghe.|prova:emp+2
mappa|una carta dei dislivelli|Dune e canaloni: dove nascondersi e dove si sprofonda.|prova:sop+2
mappa|un rilievo delle piste|Le piste dei convogli: si viaggia veloci, se si ha il coraggio di farsi vedere.|prova:agi+2
mappa|un taccuino delle cisterne|Ogni cisterna ancora piena tra le dune. Vale più dell'oro.|raccolta:14
mappa|uno schema dei collegamenti|Tunnel e condotte sotto le macerie: si viaggia al riparo dalle radiazioni.|indicatore:20 prova:furt+1
mappa|una pianta dei rifugi|Bunker, cantine e container chiusi: si dorme senza sentire il vento radioattivo.|belve:3 indicatore:15
mappa|una carta delle condotte|Le vecchie condotte d'acqua. Alcune ancora gocciolano.|raccolta:8 prova:int+1
trap|un telaio di ferraglia|Molle d'auto e lamiere affilate: scatta con un rumore infernale.|trappola:7 posti:3
trap|un cavo da traino|Teso tra due carcasse d'auto, all'altezza giusta per una moto.|trappola:6
trap|una morsa da officina|Una morsa da banco montata a terra. Chi ci mette il piede non lo toglie.|trappola:8
trap|una rete di metallo|Rete di recinzione arrotolata e tesa: blocca anche i cani.|trappola:3 belve:3
trap|un laccio di recupero|Cavo d'acciaio sfilacciato, nascosto nella sabbia.|trappola:4 posti:1 prova:furt+1
trap|un blocco di portiera|Una portiera d'auto sospesa sopra un passaggio stretto.|trappola:6 posti:3
med|una fascia pulita|Pulita, in un mondo sporco: un piccolo miracolo.|cura:-5 guarisce:malato posti:0
med|un set da sutura|Per le ferite larghe che il deserto non perdona.|cura:15 guarisce:ferito posti:2
med|un rotolo di bende|Bende vecchie, lavate nella sabbia.|cura:0
med|un tampone sterile|Ancora sigillato, del vecchio mondo.|cura:5 posti:0
med|una scorta di garze|Garze e iodio: pochi, ma buoni.|cura:5 guarisce:avvelenato
med|un impacco refrigerante|Il ghiaccio istantaneo vale una fortuna sotto il sole.|cura:-5 energia:15 indicatore:5
amuleto|un dente di ingranaggio|Un dente di ingranaggio levigato dalla sabbia. Gira, come la fortuna.|prova:fort+2
amuleto|un gettone di rame|Un gettone del vecchio mondo: per una telefonata che non si potrà più fare.|morale:5
amuleto|una pietra levigata|Una pietra del fiume che non c'è più.|morale:4 indicatore:5
amuleto|un dado forato|Appeso al collo: ogni giorno è un lancio.|prova:fort+1 prova:cor+1
amuleto|un ciondolo di ceramica|Ceramica di un isolante elettrico. Dicono che respinga le radiazioni. Non è vero, ma aiuta.|indicatore:15
amuleto|un anello di filo|Filo di rame intrecciato: un anello di nozze del deserto.|morale:6
valore|una serie di bulloni|Bulloni della misura giusta per i motori dei convogli.|scambio:2
valore|un filtro di ricambio|Un filtro per maschera nuovo. Respirare vale qualunque prezzo.|scambio:3 indicatore:10
valore|un rotolo di filo di rame|Il rame riparte i motori e le radio.|scambio:2
valore|un pacchetto di fusibili|Fusibili per i generatori dei rifugi.|scambio:2 posti:0
valore|un blocchetto di sale|Conserva la carne e si scambia con tutto.|scambio:3 raccolta:4
valore|un connettore integro|Un connettore che funziona. Nel deserto è una reliquia.|scambio:2 posti:0
ricordo|una cartolina ingiallita|Una città verde, con alberi veri e acqua nelle fontane.|morale:5 prova:cor+1
ricordo|una foto prima del crollo|Una famiglia sorridente davanti a un palazzo che non esiste più.|morale:7
ricordo|un foglio di canzoni|Canzoni che nessuno sa più suonare. Le parole bastano.|morale:5 indicatore:5
ricordo|una lettera di saluto|«Ci vediamo alla cisterna grande». Bisogna arrivarci.|morale:6 prova:res+1
ricordo|un disegno di casa|Una casa con il tetto intero. Un sogno modesto.|morale:6
ricordo|un biglietto di viaggio|Un biglietto del treno per il mare. Mai usato.|morale:5
cibo|delle gallette di miglio|Dure e asciutte: durano più dei predoni.|cibo:5
cibo|dei semi tostati|Un pugno di semi croccanti tra una duna e l'altra.|cibo:-15 energia:10 posti:0
cibo|delle strisce di carne secca|Carne di chissà cosa, salata e seccata al sole. Nutriente.|cibo:15 energia:5
cibo|delle focaccine secche|Cotte su una lamiera rovente.|cibo:5
cibo|delle fette di cactus essiccato|Amare e succose: tolgono la sete per un po'.|cibo:-5 energia:10 indicatore:5 posti:0
cibo|delle noci del deserto|Dure da aprire, ma piene di grasso buono.|cibo:-5 energia:15 posti:0
`;
  D.itemCatalog.liceo = `
arma|un fascicolo di risposte motivate|Ogni risposta con il suo perché: smonta qualunque interrogazione a sorpresa.|forza:1 prova:int+1
arma|un riepilogo delle fonti|Tutte le fonti in una pagina: chi ti contraddice deve citarne di migliori.|forza:0.5 prova:int+1
arma|un prospetto dei contributi|Chi ha fatto cosa nei lavori di gruppo. Spietato e documentato.|forza:1 prova:car+1
arma|un dossier delle revisioni|Ogni versione del compito, con le date. Difficile accusarti di copiare.|forza:0.5 usi:1
arma|un elenco delle correzioni|Gli errori degli altri, in ordine alfabetico.|forza:1.5 prova:emp-1
arma|un quaderno delle verifiche|Tutte le verifiche dell'anno, svolte. Un'arma nucleare da intervallo.|forza:1.5 posti:3
armatura|un registro dei contributi|La prova che hai lavorato anche tu. Blocca le accuse di scaricabarile.|assorbe:6
armatura|un fascicolo di giustificazioni|Firmate dai genitori, tutte in regola. Le assenze non fanno più male.|assorbe:10 posti:3
armatura|un riepilogo delle presenze|Mai un'assenza. Mai un ritardo. Intoccabile.|assorbe:4 indicatore:10
armatura|un archivio delle consegne|Ogni compito consegnato in tempo. Con la ricevuta.|assorbe:8 usi:1
armatura|un quaderno delle fonti|Ogni frase con la sua fonte: nessuno può dire che hai inventato.|assorbe:2 prova:int+1
armatura|un elenco delle conferme|I sì scritti di tutti. Nessuno può tirarsi indietro.|assorbe:-4 prova:car+1 posti:1
attrezzo|una calcolatrice|Scientifica, con i trucchi nascosti in memoria.|prova:int+2
attrezzo|un set di righelli|Righello, squadra e goniometro: il disegno tecnico è salvo.|prova:int+1 prova:sop+1
attrezzo|un astuccio di matite|Matite di ogni durezza. Chi ne presta una si fa un'amica.|prova:car+1 prova:emp+1
attrezzo|un set di evidenziatori|Cinque colori: si ripassa in metà del tempo.|indicatore:15
attrezzo|un compasso|Disegna cerchi perfetti e tiene a distanza chi si siede troppo vicino.|prova:int+1 belve:1
attrezzo|un correttore a nastro|Cancella gli errori. Quasi tutti.|prova:furt+1 usi:0
mappa|una pianta dell’istituto|Ogni aula, ogni scala, ogni bagno senza telecamere.|prova:furt+2
mappa|un calendario dei turni|Chi sorveglia l'intervallo, giorno per giorno.|prova:furt+1 prova:int+1
mappa|un elenco degli sportelli|Gli sportelli di recupero con i professori più buoni.|raccolta:10 prova:int+1
mappa|uno schema delle attività|Club, laboratori e corsi pomeridiani: dove farsi vedere e dove sparire.|prova:car+1 indicatore:10
mappa|un prospetto degli orari|Le ore buche di ogni classe: si sa sempre dove è chi.|prova:int+2
mappa|un indice delle aule|Quali aule restano aperte dopo le lezioni.|belve:2 prova:sop+1
trap|un questionario ambiguo|Ogni risposta è sbagliata. Chi lo compila esce di scena.|trappola:5
trap|un modulo di adesione|Firmato in fretta, ti iscrive a qualcosa che non volevi.|trappola:4 posti:1
trap|un elenco di prenotazioni|Le prenotazioni dell'aula studio. Chi non è in lista, resta fuori.|trappola:6
trap|un invito incompleto|Un invito senza orario: chi ci va, ci va al momento sbagliato.|trappola:3 prova:furt+1 posti:1
trap|un sondaggio di classe|«Chi è il più antipatico?» Un sondaggio anonimo che non resta anonimo.|trappola:7
trap|un foglio di correzioni|Correzioni sbagliate, consegnate con gentilezza.|trappola:4 prova:car+1
med|un fascicolo di recupero|Esercizi di recupero: rimettono in piedi qualunque media.|cura:10
med|un quaderno di ripasso|Ripasso ordinato: dopo una brutta giornata, si riparte.|cura:5 indicatore:5
med|una guida alle correzioni|Spiega ogni errore senza far sentire stupidi.|cura:0 guarisce:malato
med|un riepilogo della lezione|Tutta la lezione in una pagina: chi era assente si salva.|cura:0 posti:0
med|un set di schede di sostegno|Schede di sostegno della psicologa della scuola.|cura:5 morale:6
med|un elenco di esercizi guidati|Passo dopo passo, come con una brava insegnante privata.|cura:15 guarisce:ferito posti:2
amuleto|un portafortuna di rame|Si tocca prima di ogni interrogazione. Funziona sempre, tranne quando no.|prova:fort+2
amuleto|un gettone della gita|Il gettone del pullman della gita. Ricorda che la scuola può essere bella.|morale:5
amuleto|una pietra dipinta|Dipinta con la faccia del professore di latino. Si stringe forte.|indicatore:15
amuleto|un ciondolo di ceramica|Fatto al laboratorio di ceramica in prima. Brutto e preziosissimo.|morale:6
amuleto|un anello di filo|Intrecciato da un'amica durante una noiosissima assemblea.|prova:car+1 morale:3
amuleto|un bottone del vecchio zaino|L'ultimo bottone dello zaino delle medie.|prova:cor+1 morale:2
valore|un buono della cartoleria|Venti euro di cartoleria. Al liceo è potere.|scambio:2 posti:0
valore|un biglietto del cinema|Due ingressi. Ottimo per corrompere o per fare colpo.|scambio:2 posti:0
valore|un voucher della mensa|Un pranzo gratis: si compra quasi tutto.|scambio:3 posti:0
valore|un coupon dei libri usati|Sconto sui libri usati. I fuori sede lo adorano.|scambio:1 posti:0
valore|un buono del bar|Una brioche e un succo. Moneta corrente.|scambio:2 posti:0
valore|un carnet delle fotocopie|Cento fotocopie prepagate: valgono più degli appunti stessi.|scambio:3
ricordo|una foto di classe|La classe al completo in prima. Alcuni non ci sono più. Sono solo cambiati di sezione.|morale:6
ricordo|un biglietto della gita|Gita a Firenze, terzo anno. Nessuno ha visto un museo.|morale:5
ricordo|un disegno del banco|Un disegno fatto sul banco e poi ricalcato su carta, prima che lo cancellassero.|morale:4 prova:cor+1
ricordo|una cartolina del campo estivo|Il campo estivo dove eri popolare. Erano tutti più piccoli.|morale:5 indicatore:5
ricordo|un foglio di dediche|«Resta come sei». Firmato da quindici persone.|morale:8
ricordo|un invito di compleanno|Il compleanno di qualcuno che ti voleva davvero alla festa.|morale:5 prova:car+1
cibo|dei biscotti ai cereali|Quelli della macchinetta: dolci, croccanti, sempre finiti.|cibo:0 energia:8
cibo|delle mandorle|La merenda sana che nessuno vuole. Funziona.|cibo:-10 energia:15 posti:0
cibo|delle gallette di mais|Leggere, rumorose, inutili in classe.|cibo:-10 posti:0
cibo|dei cracker|Il classico pacchetto salato dell'intervallo.|cibo:0
cibo|delle fette di mela secca|Dolci, sane, sembrano caramelle.|cibo:-10 morale:6 posti:0
cibo|dei grissini|Si mangiano di nascosto durante la lezione, con un crac che sente tutta la classe.|cibo:-5 morale:4 posti:0
`;
  D.itemCatalog.ufficio = `
arma|un dossier dei risultati|Numeri, grafici e una conclusione che nessuno può contestare.|forza:1 prova:int+1
arma|un registro delle revisioni|Chi ha cambiato cosa, e quando. La fine di molte carriere.|forza:1 usi:1
arma|un prospetto delle metriche|KPI in verde dove servono e in rosso dove fa comodo.|forza:1.5 prova:car+1
arma|un riepilogo delle approvazioni|Ogni «ok» del Direttore, archiviato. Si vince ogni discussione.|forza:0.5 prova:car+1
arma|un fascicolo delle fonti|Ogni dato con la sua fonte: chi contesta deve portarne di migliori.|forza:0.5 prova:int+1
arma|un elenco dei contributi|Chi ha fatto cosa nel progetto. Senza pietà.|forza:1.5 prova:emp-1 posti:1
armatura|un registro delle conferme|Ogni promessa ricevuta per mail, in ordine. Le colpe rimbalzano.|assorbe:8
armatura|un fascicolo di riscontri|Riscontri positivi dei clienti: difficile licenziare chi è amato.|assorbe:6 prova:car+1
armatura|un riepilogo delle deleghe|Tutto quello che hai delegato: le responsabilità sono di altri.|assorbe:10 prova:emp-1
armatura|un archivio delle consegne|Ogni scadenza rispettata, con la ricevuta di consegna.|assorbe:8 usi:1 posti:3
armatura|un prospetto delle presenze|Mai un giorno di malattia. Intoccabile, e un po' triste.|assorbe:4 prova:res+1
armatura|un elenco delle approvazioni|Le firme di tutti i responsabili. Un muro di carta.|assorbe:12 posti:4 prova:agi-1
attrezzo|una calcolatrice|Con il nastro di carta: fa più rumore, ma convince di più.|prova:int+2
attrezzo|un set di penne|Penne di ogni colore: si firma, si corregge, si presta per farsi amici.|prova:car+1 prova:emp+1
attrezzo|un set di evidenziatori|Si evidenzia tutto, quindi niente. Però calma.|indicatore:15
attrezzo|una cucitrice|Tiene insieme i fogli e, nelle riunioni tese, si stringe per sfogarsi.|indicatore:10 prova:res+1
attrezzo|un perforatore|Buca, archivia, ordina. Il raccoglitore perfetto impressiona tutti.|prova:int+1 prova:sop+1
attrezzo|un righello da tavolo|Righello di metallo: misura, sottolinea, indica dati sullo schermo con autorità.|prova:car+1 usi:0
mappa|una pianta degli uffici|Ogni postazione, ogni stanzino, ogni uscita di sicurezza.|prova:furt+2
mappa|un calendario dei turni|Chi è in ferie, chi in smart working, chi controlla cosa.|prova:int+1 prova:furt+1
mappa|un indice delle sale|Quali sale riunioni sono libere, e quali hanno le pareti sottili.|prova:furt+1 belve:2
mappa|un prospetto degli sportelli|Gli sportelli interni e gli impiegati che sbloccano le pratiche.|raccolta:10
mappa|uno schema delle postazioni|Chi siede vicino a chi: alleanze e rivalità da open space.|prova:car+1 prova:int+1
mappa|un elenco degli orari|Gli orari reali, non quelli ufficiali.|prova:sop+2
trap|un questionario ambiguo|Un sondaggio aziendale a domande trabocchetto.|trappola:5
trap|un invito incompleto|Una riunione «importante» senza sala né orario.|trappola:3 prova:furt+1 posti:1
trap|un modulo di richiesta|Un modulo che, compilato, ti assegna il progetto più odiato.|trappola:6
trap|un foglio di prenotazioni|La sala prenotata a tuo nome, alla stessa ora di quella del Direttore.|trappola:7
trap|un sondaggio interno|Anonimo, dicono. Le risposte arrivano dritte alle risorse umane.|trappola:6 posti:1
trap|una scheda di revisione|Una revisione «costruttiva» con tutti gli errori di un collega.|trappola:4 prova:car+1
med|una guida alle correzioni|Spiega come rimediare a un errore prima che lo veda il capo.|cura:5
med|un fascicolo di supporto|Il materiale del corso di formazione. Rimette in piedi.|cura:5 indicatore:5
med|un riepilogo delle procedure|Le procedure giuste, in una pagina sola.|cura:0 guarisce:malato posti:0
med|un set di schede di recupero|Schede per recuperare un progetto in ritardo.|cura:10
med|un quaderno di affiancamento|Gli appunti del collega più anziano: tutti i trucchi del mestiere.|cura:10 morale:5
med|un elenco di verifiche guidate|Una checklist che salva da ogni disastro.|cura:15 guarisce:ferito posti:2
amuleto|un gettone del primo giorno|Il gettone del caffè del primo giorno di lavoro. Mai usato.|morale:5
amuleto|un ciondolo di rame|Un regalo di un collega andato via. L'unico che ti capiva.|morale:4 indicatore:5
amuleto|una pietra da scrivania|Una pietra zen da scrivania. Fermacarte e ancora di salvezza.|indicatore:15
amuleto|un anello di filo|Intrecciato durante una conference call di tre ore.|prova:res+1 morale:3
amuleto|un bottone del vecchio cappotto|Del cappotto del colloquio. Ha portato fortuna una volta.|prova:fort+2
amuleto|una medaglia del team|«Team dell'anno». Dell'anno scorso.|prova:car+1 prova:cor+1
valore|un buono pasto|Il buono pasto: la vera moneta dell'ufficio.|scambio:2 posti:0
valore|un voucher della libreria|Un regalo aziendale per Natale. Prezioso, se ti piacciono i manuali.|scambio:1 posti:0
valore|un coupon del bar|Due caffè. Basta per comprare il silenzio di un collega.|scambio:2 posti:0
valore|un biglietto del cinema|Il premio di una lotteria interna.|scambio:2 posti:0
valore|un buono della cartoleria|Penne, post-it e cartelline: potere da scrivania.|scambio:1 posti:0
valore|un carnet delle stampe|Stampe a colori prepagate. Il marketing pagherebbe oro.|scambio:3
ricordo|una foto del team|Il team al completo alla cena di Natale. Prima dei tagli.|morale:6
ricordo|un biglietto di benvenuto|«Benvenuta e benvenuto a bordo!», firmato da colleghi che non ci sono più.|morale:4
ricordo|una cartolina delle ferie|Una spiaggia, due settimane di agosto. Torneranno.|morale:6 indicatore:5
ricordo|un foglio di dediche|Le dediche della festa d'addio di una collega. Una dice «resisti».|morale:7
ricordo|un disegno della scrivania|Disegnato da un figlio in visita: la tua scrivania, con un sole sopra.|morale:6 prova:cor+1
ricordo|un invito della vecchia squadra|La cena della vecchia squadra. Erano bei tempi.|morale:5 prova:car+1
cibo|dei cracker integrali|Dal cassetto della scrivania, scorta d'emergenza.|cibo:0
cibo|delle mandorle|Lo snack sano del collega che corre le maratone.|cibo:-10 energia:15 posti:0
cibo|dei biscotti al cacao|Dalla cucina comune. Si dovrebbe chiedere. Nessuno chiede.|cibo:0 morale:6
cibo|delle gallette|Leggere: un pranzo da scrivania davanti a un foglio Excel.|cibo:-10 posti:0
cibo|dei grissini|Avanzati da una riunione con catering.|cibo:-5 morale:3 posti:0
cibo|delle fette di frutta secca|Dalla macchinetta del secondo piano, l'unica che funziona.|cibo:-10 energia:8 posti:0
`;
})(typeof window === 'object' ? window : globalThis);
