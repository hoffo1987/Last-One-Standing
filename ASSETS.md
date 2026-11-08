# Origine delle risorse visive

Il progetto mantiene i diritti riservati: vedere [LICENSE](LICENSE). Questo elenco
descrive la provenienza documentata, senza attribuire una licenza alle immagini.

| Risorse | Provenienza documentata |
| --- | --- |
| `assets/arene/*.webp` | Nove banner forniti per il progetto nel flusso di creazione delle immagini tematiche; successivamente ottimizzati in WebP. |
| Locandina di Night City — Zona Rossa (`cyberpunk`) | **Provvisoria.** Non c'è ancora un `assets/arene/cyberpunk.webp`: la locandina, il banner della guida e lo sfondo della diretta usano l'illustrazione vettoriale disegnata in `src/art.js` (skyline, torre con faro giallo acido, insegne olografiche, cavi, vapore, asfalto bagnato e pioggia). Quando arriverà il banner definitivo basterà aggiungere il file: la build lo incorpora al posto dell'SVG. Le immagini della guida di quest'arena (7 luoghi, 4 pericoli, 7 armi) hanno nomi e prompt in [docs-dev/immagini-arene.md](docs-dev/immagini-arene.md). Nessun personaggio, marchio o logo di opere esistenti. |
| `assets/logo.webp` | Logo creato con imagegen per Last One Standing, reinterpretando il riferimento del progetto nello stile illustrato dei banner. |
| `assets/icona.webp`, `favicon.png`, `icona-180.png` | Icona dedicata generata per il progetto; favicon e icona per dispositivi derivate dall'immagine. |
| `assets/panoramica.webp`, `anteprima.jpg` | Illustrazione della home e anteprima per i link generate con imagegen per il progetto. |
| `assets/sagome/*.webp` | Tre sagome generiche generate con imagegen per il progetto. |
| SVG e icone prodotti da `src/art.js` e `src/ui.js` | Disegnati e conservati nel codice del progetto. |
| `assets/arene/<arena>/<sezione>/*.webp` | Immagini della guida delle arene, da fornire. Specifiche, nomi dei file e prompt di luoghi, pericoli e armi sono in [docs-dev/immagini-arene.md](docs-dev/immagini-arene.md); meteo, disastri e oggetti seguiranno. Finché mancano, `src/atlas.js` disegna illustrazioni vettoriali provvisorie. |

Il registro di lavorazione dei pacchetti di immagini documenta la creazione il
1 novembre 2026, con prompt conservati negli archivi originali di consegna. La
repo contiene le versioni ottimizzate usate dal sito, non tutti gli originali.
L'origine e gli eventuali diritti delle immagini di riferimento non sono
documentati nel repository; non viene dichiarata un'attribuzione non verificata.

Bricolage Grotesque, Figtree e JetBrains Mono vengono richiesti a Google Fonts
dal markup del sito. Nessun file di questi caratteri è incluso nella repo.
Le foto caricate dai giocatori restano nei loro browser e nei replay che
decidono di esportare; non sono risorse distribuite con il gioco.

La build ricava `docs/img/` e le immagini incorporate in `dist/` dai file in
`assets/`. Questi output mantengono la stessa provenienza degli originali.
