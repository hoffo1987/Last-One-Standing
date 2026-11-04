# Immagini e video delle arene con Midjourney v8.2

_Generato da `node tools/atlas-slots.js` a partire da `tools/atlas-brief.js`: per cambiare un testo o un prompt modifica il brief e rigenera, non questo file._

**Immagini presenti: 1 su 156** (luoghi 1/54, pericoli 0/35, armi 0/67). **Video presenti: 0 su 89** (luoghi e pericoli). Meteo, disastri e oggetti arriveranno dopo.

## 1. Lo stile

Il riferimento è la Cornucopia che hai generato: **concept art pittorica stilizzata**, pennellate espressive e visibili, piani sfaccettati (rocce, metallo, pietra), una luce calda e forte contro ombre fredde e profonde, nebbia di profondità. Ogni prompt segue la stessa struttura del tuo:

1. **la scena**: il soggetto e dove sta nell'inquadratura (sempre nel terzo centrale), poi il primo piano, poi lo sfondo;
2. **la frase di stile**, uguale per tutta la sezione (ambiente, personaggio o oggetto);
3. **la frase di luce dell'arena**, uguale per tutte le voci di quell'arena: è ciò che tiene insieme palette e atmosfera;
4. **i parametri**: solo `--v 8.2`, il formato `--ar` e le esclusioni `--no`. Nessun riferimento alle immagini del sito.

`--no` tiene fuori scritte, **firme** (nella Cornucopia è comparsa una firma finta in basso a destra), loghi, cornici e persone. Le esclusioni stanno solo lì: scritte dentro la frase («no people») Midjourney spesso le fa al contrario.

## 2. Impostazioni di Midjourney

Nel pannello **Settings** di midjourney.com (o con `/settings` su Discord), una volta sola:

| Impostazione | Valore | Perché |
| --- | --- | --- |
| **Version** | **8.2** | Il modello richiesto; è anche nel comando (`--v 8.2`). |
| **Stylization** | **100** (predefinito) | È il valore con cui è uscita la Cornucopia: i comandi non lo cambiano. |
| **Raw** | **spento** | Serve l'estetica pittorica di Midjourney, non quella «grezza». |
| **Weirdness** | **0** | Le immagini devono restare coerenti tra loro. |
| **Variety** | **0** | Le quattro proposte restano fedeli al prompt; se vuoi più idee per una voce, rilancia con Rerun. |
| **Personalization** | **la moodboard dello stile** (vedi sotto) | Tiene la pennellata uguale in tutte le arene. All'inizio, finché la moodboard non c'è, lasciala spenta. |
| **HD** | **acceso** (se il tuo piano lo prevede) | Esce più grande e nitida; la riduco io alle misure del sito. |
| **Speed** | Fast o Relax, **non Draft** | Draft è più grezza e non va d'accordo con l'HD. |

## 3. Fare di questo stile la base, su midjourney.com

**A. Una moodboard dello stile (consigliato, vale per tutte le arene).**

1. Vai in **Personalize → Moodboards** e crea una moodboard, per esempio «Last One Standing».
2. Aggiungici la Cornucopia (dalla tua galleria o caricandola).
3. Man mano che generi, aggiungi le immagini migliori di **arene diverse**: con 5–10 immagini varie la moodboard impara la pennellata e la luce, non i colori di un'arena sola.
4. Nel pannello Settings, alla voce **Personalization**, scegli quella moodboard: da quel momento Midjourney aggiunge da solo `--p` con il suo codice a ogni prompt.

**B. Un riferimento di stile per arena (per uniformare un'arena).**

1. Genera per prima la voce principale dell'arena (il primo luogo dell'elenco) e scegli la versione migliore.
2. Trascinala nella barra «Imagine» nella casella **Style reference** (oppure aprila e premi **Use → Style**). Resta agganciata ai prompt successivi.
3. Genera il resto dell'arena con il riferimento agganciato, poi **toglilo prima di passare all'arena successiva**, altrimenti ne trascina i colori.
4. Per l'Arena Classica puoi usare subito la Cornucopia. Se il riferimento copia troppo la composizione, abbassane il peso (`--sw 60` o `80` in fondo al comando; il predefinito è 100).

Le due cose si possono usare insieme: la moodboard dà lo stile comune, il riferimento dell'arena la sua palette.

## 4. I video d'ambiente in loop

Ogni luogo e ogni pericolo ha anche un **prompt per il video**: una scena quasi ferma con poche cose che respirano (nebbia, foglie, luci, fiamme, respiro delle creature), a camera fissa, che si ripete senza stacchi.

1. Apri l'immagine scelta e premi **Animate → Manual** (l'immagine diventa il fotogramma iniziale).
2. Incolla il prompt del video: contiene già **`--motion low`** (movimento lieve, adatto ai loop) e **`--loop`** (il fotogramma finale coincide con il primo, così il video ricomincia senza salti).
3. Se il tuo piano lo prevede, scegli **HD**. Delle quattro proposte prendi quella più calma; se qualcosa si muove troppo, rilancia (Rerun) invece di estendere il video.
4. Scarica l'MP4. Non serve allungarlo: pochi secondi in loop bastano.

**Le armi niente video**: stanno in piastrelle di 62 px e devono avere lo sfondo trasparente, che un video non può avere. Se vorrai un tocco di vita lì, aggiungo io un riflesso animato sul sito.

Sul sito i video partiranno da soli, muti e in loop, con l'immagine ferma mentre si caricano; chi ha chiesto di ridurre le animazioni vedrà solo l'immagine. Il supporto lo aggiungo io quando arrivano i primi video.

## 5. Cosa mandarmi e come procedere

1. Lavora **un'arena alla volta**, nella stessa sessione: prima i luoghi, poi i pericoli, poi le armi.
2. Per ogni voce scegli la migliore delle quattro proposte (vedi i consigli qui sotto), usa **Vary (Subtle)** per piccoli ritocchi, evita Vary (Strong).
3. Scarica le immagini in **PNG** e i video in **MP4**. Mandameli così come sono, dicendomi a quale voce corrispondono, oppure rinominali già con il nome indicato.
4. **Al resto penso io**: ritaglio alle proporzioni, riduzione alle misure del sito, scontorno delle armi, conversione (WebP per le immagini, video leggeri per il web), nomi e cartelle.

| Sezione | Formato | Misura finale sul sito | Video | Come sceglierla |
| --- | --- | --- | --- | --- |
| Luoghi | 16:9 | 1280 × 720 px | sì, loop | Scegli la proposta con il luogo **più riconoscibile al centro** e meno dettagli minuti: deve funzionare anche piccola. |
| Pericoli | 4:3 | 960 × 720 px | sì, loop | Scegli quella con il soggetto **centrato che guarda verso di te** e i bordi scuri. Nel Liceo e nell'Ufficio deve far sorridere, non paura. |
| Armi | 1:1 | 512 × 512 px | no | Scegli quella con **un solo oggetto intero**, ben staccato dal fondo grigio uniforme e senza ombra a terra: lo scontorno viene pulito. |

- **Luoghi**: Scheda della zona nel capitolo Mappa: in alto nella scheda, 16:9, larga circa 270 px al computer; sul telefono una colonna di circa 120 × 140 px, quindi si vede la **fascia centrale verticale**.
- **Pericoli**: Manifesto «ricercato» nel capitolo Mappa: carta avorio, puntina rossa, leggermente inclinato; immagine 4:3 larga circa 190 px al computer e 150 px sul telefono, con il nome scritto sotto dal sito.
- **Armi**: Rastrelliera dell'armeria: ogni arma sta in una piastrella di **62 × 62 px**, su fondo chiaro o scuro; per questo va scontornata (sfondo trasparente).

## Indice

