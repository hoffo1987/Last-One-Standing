/* Terre Desolate — pacchetto esteso. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'wasteland',
    ev: {
      b: `
1 +amuleto:A | {A} afferra dalla cassa {amuleto} e se lo fissa addosso con il nastro adesivo.
1 s:A=ferito | {A} prova a saltare su una moto in corsa e si ritrova con la faccia nella sabbia.
2 k:A>B @agg | {A} investe {B} con un carrello della spesa trasformato in carro armato.
2 save:A>B | {A} tira {B} dentro un fuoristrada mentre un barile di benzina esplode alle sue spalle.
1 @show star:A | {A} si dipinge la faccia di nero con l'olio, alza le braccia al cielo e urla. Il pubblico urla con [A:lui/lei/loro].
2 al:AB @soc | {A} e {B} si accorgono di avere lo stesso modello di occhiali da saldatore. È destino.
`,
      d: `
1 +cibo:A @int | {A} costruisce una trappola per lucertole e cattura una lucertola a due teste. Doppia porzione.
1 @mad | {A} parla con un manichino trovato nella Città fantasma e lo nomina sindaco.
1 s:A=ferito | {A} prova a riparare un motore a mani nude. Il motore vince.
1 d:A *0.5 | {A} beve da una pozzanghera verde fosforescente "perché aveva sete". La sete passa per sempre.
1 +arma:A @int | {A} salda una motosega a una mazza da baseball e ottiene {arma}, più o meno.
1 @show star:A | {A} fa saltare una moto sopra un camion in fiamme. Atterra male, ma con stile.
1 +mappa:A @int | {A} decifra i graffiti dei vecchi predoni e ottiene {mappa}.
1 +esplosivo:A | {A} trova un deposito di carburante e riempie lo zaino di {esplosivo}.
1 need:A=malato med:A cure:A *2 | {A} prende le ultime pillole antiradiazioni e smette di brillare al buio.
1 @cow | {A} si seppellisce nella sabbia per tutto il giorno, lasciando fuori solo il naso.
1 @soc +cibo:A | {A} vince una partita a carte contro un mercante mutante e si porta a casa una tanica d'acqua.
2 k:A>B @int | {A} vende a {B} un'auto "in ottimo stato". I freni non erano in ottimo stato.
2 hit:A>B @agg | {A} lancia una chiave inglese a {B} da venti metri. Prende la testa. Rimbalza. Prende anche il ginocchio.
2 love:AB @soc | {A} e {B} si dividono l'ultima lattina di pesche sciroppate guardando il tramonto radioattivo. Amore.
2 couple:AB @show | {A} e {B} decorano una moto insieme e la chiamano come il loro futuro figlio.
2 grudge:A>B k:A>B *3 | {A} lega {B} al paraurti di un camion per {caro:A} e fa un giro lungo, molto lungo.
2 grudge:A>B hit:A>B *2 | {A} sabota la moto di {B} per {caro:A}. {B} vola per dieci metri e atterra su un cactus.
2 save:A>B | {A} trova {B} disidratat[B:o/a] nel deserto e [B:gli/le] dà da bere dalla propria borraccia.
2 steal:A<B @stl | {A} sottrae {arma:B} a {B} mentre dorme all'ombra di un camion.
2 repay:A>B give:A>B=cibo | {A} lascia a {B} la propria tanica d'acqua: "Siamo pari".
2 feared:B @cow | {A} vede la carovana di {B} all'orizzonte e decide di andare dalla parte opposta. Per sempre.
2 traitor:B rel:AB-30 | {A} appende un cartello sul camion di {B}: "Questo è un traditore. Sparategli."
2 enemy:AB | {A} e {B} si sfidano in una gara di auto sull'Autostrada spezzata. Il ponte crolla prima del traguardo. Pareggio.
3 al:ABC @soc | {A}, {B} e {C} formano una banda e si fanno fare un tatuaggio uguale con un ago arrugginito.
3 k:AB>C | {A} e {B} tendono un cavo tra due pali mentre {C} arriva a tutta velocità in moto.
3 couple:AB hit:C>A | {C} lancia una molotov contro l'auto di {A} per gelosia di {B}. Il parabrezza esplode.
2 veleno:A k:A>B @stl *1.5 | {A} offre a {B} un sorso di "acqua pulita" con {veleno:A}.
3 esplosivo:A k:A>BC | {A} fa saltare {esplosivo:A} sulla strada della carovana di {B} e {C}. Fuochi d'artificio nel deserto.
1 need:A=affamato @mad | Affamat[A:o/a], {A} arrostisce uno scorpione gigante e se lo mangia con la corazza. Croccante.
2 friend:AB @show | {A} e {B} costruiscono una piscina con un vecchio container e un camion cisterna. Dura un'ora, ma che ora.
`,
      n: `
1 | {A} accende un falò con i pneumatici e guarda le stelle cadere. Alcune cadono davvero, sono satelliti.
1 d:A *0.5 | {A} dorme sotto un camion. Il camion non era parcheggiato bene.
2 couple:AB | {A} e {B} dormono sul tetto di un autobus contando le stelle cadenti, che qui sono quasi tutte satelliti.
2 grudge:A>B | {A} incide il nome di {B} sulla canna del fucile. Restano due centimetri liberi.
2 k:A>B @stl | {A} si avvicina al falò di {B} e lo spegne. Anche {B}.
`,
      f: `
2 k:A>B | {A} e {B} saltano sullo stesso camion del convoglio. Uno dei due scende prima del previsto.
1 +amuleto:A | Nella cassa del convoglio c'è {amuleto}. {A} lo considera un segno.
`,
      ds: `
1 con:A=mappa | Grazie a {mappa:A}, {A} sa dove ripararsi prima che la tempesta arrivi.
2 save:A>B | {A} trascina {B} dentro un bunker e chiude il portellone.
`,
    },
    dis: `
La tempesta di ruggine | Una tempesta trasforma in ruggine tutto ciò che è metallo. | {A} si ritrova in mano un'arma che si sbriciola davanti a un predone. | {A} perde il motore della moto a metà strada. | {A} combatteva già a mani nude.
I cammelli mutanti | Un branco di cammelli con tre gobbe e un pessimo carattere attraversa il deserto. | {A} viene calpestat[A:o/a] dalla mandria. | {A} riceve uno sputo acido in faccia. | {A} cavalca un cammello e si fa un giro.
Il mercato dei predoni | I predoni aprono un mercato in cui si vende di tutto, anche i concorrenti. | {A} viene vendut[A:o/a] al miglior offerente. | {A} viene derubat[A:o/a] di tutto. | {A} vende due chiodi a peso d'oro.
Le formiche di vetro | Formiche trasparenti grandi come cani escono da un cratere. | {A} viene trascinat[A:o/a] nel formicaio. | {A} viene mors[A:o/a] a una gamba. | {A} si sposta su una roccia alta.
Il miraggio | Il deserto mostra a ognuno un'oasi diversa. | {A} cammina verso il miraggio fino a crollare. | {A} cammina per ore e si disidrata. | {A} non si fida di nulla che sia troppo bello. | affamato
La pioggia di pesci | Un tornado ha raccolto un intero lago e ora lo restituisce, pesci compresi. | {A} viene colpit[A:o/a] da un pesce enorme. | {A} viene colpit[A:o/a] da un pesce di medie dimensioni. | {A} raccoglie pesci per una settimana.
Il vecchio esercito | Un esercito di robot militari della vecchia guerra si risveglia. | {A} viene identificat[A:o/a] come nemico. | {A} viene colpit[A:o/a] da un colpo di avvertimento. | {A} saluta militarmente e i robot l[A:o/a] lasciano passare.
La sabbia che canta | Il vento sulla sabbia produce una melodia ipnotica. | {A} segue la melodia nel deserto profondo. | {A} si perde e ritrova la strada stremat[A:o/a]. | {A} canta più forte della sabbia. | sconvolto
Il grande incendio | Il petrolio della Raffineria prende fuoco e il fuoco corre sulla sabbia. | {A} viene raggiunt[A:o/a] dal fuoco. | {A} si ustiona le gambe. | {A} si rifugia nella Diga.
La radio dei morti | Una vecchia radio trasmette nomi. Chi sente il proprio nome, muore. | {A} sente il proprio nome. | {A} sente un nome simile al proprio e sviene. | {A} spegne la radio. | sconvolto
La pioggia di rottami spaziali | Una stazione spaziale abbandonata precipita a pezzi sul deserto. | {A} viene schiacciat[A:o/a] da un pannello solare. | {A} viene colpit[A:o/a] da un bullone grande come un pugno. | {A} trova nei rottami una lattina di cibo spaziale.
Il culto del motore | Una setta che adora i motori rapisce chiunque sappia guidare. | {A} viene sacrificat[A:o/a] al Grande Carburatore. | {A} viene costrett[A:o/a] a pregare per ore e si ferisce le ginocchia. | {A} dice di non saper guidare.
La notte senza fine | Una nube di cenere oscura il sole per tutto il giorno. | {A} si perde al buio e cade in un crepaccio. | {A} inciampa in un rottame. | {A} accende un falò e aspetta.
I vermi delle dune | I vermi delle sabbie entrano in calore e diventano territoriali. | {A} viene inghiottit[A:o/a] da un verme. | {A} viene sbalzat[A:o/a] via da un colpo di coda. | {A} sta immobile sulle rocce.
La diga dei castori | Castori mutanti costruiscono una diga sul fiume secco e lo inondano. | {A} viene travolt[A:o/a] dall'acqua. | {A} viene mors[A:o/a] da un castoro gigante. | {A} ringrazia i castori per l'acqua.
`,
  });
  D.packs.push({
    theme: 'wasteland', adult: true,
    ev: {
      d: `
2 k:A>B @agg | {A} schiaccia la testa di {B} sotto la ruota di un camion. Fa un rumore che il pubblico non dimenticherà.
1 s:A=ubriaco | {A} si scola un'intera tanica di birra di cactus e cerca di sposare un'auto.
2 love:AB | {A} e {B} si chiudono nella cabina di un camion e appannano tutti i vetri. Il camion dondola per un'ora.
1 @mad s:A=sconvolto | {A} fuma qualcosa che un mercante chiamava "tabacco". Non era tabacco. Vede gli dei del deserto e ci litiga.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a] fradic[A:io/ia], {A} fa la corte a {B} recitando poesie sui carburatori. Funziona benissimo.
1 d:A *0.4 | {A} viene catturat[A:o/a] dai predoni e usat[A:o/a] come bersaglio per le freccette. Le freccette sono arpioni.
2 hit:A>B | {A} prende {B} a calci nelle palle, o in quello che c'è, con lo stivale chiodato.
`,
      n: `
2 couple:AB | {A} e {B} passano la notte sul retro del furgone. All'alba il furgone ha una sospensione rotta.
2 k:A>B @stl | {A} sgozza {B} nel sonno e si prende i suoi stivali. Erano proprio della sua misura.
`,
    },
    dis: `
L'orgia dei predoni | I predoni organizzano una festa selvaggia con alcol, fuoco e nessuna regola. | {A} capita alla festa e diventa lo spettacolo principale, per poco. | {A} si sveglia senza vestiti in mezzo al deserto. | {A} beve un sorso, ruba un'auto e se ne va. | ubriaco
Il mattatoio dei mutanti | I mutanti appendono le loro prede ai pali della strada. | {A} finisce appes[A:o/a] a un palo. | {A} riesce a liberarsi lasciando un pezzo di pelle sul gancio. | {A} passa dall'altra strada.
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
