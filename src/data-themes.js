/* Last One Standing — scenari. Ogni tema fornisce lessico, testi di fase,
 * eventi speciali (extra) e disastri. I temi "soft" non usano gli eventi
 * di base ma un proprio repertorio completo (pool). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});

  D.themes = [
    /* ------------------------------------------------------------ */
    {
      id: 'classico', name: 'Arena Classica', tag: 'Boschi, fiumi e una Cornucopia piena di armi.',
      hue: 38, glyph: '⟁',
      phase: { b: 'Il bagno di sangue', d: 'Giorno', n: 'Notte', f: 'Il festino' },
      intro: { b: 'Il gong risuona: i concorrenti si lanciano verso la Cornucopia.', d: 'Il sole sorge sull\'arena.', n: 'Cala il buio e il freddo morde.', f: 'Gli organizzatori annunciano un festino alla Cornucopia: ogni zaino contiene ciò di cui un concorrente ha più bisogno.', finale: 'Gli organizzatori prosciugano il Fiume e incendiano il Bosco: tutti i superstiti vengono spinti verso la Cornucopia.' },
      fallen: ['Nessun colpo di cannone risuona oggi.', 'Un colpo di cannone risuona nell\'arena.', '{n} colpi di cannone risuonano nell\'arena.'],
      lex: {
        arma: ['un coltello', 'un arco', 'una lancia', 'un\'ascia', 'un machete', 'un tridente', 'una fionda', 'una spada corta', 'un pugnale', 'una mazza'],
        cibo: ['delle bacche', 'un coniglio', 'del pesce essiccato', 'delle gallette', 'delle radici commestibili', 'una pagnotta'],
        luogo: ['la Cornucopia', 'il Bosco', 'il Fiume', 'le Paludi', 'le Rovine', 'l\'Altopiano'],
        mostro: ['un branco di lupi mutanti', 'uno sciame di vespe velenose', 'un orso affamato', 'un serpente gigante'],
        trappola: ['una mina nascosta', 'una trappola a scatto', 'un fosso pieno di spuntoni'],
        rifugio: ['una grotta', 'un albero cavo', 'un anfratto tra le rocce'],
        dono: ['un paracadute degli sponsor'],
      },
      extra: {
        b: `
1 | {A} resta immobile sulla piattaforma fino al gong, poi corre nel Bosco.
1 d:A *0.5 | {A} scende dalla piattaforma prima del gong e salta in aria.
2 k:A>B | {A} raggiunge per prim[A:o/a] la Cornucopia e colpisce {B} con il primo arco che trova.
`,
        d: `
1 +arma:A | {A} recupera {arma} da un concorrente caduto.
1 @soc | {A} sorride alle telecamere sperando di conquistare nuovi sponsor.
1 +med:A @soc | Gli sponsor apprezzano {A}: arriva {dono} con una medicina.
2 al:AB @soc | {A} e {B} inscenano una storia d'amore per le telecamere.
2 k:A>B @int | {A} fa cadere un nido di vespe velenose su {B}.
1 +cibo:A @int | {A} pesca a mani nude nel Fiume.
`,
        n: `
1 | {A} guarda i volti dei caduti proiettati nel cielo.
1 | {A} ascolta l'inno dell'arena e stringe i denti.
`,
      },
      disasters: [
        { n: 'Incendio nel Bosco', intro: 'Un muro di fiamme avanza dal Bosco: gli organizzatori vogliono spingere tutti verso il centro.', out: `
1 d:A | {A} resta intrappolat[A:o/a] tra le fiamme.
1 s:A=ferito | {A} riesce a fuggire, ma con gravi ustioni.
1 | {A} si getta nel Fiume e si salva.
2 k:A>B | {A} usa {B} come scudo contro le fiamme.
` },
        { n: 'Nebbia velenosa', intro: 'Una nebbia lattiginosa scende dall\'Altopiano e brucia la pelle al primo contatto.', out: `
1 d:A | {A} non riesce a sfuggire alla nebbia.
1 s:A=avvelenato | {A} respira la nebbia e comincia a tossire sangue.
1 | {A} trattiene il respiro e corre fino all'aria pulita.
` },
        { n: 'Ibridi scatenati', intro: 'Dalle Rovine escono decine di ibridi: bestie create in laboratorio, affamate.', out: `
1 d:A | {A} viene sbranat[A:o/a] dagli ibridi.
1 s:A=ferito | {A} viene mors[A:o/a], ma riesce ad arrampicarsi su un albero.
2 d:B | {A} si salva mentre gli ibridi si accaniscono su {B}.
` },
        { n: 'La piena', intro: 'Le chiuse a monte vengono aperte: il Fiume esonda e trascina via tutto.', out: `
1 d:A | {A} viene travolt[A:o/a] dalla piena.
1 w:A -arma:A | {A} si salva, ma la corrente porta via {arma:A}.
1 | {A} si aggrappa a un tronco e resiste.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'fantasy', name: 'Reame Incantato', tag: 'Draghi, rune e foreste che sussurrano.',
      hue: 275, glyph: '✶',
      phase: { b: 'La battaglia dell\'Altare', d: 'Giorno', n: 'Notte', f: 'Il banchetto incantato' },
      intro: { b: 'I campioni corrono verso l\'Altare delle armi.', d: 'L\'alba tinge di viola le guglie della Torre.', n: 'Le lune gemelle si alzano sul reame.', f: 'Un banchetto incantato appare nella radura: chi avrà il coraggio di sedersi a tavola?', finale: 'Il drago si risveglia e incendia il reame: i superstiti vengono spinti fino all\'Altare.' },
      fallen: ['Le campane del reame tacciono stanotte.', 'Una campana rintocca: un\'anima ha lasciato il reame.', 'Le campane rintoccano {n} volte nella valle.'],
      lex: {
        arma: ['una spada runica', 'un bastone magico', 'un arco elfico', 'un\'ascia nanica', 'un pugnale avvelenato', 'un martello da guerra', 'una balestra', 'una lancia incantata'],
        cibo: ['del pane elfico', 'una fiaschetta di idromele', 'dei funghi luminosi', 'delle mele dorate', 'una forma di formaggio'],
        luogo: ['la Torre in rovina', 'la Foresta elfica', 'il Lago nebbioso', 'le Miniere', 'la Palude stregata', 'il Picco del drago'],
        mostro: ['un troll di caverna', 'una viverna', 'uno spettro errante', 'un branco di lupi mannari'],
        trappola: ['una runa esplosiva', 'un incantesimo di fuoco', 'una pianta carnivora'],
        rifugio: ['una torre abbandonata', 'la tana di un tasso gigante', 'un cerchio di funghi protettivo'],
        dono: ['un dono portato da un corvo messaggero'],
      },
      extra: {
        b: `
1 +arma:A @int | {A} pronuncia una parola antica e {arma} [A:gli/le] vola in mano.
2 k:A>B | {A} scaglia un incantesimo contro {B}, che si dissolve in cenere.
`,
        d: `
1 +med:A @int | {A} distilla una pozione curativa da erbe di palude.
1 s:A=malato | {A} beve dal Lago nebbioso e viene colpit[A:o/a] da una maledizione.
1 need:A=malato cure:A @int *2 | {A} spezza la maledizione con un rito improvvisato.
2 al:AB @soc | {A} e {B} giurano fedeltà su una spada spezzata.
2 k:A>B @mad | {A} evoca uno spirito che si rivolta contro {B}.
1 d:A | {A} prova a domare una viverna e ne diventa la cena.
1 @luck | {A} trova un anello che rende invisibili per qualche minuto.
`,
        n: `
1 | {A} sogna una profezia che parla della propria morte.
2 ally:AB | {A} e {B} tracciano un cerchio di protezione attorno al campo.
1 d:A *0.6 | {A} segue un fuoco fatuo nella Palude stregata e non torna più.
`,
      },
      disasters: [
        { n: 'Il risveglio del drago', intro: 'Un ruggito scuote il Picco: il drago si è svegliato ed è affamato.', out: `
1 d:A | {A} viene incenerit[A:o/a] dal soffio del drago.
1 s:A=ferito | {A} sfugge agli artigli del drago, ma resta ferit[A:o/a].
1 | {A} si nasconde nelle Miniere finché il drago non si allontana.
2 k:A>B | {A} attira il drago verso {B} e si mette in salvo.
` },
        { n: 'Eclissi di sangue', intro: 'Le lune si tingono di rosso: i morti escono dalle tombe del reame.', out: `
1 d:A | {A} viene trascinat[A:o/a] sottoterra dai non morti.
1 +arma:A | {A} strappa {arma} a uno scheletro e si apre la strada.
1 | {A} resta immobile finché l'eclissi non passa.
` },
        { n: 'La foresta si muove', intro: 'Gli alberi della Foresta elfica si sradicano e marciano contro gli intrusi.', out: `
1 d:A | {A} viene schiacciat[A:o/a] da un albero in marcia.
1 s:A=ferito | {A} viene frustat[A:o/a] dai rami, ma riesce a fuggire.
1 | {A} chiede perdono agli alberi, che l[A:o/a] lasciano passare.
` },
        { n: 'Tempesta arcana', intro: 'Fulmini viola cadono dal cielo: la magia del reame è impazzita.', out: `
1 d:A | {A} viene colpit[A:o/a] da un fulmine arcano.
1 s:A=malato | {A} assorbe troppa magia e comincia a delirare.
1 @luck +arma:A | Un fulmine colpisce {A}, che ne esce illes[A:o/a] e con {arma} tra le mani.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'scifi', name: 'Stazione Orbitale', tag: 'Ossigeno limitato, droni e un reattore instabile.',
      hue: 190, glyph: '◎',
      phase: { b: 'Lo sbarco', d: 'Ciclo diurno', n: 'Ciclo notturno', f: 'Il rifornimento' },
      intro: { b: 'Le capsule si aprono nell\'Hangar centrale.', d: 'Le luci della stazione tornano al massimo.', n: 'L\'illuminazione passa in modalità risparmio.', f: 'Una navetta di rifornimento attracca all\'Hangar: dentro ci sono casse etichettate con il nome di ogni concorrente.', finale: 'Il computer di bordo sigilla tutti i moduli tranne l\'Hangar: i superstiti non hanno più dove nascondersi.' },
      fallen: ['Nessun segnale vitale si spegne in questo ciclo.', 'Il computer di bordo registra un segnale vitale spento.', 'Il computer di bordo registra {n} segnali vitali spenti.'],
      lex: {
        arma: ['un fucile al plasma', 'una lama vibrante', 'una pistola laser', 'una granata EMP', 'una frusta monofilamento', 'un taser a impulsi', 'un cannone a rotaia portatile'],
        cibo: ['delle razioni liofilizzate', 'un tubetto di gel proteico', 'delle alghe idroponiche', 'una capsula nutritiva'],
        luogo: ['l\'Hangar', 'la Serra idroponica', 'il Reattore', 'il Ponte di comando', 'i Moduli abitativi', 'i Condotti di servizio'],
        mostro: ['un drone di sicurezza impazzito', 'uno sciame di nanobot', 'una creatura aliena dai tentacoli', 'un androide da combattimento'],
        trappola: ['una griglia laser', 'una camera di decompressione', 'un pavimento elettrificato'],
        rifugio: ['una capsula di salvataggio', 'un modulo di stoccaggio', 'un condotto di ventilazione'],
        dono: ['un drone di rifornimento'],
      },
      extra: {
        b: `
1 d:A *0.5 | {A} apre la capsula troppo presto e viene risucchiat[A:o/a] nello spazio.
1 +arma:A @int | {A} hackera un armadietto blindato e prende {arma}.
`,
        d: `
1 @int | {A} hackera le telecamere della stazione per spiare gli altri.
1 +trap:A @int | {A} riprogramma una torretta difensiva.
1 s:A=malato | {A} viene espost[A:o/a] alle radiazioni del Reattore.
2 k:A>B @int | {A} apre il portellone stagno mentre {B} è nel modulo sbagliato.
2 al:AB | {A} e {B} condividono la stessa bombola d'ossigeno.
1 d:A | {A} finisce l'ossigeno in un condotto bloccato.
1 @luck +med:A | {A} trova un'infermeria automatica ancora funzionante.
`,
        n: `
1 | {A} guarda la Terra dall'oblò e trattiene le lacrime.
2 k:A>B @stl | {A} spegne il supporto vitale del modulo dove dorme {B}.
1 @mad | {A} parla per ore con l'intelligenza artificiale della stazione.
`,
      },
      disasters: [
        { n: 'Breccia nello scafo', intro: 'Un meteorite perfora lo scafo: l\'aria comincia a uscire con un sibilo.', out: `
1 d:A | {A} viene risucchiat[A:o/a] nel vuoto.
1 s:A=ferito | {A} resiste aggrappat[A:o/a] a un corrimano, ma si spacca un braccio.
1 | {A} raggiunge una paratia stagna un secondo prima che si chiuda.
2 k:A>B | {A} chiude la paratia lasciando fuori {B}.
` },
        { n: 'Il reattore in fusione', intro: 'Allarme rosso: il nucleo del Reattore è instabile e le radiazioni dilagano.', out: `
1 d:A | {A} non riesce ad allontanarsi in tempo dal Reattore.
1 s:A=malato | {A} assorbe una dose pesante di radiazioni.
1 @int | {A} si chiude in un modulo schermato.
` },
        { n: 'Rivolta dei droni', intro: 'Un virus si diffonde nella rete: tutti i droni di sicurezza attaccano a vista.', out: `
1 d:A | {A} viene crivellat[A:o/a] dai droni.
1 +arma:A @int | {A} abbatte un drone e ne recupera {arma}.
1 | {A} si finge mort[A:o/a] finché i droni non passano oltre.
` },
        { n: 'Gravità zero', intro: 'Il generatore di gravità si spegne: tutto e tutti cominciano a fluttuare.', out: `
1 d:A | {A} sbatte contro una paratia e non si muove più.
1 | {A} si lascia trasportare e sfrutta l'assenza di peso per nascondersi.
2 k:A>B | {A} spinge {B} contro un tubo di scarico del plasma.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'zombie', name: 'Città degli Infetti', tag: 'Ospedali vuoti, orde affamate e radio gracchianti.',
      hue: 95, glyph: '☣',
      phase: { b: 'L\'evacuazione', d: 'Giorno', n: 'Notte', f: 'Il lancio dei militari' },
      intro: { b: 'Il convoglio si ferma in piazza e le casse di rifornimenti vengono gettate a terra.', d: 'La città si sveglia nel silenzio, rotto solo dai lamenti.', n: 'Senza corrente, la città sprofonda nel buio. Gli infetti sono più attivi.', f: 'Un elicottero dell\'esercito lancia casse sul tetto dell\'Ospedale: provviste per chi riesce a raggiungerle.', finale: 'L\'esercito bombarda la periferia: chi è ancora vivo viene spinto nel centro, verso l\'ultima zona sicura.' },
      fallen: ['All\'appello via radio non manca nessuno.', 'All\'appello via radio una voce non risponde.', 'All\'appello via radio mancano {n} voci.'],
      lex: {
        arma: ['una mazza chiodata', 'un fucile a pompa', 'un piede di porco', 'una motosega', 'una katana', 'una balestra', 'una pistola', 'un\'accetta'],
        cibo: ['delle scatolette di fagioli', 'una barretta energetica', 'dell\'acqua in bottiglia', 'un sacchetto di patatine', 'una confezione di crackers'],
        luogo: ['l\'Ospedale', 'il Centro commerciale', 'la Metropolitana', 'la Scuola', 'la Stazione di polizia', 'la Periferia'],
        mostro: ['un\'orda di zombi', 'un infetto corridore', 'un cane infetto', 'un gigante mutato'],
        trappola: ['una trappola esplosiva lasciata dai militari', 'un pavimento crollato', 'un reticolato elettrificato'],
        rifugio: ['un furgone blindato', 'il tetto di un palazzo', 'un bunker antiatomico'],
        dono: ['un lancio di rifornimenti dell\'esercito'],
      },
      extra: {
        b: `
1 s:A=malato | {A} viene graffiat[A:o/a] da un infetto nella confusione.
2 k:A>B | {A} spinge {B} verso un gruppo di infetti per guadagnare tempo.
`,
        d: `
1 s:A=malato | {A} viene mors[A:o/a] da uno zombi e nasconde la ferita a tutti.
1 need:A=malato d:A *2.5 | {A} si trasforma: l'infezione ha vinto.
1 need:A=malato med:A cure:A *3 | {A} si inietta l'antidoto sperimentale e la febbre scende.
2 need:B=malato k:A>B *2 | {A} si accorge che {B} sta per trasformarsi e mette fine alle sue sofferenze.
1 +arma:A | {A} saccheggia l'armeria della Stazione di polizia e trova {arma}.
1 | {A} prova la radio: solo interferenze.
2 al:AB @soc | {A} e {B} barricano insieme un negozio di ferramenta.
`,
        n: `
1 | {A} sente l'orda grattare alla porta per tutta la notte.
1 d:A | {A} esce a cercare acqua e non rientra.
2 ally:AB | {A} e {B} si chiudono in un furgone e aspettano l'alba.
`,
      },
      disasters: [
        { n: 'La grande orda', intro: 'Migliaia di infetti attraversano la città in un\'unica marea.', out: `
1 d:A | {A} viene sommers[A:o/a] dall'orda.
1 s:A=malato | {A} riesce a fuggire, ma con un morso sul braccio.
1 | {A} si arrampica su un lampione e aspetta che l'orda passi.
2 k:A>B | {A} sgambetta {B} per rallentare gli infetti.
` },
        { n: 'Bombardamento', intro: 'L\'esercito sgancia bombe incendiarie per contenere il contagio.', out: `
1 d:A | {A} viene investit[A:o/a] da un'esplosione.
1 s:A=ferito | {A} si salva, ma un frammento [A:gli/le] squarcia una gamba.
1 | {A} si rifugia nella Metropolitana appena in tempo.
` },
        { n: 'Gas nella metro', intro: 'I militari saturano i tunnel della Metropolitana di gas.', out: `
1 d:A | {A} resta intrappolat[A:o/a] nei tunnel.
1 s:A=avvelenato | {A} esce dai tunnel tossendo sangue.
1 @int | {A} trova una maschera antigas in un deposito.
` },
        { n: 'Il mutato', intro: 'Un infetto gigantesco, alto il doppio di un uomo, inizia a cacciare.', out: `
1 d:A | {A} viene afferrat[A:o/a] dal mutato.
1 +arma:A | {A} trova {arma} vicino al corpo di un soldato e scappa.
2 d:B | {A} si nasconde mentre il mutato si accanisce su {B}.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'royale', name: 'Isola Battle Royale', tag: 'Un aereo, cento casse e una zona che si stringe.',
      hue: 210, glyph: '⌖',
      phase: { b: 'Il lancio', d: 'Giorno', n: 'Notte', f: 'La cassa leggendaria' },
      intro: { b: 'I giocatori saltano dall\'aereo e atterrano tra le casse.', d: 'La zona sicura si stringe ancora.', n: 'I visori notturni si accendono.', f: 'Un razzo rosso segnala una cassa leggendaria al centro dell\'isola.', finale: 'La zona sicura si riduce a un cerchio di cinquanta metri: lo scontro finale è inevitabile.' },
      fallen: ['Il contatore dei giocatori resta invariato.', 'Il contatore scende: un giocatore è stato eliminato.', 'Il contatore scende di {n} giocatori.'],
      lex: {
        arma: ['un fucile d\'assalto', 'una pistola', 'un fucile da cecchino', 'un fucile a pompa', 'una granata', 'una mitraglietta', 'un coltello da combattimento', 'una balestra'],
        cibo: ['una lattina di energy drink', 'delle barrette proteiche', 'un kit di razioni militari'],
        luogo: ['l\'Aeroporto', 'la Base militare', 'il Villaggio costiero', 'la Centrale elettrica', 'la Fattoria', 'la Foresta'],
        mostro: ['un drone armato', 'un elicottero da caccia', 'un cane da guardia addestrato'],
        trappola: ['una mina claymore', 'una trappola esplosiva', 'un campo minato'],
        rifugio: ['una casa abbandonata', 'un fienile', 'un bagno della stazione di servizio'],
        dono: ['una cassa di rifornimenti paracadutata'],
      },
      extra: {
        b: `
1 d:A *0.5 | {A} apre il paracadute troppo tardi.
2 k:A>B +arma:A | {A} atterra sulla stessa casa di {B}, trova {arma} per prim[A:o/a] e l[B:o/a] elimina.
`,
        d: `
1 d:A | {A} resta fuori dalla zona sicura e non fa in tempo a rientrare.
1 s:A=ferito | {A} rientra nella zona sicura all'ultimo secondo, con la salute a pezzi.
2 k:A>B w:A @stl | {A} colpisce {B} dalla distanza con un tiro perfetto.
2 k:A>B | {A} e {B} si incontrano nello stesso edificio: {A} spara per prim[A:o/a].
1 +arma:A @luck | {A} trova {arma} con mirino olografico.
1 @stl | {A} si nasconde in un cespuglio e aspetta che qualcuno passi.
2 al:AB @soc | {A} e {B} si salutano con un'emote e decidono di fare squadra.
`,
        n: `
1 | {A} ricarica tutte le armi e controlla le munizioni.
2 k:A>B @stl | {A} segue il rumore dei passi di {B} e l[B:o/a] elimina nel buio.
`,
      },
      disasters: [
        { n: 'Zona rossa', intro: 'Una zona rossa viene bombardata a tappeto senza preavviso.', out: `
1 d:A | {A} viene colpit[A:o/a] dal bombardamento.
1 s:A=ferito | {A} esce dalla zona rossa con la salute a metà.
1 | {A} si mette al riparo in un bunker.
` },
        { n: 'La zona si chiude', intro: 'Il cerchio si restringe a velocità doppia.', out: `
1 d:A | {A} resta fuori dal cerchio.
1 | {A} prende un veicolo e rientra al volo.
2 k:A>B | {A} aspetta {B} sul bordo della zona e l[B:o/a] elimina mentre corre.
` },
        { n: 'Caccia del drone', intro: 'Un drone armato sorvola l\'isola e marca chiunque si muova.', out: `
1 d:A | {A} viene individuat[A:o/a] dal drone.
1 +arma:A @int | {A} abbatte il drone e recupera {arma} dal suo carico.
1 @stl | {A} resta immobile finché il drone non si allontana.
` },
        { n: 'Tempesta tropicale', intro: 'Una tempesta improvvisa spazza l\'isola: niente visibilità, niente suoni.', out: `
1 d:A | {A} cade da una scogliera nella tempesta.
1 | {A} aspetta che la tempesta passi dentro un fienile.
2 k:A>B @stl | Approfittando del rumore della pioggia, {A} si avvicina a {B} e l[B:o/a] elimina.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'horror', name: 'Villa Maledetta', tag: 'Specchi che sussurrano e porte che si chiudono da sole.',
      hue: 350, glyph: '✝',
      phase: { b: 'La cena', d: 'Giorno', n: 'Notte', f: 'Il ballo in maschera' },
      intro: { b: 'Gli ospiti si avventano sulle armi appese nel salone.', d: 'Una luce grigia filtra dalle finestre sbarrate.', n: 'Le candele si spengono una dopo l\'altra.', f: 'Il padrone di casa invita tutti al ballo in maschera: sui tavoli del salone ci sono doni avvolti in carta nera.', finale: 'La villa sigilla ogni stanza tranne il salone: gli ultimi ospiti si ritrovano faccia a faccia.' },
      fallen: ['L\'orologio a pendolo tace stanotte.', 'L\'orologio a pendolo batte un rintocco: un\'anima è stata presa.', 'L\'orologio a pendolo batte {n} rintocchi.'],
      lex: {
        arma: ['un candelabro d\'argento', 'un\'ascia', 'un fucile da caccia', 'un pugnale rituale', 'un crocifisso appuntito', 'un attizzatoio', 'una falce'],
        cibo: ['del vino polveroso', 'del pane raffermo', 'una scatola di biscotti', 'un barattolo di marmellata'],
        luogo: ['la Cantina', 'la Soffitta', 'la Cappella', 'il Cimitero', 'la Biblioteca', 'la Serra'],
        mostro: ['uno spettro urlante', 'una bambola posseduta', 'un\'entità senza volto', 'uno stormo di corvi'],
        trappola: ['una botola nascosta', 'un pavimento marcio', 'uno specchio maledetto'],
        rifugio: ['un armadio a muro', 'una cripta', 'un passaggio segreto'],
        dono: ['una busta nera infilata sotto la porta'],
      },
      extra: {
        b: `
1 | {A} nota che i ritratti alle pareti hanno gli occhi che seguono gli ospiti.
2 k:A>B | {A} spegne le candele e nel buio colpisce {B}.
`,
        d: `
1 s:A=malato | {A} si guarda allo specchio e vede il proprio riflesso sorridere.
1 need:A=malato d:A *2 | {A} viene possedut[A:o/a] dalla presenza nella villa e si getta dalla Soffitta.
1 need:A=malato cure:A @int *2 | {A} recita un esorcismo trovato in Biblioteca e si libera della presenza.
1 @int | {A} scopre un diario che rivela la storia della villa.
1 +arma:A | {A} trova {arma} dentro un baule della Soffitta.
2 al:AB @soc | {A} e {B} promettono di non separarsi mai.
2 d:B | {A} vede {B} sparire dietro una porta che poi si richiude da sola.
`,
        n: `
1 | {A} sente una ninna nanna provenire dalle pareti.
1 d:A | {A} segue una voce che chiama il suo nome fino alla Cantina.
1 @mad | {A} conversa con un fantasma che nessun altro vede.
2 ally:AB | {A} e {B} tengono una candela accesa fino all'alba.
`,
      },
      disasters: [
        { n: 'La notte dei morti', intro: 'Le tombe del Cimitero si spalancano.', out: `
1 d:A | {A} viene trascinat[A:o/a] in una tomba aperta.
1 s:A=ferito | {A} sfugge a mani scheletriche che [A:gli/le] lacerano le gambe.
1 | {A} si chiude nella Cappella fino all'alba.
` },
        { n: 'Gli specchi', intro: 'Tutti gli specchi della villa si incrinano nello stesso istante.', out: `
1 d:A | {A} viene risucchiat[A:o/a] dentro uno specchio.
1 s:A=malato | {A} vede il proprio riflesso uscire dallo specchio e scappa terrorizzat[A:o/a].
1 @int | {A} copre tutti gli specchi con dei teli.
` },
        { n: 'L\'incendio della Serra', intro: 'Le piante della Serra prendono fuoco e il fumo invade la villa.', out: `
1 d:A | {A} soffoca nel fumo.
1 | {A} esce da una finestra e aspetta nel giardino.
2 k:A>B | {A} chiude {B} nella Serra in fiamme.
` },
        { n: 'La bambola', intro: 'Una bambola di porcellana compare in ogni stanza. Ride.', out: `
1 d:A | {A} viene trovat[A:o/a] senza vita accanto alla bambola.
1 | {A} getta la bambola nel camino. Torna intera il giorno dopo.
1 s:A=avvelenato | {A} si punge con lo spillone della bambola.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'wasteland', name: 'Terre Desolate', tag: 'Polvere radioattiva, predoni e motori truccati.',
      hue: 25, glyph: '☢',
      phase: { b: 'La corsa al deposito', d: 'Giorno', n: 'Notte', f: 'Il convoglio' },
      intro: { b: 'Il cancello del deposito si spalanca: dentro ci sono armi e taniche.', d: 'Il sole picchia sulla sabbia rovente.', n: 'Nel deserto la temperatura crolla sotto zero.', f: 'Un convoglio carico di acqua pulita attraversa l\'Autostrada spezzata.', finale: 'Una tempesta radioattiva copre tutto tranne la Diga: i superstiti convergono lì.' },
      fallen: ['Nessun fumo nero sale all\'orizzonte.', 'Una colonna di fumo nero sale all\'orizzonte.', '{n} colonne di fumo nero salgono all\'orizzonte.'],
      lex: {
        arma: ['un fucile arrugginito', 'una lancia ricavata da un tubo', 'una balestra artigianale', 'una molotov', 'una catena', 'una mannaia', 'un lanciachiodi'],
        cibo: ['una lattina ammaccata', 'della carne di lucertola', 'una tanica d\'acqua torbida', 'dei fichi d\'India'],
        luogo: ['la Discarica', 'l\'Autostrada spezzata', 'la Raffineria', 'la Città fantasma', 'il Cratere', 'la Diga'],
        mostro: ['una banda di predoni', 'uno scorpione gigante', 'un branco di cani mutati', 'un verme delle sabbie'],
        trappola: ['una vecchia mina', 'una pozza di fango radioattivo', 'un cavo teso tra le rovine'],
        rifugio: ['la carcassa di un autobus', 'una cisterna vuota', 'un bunker crollato'],
        dono: ['un carico di rottami lanciato da un dirigibile'],
      },
      extra: {
        b: `
1 +arma:A | {A} sfonda una cassa a calci e ci trova {arma}.
2 k:A>B @agg | {A} investe {B} con una moto truccata.
`,
        d: `
1 s:A=malato | {A} attraversa il Cratere e si espone alle radiazioni.
1 s:A=affamato | {A} cammina per ore sotto il sole senza trovare acqua.
1 +arma:A @int | {A} assembla {arma} con pezzi della Discarica.
1 @soc | {A} baratta un accendino con un mercante di passaggio.
2 k:A>B | {A} sabota il veicolo di {B}, che salta in aria.
2 al:AB | {A} e {B} si alleano per riparare un vecchio camion.
1 d:A | {A} viene inghiottit[A:o/a] da un verme delle sabbie.
`,
        n: `
1 | {A} conta le stelle per non pensare alla sete.
2 k:A>B @stl | {A} si avvicina al falò di {B} e l[B:o/a] colpisce con una catena.
`,
      },
      disasters: [
        { n: 'Tempesta di sabbia radioattiva', intro: 'Un muro di sabbia verde avanza dall\'orizzonte.', out: `
1 d:A | {A} viene sepolt[A:o/a] dalla sabbia.
1 s:A=malato | {A} respira polvere radioattiva.
1 | {A} si rintana in una cisterna vuota.
` },
        { n: 'Il raid dei predoni', intro: 'Una banda di predoni su moto rombanti attraversa le Terre Desolate.', out: `
1 d:A | {A} viene catturat[A:o/a] dai predoni e non se ne sa più nulla.
1 +arma:A | {A} ruba {arma} a un predone ubriaco.
2 k:A>B | {A} vende la posizione di {B} ai predoni.
` },
        { n: 'L\'esplosione della Raffineria', intro: 'La Raffineria salta in aria in una palla di fuoco.', out: `
1 d:A | {A} viene investit[A:o/a] dall'onda d'urto.
1 s:A=ferito | {A} viene sbalzat[A:o/a] lontano, ma sopravvive.
1 | {A} guarda l'esplosione da lontano, al sicuro.
` },
        { n: 'La siccità', intro: 'Tutte le fonti d\'acqua si prosciugano nello stesso giorno.', out: `
1 d:A | {A} muore disidratat[A:o/a].
1 s:A=affamato | {A} sopravvive bevendo da un radiatore.
1 cibo:A | {A} divide in piccole sorsate l'ultima acqua che aveva.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'liceo', name: 'Liceo Spietato', tag: 'Interrogazioni, gossip e alleanze da intervallo. Nessuno muore: si viene eliminati.',
      hue: 330, glyph: '✎', soft: true, noAdult: true,
      labels: { kills: 'Eliminazioni', dead: 'Eliminati', fallen: 'Eliminati del giorno', killed: 'Eliminat' },
      phase: { b: 'Il primo giorno', d: 'Lezioni', n: 'Dopo scuola', f: 'La festa di fine anno' },
      intro: { b: 'Suona la campanella: tutti corrono a prendersi il banco migliore.', d: 'Prima ora: compito in classe.', n: 'La scuola si svuota, ma la chat di classe no.', f: 'Si apre la festa in Palestra: musica alta e ogni occasione è buona per un colpo basso.', finale: 'La Preside convoca gli ultimi rimasti in Aula magna per il verdetto finale.' },
      fallen: ['All\'appello del mattino non manca nessuno.', 'All\'appello del mattino manca un nome.', 'All\'appello del mattino mancano {n} nomi.'],
      lex: {
        arma: ['un gossip esplosivo', 'una foto imbarazzante', 'un compito copiato', 'un pallone da dodgeball', 'un registro rubato', 'un profilo falso'],
        cibo: ['una merendina del distributore', 'un trancio di pizza della mensa', 'un caffè della macchinetta'],
        luogo: ['la Palestra', 'la Mensa', 'la Biblioteca', 'il Laboratorio di chimica', 'il Cortile', 'l\'Aula magna'],
        mostro: ['la Preside', 'il bidello di turno', 'un\'ispezione a sorpresa', 'la professoressa di matematica'],
        trappola: ['un\'interrogazione a sorpresa', 'una verifica a sorpresa', 'un messaggio inviato nella chat sbagliata'],
        rifugio: ['il bagno del secondo piano', 'l\'aula di musica', 'il ripostiglio delle scope'],
        dono: ['un bigliettino passato sotto il banco'],
      },
      pool: {
        b: `
1 | {A} conquista l'ultimo banco vicino al termosifone.
1 +arma:A | {A} scopre {arma} su un compagno e conserva la scoperta per il momento giusto.
1 @cow | {A} si siede in prima fila sperando di passare inosservat[A:o/a].
1 +cibo:A | {A} arriva con {cibo} e diventa subito popolare.
1 d:A *0.6 | {A} si presenta il primo giorno con la maglietta sbagliata e non si riprenderà mai.
2 k:A>B @agg | {A} soffia il posto a {B} davanti a tutti: {B} chiede di cambiare sezione.
2 al:AB @soc | {A} e {B} scoprono di seguire le stesse serie tv e diventano inseparabili.
2 | {A} e {B} litigano per lo stesso armadietto, poi fanno pace.
2 k:A>B w:A | {A} usa {arma:A} contro {B}, che si trasferisce in un'altra scuola.
3 al:ABC @soc | {A}, {B} e {C} fondano il gruppo più esclusivo della classe.
3 k:AB>C | {A} e {B} escludono {C} da ogni gruppo di studio: {C} è fuori.
2 @stl | {A} memorizza l'orario di tutti i professori, mentre {B} si perde nei corridoi.
`,
        d: `
1 | {A} prende un sette in storia e passa la giornata tranquill[A:o/a].
1 @int | {A} prepara una schedina perfetta per il compito di latino.
1 s:A=ferito | {A} prende un due all'interrogazione di fisica.
1 need:A=ferito d:A *2 | {A} accumula troppe insufficienze e viene bocciat[A:o/a].
1 need:A=* cure:A @int *2 | {A} recupera tutte le insufficienze con un'interrogazione da dieci.
1 d:A | {A} viene sorpres[A:o/a] a fumare in bagno e sospes[A:o/a].
1 d:A | {A} incontra {mostro} nel momento peggiore e viene sospes[A:o/a].
1 s:A=malato | {A} si prende l'influenza dal compagno di banco.
1 need:A=malato d:A *1.5 | {A} salta troppe lezioni per malattia e perde l'anno.
1 +arma:A @stl | {A} fotografa di nascosto la chat dei rappresentanti e ottiene {arma}.
1 @soc | {A} organizza l'uscita di classe e tutti l[A:o/a] adorano.
1 @cow | {A} si chiude in {rifugio} per tutta la ricreazione.
1 +trap:A @int | {A} prepara una domanda trabocchetto per l'assemblea di istituto.
1 +cibo:A | {A} arriva per prim[A:o/a] alla macchinetta e si accaparra {cibo}.
1 @mad | {A} si presenta a scuola in pigiama e nessuno capisce se sia uno scherzo.
2 al:AB @soc | {A} e {B} si mettono a studiare insieme.
2 ally:AB | {A} e {B} si passano le risposte durante la verifica.
2 tr:A>B | {A} fa la spia sul compito copiato di {B}: {B} viene sospes[B:o/a].
2 ally:AB br:A @betray | {A} smette di rispondere ai messaggi di {B}.
2 k:A>B w:A @agg | {A} diffonde {arma:A} su {B}: {B} non si fa più vedere a scuola.
2 k:A>B @agg | {A} umilia {B} davanti a tutta la classe: {B} chiede il trasferimento.
2 k:A>B trap:A @int *2 | {B} cade nella domanda trabocchetto di {A} e viene eliminat[B:o/a].
2 k:A>B @stl | {A} fa sparire la giustificazione di {B}, che viene sospes[B:o/a].
2 s:B=ferito | {A} fa notare un errore di {B} alla professoressa.
2 steal:A<B @stl | {A} ruba {arma:B} a {B} prima che possa servirsene.
2 need:B=* cure:B @heal | {A} presta gli appunti a {B}, che recupera.
2 | {A} e {B} si ignorano per tutto il giorno.
2 k:A>B k:B>A *0.4 | {A} e {B} litigano in corridoio e vengono sospes[AB:i/e] entramb[AB:i/e].
3 al:ABC @soc | {A}, {B} e {C} creano una chat segreta.
3 k:AB>C @agg | {A} e {B} mettono in giro una voce su {C}, che lascia la scuola.
3 | {A}, {B} e {C} formano un gruppo per la ricerca di scienze.
`,
        n: `
1 | {A} guarda serie tv fino alle tre del mattino.
1 | {A} studia fino a tardi per la verifica di domani.
1 @mad | {A} manda un vocale di dieci minuti nella chat di classe.
1 d:A | {A} pubblica una storia di cui si pentirà per sempre ed esce dai giochi.
1 s:A=affamato | {A} salta la cena per finire i compiti.
1 need:A=* cure:A | {A} dorme dieci ore e si riprende.
1 @stl | {A} spia i profili social di tutti i compagni.
1 +arma:A @stl | {A} trova {arma} scorrendo vecchie foto.
2 ally:AB | {A} e {B} fanno una videochiamata di tre ore.
2 tr:A>B | {A} inoltra a tutta la classe i messaggi privati di {B}.
2 k:A>B @agg | {A} crea un meme su {B} che diventa virale: {B} è fuori.
2 al:AB @soc | {A} e {B} si ritrovano alla stessa festa e diventano amic[AB:i/he].
2 | {A} e {B} litigano su chi abbia ragione in una discussione di storia.
3 ally:ABC | {A}, {B} e {C} fanno un pigiama party.
3 k:A>B | {A} scatena una lite nel gruppo e {B} ne esce distrutt[B:o/a], sotto lo sguardo di {C}.
`,
        f: `
1 | {A} balla tutta la sera senza pensare a niente.
1 @cow | {A} decide di non andare alla festa.
1 +arma:A | {A} si procura {arma} durante la festa.
1 d:A | {A} rovescia il punch sulla Preside ed è fuori.
2 k:A>B @agg | {A} rovina l'ingresso di {B} alla festa: {B} non si riprende.
2 al:AB @soc | {A} e {B} ballano il lento insieme.
2 tr:A>B | {A} abbandona {B} per un gruppo più popolare, facendol[B:o/a] crollare.
3 k:A>BC *0.6 | {A} rivela i segreti di {B} e {C} al microfono: entramb[BC:i/e] fuori.
`,
        finale: `
2 k:A>B | La Preside decide: {A} resta, {B} no.
2 k:A>B | All'ultima interrogazione {A} risponde meglio di {B}.
2 k:A>B w:A | {A} gioca la sua ultima carta, {arma:A}, e {B} viene eliminat[B:o/a].
`,
        ds: `
1 | {A} resta impassibile e si salva.
1 @luck | {A} era assente quel giorno.
1 s:A=ferito | {A} se la cava, ma con una nota sul registro.
1 @int | {A} aveva previsto tutto.
2 ally:AB | {A} e {B} si coprono a vicenda.
2 k:A>B | {A} scarica tutta la colpa su {B}.
`,
        fallback: `
1 | {A} passa la giornata senza farsi notare.
1 | {A} tiene un profilo basso e lascia parlare gli altri.
1 | {A} resta al proprio posto e osserva.
1 | {A} fa il minimo indispensabile. Nessuno se ne accorge.
1 | {A} ripassa mentalmente chi sta con chi.
1 | {A} evita tutti con molta educazione.
`,
      },
      disasters: [
        { n: 'L\'ispezione ministeriale', intro: 'Arrivano gli ispettori del ministero: ogni irregolarità verrà punita.', out: `
1 d:A | {A} viene sorpres[A:o/a] con il telefono acceso e sospes[A:o/a].
1 | {A} si presenta con il libro aperto alla pagina giusta.
` },
        { n: 'Il compito a sorpresa', intro: 'La professoressa di matematica entra sorridendo: compito in classe a sorpresa.', out: `
1 d:A | {A} consegna il foglio in bianco ed è fuori.
1 s:A=ferito | {A} prende quattro.
1 @int | {A} prende dieci senza sforzo.
` },
        { n: 'La chat trapelata', intro: 'La chat segreta della classe finisce sul telefono della Preside.', out: `
1 d:A | Saltano fuori i messaggi di {A}: espulsione immediata.
1 @luck | {A} aveva sempre scritto solo adesivi.
2 k:A>B | {A} mostra alla Preside solo i messaggi di {B}.
` },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'ufficio', name: 'Ufficio Open Space', tag: 'Riunioni infinite, fogli Excel e licenziamenti. Nessuno muore: si viene licenziati.',
      hue: 160, glyph: '▦', soft: true,
      labels: { kills: 'Licenziamenti causati', dead: 'Licenziati', fallen: 'Licenziati del giorno', killed: 'Licenziat' },
      phase: { b: 'Il lunedì mattina', d: 'Orario d\'ufficio', n: 'Straordinari', f: 'La cena aziendale' },
      intro: { b: 'Si apre la corsa alla scrivania vicino alla finestra.', d: 'Nove in punto: le mail arrivano a raffica.', n: 'Le luci dell\'open space si abbassano, ma qualcuno resta.', f: 'L\'azienda organizza la cena aziendale: open bar e direttori di buon umore. Forse.', finale: 'Il Direttore generale convoca gli ultimi superstiti in Sala riunioni: resterà un solo posto.' },
      fallen: ['Nessuna scrivania si svuota oggi.', 'Una scrivania viene svuotata: c\'è uno scatolone in più vicino all\'uscita.', '{n} scrivanie vengono svuotate prima di sera.'],
      lex: {
        arma: ['una mail in copia a tutti', 'un report pieno di errori altrui', 'una presentazione rubata', 'un badge clonato del capo', 'un foglio Excel con le prove', 'una nota spese gonfiata'],
        cibo: ['un caffè della macchinetta', 'una ciambella della sala riunioni', 'un\'insalata in vaschetta'],
        luogo: ['la Sala riunioni', 'l\'Open space', 'la Cucina', 'l\'Ufficio del direttore', 'la Sala stampanti', 'il Parcheggio'],
        mostro: ['il Direttore generale', 'l\'ufficio Risorse umane', 'un consulente esterno', 'una riorganizzazione aziendale'],
        trappola: ['una riunione che poteva essere una mail', 'una stampante inceppata', 'un aggiornamento di sistema'],
        rifugio: ['la sala server', 'lo sgabuzzino della cancelleria', 'una call di quattro ore a telecamera spenta'],
        dono: ['un bonus in busta paga'],
      },
      pool: {
        b: `
1 | {A} conquista la scrivania vicino alla finestra.
1 +arma:A @stl | {A} trova {arma} nella cartella condivisa.
1 @cow | {A} si siede nell'angolo più buio e spera di non essere vist[A:o/a].
1 +cibo:A | {A} arriva per prim[A:o/a] alla macchinetta e si prende {cibo}.
1 d:A *0.5 | {A} sbaglia il nome del direttore al primo saluto ed è fuori.
2 k:A>B @agg | {A} si prende il merito del lavoro di {B} durante la prima riunione: {B} viene licenziat[B:o/a].
2 al:AB @soc | {A} e {B} scoprono di odiare lo stesso collega e fanno squadra.
2 | {A} e {B} si contendono l'unica sedia ergonomica.
3 al:ABC @soc | {A}, {B} e {C} creano un gruppo per la pausa pranzo.
3 k:AB>C | {A} e {B} fanno sparire il portatile di {C} prima della presentazione.
`,
        d: `
1 | {A} risponde a quaranta mail e non succede altro.
1 @int | {A} automatizza il proprio lavoro con una macro e nessuno se ne accorge.
1 s:A=ferito | {A} riceve una valutazione negativa dal capo.
1 need:A=ferito d:A *2 | {A} riceve la seconda valutazione negativa: licenziamento.
1 need:A=* cure:A @int *2 | {A} chiude un contratto enorme e torna nelle grazie del capo.
1 d:A | {A} viene convocat[A:o/a] da {mostro} e non torna alla scrivania.
1 d:A | {A} rimane bloccat[A:o/a] in {trappola} e salta una scadenza decisiva.
1 s:A=malato | {A} arriva al lavoro con l'influenza e contagia mezzo piano.
1 need:A=malato d:A *1.5 | {A} esaurisce i giorni di malattia ed è fuori.
1 +arma:A @stl | {A} recupera {arma} dal cestino della carta.
1 @soc | {A} porta le paste per tutti e conquista l'ufficio.
1 @cow | {A} si rifugia in {rifugio} per tutta la mattina.
1 +trap:A @int | {A} prepara una riunione-trappola per il pomeriggio.
1 @mad | {A} risponde a tutte le mail con un solo emoji.
1 +cibo:A | {A} riceve {dono} e torna di buon umore.
2 al:AB @soc | {A} e {B} si alleano per il nuovo progetto.
2 ally:AB | {A} e {B} si coprono a vicenda durante la riunione.
2 tr:A>B | {A} inoltra al capo le lamentele di {B}: {B} viene licenziat[B:o/a].
2 ally:AB br:A @betray | {A} si fa trasferire in un altro team senza dire nulla a {B}.
2 k:A>B w:A @agg | {A} usa {arma:A} contro {B}: per {B} arriva la lettera di licenziamento.
2 k:A>B @agg | {A} fa notare in riunione tutti gli errori di {B}: {B} è fuori.
2 k:A>B trap:A @int *2 | {B} cade nella riunione-trappola di {A} e non si riprende.
2 k:A>B @stl | {A} sposta di nascosto la scadenza di {B} di una settimana prima.
2 s:B=ferito | {A} mette {B} in copia a una mail imbarazzante.
2 steal:A<B @stl | {A} sottrae a {B} {arma:B}.
2 need:B=* cure:B @heal | {A} aiuta {B} a sistemare il report.
2 | {A} e {B} fingono di lavorare per tutto il pomeriggio.
2 k:A>B k:B>A *0.4 | {A} e {B} litigano urlando in Sala riunioni: licenziat[AB:i/e] entramb[AB:i/e].
3 al:ABC @soc | {A}, {B} e {C} formano un sindacato segreto.
3 k:AB>C @agg | {A} e {B} convincono il capo che {C} è inutile.
3 | {A}, {B} e {C} restano bloccat[ABC:i/e] in ascensore per un'ora.
`,
        n: `
1 | {A} resta in ufficio fino a mezzanotte.
1 | {A} spegne il telefono e si gode la serata.
1 @mad | {A} manda una mail di dimissioni alle due di notte, poi la annulla.
1 d:A | {A} pubblica un post contro l'azienda ed è fuori.
1 s:A=affamato | {A} cena con un pacchetto di crackers alla scrivania.
1 need:A=* cure:A | {A} si prende una serata libera e torna in forma.
1 +arma:A @stl | {A} scopre {arma} scorrendo l'archivio aziendale.
2 ally:AB | {A} e {B} vanno all'aperitivo insieme.
2 tr:A>B | {A} usa i messaggi privati di {B} per farl[B:o/a] licenziare.
2 k:A>B @stl | {A} cancella di nascosto i file di {B} dal server.
2 al:AB @soc | {A} e {B} si incontrano in palestra e fanno amicizia.
3 ally:ABC | {A}, {B} e {C} preparano insieme la presentazione di domani.
`,
        f: `
1 | {A} si gode l'open bar con moderazione.
1 @cow | {A} salta la cena aziendale.
1 +arma:A | {A} si procura {arma} durante la cena.
1 d:A | {A} dice al Direttore cosa pensa davvero di lui ed è fuori.
2 k:A>B @agg | {A} fa ubriacare {B}, che dà spettacolo davanti ai capi.
2 al:AB @soc | {A} e {B} cantano insieme al karaoke.
3 k:A>BC *0.6 | {A} legge ad alta voce le mail di {B} e {C} durante il brindisi.
`,
        finale: `
2 k:A>B | Il Direttore sceglie {A}: {B} riceve lo scatolone.
2 k:A>B | {A} presenta numeri migliori di {B} all'ultima riunione.
2 k:A>B w:A | {A} gioca la sua ultima carta, {arma:A}, e {B} è fuori.
`,
        ds: `
1 | {A} mantiene la calma e sopravvive.
1 @luck | {A} era in ferie.
1 s:A=ferito | {A} si salva, ma con un richiamo scritto.
1 @int | {A} aveva già aggiornato il curriculum.
2 ally:AB | {A} e {B} si coprono le spalle davanti al Direttore.
2 k:A>B | {A} scarica tutta la responsabilità su {B}.
`,
        fallback: `
1 | {A} passa la giornata davanti a un foglio Excel.
1 | {A} risponde a tre mail e ne archivia quaranta. Giornata tranquilla.
1 | {A} si fa vedere molto impegnat[A:o/a] senza fare niente di preciso.
1 | {A} resta alla scrivania con le cuffie e non alza la testa.
1 | {A} prende il caffè alla macchinetta del piano di sopra, per non incontrare nessuno.
1 | {A} riordina la scrivania per la terza volta. Nessuno nota niente.
`,
      },
      disasters: [
        { n: 'La riorganizzazione', intro: 'Arriva un consulente esterno con una slide intitolata "Ottimizzazione delle risorse".', out: `
1 d:A | Il ruolo di {A} viene eliminato dall'organigramma.
1 | {A} viene spostat[A:o/a] in un altro team e sopravvive.
2 k:A>B | {A} suggerisce al consulente di tagliare il ruolo di {B}.
` },
        { n: 'Il server è giù', intro: 'Il server aziendale si blocca durante la chiusura del trimestre.', out: `
1 d:A | {A} perde tutto il lavoro del trimestre ed è fuori.
1 @int | {A} aveva un backup su chiavetta.
1 s:A=ferito | {A} recupera solo metà dei file.
` },
        { n: 'L\'audit', intro: 'L\'ufficio Risorse umane annuncia un audit su tutte le note spese.', out: `
1 d:A | Saltano fuori le note spese di {A}: licenziamento immediato.
1 @luck | {A} non ha mai chiesto un rimborso in vita sua.
` },
      ],
    },
  ];
})(typeof window !== 'undefined' ? window : globalThis);
