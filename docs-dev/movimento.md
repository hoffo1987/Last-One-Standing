# Movimento: gli «stacchi»

Questo è il linguaggio di movimento dell'interfaccia. Prende i **principi** dei menu dei Persona (Atlus), non il loro aspetto: niente rosso e nero, niente lettere ritagliate da giornale, niente forme riconoscibili. Colori, pennellate e luce restano quelli dipinti delle nostre arene.

Il codice sta in tre posti:

- `src/anim.js`, sezione «STACCHI»: le funzioni `wipe`, `card` e `stage`, più `kinetic` per le lettere;
- `src/style.css`, sezione «STACCHI»: la regia (tempi, curve, fotogrammi chiave);
- `src/ui.js`: dove si chiamano, cioè il cambio di sezione, i cartelli della diretta e la rivelazione dell'esito.

## Cosa dice la ricerca

Non ho potuto guardare video né aprire le pagine direttamente: la rete di questa sessione blocca i siti esterni. Le fonti qui sotto le ho lette attraverso la ricerca web.

| Principio osservato | Fonte | Come lo usiamo |
|---|---|---|
| Ogni menu è un programma a sé con la sua regia; l'interfaccia non è secondaria alla grafica | Hashino, in [PC Gamer](https://www.pcgamer.com/games/rpg/persona-series-director-says-atluss-flashy-menus-are-actually-really-annoying-to-design) e [Kotaku](https://kotaku.com/-metaphor-refantazio-persona-5-menu-ui-hashino-1851667088) | Ogni momento importante ha una regia scritta a mano, non una dissolvenza generica |
| All'inizio era illeggibile: lo stile si è piegato alla leggibilità | Hashino, ibid. | I cartelli restano fermi abbastanza da essere letti; testo sempre su un velo scuro |
| Un solo colore d'accento; linee centrali che guidano lo sguardo; l'informazione importante sempre dalla stessa parte | Atlus al CEDEC+KYUSHU 2017, in [Siliconera](https://www.siliconera.com/?p=668266) | Ogni stacco usa solo la tinta dell'arena; una fascia diagonale porta dal ritratto al nome |
| La schermata del calendario mostra la data vecchia, la cambia, poi tiene ferma la nuova; dà respiro dopo i dialoghi pesanti | Studio della transizione di giorno, [itch.io](https://itch.io/blog/533534/making-ui-come-to-life-study-of-persona-5) | Cartello del giorno nella diretta: il numero vecchio sale e sparisce, il nuovo arriva nel colore d'accento |
| L'animazione 2D e gli effetti coprono i punti deboli della scena; un fotogramma di passaggio nasconde il cambio | New Frame Plus, «The Overwhelming Style of Persona 5's All-Out Attacks» ([discussione](https://www.resetera.com/threads/new-frame-plus-the-overwhelming-style-of-persona-5s-all-out-attacks.255144/)) | Il contenuto cambia mentre le lastre coprono lo schermo; il disegno della pagina nuova avviene sotto la copertura |
| Tempi di uscita leggermente diversi rendono la scena viva | New Frame Plus, ibid. | Ogni lastra e ogni lettera ha un piccolo scarto casuale (± 12–14 ms) |
| Il menu di Persona 3 Reload nasce da un tema (acqua, bolle, sospensione) e lo esprime nel movimento | Kumagai a Famitsu, in [Automaton](https://automaton-media.com/en/news/20240207-26873/) | Il tema dell'arena guida il movimento: dopo l'entrata la scena respira (ritratto che galleggia, alone che gira) |
| Ogni pezzo entra a strati e mai fermo: animazioni dettagliate fanno sembrare il gioco sempre attivo | [Jiaxin Wen](https://jiaxinwen.wordpress.com/2017/04/27/the-ui-design-of-persona-5/) | Strati sfalsati nelle tendine; movimento lento e continuo dopo la rivelazione |

Due cose le ho dedotte dal mestiere dell'animazione, non da una fonte su Persona: le uscite più brevi delle entrate, e i lampi d'impatto a scatti «a due a due» mentre il resto scorre morbido.

## Le regole

1. **Mai una dissolvenza pura per cambiare schermata.** Il cambio è coperto da lastre in diagonale (−16°), a tre strati: scuro, tinta media, striscia luminosa.
2. **Si entra veloci e si frena** (`--ease-snap`, curva esponenziale). **Si esce accelerando** (`--ease-cut`). Le uscite durano meno delle entrate.
3. **Rimbalzo solo dove c'è un impatto** (`--ease-kick`): il ritratto, la corona, i numeri.
4. **Strati sfalsati di 40–80 ms**, con uno scarto casuale di ± 12 ms.
5. **Un cartello arriva, resta fermo, se ne va.** Il testo esce prima della fascia, così non resta mai scritto sulla scena senza velo.
6. **Il nuovo stato prende l'accento**: il nuovo giorno, il nome di chi vince.
7. **Lampi a scatti** (`steps(2)`): il titolo «Ultimo in piedi» e il nome del disastro sfarfallano due volte.
8. **Dopo l'entrata la scena respira**: il ritratto galleggia di 4 px in 6 s, l'alone gira in 60 s.
9. **Tutto si può saltare**: un tocco o un tasto chiude subito la rivelazione dell'esito.
10. **Con il movimento ridotto non parte niente**: il contenuto cambia subito, i cartelli non compaiono.

## Dove si vede

| Momento | Durata | Cosa succede |
|---|---|---|
| Cambio di sezione | ~0,75 s | Tre lastre coprono la pagina nei colori dell'arena di arrivo; al centro il nome della sezione; il contenuto cambia sotto; le lastre escono dall'altra parte |
| Nuovo giorno (diretta) | 1,6 s | Fascia diagonale; «Giorno» e il numero vecchio, che sale e lascia il posto al nuovo nel colore dell'arena; sotto il meteo |
| Disastro (diretta) | 1,6 s | Fascia con strisce di pericolo; «Disastro» da sinistra; il titolo arriva di colpo e sfarfalla due volte |
| Scontro finale (diretta) | 1,8 s | Fascia con i volti di chi resta, che entrano da lati alterni |
| Esito, prima volta | ~1,8 s, poi respiro | La scena si avvicina; la testata scivola da sinistra; la fascia di sguardo si apre; il ritratto entra di forza con un anello di luce; la corona cade; «Ultimo in piedi» si stampa; il nome entra lettera per lettera, ognuna con la sua rotazione; i numeri salgono e contano |

Mentre un cartello copre la diretta, il titolo della fase aspetta e entra subito dopo.

## Asset che renderebbero tutto più nostro

Il sistema funziona già senza immagini: le lastre e le fasce sono forme del foglio di stile. Con questi asset diventerebbe dipinto come i banner. Quando me li dai li monto io.

### 1. Pennellate per le tendine (la richiesta più utile)

Servono per dare un bordo dipinto alle lastre e alle fasce, al posto del taglio dritto. Quattro varianti, nero su bianco: le trasformo io in maschere trasparenti.

- Formato: PNG o WebP, almeno **2400 × 1200**, poi li riduco io.
- Nomi: `assets/fx/pennellata-1.png` … `pennellata-4.png`.

```text
A single bold horizontal sweep of thick black ink made with a wide dry brush, crossing the whole frame from left to right on plain white paper, ragged bristle edges, a few flying ink splatters at the end of the stroke, strong contrast, flat even lighting, scanned artwork, nothing else in the frame. --v 8.2 --ar 2:1 --style raw --no color, gray background, text, letters, signature, watermark, frame, border, shadow
```

Per le varianti cambia solo l'inizio della frase: «a short diagonal slash», «two parallel strokes», «a stroke that starts thin and ends very wide».

### 2. Sigilli delle arene (per il timbro della vittoria e i cartelli)

Un sigillo per arena, da far «stampare» sul ritratto di chi vince e da usare come filigrana nei cartelli della diretta. Nero su bianco, li coloro io con la tinta dell'arena.

- Formato: PNG, **1024 × 1024**, soggetto centrato.
- Nomi: `assets/fx/sigillo-<arena>.png`.

```text
A round emblem seal stamped in solid black ink on plain white paper, thick outer ring with a rough worn print texture, a single bold silhouette icon of {SOGGETTO} in the center, woodcut style, perfectly symmetrical and centered, high contrast, nothing else in the frame. --v 8.2 --ar 1:1 --style raw --no color, gray, text, letters, numbers, signature, watermark, frame, border, shadow
```

| Arena | {SOGGETTO} |
|---|---|
| `classico` | a golden horn of plenty spilling arrows |
| `fantasy` | a dragon coiled around a castle tower |
| `scifi` | a ring-shaped space station |
| `zombie` | a hand rising from the ground |
| `royale` | a supply crate hanging from a parachute |
| `horror` | a gothic mansion under a full moon |
| `wasteland` | a gas mask over crossed wrenches |
| `liceo` | a school bell with a paper plane |
| `ufficio` | a coffee mug and a stapler |
| `cyberpunk` | a cybernetic eye inside a hexagon |

### 3. Grana della carta (facoltativa)

Una trama che si ripete, da passare sopra le fasce dei cartelli per legarle alla grana dei banner.

- Formato: PNG, **1024 × 1024**, `assets/fx/grana.png`.

```text
Seamless tileable texture of rough watercolor paper with dry brush grain, subtle black speckles on white, even lighting, flat scan, no objects. --v 8.2 --ar 1:1 --tile --style raw --no color, text, signature, watermark, frame, border, shadow
```
