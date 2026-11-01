/* Liceo Spietato e Ufficio Open Space — legami, conseguenze ed estensioni.
 * Il Liceo non ha contenuti 18+ (i personaggi sono studenti). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];

  D.packs.push({
    theme: 'liceo',
    ev: {
      b: `
2 save:A>B | {A} fa sedere {B} al proprio tavolo in mensa il primo giorno, salvandol[B:o/a] dalla solitudine eterna.
2 love:AB | {A} e {B} si scontrano in corridoio e i libri cadono a terra. Come nei film. Esattamente come nei film.
1 +amuleto:A @luck | {A} scopre che il preside è un vecchio amico di famiglia: ha in tasca {amuleto}.
2 hit:A>B @agg | {A} fa lo sgambetto a {B} davanti a tutta la scuola. {B} non dimentica.
1 @show star:A | {A} arriva il primo giorno in monopattino elettrico facendo una sgommata. Diventa leggenda.
`,
      d: `
2 grudge:A>B k:A>B *3 | {A} prepara per settimane il colpo finale contro {B}: uno screenshot, il momento giusto, la chat di istituto. Per {caro:A}.
2 grudge:A>B hit:A>B *2 | {A} fa sparire il compito di {B} dalla cattedra per {caro:A}. {B} prende due.
2 grudge:A>B | {A} fissa {B} per tutta l'ora di storia. {B} non riesce a concentrarsi.
2 forgive:A>B @heal | {A} e {B} chiariscono tutto in bagno durante l'intervallo, tra le lacrime e un pacchetto di fazzoletti.
2 love:AB @soc | {A} scrive un bigliettino a {B}: "Ti piaccio? Sì / No / Forse". {B} crocetta "Sì" e aggiunge un cuore.
2 love:AB @show | {A} chiede a {B} di uscire davanti a tutta la classe con un cartellone. {B} dice di sì. La classe esplode.
2 couple:AB | {A} e {B} si scambiano le felpe. Ufficialmente ora è una cosa seria.
2 couple:AB @show star:A | {A} dedica una canzone a {B} al microfono dell'assemblea di istituto. Metà scuola piange.
2 couple:AB | {A} e {B} litigano perché uno dei due ha messo "mi piace" alla foto sbagliata.
3 couple:AB hit:C>A | {C}, gelos[C:o/a] di {A} e {B}, inizia a spargere voci su {A}.
3 couple:AB k:C>A *0.6 | {C} si mette in mezzo tra {A} e {B} con un piano diabolico: {A} lascia la scuola con il cuore a pezzi.
2 save:A>B @heal | {A} copre {B} con il professore inventando una scusa perfetta.
2 repay:A>B +med:B | {A} passa a {B} le risposte della verifica: "Così siamo pari".
2 owe:A>B br:A @betray | {A} è stuf[A:o/a] di dovere favori a {B} e cambia gruppo senza dire niente.
2 give:A>B=med @heal | {A} presta a {B} gli appunti di tutto il quadrimestre, già evidenziati.
1 lost:A | {A} guarda il banco vuoto di {perso:A} e non riesce a seguire la lezione.
1 lost:A @show | {A} organizza una raccolta firme per riammettere {perso:A}. Firmano in tre.
2 feared:B @cow | {A} vede arrivare {B} in corridoio e si nasconde nell'aula di musica.
3 feared:C k:AB>C *2 | {A} e {B} si alleano per far cadere {C}, la persona più temuta della scuola.
2 traitor:B rel:AB-30 | {A} sa cosa ha fatto {B} e lo dice a tutti in cortile.
1 fame:A @gift +amuleto:A | La popolarità di {A} sale alle stelle: arriva un invito alla festa più esclusiva e {amuleto}.
1 fame:A s:A=ferito | {A} si fa un selfie camminando e va a sbattere contro la porta della presidenza.
1 +veleno:A @stl | {A} ottiene {veleno} e aspetta il momento giusto per usarlo.
2 veleno:A k:A>B @stl *1.5 | {A} pubblica {veleno:A} su {B}. {B} non si fa più vedere a scuola.
1 +mappa:A @int | {A} ottiene {mappa}. Da oggi non verrà mai più interrogat[A:o/a] a sorpresa.
1 con:A=mappa @int | Grazie a {mappa:A}, {A} sa esattamente quando fingersi malat[A:o/a].
2 esplosivo:A k:A>B | {A} lancia {esplosivo:A} contro {B}. L'effetto è devastante.
1 need:A=affamato @mad | {A} salta la colazione e alla terza ora mangia una gomma da cancellare. Per sbaglio, dice.
1 s:A=ubriaco @mad | {A} beve tre energy drink prima della verifica e consegna dopo quattro minuti un compito scritto in diagonale.
2 enemy:AB | {A} e {B} si sfidano a chi prende il voto più alto. Prendono entrambi sei meno.
2 friend:AB al:AB | {A} e {B} si giurano amicizia eterna incidendo le iniziali sotto un banco.
`,
      n: `
2 grudge:A>B k:A>B @stl *3 | Alle tre di notte {A} crea un account anonimo e pubblica tutto su {B}. Per {caro:A}.
2 couple:AB | {A} e {B} restano al telefono fino all'alba senza dirsi praticamente niente.
2 love:AB | {A} e {B} si scrivono tutta la notte. Al mattino arrivano a scuola tenendosi per mano.
1 lost:A | {A} rilegge le vecchie chat con {perso:A} e non dorme.
2 repay:A>B | {A} aiuta {B} con i compiti di matematica fino a mezzanotte. Debito saldato.
`,
      f: `
2 couple:AB @show | {A} e {B} vengono eletti coppia della festa. La corona è di cartone, il momento no.
2 grudge:A>B k:A>B *3 | {A} aspettava la festa solo per una cosa: fare uscire {B} dalla competizione davanti a tutti.
`,
      sponsor: `
1 +med:A @gift | I fan di {A} [A:gli/le] mandano gli appunti di tutte le materie, rilegati.
1 +amuleto:A @gift | Una professoressa ammiratrice regala a {A} {amuleto}.
1 star:A @gift | Il profilo di {A} supera i diecimila follower. Tutti vogliono sedersi vicino a [A:lui/lei/loro].
1 +veleno:A @gift | Qualcuno manda a {A} in forma anonima {veleno}. Pare che {A} abbia dei fan pericolosi.
`,
      lovers: `
2 couple:AB d:B | {B} si ritira dalla competizione per lasciare vincere {A}. Romantico, o forse soltanto stanc[B:o/a].
2 couple:AB d:B | {A} e {B} decidono di lanciare una moneta. Vince {A}. {B} cambia scuola, ma promette di scrivere ogni giorno.
2 couple:AB d:B @show | {B} chiede pubblicamente alla Preside di eliminare se stess[B:o/a] al posto di {A}. La Preside, commossa, accetta.
`,
      finale: `
2 grudge:A>B k:A>B *4 | L'ultima sfida è proprio tra {A} e {B}. Vince {A}, per {caro:A}.
2 k:A>B @show | {A} batte {B} all'ultima interrogazione davanti a tutta la scuola, e fa un inchino.
`,
      ds: `
2 save:A>B | {A} copre {B} con il professore all'ultimo momento.
2 couple:AB | {A} e {B} si tengono per mano e passa tutto.
`,
    },
    dis: `
L'occupazione | Gli studenti occupano la scuola per una settimana. | {A} viene beccat[A:o/a] a dormire in presidenza e sospes[A:o/a]. | {A} prende freddo dormendo in palestra. | {A} organizza il servizio mensa e diventa indispensabile. | malato
Il viaggio di istruzione | Gita di cinque giorni in una capitale europea. | {A} perde l'aereo del ritorno e non rientra mai più. | {A} si fa beccare fuori dall'albergo alle tre di notte. | {A} si comporta da modello e viene premiat[A:o/a].
La pagella | Arrivano le pagelle del primo quadrimestre. | {A} trova cinque insufficienze e viene ritirat[A:o/a] dai genitori. | {A} trova due insufficienze e un mese di punizione. | {A} trova solo otto e nove.
Il professore severissimo | Arriva il professore più temuto della provincia, quello che boccia per sport. | {A} viene bocciat[A:o/a] alla prima domanda. | {A} prende tre e una nota. | {A} risponde con una citazione in latino e conquista il professore.
Il wifi della scuola | Il wifi della scuola diventa velocissimo e tutti scaricano di tutto. | {A} scarica il virus che cancella il registro elettronico ed è espuls[A:o/a]. | {A} viene beccat[A:o/a] a guardare serie in classe. | {A} usa il wifi per studiare, unica persona al mondo.
La giornata dello sport | Gare di atletica obbligatorie per tutti. | {A} si strappa un muscolo e resta fuori per sempre. | {A} arriva ultim[A:o/a] davanti a tutti. | {A} vince la staffetta.
Il nuovo arrivato | Arriva uno studente nuovo bellissimo, e tutti perdono la testa. | {A} si dichiara pubblicamente e viene respint[A:o/a] davanti a tutta la scuola. | {A} si distrae così tanto da prendere due in fisica. | {A} resta indifferente.
Il black friday dei compiti | La professoressa assegna duecento esercizi per il giorno dopo. | {A} non dorme per due notti e crolla. | {A} ne fa la metà e prende una nota. | {A} li fa tutti in un'ora con il fratello maggiore. | malato
La chat dei genitori | La chat dei genitori scopre tutto quello che succede in classe. | {A} viene mess[A:o/a] in punizione fino all'estate. | {A} perde il telefono per un mese. | {A} ha genitori che non leggono la chat.
Il ballo di fine anno anticipato | Il ballo di fine anno viene anticipato a sorpresa a domani. | {A} non trova nessuno con cui andare e non si presenta più a scuola. | {A} si presenta con il vestito sbagliato. | {A} ha già tutto pronto da mesi.
`,
  });

  D.packs.push({
    theme: 'ufficio',
    ev: {
      b: `
2 save:A>B | {A} mostra a {B} dove sono la macchinetta del caffè buona e il bagno pulito. {B} [A:gli/le] sarà grat[B:o/a] per sempre.
2 love:AB | {A} e {B} si incrociano davanti alla fotocopiatrice. Lo sguardo dura un secondo di troppo.
1 +amuleto:A @luck | {A} scopre di avere {amuleto}. Lo tiene per sé.
2 hit:A>B @agg | {A} soffia a {B} la scrivania vicino alla finestra. {B} ne prende nota.
1 @show star:A | {A} si presenta il primo giorno con le paste per tutti. Sale subito nei sondaggi interni.
`,
      d: `
2 grudge:A>B k:A>B *3 | {A} inoltra al Direttore, con tempismo perfetto, la mail sbagliata di {B}. Per {caro:A}.
2 grudge:A>B hit:A>B *2 | {A} mette {B} in copia a tutte le mail più noiose dell'azienda per {caro:A}. Centoventi al giorno.
2 grudge:A>B | {A} prenota tutte le sale riunioni per tutta la settimana, solo per impedire a {B} di usarle.
2 forgive:A>B @heal | {A} e {B} si chiariscono davanti a un caffè. Restano comunque due persone che si sopportano a malapena.
2 love:AB @soc | {A} e {B} scoprono di andare nello stesso bar dopo il lavoro. Ora ci vanno insieme.
2 love:AB @show | {A} dichiara il proprio amore a {B} durante la riunione del lunedì, in videochiamata, con quaranta colleghi collegati.
2 couple:AB | {A} e {B} si mandano messaggi sulla chat aziendale pensando che nessuno li legga. L'ufficio informatico li legge tutti.
2 couple:AB @show star:A | {A} porta a {B} il caffè con il cuore disegnato nella schiuma. Tutto l'open space sospira.
2 couple:AB | {A} e {B} litigano perché uno dei due ha messo l'altro in copia nascosta.
3 couple:AB hit:C>A | {C}, gelos[C:o/a], segnala {A} alle Risorse umane per "comportamento inappropriato vicino alla stampante".
3 couple:AB k:C>A *0.6 | {C} sabota il progetto di {A} pur di allontanarl[A:o/a] da {B}. {A} viene licenziat[A:o/a].
2 save:A>B @heal | {A} si prende la colpa per l'errore di {B} durante la riunione.
2 repay:A>B +med:B | {A} copre {B} durante la sua assenza: "Così siamo pari".
2 owe:A>B br:A @betray | {A} è stuf[A:o/a] di dovere favori a {B} e chiede il trasferimento a un altro piano.
2 give:A>B=med @heal | {A} passa a {B} la presentazione già pronta per la riunione con il cliente.
1 lost:A | {A} guarda la scrivania vuota di {perso:A} e [A:gli/le] viene un groppo in gola.
1 lost:A @show | {A} appende sulla scrivania vuota di {perso:A} un post-it: "Non ti dimenticheremo". Il post-it si stacca.
2 feared:B @cow | {A} vede {B} avvicinarsi alla propria scrivania e finge una telefonata importantissima.
3 feared:C k:AB>C *2 | {A} e {B} si alleano per far cadere {C}, che ha già fatto licenziare troppi colleghi.
2 traitor:B rel:AB-30 | {A} scopre che {B} ha parlato male di tutti al Direttore. Lo dice a tutti in pausa caffè.
1 fame:A @gift +amuleto:A | Il Direttore nota {A} alla festa aziendale e [A:gli/le] regala {amuleto}.
1 fame:A s:A=ferito | {A} si fa vedere troppo in riunione e si ritrova con tre progetti in più.
1 +veleno:A @stl | {A} ottiene {veleno} e sorride davanti al monitor.
2 veleno:A k:A>B @stl *1.5 | {A} invia {veleno:A} su {B}. Venerdì {B} riceve lo scatolone.
1 +mappa:A @int | {A} si procura {mappa}: ora sa chi verrà tagliato.
1 con:A=mappa @int | Grazie a {mappa:A}, {A} si fa spostare nel reparto giusto prima della tempesta.
2 esplosivo:A k:A>B | {A} sgancia {esplosivo:A} in riunione: il ruolo di {B} viene eliminato.
1 need:A=affamato @mad | {A} salta il pranzo per una call e alle quattro mangia le caramelle per la tosse del collega.
1 s:A=ubriaco @mad | {A} esagera con il caffè: nove espressi prima delle undici. Parla così veloce che nessuno capisce più niente.
2 enemy:AB | {A} e {B} si contendono la stessa promozione e passano la giornata a mettersi in copia a vicenda.
2 friend:AB al:AB | {A} e {B} scoprono di odiare la stessa persona. È l'inizio di una bella amicizia.
`,
      n: `
2 grudge:A>B k:A>B @stl *3 | Alle undici di sera {A} manda al Direttore un'email molto dettagliata su {B}. Per {caro:A}.
2 couple:AB | {A} e {B} fanno gli straordinari insieme. Più o meno lavorano.
2 love:AB | {A} e {B} restano in ufficio fino a tardi e ordinano una pizza in due. Alla terza fetta si baciano.
1 lost:A | {A} conserva la tazza di {perso:A} nel proprio cassetto.
2 repay:A>B | {A} finisce il report di {B} alle due di notte. Debito saldato.
`,
      f: `
2 couple:AB @show | {A} e {B} ballano il lento alla cena aziendale. Il Direttore applaude, poi chiede chi siano.
2 grudge:A>B k:A>B *3 | {A} aspettava la cena aziendale per una cosa sola: far fare a {B} una pessima figura davanti al consiglio.
`,
      sponsor: `
1 +med:A @gift | Il cliente più importante manda a {A} un cesto natalizio fuori stagione.
1 +amuleto:A @gift | Le Risorse umane premiano {A} con {amuleto}.
1 star:A @gift | {A} viene nominat[A:o/a] dipendente del mese. La foto nel corridoio è orribile, ma conta.
1 +veleno:A @gift | Qualcuno lascia sulla scrivania di {A} una busta anonima con dentro {veleno}.
`,
      lovers: `
2 couple:AB d:B | {B} si dimette per lasciare il posto a {A}. "Tanto apro un agriturismo", dice.
2 couple:AB d:B | {A} e {B} si giocano il posto a morra cinese. Vince {A}. {B} sorride e prepara lo scatolone.
2 couple:AB d:B @show | {B} chiede al Direttore di licenziare se stess[B:o/a] al posto di {A}. Il Direttore, commosso, approva in quattro secondi.
`,
      finale: `
2 grudge:A>B k:A>B *4 | La promozione finale è tra {A} e {B}. Vince {A}, per {caro:A}.
2 k:A>B @show | {A} batte {B} alla presentazione finale con una slide animata così bella che il consiglio applaude in piedi.
`,
      ds: `
2 save:A>B | {A} copre {B} durante l'ispezione all'ultimo momento.
2 couple:AB | {A} e {B} si fanno forza a vicenda e superano anche questa.
`,
    },
    dis: `
La settimana corta | L'azienda introduce la settimana di quattro giorni, ma con il lavoro di sei. | {A} non regge il ritmo e si dimette. | {A} lavora fino a sera tutti i giorni e si ammala. | {A} si organizza benissimo e se ne va alle quattro. | malato
Il trasloco digitale | Tutti i documenti vengono spostati su un nuovo sistema. Metà spariscono. | {A} perde il contratto del cliente più importante ed è fuori. | {A} perde una settimana di lavoro. | {A} aveva una copia di tutto su chiavetta.
Il colloquio annuale | Il Direttore incontra uno per uno tutti i dipendenti. | {A} dice la verità su cosa pensa dell'azienda. | {A} balbetta e si guadagna un richiamo. | {A} recita la parte alla perfezione e ottiene un aumento.
La riunione fiume | La riunione del lunedì dura fino al martedì. | {A} si addormenta in riunione ed è licenziat[A:o/a]. | {A} non mangia per un giorno intero. | {A} porta i panini e diventa indispensabile. | affamato
La stagista prodigio | Arriva una stagista che sa fare tutto meglio di tutti. | {A} viene sostituit[A:o/a] dalla stagista. | {A} deve rifare tutto il lavoro che la stagista ha corretto. | {A} diventa il mentore della stagista.
La cyber truffa | Una mail truffaldina arriva a tutti, firmata dal Direttore. | {A} paga la "fattura urgente" con la carta aziendale. | {A} clicca sul link e infetta il computer. | {A} riconosce la truffa e la segnala.
Il caldo record | L'aria condizionata si rompe nella settimana più calda dell'anno. | {A} sviene in sala riunioni e non torna più. | {A} lavora con i piedi in un secchio d'acqua. | {A} lavora dalla sala server, unica stanza fresca. | malato
Il controllo degli orari | Il nuovo badge registra ogni minuto di pausa. | {A} supera le pause consentite ed è licenziat[A:o/a]. | {A} riceve un richiamo per le pause caffè. | {A} non fa mai pausa e viene premiat[A:o/a].
La raccolta fondi | Il Direttore chiede a tutti di contribuire alla festa aziendale. | {A} non contribuisce e viene esclus[A:o/a] da tutto. | {A} contribuisce troppo e resta senza soldi per il pranzo. | {A} contribuisce con una torta e diventa il preferito. | affamato
L'ufficio senza scrivanie | L'azienda elimina le scrivanie fisse: chi arriva prima sceglie. | {A} arriva tardi per tre giorni e lavora nel corridoio, finché non se ne va. | {A} finisce ogni giorno vicino al bagno. | {A} arriva alle sei e si prende la scrivania migliore.
`,
  });

  D.packs.push({
    theme: 'ufficio', adult: true,
    ev: {
      d: `
2 love:AB @show | {A} e {B} vengono sorpres[AB:i/e] nello sgabuzzino della cancelleria. Escono con le camicie abbottonate male e le guance rosse.
1 s:A=ubriaco | {A} si porta una bottiglia di vino in ufficio "per il compleanno di qualcuno". Non è il compleanno di nessuno.
1 @mad | {A} perde la pazienza e manda al Direttore una mail di dimissioni piena di parolacce, in copia a tutta l'azienda.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a] dopo l'aperitivo, {A} trascina {B} nell'ufficio del Direttore. La telecamera di sicurezza registra tutto.
2 k:A>B | {A} fa girare tra i colleghi le foto della festa aziendale in cui {B} balla sul tavolo senza camicia.
`,
      n: `
2 couple:AB | {A} e {B} restano in ufficio fino a tardi. La mattina dopo la fotocopiatrice ha un problema che nessuno sa spiegare.
`,
    },
    dis: `
La festa di Natale fuori controllo | La festa aziendale finisce con il Direttore che balla sul bancone e il tesoriere che piange in bagno. | {A} si sveglia accanto alla persona sbagliata del consiglio di amministrazione e non torna più in ufficio. | {A} si sveglia con un'emicrania e una foto imbarazzante in giro. | {A} se ne va alle undici, appena in tempo. | ubriaco
Il team building in spa | L'azienda organizza un ritiro in una spa con sauna mista. | {A} dice al Direttore, in accappatoio, quello che pensa di lui. | {A} si ustiona nella sauna e passa due giorni a letto. | {A} si gode il massaggio e torna rilassatissim[A:o/a].
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
