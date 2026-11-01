/* Relazioni: eventi che nascono da fiducia, paura, rispetto, attrazione, promesse ed ex. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  // valido in tutte le arene, anche senza morti
  D.packs.push({
    theme: 'tutte',
    ev: {
      d: `
2 trust:A>B give:A>B=cibo @heal | {A} divide {cibo} con {B} senza nemmeno pensarci. Con chi ti fidi, non si fanno conti.
2 trust:A>B ally:AB fid:B>A+10 | {A} affida a {B} il proprio zaino mentre va in avanscoperta. {B} non lo apre nemmeno.
2 trust:A>B fid:A>B+5 mo:A+10 | {A} si appoggia alla spalla di {B} durante la pausa. Per un minuto, l'arena smette di esistere.
2 distrust:A>B ally:AB @stl | {A} dorme con lo zaino sotto la testa: {B} è troppo vicino e troppo gentile.
2 distrust:A>B rel:AB-10 | {A} controlla due volte quello che {B} [A:gli/le] porta da mangiare. Alla terza, lo butta.
2 distrust:A>B ally:AB pau:A>B+5 | {A} nota che {B} sparisce ogni sera per un'ora. Non chiede dove va. Prende nota.
2 fear:A>B @cow | {A} vede {B} in lontananza e cambia strada. Poi cambia anche zona.
2 fear:A>B give:A>B=valore | {A} lascia {valore} davanti al rifugio di {B}, come un'offerta. Spera che basti.
2 fear:A>B pau:A>B-15 mo:A+10 | {A} si costringe a guardare {B} negli occhi per un secondo intero. È una piccola vittoria.
2 respect:A>B rel:AB+10 | {A} osserva {B} di nascosto e prende nota di come si muove. Non lo dirà mai, ma l[B:o/a] ammira.
2 respect:A>B ris:B>A+15 @soc | {A} e {B} si incrociano e si salutano con un cenno, come fanno i rivali che si stimano.
2 attract:A>B @mad | {A} arrossisce ogni volta che {B} parla. È imbarazzante per tutti, tranne che per {B}, che non se ne accorge.
2 attract:A>B amo:B>A+12 @soc | {A} ride a una battuta di {B} un po' troppo forte. {B} se ne accorge, e sorride.
2 attract:A>B single:A @show | {A} si sistema i capelli tre volte prima di passare davanti a {B}. Il pubblico se ne accorge prima di {B}.
2 rival:AB @show star:A star:B | {A} e {B} si sfidano a chi resiste più a lungo appes[AB:i/e] a un ramo. Vincono gli sponsor, che si divertono.
2 rival:AB ris:A>B+10 ris:B>A+10 | {A} e {B} si sfidano in una gara di abilità. Finisce in parità, e si stringono la mano controvoglia.
2 rival:AB rel:AB+15 @soc | {A} e {B} scoprono di avere più cose in comune di quanto pensassero. È irritante, per entrambi.
2 ex:AB @mad | {A} e {B} si incrociano e fingono di non conoscersi. Non ci crede nessuno, nemmeno loro.
2 ex:AB reunite:AB *0.6 | {A} e {B} si parlano per la prima volta dopo la rottura. Finisce con un bacio, e con tutti che dicono «lo sapevo».
2 ex:AB rel:AB-10 | {A} racconta a tutti la sua versione della rottura con {B}. {B} ne racconta un'altra. Nessuna delle due è vera.
2 ex:AB fid:A>B+10 | {A} e {B} decidono di restare amici. Ci credono quasi.
2 close:AB mo:A+10 mo:B+10 | {A} e {B} ormai si capiscono con uno sguardo. Gli altri li trovano inquietanti.
2 close:AB promise:A>B=protezione | {A} dice a {B}, senza giri di parole, che l[B:o/a] proteggerà. {B} non risponde, ma sorride.
2 close:AB give:A>B=ricordo | {A} regala a {B} {ricordo:A}. «Se esco solo io, voglio che ce l'abbia tu.»
2 promise:A>B @soc fid:B>A+10 | {A} ricorda a {B} la promessa che [B:gli/le] ha fatto. «Non l'ho dimenticata.»
2 promise:A>B mo:A-10 | {A} comincia a chiedersi se riuscirà a mantenere la promessa fatta a {B}.
2 couple:AB breakup:AB *0.35 | {A} e {B} litigano per una sciocchezza, poi per tutto il resto. A sera non sono più una coppia.
2 couple:AB promise:A>B=vendetta | {A} e {B} si promettono una cosa cupa: chi resta, vendicherà l'altro.
2 couple:AB fid:A>B+15 fid:B>A+15 | {A} e {B} si raccontano il segreto più imbarazzante della loro vita. Ora si fidano davvero.
2 trust:A>B promise:A>B=fedelta | {A} giura a {B} che non l[B:o/a] tradirà mai. Lo dice guardandol[B:o/a] negli occhi.
2 friend:AB promise:A>B=cibo | {A} e {B} si promettono di dividere tutto quello che troveranno, fino all'ultima briciola.
2 debt:A>B fid:B>A+10 | {B} aiuta {A} senza chiedere niente. {A} se lo segna: questo è un debito da onorare.
3 trust:A>B distrust:A>C ally:ABC | {A} chiede a {B}, sottovoce, se si fida di {C}. {B} esita un secondo di troppo.
3 couple:AB attract:C>A rel:BC-20 | {C} non smette di guardare {A}. {B} se ne accorge, e non dice niente. Per ora.
3 fear:A>C trust:A>B fid:A>B+10 | {A} si nasconde dietro {B} ogni volta che passa {C}. {B} lo lascia fare.
3 close:AB grudge:C>A rel:BC-20 @soc | {B} si mette in mezzo quando {C} punta {A}. «Prima devi passare da me.»
3 ally:ABC distrust:A>C fid:B>C-15 | {A} confida a {B} i suoi dubbi su {C}. Da quel momento, anche {B} tiene d'occhio {C}.
3 rival:AB fame:C ris:A>C+10 ris:B>C+10 | {A} e {B} si contendono l'attenzione di {C}, la star dell'arena. {C} si diverte moltissimo.
`,
      n: `
2 trust:A>B | {A} si addormenta tranquill[A:o/a], sapendo che {B} è di guardia.
2 distrust:A>B ally:AB | {A} finge di dormire e osserva {B} per tutta la notte.
2 attract:A>B | {A} resta svegli[A:o/a] a guardare {B} dormire alla luce del fuoco. Si dà dell'idiota. Continua a guardare.
2 fear:A>B s:A=sconvolto | {A} sogna {B}. Si sveglia urlando, e tutti lo sentono.
2 ex:AB | {A} sente {B} ridere con altri, lontano. Fa più male di una ferita.
2 close:AB mo:A+10 mo:B+10 | {A} e {B} parlano fino all'alba di quello che faranno dopo, fuori di qui.
2 promise:A>B | {A} ripensa alla promessa fatta a {B} e si chiede se sarà all'altezza.
2 respect:A>B | {A} si chiede cosa farebbe {B} al suo posto. È un buon modo per decidere.
`,
    },
  });
  // solo nelle arene in cui si muore
  D.packs.push({
    theme: '*',
    ev: {
      d: `
2 distrust:A>B ally:AB tr:B>A *0.8 | {A} aveva ragione a non fidarsi di {B}. Avere ragione, però, non basta.
2 distrust:A>B ally:AB tr:A>B *0.6 | {A} non si fida più di {B}: decide di colpire per prim[A:o/a]. Non saprà mai se aveva ragione.
2 fear:A>B k:B>A *0.8 | {A} scappa da {B} da giorni. Oggi non scappa abbastanza.
2 fear:A>B k:A>B *0.4 | Mess[A:o/a] all'angolo, {A} trova il coraggio della disperazione. {B} non se lo aspettava.
2 rival:AB k:A>B *0.8 | Il duello tra {A} e {B} dura un'ora. Alla fine {A} saluta {B} con rispetto, l'ultima volta.
2 rival:AB hit:A>B hit:B>A | {A} e {B} si affrontano alla pari. Si separano ferit[AB:i/e], ed entrambi, stranamente, sorridono.
2 trust:A>B save:B>A | {A} si fida di {B}, e {B} non l[A:o/a] delude: arriva appena in tempo.
2 close:AB stat:B<hp35 save:A>B | {A} non lascia {B} da sol[B:o/a] nemmeno per un minuto, finché il peggio non è passato.
2 promise:A>B save:A>B | {A} si ricorda della promessa fatta a {B} quando il pericolo arriva. Si mette in mezzo.
2 ex:AB hit:A>B | {A} non ha mai perdonato {B} per come è finita. Oggi glielo fa capire.
2 ex:AB k:A>B *0.4 | Tra {A} e {B} era finita male. Oggi finisce peggio.
2 respect:A>B save:A>B | {A} non sopporta di vedere cadere un avversario che stima: salva {B} e se ne va senza una parola.
3 couple:AB grudge:C>A k:C>A *0.8 | {C} colpisce {A} davanti agli occhi di {B}. {B} non dimenticherà quel momento.
3 ally:ABC trust:A>B tr:B>A rel:BC-40 *0.6 | {B} tradisce {A}, che si fidava ciecamente, proprio davanti a {C}. {C} capisce che potrebbe essere il prossimo.
3 fear:A>C close:AB save:B>A | Quando {C} si avvicina, {B} si mette tra {A} e il pericolo.
3 rival:AB hit:C>A save:B>A | {C} attacca {A} alle spalle. Interviene {B}, il suo rivale: «Solo io posso batterti».
`,
      n: `
2 distrust:A>B ally:AB tr:A>B *0.5 | Nel buio, {A} decide che non può più dormire accanto a {B}. Risolve il problema alla radice.
2 fear:A>B k:B>A *0.6 | {A} si era nascost[A:o/a] bene. Non abbastanza bene per {B}.
2 couple:AB stat:A<hp30 save:B>A | {B} veglia {A} tutta la notte, sussurrando il suo nome perché non si addormenti.
`,
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
