/* Arena Classica — pacchetto esteso (eventi, disastri, contenuti 18+). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'classico',
    ev: {
      b: `
1 +cibo:A @luck | {A} afferra quello che sembra uno zaino pieno. È pieno di gallette. Solo gallette. Duecento gallette.
1 s:A=ferito | {A} parte in quarta, inciampa nella propria piattaforma e si sbuccia entrambe le ginocchia davanti a tutta la nazione.
1 @show star:A | {A} ignora la Cornucopia, si gira verso le telecamere e fa l'occhiolino. Poi scappa.
2 save:A>B @heal | {A} spinge {B} giù dalla traiettoria di una lancia. Nessuno dei due capisce bene cosa sia successo.
2 k:A>B @agg | {A} colpisce {B} con lo zaino più pesante della Cornucopia. Dentro c'erano dei sassi. Ironia.
3 hit:A>B hit:B>C | Rissa a tre: {A} colpisce {B}, {B} colpisce {C}, {C} non colpisce nessuno ma si offende lo stesso.
2 al:AB +trap:A | {A} e {B} si accordano in tre parole e si dividono una corda e un coltello.
`,
      d: `
1 +cibo:A @int | {A} costruisce una trappola per conigli. Cattura uno scoiattolo arrabbiatissimo. Lo mangia lo stesso.
1 s:A=ferito @mad | {A} prova ad accendere il fuoco sfregando due bastoncini per tre ore. Si accende il polso.
1 @show | {A} si fa una corona di fiori e si proclama regina del Bosco. Il Bosco non commenta.
1 +arma:A @luck | {A} trova {arma} tra i rami di un albero. Il proprietario precedente è ancora lì vicino, molto meno in forma.
1 d:A *0.6 | {A} mangia delle bacche viola perché "quelle viola sono sempre buone". Non lo erano.
1 @int +mappa:A | {A} si arrampica sull'albero più alto e disegna una mappa sulla propria maglietta.
1 @soc star:A | {A} ringrazia ogni sponsor per nome, in ordine alfabetico. Ci mette due ore. Funziona.
1 need:A=ferito +med:A cure:A @luck *2 | {A} trova una pianta che cura le ferite. Lo sa perché la mamma gliel'aveva detto. Grazie, mamma.
1 | {A} passa la mattina a cercare la propria scarpa sinistra. La trova sulla destra.
1 s:A=avvelenato | {A} si gratta contro un'edera dall'aria innocua. Non è innocua.
2 k:A>B @stl | {A} si mimetizza così bene nel fango che {B} l[A:o/a] calpesta. È l'ultimo errore di {B}.
2 hit:A>B @agg | {A} tira un sasso a {B} da trenta metri e l[B:o/a] centra in fronte. Anche {A} è sorpres[A:o/a].
2 love:AB @show | {A} e {B} vengono ripres[AB:i/e] mentre si sfiorano le mani vicino al Fiume. In capitale esplodono i fan club.
2 couple:AB +cibo:B | {A} pesca per {B} il pesce più grosso del Fiume e lo chiama "il nostro primo figlio". {B} lo cucina comunque.
2 save:A>B | {A} lancia una liana a {B}, che sta affondando nelle Paludi. La liana è un serpente. Funziona lo stesso.
2 give:A>B=med @heal | {A} lascia un unguento sulla soglia della grotta di {B}, senza firmarsi.
2 steal:A<B @stl | {A} sottrae {arma:B} a {B} mentre fa la pipì dietro un cespuglio. Nessuna dignità, tanta efficacia.
2 grudge:A>B k:A>B *3 | {A} aspetta {B} sul ponte di corda e taglia la corda a metà traversata. Per {caro:A}.
2 grudge:A>B hit:A>B *2 | {A} insegue {B} fino al Fiume per {caro:A}. {B} si tuffa e si salva, ma non senza un taglio sul braccio.
2 repay:A>B +cibo:B | {A} lascia a {B} un coniglio arrosto con un biglietto: "Siamo pari".
2 owe:A>B save:A>B repay:A>B | {A} salva {B} da {mostro}, saldando il debito con gli interessi.
2 enemy:AB hit:B>A | {A} e {B} si incrociano al Fiume. Volano insulti, poi sassi, poi denti.
2 feared:B @cow | {A} vede {B} in lontananza e passa il resto della giornata dentro un tronco cavo.
2 traitor:B rel:AB-20 | {A} scrive "TRADITORE" con il fango su un albero, con una freccia che indica dove dorme {B}.
2 @soc al:AB | {A} e {B} scoprono di tifare la stessa squadra di calcio. Alleanza immediata.
2 need:B=affamato give:A>B=cibo @heal | {A} vede {B} masticare una radice per disperazione e [B:gli/le] passa metà del proprio coniglio.
3 k:A>C | {A} e {B} si contendono {C} come bersaglio. Vince {A}. {B} si offende.
3 couple:AB hit:C>B | {C} non sopporta l'idea che {A} e {B} siano una coppia e tira un sasso a {B}. Gelosia classica.
3 al:ABC @show | {A}, {B} e {C} formano un'alleanza e scelgono un nome: "I Tre Fiumi". Ci sono due fiumi, ma va bene così.
3 owe:A>B k:A>C repay:A>B *2 | {C} sta per affogare {B} nel Fiume, ma {A} interviene. Debito saldato, {C} no.
1 con:A=mappa +cibo:A | Grazie a {mappa:A}, {A} trova un frutteto nascosto nelle Rovine.
1 con:A=amuleto @luck | Un ramo enorme cade a dieci centimetri da {A}. {A} bacia {amuleto:A}.
2 veleno:A k:A>B @stl *1.5 | {A} offre a {B} delle bacche "dolcissime". Lo erano, finché non hanno smesso di esserlo.
`,
      n: `
1 | {A} conta le stelle per addormentarsi e arriva a quattromilaseicento. Non dorme.
1 @mad | {A} sente un uccello imitatore ripetere la propria voce e gli fa un discorso motivazionale.
1 d:A *0.6 | {A} accende un fuoco enorme per scaldarsi. Lo vede tutta l'arena. Anche chi non doveva.
2 couple:AB | {A} e {B} si raccontano cosa faranno con il premio. {A} vuole una casa. {B} vuole un'altra casa, più grande.
2 grudge:A>B | {A} intaglia un piccolo bastone con la faccia di {B}. Poi lo spezza.
2 save:A>B | {A} sveglia {B} un istante prima che {mostro} entri nella grotta.
2 k:A>B @stl | {A} entra nella grotta di {B} con la luna alle spalle. All'alba, il cannone.
3 ally:ABC tr:A>C | {A} guarda {B} e {C} e decide che tre sono troppi. Il terzo di troppo è {C}.
`,
      f: `
1 +amuleto:A | {A} apre il proprio zaino del festino: dentro c'è {amuleto} e una lettera della nonna.
2 k:A>B | {A} si nasconde dentro la Cornucopia stessa e aspetta. {B} arriva. {B} non riparte.
2 couple:AB save:A>B | {A} copre {B} mentre recupera gli zaini, e si prende una freccia di striscio al posto di [B:lui/lei/loro].
`,
      ds: `
1 @luck | {A} si trovava dall'unica parte dell'arena che gli organizzatori si erano dimenticati di colpire.
2 save:A>B | {A} tende la mano a {B} dall'alto di una roccia e l[B:o/a] tira su.
`,
    },
    dis: `
Il ritorno degli sciami | Gli organizzatori liberano dieci nidi di vespe velenose contemporaneamente. | {A} viene punt[A:o/a] così tante volte da diventare irriconoscibile. | {A} si getta nel Fiume, ma esce con la faccia gonfia come un pallone. | {A} si spalma di fango e le vespe l[A:o/a] ignorano. | avvelenato
Pioggia di frecce | Dal cielo cadono centinaia di frecce con le piume colorate. Un gesto artistico, dicono gli organizzatori. | {A} non trova riparo e diventa un puntaspilli. | {A} si ripara sotto lo zaino, ma una freccia trova la coscia. | {A} si stende sotto un tronco caduto.
La Cornucopia si muove | La Cornucopia si stacca dal terreno e comincia a rotolare per l'arena. | {A} non sente arrivare la Cornucopia e viene schiacciat[A:o/a]. | {A} salta all'ultimo momento e si storce la caviglia. | {A} ci sale sopra e si fa un giro.
Notte senza luna | Gli organizzatori spengono anche le stelle. Buio totale per dodici ore. | {A} cammina dritt[A:o/a] in un burrone. | {A} sbatte contro una dozzina di alberi. | {A} si siede e aspetta, contando i battiti del cuore.
Gli scoiattoli assassini | Gli scoiattoli dell'arena sono stati modificati. Hanno denti d'acciaio e nessun senso dell'umorismo. | {A} viene sbranat[A:o/a] da trecento scoiattoli. | {A} perde un pezzo d'orecchio contro uno scoiattolo particolarmente determinato. | {A} lancia ghiande nella direzione opposta e scappa.
Il Fiume di fuoco | Il Fiume viene incendiato con il petrolio. Galleggia, e brucia. | {A} stava facendo il bagno. | {A} si brucia le gambe saltando sulla riva. | {A} vede il fumo e si allontana.
Nebbia della verità | Una nebbia rosa costringe tutti a dire la verità ad alta voce. | {A} confessa ad alta voce dove si nasconde. Qualcuno ascolta. | {A} rivela i propri segreti più imbarazzanti in diretta nazionale. | {A} si tappa la bocca con le mani e resiste. | sconvolto
Il terreno che affonda | Interi pezzi di arena sprofondano nel nulla. | {A} sprofonda insieme al proprio accampamento. | {A} si aggrappa al bordo e risale con le unghie spezzate. | {A} sente il terreno tremare e corre.
I fantasmi dei caduti | Gli organizzatori proiettano gli ologrammi dei caduti che camminano nell'arena chiamando i vivi. | {A} segue un ologramma fino alle sabbie mobili. | {A} non regge la vista e crolla. | {A} capisce subito il trucco e ignora tutto. | sconvolto
Le api giganti | Un'unica ape grande come un cavallo vola sopra l'arena. È lenta, ma convinta. | {A} viene raggiunt[A:o/a] dall'ape. | {A} si prende una puntura enorme sulla schiena. | {A} si nasconde in un tronco cavo. | avvelenato
Gelo flash | In un minuto la temperatura scende di quaranta gradi, poi torna normale. | {A} resta congelat[A:o/a] a metà passo. | {A} perde la sensibilità a metà del corpo. | {A} era vicino al fuoco. | malato
La caccia dell'orso meccanico | Un orso meccanico alto quattro metri attraversa il Bosco. | {A} viene abbracciat[A:o/a] dall'orso. Non è un abbraccio affettuoso. | {A} riesce a liberarsi lasciando nelle zampe dell'orso metà della giacca. | {A} sale su un albero troppo sottile per l'orso.
La sete | Tutte le fonti d'acqua vengono prosciugate per un giorno intero. | {A} cede alla sete. | {A} beve dalle pozzanghere e si ammala. | {A} aveva una borraccia piena. | malato
Il sole gigante | Il sole artificiale dell'arena si avvicina. Troppo. | {A} prende fuoco. Letteralmente. | {A} si scotta tutta la pelle esposta. | {A} si ripara in una grotta.
Il richiamo della Cornucopia | Una voce annuncia che alla Cornucopia c'è cibo per tutti. È una bugia. | {A} corre alla Cornucopia e trova una trappola. | {A} arriva per ultim[A:o/a] e trova solo un'imboscata, da cui esce ferit[A:o/a]. | {A} non si fida e resta dov'è.
I pesci volanti | Dal Fiume saltano pesci con le ali e i denti. | {A} viene sbranat[A:o/a] da uno sciame di pesci volanti. | {A} si prende un morso in faccia. | {A} li cucina e li mangia.
Il vento che canta | Un vento continuo produce una nota acutissima che fa impazzire. | {A} si getta da una scogliera per far smettere il suono. | {A} si sveglia con le orecchie che sanguinano. | {A} si tappa le orecchie con il muschio. | sconvolto
L'eruzione | Un vulcano artificiale spunta in mezzo all'Altopiano. | {A} viene sommers[A:o/a] dalla lava. | {A} si ustiona i piedi correndo sulla roccia calda. | {A} guarda l'eruzione da lontano mangiando una galletta.
La pioggia di sponsor | Gli sponsor lanciano migliaia di paracadute contemporaneamente, alcuni molto pesanti. | {A} viene colpit[A:o/a] in testa da un pacco pieno di pentole. | {A} viene schiacciat[A:o/a] per metà da una cassa di medicinali. | {A} raccoglie tre paracadute e si fa una tenda.
La notte dei lupi | Il branco di lupi mutanti esce tutto insieme sotto la luna piena. | {A} viene circondat[A:o/a] dal branco. | {A} viene mors[A:o/a] a un polpaccio. | {A} accende un fuoco e i lupi si tengono a distanza.
Il gioco delle porte | In mezzo all'arena compaiono tre porte. Gli organizzatori obbligano tutti a sceglierne una. | {A} sceglie la porta sbagliata. | {A} sceglie la porta così così. | {A} sceglie la porta giusta, dietro c'è un panino.
L'albero degli impiccati | Le liane del Bosco si animano e si stringono attorno ai colli. | {A} viene sollevat[A:o/a] da una liana e non scende più. | {A} si libera tagliando la liana, ma con il collo segnato. | {A} cammina rasoterra per tutto il giorno.
Il diluvio | Piove per ventiquattro ore senza smettere. | {A} annega in una pozzanghera profonda due metri. | {A} si prende una polmonite. | {A} si costruisce una zattera e si gode il viaggio. | malato
Il miele | Dagli alberi cola un miele dolcissimo che attira tutti gli orsi dell'arena. | {A} è ricopert[A:o/a] di miele quando arrivano gli orsi. | {A} si lecca le dita e si ritrova un orso in faccia. | {A} lascia il miele agli orsi e scappa.
`,
  });
  D.packs.push({
    theme: 'classico', adult: true,
    ev: {
      b: `
1 d:A *0.6 | {A} viene decapitat[A:o/a] da un'ascia lanciata nella mischia. La testa rotola fin quasi alla telecamera numero tre. La regia non taglia.
2 k:A>B @agg | {A} sventra {B} con un machete e resta a guardare le budella fumanti come se fossero un'opera d'arte.
1 @mad | {A} urla "Cazzo, cazzo, cazzo" per tutti i trenta secondi del conto alla rovescia. Il pubblico lo trova liberatorio.
2 hit:A>B | {A} rompe il naso a {B} con una testata. Si sente lo scrocchio fino a casa.
`,
      d: `
1 s:A=ubriaco @mad | {A} distilla un liquore con bacche fermentate. Due sorsi e balla nud[A:o/a] sulla riva del Fiume. Le telecamere zoomano.
2 love:AB @show | {A} e {B} spariscono dietro un cespuglio per quaranta minuti. Le telecamere inquadrano un cespuglio che si muove molto.
2 couple:AB | {A} e {B} non si staccano dalla grotta per tutta la mattina. Il pubblico deve accontentarsi dei rumori.
2 k:A>B w:A @agg | {A} squarcia la gola di {B} con {arma:A} e il sangue arriva fino al Fiume. Gli sponsor si dividono tra disgusto e entusiasmo.
1 need:A=ferito d:A | La ferita di {A} va in cancrena. Le ultime ore sono così brutte che la regia passa alla pubblicità.
2 @mad hit:A>B | {A} insulta la madre di {B} per venti minuti, con una creatività degna di un poeta. Poi [B:gli/le] tira un sasso.
1 s:A=ubriaco | {A} trova {alcol}, se la scola tutta e passa la giornata a fare la corte a un albero. L'albero non ricambia.
2 need:A=ubriaco love:AB @drunk | {A}, ubriac[A:o/a] pers[A:o/a], si infila nel sacco a pelo di {B} "per sbaglio". Non era uno sbaglio. Non si lamenta nessuno.
1 @show star:A | {A} si toglie la maglietta davanti alla telecamera numero due. Il numero di sponsor raddoppia in un'ora.
2 k:A>B | {A} affoga {B} nel Fiume tenendo[B:gli/le] la testa sotto, e intanto canticchia.
1 s:A=avvelenato @mad | {A} si rotola nud[A:o/a] nell'edera velenosa convint[A:o/a] che sia menta. Il prurito arriva in posti che non nominiamo.
2 hit:A>B @agg | {A} morde l'orecchio a {B} e se lo tiene come trofeo.
`,
      n: `
2 couple:AB | {A} e {B} fanno talmente rumore nella grotta che mezza arena sa dove sono. Non sembra importare a nessuno.
2 love:AB | Dopo una notte gelida, {A} e {B} decidono di scaldarsi nel modo più antico del mondo. Al mattino si danno del lei.
1 need:A=ubriaco d:A @drunk | Ubriac[A:o/a] fradic[A:io/ia], {A} va a fare pipì sul bordo di una scogliera. Al buio.
2 k:A>B @stl | {A} strangola {B} nel sonno con i suoi stessi lacci delle scarpe. Lentamente.
`,
    },
    dis: `
L'acqua afrodisiaca | Gli organizzatori aggiungono qualcosa all'acqua del Fiume. Gli ascolti salgono del trecento per cento. | {A} beve troppo, si distrae nel momento sbagliato e finisce in bocca a un serpente gigante. | {A} passa la giornata imbarazzat[A:o/a] e con il cuore a mille. | {A} beve solo dalla propria borraccia e guarda gli altri con disagio. | ubriaco
La pioggia di frattaglie | Dal cielo cadono interiora di animale. Gli organizzatori la chiamano "arte". | {A} scivola su un intestino e si rompe il collo. | {A} vomita per sei ore di fila. | {A} raccoglie le frattaglie migliori e si fa uno spiedino. | malato
Le zanzare carnivore | Zanzare grandi come passeri prosciugano il sangue di chiunque. | {A} viene dissanguat[A:o/a] fino all'ultima goccia. | {A} si risveglia pallid[A:o/a] come un lenzuolo. | {A} si cosparge di aglio, cosa che funziona sorprendentemente bene. | malato
Il gas della risata | Un gas fa ridere tutti fino alle lacrime, e oltre. | {A} ride così tanto da non riuscire a respirare. | {A} ride per otto ore e si incrina una costola. | {A} trattiene il respiro e guarda gli altri contorcersi. | sconvolto
Il tritacarne | Lame rotanti spuntano dal terreno della Cornucopia. | {A} viene ridott[A:o/a] in poltiglia. La regia passa alla pubblicità con un certo ritardo. | {A} perde due dita del piede. | {A} salta sopra le lame con un passo di danza.
L'orgia dei lupi | La luna piena manda in calore tutti i lupi mutanti. Sono distratti, ma enormi. | {A} interrompe i lupi nel momento sbagliato. | {A} viene travolt[A:o/a] da una coppia di lupi molto impegnata. | {A} passa oltre in punta di piedi, cercando di non guardare.
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
