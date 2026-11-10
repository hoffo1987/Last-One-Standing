# Look «da Persona»: analisi, cosa manca, piano e prompt

Documento di lavoro (9 novembre 2026). Il punto di partenza è `docs-dev/movimento.md`. Gli «stacchi» copiano già bene i **tempi** dei menu Persona, ma il sito ha ancora l'**aspetto** di una dashboard web. Qui sotto trovi cosa ho visto, cosa manca e come chiudere il divario senza copiare niente di riconoscibile di Atlus (logo, font, personaggi, carte da visita, lettere ritagliate di P5).

## 1. Cosa ho guardato

**Il sito in locale** (`docs/index.html`, servito su http così le maschere `fx` si caricano):

- Stacco tra sezioni (rallentato 6×): tre lastre con pennellate, sigillo dell'arena, nome della sezione al centro. I tempi funzionano (entrata in 230 ms, attesa di 90 ms, uscita in 320 ms con scarto casuale), e coprire il cambio di pagina con le lastre è il trucco giusto.
- Cartello del giorno nella diretta: fascia dipinta, numero vecchio che sale e nuovo che cade. Resta dentro il banner.
- Esito: ritratto in un cerchio con una sagoma generica, corona, «Ultimo in piedi», nome lettera per lettera, statistiche che contano.

