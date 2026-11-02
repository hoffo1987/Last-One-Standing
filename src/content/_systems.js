/* Sistema delle conseguenze: frasi di eco, lessico degli oggetti speciali e
 * eventi di base che leggono e scrivono legami (vendette, debiti, coppie, fama,
 * fame, ubriachezza, oggetti). I pacchetti (D.packs) si sommano ai repertori.
 * Nuove etichette: hit:A>B poison:A>B save:A>B love:AB couple:AB single:A grudge:A>B forgive:A>B
 * owe:A>B repay:A>B debt:A>B give:A>B=oggetto friend:AB enemy:AB rel:AB+20 fame:A
 * feared:A lost:A traitor:A star:A con:A=oggetto. Segnaposto: {caro:A} (per chi
 * A cerca vendetta), {perso:A}, {partner:A}, {amuleto} {alcol} {veleno} {mappa} {esplosivo}. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});
  D.packs = D.packs || [];

  D.lexDefault = {
    amuleto: ['un portafortuna'], alcol: ['una bottiglia di grappa'], veleno: ['una boccetta di veleno'],
    mappa: ['una mappa dell\'arena'], esplosivo: ['un candelotto di dinamite'],
  };

  // {0} {1} {2} = persone coinvolte; [0:o/a] accordo; § = oggetto con possessivo
  D.echo = {
    grudgeKill: [
      '{0} ha visto cadere {2} e da ora ha un solo nome in testa: {1}.',
      '{0} incide il nome di {1} su un sasso. Non è un gesto affettuoso.',
      '{0} giura sulla memoria di {2} che {1} la pagherà.',
      'Da qualche parte, {0} sta affilando qualcosa pensando a {1}.',
      '{0} aggiunge {1} alla sua lista. La lista ha un solo nome.',
      '{0} non piange per {2}: prende appunti su {1}.',
      '{0} smette di parlare. Chi l[0:o/a] conosce sa che è un pessimo segno per {1}.',
    ],
    grudgeLover: [
      '{0} perde {2}, la persona che amava, e giura che {1} non vedrà la fine dei giochi.',
      'Il cuore di {0} si spezza insieme a {2}. Quello che ne resta punta dritto verso {1}.',
      '{0} urla il nome di {2} fino a perdere la voce. Poi smette, e comincia a cercare {1}.',
      'Gli sponsor mandano fazzoletti a {0}. {0} li usa per pulire la lama, pensando a {1}.',
    ],
    griefOnly: [
      '{0} ha perso {1} e non sa più per chi combattere.',
      'Senza {1}, {0} cammina come se il mondo fosse diventato muto.',
      '{0} si siede e resta immobile per ore. {1} non tornerà.',
    ],
    revenge: [
      'Vendetta compiuta: {0} ha fatto pagare a {1} la morte di {2}.',
      '{0} sussurra il nome di {2} a {1} un attimo prima della fine. Conto saldato.',
      '"Per {2}", dice {0}, abbastanza forte perché lo senta tutta l\'arena.',
      'Il pubblico esplode: {0} ha vendicato {2}. Gli sceneggiatori non avrebbero saputo fare di meglio.',
    ],
    revengeAny: [
      '{0} chiude il conto aperto con {1}. Nessuno dei due aveva dimenticato.',
      'Vendetta servita fredda: {0} non aveva mai perdonato {1}.',
      '{0} guarda {1} cadere e per la prima volta da giorni respira.',
    ],
    feared: [
      'Con tre vittime alle spalle, {0} è ora la persona più temuta dell\'arena.',
      'Gli altri concorrenti cambiano strada quando vedono {0}. E fanno bene.',
      'Le scommesse su {0} crollano a uno virgola zero uno. Nessuno vuole incontrarl[0:o/a].',
    ],
    betray: [
      '{0} non dimenticherà mai il tradimento di {1}.',
      'La notizia corre veloce: di {1} non si fiderà più nessuno, tantomeno {0}.',
      '{0} guarda {1} andarsene e capisce che la prossima volta sarà diverso.',
      '{0} aggiorna mentalmente la lista dei nemici. In cima c\'è {1}.',
    ],
    steal: [
      '{0} si accorge del furto e se la lega al dito: {1} è avvisat[1:o/a].',
      '{0} giura che {1} restituirà tutto, con gli interessi.',
      '{0} scopre lo zaino vuoto e ha subito un sospetto. Si chiama {1}.',
    ],
    debt: [
      '{0} ora ha un debito con {1}.',
      '{0} non lo dice, ma sa di dovere qualcosa a {1}.',
      'Tra {0} e {1} nasce un debito di quelli che prima o poi si pagano.',
    ],
    hit: [
      '{0} si tocca la ferita e pensa a {1}. Non in senso buono.',
      '{0} se la lega al dito: {1} ha appena guadagnato un nemico.',
      '{0} sanguina e sorride. {1} dovrebbe preoccuparsi.',
    ],
    saved: [
      '{0} deve la vita a {1}, e lo sa.',
      'Il pubblico applaude: {1} ha appena salvato {0}, che ora l[1:o/a] guarda in modo diverso.',
      '{0} promette a {1} che ricambierà. Nell\'arena le promesse pesano.',
    ],
    couple: [
      'Nasce una coppia: {0} e {1}. Il pubblico impazzisce.',
      'Gli sponsor mandano cuoricini: {0} e {1} sono ufficialmente una coppia.',
      '{0} e {1} si tengono per mano. In un\'arena. Le statistiche dicono che finirà male.',
      'Sui social nasce un nome per la coppia formata da {0} e {1}. È orribile, ma funziona.',
    ],
    repay: [
      'Debito saldato: {0} non deve più nulla a {1}.',
      '{0} restituisce il favore a {1}. Pari e patta.',
      '{0} e {1} si scambiano un cenno: sono pari.',
    ],
    star: [
      'Il pubblico adora {0}: gli sponsor fanno la fila.',
      'Sondaggio lampo: {0} è il personaggio più amato della stagione.',
      'Le magliette con la faccia di {0} vanno a ruba. Gli sponsor prendono nota.',
    ],
    shock: [
      '{0} non riesce a togliersi quella scena dalla testa.',
      '{0} ha le mani che tremano, e non smetteranno presto.',
      '{0} ride senza motivo. Nessuno ride con [0:lui/lei/loro].',
    ],
    amulet: [
      'Colpo di scena: § si frantuma al posto di {0}, che è ancora viv[0:o/a]!',
      'Ma § assorbe il colpo: {0} si rialza, ammaccat[0:o/a] ma viv[0:o/a].',
      'Il pubblico urla: § ha appena salvato la vita di {0}.',
    ],
    amuletSoft: [
      'Ma § salva {0} all\'ultimo secondo: è ancora in gioco!',
      'Colpo di scena: § tira fuori {0} dai guai. Per questa volta.',
    ],
  };
  D.echoSoft = {
    grudgeKill: [
      '{0} non perdona {1} per aver fatto fuori {2}.',
      '{0} apre una chat segreta con un solo obiettivo: {1}.',
      '{0} giura che {1} pagherà per {2}. Con gli interessi.',
    ],
    grudgeLover: ['{0} ha perso {2} e da oggi vive solo per rovinare {1}.', 'Il cuore di {0} è a pezzi per {2}. Tutti i pezzi puntano verso {1}.'],
    revenge: ['Vendetta compiuta: {0} fa fuori {1}, come {1} aveva fatto con {2}.', '"Questa era per {2}", dice {0} a {1}, mentre lo scatolone si riempie.'],
    revengeAny: ['{0} chiude il conto con {1}. Freddo come un caffè della macchinetta.'],
    feared: ['{0} ha già eliminato tre rivali: quando passa nei corridoi cala il silenzio.'],
    shock: ['{0} è sotto shock e fissa il vuoto per un\'ora.', '{0} ha bisogno di una pausa. Lunga.'],
  };

  /* ---------- lessico degli oggetti speciali per arena ---------- */
  const LEX = {
    classico: { amuleto: ['un ciondolo portafortuna', 'una spilla d\'oro a forma di uccello'], alcol: ['una fiaschetta di liquore bianco', 'una bottiglia di sidro'], veleno: ['una manciata di bacche mortali', 'una fiala di veleno di serpente'], mappa: ['una mappa dell\'arena disegnata su pelle'], esplosivo: ['una mina disinnescata', 'un sacchetto di polvere da sparo'] },
    fantasy: { amuleto: ['un amuleto runico', 'un dente di drago incantato'], alcol: ['una caraffa di idromele', 'una fiasca di vino elfico'], veleno: ['una fiala di sangue di viverna', 'una boccetta di veleno di basilisco'], mappa: ['una mappa che si ridisegna da sola'], esplosivo: ['una pergamena di palla di fuoco', 'una pozione esplosiva'] },
    scifi: { amuleto: ['uno scudo energetico personale', 'un chip di rianimazione'], alcol: ['una fiaschetta di liquore sintetico', 'una bottiglia di distillato di alghe'], veleno: ['una nanotossina', 'una siringa di neurotossina'], mappa: ['la planimetria della stazione'], esplosivo: ['una carica al plasma', 'una granata a frammentazione'] },
    zombie: { amuleto: ['un siero sperimentale', 'un giubbotto antiproiettile ammaccato'], alcol: ['una bottiglia di whisky', 'una bottiglia di vodka da supermercato'], veleno: ['una scatola di topicida', 'una siringa di sangue infetto'], mappa: ['una mappa della città con le zone sicure'], esplosivo: ['una cintura di candelotti', 'una bombola di gas'] },
    royale: { amuleto: ['un giubbotto antiproiettile di livello 3', 'un kit di rianimazione'], alcol: ['una birra calda', 'una lattina di superalcolico'], veleno: ['una granata al gas', 'un dardo tossico'], mappa: ['una mappa con la prossima zona sicura'], esplosivo: ['un pacco di C4', 'una granata al plasma'] },
    horror: { amuleto: ['un rosario benedetto', 'un medaglione con un ricciolo di capelli'], alcol: ['una bottiglia di brandy della cantina', 'una bottiglia di assenzio'], veleno: ['un barattolo di zucchero all\'arsenico', 'una fiala senza etichetta'], mappa: ['la pianta originale della villa'], esplosivo: ['una lampada a petrolio', 'una scatola di polvere da sparo antica'] },
    wasteland: { amuleto: ['una piastra di metallo cucita nella giacca', 'un tappo di bottiglia fortunato'], alcol: ['una bottiglia di liquore distillato in un radiatore', 'una tanica di birra di cactus'], veleno: ['una fiala di veleno di scorpione', 'una bottiglia d\'acqua radioattiva'], mappa: ['una mappa delle sorgenti nascoste'], esplosivo: ['una molotov', 'un barile di carburante'] },
    liceo: { amuleto: ['una raccomandazione del preside', 'un certificato medico in bianco'], alcol: ['una lattina di energy drink'], veleno: ['un pettegolezzo avvelenato', 'uno screenshot compromettente'], mappa: ['l\'orario segreto delle verifiche'], esplosivo: ['un video virale', 'una petizione con trecento firme'] },
    ufficio: { amuleto: ['uno zio nel consiglio di amministrazione', 'un contratto blindato'], alcol: ['una bottiglia di prosecco aziendale', 'una bottiglia di limoncello del capo'], veleno: ['una mail anonima all\'ufficio del personale', 'una segnalazione anonima'], mappa: ['l\'organigramma segreto della riorganizzazione'], esplosivo: ['un report che fa saltare tutto', 'la registrazione di una riunione riservata'] },
  };
  Object.keys(LEX).forEach((id) => D.packs.push({ theme: id, lex: LEX[id] }));

  /* ---------- eventi di base del sistema delle conseguenze ---------- */
  D.packs.push({
    theme: '*',
    ev: {
      b: `
2 save:A>B | Nel caos, {A} afferra {B} per il colletto e l[B:o/a] trascina via da una lama.
2 love:AB | {A} e {B} si scontrano nella mischia e si guardano un secondo di troppo. Scatta qualcosa.
1 +amuleto:A @luck | {A} raccoglie da terra {amuleto}. Sembra niente. Non lo è.
1 +mappa:A @int | {A} afferra {mappa} invece di un'arma. Scelta discutibile, o geniale.
1 +esplosivo:A | {A} si ritrova in mano {esplosivo} e corre via tenendo il braccio il più lontano possibile dal corpo.
1 +veleno:A @stl | {A} infila in tasca {veleno} senza che nessuno se ne accorga.
2 hit:A>B @agg | {A} rifila un pugno a {B} per uno zaino. {B} se lo segna.
2 give:A>B=cibo @heal | In mezzo al caos, {A} lancia una borraccia a {B}, che non l[A:o/a] conosce nemmeno.
1 @show star:A | {A} fa una capriola sopra un concorrente in corsa. Gli sponsor prendono appunti.
`,
      d: `
2 grudge:A>B k:A>B *3 | {A} trova finalmente {B} e chiude il conto. "Questo è per {caro:A}."
2 grudge:A>B k:A>B w:A *3 | {A} pianta {arma:A} nel petto di {B} sussurrando: "Per {caro:A}."
2 grudge:A>B hit:A>B *2 | {A} tende un agguato a {B} per {caro:A}, ma {B} riesce a scappare ferit[B:o/a].
2 grudge:A>B k:B>A *1.5 | {A} affronta {B} per {caro:A}, ma la rabbia non basta: {B} l[A:o/a] abbatte.
2 grudge:A>B | {A} segue {B} per tutto il giorno senza farsi vedere. Sta studiando le sue abitudini.
2 grudge:A>B s:A=ferito | {A} si lancia contro {B} urlando, inciampa in una radice e si rompe il naso. La vendetta è rimandata.
3 grudge:A>B k:AC>B debt:A>C *2 | {A} convince {C} ad aiutarl[A:o/a]: {B} paga per {caro:A}. Ora {A} deve un favore a {C}.
3 grudge:A>B al:AC | {A} racconta a {C} cosa ha fatto {B}. {C} decide di stare dalla sua parte.
2 grudge:A>B trap:A k:A>B *3 | {A} prepara una trappola su misura per {B}, con tanto di biglietto: "Per {caro:A}".
2 grudge:A>B veleno:A k:A>B *3 | {A} versa {veleno:A} nell'acqua di {B}. Non resta a guardare: gli basta sapere che è fatta.
2 grudge:A>B @show | {A} grida il nome di {B} verso il cielo. Il pubblico apprezza. {B}, da lontano, molto meno.
2 forgive:A>B @heal | {A} trova {B} in lacrime e, contro ogni logica, l[B:o/a] perdona.
2 forgive:A>B rel:AB+20 @soc | {A} e {B} finalmente si parlano. Viene fuori che era tutto un equivoco. Più o meno.
1 lost:A | {A} parla ad alta voce con {perso:A}, come se fosse ancora lì.
1 lost:A @show star:A | {A} dedica la giornata a {perso:A} davanti alle telecamere. Mezza nazione piange.
1 lost:A s:A=sconvolto | {A} trova un oggetto appartenuto a {perso:A} e crolla.
1 lost:A need:A=lutto d:A *0.5 | Senza {perso:A}, {A} smette semplicemente di difendersi. L'arena non perdona.
1 lost:A need:A=lutto @agg | La rabbia per {perso:A} rende {A} più pericolos[A:o/a] che mai.
2 owe:A>B repay:A>B +cibo:B | {A} divide con {B} le ultime provviste: "Ora siamo pari."
2 repay:A>B save:A>B | {A} salva {B} da {mostro}. Il debito è saldato, con gli interessi.
2 repay:A>B +arma:B | {A} lascia a {B} il bottino migliore della giornata: {arma}. Debito chiuso.
2 owe:A>B | {A} si ricorda di dovere un favore a {B} e l[B:o/a] segue a distanza, per ogni evenienza.
2 owe:A>B br:A @betray | {A} decide che il debito con {B} è troppo pesante e sparisce senza salutare.
3 repay:A>B k:A>C *2 | {C} sta per colpire {B}, ma {A} si mette in mezzo: debito saldato nel modo più rumoroso possibile.
2 save:A>B @heal | {A} tira fuori {B} da {trappola} un attimo prima che scatti.
2 save:A>B rel:AB+20 | {A} dà a {B} l'ultimo sorso d'acqua. {B} non lo dimenticherà.
2 give:A>B=med @heal | {A} lancia a {B} un kit medico senza dire una parola.
2 w:A give:A>B=arma @soc | {A} regala a {B} {arma:A}: "Tu ne hai più bisogno di me."
2 love:AB @soc | Tra {A} e {B} scatta qualcosa davanti a un fuoco. Il pubblico trattiene il respiro.
2 love:AB @show | {A} dichiara il proprio amore a {B} in diretta nazionale. {B} arrossisce e dice di sì.
2 love:AB | {A} e {B} litigano per un'ora su chi debba fare la guardia, poi si baciano. Classico.
2 love:AB save:A>B @luck | {A} salva {B} da una caduta e l[B:o/a] prende al volo. Scatta la scintilla, e anche qualche costola.
2 couple:AB | {A} e {B} incidono le loro iniziali su un albero, poi si ricordano di essere in un'arena.
2 couple:AB +cibo:A | {A} e {B} improvvisano una cena romantica a base di {cibo}.
2 couple:AB @show star:A | {A} canta una serenata a {B}. Gli sponsor piangono e aprono il portafoglio.
2 couple:AB | {A} e {B} litigano per la prima volta. Oggetto della discussione: chi russa di più.
2 couple:AB save:A>B s:A=ferito | {A} si butta davanti a {B} e prende un colpo destinato a [B:lui/lei/loro].
3 couple:AB k:AB>C | {A} e {B} combattono come una cosa sola: {C} non ha nessuna possibilità.
3 couple:AB rel:CA-20 | {C} prova a mettersi tra {A} e {B}. Viene ignorat[C:o/a] con eleganza.
3 couple:AB hit:C>A | {C}, gelos[C:o/a], aggredisce {A} sotto gli occhi di {B}.
2 couple:AB tr:A>B *0.5 | {A} bacia {B} un'ultima volta, poi l[B:o/a] colpisce. Nell'arena le storie d'amore finiscono così.
2 couple:AB d:A *0.4 | {A} muore tra le braccia di {B}: per giorni aveva nascosto una ferita troppo profonda.
1 @show star:A | {A} fa una piroetta davanti alle telecamere mentre scappa da {mostro}. Il pubblico impazzisce.
1 @show | {A} improvvisa un monologo drammatico rivolto al cielo. Due sponsor svengono.
1 fame:A @gift +med:A | Il pubblico ama {A}: {dono} arriva con un kit medico e un biglietto pieno di cuoricini.
1 fame:A s:A=ferito | {A} si gira a salutare il pubblico e va a sbattere contro un albero.
2 fame:B hit:A>B @agg | {A}, invidios[A:o/a] della popolarità di {B}, l[B:o/a] colpisce con una pietra.
2 feared:B @cow | {A} vede arrivare {B} e si arrampica sull'albero più alto della zona.
3 feared:C k:AB>C *2 | {A} e {B} decidono che {C} è troppo pericolos[C:o/a] e uniscono le forze per fermarl[C:o/a].
3 feared:C al:AB | La paura di {C} spinge {A} e {B} a un'alleanza improvvisata.
2 feared:A k:A>B | {B} prova a sfidare {A}. Spoiler: non finisce bene.
2 traitor:B rel:AB-30 | {A} rifiuta di parlare con {B}: tutti sanno cosa ha fatto.
3 traitor:C k:AB>C *1.5 | {A} e {B} decidono che {C} non tradirà mai più nessuno.
2 traitor:A al:AB | {A} riesce a convincere {B} di essere cambiat[A:o/a]. {B} ci crede. Per ora.
1 +amuleto:A @luck | {A} trova {amuleto}: da ora non se ne separerà più.
1 +mappa:A @int | {A} trova {mappa}: ora conosce ogni scorciatoia.
1 +veleno:A @stl | {A} si procura {veleno} e sorride in un modo che non piace a nessuno.
1 +esplosivo:A | {A} trova {esplosivo}. Decide di camminare molto, molto piano.
1 con:A=mappa @int | Grazie a {mappa:A}, {A} trova un riparo che nessun altro conosce.
1 con:A=mappa +cibo:A | {A} segue {mappa:A} fino a un deposito di cibo nascosto.
2 veleno:A k:A>B @stl | {A} versa {veleno:A} nella borraccia di {B}. Effetto garantito.
2 veleno:A poison:A>B @stl | {A} cosparge di {veleno:A} il cibo di {B}, che passa la notte a pentirsi di ogni boccone.
3 esplosivo:A k:A>BC *1.2 | {A} lancia {esplosivo:A} nel mezzo dell'accampamento di {B} e {C}. Boom.
1 esplosivo:A d:A *0.5 | {A} inciampa mentre trasporta {esplosivo:A}. L'arena trema.
2 esplosivo:A hit:A>B | {A} fa saltare {esplosivo:A} vicino a {B}, che si salva per miracolo ma sente fischiare le orecchie per ore.
1 need:A=affamato @mad | {A} ha così fame che prova a mangiare la corteccia di un albero. Non lo consiglia.
1 need:A=affamato +cibo:A cure:A *2 | {A}, mort[A:o/a] di fame, trova {cibo} e non ne lascia nemmeno una briciola.
2 need:A=affamato steal:A<B=cibo rel:BA-40 @agg | Affamat[A:o/a], {A} strappa il cibo dalle mani di {B}.
2 need:B=affamato give:A>B=cibo @heal | {A} vede {B} allo stremo e [B:gli/le] lascia metà delle proprie provviste.
1 s:A=ubriaco @mad | {A} trova {alcol} e decide che è il momento giusto per festeggiare. Non lo è.
1 need:A=ubriaco @show @drunk | Ubriac[A:o/a], {A} sfida a duello un albero. Vince l'albero.
1 need:A=ubriaco d:A @drunk *0.4 | {A}, ubriac[A:o/a] fradic[A:io/ia], decide di attraversare il fiume a nuoto. Di notte. Vestit[A:o/a].
2 need:A=ubriaco love:AB @drunk *0.8 | Complice {alcol}, {A} si dichiara a {B}. Incredibilmente, funziona.
2 need:A=ubriaco hit:B>A @drunk | {A}, ubriac[A:o/a], prova a rubare le scarpe a {B} mentre le indossa.
1 need:A=sconvolto @mad | {A} non dorme da due giorni e parla con i sassi. I sassi rispondono.
1 need:A=sconvolto cure:A @heal | {A} si concede un momento per respirare e torna lucid[A:o/a].
2 enemy:AB | {A} e {B} si incrociano e si fissano per un minuto intero senza muoversi. Nessuno dei due vuole cominciare.
2 enemy:AB k:A>B *1.5 | La rivalità tra {A} e {B} si chiude oggi, nel modo più definitivo possibile.
2 friend:AB al:AB | {A} e {B} si stimano da giorni: oggi lo rendono ufficiale.
2 friend:AB +cibo:A +cibo:B | {A} e {B} passano la giornata a pescare e a raccontarsi barzellette terribili.
`,
      n: `
2 grudge:A>B k:A>B @stl *3 | {A} si avvicina a {B} nel sonno. Questa volta nessuno l[A:o/a] ferma. Per {caro:A}.
2 grudge:A>B | {A} non dorme: osserva il fuoco di {B} da lontano.
1 lost:A | {A} guarda le stelle e ne sceglie una per {perso:A}.
2 couple:AB | {A} e {B} si addormentano abbracciati e per una notte l'arena sembra lontana.
2 couple:AB | {A} e {B} passano la notte a scegliere il nome del cane che avranno se usciranno vivi. Ne scelgono diciotto.
2 love:AB | Al buio, {A} e {B} si scambiano un segreto ciascuno. Al mattino si scambiano anche un bacio.
2 repay:A>B | {A} fa la guardia tutta la notte per far dormire {B}. Debito saldato.
2 save:A>B | {A} sveglia {B} appena in tempo: {mostro} stava girando intorno al loro accampamento.
1 need:A=ubriaco @drunk | {A} canta l'inno dell'arena a squarciagola alle tre di notte, rivelando la propria posizione a tutti.
2 traitor:B rel:AB-30 | {A} sorprende {B} a frugare nel suo zaino. Chi tradisce una volta...
1 con:A=amuleto | {A} stringe {amuleto:A} e per la prima volta dorme tranquill[A:o/a].
2 feared:B hit:B>A | {A} prova ad attaccare {B} nel sonno, ma {B} dorme con un occhio aperto e risponde con violenza.
1 need:A=affamato s:A=malato | {A} ha talmente fame che mangia dei funghi a caso. Pessima idea.
2 owe:A>B | {A} non riesce a dormire: pensa a quanto deve a {B}.
`,
      f: `
2 grudge:A>B k:A>B *3 | {A} va al festino per una ragione sola: {B}. E {B} c'è.
2 couple:AB +med:A +cibo:B | {A} e {B} si dividono i compiti al festino e tornano con il doppio del bottino.
2 repay:A>B +med:B | {A} recupera al festino anche lo zaino di {B}: debito saldato.
1 fame:A @gift +amuleto:A | Gli sponsor hanno preparato per {A} uno zaino speciale: dentro c'è {amuleto}.
2 save:A>B | {A} tira via {B} dal banchetto un secondo prima che esploda la trappola.
`,
      finale: `
2 grudge:A>B k:A>B *4 | Il destino ha senso dell'umorismo: l'ultimo scontro è tra {A} e {B}. {A} vince, per {caro:A}.
2 k:A>B @show | {A} e {B} si affrontano davanti a un pubblico record. {A} vince e fa l'inchino.
2 owe:B>A k:A>B | {B} esita: deve ancora la vita a {A}. Quell'esitazione è fatale.
2 k:A>B | {A} e {B} si guardano, ridono della follia di tutto quanto, poi combattono. Ride per ultim[A:o/a] {A}.
2 con:A=amuleto k:A>B | {B} colpisce per prim[B:o/a], ma {amuleto:A} devia il colpo. {A} non sbaglia il proprio.
`,
      ds: `
1 con:A=mappa | Grazie a {mappa:A}, {A} sapeva esattamente dove ripararsi.
2 save:A>B | {A} trascina {B} al sicuro mentre tutto crolla.
2 couple:AB | {A} e {B} si stringono e aspettano che passi. Passa.
2 grudge:A>B k:A>B *2 | Nel caos generale, {A} ne approfitta per regolare i conti con {B}. Per {caro:A}.
2 hit:A>B | Nel fuggi fuggi, {A} spinge {B} a terra per passare per prim[A:o/a].
`,
      sponsor: `
1 +med:A @gift | Un drone degli sponsor recapita a {A} un kit medico con un biglietto: "Siamo tutti con te".
1 +cibo:A @gift | {A} riceve {dono}: dentro c'è {cibo}, e una lettera di un fan un po' inquietante.
1 +arma:A @gift | {A} riceve {dono}: dentro c'è {arma}, con tanto di fiocco.
1 +amuleto:A @gift | Gli sponsor premiano {A} con {amuleto}. "Per le emergenze", dice il biglietto.
1 +mappa:A @gift | {A} riceve {mappa} dagli sponsor. Qualcuno, là fuori, vuole che vinca.
1 need:A=* cure:A +med:A @gift *2 | {A} riceve una cura completa dagli sponsor e torna come nuov[A:o/a].
1 +cibo:A star:A @gift | {A} riceve una torta enorme dagli sponsor, con sopra il proprio nome. Il pubblico applaude.
1 +esplosivo:A @gift | Uno sponsor dal gusto discutibile manda a {A} {esplosivo}.
1 +veleno:A @gift | Uno sponsor anonimo fa recapitare a {A} {veleno}, senza biglietto.
1 s:A=ubriaco @gift | Gli sponsor mandano a {A} {alcol}. {A} brinda al pubblico. Più volte.
`,
      lovers: `
2 couple:AB d:B | {B} guarda {A} negli occhi e fa un passo indietro, oltre il bordo. "Vinci tu." L'arena resta in silenzio.
2 couple:AB d:B | {A} e {B} si rifiutano di combattere. Dopo ore, {B} si lascia cadere tra le braccia di {A}: aveva una ferita che non aveva mai mostrato.
2 couple:AB d:B | {B} beve l'ultima boccetta di veleno prima che {A} possa fermarl[B:o/a]. "Esci di qui e racconta di noi."
2 couple:AB d:B | {A} e {B} decidono di tirare a sorte. Vince {A}. {B} sorride, ed è l'ultima volta.
2 couple:AB d:B | {A} e {B} trovano un'uscita per una sola persona. Litigano su chi debba usarla. Vince {B}, che spinge dentro {A} e resta fuori. L'arena se l[B:o/a] prende poco dopo.
2 couple:AB d:B @show | {B} si dichiara sconfitt[B:o/a] per amore di {A}, davanti a tutta la nazione. Gli organizzatori, commossi per quasi tre secondi, fanno comunque il loro lavoro.
`,
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
