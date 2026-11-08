# Last One Standing

Simulatore di battle royale, tutto in italiano. Crei il cast, scegli una delle 10 arene e guardi la partita fase per fase, fino all'ultimo concorrente rimasto in piedi.

## Cosa contiene
- **10 scenari**: Arena Classica, Reame Incantato, Stazione Orbitale, Città degli Infetti, Isola Battle Royale, Villa Maledetta, Terre Desolate, Night City — Zona Rossa, più Liceo Spietato e Ufficio Open Space (senza morti: si viene eliminati o licenziati).
- **13048 modelli di evento e 3229 disastri**, più **122 eventi e 31 disastri 18+** (9780 esiti di disastro complessivi). L'espansione aggiunge in ogni arena 300 eventi ordinari, 300 eventi di tratto, 300 prove con due esiti, 300 eliminazioni e 300 disastri locali, oltre ai repertori precedenti. I cataloghi sono composti da situazioni e strutture narrative riutilizzabili: non sono 13048 scene indipendenti scritte a mano. Accordo di genere automatico (lui / lei / neutro con ə) e preposizioni articolate corrette.
- **Voci dei concorrenti**: ai repertori precedenti si aggiungono **300 conversazioni a due battute e 300 reazioni brevi per arena**, legate al luogo, al rapporto e alla situazione. Un debito o una difficoltà vengono nominati soltanto quando esistono; gli imprevisti recenti vengono ricordati soltanto da chi era presente. Nella stessa partita una frase non si ripete finché ce ne sono altre compatibili.
- **96 condizioni meteo** (13 a Night City, 11 nell'Arena Classica, 9 nelle altre arene) che cambiano la giornata.
- **Concorrenti** con 10 caratteristiche (forza, agilità, intelligenza, carisma, fortuna, resistenza, furtività, coraggio, empatia, sopravvivenza), fino a 3 dei 30 tratti, squadra e foto.
- **Motore**: alleanze e tradimenti, oggetti (armi, cibo, medicine, trappole), stati (ferito, avvelenato, malato, affamato), pericolo crescente con i giorni, festino, disastri e scontro finale.
- **Seme**: stesso seme, cast completo e impostazioni danno la stessa partita, usando la stessa versione di motore e contenuti.
- **Ripresa fedele**: la partita generata viene conservata nel browser con il suo risultato completo, così un aggiornamento di testi o motore non cambia la storia già iniziata.
- **Archivio partite**: nomi personalizzati, confronto tra due risultati, importazione ed esportazione di replay completi.
- **Diretta** con tabellone, tacche dei superstiti, mappa collegata alla simulazione, elenco dei caduti e riproduzione automatica. La mappa mostra ogni zona come un segnaposto (grandezza secondo i presenti, anello colorato secondo il pericolo, segnali per caduti, trappole, chiusure e disastri) con i passaggi e gli spostamenti della fase come frecce animate; sotto c'è l'elenco delle zone con risorse, pericolo e riparo, oppure, toccando una zona, la sua scheda con immagine, presenti, passaggi cliccabili, fatti, trappole e bottino. Gli incontri richiedono la presenza nello stesso luogo.
- **Esito** con classifica, statistiche, grafici e locandina generata.
- Eventi personalizzati con anteprima, importazione ed esportazione in JSON, salvataggio nel browser e tema chiaro o scuro.

## Il sistema delle conseguenze
Ogni concorrente ha una memoria. Quello che succede cambia quello che succederà:
- **Affinità** tra ogni coppia di concorrenti: sale con aiuti e alleanze, scende con attacchi e furti.
- **Vendette**: chi perde una persona cara, un alleato o il proprio amore giura vendetta sull'assassino. La caccia diventa probabile e, se va a segno, viene raccontata ("Per Marco").
- **Debiti**: chi viene curato, salvato o aiutato resta in debito, ed esistono eventi per saldarlo (a volte nel modo più rumoroso possibile).
- **Coppie**: nascono amori. Se uno dei due muore, l'altro va in lutto e cerca vendetta. Se restano solo loro due, c'è un finale apposito.
- **Tradimenti e reputazione**: chi tradisce viene ricordato come traditore, chi uccide molto diventa temuto e gli altri si coalizzano.
- **Fama**: le imprese spettacolari attirano gli sponsor, che mandano doni da soli.
- **Fame**: la sazietà cala a ogni fase; chi ha provviste le mangia, chi non ne ha le cerca di notte (meglio con Sopravvivenza alta, una mappa e una zona ricca), e chi resta a zero si indebolisce fino a morire di stenti.
- **Oggetti con effetti veri**: l'amuleto può evitare una morte diretta di un evento (85%, certo per i Superstiziosi), poi si consuma; non protegge da tutti i danni periodici. La mappa aiuta nei disastri, veleni ed esplosivi abilitano eventi propri.
- **Stati temporanei**: ferito, malato, avvelenato, affamato, ubriaco, sconvolto, in lutto.
Sotto ogni evento la diretta mostra le conseguenze ("↳ Walter giura vendetta su Paola") e un'etichetta con il motivo dell'evento (Vendetta, Debito, Coppia, Lutto…).

## Condizione fisica ed ecosistema dell'arena
Ogni concorrente ha cinque valori da 0 a 100, visibili nella scheda e in forma ridotta nella lista "In gara":
- **Salute**: scende con attacchi, ferite, veleni, malattie, fame, predatori, trappole e indicatore dell'arena. Sotto 25 si sanguina a ogni fase. A zero si muore, e se la ferita era di qualcuno l'uccisione va a lui, con tutte le vendette che ne seguono. Una ferita senza cure può infettarsi.
- **Energia**: cala con l'attività e si recupera dormendo, meglio in alleanza (turni di guardia), con il partner o in una zona riparata. Chi è esausto combatte e ragiona peggio, e di notte è una preda.
- **Morale**: sale con amori, alleanze, salvataggi, sponsor e prove superate; scende con lutti, tradimenti, ferite, fame e solitudine. Chi è carico ha un bonus, chi è disperato può abbandonare l'alleanza o rubare il cibo agli alleati, a meno che il partner non lo consoli. Uccidere pesa sul morale di chi ha Empatia alta o è Pacifista, e galvanizza Spietati e Folli.
- **Sazietà**: vedi Fame.
- **Indicatore dell'arena**: Freddo (Arena Classica), Corruzione (Reame Incantato), Debito d'ossigeno (Stazione Orbitale), Infezione (Città degli Infetti), Terrore (Villa Maledetta), Radiazioni (Terre Desolate), Sovraccarico neurale (Night City), Ansia (Liceo), Stress (Ufficio). Ognuno sale e scende con regole proprie (notte, solitudine, ferite, morti viste da vicino, zone contaminate, uccisioni) e ha le sue difese (caratteristiche, alleati, portafortuna, cure).
- **Night City — Zona Rossa** (`cyberpunk`, decima arena, aggiunta in coda senza toccare i risultati delle altre nove): un distretto immaginario di Watson sigillato dopo un colpo ai dati andato male. Sette zone (Mercato di Kabuki, Megablocco, Clinica del ripperdoc, Club della braindance, Officina dei Maelstrom, Nodo dati corporativo e, al centro, la Piazza della torre, dove si parte e si chiude il finale; la consegna del fixer arriva al Mercato). Il **Sovraccarico neurale** sale a ogni fase secondo il pericolo della zona e le ferite, lo frenano Resistenza ed Empatia, e non cala mai da solo: servono cure, un kit usato da un alleato, il riposo assistito (nel Megablocco o alla Clinica, con un alleato accanto) o una diagnosi riuscita. Da 65 penalizza scontri, prove e sonno; a 100 toglie 12 punti di salute a ogni fase. Gli **impianti** (placcatura subdermale, interfaccia da polso, ottica cartografica, defibrillatore sottocutaneo…) funzionano come gli altri oggetti ma non si possono rubare, cedere, prendere come bottino o trovare a terra. 357 eventi e 32 disastri scritti per quest'arena (più 206 eventi e 19 disastri 18+: sesso esplicito e sboccato sempre tra adulti consenzienti, gore senza freni negli scontri e nei disastri, mai violenza a sfondo sessuale; compaiono solo con il filtro 18+ attivo), con prove di hacking, sabotaggio e diagnosi a due esiti, sempre sul posto e mai a distanza; 30 situazioni locali, 13 condizioni urbane, 10 armi in guida. Il distretto ha personaggi di contorno ricorrenti e originali, che non prendono mai il posto dei concorrenti: Nonna Kiku (fixer di ottantadue anni con il braccio cromato e i biscotti), Doc Ferraglia (il ripperdoc che canta l'opera mentre opera), DJ Saetta di Radio Zona Rossa (i bollettini del mattino e della notte cambiano ogni giorno), Gino il distributore parlante e permaloso, Pixel il gatto olografico del Mercato, e le corporazioni inventate Kagemura Dynamics, Orbis Pharma e Velltech. Voci, conversazioni, azioni e diario (per tutti i 30 tratti) sono scritti apposta per Night City. Dettagli e regressioni in `tools/test-cyberpunk.js`.

