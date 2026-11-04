# Immagini delle arene con Midjourney v8.2: luoghi, pericoli e armi

_Generato da `node tools/atlas-slots.js` a partire da `tools/atlas-brief.js`: per cambiare un testo o un prompt modifica il brief e rigenera, non questo file._

**Presenti: 0 su 156** (luoghi 0/54, pericoli 0/35, armi 0/67). Meteo, disastri e oggetti arriveranno dopo.

## 1. Impostazioni di Midjourney

Ogni comando qui sotto contiene già tutti i parametri: copialo intero nella barra «Imagine» di midjourney.com (o dopo `/imagine` su Discord) e invia. I parametri scritti nel comando hanno la precedenza sul pannello, ma imposta comunque il pannello **Settings** così, una volta sola, per non avere sorprese:

| Impostazione | Valore | Perché |
| --- | --- | --- |
| **Version** | **8.2** | È il modello richiesto; è anche scritto in ogni comando (`--v 8.2`). |
| **Personalization** | **spenta** | Il tuo profilo personale cambierebbe lo stile da un'immagine all'altra: deve comandare il banner dell'arena. |
| **Mode / Raw** | **Standard (Raw spento)** | Il Raw toglie l'estetica di Midjourney; qui serve proprio quella pittorica, guidata dal riferimento di stile. |
| **Stylization** | lascia il valore predefinito | Ogni comando lo fissa con `--s` (vedi la tabella sotto). |
| **Weirdness** | **0** | Niente stranezze: le immagini devono essere coerenti tra loro. |
| **Variety** | lascia il predefinito | Ogni comando lo fissa con `--chaos`. |
| **HD** | **acceso** (se il tuo abbonamento lo prevede) | Esce a circa 2048 px: poi la riduco io alle misure del sito, più nitida. Se non c'è, va bene anche la risoluzione normale. |
| **Speed** | Fast o Relax | Non cambia il risultato. Evita la modalità Draft: è più grezza e non va d'accordo con l'HD. |
| **Stealth** | come preferisci | Non cambia il risultato. |

### Parametri usati in ogni sezione

