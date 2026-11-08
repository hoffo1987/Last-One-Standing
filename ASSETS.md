# Origine delle risorse visive

Il progetto mantiene i diritti riservati: vedere [LICENSE](LICENSE). Questo elenco
descrive la provenienza documentata, senza attribuire una licenza alle immagini.

| Risorse | Provenienza documentata |
| --- | --- |
| `assets/arene/*.webp` | Dieci banner (3:1) generati con Midjourney dai prompt di [docs-dev/banner-arene.md](docs-dev/banner-arene.md), forniti per il progetto e ottimizzati in WebP a 1500 × 500. Sostituiscono i nove banner precedenti, che restano nello storico del repository. |
| `assets/arene/cyberpunk.webp` e `assets/arene/cyberpunk/` | Banner, 7 luoghi e 4 pericoli di Night City — Zona Rossa generati con Midjourney dai prompt di [docs-dev/immagini-arene.md](docs-dev/immagini-arene.md), forniti per il progetto e ottimizzati in WebP. I prompt dei banner di tutte le arene sono in [docs-dev/banner-arene.md](docs-dev/banner-arene.md). Nessun personaggio, marchio o logo di opere esistenti. |
| `assets/logo.webp` | Logo creato con imagegen per Last One Standing, reinterpretando il riferimento del progetto nello stile illustrato dei banner. |
| `assets/icona.webp`, `favicon.png`, `icona-180.png` | Icona dedicata generata per il progetto; favicon e icona per dispositivi derivate dall'immagine. |
| `assets/panoramica.webp`, `anteprima.jpg` | Illustrazione della home e anteprima per i link generate con imagegen per il progetto. |
| `assets/sagome/*.webp` | Tre sagome generiche generate con imagegen per il progetto. |
| SVG e icone prodotti da `src/art.js` e `src/ui.js` | Disegnati e conservati nel codice del progetto. |
| `assets/fx/*.webp` | Quattro pennellate, dieci sigilli delle arene e una grana della carta generati con Midjourney dai prompt di [docs-dev/movimento.md](docs-dev/movimento.md), forniti per il progetto e trasformati in maschere trasparenti WebP. Nessun simbolo o marchio di opere esistenti. |
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
