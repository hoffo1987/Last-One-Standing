/* Città degli Infetti — eventi aggiuntivi e disastri. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.zombie = {
    extra: {
      b: `
1 +med:A | {A} afferra una cassetta del pronto soccorso con il simbolo dell'esercito.
1 @stl | {A} si allontana strisciando sotto le auto abbandonate.
1 d:A | {A} si ferma a raccogliere uno zaino e viene circondat[A:o/a] dagli infetti.
2 al:AB @soc | {A} e {B} saltano insieme sul tetto di un autobus.
2 k:A>B @agg | {A} colpisce {B} con una spranga per prendersi la sua cassa.
3 | {A}, {B} e {C} si guardano sospettosi: nessuno sa se gli altri sono stati morsi.
`,
      d: `
1 +cibo:A | {A} saccheggia un supermercato e trova {cibo}.
1 +arma:A | {A} trova {arma} nel bagagliaio di un'auto della polizia.
1 @int | {A} costruisce una barricata con frigoriferi e materassi.
1 s:A=ferito | {A} si taglia con un vetro mentre scappa da una finestra.
1 @stl | {A} si cosparge di sangue di infetto per passare inosservat[A:o/a].
1 d:A | {A} apre una porta sbagliata e trova una stanza piena di infetti.
1 @luck +med:A | {A} trova una farmacia ancora intatta.
1 @mad | {A} parla con uno zombi incatenato come se fosse un vecchio amico.
1 | {A} scrive un messaggio per la propria famiglia sul muro della Scuola.
1 s:A=malato | {A} nota un graffio sul braccio e non sa se preoccuparsi.
1 @soc | {A} trova una radio e riesce a parlare con un altro gruppo di sopravvissuti.
2 k:A>B w:A @agg | {A} sorprende {B} mentre saccheggia un negozio e l[B:o/a] uccide con {arma:A}.
2 k:A>B @int | {A} attira un'orda verso il rifugio di {B}.
2 al:AB @heal | {A} trova {B} intrappolat[B:o/a] in un'auto e l[B:o/a] libera.
2 ally:AB | {A} e {B} ripuliscono un piano dell'Ospedale dagli infetti.
2 steal:A<B @stl | {A} sottrae {arma:B} a {B} mentre dorme in un furgone.
2 s:B=malato | {A} spinge {B} contro un infetto, che l[B:o/a] graffia.
2 need:B=* cure:B @heal | {A} disinfetta e cuce le ferite di {B}.
3 k:A>C | {A} sacrifica {C} all'orda per permettere a {B} di fuggire.
3 al:ABC @soc | {A}, {B} e {C} occupano insieme la Stazione di polizia.
`,
      n: `
1 | {A} conta i colpi rimasti nel caricatore.
1 d:A | {A} non si accorge di un infetto entrato dalla finestra.
1 need:A=malato d:A *2 | Nella notte {A} si trasforma e scompare tra le strade buie.
2 ally:AB | {A} e {B} si legano a vicenda le mani per sicurezza, in caso uno dei due si trasformi.
2 k:A>B @stl | {A} entra nel rifugio di {B} durante la notte e non lascia testimoni.
`,
      f: `
1 +med:A | {A} recupera dalla cassa una dose di antidoto sperimentale.
1 d:A | {A} arriva sul tetto dell'Ospedale proprio mentre crolla.
2 k:A>B @agg | {A} spinge {B} giù dal tetto per prendersi la sua cassa.
`,
    },
    dis: `
L'orda di notte | Al calare del sole l'orda raddoppia. | {A} viene raggiunt[A:o/a] mentre cerca riparo. | {A} si chiude in un bagno e passa la notte a tenere la porta. | {A} sale sul tetto e tira su la scala.
Incendio del quartiere | Un intero quartiere prende fuoco. | {A} resta intrappolat[A:o/a] in un palazzo in fiamme. | {A} si ustiona scendendo dalle scale antincendio. | {A} corre verso il fiume prima che il fuoco arrivi.
La diga crolla | La diga a monte della città cede. | {A} perde la presa sul lampione e scompare nella corrente. | {A} viene sbattut[A:o/a] contro un'auto dalla corrente. | {A} si arrampica su un lampione.
Gli infetti evolvono | Gli infetti diventano più veloci e cominciano a cacciare in branco. | {A} viene raggiunt[A:o/a] in corsa. | {A} viene mors[A:o/a] alla caviglia, ma riesce a scappare. | {A} si nasconde in un'auto blindata. | malato
Sirene dell'allarme | Tutte le sirene della città si accendono insieme. | {A} viene circondat[A:o/a] dagli infetti richiamati dal rumore. | {A} viene graffiat[A:o/a] mentre scappa. | {A} trova una cella frigorifera silenziosa e aspetta che gli infetti si allontanino.
Il cecchino sul campanile | Un sopravvissuto impazzito spara dal campanile. | {A} viene colpit[A:o/a] mentre attraversa la piazza. | {A} viene ferit[A:o/a] a una spalla. | {A} capisce da dove arrivano i colpi e si tiene al coperto.
Gas nervino | L'esercito rilascia gas nervino per fermare il contagio. | {A} respira il gas e crolla a terra. | {A} respira poco gas e trema per ore. | {A} indossa una maschera antigas. | avvelenato
Il convoglio in fiamme | Un convoglio carico di benzina esplode in Periferia. | {A} viene investit[A:o/a] dall'esplosione. | {A} viene colpit[A:o/a] da un pezzo di lamiera. | {A} si trovava lontano dall'esplosione.
Topi infetti | Migliaia di topi infetti escono dalle fogne. | {A} viene sommers[A:o/a] dai topi. | {A} riesce a scrollarsi di dosso i topi solo dopo una serie di morsi. | {A} sale su un tavolo e li tiene lontani con una torcia. | malato
Crollo del ponte | Il ponte principale crolla sotto il peso degli infetti. | {A} cade nel fiume insieme agli infetti. | {A} si aggrappa al bordo e risale. | {A} non aveva ancora messo piede sul ponte.
Il corridore | Un infetto velocissimo dà la caccia a chiunque corra. | {A} viene raggiunt[A:o/a] dal corridore. | {A} viene ferit[A:o/a] mentre si libera dal corridore. | {A} resta immobile e il corridore passa oltre.
Bombardamento al napalm | Gli aerei sganciano napalm sul Centro commerciale. | {A} viene avvolt[A:o/a] dal fuoco. | {A} riporta ustioni gravi. | {A} si nasconde nel parcheggio sotterraneo.
Contaminazione dell'acqua | L'acquedotto è contaminato. | {A} beve l'acqua del rubinetto e si ammala in poche ore. | {A} beve poco e si sente male. | {A} beve solo acqua in bottiglia. | malato
Il nido | Gli infetti hanno creato un nido nella Metropolitana. | {A} si perde nei tunnel e finisce nel nido. | {A} esce dai tunnel coperto di graffi. | {A} evita la Metropolitana. | malato
Ospedale invaso | L'Ospedale viene invaso da centinaia di pazienti infetti. | {A} resta bloccat[A:o/a] in un ascensore. | {A} scende dalla finestra con un lenzuolo e si ferisce. | {A} trova un'uscita di servizio.
Nebbia fitta | Una nebbia densa copre la città: gli infetti si sentono, ma non si vedono. | {A} va dritt[A:o/a] contro un gruppo di infetti. | {A} viene graffiat[A:o/a] da un infetto nascosto nella nebbia. | {A} resta fermo in un negozio finché la nebbia non si dirada. | malato
Cani infetti | Un branco di cani infetti corre per le strade. | {A} non riesce a seminare il branco. | {A} scavalca il recinto, ma un cane raggiunge la caviglia prima del salto. | {A} chiude il branco in un recinto. | malato
L'ultima trasmissione | La radio annuncia che non verranno più soccorsi. | {A} perde ogni speranza e si allontana nella notte. | {A} si abbandona alla disperazione e smette di mangiare. | {A} decide che si salverà da sol[A:o/a]. | affamato
Il gigante | Un infetto mutato abbatte i muri come se fossero di carta. | {A} viene schiacciat[A:o/a] sotto le macerie. | {A} evita il gigante, ma una pioggia di calcinacci rende la fuga dolorosa. | {A} si nasconde nel bunker antiatomico.
Lo sciacallo | Una banda di sciacalli armati saccheggia la città. | {A} viene uccis[A:o/a] dagli sciacalli. | {A} torna dal posto di blocco senza provviste e con il volto pieno di lividi. | {A} si unisce per un giorno agli sciacalli e se ne va.
Il treno fantasma | Un treno della metro senza conducente sfreccia nei tunnel. | {A} viene travolt[A:o/a] dal treno. | {A} si getta di lato e si rompe una costola. | {A} sente il rumore e si allontana dai binari.
Tempesta elettrica | Una tempesta fa saltare tutta la corrente che restava. | {A} viene fulminat[A:o/a] da un cavo caduto. | {A} viene sbalzat[A:o/a] da una scossa. | {A} si tiene lontan[A:o/a] dai cavi.
Mutazione dell'aria | L'infezione si diffonde anche per via aerea. | {A} si ammala gravemente e non supera la notte. | {A} comincia a tossire e ad avere la febbre alta. | {A} si chiude in una stanza sigillata con nastro adesivo. | malato
La caccia dell'esercito | I soldati sparano a chiunque abbia l'aria infetta. | {A} viene scambiat[A:o/a] per un infetto. | {A} viene ferit[A:o/a] da un proiettile vagante. | {A} alza le mani e mostra di essere san[A:o/a].
Lo stadio | L'orda si raduna nello stadio e rompe le recinzioni. | {A} viene travolt[A:o/a] dalla folla di infetti. | {A} viene ferit[A:o/a] durante la fuga. | {A} si trova dall'altra parte della città.
Pioggia nera | Una pioggia nera e oleosa cade sulla città. | {A} scivola dal tetto bagnato. | {A} si ammala dopo essere rimast[A:o/a] sotto la pioggia. | {A} raccoglie la pioggia in un secchio e la usa per spegnere un incendio. | malato
Il laboratorio | Un laboratorio militare esplode e libera una nuova variante. | {A} viene contagiat[A:o/a] dalla nuova variante e muore in poche ore. | {A} viene espost[A:o/a] e si sente male. | {A} si trova controvento e l'aria non l[A:o/a] raggiunge. | malato
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
