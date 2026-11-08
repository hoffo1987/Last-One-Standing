/* I complotti riservati: come si rivelano. {0} chi l'ha preparato, {1} il bersaglio,
 * {2} il complice (solo nei patti), {i} l'oggetto manomesso (solo nei sabotaggi).
 * «riuscito»: il bersaglio non se ne accorge; «sventato»: il bersaglio legge il piano e reagisce.
 * Le versioni «soft» valgono per le arene senza violenza (Liceo, Ufficio). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});
  D.intrigue = {
    imboscata: {
      riuscito: [
        '{0} cambia improvvisamente ritmo: la finta contro {1} era preparata. {1} abbocca e viene ferit[1:o/a] prima di capire il piano.',
        '{0} aspettava questo momento da giorni: quando {1} passa dal punto scelto, l\'agguato scatta. {1} ne esce ferit[1:o/a].',
        '{1} si accorge troppo tardi che {0} l[1:o/a] seguiva da tempo. Il colpo arriva dal lato scoperto.',
        '{0} lascia credere a {1} di essere stanc[0:o/a] e distratt[0:o/a]. È una recita: l\'attacco che segue era studiato nei dettagli.',
      ],
      sventato: [
        '{0} prova la finta preparata contro {1}. {1} ne riconosce il ritmo, evita il colpo e ferisce {0}: l’imboscata si ritorce contro chi l’ha ideata.',
        '{1} aveva notato {0} aggirarsi troppo spesso nello stesso punto. Quando l\'agguato scatta, è pront[1:o/a]: {0} ne esce ferit[0:o/a].',
        'L\'agguato di {0} era studiato bene, ma {1} è più veloce. Il contrattacco lascia il segno su {0}.',
      ],
    },
    patto: {
      riuscito: [
        '{0} e {2} smettono di fingere: il loro accordo era contro {1}. L’attacco coordinato ferisce {1}, prima che riesca a reagire.',
        '{0} e {2} si erano messi d\'accordo di nascosto. Arrivano su {1} da due lati: il primo colpo va a segno.',
        'Un segnale, e {2} chiude la via di fuga mentre {0} attacca. {1} capisce solo adesso che i due erano d\'accordo.',
      ],
      sventato: [
        '{0} e {2} scattano insieme contro {1}: si erano accordati in segreto. {1} legge il segnale e reagisce, ferendo {0}.',
        '{1} intercetta lo sguardo tra {0} e {2} un attimo prima dell\'attacco. Il colpo di {0} va a vuoto; quello di {1} no.',
      ],
      doppio: [
        '{0} dà a {2} il segnale per accerchiare {1}. Ma {2} cambia parte: avverte {1} e colpisce {0}. Il patto era vero; l’ultima scelta no.',
        '{2} doveva aiutare {0} contro {1}. All\'ultimo cambia idea: avverte {1} e si rivolta contro {0}.',
      ],
    },
    sabotaggio: {
      riuscito: [
        'Il sabotaggio si manifesta quando {1} usa {i}. {0} rivela di averlo preparato e approfitta dell’apertura per ferire {1}.',
        '{1} usa {i} e qualcosa cede nel momento peggiore. Era opera di {0}, che ne approfitta per colpire.',
      ],
      sventato: [
        '{1} riconosce la manomissione di {i} prima di usarlo. {0} rivela il sabotaggio, ma {1} reagisce e ferisce {0}.',
        '{1} controlla {i} prima di usarlo e trova il trucco. Quando {0} si avvicina per approfittarne, trova {1} pront[1:o/a] a colpire.',
      ],
    },
  };
  D.intrigueSoft = {
    imboscata: {
      riuscito: [
        '{0} cambia improvvisamente ritmo: la finta contro {1} era preparata. {1} abbocca e deve spendere energie per recuperare.',
        '{0} aspettava il momento giusto: la mossa contro {1} era studiata da giorni. {1} ci casca e perde terreno.',
        '{1} capisce troppo tardi che {0} preparava quella mossa da tempo. Rimediare costa fatica.',
      ],
      sventato: [
        '{0} prova la manovra tenuta nascosta contro {1}. {1} riconosce la finta e la ribalta: è {0} a consumare energie per recuperare.',
        '{1} aveva intuito il piano di {0} e lo lascia scattare a vuoto. A perdere terreno è proprio {0}.',
        'La trappola di {0} era ben pensata, ma {1} la smonta con calma davanti a tutti.',
      ],
    },
    patto: {
      riuscito: [
        '{0} e {2} smettono di fingere: il loro accordo era contro {1}. La manovra coordinata costa a {1} energie preziose.',
        'Un cenno tra {0} e {2}, e la trappola contro {1} si chiude: era tutto concordato. {1} perde terreno.',
      ],
      sventato: [
        '{0} e {2} rivelano il loro accordo contro {1}. {1} legge il segnale in tempo e manda a vuoto la manovra: è {0} a perdere terreno.',
        '{1} intercetta lo sguardo d\'intesa tra {0} e {2} e anticipa la mossa: il piano si sgonfia, e {0} ci rimette.',
      ],
      doppio: [
        '{0} dà il segnale per il piano concordato con {2} contro {1}. Ma {2} cambia parte: avverte {1} e fa perdere terreno a {0}. Il patto era vero; l’ultima scelta no.',
        '{2} doveva stare con {0} contro {1}. All\'ultimo cambia schieramento e il piano crolla addosso a {0}.',
      ],
    },
    sabotaggio: {
      riuscito: [
        'Il sabotaggio si manifesta quando {1} usa {i}. {0} rivela di averlo preparato: {1} perde tempo ed energie per rimediare.',
        '{1} usa {i} e qualcosa non funziona come dovrebbe: dietro c\'è {0}. Rimediare costa tempo ed energie.',
      ],
      sventato: [
        '{1} riconosce la manomissione di {i} prima di usarlo. {0} ammette di aver preparato il sabotaggio, ma la contromossa di {1} manda a vuoto il piano.',
        '{1} scopre in tempo il trucco preparato da {0} su {i} e lo racconta a tutti. Il piano si ritorce contro chi l\'ha ideato.',
      ],
    },
  };
})(typeof window === 'object' ? window : globalThis);