**Persona 3 Reload, menu di pausa** (fotogrammi del video [Pause Menu – Persona 3 Reload](https://www.youtube.com/watch?v=4d6x1CIgLSc)):

- Le voci del menu sono una pila di parole in maiuscolo corsivo pesantissimo, con dimensioni a scalare. La voce selezionata è enorme, con un'ombra rossa sfalsata. Le altre si stringono e si accavallano.
- Il personaggio occupa metà schermo, tagliato dai bordi, **ruotato** (a volte a testa in giù) e fuori quadro: la composizione è da manifesto, non da griglia.
- La lista del gruppo è fatta di righe a parallelogramma **sfalsate in orizzontale** (ogni riga rientra un po'). Ognuna ha un ritaglio stretto sugli **occhi** del personaggio, etichette ruotate di 90° («LEADER», «PARTY») e numeri grandi in corsivo colorati per tipo.
- La scheda dei legami ha un numero di rango gigantesco, etichette bianche su blocchi neri inclinati e un nome in corsivo con un sottolineato a fascia.
- La palette è **una tinta sola** (blu/ciano), più bianco, nero e un solo accento caldo, piccolo. Lo sfondo (acqua, riflessi) non sta mai fermo.

**Fonti scritte**:

- Il menu nasce da un tema (acqua, sospensione, «il mare della mente del protagonista»). Il modello 3D del menu è fatto apposta per l'interfaccia ([Automaton, intervista a Kumagai](https://automaton-media.com/en/news/20240207-26873/)).
- Ogni menu è un programma a sé con la sua regia. Lo stile si è piegato alla leggibilità ([PC Gamer](https://www.pcgamer.com/games/rpg/persona-series-director-says-atluss-flashy-menus-are-actually-really-annoying-to-design)).
- In P5 non ci sono sottocolori oltre a quelli di HP e SP, per proteggere il rosso. La regia della battaglia è stata controllata fotogramma per fotogramma ([Siliconera, CEDEC+KYUSHU 2017](https://www.siliconera.com/?p=668266)).
- La voce selezionata cresce e prende colore, e la gerarchia è rigida: azioni principali intorno al personaggio, informazioni secondarie ai lati ([Mechanics of Magic](https://mechanicsofmagic.com/2022/04/23/visual-design-of-games-persona-5/)).
- Per gli angoli sul web conviene `clip-path: polygon()` invece di skew e contro-skew. Per animare un poligono serve lo stesso numero di punti tra i due stati ([web.dev GUI Challenges](https://web.dev/shows/gui-challenges/jjtiIIjEsTw)).

## 2. Cosa manca, esattamente

| # | Divario | Dato nel codice | Effetto |
|---|---|---|---|
| 1 | **Forme morbide** | 294 `border-radius` contro 10 `clip-path` e 12 `skew` in `src/style.css` | Tutto ha l'aria di card SaaS. In Persona non c'è un angolo arrotondato. |
| 2 | **Tipografia neutra** | `--f-display` è Bricolage Grotesque, `--f-body` Figtree; titoli a 800, dritti | Manca un display condensato o largo **corsivo 900**, e manca il contrasto di scala (10:1 tra numero ed etichetta). |
| 3 | **Colore impastato** | Le lastre degli stacchi sono `hsl(h 45% 5%)` e `hsl(h 70% 24%)` con un gradiente; nello screenshot dell'Arena Classica il risultato è marrone fango | Persona usa una tinta piena e satura, più bianco e nero puri. Un mezzo tono non fa effetto. |
| 4 | **Niente personaggi** | Avatar tondi con iniziali, sagome generiche nell'esito | L'interfaccia di Persona è costruita intorno ai volti: tagli sugli occhi, ritratti fuori quadro. Qui ci sono le **foto dei giocatori**, che si possono usare proprio così. |
| 5 | **Selezione piatta** | Navigazione e filtri sono pillole con uno sfondo | Manca il «cursore» a forma propria che scivola tra le voci (FLIP), con il testo che si inverte e la voce che cresce. |
| 6 | **Liste in colonna dritta** | Feed eventi, «In gara», classifica | Mancano le righe sfalsate a cascata, le etichette ruotate e i numeri in corsivo grandi. |
| 7 | **Nessun suono** | Né `AudioContext` né `new Audio` in `src/*.js` | Metà della sensazione Persona è sonora: ogni spostamento ha un clic, ogni conferma un colpo. È il singolo elemento mancante più grande. |
| 8 | **Esito senza «cut-in»** | Cerchio, corona, nome | Manca il momento clou: una fascia che taglia lo schermo con gli occhi di chi vince, poi il ritratto enorme e inclinato, poi i risultati come linguette. |
| 9 | **Cartelli piccoli** | `.stc` vive dentro `.broadcast` | Giorno e notte meritano almeno una volta lo schermo intero, come la transizione del calendario. |
| 10 | **Composizione a griglia** | Layout centrati e simmetrici | Persona compone in diagonale: blocchi che sbordano, testo che esce dal contenitore, pesi asimmetrici. |

Cosa va già bene e va tenuto: la regia degli stacchi (tempi, curve, scarto casuale), il rispetto di `prefers-reduced-motion`, le atmosfere per arena su canvas, il fatto che tutto si possa saltare e i banner dipinti.

## 3. Piano, in ordine di resa

1. **Token e forme (mezza giornata).** Aggiungi `--cut: 14px` e una utility `.cut { clip-path: polygon(var(--cut) 0, 100% 0, calc(100% - var(--cut)) 100%, 0 100%); border-radius: 0 }`, poi applicala a pulsanti, pillole, card e tab. Il raggio resta solo su avatar e foto, e anche lì meglio un rombo o un esagono inclinato.
2. **Palette a tre per arena.** Per ogni arena: una tinta piena (`--key`, saturazione 85–100%, luminosità 50–60%), nero `#0a0a0c`, bianco `#f7f5f0`, più un solo accento di contrasto usato **solo** per lo stato selezionato. Le lastre degli stacchi diventano piatte: una nera, una `--key` piena e una bianca sottile come lama.
3. **Font display.** Da Google Fonts, che il progetto usa già: **Archivo** (asse larghezza 62–125, corsivi, peso 900) per titoli e numeri, condensato nelle liste ed espanso nei cartelli. Oppure **Big Shoulders Display** per i numeri giganti. Titoli in corsivo 900 con `letter-spacing: -0.02em`, etichette in maiuscolo con spaziatura 0.2em, numeri sempre `tabular-nums`.
4. **Cursore di selezione.** Un elemento unico `.cursor` con `position: absolute`, che va sulla voce attiva con FLIP (Web Animations, `EASE_OUT`, 180 ms). Ha un piccolo «overshoot» di rotazione (−4° → −2°) e il testo della voce selezionata passa da bianco a nero sopra la forma. Vale per nav, filtri, tab e scelta delle arene.
5. **Liste a cascata.** Per righe del feed e classifica: `transform: translateX(calc(var(--i) * 6px)) skewX(-8deg)` sul contenitore e contro-skew sul testo. Entrata con 30 ms di ritardo per indice. Etichette tipo «Uccisione» o «Alleanza» come tag ruotati di 90° sul lato sinistro della riga.
6. **Taglio sugli occhi.** Dalla foto del concorrente: un `div` alto circa 18% della foto, con `background-position` sugli occhi (stima 38% dall'alto; si può migliorare con FaceDetector dove esiste) e `clip-path` a parallelogramma. Si usa nelle righe «In gara», nei cartelli dello scontro finale e soprattutto nel **cut-in delle uccisioni importanti**: una fascia orizzontale, gli occhi di chi colpisce, 600 ms, poi via.
7. **Esito ridisegnato.** (a) Schermo nero e una lama bianca diagonale. (b) Cut-in con gli occhi di chi vince, 500 ms. (c) Ritratto a tutta altezza, ruotato di −8°, tagliato dal bordo destro, su campo `--key`. (d) Nome gigante in corsivo 900 che esce dal contenitore. (e) Statistiche come linguette sfalsate, con numeri che contano. (f) Respiro: lo sfondo continua a muoversi.
8. **Audio (piccolo ma decisivo).** Un modulo `sfx.js` con WebAudio: `move` (clic corto, 30 ms), `confirm` (colpo con un po' di riverbero), `cut` (fruscio della lastra), `stamp` (tonfo del sigillo), `kill` (colpo secco). Volume basso, spento di default, interruttore nelle opzioni, muto con il movimento ridotto. I suoni vanno fatti apposta o presi da librerie CC0; non vanno mai estratti dai giochi.
9. **Cartello a tutto schermo** solo per il Giorno 1 e per il finale, usando `wipe()` con un'etichetta grande. Gli altri restano nel banner.
10. **Prova su mobile**: le diagonali sui 375 px si mangiano spazio, quindi va ridotto `--cut` e usato `skewX(-6deg)`.

Vincoli che restano: niente rosso e nero «alla P5» come palette globale, niente lettere da lettera di riscatto, niente font o icone originali, nessun nome «Persona» negli asset o nei prompt.

## 4. Asset e prompt

I prompt definitivi, da copiare e incollare, sono in [prompt-midjourney.md](prompt-midjourney.md): 33 immagini in cinque gruppi (fondali delle arene, forme grafiche, mezzitoni, ritratti di riserva, vincitori).

Divisione del lavoro: tu generi su Midjourney e scarichi gli upscale in `da-importare/`, che git ignora. Al resto penso io: riconosco le immagini, le importo con `tools/import-fx.py` (maschere nero su bianco diventano trasparenti, i vincitori perdono il fondo bianco, tutto in WebP), ricavo dai ritratti la fascia sugli occhi, aggiorno `ASSETS.md` e collego tutto al sito.

Ritratti e vincitori sono in bianco e nero, e la tinta dell'arena la applica il CSS (`mix-blend-mode` o una mappa di colore), così ogni immagine vale per tutte e dieci le arene.

## 5. Stato (9 novembre 2026)

Il codice sta in `src/look.css` (caricato dopo `style.css`) e `src/look.js` (dopo `anim.js`, prima di `ui.js`). `look.js` avvolge `wipe`, `card` e `stage` di `LOS_ANIM`. L'unica modifica a `ui.js` sono gli attributi `data-g` e `data-k` sugli avatar.

| Fatto | Dove si vede |
|---|---|
| Forme tagliate, pulsanti e voci inclinati, ombre piene | ovunque |
| Archivo corsivo 900 per titoli, numeri e cartelli | ovunque |
| Tinta piena `--key`; nero o carta per il testo sopra, scelto per contrasto | pulsanti principali, cursore, etichette |
| Cursore di selezione con FLIP | navigazione e segmenti |
| Righe a cascata con l'angolo tagliato; macchia d'impatto dietro le uccisioni | diretta |
| Stacchi: tinta più fondale dell'arena di arrivo, mezzitoni, freccia dopo il nome | cambio di sezione |
| Fascia dipinta sotto le etichette, carta strappata per i disastri, fasce sugli occhi nello scontro finale | cartelli della diretta |
| Fondale, stella, mezzitoni, volto tinto e figura intera di riserva, fascia «Ultimo in piedi» | esito |
| Cut-in: fulmine, fascia nera, pannello 5:1 con gli occhi (foto o riserva) | esito, alla prima rivelazione |
| Suoni WebAudio, spenti di default | pulsante con l'altoparlante nell'intestazione |

Riserve: volti, occhi e vincitori si scelgono per genere (`m`, `f`, `n`) con un hash stabile dell'id, quindi lo stesso concorrente riceve sempre la stessa immagine. Le sagome restano negli avatar piccoli, dove contano le iniziali.

### Regia degli stacchi, seconda versione (`src/regia.js`)

Problema riportato: transizioni «a bassa risoluzione, sempre uguali, staccate». Le cause misurate erano tre: le pennellate (1200 px) venivano stirate su circa 2700 px e i sigilli (320 px) su 440; i fondali, moltiplicati dentro le lastre, diventavano fango; e c'era una sola coreografia, ripetuta identica.

La nuova regia è vettoriale: un SVG alla risoluzione dello schermo, forme rigenerate a ogni stacco, nitide a ogni densità di pixel.

- **Quattro famiglie:**
  - lame diagonali con bordo strappato e lame di carta;
  - schegge triangolari che partono dal lato o dal punto toccato;
  - sipario di strisce inclinate che entrano da lati alterni;
  - esplosione a stella con anello di carta, che esce con un taglio diagonale e due metà che si separano.
- **Varietà con una regola:** ogni sezione ha la sua famiglia preferita (Esito → esplosione, Arena → schegge, Concorrenti → sipario, Diretta e Home → lame). Nel 30% dei casi se ne sceglie un'altra, mai la stessa due volte di fila. Angoli, numero di pezzi, colori e bordi cambiano ogni volta.
- **Direzione:** avanti nei passi va verso destra, indietro verso sinistra.
- **Cartello:** lastra di carta che si apre, lettere che cadono una per una con rotazioni diverse, sottotitolo «Passo N di 4» su fondo nero, sigillo piccolo (entro la sua risoluzione). Il cartello si stringe e si sposta per restare sempre dentro lo schermo.
- **Ingresso della pagina:** mentre la copertura esce, i blocchi visibili della sezione nuova entrano a strati dal lato della direzione (36 ms tra uno e l'altro). Sono esclusi quelli che hanno già una loro regia.
- **Cartelli della diretta:** la fascia è tagliata in vettoriale, con bordi diversi a ogni cartello.
- **Curve comuni:** `out`, `in`, `io` e `kick`, le stesse in tutta la regia.

`LOS_REGIA.force = 'schegge'` forza una famiglia, solo per provare.

### Il palco (`src/palco.js`, `src/palco.css`)

Terzo strato, sopra look e regia: tutto quello che vive a tutto schermo. Usa solo nero, carta e la tinta dell'arena.

| Cosa | Dove | Come |
|---|---|---|
| Fondale vivo | dietro ogni pagina | Due fasce con il nome della sezione che scorrono in versi opposti, il numero del passo gigante in contorno, due schegge a mezzitoni. Segue piano il puntatore. Cambia mentre lo stacco copre lo schermo. |
| Testate | Concorrenti, Arena | Titolo da manifesto in maiuscolo con ombra piena nella tinta; le lettere entrano una per una, la riga sotto si disegna. |
| Scintilla | ogni tocco su un comando | Raggi vettoriali dal punto toccato. |
| Inchiostro | pulsanti secondari | Al passaggio il colore attraversa la lastra da sinistra. |
| Calendario | cambio di giorno | Fascia nera a tutta larghezza; la striscia dei giorni scorre di un posto e il nuovo si ferma nel selettore di carta (numeri in fusione «difference»). |
| Disastro | fase disastro | Nastri di pericolo che scorrono, titolo che cade parola per parola, la pagina trema. |
| Scontro finale | primo atto del finale | Gli occhi di chi resta entrano da lati alterni; il titolo si stampa al centro. |
| Cut-in | un'eliminazione per fase, quando si avanza | Chi colpisce nella tinta, chi cade in grigio; una lama taglia, il pannello si spezza e si tinge, il timbro prende l'etichetta dell'evento. |
| Contatore | superstiti | Accusa il colpo quando scende. |
| Vittoria | prima rivelazione dell'esito | Taglio, occhi con linee di velocità, poi il cartellone: figura (o foto, o squadra) su stella di carta, titolo su due lastre, nome lettera per lettera, nastri che scorrono. Un tocco o un tasto la chiude; si chiude da sola dopo circa 4 secondi. |

Due famiglie in più per gli stacchi: `retino` (mezzitoni che crescono dal punto toccato) e `titoli` (fasce con il nome della sezione). In tutto sono sei.

Regole: i cartelli non bloccano mai i comandi e un comando della diretta li chiude subito; il cut-in non parte se c'è già un cartello o se ne è appena passato uno; con il movimento ridotto non parte niente. `LOS_PALCO.hold = true` tiene aperta la vittoria, solo per provare.

Da fare: un secondo giro di volti (10 per 24 concorrenti fa ripetere i volti nello scontro finale), una mascotte se la vogliamo, e l'ascolto dei suoni su dispositivi veri.

## Quarto giro: rivisti fotogramma per fotogramma

Metodo: si avvia l'effetto, si mettono in pausa tutte le animazioni e si sposta `currentTime` a istanti precisi (vedi la regola sotto sul riempimento). Cosa è emerso e cosa è cambiato:

- **Timbro dell'arena negli stacchi.** Era un'ombra nera al 32% al centro dello schermo, sotto il cartello: in circa mezzo secondo si vedeva appena. Ora (`stamp` in `regia.js`) è un timbro vero accanto al cartello, sopra il suo angolo destro (o sotto, se manca posto): lastra di carta dal bordo irregolare, sigillo in nero con una seconda passata nella tinta appena fuori registro, nastro con il nome dell'arena (i nomi lunghi stringono il carattere). Cade con l'ombra che si stringe (sollevato → premuto); all'impatto due onde, schizzi d'inchiostro, la lastra slitta e la scena trema. Quando c'è il timbro il cartello resta fermo 420 ms invece di 110.
- **Linee di velocità** nelle famiglie `lame` e `sipario`: barre di carta e di tinta che attraversano lo schermo più veloci delle lastre.
- **Cut-in delle eliminazioni.** Era una striscia nera sulla pagina ancora leggibile, con una linea sottile sul volto di chi cade e il timbro sopra i volti; la «spaccatura» non avveniva. Ora: vignetta rossa sulla pagina, linee di velocità nella fascia, riflesso sugli occhi di chi colpisce, chi cade a colori fino al colpo; lampo, lama luminosa lungo la diagonale, il pannello si divide davvero in due metà che scivolano lungo il taglio, schizzi che volano e colano, volto in grigio e rosso, nome barrato, scena che trema; il timbro cade sotto la fascia su una macchia d'inchiostro; in uscita le metà cadono. Durata 1,6 s; un comando la chiude subito come prima.
- **Ritagli delle figure.** Le figure dei vincitori toccano i bordi dell'immagine (a destra fino all'88%, in basso fino al 100%) e lì restava una linea dritta, ripassata dall'ombra colorata. `LOS_LOOK.feather` misura su una miniatura quanta figura tocca ciascun bordo e sfuma solo quei lati, con una curva in quattro tappe; vale per l'esito e per il cartellone della vittoria.
- **Regola per le uscite programmate.** Un'animazione d'uscita creata all'inizio con un ritardo (`delay: D - …`) deve avere `fill: 'forwards'`: con `both` il suo riempimento all'indietro vince sull'entrata e la annulla. Succedeva a calendario, disastro, scontro finale (le righe non entravano) e al cut-in.
