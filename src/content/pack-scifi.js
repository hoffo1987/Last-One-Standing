/* Stazione Orbitale — pacchetto esteso. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'scifi',
    ev: {
      b: `
1 +amuleto:A | {A} si aggancia al polso {amuleto} prima ancora che si aprano le capsule.
1 s:A=ferito | {A} esce dalla capsula, dimentica che la gravità è doppia e cade di faccia.
2 k:A>B | {A} spinge {B} dentro il tubo di scarico dei motori proprio mentre si accende.
2 save:A>B | {A} afferra {B} per la tuta mentre sta per essere risucchiat[B:o/a] fuori da un portellone.
1 @show star:A | {A} esce dalla capsula con una capriola a gravità zero. Dieci su dieci dalla giuria.
2 al:AB @int | {A} e {B} scoprono di avere lo stesso modello di casco e lo prendono come un segno.
`,
      d: `
1 @int +mappa:A | {A} hackera il computer di bordo e scarica {mappa}.
1 @mad | {A} insegna all'intelligenza artificiale della stazione a raccontare barzellette. Ora ne racconta una ogni dieci minuti, a tutto volume.
1 s:A=malato | {A} mangia un tubetto di gel proteico scaduto da due secoli.
1 +cibo:A @luck | {A} trova una scorta di razioni liofilizzate gusto "pizza". Sanno di cartone. Cartone alla pizza.
1 d:A *0.5 | {A} preme il pulsante rosso con scritto "NON PREMERE". Lo dice anche la scritta, dopo.
1 @show star:A | {A} fa una passeggiata spaziale solo per farsi una foto con la Terra sullo sfondo.
1 +esplosivo:A @int | {A} smonta un estintore e ricava {esplosivo}. Lo tiene nel taschino. Coraggioso.
1 s:A=ferito | {A} prova a usare un tostapane alieno. Il tostapane prova a usare {A}.
1 need:A=ferito +med:A cure:A *2 | {A} si infila in un pod medico automatico. Il pod canta mentre lavora.
1 @cow | {A} si nasconde dentro un frigorifero per tutta la giornata. Esce surgelat[A:o/a] ma viv[A:o/a].
2 k:A>B @int | {A} riprogramma un robot delle pulizie per aspirare {B}. Il robot è molto zelante.
2 hit:A>B @agg | {A} spara a {B} con una pistola laser regolata male: l[B:o/a] colpisce, ma soltanto in pieno sedere.
2 love:AB | {A} e {B} restano chius[AB:i/e] per ore in un ascensore guasto. Ne escono una coppia.
2 couple:AB @show | {A} e {B} si baciano a gravità zero ruotando lentamente su se stessi. Il pubblico applaude in piedi.
2 grudge:A>B k:A>B *3 | {A} disattiva la gravità nel modulo di {B} e poi la riattiva di colpo. Per {caro:A}.
2 grudge:A>B hit:A>B *2 | {A} hackera la tuta di {B} per {caro:A}: per un'ora la tuta canta inni militari e stringe dove non dovrebbe.
2 save:A>B @int | {A} ripara al volo la bombola di {B}, che stava finendo l'ossigeno.
2 steal:A<B @stl | {A} si fa aprire il blocco di sicurezza di {B} con un falso aggiornamento e si prende {arma:B}.
2 repay:A>B give:A>B=med | {A} consegna a {B} un iniettore di nanomedicina: "Così siamo pari".
2 feared:B @cow | {A} vede {B} sulle telecamere di sicurezza e si chiude nel bagno di servizio fino a sera.
2 traitor:B rel:AB-30 | {A} pubblica sul canale interno della stazione una lista dei tradimenti di {B}.
2 enemy:AB | {A} e {B} si sparano da un capo all'altro dell'Hangar per un'ora intera senza colpirsi. Le batterie finiscono contemporaneamente.
3 al:ABC @int | {A}, {B} e {C} si alleano per riprendere il controllo del Ponte di comando. Litigano su chi farà il capitano.
3 k:AB>C | {A} distrae {C} parlando di motori a curvatura mentre {B} apre il portellone sbagliato.
3 couple:AB hit:C>A | {C} sabota la tuta di {A} per gelosia di {B}. La tuta esplode in coriandoli. Poi in fiamme.
1 con:A=mappa +med:A | Grazie a {mappa:A}, {A} trova un'infermeria che non compare su nessun altro schema.
2 veleno:A k:A>B @stl *1.5 | {A} carica {veleno:A} nel distributore d'acqua di {B}.
3 esplosivo:A k:A>BC | {A} piazza {esplosivo:A} sul pavimento del modulo dove dormono {B} e {C}. Il modulo diventa due moduli.
1 need:A=affamato @mad | Affamat[A:o/a], {A} mangia un tubetto di dentifricio spaziale. Ha un ottimo alito e un pessimo umore.
2 friend:AB @show | {A} e {B} inventano un nuovo sport a gravità zero. Il pubblico chiede che diventi olimpico.
`,
      n: `
1 | {A} guarda una tempesta solare dall'oblò e pensa che, in fondo, è bellissima.
1 d:A *0.5 | {A} si addormenta nella camera di decompressione credendo fosse un ripostiglio. Al ciclo di pulizia, non c'è più.
2 couple:AB | {A} e {B} passano la notte a guardare le stelle passare. Ogni volta che ne passa una, {A} esprime un desiderio. Quasi tutti riguardano {B}.
2 grudge:A>B | {A} lascia un messaggio nel registro vocale della stazione: "Sto arrivando, {B}."
2 k:A>B @stl | {A} spegne il supporto vitale del modulo di {B} e si allontana fischiettando.
`,
      f: `
2 k:A>B | {A} e {B} si contendono la stessa cassa. {A} usa la cassa come arma.
1 +amuleto:A | Nella cassa di {A} c'è {amuleto}, ancora nella confezione.
`,
      ds: `
1 con:A=mappa | Seguendo {mappa:A}, {A} raggiunge l'unica zona sicura della stazione.
2 save:A>B | {A} chiude il casco di {B} un attimo prima che la pressione crolli.
`,
    },
    dis: `
Il buco nel pavimento | Il pavimento dell'Hangar si apre sullo spazio aperto. | {A} viene risucchiat[A:o/a] nel vuoto e diventa una stella cadente. | {A} si aggrappa a un cavo con le dita congelate. | {A} si trovava già su una passerella.
L'IA si innamora | L'intelligenza artificiale della stazione si innamora di un concorrente e diventa gelosissima di tutti gli altri. | {A} viene giudicat[A:o/a] una rivale in amore e chiusa fuori dal modulo. | {A} riceve una scarica elettrica di avvertimento. | {A} è la persona amata dall'IA, e ne approfitta.
Il bagno quantico | Il bagno della stazione apre un varco su un universo parallelo. | {A} entra in bagno e non torna. Forse sta benissimo altrove. | {A} torna dal bagno con un gemello malvagio, che l[A:o/a] prende a pugni e sparisce. | {A} decide di trattenersi.
La pioggia di bulloni | I sistemi di riparazione impazziscono e lanciano bulloni a velocità supersonica. | {A} viene colpit[A:o/a] da un bullone in piena fronte. | {A} viene ferit[A:o/a] da una pioggia di viti. | {A} si ripara dietro una lastra blindata.
Gli alieni turisti | Una navetta di turisti alieni attracca e comincia a "fare foto" con un flash che disintegra. | {A} viene fotografat[A:o/a] con il flash. | {A} viene fotografat[A:o/a] di sfuggita e perde le sopracciglia. | {A} si mette in posa senza flash e ottiene un autografo.
Il gas esilarante | Un guasto riempie le condotte di gas esilarante. | {A} ride così tanto da dimenticarsi di respirare. | {A} ride fino a slogarsi la mascella. | {A} indossa il casco e guarda gli altri ridere. | sconvolto
Lo spazzino | Il robot spazzino della stazione decide che i concorrenti sono spazzatura. | {A} viene compattat[A:o/a] insieme ai rifiuti. | {A} viene risucchiat[A:o/a] per metà e sputat[A:o/a] fuori. | {A} si cosparge di olio e il robot l[A:o/a] ignora, perché non sa che cosa sia.
La doccia di plasma | Le docce dei Moduli abitativi erogano plasma invece di acqua. | {A} si fa una doccia di troppo. | {A} si ustiona un braccio. | {A} non si lava da giorni e per una volta ha ragione.
Il conto alla rovescia | Una voce annuncia l'autodistruzione della stazione tra dieci minuti. Poi la annulla. Poi la riattiva. | {A} prova a raggiungere una capsula di salvataggio e ne viene espuls[A:o/a] nel vuoto. | {A} corre avanti e indietro per ore e crolla sfinit[A:o/a]. | {A} resta sedut[A:o/a] tranquill[A:o/a]: aveva capito che era uno scherzo. | sconvolto
Il bozzolo | Qualcosa ha deposto bozzoli nei Condotti di servizio. Ora si aprono. | {A} viene trascinat[A:o/a] dentro un bozzolo. | {A} viene graffiat[A:o/a] da qualcosa con troppe zampe. | {A} brucia i bozzoli con un lanciafiamme improvvisato. | avvelenato
La musica d'attesa | L'IA mette in loop una musica d'attesa a volume massimo per diciotto ore. | {A} perde la ragione e apre un portellone. | {A} si chiude in un armadio stringendosi le orecchie. | {A} comincia a ballare, e balla per diciotto ore. | sconvolto
Il magnete gigante | Il reattore attiva un campo magnetico enorme. Tutto ciò che è metallo vola. | {A} viene schiacciat[A:o/a] tra due armadietti volanti. | {A} viene trascinat[A:o/a] dalla propria cintura contro una parete. | {A} si toglie la cintura appena in tempo.
I cloni difettosi | La clonazione produce copie di tutti, ma leggermente sbagliate. | {A} viene sostituit[A:o/a] da un clone con un occhio in più. Nessuno se ne accorge. | {A} combatte contro il proprio clone e ne esce ammaccat[A:o/a]. | {A} fa amicizia con il proprio clone e lo manda in cucina.
La lavanderia | La lavatrice industriale della stazione aspira chiunque passi vicino. | {A} finisce nel ciclo a novanta gradi. | {A} finisce nel ciclo delicati e ne esce stropicciat[A:o/a]. | {A} passa lontano dalla lavanderia.
La tempesta di neutrini | Una tempesta di neutrini attraversa la stazione. Nessuno sa bene cosa faccia. | {A} si dissolve in una nuvola di luce. | {A} comincia a vedere i colori in modo diverso e si sente male. | {A} non nota assolutamente nulla. | malato
Il mercato nero | Contrabbandieri alieni vendono armi per cibo. Alcuni pagano con la vita. | {A} prova a contrattare e viene vaporizzat[A:o/a]. | {A} viene truffat[A:o/a] e picchiat[A:o/a]. | {A} scambia una barretta con un fucile al plasma.
Le uova | Nella Serra si schiudono uova di una specie sconosciuta. Le creature sono carine per circa due minuti. | {A} viene sbranat[A:o/a] dopo il terzo minuto. | {A} viene mors[A:o/a] mentre fa una carezza. | {A} adotta la creatura più piccola, che [A:gli/le] si affeziona.
Ascensore impazzito | Tutti gli ascensori della stazione salgono e scendono senza controllo. | {A} resta schiacciat[A:o/a] tra due piani. | {A} viene sbattut[A:o/a] contro il soffitto. | {A} prende le scale.
`,
  });
  D.packs.push({
    theme: 'scifi', adult: true,
    ev: {
      d: `
2 love:AB @show | {A} e {B} scoprono che a gravità zero si possono fare cose che sulla Terra sarebbero impossibili. Le telecamere fanno del loro meglio.
1 s:A=ubriaco | {A} trova il liquore sintetico della stazione, gradazione ottanta. Dopo due bicchieri chiama l'IA "mamma".
2 k:A>B @agg | {A} spinge {B} nel compattatore e lo avvia. Le urla si sentono su tre ponti. La regia, stavolta, taglia.
1 @mad s:A=sconvolto | {A} prova una pillola aliena trovata in un cassetto. Vede Dio. Dio ha i tentacoli.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a], {A} programma l'IA per mettere musica romantica mentre si avvicina a {B}. L'IA mette la sigla di un cartone animato. Funziona lo stesso.
1 d:A *0.4 | {A} esce nello spazio senza casco per una scommessa. Il corpo si gonfia in modi che è meglio non descrivere.
2 hit:A>B | {A} prende a calci {B} nelle parti basse con lo stivale magnetico. Il suono è metallico.
`,
      n: `
2 couple:AB | {A} e {B} passano la notte nella capsula di salvataggio, l'unico posto senza telecamere. O così credono.
2 k:A>B @stl | {A} apre di notte il casco di {B} nel vuoto. Gli occhi di {B} fanno qualcosa di molto spiacevole.
`,
    },
    dis: `
Il virus dell'amore | Un virus alieno rende tutti irresistibilmente attratti dalla persona più vicina. | {A} si distrae così tanto da non accorgersi che il modulo si sta depressurizzando. | {A} passa la giornata in imbarazzo con qualcuno che odia. | {A} si chiude in una cella da sol[A:o/a]. | sconvolto
L'esplosione del bagno | Lo scarico sottovuoto del bagno va in sovrapressione. | {A} era sedut[A:o/a] nel posto sbagliato al momento sbagliato. | {A} ne esce viv[A:o/a], ma nessuno vuole più starl[A:o/a] vicino. | {A} aveva usato il bagno dell'altro modulo.
La carneficina dei droni | I droni di sicurezza passano alla modalità "smembramento". | {A} viene fatt[A:o/a] a pezzi con precisione chirurgica. | {A} perde due dita della mano sinistra. | {A} si finge un pezzo di arredamento.
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
