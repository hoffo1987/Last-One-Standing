/* Carattere e prove legati alla situazione (arene di sopravvivenza).
 * Ogni evento scatta solo se la condizione è vera adesso: ferita, fame, sfinimento, morale a terra,
 * pericolo dell'arena alto, meteo, obiettivo, rancori, debiti, amori, oggetti nello zaino.
 * Il tratto o la caratteristica decide come va, e le conseguenze restano. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: '*',
    ev: {
      d: `
1 need:A=ferito trait:A=guaritore hp:A+25 | {A} si medica da sol[A:o/a] con la calma di chi lo ha fatto cento volte: pulisce, stringe, fascia. La ferita smette di pulsare.
1 need:A=ferito trait:A=sopravvissuto test:A=res11 ok:hp:A+20 ko:hp:A-5 | {A} guarda la ferita e scrolla le spalle: ne ha viste di peggio. La lava, la chiude e riprende a camminare. || {A} sottovaluta la ferita come sempre. Questa volta la ferita non sottovaluta {A}.
1 need:A=ferito trait:A=codardo test:A=cor12 ok:hp:A+15 ok:mo:A+10 ko:mo:A-10 ko:en:A-10 | {A} è terrorizzat[A:o/a] dal proprio sangue, ma stringe i denti e si fascia da sol[A:o/a]. Si sente un'altra persona. || {A} vede il sangue, sviene, e si risveglia un'ora dopo con la ferita ancora aperta.
1 need:A=ferito trait:A=impulsivo hp:A-10 mo:A+5 | Ferit[A:o/a] e furios[A:o/a], {A} si strappa le bende per ripartire subito. La ferita si riapre, l'orgoglio no.
1 stat:A<hp35 test:A=res13 ok:hp:A+15 ok:en:A+10 ko:hp:A-8 | {A} è ridott[A:o/a] male. Si costringe a mangiare, bere e dormire tre ore di fila: è l'unica medicina che ha. || {A} è ridott[A:o/a] male e non riesce né a mangiare né a dormire. Il corpo comincia a cedere.
1 stat:A<hp35 con:A=med med:A hp:A+10 | Con le mani che tremano, {A} usa {med:A} prima che sia troppo tardi. Il colore torna sulle guance.
1 stat:A<food30 trait:A=cacciatore test:A=sop11 ok:+cibo:A ok:+cibo:A ko:en:A-15 | La fame rende {A} paziente: segue le tracce per ore e alla fine torna con abbastanza da mangiare per due giorni. || La fame rende {A} impaziente: insegue ogni rumore e non prende niente, a parte la stanchezza.
1 stat:A<food30 trait:A=goloso mo:A-15 en:A-10 | {A} non mangia da troppo tempo e lo prende come un lutto. Parla solo di cibo, ad alta voce, a nessuno in particolare.
1 stat:A<food30 trait:A=generoso test:A=emp11 ok:mo:A+15 ko:food:A-10 | Ha fame anche {A}, ma quando vede un'altra persona più affamata [A:gli/le] lascia mezza razione. Lo stomaco protesta, il morale no. || {A} prova a ignorare la fame per lasciare il cibo agli altri, ma finisce per stare peggio di tutti.
1 stat:A<food30 test:A=sop12 ok:food:A+30 ko:s:A=avvelenato | {A} ha così fame che assaggia una cosa che non aveva mai mangiato. Era commestibile, e anche buona. || {A} ha così fame che assaggia una cosa che non aveva mai mangiato. Non andava mangiata.
1 stat:A<food30 con:A=valore test:A=car12 ok:-valore:A ok:+cibo:A ko:mo:A-10 | Affamat[A:o/a], {A} offre {valore:A} al primo che incontra in cambio di qualcosa da mangiare. Affare fatto. || Affamat[A:o/a], {A} offre {valore:A} in cambio di cibo. Nessuno accetta: con la pancia vuota, il valore di tutto cambia.
1 stat:A<en20 test:A=res12 ok:en:A+25 ko:hp:A-10 | Sfinit[A:o/a], {A} si impone di fermarsi in un punto riparato e dorme come un sasso fino a sera. || Sfinit[A:o/a], {A} decide di continuare a camminare. Al secondo inciampo cade e si fa male.
1 stat:A<en20 trait:A=paranoico en:A-10 mo:A-10 | {A} è distrutt[A:o/a], ma non riesce a dormire: ogni rumore potrebbe essere qualcuno. Passa la giornata a occhi spalancati.
1 stat:A<en20 trait:A=solitario en:A+20 | Sfinit[A:o/a], {A} trova un angolo dove nessuno passa e dorme sei ore senza sognare niente. È felice.
1 stat:A<mo25 trait:A=romantico mo:A+20 | Nel momento peggiore {A} si inventa una vita intera dopo l'arena, con una casa, un cane e una persona che l[A:o/a] aspetta. Ci crede abbastanza da rialzarsi.
1 stat:A<mo25 trait:A=superstizioso test:A=fort12 ok:mo:A+20 ko:mo:A-10 | {A} cerca un segno, qualunque segno. Trova una pietra a forma di cuore: è il segno. || {A} cerca un segno, qualunque segno. Un uccello nero si posa accanto a l[A:ui/ei] e l[A:o/a] fissa. È un segno, ma non quello sperato.
1 stat:A<mo25 trait:A=folle mo:A+15 en:A-5 | Nel momento più nero {A} inizia a ridere senza motivo, poi a ballare. Non si sa se sia disperazione o genio. Di sicuro funziona.
1 stat:A<mo25 test:A=cor13 ok:mo:A+20 ko:s:A=sconvolto | {A} si siede, chiude gli occhi e si ripete perché è arrivat[A:o/a] fin qui. Quando li riapre, ha ancora paura, ma ha anche un motivo. || {A} si siede e prova a ricordare perché è arrivat[A:o/a] fin qui. Non ci riesce. Resta sedut[A:o/a] per ore, a fissare il vuoto.
1 stat:A<mo25 con:A=ricordo mo:A+20 | Quando tutto sembra perduto, {A} tira fuori {ricordo:A} e lo tiene in mano finché il respiro non torna normale.
1 stat:A>pr55 test:A=sop13 ok:pr:A-30 ko:pr:A+10 | Il pericolo dell'arena è entrato nelle ossa di {A}. Cambia zona, cambia ritmo, cambia tutto quello che può: funziona. || Il pericolo dell'arena è entrato nelle ossa di {A}, che prova a ignorarlo. Peggiora.
1 stat:A>pr55 con:A=attrezzo test:A=int11 ok:pr:A-35 ko:pr:A+5 | {A} usa {attrezzo:A} per costruirsi una protezione contro il pericolo che sale. Ci mette ore. Ne vale la pena. || {A} prova a usare {attrezzo:A} per proteggersi, ma lo monta al contrario.
1 stat:A>pr55 trait:A=stratega pr:A-20 en:A-5 | {A} annota quando e dove il pericolo dell'arena cresce e si muove di conseguenza. Il metodo batte la paura.
1 stat:A>pr55 trait:A=sopravvissuto pr:A-25 | {A} riconosce i sintomi prima degli altri e sa cosa fare. Non è la prima volta che l'arena cerca di ucciderl[A:o/a] lentamente.
1 wx:buio trait:A=furtivo test:A=furt11 ok:+arma:A ok:+cibo:A ko:s:A=ferito | Con il buio, {A} è nel suo elemento: esplora i ripari abbandonati che di giorno nessuno osa avvicinare e ne esce con le mani piene. || Con il buio, {A} si sente invincibile ed esplora un riparo abbandonato. Il pavimento è marcio, e {A} lo scopre nel modo peggiore.
1 wx:buio trait:A=codardo en:A-10 mo:A-10 | Il buio di oggi è fitto come la paura di {A}, che resta immobile dove si trova per tutto il giorno.
1 wx:pericolo trait:A=impulsivo test:A=agi12 ok:mo:A+10 ko:s:A=ferito | Il tempo è infame, ma {A} decide che è il momento perfetto per muoversi. Ha ragione: nessuno l[A:o/a] segue. || Il tempo è infame, ma {A} decide di muoversi lo stesso. Il tempo vince.
1 wx:pericolo trait:A=stratega en:A+15 mo:A+5 | {A} aveva previsto il cambio del tempo e si era già mess[A:o/a] al riparo con le scorte giuste. Guarda gli altri correre.
1 wx:abbondanza trait:A=avido +cibo:A +cibo:A +valore:A | Giornata di abbondanza: {A} raccoglie tutto quello che trova, anche quello che non [A:gli/le] serve. Lo zaino scoppia.
1 wx:abbondanza trait:A=generoso +cibo:A mo:A+10 | Giornata di abbondanza: {A} raccoglie da mangiare e lascia una parte bene in vista, per chi passerà dopo.
1 wx:calma trait:A=leader mo:A+10 | Approfittando della calma, {A} riunisce i suoi e organizza i turni, le scorte e un piano. Il gruppo respira.
1 goal:A=caccia w:A test:A=sop12 ok:mo:A+10 ok:en:A+5 ko:en:A-15 | {A} segue le tracce della sua preda per mezza giornata, arma in pugno. Le tracce sono fresche: domani la raggiunge. || {A} segue le tracce della sua preda per mezza giornata e si accorge solo alla fine di aver seguito un animale.
1 goal:A=nascondersi test:A=furt12 ok:en:A+15 ok:pr:A-10 ko:mo:A-10 | {A} cerca un nascondiglio perfetto e lo trova: nessuno l[A:o/a] troverebbe nemmeno con una mappa. || {A} cerca un nascondiglio perfetto, ma ogni posto sembra più esposto del precedente.
1 goal:A=cibo test:A=sop11 ok:+cibo:A ko:en:A-10 | {A} passa la giornata a cercare da mangiare, metodicamente, zona per zona. Torna con {cibo}. || {A} passa la giornata a cercare da mangiare. Trova solo tracce di chi è arrivato prima.
1 goal:A=curarsi test:A=int12 ok:hp:A+20 ko:hp:A-5 | {A} dedica la giornata a curarsi: impacchi, riposo, niente rischi. Funziona. || {A} prova a curarsi da sol[A:o/a], ma sbaglia l'impacco. Domani si ricomincia.
1 goal:A=spettacolo star:A test:A=car12 ok:mo:A+15 ko:mo:A-10 | {A} prepara un numero per le telecamere: discorso, pausa drammatica, sguardo all'orizzonte. Il pubblico impazzisce. || {A} prepara un numero per le telecamere e lo recita con troppa enfasi. In capitale ridono, ma non nel modo sperato.
1 trait:A=stratega test:A=int12 ok:+trap:A ok:mo:A+5 ko:en:A-10 | {A} studia per ore i movimenti degli altri e prepara una trappola esattamente dove passeranno. || {A} studia per ore i movimenti degli altri, ma oggi nessuno fa quello che {A} aveva previsto.
1 trait:A=ingegnoso con:A=attrezzo +trap:A +attrezzo:A | {A} smonta {attrezzo:A} e lo rimonta in due pezzi utili: una trappola e un attrezzo migliore di prima.
1 trait:A=fortunato test:A=fort10 ok:+med:A ok:+amuleto:A ko:mo:A-5 | {A} inciampa in una radice e cade proprio sopra un fagotto abbandonato: dentro c'è {med} e {amuleto}. || {A} inciampa in una radice e cade. Questa volta, sotto, c'è solo terra.
1 trait:A=sfortunato test:A=fort12 ok:mo:A+15 ko:hp:A-10 | {A} passa sotto un ramo, un masso e un nido di vespe senza che succeda niente. È così stupit[A:o/a] che ride per mezz'ora. || {A} passa sotto un ramo, che cade. Ovviamente.
1 trait:A=bruto test:A=for12 ok:+cibo:A ok:+valore:A ko:hp:A-10 | {A} sfonda a spallate un deposito chiuso e lo svuota. || {A} prende a spallate un deposito chiuso. Il deposito resiste. La spalla no.
1 trait:A=esibizionista stat:A<hp45 star:A mo:A+15 | Ferit[A:o/a] e sanguinante, {A} saluta le telecamere con un inchino. Gli sponsor apprezzano il coraggio, o la follia.
1 trait:A=vendicativo lost:A test:A=cor12 ok:mo:A+15 ok:en:A+10 ko:mo:A-10 | {A} non riesce a smettere di pensare a chi ha perso. Trasforma il dolore in un piano, e il piano in energia. || {A} non riesce a smettere di pensare a chi ha perso. Il dolore pesa più di qualunque zaino.
1 trait:A=pacifista feared:A mo:A-10 | {A} non sopporta di essere guardat[A:o/a] con paura. Passa la giornata a spiegare a chiunque incontri che non vuole fare del male a nessuno. Pochi ci credono.
2 grudge:A>B trait:A=clemente test:A=emp12 ok:forgive:A>B ok:mo:A+10 ko:mo:A-10 | {A} affronta {B} faccia a faccia, poi abbassa le mani: «Basta. Non voglio diventare come te». Il rancore si scioglie. || {A} prova a perdonare {B}, ma quando l[B:o/a] vede sorridere il rancore torna, più forte di prima.
2 grudge:A>B trait:A=vendicativo test:A=furt13 ok:hit:A>B ok:mo:A+10 ko:hit:B>A | {A} segue {B} per tutta la mattina, aspettando l'occasione giusta. L'occasione arriva. || {A} segue {B} per tutta la mattina, ma {B} se ne accorge e l[A:o/a] aspetta dietro una curva.
2 grudge:A>B trait:A=codardo fear:A>B pau:A>B+10 en:A-10 | {A} odia {B} con tutte le sue forze, ma ne ha anche una paura terribile. Passa la giornata a evitarl[B:o/a], e a odiarsi per questo.
2 owe:A>B trait:A=leale give:A>B=cibo repay:A>B rel:AB+10 | {A} non dimentica i debiti: trova {B} e [B:gli/le] consegna la sua razione migliore. «Adesso siamo pari», dice, e lo pensa davvero.
2 owe:A>B trait:A=avido rel:AB-10 mo:A+5 | {A} dovrebbe un favore a {B}, ma decide che quel favore se lo era già guadagnato. {B} non la pensa allo stesso modo.
2 couple:AB need:B=ferito test:A=emp11 ok:hp:B+25 ok:rel:AB+10 ko:hp:B-5 | {A} non si allontana da {B}, ferit[B:o/a], nemmeno un minuto: pulisce, fascia, distrae con storie stupide. Funziona. || {A} cura {B} con troppa ansia e troppo poca esperienza: la ferita non migliora.
2 couple:AB stat:A<mo30 mo:A+20 rel:AB+5 | {A} è a pezzi, e {B} se ne accorge senza bisogno di parole. Resta in silenzio accanto a l[A:ui/ei] finché il peggio non passa.
2 crush:A>B trait:A=romantico test:A=car12 ok:love:AB ko:mo:A-15 | {A} trova il coraggio che non ha mai avuto e dice a {B} quello che prova. {B} sorride. È un sì. || {A} trova il coraggio che non ha mai avuto e dice a {B} quello che prova. {B} ringrazia, molto gentilmente.
2 crush:A>B trait:A=codardo mo:A-10 | {A} prepara per tutta la mattina il discorso perfetto per {B}. Quando l[B:o/a] vede, dice «ciao» e scappa.
2 ally:AB trait:A=traditore test:A=furt12 ok:steal:A<B=cibo ko:rel:AB-15 | {A} sorride a {B} tutta la mattina. Nel frattempo, le sue provviste cambiano proprietario. || {A} prova a sfilare le provviste di {B}, ma {B} se ne accorge e da quel momento dorme con un occhio aperto.
2 ally:AB trait:A=leale need:B=ferito hp:B+20 rel:AB+10 | {A} porta {B} ferit[B:o/a] sulle spalle fino al riparo, senza lamentarsi una volta. {B} non lo dimenticherà.
2 ally:AB trait:A=leader test:A=car12 ok:mo:B+15 ok:mo:A+10 ko:mo:B-5 | {A} vede {B} crollare e tiene il discorso giusto al momento giusto. {B} si rialza. || {A} prova a motivare {B} con un discorso da film, ma il discorso è troppo lungo e {B} si addormenta.
2 ally:AB trait:A=paranoico fid:A>B-10 | {A} sorprende {B} a parlare da sol[B:o/a] e passa la giornata a chiedersi con chi stesse parlando davvero.
2 trust:A>B trait:A=generoso give:A>B=med rel:AB+10 | {A} si fida di {B} e [B:gli/le] regala {med}, anche se potrebbe servir[A:gli/le]. «Tu ne hai più bisogno».
2 fear:A>B trait:A=sopravvissuto test:A=cor12 ok:pau:A>B-20 ok:mo:A+10 ko:en:A-10 | {A} ha paura di {B}, ma ha imparato che la paura si guarda in faccia. Va da {B} e [B:gli/le] parla. La paura si sgonfia. || {A} prova ad affrontare la paura che ha di {B}, ma all'ultimo cambia strada.
2 rival:AB test:A=agi12 ok:ris:B>A+15 ok:mo:A+10 ko:ris:A>B+10 ko:mo:A-5 | {A} sfida {B} in una corsa fino al prossimo riparo. Vince {A}, e {B} l[A:o/a] guarda con un rispetto nuovo. || {A} sfida {B} in una corsa. Vince {B}, senza nemmeno sudare.
2 enemy:AB trait:A=spietato test:A=furt12 ok:steal:A<B=arma ko:hit:B>A | {A} non perde occasione: mentre {B} beve, [B:gli/le] sfila l'arma dal fianco. || {A} prova a sfilare l'arma di {B} mentre beve. {B} non stava bevendo.
2 enemy:AB trait:A=pacifista test:A=car13 ok:rel:AB+20 ok:mo:A+10 ko:hit:B>A | {A} va da {B} a mani alzate e propone una tregua. {B} accetta, sorpres[B:o/a]. || {A} va da {B} a mani alzate e propone una tregua. {B} risponde a modo suo.
2 trait:A=carismatico test:A=car11 ok:al:AB ko:mo:A-5 | {A} attacca bottone con {B} come se si conoscessero da anni. Dopo dieci minuti sono alleati. || {A} attacca bottone con {B}, ma questa volta il fascino non basta.
2 trait:A=guaritore need:B=ferito test:A=int11 ok:hp:B+25 ok:debt:B>A ko:hp:B-5 | {A} vede {B} ferit[B:o/a] e non riesce a passare oltre: [B:gli/le] pulisce e chiude la ferita con mani esperte. || {A} prova a curare {B}, ma senza strumenti adatti riesce solo a fermare il sangue per un po'.
2 trait:A=avido con:B=valore test:A=car12 ok:steal:A<B=valore ko:rel:AB-10 | {A} convince {B} che {valore:B} è maledetto e che lo terrà «al sicuro». {B} ci casca. || {A} prova a convincere {B} a consegnare {valore:B}. {B} ride e se lo mette in tasca.
2 trait:A=impulsivo enemy:AB hit:A>B hit:B>A | {A} vede {B} e non ci pensa nemmeno: carica. Finisce con due persone a terra e nessun vincitore.
2 trait:A=bruto stat:B<hp50 hit:A>B @agg | {A} vede {B} zoppicare e decide che è il momento giusto per farsi rispettare.
2 trait:A=furtivo test:A=furt12 ok:steal:A<B=cibo ko:rel:AB-10 | {A} cammina accanto a {B} per un'ora chiacchierando del più e del meno. Quando si salutano, metà delle provviste di {B} è nello zaino di {A}. || {A} prova a svuotare lo zaino di {B} mentre chiacchierano, ma una cerniera fa troppo rumore.
3 trait:A=leader ally:AB ally:AC test:A=car12 ok:mo:B+10 ok:mo:C+10 ok:rel:BC+10 ko:rel:BC-10 | {A} mette d'accordo {B} e {C} che litigavano da giorni, con un compito a testa e una regola chiara. Il gruppo funziona. || {A} prova a mettere d'accordo {B} e {C}, ma finisce per scontentare entrambi.
3 trait:A=stratega ally:AB test:A=int13 ok:hit:B>C ok:hit:A>C ko:hit:C>A | {A} e {B} attirano {C} in una trappola studiata da {A} nei minimi dettagli. || {A} e {B} attirano {C} in una trappola. {C} aveva studiato meglio.
`,
      n: `
1 need:A=ferito trait:A=guaritore hp:A+20 en:A+5 | Di notte {A} si cambia le bende con la luce della luna e prepara un impacco per domani. Dorme meglio di quanto sperasse.
1 stat:A<hp35 test:A=res13 ok:hp:A+10 ok:en:A+10 ko:hp:A-10 | La notte è lunga per {A}, ferit[A:o/a] gravemente. Ma all'alba respira ancora, e meglio di ieri. || La notte è lunga per {A}, ferit[A:o/a] gravemente. All'alba la febbre è salita.
1 stat:A<food30 trait:A=cacciatore +cibo:A | Affamat[A:o/a], {A} piazza un laccio prima di dormire. All'alba ha la colazione.
1 stat:A<food30 trait:A=goloso mo:A-15 | {A} sogna tutta la notte un banchetto, e si sveglia ancora più affamat[A:o/a].
1 stat:A<en20 test:A=res11 ok:en:A+30 ko:en:A+5 | Sfinit[A:o/a], {A} crolla appena trova un riparo e dorme dieci ore. Si sveglia come nuov[A:o/a]. || Sfinit[A:o/a], {A} dorme di sasso ma si sveglia di soprassalto ogni ora.
1 stat:A<mo25 trait:A=romantico mo:A+15 | {A} passa la notte a scrivere lettere che non spedirà mai a chi ama. Al mattino è più legger[A:o/a].
1 stat:A<mo25 test:A=cor12 ok:mo:A+15 ko:mo:A-10 | Nel buio, {A} ripete a voce bassa i nomi di casa, uno per uno. Arriva in fondo all'elenco con il cuore più fermo. || Nel buio, {A} prova a ripetere i nomi di casa, ma si blocca a metà e passa la notte a piangere in silenzio.
1 stat:A>pr55 test:A=sop12 ok:pr:A-25 ko:pr:A+10 | Il pericolo dell'arena morde forte di notte: {A} si costruisce un riparo migliore con quello che trova. Funziona. || Il pericolo dell'arena morde forte di notte e il riparo di {A} non basta.
1 stat:A>pr55 trait:A=superstizioso pr:A-15 mo:A+5 | {A} recita a bassa voce tutte le filastrocche di protezione che conosce. Il pericolo sembra ascoltare, e si placa un po'.
1 trait:A=paranoico test:A=int12 ok:+trap:A ko:en:A-10 | {A} non dorme finché il riparo non è circondato di trappole improvvisate. Le costruisce con cura. || {A} prova a circondare il riparo di trappole, ma ci inciampa {A} stess[A:o/a] tre volte. Dorme poco e male.
1 trait:A=sonnambulo test:A=fort12 ok:+cibo:A ko:hp:A-10 | {A} cammina nel sonno e si sveglia in un posto mai visto, con le mani piene di bacche. || {A} cammina nel sonno e si sveglia in fondo a un fosso.
1 trait:A=solitario en:A+15 mo:A+5 | {A} passa la notte da sol[A:o/a] lontano da tutti. Niente guardie, niente chiacchiere: solo silenzio. Si sveglia riposat[A:o/a].
1 goal:A=nascondersi @stl en:A+15 pr:A-5 | {A} sceglie il nascondiglio con cura maniacale e dorme senza sentire nessuno. Nessuno sente {A}.
1 goal:A=caccia test:A=furt12 ok:mo:A+10 ko:en:A-15 | {A} si apposta tutta la notte dove passerà la sua preda. All'alba ha capito le sue abitudini. || {A} si apposta tutta la notte dove crede passerà la sua preda. Non passa nessuno, tranne il freddo.
2 couple:AB stat:A<mo30 mo:A+20 | {A} si sveglia di notte con il cuore che batte forte. {B} [A:gli/le] stringe la mano senza svegliarsi del tutto. Basta quello.
2 couple:AB need:B=ferito hp:B+15 | {A} veglia {B} tutta la notte, controllando che la febbre non salga. All'alba {B} sta meglio.
2 crush:A>B trait:A=romantico rel:AB+15 | {A} non dorme per guardare {B} che dorme. La luna fa il resto.
2 grudge:A>B trait:A=vendicativo en:A-10 mo:A+5 | {A} passa la notte svegli[A:o/a] a immaginare cento modi diversi per regolare il conto con {B}. Al mattino ne sceglie uno.
2 grudge:A>B trait:A=clemente test:A=emp12 ok:forgive:A>B ko:mo:A-10 | Nel silenzio della notte, {A} si accorge di non avere più voglia di odiare {B}. Il rancore si scioglie come neve. || Nel silenzio della notte, {A} prova a perdonare {B}. Non ci riesce ancora.
2 ally:AB trait:A=leale en:A-10 en:B+15 | {A} fa anche il turno di guardia di {B}, che è troppo stanc[B:o/a]. Non [B:gli/le] dice niente: al mattino {B} lo capisce da sol[B:o/a].
2 ally:AB trait:A=traditore test:A=furt13 ok:steal:A<B=arma ko:rel:AB-20 | Di notte {A} sfila l'arma a {B} che dorme. Domani dirà di averla persa. || Di notte {A} prova a sfilare l'arma a {B}, ma {B} apre gli occhi. Non dice niente. Non serve.
2 owe:A>B trait:A=leale give:A>B=cibo repay:A>B | {A} lascia la propria razione accanto a {B} che dorme. Il debito è saldato, e nessuno deve saperlo.
2 fear:A>B trait:A=codardo en:A-15 pau:A>B+5 | {A} sa che {B} è nella stessa zona e passa la notte a occhi aperti, contando i rumori.
2 trait:A=guaritore need:B=ferito hp:B+20 debt:B>A | {A} sente {B} gemere nel buio e va a medicarl[B:o/a] senza pensarci due volte, anche se non si conoscono.
2 trait:A=furtivo test:A=furt12 ok:steal:A<B=cibo ko:hit:B>A | Di notte {A} si avvicina al riparo di {B} senza fare rumore e prende quello che serve. || Di notte {A} si avvicina al riparo di {B}, ma pesta un rametto proprio sotto il naso di {B}.
3 trait:A=carismatico ally:AB al:AC test:A=car11 ok:rel:BC+10 ko:rel:BC-10 | Attorno al fuoco, {A} presenta {C} a {B} come se fossero vecchi amici. Nasce un gruppo a tre. || Attorno al fuoco, {A} prova a convincere {B} ad accettare {C}. {B} accetta, ma con una faccia che dice tutto.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
