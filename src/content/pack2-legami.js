/* Legami, oggetti e pensieri: eventi validi in tutte le arene (senza violenza). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'tutte',
    ev: {
      d: `
1 con:A=ricordo stat:A<mo30 mo:A+20 | {A} guarda {ricordo:A} per la decima volta. Alla decima, finalmente, sorride.
1 con:A=valore stat:A<food30 -valore:A +cibo:A | {A} cede {valore} pur di mangiare qualcosa. Non è mai stat[A:o/a] così felice di fare un pessimo affare.
1 con:A=attrezzo @int +mappa:A | Con {attrezzo:A} e un po' di pazienza, {A} si costruisce {mappa}.
1 con:A=alcol stat:A<mo25 -alcol:A s:A=ubriaco mo:A+15 | {A} affoga i dispiaceri in {alcol}. I dispiaceri, a quanto pare, sanno nuotare.
1 con:A=armatura @show star:A | {A} si mette in posa con {armatura:A} per le telecamere. Sembra un personaggio da copertina.
1 stat:A>mo80 @soc | {A} è di umore così buono che saluta perfino i nemici. Alcuni ricambiano, confusi.
1 stat:A<en20 s:A=ferito | {A} è così stanc[A:o/a] che inciampa sui propri piedi. Due volte.
1 stat:A<food25 @food | Lo stomaco di {A} brontola così forte che si sente in tutta la zona.
1 goal:A=nascondersi @cow | {A} passa la giornata immobile nel nascondiglio migliore che abbia mai trovato.
1 goal:A=reclutare @soc | {A} fa il giro di tutta la zona presentandosi a chiunque. Qualcuno se l[A:o/a] ricorderà.
1 goal:A=spettacolo star:A | {A} recita un monologo improvvisato davanti alla telecamera più vicina. Gli sponsor prendono nota.
1 goal:A=curarsi @heal hp:A+15 | {A} passa la giornata a riposare in un angolo tranquillo. Non è eroico, ma funziona.
1 wx:calma mo:A+10 | Una giornata tranquilla: {A} ne approfitta per riposare e pensare a casa.
2 crush:A>B @soc rel:AB+10 | {A} ride a ogni battuta di {B}. Anche a quelle che non fanno ridere.
2 crush:A>B @mad | {A} prova tre volte a parlare con {B}. Alla terza, riesce a dire «ciao». È un inizio.
2 crush:A>B single:B love:AB *1.5 | {A} smette di girarci intorno e dice tutto a {B}, d'un fiato. {B} risponde con un abbraccio.
2 crush:A>B rel:AB-10 s:A=sconvolto | {A} scopre per caso che {B} l[A:o/a] considera «come [A:un fratello/una sorella/una persona di famiglia]». Pomeriggio disastroso.
2 plot:A>B rel:AB+15 | {A} è più gentile del solito con {B}. Molto più gentile del solito. Troppo.
2 plot:A>B @stl | {A} osserva {B} a lungo, prendendo nota di ogni abitudine. {B} pensa che sia simpatia.
2 couple:AB give:A>B=cibo | {A} lascia a {B} la parte migliore di {cibo}, e finge di non avere fame.
2 couple:AB rel:AB+10 mo:A+10 mo:B+10 | {A} e {B} passano la giornata a inventare il nome del loro futuro cane. Vince «Rambo».
2 couple:AB rel:AB-20 | {A} e {B} litigano per chi ha finito {cibo}. È la loro prima litigata, e la ricorderanno.
2 friend:AB give:A>B=ricordo | {A} regala a {B} {ricordo:A}. «Custodiscilo tu. Mi fido.»
2 friend:AB mo:A+10 mo:B+10 | {A} e {B} si raccontano gli aneddoti più imbarazzanti della loro vita. Ridono fino alle lacrime.
2 enemy:AB rel:AB-10 | {A} e {B} si incrociano e si guardano in cagnesco per un minuto intero. Non cede nessuno.
2 enemy:AB forgive:A>B grudge:A>B @soc | {A} e {B} si ritrovano bloccat[AB:i/e] nello stesso posto per ore. Finiscono per parlare. {A} decide di lasciar perdere.
2 owe:A>B repay:A>B give:A>B=valore | {A} paga il suo debito cedendo {valore} a {B}. Ora sono pari.
2 owe:A>B rel:AB-10 | {B} ricorda a {A}, davanti a tutti, che [B:gli/le] deve un favore. {A} arrossisce.
2 debt:A>B give:B>A=attrezzo | {B} presta a {A} {attrezzo:B}. «Me lo restituisci, sì?» Il prestito diventa un debito.
2 lost:A rel:AB+15 @heal | {B} trova {A} che piange {perso:A} e resta in silenzio accanto a l[A:ui/ei] per un'ora.
2 traitor:B rel:AB-15 | {A} ricorda a tutti, ad alta voce, cosa ha fatto {B} l'ultima volta che si è fidat[B:o/a] di qualcuno.
2 fame:A rel:AB+10 @soc | {B} chiede a {A} un autografo. In piena arena. {A} lo fa volentieri.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} di unire le forze. {B} accetta con un sorriso. || {A} propone a {B} di unire le forze. {B} fa finta di non aver sentito.
2 test:A=emp12 ok:rel:AB+25 ko:rel:AB-5 | {A} capisce che {B} sta per crollare e trova le parole giuste. || {A} prova a consolare {B}, ma dice esattamente la cosa sbagliata.
3 couple:BC trait:A=romantico s:A=sconvolto | {A} vede {B} e {C} insieme e sente qualcosa spezzarsi. Fa finta di niente, male.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano attorno allo stesso fuoco. Nessuno se ne va. Così nasce un gruppo.
3 ally:ABC plot:A>B rel:AC+15 | {A} sussurra a {C} che {B} nasconde qualcosa. {C} comincia a tenere d'occhio {B}.
`,
      n: `
1 con:A=ricordo mo:A+10 | {A} si addormenta stringendo {ricordo:A}, come faceva da bambin[A:o/a] con un peluche.
1 stat:A<mo25 @mad | {A} parla da sol[A:o/a] per mezz'ora. Si dà anche dei buoni consigli. Non li seguirà.
1 stat:A>mo80 | {A} fischietta prima di dormire. Gli altri non capiscono come ci riesca.
1 goal:A=vendetta | {A} non dorme: ripassa a mente ogni passo del piano.
2 crush:A>B | {A} si addormenta pensando a {B} e si sveglia pensando a {B}. In mezzo, sogna {B}.
2 couple:AB pr:A-10 pr:B-10 | {A} e {B} si raccontano storie fino a tardi. Le paure, per una notte, aspettano fuori.
2 plot:A>B | Mentre {B} dorme, {A} ripassa il piano. Manca poco.
2 friend:AB mo:A+5 mo:B+5 | {A} e {B} si danno il cambio di guardia e si lasciano un biglietto spiritoso a ogni turno.
2 enemy:AB s:A=sconvolto | {A} non riesce a dormire sapendo che {B} è a pochi metri.
`,
      sponsor: `
1 +ricordo:A mo:A+20 @gift | Gli sponsor mandano a {A} {ricordo}. Arriva con un biglietto scritto a mano da qualcuno di casa.
1 +valore:A @gift | Gli sponsor mandano a {A} {valore}. «Spendilo bene.»
1 +attrezzo:A @gift | Gli sponsor mandano a {A} {attrezzo}. Sul pacco c'è scritto «Per chi pensa».
1 +alcol:A @gift | Gli sponsor mandano a {A} {alcol}. Il messaggio dice: «Per i momenti difficili. O per festeggiare».
`,
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
