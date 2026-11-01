# Last One Standing

Simulatore di battle royale, tutto in italiano. Crei il cast, scegli una delle 9 arene e guardi la partita fase per fase, fino all'ultimo concorrente rimasto in piedi.

## Cosa contiene
- **9 scenari**: Arena Classica, Reame Incantato, Stazione Orbitale, Città degli Infetti, Isola Battle Royale, Villa Maledetta, Terre Desolate, più Liceo Spietato e Ufficio Open Space (senza morti: si viene eliminati o licenziati).
- **749 modelli di evento e 277 disastri** (con 833 esiti dei disastri), con accordo di genere automatico (lui / lei / neutro con ə) e preposizioni articolate corrette.
- **Concorrenti** con 7 caratteristiche, fino a 3 dei 18 tratti, squadra e foto. Si riordinano trascinando le schede.
- **Motore**: alleanze e tradimenti, oggetti (armi, cibo, medicine, trappole), stati (ferito, avvelenato, malato, affamato), pericolo crescente con i giorni, festino, disastri e scontro finale.
- **Seme**: stesso seme e stesso cast danno la stessa partita.
- **Diretta** con tabellone, tacche dei superstiti, mappa a zone, elenco dei caduti e riproduzione automatica.
- **Esito** con classifica, statistiche, grafici e locandina generata.
- Eventi personalizzati con anteprima, importazione ed esportazione in JSON, salvataggio nel browser e tema chiaro o scuro.

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
src/content/*.js     eventi aggiuntivi e disastri, un file per scenario
src/engine.js        motore di simulazione (funziona anche in Node)
src/ui.js            interfaccia
src/style.css        stile
src/shell.html       markup
tools/build.js       crea dist/last-one-standing.html (file unico)
tools/test-engine.js test del motore senza browser
```

## Comandi
```
node tools/build.js            # crea il file unico in dist/
node tools/test-engine.js 40   # 40 partite per tema, controlla le regole
```

## Formato degli eventi
I disastri in `src/content/` usano un formato compatto: `Nome | introduzione | morte | danno | salvezza [| stato]`.

`<n> <etichette> | <testo>`. Per esempio:
`2 k:A>B w:A @agg | {A} insegue {B} e l[B:o/a] uccide con {arma:A}.`
La legenda completa delle etichette è in cima a `src/data-core.js`.