| Sezione | Formato `--ar` | Stile `--s` | Peso del riferimento `--sw` | Varietà `--chaos` | Esclusi `--no` |
| --- | --- | --- | --- | --- | --- |
| Luoghi | 16:9 | 250 | 300 | 8 | text, letters, words, readable signs, logo, watermark, people, characters, frame, border |
| Pericoli | 4:3 | 300 | 250 | 8 | text, letters, words, logo, watermark, frame, border, poster lettering (nel Liceo e nell'Ufficio anche: blood, gore, weapons, real person) |
| Armi | 1:1 | 150 | 120 | 0 | text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border |

- **`--sref`** è il banner dell'arena, preso dal repository pubblico: tutte le immagini di un'arena ne ereditano palette, luce e pennellata, quindi stanno bene accanto al banner e tra loro. **`--sw`** dice quanto pesa: alto per luoghi e pericoli (devono sembrare la stessa arena), basso per le armi (devono restare oggetti puliti, non paesaggi).
- **`--s`** (stylize) dà a Midjourney spazio per rendere l'immagine più ricca: più alto nei pericoli, più basso nelle armi, dove serve una sagoma semplice.
- **`--chaos`** a 8 varia un po' le quattro proposte di luoghi e pericoli; a 0 per le armi, che devono uscire composte sempre allo stesso modo.
- **`--no`** tiene fuori scritte, loghi, cornici e persone: i nomi li scrive il sito, e una cornice disegnata stonerebbe con le schede.
- Se Midjourney rifiuta un parametro (gli aggiornamenti a volte ne cambiano i limiti), toglilo dal comando e rilancia: il resto funziona da solo. Se non riesce a leggere il link del banner, scaricalo dal sito, caricalo nella barra «Imagine» come **Style reference** e togli `--sref …` dal comando.

## 2. Come lavorare, arena per arena

1. Apri il capitolo dell'arena qui sotto e genera le voci **una dopo l'altra nella stessa sessione**: con lo stesso riferimento escono coerenti.
2. Di ogni comando ottieni quattro proposte: scegli la migliore seguendo il consiglio della sezione e, se serve, usa **Vary (Subtle)** per piccoli ritocchi. Evita Vary (Strong): cambia troppo.
3. Scarica l'immagine scelta in **PNG**. Al nome non pensarci: mandamele anche così, dicendomi a quale voce corrispondono, oppure chiamale già con il nome del file indicato.
4. **Al resto penso io**: ritaglio alle proporzioni giuste, riduzione alle misure del sito, scontorno delle armi (per questo le facciamo su fondo grigio uniforme: Midjourney non crea sfondi trasparenti), conversione in WebP, nomi e cartelle. Poi il sito le usa al posto delle illustrazioni provvisorie.

## 3. Come appaiono nel sito

| Sezione | Dove si vede | Misura finale | Sfondo finale | Quante |
| --- | --- | --- | --- | --- |
| Luoghi | Scheda della zona nel capitolo Mappa | 1280 × 720 px (16:9) | pieno | 54 |
| Pericoli | Manifesto «ricercato» appeso nel capitolo Mappa: carta color avorio, puntina rossa, leggermente inclinato | 960 × 720 px (4:3) | pieno e scuro | 35 |
| Armi | Rastrelliera dell'armeria nel capitolo Mappa: ogni arma sta in una piastrella arrotondata di **62 × 62 px**, sia su fondo chiaro sia su fondo scuro. | 512 × 512 px (1:1) | trasparente (lo scontorno lo faccio io) | 67 |

- **Luoghi**: Scheda della zona nel capitolo Mappa. Al computer l'immagine sta in alto nella scheda, in 16:9, larga circa 270 px. Sul telefono diventa una colonna a sinistra di circa 120 × 140 px: si vede solo la **fascia centrale verticale**. Tra le quattro proposte scegli quella con il luogo **più riconoscibile al centro** e meno dettagli minuti: deve funzionare anche piccola.
- **Pericoli**: Manifesto «ricercato» appeso nel capitolo Mappa: carta color avorio, puntina rossa, leggermente inclinato. L'immagine è un 4:3 largo circa 190 px al computer e 150 px sul telefono, con il nome scritto sotto dal sito. Scegli quella con il soggetto **centrato, che guarda verso di te**, e i bordi scuri. Nel Liceo e nell'Ufficio deve far sorridere, non paura.
- **Armi**: Rastrelliera dell'armeria nel capitolo Mappa: ogni arma sta in una piastrella arrotondata di **62 × 62 px**, sia su fondo chiaro sia su fondo scuro. Scegli quella con **un solo oggetto intero**, ben staccato dal fondo grigio uniforme, senza ombre a terra: così lo scontorno viene pulito.

## Indice

| Arena | Banner usato come stile | Luoghi | Pericoli | Armi |
| --- | --- | --- | --- | --- |
| [Arena Classica](#arena-classica) | [classico.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp) | 6 | 4 | 10 |
| [Reame Incantato](#reame-incantato) | [fantasy.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp) | 6 | 4 | 8 |
| [Stazione Orbitale](#stazione-orbitale) | [scifi.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp) | 6 | 4 | 7 |
| [Città degli Infetti](#città-degli-infetti) | [zombie.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp) | 6 | 4 | 8 |
| [Isola Battle Royale](#isola-battle-royale) | [royale.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp) | 6 | 3 | 8 |
| [Villa Maledetta](#villa-maledetta) | [horror.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp) | 6 | 4 | 7 |
| [Terre Desolate](#terre-desolate) | [wasteland.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp) | 6 | 4 | 7 |
| [Liceo Spietato](#liceo-spietato) | [liceo.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp) | 6 | 4 | 6 |
| [Ufficio Open Space](#ufficio-open-space) | [ufficio.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp) | 6 | 4 | 6 |

---

## Arena Classica

Boschi, fiumi e una Cornucopia piena di armi.

- **Atmosfera**: Bosco selvaggio al tramonto: ambra, ocra e marroni caldi, ombre blu fredde, luce radente arancione. Tono da sopravvivenza, avventuroso più che splatter.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp)

### Luoghi · Arena Classica

#### Cornucopia

La Cornucopia dorata su un poggio roccioso al centro di una radura, che trabocca di armi, zaini e casse.  
File: `assets/arene/classico/luoghi/cornucopia.webp`

```text
A giant golden horn-shaped cornucopia resting on a rocky mound in a forest clearing, spilling weapons, backpacks and supply crates onto the grass, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Bosco

Bosco fitto e antico all'imbrunire, lame di luce tra i tronchi e un sentiero nascosto.  
File: `assets/arene/classico/luoghi/bosco.webp`

```text
A dense ancient pine forest at dusk, shafts of golden light between tall trunks, ferns and a narrow hidden trail, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Fiume

Fiume tortuoso tra massi coperti di muschio, piccole rapide e un tronco caduto che fa da ponte.  
File: `assets/arene/classico/luoghi/fiume.webp`

```text
A winding river between mossy boulders, shallow rapids reflecting the orange sky, a fallen log used as a bridge, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Paludi

Palude scura con canne, alberi morti contorti e nebbia bassa sull'acqua.  
File: `assets/arene/classico/luoghi/paludi.webp`

```text
A murky marsh with tall reeds, twisted dead trees and low mist over black water, a few fireflies, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Rovine

Rovine di un antico tempio in pietra invase dai rampicanti, colonne spezzate e un arco crollato.  
File: `assets/arene/classico/luoghi/rovine.webp`

```text
Crumbling stone ruins of an ancient temple overgrown with vines, broken columns and a collapsed archway, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Altopiano

Altopiano roccioso spazzato dal vento, erba brinata e montagne lontane: il posto più freddo dell'arena.  
File: `assets/arene/classico/luoghi/altopiano.webp`

```text
A windswept rocky highland plateau with sparse frosted grass and distant mountains, cold blue shadows under a warm sky, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Arena Classica

#### Branco di lupi mutanti

Branco di lupi mutanti con occhi ambra e chiazze di pelo metallico, che escono ringhiando dagli alberi.  
File: `assets/arene/classico/pericoli/branco-di-lupi-mutanti.webp`

```text
A pack of three mutated wolves with glowing amber eyes and patches of metallic fur, snarling as they step out of shadowy trees, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Sciame di vespe velenose

Sciame di vespe giganti e velenose; una in primo piano, nitida, con il pungiglione in vista.  
File: `assets/arene/classico/pericoli/sciame-di-vespe-velenose.webp`

```text
A menacing swarm of oversized venomous wasps with glowing yellow stripes, one wasp in sharp focus in the foreground with its stinger visible, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Orso affamato

Enorme orso bruno affamato, ritto sulle zampe posteriori, muso segnato da cicatrici.  
File: `assets/arene/classico/pericoli/orso-affamato.webp`

```text
A huge starving brown bear rearing up on its hind legs, scarred muzzle, ribs showing, hungry eyes, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Serpente gigante

Serpente gigante dalle squame smeraldo, avvolto su sé stesso con la testa alzata.  
File: `assets/arene/classico/pericoli/serpente-gigante.webp`

```text
A giant coiled serpent with emerald scales raising its head, forked tongue out, eyes catching the sunset light, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

### Armi · Arena Classica

#### Coltello

Coltello da sopravvivenza con manico in cuoio.  
File: `assets/arene/classico/armi/coltello.webp`

```text
A sturdy survival knife with a leather-wrapped handle and a clip-point steel blade, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Arco

Arco ricurvo in legno con una freccia incoccata.  
File: `assets/arene/classico/armi/arco.webp`

```text
A wooden recurve bow with a taut string and one arrow nocked, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia

Lancia da caccia con asta di frassino e punta a foglia.  
File: `assets/arene/classico/armi/lancia.webp`

```text
A hunting spear with an ash-wood shaft and a leaf-shaped steel tip bound with cord, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia

Ascia da boscaiolo con manico consumato.  
File: `assets/arene/classico/armi/ascia.webp`

```text
A woodcutter's axe with a worn wooden handle and a chipped steel head, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Machete

Machete lungo, lama leggermente curva.  
File: `assets/arene/classico/armi/machete.webp`

```text
A long machete with a slightly curved blade and a black rubber grip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Tridente

Tridente da pesca con asta di legno.  
File: `assets/arene/classico/armi/tridente.webp`

```text
A three-pronged fishing trident with a wooden shaft and rope binding, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fionda

Fionda di legno a forcella con tasca di cuoio.  
File: `assets/arene/classico/armi/fionda.webp`

```text
A forked wooden slingshot with rubber bands and a small leather pouch holding a pebble, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Spada corta

Spada corta tipo gladio, guardia semplice.  
File: `assets/arene/classico/armi/spada-corta.webp`

```text
A short gladius-style sword with a simple crossguard and wrapped grip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale

Pugnale sottile a doppio taglio.  
File: `assets/arene/classico/armi/pugnale.webp`

```text
A slim double-edged dagger with a cord-wrapped hilt, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mazza

Clava di legno pesante con borchie di ferro.  
File: `assets/arene/classico/armi/mazza.webp`

```text
A heavy wooden war club studded with iron rivets, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/classico.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Reame Incantato

Draghi, rune e foreste che sussurrano.

- **Atmosfera**: Fiaba oscura di notte: viola, magenta e blu notte, bagliori magici turchesi e dorati, rune luminose. Meraviglia e minaccia insieme.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp)

### Luoghi · Reame Incantato

#### Torre in rovina

Torre di uno stregone in pietra scura, mezza crollata, con rune accese sui muri, al chiaro di luna.  
File: `assets/arene/fantasy/luoghi/torre-in-rovina.webp`

```text
A ruined wizard's tower of dark stone, half collapsed, glowing violet runes on its walls, under a huge moon, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Foresta elfica

Foresta elfica di alberi giganti dalla corteccia argentata, lanterne appese e lucine sospese.  
File: `assets/arene/fantasy/luoghi/foresta-elfica.webp`

```text
An elven forest of giant silver-barked trees, hanging lanterns and floating motes of light, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Lago nebbioso

Lago incantato di notte, acqua a specchio, pontile di pietra e una statua mezza sommersa.  
File: `assets/arene/fantasy/luoghi/lago-nebbioso.webp`

```text
A misty enchanted lake at night, glassy water, a small stone pier and a half-sunken statue, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Miniere

Miniere naniche scavate nella montagna, impalcature, binari con carrello e vene di cristallo luminose.  
File: `assets/arene/fantasy/luoghi/miniere.webp`

```text
Dwarven mines carved into a mountain, wooden scaffolding, minecart rails and glowing crystal veins in the rock, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Palude stregata

Palude stregata con alberi storti, muschio pendente, una capanna su palafitte e fuochi fatui verdi.  
File: `assets/arene/fantasy/luoghi/palude-stregata.webp`

```text
A haunted swamp with crooked trees, hanging moss, a witch's hut on stilts and green will-o'-wisps, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Picco del drago

Picco frastagliato con la tana del drago: rocce bruciate, mucchi d'oro e fumo che sale.  
File: `assets/arene/fantasy/luoghi/picco-del-drago.webp`

```text
A jagged mountain peak with a dragon's lair, scorched rocks, heaps of gold coins and smoke rising into the night, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Reame Incantato

#### Troll di caverna

Troll di caverna enorme, pelle grigia bitorzoluta, clava di pietra, occhi piccoli e luminosi.  
File: `assets/arene/fantasy/pericoli/troll-di-caverna.webp`

```text
A hulking cave troll with grey warty skin and a stone club, small glowing eyes, stooping in a cave mouth, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Viverna

Viverna con ali membranose spalancate e coda uncinata, appollaiata su una rupe mentre ruggisce.  
File: `assets/arene/fantasy/pericoli/viverna.webp`

```text
A wyvern with leathery wings spread wide and a barbed tail, perched on a cliff edge, roaring, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Spettro errante

Spettro traslucido in vesti a brandelli, bagliore azzurro, occhi vuoti, nella nebbia.  
File: `assets/arene/fantasy/pericoli/spettro-errante.webp`

```text
A wandering translucent wraith in tattered robes, faint blue glow, hollow eyes, drifting through mist, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Branco di lupi mannari

Branco di lupi mannari sotto la luna piena, il capobranco in primo piano.  
File: `assets/arene/fantasy/pericoli/branco-di-lupi-mannari.webp`

```text
A pack of werewolves under the full moon, the alpha in front with bristling fur and bared fangs, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

### Armi · Reame Incantato

#### Spada runica

Spada lunga con rune viola luminose sulla lama.  
File: `assets/arene/fantasy/armi/spada-runica.webp`

```text
A longsword with glowing violet runes running along the blade, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Bastone magico

Bastone da mago nodoso con un cristallo luminoso sospeso in cima.  
File: `assets/arene/fantasy/armi/bastone-magico.webp`

```text
A gnarled wizard staff topped with a floating glowing crystal, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Arco elfico

Arco lungo elfico in legno chiaro con intarsi d'argento a foglia.  
File: `assets/arene/fantasy/armi/arco-elfico.webp`

```text
An elegant elven longbow of pale wood with leaf-shaped silver inlays, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia nanica

Ascia nanica a doppia lama con incisioni a intreccio.  
File: `assets/arene/fantasy/armi/ascia-nanica.webp`

```text
A heavy double-bladed dwarven axe with engraved knotwork and a leather grip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale avvelenato

Pugnale ricurvo che gocciola veleno verde.  
File: `assets/arene/fantasy/armi/pugnale-avvelenato.webp`

```text
A curved dagger dripping bright green poison, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Martello da guerra

Martello da guerra massiccio con testa in ferro incisa di rune.  
File: `assets/arene/fantasy/armi/martello-da-guerra.webp`

```text
A massive war hammer with a rune-carved iron head, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra fantasy in legno scuro e ottone.  
File: `assets/arene/fantasy/armi/balestra.webp`

```text
A fantasy crossbow of dark wood with brass fittings and a loaded bolt, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia incantata

Lancia sottile con la punta avvolta da una luce pallida.  
File: `assets/arene/fantasy/armi/lancia-incantata.webp`

```text
A slender spear with an enchanted blade wreathed in pale light, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/fantasy.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Stazione Orbitale

Ossigeno limitato, droni e un reattore instabile.

- **Atmosfera**: Stazione orbitale: blu, ciano e acciaio spazzolato, neon freddi, spie rosse di allarme, la Terra o le stelle dai finestrini.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp)

### Luoghi · Stazione Orbitale

#### Hangar

Hangar enorme con una navetta attraccata, container e il portellone aperto sulle stelle.  
File: `assets/arene/scifi/luoghi/hangar.webp`

```text
A vast spaceship hangar with a docked shuttle, cargo containers and an open bay door showing the stars, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Serra idroponica

Modulo serra idroponica: file di piante sotto luci viola, tubi d'acqua e una cupola di vetro.  
File: `assets/arene/scifi/luoghi/serra-idroponica.webp`

```text
A hydroponic greenhouse module, rows of plants under purple grow lights, water pipes and a glass dome, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Reattore

Il nucleo del reattore: una sfera ciano incandescente dentro un anello d'acciaio, passerelle e luci d'allarme.  
File: `assets/arene/scifi/luoghi/reattore.webp`

```text
The station's reactor core, a glowing cyan sphere inside a steel ring, catwalks and warning lights, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Ponte di comando

Ponte di comando con console olografiche curve e una vetrata enorme sulla Terra.  
File: `assets/arene/scifi/luoghi/ponte-di-comando.webp`

```text
The command bridge with curved holographic consoles and a huge window looking down on Earth, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Moduli abitativi

Moduli dell'equipaggio stretti: cuccette, armadietti e un piccolo oblò rotondo.  
File: `assets/arene/scifi/luoghi/moduli-abitativi.webp`

```text
Cramped crew living modules with bunks, personal lockers and a small round porthole, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Condotti di servizio

Condotti di servizio angusti con cavi, sfiati di vapore e luci d'emergenza tremolanti.  
File: `assets/arene/scifi/luoghi/condotti-di-servizio.webp`

```text
Narrow service ducts packed with cables, steam vents and flickering red emergency lights, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Stazione Orbitale

#### Drone di sicurezza impazzito

Drone di sicurezza fuori controllo con un solo occhio rosso e rotori danneggiati che sprizzano scintille.  
File: `assets/arene/scifi/pericoli/drone-di-sicurezza-impazzito.webp`

```text
A rogue security drone with a single red eye and damaged rotors throwing sparks, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Sciame di nanobot

Sciame argentato di nanobot che si avvita formando una sagoma minacciosa.  
File: `assets/arene/scifi/pericoli/sciame-di-nanobot.webp`

```text
A swirling silver swarm of nanobots forming a menacing face-like shape, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Creatura aliena dai tentacoli

Creatura aliena con tentacoli lucidi e macchie bioluminescenti che esce da una grata.  
File: `assets/arene/scifi/pericoli/creatura-aliena-dai-tentacoli.webp`

```text
An alien creature with glossy tentacles and bioluminescent spots squeezing out of a vent grate, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Androide da combattimento

Androide da combattimento corazzato, visore acceso, pelle sintetica strappata.  
File: `assets/arene/scifi/pericoli/androide-da-combattimento.webp`

```text
A battle android with an armoured chassis, glowing visor and torn synthetic skin, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

### Armi · Stazione Orbitale

#### Fucile al plasma

Fucile al plasma affusolato con celle d'energia ciano.  
File: `assets/arene/scifi/armi/fucile-al-plasma.webp`

```text
A sleek plasma rifle with glowing cyan energy cells, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lama vibrante

Lama vibrante con il filo traslucido che ronza.  
File: `assets/arene/scifi/armi/lama-vibrante.webp`

```text
A vibro-blade with a humming translucent edge and a ribbed grip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola laser

Pistola laser compatta con emettitore rosso.  
File: `assets/arene/scifi/armi/pistola-laser.webp`

```text
A compact laser pistol with a red emitter tip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Granata EMP

Granata EMP sferica con archi elettrici blu.  
File: `assets/arene/scifi/armi/granata-emp.webp`

```text
A spherical EMP grenade with crackling blue electric arcs, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Frusta monofilamento

Frusta a monofilamento: impugnatura metallica e un filo luminoso quasi invisibile.  
File: `assets/arene/scifi/armi/frusta-monofilamento.webp`

```text
A monofilament whip, a metal handle with a nearly invisible glowing line coiled around it, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Taser a impulsi

Taser a impulsi con elettrodi che crepitano.  
File: `assets/arene/scifi/armi/taser-a-impulsi.webp`

```text
A pulse taser with crackling electrodes, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Cannone a rotaia portatile

Cannone a rotaia portatile con binari magnetici e calcio pesante.  
File: `assets/arene/scifi/armi/cannone-a-rotaia-portatile.webp`

```text
A portable railgun with twin magnetic rails and a heavy stock, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, cold blue and cyan neon on brushed steel with red warning lights, orbital space station, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/scifi.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Città degli Infetti

Ospedali vuoti, orde affamate e radio gracchianti.

- **Atmosfera**: Città abbandonata dopo il contagio: verdi malati, grigi, ruggine, cielo coperto, luci tremolanti. Inquietante più che splatter.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp)

### Luoghi · Città degli Infetti

#### Ospedale

Corridoio d'ospedale abbandonato con barelle rovesciate, luci tremolanti e porte barricate.  
File: `assets/arene/zombie/luoghi/ospedale.webp`

```text
An abandoned hospital corridor with overturned gurneys, flickering lights and barricaded doors, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Centro commerciale

Atrio di un centro commerciale saccheggiato, scale mobili rotte, carrelli sparsi, lucernari.  
File: `assets/arene/zombie/luoghi/centro-commerciale.webp`

```text
A looted shopping mall atrium with broken escalators, scattered trolleys and dusty skylights, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Metropolitana

Banchina della metro al buio, un treno deragliato, binari allagati e lampade d'emergenza.  
File: `assets/arene/zombie/luoghi/metropolitana.webp`

```text
A dark subway platform with a derailed train, flooded tracks and emergency lamps, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Scuola

Corridoio di scuola vuoto, armadietti, fogli a terra e finestre sbarrate con assi.  
File: `assets/arene/zombie/luoghi/scuola.webp`

```text
An empty school hallway with lockers, papers on the floor and windows boarded up with planks, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Stazione di polizia

Stazione di polizia fortificata con sacchi di sabbia, un furgone blindato e fari.  
File: `assets/arene/zombie/luoghi/stazione-di-polizia.webp`

```text
A fortified police station with sandbags, an armoured van and searchlights, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Periferia

Strada di periferia con auto abbandonate, prati incolti e fumo all'orizzonte.  
File: `assets/arene/zombie/luoghi/periferia.webp`

```text
A suburban street with abandoned cars, overgrown lawns and smoke on the horizon, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Città degli Infetti

#### Orda di zombi

Orda fitta di zombi che riempie una strada, tante mani protese in avanti.  
File: `assets/arene/zombie/pericoli/orda-di-zombi.webp`

```text
A dense horde of shambling zombies filling a city street, many hands reaching forward, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Infetto corridore

Infetto corridore colto a metà scatto, vestiti strappati, occhi folli.  
File: `assets/arene/zombie/pericoli/infetto-corridore.webp`

```text
A fast infected runner caught mid-sprint, torn clothes, wild eyes, motion frozen, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Cane infetto

Cane infetto con pelo a chiazze, denti scoperti e occhi lattiginosi.  
File: `assets/arene/zombie/pericoli/cane-infetto.webp`

```text
An infected dog with patchy fur, bared teeth and milky eyes, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Gigante mutato

Gigante mutato con muscoli gonfi e escrescenze ossee che sfonda un muro.  
File: `assets/arene/zombie/pericoli/gigante-mutato.webp`

```text
A towering mutated giant with swollen muscles and bone growths, smashing through a brick wall, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

### Armi · Città degli Infetti

#### Mazza chiodata

Mazza da baseball avvolta nel filo spinato e nei chiodi.  
File: `assets/arene/zombie/armi/mazza-chiodata.webp`

```text
A baseball bat wrapped in barbed wire and studded with nails, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile a pompa

Fucile a pompa con il calcio rattoppato col nastro.  
File: `assets/arene/zombie/armi/fucile-a-pompa.webp`

```text
A pump-action shotgun with a duct-taped stock, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Piede di porco

Piede di porco in acciaio rosso.  
File: `assets/arene/zombie/armi/piede-di-porco.webp`

```text
A red steel crowbar, scuffed paint, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Motosega

Motosega con il corpo arancione graffiato.  
File: `assets/arene/zombie/armi/motosega.webp`

```text
A chainsaw with a scratched orange body, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Katana

Katana con l'impugnatura consumata.  
File: `assets/arene/zombie/armi/katana.webp`

```text
A katana with a worn wrapped handle, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra moderna da caccia con mirino.  
File: `assets/arene/zombie/armi/balestra.webp`

```text
A modern hunting crossbow with a scope, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola

Pistola semiautomatica malridotta.  
File: `assets/arene/zombie/armi/pistola.webp`

```text
A battered semi-automatic pistol, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Accetta

Accetta con impugnatura in gomma.  
File: `assets/arene/zombie/armi/accetta.webp`

```text
A hatchet with a rubber grip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/zombie.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Isola Battle Royale

Un aereo, cento casse e una zona che si stringe.

- **Atmosfera**: Isola tropicale da battle royale videoludico: blu mare, verde giungla, arancio di tramonto, contrasti puliti, un po' «da videogioco».
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp)

### Luoghi · Isola Battle Royale

#### Aeroporto

Piccolo aeroporto dell'isola con pista, un cargo arrugginito e la torre di controllo.  
File: `assets/arene/royale/luoghi/aeroporto.webp`

```text
A small island airport with a runway, a rusty cargo plane and a control tower, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Base militare

Base militare con tende, torrette di guardia, casse di rifornimento ed eliporto.  
File: `assets/arene/royale/luoghi/base-militare.webp`

```text
A military base with tents, watchtowers, supply crates and a helipad, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Villaggio costiero

Villaggio di pescatori con case colorate, pontile di legno e barche.  
File: `assets/arene/royale/luoghi/villaggio-costiero.webp`

```text
A coastal fishing village with colourful houses, a wooden pier and boats, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Centrale elettrica

Centrale elettrica con torri di raffreddamento, tralicci e trasformatori.  
File: `assets/arene/royale/luoghi/centrale-elettrica.webp`

```text
A power plant with cooling towers, pylons and humming transformers, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Fattoria

Fattoria con fienile rosso, balle di fieno, silos e campi di grano.  
File: `assets/arene/royale/luoghi/fattoria.webp`

```text
A farm with a red barn, hay bales, a silo and golden wheat fields, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Foresta

Foresta tropicale rigogliosa con palme, felci e una cassa di rifornimento nascosta.  
File: `assets/arene/royale/luoghi/foresta.webp`

```text
A lush tropical forest with palm trees, ferns and a hidden glowing supply crate, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Isola Battle Royale

#### Drone armato

Drone quadricottero armato con mitragliatrice e laser di puntamento rosso.  
File: `assets/arene/royale/pericoli/drone-armato.webp`

```text
An armed quadcopter drone with a mounted gun and a red targeting laser, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Elicottero da caccia

Elicottero d'attacco in volo basso con il faro acceso.  
File: `assets/arene/royale/pericoli/elicottero-da-caccia.webp`

```text
An attack helicopter hovering low with its searchlight on, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Cane da guardia addestrato

Pastore tedesco da guardia con giubbotto tattico, che abbaia.  
File: `assets/arene/royale/pericoli/cane-da-guardia-addestrato.webp`

```text
A trained German shepherd guard dog in a tactical vest, barking, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

### Armi · Isola Battle Royale

#### Fucile d'assalto

Fucile d'assalto con mirino a punto rosso.  
File: `assets/arene/royale/armi/fucile-dassalto.webp`

```text
An assault rifle with a red-dot sight, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola

Pistola semiautomatica nera.  
File: `assets/arene/royale/armi/pistola.webp`

```text
A black semi-automatic pistol, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile da cecchino

Fucile da cecchino con cannocchiale lungo e bipiede.  
File: `assets/arene/royale/armi/fucile-da-cecchino.webp`

```text
A sniper rifle with a long scope and a folded bipod, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile a pompa

Fucile a pompa tattico.  
File: `assets/arene/royale/armi/fucile-a-pompa.webp`

```text
A tactical pump shotgun, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Granata

Granata a frammentazione con la spoletta.  
File: `assets/arene/royale/armi/granata.webp`

```text
A fragmentation grenade with its pin, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mitraglietta

Mitraglietta compatta.  
File: `assets/arene/royale/armi/mitraglietta.webp`

```text
A compact submachine gun, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Coltello da combattimento

Coltello da combattimento con dorso seghettato.  
File: `assets/arene/royale/armi/coltello-da-combattimento.webp`

```text
A combat knife with a serrated spine, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra tattica mimetica.  
File: `assets/arene/royale/armi/balestra.webp`

```text
A tactical crossbow with a camouflage pattern, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/royale.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Villa Maledetta

Specchi che sussurrano e porte che si chiudono da sole.

- **Atmosfera**: Villa gotica maledetta: cremisi, nero e oro di candela, nebbia, luna rossa. Paura sottile e atmosfera, niente sangue esplicito.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp)

### Luoghi · Villa Maledetta

#### Cantina

Cantina umida con botti piene di ragnatele, una lampadina che oscilla e una porta socchiusa.  
File: `assets/arene/horror/luoghi/cantina.webp`

```text
A damp wine cellar with cobwebbed barrels, a single swinging light bulb and a door left ajar, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Soffitta

Soffitta polverosa con mobili coperti da teli, un vecchio cavallo a dondolo e luna da un oblò.  
File: `assets/arene/horror/luoghi/soffitta.webp`

```text
A dusty attic with sheet-covered furniture, an old rocking horse and moonlight through a round window, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Cappella

Cappella gotica privata con candele, vetrate rotte e panche vuote.  
File: `assets/arene/horror/luoghi/cappella.webp`

```text
A private gothic chapel with candles, broken stained glass and empty pews, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Cimitero

Cimitero incolto con lapidi storte, cancello di ferro e nebbia sotto una luna rossa.  
File: `assets/arene/horror/luoghi/cimitero.webp`

```text
An overgrown cemetery with leaning tombstones, an iron gate and fog under a red moon, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Biblioteca

Biblioteca antica con scaffali altissimi, polvere sospesa e un libro aperto sul leggio.  
File: `assets/arene/horror/luoghi/biblioteca.webp`

```text
A grand old library with towering shelves, floating dust and a book lying open on a lectern, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Serra

Serra vittoriana in rovina con vetri rotti, piante carnivore e rampicanti.  
File: `assets/arene/horror/luoghi/serra.webp`

```text
A derelict Victorian greenhouse with shattered glass, carnivorous plants and creeping vines, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Villa Maledetta

#### Spettro urlante

Fantasma che urla con la bocca innaturalmente allungata e capelli pallidi fluttuanti.  
File: `assets/arene/horror/pericoli/spettro-urlante.webp`

```text
A screaming ghost with an unnaturally stretched mouth and pale floating hair, glowing white, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Bambola posseduta

Bambola di porcellana col viso incrinato e un occhio di vetro, seduta su una sedia, troppo viva.  
File: `assets/arene/horror/pericoli/bambola-posseduta.webp`

```text
A porcelain doll with a cracked face and one glass eye, sitting in a chair, slightly too alive, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Entità senza volto

Entità alta e senza volto in un corridoio buio, braccia troppo lunghe.  
File: `assets/arene/horror/pericoli/entita-senza-volto.webp`

```text
A tall faceless entity in a dark corridor, unnaturally long arms, black suit, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Stormo di corvi

Stormo di corvi che esplode da un albero morto; uno fissa chi guarda.  
File: `assets/arene/horror/pericoli/stormo-di-corvi.webp`

```text
A flock of crows bursting from a dead tree, one crow staring straight at the viewer, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

### Armi · Villa Maledetta

#### Candelabro d'argento

Candelabro d'argento pesante con tre candele che colano.  
File: `assets/arene/horror/armi/candelabro-dargento.webp`

```text
A heavy silver candelabra with three dripping candles, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia

Vecchia ascia arrugginita.  
File: `assets/arene/horror/armi/ascia.webp`

```text
An old rusted axe with a cracked wooden handle, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile da caccia

Doppietta da caccia con calcio in legno.  
File: `assets/arene/horror/armi/fucile-da-caccia.webp`

```text
A double-barrelled hunting shotgun with a wooden stock, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale rituale

Pugnale rituale con elsa d'osso e simboli incisi.  
File: `assets/arene/horror/armi/pugnale-rituale.webp`

```text
A ritual dagger with a bone hilt and engraved occult symbols, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Crocifisso appuntito

Crocifisso di legno appuntito come un paletto.  
File: `assets/arene/horror/armi/crocifisso-appuntito.webp`

```text
A wooden crucifix sharpened into a stake at the bottom, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Attizzatoio

Attizzatoio da camino in ferro battuto.  
File: `assets/arene/horror/armi/attizzatoio.webp`

```text
A wrought iron fireplace poker with a hooked tip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Falce

Falce da contadino con la lama lunga e curva.  
File: `assets/arene/horror/armi/falce.webp`

```text
A farmer's scythe with a long curved blade, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/horror.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Terre Desolate

Polvere radioattiva, predoni e motori truccati.

- **Atmosfera**: Deserto post-atomico: ocra, ruggine e sabbia sotto un sole bruciato, foschia di polvere, lamiere e motori truccati.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp)

### Luoghi · Terre Desolate

#### Discarica

Enorme sfasciacarrozze di auto arrugginite, pneumatici e rottami sotto un sole velato.  
File: `assets/arene/wasteland/luoghi/discarica.webp`

```text
A vast scrapyard of rusted cars, tyres and piled junk under a hazy sun, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Autostrada spezzata

Cavalcavia autostradale crollato nel deserto, camion abbandonati.  
File: `assets/arene/wasteland/luoghi/autostrada-spezzata.webp`

```text
A broken highway overpass collapsed into the desert, abandoned trucks below, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Raffineria

Raffineria arrugginita con torce di gas accese e intrico di tubi.  
File: `assets/arene/wasteland/luoghi/raffineria.webp`

```text
A rusted oil refinery with burning flare stacks and a tangle of pipes, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Città fantasma

Città fantasma con edifici mezzi sepolti, cartelloni sbiaditi e rotolacampo.  
File: `assets/arene/wasteland/luoghi/citta-fantasma.webp`

```text
A ghost town with half-buried buildings, faded blank billboards and tumbleweeds, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Cratere

Cratere radioattivo enorme con pozze che brillano di verde.  
File: `assets/arene/wasteland/luoghi/cratere.webp`

```text
A huge radioactive crater with glowing green pools, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Diga

Diga di cemento gigante incrinata, con un insediamento di fortuna in cima.  
File: `assets/arene/wasteland/luoghi/diga.webp`

```text
A giant cracked concrete dam with a makeshift settlement built on top, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Terre Desolate

#### Banda di predoni

Banda di predoni con armature di cuoio chiodato e occhialoni, accanto a buggy truccati.  
File: `assets/arene/wasteland/pericoli/banda-di-predoni.webp`

```text
A gang of raiders in spiked leather armour and goggles standing by modified buggies, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Scorpione gigante

Scorpione gigante del deserto col pungiglione alzato.  
File: `assets/arene/wasteland/pericoli/scorpione-gigante.webp`

```text
A giant desert scorpion with its stinger raised, chitin shining in the sun, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Branco di cani mutati

Branco di cani mutati senza pelo, con occhi in più, che ringhiano.  
File: `assets/arene/wasteland/pericoli/branco-di-cani-mutati.webp`

```text
A pack of hairless mutated dogs with extra eyes, growling, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

#### Verme delle sabbie

Verme delle sabbie colossale che erompe dalle dune, bocca circolare piena di denti.  
File: `assets/arene/wasteland/pericoli/verme-delle-sabbie.webp`

```text
A colossal sandworm bursting out of the dunes, a circular mouth full of teeth, dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering
```

### Armi · Terre Desolate

#### Fucile arrugginito

Fucile a otturatore arrugginito con mirino legato col nastro.  
File: `assets/arene/wasteland/armi/fucile-arrugginito.webp`

```text
A rusty bolt-action rifle with a scope held on by tape, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia ricavata da un tubo

Lancia fatta con un tubo di metallo e un tondino appuntito.  
File: `assets/arene/wasteland/armi/lancia-ricavata-da-un-tubo.webp`

```text
A spear made from a metal pipe with a sharpened rebar tip, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra artigianale

Balestra artigianale fatta con balestre d'auto e rottami.  
File: `assets/arene/wasteland/armi/balestra-artigianale.webp`

```text
A homemade crossbow built from car leaf springs and scrap metal, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Molotov

Bottiglia molotov con lo straccio in fiamme.  
File: `assets/arene/wasteland/armi/molotov.webp`

```text
A molotov cocktail bottle with a burning rag, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Catena

Catena pesante arrotolata con un lucchetto.  
File: `assets/arene/wasteland/armi/catena.webp`

```text
A heavy coiled chain with a padlock, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mannaia

Mannaia grande con manico fasciato.  
File: `assets/arene/wasteland/armi/mannaia.webp`

```text
A large meat cleaver with a cloth-wrapped handle, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lanciachiodi

Sparachiodi modificato come arma, con caricatore a tamburo.  
File: `assets/arene/wasteland/armi/lanciachiodi.webp`

```text
A nail gun modified into a weapon with a drum magazine, single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/wasteland.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Liceo Spietato

Interrogazioni, gossip e alleanze da intervallo. Nessuno muore: si viene eliminati.

- **Atmosfera**: Liceo italiano in chiave satirica: rosa, lilla e pastello, luce di finestre a vetri, tono da commedia. Nessuna violenza, nessun sangue: le «minacce» sono caricature.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp)

### Luoghi · Liceo Spietato

#### Palestra

Palestra della scuola con parquet, canestri, funi e tappetini impilati.  
File: `assets/arene/liceo/luoghi/palestra.webp`

```text
A school gym with a wooden floor, basketball hoops, climbing ropes and stacked mats, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Mensa

Mensa scolastica rumorosa con tavoli lunghi, vassoi e il bancone del pranzo.  
File: `assets/arene/liceo/luoghi/mensa.webp`

```text
An empty school cafeteria after lunch, long tables, abandoned food trays and a steaming lunch counter, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Biblioteca

Biblioteca scolastica silenziosa con scaffali e tavoli da studio.  
File: `assets/arene/liceo/luoghi/biblioteca.webp`

```text
A quiet school library with bookshelves, study tables and green desk lamps, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Laboratorio di chimica

Laboratorio di chimica con becher, cappa aspirante e fiasche colorate che bollono.  
File: `assets/arene/liceo/luoghi/laboratorio-di-chimica.webp`

```text
A chemistry lab with beakers, a fume hood and colourful bubbling flasks, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Cortile

Cortile della scuola con panchine, un albero, motorini e zaini a terra.  
File: `assets/arene/liceo/luoghi/cortile.webp`

```text
The school courtyard with benches, a big tree, parked scooters and backpacks on the ground, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Aula magna

Aula magna con file di poltroncine, palco e microfono.  
File: `assets/arene/liceo/luoghi/aula-magna.webp`

```text
An assembly hall with rows of folding seats, a stage and a single microphone, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Liceo Spietato

#### Preside

Caricatura della Preside severa, braccia conserte, occhiali abbassati, sulla soglia.  
File: `assets/arene/liceo/pericoli/preside.webp`

```text
A caricature of a stern school principal, arms crossed, glasses lowered, standing in a doorway, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

#### Bidello di turno

Caricatura del bidello brontolone con mocio, secchio e mazzo di chiavi.  
File: `assets/arene/liceo/pericoli/bidello-di-turno.webp`

```text
A caricature of a grumpy school janitor with a mop, a bucket and a ring of keys, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

#### Ispezione a sorpresa

L'ispezione a sorpresa personificata: un ispettore con cartellina e lente che spunta da una porta.  
File: `assets/arene/liceo/pericoli/ispezione-a-sorpresa.webp`

```text
A caricature of a school inspector with a clipboard and a magnifying glass peeking through a door, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

#### Professoressa di matematica

Caricatura della prof di matematica con la penna rossa, lavagna con formule illeggibili alle spalle.  
File: `assets/arene/liceo/pericoli/professoressa-di-matematica.webp`

```text
A caricature of a strict math teacher holding a red pen, a blackboard with blurred unreadable formulas behind her, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

### Armi · Liceo Spietato

#### Gossip esplosivo

Smartphone con un fumetto di chat che esplode come un fuoco d'artificio.  
File: `assets/arene/liceo/armi/gossip-esplosivo.webp`

```text
A smartphone with a glowing chat bubble bursting out of it like a firework, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Foto imbarazzante

Polaroid con un'immagine imbarazzante sfocata e un bagliore rosa.  
File: `assets/arene/liceo/armi/foto-imbarazzante.webp`

```text
A polaroid photo showing a blurred embarrassing picture, with a pink glow, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Compito copiato

Compito in classe con un bigliettino nascosto che spunta.  
File: `assets/arene/liceo/armi/compito-copiato.webp`

```text
A folded test paper with a tiny rolled cheat sheet sticking out, scribbled lines instead of writing, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pallone da dodgeball

Pallone rosso da dodgeball con scie di movimento.  
File: `assets/arene/liceo/armi/pallone-da-dodgeball.webp`

```text
A red rubber dodgeball with motion streaks, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Registro rubato

Registro di classe spesso con il segnalibro a nastro.  
File: `assets/arene/liceo/armi/registro-rubato.webp`

```text
A thick class register book with a ribbon bookmark, plain cover, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Profilo falso

Smartphone con un profilo social finto e l'icona di una maschera.  
File: `assets/arene/liceo/armi/profilo-falso.webp`

```text
A smartphone showing a fake social profile with a disguise mask icon, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/liceo.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Ufficio Open Space

Riunioni infinite, fogli Excel e licenziamenti. Nessuno muore: si viene licenziati.

- **Atmosfera**: Open space aziendale in chiave satirica: verde petrolio, grigi, neon freddi, luce da monitor. Tono da commedia d'ufficio, nessuna violenza.
- **Riferimento di stile** (`--sref`): [https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp](https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp)

### Luoghi · Ufficio Open Space

#### Sala riunioni

Sala riunioni con tavolo di vetro lungo, sedie vuote, schermo del proiettore e lavagna.  
File: `assets/arene/ufficio/luoghi/sala-riunioni.webp`

```text
A meeting room with a long glass table, empty chairs, a projector screen and a whiteboard with blurred scribbles, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Open space

Open space sterminato con file di scrivanie, monitor e piante in vaso.  
File: `assets/arene/ufficio/luoghi/open-space.webp`

```text
A sprawling open-space office with rows of desks, monitors and potted plants, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Cucina

Angolo cucina con macchinetta del caffè, tazze, microonde e frigo pieno di bigliettini.  
File: `assets/arene/ufficio/luoghi/cucina.webp`

```text
The office kitchenette with a coffee machine, mugs, a microwave and a fridge covered in sticky notes, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Ufficio del direttore

Ufficio d'angolo del Direttore con poltrona di pelle, vetrata panoramica e premi sugli scaffali.  
File: `assets/arene/ufficio/luoghi/ufficio-del-direttore.webp`

```text
The director's corner office with a big leather chair, a panoramic window and trophies on shelves, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Sala stampanti

Stanzino delle stampanti con una fotocopiatrice inceppata che sputa fogli.  
File: `assets/arene/ufficio/luoghi/sala-stampanti.webp`

```text
A cramped printer room with a jammed copier spitting out paper, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

#### Parcheggio

Parcheggio aziendale sotterraneo con posti riservati e neon.  
File: `assets/arene/ufficio/luoghi/parcheggio.webp`

```text
An underground company car park with reserved spaces and fluorescent lights, wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 16:9 --s 250 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 300 --no text, letters, words, readable signs, logo, watermark, people, characters, frame, border
```

### Pericoli · Ufficio Open Space

#### Direttore generale

Caricatura dell'amministratore delegato in completo impeccabile, controluce davanti a una vetrata.  
File: `assets/arene/ufficio/pericoli/direttore-generale.webp`

```text
A caricature of a CEO in a sharp suit, silhouetted against a tall window, power pose, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

#### Ufficio Risorse umane

Caricatura di una persona delle Risorse umane con un sorriso di circostanza e una pila di cartelline.  
File: `assets/arene/ufficio/pericoli/ufficio-risorse-umane.webp`

```text
A caricature of an HR officer with a polite fake smile holding a stack of folders, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

#### Consulente esterno

Caricatura del consulente esterno con capelli impomatati, portatile e un grafico a torta olografico.  
File: `assets/arene/ufficio/pericoli/consulente-esterno.webp`

```text
A caricature of a slick external consultant with gelled hair, a laptop and a holographic pie chart, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

#### Riorganizzazione aziendale

La riorganizzazione personificata: un mostro di caselle e frecce di organigramma aggrovigliate.  
File: `assets/arene/ufficio/pericoli/riorganizzazione-aziendale.webp`

```text
A corporate reorganization personified as a tangled monster made of org-chart boxes and arrows, comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 4:3 --s 300 --chaos 8 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 250 --no text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person
```

### Armi · Ufficio Open Space

#### Mail in copia a tutti

Busta di una mail che si moltiplica in tante copie luminose.  
File: `assets/arene/ufficio/armi/mail-in-copia-a-tutti.webp`

```text
An email envelope multiplying into many glowing copies, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Report pieno di errori altrui

Report stampato coperto di segni rossi e post-it.  
File: `assets/arene/ufficio/armi/report-pieno-di-errori-altrui.webp`

```text
A printed report covered in red correction marks and colourful sticky notes, abstract scribbled lines, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Presentazione rubata

Chiavetta USB con una slide proiettata e una mascherina da ladro.  
File: `assets/arene/ufficio/armi/presentazione-rubata.webp`

```text
A USB stick projecting a slide, wearing a tiny burglar mask, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Badge clonato del capo

Badge col cordino e una sua copia identica luminosa.  
File: `assets/arene/ufficio/armi/badge-clonato-del-capo.webp`

```text
An ID badge on a lanyard with a glowing duplicate copy beside it, blank photo area, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Foglio Excel con le prove

Stampa di un foglio di calcolo con celle evidenziate e una lente.  
File: `assets/arene/ufficio/armi/foglio-excel-con-le-prove.webp`

```text
A spreadsheet printout with bright highlighted cells under a magnifying glass, abstract grid marks, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Nota spese gonfiata

Uno scontrino che si gonfia come un palloncino.  
File: `assets/arene/ufficio/armi/nota-spese-gonfiata.webp`

```text
A paper receipt inflating like a balloon, single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background, teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent, painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth --v 8.2 --ar 1:1 --s 150 --chaos 0 --sref https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/ufficio.webp --sw 120 --no text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```
