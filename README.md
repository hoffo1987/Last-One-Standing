# Last One Standing

Simulatore di battle royale, tutto in italiano. Crei il cast, scegli una delle 9 arene e guardi la partita fase per fase, fino all'ultimo concorrente rimasto in piedi.

## Cosa contiene
- **9 scenari**: Arena Classica, Reame Incantato, Stazione Orbitale, Città degli Infetti, Isola Battle Royale, Villa Maledetta, Terre Desolate, più Liceo Spietato e Ufficio Open Space (senza morti: si viene eliminati o licenziati).
- **1391 modelli di evento e 452 disastri**, più **122 eventi e 31 disastri 18+** (circa 1450 esiti di disastro in tutto), con accordo di genere automatico (lui / lei / neutro con ə) e preposizioni articolate corrette.
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
- **Fame**: senza cibo per due giorni si diventa affamati e più deboli. Chi ha provviste le usa.
- **Oggetti con effetti veri**: l'amuleto salva una volta dalla morte, la mappa protegge dai disastri, veleni ed esplosivi abilitano eventi propri.
- **Stati temporanei**: ferito, malato, avvelenato, affamato, ubriaco, sconvolto, in lutto.
Sotto ogni evento la diretta mostra le conseguenze ("↳ Walter giura vendetta su Paola") e un'etichetta con il motivo dell'evento (Vendetta, Debito, Coppia, Lutto…).

## Caratteristiche, tratti e prove
- **Prove di abilità**: molti eventi sono una sfida su una caratteristica, con due esiti scritti. Il tiro somma caratteristica, due dadi, fortuna e tratti, e sottrae le condizioni (ferito, ubriaco, affamato…). La diretta mostra "Prova di Agilità · superata 15/11". Con valori alti si supera circa l'87% delle prove, con valori bassi circa il 20%.
- **Eventi riservati** a chi ha una caratteristica molto alta o molto bassa, o un certo tratto.
- **Effetti sul sistema delle conseguenze**: l'empatia rende più facili lutti e vendette, il coraggio riduce fughe e shock, la sopravvivenza ritarda la fame e protegge dai disastri, il carisma accelera alleanze e fama, la resistenza allontana le morti per ferite e malattie. Tra i tratti: il Vendicativo giura vendetta per poco, il Clemente perdona, chi è Superstizioso viene sempre salvato dall'amuleto, il Goloso patisce prima la fame, il Leader guida alleanze più grandi.

## Contenuti 18+
Un interruttore nella sezione Arena, attivo solo dopo la conferma dell'età, aggiunge eventi e disastri con violenza esplicita, linguaggio volgare, alcol e sostanze e allusioni sessuali tra adulti. Non è disponibile nel Liceo, perché i personaggi sono studenti.

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
src/content/pack-*.js    pacchetti per arena (eventi, disastri, 18+), condivisi e per adulti
src/content/*.js         eventi aggiuntivi e disastri della versione precedente
src/engine.js        motore di simulazione (funziona anche in Node)
src/art.js           usa logo e illustrazioni da assets/ (con ripiego in SVG), icone, coriandoli
assets/              logo, emblema, favicon e illustrazioni delle 9 arene (WebP ottimizzati, incorporati dalla build)
src/ui.js            interfaccia
src/style.css        stile
src/shell.html       markup
tools/build.js       crea dist/last-one-standing.html (file unico)
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
Per giocare basta aprire `dist/last-one-standing.html` in un browser: è un unico file senza dipendenze, a parte i caratteri di Google Fonts.

## Formato degli eventi
I disastri in `src/content/` usano un formato compatto: `Nome | introduzione | morte | danno | salvezza [| stato]`.

`<n> <etichette> | <testo>`. Per esempio:
`2 k:A>B w:A @agg | {A} insegue {B} e l[B:o/a] uccide con {arma:A}.`
La legenda completa delle etichette è in cima a `src/data-core.js`.
