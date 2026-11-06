/* Situazioni locali: zona | titolo | elemento | avvertimento | esito fatale
 * | esito negativo | reazione sicura. Le zone sono gli indici del replay.
 * I sette campi sono testi editoriali, mai codice eseguito. */
(function(G){
  const D=G.LOS_DATA;
  D.worldScenes={
    classico:`
0|Contrappesi liberi|il verricello delle casse|Il freno del verricello salta e i contrappesi oscillano.|resta sotto il contrappeso e perde la vita|si ferisce alla spalla contro la cassa|si abbassa dietro il basamento del verricello
0|Lame tra i rifornimenti|la rastrelliera centrale|Una rastrelliera si inclina verso il passaggio.|viene travolt[A:o/a] dalle lame e perde la vita|si taglia cercando di fermare la rastrelliera|si tiene fuori dalla traiettoria delle lame
0|Pedana sfaldata|la pedana delle provviste|Il legno della pedana si apre tra le assi.|precipita sotto la pedana e non sopravvive|si ferisce una gamba tra le assi|distribuisce il peso sulle travi ancora ferme
0|Cavi in tensione|il tendone dei rifornimenti|Un tirante del tendone si spezza con uno schiocco.|viene colpit[A:o/a] al collo dal cavo e perde la vita|si ferisce al braccio contro il tirante|si ripara sul lato opposto del palo
0|Braci nel deposito|il braciere del punto di distribuzione|Le braci rotolano verso un mucchio di teli asciutti.|resta nel fumo e non sopravvive all'incendio|si ustiona cercando di spostare i teli|soffoca le prime braci con la terra
1|Rami sotto carico|il faggio spaccato|La chioma del faggio scricchiola sopra il sentiero.|viene schiacciat[A:o/a] dal ramo principale|si ferisce sotto una pioggia di rami|resta oltre la proiezione della chioma
1|Laccio dimenticato|il laccio tra le felci|Un laccio teso si confonde con le radici.|resta sospes[A:o/a] nel cappio e soffoca|si ferisce una caviglia nel laccio|blocca il cappio con un ramo caduto
1|Fossa coperta|il letto di foglie secche|Le foglie nascondono il bordo di una vecchia fossa.|cade sulla palizzata della fossa e perde la vita|si ferisce scivolando sul bordo|sonda il terreno prima di caricarci il peso
1|Resina incendiata|il tronco resinoso|La resina prende fuoco e gocciola sul terreno.|resta tra le fiamme e non sopravvive|riporta ustioni sulle mani|resta dalla parte libera del tronco
1|Nido disturbato|il nido nel tronco cavo|Dal legno cavo esce un ronzio sempre più forte.|subisce troppe punture e non sopravvive|si ferisce il viso nel tentativo di coprirsi|protegge il volto e lascia indisturbato il nido
2|Guado in cedimento|il guado di pietre|Le pietre del guado si spostano sotto la corrente.|finisce tra le rocce sommerse e annega|si ferisce contro una pietra del guado|si ferma sulla sponda prima di entrare in acqua
2|Chiusa a scatti|la chiusa laterale|La paratia della chiusa si apre a scatti.|viene trascinat[A:o/a] nella chiusa e annega|si ferisce al corrimano della chiusa|si tiene sopra il segno della piena
2|Riva scavata|la riva sotto le radici|Il terreno sotto le radici si stacca in blocchi.|sprofonda sotto la riva e annega|si ferisce scivolando sull'argine|rimane sul tratto compatto dell'argine
2|Lenze abbandonate|il pontile dei pescatori|Le vecchie lenze si tendono sotto il pontile.|resta impigliat[A:o/a] sott'acqua e annega|si ferisce liberando il polso da una lenza|controlla le lenze senza sporgersi dal pontile
2|Mulinello di piena|la conca del mulinello|La corrente gira sopra una conca più profonda.|viene trascinat[A:o/a] sul fondo e annega|si ferisce aggrappandosi alle rocce|resta sul margine asciutto della conca
3|Crosta di torba|la crosta di torba|La torba si apre sotto una superficie apparentemente asciutta.|sprofonda nel fango e soffoca|si ferisce tentando di liberare una gamba|saggia la torba con un ramo prima di avanzare
3|Vasche sommerse|la passerella marcia|La passerella si piega sopra le vasche fangose.|cade nella vasca e non riesce a riemergere|si ferisce una mano sulle assi spezzate|resta sulla sezione sostenuta dai pali
3|Gas tra i canneti|la sacca di gas del canneto|Bolle scure rompono la superficie del fango.|respira il gas concentrato e perde la vita|si ferisce contro le canne cercando aria|resta sopra il livello della sacca
3|Reticolo di radici|le radici affioranti|Una radice mobile stringe il bordo del passaggio.|resta bloccat[A:o/a] sotto il fango e soffoca|si ferisce liberandosi dalle radici|controlla gli appoggi senza entrare nella pozza
3|Scavo invaso|la trincea allagata|L'acqua riempie una trincea nascosta tra le erbe.|cade nella trincea e annega|si ferisce sul bordo dello scavo|riconosce il bordo dalla diversa inclinazione delle erbe
4|Architrave incrinato|l'architrave della sala|Polvere chiara cade da una crepa nell'architrave.|viene schiacciat[A:o/a] dall'architrave|si ferisce sotto i calcinacci|rimane accanto al tratto di muro ancora integro
4|Scala senza appoggio|la scala delle rovine|L'ultimo sostegno della scala si sgretola.|precipita insieme alla scala e perde la vita|si ferisce sulle pietre della scala|evita i gradini senza sostegno
4|Pozzo mascherato|il pozzo sotto le macerie|Un'apertura nera compare tra le macerie.|cade nel pozzo e non sopravvive|si ferisce scivolando sulle macerie|segnala il bordo senza avvicinarsi all'apertura
4|Muro a vela|il muro isolato|Il muro isolato oscilla a ogni raffica.|viene sepolt[A:o/a] dal muro in crollo|si ferisce al riparo dalle prime pietre|rimane fuori dall'ombra del muro
4|Grata arrugginita|la grata del sotterraneo|I perni della grata cedono uno dopo l'altro.|resta schiacciat[A:o/a] dalla grata|si ferisce contro il metallo arrugginito|blocca il battente contro il muro laterale
5|Lastra sul vuoto|la lastra sporgente|Una crepa attraversa la pietra sul bordo.|precipita con la lastra e perde la vita|si ferisce ritirandosi dal bordo|rimane dietro la linea della crepa
5|Ghiaia mobile|il pendio di ghiaia|La ghiaia comincia a scorrere sotto una pietra piatta.|scivola oltre il pendio e non sopravvive|si ferisce trascinando le mani sulla ghiaia|si tiene sul tratto di roccia compatta
5|Pali spezzati|il segnale di quota|Un palo spezzato rotola lungo il pendio.|viene travolt[A:o/a] e precipita|si ferisce contro il palo|si mette a lato della linea di caduta
5|Riparo di lastre|il riparo di pietra|La lastra del tetto scivola dai sostegni.|resta schiacciat[A:o/a] sotto il tetto|si ferisce al bordo della lastra|controlla i sostegni restando fuori dal riparo
5|Fulmini sul crinale|il parafulmine abbandonato|Il parafulmine vibra mentre l'aria si carica.|viene colpit[A:o/a] dalla scarica e perde la vita|si ferisce cadendo durante la scarica|resta lontan[A:o/a] dal sostegno metallico
`,
    fantasy:`
0|Campana senza freno|la campana della Torre|La campana oscilla anche se nessuno la tocca.|viene schiacciat[A:o/a] dal bronzo della campana|si ferisce alla corda della campana|si tiene fuori dall'arco del bronzo
0|Gradini di cenere|la scala della Torre|I gradini diventano cenere a partire dal bordo.|precipita nel vano della scala e perde la vita|si ferisce sui gradini ancora solidi|poggia i piedi soltanto sulle alzate di pietra
0|Armatura animata|l'armatura del pianerottolo|Una visiera vuota si gira verso il passaggio.|viene trafitt[A:o/a] dall'armatura incantata|si ferisce contro un guanto di metallo|resta oltre la portata dei guanti
0|Arazzo avvolgente|l'arazzo dei sovrani|Le frange dell'arazzo cercano qualcosa da stringere.|viene soffocat[A:o/a] tra le pieghe dell'arazzo|si ferisce liberandosi dalle frange|ferma le frange sotto una pietra
1|Quercia affamata|la quercia dai nodi rossi|La corteccia si apre mostrando denti di legno.|viene divorat[A:o/a] dalla quercia|si ferisce contro una radice|resta fuori dal cerchio delle radici
1|Rovi di vetro|la siepe di cristallo|I rovi trasparenti crescono verso il sentiero.|viene trapassat[A:o/a] dai rovi e perde la vita|si taglia contro una punta di cristallo|resta sul tratto sgombro della radura
1|Coro delle spore|il cerchio delle spore|I funghi emettono una nota che invita ad avvicinarsi.|respira le spore e non si risveglia più|si ferisce cadendo tra i funghi|si copre il volto e non entra nel cerchio
1|Radici in marcia|il ponte di radici|Le radici cambiano intreccio mentre sostengono il passaggio.|resta stritolat[A:o/a] tra le radici|si ferisce il polso nell'intreccio|aspetta che le radici smettano di muoversi
1|Linfa ardente|il ceppo di linfa azzurra|Dalla corteccia cola una linfa che fuma.|viene avvolt[A:o/a] dalla linfa e perde la vita|si ustiona contro il ceppo|rimane oltre la pozza di linfa
2|Veli del lago|il velo d'acqua sospeso|Un velo d'acqua si alza senza vento.|resta imprigionat[A:o/a] nel velo e annega|si ferisce contro il bordo della riva|rimane dietro le pietre asciutte
2|Specchio profondo|il riflesso senza fondo|Un riflesso mostra un appoggio che non esiste.|cade nell'acqua profonda e annega|si ferisce aggrappandosi alla riva|controlla gli appoggi senza seguire il riflesso
2|Corde delle ninfe|le corde del molo|Le corde si stringono come dita bagnate.|viene trascinat[A:o/a] sott'acqua dalle corde|si ferisce liberando una caviglia|tiene i piedi lontani dalle corde
2|Ghiaccio delle lune|la lastra di ghiaccio viola|Una lastra di ghiaccio cresce sulla riva.|scivola sotto il ghiaccio e annega|si ferisce contro il ghiaccio|rimane sopra la linea asciutta della riva
3|Carrello stregato|il carrello delle rune|Il carrello corre sui binari senza essere spinto.|viene travolt[A:o/a] dal carrello|si ferisce contro un binario|resta nella nicchia laterale
3|Cristalli risonanti|la vena di cristallo|Una nota sottile fa vibrare la parete.|viene trafitt[A:o/a] dalle schegge di cristallo|si taglia contro una scheggia|si ripara dietro il pilastro di pietra
3|Mantice dei nani|il mantice abbandonato|Il mantice soffia cenere rovente dalla bocca della forgia.|resta nel getto e perde la vita|si ustiona al bordo della forgia|rimane sul lato freddo della forgia
3|Soffitto di sale|il soffitto di sale nero|Il sale cade in frammenti sempre più grossi.|viene sepolt[A:o/a] dal crollo|si ferisce sotto i frammenti|si tiene accanto alla parete portante
4|Voci sotto la torba|la pozza delle voci|Dalla pozza arriva una voce che chiama aiuto.|sprofonda nella pozza e soffoca|si ferisce liberandosi dal fango|controlla il fondo restando sulla sponda
4|Serpe di fango|la tana della serpe|Il fango si muove controcorrente verso la sponda.|viene stritolat[A:o/a] dalla serpe|si ferisce contro una scaglia|resta oltre i segni lasciati dalla coda
4|Lanterne erranti|la fila delle lanterne|Le lanterne si spostano sopra una buca senza fondo.|segue la luce nella buca e perde la vita|si ferisce prima di fermarsi sul bordo|prende come riferimento le pietre immobili
4|Cerchio delle sanguisughe|il cerchio d'acqua scura|L'acqua scura si gonfia di piccoli corpi affamati.|cade nell'acqua e non sopravvive all'assalto|si ferisce strappando una sanguisuga|rimane fuori dal cerchio d'acqua
5|Pietre del drago|il nido di pietre calde|Le pietre del nido si spaccano emettendo vapore.|resta nel vapore e perde la vita|si ustiona al bordo del nido|si mette dietro una roccia fredda
5|Artiglio nella roccia|l'impronta dell'artiglio|La roccia dell'impronta si solleva come una mano.|viene schiacciat[A:o/a] dalle dita di pietra|si ferisce tra due scaglie di roccia|rimane fuori dal palmo di pietra
5|Cenere che respira|la conca di cenere|La cenere si solleva a ogni respiro del monte.|soffoca nella nube di cenere|si ferisce cadendo sulle pietre calde|si copre il volto dietro la roccia laterale
5|Uova incrinate|le uova di basalto|Dalle crepe delle uova esce un sibilo.|viene divorat[A:o/a] da una creatura appena schiusa|si ferisce contro un guscio|si tiene lontan[A:o/a] dalle crepe dei gusci
6|Altare ribaltato|la mensa delle armi|Una metà della mensa si solleva senza sostegno.|viene schiacciat[A:o/a] dalla mensa|si ferisce contro il bordo di pietra|rimane fuori dalla proiezione della mensa
6|Giuramento risonante|la pietra dei giuramenti|Le incisioni risuonano con parole mai pronunciate.|viene consumat[A:o/a] dal sigillo e perde la vita|si ferisce contro una runa ardente|non tocca le incisioni accese
6|Coppe di brace|le coppe del banchetto|Le coppe rovesciano brace al posto del vino.|resta tra le braci e perde la vita|si ustiona alle mani|si tiene oltre il bordo delle coppe
6|Lance orbitanti|la corona delle lance|Le lance sospese scendono verso la radura.|viene trafitt[A:o/a] da una lancia|si ferisce contro un'asta|rimane sotto il sostegno centrale
6|Pavimento a sigilli|il mosaico dei sigilli|Le tessere del mosaico si alzano come denti.|viene stritolat[A:o/a] tra le tessere|si ferisce una gamba tra le tessere|resta sulle tessere prive di incisioni
`,
    scifi:`
0|Gancio senza freno|il gancio di carico|Il gancio scende oltre il limite di sicurezza.|viene schiacciat[A:o/a] dal carico|si ferisce contro il gancio|resta oltre la linea del carico
0|Getto di manovra|l'ugello di attracco|Un ugello scarica propellente nella corsia di servizio.|resta nel getto e perde la vita|si ustiona al bordo della corsia|si tiene dietro il deflettore
0|Rete di contenimento|la rete delle capsule|La rete di carico si tende da sola.|resta stritolat[A:o/a] nella rete|si ferisce contro una fibbia|resta fuori dal perimetro della rete
0|Gru magnetica|la gru magnetica|Il magnete trascina i rottami verso la parete.|viene schiacciat[A:o/a] tra i rottami|si ferisce contro un pannello mobile|rimane dietro il paravento non metallico
0|Pistone di attracco|il pistone del portello|Il pistone completa una corsa non richiesta.|resta schiacciat[A:o/a] nel portello|si ferisce alla leva del portello|rimane fuori dalla guida del pistone
1|Pompe di nutrienti|il circuito dei nutrienti|Una pompa rompe la tenuta del circuito.|resta immers[A:o/a] nel liquido e soffoca|si ferisce contro una valvola|si tiene sopra il canale di raccolta
1|Carrello delle colture|il carrello delle colture|Il carrello scorre verso un fine corsa rotto.|viene schiacciat[A:o/a] contro il binario|si ferisce al carrello|rimane nel vano di manutenzione laterale
1|Lampade ultraviolette|la batteria delle lampade|Le schermature delle lampade si ritirano.|resta espost[A:o/a] al fascio e perde la vita|si ustiona sotto una lampada|resta dietro lo schermo opaco
1|Ugelli corrosivi|il collettore di lavaggio|Il collettore spruzza detergente concentrato.|viene colpit[A:o/a] dal getto e perde la vita|si ustiona a una mano|resta dal lato del pannello schermante
1|Vasche di alghe|la vasca di ricircolo|La vasca si svuota attraverso una grata aperta.|viene aspirat[A:o/a] nel ricircolo e soffoca|si ferisce contro la grata|rimane sopra il bordo della vasca
2|Bus ad alta tensione|il bus di potenza|Un arco elettrico scavalca gli isolatori.|viene colpit[A:o/a] dalla scarica e perde la vita|si ustiona vicino all'isolatore|rimane dietro la paratia isolante
2|Turbina in deriva|la turbina ausiliaria|La turbina gira oltre il limite previsto.|viene travolt[A:o/a] dai frammenti della turbina|si ferisce sotto una scheggia|resta dietro il blocco di contenimento
2|Valvola di spurgo|la valvola di spurgo|La valvola libera vapore surriscaldato.|resta nel vapore e perde la vita|si ustiona al bordo del condotto|rimane fuori dall'asse della valvola
2|Schermatura mobile|la schermatura del nucleo|La schermatura si richiude senza preavviso.|resta schiacciat[A:o/a] tra le piastre|si ferisce contro una piastra|rimane fuori dalla guida di chiusura
2|Condensatore instabile|il banco dei condensatori|Un condensatore si gonfia sotto il rivestimento.|viene colpit[A:o/a] dall'esplosione e perde la vita|si ferisce contro il rivestimento|resta dietro il divisorio di contenimento
3|Console in corto|la console delle rotte|Una scintilla corre sotto la tastiera della console.|viene folgorat[A:o/a] dalla console|si ustiona al pannello|non tocca la superficie in tensione
3|Otturatore ottico|l'otturatore di osservazione|L'otturatore si chiude sulla postazione di osservazione.|resta schiacciat[A:o/a] nell'otturatore|si ferisce al bordo del sedile|rimane oltre la linea dell'otturatore
3|Drone di comando|il drone cartografo|Il drone non riconosce più le richieste di arresto.|viene colpit[A:o/a] dal braccio del drone e perde la vita|si ferisce al braccio mobile|resta sotto il telaio della postazione
3|Sedile bloccato|il sedile di comando|Le cinture si tendono mentre il sedile ruota.|viene soffocat[A:o/a] dalle cinture|si ferisce contro una fibbia|tiene le cinture lontane dal collo
3|Rack inclinato|il rack delle memorie|Il rack si stacca dalla guida superiore.|viene schiacciat[A:o/a] dal rack|si ferisce sotto un modulo|resta oltre l'ingombro del rack
4|Letto a scomparsa|la cuccetta pieghevole|La cuccetta rientra nella parete senza comando.|resta schiacciat[A:o/a] nella cuccetta|si ferisce contro la cornice|rimane oltre la guida della cuccetta
4|Portello sanitario|il portello sanitario|La procedura di sterilizzazione parte a vano occupato.|resta espost[A:o/a] al ciclo e perde la vita|si ustiona contro la parete|resta dietro il pannello di schermatura
4|Distributore pressurizzato|il distributore delle razioni|Il distributore emette un sibilo dalla giunzione.|viene colpit[A:o/a] dal serbatoio e perde la vita|si ferisce contro lo sportello|si tiene a lato del distributore
4|Armadio di emergenza|l'armadio pressurizzato|Le chiusure dell'armadio saltano una alla volta.|viene travolt[A:o/a] dallo sportello|si ferisce contro una chiusura|rimane fuori dall'asse dello sportello
4|Tavolo su guida|il tavolo su guida|Il tavolo accelera lungo il pavimento dei moduli.|resta schiacciat[A:o/a] contro la parete|si ferisce contro il piano|resta nel vano laterale della parete
5|Ventola fuori asse|la ventola di ricircolo|La ventola gratta contro la protezione.|viene trascinat[A:o/a] tra le pale e perde la vita|si ferisce alla rete protettiva|rimane oltre la griglia della ventola
5|Cavi di servizio|il fascio dei cavi|Un cavo in tensione si stacca dal sostegno.|viene folgorat[A:o/a] dal cavo|si ustiona vicino al sostegno|resta sul pannello isolato
5|Saracinesca di settore|la saracinesca di settore|La saracinesca scende a intermittenza.|resta schiacciat[A:o/a] sotto la saracinesca|si ferisce al bordo metallico|rimane fuori dalla corsa della saracinesca
5|Robot saldatore|il robot saldatore|Il saldatore scambia una sagoma per una giunzione.|viene colpit[A:o/a] dal fascio e perde la vita|si ustiona al braccio del robot|resta dietro lo schermo di saldatura
5|Rullo di manutenzione|il rullo di manutenzione|Il rullo trascina a sé i teli lasciati nella corsia.|resta stritolat[A:o/a] dal rullo|si ferisce liberando una manica|rimane a lato della corsia del rullo
`,
    zombie:`
0|Ascensore aperto|il vano dell'ascensore|La porta dell'ascensore si apre su una cabina assente.|precipita nel vano e perde la vita|si ferisce sul bordo della porta|rimane dietro la soglia
0|Barelle in corsa|la fila delle barelle|Le barelle rotolano verso il pianerottolo.|viene travolt[A:o/a] dalle barelle|si ferisce contro una sponda|resta nella nicchia laterale
0|Bombole senza catena|il carrello delle bombole|Una catena cede e le bombole si rovesciano.|viene schiacciat[A:o/a] dalle bombole|si ferisce contro il carrello|rimane fuori dalla corsia del carrello
0|Porta della quarantena|la porta della quarantena|Mani infette spuntano dalla porta deformata.|viene trascinat[A:o/a] oltre la porta e sbranat[A:o/a]|si ferisce sulla lamiera della porta|resta oltre la portata delle mani
0|Vetrata delle visite|la vetrata delle visite|La vetrata si piega sotto la spinta degli infetti.|viene travolt[A:o/a] dall'orda e perde la vita|si taglia con una scheggia|rimane dietro il pilastro del corridoio
1|Serranda sbloccata|la serranda del magazzino|La serranda scende senza più fermarsi.|resta schiacciat[A:o/a] dalla serranda|si ferisce contro la guida|rimane fuori dalla corsa della serranda
1|Scale mobili incastrate|la scala mobile ferma|Un gradino della scala mobile si apre sotto il peso.|resta stritolat[A:o/a] nel meccanismo|si ferisce contro il gradino|si tiene alla pavimentazione esterna
1|Manichini e infetti|la vetrina dei manichini|Una sagoma tra i manichini comincia a muoversi.|viene afferrat[A:o/a] dall'infetto e perde la vita|si ferisce contro la cornice della vetrina|rimane fuori dalla vetrina
1|Scaffali inclinati|la corsia delle conserve|Lo scaffale più alto perde l'appoggio laterale.|viene sepolt[A:o/a] dallo scaffale|si ferisce sotto una scatola|resta oltre la fila degli scaffali
1|Gabbia di consegna|la gabbia delle consegne|Il cancello della gabbia vibra sotto una spinta.|resta nella gabbia con gli infetti e perde la vita|si ferisce al chiavistello|rimane sul lato libero del cancello
2|Carrozza in discesa|la carrozza sul binario|Una carrozza si muove sul binario inclinato.|viene travolt[A:o/a] dalla carrozza|si ferisce contro il predellino|resta nella nicchia di servizio
2|Terza rotaia|la rotaia elettrificata|Una scarica illumina la polvere lungo il binario.|viene folgorat[A:o/a] sulla rotaia|si ustiona vicino al binario|rimane sulla banchina asciutta
2|Porta del macchinista|la porta del macchinista|Colpi sordi arrivano dalla cabina bloccata.|viene trascinat[A:o/a] nella cabina e perde la vita|si ferisce sulla porta|rimane fuori dall'apertura
2|Scala invasa|la scala della banchina|Gli infetti si accalcano sui gradini inferiori.|viene travolt[A:o/a] dagli infetti|si ferisce contro il corrimano|resta dietro il cancello laterale
2|Pozzetto di drenaggio|il pozzetto di drenaggio|Il coperchio del pozzetto scivola nell'acqua.|cade nel pozzetto e annega|si ferisce sul bordo del pozzetto|rimane sopra il gradino asciutto
3|Armadi sulle scale|l'armadio del corridoio|Un armadio si inclina verso la rampa.|viene schiacciat[A:o/a] dall'armadio|si ferisce contro lo sportello|rimane oltre la proiezione dell'armadio
3|Porte dell'auditorium|le porte dell'auditorium|Le porte si piegano sotto la pressione interna.|viene travolt[A:o/a] dagli infetti nell'auditorium|si ferisce contro un battente|resta dietro il divisorio laterale
3|Gabbia della palestra|la gabbia degli attrezzi|Il lucchetto della gabbia cede di colpo.|viene schiacciat[A:o/a] dagli attrezzi|si ferisce contro una sbarra|resta oltre la traiettoria delle sbarre
3|Finestra al primo piano|la finestra del laboratorio|Il davanzale si stacca dalla parete.|precipita insieme al davanzale e perde la vita|si ferisce al telaio|rimane lontan[A:o/a] dal davanzale
4|Rastrelliera della polizia|la rastrelliera degli scudi|La rastrelliera perde il fissaggio superiore.|viene schiacciat[A:o/a] sotto gli scudi|si ferisce contro il metallo|rimane oltre il bordo della rastrelliera
4|Cella senza chiavistello|la cella di fermo|Il chiavistello si ritrae mentre qualcosa gratta dall'interno.|resta nella cella con un infetto e perde la vita|si ferisce contro le sbarre|rimane fuori dall'arco della porta
4|Cancello del cortile|il cancello dei mezzi|Il cancello esce dalla guida.|viene travolt[A:o/a] dal cancello|si ferisce alla guida|rimane accanto al pilastro portante
4|Archivio fradicio|l'archivio delle prove|Le mensole cedono sotto i faldoni bagnati.|viene schiacciat[A:o/a] dalle mensole|si ferisce contro uno spigolo|rimane fuori dalla corsia delle mensole
5|Garage ribaltato|la porta del garage|La porta basculante si stacca da una molla.|viene colpit[A:o/a] dalla porta e perde la vita|si ferisce alla molla|resta fuori dall'ingombro della porta
5|Cantina affollata|la botola della cantina|La botola si alza sotto colpi irregolari.|cade tra gli infetti e perde la vita|si ferisce contro la botola|rimane oltre il bordo dell'apertura
5|Recinzione piegata|la recinzione del giardino|Una sezione della recinzione si piega verso il passaggio.|resta impigliat[A:o/a] mentre arrivano gli infetti e perde la vita|si ferisce sul filo|resta dalla parte libera della recinzione
5|Auto sul cric|l'auto sul cric|Il cric si inclina sotto il peso dell'auto.|viene schiacciat[A:o/a] dall'auto|si ferisce contro il paraurti|rimane fuori dal lato sollevato dell'auto
6|Convoglio sfrenato|il rimorchio del convoglio|Il rimorchio si muove senza freni.|viene travolt[A:o/a] dal rimorchio|si ferisce contro una ruota|rimane oltre la corsia del convoglio
6|Fontana degli infetti|la fontana asciutta|Gli infetti ammassati nella vasca si sollevano insieme.|viene trascinat[A:o/a] nella vasca e perde la vita|si ferisce sul bordo della fontana|rimane fuori dalla portata degli infetti
6|Palco del raduno|il palco del raduno|Le travi del palco scattano sotto una spinta.|viene schiacciat[A:o/a] dal palco|si ferisce sotto una trave|rimane a lato delle travi portanti
`,
    royale:`
0|Elica senza arresto|l'elica del cargo|L'elica gira mentre il cargo sembra spento.|viene colpit[A:o/a] dall'elica e perde la vita|si ferisce contro il carrello|rimane oltre la linea dell'elica
0|Rampa del cargo|la rampa di carico|La rampa si sgancia dal sostegno.|viene schiacciat[A:o/a] dalla rampa|si ferisce al bordo della rampa|resta accanto al pilastro laterale
0|Cassone sospeso|il cassone di rifornimento|Un cassone oscilla sopra la piazzola.|viene travolt[A:o/a] dal cassone|si ferisce contro una cinghia|rimane fuori dalla verticale del carico
0|Scala del radar|la scala del radar|Un fissaggio della scala si stacca.|precipita con la scala e perde la vita|si ferisce a un piolo|resta sul piano della piazzola
0|Carrello bagagli|il carrello dei bagagli|Il carrello prende velocità verso il muro.|resta schiacciat[A:o/a] contro il muro|si ferisce a un braccio|rimane nella nicchia laterale
1|Torretta automatica|la torretta della base|La torretta insegue una sagoma senza identificativo.|viene colpit[A:o/a] dalla torretta e perde la vita|si ferisce cercando copertura|rimane dietro il basamento della torretta
1|Cancello della base|il cancello corazzato|Il cancello comincia a chiudersi senza avviso.|resta schiacciat[A:o/a] nel cancello|si ferisce contro un battente|rimane fuori dall'arco del cancello
1|Muro di sacchi|il muro di sacchi|La fila superiore dei sacchi scivola dal sostegno.|resta sepolt[A:o/a] sotto i sacchi e soffoca|si ferisce sotto un sacco|rimane oltre il lato caricato del muro
1|Piattaforma di tiro|la piattaforma di tiro|La piattaforma si inclina verso i bersagli.|precipita sotto la piattaforma e perde la vita|si ferisce sul bordo|rimane sul tratto sostenuto dai pilastri
1|Porta del bunker|la porta del bunker|La porta perde il fermo e scatta.|resta schiacciat[A:o/a] dalla porta|si ferisce al fermo|rimane oltre la corsa della porta
2|Molo spezzato|il molo delle barche|Le assi del molo si staccano dai pali.|cade tra i pali e annega|si ferisce a una gamba|rimane sul tratto di molo ancora fissato
2|Argano del porto|l'argano del porto|L'argano riavvolge il cavo senza comando.|resta impigliat[A:o/a] e viene trascinat[A:o/a] sott'acqua|si ferisce liberando il polso|tiene le mani lontane dal cavo
2|Serbatoio sul tetto|il serbatoio sul tetto|La staffa del serbatoio cede.|viene travolt[A:o/a] dal serbatoio|si ferisce contro una staffa|rimane fuori dall'ombra del serbatoio
2|Balcone del villaggio|il balcone sul vicolo|Il balcone si stacca dalla facciata.|viene schiacciat[A:o/a] dal balcone|si ferisce sotto i calcinacci|rimane sotto l'architrave laterale
2|Rete da pesca|la rete del rimessaggio|La rete cade davanti al passaggio.|resta nella rete durante un assalto e perde la vita|si ferisce contro un galleggiante|resta fuori dall'ingombro della rete
3|Pressa di riciclo|la pressa della fabbrica|La pressa riparte durante una pausa apparente.|resta schiacciat[A:o/a] nella pressa|si ferisce al pannello|rimane fuori dal vano della pressa
3|Nastro trasportatore|il nastro dei contenitori|Il nastro trascina i contenitori verso un trituratore.|viene trascinat[A:o/a] nel trituratore|si ferisce al bordo del nastro|rimane sul camminamento laterale
3|Silos inclinato|il silos della fabbrica|Il silos perde il sostegno inferiore.|viene sepolt[A:o/a] dal materiale del silos|si ferisce contro il sostegno|rimane oltre la linea dei pilastri
3|Gru a ponte|la gru a ponte|La gru fa scorrere il carico fuori dalla corsia.|viene schiacciat[A:o/a] dal carico|si ferisce sotto una scheggia|resta dietro il pilastro portante
3|Tubazione di vapore|la tubazione di vapore|Una giunzione si apre con un fischio.|resta nel getto e perde la vita|si ustiona vicino alla giunzione|rimane dal lato schermato della tubazione
4|Pale del mulino|le pale del mulino|Le pale girano sotto una raffica improvvisa.|viene colpit[A:o/a] da una pala e perde la vita|si ferisce alla mano|rimane fuori dall'arco delle pale
4|Soppalco del granaio|il soppalco del granaio|La trave del soppalco si spezza al centro.|precipita e resta sotto la trave|si ferisce sulle assi|rimane accanto al muro portante
4|Rimorchio agricolo|il rimorchio agricolo|Il rimorchio si ribalta sul terreno molle.|viene schiacciat[A:o/a] dal rimorchio|si ferisce contro una sponda|rimane fuori dal lato in discesa
4|Pozzo del podere|il pozzo del podere|La copertura del pozzo cede.|cade nel pozzo e perde la vita|si ferisce sul bordo|rimane oltre la pietra di coronamento
4|Balle in equilibrio|la catasta di balle|La catasta si inclina verso il passaggio.|resta sepolt[A:o/a] tra le balle e soffoca|si ferisce sotto una balla|resta oltre la linea della catasta
5|Torretta di caccia|la torretta di caccia|La torretta perde un appoggio nel terreno.|precipita con la torretta e perde la vita|si ferisce contro un piolo|rimane fuori dall'impronta della torretta
5|Albero schiantato|il tronco sospeso|Un tronco sospeso ruota tra due appoggi.|viene schiacciat[A:o/a] dal tronco|si ferisce contro un ramo|rimane oltre l'arco del tronco
5|Filo tra i cespugli|il filo mimetizzato|Un filo teso taglia il passaggio tra i cespugli.|attiva il congegno nascosto e perde la vita|si ferisce al ginocchio|rimane sul tratto sgombro del sentiero
5|Capanno sfondato|il capanno di osservazione|Il tetto del capanno cede verso l'interno.|viene schiacciat[A:o/a] sotto il tetto|si ferisce contro una trave|rimane accanto al lato aperto del capanno
5|Fossa dei cacciatori|la fossa coperta di frasche|Le frasche si piegano sopra una cavità.|precipita nella fossa e perde la vita|si ferisce sul bordo|controlla il terreno con un ramo caduto
`,
    horror:`
0|Botte che respira|la botte murata|Il coperchio della botte si solleva come un torace.|viene trascinat[A:o/a] nella botte e soffoca|si ferisce contro un cerchio di ferro|rimane oltre la portata del coperchio
0|Scale verso il basso|la scala della cantina|I gradini si allungano verso un buio senza fondo.|precipita nel buio e perde la vita|si ferisce contro il corrimano|rimane sul pianerottolo di pietra
0|Grata sommersa|la grata della cisterna|La grata viene tirata dal basso.|finisce nella cisterna e annega|si ferisce al bordo della grata|rimane sopra il gradino asciutto
0|Ganci del soffitto|i ganci della dispensa|I ganci oscillano verso ogni suono.|viene afferrat[A:o/a] dai ganci e perde la vita|si ferisce a una spalla|rimane fuori dalla verticale dei ganci
1|Baule delle voci|il baule delle voci|Il baule chiama con una voce familiare.|viene rinchius[A:o/a] nel baule e soffoca|si ferisce contro il coperchio|rimane oltre l'arco del coperchio
1|Fili del teatrino|il teatrino della soffitta|I fili delle marionette scendono fino al pavimento.|viene strangolat[A:o/a] dai fili|si ferisce liberando un polso|si tiene fuori dalla tenda dei fili
1|Pavimento di carta|il pavimento coperto di lettere|Le lettere si sollevano mostrando assi spezzate.|precipita tra le travi e perde la vita|si ferisce al bordo delle assi|rimane sopra la trave portante
1|Dondolo vuoto|il dondolo della soffitta|Il dondolo accelera senza nessuno a bordo.|viene colpit[A:o/a] alla testa e perde la vita|si ferisce contro un bracciolo|rimane oltre l'arco del dondolo
2|Campana muta|la campana della cappella|La campana vibra senza produrre suono.|viene schiacciat[A:o/a] dal bronzo|si ferisce contro una corda|resta oltre la linea della campana
2|Candele all'indietro|il banco delle candele|Le fiamme si piegano verso chi si avvicina.|resta avvolt[A:o/a] dalle fiamme e perde la vita|si ustiona al bordo del banco|rimane fuori dal raggio delle fiamme
2|Confessionale chiuso|il confessionale intagliato|La porta del confessionale si richiude da sola.|viene soffocat[A:o/a] nel confessionale|si ferisce contro la grata|rimane oltre la soglia del confessionale
2|Vetrata piangente|la vetrata della cappella|Le figure della vetrata spingono contro il vetro.|viene trafitt[A:o/a] dalle schegge|si taglia a una mano|si ripara dietro il pilastro
3|Lapide inclinata|la lapide senza nome|La lapide si inclina contro la pendenza del terreno.|viene schiacciat[A:o/a] dalla lapide|si ferisce contro il bordo|rimane oltre la proiezione della lapide
3|Tomba socchiusa|la tomba socchiusa|Dal taglio della tomba sale un respiro.|viene trascinat[A:o/a] nella tomba e perde la vita|si ferisce contro la lastra|rimane oltre il bordo della tomba
3|Cancello a denti|il cancello del cimitero|Le punte del cancello si piegano verso il passaggio.|resta trafitt[A:o/a] tra le punte|si ferisce al braccio|rimane fuori dall'arco dei battenti
3|Radici delle tombe|le radici tra le tombe|Le radici si stringono attorno alle pietre.|viene trascinat[A:o/a] sottoterra e soffoca|si ferisce liberando una gamba|rimane sul tratto lastricato
4|Scaffale affamato|lo scaffale dei registri|Lo scaffale avanza trascinando il tappeto.|viene schiacciat[A:o/a] contro il muro|si ferisce contro uno spigolo|rimane fuori dalla corsia dello scaffale
4|Atlante cieco|l'atlante senza pagine|Le copertine dell'atlante si aprono come mascelle.|viene inghiottit[A:o/a] dall'atlante|si ferisce alla copertina|tiene le mani fuori dalla rilegatura
4|Scala scorrevole|la scala dei volumi alti|La scala scorre contro i propri fermi.|precipita dalla scala e perde la vita|si ferisce a un piolo|rimane sul pavimento libero
4|Globo delle ombre|il globo della biblioteca|Il globo proietta ombre più solide degli oggetti.|viene stritolat[A:o/a] dalle ombre|si ferisce contro il piedistallo|rimane dietro il paravento
4|Poltrona che stringe|la poltrona di lettura|I braccioli della poltrona si avvicinano.|viene stritolat[A:o/a] dalla poltrona|si ferisce contro un bracciolo|rimane davanti al tavolino
5|Fontana delle mani|la fontana del giardino|Dalla vasca si alzano dita d'acqua.|viene trascinat[A:o/a] nella fontana e annega|si ferisce al bordo della vasca|rimane fuori dalla portata delle dita
5|Rosaio affamato|il rosaio nero|I rami del rosaio si piegano verso i passi.|viene stritolat[A:o/a] dai rovi|si ferisce contro una spina|rimane sul tratto lastricato
5|Serra appannata|la serra appannata|Le lastre della serra vibrano verso l'interno.|viene trafitt[A:o/a] dai vetri|si taglia a un braccio|rimane dietro il telaio portante
5|Statua senza volto|la statua della siepe|La statua cambia posizione quando nessuno la guarda.|viene schiacciat[A:o/a] dalla statua|si ferisce contro il basamento|rimane oltre la portata della statua
6|Lampadario inclinato|il lampadario del Salone|La catena del lampadario perde un anello.|viene schiacciat[A:o/a] dal lampadario|si ferisce sotto un pendente|rimane fuori dal cerchio di luce
6|Pianoforte serrato|il pianoforte del ballo|Il coperchio del pianoforte batte da solo.|resta schiacciat[A:o/a] nel pianoforte|si ferisce contro un tasto spezzato|rimane oltre l'arco del coperchio
6|Specchio del saluto|lo specchio dell'ingresso|Il riflesso tende le mani prima della persona.|viene trascinat[A:o/a] nello specchio e perde la vita|si taglia contro la cornice|rimane fuori dalla portata del riflesso
6|Tappeto che avvolge|il tappeto del ballo|I bordi del tappeto si sollevano come onde.|viene avvolt[A:o/a] dal tappeto e soffoca|si ferisce cadendo sul pavimento|rimane sulla fascia di pavimento scoperta
6|Orologio del commiato|l'orologio del Salone|Il pendolo esce dalla cassa a ogni rintocco.|viene colpit[A:o/a] dal pendolo e perde la vita|si ferisce al bordo della cassa|rimane oltre l'arco del pendolo
`,
    wasteland:`
0|Magnete della discarica|il magnete dei rottami|Il magnete trascina i rottami verso la gru.|viene schiacciat[A:o/a] tra i rottami|si ferisce contro una lamiera|rimane dietro il blocco di cemento
0|Pressa senza fermo|la pressa dei rottami|La pressa scatta senza completare il segnale.|resta stritolat[A:o/a] nella pressa|si ferisce contro il pannello|rimane fuori dal vano della pressa
0|Pneumatici in fiamme|la catasta di pneumatici|Un filo di fumo sale dalla catasta.|soffoca nel fumo dei pneumatici|si ustiona vicino alla catasta|rimane dal lato da cui arriva aria pulita
0|Montagna di lamiere|il cumulo di lamiere|Le lamiere scivolano verso la base del cumulo.|viene sepolt[A:o/a] dalle lamiere|si taglia a una gamba|rimane oltre la linea del cumulo
1|Viadotto spaccato|la campata del viadotto|Un giunto della campata si apre.|precipita insieme alla campata e perde la vita|si ferisce al bordo del giunto|rimane sopra il pilone ancora integro
1|Autocisterna inclinata|l'autocisterna abbandonata|La cisterna si muove sul rimorchio inclinato.|viene travolt[A:o/a] dalla cisterna|si ferisce contro il rimorchio|rimane fuori dal lato in discesa
1|Guardrail a molla|il guardrail piegato|Il metallo del guardrail si libera dal bullone.|viene colpit[A:o/a] al collo e perde la vita|si ferisce al braccio|rimane oltre la linea del metallo teso
1|Convoglio cieco|il rimorchio dei predoni|Il rimorchio avanza senza luci né segnali.|viene travolt[A:o/a] dal convoglio|si ferisce contro una ruota|rimane dietro la barriera di cemento
1|Insegna sospesa|l'insegna autostradale|L'insegna perde il sostegno più basso.|viene schiacciat[A:o/a] dall'insegna|si ferisce sotto un frammento|rimane fuori dall'ombra dell'insegna
2|Vasca di scorie|la vasca delle scorie|Una bolla solleva la crosta della vasca.|cade nelle scorie e perde la vita|si ustiona al bordo della vasca|rimane dietro la barriera asciutta
2|Braccio di colata|il braccio di colata|Il braccio ruota anche senza alimentazione apparente.|viene travolt[A:o/a] dal braccio|si ferisce contro la guida|rimane fuori dall'arco del braccio
2|Silos di polveri|il silos delle polveri|Il silos scarica una nube dal giunto inferiore.|soffoca nella polvere del silos|si ferisce contro il bocchettone|rimane dietro il pannello di contenimento
2|Tubazione corrosa|la tubazione corrosa|Una goccia fumante allarga un foro nella tubazione.|resta nel getto corrosivo e perde la vita|si ustiona a una mano|rimane fuori dall'asse del foro
3|Facciata senza appoggi|la facciata del vecchio emporio|La facciata si separa dal muro laterale.|viene schiacciat[A:o/a] dalla facciata|si ferisce sotto i calcinacci|rimane oltre la linea del cornicione
3|Serranda dell'emporio|la serranda dell'emporio|La serranda cade dal rullo arrugginito.|resta schiacciat[A:o/a] sotto la serranda|si ferisce alla guida|rimane fuori dall'apertura
3|Scala antincendio|la scala esterna|Un gradino si stacca dai fissaggi corrosi.|precipita dalla scala e perde la vita|si ferisce contro la ringhiera|rimane sul pianerottolo sostenuto
3|Cassaforte del sindaco|la cassaforte del municipio|La cassaforte si inclina fuori dal muro.|viene schiacciat[A:o/a] dalla cassaforte|si ferisce contro un cardine|rimane oltre l'ingombro del battente
3|Tetto del mercato|il tetto del mercato|Le lastre vibrano sopra i sostegni spezzati.|viene schiacciat[A:o/a] dalle lastre|si ferisce sotto una scheggia|rimane sul lato privo di copertura
4|Crosta radioattiva|la crosta del cratere|La crosta si apre lasciando uscire vapore.|cade nella fenditura e perde la vita|si ustiona contro il bordo|rimane dietro la linea della crepa
4|Fumarola nascosta|la fumarola tra le rocce|Un sibilo cambia ritmo sotto la pietra.|resta nel getto e perde la vita|si ustiona vicino alla fumarola|rimane dal lato della roccia schermante
4|Pietre a scaglie|il pendio del cratere|Le pietre si sfaldano verso il fondo.|scivola nel cratere e non sopravvive|si ferisce contro una scaglia|rimane sul tratto di roccia compatta
4|Serbatoio interrato|il serbatoio semisepolto|Il serbatoio si gonfia sotto la sabbia.|viene colpit[A:o/a] dall'esplosione e perde la vita|si ferisce sotto un frammento|rimane dietro il terrapieno
5|Griglia del bacino|la griglia di aspirazione|La griglia vibra al riavvio della pompa.|viene trascinat[A:o/a] contro la griglia e annega|si ferisce liberando una mano|rimane sopra il bordo del bacino
5|Paratia deformata|la paratia del bacino|La paratia si solleva fuori dalle guide.|viene travolt[A:o/a] dalla paratia|si ferisce alla guida|rimane sul lato schermato del muro
5|Molo di servizio|il molo delle pompe|Le assi del molo si staccano dai sostegni.|cade tra i pali e annega|si ferisce al bordo del molo|rimane sopra la trave portante
5|Condotta in pressione|la condotta di ritorno|La condotta sobbalza prima di perdere una giunzione.|viene colpit[A:o/a] dal getto e annega|si ferisce contro una flangia|rimane oltre la linea della giunzione
6|Porta del Deposito|la porta del Deposito|La porta perde il fermo superiore.|resta schiacciat[A:o/a] sotto la porta|si ferisce a un cardine|rimane fuori dall'arco del battente
6|Scaffali di taniche|lo scaffale delle taniche|Lo scaffale si inclina sul lato più carico.|viene sepolt[A:o/a] dalle taniche e perde la vita|si ferisce contro una mensola|rimane oltre la fila delle taniche
6|Carrello dei ricambi|il carrello dei ricambi|Il carrello si muove verso una parete cieca.|resta schiacciat[A:o/a] contro la parete|si ferisce contro un ricambio|rimane nella nicchia laterale
6|Verricello del cancello|il verricello del cancello|Il cavo si sfilaccia mentre il motore gira.|viene colpit[A:o/a] dal cavo e perde la vita|si ferisce a una spalla|rimane dietro il pilastro del cancello
`,
    liceo:`
0|Finale con verbale|il tabellone della palestra|Il tabellone mostra un risultato diverso dal verbale.|contesta senza prove e viene esclus[A:o/a] dal torneo scolastico|perde credibilità insistendo sul punteggio sbagliato|confronta i due punteggi prima di intervenire
0|Coreografia fuori tempo|il segnale della coreografia|Il segnale della coreografia arriva una battuta prima.|interrompe la prova generale e viene esclus[A:o/a] dall'esibizione|perde credibilità entrando fuori tempo|segue il conteggio della prova
0|Turno di arbitraggio|il foglio degli arbitri|Sul foglio mancano le firme dell'ultimo incontro.|si attribuisce un'autorità inesistente e viene esclus[A:o/a] dal torneo|perde credibilità sul ruolo di arbitro|chiede di verificare le firme
0|Maglie scambiate|il baule delle maglie|Le etichette delle squadre sono state invertite.|insiste sulla squadra sbagliata e viene esclus[A:o/a] dalla gara|perde credibilità nel cambio delle squadre|controlla il nome prima del colore
1|Prenotazione dei tavoli|il registro dei tavoli|Due gruppi risultano prenotati allo stesso tavolo.|rivendica entrambi i posti e viene esclus[A:o/a] dal comitato|perde credibilità al tavolo della mensa|confronta le prenotazioni con gli orari
1|Scontrino collettivo|lo scontrino del pranzo|Il totale dello scontrino non coincide con le quote.|scarica la differenza sugli altri e viene esclus[A:o/a] dal gruppo|perde credibilità facendo un conto sbagliato|ricontrolla le quote una per una
1|Menu senza allergeni|il foglio del menu|Il menu della mensa è privo delle indicazioni promesse.|pubblica indicazioni inventate e viene esclus[A:o/a] dal comitato|perde credibilità sul menu|si limita alle informazioni verificate
1|Lista delle merende|la lista delle merende|La stessa merenda compare sotto due nomi.|accusa senza controllare e viene esclus[A:o/a] dal gruppo|perde credibilità sulla raccolta delle quote|controlla prima le due richieste
2|Prestito scaduto|il registro dei prestiti|Un prestito viene attribuito alla persona sbagliata.|falsifica una restituzione e viene esclus[A:o/a] dal progetto|perde credibilità sulla restituzione|controlla il codice del volume
2|Bibliografia ricopiata|la bibliografia del progetto|Due citazioni rimandano a pagine inesistenti.|difende citazioni inventate e viene esclus[A:o/a] dalla selezione|perde credibilità sulle fonti|distingue le citazioni controllate dalle altre
2|Silenzio valutato|il cartello del gruppo di studio|Il cartello promette un turno di studio già assegnato.|si impone sul turno altrui e viene esclus[A:o/a] dal gruppo|perde credibilità nella prenotazione|controlla il turno sul registro
2|Quaderno anonimo|il quaderno delle correzioni|Il quaderno contiene risposte senza una fonte.|presenta quelle risposte come proprie e viene esclus[A:o/a] dalla prova|perde credibilità sulle correzioni|ricontrolla il ragionamento senza copiare
3|Esperimento senza registro|il registro dell'esperimento|La tabella dei risultati manca di una misura.|inventa la misura mancante e viene esclus[A:o/a] dal laboratorio|perde credibilità nella relazione|segnala la misura assente
3|Etichette invertite|le etichette del banco|Due etichette del materiale sono state scambiate.|insiste sull'elenco falso e viene esclus[A:o/a] dal progetto|perde credibilità nella preparazione|confronta i codici senza usare i materiali
3|Relazione duplicata|la relazione di laboratorio|Due relazioni riportano lo stesso errore insolito.|rivendica il lavoro copiato e viene esclus[A:o/a] dalla valutazione|perde credibilità sulla relazione|ricostruisce i passaggi effettivamente svolti
3|Presentazione delle misure|il grafico dell'esperimento|Gli assi del grafico sono scambiati.|difende il grafico scorretto e viene esclus[A:o/a] dalla selezione|perde credibilità nella presentazione|controlla le unità prima di spiegare
4|Messaggio inoltrato|il cartellone del cortile|Un messaggio compare senza il contesto originale.|conferma una voce falsa e viene esclus[A:o/a] dal gruppo|perde credibilità sul messaggio|chiede il contesto prima di commentare
4|Elezione dei rappresentanti|il foglio delle candidature|Una candidatura porta una firma non verificata.|si attribuisce la firma e viene esclus[A:o/a] dall'elezione|perde credibilità sulla candidatura|distingue la candidatura dalla conferma
4|Foto di gruppo|il programma della foto|L'orario della foto non coincide con l'avviso ufficiale.|accusa il gruppo sulla base dell'avviso falso e viene esclus[A:o/a]|perde credibilità sull'orario|controlla l'avviso aggiornato
4|Scambio di appunti|la bacheca degli scambi|Una pagina di appunti è attribuita a due persone.|vende il lavoro altrui come proprio e viene esclus[A:o/a] dal gruppo|perde credibilità sugli appunti|riconosce la provenienza della pagina
5|Microfono aperto|il microfono dell'assemblea|Il microfono resta aperto durante una pausa.|insulta l'assemblea e viene esclus[A:o/a] dalla rappresentanza|perde credibilità per una battuta fuori luogo|aspetta il proprio turno senza commentare
5|Ordine del giorno|l'ordine del giorno|Due versioni dell'ordine del giorno circolano insieme.|forza una votazione non prevista e viene esclus[A:o/a] dal comitato|perde credibilità sulla convocazione|controlla la versione firmata
5|Votazione contestata|il verbale dell'assemblea|Il totale delle preferenze supera i presenti registrati.|certifica il totale impossibile e viene esclus[A:o/a] dalla commissione|perde credibilità sul conteggio|chiede un nuovo conteggio
5|Premiazione incompleta|l'elenco dei premi|Un nome compare senza la motivazione richiesta.|pretende un premio non assegnato e viene esclus[A:o/a] dalla selezione|perde credibilità sulla premiazione|controlla le motivazioni pubblicate
6|Interrogazione a sorpresa|il foglio delle domande|Una domanda richiama un capitolo diverso da quello annunciato.|consegna una risposta copiata e viene esclus[A:o/a] dalla prova|perde credibilità nella risposta|espone soltanto ciò che sa motivare
6|Compito con allegato|l'allegato della verifica|L'allegato contiene dati che contraddicono la traccia.|nasconde l'allegato e viene esclus[A:o/a] dalla prova|perde credibilità nella soluzione|segnala la contraddizione prima di calcolare
6|Registro dei gruppi|il registro dei gruppi|Lo stesso contributo è stato contato due volte.|si attribuisce il contributo altrui e viene esclus[A:o/a] dal progetto|perde credibilità nella divisione del lavoro|distingue i contributi documentati
6|Tema fuori traccia|la traccia del tema|La traccia cambia significato leggendo l'ultima riga.|rifiuta di correggere il lavoro copiato e viene esclus[A:o/a] dalla selezione|perde credibilità nell'argomentazione|rilegge tutta la traccia
6|Quiz senza fonte|il questionario della classe|Una risposta indicata come certa non ha una fonte.|diffonde una soluzione falsa e viene esclus[A:o/a] dalla gara|perde credibilità nella correzione|verifica il passaggio contestato
6|Cambio di consegna|la consegna del progetto|L'ultima consegna richiede un formato diverso.|presenta il lavoro altrui come aggiornamento proprio e viene esclus[A:o/a]|perde credibilità sulla consegna|controlla la revisione richiesta
`,
    ufficio:`
0|Verbale divergente|il verbale della riunione|Due copie del verbale riportano decisioni opposte.|certifica una decisione inventata e viene licenziat[A:o/a]|perde credibilità sul verbale|confronta le copie con le note approvate
0|Slide non aggiornate|la presentazione trimestrale|Le slide usano dati del trimestre precedente.|difende i dati falsi e viene licenziat[A:o/a]|perde credibilità nella presentazione|segnala la data dei dati
0|Budget senza firma|il prospetto del budget|Il totale del budget include una spesa non autorizzata.|si attribuisce l'autorizzazione e viene licenziat[A:o/a]|perde credibilità sul budget|distingue le spese approvate dalle altre
0|Voto doppio|il registro delle presenze|Un voto compare sotto due deleghe incompatibili.|certifica il voto doppio e viene licenziat[A:o/a]|perde credibilità sulla delega|controlla le deleghe registrate
0|Demo registrata|il programma della dimostrazione|La demo registrata viene presentata come una prova in diretta.|nasconde la registrazione e viene licenziat[A:o/a]|perde credibilità sulla dimostrazione|dichiara i limiti della demo
1|Foglio condiviso|il foglio delle scadenze|Due revisioni del foglio assegnano lo stesso incarico.|attribuisce ad altri un errore proprio e viene licenziat[A:o/a]|perde credibilità sulle scadenze|controlla la cronologia delle revisioni
1|Casella di gruppo|la casella del progetto|Un messaggio inoltrato perde l'allegato originale.|inventa il contenuto dell'allegato e viene licenziat[A:o/a]|perde credibilità sul messaggio|separa i fatti dalle supposizioni
1|Dashboard congelata|il cruscotto delle metriche|Il cruscotto mostra dati fermi a una vecchia data.|certifica numeri non aggiornati e viene licenziat[A:o/a]|perde credibilità sulle metriche|controlla l'ultimo aggiornamento
1|Turni sovrapposti|il calendario dei turni|Lo stesso turno compare in due calendari.|falsifica la copertura del turno e viene licenziat[A:o/a]|perde credibilità sul calendario|confronta i due calendari
1|Cartella duplicata|la cartella della consegna|Due cartelle hanno lo stesso nome e contenuti diversi.|consegna come proprio il lavoro altrui e viene licenziat[A:o/a]|perde credibilità sulla consegna|controlla la provenienza dei file
2|Quote del pranzo|il prospetto del pranzo|Il totale delle quote non coincide con lo scontrino.|trattiene la differenza e viene licenziat[A:o/a]|perde credibilità sulle quote|ricontrolla quote e scontrino
2|Turno della cucina|il registro della cucina|Una segnalazione è stata attribuita senza verifica.|falsifica la segnalazione e viene licenziat[A:o/a]|perde credibilità sulla segnalazione|distingue il turno dalla responsabilità
2|Ordine collettivo|l'ordine del pranzo|Una modifica non compare nella conferma dell'ordine.|addebita consapevolmente la spesa ad altri e viene licenziat[A:o/a]|perde credibilità sull'ordine|controlla la conferma prima di dividere i costi
2|Premio del team|la bacheca dei ringraziamenti|Un ringraziamento omette il contributo principale.|rivendica il contributo altrui e viene licenziat[A:o/a]|perde credibilità sul lavoro comune|riconosce i contributi documentati
2|Catering promesso|la lista del catering|La lista promessa non coincide con quella approvata.|finge un'approvazione mai ricevuta e viene licenziat[A:o/a]|perde credibilità sulla lista|separa la proposta dall'approvazione
3|Colloquio senza riscontri|il dossier del colloquio|Una valutazione cita un episodio non documentato.|fabbrica una testimonianza e viene licenziat[A:o/a]|perde credibilità sulla valutazione|si limita ai fatti verificabili
3|Obiettivi retroattivi|la scheda degli obiettivi|La data della scheda precede una modifica non comunicata.|nasconde la modifica e viene licenziat[A:o/a]|perde credibilità sugli obiettivi|ricostruisce le versioni della scheda
3|Nota riservata|la nota della direzione|Una nota riservata viene citata fuori dal proprio contesto.|diffonde una versione falsificata e viene licenziat[A:o/a]|perde credibilità sulla nota|chiede il contesto della nota
3|Promozione contestata|il verbale delle promozioni|Una motivazione manca degli elementi richiesti.|si attribuisce un risultato inesistente e viene licenziat[A:o/a]|perde credibilità sulla candidatura|distingue i risultati dalle intenzioni
3|Firma in delega|la delega di approvazione|La delega non copre la decisione presentata.|firma oltre la delega e viene licenziat[A:o/a]|perde credibilità sull'approvazione|controlla i limiti della delega
4|Coda di stampa|la coda della stampante|La stampante mescola pagine di due relazioni.|certifica la relazione mescolata e viene licenziat[A:o/a]|perde credibilità sulla relazione|ricontrolla intestazioni e numeri di pagina
4|Toner sul contratto|la copia di revisione|Una macchia copre una clausola della copia.|inventa il testo coperto e viene licenziat[A:o/a]|perde credibilità sulla revisione|segnala il tratto illeggibile
4|Scanner senza indice|l'indice delle scansioni|L'indice rimanda a un documento diverso.|allega consapevolmente una prova falsa e viene licenziat[A:o/a]|perde credibilità sull'archivio|confronta indice e documento
4|Fascicolo invertito|il fascicolo della consegna|Le pagine del fascicolo appartengono a versioni diverse.|spaccia il fascicolo per approvato e viene licenziat[A:o/a]|perde credibilità sul fascicolo|riordina soltanto le pagine riconoscibili
4|Firma fuori pagina|il foglio delle firme|Una firma appare sotto una decisione diversa.|attribuisce una firma alla decisione sbagliata e viene licenziat[A:o/a]|perde credibilità sulle firme|controlla il riferimento della firma
5|Navetta senza elenco|l'elenco della navetta|L'elenco omette una prenotazione confermata.|falsifica le presenze della trasferta e viene licenziat[A:o/a]|perde credibilità sulla prenotazione|confronta l'elenco con le conferme
5|Ricevuta del parcheggio|la ricevuta del parcheggio|L'orario della ricevuta non coincide con quello dichiarato.|presenta una ricevuta alterata e viene licenziat[A:o/a]|perde credibilità sulla nota spese|controlla data e orario
5|Badge del turno|il registro dei badge|Due accessi compaiono nello stesso minuto con dati diversi.|si attribuisce un accesso falso e viene licenziat[A:o/a]|perde credibilità sulla presenza|segnala la discrepanza degli accessi
5|Passaggio promesso|il calendario dei passaggi|Un passaggio proposto risulta segnato come confermato.|falsifica la conferma e viene licenziat[A:o/a]|perde credibilità sull'organizzazione|distingue proposte e conferme
5|Inventario del furgone|l'inventario del furgone|L'inventario riporta materiale non caricato.|certifica materiale assente e viene licenziat[A:o/a]|perde credibilità sull'inventario|conta soltanto il materiale presente
`,
  };
})(typeof window!=='undefined'?window:globalThis);
