/* Liceo Spietato — quarto pacchetto: interrogazioni, chat di classe, macchinette che rubano monete,
 * gite, cotte, professori leggendari e l'ansia che sale. Nessuno muore: si viene eliminati. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'liceo',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+mappa:A ko:pr:A+15 | Al suono della prima campanella {A} arriva per prim[A:o/a] alla bacheca e fotografa tutto: {arma} e {mappa}. || Al suono della prima campanella {A} corre verso la bacheca, scivola sul pavimento appena lavato e arriva ultim[A:o/a], con l'ansia già alle stelle.
1 +attrezzo:A @int | Mentre gli altri cercano alleati, {A} si procura {attrezzo}. Il primo giorno vince chi è organizzat[A:o/a].
1 @cow +cibo:A | {A} si chiude nel bagno del secondo piano con {cibo} e il telefono, e non esce finché non suona la seconda ora.
2 al:AB @soc | {A} e {B} si siedono allo stesso banco senza essersi mai parlati. Alla fine della prima ora si sono già scambiati i numeri: alleanza.
2 hit:A>B steal:A<B=arma @agg | {A} sfila dallo zaino di {B} {arma} mentre {B} cerca il banco libero. Primo giorno, prima mossa.
1 test:A=car12 ok:+amuleto:A ko:mo:A-10 | {A} saluta con educazione il bidello e ottiene in cambio {amuleto}. Alleati preziosi. || {A} saluta il bidello con troppo entusiasmo. Il bidello l[A:o/a] guarda come si guarda una minaccia.
`,
      d: `
1 stat:A>pr45 test:A=cor13 ok:pr:A-30 ko:pr:A+10 | {A} chiude gli occhi, respira con il diaframma come ha visto su un video e si presenta all'interrogazione a testa alta. Va benissimo. || {A} prova a respirare con il diaframma prima dell'interrogazione. Scopre di non sapere dov'è il diaframma.
1 con:A=attrezzo pr:A-20 | {A} usa {attrezzo:A} per riordinare gli appunti in schemi colorati. L'ansia, davanti agli schemi colorati, indietreggia.
1 wx:pericolo pr:A+20 | Verifica a sorpresa di matematica in tutte le classi: {A} apre il foglio e riconosce solo il proprio nome.
1 test:A=int13 ok:+med:A ko:pr:A+10 | {A} recupera dalla Biblioteca un riassunto dell'anno scorso, sottolineato da un genio: {med}. || {A} cerca un riassunto in Biblioteca e trova solo il manuale delle istruzioni della fotocopiatrice.
1 test:A=furt13 ok:+valore:A ko:s:A=ferito | {A} si infila nella sala professori durante la ricreazione e prende {valore} dal cassetto delle cose sequestrate. || {A} si infila nella sala professori durante la ricreazione. La professoressa di latino non è uscita.
1 test:A=sop12 ok:+cibo:A ok:+cibo:A ko:food:A-10 | {A} scopre che la macchinetta del terzo piano dà due merendine al prezzo di una se la si colpisce nel punto giusto. || {A} prova a colpire la macchinetta nel punto giusto. La macchinetta si tiene le monete e anche un po' di dignità.
1 @luck +cibo:A mo:A+5 | Il rappresentante d'istituto lascia sul banco di {A} un trancio di pizza avanzato dalla riunione: {cibo}.
1 @mad mo:A+10 | {A} si presenta in classe con un cappello da pirata «per motivi religiosi». Nessun professore ha il coraggio di chiedere.
1 star:A @show | {A} fa una storia sui social mentre scivola sul corrimano delle scale. Diventa virale in dodici minuti.
1 en:A+15 | {A} si addormenta in Aula magna durante l'assemblea d'istituto. È il sonno migliore della settimana.
1 stat:A<mo30 mo:A+15 | {A} riceve un messaggio vocale da casa: «Comunque vada, siamo fieri di te». Lo riascolta tre volte in bagno.
1 need:A=ferito test:A=car12 ok:hp:A+20 ko:hp:A-8 | {A} si presenta dalla professoressa per recuperare il brutto voto di ieri e la convince con un discorso perfetto. || {A} prova a recuperare il brutto voto di ieri. La professoressa ascolta tutto, sorride, e mette un altro brutto voto.
1 test:A=cor14 ok:+arma:A ok:star:A ko:hp:A-20 | {A} entra nella sala del preside per riprendersi il telefono sequestrato. Ne esce con il telefono e con il registro delle note. || {A} entra nella sala del preside per riprendersi il telefono. Il preside è seduto al buio, in silenzio, e l[A:o/a] aspettava.
1 wx:calma pr:A-10 mo:A+5 | Assemblea d'istituto con musica: niente lezioni, niente verifiche. {A} passa la mattina sul prato del Cortile a guardare le nuvole.
1 wx:abbondanza +cibo:A food:A+10 | Alla Mensa oggi c'è la pizza del venerdì, anche se è martedì. {A} ne prende tre pezzi.
1 trait:A=superstizioso pr:A-20 | {A} indossa la stessa felpa fortunata della verifica dell'anno scorso, quella del nove. L'ansia, davanti alla felpa, si arrende.
1 trait:A=ingegnoso +trap:A | {A} crea un sondaggio anonimo su chi sia il peggior compagno di classe. Le risposte, ovviamente, non resteranno anonime.
1 trait:A=goloso food:A+20 | {A} scopre che il bar della scuola regala i cornetti avanzati alle undici. Arriva alle 10:59. Ogni giorno.
1 trait:A=paranoico pr:A-10 en:A-10 | {A} controlla quattro volte di aver lasciato la chat di classe in silenzioso. Poi controlla che il silenzioso funzioni.
1 trait:A=esibizionista star:A mo:A+10 | {A} si presenta al compito in classe vestit[A:o/a] da Napoleone «per entrare nel personaggio». Prende sette.
1 trait:A=romantico mo:A+10 | {A} scrive una poesia d'amore anonima e la infila nell'armadietto sbagliato. La riceve la professoressa di ginnastica, che si commuove.
1 trait:A=solitario mo:A+10 | {A} passa l'intervallo da sol[A:o/a] in Biblioteca, con un libro e le cuffie. È il momento più bello della giornata.
1 trait:A=stratega mo:A+5 pr:A-10 | {A} disegna sul quaderno lo schema di chi è amico di chi in classe, con le frecce. È più complicato della guerra dei trent'anni.
2 ally:AB test:A=int12 ok:pr:A-15 ok:pr:B-15 ko:pr:A+10 ko:pr:B+10 | {A} e {B} studiano insieme in Biblioteca, interrogandosi a vicenda. Alla verifica volano. || {A} e {B} studiano insieme in Biblioteca. Studiano soprattutto i video di gatti.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} divide con {B} la merenda a metà, anche se è la merendina preferita. Questo è affetto vero.
2 save:A>B @heal | {B} viene chiamat[B:o/a] alla lavagna senza aver studiato. {A} suggerisce la risposta con un labiale perfetto. {B} si salva per un soffio.
2 debt:B>A give:A>B=med @heal | {A} passa a {B} gli appunti della lezione persa, ordinati e evidenziati. {B} non dimenticherà.
2 crush:A>B rel:AB+15 | {A} lascia nell'astuccio di {B} un bigliettino con un cuore disegnato e nessuna firma. {B} passa la giornata a fare l'interrogatorio a tutta la classe.
2 couple:AB pr:A-15 pr:B-15 mo:A+10 mo:B+10 | {A} e {B} si tengono la mano sotto il banco durante la verifica di fisica. Prendono lo stesso voto. Bassissimo, ma insieme.
2 hit:A>B @agg | {A} scopre che {B} l[A:o/a] ha imitat[A:o/a] nel gruppo della classe e risponde con un vocale di quattro minuti, davanti a tutti.
2 enemy:AB test:A=furt13 ok:pr:B+20 ko:pr:A+15 | {A} cambia di nascosto la data della verifica sul diario di {B}. || {A} prova a cambiare la data della verifica sul diario di {B}, ma {B} se ne accorge e lo racconta in chat.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} di fare il progetto di gruppo insieme. || {A} propone a {B} di fare il progetto insieme. {B} risponde «ci penso», che al liceo vuol dire no.
2 rival:AB @show rel:AB+5 | {A} e {B} si sfidano a chi fa più piegamenti durante l'ora di ginnastica. Il professore li fa continuare finché non piangono tutti e due.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} mostra a {B} il diario segreto. {B} lo legge tutto e non dice niente a nessuno. È l'inizio di qualcosa.
2 fear:A>B en:A-15 | {A} vede {B} far piangere una supplente in tre minuti e da quel giorno cambia corridoio.
2 ally:AB test:A=cor13 ok:pr:A-15 ok:pr:B-15 ok:rel:AB+10 ko:pr:A+15 | {A} e {B} vanno insieme dalla Preside a protestare per la verifica a sorpresa, e vincono. || {A} e {B} vanno insieme dalla Preside a protestare. Escono con una verifica in più.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano in punizione nella stessa aula e scoprono di odiare la stessa professoressa. Nasce un gruppo.
3 hit:A>B hit:A>C @agg | {A} scopre che {B} e {C} hanno creato un gruppo chat senza di l[A:ui/ei] e si vendica pubblicando i loro vocali più imbarazzanti.
3 ally:AB rel:AB+10 | {A} e {B} si scambiano uno sguardo mentre {C} spiega per la terza volta di aver «quasi» baciato una celebrità in vacanza.
2 k:A>B w:A @agg | {A} consegna alla Preside {arma:A}, con le prove contro {B}. {B} viene sospes[B:o/a] prima della ricreazione.
2 k:A>B grudge:A>B | {A} fa girare in tutta la scuola il segreto di {B}, per {caro:A}. Alla fine della giornata {B} chiede il trasferimento.
1 d:A @mad | {A} risponde «presente» durante l'appello di un'altra classe e viene coinvolt[A:o/a] in un compito di chimica avanzata. Non si riprende più.
1 d:A wx:pericolo | L'ispezione ministeriale arriva in classe proprio mentre {A} sta copiando dal telefono. Eliminazione immediata.
`,
      n: `
1 pr:A+15 | La sera prima della verifica {A} non riesce a dormire e ripete le date della storia a memoria fino alle tre.
1 test:A=res12 ok:en:A+10 ko:pr:A+20 | {A} studia fino a tardi con il caffè della macchinetta e domina il ripasso. || {A} prova a studiare fino a tardi con il caffè della macchinetta, ma si addormenta sul libro e si sveglia con la pagina stampata in faccia.
1 test:A=int12 ok:en:A+15 ko:pr:A+15 | Il gruppo chat della classe impazzisce a mezzanotte. {A} silenzia tutto e dorme. || Il gruppo chat della classe impazzisce a mezzanotte e {A} legge tutti i 482 messaggi. Uno parla di l[A:ui/ei].
1 @stl en:A+15 | {A} spegne il telefono, nasconde il registro elettronico e dorme nove ore. Al mattino è un'altra persona.
1 con:A=amuleto pr:A-15 | {A} stringe {amuleto:A} prima di addormentarsi e ripete: «Domani va bene». Domani, forse, andrà bene.
1 @luck +med:A | Durante la notte qualcuno condivide nel gruppo chat le soluzioni dell'esercizio di domani: {med}. Il mittente è anonimo, il cuore di {A} no.
1 trait:A=sonnambulo en:A-10 | {A} manda nel sonno un vocale alla chat di classe in cui recita i verbi irregolari. Alle sette ha trenta reazioni.
1 trait:A=codardo pr:A+10 | {A} passa la notte a scrivere un messaggio di scuse a una persona che non sa nemmeno di essere stata offesa. Non lo invia.
1 trait:A=folle mo:A+10 | {A} passa la notte a scrivere una canzone rap sulla professoressa di matematica. Domani sarà nella playlist di tutta la scuola.
1 mo:A-10 | Sul profilo della scuola compaiono le foto degli eliminati, con le faccine tristi. {A} ne riconosce una e non dorme più.
2 ally:AB pr:A-10 pr:B-10 en:A+10 | {A} e {B} fanno una videochiamata per ripassare e finiscono a ridere fino alle due. L'ansia, stanotte, ha perso.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} si scrivono fino a tardi, poi si mandano la buonanotte nello stesso istante. Sorridono al soffitto.
2 crush:A>B rel:AB+10 | {A} guarda per la ventesima volta l'ultima storia di {B}. Poi mette un cuoricino. Poi lo toglie. Poi lo rimette.
2 friend:AB give:A>B=med @heal | {B} è nel panico per l'interrogazione di domani. {A} [B:gli/le] manda i suoi riassunti e resta in chiamata finché non si calma.
2 enemy:AB test:A=furt13 ok:pr:B+20 ko:pr:A+15 | {A} manda di notte una foto imbarazzante di {B} nel gruppo sbagliato. || {A} prova a mandare una foto imbarazzante di {B}, ma la manda alla propria madre.
2 save:A>B @heal | {B} sta per mandare un messaggio molto, molto sbagliato alla chat di classe. {A} [B:gli/le] scrive in privato appena in tempo: «NON FARLO».
2 trust:A>B fid:A>B+10 | {A} dà a {B} la password dell'account dei compiti. Al liceo, non esiste fiducia più grande.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia nell'armadietto di {B} una merendina e un biglietto: «Ora siamo pari».
3 al:ABC @soc | {A}, {B} e {C} creano un gruppo segreto per studiare insieme. Il nome del gruppo è un meme. Al mattino sono una squadra.
2 k:A>B @stl | Di notte {A} manda alla Preside, in forma anonima, quello che sa su {B}. Al mattino {B} viene convocat[B:o/a] e non torna in classe.
1 d:A pr:A+25 | {A} non dorme, non studia e non risponde ai messaggi. Al mattino non si presenta a scuola. L'ansia ha vinto.
2 k:A>B trap:A | {A} lascia {trap:A} nell'armadietto di {B}. Il giorno dopo {B} viene eliminat[B:o/a] per un malinteso che non riuscirà mai a chiarire.
`,
      f: `
1 +med:A +cibo:A @luck | Alla festa di fine anno {A} vince la lotteria della classe: {med} e {cibo}.
2 hit:A>B steal:A<B=cibo @agg | Alla festa di fine anno {A} e {B} si contendono l'ultima fetta di torta. La vince {A}, con un'arringa da avvocato.
2 al:AB @soc | Alla festa di fine anno {A} e {B} ballano insieme la canzone più imbarazzante della playlist. Da stasera sono alleati.
1 test:A=car13 ok:star:A ok:+amuleto:A ko:pr:A+20 | {A} prende il microfono della festa e fa un discorso che fa piangere tutta la scuola. || {A} prende il microfono della festa. Il microfono fischia, e così la scuola.
2 k:A>B w:A @agg | Alla festa di fine anno {A} proietta sul maxischermo {arma:A}. {B} lascia la festa, e il liceo.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
