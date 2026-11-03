# Immagini delle arene: luoghi, pericoli e armi

_Generato da `node tools/atlas-slots.js` a partire da `tools/atlas-brief.js`: per cambiare un testo o un prompt modifica il brief e rigenera, non questo file._

**Presenti: 0 su 156** (luoghi 0/54, pericoli 0/35, armi 0/67). Meteo, disastri e oggetti arriveranno in un secondo momento.

## In breve

1. Genera l'immagine con il prompt della voce (in inglese, perché i generatori lo seguono meglio; sopra c'è sempre la descrizione in italiano).
2. Esportala in **WebP** con le dimensioni della sua sezione e salvala con il **nome esatto** indicato, nella cartella indicata.
3. Lancia `node tools/build.js`: il sito la usa al posto dell'illustrazione provvisoria. `node tools/atlas-slots.js` aggiorna i conteggi qui sopra (✓ accanto alle voci presenti).

## Regole comuni

- **Formato**: WebP con qualità 80–85. Si accettano anche PNG, JPG o AVIF con lo stesso nome (prevale il primo trovato tra webp, png, jpg, jpeg, avif). Profilo colore sRGB.
- **Nomi**: minuscolo, senza accenti né apostrofi, parole separate da trattini, proprio come nell'elenco. Un nome diverso non viene trovato.
- **Niente testo** dentro le immagini: niente scritte, cartelli leggibili, loghi o filigrane. I nomi li scrive il sito.
- **Stile**: lo stesso dei banner delle arene (`assets/arene/<arena>.webp`). Il modo più sicuro per restare coerenti è dare al generatore **il banner dell'arena come immagine di riferimento** e creare tutte le immagini di un'arena nella stessa sessione.
- **Persone**: nessuna persona reale riconoscibile. Nel Liceo e nell'Ufficio i pericoli sono caricature comiche.
- **Peso**: entro i limiti della tabella; il sito carica le immagini solo quando servono, ma pesi alti rallentano il telefono.
- **Il file unico** `dist/last-one-standing.html` non incorpora queste immagini (diventerebbe enorme): le mostra il sito.

| Sezione | Proporzioni | Dimensioni | Minimo | Sfondo | Peso massimo | Quante |
| --- | --- | --- | --- | --- | --- | --- |
| Luoghi | 16:9 | 1280 × 720 px | 960 × 540 px | pieno | 150 KB | 54 |
| Pericoli | 4:3 | 960 × 720 px | 800 × 600 px | pieno e scuro | 120 KB | 35 |
| Armi | 1:1 | 512 × 512 px | 384 × 384 px | trasparente | 60 KB | 67 |

### Luoghi: come appaiono e come comporle

Scheda della zona nel capitolo Mappa. Al computer l'immagine occupa la parte alta della scheda in 16:9, larga circa 270 px. Sul telefono diventa una colonna a sinistra di 120 × 140 px circa: si vede solo la **fascia centrale verticale**, poco meno di metà della larghezza.

- Il punto di riconoscimento del luogo (la Cornucopia, la torre, il bancone…) va nel **terzo centrale**.
- Inquadratura ad altezza d'occhio, profondità con un po' di foschia sullo sfondo.
- Nessuna persona: il luogo deve sembrare pronto per i concorrenti.
- L'immagine si vede piccola: servono contrasti netti tra primo piano e sfondo e poche cose ben riconoscibili, non una scena affollata.

### Pericoli: come appaiono e come comporle

Manifesto «ricercato» appeso nel capitolo Mappa: carta color avorio, puntina rossa, leggermente inclinato. L'immagine è un 4:3 largo circa 190 px al computer e 150 px sul telefono, con il nome scritto sotto dal sito.

- Un solo soggetto (o un gruppo che si legge come uno), **centrato e rivolto verso chi guarda**.
- Testa e occhi nella metà alta: il ritaglio toglie pochissimo dai bordi, ma i bordi devono essere sacrificabili.
- Sfondo scuro che sfuma quasi al nero ai bordi: sul manifesto chiaro fa da cornice.
- Nel Liceo e nell'Ufficio sono **caricature comiche**, mai minacciose o violente, e non devono somigliare a persone reali.

### Armi: come appaiono e come comporle

Rastrelliera dell'armeria nel capitolo Mappa: ogni arma sta in una piastrella arrotondata di **62 × 62 px**, sia su fondo chiaro sia su fondo scuro (tema notte).

- Un solo oggetto, **sfondo completamente trasparente** (WebP o PNG con canale alfa).
- Disposto in diagonale dal basso a sinistra all'alto a destra, con circa il **12% di margine** su ogni lato.
- Sagoma netta con un sottile contorno scuro, così si legge su fondo chiaro e scuro; niente ombra a terra, niente mani.
- Deve riconoscersi a 62 px: forme semplici, pochi dettagli minuti.

### Come sono fatti i prompt

Ogni voce ha un **prompt breve**, scritto apposta per quel soggetto. Il **prompt completo** (si apre sotto ogni voce) aggiunge, nell'ordine, lo stile dell'arena, lo stile comune del gioco, le regole della sezione (inquadratura, sfondo, margini) e i divieti (niente testo, loghi, persone reali). Puoi usare il completo così com'è, oppure impostare stile e regole una volta sola nel generatore e incollare solo i prompt brevi. Se il generatore ha un campo per il «negative prompt», sposta lì la frase dei divieti.

## Indice

