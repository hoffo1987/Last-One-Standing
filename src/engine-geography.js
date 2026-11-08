/* Geografia della partita: dati salvabili, percorsi e vincoli dei testi.
 * Nessuna dipendenza dal DOM; nessuna sorgente casuale nascosta. */
(function (G) {
  'use strict';
  const definitions = {
    classico: { start: 0, feast: 0, finale: 0, links: [[0,1],[0,2],[0,4],[1,2],[1,3],[2,3],[2,5],[3,4],[4,5]], descriptions: ['Il punto dei rifornimenti: conteso e senza copertura.', 'Sentieri e vegetazione offrono copertura.', 'Acqua e cibo, ma le rive espongono agli incontri.', 'Poco cibo sicuro e terreno insidioso.', 'Muri crollati e nascondigli riparati.', 'Poca copertura, vie di passaggio esposte.'] },
    fantasy: { start: 6, feast: 6, finale: 6, extra: ["l'Altare delle armi", [1.4,1.5,0.2], 'La radura del banchetto e delle sfide, al centro dei sentieri.'], links: [[6,0],[6,1],[6,2],[0,3],[0,5],[1,2],[1,4],[2,4],[3,5],[4,5]], descriptions: ['Le rovine della Torre offrono mura e ripari.', 'La foresta nutre chi sa cercare.', 'Le rive sono aperte e difficili da difendere.', 'Gallerie riparate, ma pericolose.', 'Acqua stagnante e magia ostile.', 'Le pendici del drago sono povere ed esposte.'] },
    scifi: { start: 0, feast: 0, finale: 0, links: [[0,1],[0,4],[0,5],[1,2],[1,4],[2,3],[2,5],[3,4],[3,5]], descriptions: ['Attracchi e casse di rifornimento.', 'Colture e acqua dei ricircolatori.', 'Impianti instabili e ossigeno difficile da recuperare.', 'Console e accessi sorvegliati.', 'Alloggi protetti, adatti al riposo.', 'Passaggi di manutenzione stretti e riparati.'] },
    zombie: { start: 6, feast: 0, finale: 6, extra: ['la Piazza', [1.3,1.4,0.2], 'Il piazzale del convoglio, collegato al centro e alle vie di fuga.'], links: [[6,0],[6,1],[6,2],[0,3],[0,4],[1,2],[1,5],[2,4],[3,5],[4,5]], descriptions: ['Cure e scorte, ma molti infetti.', 'Negozi pieni di risorse e passaggi contesi.', 'Gallerie buie dove è difficile ritirarsi.', 'Aule e corridoi offrono riparo.', 'Locali barricabili e accessi controllabili.', 'Case sparse e strade verso il centro.'] },
    royale: { start: null, feast: 0, finale: 0, links: [[0,1],[0,2],[0,5],[1,3],[1,5],[2,3],[2,4],[3,4],[4,5]], descriptions: ['Hangar e casse: molti rifornimenti e molti rivali.', 'Armi e risorse contese.', 'Edifici utili per ripararsi.', 'Passaggi esposti tra gli impianti.', 'Campi e provviste, con ripari limitati.', 'Copertura e sentieri ai margini dell’isola.'] },
    horror: { start: 6, feast: 6, finale: 6, extra: ['il Salone', [1.4,1.3,0.5], 'L’ingresso della villa e la sala del ballo, da cui si raggiungono le altre ali.'], links: [[6,0],[6,1],[6,4],[6,5],[0,2],[0,5],[1,4],[2,3],[3,5]], descriptions: ['Buio e passaggi sotterranei.', 'Stanze chiuse e rumori sopra il soffitto.', 'Un riparo appartato e relativamente sicuro.', 'Tombe e percorsi scoperti.', 'Scaffali e stanze dove nascondersi.', 'La serra e i vialetti del giardino.'] },
    wasteland: { start: 6, feast: 1, finale: 5, extra: ['il Deposito', [1.5,1.4,0.4], 'Il cancello iniziale e le scorte, lungo l’autostrada.'], links: [[6,0],[6,1],[6,3],[0,2],[0,3],[1,2],[1,5],[2,4],[3,4],[3,5],[4,5]], descriptions: ['Rottami utili e ripari di fortuna.', 'Asfalto aperto, convogli e poche coperture.', 'Impianti contaminati e strutture instabili.', 'Case vuote in cui trovare riparo.', 'Pochissime risorse e radiazioni elevate.', 'Acqua e passaggi verso il bacino.'] },
    liceo: { start: 5, feast: 0, finale: 5, extra:['le Aule',[1.1,1.3,0.5],'Le classi delle lezioni, delle verifiche e delle interrogazioni.'],links: [[5,0],[5,2],[5,4],[0,1],[0,4],[1,2],[1,4],[2,3],[3,4],[6,2],[6,3],[6,4],[6,5]], descriptions: ['Gare e festa di istituto.', 'Merende e tavoli in cui nascono alleanze.', 'Silenzio e un posto per riprendersi.', 'Esperimenti e occasioni per fare figuracce.', 'Incontri, gossip e cambi d’ora.', 'Banchi, assemblee e convocazioni della Preside.'] },
    ufficio: { start: 1, feast: 2, finale: 0, links: [[0,1],[0,3],[1,2],[1,4],[1,5],[2,4],[2,5],[3,4]], descriptions: ['Presentazioni e verdetti della direzione.', 'Scrivanie, colleghi e sguardi indiscreti.', 'Caffè, scorte e cena aziendale.', 'Colloqui ad alto rischio.', 'Una pausa appartata, finché la stampante collabora.', 'Fuori dagli uffici, con accesso alla cucina e all’open space.'] },
    cyberpunk: { start: 6, feast: 0, finale: 6, extra: ['la Piazza della torre', [1.4,1.3,0.2], 'Il cuore del distretto, sotto la torre del colpo andato male: tutte le strade passano di qui.'], links: [[6,0],[6,1],[6,3],[6,5],[0,1],[0,4],[1,2],[2,3],[2,5],[3,4],[4,5]], descriptions: ['Bancarelle, cibo e roba di contrabbando, ma nessun posto dove nascondersi.', 'Corridoi infiniti e capsule-letto: si dorme al riparo, se si conosce qualcuno.', 'Cure, impianti e diagnosi, in una delle poche stanze ancora sicure.', 'Luci, musica e gente distratta: si incontrano alleati e coltelli.', 'Pezzi di ricambio e armi in quantità, ma i Maelstrom non perdonano gli ospiti.', 'Terminali e linee dati protetti da torrette e ICE: lavoro per chi sa entrare.'] },
  };
  const strip = s => s.replace(/^(?:il |lo |la |l['’]|i |gli |le )/i, '');
  const habitats={
    classico:{water:[2,3],trees:[1,2,3,4],inside:[4]},fantasy:{water:[2,4],trees:[1,2,4],inside:[0,3]},
    scifi:{water:[],trees:[],inside:[0,1,2,3,4,5]},zombie:{water:[2,5],trees:[3,5],inside:[0,1,2,3,4]},
    royale:{water:[2],trees:[4,5],inside:[0,1,2,3,4]},horror:{water:[0,5],trees:[3,5],inside:[0,1,2,4,6]},
    wasteland:{water:[5],trees:[],inside:[2,3,6]},liceo:{water:[1,4],trees:[4],inside:[0,1,2,3,5,6]},ufficio:{water:[2],trees:[5],inside:[0,1,2,3,4]},
    cyberpunk:{water:[],trees:[],inside:[1,2,3,4,5]},
  };
  const escapeRE = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function describe(theme, eco) {
    const def = definitions[theme.id];
    if (!def) throw new Error('Geografia mancante: ' + theme.id);
    const names = theme.lex.luogo.concat(def.extra ? [def.extra[0]] : []);
    return names.map((name, id) => {
      const p = id === theme.lex.luogo.length && def.extra ? def.extra[1] : eco?.zones?.[id] || [1,1,0.5];
      return { id, name, links: def.links.flatMap(([a,b]) => a === id ? [b] : b === id ? [a] : []).sort((a,b) => a-b), resources: p[0], danger: p[1], shelter: p[2], features:Object.keys(habitats[theme.id]).filter(k=>habitats[theme.id][k].includes(id)), description: def.descriptions[id] || def.extra?.[2] || '' };
    });
  }
  function enrich(theme, zones) { return { ...theme, lex: { ...theme.lex, luogo: zones.map(z => z.name) } }; }
  function path(zones, from, to, closed = new Set()) {
    if (!zones[from] || !zones[to] || closed.has(to) && to !== from) return null;
    const queue = [[from]], visited = new Set([from]);
    for (let at = 0; at < queue.length; at++) {
      const route = queue[at], last = route[route.length-1];
      if (last === to) return route;
      for (const next of zones[last].links) if (!visited.has(next) && !closed.has(next)) { visited.add(next); queue.push(route.concat(next)); }
    }
    return null;
  }
  function connected(zones, closed) {
    const open = zones.filter(z => !closed.has(z.id));
    return open.length > 0 && open.every(z => path(zones, open[0].id, z.id, closed));
  }
  function camp(zones,positions,closed=new Set()){
    const candidates=zones.filter(z=>!closed.has(z.id)).map(z=>{
      const routes=positions.map(from=>path(zones,from,z.id,closed));
      return {id:z.id,score:routes.every(Boolean)?z.shelter*2-z.danger*0.45+z.resources*0.1-routes.reduce((n,p)=>n+p.length-1,0)/positions.length*0.2:-Infinity};
    }).filter(x=>Number.isFinite(x.score)).sort((a,b)=>b.score-a.score||a.id-b.id);
    return candidates[0]?.id??null;
  }
  // Lessemi vietati nei repertori condivisi: i testi specifici non vengono
  // sostituiti con sinonimi meccanici che potrebbero rompere grammatica o senso.
  const incompatible = {
    scifi: /\b(?:bosco|boschi|fiume|fiumi|ruscello|lago|palud\w*|cespugli\w*|alber\w*|ram[oi]|foresta|sottobosco|grotta|grotte|pigna|ghiand\w*|radura|dirupo|precipizio|sabbia|liana|liane|nido|vespe|pesca|pescare|conigli\w*|lup[oi]|orso|cinghiale|fontana|falò|fuoco da campo|pioggia|neve|nevica|temporale|grandine|cielo|sole|tramonto|alba|stelle|costellazion\w*|luna|lune|cornucopia|gong)\b/iu,
    fantasy: /\b(?:cornucopia|telecamer\w*|televis\w*|drone|droni|computer|monitor|microfono|riflettor\w*|regista|regia|batteri[ae]|elettric\w*|laser|aereo|elicottero|paracadut\w*|pistola|fucile|proiettil\w*|motosega|smartphone|selfie|frigorifero|munizioni|podcast|download|streaming|hashtag|cellulare|telefono|wifi|wi-fi|walkie[ -]talkie)\b/iu,
    zombie: /\b(?:cornucopia|gong|piattaforma di lancio|spada runica|drago|incantesimo|elfic\w*)\b/iu,
    royale: /\b(?:cornucopia|gong|spada runica|incantesimo|elfic\w*)\b/iu,
    horror: /\b(?:cornucopia|piattaforma di lancio|gong|navetta|reattore|nanobot|radiazioni|mitragliatrice)\b/iu,
    wasteland: /\b(?:cornucopia|gong|foresta elfica|bosco|boschi|sottobosco|liana|liane|prato verde|erba fresca|alber[oi] rigoglios\w*|bacche fresche)\b/iu,
    liceo: /\b(?:sangue|sanguina\w*|cadaver\w*|ammazz\w*|uccid\w*|sbran\w*|decapit\w*|sgozz\w*|fucile|pistola|proiettil\w*|cornucopia)\b/iu,
    ufficio: /\b(?:sangue|sanguina\w*|cadaver\w*|ammazz\w*|uccid\w*|sbran\w*|decapit\w*|sgozz\w*|fucile|pistola|proiettil\w*|cornucopia)\b/iu,
    // Night City: niente boschi né natura selvaggia, niente magia, alieni, astronavi o decompressione.
    cyberpunk: /\b(?:cornucopia|gong|bosco|boschi|foresta|forest\w*|sottobosco|radura|liana|liane|cespugli\w*|alber[oi]|ram[oi]|foglie|quadrifoglio|tana|uccell\w*|tronco|pigna|ghiand\w*|nido di vespe|fiume|fiumi|ruscello|lago|palud\w*|grotta|grotte|dirupo|precipizio|lup[oi]|orso|cinghiale|conigli\w*|cervo|falò|fuoco da campo|incantesim\w*|magi[ac][oaie]?|magich\w*|stregon\w*|strega|elfic\w*|elfo|elfi|drago|draghi|fata|fate|runic\w*|pozione|alien\w*|astronave|navetta|decompression\w*|ossigeno|zombie|zombi|cannone|deserto|dune|duna)\b/iu,
  };
  const offTheme = (text, theme) => !!incompatible[theme.id]?.test(theme.id==='scifi'?text.replace(/pioggia di micrometeoriti/giu,'sciame di micrometeoriti'):text);
  // Varianti editoriali: si sostituiscono locuzioni intere, con i rispettivi
  // articoli, mantenendo azione, tono ed esiti del modello originale.
  const variants={
    fantasy:[
      ['la Cornucopia',"l'Altare delle armi"],['le telecamere elfiche','le sfere divinatorie'],['le telecamere','le sfere divinatorie'],['alle telecamere','alle sfere divinatorie'],['la telecamera','la sfera divinatoria'],['una telecamera','una sfera divinatoria'],['alla telecamera','alla sfera divinatoria'],['le telecamere','le sfere divinatorie'],['La regia','La cerchia dei veggenti'],['la regia','la cerchia dei veggenti'],['il collegamento','la visione'],['un elicottero','una viverna'],['tre paracadute di cibo','tre corvi carichi di provviste'],['un unico paracadute','un unico corvo messaggero'],['Un drone degli sponsor','Un corvo degli sponsor'],['un selfie','un autoritratto magico'],['fa zoom','avvicina la visione'],['in camera','verso una sfera divinatoria'],['Mezza nazione','Mezzo reame'],["Nell'arena c'è una luna sola.",'Nel reame le lune sono due. Per una volta non è un’allucinazione.'],
    ],
    scifi:[
      ['la Cornucopia',"l'Hangar"],['nello stesso cespuglio','dietro lo stesso armadietto'],['ogni albero che incontra','ogni pannello che incontra'],['riposa al sole','riposa sotto una lampada di manutenzione'],['cade da un dirupo','precipita da una passerella'],['rivolto al cielo','rivolto a una telecamera sul soffitto'],['verso il cielo','verso il soffitto'],['contro un albero','contro un montante'],["sull'albero più alto della zona",'su una passerella sopraelevata'],['la corteccia di un albero','il rivestimento isolante di un cavo'],['a duello un albero', 'a duello un montante'],["Vince l'albero",'Vince il montante'],['attraversare il fiume a nuoto','attraversare un modulo in decompressione senza fune di sicurezza'],['Di notte. Vestit[A:o/a].','In pieno ciclo notturno. Senza tuta.'],['a pescare e a raccontarsi','a recuperare razioni da un distributore e a raccontarsi'],['dei funghi trovati in una radura','una coltura sperimentale della Serra idroponica'],['un bagno insieme nel fiume','una pausa insieme nelle docce dei Moduli abitativi'],['la testa nel fiume','la testa in un condotto di scarico'],["bevendo acqua del fiume",'bevendo acqua del ricircolatore'],['inquadra il cielo','inquadra il soffitto'],['dietro un cespuglio','dietro un armadietto'],['sfida un albero a braccio di ferro e lo sradica','strappa un montante dal suo alloggiamento a mani nude'],['sfida un albero a braccio di ferro','prova a piegare un montante a mani nude'],['corde e rami piegati','cavi e molle recuperate'],["filtra l'acqua con sabbia e carbone",'ripristina il filtro del ricircolatore'],['una pioggia di sassi','una raffica di bulloni'],['in un cespuglio','dietro un carrello di manutenzione'],['Il cespuglio era occupato','Il carrello era già occupato'],['sotto il sole senza acqua','tra i moduli senza una bombola di riserva'],['pesta un ramo secco','pesta una fascetta metallica'],['spezza un albero giovane','spezza un tubo dismesso'],["un masso che bloccava l'unica uscita della grotta",'un portello deformato che bloccava il passaggio'],["da un albero all'altro, senza mai toccare terra",'da una passerella all’altra, senza toccare il pavimento'],['su un sasso, poi su un ramo, poi sullo stesso sasso','su un bullone, poi su un cavo, poi sullo stesso bullone'],['Un uccello','Un drone delle pulizie'],['un secondo uccello','un secondo drone'],['un ramo cade','un cavo si stacca'],['al centro della radura','al centro del modulo'],['accende un fuoco con due sassi, caccia un coniglio con un laccio e cucina uno stufato','ripristina un fornello di emergenza e prepara uno stufato con le razioni'],['prova a cacciare un coniglio. Il coniglio','prova a catturare un drone delle consegne. Il drone'],["se il sole giri intorno all'arena o il contrario",'se la stazione giri intorno al pianeta o il contrario'],['su tutti gli alberi della zona','su tutti i pannelli della zona'],['da un albero su cui','da una passerella su cui'],['Morde un ramo','Morde un cavo'],['a un ramo a quattro metri', 'a un cavo a quattro metri'],['un cespuglio con la forma di','un carrello coperto da un telo con la forma di'],['gli alberi l[A:o/a] stiano spiando. Gli alberi hanno le telecamere','i pannelli l[A:o/a] stiano spiando. I pannelli hanno le telecamere'],['prende a pugni un albero per sfogarsi. L’albero cade','prende a pugni un pannello per sfogarsi. Il pannello cede'],["prende a pugni un albero per sfogarsi. L'albero cade",'prende a pugni un pannello per sfogarsi. Il pannello cede'],['a ogni sasso della zona. Al tramonto','a ogni bullone della zona. A fine ciclo'],['il sasso più grosso','il bullone più grosso'],['nascoste negli alberi','incassate nei pannelli'],['una pigna','un bullone'],['da un albero dritt[A:o/a]','da una scala dritt[A:o/a]'],["da una parte all'altra del fiume",'dalle due parti di un portello bloccato'],['Nessuno dei due sa nuotare','Nessuno dei due sa sbloccarlo'],['un cespuglio pieno di bacche','un distributore pieno di snack'],['Le bacche erano lassative','Gli snack erano lassativi'],['fino al tramonto','fino a fine ciclo'],['dietro un albero','dietro un montante'],['a un ramo','a una sbarra'],["all'alba",'al cambio di ciclo'],["prima dell'alba",'prima del cambio di ciclo'],['alla luce fioca delle stelle','alla luce di un terminale'],['guarda le stelle e ne sceglie una','osserva una carta stellare e sceglie una stella'],['contro il gelo','contro le correnti dei condotti'],['un letto di foglie, un tetto di rami e un fuoco che non fa fumo','un giaciglio di teli isolanti e un riparo dalle ventole'],['alla luna. Poi alla seconda luna. Nell’arena c’è una luna sola','al pianeta. Poi al suo riflesso nell’oblò. I brindisi sono due, il pianeta uno'],["alla luna. Poi alla seconda luna. Nell'arena c'è una luna sola",'al pianeta. Poi al suo riflesso nell’oblò. I brindisi sono due, il pianeta uno'],['a guardare le stelle passare','a guardare un planetario sul terminale'],['Ogni volta che ne passa una','Ogni volta che compare una stella'],["le stelle dell'arena",'la carta stellare del terminale'],['travestiti da cespugli','nascosti sotto teli di manutenzione'],['Un ramo si spezza','Un cavo si stacca'],['Il cannone suonerà','Il computer registrerà la perdita del segnale vitale'],['suona il cannone','si spegne il segnale vitale'],
    ],
    zombie:[['la Cornucopia','la Piazza']],royale:[['la Cornucopia',"l'Aeroporto"]],horror:[['la Cornucopia','il Salone']],
    cyberpunk:[['la Cornucopia','la Piazza della torre'],['gli sponsor','i fixer'],['Uno sponsor anonimo','Un fixer anonimo'],['Uno sponsor dal gusto discutibile','Un fixer dal gusto discutibile'],['Due sponsor svengono','Due fixer smettono di ridere'],['tre paracadute di cibo','tre droni con il cibo'],['un unico paracadute','un unico drone'],['Lo share sale','Le visualizzazioni salgono'],['La regia stacca','La diretta del fixer stacca'],['cerca di capire le stelle dell\'arena e scopre che sono disposte a forma di logo dello sponsor principale','cerca di leggere le insegne del quartiere e scopre che compongono il logo di una corporazione'],['alla luce fioca delle stelle','alla luce fioca delle insegne'],['guarda le stelle e ne sceglie una','guarda le insegne e ne sceglie una'],['da una pozza di fango','da una pozza di liquame'],['corpo a corpo nel fango','corpo a corpo in una pozza d\'acqua sporca'],['a rotolarsi nel fango','a rotolarsi in una pozzanghera'],['torna dalla caccia con abbastanza carne per tre giorni e una pelliccia nuova','torna da un deposito abbandonato con abbastanza carne in scatola per tre giorni']],
    wasteland:[['la Cornucopia','il Deposito'],['nel Bosco','tra i ruderi della Città fantasma'],['in un bosco','tra i ruderi della Città fantasma'],['nel sottobosco','tra i rottami della Discarica']],
  };
  const sharedCorrections=[
      ['{A} si mimetizza così bene che un altro concorrente [A:gli/le] si siede accanto senza vederl[A:o/a]. {A} ne approfitta per sfilargli il kit medico dalla tasca.','{A} cerca senza richiamare attenzione fra gli oggetti abbandonati e recupera {med}.'],
      ['{A} cerca di mimetizzarsi in un cespuglio. Il cespuglio era occupato da un altro concorrente. Imbarazzo, poi fuga.','{A} tenta di nascondere i propri movimenti, ma il materiale fruscia troppo e deve interrompere la ricerca.'],
      ['{A} sgattaiola tra i corpi e ruba un kit medico senza che nessuno se ne accorga.','{A} si infila tra le casse e recupera {med} senza richiamare attenzione.'],
      ['{A} prova a rubare un kit medico, ma pesta un piede a qualcuno e deve fuggire a mani vuote.','{A} tenta di raggiungere una cassetta incustodita, ma scivola, si ferisce contro uno spigolo e deve rinunciare.'],
      ['{A} si infila nel rifugio di un rivale addormentato e ne esce con {arma}.','{A} apre in silenzio un vecchio involto incustodito e trova {arma}.'],
      ['{A} si infila nel rifugio di un rivale, inciampa in una pentola e fugge sotto una pioggia di sassi.','{A} tenta di controllare un vecchio involto, ma urta un fermo metallico, si ferisce e deve fermarsi.'],
      ['Di notte {A} entra in un accampamento nemico e ne esce con le provviste.','Di notte {A} controlla il materiale rimasto in un accampamento abbandonato e recupera {cibo}.'],
      ['Di notte {A} entra in un accampamento nemico, pesta una mano e deve scappare inseguit[A:o/a].','Di notte {A} controlla un accampamento abbandonato, ma inciampa in un ostacolo, si ferisce e rinuncia alla ricerca.'],
      ['{A} abbandona {B} nel sonno portandosi via tutto.','{A} rompe il patto con {B} mentre {B} dorme.'],
      ["dentro c'è {cibo}",'all’interno trova {cibo}'],
      ['prepara per settimane','prepara con cura'],
  ];
  function adaptText(text,theme){
    let out=text;
    for(const [from,to] of sharedCorrections)out=out.replace(from,to);
    if(theme.id==='scifi')out=out.replace('Un fulmine cade a un metro da','Una scarica elettrica colpisce un pannello accanto a').replace('Un fulmine cade su','Una scarica elettrica colpisce').replace('dorme sul terreno umido','dorme su un pannello bagnato').replace('vicino al fuoco','accanto a una bocchetta tiepida').replace('accanto al fuoco','accanto a una bocchetta tiepida').replace('prima ancora che si aprano le capsule','appena esce dalla capsula');
    if(theme.soft)out=out.replace('vicino al fuoco',theme.id==='liceo'?'accanto a un tavolo di studio':'accanto a un tavolo della pausa').replace('Attorno al fuoco,','Durante una pausa,').replace("guarda il fuoco di un'altra alleanza in lontananza","guarda un altro gruppo parlare in lontananza");
    if(theme.id==='liceo')for(const [from,to] of [
      ['Da oggi non verrà mai più interrogat[A:o/a] a sorpresa.','Avrà un riferimento in più per prepararsi agli imprevisti.'],
      ['Al mattino arrivano a scuola tenendosi per mano.','Fra un messaggio e l’altro, si prendono per mano.'],
      ['Nessuno riuscirà a scalfirl[A:o/a] per almeno una settimana.','La sua reputazione ha una protezione in più.'],
      ['sul bus del ritorno','in un angolo tranquillo della scuola'],
      ["si contendono l'ultimo posto in pullman per la gita","si contendono l'ultima prenotazione per la gita"],
      ['Lo sciopero dei bus','Il controllo dei ritardi'],
      ['I bus scioperano proprio il giorno della verifica.','La scuola verifica le giustificazioni dei ritardi dovuti allo sciopero.'],
      ['arriva con due ore di ritardo e viene bocciat[A:o/a]','non riesce a giustificare il ritardo e viene esclus[A:o/a] dai giochi'],
      ['arriva in ritardo e prende una nota','non chiarisce il ritardo e prende una nota'],
      ['arriva a piedi con largo anticipo','presenta una giustificazione valida'],
      ['resta a casa troppi giorni e viene esclus[A:o/a] dai giochi','non riesce a recuperare le verifiche perse e viene esclus[A:o/a] dai giochi'],
      ['La gita disastrosa','La gita annullata'],
      ['La gita finisce con il pullman in panne in autostrada.','La gita viene annullata: a scuola cominciano le contestazioni sui rimborsi.'],
      ["si perde all'autogrill e non torna più in classe",'rifiuta ogni chiarimento sulle quote e viene esclus[A:o/a] dai giochi'],
      ['dorme sul pullman e si sveglia con la faccia disegnata','perde la calma durante la discussione sui rimborsi'],
      ['trova un passaggio con i genitori di un amico','chiarisce la propria quota e supera la contestazione'],
    ])out=out.replace(from,to);
    if(theme.id==='ufficio')for(const [from,to] of [
      ['Lo smart working forzato','La prova di collegamento'],
      ['Tutti a casa per un mese, con controlli a sorpresa via webcam.','L’azienda impone una prova di collegamento in video dalle postazioni di lavoro.'],
      ['viene sorpres[A:o/a] in pigiama durante una call con il cliente','ignora le regole della call con il cliente e viene licenziat[A:o/a]'],
      ['lavora meglio da casa che in ufficio','gestisce il collegamento senza imprevisti'],
      ['lavora da casa per tutta la settimana','limita i contatti e porta avanti il proprio lavoro'],
      ['resta a casa troppo a lungo e il suo posto viene assegnato a un altro','non recupera gli incarichi persi e il suo posto viene assegnato a un altro'],
      ['resta a casa troppo a lungo e viene sostituit[A:o/a]','non recupera gli incarichi persi e viene sostituit[A:o/a]'],
      ['Il Direttore invita tutti a cena: a fine serata, consegna delle buste.','Il Direttore impone un controllo aziendale e ne comunica gli esiti in buste chiuse.'],
    ])out=out.replace(from,to);
    if(theme.id==='fantasy')out=out.replace('Il pubblico la scarica tre milioni di volte.','I bardi del reame la ricantano in ogni taverna.').replace('logo dello sponsor principale','sigillo del mecenate del reame').replace('pecore sono mutanti','pecore sono stregate').replace('Il programma di cucina viene rinnovato per tre stagioni.','I cantastorie chiedono altre tre esibizioni.').replace('Gli ascolti fanno il record della stagione.','I bardi ne parleranno per il resto della stagione.');
    const editorial=theme.id==='fantasy'?[["Il blackout delle telecamere","Il silenzio delle sfere"],['niente telecamere sui dettagli, niente limiti','le sfere divinatorie vengono oscurate, e non ci sono limiti'],['un nuovo regista','un nuovo cerimoniere'],['di regia','del cerimoniere'],['i droni','i corvi messaggeri']]:theme.id==='scifi'?[['Pioggia di detriti','Sciame di detriti'],['La pioggia di bulloni','La raffica di bulloni'],['La pioggia di coriandoli','Lo sciame di coriandoli'],['La pioggia di sangue','Gli ugelli scarlatti'],["Una pioggia di sangue animale cade sull'arena",'Gli ugelli di manutenzione spruzzano sangue animale nei moduli']]:[];
    for(const [from,to] of editorial.concat(variants[theme.id]||[])){
      out=out.split(from).join(to);if(from.includes("'"))out=out.split(from.replaceAll("'",'’')).join(to);
      const capital=from[0].toUpperCase()+from.slice(1);if(capital!==from)out=out.split(capital).join(to[0].toUpperCase()+to.slice(1));
    }
    return out;
  }
  const who = rs => rs.map(i => '{' + String.fromCharCode(65+i) + '}').join(' e ');
  function functionalText(ev, branch, theme) {
    const p = branch || ev, parts = [], soft = !!theme.soft;
    for (const k of (branch ? ev.kills.concat(p.kills) : ev.kills)) parts.push(who(k.by) + (k.betray ? (k.by.length>1?' tradiscono ':' tradisce ') : soft ? (k.by.length>1?' mettono fuori gioco ':' mette fuori gioco ') : (k.by.length>1?' tendono un agguato fatale a ':' tende un agguato fatale a ')) + who(k.v) + '.');
    for (const i of (branch ? ev.dies.concat(p.dies) : ev.dies)) parts.push(who([i]) + (soft ? ' perde definitivamente il posto nella gara.' : ' non supera il pericolo e perde la vita.'));
    const fx = branch ? ev.fx.concat(p.fx) : ev.fx;
    for (const f of fx) {
      const a = who([f.r[0]]), b = f.r.length > 1 ? who([f.r[1]]) : '', item = '{' + f.item + (f.t === 'gain' ? '' : ':' + String.fromCharCode(65 + (f.t === 'steal' ? f.r[1] : f.r[0]))) + '}';
      const status = { ferito: soft ? 'scosso dopo una figuraccia' : 'ferito', malato: 'malato', avvelenato: soft ? 'in difficoltà per uno scherzo di cattivo gusto' : 'avvelenato', ubriaco: 'ubriaco', affamato: 'senza energie per la fame', sconvolto: 'sconvolto', lutto: soft ? 'abbattuto per chi è uscito dai giochi' : 'in lutto' }[f.s] || 'in difficoltà';
      const text = {
        al: who(f.r) + ' decidono di allearsi.', br: a + ' rompe la propria alleanza.',
        gain: a + ' recupera ' + item + '.', lose: a + ' perde ' + item + '.', consume: a + ' usa ' + item + '.',
        steal: a + ' sottrae ' + item + ' a ' + b + '.', give: a + ' consegna ' + item + ' a ' + b + '.',
        status: a + ' resta ' + status + '.', cure: a + ' riesce a rimettersi in sesto.',
        hit: a + (soft ? ' mette in difficoltà ' : ' ferisce ') + b + '.', poison: a + (soft ? ' prepara uno scherzo che indebolisce ' : ' avvelena ') + b + '.',
        save: a + ' aiuta ' + b + ' a superare il pericolo.', love: a + ' e ' + b + ' si dichiarano e si mettono insieme.',
        forgive: a + ' perdona ' + b + '.', repay: a + ' salda il proprio debito con ' + b + '.', debt: a + ' resta in debito con ' + b + '.',
        rel: a + ' e ' + b + (f.v > 0 ? ' trovano un’intesa.' : ' entrano in contrasto.'),
        bondfx: a + (f.v >= 0 ? ' sente crescere ' : ' sente diminuire ') + ({f:'la fiducia in ',r:'il rispetto per ',p:'la paura di ',t:'l’attrazione per '}[f.k] || 'il legame con ') + b + '.',
        mkpromise: a + ' fa a ' + b + ' una promessa di ' + ({fedelta:'fedeltà',protezione:'protezione',vendetta:'vendetta',cibo:'condivisione delle provviste'}[f.k] || f.k) + '.',
        breakup: a + ' e ' + b + ' si lasciano.', reunite: a + ' e ' + b + ' tornano insieme.', star: a + ' conquista l’attenzione di chi segue la gara.',
        vital: a + ({hp:f.v>=0?(soft?' recupera credibilità.':' si riprende dalle ferite.'):(soft?' perde credibilità.':' vede peggiorare la propria salute.'),en:f.v>=0?' recupera energie.':' si affatica.',mo:f.v>=0?' ritrova fiducia.':' si scoraggia.',food:f.v>=0?' riesce a sfamarsi.':' sente il peso della fame.',pr:f.v>=0?' sente aumentare la pressione dell’arena.':' ritrova un po’ di sollievo.'}[f.k]),
        move: '',
      }[f.t];
      if (text) parts.push(text);
    }
    if (!parts.length) {
      const scenes = {
        scifi: ['{A} controlla le giunture del modulo. Il rumore di fondo non promette nulla di buono.', '{A} si ferma ad ascoltare i condotti. Per una volta, sente solo le ventole.', '{A} cerca un angolo lontano dalle luci di emergenza e riprende fiato.'],
        fantasy: ['{A} osserva i segni lasciati dalla magia e decide di non toccarli.', '{A} sussurra una vecchia formula per farsi coraggio. Almeno la voce non trema.', '{A} si concede una pausa e controlla i sentieri del reame.'],
        cyberpunk: ['{A} controlla il diagnostico degli impianti e aspetta che le ottiche smettano di sfarfallare.', '{A} si ferma sotto una tettoia e ascolta il ronzio delle insegne. Per ora, nessun drone.', '{A} cambia vicolo due volte prima di fermarsi a riprendere fiato.'],
        _: ['{A} studia i passaggi della zona prima di fare la prossima mossa.', '{A} cerca un posto tranquillo e riprende fiato.', '{A} ascolta i rumori intorno e decide di aspettare.'],
      };
      let h = 0; for (const c of ev.text) h = (h*31+c.charCodeAt(0)) >>> 0;
      parts.push((scenes[theme.id] || scenes._)[h%3]);
    }
    // L'accordo è delegato alla grammatica originale, anche per il neutro.
    return parts.join(' ').replace(/\{([A-F])\} resta (ferito|malato|avvelenato|ubriaco|sconvolto|scosso)\b/g, (_,r,s) => '{'+r+'} resta '+s.slice(0,-1)+'['+r+':o/a]');
  }
  const aliasCache=new WeakMap(),poolCache=new WeakMap();
  const genericPlaces={
    'Paludi':['palude'],'Rovine':['rovina'],'Foresta elfica':['foresta'],'Lago nebbioso':['lago'],'Miniere':['miniera'],'Palude stregata':['palude'],
    'Metropolitana':['metro'],'Villaggio costiero':['villaggio'],'Aeroporto':['hangar'],'Autostrada spezzata':['autostrada'],'Laboratorio di chimica':['laboratorio'],'Aule':['aula','classe'],
  };
  function aliases(zones) {
    if(aliasCache.has(zones))return aliasCache.get(zones);
    const list=zones.map(z => {
      const bare = strip(z.name), variants = [bare];
      const short = { 'Torre in rovina':['Torre'], 'Picco del drago':['Picco'], 'Lago nebbioso':['Lago nebbioso'], 'Altare delle armi':['Altare'], 'Ponte di comando':['Ponte di comando'], 'Centro commerciale':['Centro commerciale'], 'Città fantasma':['Città fantasma'], 'Mercato di Kabuki':['Mercato'], 'Clinica del ripperdoc':['Clinica'], 'Club della braindance':['Club'], 'Officina dei Maelstrom':['Officina'], 'Nodo dati corporativo':['Nodo dati'], 'Piazza della torre':['Piazza'] }[bare];
      if (short) variants.push(...short);
      variants.push(...genericPlaces[bare]||[]);
      return { zone:z.id, re:new RegExp('(?<![\\p{L}])(?:'+variants.map(escapeRE).join('|')+')(?![\\p{L}])','giu') };
    });
    aliasCache.set(zones,list);return list;
  }
  function mentions(text, zones) {
    const found = [];
    for (const {zone,re} of aliases(zones)) for (const m of text.matchAll(re)) found.push({zone,index:m.index,length:m[0].length});
    const accepted=[];for(const x of found.sort((a,b)=>a.index-b.index||b.length-a.length))if(!accepted.some(p=>x.index<p.index+p.length&&p.index<x.index+x.length))accepted.push(x);
    return accepted;
  }
  function pickLex(lex,key,zone,theme,zones,rng){
    if(key!=='rifugio'&&key!=='trappola')return rng.pick(lex[key]||['qualcosa']);
    const candidates=(lex[key]||[]).filter(text=>mentions(text,zones).every(m=>m.zone===zone)&&(!/\b(?:albero|alberi|rami|ramo|tronco|pianta carnivora)\b/iu.test(text)||zones[zone].features.includes('trees')));
    return rng.pick(candidates.length?candidates:[key==='trappola'?(theme.soft?'un tranello preparato di nascosto':'un ostacolo nascosto'):theme.soft?'un angolo tranquillo':theme.id==='scifi'?'un vano di manutenzione':'un riparo di fortuna']);
  }
  function rule(text, zones, explicit) {
    const found = mentions(text, zones);
    const needs=[];
    if(/\b(?:nuota|nuotano|pesca|pescano|pescare|annega|annegano|riva|riva del|corrente del|letto del fiume|attraversa il fiume|si tuffa|si tuffano)\b/iu.test(text)) needs.push('water');
    if(/\b(?:si arrampica|si arrampicano|sale|salgono|cade|cadono|dorme|dormono|si nasconde|si nascondono|precipita|precipitano)[^.!?]{0,45}\b(?:albero|alberi|ramo|rami|tronco)\b|\b(?:abbatte un albero|nido di vespe|lancia una pigna|sottobosco)\b/iu.test(text)) needs.push('trees');
    const scatter=/scappano in direzioni opposte|si separano e (?:fuggono|scappano)|fuggono in direzioni opposte/iu.test(text);
    const direct=[...text.matchAll(/\{([A-F])\}\s+(?:se ne va|si allontana|si dilegua|si defila|abbandona il campo|scappa via)/giu)].map(m=>m[1].charCodeAt(0)-65);
    const coordinated=text.match(/^\{([A-F])\}[^.!?]{0,140}(?:e si dilegua|e si defila|e scappa via|poi si allontana|poi se ne va)/iu);
    const depart=[...new Set(direct.concat(coordinated?[coordinated[1].charCodeAt(0)-65]:[]))];
    if (explicit && (explicit.at!=null||explicit.travel!=null)) return { at:explicit.at??null, travel:explicit.travel??null,needs,scatter,depart };
    const classroom=zones.find(z=>strip(z.name)==='Aule');
    if(!found.length&&classroom&&/\b(?:risponde a un['’]interrogazione|prende un\w* \w+ all['’]interrogazione|durante (?:la|una) verifica)\b/iu.test(text))return {at:classroom.id,travel:null,needs,scatter,depart};
    if (!found.length) return { at:null, travel:null,needs,scatter,depart };
    const last = found[found.length-1];
    const prefix = text.slice(Math.max(0,last.index-100),last.index);
    const moving = /(?:corre|fugge|scappa|raggiunge|raggiungono|arriva|arrivano|torna|tornano|entra|entrano|si (?:dirige|dirigono|sposta|spostano|rifugia|rifugiano|nasconde|nascondono)|segue|seguono)[^.!?]{0,65}(?:in|nel|nella|nelle|nello|nei|nell['’]|verso|fino a|alla|all['’]|al|sul|sulla)\s*$/iu.test(prefix);
    return { at:moving ? (found.length > 1 ? found[0].zone : null) : found[0].zone, travel:moving ? last.zone : null,needs,scatter,depart };
  }
  function prepare(ev, theme, zones) {
    const e = { ...ev };
    if(ev.origin!=='custom'){e.text=adaptText(ev.text,theme);if(ev.test){e.okText=adaptText(ev.okText,theme);e.koText=adaptText(ev.koText,theme);}if(e.text!==ev.text)e.adapted=true;}
    if(ev.origin!=='custom'&&ev.fx.some(f=>f.t==='br')){const changed=e.text.replace(/, lasciando \{([A-F])\} da sol\[[A-F]:o\/a\]/g,' e abbandona il patto con {$1}');if(changed!==e.text){e.text=changed;e.adapted=true;}}
    if (ev.origin !== 'custom' && (offTheme(e.text,theme) || ev.test && (offTheme(e.okText,theme)||offTheme(e.koText,theme)))) {
      if (ev.test) { e.okText=functionalText(ev,ev.ok,theme); e.koText=functionalText(ev,ev.ko,theme); e.text=e.okText+' || '+e.koText; }
      else e.text=functionalText(ev,null,theme);
      e.adapted = true;
    }
    e.space = e.test ? [rule(e.okText,zones,e.location),rule(e.koText,zones,e.location)] : [rule(e.text,zones,e.location)];
    if(ev.origin==='custom'&&e.location&&Object.values(e.location).some(z=>!zones[z]))throw new Error('Evento personalizzato con zona inesistente: '+e.text);
    if(ev.origin!=='custom'&&!zones.some(z=>e.space.every(s=>(s.at==null||s.at===z.id)&&(s.travel==null||s.travel===z.id||z.links.includes(s.travel))&&s.needs.every(k=>zones[s.travel??z.id].features.includes(k))))) {
      if(e.test){e.okText=functionalText(ev,ev.ok,theme);e.koText=functionalText(ev,ev.ko,theme);e.text=e.okText+' || '+e.koText;}else e.text=functionalText(ev,null,theme);
      e.adapted=true;e.space=e.test?[rule(e.okText,zones,e.location),rule(e.koText,zones,e.location)]:[rule(e.text,zones,e.location)];
    }
    return e;
  }
  function preparePools(pools, theme, zones) {
    const key=JSON.stringify(zones.map(z=>[z.name,z.features]));
    const cached=poolCache.get(pools);if(cached?.key===key)return cached.out;
    const out = { ...pools, lex:{...pools.lex,luogo:zones.map(z=>z.name),med:pools.world?pools.lex.med:[theme.soft?'un aiuto per riprendersi':theme.id==='fantasy'?'una pozione curativa':theme.id==='cyberpunk'?'un iniettore medico':'un kit medico'],trap:pools.world?pools.lex.trap:theme.lex.trappola} };
    for (const [k,v] of Object.entries(pools)) if (Array.isArray(v) && k !== 'disasters') out[k]=v.map(e=>prepare(e,theme,zones));
    out.disasters=pools.disasters.map(d=>({...d,n:adaptText(d.n,theme),intro:adaptText(d.intro,theme),out:d.out.map(e=>prepare(e,theme,zones))}));
    poolCache.set(pools,{key,out});return out;
  }
  function create({theme, zones, T, closed, phase, hasMap, onMap, onEnter=()=>{}}) {
    let seq=0, used=new Map();
    const data={version:1,zones:zones.map(z=>({...z,links:z.links.slice()})),start:Object.fromEntries(T.map(t=>[t.id,t.zone])),moves:[],deaths:[],closures:[]};
    const reset=()=>{used=new Map();};
    const budget=t=>t.en<(theme.soft?3:5)*(t.en<20?1.2:1)*(hasMap(t)?0.75:1)?0:Math.max(0,2-(used.get(t.id)||0));
    function move(t,to,reason,options={}) {
      if (!t.alive || t.hp<=0 || to===t.zone) return null;
      if(closed.has(to))return null;
      const route=path(zones,t.zone,to,options.mode==='evacuate'?new Set():closed); if (!route || route.length<2) return null;
      const hops=options.forced ? route.length-1 : Math.min(options.steps||1,budget(t),route.length-1);
      if (!hops) return null;
      let last=null;
      for(let i=1;i<=hops;i++){
        if(!t.alive||t.hp<=0)break;
        const from=t.zone,dest=route[i],cost=Math.round((theme.soft?3:5)*(t.en<20?1.2:1)*(hasMap(t)?0.75:1)*100)/100;
        if(!options.forced&&t.en<cost)break;
        const paid=Math.min(Math.max(0,t.en),cost);t.en=Math.max(0,t.en-cost);t.zone=dest;used.set(t.id,(used.get(t.id)||0)+1);
        last={seq:seq++,ph:phase(),id:t.id,from,to:dest,path:[from,dest],reason,mode:options.mode||'goal',cost:paid,target:options.target||null};
        data.moves.push(last);if(hasMap(t))onMap(t,last);onEnter(t,last);
      }
      return last;
    }
    function accepts(ev,roles) {
      const z=roles[0].zone;
      if (closed.has(z)||roles.some(t=>t.zone!==z)) return false;
      return (ev.space||[rule(ev.text,zones,ev.location)]).every(s=>{
        if (s.at!=null&&s.at!==z) return false;
        const location=s.travel??z;
        if ((s.needs||[]).some(k=>!zones[location]?.features.includes(k))) return false;
        if(s.scatter&&(zones[z].links.filter(x=>!closed.has(x)).length<2||roles.some(t=>budget(t)<1)))return false;
        if((s.depart||[]).some(i=>!roles[i]||budget(roles[i])<(s.travel!=null&&s.travel!==z?2:1)||!zones[location].links.some(x=>!closed.has(x))))return false;
        if (s.travel==null||s.travel===z) return true;
        const p=path(zones,z,s.travel,closed);
        return p&&p.length===2&&roles.every(t=>budget(t)>=1);
      });
    }
    function locate(people,zone) {
      const positions=Object.fromEntries(people.map(t=>[t.id,t.zone]));
      const unique=[...new Set(Object.values(positions))];
      return {seq:seq++,zone:zone??(unique.length===1?unique[0]:null),positions};
    }
    function death(t){data.deaths.push({seq:seq++,ph:phase(),id:t.id,zone:t.zone});}
    function closure(zone,reason='tempesta'){closed.add(zone);data.closures.push({seq:seq++,ph:phase(),zone,reason});}
    return {data,reset,budget,move,accepts,locate,death,closure};
  }
  G.LOS_GEOGRAPHY={definitions,describe,enrich,path,connected,camp,offTheme,adaptText,functionalText,mentions,rule,pickLex,prepare,preparePools,create,strip};
  if(typeof module==='object'&&module.exports) module.exports=G.LOS_GEOGRAPHY;
})(typeof window!=='undefined'?window:globalThis);