Ogni arena ha poi le sue regole:
- **Caratteristiche chiave**: tre caratteristiche contano di più per combattere e sopravvivere (per esempio Furtività, Agilità e Sopravvivenza in città, Coraggio ed Empatia nella villa). Non garantiscono un piazzamento: l'esito dipende anche da cast, tratti, equipaggiamento, eventi e seme.
- **Meteo del giorno**: 83 condizioni diverse (nebbia, tempeste solari, orde in migrazione, compiti di matematica…) che cambiano consumi, agguati, ricerca di cibo, prove e pericoli notturni.
- **Zone**: ogni luogo ha risorse, pericolo e riparo propri. Nel Battle Royale la tempesta chiude una zona al giorno e chi resta fuori perde salute. Nella Città degli Infetti un morso diventa infezione: gli alleati possono curarla con un kit medico se fatto in tempo, oppure cacciare l'infetto dal gruppo.
- **Oggetti**: le armi hanno una qualità (★ fino a ★★★) e possono rompersi; chi uccide fruga nello zaino della vittima; gli zaini di chi muore per l'arena restano nella zona per chi passa; le trappole vengono piazzate di notte e scattano sui concorrenti di passaggio (la vittima sa chi cercare); kit medici e cure abbassano gli indicatori.
- **Alleanze vive**: di notte gli alleati dividono il cibo (o lo negano, e nasce rancore), si medicano a vicenda, fanno i turni di guardia e respingono insieme gli assalti notturni.
- **La tempra**: chi è in salute e resistente a volte sopravvive a un colpo mortale, ridotto malissimo, e da lì la storia può andare in molti modi.

Le scelte degli eventi tengono conto di tutto questo: chi è ferito evita gli scontri e cerca cure, chi ha fame cerca cibo, chi è disperato tradisce più volentieri, le vittime più probabili sono i più deboli e stanchi. Nell'esito trovi le cause di morte, le conseguenze e il meteo di ogni giorno.

