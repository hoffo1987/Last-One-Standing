// Brief delle immagini della guida delle arene: luoghi, pericoli e armi.
// Per ogni voce: [cosa deve mostrare, in italiano; prompt breve in inglese].
// Il prompt completo si ottiene aggiungendo lo stile dell'arena e le regole della sezione
// (vedi tools/atlas-slots.js). Le chiavi sono i nomi dei file, senza estensione.
module.exports = {
  // valido per tutte le arene
  style: 'painterly digital illustration in the style of the Last One Standing arena banners, soft brushwork, clean shapes, dramatic cinematic lighting, rich but controlled colours',
  avoid: 'no text, no letters, no logos, no watermark, no UI, no frame, no realistic photo look, no recognizable real people',

  sections: {
    luoghi: { en: 'wide 16:9 establishing shot of the location, no people, eye-level view, the key landmark inside the central third of the frame, soft depth fog in the background' },
    pericoli: { en: '4:3 wanted-poster portrait, single threat centered and facing the viewer, head and eyes in the upper middle of the frame, dark vignetted background that fades to near black at the edges' },
    armi: { en: 'single object only, isolated on a fully transparent background, square 1:1, three-quarter view laid diagonally from lower left to upper right, 12% empty margin on every side, crisp silhouette with a thin dark outline so it reads on both light and dark backgrounds, no hands, no shadow on the ground' },
  },

  // Midjourney v8.2: come si compone ogni comando (vedi tools/atlas-slots.js)
  mj: {
    version: '8.2',
    // banner delle arene usati come riferimento di stile, dal repository pubblico
    sref: (id) => 'https://raw.githubusercontent.com/hoffo1987/Last-One-Standing/main/assets/arene/' + id + '.webp',
    medium: 'painterly digital game illustration, soft visible brushwork, clean graphic shapes, cinematic rim lighting, atmospheric depth',
    luoghi: {
      shot: 'wide establishing shot at eye level, an empty deserted location, the main landmark centered in the frame, layered depth with soft distant haze',
      params: { ar: '16:9', sw: 300, s: 250, chaos: 8 },
      no: 'text, letters, words, readable signs, logo, watermark, people, characters, frame, border',
    },
    pericoli: {
      shot: 'dramatic portrait framed like a wanted poster, single subject centered and staring at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges',
      soft: 'comic caricature portrait framed like a wanted poster, playful exaggerated features, single subject centered and looking at the viewer, eyes in the upper half of the frame, dark vignette fading to near black at the edges, funny rather than scary',
      params: { ar: '4:3', sw: 250, s: 300, chaos: 8 },
      no: 'text, letters, words, logo, watermark, frame, border, poster lettering',
      noSoft: 'text, letters, words, logo, watermark, frame, border, poster lettering, blood, gore, weapons, real person',
    },
    armi: {
      shot: 'single game inventory item, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background',
      soft: 'single game inventory item, an everyday object turned into a playful prank weapon, three-quarter view laid diagonally from lower left to upper right, centered with generous empty margin, crisp clean silhouette with a thin dark outline, isolated on a plain flat light grey background',
      params: { ar: '1:1', sw: 120, s: 150, chaos: 0 },
      no: 'text, letters, logo, watermark, hands, person, scenery, background objects, cast shadow, frame, border',
    },
  },

  arenas: {
    classico: {
      look: 'Bosco selvaggio al tramonto: ambra, ocra e marroni caldi, ombre blu fredde, luce radente arancione. Tono da sopravvivenza, avventuroso più che splatter.',
      style: 'warm amber, ochre and brown sunset palette with cool blue shadows, wild forest survival arena',
      luoghi: {
        cornucopia: ['La Cornucopia dorata su un poggio roccioso al centro di una radura, che trabocca di armi, zaini e casse.', 'a giant golden horn-shaped cornucopia resting on a rocky mound in a forest clearing, spilling weapons, backpacks and supply crates onto the grass'],
        bosco: ['Bosco fitto e antico all\'imbrunire, lame di luce tra i tronchi e un sentiero nascosto.', 'a dense ancient pine forest at dusk, shafts of golden light between tall trunks, ferns and a narrow hidden trail'],
        fiume: ['Fiume tortuoso tra massi coperti di muschio, piccole rapide e un tronco caduto che fa da ponte.', 'a winding river between mossy boulders, shallow rapids reflecting the orange sky, a fallen log used as a bridge'],
        paludi: ['Palude scura con canne, alberi morti contorti e nebbia bassa sull\'acqua.', 'a murky marsh with tall reeds, twisted dead trees and low mist over black water, a few fireflies'],
        rovine: ['Rovine di un antico tempio in pietra invase dai rampicanti, colonne spezzate e un arco crollato.', 'crumbling stone ruins of an ancient temple overgrown with vines, broken columns and a collapsed archway'],
        altopiano: ['Altopiano roccioso spazzato dal vento, erba brinata e montagne lontane: il posto più freddo dell\'arena.', 'a windswept rocky highland plateau with sparse frosted grass and distant mountains, cold blue shadows under a warm sky'],
      },
      pericoli: {
        'branco-di-lupi-mutanti': ['Branco di lupi mutanti con occhi ambra e chiazze di pelo metallico, che escono ringhiando dagli alberi.', 'a pack of three mutated wolves with glowing amber eyes and patches of metallic fur, snarling as they step out of shadowy trees'],
        'sciame-di-vespe-velenose': ['Sciame di vespe giganti e velenose; una in primo piano, nitida, con il pungiglione in vista.', 'a menacing swarm of oversized venomous wasps with glowing yellow stripes, one wasp in sharp focus in the foreground with its stinger visible'],
        'orso-affamato': ['Enorme orso bruno affamato, ritto sulle zampe posteriori, muso segnato da cicatrici.', 'a huge starving brown bear rearing up on its hind legs, scarred muzzle, ribs showing, hungry eyes'],
        'serpente-gigante': ['Serpente gigante dalle squame smeraldo, avvolto su sé stesso con la testa alzata.', 'a giant coiled serpent with emerald scales raising its head, forked tongue out, eyes catching the sunset light'],
      },
      armi: {
        coltello: ['Coltello da sopravvivenza con manico in cuoio.', 'a sturdy survival knife with a leather-wrapped handle and a clip-point steel blade'],
        arco: ['Arco ricurvo in legno con una freccia incoccata.', 'a wooden recurve bow with a taut string and one arrow nocked'],
        lancia: ['Lancia da caccia con asta di frassino e punta a foglia.', 'a hunting spear with an ash-wood shaft and a leaf-shaped steel tip bound with cord'],
        ascia: ['Ascia da boscaiolo con manico consumato.', 'a woodcutter\'s axe with a worn wooden handle and a chipped steel head'],
        machete: ['Machete lungo, lama leggermente curva.', 'a long machete with a slightly curved blade and a black rubber grip'],
        tridente: ['Tridente da pesca con asta di legno.', 'a three-pronged fishing trident with a wooden shaft and rope binding'],
        fionda: ['Fionda di legno a forcella con tasca di cuoio.', 'a forked wooden slingshot with rubber bands and a small leather pouch holding a pebble'],
        'spada-corta': ['Spada corta tipo gladio, guardia semplice.', 'a short gladius-style sword with a simple crossguard and wrapped grip'],
        pugnale: ['Pugnale sottile a doppio taglio.', 'a slim double-edged dagger with a cord-wrapped hilt'],
        mazza: ['Clava di legno pesante con borchie di ferro.', 'a heavy wooden war club studded with iron rivets'],
      },
    },

    fantasy: {
      look: 'Fiaba oscura di notte: viola, magenta e blu notte, bagliori magici turchesi e dorati, rune luminose. Meraviglia e minaccia insieme.',
      style: 'violet, magenta and midnight blue palette with glowing turquoise and gold magic, dark fairy-tale kingdom',
      luoghi: {
        'torre-in-rovina': ['Torre di uno stregone in pietra scura, mezza crollata, con rune accese sui muri, al chiaro di luna.', 'a ruined wizard\'s tower of dark stone, half collapsed, glowing violet runes on its walls, under a huge moon'],
        'foresta-elfica': ['Foresta elfica di alberi giganti dalla corteccia argentata, lanterne appese e lucine sospese.', 'an elven forest of giant silver-barked trees, hanging lanterns and floating motes of light'],
        'lago-nebbioso': ['Lago incantato di notte, acqua a specchio, pontile di pietra e una statua mezza sommersa.', 'a misty enchanted lake at night, glassy water, a small stone pier and a half-sunken statue'],
        miniere: ['Miniere naniche scavate nella montagna, impalcature, binari con carrello e vene di cristallo luminose.', 'dwarven mines carved into a mountain, wooden scaffolding, minecart rails and glowing crystal veins in the rock'],
        'palude-stregata': ['Palude stregata con alberi storti, muschio pendente, una capanna su palafitte e fuochi fatui verdi.', 'a haunted swamp with crooked trees, hanging moss, a witch\'s hut on stilts and green will-o\'-wisps'],
        'picco-del-drago': ['Picco frastagliato con la tana del drago: rocce bruciate, mucchi d\'oro e fumo che sale.', 'a jagged mountain peak with a dragon\'s lair, scorched rocks, heaps of gold coins and smoke rising into the night'],
      },
      pericoli: {
        'troll-di-caverna': ['Troll di caverna enorme, pelle grigia bitorzoluta, clava di pietra, occhi piccoli e luminosi.', 'a hulking cave troll with grey warty skin and a stone club, small glowing eyes, stooping in a cave mouth'],
        viverna: ['Viverna con ali membranose spalancate e coda uncinata, appollaiata su una rupe mentre ruggisce.', 'a wyvern with leathery wings spread wide and a barbed tail, perched on a cliff edge, roaring'],
        'spettro-errante': ['Spettro traslucido in vesti a brandelli, bagliore azzurro, occhi vuoti, nella nebbia.', 'a wandering translucent wraith in tattered robes, faint blue glow, hollow eyes, drifting through mist'],
        'branco-di-lupi-mannari': ['Branco di lupi mannari sotto la luna piena, il capobranco in primo piano.', 'a pack of werewolves under the full moon, the alpha in front with bristling fur and bared fangs'],
      },
      armi: {
        'spada-runica': ['Spada lunga con rune viola luminose sulla lama.', 'a longsword with glowing violet runes running along the blade'],
        'bastone-magico': ['Bastone da mago nodoso con un cristallo luminoso sospeso in cima.', 'a gnarled wizard staff topped with a floating glowing crystal'],
        'arco-elfico': ['Arco lungo elfico in legno chiaro con intarsi d\'argento a foglia.', 'an elegant elven longbow of pale wood with leaf-shaped silver inlays'],
        'ascia-nanica': ['Ascia nanica a doppia lama con incisioni a intreccio.', 'a heavy double-bladed dwarven axe with engraved knotwork and a leather grip'],
        'pugnale-avvelenato': ['Pugnale ricurvo che gocciola veleno verde.', 'a curved dagger dripping bright green poison'],
        'martello-da-guerra': ['Martello da guerra massiccio con testa in ferro incisa di rune.', 'a massive war hammer with a rune-carved iron head'],
        balestra: ['Balestra fantasy in legno scuro e ottone.', 'a fantasy crossbow of dark wood with brass fittings and a loaded bolt'],
        'lancia-incantata': ['Lancia sottile con la punta avvolta da una luce pallida.', 'a slender spear with an enchanted blade wreathed in pale light'],
      },
    },

    scifi: {
      look: 'Stazione orbitale: blu, ciano e acciaio spazzolato, neon freddi, spie rosse di allarme, la Terra o le stelle dai finestrini.',
      style: 'cold blue and cyan neon on brushed steel with red warning lights, orbital space station',
      luoghi: {
        hangar: ['Hangar enorme con una navetta attraccata, container e il portellone aperto sulle stelle.', 'a vast spaceship hangar with a docked shuttle, cargo containers and an open bay door showing the stars'],
        'serra-idroponica': ['Modulo serra idroponica: file di piante sotto luci viola, tubi d\'acqua e una cupola di vetro.', 'a hydroponic greenhouse module, rows of plants under purple grow lights, water pipes and a glass dome'],
        reattore: ['Il nucleo del reattore: una sfera ciano incandescente dentro un anello d\'acciaio, passerelle e luci d\'allarme.', 'the station\'s reactor core, a glowing cyan sphere inside a steel ring, catwalks and warning lights'],
        'ponte-di-comando': ['Ponte di comando con console olografiche curve e una vetrata enorme sulla Terra.', 'the command bridge with curved holographic consoles and a huge window looking down on Earth'],
        'moduli-abitativi': ['Moduli dell\'equipaggio stretti: cuccette, armadietti e un piccolo oblò rotondo.', 'cramped crew living modules with bunks, personal lockers and a small round porthole'],
        'condotti-di-servizio': ['Condotti di servizio angusti con cavi, sfiati di vapore e luci d\'emergenza tremolanti.', 'narrow service ducts packed with cables, steam vents and flickering red emergency lights'],
      },
      pericoli: {
        'drone-di-sicurezza-impazzito': ['Drone di sicurezza fuori controllo con un solo occhio rosso e rotori danneggiati che sprizzano scintille.', 'a rogue security drone with a single red eye and damaged rotors throwing sparks'],
        'sciame-di-nanobot': ['Sciame argentato di nanobot che si avvita formando una sagoma minacciosa.', 'a swirling silver swarm of nanobots forming a menacing face-like shape'],
        'creatura-aliena-dai-tentacoli': ['Creatura aliena con tentacoli lucidi e macchie bioluminescenti che esce da una grata.', 'an alien creature with glossy tentacles and bioluminescent spots squeezing out of a vent grate'],
        'androide-da-combattimento': ['Androide da combattimento corazzato, visore acceso, pelle sintetica strappata.', 'a battle android with an armoured chassis, glowing visor and torn synthetic skin'],
      },
      armi: {
        'fucile-al-plasma': ['Fucile al plasma affusolato con celle d\'energia ciano.', 'a sleek plasma rifle with glowing cyan energy cells'],
        'lama-vibrante': ['Lama vibrante con il filo traslucido che ronza.', 'a vibro-blade with a humming translucent edge and a ribbed grip'],
        'pistola-laser': ['Pistola laser compatta con emettitore rosso.', 'a compact laser pistol with a red emitter tip'],
        'granata-emp': ['Granata EMP sferica con archi elettrici blu.', 'a spherical EMP grenade with crackling blue electric arcs'],
        'frusta-monofilamento': ['Frusta a monofilamento: impugnatura metallica e un filo luminoso quasi invisibile.', 'a monofilament whip, a metal handle with a nearly invisible glowing line coiled around it'],
        'taser-a-impulsi': ['Taser a impulsi con elettrodi che crepitano.', 'a pulse taser with crackling electrodes'],
        'cannone-a-rotaia-portatile': ['Cannone a rotaia portatile con binari magnetici e calcio pesante.', 'a portable railgun with twin magnetic rails and a heavy stock'],
      },
    },

    zombie: {
      look: 'Città abbandonata dopo il contagio: verdi malati, grigi, ruggine, cielo coperto, luci tremolanti. Inquietante più che splatter.',
      style: 'sickly green, grey and rust palette under an overcast sky, abandoned post-outbreak city',
      luoghi: {
        ospedale: ['Corridoio d\'ospedale abbandonato con barelle rovesciate, luci tremolanti e porte barricate.', 'an abandoned hospital corridor with overturned gurneys, flickering lights and barricaded doors'],
        'centro-commerciale': ['Atrio di un centro commerciale saccheggiato, scale mobili rotte, carrelli sparsi, lucernari.', 'a looted shopping mall atrium with broken escalators, scattered trolleys and dusty skylights'],
        metropolitana: ['Banchina della metro al buio, un treno deragliato, binari allagati e lampade d\'emergenza.', 'a dark subway platform with a derailed train, flooded tracks and emergency lamps'],
        scuola: ['Corridoio di scuola vuoto, armadietti, fogli a terra e finestre sbarrate con assi.', 'an empty school hallway with lockers, papers on the floor and windows boarded up with planks'],
        'stazione-di-polizia': ['Stazione di polizia fortificata con sacchi di sabbia, un furgone blindato e fari.', 'a fortified police station with sandbags, an armoured van and searchlights'],
        periferia: ['Strada di periferia con auto abbandonate, prati incolti e fumo all\'orizzonte.', 'a suburban street with abandoned cars, overgrown lawns and smoke on the horizon'],
      },
      pericoli: {
        'orda-di-zombi': ['Orda fitta di zombi che riempie una strada, tante mani protese in avanti.', 'a dense horde of shambling zombies filling a city street, many hands reaching forward'],
        'infetto-corridore': ['Infetto corridore colto a metà scatto, vestiti strappati, occhi folli.', 'a fast infected runner caught mid-sprint, torn clothes, wild eyes, motion frozen'],
        'cane-infetto': ['Cane infetto con pelo a chiazze, denti scoperti e occhi lattiginosi.', 'an infected dog with patchy fur, bared teeth and milky eyes'],
        'gigante-mutato': ['Gigante mutato con muscoli gonfi e escrescenze ossee che sfonda un muro.', 'a towering mutated giant with swollen muscles and bone growths, smashing through a brick wall'],
      },
      armi: {
        'mazza-chiodata': ['Mazza da baseball avvolta nel filo spinato e nei chiodi.', 'a baseball bat wrapped in barbed wire and studded with nails'],
        'fucile-a-pompa': ['Fucile a pompa con il calcio rattoppato col nastro.', 'a pump-action shotgun with a duct-taped stock'],
        'piede-di-porco': ['Piede di porco in acciaio rosso.', 'a red steel crowbar, scuffed paint'],
        motosega: ['Motosega con il corpo arancione graffiato.', 'a chainsaw with a scratched orange body'],
        katana: ['Katana con l\'impugnatura consumata.', 'a katana with a worn wrapped handle'],
        balestra: ['Balestra moderna da caccia con mirino.', 'a modern hunting crossbow with a scope'],
        pistola: ['Pistola semiautomatica malridotta.', 'a battered semi-automatic pistol'],
        accetta: ['Accetta con impugnatura in gomma.', 'a hatchet with a rubber grip'],
      },
    },

    royale: {
      look: 'Isola tropicale da battle royale videoludico: blu mare, verde giungla, arancio di tramonto, contrasti puliti, un po\' «da videogioco».',
      style: 'tropical island palette of deep sea blue, jungle green and orange sunset, clean stylised battle-royale video game look',
      luoghi: {
        aeroporto: ['Piccolo aeroporto dell\'isola con pista, un cargo arrugginito e la torre di controllo.', 'a small island airport with a runway, a rusty cargo plane and a control tower'],
        'base-militare': ['Base militare con tende, torrette di guardia, casse di rifornimento ed eliporto.', 'a military base with tents, watchtowers, supply crates and a helipad'],
        'villaggio-costiero': ['Villaggio di pescatori con case colorate, pontile di legno e barche.', 'a coastal fishing village with colourful houses, a wooden pier and boats'],
        'centrale-elettrica': ['Centrale elettrica con torri di raffreddamento, tralicci e trasformatori.', 'a power plant with cooling towers, pylons and humming transformers'],
        fattoria: ['Fattoria con fienile rosso, balle di fieno, silos e campi di grano.', 'a farm with a red barn, hay bales, a silo and golden wheat fields'],
        foresta: ['Foresta tropicale rigogliosa con palme, felci e una cassa di rifornimento nascosta.', 'a lush tropical forest with palm trees, ferns and a hidden glowing supply crate'],
      },
      pericoli: {
        'drone-armato': ['Drone quadricottero armato con mitragliatrice e laser di puntamento rosso.', 'an armed quadcopter drone with a mounted gun and a red targeting laser'],
        'elicottero-da-caccia': ['Elicottero d\'attacco in volo basso con il faro acceso.', 'an attack helicopter hovering low with its searchlight on'],
        'cane-da-guardia-addestrato': ['Pastore tedesco da guardia con giubbotto tattico, che abbaia.', 'a trained German shepherd guard dog in a tactical vest, barking'],
      },
      armi: {
        'fucile-dassalto': ['Fucile d\'assalto con mirino a punto rosso.', 'an assault rifle with a red-dot sight'],
        pistola: ['Pistola semiautomatica nera.', 'a black semi-automatic pistol'],
        'fucile-da-cecchino': ['Fucile da cecchino con cannocchiale lungo e bipiede.', 'a sniper rifle with a long scope and a folded bipod'],
        'fucile-a-pompa': ['Fucile a pompa tattico.', 'a tactical pump shotgun'],
        granata: ['Granata a frammentazione con la spoletta.', 'a fragmentation grenade with its pin'],
        mitraglietta: ['Mitraglietta compatta.', 'a compact submachine gun'],
        'coltello-da-combattimento': ['Coltello da combattimento con dorso seghettato.', 'a combat knife with a serrated spine'],
        balestra: ['Balestra tattica mimetica.', 'a tactical crossbow with a camouflage pattern'],
      },
    },

    horror: {
      look: 'Villa gotica maledetta: cremisi, nero e oro di candela, nebbia, luna rossa. Paura sottile e atmosfera, niente sangue esplicito.',
      style: 'crimson, black and candlelight gold palette, eerie mist, gothic haunted mansion',
      luoghi: {
        cantina: ['Cantina umida con botti piene di ragnatele, una lampadina che oscilla e una porta socchiusa.', 'a damp wine cellar with cobwebbed barrels, a single swinging light bulb and a door left ajar'],
        soffitta: ['Soffitta polverosa con mobili coperti da teli, un vecchio cavallo a dondolo e luna da un oblò.', 'a dusty attic with sheet-covered furniture, an old rocking horse and moonlight through a round window'],
        cappella: ['Cappella gotica privata con candele, vetrate rotte e panche vuote.', 'a private gothic chapel with candles, broken stained glass and empty pews'],
        cimitero: ['Cimitero incolto con lapidi storte, cancello di ferro e nebbia sotto una luna rossa.', 'an overgrown cemetery with leaning tombstones, an iron gate and fog under a red moon'],
        biblioteca: ['Biblioteca antica con scaffali altissimi, polvere sospesa e un libro aperto sul leggio.', 'a grand old library with towering shelves, floating dust and a book lying open on a lectern'],
        serra: ['Serra vittoriana in rovina con vetri rotti, piante carnivore e rampicanti.', 'a derelict Victorian greenhouse with shattered glass, carnivorous plants and creeping vines'],
      },
      pericoli: {
        'spettro-urlante': ['Fantasma che urla con la bocca innaturalmente allungata e capelli pallidi fluttuanti.', 'a screaming ghost with an unnaturally stretched mouth and pale floating hair, glowing white'],
        'bambola-posseduta': ['Bambola di porcellana col viso incrinato e un occhio di vetro, seduta su una sedia, troppo viva.', 'a porcelain doll with a cracked face and one glass eye, sitting in a chair, slightly too alive'],
        'entita-senza-volto': ['Entità alta e senza volto in un corridoio buio, braccia troppo lunghe.', 'a tall faceless entity in a dark corridor, unnaturally long arms, black suit'],
        'stormo-di-corvi': ['Stormo di corvi che esplode da un albero morto; uno fissa chi guarda.', 'a flock of crows bursting from a dead tree, one crow staring straight at the viewer'],
      },
      armi: {
        'candelabro-dargento': ['Candelabro d\'argento pesante con tre candele che colano.', 'a heavy silver candelabra with three dripping candles'],
        ascia: ['Vecchia ascia arrugginita.', 'an old rusted axe with a cracked wooden handle'],
        'fucile-da-caccia': ['Doppietta da caccia con calcio in legno.', 'a double-barrelled hunting shotgun with a wooden stock'],
        'pugnale-rituale': ['Pugnale rituale con elsa d\'osso e simboli incisi.', 'a ritual dagger with a bone hilt and engraved occult symbols'],
        'crocifisso-appuntito': ['Crocifisso di legno appuntito come un paletto.', 'a wooden crucifix sharpened into a stake at the bottom'],
        attizzatoio: ['Attizzatoio da camino in ferro battuto.', 'a wrought iron fireplace poker with a hooked tip'],
        falce: ['Falce da contadino con la lama lunga e curva.', 'a farmer\'s scythe with a long curved blade'],
      },
    },

    wasteland: {
      look: 'Deserto post-atomico: ocra, ruggine e sabbia sotto un sole bruciato, foschia di polvere, lamiere e motori truccati.',
      style: 'ochre, rust and sand palette under a scorched hazy sun, dusty post-apocalyptic desert wasteland',
      luoghi: {
        discarica: ['Enorme sfasciacarrozze di auto arrugginite, pneumatici e rottami sotto un sole velato.', 'a vast scrapyard of rusted cars, tyres and piled junk under a hazy sun'],
        'autostrada-spezzata': ['Cavalcavia autostradale crollato nel deserto, camion abbandonati.', 'a broken highway overpass collapsed into the desert, abandoned trucks below'],
        raffineria: ['Raffineria arrugginita con torce di gas accese e intrico di tubi.', 'a rusted oil refinery with burning flare stacks and a tangle of pipes'],
        'citta-fantasma': ['Città fantasma con edifici mezzi sepolti, cartelloni sbiaditi e rotolacampo.', 'a ghost town with half-buried buildings, faded blank billboards and tumbleweeds'],
        cratere: ['Cratere radioattivo enorme con pozze che brillano di verde.', 'a huge radioactive crater with glowing green pools'],
        diga: ['Diga di cemento gigante incrinata, con un insediamento di fortuna in cima.', 'a giant cracked concrete dam with a makeshift settlement built on top'],
      },
      pericoli: {
        'banda-di-predoni': ['Banda di predoni con armature di cuoio chiodato e occhialoni, accanto a buggy truccati.', 'a gang of raiders in spiked leather armour and goggles standing by modified buggies'],
        'scorpione-gigante': ['Scorpione gigante del deserto col pungiglione alzato.', 'a giant desert scorpion with its stinger raised, chitin shining in the sun'],
        'branco-di-cani-mutati': ['Branco di cani mutati senza pelo, con occhi in più, che ringhiano.', 'a pack of hairless mutated dogs with extra eyes, growling'],
        'verme-delle-sabbie': ['Verme delle sabbie colossale che erompe dalle dune, bocca circolare piena di denti.', 'a colossal sandworm bursting out of the dunes, a circular mouth full of teeth'],
      },
      armi: {
        'fucile-arrugginito': ['Fucile a otturatore arrugginito con mirino legato col nastro.', 'a rusty bolt-action rifle with a scope held on by tape'],
        'lancia-ricavata-da-un-tubo': ['Lancia fatta con un tubo di metallo e un tondino appuntito.', 'a spear made from a metal pipe with a sharpened rebar tip'],
        'balestra-artigianale': ['Balestra artigianale fatta con balestre d\'auto e rottami.', 'a homemade crossbow built from car leaf springs and scrap metal'],
        molotov: ['Bottiglia molotov con lo straccio in fiamme.', 'a molotov cocktail bottle with a burning rag'],
        catena: ['Catena pesante arrotolata con un lucchetto.', 'a heavy coiled chain with a padlock'],
        mannaia: ['Mannaia grande con manico fasciato.', 'a large meat cleaver with a cloth-wrapped handle'],
        lanciachiodi: ['Sparachiodi modificato come arma, con caricatore a tamburo.', 'a nail gun modified into a weapon with a drum magazine'],
      },
    },

    liceo: {
      look: 'Liceo italiano in chiave satirica: rosa, lilla e pastello, luce di finestre a vetri, tono da commedia. Nessuna violenza, nessun sangue: le «minacce» sono caricature.',
      style: 'pink, lilac and pastel palette, bright window light, playful satirical comedy mood, Italian high school, non-violent',
      luoghi: {
        palestra: ['Palestra della scuola con parquet, canestri, funi e tappetini impilati.', 'a school gym with a wooden floor, basketball hoops, climbing ropes and stacked mats'],
        mensa: ['Mensa scolastica rumorosa con tavoli lunghi, vassoi e il bancone del pranzo.', 'an empty school cafeteria after lunch, long tables, abandoned food trays and a steaming lunch counter'],
        biblioteca: ['Biblioteca scolastica silenziosa con scaffali e tavoli da studio.', 'a quiet school library with bookshelves, study tables and green desk lamps'],
        'laboratorio-di-chimica': ['Laboratorio di chimica con becher, cappa aspirante e fiasche colorate che bollono.', 'a chemistry lab with beakers, a fume hood and colourful bubbling flasks'],
        cortile: ['Cortile della scuola con panchine, un albero, motorini e zaini a terra.', 'the school courtyard with benches, a big tree, parked scooters and backpacks on the ground'],
        'aula-magna': ['Aula magna con file di poltroncine, palco e microfono.', 'an assembly hall with rows of folding seats, a stage and a single microphone'],
      },
      pericoli: {
        preside: ['Caricatura della Preside severa, braccia conserte, occhiali abbassati, sulla soglia.', 'a caricature of a stern school principal, arms crossed, glasses lowered, standing in a doorway'],
        'bidello-di-turno': ['Caricatura del bidello brontolone con mocio, secchio e mazzo di chiavi.', 'a caricature of a grumpy school janitor with a mop, a bucket and a ring of keys'],
        'ispezione-a-sorpresa': ['L\'ispezione a sorpresa personificata: un ispettore con cartellina e lente che spunta da una porta.', 'a caricature of a school inspector with a clipboard and a magnifying glass peeking through a door'],
        'professoressa-di-matematica': ['Caricatura della prof di matematica con la penna rossa, lavagna con formule illeggibili alle spalle.', 'a caricature of a strict math teacher holding a red pen, a blackboard with blurred unreadable formulas behind her'],
      },
      armi: {
        'gossip-esplosivo': ['Smartphone con un fumetto di chat che esplode come un fuoco d\'artificio.', 'a smartphone with a glowing chat bubble bursting out of it like a firework'],
        'foto-imbarazzante': ['Polaroid con un\'immagine imbarazzante sfocata e un bagliore rosa.', 'a polaroid photo showing a blurred embarrassing picture, with a pink glow'],
        'compito-copiato': ['Compito in classe con un bigliettino nascosto che spunta.', 'a folded test paper with a tiny rolled cheat sheet sticking out, scribbled lines instead of writing'],
        'pallone-da-dodgeball': ['Pallone rosso da dodgeball con scie di movimento.', 'a red rubber dodgeball with motion streaks'],
        'registro-rubato': ['Registro di classe spesso con il segnalibro a nastro.', 'a thick class register book with a ribbon bookmark, plain cover'],
        'profilo-falso': ['Smartphone con un profilo social finto e l\'icona di una maschera.', 'a smartphone showing a fake social profile with a disguise mask icon'],
      },
    },

    ufficio: {
      look: 'Open space aziendale in chiave satirica: verde petrolio, grigi, neon freddi, luce da monitor. Tono da commedia d\'ufficio, nessuna violenza.',
      style: 'teal green and grey palette with cold neon office light and monitor glow, satirical corporate comedy mood, non-violent',
      luoghi: {
        'sala-riunioni': ['Sala riunioni con tavolo di vetro lungo, sedie vuote, schermo del proiettore e lavagna.', 'a meeting room with a long glass table, empty chairs, a projector screen and a whiteboard with blurred scribbles'],
        'open-space': ['Open space sterminato con file di scrivanie, monitor e piante in vaso.', 'a sprawling open-space office with rows of desks, monitors and potted plants'],
        cucina: ['Angolo cucina con macchinetta del caffè, tazze, microonde e frigo pieno di bigliettini.', 'the office kitchenette with a coffee machine, mugs, a microwave and a fridge covered in sticky notes'],
        'ufficio-del-direttore': ['Ufficio d\'angolo del Direttore con poltrona di pelle, vetrata panoramica e premi sugli scaffali.', 'the director\'s corner office with a big leather chair, a panoramic window and trophies on shelves'],
        'sala-stampanti': ['Stanzino delle stampanti con una fotocopiatrice inceppata che sputa fogli.', 'a cramped printer room with a jammed copier spitting out paper'],
        parcheggio: ['Parcheggio aziendale sotterraneo con posti riservati e neon.', 'an underground company car park with reserved spaces and fluorescent lights'],
      },
      pericoli: {
        'direttore-generale': ['Caricatura dell\'amministratore delegato in completo impeccabile, controluce davanti a una vetrata.', 'a caricature of a CEO in a sharp suit, silhouetted against a tall window, power pose'],
        'ufficio-risorse-umane': ['Caricatura di una persona delle Risorse umane con un sorriso di circostanza e una pila di cartelline.', 'a caricature of an HR officer with a polite fake smile holding a stack of folders'],
        'consulente-esterno': ['Caricatura del consulente esterno con capelli impomatati, portatile e un grafico a torta olografico.', 'a caricature of a slick external consultant with gelled hair, a laptop and a holographic pie chart'],
        'riorganizzazione-aziendale': ['La riorganizzazione personificata: un mostro di caselle e frecce di organigramma aggrovigliate.', 'a corporate reorganization personified as a tangled monster made of org-chart boxes and arrows'],
      },
      armi: {
        'mail-in-copia-a-tutti': ['Busta di una mail che si moltiplica in tante copie luminose.', 'an email envelope multiplying into many glowing copies'],
        'report-pieno-di-errori-altrui': ['Report stampato coperto di segni rossi e post-it.', 'a printed report covered in red correction marks and colourful sticky notes, abstract scribbled lines'],
        'presentazione-rubata': ['Chiavetta USB con una slide proiettata e una mascherina da ladro.', 'a USB stick projecting a slide, wearing a tiny burglar mask'],
        'badge-clonato-del-capo': ['Badge col cordino e una sua copia identica luminosa.', 'an ID badge on a lanyard with a glowing duplicate copy beside it, blank photo area'],
        'foglio-excel-con-le-prove': ['Stampa di un foglio di calcolo con celle evidenziate e una lente.', 'a spreadsheet printout with bright highlighted cells under a magnifying glass, abstract grid marks'],
        'nota-spese-gonfiata': ['Uno scontrino che si gonfia come un palloncino.', 'a paper receipt inflating like a balloon'],
      },
    },
  },
};