| Arena | Cartella | Luoghi | Pericoli | Armi |
| --- | --- | --- | --- | --- |
| [Arena Classica](#arena-classica) | `assets/arene/classico/` | 6 | 4 | 10 |
| [Reame Incantato](#reame-incantato) | `assets/arene/fantasy/` | 6 | 4 | 8 |
| [Stazione Orbitale](#stazione-orbitale) | `assets/arene/scifi/` | 6 | 4 | 7 |
| [Città degli Infetti](#città-degli-infetti) | `assets/arene/zombie/` | 6 | 4 | 8 |
| [Isola Battle Royale](#isola-battle-royale) | `assets/arene/royale/` | 6 | 3 | 8 |
| [Villa Maledetta](#villa-maledetta) | `assets/arene/horror/` | 6 | 4 | 7 |
| [Terre Desolate](#terre-desolate) | `assets/arene/wasteland/` | 6 | 4 | 7 |
| [Liceo Spietato](#liceo-spietato) | `assets/arene/liceo/` | 6 | 4 | 6 |
| [Ufficio Open Space](#ufficio-open-space) | `assets/arene/ufficio/` | 6 | 4 | 6 |

---

## Arena Classica

Boschi, fiumi e una Cornucopia piena di armi.

- **Cartella**: `assets/arene/classico/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/classico.webp`
- **Atmosfera**: Bosco selvaggio al tramonto: ambra, ocra e marroni caldi, ombre blu fredde, luce radente arancione. Tono da sopravvivenza, avventuroso più che splatter.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Arena Classica (16:9, 1280 × 720 px, sfondo pieno)

#### Cornucopia

- **File**: `assets/arene/classico/luoghi/cornucopia.webp`
- **Cosa mostrare**: La Cornucopia dorata su un poggio roccioso al centro di una radura, che trabocca di armi, zaini e casse.

**Prompt**

```text
A giant golden horn-shaped cornucopia resting on a rocky mound in a forest clearing, spilling weapons, backpacks and supply crates onto the grass.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A giant golden horn-shaped cornucopia resting on a rocky mound in a forest clearing, spilling weapons, backpacks and supply crates onto the grass. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Bosco

- **File**: `assets/arene/classico/luoghi/bosco.webp`
- **Cosa mostrare**: Bosco fitto e antico all'imbrunire, lame di luce tra i tronchi e un sentiero nascosto.

**Prompt**

```text
A dense ancient pine forest at dusk, shafts of golden light between tall trunks, ferns and a narrow hidden trail.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A dense ancient pine forest at dusk, shafts of golden light between tall trunks, ferns and a narrow hidden trail. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Fiume

- **File**: `assets/arene/classico/luoghi/fiume.webp`
- **Cosa mostrare**: Fiume tortuoso tra massi coperti di muschio, piccole rapide e un tronco caduto che fa da ponte.

**Prompt**

```text
A winding river between mossy boulders, shallow rapids reflecting the orange sky, a fallen log used as a bridge.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A winding river between mossy boulders, shallow rapids reflecting the orange sky, a fallen log used as a bridge. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Paludi

- **File**: `assets/arene/classico/luoghi/paludi.webp`
- **Cosa mostrare**: Palude scura con canne, alberi morti contorti e nebbia bassa sull'acqua.

**Prompt**

```text
A murky marsh with tall reeds, twisted dead trees and low mist over black water, a few fireflies.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A murky marsh with tall reeds, twisted dead trees and low mist over black water, a few fireflies. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Rovine

- **File**: `assets/arene/classico/luoghi/rovine.webp`
- **Cosa mostrare**: Rovine di un antico tempio in pietra invase dai rampicanti, colonne spezzate e un arco crollato.

**Prompt**

```text
Crumbling stone ruins of an ancient temple overgrown with vines, broken columns and a collapsed archway.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
Crumbling stone ruins of an ancient temple overgrown with vines, broken columns and a collapsed archway. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Altopiano

- **File**: `assets/arene/classico/luoghi/altopiano.webp`
- **Cosa mostrare**: Altopiano roccioso spazzato dal vento, erba brinata e montagne lontane: il posto più freddo dell'arena.

**Prompt**

```text
A windswept rocky highland plateau with sparse frosted grass and distant mountains, cold blue shadows under a warm sky.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A windswept rocky highland plateau with sparse frosted grass and distant mountains, cold blue shadows under a warm sky. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Arena Classica (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Branco di lupi mutanti

- **File**: `assets/arene/classico/pericoli/branco-di-lupi-mutanti.webp`
- **Cosa mostrare**: Branco di lupi mutanti con occhi ambra e chiazze di pelo metallico, che escono ringhiando dagli alberi.

**Prompt**

```text
A pack of three mutated wolves with glowing amber eyes and patches of metallic fur, snarling as they step out of shadowy trees.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A pack of three mutated wolves with glowing amber eyes and patches of metallic fur, snarling as they step out of shadowy trees. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Sciame di vespe velenose

- **File**: `assets/arene/classico/pericoli/sciame-di-vespe-velenose.webp`
- **Cosa mostrare**: Sciame di vespe giganti e velenose; una in primo piano, nitida, con il pungiglione in vista.

**Prompt**

```text
A menacing swarm of oversized venomous wasps with glowing yellow stripes, one wasp in sharp focus in the foreground with its stinger visible.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A menacing swarm of oversized venomous wasps with glowing yellow stripes, one wasp in sharp focus in the foreground with its stinger visible. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Orso affamato

- **File**: `assets/arene/classico/pericoli/orso-affamato.webp`
- **Cosa mostrare**: Enorme orso bruno affamato, ritto sulle zampe posteriori, muso segnato da cicatrici.

**Prompt**

```text
A huge starving brown bear rearing up on its hind legs, scarred muzzle, ribs showing, hungry eyes.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A huge starving brown bear rearing up on its hind legs, scarred muzzle, ribs showing, hungry eyes. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Serpente gigante

- **File**: `assets/arene/classico/pericoli/serpente-gigante.webp`
- **Cosa mostrare**: Serpente gigante dalle squame smeraldo, avvolto su sé stesso con la testa alzata.

**Prompt**

```text
A giant coiled serpent with emerald scales raising its head, forked tongue out, eyes catching the sunset light.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A giant coiled serpent with emerald scales raising its head, forked tongue out, eyes catching the sunset light. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Arena Classica (1:1, 512 × 512 px, sfondo trasparente)

#### Coltello

- **File**: `assets/arene/classico/armi/coltello.webp`
- **Cosa mostrare**: Coltello da sopravvivenza con manico in cuoio.

**Prompt**

```text
A sturdy survival knife with a leather-wrapped handle and a clip-point steel blade.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A sturdy survival knife with a leather-wrapped handle and a clip-point steel blade. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Arco

- **File**: `assets/arene/classico/armi/arco.webp`
- **Cosa mostrare**: Arco ricurvo in legno con una freccia incoccata.

**Prompt**

```text
A wooden recurve bow with a taut string and one arrow nocked.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A wooden recurve bow with a taut string and one arrow nocked. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Lancia

- **File**: `assets/arene/classico/armi/lancia.webp`
- **Cosa mostrare**: Lancia da caccia con asta di frassino e punta a foglia.

**Prompt**

```text
A hunting spear with an ash-wood shaft and a leaf-shaped steel tip bound with cord.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A hunting spear with an ash-wood shaft and a leaf-shaped steel tip bound with cord. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Ascia

- **File**: `assets/arene/classico/armi/ascia.webp`
- **Cosa mostrare**: Ascia da boscaiolo con manico consumato.

**Prompt**

```text
A woodcutter's axe with a worn wooden handle and a chipped steel head.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A woodcutter's axe with a worn wooden handle and a chipped steel head. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Machete

- **File**: `assets/arene/classico/armi/machete.webp`
- **Cosa mostrare**: Machete lungo, lama leggermente curva.

**Prompt**

```text
A long machete with a slightly curved blade and a black rubber grip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A long machete with a slightly curved blade and a black rubber grip. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Tridente

- **File**: `assets/arene/classico/armi/tridente.webp`
- **Cosa mostrare**: Tridente da pesca con asta di legno.

**Prompt**

```text
A three-pronged fishing trident with a wooden shaft and rope binding.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A three-pronged fishing trident with a wooden shaft and rope binding. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Fionda

- **File**: `assets/arene/classico/armi/fionda.webp`
- **Cosa mostrare**: Fionda di legno a forcella con tasca di cuoio.

**Prompt**

```text
A forked wooden slingshot with rubber bands and a small leather pouch holding a pebble.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A forked wooden slingshot with rubber bands and a small leather pouch holding a pebble. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Spada corta

- **File**: `assets/arene/classico/armi/spada-corta.webp`
- **Cosa mostrare**: Spada corta tipo gladio, guardia semplice.

**Prompt**

```text
A short gladius-style sword with a simple crossguard and wrapped grip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A short gladius-style sword with a simple crossguard and wrapped grip. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Pugnale

- **File**: `assets/arene/classico/armi/pugnale.webp`
- **Cosa mostrare**: Pugnale sottile a doppio taglio.

**Prompt**

```text
A slim double-edged dagger with a cord-wrapped hilt.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A slim double-edged dagger with a cord-wrapped hilt. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Mazza

- **File**: `assets/arene/classico/armi/mazza.webp`
- **Cosa mostrare**: Clava di legno pesante con borchie di ferro.

**Prompt**

```text
A heavy wooden war club studded with iron rivets.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A heavy wooden war club studded with iron rivets. Warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Reame Incantato

Draghi, rune e foreste che sussurrano.

- **Cartella**: `assets/arene/fantasy/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/fantasy.webp`
- **Atmosfera**: Fiaba oscura di notte: viola, magenta e blu notte, bagliori magici turchesi e dorati, rune luminose. Meraviglia e minaccia insieme.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Reame Incantato (16:9, 1280 × 720 px, sfondo pieno)

#### Torre in rovina

- **File**: `assets/arene/fantasy/luoghi/torre-in-rovina.webp`
- **Cosa mostrare**: Torre di uno stregone in pietra scura, mezza crollata, con rune accese sui muri, al chiaro di luna.

**Prompt**

```text
A ruined wizard's tower of dark stone, half collapsed, glowing violet runes on its walls, under a huge moon.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A ruined wizard's tower of dark stone, half collapsed, glowing violet runes on its walls, under a huge moon. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Foresta elfica

- **File**: `assets/arene/fantasy/luoghi/foresta-elfica.webp`
- **Cosa mostrare**: Foresta elfica di alberi giganti dalla corteccia argentata, lanterne appese e lucine sospese.

**Prompt**

```text
An elven forest of giant silver-barked trees, hanging lanterns and floating motes of light.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An elven forest of giant silver-barked trees, hanging lanterns and floating motes of light. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Lago nebbioso

- **File**: `assets/arene/fantasy/luoghi/lago-nebbioso.webp`
- **Cosa mostrare**: Lago incantato di notte, acqua a specchio, pontile di pietra e una statua mezza sommersa.

**Prompt**

```text
A misty enchanted lake at night, glassy water, a small stone pier and a half-sunken statue.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A misty enchanted lake at night, glassy water, a small stone pier and a half-sunken statue. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Miniere

- **File**: `assets/arene/fantasy/luoghi/miniere.webp`
- **Cosa mostrare**: Miniere naniche scavate nella montagna, impalcature, binari con carrello e vene di cristallo luminose.

**Prompt**

```text
Dwarven mines carved into a mountain, wooden scaffolding, minecart rails and glowing crystal veins in the rock.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
Dwarven mines carved into a mountain, wooden scaffolding, minecart rails and glowing crystal veins in the rock. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Palude stregata

- **File**: `assets/arene/fantasy/luoghi/palude-stregata.webp`
- **Cosa mostrare**: Palude stregata con alberi storti, muschio pendente, una capanna su palafitte e fuochi fatui verdi.

**Prompt**

```text
A haunted swamp with crooked trees, hanging moss, a witch's hut on stilts and green will-o'-wisps.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A haunted swamp with crooked trees, hanging moss, a witch's hut on stilts and green will-o'-wisps. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Picco del drago

- **File**: `assets/arene/fantasy/luoghi/picco-del-drago.webp`
- **Cosa mostrare**: Picco frastagliato con la tana del drago: rocce bruciate, mucchi d'oro e fumo che sale.

**Prompt**

```text
A jagged mountain peak with a dragon's lair, scorched rocks, heaps of gold coins and smoke rising into the night.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A jagged mountain peak with a dragon's lair, scorched rocks, heaps of gold coins and smoke rising into the night. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Reame Incantato (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Troll di caverna

- **File**: `assets/arene/fantasy/pericoli/troll-di-caverna.webp`
- **Cosa mostrare**: Troll di caverna enorme, pelle grigia bitorzoluta, clava di pietra, occhi piccoli e luminosi.

**Prompt**

```text
A hulking cave troll with grey warty skin and a stone club, small glowing eyes, stooping in a cave mouth.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A hulking cave troll with grey warty skin and a stone club, small glowing eyes, stooping in a cave mouth. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Viverna

- **File**: `assets/arene/fantasy/pericoli/viverna.webp`
- **Cosa mostrare**: Viverna con ali membranose spalancate e coda uncinata, appollaiata su una rupe mentre ruggisce.

**Prompt**

```text
A wyvern with leathery wings spread wide and a barbed tail, perched on a cliff edge, roaring.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A wyvern with leathery wings spread wide and a barbed tail, perched on a cliff edge, roaring. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Spettro errante

- **File**: `assets/arene/fantasy/pericoli/spettro-errante.webp`
- **Cosa mostrare**: Spettro traslucido in vesti a brandelli, bagliore azzurro, occhi vuoti, nella nebbia.

**Prompt**

```text
A wandering translucent wraith in tattered robes, faint blue glow, hollow eyes, drifting through mist.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A wandering translucent wraith in tattered robes, faint blue glow, hollow eyes, drifting through mist. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Branco di lupi mannari

- **File**: `assets/arene/fantasy/pericoli/branco-di-lupi-mannari.webp`
- **Cosa mostrare**: Branco di lupi mannari sotto la luna piena, il capobranco in primo piano.

**Prompt**

```text
A pack of werewolves under the full moon, the alpha in front with bristling fur and bared fangs.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A pack of werewolves under the full moon, the alpha in front with bristling fur and bared fangs. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Reame Incantato (1:1, 512 × 512 px, sfondo trasparente)

#### Spada runica

- **File**: `assets/arene/fantasy/armi/spada-runica.webp`
- **Cosa mostrare**: Spada lunga con rune viola luminose sulla lama.

**Prompt**

```text
A longsword with glowing violet runes running along the blade.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A longsword with glowing violet runes running along the blade. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Bastone magico

- **File**: `assets/arene/fantasy/armi/bastone-magico.webp`
- **Cosa mostrare**: Bastone da mago nodoso con un cristallo luminoso sospeso in cima.

**Prompt**

```text
A gnarled wizard staff topped with a floating glowing crystal.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A gnarled wizard staff topped with a floating glowing crystal. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Arco elfico

- **File**: `assets/arene/fantasy/armi/arco-elfico.webp`
- **Cosa mostrare**: Arco lungo elfico in legno chiaro con intarsi d'argento a foglia.

**Prompt**

```text
An elegant elven longbow of pale wood with leaf-shaped silver inlays.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An elegant elven longbow of pale wood with leaf-shaped silver inlays. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Ascia nanica

- **File**: `assets/arene/fantasy/armi/ascia-nanica.webp`
- **Cosa mostrare**: Ascia nanica a doppia lama con incisioni a intreccio.

**Prompt**

```text
A heavy double-bladed dwarven axe with engraved knotwork and a leather grip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A heavy double-bladed dwarven axe with engraved knotwork and a leather grip. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Pugnale avvelenato

- **File**: `assets/arene/fantasy/armi/pugnale-avvelenato.webp`
- **Cosa mostrare**: Pugnale ricurvo che gocciola veleno verde.

**Prompt**

```text
A curved dagger dripping bright green poison.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A curved dagger dripping bright green poison. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Martello da guerra

- **File**: `assets/arene/fantasy/armi/martello-da-guerra.webp`
- **Cosa mostrare**: Martello da guerra massiccio con testa in ferro incisa di rune.

**Prompt**

```text
A massive war hammer with a rune-carved iron head.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A massive war hammer with a rune-carved iron head. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Balestra

- **File**: `assets/arene/fantasy/armi/balestra.webp`
- **Cosa mostrare**: Balestra fantasy in legno scuro e ottone.

**Prompt**

```text
A fantasy crossbow of dark wood with brass fittings and a loaded bolt.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A fantasy crossbow of dark wood with brass fittings and a loaded bolt. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Lancia incantata

- **File**: `assets/arene/fantasy/armi/lancia-incantata.webp`
- **Cosa mostrare**: Lancia sottile con la punta avvolta da una luce pallida.

**Prompt**

```text
A slender spear with an enchanted blade wreathed in pale light.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A slender spear with an enchanted blade wreathed in pale light. Violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Stazione Orbitale

Ossigeno limitato, droni e un reattore instabile.

- **Cartella**: `assets/arene/scifi/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/scifi.webp`
- **Atmosfera**: Stazione orbitale: blu, ciano e acciaio spazzolato, neon freddi, spie rosse di allarme, la Terra o le stelle dai finestrini.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Stazione Orbitale (16:9, 1280 × 720 px, sfondo pieno)

#### Hangar

- **File**: `assets/arene/scifi/luoghi/hangar.webp`
- **Cosa mostrare**: Hangar enorme con una navetta attraccata, container e il portellone aperto sulle stelle.

**Prompt**

```text
A vast spaceship hangar with a docked shuttle, cargo containers and an open bay door showing the stars.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A vast spaceship hangar with a docked shuttle, cargo containers and an open bay door showing the stars. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Serra idroponica

- **File**: `assets/arene/scifi/luoghi/serra-idroponica.webp`
- **Cosa mostrare**: Modulo serra idroponica: file di piante sotto luci viola, tubi d'acqua e una cupola di vetro.

**Prompt**

```text
A hydroponic greenhouse module, rows of plants under purple grow lights, water pipes and a glass dome.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A hydroponic greenhouse module, rows of plants under purple grow lights, water pipes and a glass dome. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Reattore

- **File**: `assets/arene/scifi/luoghi/reattore.webp`
- **Cosa mostrare**: Il nucleo del reattore: una sfera ciano incandescente dentro un anello d'acciaio, passerelle e luci d'allarme.

**Prompt**

```text
The station's reactor core, a glowing cyan sphere inside a steel ring, catwalks and warning lights.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
The station's reactor core, a glowing cyan sphere inside a steel ring, catwalks and warning lights. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Ponte di comando

- **File**: `assets/arene/scifi/luoghi/ponte-di-comando.webp`
- **Cosa mostrare**: Ponte di comando con console olografiche curve e una vetrata enorme sulla Terra.

**Prompt**

```text
The command bridge with curved holographic consoles and a huge window looking down on Earth.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
The command bridge with curved holographic consoles and a huge window looking down on Earth. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Moduli abitativi

- **File**: `assets/arene/scifi/luoghi/moduli-abitativi.webp`
- **Cosa mostrare**: Moduli dell'equipaggio stretti: cuccette, armadietti e un piccolo oblò rotondo.

**Prompt**

```text
Cramped crew living modules with bunks, personal lockers and a small round porthole.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
Cramped crew living modules with bunks, personal lockers and a small round porthole. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Condotti di servizio

- **File**: `assets/arene/scifi/luoghi/condotti-di-servizio.webp`
- **Cosa mostrare**: Condotti di servizio angusti con cavi, sfiati di vapore e luci d'emergenza tremolanti.

**Prompt**

```text
Narrow service ducts packed with cables, steam vents and flickering red emergency lights.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
Narrow service ducts packed with cables, steam vents and flickering red emergency lights. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Stazione Orbitale (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Drone di sicurezza impazzito

- **File**: `assets/arene/scifi/pericoli/drone-di-sicurezza-impazzito.webp`
- **Cosa mostrare**: Drone di sicurezza fuori controllo con un solo occhio rosso e rotori danneggiati che sprizzano scintille.

**Prompt**

```text
A rogue security drone with a single red eye and damaged rotors throwing sparks.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A rogue security drone with a single red eye and damaged rotors throwing sparks. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Sciame di nanobot

- **File**: `assets/arene/scifi/pericoli/sciame-di-nanobot.webp`
- **Cosa mostrare**: Sciame argentato di nanobot che si avvita formando una sagoma minacciosa.

**Prompt**

```text
A swirling silver swarm of nanobots forming a menacing face-like shape.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A swirling silver swarm of nanobots forming a menacing face-like shape. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Creatura aliena dai tentacoli

- **File**: `assets/arene/scifi/pericoli/creatura-aliena-dai-tentacoli.webp`
- **Cosa mostrare**: Creatura aliena con tentacoli lucidi e macchie bioluminescenti che esce da una grata.

**Prompt**

```text
An alien creature with glossy tentacles and bioluminescent spots squeezing out of a vent grate.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An alien creature with glossy tentacles and bioluminescent spots squeezing out of a vent grate. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Androide da combattimento

- **File**: `assets/arene/scifi/pericoli/androide-da-combattimento.webp`
- **Cosa mostrare**: Androide da combattimento corazzato, visore acceso, pelle sintetica strappata.

**Prompt**

```text
A battle android with an armoured chassis, glowing visor and torn synthetic skin.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A battle android with an armoured chassis, glowing visor and torn synthetic skin. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Stazione Orbitale (1:1, 512 × 512 px, sfondo trasparente)

#### Fucile al plasma

- **File**: `assets/arene/scifi/armi/fucile-al-plasma.webp`
- **Cosa mostrare**: Fucile al plasma affusolato con celle d'energia ciano.

**Prompt**

```text
A sleek plasma rifle with glowing cyan energy cells.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A sleek plasma rifle with glowing cyan energy cells. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Lama vibrante

- **File**: `assets/arene/scifi/armi/lama-vibrante.webp`
- **Cosa mostrare**: Lama vibrante con il filo traslucido che ronza.

**Prompt**

```text
A vibro-blade with a humming translucent edge and a ribbed grip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A vibro-blade with a humming translucent edge and a ribbed grip. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Pistola laser

- **File**: `assets/arene/scifi/armi/pistola-laser.webp`
- **Cosa mostrare**: Pistola laser compatta con emettitore rosso.

**Prompt**

```text
A compact laser pistol with a red emitter tip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A compact laser pistol with a red emitter tip. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Granata EMP

- **File**: `assets/arene/scifi/armi/granata-emp.webp`
- **Cosa mostrare**: Granata EMP sferica con archi elettrici blu.

**Prompt**

```text
A spherical EMP grenade with crackling blue electric arcs.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A spherical EMP grenade with crackling blue electric arcs. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Frusta monofilamento

- **File**: `assets/arene/scifi/armi/frusta-monofilamento.webp`
- **Cosa mostrare**: Frusta a monofilamento: impugnatura metallica e un filo luminoso quasi invisibile.

**Prompt**

```text
A monofilament whip, a metal handle with a nearly invisible glowing line coiled around it.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A monofilament whip, a metal handle with a nearly invisible glowing line coiled around it. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Taser a impulsi

- **File**: `assets/arene/scifi/armi/taser-a-impulsi.webp`
- **Cosa mostrare**: Taser a impulsi con elettrodi che crepitano.

**Prompt**

```text
A pulse taser with crackling electrodes.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A pulse taser with crackling electrodes. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cannone a rotaia portatile

- **File**: `assets/arene/scifi/armi/cannone-a-rotaia-portatile.webp`
- **Cosa mostrare**: Cannone a rotaia portatile con binari magnetici e calcio pesante.

**Prompt**

```text
A portable railgun with twin magnetic rails and a heavy stock.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A portable railgun with twin magnetic rails and a heavy stock. Cold blue and cyan neon on brushed steel with red warning lights, orbital space station. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Città degli Infetti

Ospedali vuoti, orde affamate e radio gracchianti.

- **Cartella**: `assets/arene/zombie/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/zombie.webp`
- **Atmosfera**: Città abbandonata dopo il contagio: verdi malati, grigi, ruggine, cielo coperto, luci tremolanti. Inquietante più che splatter.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Città degli Infetti (16:9, 1280 × 720 px, sfondo pieno)

#### Ospedale

- **File**: `assets/arene/zombie/luoghi/ospedale.webp`
- **Cosa mostrare**: Corridoio d'ospedale abbandonato con barelle rovesciate, luci tremolanti e porte barricate.

**Prompt**

```text
An abandoned hospital corridor with overturned gurneys, flickering lights and barricaded doors.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An abandoned hospital corridor with overturned gurneys, flickering lights and barricaded doors. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Centro commerciale

- **File**: `assets/arene/zombie/luoghi/centro-commerciale.webp`
- **Cosa mostrare**: Atrio di un centro commerciale saccheggiato, scale mobili rotte, carrelli sparsi, lucernari.

**Prompt**

```text
A looted shopping mall atrium with broken escalators, scattered trolleys and dusty skylights.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A looted shopping mall atrium with broken escalators, scattered trolleys and dusty skylights. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Metropolitana

- **File**: `assets/arene/zombie/luoghi/metropolitana.webp`
- **Cosa mostrare**: Banchina della metro al buio, un treno deragliato, binari allagati e lampade d'emergenza.

**Prompt**

```text
A dark subway platform with a derailed train, flooded tracks and emergency lamps.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A dark subway platform with a derailed train, flooded tracks and emergency lamps. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Scuola

- **File**: `assets/arene/zombie/luoghi/scuola.webp`
- **Cosa mostrare**: Corridoio di scuola vuoto, armadietti, fogli a terra e finestre sbarrate con assi.

**Prompt**

```text
An empty school hallway with lockers, papers on the floor and windows boarded up with planks.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An empty school hallway with lockers, papers on the floor and windows boarded up with planks. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Stazione di polizia

- **File**: `assets/arene/zombie/luoghi/stazione-di-polizia.webp`
- **Cosa mostrare**: Stazione di polizia fortificata con sacchi di sabbia, un furgone blindato e fari.

**Prompt**

```text
A fortified police station with sandbags, an armoured van and searchlights.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A fortified police station with sandbags, an armoured van and searchlights. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Periferia

- **File**: `assets/arene/zombie/luoghi/periferia.webp`
- **Cosa mostrare**: Strada di periferia con auto abbandonate, prati incolti e fumo all'orizzonte.

**Prompt**

```text
A suburban street with abandoned cars, overgrown lawns and smoke on the horizon.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A suburban street with abandoned cars, overgrown lawns and smoke on the horizon. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Città degli Infetti (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Orda di zombi

- **File**: `assets/arene/zombie/pericoli/orda-di-zombi.webp`
- **Cosa mostrare**: Orda fitta di zombi che riempie una strada, tante mani protese in avanti.

**Prompt**

```text
A dense horde of shambling zombies filling a city street, many hands reaching forward.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A dense horde of shambling zombies filling a city street, many hands reaching forward. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Infetto corridore

- **File**: `assets/arene/zombie/pericoli/infetto-corridore.webp`
- **Cosa mostrare**: Infetto corridore colto a metà scatto, vestiti strappati, occhi folli.

**Prompt**

```text
A fast infected runner caught mid-sprint, torn clothes, wild eyes, motion frozen.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A fast infected runner caught mid-sprint, torn clothes, wild eyes, motion frozen. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cane infetto

- **File**: `assets/arene/zombie/pericoli/cane-infetto.webp`
- **Cosa mostrare**: Cane infetto con pelo a chiazze, denti scoperti e occhi lattiginosi.

**Prompt**

```text
An infected dog with patchy fur, bared teeth and milky eyes.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An infected dog with patchy fur, bared teeth and milky eyes. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Gigante mutato

- **File**: `assets/arene/zombie/pericoli/gigante-mutato.webp`
- **Cosa mostrare**: Gigante mutato con muscoli gonfi e escrescenze ossee che sfonda un muro.

**Prompt**

```text
A towering mutated giant with swollen muscles and bone growths, smashing through a brick wall.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A towering mutated giant with swollen muscles and bone growths, smashing through a brick wall. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Città degli Infetti (1:1, 512 × 512 px, sfondo trasparente)

#### Mazza chiodata

- **File**: `assets/arene/zombie/armi/mazza-chiodata.webp`
- **Cosa mostrare**: Mazza da baseball avvolta nel filo spinato e nei chiodi.

**Prompt**

```text
A baseball bat wrapped in barbed wire and studded with nails.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A baseball bat wrapped in barbed wire and studded with nails. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Fucile a pompa

- **File**: `assets/arene/zombie/armi/fucile-a-pompa.webp`
- **Cosa mostrare**: Fucile a pompa con il calcio rattoppato col nastro.

**Prompt**

```text
A pump-action shotgun with a duct-taped stock.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A pump-action shotgun with a duct-taped stock. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Piede di porco

- **File**: `assets/arene/zombie/armi/piede-di-porco.webp`
- **Cosa mostrare**: Piede di porco in acciaio rosso.

**Prompt**

```text
A red steel crowbar, scuffed paint.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A red steel crowbar, scuffed paint. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Motosega

- **File**: `assets/arene/zombie/armi/motosega.webp`
- **Cosa mostrare**: Motosega con il corpo arancione graffiato.

**Prompt**

```text
A chainsaw with a scratched orange body.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A chainsaw with a scratched orange body. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Katana

- **File**: `assets/arene/zombie/armi/katana.webp`
- **Cosa mostrare**: Katana con l'impugnatura consumata.

**Prompt**

```text
A katana with a worn wrapped handle.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A katana with a worn wrapped handle. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Balestra

- **File**: `assets/arene/zombie/armi/balestra.webp`
- **Cosa mostrare**: Balestra moderna da caccia con mirino.

**Prompt**

```text
A modern hunting crossbow with a scope.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A modern hunting crossbow with a scope. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Pistola

- **File**: `assets/arene/zombie/armi/pistola.webp`
- **Cosa mostrare**: Pistola semiautomatica malridotta.

**Prompt**

```text
A battered semi-automatic pistol.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A battered semi-automatic pistol. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Accetta

- **File**: `assets/arene/zombie/armi/accetta.webp`
- **Cosa mostrare**: Accetta con impugnatura in gomma.

**Prompt**

```text
A hatchet with a rubber grip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A hatchet with a rubber grip. Sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Isola Battle Royale

Un aereo, cento casse e una zona che si stringe.

- **Cartella**: `assets/arene/royale/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/royale.webp`
- **Atmosfera**: Isola tropicale da battle royale videoludico: blu mare, verde giungla, arancio di tramonto, contrasti puliti, un po' «da videogioco».
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Isola Battle Royale (16:9, 1280 × 720 px, sfondo pieno)

#### Aeroporto

- **File**: `assets/arene/royale/luoghi/aeroporto.webp`
- **Cosa mostrare**: Piccolo aeroporto dell'isola con pista, un cargo arrugginito e la torre di controllo.

**Prompt**

```text
A small island airport with a runway, a rusty cargo plane and a control tower.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A small island airport with a runway, a rusty cargo plane and a control tower. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Base militare

- **File**: `assets/arene/royale/luoghi/base-militare.webp`
- **Cosa mostrare**: Base militare con tende, torrette di guardia, casse di rifornimento ed eliporto.

**Prompt**

```text
A military base with tents, watchtowers, supply crates and a helipad.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A military base with tents, watchtowers, supply crates and a helipad. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Villaggio costiero

- **File**: `assets/arene/royale/luoghi/villaggio-costiero.webp`
- **Cosa mostrare**: Villaggio di pescatori con case colorate, pontile di legno e barche.

**Prompt**

```text
A coastal fishing village with colourful houses, a wooden pier and boats.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A coastal fishing village with colourful houses, a wooden pier and boats. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Centrale elettrica

- **File**: `assets/arene/royale/luoghi/centrale-elettrica.webp`
- **Cosa mostrare**: Centrale elettrica con torri di raffreddamento, tralicci e trasformatori.

**Prompt**

```text
A power plant with cooling towers, pylons and humming transformers.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A power plant with cooling towers, pylons and humming transformers. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Fattoria

- **File**: `assets/arene/royale/luoghi/fattoria.webp`
- **Cosa mostrare**: Fattoria con fienile rosso, balle di fieno, silos e campi di grano.

**Prompt**

```text
A farm with a red barn, hay bales, a silo and golden wheat fields.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A farm with a red barn, hay bales, a silo and golden wheat fields. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Foresta

- **File**: `assets/arene/royale/luoghi/foresta.webp`
- **Cosa mostrare**: Foresta tropicale rigogliosa con palme, felci e una cassa di rifornimento nascosta.

**Prompt**

```text
A lush tropical forest with palm trees, ferns and a hidden glowing supply crate.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A lush tropical forest with palm trees, ferns and a hidden glowing supply crate. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Isola Battle Royale (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Drone armato

- **File**: `assets/arene/royale/pericoli/drone-armato.webp`
- **Cosa mostrare**: Drone quadricottero armato con mitragliatrice e laser di puntamento rosso.

**Prompt**

```text
An armed quadcopter drone with a mounted gun and a red targeting laser.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An armed quadcopter drone with a mounted gun and a red targeting laser. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Elicottero da caccia

- **File**: `assets/arene/royale/pericoli/elicottero-da-caccia.webp`
- **Cosa mostrare**: Elicottero d'attacco in volo basso con il faro acceso.

**Prompt**

```text
An attack helicopter hovering low with its searchlight on.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An attack helicopter hovering low with its searchlight on. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cane da guardia addestrato

- **File**: `assets/arene/royale/pericoli/cane-da-guardia-addestrato.webp`
- **Cosa mostrare**: Pastore tedesco da guardia con giubbotto tattico, che abbaia.

**Prompt**

```text
A trained German shepherd guard dog in a tactical vest, barking.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A trained German shepherd guard dog in a tactical vest, barking. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Isola Battle Royale (1:1, 512 × 512 px, sfondo trasparente)

#### Fucile d'assalto

- **File**: `assets/arene/royale/armi/fucile-dassalto.webp`
- **Cosa mostrare**: Fucile d'assalto con mirino a punto rosso.

**Prompt**

```text
An assault rifle with a red-dot sight.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An assault rifle with a red-dot sight. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Pistola

- **File**: `assets/arene/royale/armi/pistola.webp`
- **Cosa mostrare**: Pistola semiautomatica nera.

**Prompt**

```text
A black semi-automatic pistol.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A black semi-automatic pistol. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Fucile da cecchino

- **File**: `assets/arene/royale/armi/fucile-da-cecchino.webp`
- **Cosa mostrare**: Fucile da cecchino con cannocchiale lungo e bipiede.

**Prompt**

```text
A sniper rifle with a long scope and a folded bipod.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A sniper rifle with a long scope and a folded bipod. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Fucile a pompa

- **File**: `assets/arene/royale/armi/fucile-a-pompa.webp`
- **Cosa mostrare**: Fucile a pompa tattico.

**Prompt**

```text
A tactical pump shotgun.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A tactical pump shotgun. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Granata

- **File**: `assets/arene/royale/armi/granata.webp`
- **Cosa mostrare**: Granata a frammentazione con la spoletta.

**Prompt**

```text
A fragmentation grenade with its pin.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A fragmentation grenade with its pin. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Mitraglietta

- **File**: `assets/arene/royale/armi/mitraglietta.webp`
- **Cosa mostrare**: Mitraglietta compatta.

**Prompt**

```text
A compact submachine gun.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A compact submachine gun. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Coltello da combattimento

- **File**: `assets/arene/royale/armi/coltello-da-combattimento.webp`
- **Cosa mostrare**: Coltello da combattimento con dorso seghettato.

**Prompt**

```text
A combat knife with a serrated spine.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A combat knife with a serrated spine. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Balestra

- **File**: `assets/arene/royale/armi/balestra.webp`
- **Cosa mostrare**: Balestra tattica mimetica.

**Prompt**

```text
A tactical crossbow with a camouflage pattern.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A tactical crossbow with a camouflage pattern. Tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Villa Maledetta

Specchi che sussurrano e porte che si chiudono da sole.

- **Cartella**: `assets/arene/horror/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/horror.webp`
- **Atmosfera**: Villa gotica maledetta: cremisi, nero e oro di candela, nebbia, luna rossa. Paura sottile e atmosfera, niente sangue esplicito.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Villa Maledetta (16:9, 1280 × 720 px, sfondo pieno)

#### Cantina

- **File**: `assets/arene/horror/luoghi/cantina.webp`
- **Cosa mostrare**: Cantina umida con botti piene di ragnatele, una lampadina che oscilla e una porta socchiusa.

**Prompt**

```text
A damp wine cellar with cobwebbed barrels, a single swinging light bulb and a door left ajar.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A damp wine cellar with cobwebbed barrels, a single swinging light bulb and a door left ajar. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Soffitta

- **File**: `assets/arene/horror/luoghi/soffitta.webp`
- **Cosa mostrare**: Soffitta polverosa con mobili coperti da teli, un vecchio cavallo a dondolo e luna da un oblò.

**Prompt**

```text
A dusty attic with sheet-covered furniture, an old rocking horse and moonlight through a round window.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A dusty attic with sheet-covered furniture, an old rocking horse and moonlight through a round window. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cappella

- **File**: `assets/arene/horror/luoghi/cappella.webp`
- **Cosa mostrare**: Cappella gotica privata con candele, vetrate rotte e panche vuote.

**Prompt**

```text
A private gothic chapel with candles, broken stained glass and empty pews.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A private gothic chapel with candles, broken stained glass and empty pews. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cimitero

- **File**: `assets/arene/horror/luoghi/cimitero.webp`
- **Cosa mostrare**: Cimitero incolto con lapidi storte, cancello di ferro e nebbia sotto una luna rossa.

**Prompt**

```text
An overgrown cemetery with leaning tombstones, an iron gate and fog under a red moon.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An overgrown cemetery with leaning tombstones, an iron gate and fog under a red moon. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Biblioteca

- **File**: `assets/arene/horror/luoghi/biblioteca.webp`
- **Cosa mostrare**: Biblioteca antica con scaffali altissimi, polvere sospesa e un libro aperto sul leggio.

**Prompt**

```text
A grand old library with towering shelves, floating dust and a book lying open on a lectern.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A grand old library with towering shelves, floating dust and a book lying open on a lectern. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Serra

- **File**: `assets/arene/horror/luoghi/serra.webp`
- **Cosa mostrare**: Serra vittoriana in rovina con vetri rotti, piante carnivore e rampicanti.

**Prompt**

```text
A derelict Victorian greenhouse with shattered glass, carnivorous plants and creeping vines.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A derelict Victorian greenhouse with shattered glass, carnivorous plants and creeping vines. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Villa Maledetta (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Spettro urlante

- **File**: `assets/arene/horror/pericoli/spettro-urlante.webp`
- **Cosa mostrare**: Fantasma che urla con la bocca innaturalmente allungata e capelli pallidi fluttuanti.

**Prompt**

```text
A screaming ghost with an unnaturally stretched mouth and pale floating hair, glowing white.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A screaming ghost with an unnaturally stretched mouth and pale floating hair, glowing white. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Bambola posseduta

- **File**: `assets/arene/horror/pericoli/bambola-posseduta.webp`
- **Cosa mostrare**: Bambola di porcellana col viso incrinato e un occhio di vetro, seduta su una sedia, troppo viva.

**Prompt**

```text
A porcelain doll with a cracked face and one glass eye, sitting in a chair, slightly too alive.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A porcelain doll with a cracked face and one glass eye, sitting in a chair, slightly too alive. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Entità senza volto

- **File**: `assets/arene/horror/pericoli/entita-senza-volto.webp`
- **Cosa mostrare**: Entità alta e senza volto in un corridoio buio, braccia troppo lunghe.

**Prompt**

```text
A tall faceless entity in a dark corridor, unnaturally long arms, black suit.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A tall faceless entity in a dark corridor, unnaturally long arms, black suit. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Stormo di corvi

- **File**: `assets/arene/horror/pericoli/stormo-di-corvi.webp`
- **Cosa mostrare**: Stormo di corvi che esplode da un albero morto; uno fissa chi guarda.

**Prompt**

```text
A flock of crows bursting from a dead tree, one crow staring straight at the viewer.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A flock of crows bursting from a dead tree, one crow staring straight at the viewer. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Villa Maledetta (1:1, 512 × 512 px, sfondo trasparente)

#### Candelabro d'argento

- **File**: `assets/arene/horror/armi/candelabro-dargento.webp`
- **Cosa mostrare**: Candelabro d'argento pesante con tre candele che colano.

**Prompt**

```text
A heavy silver candelabra with three dripping candles.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A heavy silver candelabra with three dripping candles. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Ascia

- **File**: `assets/arene/horror/armi/ascia.webp`
- **Cosa mostrare**: Vecchia ascia arrugginita.

**Prompt**

```text
An old rusted axe with a cracked wooden handle.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An old rusted axe with a cracked wooden handle. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Fucile da caccia

- **File**: `assets/arene/horror/armi/fucile-da-caccia.webp`
- **Cosa mostrare**: Doppietta da caccia con calcio in legno.

**Prompt**

```text
A double-barrelled hunting shotgun with a wooden stock.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A double-barrelled hunting shotgun with a wooden stock. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Pugnale rituale

- **File**: `assets/arene/horror/armi/pugnale-rituale.webp`
- **Cosa mostrare**: Pugnale rituale con elsa d'osso e simboli incisi.

**Prompt**

```text
A ritual dagger with a bone hilt and engraved occult symbols.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A ritual dagger with a bone hilt and engraved occult symbols. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Crocifisso appuntito

- **File**: `assets/arene/horror/armi/crocifisso-appuntito.webp`
- **Cosa mostrare**: Crocifisso di legno appuntito come un paletto.

**Prompt**

```text
A wooden crucifix sharpened into a stake at the bottom.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A wooden crucifix sharpened into a stake at the bottom. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Attizzatoio

- **File**: `assets/arene/horror/armi/attizzatoio.webp`
- **Cosa mostrare**: Attizzatoio da camino in ferro battuto.

**Prompt**

```text
A wrought iron fireplace poker with a hooked tip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A wrought iron fireplace poker with a hooked tip. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Falce

- **File**: `assets/arene/horror/armi/falce.webp`
- **Cosa mostrare**: Falce da contadino con la lama lunga e curva.

**Prompt**

```text
A farmer's scythe with a long curved blade.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A farmer's scythe with a long curved blade. Crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Terre Desolate

Polvere radioattiva, predoni e motori truccati.

- **Cartella**: `assets/arene/wasteland/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/wasteland.webp`
- **Atmosfera**: Deserto post-atomico: ocra, ruggine e sabbia sotto un sole bruciato, foschia di polvere, lamiere e motori truccati.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Terre Desolate (16:9, 1280 × 720 px, sfondo pieno)

#### Discarica

- **File**: `assets/arene/wasteland/luoghi/discarica.webp`
- **Cosa mostrare**: Enorme sfasciacarrozze di auto arrugginite, pneumatici e rottami sotto un sole velato.

**Prompt**

```text
A vast scrapyard of rusted cars, tyres and piled junk under a hazy sun.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A vast scrapyard of rusted cars, tyres and piled junk under a hazy sun. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Autostrada spezzata

- **File**: `assets/arene/wasteland/luoghi/autostrada-spezzata.webp`
- **Cosa mostrare**: Cavalcavia autostradale crollato nel deserto, camion abbandonati.

**Prompt**

```text
A broken highway overpass collapsed into the desert, abandoned trucks below.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A broken highway overpass collapsed into the desert, abandoned trucks below. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Raffineria

- **File**: `assets/arene/wasteland/luoghi/raffineria.webp`
- **Cosa mostrare**: Raffineria arrugginita con torce di gas accese e intrico di tubi.

**Prompt**

```text
A rusted oil refinery with burning flare stacks and a tangle of pipes.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A rusted oil refinery with burning flare stacks and a tangle of pipes. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Città fantasma

- **File**: `assets/arene/wasteland/luoghi/citta-fantasma.webp`
- **Cosa mostrare**: Città fantasma con edifici mezzi sepolti, cartelloni sbiaditi e rotolacampo.

**Prompt**

```text
A ghost town with half-buried buildings, faded blank billboards and tumbleweeds.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A ghost town with half-buried buildings, faded blank billboards and tumbleweeds. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cratere

- **File**: `assets/arene/wasteland/luoghi/cratere.webp`
- **Cosa mostrare**: Cratere radioattivo enorme con pozze che brillano di verde.

**Prompt**

```text
A huge radioactive crater with glowing green pools.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A huge radioactive crater with glowing green pools. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Diga

- **File**: `assets/arene/wasteland/luoghi/diga.webp`
- **Cosa mostrare**: Diga di cemento gigante incrinata, con un insediamento di fortuna in cima.

**Prompt**

```text
A giant cracked concrete dam with a makeshift settlement built on top.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A giant cracked concrete dam with a makeshift settlement built on top. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Terre Desolate (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Banda di predoni

- **File**: `assets/arene/wasteland/pericoli/banda-di-predoni.webp`
- **Cosa mostrare**: Banda di predoni con armature di cuoio chiodato e occhialoni, accanto a buggy truccati.

**Prompt**

```text
A gang of raiders in spiked leather armour and goggles standing by modified buggies.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A gang of raiders in spiked leather armour and goggles standing by modified buggies. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Scorpione gigante

- **File**: `assets/arene/wasteland/pericoli/scorpione-gigante.webp`
- **Cosa mostrare**: Scorpione gigante del deserto col pungiglione alzato.

**Prompt**

```text
A giant desert scorpion with its stinger raised, chitin shining in the sun.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A giant desert scorpion with its stinger raised, chitin shining in the sun. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Branco di cani mutati

- **File**: `assets/arene/wasteland/pericoli/branco-di-cani-mutati.webp`
- **Cosa mostrare**: Branco di cani mutati senza pelo, con occhi in più, che ringhiano.

**Prompt**

```text
A pack of hairless mutated dogs with extra eyes, growling.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A pack of hairless mutated dogs with extra eyes, growling. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Verme delle sabbie

- **File**: `assets/arene/wasteland/pericoli/verme-delle-sabbie.webp`
- **Cosa mostrare**: Verme delle sabbie colossale che erompe dalle dune, bocca circolare piena di denti.

**Prompt**

```text
A colossal sandworm bursting out of the dunes, a circular mouth full of teeth.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A colossal sandworm bursting out of the dunes, a circular mouth full of teeth. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Terre Desolate (1:1, 512 × 512 px, sfondo trasparente)

#### Fucile arrugginito

- **File**: `assets/arene/wasteland/armi/fucile-arrugginito.webp`
- **Cosa mostrare**: Fucile a otturatore arrugginito con mirino legato col nastro.

**Prompt**

```text
A rusty bolt-action rifle with a scope held on by tape.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A rusty bolt-action rifle with a scope held on by tape. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Lancia ricavata da un tubo

- **File**: `assets/arene/wasteland/armi/lancia-ricavata-da-un-tubo.webp`
- **Cosa mostrare**: Lancia fatta con un tubo di metallo e un tondino appuntito.

**Prompt**

```text
A spear made from a metal pipe with a sharpened rebar tip.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A spear made from a metal pipe with a sharpened rebar tip. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Balestra artigianale

- **File**: `assets/arene/wasteland/armi/balestra-artigianale.webp`
- **Cosa mostrare**: Balestra artigianale fatta con balestre d'auto e rottami.

**Prompt**

```text
A homemade crossbow built from car leaf springs and scrap metal.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A homemade crossbow built from car leaf springs and scrap metal. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Molotov

- **File**: `assets/arene/wasteland/armi/molotov.webp`
- **Cosa mostrare**: Bottiglia molotov con lo straccio in fiamme.

**Prompt**

```text
A molotov cocktail bottle with a burning rag.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A molotov cocktail bottle with a burning rag. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Catena

- **File**: `assets/arene/wasteland/armi/catena.webp`
- **Cosa mostrare**: Catena pesante arrotolata con un lucchetto.

**Prompt**

```text
A heavy coiled chain with a padlock.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A heavy coiled chain with a padlock. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Mannaia

- **File**: `assets/arene/wasteland/armi/mannaia.webp`
- **Cosa mostrare**: Mannaia grande con manico fasciato.

**Prompt**

```text
A large meat cleaver with a cloth-wrapped handle.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A large meat cleaver with a cloth-wrapped handle. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Lanciachiodi

- **File**: `assets/arene/wasteland/armi/lanciachiodi.webp`
- **Cosa mostrare**: Sparachiodi modificato come arma, con caricatore a tamburo.

**Prompt**

```text
A nail gun modified into a weapon with a drum magazine.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A nail gun modified into a weapon with a drum magazine. Ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Liceo Spietato

Interrogazioni, gossip e alleanze da intervallo. Nessuno muore: si viene eliminati.

- **Cartella**: `assets/arene/liceo/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/liceo.webp`
- **Atmosfera**: Liceo italiano in chiave satirica: rosa, lilla e pastello, luce di finestre a vetri, tono da commedia. Nessuna violenza, nessun sangue: le «minacce» sono caricature.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Liceo Spietato (16:9, 1280 × 720 px, sfondo pieno)

#### Palestra

- **File**: `assets/arene/liceo/luoghi/palestra.webp`
- **Cosa mostrare**: Palestra della scuola con parquet, canestri, funi e tappetini impilati.

**Prompt**

```text
A school gym with a wooden floor, basketball hoops, climbing ropes and stacked mats.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A school gym with a wooden floor, basketball hoops, climbing ropes and stacked mats. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Mensa

- **File**: `assets/arene/liceo/luoghi/mensa.webp`
- **Cosa mostrare**: Mensa scolastica rumorosa con tavoli lunghi, vassoi e il bancone del pranzo.

**Prompt**

```text
A busy school cafeteria with long tables, food trays and a lunch counter, no people.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A busy school cafeteria with long tables, food trays and a lunch counter, no people. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Biblioteca

- **File**: `assets/arene/liceo/luoghi/biblioteca.webp`
- **Cosa mostrare**: Biblioteca scolastica silenziosa con scaffali e tavoli da studio.

**Prompt**

```text
A quiet school library with bookshelves, study tables and green desk lamps.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A quiet school library with bookshelves, study tables and green desk lamps. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Laboratorio di chimica

- **File**: `assets/arene/liceo/luoghi/laboratorio-di-chimica.webp`
- **Cosa mostrare**: Laboratorio di chimica con becher, cappa aspirante e fiasche colorate che bollono.

**Prompt**

```text
A chemistry lab with beakers, a fume hood and colourful bubbling flasks.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A chemistry lab with beakers, a fume hood and colourful bubbling flasks. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cortile

- **File**: `assets/arene/liceo/luoghi/cortile.webp`
- **Cosa mostrare**: Cortile della scuola con panchine, un albero, motorini e zaini a terra.

**Prompt**

```text
The school courtyard with benches, a big tree, parked scooters and backpacks on the ground.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
The school courtyard with benches, a big tree, parked scooters and backpacks on the ground. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Aula magna

- **File**: `assets/arene/liceo/luoghi/aula-magna.webp`
- **Cosa mostrare**: Aula magna con file di poltroncine, palco e microfono.

**Prompt**

```text
An assembly hall with rows of folding seats, a stage and a single microphone.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An assembly hall with rows of folding seats, a stage and a single microphone. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Liceo Spietato (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Preside

- **File**: `assets/arene/liceo/pericoli/preside.webp`
- **Cosa mostrare**: Caricatura della Preside severa, braccia conserte, occhiali abbassati, sulla soglia.

**Prompt**

```text
A caricature of a stern school principal, arms crossed, glasses lowered, standing in a doorway.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A caricature of a stern school principal, arms crossed, glasses lowered, standing in a doorway. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Bidello di turno

- **File**: `assets/arene/liceo/pericoli/bidello-di-turno.webp`
- **Cosa mostrare**: Caricatura del bidello brontolone con mocio, secchio e mazzo di chiavi.

**Prompt**

```text
A caricature of a grumpy school janitor with a mop, a bucket and a ring of keys.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A caricature of a grumpy school janitor with a mop, a bucket and a ring of keys. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Ispezione a sorpresa

- **File**: `assets/arene/liceo/pericoli/ispezione-a-sorpresa.webp`
- **Cosa mostrare**: L'ispezione a sorpresa personificata: un ispettore con cartellina e lente che spunta da una porta.

**Prompt**

```text
A caricature of a school inspector with a clipboard and a magnifying glass peeking through a door.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A caricature of a school inspector with a clipboard and a magnifying glass peeking through a door. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Professoressa di matematica

- **File**: `assets/arene/liceo/pericoli/professoressa-di-matematica.webp`
- **Cosa mostrare**: Caricatura della prof di matematica con la penna rossa, lavagna con formule illeggibili alle spalle.

**Prompt**

```text
A caricature of a strict math teacher holding a red pen, a blackboard with blurred unreadable formulas behind her.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A caricature of a strict math teacher holding a red pen, a blackboard with blurred unreadable formulas behind her. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Liceo Spietato (1:1, 512 × 512 px, sfondo trasparente)

#### Gossip esplosivo

- **File**: `assets/arene/liceo/armi/gossip-esplosivo.webp`
- **Cosa mostrare**: Smartphone con un fumetto di chat che esplode come un fuoco d'artificio.

**Prompt**

```text
A smartphone with a glowing chat bubble bursting out of it like a firework.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A smartphone with a glowing chat bubble bursting out of it like a firework. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Foto imbarazzante

- **File**: `assets/arene/liceo/armi/foto-imbarazzante.webp`
- **Cosa mostrare**: Polaroid con un'immagine imbarazzante sfocata e un bagliore rosa.

**Prompt**

```text
A polaroid photo showing a blurred embarrassing picture, with a pink glow.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A polaroid photo showing a blurred embarrassing picture, with a pink glow. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Compito copiato

- **File**: `assets/arene/liceo/armi/compito-copiato.webp`
- **Cosa mostrare**: Compito in classe con un bigliettino nascosto che spunta.

**Prompt**

```text
A folded test paper with a tiny cheat sheet sticking out, no readable writing.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A folded test paper with a tiny cheat sheet sticking out, no readable writing. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Pallone da dodgeball

- **File**: `assets/arene/liceo/armi/pallone-da-dodgeball.webp`
- **Cosa mostrare**: Pallone rosso da dodgeball con scie di movimento.

**Prompt**

```text
A red rubber dodgeball with motion streaks.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A red rubber dodgeball with motion streaks. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Registro rubato

- **File**: `assets/arene/liceo/armi/registro-rubato.webp`
- **Cosa mostrare**: Registro di classe spesso con il segnalibro a nastro.

**Prompt**

```text
A thick class register book with a ribbon bookmark, plain cover.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A thick class register book with a ribbon bookmark, plain cover. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Profilo falso

- **File**: `assets/arene/liceo/armi/profilo-falso.webp`
- **Cosa mostrare**: Smartphone con un profilo social finto e l'icona di una maschera.

**Prompt**

```text
A smartphone showing a fake social profile with a disguise mask icon.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A smartphone showing a fake social profile with a disguise mask icon. Pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

---

## Ufficio Open Space

Riunioni infinite, fogli Excel e licenziamenti. Nessuno muore: si viene licenziati.

- **Cartella**: `assets/arene/ufficio/` (con le sottocartelle `luoghi/`, `pericoli/`, `armi/`)
- **Riferimento di stile**: `assets/arene/ufficio.webp`
- **Atmosfera**: Open space aziendale in chiave satirica: verde petrolio, grigi, neon freddi, luce da monitor. Tono da commedia d'ufficio, nessuna violenza.
- **Stile da aggiungere a ogni prompt di questa arena** (è già incluso nei prompt completi):

```text
Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours.
```

Più, a seconda della sezione:

- Luoghi: `Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background.`
- Pericoli: `4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person.`
- Armi: `Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone.`
- Sempre: `No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.`

### Luoghi · Ufficio Open Space (16:9, 1280 × 720 px, sfondo pieno)

#### Sala riunioni

- **File**: `assets/arene/ufficio/luoghi/sala-riunioni.webp`
- **Cosa mostrare**: Sala riunioni con tavolo di vetro lungo, sedie vuote, schermo del proiettore e lavagna.

**Prompt**

```text
A meeting room with a long glass table, empty chairs, a projector screen and a whiteboard with blurred scribbles.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A meeting room with a long glass table, empty chairs, a projector screen and a whiteboard with blurred scribbles. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Open space

- **File**: `assets/arene/ufficio/luoghi/open-space.webp`
- **Cosa mostrare**: Open space sterminato con file di scrivanie, monitor e piante in vaso.

**Prompt**

```text
A sprawling open-space office with rows of desks, monitors and potted plants.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A sprawling open-space office with rows of desks, monitors and potted plants. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Cucina

- **File**: `assets/arene/ufficio/luoghi/cucina.webp`
- **Cosa mostrare**: Angolo cucina con macchinetta del caffè, tazze, microonde e frigo pieno di bigliettini.

**Prompt**

```text
The office kitchenette with a coffee machine, mugs, a microwave and a fridge covered in sticky notes.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
The office kitchenette with a coffee machine, mugs, a microwave and a fridge covered in sticky notes. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Ufficio del direttore

- **File**: `assets/arene/ufficio/luoghi/ufficio-del-direttore.webp`
- **Cosa mostrare**: Ufficio d'angolo del Direttore con poltrona di pelle, vetrata panoramica e premi sugli scaffali.

**Prompt**

```text
The director's corner office with a big leather chair, a panoramic window and trophies on shelves.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
The director's corner office with a big leather chair, a panoramic window and trophies on shelves. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Sala stampanti

- **File**: `assets/arene/ufficio/luoghi/sala-stampanti.webp`
- **Cosa mostrare**: Stanzino delle stampanti con una fotocopiatrice inceppata che sputa fogli.

**Prompt**

```text
A cramped printer room with a jammed copier spitting out paper.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A cramped printer room with a jammed copier spitting out paper. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Parcheggio

- **File**: `assets/arene/ufficio/luoghi/parcheggio.webp`
- **Cosa mostrare**: Parcheggio aziendale sotterraneo con posti riservati e neon.

**Prompt**

```text
An underground company car park with reserved spaces and fluorescent lights.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An underground company car park with reserved spaces and fluorescent lights. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Pericoli · Ufficio Open Space (4:3, 960 × 720 px, sfondo pieno e scuro)

#### Direttore generale

- **File**: `assets/arene/ufficio/pericoli/direttore-generale.webp`
- **Cosa mostrare**: Caricatura dell'amministratore delegato in completo impeccabile, controluce davanti a una vetrata.

**Prompt**

```text
A caricature of a CEO in a sharp suit, silhouetted against a tall window, power pose.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A caricature of a CEO in a sharp suit, silhouetted against a tall window, power pose. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Ufficio Risorse umane

- **File**: `assets/arene/ufficio/pericoli/ufficio-risorse-umane.webp`
- **Cosa mostrare**: Caricatura di una persona delle Risorse umane con un sorriso di circostanza e una pila di cartelline.

**Prompt**

```text
A caricature of an HR officer with a polite fake smile holding a stack of folders.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A caricature of an HR officer with a polite fake smile holding a stack of folders. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Consulente esterno

- **File**: `assets/arene/ufficio/pericoli/consulente-esterno.webp`
- **Cosa mostrare**: Caricatura del consulente esterno con capelli impomatati, portatile e un grafico a torta olografico.

**Prompt**

```text
A caricature of a slick external consultant with gelled hair, a laptop and a holographic pie chart.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A caricature of a slick external consultant with gelled hair, a laptop and a holographic pie chart. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Riorganizzazione aziendale

- **File**: `assets/arene/ufficio/pericoli/riorganizzazione-aziendale.webp`
- **Cosa mostrare**: La riorganizzazione personificata: un mostro di caselle e frecce di organigramma aggrovigliate.

**Prompt**

```text
A corporate reorganization personified as a tangled monster made of org-chart boxes and arrows.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A corporate reorganization personified as a tangled monster made of org-chart boxes and arrows. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. 4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges. Light-hearted comic caricature, not scary, not violent, not resembling any real person. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

### Armi · Ufficio Open Space (1:1, 512 × 512 px, sfondo trasparente)

#### Mail in copia a tutti

- **File**: `assets/arene/ufficio/armi/mail-in-copia-a-tutti.webp`
- **Cosa mostrare**: Busta di una mail che si moltiplica in tante copie luminose.

**Prompt**

```text
An email envelope multiplying into many glowing copies.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An email envelope multiplying into many glowing copies. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Report pieno di errori altrui

- **File**: `assets/arene/ufficio/armi/report-pieno-di-errori-altrui.webp`
- **Cosa mostrare**: Report stampato coperto di segni rossi e post-it.

**Prompt**

```text
A printed report covered in red marks and sticky notes, no readable text.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A printed report covered in red marks and sticky notes, no readable text. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Presentazione rubata

- **File**: `assets/arene/ufficio/armi/presentazione-rubata.webp`
- **Cosa mostrare**: Chiavetta USB con una slide proiettata e una mascherina da ladro.

**Prompt**

```text
A USB stick projecting a slide, wearing a tiny burglar mask.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A USB stick projecting a slide, wearing a tiny burglar mask. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Badge clonato del capo

- **File**: `assets/arene/ufficio/armi/badge-clonato-del-capo.webp`
- **Cosa mostrare**: Badge col cordino e una sua copia identica luminosa.

**Prompt**

```text
An ID badge on a lanyard with a glowing duplicate copy beside it, blank photo area.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
An ID badge on a lanyard with a glowing duplicate copy beside it, blank photo area. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Foglio Excel con le prove

- **File**: `assets/arene/ufficio/armi/foglio-excel-con-le-prove.webp`
- **Cosa mostrare**: Stampa di un foglio di calcolo con celle evidenziate e una lente.

**Prompt**

```text
A spreadsheet printout with highlighted cells and a magnifying glass, no readable numbers.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A spreadsheet printout with highlighted cells and a magnifying glass, no readable numbers. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>

#### Nota spese gonfiata

- **File**: `assets/arene/ufficio/armi/nota-spese-gonfiata.webp`
- **Cosa mostrare**: Uno scontrino che si gonfia come un palloncino.

**Prompt**

```text
A paper receipt inflating like a balloon.
```

<details><summary>Prompt completo, pronto da incollare</summary>

```text
A paper receipt inflating like a balloon. Teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent. Painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours. Single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground. An everyday object used as a playful office or school prank, comic tone. No text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people.
```

</details>
