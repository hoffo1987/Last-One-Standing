# Banner principali delle arene (Midjourney v8.2)

Ogni arena ha un banner 3:1, salvato in `assets/arene/<arena>.webp` a **1500 × 500 px**: è la locandina nella scelta dell'arena, l'intestazione della guida, lo sfondo della diretta e l'esito, e dà i ritagli alle schede dei luoghi senza immagine. La build lo incorpora anche nel file portatile, quindi va tenuto leggero (WebP qualità 60–70, 30–60 KB).

Struttura come per i luoghi: soggetto riconoscibile nel **terzo centrale** (sul telefono il banner viene ritagliato al centro), un primo piano raccontato, uno sfondo profondo, poi la frase di stile e la frase di luce dell'arena (la stessa di `tools/atlas-brief.js`). Lascia un po' di respiro scuro in basso a sinistra: lì il sito scrive il nome dell'arena.

Settings consigliati: Version 8.2, Stylization 100, Raw spento, Weirdness 0, Variety 0, moodboard dello stile se l'hai già creata. Genera in HD se puoi: la riduzione a 1500 × 500 la faccio io.

## Arena Classica → `classico.webp`

```text
A golden cornucopia horn spilling weapons, backpacks and supply crates stands on a grassy clearing in the central third of the frame, ringed by twenty empty round launch platforms. A wild pine forest, a winding river and distant mountain ridges stretch toward an enormous glowing sun low on the horizon. Trampled grass, a dropped bow and scattered arrows lie in the foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

## Reame Incantato → `fantasy.webp`

```text
A ruined castle tower with a broken arched bridge rises in the central third of the frame on a misty hill, while a great dragon silhouette glides past a huge pale moon. An enchanted forest with glowing runes carved into old stones, a still lake and distant crystal mountains fill the background. A mossy weapon altar, a dropped shield and floating motes of golden light occupy the foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

## Stazione Orbitale → `scifi.webp`

```text
A vast ring-shaped orbital station with docking arms and glowing windows floats in the central third of the frame above the curved blue Earth, a small shuttle approaching its open hangar. A field of stars and a thin band of sunrise light fill the background. The foreground shows the edge of a steel observation deck with a cracked viewport, blinking red warning lights and loose cables. Stylized painterly environment concept art with visible expressive brushwork and faceted metal planes. Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

## Città degli Infetti → `zombie.webp`

```text
An abandoned city avenue leads to a half-collapsed hospital tower in the central third of the frame, its windows dark and a rooftop helicopter wrecked on the edge. Burned cars, overturned buses and sandbag barricades line the street, with distant skyscrapers fading into low green smog. A torn quarantine tape, a dropped radio and a flickering street lamp occupy the foreground. A few distant shambling silhouettes stand far down the road. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, frame, border
```

## Isola Battle Royale → `royale.webp`

```text
A tropical island with a wooden lookout tower on a jungle hill sits in the central third of the frame, ringed by a turquoise sea and a white beach. A cargo plane crosses the sky trailing a line of colourful parachutes and supply crates drifting down, while a huge translucent energy wall closes in from the horizon. Palm trees, a beached boat and an open loot crate occupy the foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

## Villa Maledetta → `horror.webp`

```text
A towering gothic mansion with pointed roofs and a single lit window stands in the central third of the frame on a hill, under a huge blood crimson moon. Twisted bare trees, a crooked iron gate and an overgrown family cemetery with leaning tombstones lead up to it, with bats circling the towers. A cracked stone path, a dropped lantern and creeping fog fill the foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted stone planes. Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border, blood, gore
```

## Terre Desolate → `wasteland.webp`

```text
A broken highway overpass and a rusted gas station canopy stand in the central third of a vast desert, under an enormous scorching sun. A cracked concrete dam, a burning refinery flare and a ghost town skyline fade into the dust haze in the background. Abandoned cars half buried in sand, a dented fuel can and tire tracks cross the foreground. Stylized painterly environment concept art with visible expressive brushwork and faceted rock planes. Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border
```

## Liceo Spietato → `liceo.webp`

```text
A grand old Italian high school building with a clock tower and a fluttering flag stands in the central third of the frame, its many windows glowing softly. A courtyard with benches, a basketball hoop and a vending machine leads to the entrance, while paper planes drift across a pastel sky. A forgotten backpack, a stack of exercise books with blank pages and a crumpled note lie in the foreground. Playful satirical comedy mood. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border, blood, weapons
```

## Ufficio Open Space → `ufficio.webp`

```text
A huge corporate open space with endless rows of identical desks and glowing monitors stretches through the central third of the frame toward a glass-walled director's office at the far end. Sheets of paper drift through the air, a broken photocopier blinks, and tall windows show a grey city skyline. A cold coffee cup, a tangled headset and a sticky note with abstract scribbles occupy the foreground desk. Satirical corporate comedy mood. Stylized painterly environment concept art with visible expressive brushwork and faceted planes. Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, people, characters, frame, border, blood, weapons
```

## Night City — Zona Rossa → `cyberpunk.webp` (già presente)

```text
A sealed cyberpunk megacity district at night seen from street level, a colossal corporate tower rising in the central third of the frame with an acid yellow beacon glowing at its top, surrounded by dense concrete megablocks covered in magenta and electric cyan holographic signs with abstract symbols. Tangled power cables sag between the buildings, steam rises from street grates, flying police cars hover in the smog, and closed metal shutters and security barriers block the wet street in the foreground, where neon reflections stretch across deep puddles. Two small distant silhouettes stand in the rain at the edge of the plaza. Stylized painterly environment concept art with visible expressive brushwork and faceted concrete planes. Wet petrol-blue night light with glowing magenta and electric cyan neon reflections on rain-soaked concrete, an acid yellow accent glow, drifting steam and thin rain. --v 8.2 --ar 3:1 --no text, letters, signature, watermark, logo, frame, border
```
