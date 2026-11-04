// Brief delle immagini della guida delle arene (luoghi, pericoli, armi) per Midjourney v8.2.
// Stile di riferimento: la Cornucopia generata a novembre 2026 (concept art pittorica stilizzata,
// pennellate espressive, piani sfaccettati, luce calda contro ombre fredde e nebbia di profondità).
// Ogni voce: [cosa mostrare in italiano, scena in inglese (frasi complete), movimento per il video in loop].
// Le armi non hanno il video: restano immagini (vedi la documentazione).
// Il comando completo si compone in tools/atlas-slots.js: scena + frase di stile + luce dell'arena + parametri.
module.exports = {
  mj: {
    version: '8.2',
    luoghi: {
      style: (f) => 'Stylized painterly environment concept art with visible expressive brushwork and faceted ' + f + 'planes.',
      params: '--ar 16:9',
      no: 'text, letters, signature, watermark, logo, people, characters, frame, border',
    },
    pericoli: {
      style: (f) => 'Stylized painterly character concept art with visible expressive brushwork and faceted ' + f + 'planes. Centered portrait composition, the subject facing the viewer with its eyes or focal point in the upper half of the frame, the edges dissolving into dark mist.',
      soft: 'Playful comic caricature with exaggerated features, funny rather than scary.',
      params: '--ar 4:3',
      no: 'text, letters, signature, watermark, logo, frame, border',
      noSoft: 'text, letters, signature, watermark, logo, frame, border, blood, gore, weapons, real person',
    },
    armi: {
      style: 'Single game inventory prop in three-quarter view, laid diagonally from lower left to upper right with a generous empty margin, isolated on a plain flat light grey background. Stylized painterly prop concept art with expressive brushwork, faceted planes and a crisp silhouette with a thin dark outline.',
      params: '--ar 1:1',
      no: 'text, letters, signature, watermark, hands, person, scenery, background objects, cast shadow, frame, border',
    },
    video: {
      lead: { luoghi: 'Static camera and a seamless ambient loop: the place itself stays perfectly still and only small elements move, slowly and gently.', pericoli: 'Static camera and a seamless ambient loop: the subject keeps the same pose and position, with only subtle living movement, slow and calm.' },
      params: '--motion low --loop',
    },
  },

  arenas: {
    classico: {
      look: "Bosco selvaggio al tramonto: ambra e ocra bruciata contro ombre indaco del crepuscolo, nebbia di profondità, sole enorme e luminoso.",
      facet: "rock",
      light: "Warm amber and burnt ochre sunset light contrasts with deep twilight indigo shadows and soft depth fog.",
      prop: "Lit by a warm amber sunset key light with a cool indigo rim light.",
      luoghi: {
        "cornucopia": [
          "La Cornucopia dorata su un poggio di roccia, che rovescia casse, zaini, spade e faretre; un ruscello in primo piano.",
          "A colossal hammered-gold horn-shaped cornucopia rests atop a tiered rocky mound in the central third of the frame. Wooden supply crates, canvas survival backpacks, steel swords and quivers of arrows spill out from its wide golden mouth onto the rocks and grass. A shallow winding stream cuts across the foreground, with a sword leaning against a crate on the left bank and two arrows stuck in the right bank. Dark pine forest silhouettes, tattered wooden battle standards and a large glowing sun fill the background.",
          "Gentle heat shimmer above the golden horn, the stream ripples softly and sparkles with sunlight, tattered banners sway slightly in a light breeze, a few glowing embers and dust motes drift upward, thin fog slowly rolls between the distant pines."],
        "bosco": [
          "Bosco antico e fitto all'imbrunire, lame di luce tra i tronchi e un sentiero nascosto.",
          "A dense ancient pine forest at dusk, with a narrow hidden dirt trail winding into the central third of the frame between towering mossy trunks as wide as houses. Ferns, fallen branches and a half-buried wooden supply crate with a frayed rope handle line the trail in the foreground. Long golden shafts of low sunlight pierce gaps in the canopy, catching floating pollen, and fade into layered blue silhouettes of pines in the background.",
          "Shafts of sunlight shimmer softly, ferns and leaves sway gently, tiny dust motes and pollen float through the light beams, low fog drifts slowly between the trunks."],
        "fiume": [
          "Fiume tortuoso tra massi muschiosi, rapide basse e un tronco caduto che fa da ponte.",
          "A winding river cuts through the central third of the frame between mossy faceted boulders, its shallow rapids catching the orange sky in bright broken reflections. A fallen pine log spans the water as a makeshift bridge, with a forgotten quiver hanging from a branch stub. Reeds, smooth pebbles and a wet backpack crowd the near bank in the foreground, while dark pine silhouettes and a glowing low sun close the background above a veil of mist.",
          "Water flows gently over the rapids with soft glittering reflections, reeds sway slightly, a thin mist hovers over the river surface, a few leaves float slowly downstream."],
        "paludi": [
          "Palude scura con canne, alberi morti contorti e nebbia bassa; qualche lucciola.",
          "A murky marsh with black still water stretching through the central third of the frame, broken by twisted dead trees with moss-draped branches and clumps of tall reeds. A rotten wooden boardwalk with missing planks sinks into the water in the foreground, an old lantern hanging from its last post. Low banks of fog, faint fireflies and the silhouettes of drowned trees fill the background beneath a dying red sunset.",
          "Low fog creeps slowly across the water, fireflies blink and drift, reeds sway gently, faint ripples spread across the dark surface."],
        "rovine": [
          "Rovine di un antico tempio in pietra invase dai rampicanti, colonne spezzate e un arco crollato.",
          "The crumbling stone ruins of an ancient temple stand in the central third of the frame, with broken columns and a collapsed archway wrapped in thick vines and wildflowers. Scattered carved blocks, a mossy stone face half sunk in the grass and a rusted round shield lie in the foreground. Pine silhouettes, a flock of distant birds and drifting golden haze fill the background behind the ruins, lit from behind by the setting sun.",
          "Vines and grass sway softly in a light breeze, dust motes float in the warm light, a thin haze drifts slowly behind the columns."],
        "altopiano": [
          "Altopiano roccioso spazzato dal vento, erba brinata e montagne lontane: il posto più freddo.",
          "A windswept rocky highland plateau with a lone weathered stone outcrop and a crooked dead tree in the central third of the frame. Sparse frosted grass, patches of thin snow and scattered faceted boulders cover the foreground, along with a cold extinguished campfire. Distant jagged mountain ranges, thin streaked clouds and a pale icy sky fill the background, warmed only by the last orange edge of sunset on the peaks.",
          "Frosted grass bends gently in a steady wind, thin clouds drift slowly across the sky, a few snow flakes and dust particles float by."],
      },
      pericoli: {
        "branco-di-lupi-mutanti": [
          "Branco di lupi mutanti con occhi ambra e chiazze di pelo metallico, che escono dagli alberi.",
          "A pack of three mutated wolves stepping out of shadowy pines, the alpha in front with bared fangs, a scarred muzzle and glowing amber eyes. Patches of their fur have hardened into dull metallic plates, and thin wisps of breath steam from their jaws. The two others flank it half hidden in the dark undergrowth, their eyes glinting.",
          "The wolves breathe slowly with subtle chest movement, their fur ripples in the wind, the amber eyes glint faintly, mist drifts behind them."],
        "sciame-di-vespe-velenose": [
          "Sciame di vespe giganti e velenose; una in primo piano col pungiglione in vista.",
          "A menacing swarm of oversized venomous wasps, each as large as a hand, with glowing yellow stripes and translucent amber wings. One wasp hovers in sharp focus in the foreground, its curved stinger dripping a bead of venom, compound eyes reflecting the sunset. The rest of the swarm forms a dark buzzing cloud around a broken paper nest behind it.",
          "The wasps hover in place with fast blurred wings, the swarm shifts gently behind, faint glowing pollen floats in the air."],
        "orso-affamato": [
          "Enorme orso bruno affamato, ritto sulle zampe posteriori, muso pieno di cicatrici.",
          "A huge starving brown bear rearing up on its hind legs between pine trunks, matted fur hanging loose over visible ribs, a scarred muzzle and broken claws. Its mouth is half open in a low roar, and its small hungry eyes catch the warm sunset light. Torn bark and claw marks scar the tree beside it.",
          "The bear breathes heavily with slow chest movement, its fur stirs in the wind, warm breath steams faintly in the cold air."],
        "serpente-gigante": [
          "Serpente gigante dalle squame smeraldo, avvolto su sé stesso con la testa alzata.",
          "A giant serpent coiled around a mossy boulder, raising its huge head toward the viewer, emerald faceted scales edged with gold. Its forked tongue tastes the air, and its slit-pupil eyes glow amber in the dusk. Shed skin hangs from the rock below, and its thick body disappears into tall grass behind it.",
          "The serpent sways its raised head very slowly, its tongue flicks occasionally, light glides across the scales, mist drifts behind."],
      },
      armi: {
        "coltello": [
          "Coltello da sopravvivenza con manico in cuoio.",
          "A sturdy survival knife with a clip-point steel blade showing a few nicks and a polished edge, a leather-wrapped handle worn dark by use, and a small brass pommel with a lanyard loop."],
        "arco": [
          "Arco ricurvo in legno con una freccia incoccata.",
          "A wooden recurve bow made of dark yew with leather-wrapped grip and pale bone tips, its string taut, with one feathered arrow nocked and ready."],
        "lancia": [
          "Lancia da caccia con asta di frassino e punta a foglia.",
          "A hunting spear with a straight ash-wood shaft, a leaf-shaped steel tip bound to it with tight cord, and two small hawk feathers tied below the blade."],
        "ascia": [
          "Ascia da boscaiolo con manico consumato.",
          "A woodcutter axe with a long worn hickory handle, a chipped steel head with a bright freshly sharpened edge, and a strip of red cloth tied around the grip."],
        "machete": [
          "Machete lungo, lama leggermente curva.",
          "A long machete with a slightly curved, scratched steel blade, a black rubber grip and a frayed canvas sheath strap still hanging from the handle."],
        "tridente": [
          "Tridente da pesca con asta di legno.",
          "A three-pronged fishing trident with barbed iron tips, a wooden shaft wrapped in rope binding, and a few strands of river weed caught between the prongs."],
        "fionda": [
          "Fionda di legno a forcella con tasca di cuoio.",
          "A forked wooden slingshot carved from a branch, with stretched rubber bands and a small leather pouch holding a smooth river pebble."],
        "spada-corta": [
          "Spada corta tipo gladio, guardia semplice.",
          "A short gladius-style sword with a broad leaf-shaped steel blade, a simple brass crossguard, a leather-wrapped grip and a round wooden pommel."],
        "pugnale": [
          "Pugnale sottile a doppio taglio.",
          "A slim double-edged dagger with a narrow polished blade, a cord-wrapped hilt and a small ring pommel, its edge catching a bright line of light."],
        "mazza": [
          "Clava di legno pesante con borchie di ferro.",
          "A heavy wooden war club carved from a gnarled root, studded with rows of iron rivets, its handle wrapped in strips of leather."],
      },
    },
    fantasy: {
      look: "Fiaba oscura di notte: viola, magenta e blu notte con bagliori magici turchesi e dorati, rune luminose, nebbie incantate.",
      facet: "stone",
      light: "Cool moonlit violet and magenta tones meet glowing turquoise and gold magical light, with deep midnight blue shadows and drifting enchanted mist.",
      prop: "Lit by a cool violet moonlight key light with a glowing turquoise magical rim light.",
      luoghi: {
        "torre-in-rovina": [
          "Torre di uno stregone mezza crollata, rune accese sui muri, luna enorme.",
          "A ruined wizard tower of dark stone rises in the central third of the frame, half collapsed, with glowing violet runes carved along its cracked walls and a crooked balcony hanging over the void. Fallen blocks, scattered open spell books and a broken staff with a dim crystal lie among the ferns in the foreground. A huge silver moon, drifting clouds and distant mountain silhouettes fill the background.",
          "The runes pulse softly with violet light, tiny magical sparks float upward, clouds drift slowly across the moon, ferns sway gently."],
        "foresta-elfica": [
          "Foresta elfica di alberi giganti dalla corteccia argentata, lanterne appese e lucine sospese.",
          "An elven forest of giant silver-barked trees, with a graceful arched wooden bridge crossing a stream in the central third of the frame. Hanging glass lanterns and floating motes of light glow among the high branches, while luminous blue flowers and curling ferns carpet the foreground. Layers of tall slender trees fade into turquoise mist in the background, with a faint glow of an elven hall far away.",
          "Lanterns sway gently and glow softly, floating motes of light drift slowly, luminous flowers pulse faintly, mist moves slowly between the trees."],
        "lago-nebbioso": [
          "Lago incantato di notte, acqua a specchio, pontile di pietra e statua mezza sommersa.",
          "A misty enchanted lake at night, its glassy water filling the frame, with a half-sunken stone statue of a crowned queen rising from the water in the central third. A small stone pier with a moored wooden rowboat and a hanging lantern reaches in from the foreground. Pine silhouettes, a pale moon reflected in the water and banks of glowing mist close the background.",
          "Soft mist drifts over the mirror-like water, gentle ripples spread around the statue, the rowboat rocks very slightly, moonlight shimmers on the surface."],
        "miniere": [
          "Miniere naniche nella montagna: impalcature, binari con carrello, vene di cristallo luminose.",
          "Dwarven mines carved deep into a mountain, with a minecart full of glowing ore on a rail track curving into the central third of the frame. Wooden scaffolding, hanging lanterns and abandoned pickaxes surround the tracks, while glowing turquoise crystal veins split the faceted rock walls. A vast dark cavern with tiny distant lights and stone bridges fills the background.",
          "Crystal veins pulse with a slow turquoise glow, lantern flames flicker gently, fine dust floats in the light, a faint haze drifts in the cavern."],
        "palude-stregata": [
          "Palude stregata con alberi storti, muschio pendente, capanna su palafitte e fuochi fatui verdi.",
          "A haunted swamp of crooked trees and hanging moss, with a witch hut on tall stilts glowing at its round window in the central third of the frame, smoke rising from a bent chimney. Green will-o-wisps hover over black water, gnarled roots and a sunken cauldron in the foreground. Thick violet fog and twisted tree silhouettes fill the background.",
          "Will-o-wisps drift and bob slowly, moss sways gently, the hut window flickers warmly, fog creeps across the water."],
        "picco-del-drago": [
          "Picco frastagliato con la tana del drago: rocce bruciate, mucchi d'oro, fumo che sale.",
          "A jagged mountain peak crowned by a dragon lair, with a wide cave mouth glowing with heaps of gold coins and jewels in the central third of the frame. Scorched faceted rocks, huge old bones and a melted knight shield cover the foreground. Smoke rises from the cave into a starry violet night sky above a sea of clouds and distant peaks.",
          "Smoke rises slowly from the lair, the gold glints softly, embers float upward, clouds drift across the stars."],
      },
      pericoli: {
        "troll-di-caverna": [
          "Troll di caverna enorme, pelle grigia bitorzoluta, clava di pietra, occhi piccoli e luminosi.",
          "A hulking cave troll stooping in the mouth of a cave, grey warty skin covered in lichen, a heavy brow over small glowing yellow eyes and a jutting jaw with broken tusks. It grips a crude stone club over one shoulder. Bones and torches lie at its feet, and cave darkness surrounds it.",
          "The troll breathes slowly with heavy shoulders rising and falling, its eyes glow faintly, dust drifts from the cave ceiling."],
        "viverna": [
          "Viverna con ali membranose spalancate e coda uncinata, appollaiata su una rupe.",
          "A wyvern perched on a cliff edge with leathery violet wings spread wide, a long barbed tail curled around the rock and talons gripping the stone. Its jaws open in a roar showing rows of teeth, and moonlight glints on its dark faceted scales. Wisps of smoke curl from its nostrils against a moonlit sky.",
          "The wyvern breathes slowly, its wing membranes flutter slightly in the wind, wisps of smoke curl from its jaws, clouds drift behind."],
        "spettro-errante": [
          "Spettro traslucido in vesti a brandelli, bagliore azzurro, occhi vuoti, nella nebbia.",
          "A wandering translucent wraith in tattered grey robes drifting through mist, a faint cold blue glow coming from within, with hollow dark eyes and long thin fingers reaching forward. Ghostly chains trail from its wrists and fade into the fog behind it.",
          "The wraith floats in place with a slow hovering motion, its tattered robes ripple softly, the blue glow pulses, mist swirls gently."],
        "branco-di-lupi-mannari": [
          "Branco di lupi mannari sotto la luna piena, il capobranco in primo piano.",
          "A pack of werewolves under a full moon, the alpha in front with bristling dark fur, a muscular half-human body, bared fangs and glowing yellow eyes. Torn cloth hangs from its shoulders. The others stand behind it as hunched silhouettes on a rocky ridge against the moon.",
          "The werewolves breathe slowly, fur ripples in the wind, eyes glint, clouds drift slowly across the full moon."],
      },
      armi: {
        "spada-runica": [
          "Spada lunga con rune viola luminose sulla lama.",
          "A longsword with a dark steel blade engraved with glowing violet runes along its length, an ornate silver crossguard shaped like spread wings and a grip wrapped in deep blue leather."],
        "bastone-magico": [
          "Bastone da mago nodoso con un cristallo luminoso sospeso in cima.",
          "A gnarled wizard staff of twisted ancient wood with silver bands, topped by a cage of roots holding a floating violet crystal that glows from within."],
        "arco-elfico": [
          "Arco lungo elfico in legno chiaro con intarsi d'argento a foglia.",
          "An elegant elven longbow of pale curved wood with leaf-shaped silver inlays, a thin glowing string and a small green gem set into the grip."],
        "ascia-nanica": [
          "Ascia nanica a doppia lama con incisioni a intreccio.",
          "A heavy double-bladed dwarven axe with a broad steel head engraved with knotwork patterns, gold inlays and a thick handle wrapped in dark leather."],
        "pugnale-avvelenato": [
          "Pugnale ricurvo che gocciola veleno verde.",
          "A curved dagger with a dark serrated blade dripping bright green poison, a bone handle and a small serpent carved around the pommel."],
        "martello-da-guerra": [
          "Martello da guerra massiccio con testa in ferro incisa di rune.",
          "A massive war hammer with a square iron head carved with glowing runes, reinforced steel corners and a long handle bound with leather and brass rings."],
        "balestra": [
          "Balestra fantasy in legno scuro e ottone.",
          "A fantasy crossbow of dark polished wood with brass fittings, a carved dragon head at the front and a glowing bolt loaded and ready."],
        "lancia-incantata": [
          "Lancia sottile con la punta avvolta da una luce pallida.",
          "A slender spear with a long silver shaft and an elegant leaf-shaped blade wreathed in pale blue magical light, a ribbon tied below the tip."],
      },
    },
    scifi: {
      look: "Stazione orbitale: ciano e blu elettrico su acciaio spazzolato, spie rosse d'allarme, la Terra o le stelle dai finestrini.",
      facet: "metal",
      light: "Cold cyan and electric blue neon light glints on brushed steel, cut by red warning lights, with deep navy shadows and a faint haze of floating dust.",
      prop: "Lit by a cold cyan key light with a red warning rim light.",
      luoghi: {
        "hangar": [
          "Hangar enorme con una navetta attraccata, container e il portellone aperto sulle stelle.",
          "A vast spaceship hangar with a sleek white shuttle docked on a landing pad in the central third of the frame, service arms clamped to its hull. Stacked cargo containers, coiled fuel hoses and an open toolbox crowd the foreground deck, striped with yellow warning lines. The open bay door at the back frames a field of stars and the glowing curve of a blue planet behind a shimmering force field.",
          "Warning lights blink slowly, a faint mist of coolant drifts across the deck, distant stars twinkle, the planet glows softly."],
        "serra-idroponica": [
          "Serra idroponica: file di piante sotto luci viola, tubi d'acqua e una cupola di vetro.",
          "A hydroponic greenhouse module under a glass dome, with rows of lush green plants in white trays converging toward the central third of the frame under purple grow lights. Water pipes, misting nozzles and seed trays fill the foreground, with a dropped watering can. Stars and the steel ribs of the station show through the dome in the background.",
          "Fine water mist sprays softly, leaves sway gently in the airflow, grow lights hum with a subtle pulse, droplets glisten."],
        "reattore": [
          "Il nucleo del reattore: sfera ciano incandescente in un anello d'acciaio, passerelle, allarmi.",
          "The station reactor core, a glowing cyan sphere of energy suspended inside a massive rotating steel ring in the central third of the frame. Metal catwalks with railings, warning stripes and thick bundled cables run through the foreground. Vertical shafts, steam vents and red alarm lights recede into the deep background.",
          "The core pulses with a slow cyan glow, energy arcs flicker faintly, warning lights blink, heat haze shimmers around the ring."],
        "ponte-di-comando": [
          "Ponte di comando con console olografiche e una vetrata enorme sulla Terra.",
          "The command bridge of an orbital station, with an empty captain chair facing a huge curved window onto Earth in the central third of the frame. Curved consoles with glowing holographic displays and blinking buttons line the foreground, a coffee cup left on one of them. Stars, a thin moon and the bright atmospheric horizon of the planet fill the background.",
          "Holographic displays flicker and scroll softly, console lights blink, the planet drifts very slowly past the window, stars twinkle."],
        "moduli-abitativi": [
          "Moduli dell'equipaggio: cuccette, armadietti e un piccolo oblò rotondo.",
          "Cramped crew living modules, with a round porthole showing stars and the edge of a planet in the central third of the frame. Stacked bunks with tangled blankets, personal lockers covered in stickers without text, a floating mug and a small potted plant fill the foreground. A narrow corridor with soft blue strip lights leads into the background.",
          "A mug and small objects float slowly in zero gravity, the blanket drifts gently, stars move slowly past the porthole, lights flicker softly."],
        "condotti-di-servizio": [
          "Condotti di servizio angusti con cavi, sfiati di vapore e luci d'emergenza.",
          "Narrow service ducts packed with cables and pipes, converging toward a red-lit junction with a sealed hatch in the central third of the frame. Steam vents, metal grates and a dropped wrench fill the foreground, with water dripping from a cracked pipe. Flickering emergency lights recede down the tunnel into the background.",
          "Steam puffs gently from the vents, emergency lights flicker, cables sway slightly, a thin haze drifts down the tunnel."],
      },
      pericoli: {
        "drone-di-sicurezza-impazzito": [
          "Drone di sicurezza fuori controllo con un solo occhio rosso e rotori che sprizzano scintille.",
          "A rogue security drone hovering in a dark station corridor, a spherical armoured body with scratched white plates, a single large glowing red eye and two damaged rotors throwing sparks. A stun prod hangs from its underside, and a warning light on its side blinks red.",
          "The drone hovers with a gentle bob, rotors blur, small sparks fall occasionally, the red eye pulses slowly."],
        "sciame-di-nanobot": [
          "Sciame argentato di nanobot che si avvita in una sagoma minacciosa.",
          "A swirling silver swarm of millions of nanobots forming a menacing face-like shape in the dark, tiny metal particles glinting with cyan highlights. Streams of the swarm pour out of a broken wall panel behind it, and loose particles drift around the edges.",
          "The nanobot swarm swirls slowly and continuously, glints shimmer across it, the face shape holds steady."],
        "creatura-aliena-dai-tentacoli": [
          "Creatura aliena con tentacoli lucidi e macchie bioluminescenti che esce da una grata.",
          "An alien creature squeezing out of a vent grate, glossy dark tentacles with bioluminescent blue spots wrapping around the bent bars. A cluster of glowing eyes and a ring of small teeth sit at the centre of its body, and slime drips onto the metal floor.",
          "The tentacles curl and uncurl very slowly, bioluminescent spots pulse softly, the eyes blink, mist drifts from the vent."],
        "androide-da-combattimento": [
          "Androide da combattimento corazzato, visore acceso, pelle sintetica strappata.",
          "A battle android standing in a red-lit corridor, an armoured chassis of dark grey plates, a glowing cyan visor across its face and torn synthetic skin on one cheek revealing the metal skull. Exposed cables spark at its neck, and its armoured shoulders are scratched by battle.",
          "The visor light scans slowly left to right, small sparks fizz from the torn skin, the red light pulses behind."],
      },
      armi: {
        "fucile-al-plasma": [
          "Fucile al plasma affusolato con celle d'energia ciano.",
          "A sleek plasma rifle with a white and graphite body, two transparent energy cells glowing cyan along the side, cooling fins near the barrel and a small holographic sight."],
        "lama-vibrante": [
          "Lama vibrante con il filo traslucido che ronza.",
          "A vibro-blade with a long translucent edge humming with faint blue light, a ribbed black grip with a power switch and a small battery pack at the pommel."],
        "pistola-laser": [
          "Pistola laser compatta con emettitore rosso.",
          "A compact laser pistol with a matte grey body, a glowing red emitter tip, a charge indicator of small lights and a textured rubber grip."],
        "granata-emp": [
          "Granata EMP sferica con archi elettrici blu.",
          "A spherical EMP grenade made of segmented metal plates, a glowing blue core visible through the gaps and small crackling electric arcs dancing on its surface."],
        "frusta-monofilamento": [
          "Frusta a monofilamento: impugnatura metallica e un filo luminoso quasi invisibile.",
          "A monofilament whip with a chrome cylindrical handle and a thin glowing cyan line coiled loosely around it, sharp enough to cut steel."],
        "taser-a-impulsi": [
          "Taser a impulsi con elettrodi che crepitano.",
          "A pulse taser shaped like a short baton, with two metal electrodes at the tip crackling with bright blue electricity and a glowing charge strip on the handle."],
        "cannone-a-rotaia-portatile": [
          "Cannone a rotaia portatile con binari magnetici e calcio pesante.",
          "A portable railgun with twin parallel magnetic rails glowing faintly between them, a heavy reinforced stock, a power cable and a large scope."],
      },
    },
    zombie: {
      look: "Città abbandonata dopo il contagio: verdi malati e grigi su ruggine e cemento bagnato, neon tremolanti, smog basso.",
      facet: "concrete",
      light: "Sickly green and overcast grey daylight falls on rust and wet concrete, with flickering fluorescent accents, deep olive shadows and low drifting smog.",
      prop: "Lit by a sickly green overcast key light with a pale fluorescent rim light.",
      luoghi: {
        "ospedale": [
          "Corridoio d'ospedale abbandonato con barelle rovesciate, luci tremolanti e porte barricate.",
          "An abandoned hospital corridor leading to barricaded double doors in the central third of the frame, chairs and gurneys piled against them. Overturned gurneys, scattered pill bottles, a wheelchair and a toppled IV stand cover the foreground floor. Flickering ceiling lights, a torn privacy curtain and smeared windows recede into the background.",
          "Ceiling lights flicker irregularly, a torn curtain sways slightly, dust drifts in the light, the IV bag swings gently."],
        "centro-commerciale": [
          "Atrio di un centro commerciale saccheggiato: scale mobili rotte, carrelli, lucernari.",
          "A looted shopping mall atrium with a broken escalator rising through the central third of the frame toward a dark upper floor. Abandoned shopping trolleys, shattered glass, a fallen mannequin and scattered shoes fill the foreground. Dusty skylights pour pale green light over empty shop fronts and torn blank banners in the background.",
          "Pale light beams shift softly through the skylights, dust motes float, a loose sign sways slightly, a trolley rolls a few centimetres."],
        "metropolitana": [
          "Banchina della metro al buio, treno deragliato, binari allagati, lampade d'emergenza.",
          "A dark subway platform with a derailed train tilted across the tracks in the central third of the frame, its doors half open and windows cracked. Flooded rails, a fallen bench and scattered suitcases fill the foreground, reflected in still water. Emergency lamps glow at intervals along the tunnel into the background.",
          "Emergency lamps flicker, water drips and ripples slowly across the flooded tracks, a light haze drifts in the tunnel."],
        "scuola": [
          "Corridoio di scuola vuoto, armadietti, fogli a terra, finestre sbarrate con assi.",
          "An empty school hallway with a line of dented lockers leading to a set of double doors in the central third of the frame. Loose papers, a dropped backpack, a basketball and a fallen fire extinguisher lie on the foreground floor. Windows boarded up with planks let thin beams of grey light into the background.",
          "Loose papers flutter slightly in a draft, thin light beams shimmer, a locker door swings very slowly, dust drifts."],
        "stazione-di-polizia": [
          "Stazione di polizia fortificata: sacchi di sabbia, furgone blindato, fari.",
          "A fortified police station with an armoured van parked in the central third of the frame, its rear doors open. Sandbag walls, traffic cones, coils of barbed wire and an abandoned riot shield fill the foreground. Searchlights cut through the smog over the brick station facade in the background.",
          "Searchlights sweep slowly through the smog, a torn flag ripples gently, the van hazard lights blink."],
        "periferia": [
          "Strada di periferia con auto abbandonate, prati incolti e fumo all'orizzonte.",
          "A suburban street with a crashed car against a lamp post and an abandoned yellow school bus in the central third of the frame. Overgrown lawns, a fallen mailbox and a child tricycle fill the foreground. Rows of silent houses with boarded windows and a column of black smoke on the horizon fill the background.",
          "Smoke rises slowly on the horizon, tall grass sways, a swing creaks gently back and forth, clouds drift."],
      },
      pericoli: {
        "orda-di-zombi": [
          "Orda fitta di zombi che riempie una strada, tante mani protese in avanti.",
          "A dense horde of shambling zombies filling a city street, the closest one in sharp focus with milky white eyes, grey cracked skin and a torn office shirt. Dozens of hands reach forward behind it, and the crowd fades into green smog.",
          "The horde sways slowly in place, heads tilt, hands twitch, smog drifts between them."],
        "infetto-corridore": [
          "Infetto corridore pronto allo scatto, vestiti strappati, occhi folli.",
          "A fast infected runner crouched low and ready to sprint, wearing a torn hoodie and one shoe, dark veins spreading under pale skin and wild glowing eyes fixed on the viewer. Its fingers are spread on the asphalt like claws.",
          "The runner breathes rapidly with small shoulder movements, its head twitches, torn clothes flutter, smog drifts behind."],
        "cane-infetto": [
          "Cane infetto con pelo a chiazze, denti scoperti e occhi lattiginosi.",
          "An infected dog with patchy grey fur, bared yellow teeth and milky eyes, a broken leather collar around its neck, growling low with its head lowered and hackles raised.",
          "The dog growls with slow heavy breathing, lips quiver, fur bristles in the wind."],
        "gigante-mutato": [
          "Gigante mutato con muscoli gonfi ed escrescenze ossee che sfonda un muro.",
          "A towering mutated giant bursting through a brick wall, swollen grey muscles, bony plates growing out of its shoulders and one arm far larger than the other. Dust and falling bricks surround it, and its small eyes glow sickly green.",
          "The giant breathes heavily with slow chest movement, dust and small bricks crumble down, its eyes glow faintly."],
      },
      armi: {
        "mazza-chiodata": [
          "Mazza da baseball avvolta nel filo spinato e nei chiodi.",
          "A wooden baseball bat wrapped in rusty barbed wire and studded with bent nails, its handle taped with black grip tape."],
        "fucile-a-pompa": [
          "Fucile a pompa con il calcio rattoppato col nastro.",
          "A pump-action shotgun with a scratched black barrel, a wooden pump and a cracked stock held together with grey duct tape, a few red shells strapped to the side."],
        "piede-di-porco": [
          "Piede di porco in acciaio rosso.",
          "A red steel crowbar with scuffed and chipped paint, a curved claw end and a flat pry end bent from use."],
        "motosega": [
          "Motosega con il corpo arancione graffiato.",
          "A chainsaw with a scratched orange body, a long steel bar, a dull chain and a pull-start cord hanging loose."],
        "katana": [
          "Katana con l'impugnatura consumata.",
          "A katana with a gently curved polished blade, a round guard and a worn handle wrapped in faded black cord."],
        "balestra": [
          "Balestra moderna da caccia con mirino.",
          "A modern hunting crossbow with a black composite frame, a mounted scope, taut cables and a bolt loaded and ready."],
        "pistola": [
          "Pistola semiautomatica malridotta.",
          "A battered semi-automatic pistol with worn black finish, scratches along the slide and a magazine slightly sticking out."],
        "accetta": [
          "Accetta con impugnatura in gomma.",
          "A short hatchet with a steel head, a sharp bright edge and a red rubber grip with a wrist strap."],
      },
    },
    royale: {
      look: "Isola tropicale da battle royale: mare turchese, verde giungla, riflessi arancio del tardo pomeriggio, ombre blu, foschia marina.",
      facet: "rock",
      light: "Bright tropical late-afternoon light paints turquoise sea, jungle greens and orange sunset highlights, with cool blue shadows and light sea haze.",
      prop: "Lit by a bright warm afternoon key light with a cool blue rim light.",
      luoghi: {
        "aeroporto": [
          "Piccolo aeroporto dell'isola con pista, un cargo arrugginito e la torre di controllo.",
          "A small island airport with a rusty propeller cargo plane parked on a cracked runway in the central third of the frame, its cargo ramp open. Supply crates with parachutes, a fuel cart and an orange windsock fill the foreground. A white control tower, swaying palm trees and the turquoise sea fill the background.",
          "The windsock flutters gently, palm fronds sway, heat haze shimmers over the runway, clouds drift slowly."],
        "base-militare": [
          "Base militare con tende, torrette, casse di rifornimento ed eliporto.",
          "A military base with a helipad and a parked olive green helicopter in the central third of the frame. Stacked supply crates, sandbag walls and camouflage nets fill the foreground, with a glowing loot crate among them. Wooden watchtowers, canvas tents and jungle hills fill the background.",
          "Camouflage nets ripple in the breeze, a flag waves gently, a searchlight turns slowly, dust drifts."],
        "villaggio-costiero": [
          "Villaggio di pescatori con case colorate, pontile di legno e barche.",
          "A coastal fishing village with a long wooden pier and colourful moored boats in the central third of the frame. Drying fishing nets, red buoys and a stack of wooden crates fill the foreground. Pastel houses with tin roofs, palm trees and the open sea fill the background.",
          "Boats bob gently on the water, small waves lap the pier, nets sway, seagulls glide slowly in the distance."],
        "centrale-elettrica": [
          "Centrale elettrica con torri di raffreddamento, tralicci e trasformatori.",
          "A power plant with two concrete cooling towers releasing white steam in the central third of the frame. Humming transformers, chain-link fences and blank yellow warning signs fill the foreground. Tall electricity pylons with sagging cables and jungle hills fill the background.",
          "Steam rises slowly from the cooling towers, transformer lights blink, wires sway slightly, heat haze shimmers."],
        "fattoria": [
          "Fattoria con fienile rosso, balle di fieno, silos e campi di grano.",
          "A farm with a red wooden barn, a tall silver silo and an old windmill in the central third of the frame. Round hay bales, a rusty tractor and a broken wooden fence fill the foreground. Golden wheat fields rippling toward a line of palm trees fill the background.",
          "Wheat sways in gentle waves, the windmill turns slowly, a barn door creaks slightly, dust floats in the light."],
        "foresta": [
          "Foresta tropicale rigogliosa con palme, felci e una cassa di rifornimento nascosta.",
          "A lush tropical forest with a glowing supply crate resting in a small sunlit clearing in the central third of the frame. Giant ferns, thick roots, fallen palm fronds and bright flowers fill the foreground. Tall palms, hanging vines and shafts of golden light through the canopy fill the background.",
          "Shafts of sunlight shimmer, leaves sway, the crate glows with a slow pulse, small insects and pollen float."],
      },
      pericoli: {
        "drone-armato": [
          "Drone quadricottero armato con mitragliatrice e laser di puntamento rosso.",
          "An armed quadcopter drone hovering over the jungle canopy, a black carbon body with four spinning rotors, a mounted gun turret underneath and a red targeting laser beam pointing at the viewer. Its camera lens glows red and a small antenna blinks.",
          "The drone hovers with a gentle bob, the rotors blur, the red laser sweeps slowly, leaves sway below."],
        "elicottero-da-caccia": [
          "Elicottero d'attacco in volo basso con il faro acceso.",
          "An attack helicopter hovering low over the jungle seen head-on, a dark grey armoured body, a tinted cockpit glowing faintly, rocket pods under its stubby wings and a bright searchlight beam aimed at the viewer. Palm trees bend in the downdraft below it.",
          "The helicopter hovers in place with blurred rotors, the searchlight sways slowly, palm trees bend in the downdraft."],
        "cane-da-guardia-addestrato": [
          "Pastore tedesco da guardia con giubbotto tattico, che abbaia.",
          "A trained German shepherd guard dog in a black tactical vest with pouches, ears up and teeth showing, barking at the viewer. A leash trails on the dusty ground, and the fence of a military base is visible behind it.",
          "The dog breathes with its tongue out between barks, ears twitch, the vest straps shift slightly."],
      },
      armi: {
        "fucile-dassalto": [
          "Fucile d'assalto con mirino a punto rosso.",
          "An assault rifle with a black and tan body, a red-dot sight on the top rail, a curved magazine and a short foregrip, with a subtle golden rarity glow along its edges."],
        "pistola": [
          "Pistola semiautomatica nera.",
          "A black semi-automatic pistol with a textured grip, a short slide and a small flashlight attached under the barrel."],
        "fucile-da-cecchino": [
          "Fucile da cecchino con cannocchiale lungo e bipiede.",
          "A long sniper rifle with a dark green body, a large scope, a folded bipod and a fabric cheek pad on the stock."],
        "fucile-a-pompa": [
          "Fucile a pompa tattico.",
          "A tactical pump shotgun with a black synthetic stock, a ribbed pump and a row of red shells held in a side carrier."],
        "granata": [
          "Granata a frammentazione con la spoletta.",
          "A round fragmentation grenade with a ridged olive green body, a metal lever and a pull ring with its pin."],
        "mitraglietta": [
          "Mitraglietta compatta.",
          "A compact submachine gun with a folding stock, a long straight magazine and a short suppressor."],
        "coltello-da-combattimento": [
          "Coltello da combattimento con dorso seghettato.",
          "A combat knife with a black steel blade, a serrated spine, a textured rubber handle and a finger guard."],
        "balestra": [
          "Balestra tattica mimetica.",
          "A tactical crossbow with a green camouflage frame, a red-dot sight and a bolt with bright orange fletching loaded and ready."],
      },
    },
    horror: {
      look: "Villa gotica maledetta: luce lunare cremisi e oro di candela contro ombre nere, nebbia fredda strisciante. Paura sottile, niente sangue esplicito.",
      facet: "stone",
      light: "Blood crimson moonlight and warm candle gold glow against deep black shadows, with cold creeping fog.",
      prop: "Lit by a warm candle gold key light with a crimson moonlight rim light.",
      luoghi: {
        "cantina": [
          "Cantina umida con botti piene di ragnatele, una lampadina che oscilla e una porta socchiusa.",
          "A damp wine cellar with a heavy wooden door left ajar in the central third of the frame, a sliver of red light glowing through the gap. Cobwebbed barrels, dusty broken bottles and worn stone steps fill the foreground. A single bare bulb hangs from vaulted brick arches in the background, its light barely reaching the corners.",
          "The bulb swings very slowly and flickers, cobwebs sway, dust drifts in the light, the door creaks slightly."],
        "soffitta": [
          "Soffitta polverosa con mobili coperti da teli, un cavallo a dondolo e luna da un oblò.",
          "A dusty attic with an old wooden rocking horse in the central third of the frame, lit by a cold moonbeam through a round window. Sheet-covered furniture, a cracked oval mirror and old leather trunks fill the foreground. Slanted roof beams, hanging cobwebs and a toy music box fill the background.",
          "The rocking horse rocks almost imperceptibly, sheets ripple slightly, dust floats in the moonbeam."],
        "cappella": [
          "Cappella gotica privata con candele, vetrate rotte e panche vuote.",
          "A private gothic chapel with a candle-lit altar in the central third of the frame beneath a broken stained glass window. Empty wooden pews, fallen brass candlesticks and scattered dried roses fill the foreground. Tall pointed arches and crimson moonlight streaming through the coloured glass fill the background.",
          "Candle flames flicker gently, smoke curls upward, coloured moonlight shifts slowly on the floor."],
        "cimitero": [
          "Cimitero incolto con lapidi storte, cancello di ferro e nebbia sotto una luna rossa.",
          "An overgrown cemetery with a tall wrought iron gate standing open in the central third of the frame. Leaning tombstones, dead flowers and a lit lantern resting on a grave fill the foreground. A blood red moon, a dead tree full of crows and the dark mansion silhouette on a hill fill the background.",
          "Fog creeps slowly between the graves, the gate sways slightly, the lantern flickers, crows shift on the dead tree."],
        "biblioteca": [
          "Biblioteca antica con scaffali altissimi, polvere sospesa e un libro aperto sul leggio.",
          "A grand old library with a heavy book lying open on a carved lectern in the central third of the frame, lit by a single candle. Stacks of books, a tarnished candelabra and a fallen rolling ladder fill the foreground. Towering shelves and a spiral staircase vanish into darkness in the background.",
          "Book pages turn slowly by themselves, candle flames flicker, dust floats in the light, shadows shift."],
        "serra": [
          "Serra vittoriana in rovina con vetri rotti, piante carnivore e rampicanti.",
          "A derelict Victorian greenhouse with a cracked stone fountain in the central third of the frame. Shattered glass, overturned clay pots and carnivorous plants with open mouths fill the foreground. Creeping vines climb the broken iron frames against a red moon in the background.",
          "Carnivorous plants open and close very slowly, vines sway, fog drifts through the broken panes."],
      },
      pericoli: {
        "spettro-urlante": [
          "Fantasma che urla con la bocca innaturalmente allungata e capelli pallidi fluttuanti.",
          "A screaming ghost of a woman with an unnaturally stretched mouth and empty dark eyes, pale hair floating as if underwater, glowing white against the darkness. Her translucent hands are raised toward the viewer, and the tattered edge of an old nightgown fades into mist.",
          "The ghost hovers with a slow floating motion, its hair drifts as if underwater, the glow pulses softly."],
        "bambola-posseduta": [
          "Bambola di porcellana col viso incrinato e un occhio di vetro, seduta su una sedia.",
          "A porcelain doll with a cracked face and one blue glass eye sitting in a small wooden chair, wearing a yellowed lace dress, its head tilted slightly too far. A single candle beside it lights its painted smile.",
          "The doll head turns very slowly by a few degrees, its glass eye glints, the chair rocks almost imperceptibly."],
        "entita-senza-volto": [
          "Entità alta e senza volto in un corridoio buio, braccia troppo lunghe.",
          "A tall faceless entity in an old black suit standing at the end of a dark corridor, smooth pale skin where its face should be and unnaturally long arms hanging to its knees. A flickering wall lamp beside it is the only light.",
          "The entity stands still while its shape subtly flickers, the corridor light buzzes and dims, fog crawls at its feet."],
        "stormo-di-corvi": [
          "Stormo di corvi su un albero morto; uno fissa chi guarda.",
          "A flock of black crows perched on the twisted branches of a dead tree under a red moon, one large crow in front staring straight at the viewer with a glinting eye. A few black feathers drift in the air.",
          "The crows shift and ruffle their feathers, one tilts its head, a few feathers drift down, clouds pass the moon."],
      },
      armi: {
        "candelabro-dargento": [
          "Candelabro d'argento pesante con tre candele che colano.",
          "A heavy tarnished silver candelabra with three branches and three white candles, wax dripping down the sides, one flame still burning."],
        "ascia": [
          "Vecchia ascia arrugginita.",
          "An old rusted axe with a cracked wooden handle, a chipped blade with dark stains of age and a strip of old cloth tied near the head."],
        "fucile-da-caccia": [
          "Doppietta da caccia con calcio in legno.",
          "A double-barrelled hunting shotgun with a polished walnut stock, engraved silver side plates and worn dark barrels."],
        "pugnale-rituale": [
          "Pugnale rituale con elsa d'osso e simboli incisi.",
          "A ritual dagger with a wavy black blade, a hilt carved from bone and engraved occult symbols that glow faint red."],
        "crocifisso-appuntito": [
          "Crocifisso di legno appuntito come un paletto.",
          "A dark wooden crucifix with a small silver figure, its long bottom end carved into a sharp stake."],
        "attizzatoio": [
          "Attizzatoio da camino in ferro battuto.",
          "A wrought iron fireplace poker with a hooked pointed tip, a twisted shaft and a ring handle, its end still glowing faintly from the fire."],
        "falce": [
          "Falce da contadino con la lama lunga e curva.",
          "A farmer scythe with a long curved rusty blade and a weathered wooden snath with two worn handles."],
      },
    },
    wasteland: {
      look: "Deserto post-atomico: sole bruciante su sabbia ocra e lamiere arrugginite, riflessi arancio, ombre terra d'ombra, foschia di polvere.",
      facet: "rock",
      light: "Harsh scorched sunlight bleaches ochre sand and rusted metal, with burnt orange highlights, deep umber shadows and a thick haze of dust.",
      prop: "Lit by a harsh scorched sunlight key light with a burnt orange rim light.",
      luoghi: {
        "discarica": [
          "Enorme sfasciacarrozze di auto arrugginite, pneumatici e rottami sotto un sole velato.",
          "A vast scrapyard with a towering pile of crushed rusted cars in the central third of the frame, topped by a lookout hut made of sheet metal. Old tyres, dented oil drums and a rusted car door fill the foreground. A tall rusted crane with a hanging magnet and a hazy pale sun fill the background.",
          "Heat haze shimmers, a loose sheet of metal flaps slowly, dust blows across the ground, the crane hook sways."],
        "autostrada-spezzata": [
          "Cavalcavia autostradale crollato nel deserto, camion abbandonati.",
          "A broken highway overpass collapsed into the desert, its snapped concrete span hanging over the central third of the frame with rebar sticking out. Abandoned trucks, cracked asphalt and toppled road barriers fill the foreground, half covered by sand. Endless dunes and a blazing white sun fill the background.",
          "Sand blows slowly across the asphalt, heat haze shimmers, a torn tarp flaps on a truck."],
        "raffineria": [
          "Raffineria arrugginita con torce di gas accese e un intrico di tubi.",
          "A rusted oil refinery with a tall flare stack burning a bright flame in the central third of the frame. Tangled pipes, wheel valves and leaking oil barrels fill the foreground. Round storage tanks and columns of black smoke against an orange sky fill the background.",
          "The flare flame flickers and dances, smoke rises slowly, steam leaks from a valve, heat haze shimmers."],
        "citta-fantasma": [
          "Città fantasma con edifici mezzi sepolti, cartelloni sbiaditi e rotolacampo.",
          "A ghost town main street with a half-buried roadside diner in the central third of the frame, its neon frame dark and broken. Tumbleweeds, a dead traffic light hanging from a wire and drifting sand fill the foreground. Faded blank billboards and broken buildings fill the background.",
          "Tumbleweeds roll slowly, sand drifts in the wind, a hanging sign sways, the dead traffic light dangles."],
        "cratere": [
          "Cratere radioattivo enorme con pozze che brillano di verde.",
          "A huge radioactive crater with glowing green pools at its centre in the central third of the frame, steam rising from the water. Yellow warning barrels, cracked rocks and the burnt skeleton of a car fill the foreground rim. A toxic yellow sky and distant ruined towers fill the background.",
          "The green pools pulse and bubble softly, toxic vapour rises slowly, dust drifts across the rim."],
        "diga": [
          "Diga di cemento gigante incrinata, con un insediamento di fortuna in cima.",
          "A giant cracked concrete dam with a makeshift settlement of shacks, flags and water tanks on top in the central third of the frame. A dry riverbed, rusted pipes and a boat wreck fill the foreground. A thin waterfall leaks through a crack in the wall against a dusty sky in the background.",
          "Water trickles through the crack, flags flutter on the shacks, dust drifts, smoke rises from a chimney."],
      },
      pericoli: {
        "banda-di-predoni": [
          "Banda di predoni con armature di cuoio chiodato e occhialoni, accanto a buggy truccati.",
          "A gang of raiders standing in front of their modified buggies, the leader in front with a tall mohawk, cracked goggles, a rusty face mask and spiked leather shoulder armour. The others behind are silhouettes holding chains and pipes, with a tattered flag on a buggy antenna.",
          "The raiders breathe and shift their weight slightly, scarves flutter in the wind, dust blows past, engine heat shimmers."],
        "scorpione-gigante": [
          "Scorpione gigante del deserto col pungiglione alzato.",
          "A giant desert scorpion as big as a car, its armoured faceted chitin shining in the harsh sun, claws open wide and its segmented tail raised high with a dripping stinger. Sand streams off its legs and a bleached skull lies beside it.",
          "The scorpion stinger sways slowly, claws twitch, sand trickles off its shell."],
        "branco-di-cani-mutati": [
          "Branco di cani mutati senza pelo, con occhi in più, che ringhiano.",
          "A pack of hairless mutated dogs with scarred grey skin, uneven extra eyes and long teeth, the leader in front growling low at the viewer. The others prowl behind it through blowing dust.",
          "The dogs pant and growl with slow breathing, their eyes blink out of sync, dust drifts."],
        "verme-delle-sabbie": [
          "Verme delle sabbie colossale che erompe dalle dune, bocca circolare piena di denti.",
          "A colossal sandworm bursting out of the dunes, its circular mouth opened toward the viewer and lined with rings of inward-pointing teeth, its ridged body arching high. Sand pours from its skin in streams, and a small abandoned buggy lies on the dune below for scale.",
          "The worm sways slowly, sand pours continuously from its body, the rings of teeth ripple, dust swirls."],
      },
      armi: {
        "fucile-arrugginito": [
          "Fucile a otturatore arrugginito con mirino legato col nastro.",
          "A rusty bolt-action rifle with a cracked wooden stock, a scope held on with duct tape and a strip of leather as a sling."],
        "lancia-ricavata-da-un-tubo": [
          "Lancia fatta con un tubo di metallo e un tondino appuntito.",
          "A spear made from a dented metal pipe with a sharpened length of rebar welded on the tip, wrapped with rags and wire for grip."],
        "balestra-artigianale": [
          "Balestra artigianale fatta con balestre d'auto e rottami.",
          "A homemade crossbow built from a car leaf spring, scrap metal and bolts, with a bicycle chain mechanism and a sharpened rebar bolt loaded."],
        "molotov": [
          "Bottiglia molotov con lo straccio in fiamme.",
          "A molotov cocktail made from a glass bottle half full of amber fuel, a rag stuffed in the neck and burning with a small flame."],
        "catena": [
          "Catena pesante arrotolata con un lucchetto.",
          "A heavy coiled steel chain with thick rusted links and a big brass padlock hanging from one end."],
        "mannaia": [
          "Mannaia grande con manico fasciato.",
          "A large meat cleaver with a broad scratched blade, a hole near the spine and a handle wrapped in dirty cloth."],
        "lanciachiodi": [
          "Sparachiodi modificato come arma, con caricatore a tamburo.",
          "A nail gun modified into a weapon, with a welded drum magazine full of long nails, an extended barrel and a taped grip."],
      },
    },
    liceo: {
      look: "Liceo italiano in chiave satirica: luce pastello rosa e lilla dalle finestre alte, riflessi dorati, ombre viola morbide. Nessuna violenza: le «minacce» sono caricature.",
      facet: "",
      light: "Soft pastel pink and lilac light pours through tall windows, with warm golden highlights, gentle violet shadows and a dreamy afternoon glow, playful satirical comedy mood.",
      prop: "Lit by a soft pastel pink key light with a warm golden rim light, playful comedy mood.",
      luoghi: {
        "palestra": [
          "Palestra della scuola con parquet, canestri, funi e tappetini impilati.",
          "A school gym with a basketball hoop above a polished wooden floor in the central third of the frame, a single ball resting under it. Stacked blue mats, a forgotten red dodgeball and a wooden bench with a towel fill the foreground. Climbing ropes, wall bars and tall windows full of afternoon light fill the background.",
          "Climbing ropes sway gently, light beams shimmer through the windows, dust floats, the ball rolls a little."],
        "mensa": [
          "Mensa scolastica dopo pranzo: tavoli lunghi, vassoi abbandonati, bancone fumante.",
          "An empty school cafeteria after lunch, with a steaming lunch counter and stacked trays in the central third of the frame. Long tables with abandoned food trays, a spilled juice box and a half-eaten sandwich fill the foreground. Tall windows and colourful blank posters fill the background.",
          "Steam rises softly from the counter, light beams shimmer, a napkin flutters, dust floats."],
        "biblioteca": [
          "Biblioteca scolastica silenziosa con scaffali e tavoli da studio.",
          "A quiet school library with a study table lit by a green desk lamp in the central third of the frame. Piles of textbooks, a forgotten backpack and scattered handwritten notes fill the foreground. Tall wooden bookshelves and arched windows with dust floating in the light fill the background.",
          "Pages flutter slightly, dust drifts in the light, the lamp glows softly, light shifts slowly through the windows."],
        "laboratorio-di-chimica": [
          "Laboratorio di chimica con becher, cappa aspirante e fiasche colorate che bollono.",
          "A chemistry lab with a bench of colourful bubbling flasks connected by glass tubes in the central third of the frame. Beakers, test tubes in racks and a lit Bunsen burner fill the foreground. A fume hood and a colourful wall chart of blank squares fill the background.",
          "The flasks bubble softly, coloured vapour rises slowly, the burner flame flickers."],
        "cortile": [
          "Cortile della scuola con panchine, un albero, motorini e zaini a terra.",
          "The school courtyard with a big leafy tree and a wooden bench in the central third of the frame. Parked scooters with stickers and backpacks on the ground fill the foreground. The school facade with tall windows and a big wall clock fills the background.",
          "Leaves rustle and a few drift down, dappled sunlight moves on the ground, a ribbon on a scooter flutters."],
        "aula-magna": [
          "Aula magna con file di poltroncine, palco e microfono.",
          "An assembly hall with a wooden stage and a single microphone under a spotlight in the central third of the frame. Rows of red folding seats fill the foreground, one with a forgotten jacket. Heavy velvet curtains and tall windows fill the background.",
          "The spotlight beam shimmers with floating dust, the curtains sway gently, the microphone cable swings slightly."],
      },
      pericoli: {
        "preside": [
          "Caricatura della Preside severa, braccia conserte, occhiali abbassati, sulla soglia.",
          "A stern school principal standing in a doorway, a sharp grey suit, arms crossed, glasses lowered to the tip of the nose and one eyebrow raised high. A bunch of keys hangs from her belt, and a corridor of lockers stretches behind her.",
          "The principal taps a foot slowly, the eyebrow lifts, the glasses glint, papers flutter on a nearby desk."],
        "bidello-di-turno": [
          "Caricatura del bidello brontolone con mocio, secchio e mazzo di chiavi.",
          "A grumpy school janitor leaning on a mop beside a yellow bucket, a huge ring of keys on his belt, a grey work coat and a bushy moustache, squinting suspiciously at the viewer.",
          "The janitor leans on the mop and sighs, the keys jingle slightly, soap bubbles float from the bucket."],
        "ispezione-a-sorpresa": [
          "L'ispezione a sorpresa: un ispettore con cartellina e lente che spunta da una porta.",
          "A school inspector peeking through a half-open classroom door, holding a clipboard and a big magnifying glass that makes one eye look huge, a bow tie and a tidy grey suit.",
          "The magnifying glass moves slowly, the huge eye blinks, the door sways slightly."],
        "professoressa-di-matematica": [
          "Caricatura della prof di matematica con la penna rossa, lavagna con formule illeggibili.",
          "A strict math teacher holding a red pen raised like a sword, a stack of graded tests under one arm, sharp glasses and a tight bun, with a blackboard of blurred chalk scribbles behind her.",
          "The red pen taps slowly, chalk dust floats in the light, the teacher narrows her eyes."],
      },
      armi: {
        "gossip-esplosivo": [
          "Smartphone con un fumetto di chat che esplode come un fuoco d'artificio.",
          "A smartphone with a glowing pink screen and a chat bubble bursting out of it like a firework, sparkles and tiny hearts flying around."],
        "foto-imbarazzante": [
          "Polaroid con un'immagine imbarazzante sfocata e un bagliore rosa.",
          "A polaroid photo with a blurred embarrassing picture, slightly bent at one corner, with a soft pink glow and a doodled heart on the border."],
        "compito-copiato": [
          "Compito in classe con un bigliettino nascosto che spunta.",
          "A folded test paper with a tiny rolled cheat sheet sticking out of it, scribbled lines instead of writing and a red pen mark on top."],
        "pallone-da-dodgeball": [
          "Pallone rosso da dodgeball con scie di movimento.",
          "A bright red rubber dodgeball with a textured surface and a few motion streaks, as if just thrown."],
        "registro-rubato": [
          "Registro di classe spesso con il segnalibro a nastro.",
          "A thick hardcover class register with a plain dark blue cover, a red ribbon bookmark and loose sheets sticking out of the pages."],
        "profilo-falso": [
          "Smartphone con un profilo social finto e l'icona di una maschera.",
          "A smartphone showing a fake social profile with a blank avatar and a small disguise mask with glasses and moustache floating above the screen."],
      },
    },
    ufficio: {
      look: "Open space aziendale in chiave satirica: luce fluorescente verde petrolio e grigia, bagliore dei monitor, ombre verde scuro, polvere sospesa. Commedia d'ufficio, nessuna violenza.",
      facet: "",
      light: "Cold teal and grey fluorescent office light mixes with the glow of monitors, with deep petrol green shadows and a faint dusty haze, satirical corporate comedy mood.",
      prop: "Lit by a cold teal fluorescent key light with a monitor glow rim light, comedy mood.",
      luoghi: {
        "sala-riunioni": [
          "Sala riunioni con tavolo di vetro lungo, sedie vuote, schermo del proiettore e lavagna.",
          "A meeting room with a long glass table leading to a glowing projector screen in the central third of the frame, showing an abstract chart. Empty swivel chairs, cold coffee cups and scattered papers fill the foreground. A whiteboard of blurred scribbles and a grey city view through tall windows fill the background.",
          "The projector beam shimmers with floating dust, a chair turns very slowly, steam rises from a coffee cup."],
        "open-space": [
          "Open space sterminato con file di scrivanie, monitor e piante in vaso.",
          "A sprawling open-space office with endless rows of identical desks and glowing monitors converging in the central third of the frame. A cluttered desk with a sad potted plant, a stress ball and sticky notes fills the foreground. Glass partitions, ceiling lights and a grey city skyline fill the background.",
          "Monitors flicker softly, a ceiling light buzzes and blinks, the plant leaves sway in the air conditioning."],
        "cucina": [
          "Angolo cucina con macchinetta del caffè, tazze, microonde e frigo pieno di bigliettini.",
          "The office kitchenette with a steaming coffee machine on the counter in the central third of the frame. Mugs, sugar packets and a half-eaten birthday cake with one candle fill the foreground. A fridge covered in sticky notes, a microwave and a sink full of cups fill the background.",
          "Steam rises from the coffee machine, a drip falls slowly, the microwave light glows, sticky notes flutter."],
        "ufficio-del-direttore": [
          "Ufficio d'angolo del Direttore con poltrona di pelle, vetrata panoramica e premi.",
          "The director corner office with a big leather chair turned toward a panoramic window in the central third of the frame. A polished wooden desk with a blank golden nameplate and a smoking cigar in an ashtray fills the foreground. Golden trophies on shelves and a city skyline at dusk fill the background.",
          "The leather chair turns very slowly, cigar smoke curls upward, city lights twinkle outside."],
        "sala-stampanti": [
          "Stanzino delle stampanti con una fotocopiatrice inceppata che sputa fogli.",
          "A cramped printer room with a big jammed copier in the central third of the frame, sheets of paper spilling from its tray. Paper piled on the floor and open toner boxes fill the foreground. Shelves of paper reams and a blinking orange warning light fill the background.",
          "Sheets slide slowly out of the copier, the warning light blinks, a few papers flutter down."],
        "parcheggio": [
          "Parcheggio aziendale sotterraneo con posti riservati e neon.",
          "An underground company car park with a shiny black executive car parked in a reserved space in the central third of the frame. Concrete pillars, painted parking lines and a dropped employee badge fill the foreground. Rows of fluorescent tubes recede into the background.",
          "Fluorescent tubes flicker, a puddle ripples slowly, dust drifts in the light."],
      },
      pericoli: {
        "direttore-generale": [
          "Caricatura dell'amministratore delegato in completo, controluce davanti a una vetrata.",
          "A powerful CEO in a sharp navy suit silhouetted against a tall office window, a smug smile, slicked-back grey hair, a gold watch and hands on hips in a power pose. The city skyline glows behind him.",
          "The CEO adjusts the tie very slowly, the smile widens slightly, city lights twinkle behind."],
        "ufficio-risorse-umane": [
          "Caricatura di una persona delle Risorse umane con sorriso di circostanza e pila di cartelline.",
          "An HR officer with a polite fake smile and a tidy cardigan, holding a tall wobbling stack of folders, a pen behind the ear and a box of tissues on the desk in front.",
          "The fake smile holds while one eye twitches, the folder stack wobbles slightly, papers flutter."],
        "consulente-esterno": [
          "Caricatura del consulente con capelli impomatati, portatile e grafico a torta olografico.",
          "A slick external consultant with gelled hair, a skinny tie and an open laptop, a glowing holographic pie chart floating above his palm and a confident grin.",
          "The holographic pie chart rotates slowly, the laptop screen glows, the consultant raises an eyebrow."],
        "riorganizzazione-aziendale": [
          "La riorganizzazione personificata: un mostro di caselle e frecce di organigramma.",
          "A corporate reorganization personified as a tangled monster made of org-chart boxes and arrows, with two glowing eyes and a wide grin made of connecting lines in the middle.",
          "The org-chart boxes shuffle slowly into new positions, arrows bend, the eyes blink."],
      },
      armi: {
        "mail-in-copia-a-tutti": [
          "Busta di una mail che si moltiplica in tante copie luminose.",
          "A white email envelope multiplying into many glowing copies that fan out behind it, each with a small red notification dot."],
        "report-pieno-di-errori-altrui": [
          "Report stampato coperto di segni rossi e post-it.",
          "A thick printed report covered in red correction marks and colourful sticky notes, abstract scribbled lines instead of text and a paperclip on top."],
        "presentazione-rubata": [
          "Chiavetta USB con una slide proiettata e una mascherina da ladro.",
          "A USB stick wearing a tiny black burglar mask, projecting a small glowing slide with an abstract chart above it."],
        "badge-clonato-del-capo": [
          "Badge col cordino e una sua copia identica luminosa.",
          "An ID badge on a blue lanyard with a blank photo area, and a glowing translucent duplicate copy floating beside it."],
        "foglio-excel-con-le-prove": [
          "Stampa di un foglio di calcolo con celle evidenziate e una lente.",
          "A spreadsheet printout with bright yellow highlighted cells, abstract grid marks and a magnifying glass resting on top of it."],
        "nota-spese-gonfiata": [
          "Uno scontrino che si gonfia come un palloncino.",
          "A long paper receipt inflating like a balloon, curled at the ends, with a small string tied at the bottom."],
      },
    },
  },
};