| Arena | Luoghi | Pericoli | Armi |
| --- | --- | --- | --- |
| [Arena Classica](#arena-classica) | 6 | 4 | 10 |
| [Reame Incantato](#reame-incantato) | 6 | 4 | 8 |
| [Stazione Orbitale](#stazione-orbitale) | 6 | 4 | 7 |
| [Città degli Infetti](#città-degli-infetti) | 6 | 4 | 8 |
| [Isola Battle Royale](#isola-battle-royale) | 6 | 3 | 8 |
| [Villa Maledetta](#villa-maledetta) | 6 | 4 | 7 |
| [Terre Desolate](#terre-desolate) | 6 | 4 | 7 |
| [Liceo Spietato](#liceo-spietato) | 6 | 4 | 6 |
| [Ufficio Open Space](#ufficio-open-space) | 6 | 4 | 6 |

---

## Arena Classica

Boschi, fiumi e una Cornucopia piena di armi.

- **Atmosfera**: Bosco selvaggio al tramonto: ambra e ocra bruciata contro ombre indaco del crepuscolo, nebbia di profondità, sole enorme e luminoso.
- **Frase di luce dell'arena** (è già nei comandi): `Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog.`

### Luoghi · Arena Classica

#### ✓ Cornucopia

La Cornucopia dorata su un poggio di roccia, che rovescia casse, zaini, spade e faretre; un ruscello in primo piano.  
File: `assets/arene/classico/luoghi/cornucopia.webp` · video: `assets/arene/classico/luoghi/cornucopia.mp4`

**Immagine**

```text
A colossal hammered-gold horn-shaped cornucopia rests atop a tiered rocky mound in the central third of the frame. Wooden supply crates, canvas survival backpacks, steel swords and quivers of arrows spill out from its wide golden mouth onto the rocks and grass. A shallow winding stream cuts across the foreground, with a sword leaning against a crate on the left bank and two arrows stuck in the right bank. Dark pine forest silhouettes, tattered wooden battle standards and a large glowing sun fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Gentle heat shimmer above the golden horn, the stream ripples softly and sparkles with sunlight, tattered banners sway slightly in a light breeze, a few glowing embers and dust motes drift upward, thin fog slowly rolls between the distant pines. --motion low --loop
```

#### Bosco

Bosco antico e fitto all'imbrunire, lame di luce tra i tronchi e un sentiero nascosto.  
File: `assets/arene/classico/luoghi/bosco.webp` · video: `assets/arene/classico/luoghi/bosco.mp4`

**Immagine**

```text
A dense ancient pine forest at dusk, with a narrow hidden trail winding through the central third of the frame between towering mossy trunks. Ferns, fallen branches and a half-buried supply crate line the trail in the foreground. Long golden shafts of sunlight pierce the canopy and fade into layered silhouettes of pines in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Shafts of sunlight shimmer softly, ferns and leaves sway gently, tiny dust motes and pollen float through the light beams, low fog drifts slowly between the trunks. --motion low --loop
```

#### Fiume

Fiume tortuoso tra massi muschiosi, rapide basse e un tronco caduto che fa da ponte.  
File: `assets/arene/classico/luoghi/fiume.webp` · video: `assets/arene/classico/luoghi/fiume.mp4`

**Immagine**

```text
A winding river cuts through the central third of the frame between mossy faceted boulders, with shallow rapids reflecting the orange sky. A fallen pine log spans the water as a makeshift bridge. Reeds and pebbles crowd the near bank in the foreground, while dark pine silhouettes and a glowing low sun close the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Water flows gently over the rapids with soft glittering reflections, reeds sway slightly, a thin mist hovers over the river surface, a few leaves float slowly downstream. --motion low --loop
```

#### Paludi

Palude scura con canne, alberi morti contorti e nebbia bassa; qualche lucciola.  
File: `assets/arene/classico/luoghi/paludi.webp` · video: `assets/arene/classico/luoghi/paludi.mp4`

**Immagine**

```text
A murky marsh with black still water stretching through the central third of the frame, broken by twisted dead trees and clumps of tall reeds. A rotten wooden boardwalk sinks into the water in the foreground. Low banks of fog, faint fireflies and the silhouettes of drowned trees fill the background under a dying sunset. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Low fog creeps slowly across the water, fireflies blink and drift, reeds sway gently, faint ripples spread across the dark surface. --motion low --loop
```

#### Rovine

Rovine di un antico tempio in pietra invase dai rampicanti, colonne spezzate e un arco crollato.  
File: `assets/arene/classico/luoghi/rovine.webp` · video: `assets/arene/classico/luoghi/rovine.mp4`

**Immagine**

```text
The crumbling stone ruins of an ancient temple stand in the central third of the frame, with broken columns and a collapsed archway overgrown with vines. Scattered carved blocks, moss and a rusted shield lie in the foreground grass. Pine silhouettes and drifting haze fill the background behind the ruins. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Vines and grass sway softly in a light breeze, dust motes float in the warm light, a thin haze drifts slowly behind the columns. --motion low --loop
```

#### Altopiano

Altopiano roccioso spazzato dal vento, erba brinata e montagne lontane: il posto più freddo.  
File: `assets/arene/classico/luoghi/altopiano.webp` · video: `assets/arene/classico/luoghi/altopiano.mp4`

**Immagine**

```text
A windswept rocky highland plateau with a lone weathered stone outcrop in the central third of the frame. Sparse frosted grass and scattered faceted boulders cover the foreground. Distant jagged mountains, thin clouds and a cold pale sky fill the background, warmed only by the last edge of sunset. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Frosted grass bends gently in a steady wind, thin clouds drift slowly across the sky, a few snow flakes and dust particles float by. --motion low --loop
```

### Pericoli · Arena Classica

#### Branco di lupi mutanti

Branco di lupi mutanti con occhi ambra e chiazze di pelo metallico, che escono dagli alberi.  
File: `assets/arene/classico/pericoli/branco-di-lupi-mutanti.webp` · video: `assets/arene/classico/pericoli/branco-di-lupi-mutanti.mp4`

**Immagine**

```text
A pack of three mutated wolves with glowing amber eyes and patches of metallic fur stepping out of shadowy pines, the alpha in front with bared fangs and a scarred muzzle. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The wolves breathe slowly with subtle chest movement, their fur ripples in the wind, the amber eyes glint faintly, mist drifts behind them. --motion low --loop
```

#### Sciame di vespe velenose

Sciame di vespe giganti e velenose; una in primo piano col pungiglione in vista.  
File: `assets/arene/classico/pericoli/sciame-di-vespe-velenose.webp` · video: `assets/arene/classico/pericoli/sciame-di-vespe-velenose.mp4`

**Immagine**

```text
A menacing swarm of oversized venomous wasps with glowing yellow stripes, one wasp hovering in sharp focus in the foreground with its stinger curled forward. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The wasps hover in place with fast blurred wings, the swarm shifts gently behind, faint glowing pollen floats in the air. --motion low --loop
```

#### Orso affamato

Enorme orso bruno affamato, ritto sulle zampe posteriori, muso pieno di cicatrici.  
File: `assets/arene/classico/pericoli/orso-affamato.webp` · video: `assets/arene/classico/pericoli/orso-affamato.mp4`

**Immagine**

```text
A huge starving brown bear rearing up on its hind legs, scarred muzzle, ribs showing under matted fur, hungry eyes catching the sunset light. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The bear breathes heavily with slow chest movement, its fur stirs in the wind, warm breath steams faintly in the cold air. --motion low --loop
```

#### Serpente gigante

Serpente gigante dalle squame smeraldo, avvolto su sé stesso con la testa alzata.  
File: `assets/arene/classico/pericoli/serpente-gigante.webp` · video: `assets/arene/classico/pericoli/serpente-gigante.mp4`

**Immagine**

```text
A giant coiled serpent with emerald faceted scales raising its head, forked tongue out, slit-pupil eyes catching the sunset light. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The serpent sways its raised head very slowly, its tongue flicks occasionally, light glides across the scales, mist drifts behind. --motion low --loop
```

### Armi · Arena Classica

#### Coltello

Coltello da sopravvivenza con manico in cuoio.  
File: `assets/arene/classico/armi/coltello.webp`

**Immagine**

```text
A sturdy survival knife with a leather-wrapped handle and a clip-point steel blade. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Arco

Arco ricurvo in legno con una freccia incoccata.  
File: `assets/arene/classico/armi/arco.webp`

**Immagine**

```text
A wooden recurve bow with a taut string and one feathered arrow nocked. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia

Lancia da caccia con asta di frassino e punta a foglia.  
File: `assets/arene/classico/armi/lancia.webp`

**Immagine**

```text
A hunting spear with an ash-wood shaft and a leaf-shaped steel tip bound with cord. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia

Ascia da boscaiolo con manico consumato.  
File: `assets/arene/classico/armi/ascia.webp`

**Immagine**

```text
A woodcutter axe with a worn wooden handle and a chipped steel head. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Machete

Machete lungo, lama leggermente curva.  
File: `assets/arene/classico/armi/machete.webp`

**Immagine**

```text
A long machete with a slightly curved blade and a black rubber grip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Tridente

Tridente da pesca con asta di legno.  
File: `assets/arene/classico/armi/tridente.webp`

**Immagine**

```text
A three-pronged fishing trident with a wooden shaft and rope binding. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fionda

Fionda di legno a forcella con tasca di cuoio.  
File: `assets/arene/classico/armi/fionda.webp`

**Immagine**

```text
A forked wooden slingshot with rubber bands and a small leather pouch holding a pebble. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Spada corta

Spada corta tipo gladio, guardia semplice.  
File: `assets/arene/classico/armi/spada-corta.webp`

**Immagine**

```text
A short gladius-style sword with a simple crossguard and a wrapped grip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale

Pugnale sottile a doppio taglio.  
File: `assets/arene/classico/armi/pugnale.webp`

**Immagine**

```text
A slim double-edged dagger with a cord-wrapped hilt. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mazza

Clava di legno pesante con borchie di ferro.  
File: `assets/arene/classico/armi/mazza.webp`

**Immagine**

```text
A heavy wooden war club studded with iron rivets. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Reame Incantato

Draghi, rune e foreste che sussurrano.

- **Atmosfera**: Fiaba oscura di notte: viola, magenta e blu notte con bagliori magici turchesi e dorati, rune luminose, nebbie incantate.
- **Frase di luce dell'arena** (è già nei comandi): `Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist.`

### Luoghi · Reame Incantato

#### Torre in rovina

Torre di uno stregone mezza crollata, rune accese sui muri, luna enorme.  
File: `assets/arene/fantasy/luoghi/torre-in-rovina.webp` · video: `assets/arene/fantasy/luoghi/torre-in-rovina.mp4`

**Immagine**

```text
A ruined wizard tower of dark stone rises in the central third of the frame, half collapsed, with glowing violet runes carved along its walls. Fallen blocks, scattered spell books and a broken staff lie among the ferns in the foreground. A huge moon, drifting clouds and distant mountain silhouettes fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The runes pulse softly with violet light, tiny magical sparks float upward, clouds drift slowly across the moon, ferns sway gently. --motion low --loop
```

#### Foresta elfica

Foresta elfica di alberi giganti dalla corteccia argentata, lanterne appese e lucine sospese.  
File: `assets/arene/fantasy/luoghi/foresta-elfica.webp` · video: `assets/arene/fantasy/luoghi/foresta-elfica.mp4`

**Immagine**

```text
An elven forest of giant silver-barked trees with a graceful arched wooden bridge in the central third of the frame. Hanging lanterns and floating motes of light glow among the branches, while luminous flowers carpet the foreground. Layers of tall trees fade into turquoise mist in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Lanterns sway gently and glow softly, floating motes of light drift slowly, luminous flowers pulse faintly, mist moves slowly between the trees. --motion low --loop
```

#### Lago nebbioso

Lago incantato di notte, acqua a specchio, pontile di pietra e statua mezza sommersa.  
File: `assets/arene/fantasy/luoghi/lago-nebbioso.webp` · video: `assets/arene/fantasy/luoghi/lago-nebbioso.mp4`

**Immagine**

```text
A misty enchanted lake at night, its glassy water filling the frame, with a half-sunken stone statue of a queen in the central third. A small stone pier with a moored rowboat reaches in from the foreground. Pine silhouettes, a pale moon and banks of glowing mist close the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Soft mist drifts over the mirror-like water, gentle ripples spread around the statue, the rowboat rocks very slightly, moonlight shimmers on the surface. --motion low --loop
```

#### Miniere

Miniere naniche nella montagna: impalcature, binari con carrello, vene di cristallo luminose.  
File: `assets/arene/fantasy/luoghi/miniere.webp` · video: `assets/arene/fantasy/luoghi/miniere.mp4`

**Immagine**

```text
Dwarven mines carved deep into a mountain, with a minecart rail track curving into the central third of the frame. Wooden scaffolding, lanterns and pickaxes surround the tracks, and glowing turquoise crystal veins split the faceted rock walls. A vast dark cavern with distant lights fills the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Crystal veins pulse with a slow turquoise glow, lantern flames flicker gently, fine dust floats in the light, a faint haze drifts in the cavern. --motion low --loop
```

#### Palude stregata

Palude stregata con alberi storti, muschio pendente, capanna su palafitte e fuochi fatui verdi.  
File: `assets/arene/fantasy/luoghi/palude-stregata.webp` · video: `assets/arene/fantasy/luoghi/palude-stregata.mp4`

**Immagine**

```text
A haunted swamp of crooked trees and hanging moss, with a witch hut on stilts glowing at its window in the central third of the frame. Green will-o-wisps hover over black water and gnarled roots in the foreground. Thick violet fog and twisted silhouettes fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Will-o-wisps drift and bob slowly, moss sways gently, the hut window flickers warmly, fog creeps across the water. --motion low --loop
```

#### Picco del drago

Picco frastagliato con la tana del drago: rocce bruciate, mucchi d'oro, fumo che sale.  
File: `assets/arene/fantasy/luoghi/picco-del-drago.webp` · video: `assets/arene/fantasy/luoghi/picco-del-drago.mp4`

**Immagine**

```text
A jagged mountain peak crowned by a dragon lair, with a cave mouth glowing with heaps of gold coins in the central third of the frame. Scorched faceted rocks, old bones and a melted shield cover the foreground. Smoke rises into a starry violet night sky with distant peaks. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Smoke rises slowly from the lair, the gold glints softly, embers float upward, clouds drift across the stars. --motion low --loop
```

### Pericoli · Reame Incantato

#### Troll di caverna

Troll di caverna enorme, pelle grigia bitorzoluta, clava di pietra, occhi piccoli e luminosi.  
File: `assets/arene/fantasy/pericoli/troll-di-caverna.webp` · video: `assets/arene/fantasy/pericoli/troll-di-caverna.mp4`

**Immagine**

```text
A hulking cave troll with grey warty skin and a stone club, stooping in the mouth of a cave, small glowing eyes under a heavy brow. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The troll breathes slowly with heavy shoulders rising and falling, its eyes glow faintly, dust drifts from the cave ceiling. --motion low --loop
```

#### Viverna

Viverna con ali membranose spalancate e coda uncinata, appollaiata su una rupe.  
File: `assets/arene/fantasy/pericoli/viverna.webp` · video: `assets/arene/fantasy/pericoli/viverna.mp4`

**Immagine**

```text
A wyvern with leathery wings spread wide and a barbed tail, perched on a cliff edge, jaws open in a roar, moonlight on its scales. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The wyvern breathes slowly, its wing membranes flutter slightly in the wind, wisps of smoke curl from its jaws, clouds drift behind. --motion low --loop
```

#### Spettro errante

Spettro traslucido in vesti a brandelli, bagliore azzurro, occhi vuoti, nella nebbia.  
File: `assets/arene/fantasy/pericoli/spettro-errante.webp` · video: `assets/arene/fantasy/pericoli/spettro-errante.mp4`

**Immagine**

```text
A wandering translucent wraith in tattered robes, with a faint blue glow, hollow eyes and long fingers, drifting through mist. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The wraith floats in place with a slow hovering motion, its tattered robes ripple softly, the blue glow pulses, mist swirls gently. --motion low --loop
```

#### Branco di lupi mannari

Branco di lupi mannari sotto la luna piena, il capobranco in primo piano.  
File: `assets/arene/fantasy/pericoli/branco-di-lupi-mannari.webp` · video: `assets/arene/fantasy/pericoli/branco-di-lupi-mannari.mp4`

**Immagine**

```text
A pack of werewolves under a full moon, the alpha in front with bristling fur, bared fangs and glowing eyes, the others as silhouettes behind. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The werewolves breathe slowly, fur ripples in the wind, eyes glint, clouds drift slowly across the full moon. --motion low --loop
```

### Armi · Reame Incantato

#### Spada runica

Spada lunga con rune viola luminose sulla lama.  
File: `assets/arene/fantasy/armi/spada-runica.webp`

**Immagine**

```text
A longsword with glowing violet runes running along the blade. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Bastone magico

Bastone da mago nodoso con un cristallo luminoso sospeso in cima.  
File: `assets/arene/fantasy/armi/bastone-magico.webp`

**Immagine**

```text
A gnarled wizard staff topped with a floating glowing crystal. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Arco elfico

Arco lungo elfico in legno chiaro con intarsi d'argento a foglia.  
File: `assets/arene/fantasy/armi/arco-elfico.webp`

**Immagine**

```text
An elegant elven longbow of pale wood with leaf-shaped silver inlays. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia nanica

Ascia nanica a doppia lama con incisioni a intreccio.  
File: `assets/arene/fantasy/armi/ascia-nanica.webp`

**Immagine**

```text
A heavy double-bladed dwarven axe with engraved knotwork and a leather grip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale avvelenato

Pugnale ricurvo che gocciola veleno verde.  
File: `assets/arene/fantasy/armi/pugnale-avvelenato.webp`

**Immagine**

```text
A curved dagger dripping bright green poison. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Martello da guerra

Martello da guerra massiccio con testa in ferro incisa di rune.  
File: `assets/arene/fantasy/armi/martello-da-guerra.webp`

**Immagine**

```text
A massive war hammer with a rune-carved iron head. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra fantasy in legno scuro e ottone.  
File: `assets/arene/fantasy/armi/balestra.webp`

**Immagine**

```text
A fantasy crossbow of dark wood with brass fittings and a loaded bolt. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia incantata

Lancia sottile con la punta avvolta da una luce pallida.  
File: `assets/arene/fantasy/armi/lancia-incantata.webp`

**Immagine**

```text
A slender spear with an enchanted blade wreathed in pale light. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Stazione Orbitale

Ossigeno limitato, droni e un reattore instabile.

- **Atmosfera**: Stazione orbitale: ciano e blu elettrico su acciaio spazzolato, spie rosse d'allarme, la Terra o le stelle dai finestrini.
- **Frase di luce dell'arena** (è già nei comandi): `Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust.`

### Luoghi · Stazione Orbitale

#### Hangar

Hangar enorme con una navetta attraccata, container e il portellone aperto sulle stelle.  
File: `assets/arene/scifi/luoghi/hangar.webp` · video: `assets/arene/scifi/luoghi/hangar.mp4`

**Immagine**

```text
A vast spaceship hangar with a sleek docked shuttle in the central third of the frame. Stacked cargo containers, fuel hoses and a toolbox crowd the foreground deck. The open bay door at the back frames a field of stars and the curve of a blue planet. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Warning lights blink slowly, a faint mist of coolant drifts across the deck, distant stars twinkle, the planet glows softly. --motion low --loop
```

#### Serra idroponica

Serra idroponica: file di piante sotto luci viola, tubi d'acqua e una cupola di vetro.  
File: `assets/arene/scifi/luoghi/serra-idroponica.webp` · video: `assets/arene/scifi/luoghi/serra-idroponica.mp4`

**Immagine**

```text
A hydroponic greenhouse module under a glass dome, with rows of lush plants converging toward the central third of the frame under purple grow lights. Water pipes, spray nozzles and seed trays fill the foreground. Stars and the edge of the station show through the dome in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Fine water mist sprays softly, leaves sway gently in the airflow, grow lights hum with a subtle pulse, droplets glisten. --motion low --loop
```

#### Reattore

Il nucleo del reattore: sfera ciano incandescente in un anello d'acciaio, passerelle, allarmi.  
File: `assets/arene/scifi/luoghi/reattore.webp` · video: `assets/arene/scifi/luoghi/reattore.mp4`

**Immagine**

```text
The station reactor core, a glowing cyan sphere suspended inside a massive steel ring in the central third of the frame. Metal catwalks, warning stripes and thick cables run through the foreground. Vertical shafts and red alarm lights recede into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The core pulses with a slow cyan glow, energy arcs flicker faintly, warning lights blink, heat haze shimmers around the ring. --motion low --loop
```

#### Ponte di comando

Ponte di comando con console olografiche e una vetrata enorme sulla Terra.  
File: `assets/arene/scifi/luoghi/ponte-di-comando.webp` · video: `assets/arene/scifi/luoghi/ponte-di-comando.mp4`

**Immagine**

```text
The command bridge of an orbital station, with a captain chair facing a huge curved window onto Earth in the central third of the frame. Curved consoles with holographic displays line the foreground. Stars, a thin moon and the glowing horizon of the planet fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Holographic displays flicker and scroll softly, console lights blink, the planet drifts very slowly past the window, stars twinkle. --motion low --loop
```

#### Moduli abitativi

Moduli dell'equipaggio: cuccette, armadietti e un piccolo oblò rotondo.  
File: `assets/arene/scifi/luoghi/moduli-abitativi.webp` · video: `assets/arene/scifi/luoghi/moduli-abitativi.mp4`

**Immagine**

```text
Cramped crew living modules, with a round porthole showing the stars in the central third of the frame. Stacked bunks, personal lockers, a floating mug and a crumpled blanket fill the foreground. A narrow corridor with soft blue lights leads into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. A mug and small objects float slowly in zero gravity, the blanket drifts gently, stars move slowly past the porthole, lights flicker softly. --motion low --loop
```

#### Condotti di servizio

Condotti di servizio angusti con cavi, sfiati di vapore e luci d'emergenza.  
File: `assets/arene/scifi/luoghi/condotti-di-servizio.webp` · video: `assets/arene/scifi/luoghi/condotti-di-servizio.mp4`

**Immagine**

```text
Narrow service ducts packed with cables and pipes, converging toward a red-lit junction in the central third of the frame. Steam vents, grates and a dropped wrench fill the foreground. Flickering emergency lights recede down the tunnel into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Steam puffs gently from the vents, emergency lights flicker, cables sway slightly, a thin haze drifts down the tunnel. --motion low --loop
```

### Pericoli · Stazione Orbitale

#### Drone di sicurezza impazzito

Drone di sicurezza fuori controllo con un solo occhio rosso e rotori che sprizzano scintille.  
File: `assets/arene/scifi/pericoli/drone-di-sicurezza-impazzito.webp` · video: `assets/arene/scifi/pericoli/drone-di-sicurezza-impazzito.mp4`

**Immagine**

```text
A rogue security drone with a single glowing red eye and damaged rotors throwing sparks, hovering in a dark corridor, scratched armour plates. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The drone hovers with a gentle bob, rotors blur, small sparks fall occasionally, the red eye pulses slowly. --motion low --loop
```

#### Sciame di nanobot

Sciame argentato di nanobot che si avvita in una sagoma minacciosa.  
File: `assets/arene/scifi/pericoli/sciame-di-nanobot.webp` · video: `assets/arene/scifi/pericoli/sciame-di-nanobot.mp4`

**Immagine**

```text
A swirling silver swarm of nanobots forming a menacing face-like shape in the dark, glinting with cyan highlights. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The nanobot swarm swirls slowly and continuously, glints shimmer across it, the face shape holds steady. --motion low --loop
```

#### Creatura aliena dai tentacoli

Creatura aliena con tentacoli lucidi e macchie bioluminescenti che esce da una grata.  
File: `assets/arene/scifi/pericoli/creatura-aliena-dai-tentacoli.webp` · video: `assets/arene/scifi/pericoli/creatura-aliena-dai-tentacoli.mp4`

**Immagine**

```text
An alien creature with glossy tentacles and bioluminescent spots squeezing out of a vent grate, a cluster of glowing eyes in the middle. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The tentacles curl and uncurl very slowly, bioluminescent spots pulse softly, the eyes blink, mist drifts from the vent. --motion low --loop
```

#### Androide da combattimento

Androide da combattimento corazzato, visore acceso, pelle sintetica strappata.  
File: `assets/arene/scifi/pericoli/androide-da-combattimento.webp` · video: `assets/arene/scifi/pericoli/androide-da-combattimento.mp4`

**Immagine**

```text
A battle android with an armoured chassis, a glowing visor and torn synthetic skin revealing the metal skull, standing in a red-lit corridor. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The visor light scans slowly left to right, small sparks fizz from the torn skin, the red light pulses behind. --motion low --loop
```

### Armi · Stazione Orbitale

#### Fucile al plasma

Fucile al plasma affusolato con celle d'energia ciano.  
File: `assets/arene/scifi/armi/fucile-al-plasma.webp`

**Immagine**

```text
A sleek plasma rifle with glowing cyan energy cells. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lama vibrante

Lama vibrante con il filo traslucido che ronza.  
File: `assets/arene/scifi/armi/lama-vibrante.webp`

**Immagine**

```text
A vibro-blade with a humming translucent edge and a ribbed grip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola laser

Pistola laser compatta con emettitore rosso.  
File: `assets/arene/scifi/armi/pistola-laser.webp`

**Immagine**

```text
A compact laser pistol with a red emitter tip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Granata EMP

Granata EMP sferica con archi elettrici blu.  
File: `assets/arene/scifi/armi/granata-emp.webp`

**Immagine**

```text
A spherical EMP grenade with crackling blue electric arcs. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Frusta monofilamento

Frusta a monofilamento: impugnatura metallica e un filo luminoso quasi invisibile.  
File: `assets/arene/scifi/armi/frusta-monofilamento.webp`

**Immagine**

```text
A monofilament whip, a metal handle with a nearly invisible glowing line coiled around it. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Taser a impulsi

Taser a impulsi con elettrodi che crepitano.  
File: `assets/arene/scifi/armi/taser-a-impulsi.webp`

**Immagine**

```text
A pulse taser with crackling electrodes. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Cannone a rotaia portatile

Cannone a rotaia portatile con binari magnetici e calcio pesante.  
File: `assets/arene/scifi/armi/cannone-a-rotaia-portatile.webp`

**Immagine**

```text
A portable railgun with twin magnetic rails and a heavy stock. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Città degli Infetti

Ospedali vuoti, orde affamate e radio gracchianti.

- **Atmosfera**: Città abbandonata dopo il contagio: verdi malati e grigi su ruggine e cemento bagnato, neon tremolanti, smog basso.
- **Frase di luce dell'arena** (è già nei comandi): `Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog.`

### Luoghi · Città degli Infetti

#### Ospedale

Corridoio d'ospedale abbandonato con barelle rovesciate, luci tremolanti e porte barricate.  
File: `assets/arene/zombie/luoghi/ospedale.webp` · video: `assets/arene/zombie/luoghi/ospedale.mp4`

**Immagine**

```text
An abandoned hospital corridor leading to barricaded double doors in the central third of the frame. Overturned gurneys, scattered pill bottles and a toppled IV stand cover the foreground floor. Flickering ceiling lights and smeared windows recede into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Ceiling lights flicker irregularly, a torn curtain sways slightly, dust drifts in the light, the IV bag swings gently. --motion low --loop
```

#### Centro commerciale

Atrio di un centro commerciale saccheggiato: scale mobili rotte, carrelli, lucernari.  
File: `assets/arene/zombie/luoghi/centro-commerciale.webp` · video: `assets/arene/zombie/luoghi/centro-commerciale.mp4`

**Immagine**

```text
A looted shopping mall atrium with a broken escalator rising through the central third of the frame. Abandoned shopping trolleys, shattered glass and scattered goods fill the foreground. Dusty skylights pour pale light over empty shop fronts in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Pale light beams shift softly through the skylights, dust motes float, a loose sign sways slightly, a trolley rolls a few centimetres. --motion low --loop
```

#### Metropolitana

Banchina della metro al buio, treno deragliato, binari allagati, lampade d'emergenza.  
File: `assets/arene/zombie/luoghi/metropolitana.webp` · video: `assets/arene/zombie/luoghi/metropolitana.mp4`

**Immagine**

```text
A dark subway platform with a derailed train tilted across the tracks in the central third of the frame. Flooded rails, a fallen bench and scattered luggage fill the foreground. Emergency lamps glow along the tunnel into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Emergency lamps flicker, water drips and ripples slowly across the flooded tracks, a light haze drifts in the tunnel. --motion low --loop
```

#### Scuola

Corridoio di scuola vuoto, armadietti, fogli a terra, finestre sbarrate con assi.  
File: `assets/arene/zombie/luoghi/scuola.webp` · video: `assets/arene/zombie/luoghi/scuola.mp4`

**Immagine**

```text
An empty school hallway with a line of dented lockers leading to the central third of the frame. Loose papers, a dropped backpack and a basketball lie on the foreground floor. Windows boarded up with planks let thin beams of grey light into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Loose papers flutter slightly in a draft, thin light beams shimmer, a locker door swings very slowly, dust drifts. --motion low --loop
```

#### Stazione di polizia

Stazione di polizia fortificata: sacchi di sabbia, furgone blindato, fari.  
File: `assets/arene/zombie/luoghi/stazione-di-polizia.webp` · video: `assets/arene/zombie/luoghi/stazione-di-polizia.mp4`

**Immagine**

```text
A fortified police station with an armoured van parked in the central third of the frame. Sandbag walls, traffic cones and coils of barbed wire fill the foreground. Searchlights cut through the smog over the station facade in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Searchlights sweep slowly through the smog, a torn flag ripples gently, the van hazard lights blink. --motion low --loop
```

#### Periferia

Strada di periferia con auto abbandonate, prati incolti e fumo all'orizzonte.  
File: `assets/arene/zombie/luoghi/periferia.webp` · video: `assets/arene/zombie/luoghi/periferia.mp4`

**Immagine**

```text
A suburban street with a crashed car and an abandoned school bus in the central third of the frame. Overgrown lawns, a fallen mailbox and a tricycle fill the foreground. Rows of silent houses and a column of smoke on the horizon fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Smoke rises slowly on the horizon, tall grass sways, a swing creaks gently back and forth, clouds drift. --motion low --loop
```

### Pericoli · Città degli Infetti

#### Orda di zombi

Orda fitta di zombi che riempie una strada, tante mani protese in avanti.  
File: `assets/arene/zombie/pericoli/orda-di-zombi.webp` · video: `assets/arene/zombie/pericoli/orda-di-zombi.mp4`

**Immagine**

```text
A dense horde of shambling zombies filling a city street, the closest one in focus with milky eyes and torn clothes, many hands reaching forward. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The horde sways slowly in place, heads tilt, hands twitch, smog drifts between them. --motion low --loop
```

#### Infetto corridore

Infetto corridore pronto allo scatto, vestiti strappati, occhi folli.  
File: `assets/arene/zombie/pericoli/infetto-corridore.webp` · video: `assets/arene/zombie/pericoli/infetto-corridore.mp4`

**Immagine**

```text
A fast infected runner crouched and ready to sprint, torn clothes, veins dark under pale skin, wild glowing eyes. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The runner breathes rapidly with small shoulder movements, its head twitches, torn clothes flutter, smog drifts behind. --motion low --loop
```

#### Cane infetto

Cane infetto con pelo a chiazze, denti scoperti e occhi lattiginosi.  
File: `assets/arene/zombie/pericoli/cane-infetto.webp` · video: `assets/arene/zombie/pericoli/cane-infetto.mp4`

**Immagine**

```text
An infected dog with patchy fur, bared teeth and milky eyes, a broken collar around its neck, growling low. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The dog growls with slow heavy breathing, lips quiver, fur bristles in the wind. --motion low --loop
```

#### Gigante mutato

Gigante mutato con muscoli gonfi ed escrescenze ossee che sfonda un muro.  
File: `assets/arene/zombie/pericoli/gigante-mutato.webp` · video: `assets/arene/zombie/pericoli/gigante-mutato.mp4`

**Immagine**

```text
A towering mutated giant with swollen muscles and bone growths bursting through a brick wall, dust and bricks around its shoulders. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The giant breathes heavily with slow chest movement, dust and small bricks crumble down, its eyes glow faintly. --motion low --loop
```

### Armi · Città degli Infetti

#### Mazza chiodata

Mazza da baseball avvolta nel filo spinato e nei chiodi.  
File: `assets/arene/zombie/armi/mazza-chiodata.webp`

**Immagine**

```text
A baseball bat wrapped in barbed wire and studded with nails. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile a pompa

Fucile a pompa con il calcio rattoppato col nastro.  
File: `assets/arene/zombie/armi/fucile-a-pompa.webp`

**Immagine**

```text
A pump-action shotgun with a duct-taped stock. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Piede di porco

Piede di porco in acciaio rosso.  
File: `assets/arene/zombie/armi/piede-di-porco.webp`

**Immagine**

```text
A red steel crowbar with scuffed paint. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Motosega

Motosega con il corpo arancione graffiato.  
File: `assets/arene/zombie/armi/motosega.webp`

**Immagine**

```text
A chainsaw with a scratched orange body. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Katana

Katana con l'impugnatura consumata.  
File: `assets/arene/zombie/armi/katana.webp`

**Immagine**

```text
A katana with a worn wrapped handle. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra moderna da caccia con mirino.  
File: `assets/arene/zombie/armi/balestra.webp`

**Immagine**

```text
A modern hunting crossbow with a scope. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola

Pistola semiautomatica malridotta.  
File: `assets/arene/zombie/armi/pistola.webp`

**Immagine**

```text
A battered semi-automatic pistol. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Accetta

Accetta con impugnatura in gomma.  
File: `assets/arene/zombie/armi/accetta.webp`

**Immagine**

```text
A hatchet with a rubber grip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Isola Battle Royale

Un aereo, cento casse e una zona che si stringe.

- **Atmosfera**: Isola tropicale da battle royale: mare turchese, verde giungla, riflessi arancio del tardo pomeriggio, ombre blu, foschia marina.
- **Frase di luce dell'arena** (è già nei comandi): `Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze.`

### Luoghi · Isola Battle Royale

#### Aeroporto

Piccolo aeroporto dell'isola con pista, un cargo arrugginito e la torre di controllo.  
File: `assets/arene/royale/luoghi/aeroporto.webp` · video: `assets/arene/royale/luoghi/aeroporto.mp4`

**Immagine**

```text
A small island airport with a rusty cargo plane parked on the runway in the central third of the frame. Supply crates, a fuel cart and a windsock fill the foreground. A control tower, palm trees and the turquoise sea fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The windsock flutters gently, palm fronds sway, heat haze shimmers over the runway, clouds drift slowly. --motion low --loop
```

#### Base militare

Base militare con tende, torrette, casse di rifornimento ed eliporto.  
File: `assets/arene/royale/luoghi/base-militare.webp` · video: `assets/arene/royale/luoghi/base-militare.mp4`

**Immagine**

```text
A military base with a helipad and a parked helicopter in the central third of the frame. Supply crates, sandbags and camouflage nets fill the foreground. Watchtowers, tents and jungle hills fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Camouflage nets ripple in the breeze, a flag waves gently, a searchlight turns slowly, dust drifts. --motion low --loop
```

#### Villaggio costiero

Villaggio di pescatori con case colorate, pontile di legno e barche.  
File: `assets/arene/royale/luoghi/villaggio-costiero.webp` · video: `assets/arene/royale/luoghi/villaggio-costiero.mp4`

**Immagine**

```text
A coastal fishing village with a long wooden pier and moored boats in the central third of the frame. Fishing nets, buoys and a stack of crates fill the foreground. Colourful houses, palm trees and the sea fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Boats bob gently on the water, small waves lap the pier, nets sway, seagulls glide slowly in the distance. --motion low --loop
```

#### Centrale elettrica

Centrale elettrica con torri di raffreddamento, tralicci e trasformatori.  
File: `assets/arene/royale/luoghi/centrale-elettrica.webp` · video: `assets/arene/royale/luoghi/centrale-elettrica.mp4`

**Immagine**

```text
A power plant with two cooling towers releasing steam in the central third of the frame. Humming transformers, fences and blank warning signs fill the foreground. Electricity pylons and jungle hills fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Steam rises slowly from the cooling towers, transformer lights blink, wires sway slightly, heat haze shimmers. --motion low --loop
```

#### Fattoria

Fattoria con fienile rosso, balle di fieno, silos e campi di grano.  
File: `assets/arene/royale/luoghi/fattoria.webp` · video: `assets/arene/royale/luoghi/fattoria.mp4`

**Immagine**

```text
A farm with a red barn, a tall silo and an old windmill in the central third of the frame. Hay bales, a rusty tractor and a wooden fence fill the foreground. Golden wheat fields and a line of palm trees fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Wheat sways in gentle waves, the windmill turns slowly, a barn door creaks slightly, dust floats in the light. --motion low --loop
```

#### Foresta

Foresta tropicale rigogliosa con palme, felci e una cassa di rifornimento nascosta.  
File: `assets/arene/royale/luoghi/foresta.webp` · video: `assets/arene/royale/luoghi/foresta.mp4`

**Immagine**

```text
A lush tropical forest with a glowing supply crate in a small clearing in the central third of the frame. Giant ferns, roots and fallen palm fronds fill the foreground. Tall palms, vines and shafts of light fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Shafts of sunlight shimmer, leaves sway, the crate glows with a slow pulse, small insects and pollen float. --motion low --loop
```

### Pericoli · Isola Battle Royale

#### Drone armato

Drone quadricottero armato con mitragliatrice e laser di puntamento rosso.  
File: `assets/arene/royale/pericoli/drone-armato.webp` · video: `assets/arene/royale/pericoli/drone-armato.mp4`

**Immagine**

```text
An armed quadcopter drone with a mounted gun and a red targeting laser, hovering over the jungle, camera lens glowing. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The drone hovers with a gentle bob, the rotors blur, the red laser sweeps slowly, leaves sway below. --motion low --loop
```

#### Elicottero da caccia

Elicottero d'attacco in volo basso con il faro acceso.  
File: `assets/arene/royale/pericoli/elicottero-da-caccia.webp` · video: `assets/arene/royale/pericoli/elicottero-da-caccia.mp4`

**Immagine**

```text
An attack helicopter hovering low over the jungle with its searchlight on, cockpit glowing, seen head-on. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The helicopter hovers in place with blurred rotors, the searchlight sways slowly, palm trees bend in the downdraft. --motion low --loop
```

#### Cane da guardia addestrato

Pastore tedesco da guardia con giubbotto tattico, che abbaia.  
File: `assets/arene/royale/pericoli/cane-da-guardia-addestrato.webp` · video: `assets/arene/royale/pericoli/cane-da-guardia-addestrato.mp4`

**Immagine**

```text
A trained German shepherd guard dog in a tactical vest, ears up, barking at the viewer, a leash trailing on the ground. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The dog breathes with its tongue out between barks, ears twitch, the vest straps shift slightly. --motion low --loop
```

### Armi · Isola Battle Royale

#### Fucile d'assalto

Fucile d'assalto con mirino a punto rosso.  
File: `assets/arene/royale/armi/fucile-dassalto.webp`

**Immagine**

```text
An assault rifle with a red-dot sight. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola

Pistola semiautomatica nera.  
File: `assets/arene/royale/armi/pistola.webp`

**Immagine**

```text
A black semi-automatic pistol. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile da cecchino

Fucile da cecchino con cannocchiale lungo e bipiede.  
File: `assets/arene/royale/armi/fucile-da-cecchino.webp`

**Immagine**

```text
A sniper rifle with a long scope and a folded bipod. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile a pompa

Fucile a pompa tattico.  
File: `assets/arene/royale/armi/fucile-a-pompa.webp`

**Immagine**

```text
A tactical pump shotgun. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Granata

Granata a frammentazione con la spoletta.  
File: `assets/arene/royale/armi/granata.webp`

**Immagine**

```text
A fragmentation grenade with its pin. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mitraglietta

Mitraglietta compatta.  
File: `assets/arene/royale/armi/mitraglietta.webp`

**Immagine**

```text
A compact submachine gun. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Coltello da combattimento

Coltello da combattimento con dorso seghettato.  
File: `assets/arene/royale/armi/coltello-da-combattimento.webp`

**Immagine**

```text
A combat knife with a serrated spine. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra tattica mimetica.  
File: `assets/arene/royale/armi/balestra.webp`

**Immagine**

```text
A tactical crossbow with a camouflage pattern. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Villa Maledetta

Specchi che sussurrano e porte che si chiudono da sole.

- **Atmosfera**: Villa gotica maledetta: luce lunare cremisi e oro di candela contro ombre nere, nebbia fredda strisciante. Paura sottile, niente sangue esplicito.
- **Frase di luce dell'arena** (è già nei comandi): `Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog.`

### Luoghi · Villa Maledetta

#### Cantina

Cantina umida con botti piene di ragnatele, una lampadina che oscilla e una porta socchiusa.  
File: `assets/arene/horror/luoghi/cantina.webp` · video: `assets/arene/horror/luoghi/cantina.mp4`

**Immagine**

```text
A damp wine cellar with a heavy wooden door left ajar in the central third of the frame, a sliver of red light behind it. Cobwebbed barrels, broken bottles and stone steps fill the foreground. A single bare bulb hangs from vaulted brick arches in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The bulb swings very slowly and flickers, cobwebs sway, dust drifts in the light, the door creaks slightly. --motion low --loop
```

#### Soffitta

Soffitta polverosa con mobili coperti da teli, un cavallo a dondolo e luna da un oblò.  
File: `assets/arene/horror/luoghi/soffitta.webp` · video: `assets/arene/horror/luoghi/soffitta.mp4`

**Immagine**

```text
A dusty attic with an old rocking horse in the central third of the frame, lit by moonlight through a round window. Sheet-covered furniture, a cracked mirror and old trunks fill the foreground. Slanted roof beams and hanging cobwebs fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The rocking horse rocks almost imperceptibly, sheets ripple slightly, dust floats in the moonbeam. --motion low --loop
```

#### Cappella

Cappella gotica privata con candele, vetrate rotte e panche vuote.  
File: `assets/arene/horror/luoghi/cappella.webp` · video: `assets/arene/horror/luoghi/cappella.mp4`

**Immagine**

```text
A private gothic chapel with a candle-lit altar in the central third of the frame beneath a broken stained glass window. Empty wooden pews and fallen candlesticks fill the foreground. Tall arches and crimson moonlight through the glass fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Candle flames flicker gently, smoke curls upward, coloured moonlight shifts slowly on the floor. --motion low --loop
```

#### Cimitero

Cimitero incolto con lapidi storte, cancello di ferro e nebbia sotto una luna rossa.  
File: `assets/arene/horror/luoghi/cimitero.webp` · video: `assets/arene/horror/luoghi/cimitero.mp4`

**Immagine**

```text
An overgrown cemetery with a wrought iron gate standing open in the central third of the frame. Leaning tombstones, dead flowers and a lantern fill the foreground. A red moon, a dead tree and the mansion silhouette fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Fog creeps slowly between the graves, the gate sways slightly, the lantern flickers, crows shift on the dead tree. --motion low --loop
```

#### Biblioteca

Biblioteca antica con scaffali altissimi, polvere sospesa e un libro aperto sul leggio.  
File: `assets/arene/horror/luoghi/biblioteca.webp` · video: `assets/arene/horror/luoghi/biblioteca.mp4`

**Immagine**

```text
A grand old library with a book lying open on a lectern in the central third of the frame. Stacks of books, a candelabra and a fallen ladder fill the foreground. Towering shelves and a spiral staircase vanish into darkness in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Book pages turn slowly by themselves, candle flames flicker, dust floats in the light, shadows shift. --motion low --loop
```

#### Serra

Serra vittoriana in rovina con vetri rotti, piante carnivore e rampicanti.  
File: `assets/arene/horror/luoghi/serra.webp` · video: `assets/arene/horror/luoghi/serra.mp4`

**Immagine**

```text
A derelict Victorian greenhouse with a cracked central fountain in the central third of the frame. Shattered glass, overturned pots and carnivorous plants fill the foreground. Creeping vines and broken iron frames against a red moon fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Carnivorous plants open and close very slowly, vines sway, fog drifts through the broken panes. --motion low --loop
```

### Pericoli · Villa Maledetta

#### Spettro urlante

Fantasma che urla con la bocca innaturalmente allungata e capelli pallidi fluttuanti.  
File: `assets/arene/horror/pericoli/spettro-urlante.webp` · video: `assets/arene/horror/pericoli/spettro-urlante.mp4`

**Immagine**

```text
A screaming ghost with an unnaturally stretched mouth and pale floating hair, glowing white against the darkness, translucent hands raised. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The ghost hovers with a slow floating motion, its hair drifts as if underwater, the glow pulses softly. --motion low --loop
```

#### Bambola posseduta

Bambola di porcellana col viso incrinato e un occhio di vetro, seduta su una sedia.  
File: `assets/arene/horror/pericoli/bambola-posseduta.webp` · video: `assets/arene/horror/pericoli/bambola-posseduta.mp4`

**Immagine**

```text
A porcelain doll with a cracked face and one glass eye sitting in a small wooden chair, lace dress, slightly too alive. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The doll head turns very slowly by a few degrees, its glass eye glints, the chair rocks almost imperceptibly. --motion low --loop
```

#### Entità senza volto

Entità alta e senza volto in un corridoio buio, braccia troppo lunghe.  
File: `assets/arene/horror/pericoli/entita-senza-volto.webp` · video: `assets/arene/horror/pericoli/entita-senza-volto.mp4`

**Immagine**

```text
A tall faceless entity in a black suit standing at the end of a dark corridor, unnaturally long arms hanging at its sides. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The entity stands still while its shape subtly flickers, the corridor light buzzes and dims, fog crawls at its feet. --motion low --loop
```

#### Stormo di corvi

Stormo di corvi su un albero morto; uno fissa chi guarda.  
File: `assets/arene/horror/pericoli/stormo-di-corvi.webp` · video: `assets/arene/horror/pericoli/stormo-di-corvi.mp4`

**Immagine**

```text
A flock of crows perched on a dead tree under a red moon, one crow in front staring straight at the viewer. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The crows shift and ruffle their feathers, one tilts its head, a few feathers drift down, clouds pass the moon. --motion low --loop
```

### Armi · Villa Maledetta

#### Candelabro d'argento

Candelabro d'argento pesante con tre candele che colano.  
File: `assets/arene/horror/armi/candelabro-dargento.webp`

**Immagine**

```text
A heavy silver candelabra with three dripping candles. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia

Vecchia ascia arrugginita.  
File: `assets/arene/horror/armi/ascia.webp`

**Immagine**

```text
An old rusted axe with a cracked wooden handle. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile da caccia

Doppietta da caccia con calcio in legno.  
File: `assets/arene/horror/armi/fucile-da-caccia.webp`

**Immagine**

```text
A double-barrelled hunting shotgun with a wooden stock. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale rituale

Pugnale rituale con elsa d'osso e simboli incisi.  
File: `assets/arene/horror/armi/pugnale-rituale.webp`

**Immagine**

```text
A ritual dagger with a bone hilt and engraved occult symbols. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Crocifisso appuntito

Crocifisso di legno appuntito come un paletto.  
File: `assets/arene/horror/armi/crocifisso-appuntito.webp`

**Immagine**

```text
A wooden crucifix sharpened into a stake at the bottom. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Attizzatoio

Attizzatoio da camino in ferro battuto.  
File: `assets/arene/horror/armi/attizzatoio.webp`

**Immagine**

```text
A wrought iron fireplace poker with a hooked tip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Falce

Falce da contadino con la lama lunga e curva.  
File: `assets/arene/horror/armi/falce.webp`

**Immagine**

```text
A farmer scythe with a long curved blade. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Terre Desolate

Polvere radioattiva, predoni e motori truccati.

- **Atmosfera**: Deserto post-atomico: sole bruciante su sabbia ocra e lamiere arrugginite, riflessi arancio, ombre terra d'ombra, foschia di polvere.
- **Frase di luce dell'arena** (è già nei comandi): `Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust.`

### Luoghi · Terre Desolate

#### Discarica

Enorme sfasciacarrozze di auto arrugginite, pneumatici e rottami sotto un sole velato.  
File: `assets/arene/wasteland/luoghi/discarica.webp` · video: `assets/arene/wasteland/luoghi/discarica.mp4`

**Immagine**

```text
A vast scrapyard with a towering pile of crushed cars in the central third of the frame. Old tyres, oil drums and a rusted car door fill the foreground. A rusted crane and a hazy sun fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Heat haze shimmers, a loose sheet of metal flaps slowly, dust blows across the ground, the crane hook sways. --motion low --loop
```

#### Autostrada spezzata

Cavalcavia autostradale crollato nel deserto, camion abbandonati.  
File: `assets/arene/wasteland/luoghi/autostrada-spezzata.webp` · video: `assets/arene/wasteland/luoghi/autostrada-spezzata.mp4`

**Immagine**

```text
A broken highway overpass collapsed into the desert, its snapped span hanging in the central third of the frame. Abandoned trucks, cracked asphalt and road barriers fill the foreground. Endless dunes and a blazing sun fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Sand blows slowly across the asphalt, heat haze shimmers, a torn tarp flaps on a truck. --motion low --loop
```

#### Raffineria

Raffineria arrugginita con torce di gas accese e un intrico di tubi.  
File: `assets/arene/wasteland/luoghi/raffineria.webp` · video: `assets/arene/wasteland/luoghi/raffineria.mp4`

**Immagine**

```text
A rusted oil refinery with a burning flare stack in the central third of the frame. Tangled pipes, valves and oil barrels fill the foreground. Storage tanks and black smoke against an orange sky fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The flare flame flickers and dances, smoke rises slowly, steam leaks from a valve, heat haze shimmers. --motion low --loop
```

#### Città fantasma

Città fantasma con edifici mezzi sepolti, cartelloni sbiaditi e rotolacampo.  
File: `assets/arene/wasteland/luoghi/citta-fantasma.webp` · video: `assets/arene/wasteland/luoghi/citta-fantasma.mp4`

**Immagine**

```text
A ghost town main street with a half-buried diner in the central third of the frame. Tumbleweeds, a dead traffic light and drifting sand fill the foreground. Faded blank billboards and broken buildings fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Tumbleweeds roll slowly, sand drifts in the wind, a hanging sign sways, the dead traffic light dangles. --motion low --loop
```

#### Cratere

Cratere radioattivo enorme con pozze che brillano di verde.  
File: `assets/arene/wasteland/luoghi/cratere.webp` · video: `assets/arene/wasteland/luoghi/cratere.mp4`

**Immagine**

```text
A huge radioactive crater with glowing green pools at its centre in the central third of the frame. Warning barrels, cracked rocks and the skeleton of a car fill the foreground rim. A toxic yellow sky and distant ruins fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The green pools pulse and bubble softly, toxic vapour rises slowly, dust drifts across the rim. --motion low --loop
```

#### Diga

Diga di cemento gigante incrinata, con un insediamento di fortuna in cima.  
File: `assets/arene/wasteland/luoghi/diga.webp` · video: `assets/arene/wasteland/luoghi/diga.mp4`

**Immagine**

```text
A giant cracked concrete dam with a makeshift settlement of shacks and flags on top in the central third of the frame. A dry riverbed, rusted pipes and a boat wreck fill the foreground. A thin waterfall leaks through a crack against a dusty sky in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Water trickles through the crack, flags flutter on the shacks, dust drifts, smoke rises from a chimney. --motion low --loop
```

### Pericoli · Terre Desolate

#### Banda di predoni

Banda di predoni con armature di cuoio chiodato e occhialoni, accanto a buggy truccati.  
File: `assets/arene/wasteland/pericoli/banda-di-predoni.webp` · video: `assets/arene/wasteland/pericoli/banda-di-predoni.mp4`

**Immagine**

```text
A gang of raiders in spiked leather armour and goggles standing in front of modified buggies, the leader in front with a mohawk and a face mask. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The raiders breathe and shift their weight slightly, scarves flutter in the wind, dust blows past, engine heat shimmers. --motion low --loop
```

#### Scorpione gigante

Scorpione gigante del deserto col pungiglione alzato.  
File: `assets/arene/wasteland/pericoli/scorpione-gigante.webp` · video: `assets/arene/wasteland/pericoli/scorpione-gigante.mp4`

**Immagine**

```text
A giant desert scorpion with its stinger raised and claws open, armoured faceted chitin shining in the harsh sun. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The scorpion stinger sways slowly, claws twitch, sand trickles off its shell. --motion low --loop
```

#### Branco di cani mutati

Branco di cani mutati senza pelo, con occhi in più, che ringhiano.  
File: `assets/arene/wasteland/pericoli/branco-di-cani-mutati.webp` · video: `assets/arene/wasteland/pericoli/branco-di-cani-mutati.mp4`

**Immagine**

```text
A pack of hairless mutated dogs with extra eyes and scarred skin, growling at the viewer in the dust. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The dogs pant and growl with slow breathing, their eyes blink out of sync, dust drifts. --motion low --loop
```

#### Verme delle sabbie

Verme delle sabbie colossale che erompe dalle dune, bocca circolare piena di denti.  
File: `assets/arene/wasteland/pericoli/verme-delle-sabbie.webp` · video: `assets/arene/wasteland/pericoli/verme-delle-sabbie.mp4`

**Immagine**

```text
A colossal sandworm bursting out of the dunes, a circular mouth full of teeth facing the viewer, sand pouring from its body. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The worm sways slowly, sand pours continuously from its body, the rings of teeth ripple, dust swirls. --motion low --loop
```

### Armi · Terre Desolate

#### Fucile arrugginito

Fucile a otturatore arrugginito con mirino legato col nastro.  
File: `assets/arene/wasteland/armi/fucile-arrugginito.webp`

**Immagine**

```text
A rusty bolt-action rifle with a scope held on by tape. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia ricavata da un tubo

Lancia fatta con un tubo di metallo e un tondino appuntito.  
File: `assets/arene/wasteland/armi/lancia-ricavata-da-un-tubo.webp`

**Immagine**

```text
A spear made from a metal pipe with a sharpened rebar tip. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra artigianale

Balestra artigianale fatta con balestre d'auto e rottami.  
File: `assets/arene/wasteland/armi/balestra-artigianale.webp`

**Immagine**

```text
A homemade crossbow built from car leaf springs and scrap metal. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Molotov

Bottiglia molotov con lo straccio in fiamme.  
File: `assets/arene/wasteland/armi/molotov.webp`

**Immagine**

```text
A molotov cocktail bottle with a burning rag. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Catena

Catena pesante arrotolata con un lucchetto.  
File: `assets/arene/wasteland/armi/catena.webp`

**Immagine**

```text
A heavy coiled chain with a padlock. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mannaia

Mannaia grande con manico fasciato.  
File: `assets/arene/wasteland/armi/mannaia.webp`

**Immagine**

```text
A large meat cleaver with a cloth-wrapped handle. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lanciachiodi

Sparachiodi modificato come arma, con caricatore a tamburo.  
File: `assets/arene/wasteland/armi/lanciachiodi.webp`

**Immagine**

```text
A nail gun modified into a weapon with a drum magazine. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Liceo Spietato

Interrogazioni, gossip e alleanze da intervallo. Nessuno muore: si viene eliminati.

- **Atmosfera**: Liceo italiano in chiave satirica: luce pastello rosa e lilla dalle finestre alte, riflessi dorati, ombre viola morbide. Nessuna violenza: le «minacce» sono caricature.
- **Frase di luce dell'arena** (è già nei comandi): `Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood.`

### Luoghi · Liceo Spietato

#### Palestra

Palestra della scuola con parquet, canestri, funi e tappetini impilati.  
File: `assets/arene/liceo/luoghi/palestra.webp` · video: `assets/arene/liceo/luoghi/palestra.mp4`

**Immagine**

```text
A school gym with a basketball hoop above a polished wooden floor in the central third of the frame. Stacked mats, a forgotten dodgeball and a bench fill the foreground. Climbing ropes and tall windows fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Climbing ropes sway gently, light beams shimmer through the windows, dust floats, the ball rolls a little. --motion low --loop
```

#### Mensa

Mensa scolastica dopo pranzo: tavoli lunghi, vassoi abbandonati, bancone fumante.  
File: `assets/arene/liceo/luoghi/mensa.webp` · video: `assets/arene/liceo/luoghi/mensa.mp4`

**Immagine**

```text
An empty school cafeteria after lunch, with a steaming lunch counter in the central third of the frame. Long tables with abandoned food trays and a spilled juice box fill the foreground. Tall windows and colourful blank posters fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Steam rises softly from the counter, light beams shimmer, a napkin flutters, dust floats. --motion low --loop
```

#### Biblioteca

Biblioteca scolastica silenziosa con scaffali e tavoli da studio.  
File: `assets/arene/liceo/luoghi/biblioteca.webp` · video: `assets/arene/liceo/luoghi/biblioteca.mp4`

**Immagine**

```text
A quiet school library with a study table under a green desk lamp in the central third of the frame. Piles of textbooks, a forgotten backpack and scattered notes fill the foreground. Tall bookshelves and arched windows fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Pages flutter slightly, dust drifts in the light, the lamp glows softly, light shifts slowly through the windows. --motion low --loop
```

#### Laboratorio di chimica

Laboratorio di chimica con becher, cappa aspirante e fiasche colorate che bollono.  
File: `assets/arene/liceo/luoghi/laboratorio-di-chimica.webp` · video: `assets/arene/liceo/luoghi/laboratorio-di-chimica.mp4`

**Immagine**

```text
A chemistry lab with a bench of colourful bubbling flasks in the central third of the frame. Beakers, test tubes and a Bunsen burner fill the foreground. A fume hood and a colourful wall chart of blank squares fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The flasks bubble softly, coloured vapour rises slowly, the burner flame flickers. --motion low --loop
```

#### Cortile

Cortile della scuola con panchine, un albero, motorini e zaini a terra.  
File: `assets/arene/liceo/luoghi/cortile.webp` · video: `assets/arene/liceo/luoghi/cortile.mp4`

**Immagine**

```text
The school courtyard with a big tree and a bench in the central third of the frame. Parked scooters and backpacks on the ground fill the foreground. The school facade with tall windows fills the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Leaves rustle and a few drift down, dappled sunlight moves on the ground, a ribbon on a scooter flutters. --motion low --loop
```

#### Aula magna

Aula magna con file di poltroncine, palco e microfono.  
File: `assets/arene/liceo/luoghi/aula-magna.webp` · video: `assets/arene/liceo/luoghi/aula-magna.mp4`

**Immagine**

```text
An assembly hall with a stage and a single microphone under a spotlight in the central third of the frame. Rows of folding seats fill the foreground. Velvet curtains and tall windows fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The spotlight beam shimmers with floating dust, the curtains sway gently, the microphone cable swings slightly. --motion low --loop
```

### Pericoli · Liceo Spietato

#### Preside

Caricatura della Preside severa, braccia conserte, occhiali abbassati, sulla soglia.  
File: `assets/arene/liceo/pericoli/preside.webp` · video: `assets/arene/liceo/pericoli/preside.mp4`

**Immagine**

```text
A stern school principal standing in a doorway, arms crossed, glasses lowered on the nose, one eyebrow raised. Stylized painterly character concept art with visible expressive brushwork and faceted planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The principal taps a foot slowly, the eyebrow lifts, the glasses glint, papers flutter on a nearby desk. --motion low --loop
```

#### Bidello di turno

Caricatura del bidello brontolone con mocio, secchio e mazzo di chiavi.  
File: `assets/arene/liceo/pericoli/bidello-di-turno.webp` · video: `assets/arene/liceo/pericoli/bidello-di-turno.mp4`

**Immagine**

```text
A grumpy school janitor with a mop and a bucket, a big ring of keys on his belt, squinting suspiciously. Stylized painterly character concept art with visible expressive brushwork and faceted planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The janitor leans on the mop and sighs, the keys jingle slightly, soap bubbles float from the bucket. --motion low --loop
```

#### Ispezione a sorpresa

L'ispezione a sorpresa: un ispettore con cartellina e lente che spunta da una porta.  
File: `assets/arene/liceo/pericoli/ispezione-a-sorpresa.webp` · video: `assets/arene/liceo/pericoli/ispezione-a-sorpresa.mp4`

**Immagine**

```text
A school inspector peeking through a half-open door with a clipboard and a magnifying glass, one huge eye magnified behind the lens. Stylized painterly character concept art with visible expressive brushwork and faceted planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The magnifying glass moves slowly, the huge eye blinks, the door sways slightly. --motion low --loop
```

#### Professoressa di matematica

Caricatura della prof di matematica con la penna rossa, lavagna con formule illeggibili.  
File: `assets/arene/liceo/pericoli/professoressa-di-matematica.webp` · video: `assets/arene/liceo/pericoli/professoressa-di-matematica.mp4`

**Immagine**

```text
A strict math teacher holding a red pen like a sword, a blackboard of blurred chalk scribbles behind her, a stack of tests in her arm. Stylized painterly character concept art with visible expressive brushwork and faceted planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The red pen taps slowly, chalk dust floats in the light, the teacher narrows her eyes. --motion low --loop
```

### Armi · Liceo Spietato

#### Gossip esplosivo

Smartphone con un fumetto di chat che esplode come un fuoco d'artificio.  
File: `assets/arene/liceo/armi/gossip-esplosivo.webp`

**Immagine**

```text
A smartphone with a glowing chat bubble bursting out of it like a firework. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Foto imbarazzante

Polaroid con un'immagine imbarazzante sfocata e un bagliore rosa.  
File: `assets/arene/liceo/armi/foto-imbarazzante.webp`

**Immagine**

```text
A polaroid photo showing a blurred embarrassing picture, with a pink glow. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Compito copiato

Compito in classe con un bigliettino nascosto che spunta.  
File: `assets/arene/liceo/armi/compito-copiato.webp`

**Immagine**

```text
A folded test paper with a tiny rolled cheat sheet sticking out, scribbled lines instead of writing. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pallone da dodgeball

Pallone rosso da dodgeball con scie di movimento.  
File: `assets/arene/liceo/armi/pallone-da-dodgeball.webp`

**Immagine**

```text
A red rubber dodgeball with motion streaks. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Registro rubato

Registro di classe spesso con il segnalibro a nastro.  
File: `assets/arene/liceo/armi/registro-rubato.webp`

**Immagine**

```text
A thick class register book with a ribbon bookmark and a plain cover. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Profilo falso

Smartphone con un profilo social finto e l'icona di una maschera.  
File: `assets/arene/liceo/armi/profilo-falso.webp`

**Immagine**

```text
A smartphone showing a fake social profile with a disguise mask icon. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Ufficio Open Space

Riunioni infinite, fogli Excel e licenziamenti. Nessuno muore: si viene licenziati.

- **Atmosfera**: Open space aziendale in chiave satirica: luce fluorescente verde petrolio e grigia, bagliore dei monitor, ombre verde scuro, polvere sospesa. Commedia d'ufficio, nessuna violenza.
- **Frase di luce dell'arena** (è già nei comandi): `Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood.`

### Luoghi · Ufficio Open Space

#### Sala riunioni

Sala riunioni con tavolo di vetro lungo, sedie vuote, schermo del proiettore e lavagna.  
File: `assets/arene/ufficio/luoghi/sala-riunioni.webp` · video: `assets/arene/ufficio/luoghi/sala-riunioni.mp4`

**Immagine**

```text
A meeting room with a long glass table leading to a glowing projector screen in the central third of the frame. Empty swivel chairs, coffee cups and scattered papers fill the foreground. A whiteboard of blurred scribbles and a city view fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted glass planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The projector beam shimmers with floating dust, a chair turns very slowly, steam rises from a coffee cup. --motion low --loop
```

#### Open space

Open space sterminato con file di scrivanie, monitor e piante in vaso.  
File: `assets/arene/ufficio/luoghi/open-space.webp` · video: `assets/arene/ufficio/luoghi/open-space.mp4`

**Immagine**

```text
A sprawling open-space office with endless rows of desks and glowing monitors converging in the central third of the frame. A desk with a sad potted plant and a stress ball fills the foreground. Glass partitions and a grey city skyline fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted glass planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Monitors flicker softly, a ceiling light buzzes and blinks, the plant leaves sway in the air conditioning. --motion low --loop
```

#### Cucina

Angolo cucina con macchinetta del caffè, tazze, microonde e frigo pieno di bigliettini.  
File: `assets/arene/ufficio/luoghi/cucina.webp` · video: `assets/arene/ufficio/luoghi/cucina.mp4`

**Immagine**

```text
The office kitchenette with a steaming coffee machine in the central third of the frame. Mugs, sugar packets and a half-eaten birthday cake fill the foreground. A fridge covered in sticky notes and a microwave fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted glass planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Steam rises from the coffee machine, a drip falls slowly, the microwave light glows, sticky notes flutter. --motion low --loop
```

#### Ufficio del direttore

Ufficio d'angolo del Direttore con poltrona di pelle, vetrata panoramica e premi.  
File: `assets/arene/ufficio/luoghi/ufficio-del-direttore.webp` · video: `assets/arene/ufficio/luoghi/ufficio-del-direttore.mp4`

**Immagine**

```text
The director corner office with a big leather chair turned toward a panoramic window in the central third of the frame. A polished desk with a blank golden nameplate and a smoking cigar fills the foreground. Trophies on shelves and a city skyline fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted glass planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The leather chair turns very slowly, cigar smoke curls upward, city lights twinkle outside. --motion low --loop
```

#### Sala stampanti

Stanzino delle stampanti con una fotocopiatrice inceppata che sputa fogli.  
File: `assets/arene/ufficio/luoghi/sala-stampanti.webp` · video: `assets/arene/ufficio/luoghi/sala-stampanti.mp4`

**Immagine**

```text
A cramped printer room with a jammed copier in the central third of the frame. Paper sheets piled on the floor and toner boxes fill the foreground. Shelves of paper reams and a blinking warning light fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted glass planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Sheets slide slowly out of the copier, the warning light blinks, a few papers flutter down. --motion low --loop
```

#### Parcheggio

Parcheggio aziendale sotterraneo con posti riservati e neon.  
File: `assets/arene/ufficio/luoghi/parcheggio.webp` · video: `assets/arene/ufficio/luoghi/parcheggio.mp4`

**Immagine**

```text
An underground company car park with a shiny executive car in a reserved space in the central third of the frame. Concrete pillars, parking lines and a dropped badge fill the foreground. Rows of fluorescent tubes recede into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted glass planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. Fluorescent tubes flicker, a puddle ripples slowly, dust drifts in the light. --motion low --loop
```

### Pericoli · Ufficio Open Space

#### Direttore generale

Caricatura dell'amministratore delegato in completo, controluce davanti a una vetrata.  
File: `assets/arene/ufficio/pericoli/direttore-generale.webp` · video: `assets/arene/ufficio/pericoli/direttore-generale.mp4`

**Immagine**

```text
A powerful CEO in a sharp suit silhouetted against a tall office window, smug smile, hands on hips in a power pose. Stylized painterly character concept art with visible expressive brushwork and faceted glass planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The CEO adjusts the tie very slowly, the smile widens slightly, city lights twinkle behind. --motion low --loop
```

#### Ufficio Risorse umane

Caricatura di una persona delle Risorse umane con sorriso di circostanza e pila di cartelline.  
File: `assets/arene/ufficio/pericoli/ufficio-risorse-umane.webp` · video: `assets/arene/ufficio/pericoli/ufficio-risorse-umane.mp4`

**Immagine**

```text
An HR officer with a polite fake smile holding a tall stack of folders, a pen behind the ear, a box of tissues on the desk. Stylized painterly character concept art with visible expressive brushwork and faceted glass planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The fake smile holds while one eye twitches, the folder stack wobbles slightly, papers flutter. --motion low --loop
```

#### Consulente esterno

Caricatura del consulente con capelli impomatati, portatile e grafico a torta olografico.  
File: `assets/arene/ufficio/pericoli/consulente-esterno.webp` · video: `assets/arene/ufficio/pericoli/consulente-esterno.mp4`

**Immagine**

```text
A slick external consultant with gelled hair and a laptop, a holographic pie chart floating above his palm. Stylized painterly character concept art with visible expressive brushwork and faceted glass planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The holographic pie chart rotates slowly, the laptop screen glows, the consultant raises an eyebrow. --motion low --loop
```

#### Riorganizzazione aziendale

La riorganizzazione personificata: un mostro di caselle e frecce di organigramma.  
File: `assets/arene/ufficio/pericoli/riorganizzazione-aziendale.webp` · video: `assets/arene/ufficio/pericoli/riorganizzazione-aziendale.mp4`

**Immagine**

```text
A corporate reorganization personified as a tangled monster made of org-chart boxes and arrows, with two glowing eyes in the middle. Stylized painterly character concept art with visible expressive brushwork and faceted glass planes, framed like a wanted poster portrait with the subject centered and facing the viewer, eyes in the upper half of the frame, the edges fading into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera, seamless ambient loop, slow and calm. The org-chart boxes shuffle slowly into new positions, arrows bend, the eyes blink. --motion low --loop
```

### Armi · Ufficio Open Space

#### Mail in copia a tutti

Busta di una mail che si moltiplica in tante copie luminose.  
File: `assets/arene/ufficio/armi/mail-in-copia-a-tutti.webp`

**Immagine**

```text
An email envelope multiplying into many glowing copies. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Report pieno di errori altrui

Report stampato coperto di segni rossi e post-it.  
File: `assets/arene/ufficio/armi/report-pieno-di-errori-altrui.webp`

**Immagine**

```text
A printed report covered in red correction marks and colourful sticky notes, abstract scribbled lines. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Presentazione rubata

Chiavetta USB con una slide proiettata e una mascherina da ladro.  
File: `assets/arene/ufficio/armi/presentazione-rubata.webp`

**Immagine**

```text
A USB stick projecting a slide and wearing a tiny burglar mask. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Badge clonato del capo

Badge col cordino e una sua copia identica luminosa.  
File: `assets/arene/ufficio/armi/badge-clonato-del-capo.webp`

**Immagine**

```text
An ID badge on a lanyard with a glowing duplicate copy beside it and a blank photo area. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Foglio Excel con le prove

Stampa di un foglio di calcolo con celle evidenziate e una lente.  
File: `assets/arene/ufficio/armi/foglio-excel-con-le-prove.webp`

**Immagine**

```text
A spreadsheet printout with bright highlighted cells under a magnifying glass, abstract grid marks. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Nota spese gonfiata

Uno scontrino che si gonfia come un palloncino.  
File: `assets/arene/ufficio/armi/nota-spese-gonfiata.webp`

**Immagine**

```text
A paper receipt inflating like a balloon. Single game inventory prop, shown in three-quarter view laid diagonally from lower left to upper right, centered with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with visible expressive brushwork and faceted planes, crisp clean silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```
