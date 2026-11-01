/* Reame Incantato — secondo pacchetto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'fantasy',
    ev: {
      b: `
1 +armatura:A @luck | Dall'Altare, {A} afferra {armatura}. Sulla fodera c'è ricamato il nome di un eroe morto. Non è di buon auspicio.
1 +attrezzo:A @int | {A} ignora le spade e prende {attrezzo}. Un vecchio gufo sull'Altare annuisce approvando.
2 al:AB +amuleto:A | {A} e {B} toccano insieme lo stesso amuleto sull'Altare: si accende, e decidono che è un segno.
2 k:A>B @agg | {A} pronuncia la prima parola magica che [A:gli/le] viene in mente. Funziona. Purtroppo per {B}.
1 test:A=fort12 ok:+amuleto:A ko:pr:A+25 | {A} apre uno scrigno sull'Altare: dentro c'è {amuleto}. || {A} apre uno scrigno sull'Altare: ne esce un fumo nero che [A:gli/le] entra nel naso. Brutto segno.
`,
      d: `
1 stat:A>pr50 @mad | {A} parla con la propria ombra. L'ombra, ormai, risponde a tono.
1 stat:A>pr60 con:A=amuleto pr:A-30 | {A} stringe {amuleto:A} e recita una formula: il nero nelle vene si ritira, per ora.
1 stat:A<hp45 @heal hp:A+25 | {A} beve da una fonte che brilla di luce azzurra. Le ferite si richiudono, con un rumore di campanelli.
1 stat:A<food30 +cibo:A | {A} segue un profumo di pane appena sfornato fino a una casetta di marzapane. Nessuno in casa. Per fortuna.
1 con:A=attrezzo +mappa:A @int | {A} usa {attrezzo:A} per leggere le stelle di giorno. Ne ricava {mappa}.
1 con:A=valore -valore:A +med:A | {A} paga un folletto con {valore}. Il folletto, in cambio, [A:gli/le] dà {med:A} e un consiglio pessimo.
1 con:A=ricordo mo:A+15 pr:A-10 | {A} tiene stretto {ricordo:A} mentre attraversa la Palude stregata. Le voci, stavolta, tacciono.
1 wx:buio @stl | Nella nebbia degli elfi, {A} attraversa la Foresta senza che un solo ramo scricchioli.
1 wx:abbondanza +cibo:A | {A} trova un albero di mele d'oro. Non ne mangia una sola: ne mangia diciotto.
1 wx:pericolo s:A=ferito | Una pioggia di cenere del drago coglie {A} allo scoperto. Le bruciature durano giorni.
1 trait:A=superstizioso +amuleto:A | {A} trova un quadrifoglio con cinque foglie. Lo intreccia in un braccialetto. Ora è {amuleto}.
1 trait:A=ingegnoso con:A=attrezzo +trap:A | {A} incanta {attrezzo:A} perché scatti quando qualcuno ci passa vicino. Ora è una trappola.
2 crush:A>B @soc rel:AB+15 | {A} intreccia una corona di fiori di luna e la lascia vicino al giaciglio di {B}. Le fate ridacchiano.
2 crush:A>B love:AB *2 | Una fata, stanca di aspettare, spinge {A} tra le braccia di {B}. Funziona. Le fate sono sempre stanche di aspettare.
2 plot:A>B rel:AB+10 | {A} insegna a {B} un incantesimo di protezione. Uno sbagliato, apposta.
2 plot:A>B -amuleto:B +amuleto:A @stl | {A} scambia l'amuleto di {B} con un sasso dipinto. {B} non se ne accorge. Ancora.
2 goal:A=vendetta grudge:A>B hit:A>B | {A} lancia una maledizione contro {B} per {caro:A}. Lo colpisce di striscio. La prossima volta mirerà meglio.
2 goal:A=caccia k:A>B @agg | {A} chiede a un corvo dove si trovi {B}. Il corvo glielo dice. I corvi non sono mai neutrali.
2 con:A=armatura hit:B>A | {B} scaglia un dardo incantato contro {A}, ma {armatura:A} lo assorbe con un ronzio.
2 con:A=alcol give:A>B=alcol rel:AB+20 | {A} offre a {B} un sorso di {alcol}. Diventano amici per la pelle in esattamente un sorso.
2 test:A=int13 ok:+amuleto:A ok:rel:AB+15 ko:hit:B>A | {A} risolve l'indovinello della sfinge al posto di {B}. La sfinge regala a entrambi un amuleto, e {B} ringrazia. || {A} sbaglia l'indovinello della sfinge. La sfinge scaglia {B} contro {A}. Letteralmente.
2 owe:A>B repay:A>B +cibo:B | {A} lascia a {B} un cestino di pane elfico: è il modo degli elfi per dire «siamo pari».
2 enemy:AB stat:A>pr50 hit:A>B | La corruzione rende {A} irascibile: vede {B} e l[B:o/a] attacca senza una parola.
3 plot:A>B ally:ABC rel:AC+20 | {A} legge a {C} un futuro inventato nelle foglie di tè: nel futuro, {B} tradisce tutti. {C} ci crede.
`,
      n: `
1 stat:A>pr60 pr:A+10 s:A=sconvolto | {A} sogna di trasformarsi in pietra. Al risveglio, ha un piede un po' più freddo dell'altro.
1 con:A=amuleto mo:A+10 | {A} dorme con {amuleto:A} stretto al petto. Per la prima volta, nessun incubo.
1 wx:pericolo s:A=ferito | Nella notte senza luna, qualcosa morde {A} alla caviglia e sparisce nel buio.
2 crush:A>B @soc | {A} veglia {B} tutta la notte con una lucciola in un barattolo, perché non abbia paura del buio.
2 plot:A>B tr:A>B *2 | {A} aspetta che {B} si addormenti sotto le stelle. Le stelle guardano, e non dicono niente.
2 couple:AB pr:A-15 pr:B-15 | {A} e {B} danzano sotto la luna piena. Per un'ora la maledizione dell'arena non li tocca.
2 couple:AB stat:B<hp40 save:A>B | {A} canta a {B} una ninna nanna elfica per tutta la notte. Al mattino le ferite sono quasi chiuse.
2 grudge:A>B forgive:A>B trait:A=clemente | {A} accende una candela per {caro:A} e, nella stessa notte, decide di lasciar andare la rabbia verso {B}.
2 hit:A>B trait:A=sonnambulo | {A} cammina nel sonno recitando incantesimi a caso. Uno colpisce {B}.
`,
      f: `
2 crush:A>B save:A>B | Al banchetto incantato, {A} assaggia il calice destinato a {B}. Era avvelenato. {A} sopravvive per miracolo, e {B} non lo dimenticherà.
2 plot:A>B k:A>B *2 | Al banchetto, {A} versa qualcosa nel calice di {B}. Era nel piano dall'inizio.
1 con:A=valore -valore:A +armatura:A | Al banchetto, {A} paga un nano con {valore} e ottiene {armatura}.
`,
      sponsor: `
1 +armatura:A @gift | Un falco reale porta a {A} {armatura}, avvolta in seta.
1 +amuleto:A @gift | Gli sponsor mandano a {A} {amuleto} e un biglietto: «Non toglierlo mai».
1 +ricordo:A mo:A+20 @gift | Un piccolo drago consegna a {A} un pacchetto da casa: {ricordo}.
`,
      finale: `
2 k:A>B | Sul Picco del drago, {A} e {B} si affrontano mentre il drago guarda incuriosito. Alla fine il drago applaude. Solo uno dei due può sentirlo.
2 k:A>B con:A=amuleto | {B} lancia l'ultima maledizione, ma {amuleto:A} la rimbalza indietro. {A} non deve fare altro.
`,
    },
    dis: `
La notte delle streghe | Tre streghe sorvolano l'arena lanciando maledizioni a caso. | {A} viene trasformat[A:o/a] in un rospo, e un airone passa di lì. | {A} si ritrova con le orecchie da asino per un giorno intero. | {A} offre alle streghe un dolcetto e viene lasciat[A:o/a] in pace. | sconvolto
Il risveglio del golem | Le statue della Torre si animano e cominciano a camminare. | {A} viene schiacciat[A:o/a] da un golem distratto. | {A} viene pres[A:o/a] a calci da una statua di un re. | {A} si finge una statua anche l[A:ui/ei], e funziona. | ferito
La pioggia di stelle | Dal cielo cadono stelle vere, calde e luminose. | {A} viene colpit[A:o/a] da una stella cadente. | {A} esprime un desiderio e intanto si brucia le mani. | {A} raccoglie una stella spenta e la usa come lanterna. | ferito
Il canto delle sirene | Dal Lago nebbioso sale un canto irresistibile. | {A} cammina nel Lago fino a sparire. | {A} si tuffa, ma una radice l[A:o/a] trattiene. | {A} si tappa le orecchie con il muschio e canta più forte. | sconvolto
La marea di funghi | I funghi luminosi crescono ovunque, e liberano spore allucinogene. | {A} respira le spore e cammina giù dal Picco. | {A} parla per ore con un fungo, che ha opinioni molto forti. | {A} si avvolge un panno sulla faccia e attraversa la nebbia. | malato
Lo specchio delle anime | Uno specchio gigante appare nella Foresta e mostra a ognuno la propria paura. | {A} guarda troppo a lungo e non torna più. | {A} piange per un'ora davanti al proprio riflesso. | {A} fa le linguacce allo specchio, che si offende e sparisce. | sconvolto
Il mercante di anime | Un mercante incappucciato offre a tutti un desiderio, in cambio di qualcosa. | {A} accetta. Il prezzo era la vita. | {A} accetta e perde la voce per un giorno. | {A} rifiuta con educazione e se ne va con un biscotto omaggio. | sconvolto
Le radici affamate | Gli alberi della Foresta allungano le radici in cerca di cibo. | {A} viene trascinat[A:o/a] sottoterra. | {A} perde uno stivale e un po' di pelle. | {A} si arrampica sull'albero stesso, l'unico posto dove le radici non arrivano. | ferito
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
