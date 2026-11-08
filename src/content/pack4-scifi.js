/* Stazione Orbitale — quarto pacchetto: ossigeno contato, intelligenze di bordo con troppa personalità,
 * gravità che va e viene, la Terra dal finestrino e tributi che imparano a vivere nello spazio. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'scifi',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+armatura:A ko:pr:A+15 | {A} si lancia nell'Hangar a gravità zero e afferra al volo {arma} e {armatura}. || {A} si lancia nell'Hangar a gravità zero, sbaglia la spinta e resta a girare su se stess[A:o/a] mentre l'aria del casco si consuma.
1 +attrezzo:A @int | Mentre tutti corrono verso le armi, {A} prende {attrezzo} dal pannello di servizio. Su una stazione, chi ripara comanda.
1 @cow +cibo:A | {A} si infila nel primo condotto di servizio con una scatola di {cibo} tra i denti. Nessuno l[A:o/a] vedrà per ore.
2 al:AB @soc | {A} e {B} si ritrovano chiusi nella stessa camera stagna. Per uscire devono premere due pulsanti insieme. Escono alleati.
2 hit:A>B steal:A<B=armatura @agg | {A} strappa {armatura} dalle mani di {B} con una spinta che manda {B} a rimbalzare contro il soffitto.
1 test:A=int12 ok:+mappa:A ko:mo:A-10 | {A} scarica la planimetria dal terminale dell'Hangar prima che venga cancellata: {mappa}. || {A} prova a scaricare la planimetria dal terminale, ma il sistema chiede una password. La password era «password». {A} non ci arriva in tempo.
`,
      d: `
1 stat:A>pr45 test:A=int13 ok:pr:A-30 ko:pr:A+10 | {A} trova una perdita nel proprio respiratore e la sigilla con il nastro isolante. L'aria torna a sapere di aria. || {A} cerca la perdita nel respiratore e la trova. Peccato che, nel frattempo, ne abbia aperta un'altra.
1 con:A=attrezzo pr:A-20 | {A} usa {attrezzo:A} per ricalibrare il filtro dell'aria dei Moduli abitativi. Respirare torna a essere un'abitudine, non un'impresa.
1 wx:pericolo pr:A+20 | Una tempesta solare colpisce la stazione: i sistemi di riciclo dell'aria si spengono per un'ora e {A} conta i respiri.
1 test:A=int13 ok:+med:A ko:s:A=avvelenato | {A} forza l'armadietto dell'infermeria con un codice indovinato al terzo tentativo: dentro c'è {med}. || {A} forza l'armadietto dell'infermeria. L'armadietto spruzza un gas antifurto, molto efficace.
1 test:A=agi12 ok:+cibo:A ko:hp:A-10 | {A} insegue a gravità zero una confezione di {cibo} sfuggita a un carrello. La prende. || {A} insegue a gravità zero una confezione di razioni e sbatte la testa contro una paratia. Le razioni ringraziano.
1 @luck +cibo:A mo:A+5 | Un drone di rifornimento attracca accanto a {A} e [A:gli/le] consegna {cibo} con un «Buon appetito» registrato.
1 test:A=sop12 ok:+cibo:A ok:+cibo:A ko:food:A-10 | {A} raccoglie pomodori nani nella Serra idroponica prima che i sensori se ne accorgano. || {A} prova a raccogliere ortaggi nella Serra idroponica. Gli irrigatori automatici partono all'improvviso e l[A:o/a] lavano dalla testa ai piedi.
1 @mad mo:A+5 en:A-5 | {A} prova a insegnare all'intelligenza di bordo a raccontare barzellette. Dopo un'ora l'intelligenza di bordo ne racconta una. Nessuno ride.
1 star:A @show | {A} fa una capriola a gravità zero davanti all'oblò, con la Terra sullo sfondo. In capitale si vende come poster.
1 mo:A+15 | {A} si ferma davanti al grande oblò e guarda la Terra girare. Da quassù non si vedono confini, né arene.
1 stat:A<mo30 mo:A+15 pr:A-10 | {A} si rannicchia in una capsula di salvataggio spenta e respira piano, contando le luci del pannello finché non passa.
1 need:A=ferito test:A=int12 ok:hp:A+20 ko:hp:A-5 | {A} usa lo scanner medico di un modulo dismesso per ricucirsi la ferita. Il robot chirurgo è lento, ma preciso. || {A} usa lo scanner medico di un modulo dismesso. Il robot chirurgo si blocca a metà e chiede un aggiornamento.
1 test:A=furt13 ok:+valore:A ko:s:A=ferito | {A} si infila nei Condotti di servizio e smonta un modulo di memoria ancora funzionante: {valore}. || {A} si infila nei Condotti di servizio. Un drone di sicurezza impazzito trova {A} prima che {A} trovi l'uscita.
1 test:A=cor13 ok:+arma:A ko:hp:A-20 | {A} attraversa il corridoio del Reattore, dove le radiazioni fanno impazzire gli strumenti, per recuperare {arma} da una rastrelliera. || {A} attraversa il corridoio del Reattore, ma a metà strada un'esplosione di vapore l[A:o/a] scaraventa indietro.
1 en:A+20 | {A} dorme sei ore di fila nella capsula del medico di bordo. Il materasso ad aria è la cosa più morbida dell'universo.
1 trait:A=ingegnoso +trap:A | {A} collega un pannello del pavimento alla batteria di un drone rotto. Chi ci passa sopra farà un salto. Letteralmente.
1 trait:A=paranoico en:A-10 pr:A-10 | {A} non si fida dei sensori della stazione e controlla a mano ogni valvola del proprio modulo. Due volte.
1 trait:A=esibizionista star:A mo:A+10 | {A} pirata il sistema degli annunci di bordo e manda in onda un messaggio per i fan. In capitale lo trasmettono in loop.
1 trait:A=goloso food:A+20 en:A-5 | {A} trova la dispensa del capitano: cioccolato vero, non liofilizzato. Se lo mangia tutto, lentamente, ad occhi chiusi.
1 trait:A=solitario mo:A+10 | {A} passa una giornata intera nel modulo di osservazione, da sol[A:o/a] con le stelle. È il giorno migliore dell'arena.
1 trait:A=cacciatore +cibo:A | {A} cattura un topo della stiva grande come un gatto. Arrostito sul condotto di scarico, sa di pollo. Quasi.
2 ally:AB test:A=int12 ok:pr:A-20 ok:pr:B-20 ko:pr:A+10 ko:pr:B+10 | {A} e {B} riparano insieme il depuratore d'aria del loro modulo. || {A} e {B} provano a riparare il depuratore d'aria. Il depuratore fa un rumore preoccupante e si spegne del tutto.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} divide con {B} l'ultima barretta di alghe e la spezza con un righello, per essere giust[A:o/a].
2 save:A>B @heal | Una paratia si chiude di scatto su {B}. {A} la blocca con una sbarra all'ultimo secondo e tira {B} fuori dal varco.
2 debt:B>A give:A>B=med @heal | {A} trova {B} in ipossia in un corridoio e [B:gli/le] mette in mano {med} prima di sparire.
2 crush:A>B rel:AB+15 | {A} programma il pannello luminoso del modulo di {B} perché formi un cuore stilizzato. {B} pensa a un guasto.
2 couple:AB pr:A-10 pr:B-10 mo:A+10 mo:B+10 | {A} e {B} condividono la stessa bombola d'aria per tutto il pomeriggio. È la cosa più romantica che possa succedere nello spazio.
2 hit:A>B @agg | {A} sorprende {B} a usare il suo depuratore e l[B:o/a] spinge fuori dal modulo con un calcio a gravità zero.
2 enemy:AB test:A=int13 ok:pr:B+20 ko:pr:A+15 | {A} manomette la valvola dell'aria del modulo di {B}. || {A} prova a manomettere la valvola dell'aria di {B}, ma scambia i tubi e si chiude l'aria da sol[A:o/a].
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} di formare un equipaggio. || {A} propone a {B} di formare un equipaggio. {B} risponde che preferisce morire da capitano solitario.
2 rival:AB @show rel:AB+5 | {A} e {B} fanno a gara a chi attraversa l'Hangar a gravità zero più in fretta. Si scontrano a metà e restano a girare insieme.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} dà a {B} il codice di accesso del proprio modulo. Sulla stazione, è come consegnare la chiave di casa.
2 fear:A>B en:A-15 | {A} vede {B} parlare con un androide da combattimento come se fossero amici. Non dorme più tranquill[A:o/a].
2 ally:AB test:A=cor13 ok:+arma:A ok:rel:AB+10 ko:hp:A-15 ko:hp:B-10 | {A} e {B} disattivano insieme un androide da combattimento e ne recuperano il braccio armato. || {A} e {B} provano a disattivare un androide da combattimento. L'androide ha altri programmi.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano davanti all'unico distributore funzionante e decidono di difenderlo insieme. È nata un'alleanza, e una fila ordinata.
3 hit:A>B hit:A>C @agg | {A} scopre {B} e {C} che si dividono le razioni del Ponte di comando e rivendica la sua parte con un estintore.
3 ally:AB rel:AB+10 | {A} e {B} si scambiano uno sguardo mentre {C} prova per la decima volta a parlare con l'intelligenza di bordo.
2 k:A>B w:A @agg | {A} aspetta {B} all'uscita dei Condotti di servizio. {B} non arriverà mai ai Moduli abitativi.
2 k:A>B grudge:A>B | {A} apre il portellone esterno mentre {B} è nella camera di decompressione. Per {caro:A}.
1 d:A @mad | {A} esce in passeggiata spaziale senza agganciare il cavo di sicurezza, per «vedere meglio le stelle». Le vede benissimo, sempre più lontane.
1 d:A wx:pericolo | Una pioggia di micrometeoriti buca il modulo in cui si trova {A}. La paratia di emergenza si chiude un secondo troppo tardi.
`,
      n: `
1 pr:A+15 | Durante il ciclo notturno i ricircolatori vanno al minimo. {A} si sveglia con la testa che gira e le labbra blu.
1 test:A=res12 ok:en:A+10 ko:pr:A+20 | {A} si rannicchia in un sacco a pelo termico e respira piano, per consumare meno. || {A} prova a dormire con la testa vicino al bocchettone dell'aria, ma il bocchettone si spegne a mezzanotte.
1 test:A=sop12 ok:en:A+15 ko:hp:A-15 | Uno sciame di nanobot entra nel modulo di {A}. {A} spegne la corrente e li aspetta al buio: senza energia, cadono come polvere. || Uno sciame di nanobot entra nel modulo di {A} e comincia a smontare tutto, compres[A:o/a] {A}.
1 @stl en:A+15 | {A} si chiude in una capsula di salvataggio e imposta la sveglia. Dentro c'è silenzio, ossigeno e nessuno.
1 con:A=amuleto mo:A+10 pr:A-10 | {A} stringe {amuleto:A} e ascolta il ronzio della stazione finché non [A:gli/le] sembra una ninnananna.
1 @luck +med:A | Durante la notte, un drone degli sponsor lascia {med} sul cuscino di {A}. Con un fiocco.
1 trait:A=sonnambulo en:A-10 pr:A+10 | {A} si sveglia nella camera di decompressione con la mano sul pulsante rosso. Non lo preme. Per questa volta.
1 trait:A=folle mo:A+10 | {A} passa la notte a scrivere poesie per l'intelligenza di bordo. L'intelligenza di bordo le salva in una cartella chiamata «Importante».
1 trait:A=codardo en:A-15 | {A} sente un rumore metallico e passa la notte chius[A:o/a] in un armadietto. Era il frigorifero.
1 mo:A-10 | Sul grande schermo del Ponte di comando scorrono i volti dei caduti. {A} si gira dall'altra parte, ma i riflessi sui vetri sono ovunque.
2 ally:AB pr:A-10 pr:B-10 en:A+10 en:B+10 | {A} e {B} fanno turni di guardia di due ore davanti al depuratore. Al mattino l'aria è buona e loro sono vivi.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} guardano l'alba sulla Terra dall'oblò del modulo. Succede ogni novanta minuti. La guardano tutte le volte.
2 crush:A>B rel:AB+10 | {A} lascia a {B} un messaggio sul terminale del modulo: «Il tuo respiro si sente da qui». Poi si pente della frase.
2 friend:AB give:A>B=armatura @heal | {B} trema per il freddo del modulo spento. {A} [B:gli/le] passa {armatura} imbottita senza dire niente.
2 enemy:AB test:A=furt13 ok:steal:A<B=cibo ko:hit:B>A | {A} si infila nel modulo di {B} per prendere le sue razioni. || {A} si infila nel modulo di {B}, ma {B} ha impostato un allarme. Molto rumoroso.
2 save:A>B @heal | Un androide da combattimento entra nel modulo dove dorme {B}. {A} lo spegne staccando il cavo giusto, al primo tentativo.
2 trust:A>B fid:A>B+10 | {A} dorme sapendo che {B} controlla la pressione dell'aria. È una prova di fiducia enorme.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia a {B} due razioni proteiche: il debito è saldato, con gli interessi.
3 al:ABC pr:A-10 pr:B-10 pr:C-10 | {A}, {B} e {C} si chiudono nello stesso modulo per risparmiare aria. Al mattino sono un equipaggio.
2 k:A>B @stl | Durante il ciclo notturno {A} entra nel modulo di {B}. Le luci si spengono. Si riaccendono su una persona sola.
1 d:A pr:A+30 | Il depuratore del modulo di {A} si guasta durante il sonno. Non si sveglia più.
2 k:A>B trap:A | {A} nasconde {trap:A} nel condotto che {B} usa per spostarsi di notte. La stazione registra un picco di energia, poi il silenzio.
`,
      f: `
1 +med:A +cibo:A @luck | Al rifornimento {A} afferra un container e scappa: dentro ci sono {med} e {cibo}.
2 hit:A>B steal:A<B=cibo @agg | Al rifornimento {A} e {B} si contendono lo stesso container a gravità zero. Lo vince {A}, a calci.
2 al:AB @soc | Al rifornimento {A} e {B} si coprono le spalle e tornano insieme con due casse. Da stasera sono un equipaggio.
1 test:A=agi13 ok:+armatura:A ok:+med:A ko:pr:A+15 | {A} vola attraverso l'Hangar del rifornimento e afferra due casse prima di tutti. || {A} vola attraverso l'Hangar del rifornimento, ma una cassa l[A:o/a] colpisce in pieno petto. Resta senza fiato, nel senso peggiore.
2 k:A>B w:A @agg | Al rifornimento {A} non lascia a {B} il tempo di aprire il container.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
