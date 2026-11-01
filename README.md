# Last One Standing

Simulatore di battle royale, tutto in italiano. Crei il cast, scegli una delle 9 arene e guardi la partita fase per fase, fino all'ultimo concorrente rimasto in piedi.

## Cosa contiene
- **9 scenari**: Arena Classica, Reame Incantato, Stazione Orbitale, Città degli Infetti, Isola Battle Royale, Villa Maledetta, Terre Desolate, più Liceo Spietato e Ufficio Open Space (senza morti: si viene eliminati o licenziati).
- **2183 modelli di evento e 529 disastri**, più **122 eventi e 31 disastri 18+** (oltre 1600 esiti di disastro in tutto): ogni arena con tema "con morti" ha circa 750 eventi e 75-85 disastri, Liceo e Ufficio circa 370 eventi e 58 disastri. Accordo di genere automatico (lui / lei / neutro con ə) e preposizioni articolate corrette.
- **Voci dei concorrenti**: oltre 220 battute (ultime parole, frasi dopo un'uccisione, vendette, tradimenti, dichiarazioni, ringraziamenti, provocazioni) scelte secondo tratto, arena e situazione, più oltre 70 conversazioni notturne tra alleati, coppie, rivali e sconosciuti. Nella stessa partita una frase non si ripete finché ce ne sono altre.
- **83 condizioni meteo** (9-10 per arena) che cambiano la giornata.
- **Concorrenti** con 10 caratteristiche (forza, agilità, intelligenza, carisma, fortuna, resistenza, furtività, coraggio, empatia, sopravvivenza), fino a 3 dei 30 tratti, squadra e foto.
- **Motore**: alleanze e tradimenti, oggetti (armi, cibo, medicine, trappole), stati (ferito, avvelenato, malato, affamato), pericolo crescente con i giorni, festino, disastri e scontro finale.
- **Seme**: stesso seme e stesso cast danno la stessa partita.
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
- **Oggetti con effetti veri**: l'amuleto salva una volta dalla morte, la mappa protegge dai disastri, veleni ed esplosivi abilitano eventi propri.
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
- **Caratteristiche chiave**: tre caratteristiche contano di più per combattere e sopravvivere (per esempio Furtività, Agilità e Sopravvivenza in città, Coraggio ed Empatia nella villa). In prova, a parità di tutto il resto, chi le ha alte arriva in media 4°-5° su 12, chi le ha basse 8°-9°.
- **Meteo del giorno**: 56 condizioni diverse (nebbia, tempeste solari, orde in migrazione, compiti di matematica…) che cambiano consumi, agguati, ricerca di cibo, prove e pericoli notturni.
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
- **Diario segreto**: ogni notte (e a volte di giorno) ognuno scrive una pagina: pensieri, paure, segreti e anche i fatti che la diretta non ha mostrato. Nella lista "In gara" un'etichetta "diario" segnala chi ha una pagina nuova.

## Eventi che leggono la storia
Il formato degli eventi conosce tutto quello che succede nella partita, quindi ogni evento nasce da qualcosa e lascia qualcosa:
- `crush:A>B` (A ha una cotta segreta per B), `plot:A>B` (A sta tramando contro B), `goal:A=vendetta` (l'obiettivo del momento);
- `stat:A<hp40`, `stat:A>mo75`, `stat:B>pr60` (salute, energia, morale, sazietà, indicatore dell'arena) e i relativi effetti `hp:A-20`, `mo:A+15`, `pr:A-30`;
- `wx:buio`, `wx:abbondanza`, `wx:pericolo`, `wx:calma` (il meteo del giorno);
- i nuovi oggetti: `+armatura:A`, `con:A=attrezzo`, `-valore:A`, `{ricordo:A}`, `{alcol}` e così via.

## Caratteristiche, tratti e prove
- **Prove di abilità**: molti eventi sono una sfida su una caratteristica, con due esiti scritti. Il tiro somma caratteristica, due dadi, fortuna e tratti, e sottrae le condizioni (ferito, ubriaco, affamato…). La diretta mostra "Prova di Agilità · superata 15/11". Con valori alti si supera circa l'87% delle prove, con valori bassi circa il 20%.
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

## Interfaccia
- **Home** con partita lampo (24 concorrenti casuali, arena a sorpresa) e un tabellone dimostrativo animato.
- **Concorrenti**: griglia o vista per squadra, nome modificabile sul posto, scheda laterale per tratti, caratteristiche e foto, elenco da incollare.
- **Arena**: ogni arena ha la sua tinta che colora tutta l'app; anteprima con luoghi, armi, pericoli, disastri ed eventi d'esempio con il tuo cast.
- **Diretta**: regia in stile televisivo, linea del tempo per giorni, mappa, caduti, alleanze, scheda di ogni concorrente con la sua storia, riproduzione automatica e tasti freccia.
- **Esito**: podio, premi, momenti salienti, grafico dei superstiti, classifica e locandina.

## Struttura
```
src/data-core.js     eventi di base, tratti, caratteristiche, nomi
src/data-themes.js   i 9 scenari (lessico, testi di fase, eventi speciali)
src/content/_systems.js  sistema delle conseguenze: frasi di eco, oggetti speciali, eventi di legame
src/content/_ecology.js  ecosistema delle arene: regole, indicatori, meteo, zone e testi delle conseguenze automatiche
src/content/_items.js    catalogo degli oggetti, obiettivi, gesti dei tratti, diario segreto e ricordi dei rapporti
src/content/_voices.js   battute dei concorrenti e conversazioni notturne
src/content/_extras.js   meteo aggiuntivo per ogni arena
src/content/pack2-*.js   secondo pacchetto per ogni arena, legami comuni e sopravvivenza
src/content/pack-*.js    pacchetti per arena (eventi, disastri, 18+), condivisi e per adulti
src/content/*.js         eventi aggiuntivi e disastri della versione precedente
src/engine.js        motore di simulazione (funziona anche in Node)
src/art.js           usa logo e illustrazioni da assets/ (con ripiego in SVG), icone, coriandoli
assets/              logo, icona, panoramica, anteprima dei link, sagome dei concorrenti e illustrazioni delle 9 arene (ottimizzati e incorporati dalla build)
src/anim.js          motore delle animazioni: atmosfere per arena, effetti degli eventi, transizioni, coriandoli
docs/                versione per il web (Vercel o GitHub Pages): pagina leggera e immagini in docs/img con l'impronta nel nome, servite con cache lunga
src/ui.js            interfaccia
src/style.css        stile
src/shell.html       markup
tools/build.js       crea dist/last-one-standing.html (file unico con immagini incorporate, per l'artifact) e docs/ (sito web)
tools/test-engine.js test del motore senza browser
tools/lint-content.js controllo statico dei contenuti
tools/fuzz.js        collaudo con partite casuali
```

## Comandi
```
node tools/build.js             # crea il file unico in dist/last-one-standing.html
node tools/lint-content.js      # controlla tutte le righe di evento e disastro (sintassi, partecipanti, segnaposto, grammatica di base)
node tools/test-engine.js 40    # 40 partite per arena, metà con i contenuti 18+, controlla regole e determinismo
node tools/fuzz.js 1500         # partite con impostazioni casuali e casi limite (2-60 concorrenti, una sola squadra, valori estremi)
```
Per giocare basta aprire `dist/index.html` (o `dist/last-one-standing.html`) in un browser: è un unico file con immagini incorporate, senza dipendenze a parte i caratteri di Google Fonts.

**Sito pubblico con Vercel:** il file `vercel.json` dice a Vercel di eseguire `node tools/build.js` e pubblicare la cartella `docs/`. Basta importare il repository su Vercel, senza cambiare impostazioni (Framework: Other).

**Sito pubblico con GitHub Pages:** la build copia la versione completa in `docs/`. Su GitHub: Settings → Pages → Source "Deploy from a branch" → ramo `main`, cartella `/docs`. L'immagine di anteprima dei link (`docs/anteprima.jpg`) e le icone sono già incluse.

## Formato degli eventi
I disastri in `src/content/` usano un formato compatto: `Nome | introduzione | morte | danno | salvezza [| stato]`.

`<n> <etichette> | <testo>`. Per esempio:
`2 k:A>B w:A @agg | {A} insegue {B} e l[B:o/a] uccide con {arma:A}.`
La legenda completa delle etichette è in cima a `src/data-core.js`.
