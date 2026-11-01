/* Eventi di base aggiuntivi, validi per tutti gli scenari con combattimento. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});
  D.coreExtra = {
    b: `
1 | {A} conta i secondi prima del via e scatta per prim[A:o/a].
1 @cow | {A} si nasconde sotto una cassa vuota finché il rumore non cessa.
1 +arma:A @agg | {A} si fa largo a spallate e afferra {arma}.
1 s:A=ferito | {A} viene calpestat[A:o/a] nella calca, ma riesce a rialzarsi.
2 k:A>B w:A | {A} colpisce {B} con {arma:A} prima ancora che possa girarsi.
2 s:B=ferito @agg | {A} ferisce {B} di striscio e si dilegua.
2 | {A} e {B} afferrano lo stesso zaino e lo strappano in due.
3 al:AB @soc | {A} e {B} si coprono le spalle a vicenda mentre {C} fugge.
4 | {A}, {B}, {C} e {D} si fronteggiano in cerchio e poi scappano tutti insieme.
`,
    d: `
1 | {A} studia le abitudini degli altri concorrenti da lontano.
1 @int | {A} costruisce un riparo che sarebbe invisibile anche a pochi passi.
1 @luck +arma:A | {A} inciampa letteralmente su {arma}.
1 s:A=affamato | {A} non trova nulla da mangiare per tutto il giorno.
1 need:A=affamato cibo:A cure:A *2 | {A} mangia finalmente qualcosa e riprende le forze.
1 @cow | {A} sente un rumore e scappa nella direzione opposta per ore.
1 @mad | {A} scrive il proprio nome su ogni albero che incontra.
1 | {A} riposa al sole e recupera un po' di energie.
1 d:A *0.6 | {A} cade da un dirupo mentre cerca una via di fuga.
1 s:A=ferito @agg | {A} sfida {mostro} per dimostrare il proprio valore e ne esce malconc[A:io/ia].
2 k:A>B @agg | {A} sorprende {B} mentre beve e l[B:o/a] spinge sott'acqua.
2 k:A>B @int | {A} convince {B} che il passaggio è sicuro: non lo è.
2 al:AB | {A} offre a {B} metà delle proprie provviste in cambio di protezione.
2 ally:AB | {A} e {B} studiano insieme un piano per il finale.
2 ally:AB br:B @betray | {B} litiga con {A} per le provviste e se ne va.
2 ally:AB +arma:A | {A} e {B} fanno irruzione in un deposito e {A} trova {arma}.
2 @cow | {A} supplica {B} di risparmiarl[A:o/a] e {B} accetta.
2 s:A=ferito s:B=ferito | {A} e {B} lottano a lungo e si separano entramb[AB:i/e] ferit[AB:i/e].
2 need:A=* d:A | {B} trova {A} ormai senza forze e resta con [A:lui/lei/loro] fino alla fine.
3 k:AB>C ally:AB | {A} e {B} tendono una trappola perfetta a {C}.
3 tr:A>B ally:AC | {A} e {C} decidono che {B} è di troppo e {A} l[B:o/a] elimina.
3 s:C=ferito | {A} e {B} si alleano per un attacco contro {C}, che riesce a fuggire.
4 ally:AB ally:CD | Due alleanze si incontrano: {A} e {B} da una parte, {C} e {D} dall'altra. Nessuno attacca.
`,
    n: `
1 | {A} si scalda vicino a un fuoco minuscolo.
1 @int | {A} ripensa a ogni mossa fatta finora e prepara quella di domani.
1 @cow | {A} trema per tutta la notte senza fare rumore.
1 s:A=malato | {A} si sveglia con una tosse che non promette nulla di buono.
1 need:A=malato d:A *1.5 | {A} non supera la febbre della notte.
2 k:A>B @mad | {A} sveglia {B} soltanto per ucciderl[B:o/a].
2 al:AB @heal | {A} trova {B} che trema di freddo e condivide la propria coperta.
2 ally:AB br:A @betray | {A} abbandona {B} nel sonno portandosi via tutto.
2 | {A} e {B} si scambiano una parola di conforto a distanza, senza avvicinarsi.
3 ally:ABC tr:A>C | {A} decide che {C} non serve più all'alleanza e la notte stessa l[C:o/a] elimina.
`,
    f: `
1 +cibo:A +med:A | {A} arriva per ultim[A:o/a] e trova ancora due zaini intatti.
1 s:A=ferito | {A} prende uno zaino, ma viene colpit[A:o/a] mentre scappa.
2 al:AB @soc | {A} e {B} si incontrano al festino e decidono di proteggersi a vicenda.
2 k:A>B w:A | {A} usa {arma:A} per difendere il bottino da {B}.
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
