/* Sopravvivenza: eventi per le arene in cui si muore, legati a ferite, fame, stanchezza, oggetti e mente. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: '*',
    ev: {
      d: `
1 stat:A<hp30 d:A *0.5 | {A} ignora le proprie ferite troppo a lungo. Si siede per riprendere fiato e non si rialza.
1 stat:A<hp35 con:A=med -med:A hp:A+35 | {A} si ricuce da sol[A:o/a] con {med:A}, mordendo un bastone per non urlare.
1 stat:A<food20 d:A *0.4 | {A} mangia qualcosa che nessuno sano di mente mangerebbe. Ha troppa fame per essere sano di mente.
1 stat:A<en20 hp:A-15 | {A} è così stanc[A:o/a] che cade in un fossato. Ci resta un'ora prima di trovare la forza di uscire.
1 con:A=armatura stat:A<hp50 hp:A+10 | {A} rinforza {armatura:A} con quello che trova. Si sente un po' più al sicuro.
1 con:A=esplosivo s:A=ferito @mad | {A} prova a capire come funziona {esplosivo:A}. Lo capisce, purtroppo, nel modo più rumoroso.
1 con:A=veleno con:A=cibo @int | {A} avvelena le proprie scorte di {cibo} e le lascia in bella vista. Poi aspetta.
1 goal:A=caccia @agg | {A} passa la giornata a cercare tracce. Ne trova tante. Sceglie le più fresche.
1 wx:pericolo stat:A<hp40 d:A *0.5 | Ferit[A:o/a] e sfinit[A:o/a], {A} non regge il tempo di oggi.
2 goal:A=caccia stat:B<hp40 k:A>B @agg *1.5 | {A} sente l'odore del sangue di {B} e ne segue le tracce. {B} non riesce più a scappare.
2 goal:A=vendetta grudge:A>B k:A>B *2 | {A} ha passato giorni a cercare {B}. Quando l[B:o/a] trova, non dice niente. Per {caro:A}.
2 goal:A=proteggere couple:AB save:A>B | {A} si mette davanti a {B} quando arriva il pericolo. Ne esce con un graffio e un sorriso.
2 stat:B<hp30 save:A>B @heal | {A} trova {B} quasi svenut[B:o/a] e l[B:o/a] porta al riparo. {B} non lo dimenticherà.
2 stat:B<hp30 k:A>B @agg | {A} trova {B} ferit[B:o/a] e indifes[B:o/a]. Non è un momento di pietà.
2 stat:A<food25 steal:A<B @stl | La fame rende {A} audace: sfila {arma:B} a {B} per scambiarla con del cibo.
2 con:A=armatura k:B>A *0.4 | {B} trova l'unico punto scoperto di {armatura:A}. {A} non se l'aspettava.
2 con:A=attrezzo save:A>B @int | {A} usa {attrezzo:A} per tirare fuori {B} da un pozzo. {B} non ha parole.
2 crush:A>B save:A>B @heal | {A} si butta senza pensarci per salvare {B}. Solo dopo si chiede cosa stesse facendo.
2 plot:A>B tr:A>B *1.5 | {A} aveva un piano, e il piano finiva con {B} a terra. Ora il piano è finito.
2 plot:A>B stat:B<hp40 tr:A>B *2 | {A} aspettava che {B} fosse debole. {B} è debole. {A} non aspetta più.
2 couple:AB stat:B<hp30 d:B *0.6 | {B} muore tra le braccia di {A}, che non riesce a fermare il sangue.
3 plot:A>B ally:ABC k:A>B rel:AC-30 *1.2 | {A} colpisce {B} alle spalle davanti a {C}. {C} non dimenticherà quello che ha visto.
3 grudge:A>C couple:BC hit:A>C *1.5 | {A} non sopporta di vedere {C} con {B}: l[C:o/a] aspetta dietro un albero e l[C:o/a] colpisce.
`,
      n: `
1 stat:A<hp30 d:A *0.5 | Durante la notte, le ferite di {A} si riaprono. All'alba suona il cannone.
1 stat:A<en20 s:A=ferito | {A} si addormenta di guardia e si sveglia con qualcosa che [A:gli/le] rosicchia lo stivale.
1 con:A=trap +trap:A @int | {A} smonta la propria trappola e la rimonta più cattiva. Non dorme, ma ne vale la pena.
2 goal:A=vendetta grudge:A>B hit:A>B @stl | {A} si avvicina al giaciglio di {B} nel buio. Un ramo si spezza: {B} si sveglia appena in tempo, ferit[B:o/a].
2 couple:AB stat:A<hp30 save:B>A | {B} veglia {A} tutta la notte, premendo sulla ferita. All'alba, {A} è ancora lì.
2 plot:A>B -arma:B +arma:A @stl | Nel sonno, {A} sfila {arma:B} a {B}. Domani {B} sarà disarmat[B:o/a]. Fa parte del piano.
2 wx:buio k:A>B @stl *1.3 | Nel buio più totale, {A} trova {B} grazie al rumore del suo respiro.
`,
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
