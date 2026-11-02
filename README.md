# Last One Standing

Simulatore di battle royale, tutto in italiano. Crei il cast, scegli una delle 9 arene e guardi la partita fase per fase, fino all'ultimo concorrente rimasto in piedi.

## Cosa contiene
- **9 scenari**: Arena Classica, Reame Incantato, Stazione Orbitale, Città degli Infetti, Isola Battle Royale, Villa Maledetta, Terre Desolate, più Liceo Spietato e Ufficio Open Space (senza morti: si viene eliminati o licenziati).
- **2248 modelli di evento e 529 disastri**, più **122 eventi e 31 disastri 18+** (oltre 1600 esiti di disastro in tutto): ogni arena con tema "con morti" ha oltre 800 eventi e 74-85 disastri, Liceo e Ufficio oltre 400 eventi e 58 disastri. Accordo di genere automatico (lui / lei / neutro con ə) e preposizioni articolate corrette.
- **Voci dei concorrenti**: oltre 220 battute (ultime parole, frasi dopo un'uccisione, vendette, tradimenti, dichiarazioni, ringraziamenti, provocazioni) scelte secondo tratto, arena e situazione, più oltre 70 conversazioni notturne tra alleati, coppie, rivali e sconosciuti. Nella stessa partita una frase non si ripete finché ce ne sono altre.
- **83 condizioni meteo** (11 nell'Arena Classica, 9 nelle altre arene) che cambiano la giornata.
- **Concorrenti** con 10 caratteristiche (forza, agilità, intelligenza, carisma, fortuna, resistenza, furtività, coraggio, empatia, sopravvivenza), fino a 3 dei 30 tratti, squadra e foto.
- **Motore**: alleanze e tradimenti, oggetti (armi, cibo, medicine, trappole), stati (ferito, avvelenato, malato, affamato), pericolo crescente con i giorni, festino, disastri e scontro finale.
- **Seme**: stesso seme, cast completo e impostazioni danno la stessa partita, usando la stessa versione di motore e contenuti.
- **Ripresa fedele**: la partita generata viene conservata nel browser con il suo risultato completo, così un aggiornamento di testi o motore non cambia la storia già iniziata.
- **Archivio partite**: nomi personalizzati, confronto tra due risultati, importazione ed esportazione di replay completi.
- **Diretta** con tabellone, tacche dei superstiti, mappa a zone, elenco dei caduti e riproduzione automatica.
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
- **Indicatore dell'arena**: Freddo (Arena Classica), Corruzione (Reame Incantato), Debito d'ossigeno (Stazione Orbitale), Infezione (Città degli Infetti), Terrore (Villa Maledetta), Radiazioni (Terre Desolate), Ansia (Liceo), Stress (Ufficio). Ognuno sale e scende con regole proprie (notte, solitudine, ferite, morti viste da vicino, zone contaminate, uccisioni) e ha le sue difese (caratteristiche, alleati, portafortuna, cure).

Ogni arena ha poi le sue regole:
- **Caratteristiche chiave**: tre caratteristiche contano di più per combattere e sopravvivere (per esempio Furtività, Agilità e Sopravvivenza in città, Coraggio ed Empatia nella villa). Non garantiscono un piazzamento: l'esito dipende anche da cast, tratti, equipaggiamento, eventi e seme.
- **Meteo del giorno**: 83 condizioni diverse (nebbia, tempeste solari, orde in migrazione, compiti di matematica…) che cambiano consumi, agguati, ricerca di cibo, prove e pericoli notturni.
- **Zone**: ogni luogo ha risorse, pericolo e riparo propri. Nel Battle Royale la tempesta chiude una zona al giorno e chi resta fuori perde salute. Nella Città degli Infetti un morso diventa infezione: gli alleati possono curarla con un kit medico se fatto in tempo, oppure cacciare l'infetto dal gruppo.
- **Oggetti**: le armi hanno una qualità (★ fino a ★★★) e possono rompersi; chi uccide fruga nello zaino della vittima; gli zaini di chi muore per l'arena restano nella zona per chi passa; le trappole vengono piazzate di notte e scattano sui concorrenti di passaggio (la vittima sa chi cercare); kit medici e cure abbassano gli indicatori.
- **Alleanze vive**: di notte gli alleati dividono il cibo (o lo negano, e nasce rancore), si medicano a vicenda, fanno i turni di guardia e respingono insieme gli assalti notturni.
- **La tempra**: chi è in salute e resistente a volte sopravvive a un colpo mortale, ridotto malissimo, e da lì la storia può andare in molti modi.

Le scelte degli eventi tengono conto di tutto questo: chi è ferito evita gli scontri e cerca cure, chi ha fame cerca cibo, chi è disperato tradisce più volentieri, le vittime più probabili sono i più deboli e stanchi. Nell'esito trovi le cause di morte, le conseguenze e il meteo di ogni giorno.

## Oggetti
Tredici tipi di oggetto, con nomi diversi in ogni arena: armi, protezioni, cure, cibo, attrezzi, mappe, trappole, esplosivi, veleni, portafortuna, alcol, merce di scambio e ricordi di casa. Nell'Arena c'è la guida completa (sezione "Gli oggetti e a cosa servono").
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

Dove si vede: nella diretta, la scheda **Legami** ha la **mappa dei legami** (un grafo dei vivi colorato per tipo di legame, con le frecce per i sentimenti non ricambiati, filtrabile e interattivo). Nella scheda di ogni concorrente, "Cosa prova per gli altri" mostra etichetta, dimensioni, cosa prova l'altro in cambio e i ricordi; "Promesse" elenca quelle fatte e ricevute e come sono finite. Nell'esito, **Le storie della partita** raccontano il grande amore, l'amicizia più forte, la nemesi, il tradimento più crudele, il gesto di pietà, l'amore non corrisposto, maestro e allievo, l'odio e la paura più grandi.

## Caratteristiche, tratti e prove
- **Prove di abilità**: molti eventi sono una sfida su una caratteristica, con due esiti scritti. Il tiro somma caratteristica, due dadi da sei (2–12), fortuna e tratti, e sottrae le condizioni (ferito, ubriaco, affamato…). La diretta mostra "Prova di Agilità · superata 15/11". La probabilità di riuscita dipende dalla difficoltà della prova e dalla condizione del concorrente.
- **Eventi riservati** a chi ha una caratteristica molto alta o molto bassa, o un certo tratto.
- **Effetti sul sistema delle conseguenze**: l'empatia rende più facili lutti e vendette, il coraggio riduce fughe e shock, la sopravvivenza ritarda la fame e protegge dai disastri, il carisma accelera alleanze e fama, la resistenza allontana le morti per ferite e malattie. Tra i tratti: il Vendicativo giura vendetta per poco, il Clemente perdona, chi è Superstizioso viene sempre salvato dall'amuleto, il Goloso patisce prima la fame, il Leader guida alleanze più grandi.

## Contenuti 18+
Un interruttore nella sezione Arena, attivo solo dopo la conferma dell'età, aggiunge eventi e disastri con violenza esplicita, linguaggio volgare, alcol e sostanze e allusioni sessuali tra adulti. Non è disponibile nel Liceo, perché i personaggi sono studenti.

## Animazioni
- **Atmosfera per arena**, disegnata su canvas e diversa per ognuna: lucciole e foglie (Classica), scintille magiche e stelle cadenti (Reame), stelle in corsa e scansione laser (Stazione), spore tossiche e luci che sfarfallano (Infetti), vento, paracadute e zona che pulsa (Battle Royale), nebbia, pipistrelli e fulmini (Villa), sabbia e braci (Terre Desolate), aeroplanini e cuori (Liceo), fogli volanti (Ufficio). L'intensità cresce con il pericolo: più forte nei disastri e nel finale, più calma di notte.
- **Effetti legati agli eventi**: fendente e scossa per le uccisioni, disturbo dell'immagine per i tradimenti, cuori per gli amori, volti che si avvicinano per le alleanze, onda verde per gli aiuti, riflesso per il bottino, dado che gira per le prove di abilità, conseguenze che compaiono una dopo l'altra.
- **Cambi di fase**: alba, calare della notte, gong d'apertura, festino dorato, cannone per i caduti, faro per il finale; ogni arena ha il suo disastro (fuoco, onda d'urto, sirena, nube tossica, bombardamento, fulmine, tempesta di sabbia, campanella, glitch).
- **Sezioni**: panoramica con parallasse e braci nella home, locandine che si inclinano seguendo il mouse, schede che entrano a cascata, cerimonia del vincitore con podio che sale, grafico che si disegna e coriandoli a tema con l'arena.
- Tutto si ferma se il sistema chiede di ridurre le animazioni.

## La sezione Concorrenti
- **Schede ricche**: volto grande con anello del colore di squadra, squadra, un profilo in miniatura delle dieci caratteristiche (verde i punti forti, rosso quelli deboli) con «Forte in…» e «Debole in…» su due righe, tratti e un invito a aggiungerne.
- **Modifiche sul posto**: il nome si scrive direttamente sulla scheda, il genere si cambia con un selettore che scivola, il volto si tocca per caricare una foto.
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
- **Arena**: ogni arena ha la sua tinta che colora tutta l'app. Le nove locandine stanno in una griglia 3×3 (sul telefono in un carosello da sfogliare con il dito o con le frecce, che porta la scelta al centro).
- **Scheda dell'arena**: intestazione illustrata, i numeri principali in grande (eventi, disastri, luoghi, tipi di oggetto) e cinque linguette navigabili con le frecce: *Il luogo* (luoghi, armi, pericoli), *Regole e meteo* (regola speciale, caratteristiche che contano, indicatore, ogni meteo con la sua descrizione), *Disastri* (con la loro descrizione), *Zaino* (i tredici tipi di oggetto) e *Assaggio* (tre momenti di una partita breve col tuo cast, con «Un altro assaggio»). Cambiando arena la linguetta resta quella scelta e i numeri scorrono al nuovo valore.
- **Regole della partita**: difficoltà con un misuratore a tacche, durata con cursore e valore a parte, interruttori per le squadre e i contenuti 18+; seme e Laboratorio di bilanciamento sono raccolti in «Seme e strumenti».
- **Barra di avvio** sempre visibile in basso: arena scelta, concorrenti, difficoltà e durata, con il pulsante «Avvia la simulazione».
- **Diretta**: regia in stile televisivo, linea del tempo per giorni, mappa, caduti, alleanze, scheda di ogni concorrente con la sua storia, riproduzione automatica e tasti freccia.
- **Esito**: podio, premi, momenti salienti, grafico dei superstiti, classifica e locandina.

## Strumenti di gioco

- **Legami iniziali**, nella sezione Concorrenti: amicizia, rivalità e coppia sono reciproche; fiducia e attrazione hanno una direzione. Ogni persona può avere una sola coppia e una sola cotta iniziale. I rapporti entrano nel motore e nei ricordi, ma possono cambiare durante la partita. Le coppie non creano automaticamente un'alleanza. Fino a 200 legami, inclusi nell'esportazione della configurazione come `legami`.
- **Concorrenti seguiti**: dalla scheda personale puoi seguirne uno o più. La diretta evidenzia i loro eventi, li mette in cima alla lista dei vivi e offre un filtro facoltativo. Avvisi generali e memoriali restano visibili. La preferenza è locale al browser e non cambia la simulazione.
- **Le svolte della vittoria**: nell'esito, una selezione di incontri, aiuti, eliminazioni e colpi di scena realmente registrati permette di tornare alle fasi corrispondenti. È un percorso narrativo, non una misura delle cause decisive della vittoria.
- **Editor avanzato e pacchetti**, dentro Eventi personalizzati: modifica o duplica gli eventi, usa il formato completo del motore con requisiti e prove a due esiti, oppure importa un pacchetto JSON. L'intero pacchetto viene validato prima di aggiungere eventi; cast e regole restano invariati. Limite complessivo: 200 eventi. La [guida al formato](docs-dev/eventi.md) elenca i tag.
- **Laboratorio di bilanciamento**, nella sezione Arena: esegue da 5 a 200 partite con il cast e le regole attuali su semi distinti. Mostra vittorie, frequenze osservate, posizione media, eliminazioni e cause di uscita. Puoi interrompere il campione e conservare le osservazioni parziali. Non sostituisce né archivia la partita aperta; i risultati aggregati sono copiabili in JSON.
- **Stagioni e tornei**, nella Home: conserva cast, legami, eventi e regole alla creazione; ogni round usa un nuovo seme derivato dal seme originale. La classifica assegna a ogni concorrente 1 punto per partecipazione, 3 per vittoria e 1 per eliminazione attribuita. Ogni membro della squadra vincente riceve i punti vittoria. A parità valgono vittorie, posizione media e infine nome. Fino a 50 stagioni e 200 round per stagione, salvati sul browser. I replay dei round vengono conservati nell'archivio; eventuali errori di salvataggio sono indicati. L'esportazione della configurazione non include la classifica stagionale: salva separatamente i replay importanti.

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
src/art.js           usa logo e illustrazioni da assets/ (con ripiego in SVG), icone, coriandoli
assets/              logo, icona, panoramica, anteprima dei link, sagome dei concorrenti e illustrazioni delle 9 arene (ottimizzati e incorporati dalla build)
src/anim.js          motore delle animazioni: atmosfere per arena, effetti degli eventi, transizioni, coriandoli
src/replay.js        risultati immutabili nel browser, con IndexedDB e ripiego su localStorage
src/simulator.js     esecuzione asincrona del motore in Web Worker, annullamento e ripiego compatibile
src/studio.js        legami iniziali, seguiti, percorsi narrativi, eventi avanzati, laboratorio e stagioni
docs/                versione per il web (Vercel o GitHub Pages): pagina leggera e immagini in docs/img con l'impronta nel nome, servite con cache lunga
src/ui.js            interfaccia
src/style.css        stile
src/shell.html       markup
tools/build.js       crea dist/last-one-standing.html (file unico con immagini incorporate, per l'artifact) e docs/ (sito web)
tools/test-engine.js test del motore senza browser
tools/lint-content.js controllo statico dei contenuti
tools/fuzz.js        collaudo con partite casuali
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
node tools/test-worker.js        # stesso risultato nel worker e nel motore principale
node tools/test-studio.js        # legami iniziali, eventi avanzati, laboratorio, stagioni e percorsi della vittoria
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

In Diretta, **Opzioni di lettura** permette di nascondere gli eventi futuri e la durata totale, usare tempi di riproduzione proporzionati al testo e ridurre le animazioni. La modalità senza spoiler mostra le fasi già viste e un solo pulsante generico per la prossima fase; disattivandola torna disponibile tutta la timeline. Aprire una scheda o nascondere la pagina mette in pausa la riproduzione.

I gruppi Arena e Difficoltà e le schede del pannello laterale si navigano con le frecce, Home ed End. I cambi pagina spostano il focus al titolo; il lettore di schermo riceve un annuncio breve della fase, mentre gli eventi restano disponibili per una lettura volontaria.

La simulazione usa lo stesso sorgente del motore in un Web Worker e si può annullare. Il file portatile incorpora già quel sorgente: non scarica altro codice. Se il browser non consente i worker viene usato il motore principale. I risultati sono verificati come identici nelle nove arene. L'archivio e la visualizzazione restano sul thread della pagina; un calcolo in background non elimina il costo di mostrare centinaia di schede o di leggere un archivio molto grande.

### Squadre, alleanze e difficoltà

La squadra è un dato del concorrente e rimane la stessa. Un'alleanza è un legame che può nascere, sciogliersi o subire tradimenti. **Compagni di squadra alleati** crea le alleanze iniziali; **Vittoria di squadra** termina la partita quando rimangono soltanto concorrenti della stessa squadra. Con una sola squadra, attivare quest'ultima opzione produce una vittoria immediata.

La difficoltà modifica soprattutto frequenza delle eliminazioni e dei disastri. Non è un livello di abilità richiesto al giocatore, che osserva la simulazione. Le probabilità effettive dipendono anche dalle condizioni del cast e dall'arena.

### Manutenzione e diritti

La [guida agli eventi](docs-dev/eventi.md) descrive il linguaggio completo. Il workflow [Qualità](.github/workflows/quality.yml) esegue gli stessi controlli locali, 360 partite con determinismo e validazione dell'archivio, 1.500 partite casuali e il controllo degli output generati. Usa soltanto accesso in lettura al repository, secondo la [sintassi di GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).

Il progetto mantiene **tutti i diritti riservati**, secondo [LICENSE](LICENSE). La provenienza documentata delle risorse visive è in [ASSETS.md](ASSETS.md).
