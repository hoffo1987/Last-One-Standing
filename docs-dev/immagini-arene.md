# Immagini e video delle arene con Midjourney v8.2

_Generato da `node tools/atlas-slots.js` a partire da `tools/atlas-brief.js`: per cambiare un testo o un prompt modifica il brief e rigenera, non questo file._

**Immagini presenti: 99 su 182** (luoghi 60/66, pericoli 39/39, armi 0/77). **Video presenti: 0 su 105** (luoghi e pericoli). Meteo, disastri e oggetti arriveranno dopo.

## 1. Lo stile

Il riferimento è la Cornucopia che hai generato: **concept art pittorica stilizzata**, pennellate espressive e visibili, piani sfaccettati (rocce, metallo, pietra), una luce calda e forte contro ombre fredde e profonde, nebbia di profondità. Ogni prompt segue la stessa struttura del tuo:

1. **la scena**: il soggetto e dove sta nell'inquadratura (sempre nel terzo centrale), poi il primo piano, poi lo sfondo;
2. **la frase di stile**, uguale per tutta la sezione (ambiente, personaggio o oggetto);
3. **la frase di luce dell'arena**, uguale per tutte le voci di quell'arena: è ciò che tiene insieme palette e atmosfera;
4. **i parametri**: solo `--v 8.2`, il formato `--ar` e le esclusioni `--no`. Nessun riferimento alle immagini del sito.

`--no` tiene fuori scritte, **firme** (nella Cornucopia è comparsa una firma finta in basso a destra), loghi, cornici e persone. Le esclusioni stanno solo lì: scritte dentro la frase («no people») Midjourney spesso le fa al contrario.

**Lunghezza e ordine.** La v8 è più letterale delle versioni precedenti: segue ciò che c'è scritto e aggiunge meno «abbellimenti» da sola, quindi rende meglio con descrizioni piene e concrete (materiali, posizione delle cose, provenienza della luce). Conta il numero di soggetti e dettagli più delle parole. Per questo ogni testo sta tra **70 e 120 parole**, come quello della Cornucopia (circa 110) che ha funzionato, e **sotto gli 850 caratteri**, così il Prompt Shortener non interviene a tagliare. L'ordine conta: il soggetto viene sempre per primo, lo stile e la luce dopo, perché Midjourney dà più peso all'inizio.

