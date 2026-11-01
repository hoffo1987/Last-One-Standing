/* Liceo e Ufficio — terzo pacchetto: vita quotidiana, carattere, oggetti e legami. Nessuno muore. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'liceo',
    ev: {
      d: `
1 @int +attrezzo:A | {A} trova sotto il banco {attrezzo}, dimenticato da qualcuno della classe accanto.
1 @luck star:A | {A} viene interrogat[A:o/a] proprio sull'unico argomento che ha studiato. Nove.
1 @mad | {A} passa l'ora di storia dell'arte a disegnare baffi su tutti i ritratti del libro.
1 @show star:A | {A} si presenta con un taglio di capelli nuovo. Entro mezzogiorno, tre persone lo copiano.
1 @cow | {A} si chiude in biblioteca per tutto l'intervallo, dietro l'enciclopedia più grossa.
1 s:A=ferito | {A} inciampa sulle scale davanti a tutta la scuola. Qualcuno ha filmato.
1 s:A=sconvolto | {A} scopre di essere stat[A:o/a] esclus[A:o/a] dal gruppo della gita.
1 +cibo:A @food | {A} vince la gara a chi mangia più cornetti in ricreazione. Il premio è un altro cornetto.
1 trait:A=leader star:A | {A} si candida come rappresentante d'istituto e fa un discorso così bello che piange anche il bidello.
1 trait:A=paranoico @stl | {A} cambia password a tutti i profili per la terza volta questa settimana.
1 trait:A=pacifista @soc | {A} organizza un sit-in nel cortile contro le verifiche a sorpresa. Partecipano in tre, ma con convinzione.
1 trait:A=furtivo +valore:A | {A} si intrufola nell'ufficio del vicepreside e ne esce con {valore}.
1 trait:A=fortunato star:A | {A} sbaglia tutte le risposte del quiz, ma il professore conta male e [A:gli/le] dà otto.
1 trait:A=sfortunato s:A=ferito | {A} si siede sulla gomma da masticare per il terzo giorno di fila.
1 att:A>car8 @soc star:A | {A} entra in mensa e mezza scuola si gira a salutarl[A:o/a].
1 att:A<car3 s:A=sconvolto | {A} prova a raccontare una barzelletta a pranzo. Non ride nessuno. Neanche l[A:ui/ei].
2 al:AB @soc | {A} e {B} vengono mess[AB:i/e] in coppia per il progetto di chimica. Fanno esplodere un becher e diventano inseparabili.
2 hit:A>B @agg | {A} fa notare ad alta voce che {B} ha la stessa felpa da tre giorni. Ride tutta la fila.
2 k:A>B @agg | {A} dice alla professoressa che {B} ha copiato la verifica da l[A:ui/ei]. {B} viene esclus[B:o/a] dai giochi.
2 k:A>B @stl | {A} fa sparire l'autorizzazione per la gita di {B}. {B} resta a scuola, e fuori dai giochi.
2 save:A>B @heal | {A} difende {B} da un gruppo di quinta che l[B:o/a] prendeva in giro. Da oggi {B} ha un debito.
2 give:A>B=cibo @heal | {A} divide la merenda con {B}, che non aveva soldi per il distributore.
2 love:AB @soc | {A} e {B} si scambiano le cuffiette durante l'ora buca. Ascoltano la stessa canzone. Si capiscono.
2 couple:AB star:A | {A} dedica a {B} una canzone alla radio della scuola. Tutti sanno per chi era.
2 steal:A<B @stl | {A} prende in prestito {arma:B} a {B} e non glielo restituisce.
2 rel:AB+20 @soc | {A} e {B} scoprono di tifare per la stessa squadra. Da quel momento parlano solo di quello.
2 rel:AB-20 | {A} e {B} si contendono lo stesso posto in prima fila durante l'assemblea.
2 trait:A=avido steal:A<B | {A} vende a {B} le risposte del compito per una cifra assurda, poi gliele ruba di nuovo.
2 trait:A=vendicativo grudge:A>B hit:A>B | {A} si ricorda di cosa ha fatto {B} il primo giorno. Durante la gita, si vendica a modo suo.
2 trait:A=generoso give:A>B=valore | {A} regala a {B} {valore}, senza un motivo. {B} sospetta qualcosa. Non c'è niente da sospettare.
2 test:A=int13 ok:star:A ok:rel:AB+10 ko:hit:B>A | {A} risolve alla lavagna il problema che {B} non riusciva a capire. || {A} prova a risolvere il problema al posto di {B} alla lavagna e sbaglia. {B} ride.
2 test:A=furt12 ok:-valore:B ok:+valore:A ko:hit:B>A | {A} sfila {valore} dallo zaino di {B} senza farsi vedere. || {A} prova a sfilare qualcosa dallo zaino di {B}. {B} se ne accorge e lo urla in corridoio.
3 al:ABC @soc | {A}, {B} e {C} formano una band per la festa d'istituto. Suonano malissimo, ma insieme.
3 hit:A>C rel:AB+15 | {A} e {B} prendono in giro {C} per tutta l'ora di educazione fisica.
`,
      n: `
1 @mad | {A} guarda tutorial di trucco alle due di notte. Domani sarà irriconoscibile.
1 s:A=sconvolto | {A} riceve un messaggio anonimo a mezzanotte: «So cosa hai fatto». Non sa cosa ha fatto.
1 @int star:A | {A} finisce la tesina alle quattro di notte. È bellissima.
2 al:AB @soc | {A} e {B} passano la notte in videochiamata a studiare. Studiano poco, parlano tanto.
2 hit:A>B | {A} pubblica a mezzanotte una foto di {B} venuta malissimo. Settanta like in un'ora.
2 k:A>B @agg | {A} manda alla madre di {B} lo screenshot sbagliato. {B} viene ritirat[B:o/a] dai giochi.
`,
    },
  });
  D.packs.push({
    theme: 'ufficio',
    ev: {
      d: `
1 @int +attrezzo:A | {A} eredita dalla scrivania del collega in pensione {attrezzo}. È oro.
1 @luck star:A | {A} sbaglia la riunione, entra in quella del consiglio di amministrazione e fa una domanda intelligente. Promozione sfiorata.
1 @mad | {A} passa due ore a scegliere il carattere giusto per una slide. Sceglie Comic Sans.
1 @show star:A | {A} si presenta in ufficio vestit[A:o/a] come per un matrimonio. Nessuno sa perché, ma funziona.
1 @cow | {A} passa la giornata in bagno a rispondere alle mail dal telefono.
1 s:A=ferito | {A} rovescia il caffè sulla tastiera del Direttore. Il Direttore non è contento.
1 s:A=sconvolto | {A} scopre di non essere stat[A:o/a] invitat[A:o/a] all'aperitivo del venerdì.
1 +cibo:A @food | {A} vince la gara di chi trova per prim[A:o/a] la torta in cucina. Il premio è la torta.
1 trait:A=leader star:A | {A} prende in mano una riunione caotica e la chiude in dieci minuti. Il Direttore l[A:o/a] nota.
1 trait:A=paranoico @stl | {A} scollega la webcam con il nastro adesivo, poi anche il microfono, poi anche il mouse.
1 trait:A=pacifista @soc | {A} organizza una pausa caffè collettiva per rasserenare l'ufficio. Partecipano tutti, tranne il Direttore.
1 trait:A=furtivo +valore:A | {A} si intrufola nell'Ufficio del direttore e ne esce con {valore}.
1 trait:A=fortunato star:A | {A} invia per sbaglio il report sbagliato, ma era quello che il cliente voleva.
1 trait:A=sfortunato s:A=ferito | {A} resta chius[A:o/a] fuori dall'ufficio senza badge per tutta la mattina.
1 att:A>car8 @soc star:A | {A} entra in riunione e tutti si girano ad ascoltarl[A:o/a] prima ancora che parli.
1 att:A<car3 s:A=sconvolto | {A} prova a fare una battuta in riunione. Silenzio. Qualcuno tossisce.
2 al:AB @soc | {A} e {B} lavorano insieme a una presentazione impossibile. La finiscono alle due di notte, ed è perfetta. Ora sono alleati.
2 hit:A>B @agg | {A} fa notare in riunione che {B} ha sbagliato tutte le cifre del report. Davanti al cliente.
2 k:A>B @agg | {A} dice al Direttore che {B} cerca un altro lavoro. È vero. {B} viene licenziat[B:o/a] prima di trovarlo.
2 k:A>B @stl | {A} cancella dal calendario di {B} la riunione più importante dell'anno. {B} non si presenta e viene licenziat[B:o/a].
2 save:A>B @heal | {A} si prende la colpa dell'errore di {B} davanti al Direttore. Ora {B} ha un debito enorme.
2 give:A>B=cibo @heal | {A} porta a {B} metà del suo pranzo, vedendol[B:o/a] mangiare un cracker da sol[B:o/a].
2 love:AB @soc | {A} e {B} scoprono di prendere lo stesso treno ogni mattina. Da quel giorno siedono vicini.
2 couple:AB star:A | {A} dedica a {B} un intero slide deck, a tema «perché sei la persona migliore dell'ufficio».
2 steal:A<B @stl | {A} prende in prestito {arma:B} di {B} e se lo dimentica nel cassetto.
2 rel:AB+20 @soc | {A} e {B} scoprono di odiare entrambi le riunioni del lunedì. Diventano amici in cinque minuti.
2 rel:AB-20 | {A} e {B} si contendono l'ultima capsula di caffè buono.
2 trait:A=avido steal:A<B | {A} si fa prestare da {B} {arma:B} «per cinque minuti». Sono passati tre giorni.
2 trait:A=vendicativo grudge:A>B hit:A>B | {A} non ha dimenticato cosa ha fatto {B} in riunione. Oggi inoltra al capo una vecchia mail di {B}.
2 trait:A=generoso give:A>B=valore | {A} regala a {B} {valore}. {B} non sa se ringraziare o preoccuparsi.
2 test:A=int13 ok:star:A ok:rel:AB+10 ko:hit:B>A | {A} sistema in un'ora il foglio di calcolo che {B} non capiva. || {A} prova a sistemare il foglio di calcolo di {B} e cancella tre mesi di dati.
2 test:A=furt12 ok:-valore:B ok:+valore:A ko:hit:B>A | {A} sfila {valore} dal cassetto di {B} senza farsi vedere. || {A} prova a frugare nel cassetto di {B}. {B} lo scopre e manda una mail a tutti.
3 al:ABC @soc | {A}, {B} e {C} creano una chat segreta per commentare le riunioni. Diventa il centro del potere dell'ufficio.
3 hit:A>C rel:AB+15 | {A} e {B} imitano {C} per tutta la pausa pranzo.
`,
      n: `
1 @mad | {A} riorganizza tutte le cartelle del computer alle due di notte. Per colore.
1 s:A=sconvolto | {A} riceve una mail del Direttore alle 23:58 con oggetto «Domani passi da me». Non dorme.
1 @int star:A | {A} finisce il progetto alle quattro di notte. È geniale.
2 al:AB @soc | {A} e {B} si fermano in ufficio fino a tardi e ordinano la pizza. Lavorano poco, parlano tanto.
2 hit:A>B | {A} programma un'email che parte alle 3 di notte per far sembrare {B} pigr[B:o/a].
2 k:A>B @agg | {A} inoltra al Direttore la mail in cui {B} lo chiama per nome e cognome, con molti aggettivi. {B} è fuori.
`,
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
