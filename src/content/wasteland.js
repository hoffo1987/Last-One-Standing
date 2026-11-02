/* Terre Desolate — eventi aggiuntivi e disastri. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.wasteland = {
    extra: {
      b: `
1 +cibo:A | {A} afferra una tanica d'acqua e corre verso le dune.
1 +med:A | {A} trova una scatola di pillole antiradiazioni.
1 @stl | {A} si nasconde dentro una carcassa d'auto mentre gli altri lottano.
2 al:AB @soc | {A} e {B} saltano sulla stessa moto e fuggono insieme.
2 k:A>B | {A} lancia una molotov su {B} vicino alle taniche.
3 | {A}, {B} e {C} tirano la stessa tanica finché non si rompe e la benzina finisce a terra.
`,
      d: `
1 +arma:A | {A} trova {arma} sotto le macerie della Città fantasma.
1 +cibo:A @int | {A} costruisce un distillatore solare e raccoglie acqua pulita.
1 s:A=malato | {A} beve da un pozzo contaminato.
1 need:A=malato med:A cure:A *2 | {A} prende le pillole antiradiazioni e si sente meglio.
1 d:A | {A} attraversa il Cratere senza protezione e non ne esce.
1 @mad | {A} si dipinge la faccia con l'olio motore e urla al sole.
1 @int +trap:A | {A} prepara una trappola con filo spinato e lattine.
1 s:A=ferito | {A} si taglia con un pezzo di lamiera arrugginita.
1 d:A | {A} si avvicina a una carovana e scopre troppo tardi che sono predoni.
1 @soc | {A} baratta del carburante con un vecchio eremita in cambio di informazioni.
1 @luck | {A} trova un vecchio rifugio con una mappa delle sorgenti.
2 k:A>B @agg | {A} insegue {B} in moto e l[B:o/a] butta giù dalla sella.
2 k:A>B w:A | {A} affronta {B} sulla Diga e l[B:o/a] abbatte con {arma:A}.
2 steal:A<B @stl | {A} ruba {arma:B} a {B} mentre dorme sotto il sole.
2 al:AB | {A} e {B} si dividono una lattina e decidono di viaggiare insieme.
2 steal:A<B=cibo @agg | {A} minaccia {B} e si fa consegnare tutta l'acqua.
2 need:B=* cure:B @heal | {A} fascia le ferite di {B} con stracci puliti.
2 s:B=ferito | {A} sperona il veicolo di {B}.
3 k:AB>C | {A} e {B} fanno un'imboscata a {C} sull'Autostrada spezzata.
3 al:ABC @soc | {A}, {B} e {C} riparano insieme un camion e formano una carovana.
`,
      n: `
1 | {A} accende un falò con dei vecchi pneumatici.
1 d:A | {A} viene punt[A:o/a] da uno scorpione mentre dorme.
1 @stl | {A} viaggia di notte per evitare il caldo.
2 ally:AB | {A} e {B} si stringono attorno al motore ancora caldo di un camion.
2 k:A>B @stl | {A} segue i fari di {B} fino al suo accampamento.
`,
      f: `
1 +cibo:A | {A} assalta il convoglio e si porta via una tanica d'acqua pulita.
1 d:A | {A} salta sul convoglio in corsa e finisce sotto le ruote.
2 k:A>B @agg | {A} butta {B} giù dal convoglio in corsa.
`,
    },
    dis: `
Pioggia acida | Una pioggia giallastra corrode metallo e pelle. | {A} resta allo scoperto e non sopravvive. | {A} si riempie di ustioni chimiche. | {A} si rifugia nella carcassa di un autobus.
Onda di calore | Il termometro supera i sessanta gradi. | {A} raggiunge la cisterna senza più avere la forza di aprirla. | {A} sviene e si risveglia con la febbre. | {A} si nasconde in una cisterna vuota. | affamato
Sciame di locuste | Uno sciame di locuste mutanti oscura il cielo. | {A} viene divorat[A:o/a] dalle locuste. | {A} viene mors[A:o/a] in tutto il corpo. | {A} si chiude in un container.
Il vecchio reattore | Un vecchio reattore nucleare sotterraneo si risveglia. | {A} segue il calore fino al reattore. Il contatore Geiger smette di ticchettare troppo tardi. | {A} perde i capelli e comincia a vomitare. | {A} si allontana nella direzione opposta. | malato
Terremoto | Un terremoto apre voragini nella sabbia. | {A} viene inghiottit[A:o/a] da una voragine. | {A} si rompe una gamba saltando una crepa. | {A} si trova sul cemento della Diga.
Esplosione della Diga | La Diga cede e un muro d'acqua attraversa la valle. | {A} scompare tra i piloni abbattuti dall'acqua della Diga. | {A} viene sbattut[A:o/a] contro le rocce. | {A} si arrampica su un pilone.
La tempesta elettrica | Fulmini violacei colpiscono il deserto. | {A} viene colpit[A:o/a] da un fulmine. | {A} viene sbalzat[A:o/a] da un fulmine vicino. | {A} si sdraia in una buca.
I mutanti | Una tribù di mutanti scende dalle colline. | {A} viene catturat[A:o/a] e non si sa più nulla. | {A} si libera dai mutanti, ma con una ferita profonda. | {A} si finge mort[A:o/a] e i mutanti passano oltre.
Il verme gigante | Un verme delle sabbie lungo cento metri emerge dal terreno. | {A} viene inghiottit[A:o/a] dal verme. | {A} viene sbalzat[A:o/a] via dal colpo di coda. | {A} resta immobile sulle rocce.
Gas dalla Raffineria | Una nube tossica esce dalla Raffineria. | {A} respira la nube e muore. | {A} respira il gas e tossisce sangue. | {A} indossa una maschera fatta di filtri. | avvelenato
Fuoco sull'Autostrada | Un'autocisterna esplode sull'Autostrada spezzata. | {A} viene investit[A:o/a] dalle fiamme. | {A} attraversa il guardrail in fiamme e ne porta addosso le conseguenze. | {A} si trovava già lontano.
La carovana degli schiavisti | Gli schiavisti setacciano il deserto. | {A} viene catturat[A:o/a] e portat[A:o/a] via in catene. | {A} sfugge agli schiavisti, ma viene colpit[A:o/a] di striscio. | {A} si nasconde sotto la sabbia.
Il sole nero | Un'eclisse totale oscura il deserto per ore. | {A} si perde nel buio e precipita da un viadotto. | {A} inciampa nelle macerie. | {A} accende una torcia e resta ferm[A:o/a].
Tempesta di vetro | Il vento solleva milioni di schegge di vetro dalla Città fantasma. | {A} viene fatt[A:o/a] a pezzi dal vetro. | {A} si copre, ma resta ferit[A:o/a]. | {A} si chiude in un bunker.
Gli avvoltoi | Stormi di avvoltoi giganti scendono su chi è debole. | {A} viene attaccat[A:o/a] mentre cammina. | {A} viene beccat[A:o/a] alle spalle. | {A} spara in aria e gli avvoltoi si allontanano.
Le sabbie mobili | Le dune si trasformano in sabbie mobili. | {A} viene inghiottit[A:o/a] dalla sabbia. | {A} esce dalla sabbia senza scarpe e con le gambe ferite. | {A} si aggrappa a un palo.
La pioggia di cenere | Un vulcano lontano copre il cielo di cenere. | {A} cerca aria sotto un cielo che ormai lascia cadere soltanto cenere. | {A} si ammala ai polmoni. | {A} respira attraverso un panno bagnato. | malato
L'acqua finisce | Ogni pozzo conosciuto si prosciuga. | {A} muore di sete. | {A} sopravvive bevendo dal radiatore di un camion. | {A} aveva una scorta nascosta. | affamato
La banda dei motociclisti | Una banda di motociclisti armati attraversa la zona. | {A} viene investit[A:o/a] dalla banda. | {A} viene colpit[A:o/a] da una catena. | {A} si nasconde in un tubo di scarico.
Il gelo notturno | Di notte la temperatura scende a meno trenta. | {A} muore congelat[A:o/a]. | {A} cerca di stringere la borraccia, ma le dita non rispondono più. | {A} si avvolge in vecchie coperte. | malato
I cani mutati | Un branco di cani a due teste caccia nel deserto. | {A} viene sbranat[A:o/a]. | {A} tiene lontana una testa del cane. La seconda raggiunge il braccio. | {A} lascia della carne come esca e scappa.
La pioggia di rottami | Un vecchio satellite precipita in pezzi sul deserto. | {A} viene schiacciat[A:o/a] da un rottame. | {A} viene colpit[A:o/a] da un frammento. | {A} si ripara dietro un muro.
Il fungo atomico | All'orizzonte si alza un fungo atomico. | {A} guarda il fungo atomico fino all'arrivo dell'onda che spazza via il riparo. | {A} viene accecat[A:o/a] per ore dal lampo. | {A} si stende in un fosso e aspetta il passaggio dell'onda d'urto.
La nebbia verde | Una nebbia verdognola esce dal Cratere. | {A} si perde nella nebbia e non ne esce. | {A} si riempie di macchie sulla pelle. | {A} sale sul tetto di un camion. | malato
I banditi della Diga | I banditi della Diga chiedono un pedaggio di sangue. | {A} non può pagare e viene uccis[A:o/a]. | {A} paga con una ferita. | {A} paga con tutto il carburante che ha.
Il tornado | Un tornado di sabbia attraversa le Terre Desolate. | {A} viene sollevat[A:o/a] e scagliat[A:o/a] lontano. | {A} viene colpit[A:o/a] da detriti. | {A} chiude il portello del bunker mentre la sabbia comincia a strappare la vernice.
La miniera | Una vecchia miniera crolla sotto i piedi di chi ci cammina sopra. | {A} cade nei cunicoli. | {A} si rompe un braccio nella caduta. | {A} si trovava sulla roccia solida.
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
