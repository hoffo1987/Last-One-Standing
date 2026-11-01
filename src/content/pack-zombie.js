/* Città degli Infetti — pacchetto esteso. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'zombie',
    ev: {
      b: `
1 +amuleto:A | {A} si infila {amuleto} nello zaino e non dice a nessuno di averlo.
1 s:A=malato | {A} si fa graffiare da un infetto mentre cerca di prendere una cassa di pannolini. Sì, di pannolini.
2 k:A>B @agg | {A} sbatte la portiera di un'auto in faccia a {B}, poi la sbatte ancora, per sicurezza.
2 save:A>B | {A} tira {B} dentro un supermercato e abbassa la saracinesca un secondo prima dell'orda.
1 @show star:A | {A} sale sul tetto di un furgone e urla "Venite a prendermi!". Gli infetti vengono. Il pubblico impazzisce.
2 al:AB @soc | {A} e {B} si accorgono di aver visto le stesse serie sugli zombi e decidono che sono pront[AB:i/e].
`,
      d: `
1 +cibo:A @luck | {A} trova un distributore automatico intatto. Lo apre a calci e ne esce con un tesoro di merendine.
1 @mad | {A} veste un infetto incatenato con una cravatta e lo chiama "il capo". Gli fa anche le riunioni.
1 s:A=ferito | {A} scavalca una recinzione e lascia sul filo spinato i pantaloni e un pezzo di gamba.
1 d:A *0.5 | {A} si fa un selfie con un infetto "che sembrava morto". Non lo era abbastanza.
1 +arma:A @int | {A} attacca un coltello da cucina a un manico di scopa e ottiene {arma}, o qualcosa di simile.
1 @show star:A | {A} fa parkour sui tetti per seminare l'orda. Gli sponsor mandano scarpe nuove.
1 +mappa:A @int | {A} ruba dalla Stazione di polizia {mappa}.
1 need:A=malato med:A cure:A *2 | {A} si inietta un antidoto trovato nel laboratorio. Brucia come l'inferno. Funziona.
1 need:A=malato d:A *1.5 | {A} si guarda allo specchio e vede gli occhi ingiallire. Scrive un biglietto d'addio e si allontana verso l'orda.
1 +esplosivo:A | {A} trova in un'armeria {esplosivo} e lo tratta come un neonato.
1 @cow | {A} passa la giornata chius[A:o/a] in un bagno chimico. Al confronto, gli zombi profumano.
2 k:A>B @int | {A} attira {B} in un vicolo cieco pieno di infetti con la promessa di una farmacia.
2 hit:A>B @agg | {A} colpisce {B} con una padella pensando che fosse un infetto. Si scusa. Non abbastanza.
2 love:AB @soc | {A} e {B} si salvano a vicenda tre volte nella stessa mattina. Alla quarta si baciano.
2 couple:AB @show | {A} e {B} ballano un lento al centro di un supermercato vuoto mentre fuori l'orda batte sulle vetrine.
2 couple:AB need:B=malato | {B} nasconde a {A} il morso sul braccio. {A} lo sa, e non dice niente.
2 grudge:A>B k:A>B *3 | {A} lega {B} a un lampione e lascia fare all'orda. Per {caro:A}.
2 grudge:A>B hit:A>B *2 | {A} spara a {B} dalla finestra per {caro:A}. L[B:o/a] manca di poco. {B} si ferisce saltando giù da un balcone.
2 save:A>B | {A} uccide l'infetto che stava per mordere {B}. {B} [A:gli/le] deve la vita.
2 steal:A<B @stl | {A} sottrae {arma:B} a {B} mentre dorme dentro un'auto.
2 repay:A>B +cibo:B | {A} lascia a {B} uno zaino pieno di scatolette: "Così siamo pari".
2 need:B=malato k:A>B @heal | {A} capisce che {B} sta per trasformarsi e mette fine alla cosa prima che sia troppo tardi. Con gentilezza.
2 feared:B @cow | {A} vede {B} sterminare un gruppo di infetti a mani nude e decide di non incrociarl[B:o/a] mai.
2 traitor:B rel:AB-30 | {A} scrive sui muri della città: "{B} ti venderà all'orda".
3 al:ABC @soc | {A}, {B} e {C} si barricano in un centro commerciale e si eleggono a vicenda sindaco, vicesindaco e assessore alla difesa.
3 k:AB>C | {A} e {B} buttano {C} giù dal tetto per distrarre l'orda mentre fuggono.
3 couple:AB hit:C>A | {C} accusa {A} di essere infett[A:o/a] per allontanarl[A:o/a] da {B}. Ne nasce una rissa.
2 veleno:A k:A>B @stl *1.5 | {A} offre a {B} una zuppa calda condita con {veleno:A}.
3 esplosivo:A k:A>BC | {A} usa {esplosivo:A} per chiudere un tunnel. Dentro c'erano anche {B} e {C}.
1 need:A=affamato @mad | Affamat[A:o/a], {A} mangia cibo per gatti. Il gusto pesce è il migliore, dice.
2 friend:AB @show | {A} e {B} trovano un karaoke funzionante e cantano a squarciagola. Arrivano tutti gli infetti del quartiere.
`,
      n: `
1 | {A} ascolta la radio nella speranza di una voce umana. Trova solo la previsione del tempo, registrata un anno fa.
1 d:A *0.5 | {A} si addormenta nella macchina sbagliata: c'era qualcuno nel bagagliaio.
2 couple:AB | {A} e {B} dormono su un tetto, sotto le stelle, abbracciati a un fucile a pompa ciascuno.
2 grudge:A>B | {A} lascia un infetto legato davanti alla porta di {B}, con un fiocco. Un messaggio.
2 k:A>B @stl | {A} apre di notte la porta del rifugio di {B} e lascia entrare l'orda.
`,
      f: `
2 k:A>B | {A} e {B} si contendono l'ultima cassa sul tetto. Uno dei due scende per la via più rapida.
1 +amuleto:A | Nella cassa dell'esercito per {A} c'è {amuleto}.
`,
      ds: `
1 con:A=mappa | Grazie a {mappa:A}, {A} conosce l'unico tombino sicuro della zona.
2 save:A>B | {A} trascina {B} dentro un'ambulanza e chiude le porte.
`,
    },
    dis: `
I corridori notturni | Al buio gli infetti diventano velocissimi. | {A} viene raggiunt[A:o/a] in tre secondi. | {A} viene mors[A:o/a] a una spalla mentre si chiude dentro una cabina telefonica. | {A} si chiude in una cella frigorifera. | malato
Lo zoo infetto | Gli animali dello zoo sono stati infettati. Anche la giraffa. | {A} viene raggiunt[A:o/a] da una tigre zombie. | {A} viene incornat[A:o/a] da un rinoceronte zombie. | {A} si nasconde nella casa dei rettili, che sono troppo lenti.
La parata | Un'orda gigantesca attraversa il centro con una banda musicale zombie in testa. | {A} viene travolt[A:o/a] dalla parata. | {A} perde una scarpa e un dito del piede. | {A} si unisce alla parata fingendo di essere infett[A:o/a]. | malato
La pioggia di volantini | Un aereo lancia volantini con scritto "Mantenete la calma". Fa anche un rumore infernale. | {A} viene raggiunt[A:o/a] dall'orda richiamata dal rumore. | {A} si fa male cadendo da una scala. | {A} legge il volantino e mantiene la calma.
L'ospedale crolla | L'Ospedale cede e libera i pazienti del reparto di isolamento. | {A} viene sepolt[A:o/a] sotto le macerie. | {A} viene graffiat[A:o/a] da un paziente in camice. | {A} si trovava dall'altra parte della città. | malato
La nebbia tossica | Una fabbrica chimica esplode e copre la città di nebbia gialla. | {A} respira la nebbia e cade a terra. | {A} tossisce per ore. | {A} indossa una maschera antigas trovata in una caserma. | avvelenato
Il centro commerciale chiude | Le saracinesche del centro commerciale si abbassano tutte contemporaneamente. | {A} resta chius[A:o/a] dentro con l'orda. | {A} si incastra sotto una saracinesca. | {A} esce dall'uscita di sicurezza.
Il sangue in acqua | Le acque del fiume diventano rosse: gli squali si sono infettati. | {A} prova ad attraversare il fiume a nuoto. | {A} viene mors[A:o/a] a un piede. | {A} attraversa sul ponte. | malato
La rivolta dei sopravvissuti | Un gruppo di sopravvissuti armati decide che i concorrenti sono una minaccia. | {A} viene giustiziat[A:o/a] sul posto. | {A} viene colpit[A:o/a] da un colpo di avvertimento. | {A} si unisce ai sopravvissuti per un giorno.
I neonati | Una scuola materna infetta si apre. Sono piccoli, sono veloci, sono tantissimi. | {A} viene sommers[A:o/a] da un esercito di infetti alti un metro. | {A} viene mors[A:o/a] a una caviglia. | {A} sale su un'altalena e aspetta che si stanchino. | malato
Il blackout eterno | La città perde l'elettricità per sempre. | {A} cade nella tromba di un ascensore al buio. | {A} si ferisce inciampando in un cadavere. | {A} aveva una torcia a manovella.
Il mutante corazzato | Un infetto ricoperto da piastre d'osso attraversa la città distruggendo auto. | {A} viene schiacciat[A:o/a] da un'auto lanciata. | {A} viene colpit[A:o/a] da un detrito. | {A} si nasconde in un tombino.
La sirena del gelataio | Un furgone dei gelati con la musica a tutto volume attraversa la città. Il conducente è infetto. | {A} corre verso il furgone per abitudine. | {A} viene investit[A:o/a] di striscio. | {A} riconosce la trappola e sorride.
Gli uccelli infetti | Stormi di piccioni infetti calano sulla città. | {A} viene beccat[A:o/a] a morte. | {A} viene beccat[A:o/a] in testa e si ammala. | {A} si ripara sotto un ombrello. | malato
Lo sciopero dei militari | I soldati smettono di sparare agli infetti per protesta sindacale. | {A} contava sulla copertura dei militari. | {A} rimane espost[A:o/a] e viene ferit[A:o/a]. | {A} non si è mai fidat[A:o/a] dei militari.
La metro allagata | Le gallerie della metropolitana si allagano con acqua e infetti che galleggiano. | {A} viene trascinat[A:o/a] sott'acqua. | {A} riesce a uscire con un morso sul polpaccio. | {A} si trova al piano strada. | malato
`,
  });
  D.packs.push({
    theme: 'zombie', adult: true,
    ev: {
      d: `
2 k:A>B @agg | {A} spacca la testa di {B} con una mazza chiodata. Il cervello cola sul marciapiede e un infetto ne approfitta per pranzo.
1 s:A=ubriaco | {A} svuota il bar di un hotel di lusso e si sveglia nella vasca con due infetti in accappatoio.
2 love:AB | {A} e {B} si chiudono in un negozio di lingerie per "fare inventario". L'inventario dura tutto il pomeriggio.
1 d:A *0.5 | {A} viene sbranat[A:o/a] da cinque infetti contemporaneamente. Si contendono un braccio come cani con un osso.
1 @mad s:A=sconvolto | {A} trova in una farmacia una scorta di pillole e le prova tutte. Inizia a parlare con gli infetti come se fossero il suo pubblico.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a], {A} trascina {B} in una suite d'albergo abbandonata. La porta resta chiusa fino a sera.
2 hit:A>B | {A} usa la testa mozzata di un infetto come arma contro {B}. Funziona meglio del previsto, ed è disgustoso.
`,
      n: `
2 couple:AB | {A} e {B} passano la notte in un'auto sul tetto di un parcheggio. Gli infetti di sotto ascoltano incuriositi.
2 k:A>B @stl | {A} lega {B} nel sonno e l[B:o/a] lascia davanti a un nido di infetti. All'alba resta solo una scarpa.
`,
    },
    dis: `
L'orda arrapata | Un'improbabile mutazione rende gli infetti molto affettuosi. Il bacio, purtroppo, è ancora un morso. | {A} riceve un abbraccio di troppo. | {A} si libera da un abbraccio molto insistente. | {A} si tiene a distanza di sicurezza e trattiene la nausea. | malato
Il mattatoio | Gli infetti si radunano nel mattatoio cittadino e lo trasformano in un inferno di carne. | {A} entra per cercare cibo e diventa cibo. | {A} esce copert[A:o/a] di sangue non suo e con un graffio che è suo. | {A} sente l'odore e cambia direzione. | malato
La festa dell'ultimo giorno | Un gruppo di sopravvissuti organizza una festa con alcol e musica a tutto volume, convinto che sia la fine. | {A} si unisce alla festa e non si accorge che l'orda è arrivata. | {A} si sveglia il giorno dopo con un'emicrania e un morso misterioso. | {A} beve un bicchiere e se ne va prima dell'arrivo dell'orda. | ubriaco
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
