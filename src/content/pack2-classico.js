/* Arena Classica — secondo pacchetto: eventi legati a mente, oggetti, meteo e condizione fisica. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'classico',
    ev: {
      b: `
1 +armatura:A @luck | {A} afferra il primo oggetto a portata di mano: {armatura}. Non è un'arma, ma è meglio di niente.
1 +attrezzo:A @int | {A} ignora le armi e punta dritt[A:o/a] a {attrezzo}. Gli altri ridono. Gli altri moriranno prima.
1 +valore:A @mad | {A} riempie lo zaino di {valore}. Non si mangia, non ferisce, ma luccica.
2 hit:A>B steal:A<B=cibo @agg | {A} strappa uno zaino a {B} con una spallata. Dentro ci sono solo {cibo}, ma è una vittoria morale.
2 al:AB +attrezzo:B | {A} e {B} si dividono il bottino della Cornucopia: a {A} la paura, a {B} {attrezzo}. Poi corrono insieme verso il Bosco.
2 k:A>B w:A @agg | {A} raggiunge la Cornucopia per prim[A:o/a] e la difende con {arma:A}. {B} non ci arriverà mai.
3 al:ABC @soc | {A}, {B} e {C} si nascondono dietro la stessa roccia e decidono che, da quel momento, sono una squadra.
1 test:A=agi12 ok:+arma:A ko:s:A=ferito | {A} si lancia tra due concorrenti e ne esce con {arma} in mano. || {A} si lancia tra due concorrenti e ne esce con un taglio sul braccio e niente in mano.
`,
      d: `
1 stat:A<food30 +cibo:A @food | {A} è così affamat[A:o/a] che insegue un coniglio per mezzo Bosco. Lo prende. Piange un po'.
1 stat:A<hp45 @heal hp:A+20 | {A} si ferma al Fiume e si lava le ferite con l'acqua gelida. Brucia, ma funziona.
1 stat:A>mo75 @show star:A | {A} è di ottimo umore e canta per tutta la mattina. Il pubblico in capitale impara il ritornello.
1 stat:A<mo25 s:A=sconvolto | {A} si siede su un sasso e non si muove per ore. Qualcosa, dentro, si è rotto.
1 con:A=attrezzo +cibo:A @int | {A} usa {attrezzo:A} per costruire una nassa nel Fiume. A sera è piena di pesci.
1 con:A=ricordo mo:A+15 | {A} guarda {ricordo:A} e ritrova la forza di alzarsi.
1 con:A=valore -valore:A +med:A | {A} lascia {valore} su un altare improvvisato. Il giorno dopo, al suo posto, c'è {med:A}. Gli sponsor hanno senso dell'umorismo.
1 wx:buio @stl | {A} sfrutta la nebbia per attraversare la radura che nessuno osa attraversare di giorno.
1 wx:abbondanza +cibo:A @food | {A} raccoglie tante bacche che le infila anche nelle tasche, nelle scarpe e nel cappuccio.
1 wx:pericolo s:A=ferito | Il tempo è infame: {A} scivola su una roccia bagnata e si apre il ginocchio.
2 crush:A>B rel:AB+15 @soc | {A} porta a {B} la parte migliore del coniglio arrosto, «per caso». {B} non capisce. Tutti gli altri sì.
2 crush:A>B love:AB *2 | {A} trova {B} al Fiume e, dopo tre giorni di sguardi, finalmente parla. Si baciano sotto un salice. In capitale si sviene.
2 plot:A>B rel:AB+10 | {A} si offre di fare il turno di guardia al posto di {B}. È un gesto gentile. È anche un modo per studiarl[B:o/a] mentre dorme.
2 plot:A>B steal:A<B=cibo @stl @secret | {A} sposta, un po' alla volta, le provviste di {B} nel proprio zaino. Fa parte del piano.
2 goal:A=vendetta grudge:A>B hit:A>B | {A} segue le tracce di {B} fino al Fiume e l[B:o/a] colpisce alle spalle. Per {caro:A}. Non basta ancora.
2 goal:A=cibo give:B>A=cibo debt:A>B | {B} vede quanto è affamat[A:o/a] {A} e [A:gli/le] lascia metà della sua cena. «Me la renderai.»
2 goal:A=caccia k:A>B @agg | {A} ha passato la notte a seguire le impronte di {B}. All'alba, le impronte finiscono.
2 con:A=armatura hit:B>A | {B} colpisce {A} con tutta la forza che ha, ma {armatura:A} regge. {A} sorride. {B} no.
2 con:A=alcol give:A>B=alcol rel:AB+20 | {A} divide {alcol} con {B} attorno al fuoco. Per una sera, l'arena sembra lontana.
2 test:A=sop12 ok:+cibo:A ok:+cibo:B ko:s:A=avvelenato | {A} giura di riconoscere i funghi buoni e ne raccoglie per sé e per {B}. Ha ragione. || {A} giura di riconoscere i funghi buoni. {B} ha il buon senso di non assaggiarli. {A} no.
3 plot:A>B ally:ABC rel:AC+20 | {A} prende da parte {C} e [C:gli/le] racconta, sottovoce, cosa pensa davvero di {B}. {C} ascolta. {C} non dice niente.
1 trait:A=solitario @stl | {A} trova una radura dove non c'è nessuno e, per la prima volta da giorni, sorride.
1 trait:A=cacciatore +cibo:A | {A} segue una pista di sangue per un'ora. In fondo c'è un cervo ferito. Stasera si mangia bene.
2 trait:A=generoso stat:B<food30 give:A>B=cibo | {A} vede {B} frugare tra le foglie e [B:gli/le] lancia {cibo} senza dire una parola.
`,
      n: `
1 stat:A<hp30 @heal s:A=sconvolto | {A} passa la notte stringendo la ferita con le mani e contando le stelle per non svenire.
1 stat:A<en25 s:A=ferito | {A} è così stanc[A:o/a] che si addormenta in piedi e cade da un tronco. Si sveglia con un bernoccolo.
1 con:A=ricordo | {A} si addormenta con {ricordo:A} sotto la guancia.
1 wx:buio @mad | Nella nebbia, {A} sente dei passi intorno al rifugio per tutta la notte. Al mattino non c'è nessuna impronta.
1 wx:pericolo pr:A+15 | Il gelo della notte entra nelle ossa di {A}, che non trova un riparo decente.
2 crush:A>B @soc | {A} resta svegli[A:o/a] tutta la notte per fare la guardia a {B}. {B} non lo saprà mai.
2 crush:A>B rel:AB-10 @mad | {A} prova a dire a {B} quello che prova, ma escono solo parole sul meteo. Molte parole sul meteo.
2 plot:A>B tr:A>B *2 | {A} aspettava solo il buio. {B} si fidava. Sono due cose che, nell'arena, non vanno d'accordo.
2 plot:A>B br:A | {A} sparisce prima dell'alba con metà delle provviste del gruppo. {B} si sveglia e capisce tutto.
2 couple:AB con:A=ricordo give:A>B=ricordo | {A} regala a {B} {ricordo:A}. «Così, se succede qualcosa, avrai un pezzo di casa mia.»
2 couple:AB stat:B<hp40 save:A>B | {A} porta {B}, che sanguina, fino alla grotta più vicina sulle spalle. Arriva all'alba, sfinit[A:o/a], ma arriva.
2 owe:A>B repay:A>B rel:AB+10 | {A} sveglia {B} un attimo prima che {mostro} raggiunga il loro rifugio. Debito saldato.
2 grudge:A>B forgive:A>B trait:A=clemente | {A} guarda {B} dormire a pochi metri e decide che basta così. Non l[B:o/a] perdona: l[B:o/a] lascia andare.
2 goal:A=nascondersi @cow | {A} si nasconde nel tronco cavo dove si era già nascost[B:o/a] {B}. Nessuno dei due si muove fino all'alba.
2 hit:A>B @mad trait:A=sonnambulo | {A} cammina nel sonno, inciampa su {B} e [B:gli/le] sferra un calcio. Si scusa al mattino. {B} non ride.
3 couple:AB crush:C>A | {C} guarda {A} e {B} dormire abbracciati e capisce che non avrà mai una possibilità.
`,
      f: `
1 con:A=valore -valore:A +arma:A | Al festino, {A} baratta {valore} con un concorrente di passaggio: in cambio ottiene {arma}.
2 crush:A>B save:A>B | Al festino, {A} si butta davanti a {B} per salvarl[B:o/a] da una freccia. {B} l[A:o/a] guarda in un modo nuovo.
2 plot:A>B k:A>B *2 | Al festino, nella confusione, {A} si libera di {B}. Nessuno vede niente. Era proprio il piano.
`,
      sponsor: `
1 +armatura:A @gift | Arriva un paracadute per {A}: dentro c'è {armatura}. Il messaggio dice: «Stai attent[A:o/a]».
1 +attrezzo:A @gift | Gli sponsor mandano a {A} {attrezzo} e un biglietto: «Fanne buon uso».
1 +ricordo:A mo:A+20 @gift | Gli sponsor mandano a {A} un pacchetto da casa: dentro c'è {ricordo}. {A} si commuove in diretta nazionale.
`,
      finale: `
2 k:A>B | Sul tetto della Cornucopia, {A} e {B} si guardano per un minuto intero. Poi {A} si muove per prim[A:o/a].
2 k:A>B con:A=armatura | {B} colpisce per prim[B:o/a], ma {armatura:A} para il colpo. {A} non ne dà un secondo a {B}.
2 k:A>B | {A} e {B} lottano nel Fiume fino all'ultimo respiro. Riemerge solo {A}.
`,
    },
    dis: `
Il gelo improvviso | In piena estate, una gelata coperta di brina cala sull'arena in pochi minuti. | {A} si addormenta all'aperto e non si sveglia più. | {A} perde la sensibilità di due dita, ma non la vita. | {A} accende un fuoco appena in tempo e ci si siede sopra, quasi. | ferito
La migrazione dei cinghiali | Un branco di cinghiali mutanti attraversa il Bosco, travolgendo tutto. | {A} viene travolt[A:o/a] dal branco. | {A} viene caricat[A:o/a] e scaraventat[A:o/a] contro un albero. | {A} si arrampica su una quercia e guarda passare cento cinghiali arrabbiati. | ferito
Il fiume impazzito | Gli organizzatori aprono una diga: il Fiume diventa un torrente furioso. | {A} viene trascinat[A:o/a] via dalla corrente. | {A} si aggrappa a un ramo e perde lo zaino. | {A} è sull'Altopiano e guarda il disastro da lontano, con un panino. | affamato
La nebbia acida | Una nebbia gialla sale dalle Paludi e brucia gli occhi. | {A} respira troppa nebbia e non si rialza. | {A} tossisce sangue per ore. | {A} si copre la faccia con un panno bagnato e cammina controvento. | malato
La pioggia di aghi | Dagli alberi cadono milioni di aghi di pino affilati come rasoi. | {A} non trova riparo in tempo. | {A} si ritrova con la schiena trasformata in un puntaspilli. | {A} si infila sotto una roccia e aspetta. | ferito
Il terremoto | La terra trema: si aprono crepacci in tutta l'arena. | {A} cade in un crepaccio. | {A} resta incastrat[A:o/a] per mezza giornata. | {A} salta da una parte all'altra del crepaccio come in un film. | ferito
Gli scoiattoli assassini | Gli strateghi liberano scoiattoli geneticamente modificati con i denti di un lupo. | {A} sottovaluta uno scoiattolo. È l'ultimo errore. | {A} viene mors[A:o/a] in quattordici punti diversi. | {A} lancia agli scoiattoli tutte le sue noccioline e scappa. | avvelenato
Il miele velenoso | Gli alveari del Bosco producono un miele dolcissimo e mortale. | {A} non resiste e ne mangia un barattolo intero. | {A} ne assaggia un dito e vede i colori per due giorni. | {A} lo annusa, sospetta e lo regala a nessuno. | avvelenato
La frana dell'Altopiano | Metà dell'Altopiano scivola a valle in un boato. | {A} viene sepolt[A:o/a] dalla frana. | {A} viene colpit[A:o/a] da un masso grande come un cane. | {A} corre nella direzione opposta a tutti gli altri, e ha ragione. | ferito
La notte senza fine | Gli organizzatori spengono il sole: è notte per un giorno intero. | {A} si perde nel buio e cade in una gola. | {A} va a sbattere contro ogni albero del Bosco. | {A} conta i passi e torna al proprio rifugio a memoria. | sconvolto
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