**Cosa ho controllato in ogni testo**: soggetto nel terzo centrale (sul telefono si vede solo quello); un dettaglio raccontato in primo piano e uno sfondo con profondità; pochi oggetti ben distinti invece di elenchi lunghi; cartelli, schermi e fogli sempre «blank» o con segni astratti, mai con testo; nei pericoli una posa, un'espressione e una luce sul soggetto; nelle armi materiali, usura e un dettaglio d'arena, perché a 62 px resta solo la sagoma; nessuna parola che Midjourney possa prendere alla lettera disegnando cornici o manifesti.

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
2. Incolla il prompt del video: comincia dicendo che la camera è ferma e che **il luogo o il soggetto restano immobili** (aiuta molto il loop), poi elenca solo tre o quattro piccoli movimenti; contiene già **`--motion low`** (movimento lieve, adatto ai loop) e **`--loop`** (il fotogramma finale coincide con il primo, così il video ricomincia senza salti).
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
| [Reame Incantato](#reame-incantato) | 7 | 4 | 8 |
| [Stazione Orbitale](#stazione-orbitale) | 6 | 4 | 7 |
| [Città degli Infetti](#città-degli-infetti) | 7 | 4 | 8 |
| [Isola Battle Royale](#isola-battle-royale) | 6 | 3 | 8 |
| [Villa Maledetta](#villa-maledetta) | 7 | 4 | 7 |
| [Terre Desolate](#terre-desolate) | 7 | 4 | 7 |
| [Liceo Spietato](#liceo-spietato) | 7 | 4 | 6 |
| [Ufficio Open Space](#ufficio-open-space) | 6 | 4 | 6 |
| [Night City — Zona Rossa](#night-city--zona-rossa) | 7 | 4 | 10 |

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
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Gentle heat shimmer above the golden horn, the stream ripples softly and sparkles with sunlight, tattered banners sway slightly in a light breeze, a few glowing embers and dust motes drift upward, thin fog slowly rolls between the distant pines. --motion low --loop
```

#### ✓ Bosco

Bosco antico e fitto all'imbrunire, lame di luce tra i tronchi e un sentiero nascosto.  
File: `assets/arene/classico/luoghi/bosco.webp` · video: `assets/arene/classico/luoghi/bosco.mp4`

**Immagine**

```text
A dense ancient pine forest at dusk, with a narrow hidden dirt trail winding into the central third of the frame between towering mossy trunks as wide as houses. Ferns, fallen branches and a half-buried wooden supply crate with a frayed rope handle line the trail in the foreground. Long golden shafts of low sunlight pierce gaps in the canopy, catching floating pollen, and fade into layered blue silhouettes of pines in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Shafts of sunlight shimmer softly, ferns and leaves sway gently, tiny dust motes and pollen float through the light beams, low fog drifts slowly between the trunks. --motion low --loop
```

#### ✓ Fiume

Fiume tortuoso tra massi muschiosi, rapide basse e un tronco caduto che fa da ponte.  
File: `assets/arene/classico/luoghi/fiume.webp` · video: `assets/arene/classico/luoghi/fiume.mp4`

**Immagine**

```text
A winding river cuts through the central third of the frame between mossy faceted boulders, its shallow rapids catching the orange sky in bright broken reflections. A fallen pine log spans the water as a makeshift bridge, with a forgotten quiver hanging from a branch stub. Reeds, smooth pebbles and a wet backpack crowd the near bank in the foreground, while dark pine silhouettes and a glowing low sun close the background above a veil of mist. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Water flows gently over the rapids with soft glittering reflections, reeds sway slightly, a thin mist hovers over the river surface, a few leaves float slowly downstream. --motion low --loop
```

#### ✓ Paludi

Palude scura con canne, alberi morti contorti e nebbia bassa; qualche lucciola.  
File: `assets/arene/classico/luoghi/paludi.webp` · video: `assets/arene/classico/luoghi/paludi.mp4`

**Immagine**

```text
A murky marsh with black still water stretching through the central third of the frame, broken by twisted dead trees with moss-draped branches and clumps of tall reeds. A rotten wooden boardwalk with missing planks sinks into the water in the foreground, an old lantern hanging from its last post. Low banks of fog, faint fireflies and the silhouettes of drowned trees fill the background beneath a dying red sunset. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Low fog creeps slowly across the water, fireflies blink and drift, reeds sway gently, faint ripples spread across the dark surface. --motion low --loop
```

#### ✓ Rovine

Rovine di un antico tempio in pietra invase dai rampicanti, colonne spezzate e un arco crollato.  
File: `assets/arene/classico/luoghi/rovine.webp` · video: `assets/arene/classico/luoghi/rovine.mp4`

**Immagine**

```text
The crumbling stone ruins of an ancient temple stand in the central third of the frame, with broken columns and a collapsed archway wrapped in thick vines and wildflowers. Scattered carved blocks, a mossy stone face half sunk in the grass and a rusted round shield lie in the foreground. Pine silhouettes, a flock of distant birds and drifting golden haze fill the background behind the ruins, lit from behind by the setting sun. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Vines and grass sway softly in a light breeze, dust motes float in the warm light, a thin haze drifts slowly behind the columns. --motion low --loop
```

#### ✓ Altopiano

Altopiano roccioso spazzato dal vento, erba brinata e montagne lontane: il posto più freddo.  
File: `assets/arene/classico/luoghi/altopiano.webp` · video: `assets/arene/classico/luoghi/altopiano.mp4`

**Immagine**

```text
A windswept rocky highland plateau with a lone weathered stone outcrop and a crooked dead tree in the central third of the frame. Sparse frosted grass, patches of thin snow and scattered faceted boulders cover the foreground, along with a cold extinguished campfire. Distant jagged mountain ranges, thin streaked clouds and a pale icy sky fill the background, warmed only by the last orange edge of sunset on the peaks. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Frosted grass bends gently in a steady wind, thin clouds drift slowly across the sky, a few snow flakes and dust particles float by. --motion low --loop
```

### Pericoli · Arena Classica

#### ✓ Branco di lupi mutanti

Branco di lupi mutanti con occhi ambra e chiazze di pelo metallico, che escono dagli alberi.  
File: `assets/arene/classico/pericoli/branco-di-lupi-mutanti.webp` · video: `assets/arene/classico/pericoli/branco-di-lupi-mutanti.mp4`

**Immagine**

```text
A pack of three mutated wolves stepping out of shadowy pines, the alpha in front with bared fangs, a scarred muzzle and glowing amber eyes. Patches of their fur have hardened into dull metallic plates, and thin wisps of breath steam from their jaws. The two others flank it half hidden in the dark undergrowth, their eyes glinting. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The wolves breathe slowly with subtle chest movement, their fur ripples in the wind, the amber eyes glint faintly, mist drifts behind them. --motion low --loop
```

#### ✓ Sciame di vespe velenose

Sciame di vespe giganti e velenose; una in primo piano col pungiglione in vista.  
File: `assets/arene/classico/pericoli/sciame-di-vespe-velenose.webp` · video: `assets/arene/classico/pericoli/sciame-di-vespe-velenose.mp4`

**Immagine**

```text
A menacing swarm of oversized venomous wasps, each as large as a hand, with glowing yellow stripes and translucent amber wings. One wasp hovers in sharp focus in the foreground, its curved stinger dripping a bead of venom, compound eyes reflecting the sunset. The rest of the swarm forms a dark buzzing cloud around a broken paper nest behind it. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The wasps hover in place with fast blurred wings, the swarm shifts gently behind, faint glowing pollen floats in the air. --motion low --loop
```

#### ✓ Orso affamato

Enorme orso bruno affamato, ritto sulle zampe posteriori, muso pieno di cicatrici.  
File: `assets/arene/classico/pericoli/orso-affamato.webp` · video: `assets/arene/classico/pericoli/orso-affamato.mp4`

**Immagine**

```text
A huge starving brown bear rearing up on its hind legs between pine trunks, matted fur hanging loose over visible ribs, a scarred muzzle and broken claws. Its mouth is half open in a low roar, and its small hungry eyes catch the warm sunset light. Torn bark and claw marks scar the tree beside it. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The bear breathes heavily with slow chest movement, its fur stirs in the wind, warm breath steams faintly in the cold air. --motion low --loop
```

#### ✓ Serpente gigante

Serpente gigante dalle squame smeraldo, avvolto su sé stesso con la testa alzata.  
File: `assets/arene/classico/pericoli/serpente-gigante.webp` · video: `assets/arene/classico/pericoli/serpente-gigante.mp4`

**Immagine**

```text
A giant serpent coiled around a mossy boulder, raising its huge head toward the viewer, emerald faceted scales edged with gold. Its forked tongue tastes the air, and its slit-pupil eyes glow amber in the dusk. Shed skin hangs from the rock below, and its thick body disappears into tall grass behind it. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The serpent sways its raised head very slowly, its tongue flicks occasionally, light glides across the scales, mist drifts behind. --motion low --loop
```

### Armi · Arena Classica

#### Coltello

Coltello da sopravvivenza con manico in cuoio.  
File: `assets/arene/classico/armi/coltello.webp`

**Immagine**

```text
A sturdy survival knife with a clip-point steel blade showing a few nicks and a polished edge, a leather-wrapped handle worn dark by use, and a small brass pommel with a lanyard loop. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Arco

Arco ricurvo in legno con una freccia incoccata.  
File: `assets/arene/classico/armi/arco.webp`

**Immagine**

```text
A wooden recurve bow made of dark yew with leather-wrapped grip and pale bone tips, its string taut, with one feathered arrow nocked and ready. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia

Lancia da caccia con asta di frassino e punta a foglia.  
File: `assets/arene/classico/armi/lancia.webp`

**Immagine**

```text
A hunting spear with a straight ash-wood shaft, a leaf-shaped steel tip bound to it with tight cord, and two small hawk feathers tied below the blade. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia

Ascia da boscaiolo con manico consumato.  
File: `assets/arene/classico/armi/ascia.webp`

**Immagine**

```text
A woodcutter axe with a long worn hickory handle, a chipped steel head with a bright freshly sharpened edge, and a strip of red cloth tied around the grip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Machete

Machete lungo, lama leggermente curva.  
File: `assets/arene/classico/armi/machete.webp`

**Immagine**

```text
A long machete with a slightly curved, scratched steel blade, a black rubber grip and a frayed canvas sheath strap still hanging from the handle. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Tridente

Tridente da pesca con asta di legno.  
File: `assets/arene/classico/armi/tridente.webp`

**Immagine**

```text
A three-pronged fishing trident with barbed iron tips, a wooden shaft wrapped in rope binding, and a few strands of river weed caught between the prongs. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fionda

Fionda di legno a forcella con tasca di cuoio.  
File: `assets/arene/classico/armi/fionda.webp`

**Immagine**

```text
A forked wooden slingshot carved from a branch, with stretched rubber bands and a small leather pouch holding a smooth river pebble. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Spada corta

Spada corta tipo gladio, guardia semplice.  
File: `assets/arene/classico/armi/spada-corta.webp`

**Immagine**

```text
A short gladius-style sword with a broad leaf-shaped steel blade, a simple brass crossguard, a leather-wrapped grip and a round wooden pommel. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale

Pugnale sottile a doppio taglio.  
File: `assets/arene/classico/armi/pugnale.webp`

**Immagine**

```text
A slim double-edged dagger with a narrow polished blade, a cord-wrapped hilt and a small ring pommel, its edge catching a bright line of light. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mazza

Clava di legno pesante con borchie di ferro.  
File: `assets/arene/classico/armi/mazza.webp`

**Immagine**

```text
A heavy wooden war club carved from a gnarled root, studded with rows of iron rivets, its handle wrapped in strips of leather. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm amber sunset key light with a cool indigo rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Reame Incantato

Draghi, rune e foreste che sussurrano.

- **Atmosfera**: Fiaba oscura di notte: viola, magenta e blu notte con bagliori magici turchesi e dorati, rune luminose, nebbie incantate.
- **Frase di luce dell'arena** (è già nei comandi): `Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist.`

### Luoghi · Reame Incantato

#### ✓ Torre in rovina

Torre di uno stregone mezza crollata, rune accese sui muri, luna enorme.  
File: `assets/arene/fantasy/luoghi/torre-in-rovina.webp` · video: `assets/arene/fantasy/luoghi/torre-in-rovina.mp4`

**Immagine**

```text
A ruined wizard tower of dark stone rises in the central third of the frame, half collapsed, with glowing violet runes carved along its cracked walls and a crooked balcony hanging over the void. Fallen blocks, scattered open spell books and a broken staff with a dim crystal lie among the ferns in the foreground. A huge silver moon, drifting clouds and distant mountain silhouettes fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The runes pulse softly with violet light, tiny magical sparks float upward, clouds drift slowly across the moon, ferns sway gently. --motion low --loop
```

#### ✓ Foresta elfica

Foresta elfica di alberi giganti dalla corteccia argentata, lanterne appese e lucine sospese.  
File: `assets/arene/fantasy/luoghi/foresta-elfica.webp` · video: `assets/arene/fantasy/luoghi/foresta-elfica.mp4`

**Immagine**

```text
An elven forest of giant silver-barked trees, with a graceful arched wooden bridge crossing a stream in the central third of the frame. Hanging glass lanterns and floating motes of light glow among the high branches, while luminous blue flowers and curling ferns carpet the foreground. Layers of tall slender trees fade into turquoise mist in the background, with a faint glow of an elven hall far away. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Lanterns sway gently and glow softly, floating motes of light drift slowly, luminous flowers pulse faintly, mist moves slowly between the trees. --motion low --loop
```

#### ✓ Lago nebbioso

Lago incantato di notte, acqua a specchio, pontile di pietra e statua mezza sommersa.  
File: `assets/arene/fantasy/luoghi/lago-nebbioso.webp` · video: `assets/arene/fantasy/luoghi/lago-nebbioso.mp4`

**Immagine**

```text
A misty enchanted lake at night, its glassy water filling the frame, with a half-sunken stone statue of a crowned queen rising from the water in the central third. A small stone pier with a moored wooden rowboat and a hanging lantern reaches in from the foreground. Pine silhouettes, a pale moon reflected in the water and banks of glowing mist close the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Soft mist drifts over the mirror-like water, gentle ripples spread around the statue, the rowboat rocks very slightly, moonlight shimmers on the surface. --motion low --loop
```

#### ✓ Miniere

Miniere naniche nella montagna: impalcature, binari con carrello, vene di cristallo luminose.  
File: `assets/arene/fantasy/luoghi/miniere.webp` · video: `assets/arene/fantasy/luoghi/miniere.mp4`

**Immagine**

```text
Dwarven mines carved deep into a mountain, with a minecart full of glowing ore on a rail track curving into the central third of the frame. Wooden scaffolding, hanging lanterns and abandoned pickaxes surround the tracks, while glowing turquoise crystal veins split the faceted rock walls. A vast dark cavern with tiny distant lights and stone bridges fills the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Crystal veins pulse with a slow turquoise glow, lantern flames flicker gently, fine dust floats in the light, a faint haze drifts in the cavern. --motion low --loop
```

#### ✓ Palude stregata

Palude stregata con alberi storti, muschio pendente, capanna su palafitte e fuochi fatui verdi.  
File: `assets/arene/fantasy/luoghi/palude-stregata.webp` · video: `assets/arene/fantasy/luoghi/palude-stregata.mp4`

**Immagine**

```text
A haunted swamp of crooked trees and hanging moss, with a witch hut on tall stilts glowing at its round window in the central third of the frame, smoke rising from a bent chimney. Green will-o-wisps hover over black water, gnarled roots and a sunken cauldron in the foreground. Thick violet fog and twisted tree silhouettes fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Will-o-wisps drift and bob slowly, moss sways gently, the hut window flickers warmly, fog creeps across the water. --motion low --loop
```

#### ✓ Picco del drago

Picco frastagliato con la tana del drago: rocce bruciate, mucchi d'oro, fumo che sale.  
File: `assets/arene/fantasy/luoghi/picco-del-drago.webp` · video: `assets/arene/fantasy/luoghi/picco-del-drago.mp4`

**Immagine**

```text
A jagged mountain peak crowned by a dragon lair, with a wide cave mouth glowing with heaps of gold coins and jewels in the central third of the frame. Scorched faceted rocks, huge old bones and a melted knight shield cover the foreground. Smoke rises from the cave into a starry violet night sky above a sea of clouds and distant peaks. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Smoke rises slowly from the lair, the gold glints softly, embers float upward, clouds drift across the stars. --motion low --loop
```

#### Altare delle armi

Altare di pietra nella radura centrale, rastrelliere e tre sentieri verso Torre, Foresta e Lago.  
File: `assets/arene/fantasy/luoghi/altare-delle-armi.webp` · video: `assets/arene/fantasy/luoghi/altare-delle-armi.mp4`

**Immagine**

```text
A broad weathered stone altar occupies the central third of a circular forest clearing, surrounded by simple wooden weapon racks and low broken standing stones. Three distinct paths disappear toward a ruined tower, dense woodland and a misty lake in the distance. An abandoned leather satchel, a cracked bowl and scattered pale petals rest in the foreground. Abstract carved grooves glow faintly beneath drifting magical haze. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Pale petals drift slowly above the altar, faint light pulses in the carved grooves, and soft mist passes between the standing stones. --motion low --loop
```

### Pericoli · Reame Incantato

#### ✓ Troll di caverna

Troll di caverna enorme, pelle grigia bitorzoluta, clava di pietra, occhi piccoli e luminosi.  
File: `assets/arene/fantasy/pericoli/troll-di-caverna.webp` · video: `assets/arene/fantasy/pericoli/troll-di-caverna.mp4`

**Immagine**

```text
A hulking cave troll stooping in the mouth of a cave, grey warty skin covered in lichen, a heavy brow over small glowing yellow eyes and a jutting jaw with broken tusks. It grips a crude stone club over one shoulder. Bones and torches lie at its feet, and cave darkness surrounds it. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The troll breathes slowly with heavy shoulders rising and falling, its eyes glow faintly, dust drifts from the cave ceiling. --motion low --loop
```

#### ✓ Viverna

Viverna con ali membranose spalancate e coda uncinata, appollaiata su una rupe.  
File: `assets/arene/fantasy/pericoli/viverna.webp` · video: `assets/arene/fantasy/pericoli/viverna.mp4`

**Immagine**

```text
A wyvern perched on a cliff edge with leathery violet wings spread wide, a long barbed tail curled around the rock and talons gripping the stone. Its jaws open in a roar showing rows of teeth, and moonlight glints on its dark faceted scales. Wisps of smoke curl from its nostrils against a moonlit sky. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The wyvern breathes slowly, its wing membranes flutter slightly in the wind, wisps of smoke curl from its jaws, clouds drift behind. --motion low --loop
```

#### ✓ Spettro errante

Spettro traslucido in vesti a brandelli, bagliore azzurro, occhi vuoti, nella nebbia.  
File: `assets/arene/fantasy/pericoli/spettro-errante.webp` · video: `assets/arene/fantasy/pericoli/spettro-errante.mp4`

**Immagine**

```text
A wandering translucent wraith in tattered grey robes drifting through mist, a faint cold blue glow coming from within, with hollow dark eyes and long thin fingers reaching forward. Ghostly chains trail from its wrists and fade into the fog behind it. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The wraith floats in place with a slow hovering motion, its tattered robes ripple softly, the blue glow pulses, mist swirls gently. --motion low --loop
```

#### ✓ Branco di lupi mannari

Branco di lupi mannari sotto la luna piena, il capobranco in primo piano.  
File: `assets/arene/fantasy/pericoli/branco-di-lupi-mannari.webp` · video: `assets/arene/fantasy/pericoli/branco-di-lupi-mannari.mp4`

**Immagine**

```text
A pack of werewolves under a full moon, the alpha in front with bristling dark fur, a muscular half-human body, bared fangs and glowing yellow eyes. Torn cloth hangs from its shoulders. The others stand behind it as hunched silhouettes on a rocky ridge against the moon. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The werewolves breathe slowly, fur ripples in the wind, eyes glint, clouds drift slowly across the full moon. --motion low --loop
```

### Armi · Reame Incantato

#### Spada runica

Spada lunga con rune viola luminose sulla lama.  
File: `assets/arene/fantasy/armi/spada-runica.webp`

**Immagine**

```text
A longsword with a dark steel blade engraved with glowing violet runes along its length, an ornate silver crossguard shaped like spread wings and a grip wrapped in deep blue leather. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Bastone magico

Bastone da mago nodoso con un cristallo luminoso sospeso in cima.  
File: `assets/arene/fantasy/armi/bastone-magico.webp`

**Immagine**

```text
A gnarled wizard staff of twisted ancient wood with silver bands, topped by a cage of roots holding a floating violet crystal that glows from within. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Arco elfico

Arco lungo elfico in legno chiaro con intarsi d'argento a foglia.  
File: `assets/arene/fantasy/armi/arco-elfico.webp`

**Immagine**

```text
An elegant elven longbow of pale curved wood with leaf-shaped silver inlays, a thin glowing string and a small green gem set into the grip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia nanica

Ascia nanica a doppia lama con incisioni a intreccio.  
File: `assets/arene/fantasy/armi/ascia-nanica.webp`

**Immagine**

```text
A heavy double-bladed dwarven axe with a broad steel head engraved with knotwork patterns, gold inlays and a thick handle wrapped in dark leather. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale avvelenato

Pugnale ricurvo che gocciola veleno verde.  
File: `assets/arene/fantasy/armi/pugnale-avvelenato.webp`

**Immagine**

```text
A curved dagger with a dark serrated blade dripping bright green poison, a bone handle and a small serpent carved around the pommel. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Martello da guerra

Martello da guerra massiccio con testa in ferro incisa di rune.  
File: `assets/arene/fantasy/armi/martello-da-guerra.webp`

**Immagine**

```text
A massive war hammer with a square iron head carved with glowing runes, reinforced steel corners and a long handle bound with leather and brass rings. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra fantasy in legno scuro e ottone.  
File: `assets/arene/fantasy/armi/balestra.webp`

**Immagine**

```text
A fantasy crossbow of dark polished wood with brass fittings, a carved dragon head at the front and a glowing bolt loaded and ready. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia incantata

Lancia sottile con la punta avvolta da una luce pallida.  
File: `assets/arene/fantasy/armi/lancia-incantata.webp`

**Immagine**

```text
A slender spear with a long silver shaft and an elegant leaf-shaped blade wreathed in pale blue magical light, a ribbon tied below the tip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cool violet moonlight key light with a glowing turquoise magical rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Stazione Orbitale

Ossigeno limitato, droni e un reattore instabile.

- **Atmosfera**: Stazione orbitale: ciano e blu elettrico su acciaio spazzolato, spie rosse d'allarme, la Terra o le stelle dai finestrini.
- **Frase di luce dell'arena** (è già nei comandi): `Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust.`

### Luoghi · Stazione Orbitale

#### ✓ Hangar

Hangar enorme con una navetta attraccata, container e il portellone aperto sulle stelle.  
File: `assets/arene/scifi/luoghi/hangar.webp` · video: `assets/arene/scifi/luoghi/hangar.mp4`

**Immagine**

```text
A vast spaceship hangar with a sleek white shuttle docked on a landing pad in the central third of the frame, service arms clamped to its hull. Stacked cargo containers, coiled fuel hoses and an open toolbox crowd the foreground deck, striped with yellow warning lines. The open bay door at the back frames a field of stars and the glowing curve of a blue planet behind a shimmering force field. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Warning lights blink slowly, a faint mist of coolant drifts across the deck, distant stars twinkle, the planet glows softly. --motion low --loop
```

#### ✓ Serra idroponica

Serra idroponica: file di piante sotto luci viola, tubi d'acqua e una cupola di vetro.  
File: `assets/arene/scifi/luoghi/serra-idroponica.webp` · video: `assets/arene/scifi/luoghi/serra-idroponica.mp4`

**Immagine**

```text
A hydroponic greenhouse module under a glass dome, with rows of lush green plants in white trays converging toward the central third of the frame under purple grow lights. Water pipes, misting nozzles and seed trays fill the foreground, with a dropped watering can. Stars and the steel ribs of the station show through the dome in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Fine water mist sprays softly, leaves sway gently in the airflow, grow lights hum with a subtle pulse, droplets glisten. --motion low --loop
```

#### ✓ Reattore

Il nucleo del reattore: sfera ciano incandescente in un anello d'acciaio, passerelle, allarmi.  
File: `assets/arene/scifi/luoghi/reattore.webp` · video: `assets/arene/scifi/luoghi/reattore.mp4`

**Immagine**

```text
The station reactor core, a glowing cyan sphere of energy suspended inside a massive rotating steel ring in the central third of the frame. Metal catwalks with railings, warning stripes and thick bundled cables run through the foreground. Vertical shafts, steam vents and red alarm lights recede into the deep background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The core pulses with a slow cyan glow, energy arcs flicker faintly, warning lights blink, heat haze shimmers around the ring. --motion low --loop
```

#### ✓ Ponte di comando

Ponte di comando con console olografiche e una vetrata enorme sulla Terra.  
File: `assets/arene/scifi/luoghi/ponte-di-comando.webp` · video: `assets/arene/scifi/luoghi/ponte-di-comando.mp4`

**Immagine**

```text
The command bridge of an orbital station, with an empty captain chair facing a huge curved window onto Earth in the central third of the frame. Curved consoles with glowing holographic displays and blinking buttons line the foreground, a coffee cup left on one of them. Stars, a thin moon and the bright atmospheric horizon of the planet fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Holographic displays flicker and scroll softly, console lights blink, the planet drifts very slowly past the window, stars twinkle. --motion low --loop
```

#### ✓ Moduli abitativi

Moduli dell'equipaggio: cuccette, armadietti e un piccolo oblò rotondo.  
File: `assets/arene/scifi/luoghi/moduli-abitativi.webp` · video: `assets/arene/scifi/luoghi/moduli-abitativi.mp4`

**Immagine**

```text
Cramped crew living modules, with a round porthole showing stars and the edge of a planet in the central third of the frame. Stacked bunks with tangled blankets, personal lockers covered in stickers without text, a floating mug and a small potted plant fill the foreground. A narrow corridor with soft blue strip lights leads into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. A mug and small objects float slowly in zero gravity, the blanket drifts gently, stars move slowly past the porthole, lights flicker softly. --motion low --loop
```

#### ✓ Condotti di servizio

Condotti di servizio angusti con cavi, sfiati di vapore e luci d'emergenza.  
File: `assets/arene/scifi/luoghi/condotti-di-servizio.webp` · video: `assets/arene/scifi/luoghi/condotti-di-servizio.mp4`

**Immagine**

```text
Narrow service ducts packed with cables and pipes, converging toward a red-lit junction with a sealed hatch in the central third of the frame. Steam vents, metal grates and a dropped wrench fill the foreground, with water dripping from a cracked pipe. Flickering emergency lights recede down the tunnel into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Steam puffs gently from the vents, emergency lights flicker, cables sway slightly, a thin haze drifts down the tunnel. --motion low --loop
```

### Pericoli · Stazione Orbitale

#### ✓ Drone di sicurezza impazzito

Drone di sicurezza fuori controllo con un solo occhio rosso e rotori che sprizzano scintille.  
File: `assets/arene/scifi/pericoli/drone-di-sicurezza-impazzito.webp` · video: `assets/arene/scifi/pericoli/drone-di-sicurezza-impazzito.mp4`

**Immagine**

```text
A rogue security drone hovering in a dark station corridor, a spherical armoured body with scratched white plates, a single large glowing red eye and two damaged rotors throwing sparks. A stun prod hangs from its underside, and a warning light on its side blinks red. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The drone hovers with a gentle bob, rotors blur, small sparks fall occasionally, the red eye pulses slowly. --motion low --loop
```

#### ✓ Sciame di nanobot

Sciame argentato di nanobot che si avvita in una sagoma minacciosa.  
File: `assets/arene/scifi/pericoli/sciame-di-nanobot.webp` · video: `assets/arene/scifi/pericoli/sciame-di-nanobot.mp4`

**Immagine**

```text
A swirling silver swarm of millions of nanobots forming a menacing face-like shape in the dark, tiny metal particles glinting with cyan highlights. Streams of the swarm pour out of a broken wall panel behind it, and loose particles drift around the edges. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The nanobot swarm swirls slowly and continuously, glints shimmer across it, the face shape holds steady. --motion low --loop
```

#### ✓ Creatura aliena dai tentacoli

Creatura aliena con tentacoli lucidi e macchie bioluminescenti che esce da una grata.  
File: `assets/arene/scifi/pericoli/creatura-aliena-dai-tentacoli.webp` · video: `assets/arene/scifi/pericoli/creatura-aliena-dai-tentacoli.mp4`

**Immagine**

```text
An alien creature squeezing out of a vent grate, glossy dark tentacles with bioluminescent blue spots wrapping around the bent bars. A cluster of glowing eyes and a ring of small teeth sit at the centre of its body, and slime drips onto the metal floor. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The tentacles curl and uncurl very slowly, bioluminescent spots pulse softly, the eyes blink, mist drifts from the vent. --motion low --loop
```

#### ✓ Androide da combattimento

Androide da combattimento corazzato, visore acceso, pelle sintetica strappata.  
File: `assets/arene/scifi/pericoli/androide-da-combattimento.webp` · video: `assets/arene/scifi/pericoli/androide-da-combattimento.mp4`

**Immagine**

```text
A battle android standing in a red-lit corridor, an armoured chassis of dark grey plates, a glowing cyan visor across its face and torn synthetic skin on one cheek revealing the metal skull. Exposed cables spark at its neck, and its armoured shoulders are scratched by battle. Stylized painterly character concept art with visible expressive brushwork and faceted metal planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The visor light scans slowly left to right, small sparks fizz from the torn skin, the red light pulses behind. --motion low --loop
```

### Armi · Stazione Orbitale

#### Fucile al plasma

Fucile al plasma affusolato con celle d'energia ciano.  
File: `assets/arene/scifi/armi/fucile-al-plasma.webp`

**Immagine**

```text
A sleek plasma rifle with a white and graphite body, two transparent energy cells glowing cyan along the side, cooling fins near the barrel and a small holographic sight. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lama vibrante

Lama vibrante con il filo traslucido che ronza.  
File: `assets/arene/scifi/armi/lama-vibrante.webp`

**Immagine**

```text
A vibro-blade with a long translucent edge humming with faint blue light, a ribbed black grip with a power switch and a small battery pack at the pommel. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola laser

Pistola laser compatta con emettitore rosso.  
File: `assets/arene/scifi/armi/pistola-laser.webp`

**Immagine**

```text
A compact laser pistol with a matte grey body, a glowing red emitter tip, a charge indicator of small lights and a textured rubber grip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Granata EMP

Granata EMP sferica con archi elettrici blu.  
File: `assets/arene/scifi/armi/granata-emp.webp`

**Immagine**

```text
A spherical EMP grenade made of segmented metal plates, a glowing blue core visible through the gaps and small crackling electric arcs dancing on its surface. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Frusta monofilamento

Frusta a monofilamento: impugnatura metallica e un filo luminoso quasi invisibile.  
File: `assets/arene/scifi/armi/frusta-monofilamento.webp`

**Immagine**

```text
A monofilament whip with a chrome cylindrical handle and a thin glowing cyan line coiled loosely around it, sharp enough to cut steel. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Taser a impulsi

Taser a impulsi con elettrodi che crepitano.  
File: `assets/arene/scifi/armi/taser-a-impulsi.webp`

**Immagine**

```text
A pulse taser shaped like a short baton, with two metal electrodes at the tip crackling with bright blue electricity and a glowing charge strip on the handle. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Cannone a rotaia portatile

Cannone a rotaia portatile con binari magnetici e calcio pesante.  
File: `assets/arene/scifi/armi/cannone-a-rotaia-portatile.webp`

**Immagine**

```text
A portable railgun with twin parallel magnetic rails glowing faintly between them, a heavy reinforced stock, a power cable and a large scope. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold cyan key light with a red warning rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Città degli Infetti

Ospedali vuoti, orde affamate e radio gracchianti.

- **Atmosfera**: Città abbandonata dopo il contagio: verdi malati e grigi su ruggine e cemento bagnato, neon tremolanti, smog basso.
- **Frase di luce dell'arena** (è già nei comandi): `Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog.`

### Luoghi · Città degli Infetti

#### ✓ Ospedale

Corridoio d'ospedale abbandonato con barelle rovesciate, luci tremolanti e porte barricate.  
File: `assets/arene/zombie/luoghi/ospedale.webp` · video: `assets/arene/zombie/luoghi/ospedale.mp4`

**Immagine**

```text
An abandoned hospital corridor leading to barricaded double doors in the central third of the frame, chairs and gurneys piled against them. Overturned gurneys, scattered pill bottles, a wheelchair and a toppled IV stand cover the foreground floor. Flickering ceiling lights, a torn privacy curtain and smeared windows recede into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Ceiling lights flicker irregularly, a torn curtain sways slightly, dust drifts in the light, the IV bag swings gently. --motion low --loop
```

#### ✓ Centro commerciale

Atrio di un centro commerciale saccheggiato: scale mobili rotte, carrelli, lucernari.  
File: `assets/arene/zombie/luoghi/centro-commerciale.webp` · video: `assets/arene/zombie/luoghi/centro-commerciale.mp4`

**Immagine**

```text
A looted shopping mall atrium with a broken escalator rising through the central third of the frame toward a dark upper floor. Abandoned shopping trolleys, shattered glass, a fallen mannequin and scattered shoes fill the foreground. Dusty skylights pour pale green light over empty shop fronts and torn blank banners in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Pale light beams shift softly through the skylights, dust motes float, a loose sign sways slightly, a trolley rolls a few centimetres. --motion low --loop
```

#### ✓ Metropolitana

Banchina della metro al buio, treno deragliato, binari allagati, lampade d'emergenza.  
File: `assets/arene/zombie/luoghi/metropolitana.webp` · video: `assets/arene/zombie/luoghi/metropolitana.mp4`

**Immagine**

```text
A dark subway platform with a derailed train tilted across the tracks in the central third of the frame, its doors half open and windows cracked. Flooded rails, a fallen bench and scattered suitcases fill the foreground, reflected in still water. Emergency lamps glow at intervals along the tunnel into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Emergency lamps flicker, water drips and ripples slowly across the flooded tracks, a light haze drifts in the tunnel. --motion low --loop
```

#### ✓ Scuola

Corridoio di scuola vuoto, armadietti, fogli a terra, finestre sbarrate con assi.  
File: `assets/arene/zombie/luoghi/scuola.webp` · video: `assets/arene/zombie/luoghi/scuola.mp4`

**Immagine**

```text
An empty school hallway with a line of dented lockers leading to a set of double doors in the central third of the frame. Loose papers, a dropped backpack, a basketball and a fallen fire extinguisher lie on the foreground floor. Windows boarded up with planks let thin beams of grey light into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Loose papers flutter slightly in a draft, thin light beams shimmer, a locker door swings very slowly, dust drifts. --motion low --loop
```

#### ✓ Stazione di polizia

Stazione di polizia fortificata: sacchi di sabbia, furgone blindato, fari.  
File: `assets/arene/zombie/luoghi/stazione-di-polizia.webp` · video: `assets/arene/zombie/luoghi/stazione-di-polizia.mp4`

**Immagine**

```text
A fortified police station with an armoured van parked in the central third of the frame, its rear doors open. Sandbag walls, traffic cones, coils of barbed wire and an abandoned riot shield fill the foreground. Searchlights cut through the smog over the brick station facade in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Searchlights sweep slowly through the smog, a torn flag ripples gently, the van hazard lights blink. --motion low --loop
```

#### ✓ Periferia

Strada di periferia con auto abbandonate, prati incolti e fumo all'orizzonte.  
File: `assets/arene/zombie/luoghi/periferia.webp` · video: `assets/arene/zombie/luoghi/periferia.mp4`

**Immagine**

```text
A suburban street with a crashed car against a lamp post and an abandoned yellow school bus in the central third of the frame. Overgrown lawns, a fallen mailbox and a child tricycle fill the foreground. Rows of silent houses with boarded windows and a column of black smoke on the horizon fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Smoke rises slowly on the horizon, tall grass sways, a swing creaks gently back and forth, clouds drift. --motion low --loop
```

#### Piazza

Piazza del convoglio abbandonato, casse aperte e vie verso ospedale, negozi e metropolitana.  
File: `assets/arene/zombie/luoghi/piazza.webp` · video: `assets/arene/zombie/luoghi/piazza.mp4`

**Immagine**

```text
An abandoned supply convoy stands in the central third of a rain soaked city square, its battered truck doors hanging open beside overturned wooden crates. A hospital entrance, shuttered shopping arcade and stairway down to the subway frame three separate exits in the background. Torn plastic sheeting, loose bandages and an empty water can lie across the foreground paving stones. Sickly reflections shimmer in shallow puddles between scattered barricades. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Loose plastic sheeting lifts gently in the wind, shallow puddles ripple, and a failing fluorescent light flickers near the subway stairs. --motion low --loop
```

### Pericoli · Città degli Infetti

#### ✓ Orda di zombi

Orda fitta di zombi che riempie una strada, tante mani protese in avanti.  
File: `assets/arene/zombie/pericoli/orda-di-zombi.webp` · video: `assets/arene/zombie/pericoli/orda-di-zombi.mp4`

**Immagine**

```text
A dense horde of shambling zombies filling a city street, the closest one in sharp focus with milky white eyes, grey cracked skin and a torn office shirt. Dozens of hands reach forward behind it, and the crowd fades into green smog. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The horde sways slowly in place, heads tilt, hands twitch, smog drifts between them. --motion low --loop
```

#### ✓ Infetto corridore

Infetto corridore pronto allo scatto, vestiti strappati, occhi folli.  
File: `assets/arene/zombie/pericoli/infetto-corridore.webp` · video: `assets/arene/zombie/pericoli/infetto-corridore.mp4`

**Immagine**

```text
A fast infected runner crouched low and ready to sprint, wearing a torn hoodie and one shoe, dark veins spreading under pale skin and wild glowing eyes fixed on the viewer. Its fingers are spread on the asphalt like claws. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The runner breathes rapidly with small shoulder movements, its head twitches, torn clothes flutter, smog drifts behind. --motion low --loop
```

#### ✓ Cane infetto

Cane infetto con pelo a chiazze, denti scoperti e occhi lattiginosi.  
File: `assets/arene/zombie/pericoli/cane-infetto.webp` · video: `assets/arene/zombie/pericoli/cane-infetto.mp4`

**Immagine**

```text
An infected dog with patchy grey fur, bared yellow teeth and milky eyes, a broken leather collar around its neck, growling low with its head lowered and hackles raised. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The dog growls with slow heavy breathing, lips quiver, fur bristles in the wind. --motion low --loop
```

#### ✓ Gigante mutato

Gigante mutato con muscoli gonfi ed escrescenze ossee che sfonda un muro.  
File: `assets/arene/zombie/pericoli/gigante-mutato.webp` · video: `assets/arene/zombie/pericoli/gigante-mutato.mp4`

**Immagine**

```text
A towering mutated giant bursting through a brick wall, swollen grey muscles, bony plates growing out of its shoulders and one arm far larger than the other. Dust and falling bricks surround it, and its small eyes glow sickly green. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The giant breathes heavily with slow chest movement, dust and small bricks crumble down, its eyes glow faintly. --motion low --loop
```

### Armi · Città degli Infetti

#### Mazza chiodata

Mazza da baseball avvolta nel filo spinato e nei chiodi.  
File: `assets/arene/zombie/armi/mazza-chiodata.webp`

**Immagine**

```text
A wooden baseball bat wrapped in rusty barbed wire and studded with bent nails, its handle taped with black grip tape. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile a pompa

Fucile a pompa con il calcio rattoppato col nastro.  
File: `assets/arene/zombie/armi/fucile-a-pompa.webp`

**Immagine**

```text
A pump-action shotgun with a scratched black barrel, a wooden pump and a cracked stock held together with grey duct tape, a few red shells strapped to the side. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Piede di porco

Piede di porco in acciaio rosso.  
File: `assets/arene/zombie/armi/piede-di-porco.webp`

**Immagine**

```text
A red steel crowbar with scuffed and chipped paint, a curved claw end and a flat pry end bent from use. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Motosega

Motosega con il corpo arancione graffiato.  
File: `assets/arene/zombie/armi/motosega.webp`

**Immagine**

```text
A chainsaw with a scratched orange body, a long steel bar, a dull chain and a pull-start cord hanging loose. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Katana

Katana con l'impugnatura consumata.  
File: `assets/arene/zombie/armi/katana.webp`

**Immagine**

```text
A katana with a gently curved polished blade, a round guard and a worn handle wrapped in faded black cord. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra moderna da caccia con mirino.  
File: `assets/arene/zombie/armi/balestra.webp`

**Immagine**

```text
A modern hunting crossbow with a black composite frame, a mounted scope, taut cables and a bolt loaded and ready. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola

Pistola semiautomatica malridotta.  
File: `assets/arene/zombie/armi/pistola.webp`

**Immagine**

```text
A battered semi-automatic pistol with worn black finish, scratches along the slide and a magazine slightly sticking out. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Accetta

Accetta con impugnatura in gomma.  
File: `assets/arene/zombie/armi/accetta.webp`

**Immagine**

```text
A short hatchet with a steel head, a sharp bright edge and a red rubber grip with a wrist strap. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a sickly green overcast key light with a pale fluorescent rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Isola Battle Royale

Un aereo, cento casse e una zona che si stringe.

- **Atmosfera**: Isola tropicale da battle royale: mare turchese, verde giungla, riflessi arancio del tardo pomeriggio, ombre blu, foschia marina.
- **Frase di luce dell'arena** (è già nei comandi): `Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze.`

### Luoghi · Isola Battle Royale

#### ✓ Aeroporto

Piccolo aeroporto dell'isola con pista, un cargo arrugginito e la torre di controllo.  
File: `assets/arene/royale/luoghi/aeroporto.webp` · video: `assets/arene/royale/luoghi/aeroporto.mp4`

**Immagine**

```text
A small island airport with a rusty propeller cargo plane parked on a cracked runway in the central third of the frame, its cargo ramp open. Supply crates with parachutes, a fuel cart and an orange windsock fill the foreground. A white control tower, swaying palm trees and the turquoise sea fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The windsock flutters gently, palm fronds sway, heat haze shimmers over the runway, clouds drift slowly. --motion low --loop
```

#### ✓ Base militare

Base militare con tende, torrette, casse di rifornimento ed eliporto.  
File: `assets/arene/royale/luoghi/base-militare.webp` · video: `assets/arene/royale/luoghi/base-militare.mp4`

**Immagine**

```text
A military base with a helipad and a parked olive green helicopter in the central third of the frame. Stacked supply crates, sandbag walls and camouflage nets fill the foreground, with a glowing loot crate among them. Wooden watchtowers, canvas tents and jungle hills fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Camouflage nets ripple in the breeze, a flag waves gently, a searchlight turns slowly, dust drifts. --motion low --loop
```

#### ✓ Villaggio costiero

Villaggio di pescatori con case colorate, pontile di legno e barche.  
File: `assets/arene/royale/luoghi/villaggio-costiero.webp` · video: `assets/arene/royale/luoghi/villaggio-costiero.mp4`

**Immagine**

```text
A coastal fishing village with a long wooden pier and colourful moored boats in the central third of the frame. Drying fishing nets, red buoys and a stack of wooden crates fill the foreground. Pastel houses with tin roofs, palm trees and the open sea fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Boats bob gently on the water, small waves lap the pier, nets sway, seagulls glide slowly in the distance. --motion low --loop
```

#### ✓ Centrale elettrica

Centrale elettrica con torri di raffreddamento, tralicci e trasformatori.  
File: `assets/arene/royale/luoghi/centrale-elettrica.webp` · video: `assets/arene/royale/luoghi/centrale-elettrica.mp4`

**Immagine**

```text
A power plant with two concrete cooling towers releasing white steam in the central third of the frame. Humming transformers, chain-link fences and blank yellow warning signs fill the foreground. Tall electricity pylons with sagging cables and jungle hills fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Steam rises slowly from the cooling towers, transformer lights blink, wires sway slightly, heat haze shimmers. --motion low --loop
```

#### ✓ Fattoria

Fattoria con fienile rosso, balle di fieno, silos e campi di grano.  
File: `assets/arene/royale/luoghi/fattoria.webp` · video: `assets/arene/royale/luoghi/fattoria.mp4`

**Immagine**

```text
A farm with a red wooden barn, a tall silver silo and an old windmill in the central third of the frame. Round hay bales, a rusty tractor and a broken wooden fence fill the foreground. Golden wheat fields rippling toward a line of palm trees fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Wheat sways in gentle waves, the windmill turns slowly, a barn door creaks slightly, dust floats in the light. --motion low --loop
```

#### ✓ Foresta

Foresta tropicale rigogliosa con palme, felci e una cassa di rifornimento nascosta.  
File: `assets/arene/royale/luoghi/foresta.webp` · video: `assets/arene/royale/luoghi/foresta.mp4`

**Immagine**

```text
A lush tropical forest with a glowing supply crate resting in a small sunlit clearing in the central third of the frame. Giant ferns, thick roots, fallen palm fronds and bright flowers fill the foreground. Tall palms, hanging vines and shafts of golden light through the canopy fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Shafts of sunlight shimmer, leaves sway, the crate glows with a slow pulse, small insects and pollen float. --motion low --loop
```

### Pericoli · Isola Battle Royale

#### ✓ Drone armato

Drone quadricottero armato con mitragliatrice e laser di puntamento rosso.  
File: `assets/arene/royale/pericoli/drone-armato.webp` · video: `assets/arene/royale/pericoli/drone-armato.mp4`

**Immagine**

```text
An armed quadcopter drone hovering over the jungle canopy, a black carbon body with four spinning rotors, a mounted gun turret underneath and a red targeting laser beam pointing at the viewer. Its camera lens glows red and a small antenna blinks. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The drone hovers with a gentle bob, the rotors blur, the red laser sweeps slowly, leaves sway below. --motion low --loop
```

#### ✓ Elicottero da caccia

Elicottero d'attacco in volo basso con il faro acceso.  
File: `assets/arene/royale/pericoli/elicottero-da-caccia.webp` · video: `assets/arene/royale/pericoli/elicottero-da-caccia.mp4`

**Immagine**

```text
An attack helicopter hovering low over the jungle seen head-on, a dark grey armoured body, a tinted cockpit glowing faintly, rocket pods under its stubby wings and a bright searchlight beam aimed at the viewer. Palm trees bend in the downdraft below it. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The helicopter hovers in place with blurred rotors, the searchlight sways slowly, palm trees bend in the downdraft. --motion low --loop
```

#### ✓ Cane da guardia addestrato

Pastore tedesco da guardia con giubbotto tattico, che abbaia.  
File: `assets/arene/royale/pericoli/cane-da-guardia-addestrato.webp` · video: `assets/arene/royale/pericoli/cane-da-guardia-addestrato.mp4`

**Immagine**

```text
A trained German shepherd guard dog in a black tactical vest with pouches, ears up and teeth showing, barking at the viewer. A leash trails on the dusty ground, and the fence of a military base is visible behind it. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The dog breathes with its tongue out between barks, ears twitch, the vest straps shift slightly. --motion low --loop
```

### Armi · Isola Battle Royale

#### Fucile d'assalto

Fucile d'assalto con mirino a punto rosso.  
File: `assets/arene/royale/armi/fucile-dassalto.webp`

**Immagine**

```text
An assault rifle with a black and tan body, a red-dot sight on the top rail, a curved magazine and a short foregrip, with a subtle golden rarity glow along its edges. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola

Pistola semiautomatica nera.  
File: `assets/arene/royale/armi/pistola.webp`

**Immagine**

```text
A black semi-automatic pistol with a textured grip, a short slide and a small flashlight attached under the barrel. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile da cecchino

Fucile da cecchino con cannocchiale lungo e bipiede.  
File: `assets/arene/royale/armi/fucile-da-cecchino.webp`

**Immagine**

```text
A long sniper rifle with a dark green body, a large scope, a folded bipod and a fabric cheek pad on the stock. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile a pompa

Fucile a pompa tattico.  
File: `assets/arene/royale/armi/fucile-a-pompa.webp`

**Immagine**

```text
A tactical pump shotgun with a black synthetic stock, a ribbed pump and a row of red shells held in a side carrier. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Granata

Granata a frammentazione con la spoletta.  
File: `assets/arene/royale/armi/granata.webp`

**Immagine**

```text
A round fragmentation grenade with a ridged olive green body, a metal lever and a pull ring with its pin. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mitraglietta

Mitraglietta compatta.  
File: `assets/arene/royale/armi/mitraglietta.webp`

**Immagine**

```text
A compact submachine gun with a folding stock, a long straight magazine and a short suppressor. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Coltello da combattimento

Coltello da combattimento con dorso seghettato.  
File: `assets/arene/royale/armi/coltello-da-combattimento.webp`

**Immagine**

```text
A combat knife with a black steel blade, a serrated spine, a textured rubber handle and a finger guard. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra

Balestra tattica mimetica.  
File: `assets/arene/royale/armi/balestra.webp`

**Immagine**

```text
A tactical crossbow with a green camouflage frame, a red-dot sight and a bolt with bright orange fletching loaded and ready. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a bright warm afternoon key light with a cool blue rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Villa Maledetta

Specchi che sussurrano e porte che si chiudono da sole.

- **Atmosfera**: Villa gotica maledetta: luce lunare cremisi e oro di candela contro ombre nere, nebbia fredda strisciante. Paura sottile, niente sangue esplicito.
- **Frase di luce dell'arena** (è già nei comandi): `Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog.`

### Luoghi · Villa Maledetta

#### ✓ Cantina

Cantina umida con botti piene di ragnatele, una lampadina che oscilla e una porta socchiusa.  
File: `assets/arene/horror/luoghi/cantina.webp` · video: `assets/arene/horror/luoghi/cantina.mp4`

**Immagine**

```text
A damp wine cellar with a heavy wooden door left ajar in the central third of the frame, a sliver of red light glowing through the gap. Cobwebbed barrels, dusty broken bottles and worn stone steps fill the foreground. A single bare bulb hangs from vaulted brick arches in the background, its light barely reaching the corners. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The bulb swings very slowly and flickers, cobwebs sway, dust drifts in the light, the door creaks slightly. --motion low --loop
```

#### ✓ Soffitta

Soffitta polverosa con mobili coperti da teli, un cavallo a dondolo e luna da un oblò.  
File: `assets/arene/horror/luoghi/soffitta.webp` · video: `assets/arene/horror/luoghi/soffitta.mp4`

**Immagine**

```text
A dusty attic with an old wooden rocking horse in the central third of the frame, lit by a cold moonbeam through a round window. Sheet-covered furniture, a cracked oval mirror and old leather trunks fill the foreground. Slanted roof beams, hanging cobwebs and a toy music box fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The rocking horse rocks almost imperceptibly, sheets ripple slightly, dust floats in the moonbeam. --motion low --loop
```

#### ✓ Cappella

Cappella gotica privata con candele, vetrate rotte e panche vuote.  
File: `assets/arene/horror/luoghi/cappella.webp` · video: `assets/arene/horror/luoghi/cappella.mp4`

**Immagine**

```text
A private gothic chapel with a candle-lit altar in the central third of the frame beneath a broken stained glass window. Empty wooden pews, fallen brass candlesticks and scattered dried roses fill the foreground. Tall pointed arches and crimson moonlight streaming through the coloured glass fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Candle flames flicker gently, smoke curls upward, coloured moonlight shifts slowly on the floor. --motion low --loop
```

#### ✓ Cimitero

Cimitero incolto con lapidi storte, cancello di ferro e nebbia sotto una luna rossa.  
File: `assets/arene/horror/luoghi/cimitero.webp` · video: `assets/arene/horror/luoghi/cimitero.mp4`

**Immagine**

```text
An overgrown cemetery with a tall wrought iron gate standing open in the central third of the frame. Leaning tombstones, dead flowers and a lit lantern resting on a grave fill the foreground. A blood red moon, a dead tree full of crows and the dark mansion silhouette on a hill fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Fog creeps slowly between the graves, the gate sways slightly, the lantern flickers, crows shift on the dead tree. --motion low --loop
```

#### ✓ Biblioteca

Biblioteca antica con scaffali altissimi, polvere sospesa e un libro aperto sul leggio.  
File: `assets/arene/horror/luoghi/biblioteca.webp` · video: `assets/arene/horror/luoghi/biblioteca.mp4`

**Immagine**

```text
A grand old library with a heavy book lying open on a carved lectern in the central third of the frame, lit by a single candle. Stacks of books, a tarnished candelabra and a fallen rolling ladder fill the foreground. Towering shelves and a spiral staircase vanish into darkness in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Book pages turn slowly by themselves, candle flames flicker, dust floats in the light, shadows shift. --motion low --loop
```

#### ✓ Serra

Serra vittoriana in rovina con vetri rotti, piante carnivore e rampicanti.  
File: `assets/arene/horror/luoghi/serra.webp` · video: `assets/arene/horror/luoghi/serra.mp4`

**Immagine**

```text
A derelict Victorian greenhouse with a cracked stone fountain in the central third of the frame. Shattered glass, overturned clay pots and carnivorous plants with open mouths fill the foreground. Creeping vines climb the broken iron frames against a red moon in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Carnivorous plants open and close very slowly, vines sway, fog drifts through the broken panes. --motion low --loop
```

#### Salone

Salone del ballo della villa, tavoli con doni e porte verso le diverse ali dell'edificio.  
File: `assets/arene/horror/luoghi/salone.webp` · video: `assets/arene/horror/luoghi/salone.mp4`

**Immagine**

```text
A grand abandoned ballroom fills the central third of a decaying gothic mansion, with a cracked marble dance floor and a long table holding small parcels wrapped in black paper. Tall doorways lead toward a staircase, a dark library corridor and a glass garden entrance. A broken masquerade mask, fallen wax and a single overturned chair occupy the foreground. Tarnished mirrors and heavy curtains recede into deep shadow beneath an old chandelier. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Candle flames sway gently, a loose curtain moves slowly beside a doorway, and thin fog slides across the cracked marble floor. --motion low --loop
```

### Pericoli · Villa Maledetta

#### ✓ Spettro urlante

Fantasma che urla con la bocca innaturalmente allungata e capelli pallidi fluttuanti.  
File: `assets/arene/horror/pericoli/spettro-urlante.webp` · video: `assets/arene/horror/pericoli/spettro-urlante.mp4`

**Immagine**

```text
A screaming ghost of a woman with an unnaturally stretched mouth and empty dark eyes, pale hair floating as if underwater, glowing white against the darkness. Her translucent hands are raised toward the viewer, and the tattered edge of an old nightgown fades into mist. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The ghost hovers with a slow floating motion, its hair drifts as if underwater, the glow pulses softly. --motion low --loop
```

#### ✓ Bambola posseduta

Bambola di porcellana col viso incrinato e un occhio di vetro, seduta su una sedia.  
File: `assets/arene/horror/pericoli/bambola-posseduta.webp` · video: `assets/arene/horror/pericoli/bambola-posseduta.mp4`

**Immagine**

```text
A porcelain doll with a cracked face and one blue glass eye sitting in a small wooden chair, wearing a yellowed lace dress, its head tilted slightly too far. A single candle beside it lights its painted smile. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The doll head turns very slowly by a few degrees, its glass eye glints, the chair rocks almost imperceptibly. --motion low --loop
```

#### ✓ Entità senza volto

Entità alta e senza volto in un corridoio buio, braccia troppo lunghe.  
File: `assets/arene/horror/pericoli/entita-senza-volto.webp` · video: `assets/arene/horror/pericoli/entita-senza-volto.mp4`

**Immagine**

```text
A tall faceless entity in an old black suit standing at the end of a dark corridor, smooth pale skin where its face should be and unnaturally long arms hanging to its knees. A flickering wall lamp beside it is the only light. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The entity stands still while its shape subtly flickers, the corridor light buzzes and dims, fog crawls at its feet. --motion low --loop
```

#### ✓ Stormo di corvi

Stormo di corvi su un albero morto; uno fissa chi guarda.  
File: `assets/arene/horror/pericoli/stormo-di-corvi.webp` · video: `assets/arene/horror/pericoli/stormo-di-corvi.mp4`

**Immagine**

```text
A flock of black crows perched on the twisted branches of a dead tree under a red moon, one large crow in front staring straight at the viewer with a glinting eye. A few black feathers drift in the air. Stylized painterly character concept art with visible expressive brushwork and faceted stone planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The crows shift and ruffle their feathers, one tilts its head, a few feathers drift down, clouds pass the moon. --motion low --loop
```

### Armi · Villa Maledetta

#### Candelabro d'argento

Candelabro d'argento pesante con tre candele che colano.  
File: `assets/arene/horror/armi/candelabro-dargento.webp`

**Immagine**

```text
A heavy tarnished silver candelabra with three branches and three white candles, wax dripping down the sides, one flame still burning. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ascia

Vecchia ascia arrugginita.  
File: `assets/arene/horror/armi/ascia.webp`

**Immagine**

```text
An old rusted axe with a cracked wooden handle, a chipped blade with dark stains of age and a strip of old cloth tied near the head. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile da caccia

Doppietta da caccia con calcio in legno.  
File: `assets/arene/horror/armi/fucile-da-caccia.webp`

**Immagine**

```text
A double-barrelled hunting shotgun with a polished walnut stock, engraved silver side plates and worn dark barrels. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pugnale rituale

Pugnale rituale con elsa d'osso e simboli incisi.  
File: `assets/arene/horror/armi/pugnale-rituale.webp`

**Immagine**

```text
A ritual dagger with a wavy black blade, a hilt carved from bone and engraved occult symbols that glow faint red. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Crocifisso appuntito

Crocifisso di legno appuntito come un paletto.  
File: `assets/arene/horror/armi/crocifisso-appuntito.webp`

**Immagine**

```text
A dark wooden crucifix with a small silver figure, its long bottom end carved into a sharp stake. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Attizzatoio

Attizzatoio da camino in ferro battuto.  
File: `assets/arene/horror/armi/attizzatoio.webp`

**Immagine**

```text
A wrought iron fireplace poker with a hooked pointed tip, a twisted shaft and a ring handle, its end still glowing faintly from the fire. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Falce

Falce da contadino con la lama lunga e curva.  
File: `assets/arene/horror/armi/falce.webp`

**Immagine**

```text
A farmer scythe with a long curved rusty blade and a weathered wooden snath with two worn handles. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a warm candle gold key light with a crimson moonlight rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Terre Desolate

Polvere radioattiva, predoni e motori truccati.

- **Atmosfera**: Deserto post-atomico: sole bruciante su sabbia ocra e lamiere arrugginite, riflessi arancio, ombre terra d'ombra, foschia di polvere.
- **Frase di luce dell'arena** (è già nei comandi): `Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust.`

### Luoghi · Terre Desolate

#### ✓ Discarica

Enorme sfasciacarrozze di auto arrugginite, pneumatici e rottami sotto un sole velato.  
File: `assets/arene/wasteland/luoghi/discarica.webp` · video: `assets/arene/wasteland/luoghi/discarica.mp4`

**Immagine**

```text
A vast scrapyard with a towering pile of crushed rusted cars in the central third of the frame, topped by a lookout hut made of sheet metal. Old tyres, dented oil drums and a rusted car door fill the foreground. A tall rusted crane with a hanging magnet and a hazy pale sun fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Heat haze shimmers, a loose sheet of metal flaps slowly, dust blows across the ground, the crane hook sways. --motion low --loop
```

#### ✓ Autostrada spezzata

Cavalcavia autostradale crollato nel deserto, camion abbandonati.  
File: `assets/arene/wasteland/luoghi/autostrada-spezzata.webp` · video: `assets/arene/wasteland/luoghi/autostrada-spezzata.mp4`

**Immagine**

```text
A broken highway overpass collapsed into the desert, its snapped concrete span hanging over the central third of the frame with rebar sticking out. Abandoned trucks, cracked asphalt and toppled road barriers fill the foreground, half covered by sand. Endless dunes and a blazing white sun fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Sand blows slowly across the asphalt, heat haze shimmers, a torn tarp flaps on a truck. --motion low --loop
```

#### ✓ Raffineria

Raffineria arrugginita con torce di gas accese e un intrico di tubi.  
File: `assets/arene/wasteland/luoghi/raffineria.webp` · video: `assets/arene/wasteland/luoghi/raffineria.mp4`

**Immagine**

```text
A rusted oil refinery with a tall flare stack burning a bright flame in the central third of the frame. Tangled pipes, wheel valves and leaking oil barrels fill the foreground. Round storage tanks and columns of black smoke against an orange sky fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The flare flame flickers and dances, smoke rises slowly, steam leaks from a valve, heat haze shimmers. --motion low --loop
```

#### ✓ Città fantasma

Città fantasma con edifici mezzi sepolti, cartelloni sbiaditi e rotolacampo.  
File: `assets/arene/wasteland/luoghi/citta-fantasma.webp` · video: `assets/arene/wasteland/luoghi/citta-fantasma.mp4`

**Immagine**

```text
A ghost town main street with a half-buried roadside diner in the central third of the frame, its neon frame dark and broken. Tumbleweeds, a dead traffic light hanging from a wire and drifting sand fill the foreground. Faded blank billboards and broken buildings fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Tumbleweeds roll slowly, sand drifts in the wind, a hanging sign sways, the dead traffic light dangles. --motion low --loop
```

#### ✓ Cratere

Cratere radioattivo enorme con pozze che brillano di verde.  
File: `assets/arene/wasteland/luoghi/cratere.webp` · video: `assets/arene/wasteland/luoghi/cratere.mp4`

**Immagine**

```text
A huge radioactive crater with glowing green pools at its centre in the central third of the frame, steam rising from the water. Yellow warning barrels, cracked rocks and the burnt skeleton of a car fill the foreground rim. A toxic yellow sky and distant ruined towers fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The green pools pulse and bubble softly, toxic vapour rises slowly, dust drifts across the rim. --motion low --loop
```

#### ✓ Diga

Diga di cemento gigante incrinata, con un insediamento di fortuna in cima.  
File: `assets/arene/wasteland/luoghi/diga.webp` · video: `assets/arene/wasteland/luoghi/diga.mp4`

**Immagine**

```text
A giant cracked concrete dam with a makeshift settlement of shacks, flags and water tanks on top in the central third of the frame. A dry riverbed, rusted pipes and a boat wreck fill the foreground. A thin waterfall leaks through a crack in the wall against a dusty sky in the background. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Water trickles through the crack, flags flutter on the shacks, dust drifts, smoke rises from a chimney. --motion low --loop
```

#### Deposito

Deposito di rifornimenti con cancello aperto, taniche e casse vicino all'autostrada spezzata.  
File: `assets/arene/wasteland/luoghi/deposito.webp` · video: `assets/arene/wasteland/luoghi/deposito.mp4`

**Immagine**

```text
A rusted supply depot stands in the central third of a dusty desert yard, its heavy gate pushed open onto stacked crates and dented water cans. A cracked service road leads toward a broken highway, while low scrap heaps and distant empty buildings mark two other exits. A frayed rope, an overturned metal cup and dry tire tracks cross the foreground sand. Corrugated roofs and leaning fences fade into a thick burnt orange dust haze. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Fine dust drifts slowly through the open gate, a frayed rope sways gently, and warm heat shimmer rises above the cracked road. --motion low --loop
```

### Pericoli · Terre Desolate

#### ✓ Banda di predoni

Banda di predoni con armature di cuoio chiodato e occhialoni, accanto a buggy truccati.  
File: `assets/arene/wasteland/pericoli/banda-di-predoni.webp` · video: `assets/arene/wasteland/pericoli/banda-di-predoni.mp4`

**Immagine**

```text
A gang of raiders standing in front of their modified buggies, the leader in front with a tall mohawk, cracked goggles, a rusty face mask and spiked leather shoulder armour. The others behind are silhouettes holding chains and pipes, with a tattered flag on a buggy antenna. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The raiders breathe and shift their weight slightly, scarves flutter in the wind, dust blows past, engine heat shimmers. --motion low --loop
```

#### ✓ Scorpione gigante

Scorpione gigante del deserto col pungiglione alzato.  
File: `assets/arene/wasteland/pericoli/scorpione-gigante.webp` · video: `assets/arene/wasteland/pericoli/scorpione-gigante.mp4`

**Immagine**

```text
A giant desert scorpion as big as a car, its armoured faceted chitin shining in the harsh sun, claws open wide and its segmented tail raised high with a dripping stinger. Sand streams off its legs and a bleached skull lies beside it. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The scorpion stinger sways slowly, claws twitch, sand trickles off its shell. --motion low --loop
```

#### ✓ Branco di cani mutati

Branco di cani mutati senza pelo, con occhi in più, che ringhiano.  
File: `assets/arene/wasteland/pericoli/branco-di-cani-mutati.webp` · video: `assets/arene/wasteland/pericoli/branco-di-cani-mutati.mp4`

**Immagine**

```text
A pack of hairless mutated dogs with scarred grey skin, uneven extra eyes and long teeth, the leader in front growling low at the viewer. The others prowl behind it through blowing dust. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The dogs pant and growl with slow breathing, their eyes blink out of sync, dust drifts. --motion low --loop
```

#### ✓ Verme delle sabbie

Verme delle sabbie colossale che erompe dalle dune, bocca circolare piena di denti.  
File: `assets/arene/wasteland/pericoli/verme-delle-sabbie.webp` · video: `assets/arene/wasteland/pericoli/verme-delle-sabbie.mp4`

**Immagine**

```text
A colossal sandworm bursting out of the dunes, its circular mouth opened toward the viewer and lined with rings of inward-pointing teeth, its ridged body arching high. Sand pours from its skin in streams, and a small abandoned buggy lies on the dune below for scale. Stylized painterly character concept art with visible expressive brushwork and faceted rock planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The worm sways slowly, sand pours continuously from its body, the rings of teeth ripple, dust swirls. --motion low --loop
```

### Armi · Terre Desolate

#### Fucile arrugginito

Fucile a otturatore arrugginito con mirino legato col nastro.  
File: `assets/arene/wasteland/armi/fucile-arrugginito.webp`

**Immagine**

```text
A rusty bolt-action rifle with a cracked wooden stock, a scope held on with duct tape and a strip of leather as a sling. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lancia ricavata da un tubo

Lancia fatta con un tubo di metallo e un tondino appuntito.  
File: `assets/arene/wasteland/armi/lancia-ricavata-da-un-tubo.webp`

**Immagine**

```text
A spear made from a dented metal pipe with a sharpened length of rebar welded on the tip, wrapped with rags and wire for grip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Balestra artigianale

Balestra artigianale fatta con balestre d'auto e rottami.  
File: `assets/arene/wasteland/armi/balestra-artigianale.webp`

**Immagine**

```text
A homemade crossbow built from a car leaf spring, scrap metal and bolts, with a bicycle chain mechanism and a sharpened rebar bolt loaded. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Molotov

Bottiglia molotov con lo straccio in fiamme.  
File: `assets/arene/wasteland/armi/molotov.webp`

**Immagine**

```text
A molotov cocktail made from a glass bottle half full of amber fuel, a rag stuffed in the neck and burning with a small flame. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Catena

Catena pesante arrotolata con un lucchetto.  
File: `assets/arene/wasteland/armi/catena.webp`

**Immagine**

```text
A heavy coiled steel chain with thick rusted links and a big brass padlock hanging from one end. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mannaia

Mannaia grande con manico fasciato.  
File: `assets/arene/wasteland/armi/mannaia.webp`

**Immagine**

```text
A large meat cleaver with a broad scratched blade, a hole near the spine and a handle wrapped in dirty cloth. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Lanciachiodi

Sparachiodi modificato come arma, con caricatore a tamburo.  
File: `assets/arene/wasteland/armi/lanciachiodi.webp`

**Immagine**

```text
A nail gun modified into a weapon, with a welded drum magazine full of long nails, an extended barrel and a taped grip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a harsh scorched sunlight key light with a burnt orange rim light. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Liceo Spietato

Interrogazioni, gossip e alleanze da intervallo. Nessuno muore: si viene eliminati.

- **Atmosfera**: Liceo italiano in chiave satirica: luce pastello rosa e lilla dalle finestre alte, riflessi dorati, ombre viola morbide. Nessuna violenza: le «minacce» sono caricature.
- **Frase di luce dell'arena** (è già nei comandi): `Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood.`

### Luoghi · Liceo Spietato

#### ✓ Palestra

Palestra della scuola con parquet, canestri, funi e tappetini impilati.  
File: `assets/arene/liceo/luoghi/palestra.webp` · video: `assets/arene/liceo/luoghi/palestra.mp4`

**Immagine**

```text
A school gym with a basketball hoop above a polished wooden floor in the central third of the frame, a single ball resting under it. Stacked blue mats, a forgotten red dodgeball and a wooden bench with a towel fill the foreground. Climbing ropes, wall bars and tall windows full of afternoon light fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Climbing ropes sway gently, light beams shimmer through the windows, dust floats, the ball rolls a little. --motion low --loop
```

#### ✓ Mensa

Mensa scolastica dopo pranzo: tavoli lunghi, vassoi abbandonati, bancone fumante.  
File: `assets/arene/liceo/luoghi/mensa.webp` · video: `assets/arene/liceo/luoghi/mensa.mp4`

**Immagine**

```text
An empty school cafeteria after lunch, with a steaming lunch counter and stacked trays in the central third of the frame. Long tables with abandoned food trays, a spilled juice box and a half-eaten sandwich fill the foreground. Tall windows and colourful blank posters fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Steam rises softly from the counter, light beams shimmer, a napkin flutters, dust floats. --motion low --loop
```

#### ✓ Biblioteca

Biblioteca scolastica silenziosa con scaffali e tavoli da studio.  
File: `assets/arene/liceo/luoghi/biblioteca.webp` · video: `assets/arene/liceo/luoghi/biblioteca.mp4`

**Immagine**

```text
A quiet school library with a study table lit by a green desk lamp in the central third of the frame. Piles of textbooks, a forgotten backpack and scattered handwritten notes fill the foreground. Tall wooden bookshelves and arched windows with dust floating in the light fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Pages flutter slightly, dust drifts in the light, the lamp glows softly, light shifts slowly through the windows. --motion low --loop
```

#### ✓ Laboratorio di chimica

Laboratorio di chimica con becher, cappa aspirante e fiasche colorate che bollono.  
File: `assets/arene/liceo/luoghi/laboratorio-di-chimica.webp` · video: `assets/arene/liceo/luoghi/laboratorio-di-chimica.mp4`

**Immagine**

```text
A chemistry lab with a bench of colourful bubbling flasks connected by glass tubes in the central third of the frame. Beakers, test tubes in racks and a lit Bunsen burner fill the foreground. A fume hood and a colourful wall chart of blank squares fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The flasks bubble softly, coloured vapour rises slowly, the burner flame flickers. --motion low --loop
```

#### ✓ Cortile

Cortile della scuola con panchine, un albero, motorini e zaini a terra.  
File: `assets/arene/liceo/luoghi/cortile.webp` · video: `assets/arene/liceo/luoghi/cortile.mp4`

**Immagine**

```text
The school courtyard with a big leafy tree and a wooden bench in the central third of the frame. Parked scooters with stickers and backpacks on the ground fill the foreground. The school facade with tall windows and a big wall clock fills the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Leaves rustle and a few drift down, dappled sunlight moves on the ground, a ribbon on a scooter flutters. --motion low --loop
```

#### ✓ Aula magna

Aula magna con file di poltroncine, palco e microfono.  
File: `assets/arene/liceo/luoghi/aula-magna.webp` · video: `assets/arene/liceo/luoghi/aula-magna.mp4`

**Immagine**

```text
An assembly hall with a wooden stage and a single microphone under a spotlight in the central third of the frame. Rows of red folding seats fill the foreground, one with a forgotten jacket. Heavy velvet curtains and tall windows fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The spotlight beam shimmers with floating dust, the curtains sway gently, the microphone cable swings slightly. --motion low --loop
```

#### Aule

Aula scolastica con file di banchi, cattedra e porta aperta sul corridoio delle lezioni.  
File: `assets/arene/liceo/luoghi/aule.webp` · video: `assets/arene/liceo/luoghi/aule.mp4`

**Immagine**

```text
Rows of slightly mismatched school desks fill the central third of an Italian classroom, facing a teacher desk and a large chalkboard covered with faint abstract marks. An open door reveals the corridor outside, with a distant glimpse of the library entrance. A forgotten pencil case, an exercise book with blank pages and a crumpled paper ball sit in the foreground. Tall windows and pastel painted walls give the room a gently comic afternoon atmosphere. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. A curtain lifts softly beside the tall windows, a loose exercise book page turns gently, and pale dust motes float in the afternoon light. --motion low --loop
```

### Pericoli · Liceo Spietato

#### ✓ Preside

Caricatura della Preside severa, braccia conserte, occhiali abbassati, sulla soglia.  
File: `assets/arene/liceo/pericoli/preside.webp` · video: `assets/arene/liceo/pericoli/preside.mp4`

**Immagine**

```text
A stern school principal standing in a doorway, a sharp grey suit, arms crossed, glasses lowered to the tip of the nose and one eyebrow raised high. A bunch of keys hangs from her belt, and a corridor of lockers stretches behind her. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The principal taps a foot slowly, the eyebrow lifts, the glasses glint, papers flutter on a nearby desk. --motion low --loop
```

#### ✓ Bidello di turno

Caricatura del bidello brontolone con mocio, secchio e mazzo di chiavi.  
File: `assets/arene/liceo/pericoli/bidello-di-turno.webp` · video: `assets/arene/liceo/pericoli/bidello-di-turno.mp4`

**Immagine**

```text
A grumpy school janitor leaning on a mop beside a yellow bucket, a huge ring of keys on his belt, a grey work coat and a bushy moustache, squinting suspiciously at the viewer. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The janitor leans on the mop and sighs, the keys jingle slightly, soap bubbles float from the bucket. --motion low --loop
```

#### ✓ Ispezione a sorpresa

L'ispezione a sorpresa: un ispettore con cartellina e lente che spunta da una porta.  
File: `assets/arene/liceo/pericoli/ispezione-a-sorpresa.webp` · video: `assets/arene/liceo/pericoli/ispezione-a-sorpresa.mp4`

**Immagine**

```text
A school inspector peeking through a half-open classroom door, holding a clipboard and a big magnifying glass that makes one eye look huge, a bow tie and a tidy grey suit. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The magnifying glass moves slowly, the huge eye blinks, the door sways slightly. --motion low --loop
```

#### ✓ Professoressa di matematica

Caricatura della prof di matematica con la penna rossa, lavagna con formule illeggibili.  
File: `assets/arene/liceo/pericoli/professoressa-di-matematica.webp` · video: `assets/arene/liceo/pericoli/professoressa-di-matematica.mp4`

**Immagine**

```text
A strict math teacher holding a red pen raised like a sword, a stack of graded tests under one arm, sharp glasses and a tight bun, with a blackboard of blurred chalk scribbles behind her. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The red pen taps slowly, chalk dust floats in the light, the teacher narrows her eyes. --motion low --loop
```

### Armi · Liceo Spietato

#### Gossip esplosivo

Smartphone con un fumetto di chat che esplode come un fuoco d'artificio.  
File: `assets/arene/liceo/armi/gossip-esplosivo.webp`

**Immagine**

```text
A smartphone with a glowing pink screen and a chat bubble bursting out of it like a firework, sparkles and tiny hearts flying around. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Foto imbarazzante

Polaroid con un'immagine imbarazzante sfocata e un bagliore rosa.  
File: `assets/arene/liceo/armi/foto-imbarazzante.webp`

**Immagine**

```text
A polaroid photo with a blurred embarrassing picture, slightly bent at one corner, with a soft pink glow and a doodled heart on the border. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Compito copiato

Compito in classe con un bigliettino nascosto che spunta.  
File: `assets/arene/liceo/armi/compito-copiato.webp`

**Immagine**

```text
A folded test paper with a tiny rolled cheat sheet sticking out of it, scribbled lines instead of writing and a red pen mark on top. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pallone da dodgeball

Pallone rosso da dodgeball con scie di movimento.  
File: `assets/arene/liceo/armi/pallone-da-dodgeball.webp`

**Immagine**

```text
A bright red rubber dodgeball with a textured surface and a few motion streaks, as if just thrown. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Registro rubato

Registro di classe spesso con il segnalibro a nastro.  
File: `assets/arene/liceo/armi/registro-rubato.webp`

**Immagine**

```text
A thick hardcover class register with a plain dark blue cover, a red ribbon bookmark and loose sheets sticking out of the pages. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Profilo falso

Smartphone con un profilo social finto e l'icona di una maschera.  
File: `assets/arene/liceo/armi/profilo-falso.webp`

**Immagine**

```text
A smartphone showing a fake social profile with a blank avatar and a small disguise mask with glasses and moustache floating above the screen. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
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
A meeting room with a long glass table leading to a glowing projector screen in the central third of the frame, showing an abstract chart. Empty swivel chairs, cold coffee cups and scattered papers fill the foreground. A whiteboard of blurred scribbles and a grey city view through tall windows fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The projector beam shimmers with floating dust, a chair turns very slowly, steam rises from a coffee cup. --motion low --loop
```

#### ✓ Open space

Open space sterminato con file di scrivanie, monitor e piante in vaso.  
File: `assets/arene/ufficio/luoghi/open-space.webp` · video: `assets/arene/ufficio/luoghi/open-space.mp4`

**Immagine**

```text
A sprawling open-space office with endless rows of identical desks and glowing monitors converging in the central third of the frame. A cluttered desk with a sad potted plant, a stress ball and sticky notes fills the foreground. Glass partitions, ceiling lights and a grey city skyline fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Monitors flicker softly, a ceiling light buzzes and blinks, the plant leaves sway in the air conditioning. --motion low --loop
```

#### ✓ Cucina

Angolo cucina con macchinetta del caffè, tazze, microonde e frigo pieno di bigliettini.  
File: `assets/arene/ufficio/luoghi/cucina.webp` · video: `assets/arene/ufficio/luoghi/cucina.mp4`

**Immagine**

```text
The office kitchenette with a steaming coffee machine on the counter in the central third of the frame. Mugs, sugar packets and a half-eaten birthday cake with one candle fill the foreground. A fridge covered in sticky notes, a microwave and a sink full of cups fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Steam rises from the coffee machine, a drip falls slowly, the microwave light glows, sticky notes flutter. --motion low --loop
```

#### ✓ Ufficio del direttore

Ufficio d'angolo del Direttore con poltrona di pelle, vetrata panoramica e premi.  
File: `assets/arene/ufficio/luoghi/ufficio-del-direttore.webp` · video: `assets/arene/ufficio/luoghi/ufficio-del-direttore.mp4`

**Immagine**

```text
The director corner office with a big leather chair turned toward a panoramic window in the central third of the frame. A polished wooden desk with a blank golden nameplate and a smoking cigar in an ashtray fills the foreground. Golden trophies on shelves and a city skyline at dusk fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The leather chair turns very slowly, cigar smoke curls upward, city lights twinkle outside. --motion low --loop
```

#### ✓ Sala stampanti

Stanzino delle stampanti con una fotocopiatrice inceppata che sputa fogli.  
File: `assets/arene/ufficio/luoghi/sala-stampanti.webp` · video: `assets/arene/ufficio/luoghi/sala-stampanti.mp4`

**Immagine**

```text
A cramped printer room with a big jammed copier in the central third of the frame, sheets of paper spilling from its tray. Paper piled on the floor and open toner boxes fill the foreground. Shelves of paper reams and a blinking orange warning light fill the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Sheets slide slowly out of the copier, the warning light blinks, a few papers flutter down. --motion low --loop
```

#### ✓ Parcheggio

Parcheggio aziendale sotterraneo con posti riservati e neon.  
File: `assets/arene/ufficio/luoghi/parcheggio.webp` · video: `assets/arene/ufficio/luoghi/parcheggio.mp4`

**Immagine**

```text
An underground company car park with a shiny black executive car parked in a reserved space in the central third of the frame. Concrete pillars, painted parking lines and a dropped employee badge fill the foreground. Rows of fluorescent tubes recede into the background. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Fluorescent tubes flicker, a puddle ripples slowly, dust drifts in the light. --motion low --loop
```

### Pericoli · Ufficio Open Space

#### ✓ Direttore generale

Caricatura dell'amministratore delegato in completo, controluce davanti a una vetrata.  
File: `assets/arene/ufficio/pericoli/direttore-generale.webp` · video: `assets/arene/ufficio/pericoli/direttore-generale.mp4`

**Immagine**

```text
A powerful CEO in a sharp navy suit silhouetted against a tall office window, a smug smile, slicked-back grey hair, a gold watch and hands on hips in a power pose. The city skyline glows behind him. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The CEO adjusts the tie very slowly, the smile widens slightly, city lights twinkle behind. --motion low --loop
```

#### ✓ Ufficio Risorse umane

Caricatura di una persona delle Risorse umane con sorriso di circostanza e pila di cartelline.  
File: `assets/arene/ufficio/pericoli/ufficio-risorse-umane.webp` · video: `assets/arene/ufficio/pericoli/ufficio-risorse-umane.mp4`

**Immagine**

```text
An HR officer with a polite fake smile and a tidy cardigan, holding a tall wobbling stack of folders, a pen behind the ear and a box of tissues on the desk in front. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The fake smile holds while one eye twitches, the folder stack wobbles slightly, papers flutter. --motion low --loop
```

#### ✓ Consulente esterno

Caricatura del consulente con capelli impomatati, portatile e grafico a torta olografico.  
File: `assets/arene/ufficio/pericoli/consulente-esterno.webp` · video: `assets/arene/ufficio/pericoli/consulente-esterno.mp4`

**Immagine**

```text
A slick external consultant with gelled hair, a skinny tie and an open laptop, a glowing holographic pie chart floating above his palm and a confident grin. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The holographic pie chart rotates slowly, the laptop screen glows, the consultant raises an eyebrow. --motion low --loop
```

#### ✓ Riorganizzazione aziendale

La riorganizzazione personificata: un mostro di caselle e frecce di organigramma.  
File: `assets/arene/ufficio/pericoli/riorganizzazione-aziendale.webp` · video: `assets/arene/ufficio/pericoli/riorganizzazione-aziendale.mp4`

**Immagine**

```text
A corporate reorganization personified as a tangled monster made of org-chart boxes and arrows, with two glowing eyes and a wide grin made of connecting lines in the middle. Stylized painterly character concept art with visible expressive brushwork and faceted planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Playful comic caricature with exaggerated features, funny rather than scary. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The org-chart boxes shuffle slowly into new positions, arrows bend, the eyes blink. --motion low --loop
```

### Armi · Ufficio Open Space

#### Mail in copia a tutti

Busta di una mail che si moltiplica in tante copie luminose.  
File: `assets/arene/ufficio/armi/mail-in-copia-a-tutti.webp`

**Immagine**

```text
A white email envelope multiplying into many glowing copies that fan out behind it, each with a small red notification dot. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Report pieno di errori altrui

Report stampato coperto di segni rossi e post-it.  
File: `assets/arene/ufficio/armi/report-pieno-di-errori-altrui.webp`

**Immagine**

```text
A thick printed report covered in red correction marks and colourful sticky notes, abstract scribbled lines instead of text and a paperclip on top. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Presentazione rubata

Chiavetta USB con una slide proiettata e una mascherina da ladro.  
File: `assets/arene/ufficio/armi/presentazione-rubata.webp`

**Immagine**

```text
A USB stick wearing a tiny black burglar mask, projecting a small glowing slide with an abstract chart above it. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Badge clonato del capo

Badge col cordino e una sua copia identica luminosa.  
File: `assets/arene/ufficio/armi/badge-clonato-del-capo.webp`

**Immagine**

```text
An ID badge on a blue lanyard with a blank photo area, and a glowing translucent duplicate copy floating beside it. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Foglio Excel con le prove

Stampa di un foglio di calcolo con celle evidenziate e una lente.  
File: `assets/arene/ufficio/armi/foglio-excel-con-le-prove.webp`

**Immagine**

```text
A spreadsheet printout with bright yellow highlighted cells, abstract grid marks and a magnifying glass resting on top of it. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Nota spese gonfiata

Uno scontrino che si gonfia come un palloncino.  
File: `assets/arene/ufficio/armi/nota-spese-gonfiata.webp`

**Immagine**

```text
A long paper receipt inflating like a balloon, curled at the ends, with a small string tied at the bottom. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

---

## Night City — Zona Rossa

Neon, impianti e contratti saltati: un distretto sigillato dove nessuno è indispensabile.

- **Atmosfera**: Distretto sigillato di una megalopoli notturna: cemento bagnato e toni petrolio, insegne olografiche magenta e ciano, un faro giallo acido, cavi sospesi, vapore e pioggia sottile. Nessun personaggio o logo riconoscibile.
- **Frase di luce dell'arena** (è già nei comandi): `Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain.`

### Luoghi · Night City — Zona Rossa

#### ✓ Mercato di Kabuki

Mercato notturno affollato di bancarelle sotto tendoni e insegne olografiche, vapore delle cucine di strada.  
File: `assets/arene/cyberpunk/luoghi/mercato-di-kabuki.webp` · video: `assets/arene/cyberpunk/luoghi/mercato-di-kabuki.mp4`

**Immagine**

```text
A dense night market of improvised stalls under plastic awnings fills the central third of the frame, lit by glowing magenta and cyan holographic signs. Noodle stands release clouds of steam, crates of spare optics and tangled cables crowd the wet foreground, and a narrow alley disappears between tall concrete blocks. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Steam rises slowly from the noodle stands, holographic signs flicker gently, raindrops ripple in the puddles. --motion low --loop
```

#### ✓ Megablocco

Megablocco residenziale gigantesco, ballatoi su decine di piani e finestre accese.  
File: `assets/arene/cyberpunk/luoghi/megablocco.webp` · video: `assets/arene/cyberpunk/luoghi/megablocco.mp4`

**Immagine**

```text
A colossal residential megablock rises through the central third of the frame, its stacked open walkways lined with tiny lit windows, air conditioners and laundry lines. A cracked concrete courtyard with a broken elevator shaft and a rusted fire escape fills the foreground under a thin acid rain. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Window lights blink on and off one by one, laundry sways in the wind, thin rain falls steadily. --motion low --loop
```

#### ✓ Clinica del ripperdoc

Clinica clandestina di un ripperdoc con poltrona chirurgica, bracci robotici e luce fredda.  
File: `assets/arene/cyberpunk/luoghi/clinica-del-ripperdoc.webp` · video: `assets/arene/cyberpunk/luoghi/clinica-del-ripperdoc.mp4`

**Immagine**

```text
A cramped back-alley cyber clinic with a worn surgical chair under a cold cyan lamp in the central third of the frame, flanked by articulated robotic surgical arms and shelves of glowing implant canisters. Monitors with heartbeat lines, coiled tubes and a steel tray of tools fill the foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The heartbeat lines pulse slowly on the monitors, a robotic arm twitches gently, the lamp hums and flickers faintly. --motion low --loop
```

#### ✓ Club della braindance

Club notturno con pista allagata di luci, poltrone per la braindance e visori appesi.  
File: `assets/arene/cyberpunk/luoghi/club-della-braindance.webp` · video: `assets/arene/cyberpunk/luoghi/club-della-braindance.mp4`

**Immagine**

```text
A neon nightclub with a reflective dance floor in the central third of the frame, surrounded by reclining braindance chairs with headset visors hanging above them. Laser beams in magenta and cyan cut through haze, and a bar counter of glowing bottles lines the foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Laser beams sweep slowly through the haze, headset lights blink, the floor reflections ripple softly. --motion low --loop
```

#### ✓ Officina dei Maelstrom

Officina di una gang con moto blindate, pezzi di cromo e una torretta di guardia.  
File: `assets/arene/cyberpunk/luoghi/officina-dei-maelstrom.webp` · video: `assets/arene/cyberpunk/luoghi/officina-dei-maelstrom.mp4`

**Immagine**

```text
A grimy gang workshop with an armoured motorbike raised on a hydraulic lift in the central third of the frame, under red emergency lights. Piles of chrome limbs, welding sparks, fuel drums and chains fill the foreground, and an automated sentry turret watches from a steel catwalk. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Welding sparks shower in short bursts, the sentry turret pans slowly, red lights pulse, smoke drifts. --motion low --loop
```

#### ✓ Nodo dati corporativo

Sala server corporativa con colonne di dati luminosi, torrette e porte stagne.  
File: `assets/arene/cyberpunk/luoghi/nodo-dati-corporativo.webp` · video: `assets/arene/cyberpunk/luoghi/nodo-dati-corporativo.mp4`

**Immagine**

```text
A sterile corporate data hub with towering server columns glowing cyan in the central third of the frame, data streams of light running up their surfaces. A sealed blast door, ceiling turrets and a single access terminal fill the foreground on a polished black floor. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. Data light streams flow upward continuously, the terminal screen blinks, the turrets rotate a few degrees and return. --motion low --loop
```

#### ✓ Piazza della torre

Piazza centrale ai piedi di una torre altissima, megaschermo, volanti in volo e barriere di sicurezza.  
File: `assets/arene/cyberpunk/luoghi/piazza-della-torre.webp` · video: `assets/arene/cyberpunk/luoghi/piazza-della-torre.mp4`

**Immagine**

```text
A wide plaza at the foot of a colossal corporate tower that dominates the central third of the frame, its top crowned by an acid yellow beacon. A giant video screen glows on its facade, flying police cars hover in the smog, and security barriers, planters and a metro canopy fill the wet foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 16:9 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently. The beacon pulses slowly, flying cars drift across the sky, the giant screen flickers, rain shimmers on the plaza. --motion low --loop
```

### Pericoli · Night City — Zona Rossa

#### ✓ Squadra di sicurezza corporativa

Squadra di sicurezza corporativa in armatura tattica senza insegne, visiere luminose.  
File: `assets/arene/cyberpunk/pericoli/squadra-di-sicurezza-corporativa.webp` · video: `assets/arene/cyberpunk/pericoli/squadra-di-sicurezza-corporativa.mp4`

**Immagine**

```text
A corporate security squad in sleek unmarked tactical armour, the leader in front with a glowing cyan visor and a smart rifle held low, the others behind as dark silhouettes with matching visor glows. Rain beads on their armour plates. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The visors pulse softly, rain runs down the armour, the squad shifts weight slightly in place. --motion low --loop
```

#### ✓ Sciame di droni di pattuglia

Sciame di piccoli droni di sorveglianza con luci rosse e scanner.  
File: `assets/arene/cyberpunk/pericoli/sciame-di-droni-di-pattuglia.webp` · video: `assets/arene/cyberpunk/pericoli/sciame-di-droni-di-pattuglia.mp4`

**Immagine**

```text
A swarm of small surveillance drones hovering toward the viewer, the closest one large in the frame with a single red scanning lens and four spinning rotors, the others scattered behind in the smog with thin scanning beams. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The rotors spin, the drones bob gently in place, scanning beams sweep slowly. --motion low --loop
```

#### ✓ Banda di Scav

Banda di Scav con stracci, maschere improvvisate e strumenti chirurgici rubati.  
File: `assets/arene/cyberpunk/pericoli/banda-di-scav.webp` · video: `assets/arene/cyberpunk/pericoli/banda-di-scav.mp4`

**Immagine**

```text
A gang of scavengers in layered rags and makeshift breathing masks, the leader in front holding a stolen bone saw with a cracked optic glowing in one eye, the others behind as hunched silhouettes among trash bags in a dim alley. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The masks breathe with slow puffs of vapour, the cracked optic flickers, the figures sway slightly. --motion low --loop
```

#### ✓ Gang di cromati

Gang di cromati con arti metallici, impianti visibili e luci sotto la pelle.  
File: `assets/arene/cyberpunk/pericoli/gang-di-cromati.webp` · video: `assets/arene/cyberpunk/pericoli/gang-di-cromati.mp4`

**Immagine**

```text
A street gang of heavily augmented fighters, the leader in front with polished chrome arms, glowing subdermal lines across the face and a mohawk of fibre optic strands, the others behind with metal jaws and glowing eyes under a magenta sign. Stylized painterly character concept art with visible expressive brushwork and faceted concrete planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 4:3 --no text, letters, signature, watermark, logo, frame, border
```

**Video (Animate → Manual)**

```text
Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm. The subdermal lines pulse, the fibre optic hair shimmers, the chrome catches flickering neon reflections. --motion low --loop
```

### Armi · Night City — Zona Rossa

#### Pistola smart

Pistola smart compatta con canna sagomata e linee luminose ciano.  
File: `assets/arene/cyberpunk/armi/pistola-smart.webp`

**Immagine**

```text
A compact smart pistol with a sculpted angular barrel, a small targeting module on top and thin glowing cyan lines along the slide. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Katana termica

Katana con lama rovente arancione e impugnatura avvolta in cavi.  
File: `assets/arene/cyberpunk/armi/katana-termica.webp`

**Immagine**

```text
A katana with a glowing orange heated blade, a tech hilt wrapped in braided cable and a small battery pack at the pommel. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Fucile a pompa da strada

Fucile a pompa a canne segate coperto di adesivi delle gang.  
File: `assets/arene/cyberpunk/armi/fucile-a-pompa-da-strada.webp`

**Immagine**

```text
A sawed-off pump shotgun with a scratched black body covered in faded gang stickers and a strip of tape around the grip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mazza da baseball chiodata

Mazza da baseball di legno con chiodi conficcati e nastro all'impugnatura.  
File: `assets/arene/cyberpunk/armi/mazza-da-baseball-chiodata.webp`

**Immagine**

```text
A wooden baseball bat studded with long nails near the tip, the handle wrapped in worn neon pink grip tape. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Pistola a rotaia artigianale

Pistola a rotaia assemblata a mano con bobine scoperte e cavi.  
File: `assets/arene/cyberpunk/armi/pistola-a-rotaia-artigianale.webp`

**Immagine**

```text
A handmade rail pistol assembled from mismatched parts, with exposed copper coils along the barrel, loose cables and a glowing capacitor. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Taser da buttafuori

Taser da buttafuori con due elettrodi e una scarica azzurra.  
File: `assets/arene/cyberpunk/armi/taser-da-buttafuori.webp`

**Immagine**

```text
A bulky bouncer stun gun with two metal prongs crackling with a small arc of blue electricity and a rubber grip. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Mitra compatto

Mitra compatto con caricatore lungo e mirino olografico.  
File: `assets/arene/cyberpunk/armi/mitra-compatto.webp`

**Immagine**

```text
A compact submachine gun with a long curved magazine, a folding stock and a small holographic sight glowing magenta. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Ventaglio da combattimento in titanio

Ventaglio da combattimento in titanio aperto, con i bordi affilati.  
File: `assets/arene/cyberpunk/armi/ventaglio-da-combattimento-in-titanio.webp`

**Immagine**

```text
An open combat fan made of brushed titanium blades with razor-sharp edges, a small cyan light on the pivot and a black silk tassel. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Sparachiodi riprogrammato

Sparachiodi da cantiere modificato con cavi scoperti e un caricatore di chiodi.  
File: `assets/arene/cyberpunk/armi/sparachiodi-riprogrammato.webp`

**Immagine**

```text
A modified construction nail gun with its safety removed, exposed wires taped along the body, a long strip of nails loaded and a hazard yellow stripe. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```

#### Tirapugni elettrificato

Tirapugni di metallo con una piccola batteria e una scintilla azzurra.  
File: `assets/arene/cyberpunk/armi/tirapugni-elettrificato.webp`

**Immagine**

```text
A metal knuckle duster with a small battery pack on the back and a tiny arc of blue electricity jumping between the rings. Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline. Lit by an electric cyan neon key light with a magenta rim light and a faint acid yellow glint. --v 8.2 --ar 1:1 --no text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border
```
