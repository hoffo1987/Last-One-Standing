/* Stazione Orbitale — secondo pacchetto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'scifi',
    ev: {
      b: `
1 +armatura:A @luck | {A} trova {armatura} nell'Hangar e si attrezza. È di due taglie più grande, ma il pericolo non guarda le taglie.
1 +attrezzo:A @int | {A} stacca {attrezzo} da una parete e custodisce il bottino come un tesoro. In una stazione spaziale, lo è.
2 al:AB +attrezzo:B | {A} e {B} si chiudono insieme nella stessa capsula durante lo sbarco. Quando si riapre, sono una squadra.
2 k:A>B @agg | {A} apre il portellone sbagliato al momento giusto. Per {B}, è il momento sbagliato.
1 test:A=int12 ok:+mappa:A ko:pr:A+25 | {A} hackera il primo terminale che trova e scarica la planimetria della stazione. || {A} prova ad hackerare un terminale e disattiva per sbaglio il proprio ricircolatore.
`,
      d: `
1 stat:A>pr50 con:A=attrezzo pr:A-35 | {A} usa {attrezzo:A} per riparare un ricircolatore. L'aria torna respirabile, e ha un buon odore di plastica.
1 stat:A>pr60 s:A=sconvolto | {A} sente le pareti respirare. Sono i ventilatori. Non importa: {A} trema lo stesso.
1 stat:A<hp45 con:A=med -med:A hp:A+40 | {A} si inietta {med:A}. I nanobot medici [A:gli/le] ricuciono la pelle in tre secondi e un prurito di tre ore.
1 stat:A<food30 +cibo:A | {A} trova un distributore automatico ancora acceso. Inserisce un bottone come moneta. Funziona.
1 stat:A>mo75 @show star:A | {A} galleggia a gravità zero facendo capriole per le telecamere. Gli sponsor adorano le capriole.
1 con:A=valore -valore:A +armatura:A | {A} paga un droide di servizio con {valore}. Il droide [A:gli/le] consegna {armatura} e un sorriso pixelato.
1 con:A=ricordo mo:A+15 | {A} proietta sul casco {ricordo:A}. Per un minuto è di nuovo sulla Terra.
1 wx:buio @stl | Approfittando del blackout, {A} attraversa il Ponte di comando senza che nessuna telecamera l[A:o/a] veda.
1 wx:abbondanza +cibo:A | {A} trova una delle casse cadute dalla navetta cargo. Dentro ci sono razioni per una settimana.
1 wx:pericolo s:A=ferito | Una pioggia di micrometeoriti buca il modulo dove dorme {A}. Ne esce con un buco nella tuta e uno nella spalla.
1 trait:A=ingegnoso con:A=attrezzo +trap:A | {A} riprogramma un drone di pulizia perché insegua chiunque entri nel suo modulo. È una trappola, tecnicamente.
2 crush:A>B rel:AB+15 @soc | {A} regola la temperatura del modulo di {B} sui suoi gradi preferiti. Non glielo dice.
2 crush:A>B love:AB *2 | Il ricircolatore si blocca e {A} e {B} restano chiusi in un condotto con l'ossigeno per due. Bastano dieci minuti per capirsi.
2 plot:A>B rel:AB+10 | {A} aiuta {B} a sistemare la tuta. Ne approfitta per memorizzare il codice del suo zaino.
2 plot:A>B -mappa:B +mappa:A @stl | {A} copia la planimetria di {B} e la cancella dal suo dispositivo. Un piccolo dettaglio del piano.
2 goal:A=vendetta grudge:A>B hit:A>B | {A} chiude {B} in una camera di decompressione per {caro:A}. La riapre dopo un minuto. Il prossimo sarà più lungo.
2 goal:A=caccia k:A>B @agg | {A} rintraccia {B} dal segnale della sua tuta. Il segnale si spegne dieci minuti dopo.
2 goal:A=cibo give:B>A=cibo debt:A>B | {B} passa a {A} un tubetto di gel proteico attraverso una grata. «Ricordatelo.»
2 con:A=armatura hit:B>A | {B} spara a {A} con un taser, ma {armatura:A} scarica tutto a terra.
2 con:A=alcol give:A>B=alcol rel:AB+20 | {A} e {B} brindano con {alcol} guardando la Terra dall'oblò. Fa meno paura, così.
2 test:A=int13 ok:pr:A-30 ok:pr:B-30 ko:pr:A+20 | {A} ricalibra il ricircolatore del modulo che divide con {B}. Finalmente respirano di nuovo. || {A} ricalibra il ricircolatore del modulo che divide con {B}. Adesso soffia aria calda e polvere.
2 owe:A>B repay:A>B rel:AB+10 | {A} sblocca la porta del modulo dove {B} è rimast[B:o/a] chius[B:o/a]. Debito saldato.
3 plot:A>B ally:ABC rel:AC+20 | {A} mostra a {C} una registrazione manomessa in cui {B} sembra parlare male di l[C:ui/ei]. {C} si convince.
`,
      n: `
1 stat:A>pr60 pr:A+10 | {A} passa il ciclo notturno a respirare in un sacchetto. L'aria è poca, il panico tanto.
1 stat:A<en25 s:A=ferito | {A} si addormenta in un condotto e la gravità torna di colpo. Atterraggio di faccia.
1 con:A=ricordo | {A} si addormenta guardando {ricordo:A} alla luce del monitor.
1 wx:buio @mad | Nel buio della stazione, {A} vede occhi rossi nel condotto. Sono i led di un drone. Forse.
2 crush:A>B @soc | {A} resta svegli[A:o/a] per controllare che l'ossigeno di {B} non scenda. Ogni ora. Senza dirglielo.
2 plot:A>B tr:A>B *2 | {A} apre il portellone mentre {B} dorme accanto. Il vuoto fa il resto.
2 plot:A>B br:A | {A} si chiude in una capsula di salvataggio con metà delle razioni del gruppo. {B} trova il biglietto: «Scusa».
2 couple:AB pr:A-15 pr:B-15 | {A} e {B} dividono la stessa bombola d'ossigeno, un respiro a testa, fino all'alba.
2 couple:AB stat:B<hp40 save:A>B | {A} trascina {B} fino all'infermeria automatica e la tiene accesa a pugni per tutta la notte.
2 hit:A>B trait:A=sonnambulo | {A} cammina nel sonno a gravità zero e prende a calci {B} senza volerlo. Due volte.
`,
      f: `
2 crush:A>B save:A>B | Al rifornimento, {A} spinge {B} fuori dalla traiettoria di una cassa che cade. La cassa pesa una tonnellata. Il gesto di più.
2 plot:A>B k:A>B *2 | Al rifornimento, {A} sabota la cassa di {B}. Quando {B} la apre, è l'ultima cosa che apre.
1 con:A=valore -valore:A +attrezzo:A | Al rifornimento, {A} paga un droide con {valore} e ottiene {attrezzo}.
`,
      sponsor: `
1 +armatura:A @gift | Una capsula di consegna aggancia la stazione: dentro, per {A}, c'è {armatura}.
1 +attrezzo:A @gift | Gli sponsor teletrasportano a {A} {attrezzo}. Il teletrasporto è ancora in beta: arriva tiepido.
1 +ricordo:A mo:A+20 @gift | Gli sponsor mandano a {A} un messaggio olografico da casa e {ricordo}.
`,
      finale: `
2 k:A>B | Sul Ponte di comando, {A} e {B} si contendono l'ultima bombola d'ossigeno. Respira solo {A}.
2 k:A>B con:A=armatura | {B} spara l'ultima carica, ma {armatura:A} regge. {A} si avvicina lentamente.
`,
    },
    dis: `
La falla nello scafo | Un modulo intero si apre verso lo spazio. | {A} attraversa la falla insieme agli ultimi metri cubi di ossigeno. | {A} si aggrappa a una maniglia e perde lo zaino. | {A} chiude il portellone con un piede, appena in tempo. | affamato
L'intelligenza artificiale ribelle | Il computer di bordo decide che gli esseri umani sono un errore di sistema. | {A} entra in un ascensore. L'ascensore non si ferma più. | {A} viene colpit[A:o/a] da un braccio robotico impazzito. | {A} chiede gentilmente al computer di smettere. Funziona, chissà perché. | ferito
Lo sciame di nanobot | Nanobot difettosi si diffondono nei condotti mangiando tutto quello che trovano. | {A} viene smontat[A:o/a] atomo per atomo. | {A} perde i capelli, le sopracciglia e un'unghia. | {A} si chiude in una cella frigorifera finché i nanobot non si spengono. | ferito
La gravità invertita | La gravità della stazione si inverte all'improvviso. | {A} cade verso il soffitto del Reattore. | {A} si rompe un polso atterrando sul soffitto. | {A} si aggrappa a un tubo e aspetta che passi. | ferito
Il reattore in surriscaldamento | Il Reattore va in sovraccarico: le temperature salgono. | {A} si avvicina troppo al nucleo. | {A} si ustiona le mani su un portellone rovente. | {A} si rifugia nella Serra, che resta fresca. | malato
L'invasione di spore | Una pianta aliena della Serra libera spore in tutta la stazione. | {A} respira le spore e si addormenta per sempre. | {A} tossisce verde per un giorno intero. | {A} si infila il casco e aspetta che il filtro faccia il suo lavoro. | malato
L'asteroide | Un asteroide si schianta contro i Moduli abitativi. | {A} era nel modulo sbagliato. | {A} viene sbalzat[A:o/a] contro una parete. | {A} sente l'allarme e corre nel modulo opposto. | ferito
Il blackout totale | La stazione si spegne: niente luce, niente aria, niente gravità. | {A} si perde nel buio e finisce l'ossigeno. | {A} sbatte contro tutto quello che esiste. | {A} trova una torcia a manovella e gira la manovella per sei ore. | sconvolto
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
