# Overhaul «next level»: brief di direzione

Documento per chi lavora sull'overhaul (Opus come regia generale, Fable sulle aree pesanti). Data: 18 novembre 2026.
Lo stile resta quello costruito finora (look, regia, palco: mood Persona, tre colori di scena), ma ogni parte che sembra un template web va rifatta da capo. **Il criterio è uno: nessuna schermata deve sembrare una dashboard, un tema Bootstrap o un sito generato in fretta.**

---

## 1. Cosa dice la ricerca (fonti primarie)

### Persona 5, talk Atlus al CEDEC+KYUSHU 2017 (Masayoshi Suto, art director e UI lead; Kazuhisa Wada)

Fonte: [resoconto Famitsu](https://www.famitsu.com/news/201711/13145540.html), [scheda della sessione](https://cedec-kyushu.jp/2017/session/16.html).

- **La UI è protagonista, non comparsa.** Il cambio è nato con Persona 3, per necessità: la UI doveva «avvolgere» i contenuti del gioco e alzare la qualità percepita a basso costo.
- **Si parte dal colore.** Prima si decide un colore principale, che è ciò che resta più impresso. Insieme si fissano logo e «font chiave». P3 blu, P4 giallo, P5 rosso.
- **Il colore secondario si usa il meno possibile.** In P5 non ce n'è quasi nessuno, a parte i valori di HP e SP, per non indebolire il rosso. In P3 il secondario (il giallo delle fasi lunari) serve solo all'informazione importante.
- **Si mescolano forme e colori quotidiani** per abbassare la soglia d'ingresso. Il concept di P5 è «pop punk»: pop vuol dire per tutti, punk vuol dire contro l'ordine.
- **Lo sguardo segue le linee.** Quando si apre il menu, una linea bianca al centro guida l'occhio.
- **La profondità si vede.** Scendendo di un livello cambiano layout e angolazione, così si capisce dove si è.
- **La luminosità codifica la priorità.** Lo spazio con le informazioni più importanti è il più luminoso, quello con le meno importanti il più scuro, con passaggi graduali.
- **Le pose in scena sono pensate come inquadrature**, compresa l'illustrazione 2D del «taglio decisivo».
- **Specifiche al pixel e al fotogramma.** Oltre 1000 fogli di coordinate consegnati ai programmatori; i designer regolavano con loro «1 dot e 1 frame» seduti accanto. Il programmatore porta idee proprie: la UI non la decide una persona sola.
- **Tutta la grafica è in tracciati vettoriali**, perché resta nitida a ogni risoluzione.

### Persona 3 Reload, intervista Famitsu a Tomohiro Kumagai e al team UI

Fonte: [Famitsu](https://www.famitsu.com/news/202311/29325647.html) e [Automaton](https://automaton-media.com/en/news/20240207-26873/).

- **Un tema emotivo regge tutto.** Il blu pulito, la sensazione di galleggiare sott'acqua, la trasparenza: «affondare nel proprio cuore per guardare i legami». Il tema diventa movimento, non solo colore.
- **Dettagli coerenti col tema:** increspature, gradienti e riflessi da vetro.
- **Ogni voce del menu ha la sua messa in scena:** il personaggio cambia posa per ciascuna. Un esempio: in «SYSTEM», nona voce, il protagonista è appeso al numero 9.
- **Bozze belle ma illeggibili, una volta nel gioco, vengono scartate.** Si sceglie dopo prove d'implementazione, su design, usabilità e manovrabilità insieme.
- **Velocità di risposta come in P5:** nessuna attesa.
- **Il testo lungo non deve rompere la composizione;** le traduzioni si rivedono se escono dai margini.

### Metaphor: ReFantazio, talk GDC 2025 di Koji Ise (lead interface designer)

Fonti: [GamesRadar via Yahoo](https://tech.yahoo.com/articles/lead-ui-designer-metaphor-refantazio-174719826.html), [PC Gamer](https://www.pcgamer.com/games/rpg/persona-series-director-says-atluss-flashy-menus-are-actually-really-annoying-to-design).

- **La UI guida la direzione artistica del gioco**, non la insegue.
- **Rifiutare le copie.** Una bozza «pop come Persona» è stata scartata perché non aveva identità propria. Ogni gioco deve trovare un tema che solo lui può esprimere.
- **Una stella polare, «hyper stylish»,** sorretta da quattro pilastri: **cool, immersivo, intrigante, che fa parlare**.
- **La UI non è una meta-funzione staccata dal mondo,** ma ciò che collega il giocatore al mondo.
- **Espressione simbolica che sorprende:** nel menu principale l'eroe è sdraiato.
- **Ogni menu è un programma a sé con la sua regia** (Hashino). Si accetta che sia costoso.

### Cosa ho osservato fotogramma per fotogramma (P5, P3R)

- **Liste:** righe sfalsate a cascata, etichette ruotate di 90°, numeri grandi e in corsivo, piccoli ritagli sugli occhi accanto ai nomi.
- **Composizione:** personaggio enorme tagliato dai bordi, a volte capovolto; testo che esce dai contenitori.
- **Selezione:** la voce scelta cresce, si inverte di colore e ha un'ombra sfalsata colorata. Le altre si stringono.
- **Lo sfondo non è mai fermo:** la camera si muove sempre e la voce selezionata cambia anche il mondo dietro.
- **Le transizioni sono contestuali** (silhouette nei corridoi, ombrelli quando piove), mai generiche.

### Metaphor: menu osservati fotogramma per fotogramma ([video](https://www.youtube.com/watch?v=MawLP5X99U4))

- **Titolo gigante tagliato dal bordo.** La parola della schermata (PARTY, CALENDAR) è enorme e il bordo superiore la taglia: il titolo è scenografia, non etichetta.
- **La selezione cambia il mondo.** La voce scelta ha dietro una pennellata e l'accento di tutto il menu cambia con lei: giallo su QUEST, ciano su SYSTEM. Solo la voce selezionata mostra la sua sottoetichetta.
- **Liste a grandezze miste.** Le voci si sovrappongono, la selezionata è la più grande, le vicine si stringono.
- **Gruppi di ritratti.** Teste di profilo in fila, sovrapposte, rivolte dalla stessa parte. La riga selezionata della lista sta su una lastra chiara, con piccole etichette ruotate a sinistra e numeri grandi a destra.
- **Dati in targhe.** I valori stanno in piccole targhe chiare con filetti sottili, in un angolo; la composizione la dominano tipografia e figura.
- **Calendario.** Griglia di numeri enormi, il giorno corrente chiuso in un riquadro di carta, i giorni speciali nel colore di stato, un pannello di dettaglio laterale con texture.

---

## 2. Principi per questo progetto (vincolanti)

1. **Una tinta, nero, carta.** `--key` (la tinta dell'arena), `--void` (#0a0a0c) e `--paper` (#f7f5f0). Il secondario solo per lo stato (uccisione `--c-kill`, eccetera), mai decorativo. Niente gradienti arcobaleno, niente vetri sfocati.
2. **Gerarchia per luminosità e massa.** L'informazione più importante è la più chiara e la più grande, quella secondaria si spegne. Contrasto di scala minimo di 6:1 tra il numero protagonista e la sua etichetta.
3. **Ogni contenitore ha una forma intenzionale.** Parallelogramma, taglio d'angolo, fascia strappata, lastra inclinata. Mai un rettangolo con bordo grigio da 1 px e ombra sfumata: è il segno del template.
4. **Linee guida dello sguardo.** Ogni schermata ha una diagonale o una linea che porta dall'elemento principale all'azione principale.
5. **La profondità si vede.** Pannelli di secondo livello (scheda, dialogo, editor) cambiano angolo e piano: entrano da un lato, inclinati, con il livello sotto che arretra e si scurisce.
6. **La selezione è un evento.** Hover, focus e attivo hanno sempre una risposta visibile e coerente: lastra di tinta, inversione, ombra piena sfalsata, piccolo rimbalzo (`--ease-kick`). Niente `opacity: .8` come unico feedback.
7. **Tipografia da manifesto.** Archivo corsivo 900 per titoli e numeri, maiuscolo, `font-stretch` largo. Etichette in maiuscoletto spaziato (`letter-spacing: .2em`). Testo corrente in Figtree, leggibile, mai sotto i 14 px.
8. **Movimento con regia:**
   - si entra veloci e si frena (`out`), si esce accelerando (`in`), il rimbalzo solo dove c'è un impatto (`kick`);
   - gli strati sono sfalsati di 30–60 ms e le uscite durano meno delle entrate;
   - tutto si può saltare e non c'è mai attesa per usare un comando.
9. **Leggibilità prima di tutto.** Se una scelta stilosa rende un testo illeggibile o un comando difficile, si scarta (lezione di P3R). Contrasto AA sul testo.
10. **Movimento ridotto:** con `prefers-reduced-motion` o `[data-reduced-motion]` le forme restano, il movimento si ferma.
11. **Telefono:** tutto deve funzionare a 375 px senza scorrimento orizzontale. Le diagonali si attenuano (`--slant` è già più lieve sotto i 600 px).
12. **Niente di riconoscibile di Atlus:** loghi, font originali, lettere ritagliate «da biglietto da visita», personaggi. Si prendono i principi, non le forme.

### Segni di «vibecoding» da eliminare

- Card con bordo da 1 px, raggio e ombra morbida, tutte uguali, in griglia.
- Chip e pillole grigie con testo piccolo; badge tondi ovunque.
- Pulsanti «ghost» con contorno sottile; `select` e `input` del browser non stilizzati.
- Stati vuoti con un titolo, una frase e un pulsante al centro.
- Tabelle a righe alternate; grafici con colori di default.
- Icone generiche alla rinfusa di dimensioni diverse; emoji usate come icone.
- Testo grigio chiaro su fondo grigio scuro; troppe dimensioni di testo vicine (13, 14, 15 px insieme).
- Pannelli `backdrop-filter: blur` («glassmorphism»).
- Spaziature irregolari; elementi allineati al centro per pigrizia.

---

## 3. Architettura (da rispettare per lavorare in parallelo)

- **Strati esistenti:**
  - `src/style.css` (base, 2700 righe, da non toccare);
  - `src/look.css` + `src/look.js` (forme, cursore, suoni, volti);
  - `src/regia.js` (stacchi tra sezioni);
  - `src/palco.css` + `src/palco.js` (fondale vivo, cartelli a tutto schermo, vittoria).
- **Nuovi file:** si scrive solo in `src/skin/`. La build (`tools/build.js`) carica da sola, in ordine alfabetico, ogni `src/skin/*.css` dopo `palco.css` e ogni `src/skin/*.js` dopo `palco.js` (prima di `ui.js`). Nomi: `10-home`, `20-cast`, `30-arena`, `40-diretta`, `50-esito`, `90-comuni`.
- **Ogni area ha i suoi file.** Non modificare `style.css`, `look.*`, `regia.js`, `palco.*`, `ui.js`, `shell.html`, `tools/build.js`, né i file di altre aree: altri agenti lavorano in parallelo e una modifica concorrente si perde. Se serve davvero cambiare il markup in `ui.js` o `shell.html`, **non farlo**: scrivi nel resoconto finale la modifica esatta (funzione, prima e dopo) e la applica la regia.
- **Per cambiare il markup senza toccare `ui.js`:** decora con un `MutationObserver`, come fanno `look.js` e `palco.js`. Avvolgi le funzioni di `LOS_ANIM` solo se indispensabile. Ogni modulo è un'IIFE su `window`, non lancia errori (`try/catch` attorno alla decorazione) e non rompe nulla se l'elemento atteso manca.
- **Token disponibili:** `--key`, `--key-ink`, `--void`, `--paper`, `--hard`, `--slant`, `--unslant`, `--cut`, `--look-out`, `--ease-kick`, `--ease-snap`, `--ease-cut`, `--f-display`, `--f-body`, `--h` (tinta dell'arena), `--accent`, `--ink`, `--muted`, `--panel`, `--line`, `--bg`. Sono definiti in `style.css`, `look.css` e `palco.css`. In JS, `window.LOS_REGIA.E` ha le curve (`out`, `in`, `io`, `kick`) e `window.LOS_LOOK.sfx.play('move'|'confirm'|'cut'|'stamp'|'slash')` i suoni.
- **Tema chiaro e scuro:** entrambi devono funzionare (`:root[data-theme="light"|"dark"]` e `prefers-color-scheme`).
- **Build e prove:**
  - si costruisce con `node tools/build.js`; se esce un errore `UNKNOWN`/`EBUSY` su `dist/`, è un altro agente che sta costruendo: aspetta qualche secondo e riprova;
  - il sito si prova su `http://localhost:8765/docs/index.html` (server già attivo; per avviarlo, `mcp__Claude_Browser__preview_start` con nome `static`);
  - apri **una scheda tua** (`tabs_create`) e lavora solo lì;
  - per avere una partita, `#quickPlay` in home oppure `#arena` → «Avvia la simulazione»; poi «Avanti» o «Salta all'esito»;
  - con il pannello del browser nascosto le animazioni non avanzano: per fotografarle mettile in pausa e imposta `currentTime` a mano;
  - gli screenshot arrivano con un passo di ritardo: scattane due.
- **Prima di chiudere:** `node tools/check.js` deve passare, nessun errore in console, prova a 1440 px e a 375 px, in tema scuro e chiaro. Non fare commit: li fa la regia.

---

## 4. Le aree

| Area | File | Chi |
|---|---|---|
| Home, stati vuoti, intestazione, piè di pagina, dialoghi e moduli comuni (input, select, checkbox, range, details, tooltip, barre di scorrimento) | `10-home.*`, `90-comuni.*` | Opus |
| Concorrenti: schede del cast, barra degli strumenti, statistiche, dock, editor e scheda profilo | `20-cast.*` | Fable |
| Arena: scelta dell'arena, regole e difficoltà, anteprima, guida (luoghi, armi, pericoli, oggetti), eventi personalizzati | `30-arena.*` | Fable |
| Diretta: testata della trasmissione, linea dei giorni, filtri, righe degli eventi, pannello laterale (mappa, caduti, in gara, legami), comandi di riproduzione | `40-diretta.*` | Fable |
| Esito: tutto ciò che sta sotto la testata della vittoria (podio, premi, svolte, grafici, classifica, locandina, archivio) | `50-esito.*` | Fable |

Per ogni area, il risultato atteso è un «menu Atlus» per quella funzione: una composizione con una regia propria, non una pagina di card. Si guarda come P5 e P3R risolvono una schermata analoga e se ne prende il principio:

- **cast** → schermata del gruppo e dei legami;
- **arena** → selezione con anteprima che cambia il mondo dietro;
- **diretta** → interfaccia di battaglia e cronologia;
- **esito** → schermata dei risultati e del calendario.