## Eventi: quanti e da dove vengono
La sezione Arena dice onestamente da dove vengono gli eventi: quelli **scritti a mano** (propri dell'arena e condivisi con altre arene) e quelli **combinati** dai 30 luoghi descritti di ogni arena con frasi-tipo comuni. Il quarto pacchetto (`src/content/pack4-*.js`) aggiunge circa 690 eventi scritti a mano, da 72 a 95 per arena, ognuno con conseguenze reali.

**Carattere e prove legati alla situazione** (`pack4-carattere.js`, `pack4-carattere-soft.js`): gli eventi di tratto e le prove scattano solo quando la condizione è vera in quel momento: una ferita, la fame, lo sfinimento, il morale a terra, il pericolo dell'arena alto, il meteo, l'obiettivo, un rancore, un debito, una coppia, un oggetto nello zaino. Il tratto o la caratteristica decide l'esito, e l'esito lascia segni concreti: salute, energie, oggetti, rapporti. Le prove e i tratti generici combinati dai luoghi hanno ora un peso molto più basso, quindi in una partita compaiono circa 3 prove generiche e una dozzina scritte a mano.

## Oggetti
Tredici tipi di oggetto, con nomi diversi in ogni arena: armi, protezioni, cure, cibo, attrezzi, mappe, trappole, esplosivi, veleni, portafortuna, alcol, merce di scambio e ricordi di casa. Nell'Arena c'è la guida completa (sezione "Gli oggetti e a cosa servono").
L'espansione aggiunge **300 oggetti per arena**, distribuiti in dieci delle famiglie esistenti. Sono combinazioni di modelli, materiali e formati: usano gli effetti, la qualità, l'usura e la provenienza già registrati dal motore, senza attribuire poteri impliciti ai nomi.
- **Ogni oggetto ha una scheda scritta a mano** (`src/content/_oggetti*.js`): le 540 varianti del mondo (6 per tipo in ognuna delle 10 arene) e tutti gli oggetti dei lessici («una katana», «un gossip esplosivo», «la foto del gatto») hanno una descrizione e i propri effetti. Anche le finiture contano: «con laccio da polso» dà +1 alle prove di Agilità, «in una scatola sigillata» guarisce le febbri, «con fodera trapuntata» assorbe di più.
- **Effetti veri, usati dal motore**: forza negli scontri e durata delle armi, danno assorbito dalle protezioni, bonus (e malus) alle prove di una caratteristica, difesa dalle aggressioni notturne, protezione dall'indicatore dell'arena (freddo, corruzione, ossigeno, infezione, terrore, radiazioni, ansia, stress), quanto cura e cosa guarisce una cura, quanto sfama un cibo (e se dà energia o morale), conforto di amuleti e ricordi nelle notti peggiori, aiuto a trovare cibo, valore negli scambi (l'avido si accontenta di una merce preziosa), danno delle trappole. La scheda mostra queste utilità con gli stessi numeri del motore.
- **Zaino con peso**: al massimo 8 oggetti e 8 posti di peso (±1 ogni 2 punti di Forza oltre o sotto 5). Una scure ne occupa 3, un pugnale 1, un ricordo o un amuleto nessuno. Se non c'è posto, l'oggetto meno utile in quel momento resta a terra nella zona, dove altri possono trovarlo; il diario lo racconta.
- **Ogni oggetto ha una storia**: lo zaino nella scheda mostra cosa fa, la qualità (★), l'usura, e da dove viene ("Portato da casa", "Rubato a Marco · G3", "Preso a Lapo", "Dono degli sponsor", "Scambiato con Irene"…).
- **Usura**: le armi si consumano a ogni colpo e si rompono; le protezioni riducono i danni e a volte parano un colpo mortale, poi si spaccano.
- **Costruire**: chi è ingegnoso intinge l'arma nel veleno (poi avvelena a ogni colpo), unisce trappola ed esplosivo, ripara le armi con un attrezzo, si costruisce trappole.
- **Scambi**: di notte chi ha fame o è ferito compra cibo e cure con merce, alcol o armi in più. L'avido chiede il doppio, il generoso regala.
- **Ricordi**: ognuno parte con qualcosa scelto dal suo carattere (una foto di famiglia, una fiaschetta, un portafortuna…). I ricordi tengono su il morale; le lettere d'amore e i ricordi di chi non c'è più ancora di più.
- **Bottino e sponsor**: chi uccide prende il meglio dallo zaino della vittima, il resto resta nella zona; gli sponsor aggiungono quello che serve di più a chi aiutano.

## Carattere e vita interiore
- **Obiettivi**: ognuno ha uno scopo che cambia con quello che succede (vendetta, proteggere chi ama, trovare cibo, curarsi, nascondersi, andare a caccia, conquistare il pubblico, trovare alleati, conquistare una persona, tradire in segreto). L'obiettivo decide dove si va di giorno e quali eventi si cercano: chi vuole vendetta segue le tracce del bersaglio, chi ha fame va nelle zone ricche, chi è ferito si nasconde, gli alleati restano insieme.
- **Gesti notturni secondo i tratti**: il Carismatico e il Leader reclutano, il Pacifista e il Clemente mettono pace, il Bruto e l'Avido fanno i prepotenti, l'Impulsivo attacca briga, il Guaritore cura anche gli sconosciuti, il Generoso regala, il Furtivo ruba di notte e scopre i complotti, il Romantico scrive lettere, il Sonnambulo si sveglia dall'altra parte dell'arena, il Superstizioso fa i suoi riti, l'Ubriacone beve, l'Ingegnoso costruisce, il Cacciatore sfama il gruppo, il Leale giura protezione, il Solitario se ne va. Anche le caratteristiche alte contano (Intelligenza, Fortuna, Empatia).
- **Cuori**: nascono cotte segrete; prima o poi ci si dichiara, e si può essere ricambiati o respinti. Chi ama in segreto qualcuno che si mette con un altro diventa geloso, a volte vendicativo.
- **Complotti**: chi tradisce per natura (o per disperazione) sceglie in segreto la sua vittima nell'alleanza; una spia può smascherarlo prima che colpisca.
- **Rapporti umani**: nella scheda, "Cosa prova per gli altri" mostra per ogni persona un'etichetta (Amore, Cotta segreta, Vendetta, Amico fidato, Alleato, In debito, Diffidenza, Nemico…), l'affinità e i ricordi in prima persona: «Mi ha salvato la vita», «Mi ha negato il cibo», «Ha ucciso Lapo».
- **Diario segreto**: ogni notte (e a volte di giorno) ognuno scrive una pagina: pensieri, paure, segreti e anche i fatti che la diretta non ha mostrato. Le pagine e la storia completa dei ricordi restano consultabili; gli otto ricordi recenti usati dal motore sono separati dall'archivio storico. Nella lista "In gara" un'etichetta "diario" segnala chi ha una pagina nuova.

## Eventi che leggono la storia
Il formato degli eventi conosce tutto quello che succede nella partita, quindi ogni evento nasce da qualcosa e lascia qualcosa:
- `crush:A>B` (A ha una cotta segreta per B), `plot:A>B` (A sta tramando contro B), `goal:A=vendetta` (l'obiettivo del momento);
- `stat:A<hp40`, `stat:A>mo75`, `stat:B>pr60` (salute, energia, morale, sazietà, indicatore dell'arena) e i relativi effetti `hp:A-20`, `mo:A+15`, `pr:A-30`;
- `wx:buio`, `wx:abbondanza`, `wx:pericolo`, `wx:calma` (il meteo del giorno);
- i nuovi oggetti: `+armatura:A`, `con:A=attrezzo`, `-valore:A`, `{ricordo:A}`, `{alcol}` e così via.

## Relazioni
Ogni concorrente prova qualcosa di diverso per ognuno degli altri, e non sempre è ricambiato.
- **Sei dimensioni per ogni legame, in una sola direzione**: Fiducia, Affetto, Rispetto, Paura, Attrazione e Conoscenza. Si può amare chi non ricambia, temere chi ci rispetta, fidarsi di chi sta tramando.
- **Ogni ricordo cambia il legame**: essere salvati, curati, derubati, feriti, traditi, risparmiati, aiutati da uno sconosciuto. Il carattere modula la reazione: il Paranoico si fida a fatica e perde la fiducia in fretta, il Clemente perdona, il Vendicativo amplifica i torti, il Codardo si spaventa di più, il Romantico si innamora prima.
- **Etichette umane**: Amore, Ex, Cotta segreta, Bersaglio segreto, Nemesi, Vendetta, Rivale in amore, Terrore, Paura, Gratitudine, Fratelli d'armi, Amico fidato, Mentore, Da proteggere, Complice, Alleato di comodo, Rivale, Ammirazione, Senso di colpa, Odio, Diffidenza, Antipatia, Simpatia…
- **Testimoni**: chi vede un'uccisione comincia a temere (e a volte a disprezzare o ammirare) chi l'ha commessa; la notizia si sparge, e chi uccide molto diventa temuto da tutti.
- **Voci di corridoio**: di notte le opinioni passano da un concorrente all'altro, pesate dalla fiducia in chi parla. Chi trama racconta calunnie: a volte funzionano, a volte chi ascolta se ne accorge.
- **Promesse**: tra chi si fida nascono giuramenti di fedeltà, di protezione, di dividere il cibo e di vendetta («se mi succede qualcosa, vendicami»). Vengono mantenute o tradite nei momenti decisivi, e chi le tradisce lo paga caro.
- **Pietà**: chi ama, rispetta o conosce bene la vittima a volte abbassa l'arma all'ultimo; chi viene risparmiato resta in debito.
- **Amore che cresce**: l'attrazione aumenta stando vicini, nascono cotte, triangoli, dichiarazioni (accettate o respinte), rotture quando la fiducia crolla e ritorni di fiamma.
- **Dinamiche di gruppo**: coalizioni contro chi fa paura, chi è terrorizzato si mette sotto la protezione del più forte (con un tributo), i mentori insegnano a chi è indietro, le alleanze piene di diffidenza si spaccano in fazioni, i rancori minori si consumano col tempo, nemici sopravvissuti insieme a un disastro si riavvicinano.
- **Ogni morte pesa in modo diverso**: lutto per chi amava, sollievo per chi odiava, liberazione per chi aveva paura, omaggio dei rivali che rispettavano, senso di colpa per chi ha ucciso qualcuno a cui teneva.
- **Tutto è collegato**: fiducia e paura decidono alleanze, spostamenti (chi ha paura cambia zona), chi condivide il cibo, a chi credono le spie, chi il traditore sceglie come vittima (chi si fida di più) e quali eventi accadono (`trust:A>B`, `fear:A>B`, `respect:A>B`, `attract:A>B`, `rival:AB`, `ex:AB`, `close:AB`, `promise:A>B`, e gli effetti `fid:`, `ris:`, `pau:`, `amo:`, `promise:A>B=protezione`, `breakup:AB`, `reunite:AB`).

**Coerenza dei rapporti** (regole verificate da `tools/test-relations.js`):
- *Chi entra in un'alleanza deve poter stare con tutti i membri*, non solo con chi lo invita: un rancore aperto, un affetto o una fiducia molto negativi, o una ferita recente (tradimento, colpo, furto, umiliazione negli ultimi giorni) impediscono il patto. Vale per eventi, reclutamenti, coppie, coalizioni e protezione.
- *Le alleanze si sciolgono quando il rapporto si guasta*: se tra due membri nasce un rancore o una ferita fresca, chi ha subito se ne va, con un evento che lo racconta. Chi trama in segreto invece resta: è il senso del complotto.
- *Il tono decide chi partecipa*: un gesto amichevole (alleanza, dono, cura, bacio, aiuto) non coinvolge chi si odia, un'aggressione non colpisce chi si ama o un amico stretto (salvo follia, ubriachezza, tradimento o quando ne restano pochi). Nelle prove conta l'esito voluto, non il fallimento.
- *Il disgelo è lento*: dopo un torto la fiducia e l'affetto risalgono a piccoli passi; il perdono toglie il rancore ma non cancella tutto. I dialoghi seguono il rapporto reale: rivali, alleati, amici, coppie.

**Il contesto degli eventi** («Il contesto» sotto ogni evento) spiega perché quelle persone, in quel momento, con fatti già accaduti: il motivo richiesto dall'evento (un rancore e la sua causa, un debito, una cotta, un obiettivo, la condizione fisica), oppure il ricordo più recente che c'entra con il tono del gesto («Bruno ricorda quello che è successo ieri con Vito: «Ha ucciso Oscar.»»), oppure lo stato del rapporto («Tra Rocco e Aldo non corre buon sangue»). Se non c'è niente di pertinente da dire, il contesto non compare.

Dove si vede: nella diretta, la scheda **Legami** ha in cima il riepilogo (alleanze, coppie, vendette, debiti) e la **mappa dei legami**: un grafo dei vivi colorato per tipo di legame, con i nomi accanto ai volti, frecce per i sentimenti non ricambiati e filtri con il conteggio. Toccando un volto lo si seleziona: si accendono solo i suoi legami e sotto compare l'elenco, in parole, di cosa prova verso ciascuno e cosa riceve in cambio, con il pulsante per aprire la scheda. Seguono alleanze, coppie, vendette e debiti in schede leggibili. Nella scheda di ogni concorrente, "Cosa prova per gli altri" mostra etichetta, dimensioni, cosa prova l'altro in cambio e i ricordi; "Promesse" elenca quelle fatte e ricevute e come sono finite. Nell'esito, **Le storie della partita** raccontano il grande amore, l'amicizia più forte, la nemesi, il tradimento più crudele, il gesto di pietà, l'amore non corrisposto, maestro e allievo, l'odio e la paura più grandi.

## Caratteristiche, tratti e prove
- **Prove di abilità**: molti eventi sono una sfida su una caratteristica, con due esiti scritti. Il tiro somma caratteristica, due dadi da sei (2–12), fortuna e tratti, e sottrae le condizioni (ferito, ubriaco, affamato…). La diretta mostra "Prova di Agilità · superata 15/11". La probabilità di riuscita dipende dalla difficoltà della prova e dalla condizione del concorrente.
- **Eventi riservati** a chi ha una caratteristica molto alta o molto bassa, o un certo tratto.
- **Effetti sul sistema delle conseguenze**: l'empatia rende più facili lutti e vendette, il coraggio riduce fughe e shock, la sopravvivenza ritarda la fame e protegge dai disastri, il carisma accelera alleanze e fama, la resistenza allontana le morti per ferite e malattie. Tra i tratti: il Vendicativo giura vendetta per poco, il Clemente perdona, chi è Superstizioso viene sempre salvato dall'amuleto, il Goloso patisce prima la fame, il Leader guida alleanze più grandi.

## Contenuti 18+
Un interruttore nella sezione Arena, attivo solo dopo la conferma dell'età, aggiunge eventi e disastri con violenza esplicita, linguaggio volgare, alcol e sostanze e allusioni sessuali tra adulti. Non è disponibile nel Liceo, perché i personaggi sono studenti.

## Animazioni
- **Atmosfera per arena**, disegnata su canvas e diversa per ognuna: lucciole e foglie (Classica), scintille magiche e stelle cadenti (Reame), stelle in corsa e scansione laser (Stazione), spore tossiche e luci che sfarfallano (Infetti), vento, paracadute e zona che pulsa (Battle Royale), nebbia, pipistrelli e fulmini (Villa), sabbia e braci (Terre Desolate), pioggia sottile, scintille al neon e glitch (Night City), aeroplanini e cuori (Liceo), fogli volanti (Ufficio). L'intensità cresce con il pericolo: più forte nei disastri e nel finale, più calma di notte.
- **Effetti legati agli eventi**: fendente e scossa per le uccisioni, disturbo dell'immagine per i tradimenti, cuori per gli amori, volti che si avvicinano per le alleanze, onda verde per gli aiuti, riflesso per il bottino, dado che gira per le prove di abilità, conseguenze che compaiono una dopo l'altra.
- **Cambi di fase**: alba, calare della notte, gong d'apertura, festino dorato, cannone per i caduti, faro per il finale; ogni arena ha il suo disastro (fuoco, onda d'urto, sirena, nube tossica, bombardamento, fulmine, tempesta di sabbia, campanella, glitch).
- **Sezioni**: panoramica con parallasse e braci nella home, locandine che si inclinano seguendo il mouse, schede che entrano a cascata, cerimonia del vincitore con podio che sale, grafico che si disegna e coriandoli a tema con l'arena.
- Tutto si ferma se il sistema chiede di ridurre le animazioni.

## La sezione Concorrenti
- **Schede ricche**: volto grande con anello del colore di squadra, squadra, un profilo in miniatura delle dieci caratteristiche (verde i punti forti, rosso quelli deboli) con «Forte in…» e «Debole in…» su due righe, tratti e un invito a aggiungerne.
- **Modifiche sul posto**: il nome si scrive direttamente sulla scheda, il genere si cambia con un selettore che scivola, il volto si tocca per cercare o caricare una foto.
- **Cerca una foto**: toccando il volto si apre un piccolo motore di ricerca, già compilato con il nome del concorrente (con nome e cognome parte da solo). Toccando un risultato la foto viene scaricata, ritagliata in quadrato tenendo la parte alta dei ritratti e applicata. Le fonti:
  - **Anime e giochi** (la prima, e il browser ricorda l'ultima scelta): personaggi da AniList (con MyAnimeList come riserva) e dalla Wikipedia inglese. Con il campo facoltativo *Serie o gioco* («Final Fantasy», «One Piece», «Zelda»…) cerca anche nel wiki Fandom della serie, che ha pure i personaggi minori, e mette prima i personaggi di quella serie.
  - **Persone note** (Wikipedia italiana, poi inglese, comprese le immagini non libere dei personaggi), **Foto libere** (Openverse) e **Archivio** (Wikimedia Commons).
  - **Web**, come un motore di ricerca: il pulsante compare sul sito pubblicato; se la funzione `api/immagini.js` non risponde o non ha ancora la chiave, la finestra dice esattamente cosa manca. Serve una chiave della [Brave Search API](https://brave.com/search/api/) (vedi sotto). L'API immagini di Google è chiusa ai nuovi utenti dal 2026 e si spegne nel 2027, quindi non si può collegare.
  
  Se un sito non concede l'immagine al browser (capita con i wiki Fandom e con MyAnimeList), la foto la scarica il server del sito tramite `api/immagine.js`, un piccolo proxy senza chiavi che accetta solo immagini da indirizzi https pubblici, fino a 6 MB e solo dalle pagine del sito; se anche questo non basta si prova il proxy pubblico wsrv.nl, poi l'immagine originale al posto della miniatura. Si può anche incollare un link, incollare o trascinare un'immagine, o caricarla dal dispositivo; senza internet resta il caricamento da file. Le immagini restano dei loro autori: la foto è salvata solo nel browser, per giocare.

  **Attivare la fonte Web**: crea una chiave su [api-dashboard.search.brave.com](https://api-dashboard.search.brave.com) (piano Search; ogni mese c'è un credito gratuito di circa 1.000 ricerche, poi si paga a consumo). Poi in Vercel apri *Project → Settings → Environment Variables*, aggiungi `BRAVE_API_KEY` con la chiave e rifai il deploy. La chiave resta sul server; la funzione risponde solo alle pagine del sito e tiene in cache per un giorno le stesse ricerche.
- **Menu delle azioni** (⋯) su ogni scheda: sposta prima o dopo, duplica, caratteristiche casuali, elimina. Eliminare (anche tutto il cast) si può **annullare** dal messaggio che compare.
- **Panoramica del cast**: un pannello con i numeri grandi e la loro parola sotto (concorrenti, squadre con i colori, lui, lei, neutri, media, foto), i tratti più diffusi con il conteggio a parte, e la ricerca per nome, tratto o squadra.
- **Vista per squadra** con media di ogni squadra e un **+** per aggiungere un concorrente direttamente in quella squadra.
- **Scheda di modifica** con radar delle caratteristiche che si aggiorna dal vivo, profili pronti (Combattente, Stratega, Sopravvissuto, Ombra, Leader, Cuore d'oro, Fortunato), descrizione della caratteristica sotto il cursore e tratti incompatibili bloccati con la spiegazione (Leale e Traditore, Pacifista e Spietato, Fortunato e Sfortunato…).
- **Aggiornamenti sul posto**: aggiungere un concorrente o chiudere la scheda di modifica cambia solo la scheda interessata; le altre restano ferme, senza ricaricarsi né rifare l'animazione d'ingresso.
- **Animazioni**: le schede vengono distribuite come carte quando si genera un cast, scivolano al loro posto quando si riordinano, trascinano o si ricompongono le squadre, entrano con un alone quando si aggiungono o duplicano, svaniscono quando si eliminano; il profilo in miniatura si rimescola con i valori casuali, il radar si trasforma da un profilo all'altro, il conteggio dei concorrenti scorre. Tutto rispetta l'impostazione «riduci movimento».
- **Sul telefono** le opzioni secondarie (squadre, vista, importa, svuota) si aprono con «Altre opzioni» e la panoramica si compatta.

## Interfaccia
- **Caratteri**: Bricolage Grotesque per titoli e numeri, Figtree per il testo; JetBrains Mono resta solo per il seme e il codice. Niente maiuscolo forzato né lettere spaziate: le etichette sono frasi normali, i numeri stanno sopra la loro parola invece di essere ammassati in una riga.
- **Riquadri**: angoli più morbidi, bordi chiari e ombre leggere; meno pannelli grigi annidati.
- **Home** con partita lampo (24 concorrenti casuali, arena a sorpresa) e un tabellone dimostrativo animato.
- **Concorrenti**: griglia o vista per squadra, nome modificabile sul posto, scheda laterale per tratti, caratteristiche e foto, elenco da incollare.
- **Arena**: ogni arena ha la sua tinta che colora tutta l'app. Le dieci locandine stanno in una griglia a tre colonne in cui l'ultima, rimasta da sola, occupa tutta la riga (sul telefono in un carosello da sfogliare con il dito o con le frecce, che porta la scelta al centro).
- **Guida all'arena**: copertina illustrata, i numeri principali in grande e cinque capitoli navigabili anche con le frecce:
  - *Mappa*: le zone con immagine e barre di risorse, pericolo e riparo (con «più ricca», «più pericolosa», «miglior riparo»), la regola speciale con il suo indicatore a lancetta e le caratteristiche che contano, l'armeria e i pericoli appesi come manifesti «ricercato».
  - *Clima*: ogni meteo con illustrazione, descrizione ed effetti veri sul gioco (più cibo, più fatica, agguati più facili, l'indicatore che sale…).
  - *Minacce*: i disastri con illustrazione e ricerca; toccandone uno si aprono i tre destini (non sopravvive, ne esce ferito, si salva) raccontati con un concorrente del tuo cast.
  - *Zaino*: un inventario a caselle; ogni oggetto ha la sua scheda con i nomi che prende in quell'arena.
  - *Anteprima*: una mini diretta con tre momenti di una partita breve e «Un altro assaggio».
- **Immagini della guida**: ogni luogo, pericolo, arma, meteo, disastro e oggetto può avere un'immagine vera in `assets/arene/<arena>/<sezione>/<nome>.webp`; finché manca, `src/atlas.js` disegna un'illustrazione con i colori dell'arena, scelta per famiglia (fuoco, acqua, gelo, fulmini, bestie, sciami, magia, tecnologia, burocrazia, spettacolo…). Per luoghi, pericoli e armi c'è un brief scritto voce per voce (`tools/atlas-brief.js`): `node tools/atlas-slots.js` lo trasforma in [docs-dev/immagini-arene.md](docs-dev/immagini-arene.md) (stile di riferimento, impostazioni di Midjourney v8.2, moodboard e riferimenti di stile, nome del file, cosa mostrare, comando per l'immagine e, per luoghi e pericoli, comando per il video d'ambiente in loop) e in un CSV; `tools/test-atlas-brief.js` controlla che nessuna voce resti senza brief. Meteo, disastri e oggetti seguiranno.
- **Regole della partita**: difficoltà con un misuratore a tacche, durata con cursore e valore a parte, interruttori per le squadre e i contenuti 18+; seme e Laboratorio di bilanciamento sono raccolti in «Seme e strumenti».
- **Barra di avvio** sempre visibile in basso: arena scelta, concorrenti, difficoltà e durata, con il pulsante «Avvia la simulazione».
- **Diretta**: regia in stile televisivo, mappa, caduti, alleanze, scheda di ogni concorrente con la sua storia, riproduzione automatica e tasti freccia.
  - **Nomi delle fasi** per esteso e nel lessico dell'arena, senza sigle: «Secondo giorno», «Terza notte», «Primo ciclo notturno» (Stazione Orbitale), «Dopo scuola del primo giorno» (Liceo), «Straordinari del primo giorno» (Ufficio). Il bilancio dei caduti ha il nome del rito di ogni arena (*I colpi di cannone*, *Le campane del reame*, *Il rapporto di bordo*, *Le scrivanie vuote*…) con il sottotitolo «Bilancio del secondo giorno».
  - **Durata chiara**: l'intestazione mostra «Limite: N giorni» e «Fase k di N». Lo scontro finale ha un gruppo a sé nella linea del tempo, con gli atti numerati («Scontro finale · atto 2 di 4»). Il primo atto spiega perché è iniziato: limite raggiunto, pochi superstiti prima del limite o due innamorati rimasti soli. L'esito dice «4 giorni su 10 al massimo».
  - **Linea del tempo** raggruppata per giorno (o ciclo), poi «Finale» e «Da scoprire» in modalità senza spoiler; ogni pulsante ha il nome completo della fase.
  - **Barra di lettura** sopra gli eventi: filtri per tipo con il conteggio (Eliminati, Alleanze, Amore, Aiuti, Oggetti, Colpi bassi, Altro), densità *Comoda* o *Compatta* e il pannello **Opzioni**. Da lì si può scegliere cosa mostrare negli eventi (reazioni, luogo, motivo, contesto aperto, volti), il testo grande, l'ordine (storia o prima i più gravi), solo i concorrenti seguiti, e le opzioni di riproduzione. Le preferenze restano salvate.
  - **Scheda del concorrente**: intestazione fissa con volto, nome e quattro schede interne. In alto un riquadro nel colore della squadra (stato, squadra, tratti, «Segui nella diretta») e quattro numeri: uccisioni, eventi vissuti, alleati in gara (o fase dell'uscita), prove riuscite.
    - *Adesso* (o *Com'è finita*): il luogo con la sua immagine, lo stato in una frase, obiettivo e pensiero; la condizione fisica con valore e giudizio («buona», «critica», soglia del pericolo dell'arena) e lo zaino.
    - *Legami*: alleati con nome, reputazione e conti in sospeso, cosa prova per gli altri (con la legenda della barra) e le promesse.
    - *Storia*: il percorso nel dettaglio, la cronaca raggruppata per giorno con il colore di ogni tipo di evento e il diario segreto.
    - *Profilo*: tratti con la loro descrizione e caratteristiche, con le stelle di quelle che contano di più nell'arena.
  - **Eventi tematizzati per tipo**: ogni carta ha colore, bordo, etichetta e filigrana del suo tipo (eliminazione, tradimento tratteggiato, amore, cura, oggetto…), il luogo con il segnaposto e le note di meteo e finale con la loro icona.
- **Esito**: podio, premi, momenti salienti, grafico dei superstiti, classifica e locandina.

## Strumenti di gioco

- **Legami iniziali**, nella sezione Concorrenti: amicizia, rivalità e coppia sono reciproche; fiducia e attrazione hanno una direzione. Ogni persona può avere una sola coppia e una sola cotta iniziale. I rapporti entrano nel motore e nei ricordi, ma possono cambiare durante la partita. Le coppie non creano automaticamente un'alleanza. Fino a 200 legami, inclusi nell'esportazione della configurazione come `legami`.
- **Concorrenti seguiti**: dalla scheda personale puoi seguirne uno o più. La diretta evidenzia i loro eventi, li mette in cima alla lista dei vivi e offre un filtro facoltativo. La scheda include un percorso cronologico con eventi, diario, ricordi e cambiamenti di stato, salute, partner e zaino fino alla fase selezionata; registra anche le eliminazioni attribuite dopo l'uscita. Le variazioni dello zaino confrontano i dati di fine fase: non descrivono movimenti intermedi non registrati. Avvisi generali e memoriali restano visibili. La preferenza è locale al browser e non cambia la simulazione.
- **Le svolte della vittoria**: nell'esito, una selezione di incontri, aiuti, eliminazioni e colpi di scena realmente registrati permette di tornare alle fasi corrispondenti. Include gli aiuti ricevuti conservati nei ricordi e la storia dello zaino a fine fase. È un percorso narrativo, non una misura delle cause decisive della vittoria: la sola presenza di un oggetto non dimostra che abbia deciso l'esito.
- **Editor avanzato e pacchetti**, dentro Eventi personalizzati: modifica o duplica gli eventi, usa il formato completo del motore con requisiti e prove a due esiti, oppure importa un pacchetto JSON. L'intero pacchetto viene validato prima di aggiungere eventi; cast e regole restano invariati. Limite complessivo: 200 eventi. La [guida al formato](docs-dev/eventi.md) elenca i tag.
- **Laboratorio di bilanciamento**, nella sezione Arena: esegue da 5 a 200 partite con il cast e le regole attuali su semi distinti. Mostra vittorie, frequenze osservate, posizione media, eliminazioni e cause di uscita. Per ogni caratteristica confronta le fasce 1–4, 5–7 e 8–10: vittorie, presenze e frequenza, con differenza alta–bassa in punti percentuali quando entrambe le fasce esistono. Sono associazioni nel cast scelto, non effetti isolati: tratti, altre caratteristiche e squadre possono spiegare le differenze. Puoi interrompere il campione e conservare le osservazioni parziali. Non sostituisce né archivia la partita aperta; il JSON copiabile comprende risultati e configurazione completa per riprodurre il campione nella stessa versione.
- **Stagioni e tornei**, nella Home: conserva cast, legami, eventi e regole alla creazione; ogni round usa un nuovo seme derivato dal seme originale. La classifica assegna a ogni concorrente 1 punto per partecipazione, 3 per vittoria e 1 per eliminazione attribuita. Ogni membro della squadra vincente riceve i punti vittoria. A parità valgono vittorie, posizione media e infine nome. I nuovi round conservano anche premi cumulativi (aiuti, cure, promesse mantenute, prove, costruzioni, tradimenti) e legami ricorrenti riconosciuti in almeno due esiti. Le rivalità non vengono trasferite automaticamente al motore del round successivo: ogni round riparte dai legami iniziali. I vecchi round privi di dettagli valgono sempre per la classifica; la copertura dei premi è indicata. Fino a 50 stagioni e 200 round per stagione, salvati sul browser. Il salvataggio della classifica viene verificato prima di dichiararlo riuscito.

In **Salva o importa una stagione** puoi esportare cast, regole, classifica, premi e i replay disponibili in un unico JSON, oppure scegliere il pacchetto senza replay. Il limite è 50 MB; per stagioni molto grandi puoi esportare la classifica e salvare i singoli replay dall'archivio. Se un vecchio round ha ancora il replay, l'esportazione con replay ne recupera anche premi e legami. L'importazione controlla tutti i dati e la corrispondenza tra replay e classifica prima di aggiungere una nuova stagione; assegna nuovi ID ai replay. Un errore dell'archivio conserva la classifica importata e segnala i round senza replay, così non appaiono salvati quando non lo sono. Cast corrente e partita aperta restano quelli scelti dall'utente. L'esportazione generale della configurazione continua a essere distinta dal pacchetto stagionale.

L'archivio delle partite consente di riaprire, rinominare, confrontare ed esportare risultati immutabili. Importare un replay assegna un nuovo identificativo e non risimula il risultato. Configurazioni, preferenze e stagioni dipendono dalla memoria del browser: cancellare i dati del sito le rimuove.

## Struttura
```
src/data-core.js     eventi di base, tratti, caratteristiche, nomi
src/data-themes.js   i 9 scenari (lessico, testi di fase, eventi speciali)
src/content/_systems.js  sistema delle conseguenze: frasi di eco, oggetti speciali, eventi di legame
src/content/_ecology.js  ecosistema delle arene: regole, indicatori, meteo, zone e testi delle conseguenze automatiche
src/content/_items.js    catalogo degli oggetti, obiettivi, gesti dei tratti, diario segreto e ricordi dei rapporti
src/content/_voices.js   battute dei concorrenti e conversazioni notturne
src/content/_relazioni.js dimensioni dei legami, etichette, effetti dei ricordi, promesse, voci di corridoio e testi delle dinamiche
src/content/pack3-relazioni.js eventi che nascono da fiducia, paura, rispetto, attrazione, promesse ed ex
src/content/_extras.js   meteo aggiuntivo per ogni arena
src/content/pack2-*.js   secondo pacchetto per ogni arena, legami comuni e sopravvivenza
src/content/pack-*.js    pacchetti per arena (eventi, disastri, 18+), condivisi e per adulti
src/content/*.js         eventi aggiuntivi e disastri della versione precedente
src/engine.js        motore di simulazione (funziona anche in Node)
src/engine-systems.js sistemi isolati: inventario, danni, ricordi, varietà, snapshot e registro oggetti
src/art.js           usa logo e illustrazioni da assets/ (con ripiego in SVG), icone, coriandoli
src/atlas.js         immagini della guida delle arene: file in assets/arene/<arena>/ o illustrazioni vettoriali per famiglia
assets/              logo, icona, panoramica, anteprima dei link, sagome dei concorrenti e illustrazioni delle arene (Night City per ora usa un'illustrazione vettoriale provvisoria, vedi ASSETS.md) (ottimizzati e incorporati dalla build)
src/anim.js          motore delle animazioni: atmosfere per arena, effetti degli eventi, transizioni, coriandoli
src/replay.js        risultati immutabili nel browser, con IndexedDB e ripiego su localStorage
src/simulator.js     esecuzione asincrona del motore in Web Worker, annullamento e ripiego compatibile
src/studio.js        legami iniziali, seguiti, percorsi narrativi, eventi avanzati, laboratorio e stagioni
src/photo-search.js  ricerca delle foto dei concorrenti (AniList, Fandom, Wikipedia, Openverse, Commons, web) e ritaglio
api/immagini.js      funzione Vercel per la fonte Web (Brave Search API, attiva con BRAVE_API_KEY)
api/immagine.js      proxy d'immagini del sito per le foto che i siti non concedono al browser
src/experiments.js   esperimenti con semi accoppiati e una sola caratteristica variata
docs/                versione per il web (Vercel o GitHub Pages): pagina leggera e immagini in docs/img con l'impronta nel nome, servite con cache lunga
src/ui.js            interfaccia
src/style.css        stile
src/shell.html       markup
tools/build.js       crea dist/last-one-standing.html (file unico con immagini incorporate, per l'artifact) e docs/ (sito web)
tools/test-engine.js test del motore senza browser
tools/lint-content.js controllo statico dei contenuti
tools/fuzz.js        collaudo con partite casuali
tools/atlas-slots.js documentazione delle immagini della guida (docs-dev/immagini-arene.md e .csv) dal brief in tools/atlas-brief.js
docs-dev/eventi.md   guida completa ai requisiti, effetti e testi degli eventi
.github/workflows/quality.yml CI con regressioni, determinismo, fuzz e verifica della build
```

## Comandi
```
node tools/build.js             # crea il file unico in dist/last-one-standing.html
node tools/check.js             # tutti i controlli mirati, anche in CI (Node 24)
node tools/lint-content.js      # controlla tutte le righe di evento e disastro (sintassi, partecipanti, segnaposto, grammatica di base)
node tools/test-consequences.js # regressioni su consumi, trasferimenti, salvataggi e formato degli eventi
node tools/test-import.js       # importazione atomica, ID, eventi personalizzati e compatibilità dei salvataggi
node tools/test-state-history.js # responsabilità dei danni differiti, valori vitali e durata delle promesse
node tools/test-timeline.js      # statistiche e promesse nella fase corretta della diretta
node tools/test-rendering.js     # accordi, pronomi, battute e metadati dei colpi evitati
node tools/test-replay.js        # archivio dei risultati, immutabilità e guasti della memoria del browser
node tools/test-persistence-ui.js # ripresa senza risimulazione, migrazione legacy e operazioni asincrone
node tools/test-reading.js       # timeline senza spoiler, tempi adattivi e gestione della pausa
node tools/test-variety-history.js # varietà, memoria storica e contesto degli eventi
node tools/test-relations.js       # coerenza di alleanze, tono degli eventi, contesti e finale
node tools/test-items-catalog.js   # schede degli oggetti, finiture, zaino con peso e capienza
node tools/audit-relations.js 12   # misure di coerenza dei rapporti su molte partite (--esempi per i casi)
node tools/audit-narrative.js 6    # testi: segnaposto, ripetizioni, morti che agiscono, «ieri» sbagliati
node tools/test-worker.js        # stesso risultato nel worker e nel motore principale
node tools/test-studio.js        # legami iniziali, eventi avanzati, laboratorio, stagioni e percorsi della vittoria
node tools/test-storage-ui.js    # scritture fallite, classifica persistita e deduplicazione delle foto
node tools/test-photo-search.js   # fonti della ricerca foto, unione dei risultati e funzione /api/immagini
node tools/test-engine-baseline.js # confronto completo con 36 risultati di riferimento (--record per registrarli di nuovo dopo un cambio voluto del motore)
node tools/test-item-facts.js    # registro oggetti, assenza di mutazioni e compatibilità dei replay
node tools/test-experiments.js   # controllo delle coppie, riproducibilità e annullamento parziale
node tools/measure-variety.js 10 # misura ripetizioni con cast e semi riproducibili in tutte le arene
node tools/test-engine.js 40    # 40 partite per arena, metà con i contenuti 18+, controlla regole e determinismo
node tools/fuzz.js 1500         # partite con impostazioni casuali e casi limite (2-60 concorrenti, una sola squadra, valori estremi)
```
Per giocare basta aprire `dist/index.html` (o `dist/last-one-standing.html`) in un browser: è un unico file con immagini incorporate, senza dipendenze a parte i caratteri di Google Fonts.

**Sito pubblico con Vercel:** il file `vercel.json` dice a Vercel di eseguire `node tools/build.js` e pubblicare la cartella `docs/`. Basta importare il repository su Vercel, senza cambiare impostazioni (Framework: Other).

**Sito pubblico con GitHub Pages:** la build crea la versione web in `docs/`, con le immagini in `docs/img/`. Su GitHub: Settings → Pages → Source "Deploy from a branch" → ramo `main`, cartella `/docs`. L'immagine di anteprima dei link (`docs/anteprima.jpg`) e le icone sono già incluse.

## Formato degli eventi
I disastri in `src/content/` usano un formato compatto: `Nome | introduzione | morte | danno | salvezza [| stato]`.

`<n> <etichette> | <testo>`. Per esempio:
`2 k:A>B w:A @agg | {A} insegue {B} e l[B:o/a] uccide con {arma:A}.`
La legenda completa delle etichette è in cima a `src/data-core.js`.

### Consumo, perdita e trasferimento degli oggetti

- `cibo:A` e `med:A` consumano un oggetto posseduto e applicano il beneficio previsto; `-cibo:A` e `-med:A` lo rimuovono soltanto. Per una cura di quantità esplicita si usa, per esempio, `-med:A hp:A+35`.
- `steal:A<B=cibo` e `steal:A<B=med` trasferiscono l'oggetto reale di B ad A, conservandone nome e caratteristiche e aggiornando la provenienza. `steal:A<B` continua a indicare il furto di un'arma. Il furto noto lascia ricordo e rancore; `@secret` permette di rappresentare un furto clandestino senza rendere immediatamente consapevole la vittima.
- `give:A>B=cibo` trasferisce il cibo di A a B e registra il dono. Un oggetto assente o non ricevibile non viene creato né sottratto. Si può consumare un oggetto appena ricevuto nella stessa riga: `steal:A<B=cibo cibo:A`.
- `save:A>B` registra un salvataggio, con gratitudine, memoria e contatore; `@heal` da solo indica l'indole dell'evento e non sostituisce l'effetto. `hit:A>B` usa il sistema di danno già presente, attribuisce l'aggressione e lascia un ricordo.
- `veleno:A poison:A>B` consuma il veleno di A e avvelena B attribuendo ad A il danno differito. L'attribuzione non rivela automaticamente il responsabile alla vittima. `s:B=avvelenato` rimane un avvelenamento senza responsabile (per esempio da cibo contaminato).

### Danni differiti e diretta

Il veleno mantiene il responsabile durante i danni periodici. Se la causa attiva di una morte è una ferita, un veleno o una trappola attribuiti a qualcuno, il credito può arrivare anche dopo la morte del responsabile: il suo contatore viene aggiornato, senza nuove azioni, consumo d'armi o raccolta del bottino. In assenza di un responsabile vivo il bottino resta nella zona.

Ogni istantanea normalizza i valori vitali nell'intervallo 0–100. Le promesse concluse hanno una fase di conclusione; nella diretta statistiche delle prove, promesse e contatori del memoriale mostrano soltanto le informazioni già maturate nella fase selezionata. I titoli delle fasi future nella timeline restano visibili come prima.

### Importazione e compatibilità

Restano supportati il formato esportato v2, gli alias `settings`/`custom` e gli elenchi di concorrenti senza ID. Gli ID validi, le foto e il consenso 18+ già dato vengono conservati; importare un file non concede il consenso 18+.

L'importazione verifica l'intera configurazione prima di sostituirla. Un errore indica l'elemento da correggere e lascia intatti i dati attuali. Gli ID duplicati o riservati, gli eventi incoerenti e gli elenchi oltre 200 elementi vengono segnalati; i testi degli eventi oltre 240 caratteri non vengono tagliati in silenzio.

### Ripresa delle partite

Le nuove partite conservano il risultato completo: eventi, conseguenze, istantanee, diari, classifica e foto. Alla riapertura si legge quel risultato, senza richiamare il motore. Ogni risultato ha un identificativo proprio e l'impronta della build che lo ha generato; salvarlo di nuovo non può sostituirlo con una storia diversa.

L'archivio usa IndexedDB, con un ripiego su localStorage quando IndexedDB non è disponibile. Se il risultato manca o è danneggiato viene mostrato un avviso, conservando cast e impostazioni. Se lo spazio è esaurito si può continuare nella pagina aperta, ma il salvataggio non viene dichiarato riuscito.

I vecchi salvataggi contengono soltanto la configurazione: vengono ricostruiti una volta con la versione attuale, con un avviso esplicito, e poi archiviati. Gli esiti possono quindi differire dalla partita originale delle versioni precedenti.

La ripresa automatica riguarda l'ultima partita selezionata su quel browser e quella origine. Il pulsante **Archivio partite e replay** permette di consultare gli altri risultati salvati, dare loro un nome e confrontarne due. Rinominare una partita non modifica il risultato.

L'esportazione **della configurazione**, nella sezione Concorrenti, trasferisce cast, regole ed eventi personalizzati. L'esportazione **del replay**, nell'archivio, trasferisce il risultato completo con foto, diari e istantanee, anche se nel frattempo il motore è cambiato. Il riepilogo testuale nell'Esito è soltanto una sintesi. Importare un replay assegna un nuovo ID e non sostituisce la partita aperta; un replay 18+ richiede che i contenuti per adulti siano attivi per poterlo aprire.

Le nuove partite conservano anche la configurazione usata. I replay creati prima dell'introduzione dell'archivio possono non averla: la storia resta fedele, mentre una nuova simulazione parte dalle regole disponibili. Non c'è sincronizzazione automatica tra dispositivi. Cancellare i dati del sito elimina anche i risultati salvati.

### Lettura, accessibilità e calcolo

In Diretta, il pannello **Opzioni** della barra di lettura permette anche di nascondere gli eventi futuri e la durata totale, usare tempi di riproduzione proporzionati al testo e ridurre le animazioni. La modalità senza spoiler mostra le fasi già viste e un solo pulsante generico per la prossima fase; disattivandola torna disponibile tutta la timeline. Aprire una scheda o nascondere la pagina mette in pausa la riproduzione.

I gruppi Arena e Difficoltà e le schede del pannello laterale si navigano con le frecce, Home ed End. I cambi pagina spostano il focus al titolo; il lettore di schermo riceve un annuncio breve della fase, mentre gli eventi restano disponibili per una lettura volontaria.

La simulazione usa lo stesso sorgente del motore in un Web Worker e si può annullare. Il file portatile incorpora già quel sorgente: non scarica altro codice. Se il browser non consente i worker viene usato il motore principale. I risultati sono verificati come identici in tutte le arene. L'archivio e la visualizzazione restano sul thread della pagina; un calcolo in background non elimina il costo di mostrare centinaia di schede o di leggere un archivio molto grande.

### Squadre, alleanze e difficoltà

La squadra è un dato del concorrente e rimane la stessa. Un'alleanza è un legame che può nascere, sciogliersi o subire tradimenti. **Compagni di squadra alleati** crea le alleanze iniziali; **Vittoria di squadra** termina la partita quando rimangono soltanto concorrenti della stessa squadra. Con una sola squadra, attivare quest'ultima opzione produce una vittoria immediata.

La difficoltà modifica soprattutto frequenza delle eliminazioni e dei disastri. Non è un livello di abilità richiesto al giocatore, che osserva la simulazione. Le probabilità effettive dipendono anche dalle condizioni del cast e dall'arena.

### Manutenzione e diritti

La [guida agli eventi](docs-dev/eventi.md) descrive il linguaggio completo. Il workflow [Qualità](.github/workflows/quality.yml) esegue gli stessi controlli locali, 360 partite con determinismo e validazione dell'archivio, 1.500 partite casuali e il controllo degli output generati. Usa soltanto accesso in lettura al repository, secondo la [sintassi di GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).

Il progetto mantiene **tutti i diritti riservati**, secondo [LICENSE](LICENSE). La provenienza documentata delle risorse visive è in [ASSETS.md](ASSETS.md).

### I tre approfondimenti della prima analisi

Gli otto difetti iniziali su oggetti, importazione, conseguenze, danni differiti,
temporalità, valori vitali, parser e replay sono coperti dai test di regressione.
Sono stati completati questi interventi:

1. **Registro degli oggetti.** I nuovi risultati includono `itemFacts`: fase, ordine, oggetto e provenienza, proprietario, destinatario, stato prima/dopo e uso registrato. Il percorso personale e quello del vincitore mostrano consumi, cure, protezioni, attacchi con oggetti, lavorazioni e bonus applicati. I replay precedenti restano leggibili e vengono esplicitamente indicati come privi del registro: non si inventano effetti dai soli snapshot.
2. **Refactoring incrementale del motore.** Inventario, normalizzazione e danno, memoria dei rapporti, varietà della selezione e snapshot sono ora sistemi con dipendenze esplicite in `engine-systems.js`. Lo stesso modulo è incorporato nel worker e nel file portatile; in Node viene caricato automaticamente anche richiedendo soltanto `engine.js`. Le regole di morte e le dinamiche sociali che coordinano più sistemi restano nel motore: questa è una separazione progressiva, non una riscrittura del gioco. Il confronto con 36 risultati completi del commit `b3c8f3b` conserva tutti i campi storici, incluse foto, snapshot, diari, oggetti, ricordi e statistiche; viene escluso soltanto il nuovo campo aggiuntivo `itemFacts`.
3. **Esperimenti controllati.** Nel laboratorio, scegli concorrente, caratteristica, valore basso, valore alto e 5–200 coppie. In ogni coppia cambia soltanto quel valore: cast, tratti, squadre, regole, eventi e legami sono identici, con lo stesso seme nei due rami. Il resoconto mostra vittorie appaiate, differenze di frequenza, posizione media ed eliminazioni. Si possono interrompere i calcoli; contano soltanto le coppie complete. Il JSON contiene configurazione, versione e semi per riprodurre il campione. L'effetto si riferisce al modello e al campione scelti, senza una stima di incertezza statistica o garanzie per la partita successiva.

La [guida a registro, sistemi ed esperimenti](docs-dev/simulazione.md) descrive i limiti delle misure e il protocollo di verifica.

## Memoria persistente dell’arena
I fatti vissuti restano nel registro della partita, compresi i finali e le conseguenze sintetizzate nel diario. Le esperienze locali influenzano percorsi, ripari e prudenza; i rapporti mantengono riferimenti agli incontri precedenti. La mappa mostra la memoria della zona o dell’intera arena fino alla fase consultata, e i fatti collegati restano nel registro del replay (il contesto leggibile degli eventi cita solo ricordi pertinenti tra i protagonisti). Gli incidenti non vengono dimenticati dopo otto fasi. [Regole e verifiche](docs-dev/memoria-arena.md).

## Complotti riservati e finale aperto
Nuovi piani di imboscata, sabotaggio e accordo a tre restano nascosti fino all'esecuzione, anche nei diari e nel grafo dei rapporti. Possono fallire o essere ribaltati da un complice. I piani sono pochi (circa uno ogni tre concorrenti) e si rivelano con frasi diverse che non si ripetono nella stessa partita. La stretta finale si svolge in più atti con titoli e introduzioni che dicono quanti restano e cosa cambia; le frasi che chiudono la partita («l'ultimo scontro», «vince la partita») compaiono solo quando restano in due. Risorse conservate, schermaglie e confronti su abilità diverse possono cambiare gli equilibri. Preparazioni, oggetti, posizioni e regole di vittoria restano verificabili nel replay. [Regole, limiti e verifiche](docs-dev/complotti-e-finale.md).

## Armi illustrate
I 132 modelli d'arma delle dieci arene hanno illustrazioni individuali con sfondo trasparente, visibili nell'armeria e negli zaini delle partite. Le varianti usano l'immagine del proprio modello e conservano nome, qualità, usura e provenienza. Lo stile degli oggetti segue materiali e colori dell'arena, compresi gli strumenti sociali di Liceo e Ufficio. Le immagini sono disponibili anche nel file portatile. [Catalogo e prompt](assets/armi-manifest.json) · [Integrazione e verifiche](docs-dev/illustrazioni-armi.md).

