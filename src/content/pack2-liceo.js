/* Liceo Spietato — secondo pacchetto: popolarità, cotte, complotti da corridoio. Nessuno muore. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'liceo',
    ev: {
      b: `
1 +attrezzo:A @int | Il primo giorno, {A} si procura {attrezzo}. È già un passo avanti a tutti.
1 +armatura:A @luck | {A} arriva con {armatura}. Nessuno riuscirà a scalfirl[A:o/a] per almeno una settimana.
1 +valore:A | {A} si presenta con {valore} nello zaino. In questo liceo, è come avere un lingotto d'oro.
1 @show star:A | {A} entra in classe in ritardo, con gli occhiali da sole e una canzone in testa. Tutti ne parlano a pranzo.
1 s:A=sconvolto | {A} scopre di essere in classe con la persona che l[A:o/a] ha bullizzat[A:o/a] alle medie.
2 al:AB @soc | {A} e {B} si siedono allo stesso banco per caso. Dopo un'ora si passano già i bigliettini.
2 k:A>B @agg | Il primo giorno, {A} rovescia il caffè della macchinetta sulla camicia di {B}. {B} chiede di cambiare scuola.
2 hit:A>B | {A} chiama {B} con il soprannome delle elementari davanti a tutti. Il soprannome resta.
2 crush:A>B rel:AB+10 | {A} vede {B} entrare in classe e dimentica il proprio nome per un istante.
3 al:ABC @soc | {A}, {B} e {C} scoprono di avere la stessa playlist preferita. È deciso: sono un gruppo.
1 test:A=car12 ok:star:A ko:s:A=ferito | {A} si presenta alla classe con una battuta. Ridono tutti. || {A} si presenta alla classe con una battuta. Silenzio. Tossisce qualcuno.
`,
      d: `
1 stat:A<mo25 s:A=sconvolto | {A} passa la ricreazione chius[A:o/a] in bagno a scorrere i commenti cattivi.
1 stat:A>mo75 star:A @show | {A} è di buon umore e lo fa sapere a tutti con un vocale di tre minuti. Va virale.
1 stat:A>pr60 s:A=malato | L'ansia di {A} è così forte che il giorno della verifica [A:gli/le] viene la febbre. Vera, stavolta.
1 stat:A>pr60 con:A=alcol -alcol:A pr:A-30 | {A} si scola {alcol} prima della verifica. Il cuore batte forte, ma l'ansia scende.
1 stat:A<hp40 @heal mo:A+20 | {A} passa un pomeriggio con la nonna, che [A:gli/le] dice che è bellissim[A:o/a]. La reputazione non cambia, ma il morale sì.
1 stat:A<food30 +cibo:A | {A} scopre un distributore in Palestra che regala due merendine invece di una.
1 con:A=attrezzo star:A @int | {A} usa {attrezzo:A} per prendere nove nella verifica di matematica. Il professore sospetta qualcosa, ma non trova niente.
1 con:A=valore -valore:A +attrezzo:A | {A} compra {attrezzo} da uno di quinta con {valore}. Affare.
1 con:A=ricordo mo:A+15 | {A} sfoglia {ricordo:A} durante l'ora di religione. [A:Gli/Le] viene da sorridere.
1 wx:buio @stl | Approfittando del caos, {A} entra in sala professori e legge in anteprima le domande della verifica.
1 wx:abbondanza +cibo:A | Alla gita, {A} riempie lo zaino di panini dell'autogrill. Ne avanza per tutta la settimana.
1 wx:pericolo s:A=ferito | La settimana dei colloqui: la madre di {A} incontra il professore di storia. Disastro.
1 trait:A=esibizionista star:A | {A} fa un balletto in corridoio durante il cambio dell'ora. Lo filmano tutti.
1 trait:A=stratega +attrezzo:A | {A} organizza un sistema di bigliettini con tre livelli di sicurezza. È {attrezzo}, praticamente.
1 trait:A=superstizioso +amuleto:A | {A} porta {amuleto} a ogni verifica. Ha sempre preso sei. Non cambia niente, ma non si sa mai.
1 trait:A=ubriacone s:A=ubriaco | {A} beve tre energy drink prima della prima ora. Parla velocissimo fino all'ora di pranzo.
1 att:A>int8 star:A | {A} corregge il professore di fisica alla lavagna. Ha ragione. La classe applaude, il professore meno.
1 att:A<int3 s:A=ferito | {A} confonde Garibaldi con Gandalf all'interrogazione di storia. Lo sa tutto il liceo entro sera.
2 crush:A>B rel:AB+15 @soc | {A} lascia nell'armadietto di {B} un biglietto anonimo con un cuore disegnato male.
2 crush:A>B love:AB *2 | {A} e {B} restano chius[AB:i/e] in biblioteca per una verifica di recupero. Alla fine si mettono insieme. La verifica, meno bene.
2 crush:A>B s:A=sconvolto | {A} vede {B} parlare con qualcun altro in cortile e passa il pomeriggio a scrivere poesie tristi.
2 plot:A>B rel:AB+10 | {A} aiuta {B} con i compiti di latino. Ne approfitta per fotografare il suo diario.
2 plot:A>B -attrezzo:B +attrezzo:A @stl | {A} fa sparire {attrezzo:B} dallo zaino di {B} il giorno prima della verifica. Fa parte del piano.
2 plot:A>B k:A>B *2 | {A} manda alla preside lo screenshot che {B} non doveva mai mandare. {B} è fuori.
2 goal:A=vendetta grudge:A>B hit:A>B | Per {caro:A}, {A} crea un gruppo su {B} e ci invita mezza scuola. {B} lo scopre la sera stessa.
2 goal:A=vendetta grudge:A>B k:A>B *2 | {A} aspettava solo il momento giusto: durante l'assemblea, legge ad alta voce i messaggi di {B}. Per {caro:A}.
2 goal:A=reclutare al:AB @soc | {A} invita {B} a pranzo al tavolo dei popolari. {B} accetta. È nato un gruppo.
2 goal:A=spettacolo star:A hit:A>B | {A} fa una parodia di {B} durante l'intervallo. Ridono tutti, tranne {B}.
2 goal:A=cibo give:B>A=cibo debt:A>B | {B} divide il trancio di pizza con {A}, che non aveva soldi. «Me lo offri domani.»
2 con:A=armatura hit:B>A | {B} prova a far girare un pettegolezzo su {A}, ma {armatura:A} regge: nessuno ci crede.
2 con:A=valore give:A>B=valore rel:AB+20 | {A} regala a {B} {valore}. {B} diventa amic[B:o/a] di {A} con una velocità sospetta.
2 owe:A>B repay:A>B rel:AB+10 | {A} copre {B} con il professore: «Era in bagno con me». Debito saldato.
2 enemy:AB hit:A>B | {A} e {B} si contendono l'ultimo posto in pullman per la gita. Vince {A}, ma la guerra è appena cominciata.
2 enemy:AB k:A>B *0.7 | {A} fa notare in assemblea che il voto di condotta di {B} è un mistero. Il mistero finisce: {B} è sospes[B:o/a].
2 couple:AB star:A star:B | {A} e {B} si presentano alla festa d'istituto vestit[AB:i/e] uguali. Sono la coppia dell'anno.
2 couple:AB rel:AB-25 | {A} e {B} litigano in diretta nella chat di classe. Duecento persone leggono. Nessuno interviene.
2 friend:AB give:A>B=attrezzo | {A} presta a {B} {attrezzo:A} per la verifica. Una vera amicizia.
2 traitor:B rel:AB-20 | {A} scrive sulla lavagna «non fidatevi di {B}». Il bidello lo cancella, ma lo hanno visto tutti.
2 test:A=car13 ok:al:AB ko:hit:B>A | {A} prova a convincere {B} a fare gruppo per il progetto di scienze. Accetta. || {A} prova a convincere {B} a fare gruppo per il progetto di scienze. {B} ride e lo racconta a tutti.
3 plot:A>B ally:ABC rel:AC+20 | {A} confida a {C} che {B} parla male di tutti alle spalle. Non è vero. {C} però smette di salutarl[B:o/a].
3 hit:A>B hit:B>C @agg | La catena di gossip della mattina: {A} sparla di {B}, {B} se la prende con {C}, {C} non sa neanche di cosa si parli.
3 k:A>B rel:AC+15 | {A} e {C} organizzano uno scherzo a {B} che va troppo bene: {B} chiede il trasferimento.
`,
      n: `
1 stat:A>pr60 pr:A+10 | {A} ripassa fino alle tre di notte e sogna di sbagliare la data della Rivoluzione francese.
1 stat:A<en25 s:A=ferito | {A} si addormenta durante la videochiamata di gruppo. Tutti fanno lo screenshot.
1 con:A=ricordo | {A} si addormenta con {ricordo:A} sul cuscino.
1 wx:pericolo s:A=sconvolto | La chat di classe esplode a mezzanotte. {A} legge tutto fino alle quattro.
1 @mad | {A} scrive trecento messaggi in un gruppo dove è l'unic[A:o/a] membro.
2 crush:A>B @soc | {A} resta online tutta la notte sperando che {B} scriva. {B} scrive alle due: «Hai i compiti di inglese?»
2 crush:A>B rel:AB+10 | {A} mette like a una foto di {B} di tre anni fa. Panico. Toglie il like. Troppo tardi: {B} l'ha visto.
2 plot:A>B br:A | {A} esce dal gruppo di WhatsApp senza salutare e si porta via tutte le risposte della verifica. {B} capisce tutto alle sette del mattino.
2 plot:A>B tr:A>B *2 | {A} inoltra alla preside la chat privata del gruppo, con {B} in bella vista. {B} è fuori dai giochi.
2 couple:AB pr:A-15 pr:B-15 | {A} e {B} si mandano vocali fino all'alba. L'ansia, per una notte, scende.
2 couple:AB stat:B<hp40 save:A>B | {A} scrive un post lunghissimo per difendere {B}. Funziona: il giorno dopo nessuno ride più.
2 owe:A>B repay:A>B | {A} manda a {B} le soluzioni dei compiti di matematica alle sei del mattino. Debito saldato.
2 grudge:A>B forgive:A>B trait:A=clemente | {A} scrive a {B} un messaggio lunghissimo per fare pace. Poi lo cancella e manda solo «ciao». Basta così.
`,
      f: `
2 crush:A>B love:AB *3 | Alla festa di fine anno, {A} chiede a {B} di ballare il lento. {B} dice di sì. Si mettono insieme davanti a tutti.
2 crush:A>B s:A=sconvolto | Alla festa di fine anno, {A} vede {B} ballare il lento con un'altra persona. Se ne va prima della torta.
2 plot:A>B k:A>B *2 | Alla festa di fine anno, {A} fa partire sul proiettore le foto più imbarazzanti di {B}. {B} esce dalla festa e dai giochi.
1 con:A=valore -valore:A star:A | Alla festa, {A} offre {valore} al DJ per una dedica a se stess[A:o/a]. Funziona.
`,
      sponsor: `
1 +attrezzo:A @gift | Una mano anonima infila nello zaino di {A} {attrezzo}.
1 +valore:A @gift | {A} trova {valore} nel proprio armadietto, con un biglietto: «Da un ammiratore».
1 +ricordo:A mo:A+20 @gift | La sorella maggiore di {A} [A:gli/le] lascia {ricordo} e un biglietto: «Spaccali tutti».
`,
      finale: `
2 k:A>B | Nell'Aula magna, davanti alla preside, {A} e {B} si giocano la popolarità con l'ultimo discorso. Il liceo sceglie {A}.
2 k:A>B con:A=attrezzo | All'ultima interrogazione, {A} ha {attrezzo:A}. {B} no. Fine della partita.
`,
    },
    dis: `
L'ispezione del ministero | Gli ispettori del ministero entrano nelle classi senza preavviso. | {A} viene sorpres[A:o/a] a copiare e sospes[A:o/a]. | {A} balbetta per tutta l'interrogazione davanti agli ispettori. | {A} risponde a tutto con un sorriso perfetto. | sconvolto
Il compito a sorpresa | Tutte le classi fanno un compito a sorpresa nello stesso giorno. | {A} consegna il foglio bianco e perde l'anno. | {A} prende quattro e mezzo. | {A} aveva studiato per sbaglio proprio quel capitolo. | ferito
L'influenza di gennaio | Mezza scuola si ammala nella stessa settimana. | {A} resta a casa troppi giorni e viene esclus[A:o/a] dai giochi. | {A} viene a scuola con la febbre e contagia mezzo banco. | {A} si lava le mani ogni dieci minuti, e funziona. | malato
La chat della classe trapelata | Tutti i messaggi della chat di classe finiscono online. | {A} aveva scritto le cose peggiori, e si ritira dai giochi. | {A} ha scritto una cosa imbarazzante, ma solo una. | {A} non scrive mai in chat, e ne esce pulit[A:o/a]. | sconvolto
Lo sciopero dei professori | Niente lezioni per tre giorni, ma tante verifiche dopo. | {A} si dimentica di rientrare e viene bocciat[A:o/a]. | {A} rientra senza aver studiato niente. | {A} ha studiato durante lo sciopero, e ora è avanti a tutti. | affamato
L'assemblea che degenera | L'assemblea d'istituto finisce in una rissa di cori. | {A} viene sospes[A:o/a] per aver lanciato un astuccio. | {A} viene filmat[A:o/a] mentre canta stonando. | {A} era in bagno durante tutta l'assemblea. | ferito
La gita disastrosa | La gita finisce con il pullman in panne in autostrada. | {A} si perde all'autogrill e non torna più in classe. | {A} dorme sul pullman e si sveglia con la faccia disegnata. | {A} trova un passaggio con i genitori di un amico. | sconvolto
La festa clandestina | Una festa clandestina in Palestra viene scoperta dalla preside. | {A} viene trovat[A:o/a] sotto il tavolo del buffet. Sospensione. | {A} riesce a scappare, ma lascia la scarpa. Tutti sanno di chi è. | {A} non era stat[A:o/a] invitat[A:o/a]. Per una volta, è un bene. | sconvolto
Il blackout del registro elettronico | Il registro elettronico va in tilt e tutti i voti si mescolano. | {A} si ritrova con la media di un altro, e non è una buona media. | {A} perde il nove più importante dell'anno. | {A} si ritrova un otto inspiegabile, e non fa domande. | ferito
La pagella di metà anno | Arrivano le pagelle. Le famiglie le leggono. | {A} non supera lo scrutinio e lascia i giochi. | {A} viene mess[A:o/a] in punizione per una settimana. | {A} ha una pagella perfetta, e la incornicia. | sconvolto
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
