/* Villa Maledetta — secondo pacchetto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'horror',
    ev: {
      b: `
1 +armatura:A @luck | Durante la cena, {A} si nasconde dietro {armatura}. Il primo coltello rimbalza.
1 +attrezzo:A @int | {A} ruba {attrezzo} dal tavolo apparecchiato. Il maggiordomo fantasma alza un sopracciglio.
2 al:AB @soc | Le luci si spengono durante la cena: {A} e {B} si stringono la mano sotto il tavolo. Quando le luci tornano, sono alleati.
2 k:A>B @agg | Le candele si spengono di colpo. Quando si riaccendono, il posto di {B} è vuoto e {A} si pulisce le mani.
1 test:A=cor12 ok:+amuleto:A ko:pr:A+30 | {A} apre l'armadio della sala da pranzo. Dentro c'è {amuleto}. || {A} apre l'armadio della sala da pranzo. Dentro c'è qualcosa che {A} non dimenticherà mai.
`,
      d: `
1 stat:A>pr50 @mad | {A} conta le porte del corridoio a voce alta. Ogni volta ne conta una in più.
1 stat:A>pr60 con:A=amuleto pr:A-30 | {A} stringe {amuleto:A} e recita la preghiera della nonna. I sussurri tacciono.
1 stat:A<hp45 @heal hp:A+20 | {A} trova un cassetto pieno di bende nella Serra. Sono vecchie di un secolo, ma pulite.
1 stat:A<food30 +cibo:A | {A} trova un pasto caldo servito in una stanza vuota. Lo mangia lo stesso. Non chiede a chi era destinato.
1 stat:A>mo75 star:A | {A} ride in faccia a un fantasma. Il fantasma è così offeso che se ne va. Il pubblico adora.
1 con:A=attrezzo +mappa:A @int | {A} usa {attrezzo:A} per trovare i passaggi segreti della villa. Ne disegna una mappa.
1 con:A=valore -valore:A pr:A-25 | {A} lascia {valore} sul pianoforte, come offerta. Il pianoforte suona una nota, soddisfatto.
1 con:A=ricordo mo:A+15 pr:A-15 | {A} stringe {ricordo:A}. Per un attimo, la villa sembra solo una casa.
1 wx:buio @stl | Durante il temporale, {A} si muove tra i corridoi senza che neppure i fantasmi l[A:o/a] notino.
1 wx:pericolo s:A=sconvolto | Le candele si accendono da sole intorno a {A} formando un cerchio. {A} non si muove per un'ora.
1 trait:A=superstizioso +amuleto:A pr:A-15 | {A} sparge sale su ogni soglia della stanza e appende uno spicchio d'aglio sulla porta. Dorme tranquill[A:o/a].
1 trait:A=ingegnoso con:A=attrezzo +trap:A | {A} collega {attrezzo:A} al lampadario: chi entra nella Biblioteca riceve un lampadario in testa.
2 crush:A>B rel:AB+15 @soc | {A} lascia a {B} una rosa nera trovata nella Serra. Non sa che nella villa una rosa nera significa «sei il prossimo». {B} lo sa.
2 crush:A>B love:AB *2 | {A} e {B} restano chiusi nella Cappella durante il temporale. Il fantasma del prete li sposa per sbaglio.
2 plot:A>B rel:AB+10 | {A} accompagna {B} in Cantina «per sicurezza». Prende nota di dove sono le chiavi.
2 plot:A>B -amuleto:B +amuleto:A @stl | {A} scambia il portafortuna di {B} con un oggetto qualsiasi. La villa ne approfitterà.
2 goal:A=vendetta grudge:A>B hit:A>B | {A} chiude {B} nella Soffitta per {caro:A}. L[B:o/a] fa uscire solo all'alba, mezz[B:o/a] pazz[B:o/a].
2 goal:A=caccia k:A>B @agg | {A} segue {B} nei passaggi segreti. In fondo al passaggio, {B} non trova l'uscita.
2 con:A=armatura hit:B>A | {B} colpisce {A} con un candelabro, ma {armatura:A} rimbomba come una campana.
2 con:A=alcol give:A>B=alcol rel:AB+20 pr:B-10 | {A} e {B} si scolano {alcol} della cantina. I fantasmi, per una sera, sembrano simpatici.
2 test:A=cor13 ok:save:A>B ko:pr:A+25 | {A} entra nello specchio per riportare indietro {B}. Ci riesce. || {A} entra nello specchio per riportare indietro {B}, ma scappa a metà. Ci penserà per sempre.
2 owe:A>B repay:A>B rel:AB+10 | {A} tira {B} fuori dalla vasca della Serra prima che le mani dall'acqua l[B:o/a] trascinino giù. Debito saldato.
3 plot:A>B ally:ABC rel:AC+20 | {A} racconta a {C} che {B} parla con i fantasmi di notte. È vero. Ma {A} lo racconta nel modo peggiore.
`,
      n: `
1 stat:A>pr60 pr:A+10 s:A=sconvolto | {A} sente bussare dall'interno dell'armadio. Tutta la notte. Al mattino l'armadio è vuoto.
1 stat:A<en25 s:A=ferito | {A} crolla dal sonno su una sedia a dondolo. La sedia continua a dondolare. Da sola.
1 con:A=ricordo | {A} si addormenta stringendo {ricordo:A}, l'unica cosa nella villa che non sussurra.
1 wx:buio @mad | Nel buio, {A} sente il proprio nome sussurrato da dieci voci diverse.
2 crush:A>B @soc | {A} veglia {B} tutta la notte con una candela. Quando la candela si spegne da sola, non la riaccende.
2 plot:A>B tr:A>B *2 | {A} accompagna {B} in Cantina «a prendere da bere». Torna da sol[A:o/a].
2 plot:A>B br:A | {A} se ne va nella notte chiudendo a chiave la porta del gruppo dall'esterno. {B} trova la porta chiusa all'alba.
2 couple:AB pr:A-15 pr:B-15 | {A} e {B} si raccontano storie buffe per coprire i rumori della villa. Funziona fino all'alba.
2 couple:AB stat:B<hp40 save:A>B | {A} porta {B} fuori dalla Soffitta in braccio, mentre le bambole si girano a guardare.
2 hit:A>B trait:A=sonnambulo | {A} cammina nel sonno con un candelabro in mano. {B} si sveglia con un bernoccolo e un sospetto.
`,
      f: `
2 crush:A>B save:A>B | Al ballo in maschera, {A} riconosce {B} sotto la maschera e l[B:o/a] trascina via un attimo prima che il lampadario cada.
2 plot:A>B k:A>B *2 | Al ballo in maschera, {A} balla con {B} fino al balcone. Il balcone non ha ringhiera.
1 con:A=valore -valore:A +amuleto:A | Al ballo, {A} paga un indovino fantasma con {valore} e ottiene {amuleto}.
`,
      sponsor: `
1 +amuleto:A @gift | Gli sponsor mandano a {A} {amuleto}, benedetto da tre preti diversi. Per sicurezza.
1 +attrezzo:A @gift | Un pacco per {A} appare sul tavolo della cena: dentro c'è {attrezzo}.
1 +ricordo:A mo:A+20 pr:A-15 @gift | Gli sponsor mandano a {A} una lettera da casa e {ricordo}. Per un attimo la villa tace.
`,
      finale: `
2 k:A>B | Nella sala da ballo, mentre le candele si spengono una a una, {A} e {B} si affrontano. Quando si spegne l'ultima, resta solo il respiro di {A}.
2 k:A>B stat:B>pr60 | {B} è stat[B:o/a] consumat[B:o/a] dal terrore: attacca {A} gridando nomi che nessuno conosce. {A} non ha scelta.
`,
    },
    dis: `
La notte dei ritratti | I ritratti della villa scendono dalle cornici. | {A} viene trascinat[A:o/a] dentro un ritratto. | {A} viene graffiat[A:o/a] da una nobildonna dipinta. | {A} gira tutti i ritratti verso il muro. | ferito
L'allagamento della Cantina | La Cantina si riempie di un'acqua nera e gelida. | {A} viene trascinat[A:o/a] sul fondo. | {A} esce dall'acqua con una febbre altissima. | {A} sale le scale tre gradini alla volta. | malato
La danza delle bambole | Le bambole della Soffitta prendono vita e cantano una filastrocca. | {A} ascolta la filastrocca fino alla fine. | {A} viene mors[A:o/a] da una bambola di porcellana. | {A} chiude la Soffitta a chiave e butta via la chiave. | sconvolto
La campana della Cappella | La campana suona tredici colpi. A ogni colpo, qualcuno sparisce. | {A} sparisce al tredicesimo colpo. | {A} sparisce per un'ora e ricompare in giardino, senza ricordi. | {A} si tappa le orecchie e conta fino a quattordici. | sconvolto
La nebbia del Cimitero | Dal Cimitero sale una nebbia che parla. | {A} segue la voce nella nebbia. | {A} ne esce con i capelli bianchi. | {A} resta in casa e chiude le finestre. | sconvolto
Il banchetto dei morti | La tavola si apparecchia da sola per cento ospiti invisibili. | {A} si siede al banchetto e non si rialza più. | {A} assaggia un piatto e sta male per giorni. | {A} rifiuta educatamente e se ne va. | avvelenato
Le pareti che si stringono | I corridoi della villa si restringono lentamente. | {A} resta schiacciat[A:o/a] tra due pareti. | {A} si sloga una spalla per uscire. | {A} trova una finestra e salta fuori. | ferito
Il pianoforte maledetto | Il pianoforte suona una melodia che fa ballare chiunque la senta. | {A} balla fino a crollare. | {A} balla per sei ore e si rompe una caviglia. | {A} chiude il coperchio del pianoforte con un tonfo. | ferito
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
