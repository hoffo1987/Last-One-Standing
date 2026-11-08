/* Catalogo degli oggetti: Arena Classica, Reame Incantato, Stazione Orbitale.
 * tipo|nome|descrizione|effetti (vedi _oggetti.js). cura, cibo e assorbe sono in più o in meno rispetto al normale. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.itemCatalog = D.itemCatalog || {};
  D.itemCatalog.classico = `
arma|un coltello da campo|Lama corta e onesta: taglia corde, pane e rami per il riparo. Non vince le battaglie, ma aiuta a sopravvivere.|forza:-0.5 posti:1 raccolta:8 prova:sop+1
arma|una mazza corta|Un bastone nodoso con la testa cerchiata di ferro. Brutta, rumorosa, convincente.|forza:0.5 prova:for+1
arma|una lancia da caccia|Lunga quanto un uomo: tiene a distanza chiunque, lupi compresi.|forza:0.5 belve:3 posti:3 raccolta:5
arma|un pugnale da cintura|Si nasconde nella manica e colpisce prima che l'altro capisca.|forza:-0.5 posti:1 prova:furt+2
arma|una falce corta|Nata per il grano, adattata alla gara. Nel Campo di grano è a casa sua.|raccolta:10 prova:agi+1
arma|una scure da legna|Pesante, lenta e devastante. Taglia anche la legna per il fuoco, che di notte conta.|forza:1.5 posti:3 indicatore:10 prova:agi-1
armatura|un corpetto di cuoio|Cuoio indurito, cucito a mano. Protegge il busto senza rallentare.|assorbe:2 prova:agi+1
armatura|un giubbotto di tela pesante|Tela grossa e imbottitura di lana: contro i colpi fa poco, contro il freddo moltissimo.|assorbe:-8 indicatore:30 posti:2
armatura|una protezione di corteccia|Strati di corteccia legati con il giunco. Mimetica nel Bosco, scomoda ovunque.|assorbe:-5 prova:furt+2 posti:2
armatura|uno scudo di vimini|Intrecciato in fretta, para i fendenti e regge due o tre frecce prima di cedere.|assorbe:10 usi:-1 posti:3
armatura|un mantello imbottito|Un mantello pesante che fa da coperta di notte e da armatura di giorno.|assorbe:-6 indicatore:35 morale:0 posti:2
armatura|un parabraccio da caccia|Protegge solo l'avambraccio, ma è quello che si alza per difendersi.|assorbe:-12 prova:for+1 posti:1
attrezzo|un set di punteruoli|Bucano cuoio, legno e lacci delle trappole altrui.|prova:furt+1 prova:int+1
attrezzo|una pinza da campo|Stringe, piega, strappa: ripara armi e smonta trappole senza perdere le dita.|prova:agi+1 prova:int+1
attrezzo|un acciarino|Una scintilla vuol dire fuoco, e il fuoco vuol dire sopravvivere alla notte.|indicatore:25 belve:2 prova:sop+1
attrezzo|un rocchetto di filo|Filo resistente: ricuce vestiti, lega trappole, tiene insieme un riparo.|prova:sop+1 raccolta:5
attrezzo|un set di aghi|Aghi da cucito e da sutura. Un taglio chiuso bene è un taglio che non si infetta.|prova:emp+2
attrezzo|una pietra per affilare|Ogni lama torna come nuova. Le armi durano di più.|prova:for+1 usi:0
mappa|una carta dei dislivelli|Le pendenze dell'arena, una per una: si sceglie il sentiero meno faticoso.|prova:sop+2 prova:agi+1
mappa|uno schema dei guadi|Dove il Fiume si passa a piedi asciutti e dove ti porta via.|prova:sop+2 raccolta:5
mappa|un taccuino dei sentieri|Sentieri, scorciatoie e vicoli ciechi annotati da qualcuno che non ce l'ha fatta.|prova:int+2 prova:agi+1
mappa|una pianta dei ripari|Grotte, cavità e radici cave segnate con cura: si dorme meglio, e al caldo.|belve:3 indicatore:10
mappa|un rilievo delle sorgenti|Ogni sorgente pulita dell'arena. L'acqua giusta vale più di una spada.|raccolta:12 prova:sop+1
mappa|una carta dei terreni|Fango, roccia, sabbia: dove si corre e dove si sprofonda.|prova:agi+2
trap|un laccio da cattura|Un cappio nascosto tra le foglie: prende conigli, e a volte caviglie.|trappola:2 raccolta:8 posti:1
trap|una gabbia pieghevole|Si monta in un minuto, si chiude in un secondo.|trappola:4
trap|un telaio di rami|Rami tesi pronti a scattare: chi passa se ne accorge troppo tardi.|trappola:6 posti:3
trap|un blocco di legno|Un tronco sospeso sopra il sentiero. Semplice, antico, efficace.|trappola:8 posti:3
trap|una rete da presa|Una rete tesa tra due alberi: chi ci finisce dentro non si muove più.|trappola:3 belve:2
trap|un arco da trappola|Un arco teso con un filo d'inciampo. Spara da solo, di notte.|trappola:7 prova:furt+1
med|un rotolo di bende|Bende pulite: fermano il sangue e la paura.|cura:-5
med|una scorta di garze|Tante garze sottili, buone per medicare più volte una ferita brutta.|cura:5
med|un set da medicazione|Forbici, garze e disinfettante in una scatola: il kit di chi sa cosa fa.|cura:10 guarisce:malato
med|una fascia pulita|Una fascia sola, ma pulita, e stretta al punto giusto.|cura:-8 posti:0
med|un impacco lenitivo|Erbe pestate e acqua fredda: toglie il gonfiore e il veleno superficiale.|guarisce:avvelenato
med|un tampone sterile|Piccolo, sigillato, perfetto per le ferite profonde.|cura:5 guarisce:ferito posti:0
amuleto|un dente intagliato|Il dente di un animale che non ce l'ha fatta. Ricorda a chi lo porta che lui invece sì.|prova:cor+1 morale:3
amuleto|una pietra levigata|Liscia come un uovo, calda in tasca. Si stringe quando le mani tremano.|morale:5
amuleto|un ciondolo di legno|Inciso con il simbolo del distretto. Il pubblico lo riconosce e applaude.|prova:car+1 morale:2
amuleto|un disco di osso|Bucato al centro e appeso al collo. Dicono porti fortuna nelle prove.|prova:fort+2
amuleto|un anello di corda|Intrecciato da qualcuno a casa, prima della partenza.|morale:6
amuleto|un bottone di rame|Un bottone e basta. Ma è il bottone giusto.|prova:fort+1 indicatore:5
valore|una manciata di chiodi|Pochi chiodi, ma nell'arena tutti hanno qualcosa da inchiodare.|scambio:1
valore|un rotolo di filo metallico|Fil di ferro sottile: chi costruisce trappole lo paga bene.|scambio:2 prova:int+1
valore|una moneta del distretto|Fuori vale poco, qui vale una cena. A volte due.|scambio:2 posti:0
valore|un fermaglio di ottone|Lucido e inutile. Proprio per questo qualcuno lo vuole.|scambio:1 posti:0
valore|un blocchetto di sale|Conserva il cibo e si scambia con tutto. Il sale è sempre stato moneta.|scambio:3 raccolta:4
valore|un pacchetto di aghi|Aghi buoni, merce rara: chi ha ferite da cucire li paga cari.|scambio:2 prova:emp+1
ricordo|un ritratto piegato|Un volto di casa, piegato in quattro. Si guarda solo quando nessuno vede.|morale:6
ricordo|un foglio di canzoni|Le parole di una canzone del distretto. Cantarla a bassa voce fa passare la notte.|morale:5 indicatore:5
ricordo|un biglietto di saluto|«Torna», c'è scritto. Solo questo.|morale:7
ricordo|una cartolina del distretto|Una piazza qualunque, con il sole. Promette che il mondo esiste ancora.|morale:4 prova:cor+1
ricordo|un disegno a carbone|Lo ha fatto un fratello piccolo. Non si capisce cosa sia, ed è perfetto.|morale:6
ricordo|un cartoncino di auguri|Auguri per un compleanno che arriverà durante i giochi.|morale:4 prova:res+1
cibo|del pane secco|Duro come il legno, ma riempie lo stomaco.|cibo:0
cibo|delle noci sgusciate|Poche, pesanti di energia. Un pugno basta per una giornata di cammino.|cibo:-10 energia:15 posti:0
cibo|delle gallette di avena|Sapore di niente, ma si conservano per sempre.|cibo:5
cibo|delle fette di mela essiccata|Dolci e leggere: fanno tornare il buon umore.|cibo:-10 morale:8 posti:0
cibo|del pesce secco|Salato e nutriente: il pasto vero di chi vive al Fiume.|cibo:15
cibo|dei semi tostati|Si sgranocchiano camminando, senza fermarsi.|cibo:-15 energia:10 posti:0
`;
  D.itemCatalog.fantasy = `
arma|una daga dei giuramenti|Chi la impugna ha giurato qualcosa. La lama sembra ricordarlo.|forza:0 posti:1 prova:cor+1 prova:furt+1
arma|un martello nanico|Forgiato per spaccare montagne. Le teste sono più facili.|forza:1.5 posti:3 prova:for+1 prova:agi-1
arma|una spada da viaggio|Equilibrata e affidabile: la spada dei cavalieri senza nome.|forza:1 usi:1
arma|una lancia silvana|Leggera come un ramo, lunga abbastanza da tenere lontano un lupo mannaro.|forza:0.5 belve:4 posti:3
arma|un falcetto d’argento|Taglia le erbe magiche e ferisce ciò che di notte non dovrebbe camminare.|belve:3 raccolta:8 posti:1
arma|una mazza di quercia|Un ramo di quercia antica: dicono che gli spiriti del bosco non la attacchino.|forza:0.5 indicatore:10
armatura|un corpetto di scaglie|Scaglie di drago, o di un pesce molto grosso. Rimbalzano tutto.|assorbe:10 posti:3
armatura|un mantello di feltro|Caldo, scuro, perfetto per sparire nella Foresta.|assorbe:-8 prova:furt+2 posti:2
armatura|uno scudo di salice|Il salice si piega senza spezzarsi. Lo scudo pure, fino a un certo punto.|assorbe:8 usi:1
armatura|un giaco di cuoio|Cuoio borchiato da mercenario: protegge senza fare rumore.|assorbe:3
armatura|una protezione di sughero|Leggerissima e galleggia. Nel lago incantato è una benedizione.|assorbe:-10 prova:agi+2 posti:1
armatura|un parabraccio di bronzo|Inciso con rune che deviano le maledizioni minori.|assorbe:-10 indicatore:15 posti:1
attrezzo|un punteruolo nanico|Apre serrature, scrigni e crepe nella roccia.|prova:furt+2
attrezzo|un bulino da rune|Incide rune di protezione su qualunque cosa. Funzionano a metà, ma funzionano.|indicatore:20 prova:int+1
attrezzo|un set di aghi d’osso|Per cucire ferite e mantelli. Gli elfi dicono che l'osso non infetta.|prova:emp+2
attrezzo|una pinza da forgia|Toglie frecce, piega metallo, ripara armi bollenti.|prova:for+1 prova:int+1
attrezzo|un pestello di pietra|Pesta erbe, radici e semi: dal bosco tira fuori cibo e unguenti.|raccolta:10 prova:sop+1
attrezzo|un acciarino di selce|Fuoco in ogni stagione: tiene lontani lupi e spiriti.|belve:3 indicatore:10
mappa|una pergamena dei sentieri|Sentieri che cambiano con la luna, segnati da un druido paziente.|prova:sop+2 prova:int+1
mappa|un rilievo delle vene minerali|Dove la roccia è cava, dove l'acqua scorre sotto terra.|prova:int+2 raccolta:5
mappa|un codice dei guadi|Quali guadi sono sicuri e quali hanno qualcosa che vive sul fondo.|prova:agi+1 belve:2
mappa|una carta dei dislivelli|Colline e burroni del reame, con le salite più dolci.|prova:sop+2
mappa|un rotolo dei passaggi|Passaggi segreti tra le rovine: chi lo legge appare dove nessuno se lo aspetta.|prova:furt+2 prova:agi+1
mappa|una tavola dei ripari|Grotte, alberi cavi e cerchi di pietre dove la magia oscura non entra.|belve:3 indicatore:15
trap|un cerchio di radici|Radici che si stringono attorno alle caviglie. Vive, e affamate.|trappola:5
trap|una gabbia di salice|Si intreccia in un'ora e trattiene anche le bestie del bosco.|trappola:3 belve:2
trap|un telaio runico|Un telaio inciso di rune: chi lo calpesta resta a terra, stordito.|trappola:6 indicatore:5
trap|un sigillo di presa|Un sigillo disegnato a terra. Chi ci passa sopra sente il pavimento afferrarlo.|trappola:7 posti:1
trap|una rete di corda|Corda elfica, sottile e indistruttibile.|trappola:3 raccolta:5
trap|un arco di frassino|Un arco teso tra due tronchi, pronto a scoccare su chi inciampa.|trappola:8 posti:3
med|un impacco di erbe|Erbe del sottobosco: fermano la febbre prima che arrivi.|guarisce:malato cura:-5
med|una scorta di bende di lino|Lino bianco, tanto e pulito.|cura:5
med|un vasetto di unguento|Unguento di guaritrice: chiude le ferite e toglie il veleno dei serpenti.|guarisce:avvelenato cura:5 posti:0
med|un set da cerusico|Strumenti da barbiere-chirurgo. Fanno paura, ma salvano.|cura:15 guarisce:ferito posti:2
med|una fascia benedetta|Benedetta da un eremita. Cura come una fascia normale, ma consola di più.|cura:0 morale:6
med|un tampone di muschio pulito|Muschio che assorbe il sangue e tiene lontane le infezioni.|guarisce:malato posti:0
amuleto|un sigillo del pellegrino|Lo portano i viandanti che vogliono tornare a casa. Funziona sulle gambe stanche.|prova:res+1 morale:3
amuleto|una runa di rame|Una runa di protezione: la corruzione del reame fatica ad attecchire.|indicatore:20
amuleto|un anello di nocciolo|Il nocciolo trova l'acqua e, dicono, anche la strada giusta.|raccolta:6 prova:fort+1
amuleto|un ciondolo lunare|Brilla debolmente quando la luna è alta. Al buio aiuta.|belve:2 morale:3
amuleto|un disco di madreperla|Riflette gli incantesimi minori. E la luce, quando serve un segnale.|indicatore:10 prova:fort+1
amuleto|una pietra del giuramento|Chi giura su questa pietra non può mentire senza sentirne il peso.|prova:car+2
valore|un frammento d’ambra|Un insetto antico dentro l'ambra. I collezionisti del reame impazziscono.|scambio:3 posti:0
valore|un lingottino di rame|Metallo grezzo, buono per qualunque fabbro.|scambio:2
valore|una perla di fiume|Rara, piccola, perfetta. Qualcuno ci baratterebbe una spada.|scambio:3 posti:0
valore|un pacchetto di spezie|Pepe e cannella: nel reame valgono più dell'oro.|scambio:2 morale:2
valore|un cristallo da taglio|Taglia il vetro e affascina i maghi.|scambio:2 prova:int+1
valore|una moneta del reame|Una moneta con il volto di un re dimenticato.|scambio:1 posti:0
ricordo|un foglio di ballata|Una ballata di eroi che vincono sempre. Leggerla aiuta a crederci.|morale:5 prova:cor+1
ricordo|un ritratto in miniatura|Dipinto su un ovale di legno: un volto caro, piccolissimo.|morale:6
ricordo|una lettera del villaggio|Tutto il villaggio ha firmato. Anche il fabbro, che non sa scrivere.|morale:7
ricordo|una pagina di fiaba|La pagina dove il drago perde. È stata strappata apposta.|morale:4 indicatore:5
ricordo|un disegno del focolare|Il camino di casa, con il fuoco acceso.|morale:5 indicatore:5
ricordo|un biglietto del raccolto|L'invito alla festa del raccolto. Bisogna tornare in tempo.|morale:4 prova:res+1
cibo|del pane di segale|Scuro, pesante, saziante: pane da viandante.|cibo:10
cibo|delle nocciole tostate|Un pugno di nocciole e si cammina fino a sera.|cibo:-10 energia:15 posti:0
cibo|delle mele essiccate|Dolci come la fine dell'estate.|cibo:-10 morale:8 posti:0
cibo|delle focaccine d’avena|Cotte su una pietra calda da qualcuno che ci voleva bene.|cibo:5 morale:3
cibo|delle bacche candite|Zucchero e bacche: energia immediata per scappare.|cibo:-15 energia:20 posti:0
cibo|dei semi di zucca|Si sgranocchiano di nascosto durante le guardie.|cibo:-15 energia:8 posti:0
`;
  D.itemCatalog.scifi = `
arma|una lama di servizio|La lama per tagliare cavi e guarnizioni. In emergenza, anche altro.|forza:-0.5 posti:1 prova:int+1
arma|un bastone a impulsi|Una scarica stordisce chiunque, droni compresi.|forza:0.5 belve:3
arma|una pistola a scarica|Spara energia, non proiettili: niente buchi nello scafo.|forza:1 usi:-1 posti:1 prova:agi+1
arma|un perforatore portatile|Nato per forare paratie. Forare persone è molto più facile.|forza:1.5 posti:3 prova:agi-1
arma|una lancia da abbordaggio|Lunga e magnetica: si aggancia alle pareti in assenza di gravità.|forza:0.5 prova:agi+2 posti:3
arma|un taglierino ceramico|Non viene rilevato dagli scanner. Nessuno sa che ce l'hai.|forza:-0.5 posti:1 prova:furt+2
armatura|un corpetto da manutenzione|Imbottito e pieno di tasche: protegge e porta gli attrezzi.|assorbe:2 prova:int+1
armatura|una pettorina isolante|Isola dal freddo dello scafo e dalle scariche dei cavi.|assorbe:-4 indicatore:15
armatura|uno schermo portatile|Uno scudo trasparente della sicurezza di bordo.|assorbe:12 posti:3 usi:-1
armatura|un giubbotto da attracco|Rinforzato e con riserva d'aria: utile quando le paratie cedono.|assorbe:2 indicatore:25 posti:3
armatura|una protezione da saldatura|Resiste al calore e alle schegge. Pesante come un rimprovero.|assorbe:8 posti:4 prova:agi-1
armatura|un parabraccio composito|Fibra e ceramica sull'avambraccio: para le lame di servizio.|assorbe:-10 prova:for+1 posti:1
attrezzo|un multimetro|Dice quale cavo è vivo e quale no. Salva più vite di un medico.|prova:int+2
attrezzo|un set di sonde|Sonde per leggere l'aria: l'ossigeno buono si trova prima.|indicatore:20 prova:sop+1
attrezzo|una pinza isolata|Si toccano i cavi senza diventare un cavo.|prova:agi+1 prova:int+1
attrezzo|un attrezzo multifunzione|Venti attrezzi in uno: nessuno davvero buono, tutti utili.|prova:int+1 prova:sop+1 raccolta:4
attrezzo|un set di chiavi magnetiche|Aprono le cabine di servizio. A volte anche quelle degli altri.|prova:furt+2
attrezzo|un estrattore di fusibili|Toglie la corrente a una trappola o a un intero corridoio.|prova:int+1 belve:2
mappa|uno schema delle paratie|Quali paratie reggono e quali cedono alla prima scossa.|prova:sop+2 indicatore:10
mappa|una pianta dei moduli|Ogni modulo della stazione, con le scorciatoie di servizio.|prova:agi+1 prova:int+1
mappa|un rilievo delle condotte|Le condotte d'aerazione: strade segrete per chi è abbastanza piccolo.|prova:furt+2
mappa|una carta dei circuiti|Dove passa la corrente, e quindi dove fa caldo e c'è luce.|prova:int+2
mappa|un registro dei vani|I vani di stoccaggio ancora pieni, con i codici di apertura.|raccolta:12
mappa|un atlante dei settori|L'intera stazione in un tablet a pezzi.|prova:int+1 prova:sop+1
trap|un telaio elettromagnetico|Un campo magnetico che incolla al pavimento chi indossa metallo.|trappola:5
trap|una rete di contenimento|Una rete della sicurezza: avvolge e immobilizza in un secondo.|trappola:4 belve:2
trap|un fermo di sicurezza|Blocca una porta scorrevole proprio quando qualcuno ci passa.|trappola:7
trap|un cavo da arresto|Teso a mezz'altezza in un corridoio buio.|trappola:6 posti:1
trap|un blocco di paratia|Chiude un modulo intero: chi resta dentro ha un problema d'aria.|trappola:8 posti:3 indicatore:5
trap|una morsa di servizio|Pensata per i pezzi di ricambio, funziona benissimo sulle caviglie.|trappola:5
med|un set di garze sintetiche|Garze che si sciolgono da sole quando la ferita è chiusa.|cura:5
med|un rotolo di bende sterili|Sterili, sigillate, standard di bordo.|cura:0 guarisce:malato
med|un impacco refrigerante|Freddo istantaneo: sgonfia, calma, toglie il dolore.|cura:-5 energia:10
med|un set da sutura|Ago, filo e una spillatrice cutanea. Non è carino, ma chiude tutto.|cura:15 guarisce:ferito posti:2
med|una fascia emostatica|Ferma un'emorragia in pochi secondi.|cura:10 posti:0
med|un tampone medico|Con antidoto ad ampio spettro: neutralizza i veleni più comuni.|guarisce:avvelenato posti:0
amuleto|un gettone della prima missione|Lo davano ai cadetti. Chi lo porta sa di aver già superato un lancio.|prova:cor+1 morale:3
amuleto|un disco di rame|Un disco di rame lucidato. Riflette la luce delle stelle.|morale:4 prova:fort+1
amuleto|un frammento di wafer|Un pezzo del primo processore di bordo. Gli ingegneri lo toccano prima di ogni riparazione.|prova:int+1 prova:fort+1
amuleto|un ciondolo orbitale|La forma della stazione, in miniatura. Calma il respiro.|indicatore:15
amuleto|un anello di ceramica|Ceramica da scudo termico. Ha resistito al rientro: resisterà anche a te.|prova:res+1 morale:2
amuleto|un sigillo della navetta|Il sigillo della navetta che ti ha portato qui. Speri ti riporti indietro.|morale:6
valore|un modulo di memoria|Pieno di dati che nessuno sa leggere. Tutti però lo vogliono.|scambio:3 posti:0
valore|un pacchetto di connettori|Connettori di ricambio: senza, le riparazioni si fermano.|scambio:2 prova:int+1
valore|una bobina di conduttore|Rame purissimo: ci si fa tutto, anche le trappole.|scambio:2
valore|un sensore di ricambio|Un sensore nuovo vale un giorno di ossigeno.|scambio:3
valore|una serie di fusibili|Piccoli, leggeri, indispensabili.|scambio:2 posti:0
valore|un disco di calibrazione|Serve a tarare gli strumenti. Chi ripara paga qualunque cifra.|scambio:2
ricordo|una stampa della Terra|La Terra vista da qui: azzurra, lontana, vera.|morale:7
ricordo|una cartolina del primo lancio|Il razzo che parte, la folla che applaude. Allora era tutto più semplice.|morale:5 prova:cor+1
ricordo|un ritratto su pellicola|Pellicola vera, non digitale: un volto che non si cancella.|morale:6
ricordo|un foglio di musica|Lo spartito di una ninnananna. Canticchiarla rallenta il respiro.|morale:4 indicatore:10
ricordo|una foto di equipaggio|L'equipaggio di un'altra missione, tutti tornati a casa.|morale:5 prova:res+1
ricordo|un messaggio stampato|«Ti aspettiamo all'atterraggio». Inviato prima che i contatti si interrompessero.|morale:7
cibo|delle cialde proteiche|Sanno di cartone salato. Nutrono come una bistecca.|cibo:10 energia:5
cibo|delle barrette di alghe|Verdi, amare, piene di energia.|cibo:-5 energia:15 posti:0
cibo|dei cracker liofilizzati|Leggerissimi finché non si bevono un po' d'acqua.|cibo:0 posti:0
cibo|dei cubetti di frutta secca|L'unica cosa dolce della stazione.|cibo:-10 morale:10 posti:0
cibo|delle gallette nutrienti|Razione standard: niente gusto, tutta sostanza.|cibo:15
cibo|dei semi idroponici tostati|Coltivati in serra, tostati sul reattore. Croccanti.|cibo:-10 energia:10 posti:0
`;
})(typeof window === 'object' ? window : globalThis);
