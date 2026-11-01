/* Contenuti 18+ comuni a tutte le arene con combattimento: violenza esplicita,
 * linguaggio volgare, alcol e sostanze, allusioni sessuali tra adulti.
 * Attivi solo con l'interruttore 18+ e mai nel Liceo. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: '*', adult: true,
    ev: {
      b: `
2 k:A>B @agg | {A} sfonda il cranio di {B} con una pietra. Due volte. La seconda non serviva.
1 @mad | {A} passa i primi dieci secondi a bestemmiare in tre dialetti diversi. Poi scappa.
2 hit:A>B | {A} sputa in un occhio a {B} e approfitta della confusione per prendersi lo zaino.
1 d:A *0.5 | {A} viene calpestat[A:o/a] nella calca finché non resta solo una macchia sul terreno. La regia indugia.
2 love:AB | Nel pieno del caos, {A} e {B} si nascondono nello stesso buco e scoprono di avere un'intesa fisica sorprendente.
`,
      d: `
1 s:A=ubriaco @mad | {A} trova {alcol} e se la beve a canna. Alle undici del mattino parla con le formiche, alle dodici dorme in una pozza.
1 need:A=ubriaco @drunk @show | {A}, ubriac[A:o/a] marc[A:io/ia], si cala i pantaloni davanti alla telecamera principale. La regia interrompe il collegamento, troppo tardi.
1 need:A=ubriaco d:A @drunk *0.4 | {A} vomita nel sonno dopo una sbronza colossale. Una morte poco gloriosa, ma molto documentata.
2 need:A=ubriaco hit:A>B @drunk | {A}, ubriac[A:o/a], insulta la madre, la nonna e il cane di {B}. Poi [B:gli/le] tira un pugno. Sbaglia, e cade.
1 @mad s:A=sconvolto | {A} mastica dei funghi trovati in una radura. Per sei ore pensa di essere un elicottero.
1 need:A=sconvolto @mad | {A}, ancora sotto l'effetto di qualcosa, abbraccia un cactus e gli giura amore eterno. Il cactus ricambia a modo suo.
2 love:AB @show | {A} e {B} decidono che la tensione dell'arena va sfogata. Si appartano. Le telecamere fanno quello che possono.
2 love:AB | {A} e {B} passano la mattina a litigare e il pomeriggio a fare pace. Rumorosamente.
2 couple:AB | {A} e {B} sono così pres[AB:i/e] l'un[AB:o/a] dall'altr[AB:o/a] che non si accorgono che qualcuno l[AB:i/e] sta guardando da un'ora. Il pubblico ringrazia.
2 couple:AB @show star:A | {A} e {B} si concedono un bagno insieme nel fiume. Gli ascolti fanno il record della stagione.
3 couple:AB hit:C>A | {C} sorprende {A} e {B} nel mezzo di qualcosa di molto intimo e, per gelosia, lancia un sasso. Centra il sedere di {A}.
2 single:A single:B @soc | {A} propone a {B} "una cosa senza impegno". {B} accetta. Durerà fino a sera.
2 k:A>B @agg | {A} cava gli occhi a {B} con i pollici. Le urla fanno scappare gli uccelli per chilometri.
2 k:A>B w:A @agg | {A} decapita {B} con {arma:A} e lancia la testa nel fiume, come un messaggio. Il messaggio è "non rompere".
2 k:A>B @mad | {A} uccide {B} e poi ci parla per un'ora come se fosse ancora viv[B:o/a]. Il pubblico non sa se ridere o chiamare qualcuno.
1 d:A *0.5 | {A} viene sbranat[A:o/a] da {mostro} con un'abbondanza di dettagli che nessuno aveva chiesto.
2 hit:A>B @agg | {A} prende {B} a calci nei genitali con una precisione da professionista. {B} resta a terra a lungo.
2 grudge:A>B k:A>B *3 | {A} trova {B} e l[B:o/a] fa a pezzi, letteralmente, per {caro:A}. Poi si siede e piange.
2 grudge:A>B @mad | {A} scrive "FIGLIO DI PUTTANA" con il sangue su una roccia, con una freccia che punta verso il nascondiglio di {B}.
1 @show | {A} guarda in camera e manda a quel paese gli organizzatori uno per uno, con nome e cognome. Il pubblico applaude in piedi.
1 s:A=malato | {A} si fa venire una diarrea epica bevendo acqua del fiume. La telecamera, per pietà, inquadra il cielo.
1 need:A=malato @mad | {A} ha ancora la diarrea. Passa la giornata accovacciat[A:o/a] dietro un cespuglio a maledire il mondo.
2 @mad hit:B>A | {A} prova a corteggiare {B} con una danza tribale improvvisata. {B} risponde con un ceffone.
2 need:A=ubriaco love:AB @drunk | Ubriach[AB:i/e] tutt[AB:i/e] e due, {A} e {B} finiscono a rotolarsi nel fango ridendo. Poi smettono di ridere.
`,
      n: `
2 couple:AB | {A} e {B} non dormono molto, ma per ragioni piacevoli. Mezza arena l[AB:i/e] sente.
2 love:AB | Al buio e al freddo, {A} e {B} si scaldano a vicenda. Molto. Al mattino evitano di guardarsi negli occhi.
1 need:A=ubriaco @drunk | {A} si addormenta ubriac[A:o/a] abbracciat[A:o/a] a un sasso, chiamandolo con il nome della sua ex.
2 k:A>B @stl | {A} sgozza {B} nel sonno come un agnello. Il sangue spegne il fuoco.
2 couple:AB tr:A>B *0.5 | {A} passa la notte con {B}, poi all'alba l[B:o/a] strangola con la sua stessa cintura. Le relazioni nell'arena sono complicate.
`,
      f: `
2 k:A>B @agg | {A} squarcia la pancia a {B} per prendersi il suo zaino. Dentro c'erano solo calzini.
1 s:A=ubriaco | Nello zaino di {A} al festino c'è {alcol}. {A} la finisce prima di tornare al rifugio.
`,
      ds: `
1 @mad | {A} affronta il disastro completamente ubriac[A:o/a] e, contro ogni logica, ne esce illes[A:o/a].
2 couple:AB | {A} e {B} decidono che, se devono morire, tanto vale divertirsi. Non muoiono, e si divertono.
`,
      sponsor: `
1 s:A=ubriaco @gift | Uno sponsor di liquori manda a {A} una cassa intera. {A} fa una pubblicità involontaria e devastante.
1 +med:A @gift | Gli sponsor mandano a {A} un kit medico e, per qualche motivo, una confezione di preservativi.
`,
      lovers: `
2 couple:AB d:B | {A} e {B} passano l'ultima notte insieme come se non ci fosse un domani. Per {B} non c'è.
`,
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
