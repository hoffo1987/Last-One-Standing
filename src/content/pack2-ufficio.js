/* Ufficio Open Space — secondo pacchetto: carriera, stress, complotti da riunione. Nessuno muore: si viene licenziati. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'ufficio',
    ev: {
      b: `
1 +attrezzo:A @int | Il lunedì mattina, {A} si procura {attrezzo}. Da quel momento, lavora la metà e rende il doppio.
1 +armatura:A @luck | {A} conquista {armatura}. Nessuno riuscirà a disturbarl[A:o/a] per giorni.
1 +valore:A | {A} trova {valore} nel cassetto della scrivania nuova. Il precedente occupante non tornerà a reclamarlo.
1 @show star:A | {A} si presenta alla prima riunione con le slide più belle mai viste. Nessuno ascolta cosa dice, ma tutti applaudono.
2 al:AB @soc | {A} e {B} scoprono di odiare la stessa persona del terzo piano. Nasce un'alleanza solidissima.
2 k:A>B @agg | {A} si prende il merito del progetto di {B} davanti al Direttore. {B} svuota la scrivania prima di pranzo.
2 hit:A>B | {A} mette {B} in copia a una mail molto imbarazzante. Il danno è fatto.
2 crush:A>B rel:AB+10 | {A} incrocia {B} alla macchinetta del caffè e dimentica completamente il motivo per cui era lì.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano a pranzo allo stesso tavolo e fondano un gruppo di lamentele. Il più potente dell'azienda.
1 test:A=int12 ok:star:A ko:s:A=ferito | {A} presenta il piano trimestrale con un grafico a torta perfetto. || {A} presenta il piano trimestrale, ma il proiettore mostra la sua cronologia di ricerca.
`,
      d: `
1 stat:A<mo25 s:A=sconvolto | {A} guarda fuori dalla finestra per un'ora intera. Il cursore lampeggia sul foglio bianco.
1 stat:A>mo75 star:A @show | {A} è così di buon umore che porta i cornetti a tutto il piano. Il Direttore se lo segna.
1 stat:A>pr60 s:A=malato | Lo stress di {A} è tale che [A:gli/le] viene una dermatite a forma di grafico Excel.
1 stat:A>pr60 con:A=alcol -alcol:A pr:A-30 | {A} si concede {alcol} alle tre del pomeriggio, nascost[A:o/a] in sala stampanti. Lo stress scende.
1 stat:A<hp40 @heal hp:A+20 | {A} riceve un complimento sincero dal Direttore. La reputazione risale di colpo.
1 stat:A<food30 +cibo:A | {A} scopre una riunione con il buffet al piano di sopra. Si autoinvita. Nessuno chiede chi sia.
1 con:A=attrezzo star:A @int | {A} usa {attrezzo:A} per chiudere in dieci minuti un report da tre giorni. Il capo pensa che sia un genio.
1 con:A=valore -valore:A +attrezzo:A | {A} baratta {valore} con l'informatico in cambio di {attrezzo}.
1 con:A=ricordo mo:A+15 | {A} sposta {ricordo:A} al centro della scrivania. La giornata migliora un po'.
1 wx:buio @stl | Con il server giù, {A} esce alle tre del pomeriggio e nessuno se ne accorge.
1 wx:abbondanza +cibo:A | C'è una torta in cucina. {A} ne prende quattro fette e le nasconde nel cassetto.
1 wx:pericolo s:A=ferito | La chiusura trimestrale travolge {A}, che si ritrova a lavorare fino alle undici di sera.
1 trait:A=esibizionista star:A | {A} risponde a ogni domanda in riunione con un aneddoto su di sé. Il Direttore, incredibilmente, apprezza.
1 trait:A=stratega +attrezzo:A | {A} costruisce un foglio Excel che prevede chi sarà licenziato. È {attrezzo}, di fatto.
1 trait:A=goloso +cibo:A | {A} sa a che ora arrivano i dolci della pasticceria per il compleanno del Direttore. È sempre lì un minuto prima.
1 att:A>int8 star:A | {A} trova l'errore nella formula che costava all'azienda un milione all'anno. Diventa leggenda.
1 att:A<int3 s:A=ferito | {A} risponde «a tutti» con un messaggio destinato a una sola persona. Era un messaggio sul Direttore.
2 crush:A>B rel:AB+15 @soc | {A} lascia un caffè sulla scrivania di {B} ogni mattina. Senza zucchero, come piace a {B}. Ha studiato.
2 crush:A>B love:AB *2 | {A} e {B} restano bloccat[AB:i/e] in ascensore per un'ora. Quando le porte si aprono, si tengono per mano.
2 crush:A>B s:A=sconvolto | {A} scopre che {B} ha messo «mi piace» alla foto di qualcun altro della contabilità. Pomeriggio rovinato.
2 plot:A>B rel:AB+10 | {A} invita {B} a pranzo e ascolta con attenzione. Prende appunti mentali su tutto quello che {B} dice del Direttore.
2 plot:A>B -attrezzo:B +attrezzo:A @stl | {A} si fa prestare {attrezzo:B} da {B} e «si dimentica» di restituirlo. Fa parte del piano.
2 plot:A>B k:A>B *2 | {A} inoltra al Direttore la chat in cui {B} lo chiama «il dinosauro». {B} viene licenziat[B:o/a] entro sera.
2 goal:A=vendetta grudge:A>B hit:A>B | Per {caro:A}, {A} programma per {B} una riunione alle 18:55 del venerdì. Ogni venerdì.
2 goal:A=vendetta grudge:A>B k:A>B *2 | {A} aspettava solo il momento giusto: nel colloquio annuale di {B}, porta le prove. Per {caro:A}. {B} viene licenziat[B:o/a].
2 goal:A=reclutare al:AB @soc | {A} invita {B} al pranzo del giovedì. Da quel giorno sono inseparabili, almeno in pausa.
2 goal:A=spettacolo star:A hit:A>B | {A} presenta come propria un'idea di {B} durante il meeting. Applausi. {B} non applaude.
2 goal:A=cibo give:B>A=cibo debt:A>B | {B} divide il pranzo con {A}, che l'ha dimenticato a casa. «Me lo offri tu venerdì.»
2 con:A=armatura hit:B>A | {B} prova a scaricare un errore su {A}, ma {armatura:A} regge: nessuno ci crede.
2 con:A=valore give:A>B=valore rel:AB+20 | {A} regala a {B} {valore}. {B} diventa alleat[B:o/a] di {A} senza neanche saperlo.
2 owe:A>B repay:A>B rel:AB+10 | {A} copre {B} in riunione: «Era in call con un cliente». Debito saldato.
2 enemy:AB hit:A>B | {A} e {B} si contendono la sala riunioni migliore. Vince {A}. {B} si segna la data.
2 enemy:AB k:A>B *0.7 | {A} fa notare al Direttore che {B} timbra alle 9:00 ma arriva alle 9:40. {B} viene licenziat[B:o/a].
2 couple:AB star:A star:B | {A} e {B} si presentano alla cena aziendale mano nella mano. Ufficio sconvolto, risorse umane in allarme.
2 couple:AB rel:AB-25 | {A} e {B} litigano in una mail con trenta persone in copia. È la mail più letta dell'anno.
2 friend:AB give:A>B=attrezzo | {A} passa a {B} {attrezzo:A} prima della revisione di bilancio.
2 traitor:B rel:AB-20 | {A} scrive alla lavagna della sala riunioni «chi tradisce in ufficio tradisce sempre», guardando {B}.
2 test:A=car13 ok:al:AB ko:hit:B>A | {A} propone a {B} di lavorare insieme al nuovo progetto. {B} accetta. || {A} propone a {B} di lavorare insieme al nuovo progetto. {B} inoltra la proposta al capo, con un commento.
3 plot:A>B ally:ABC rel:AC+20 | {A} confida a {C} che {B} vuole prendersi il suo posto. Non è vero. {C} però comincia a chiudere la porta quando passa {B}.
3 hit:A>B hit:B>C @agg | La catena della mail sbagliata: {A} risponde male a {B}, {B} risponde peggio a {C}, {C} risponde a tutti.
3 k:A>B rel:AC+15 | {A} e {C} montano un caso contro {B} con tre slide. {B} viene licenziat[B:o/a] entro venerdì.
`,
      n: `
1 stat:A>pr60 pr:A+10 | {A} risponde a una mail alle tre di notte. Poi a un'altra. Poi non dorme più.
1 stat:A<en25 s:A=ferito | {A} si addormenta durante la call delle 18 con la telecamera accesa. Russa. Il cliente ride.
1 con:A=ricordo | {A} si addormenta in ufficio con {ricordo:A} accanto alla tastiera.
1 wx:pericolo s:A=sconvolto | La chiusura trimestrale non finisce mai. {A} vede l'alba dalla finestra dell'ufficio.
1 @mad | {A} passa gli straordinari a dare un nome a ogni pianta dell'ufficio. Le piante sono più simpatiche dei colleghi.
2 crush:A>B @soc | {A} resta in ufficio fino a tardi solo perché c'è anche {B}. Non lavora un minuto.
2 crush:A>B rel:AB+10 | {A} scrive una mail di tre righe a {B} e la rilegge quaranta volte prima di inviarla.
2 plot:A>B br:A | {A} lascia il gruppo di lavoro con tutti i file del progetto. {B} se ne accorge lunedì.
2 plot:A>B tr:A>B *2 | {A} manda al Direttore il foglio delle ore di {B}, con le pause evidenziate in giallo. {B} è fuori.
2 couple:AB pr:A-15 pr:B-15 | {A} e {B} ordinano sushi in ufficio a mezzanotte. Lo stress, per un'ora, sparisce.
2 couple:AB stat:B<hp40 save:A>B | {A} riscrive di notte il report sbagliato di {B} e lo rimanda con il suo nome. {B} è salv[B:o/a].
2 owe:A>B repay:A>B | {A} sistema la presentazione di {B} prima della riunione delle nove. Debito saldato.
2 grudge:A>B forgive:A>B trait:A=clemente | {A} cancella la mail di fuoco già scritta per {B} e manda solo: «Ne parliamo domani». Basta così.
`,
      f: `
2 crush:A>B love:AB *3 | Alla cena aziendale, {A} invita {B} a ballare. {B} accetta. Il karaoke, da quel momento, ha una coppia.
2 crush:A>B s:A=sconvolto | Alla cena aziendale, {A} vede {B} ridere con qualcuno del marketing. Se ne va prima del dolce.
2 plot:A>B k:A>B *2 | Alla cena aziendale, {A} fa ubriacare {B} e poi l[B:o/a] spinge al microfono vicino al Direttore. {B} dice tutto. {B} è fuori.
1 con:A=valore -valore:A star:A | Alla cena aziendale, {A} paga {valore} per sedersi accanto al Direttore. Ne vale la pena.
`,
      sponsor: `
1 +attrezzo:A @gift | L'ufficio IT lascia sulla scrivania di {A} {attrezzo}. Con un biglietto: «Non dire niente a nessuno».
1 +valore:A @gift | {A} vince {valore} alla lotteria aziendale.
1 +ricordo:A mo:A+20 @gift | Arriva per {A} un pacco da casa: {ricordo} e un messaggio: «Sei bravissim[A:o/a]».
`,
      finale: `
2 k:A>B | Nell'Ufficio del direttore, {A} e {B} presentano la propria proposta finale. Il Direttore promuove {A}.
2 k:A>B con:A=attrezzo | All'ultima riunione, {A} ha {attrezzo:A}. {B} ha solo slide. Vince {A}.
`,
    },
    dis: `
La riorganizzazione | L'azienda annuncia una «riorganizzazione delle risorse». | {A} scopre di essere una risorsa riorganizzata, e non è una buona notizia. | {A} viene spostat[A:o/a] nell'ufficio senza finestre. | {A} viene promoss[A:o/a] per sbaglio. | sconvolto
L'audit esterno | Arrivano i revisori dei conti. | {A} non riesce a giustificare le spese di rappresentanza. Licenziat[A:o/a]. | {A} passa tre giorni a cercare scontrini. | {A} ha tutto in ordine, in tre cartelle diverse. | ferito
Il virus informatico | Un virus cancella metà dei file aziendali. | {A} aveva salvato tutto solo sul desktop. Fuori. | {A} perde il lavoro di una settimana. | {A} aveva un backup. Anzi, tre. | ferito
L'influenza d'ufficio | Una brutta influenza gira tra le scrivanie. | {A} resta a casa troppo a lungo e il suo posto viene assegnato a un altro. | {A} lavora con la febbre e contagia mezzo piano. | {A} lavora da casa per tutta la settimana. | malato
Il team building | L'azienda organizza un team building in montagna. | {A} cade dal ponte tibetano e decide di non tornare in ufficio. | {A} si rompe una caviglia durante il rafting. | {A} si fa venire un raffreddore strategico e resta in ufficio. | ferito
La mail del Direttore | Il Direttore manda a tutti una mail che inizia con «Mi dispiace dovervi comunicare...». | {A} legge la mail fino in fondo e capisce di essere in lista. | {A} ha un attacco di panico prima di arrivare alla fine. | {A} non legge le mail del venerdì. | sconvolto
Il trasloco in coworking | L'azienda si trasferisce in un coworking con le scrivanie in comune. | {A} non trova mai una scrivania libera e smette di presentarsi. | {A} lavora per tre giorni sedut[A:o/a] su un pouf. | {A} arriva alle sette e conquista la scrivania vicino alla finestra. | ferito
La fusione aziendale | L'azienda viene comprata da una multinazionale. | {A} non sopravvive al primo colloquio con i nuovi capi. | {A} deve rifare tutti i report in inglese. | {A} parla tre lingue e diventa indispensabile. | sconvolto
Il guasto dell'aria condizionata | L'aria condizionata si rompe ad agosto. | {A} sviene durante la riunione e chiede le dimissioni dall'ospedale. | {A} lavora per giorni con un ventilatore da tavolo. | {A} lavora in smart working dal mare. | malato
La cena dei licenziamenti | Il Direttore invita tutti a cena: a fine serata, consegna delle buste. | {A} apre la busta: è una lettera di licenziamento. | {A} apre la busta: è un trasferimento in un'altra città. | {A} apre la busta: è un buono pasto. | sconvolto
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
