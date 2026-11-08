/* Night City — Zona Rossa, contenuti per adulti (solo con il filtro 18+ attivo).
 * Sesso esplicito e sboccato, sempre tra adulti consenzienti e lucidi: coppie già formate,
 * nuove coppie solo quando il motore lo permette (love:), avventure solo tra amici single.
 * Gore senza freni negli scontri, nelle morti e nei disastri; mai violenza a sfondo sessuale.
 * Stesse regole degli altri pacchetti: ogni fatto raccontato ha il suo effetto,
 * le azioni dei netrunner avvengono sul posto, il Sovraccarico cala solo con cure o diagnosi. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'cyberpunk', adult: true,
    ev: {
      b: `
2 at:6 k:A>B @agg w:A | Nel caos della Piazza, {A} pianta {arma:A} nello stomaco di {B} e la gira finché {B} non smette di urlare. Le budella finiscono sui piedi di un turista.
2 at:6 k:A>B @agg | {A} sbatte la testa di {B} contro la serranda che scende, una volta, due, tre. Alla quarta la serranda scende lo stesso, e la testa di {B} resta dall'altra parte.
1 at:6 d:A | {A} prova a passare sotto una barriera di sicurezza nel momento sbagliato. La barriera sale e lo apre in due dal mento allo sterno.
2 at:6 friend:AB single:A single:B amo:A>B+10 amo:B>A+10 mo:A+10 mo:B+10 | Chiusi nell'ascensore di servizio della torre durante lo sgombero, {A} e {B} decidono che, se devono morire, non moriranno vergini di quell'ascensore. Quando le porte si riaprono, hanno il fiato corto e i vestiti al contrario.
2 at:6 hit:A>B | Nella calca, {A} morde l'orecchio di {B} per farsi largo e se ne tiene un pezzo in bocca per tre isolati.
3 at:6 k:A>BC *0.4 @agg | {A} lancia una granata nel vano scala dove si nascondono {B} e {C}. Per giorni i robot delle pulizie trovano pezzi di entrambi sul corrimano.
`,
      d: `
2 at:0 love:AB | Al Mercato di Kabuki, {A} e {B} si infilano nel retro di un banco di ottiche usate e fanno l'amore tra scatole di occhi di ricambio che li fissano da ogni scaffale. Da quel giorno sono una coppia, e hanno un pubblico.
2 at:0 couple:AB mo:A+12 mo:B+12 en:A-8 en:B-8 | Al Mercato, {A} e {B} affittano per mezz'ora il furgone di un venditore di spiedini. Il furgone dondola così tanto che dal tetto cadono tre insegne e un cuoco.
1 at:0 mo:A+12 star:A | Al Mercato, {A} prova un impianto «per il piacere personale» in offerta al banco di un ripperdoc ambulante. La dimostrazione dal vivo, per fortuna sotto un telo, raduna quaranta curiosi e un'ovazione.
1 at:0 s:A=ubriaco mo:A+10 | Al Mercato, {A} accetta da una vecchietta un liquore fatto con serpenti sintetici e qualcosa che lei chiama «il segreto della virilità». Il segreto è il novanta per cento di alcol.
2 at:0 k:A>B @agg | Al Mercato, {A} infila la testa di {B} nella friggitrice dei noodle e la tiene giù. Il venditore, per non sprecare l'olio, continua a friggere.
2 at:0 k:A>B @agg | Al Mercato, {A} trascina {B} dietro il banco del macellaio di carne coltivata e usa la mannaia del banco. Per qualche ora, il macellaio vende anche «carne non coltivata».
1 at:0 d:A | Al Mercato, {A} mangia gli spiedini del banco più economico. Dopo un'ora, quello che esce da entrambe le estremità ha il colore delle insegne. Muore in un bagno chimico, tra le lacrime di tutti quelli in fila.
1 at:0 s:A=avvelenato | Al Mercato, {A} beve un frullato «afrodisiaco al cento per cento». Effetto garantito: dodici ore di vampate, sudore freddo e vomito a getto. Niente di tutto questo aiuta.
2 at:0 test:A=car12 ok:mo:A+15 ok:mo:B+10 ok:amo:B>A+8 ko:mo:A-10 friend:AB single:A single:B | Al Mercato, {A} vince a {B} una bambola gonfiabile olografica al tiro a segno, poi la butta via e propone di esercitarsi direttamente tra loro. {B} ride, e accetta. || Al Mercato, {A} vince a {B} una bambola gonfiabile olografica al tiro a segno. {B} sceglie la bambola.
1 at:1 en:A+10 mo:A+10 | Al Megablocco, {A} si addormenta ascoltando dal muro sottile della capsula accanto i vicini che fanno sesso con la regolarità di un metronomo. Alla fine è quasi rilassante.
2 at:1 couple:AB mo:A+12 mo:B+12 | Al Megablocco, {A} e {B} fanno l'amore in una capsula-letto progettata per una persona sola. Rompono la ventola e il sensore antincendio, ma ne vale la pena.
2 at:1 love:AB | Al Megablocco, {A} e {B} restano bloccat[AB:i/e] sul ballatoio del quarantesimo piano sotto la pioggia acida. Si scaldano come possono, e possono parecchio. Scendono le scale tenendosi per mano: sono una coppia.
2 at:1 k:A>B @agg | Al Megablocco, {A} spinge {B} nella tromba dell'ascensore. {B} rimbalza su tre cavi prima di arrivare in fondo, ormai in più pezzi che piani.
2 at:1 k:A>B @agg | Al Megablocco, {A} tiene {B} contro il condotto della spazzatura e lo usa come tritacarne. Il condotto si intasa al ventesimo piano.
1 at:1 d:A | Al Megablocco, {A} cade dal ballatoio e si infilza sull'antenna del piano di sotto. Resta lì per due giorni, come un'insegna macabra.
2 at:1 enemy:AB hit:A>B | Al Megablocco, {A} chiude la porta blindata impazzita sulla mano di {B}. Tre dita restano dall'altra parte.
1 at:2 test:A=res13 ok:pr:A-20 ok:mo:A+10 ko:s:A=ferito | Alla Clinica, Doc Ferraglia propone a {A} un impianto «per le prestazioni di coppia» in offerta lancio. Durante l'installazione ricalibra anche tutti gli altri impianti, e il sovraccarico scende. || Alla Clinica, Doc Ferraglia prova a installare a {A} un impianto «per le prestazioni di coppia». Lo installa nel posto sbagliato. Sanguina tutto, ovunque.
2 at:2 couple:AB need:B=ferito cure:B mo:A+10 | Alla Clinica, {A} si offre come «anestetico naturale» mentre Doc Ferraglia ricuce {B}. Funziona così bene che il Doc chiede di brevettarlo. Ferite chiuse e impianti ricalibrati.
2 at:2 k:A>B @agg | Alla Clinica, {A} lega {B} al lettino operatorio e accende il braccio chirurgico automatico. Il braccio esegue un trapianto completo di tutti gli organi, verso il pavimento.
2 at:2 enemy:AB test:A=furt12 ok:k:A>B ko:hit:B>A | Alla Clinica, {A} scambia la sacca di sangue di {B} con una di liquido di raffreddamento. {B} diventa blu, poi grigio, poi niente. || Alla Clinica, {A} prova a scambiare la sacca di sangue di {B}, ma {B} si sveglia e [A:gli/le] pianta un bisturi nella coscia.
1 at:2 d:A | Alla Clinica, {A} si sottopone a una liposuzione rapida da Doc Ferraglia. La macchina aspira troppo, e troppo a lungo. Il Doc canta il requiem.
1 at:2 s:A=sconvolto | Alla Clinica, {A} apre il frigorifero sbagliato: dentro ci sono trenta peni cibernetici in vari colori, con il prezzo. Uno lampeggia.
1 at:3 con:A=valore -valore:A mo:A+15 en:A+10 | Al Club, {A} paga con {valore:A} un'ora con una professionista della casa delle bambole, l'ala riservata del Club. Escono entrambi soddisfatti, e lei [A:gli/le] lascia anche il biglietto da visita.
1 at:3 pr:A+12 mo:A+15 | Al Club, {A} prova una braindance per adulti registrata da una star del porno di quarant'anni fa. Esce barcollando, con gli impianti in fiamme e un sorriso ebete.
2 at:3 couple:AB mo:A+12 mo:B+12 | Al Club, {A} e {B} fanno sesso in una cabina per la braindance, con il visore acceso su un documentario sulle balene. Nessuno dei due se ne accorge fino alla fine.
2 at:3 love:AB | Al Club, {A} e {B} ballano così vicini che il buttafuori chiede loro di prendere una stanza. La prendono, e ne escono coppia.
2 at:3 friend:AB single:A single:B amo:A>B+10 amo:B>A+10 mo:A+12 mo:B+12 | Al Club, {A} e {B} si chiudono nel bagno per «parlare in privato». La fila fuori dal bagno, dopo venti minuti, applaude.
3 at:3 friend:AB friend:AC friend:BC single:A single:B single:C mo:A+12 mo:B+12 mo:C+12 en:A-10 en:B-10 en:C-10 | Al Club, {A}, {B} e {C} finiscono nella stessa cabina privata con tre cocktail e nessuna intenzione di guardare la braindance. Escono all'alba, sfinit[ABC:i/e] e senza un calzino.
1 at:3 s:A=ubriaco mo:A+10 | Al Club, {A} fa uno spogliarello sul bancone per una scommessa. Vince la scommessa, perde i pantaloni e diventa una leggenda del locale.
2 at:3 k:A>B @agg | Al Club, {A} spacca una bottiglia cromata in testa a {B} e usa quello che resta del collo per finire il lavoro. La musica copre tutto, tranne il sangue sulla pista.
2 at:3 k:A>B @agg | Al Club, {A} collega il visore di {B} a una braindance di morte registrata dal vero e alza il volume al massimo. A {B} esplode un occhio, poi l'altro.
1 at:3 d:A | Al Club, {A} prova una braindance proibita registrata durante un incidente d'auto. Il cervello non distingue: le costole si spezzano davvero.
2 at:4 k:A>B @agg | All'Officina, {A} infila {B} nella pressa idraulica dei Maelstrom. Esce un rettangolo di trenta centimetri per quaranta, piuttosto decorativo. I Maelstrom lo appendono al muro.
2 at:4 k:A>B @agg | All'Officina, {A} lega {B} alla ruota posteriore di una moto e dà gas. Sulla strada resta una scia lunga un isolato.
2 at:4 hit:A>B | All'Officina, {A} strappa a mani nude il braccio cromato di {B}. Viene via con i tendini attaccati.
1 at:4 test:A=res13 ok:star:A ok:mo:A+10 ko:s:A=ferito | All'Officina, i Maelstrom propongono a {A} il loro rito d'ingresso: un chiodo nella lingua, a freddo, davanti a tutti. {A} non fa una piega. || All'Officina, i Maelstrom propongono a {A} il rito del chiodo nella lingua. {A} urla, sputa sangue per un'ora e viene chiamat[A:o/a] «Muta» per sempre.
2 at:4 couple:AB mo:A+12 mo:B+12 | All'Officina, {A} e {B} fanno sesso sul cofano di una moto blindata appena verniciata. La vernice non era asciutta: hanno entrambi il logo dei Maelstrom stampato sul culo.
1 at:4 d:A | All'Officina, {A} si avvicina troppo al cane cibernetico dei Maelstrom. Del corpo di {A} restano gli stivali, ancora allacciati.
2 at:5 k:A>B @agg | Al Nodo dati, {A} infila la presa di {B} nel cavo dell'alta tensione dei server. Il fumo esce dalle orecchie, dal naso e da posti che non si nominano.
2 at:5 enemy:AB test:A=int13 ok:k:A>B ko:pr:A+15 | Al Nodo dati, {A} collega la presa di {B} al terminale e lancia un attacco di surriscaldamento. Il cervello di {B} bolle; gli occhi cotti scoppiano come uova. || Al Nodo dati, {A} prova a collegare la presa di {B} al terminale, ma l'ICE devia la scarica nei propri impianti.
1 at:5 d:A | Al Nodo dati, {A} resta chius[A:o/a] nella sala server mentre il gas di raffreddamento ghiaccia tutto. Quando la porta si riapre, {A} si spezza come vetro.
1 at:5 star:A mo:A+8 | Al Nodo dati, {A} trova sul terminale l'archivio privato di un dirigente della Kagemura Dynamics: dodici anni di video amatoriali con la sua amante. Li manda in onda sul megaschermo della Piazza.
2 at:6 k:A>B @agg w:A | In Piazza, sotto il megaschermo, {A} decapita {B} con {arma:A}. La testa rotola fino ai piedi della statua del fondatore, che continua a sorridere.
2 at:6 couple:AB star:A star:B | In Piazza, {A} e {B} si baciano sotto il megaschermo, che li inquadra per sbaglio. Poi smettono di limitarsi a baciarsi. La diretta batte ogni record.
1 at:6 d:A | In Piazza, {A} viene colpit[A:o/a] da un cecchino corporativo. Il proiettile a frammentazione [A:gli/le] apre il cranio come un fiore.
2 couple:AB stat:A>pr60 stat:B>pr60 mo:A+12 mo:B+12 pr:A+5 pr:B+5 | Con gli impianti al limite, {A} e {B} collegano le prese e fanno sesso in rete, senza toccarsi. Gli impianti vanno in tilt per il piacere, e il sovraccarico sale per entrambi.
2 couple:AB mo:A+10 mo:B+10 en:A-6 en:B-6 | {A} e {B} trovano un'auto abbandonata con i sedili ribaltabili. L'auto non si muove, ma le sospensioni lavorano per ore.
2 couple:AB test:A=car12 ok:mo:A+15 ok:mo:B+15 ko:mo:A-8 | {A} propone a {B} di provare un gioco con le manette trovate in una volante. Funziona benissimo. || {A} propone a {B} di provare le manette trovate in una volante. La chiave delle manette resta nella volante, e la volante se ne va.
2 couple:AB s:A=ferito mo:B+10 | {A} prova a sollevare {B} contro un muro come nelle braindance. Il muro regge, la schiena di {A} no.
2 single:A single:B friend:AB amo:A>B+12 amo:B>A+12 mo:A+10 mo:B+10 | {A} e {B} si rifugiano dalla pioggia acida in una cabina per fototessere. La cabina, ad ogni movimento, scatta una foto. Ne escono con sedici foto e nessun rimpianto.
2 love:AB | Al riparo in un portone, incuranti della pioggia acida, {A} e {B} si strappano i vestiti a vicenda. Quando smette di piovere, si mettono insieme.
2 crush:A>B test:A=car12 ok:love:AB ko:mo:A-12 | {A} invita {B} nella propria capsula con una frase da braindance di serie B. Incredibilmente, funziona, e la mattina sono una coppia. || {A} invita {B} nella propria capsula con una frase da braindance di serie B. {B} ride così forte che si sveglia tutto il piano.
2 couple:AB grudge:A>B *0.5 mo:A+8 | {A} e {B} litigano, si insultano, si odiano, e poi fanno sesso con la rabbia di due motori truccati. Il rancore resta, ma per un'ora non conta.
1 mo:A+10 | {A} scopre che le proprie ottiche hanno una modalità «vista ai raggi X» che non aveva mai attivato. La attiva. Passa la giornata ad arrossire.
1 s:A=ubriaco mo:A+8 | {A} si ubriaca e manda un messaggio vocale esplicito al numero sbagliato. Il numero è quello di Radio Zona Rossa, e DJ Saetta lo manda in onda.
1 pr:A+10 mo:A+10 | {A} si fa installare da un ripperdoc di strada un piercing luminoso in un posto molto privato. Lampeggia a tempo con la musica. Gli impianti scaldano, e non solo quelli.
2 enemy:AB k:A>B @agg w:A | {A} insegue {B} in un vicolo cieco e usa {arma:A} per aprirl[B:o/a] come una lattina. Ci mette il tempo che serve.
2 enemy:AB k:A>B @agg | {A} strangola {B} con il cavo del suo stesso cyberdeck, finché le ottiche di {B} non diventano nere.
2 enemy:AB k:A>B @agg | {A} strappa a {B} gli impianti uno per uno, a mani nude, finché non resta niente da strappare. Li getta in un tombino, ancora caldi.
2 enemy:AB hit:A>B | {A} prende {B} a calci nei testicoli, o in quello che {B} ha installato al loro posto, con lo stivale chiodato.
2 grudge:A>B k:A>B @agg | {A} raggiunge {B} e [B:gli/le] taglia la lingua prima del resto, «così non dici più niente su di me».
2 k:A>B @agg @stl | {A} tende un filo monomolecolare all'altezza del collo in un corridoio buio. {B} ci passa di corsa. La testa fa ancora due passi.
2 k:A>B @agg | {A} raccoglie una katana termica abbandonata e la usa su {B}. La lama cauterizza mentre taglia: nemmeno una goccia di sangue, solo l'odore della carne bruciata.
3 k:A>BC *0.4 @agg | {A} apre la valvola del gas di un ristorante di noodle dove {B} e {C} stanno mangiando, e accende un fiammifero. Le scodelle volano a tre isolati di distanza, e anche il resto.
1 trait:A=ubriacone s:A=ubriaco mo:A+10 | {A} beve un cocktail chiamato «Orgasmo neurale». Non fa quello che promette, ma fa abbastanza.
1 trait:A=esibizionista star:A mo:A+10 | {A} gira nud[A:o/a] per il Mercato per un'intera mattina «per una protesta contro le corporazioni». Nessuno capisce contro cosa, tutti filmano.
1 trait:A=folle mo:A+10 pr:A+6 | {A} si innamora del distributore Gino e gli dedica una serenata con le mani sul vetro. Gino arrossisce, nei limiti di un distributore. Gli impianti di {A}, invece, scaldano.
1 trait:A=romantico mo:A+12 | {A} scrive una poesia erotica sul muro di un bagno del Club. Nel giro di un'ora ha quattordici risposte, due proposte di matrimonio e un disegno anatomicamente scorretto.
1 trait:A=spietato star:A | {A} appende i corpi di chi ha ucciso ai lampioni del quartiere, con un'insegna olografica sopra ciascuno. I fixer pagano bene per le foto.
1 trait:A=paranoico s:A=ferito | {A} si convince di avere un localizzatore sotto la pelle e prova a estrarselo con un coltello da cucina. Non trova niente. Trova solo molto sangue.
1 trait:A=goloso s:A=malato | {A} mangia una ciotola di vermi fritti «afrodisiaci» del Mercato. La notte la passa sul water, ma non per i motivi promessi.
1 trait:A=sfortunato s:A=ferito | {A} si siede su una panchina elettrificata dagli Scav per scoraggiare i clochard. Si alza con la sedia ancora attaccata ai pantaloni e la pelle no.
1 trait:A=bruto star:A | {A} sfida a una rissa un Maelstrom con il torace d'acciaio, vince e beve un bicchiere del suo sangue davanti a tutti, per rispetto della tradizione.
1 trait:A=sopravvissuto test:A=res13 ok:hp:A+15 ko:hp:A-10 | {A} si cauterizza una ferita con la canna rovente di una pistola appena usata. Urla, ma la ferita si chiude. || {A} prova a cauterizzarsi una ferita con una canna rovente, ma la canna si è già raffreddata e serve solo a farsi più male.
`,
      n: `
2 couple:AB mo:A+12 mo:B+12 en:A-6 en:B-6 | Di notte {A} e {B} fanno l'amore sul tetto, sotto una tettoia che gocciola e le insegne che cambiano colore. Nessuno dei due guarda le insegne.
2 couple:AB mo:A+10 mo:B+10 | Di notte {A} e {B} si chiudono in una capsula-letto del Megablocco. Il vicino batte sul muro tre volte, poi si arrende e mette le cuffie.
2 love:AB | Di notte, durante il blackout, {A} e {B} si trovano a tentoni nello stesso vano tecnico. Quando le luci tornano, non hanno più niente addosso e sono una coppia.
2 single:A single:B friend:AB amo:A>B+10 amo:B>A+10 en:A-8 en:B-8 mo:A+10 mo:B+10 | Di notte {A} e {B} dividono l'unica coperta rimasta. Poi dividono anche il resto. Al mattino nessuno dei due ne parla, ma sorridono.
2 couple:AB pr:A+6 pr:B+6 mo:A+12 mo:B+12 | Di notte {A} e {B} si collegano a una braindance erotica in due. Il segnale si sovrappone e ognuno sente quello che sente l'altro. Gli impianti vanno in sovraccarico, e non se ne pentono.
1 mo:A+10 en:A+6 | Di notte {A} si concede un'ora con il catalogo olografico della casa delle bambole del Club. Senza pagare. Il catalogo ha una modalità anteprima molto generosa.
2 k:A>B @stl @agg | Di notte {A} raggiunge {B} che dorme e [B:gli/le] infila un cacciavite nell'orecchio fino al manico. {B} non si sveglia più.
2 k:A>B @stl @agg | Di notte {A} versa acido di batteria sulla faccia di {B} addormentat[B:o/a]. Le urla svegliano tutto il palazzo, poi smettono.
2 enemy:AB test:A=furt12 ok:k:A>B ko:hit:B>A | Di notte {A} entra nel nascondiglio di {B} con un filo monomolecolare tra le mani. Il filo trova il collo al primo tentativo. || Di notte {A} entra nel nascondiglio di {B} con un filo monomolecolare, ma {B} si sveglia e [A:gli/le] trancia due dita con lo stesso filo.
1 d:A | Di notte {A} si addormenta nel vicolo sbagliato. Gli Scav [A:gli/le] prelevano reni, cornee e fegato, con precisione chirurgica. Quando si sveglia, non si sveglia.
1 s:A=sconvolto | Di notte {A} trova nel cassonetto dietro la Clinica un sacco di arti cibernetici con ancora la carne attaccata. Uno saluta.
1 trait:A=solitario mo:A+8 | Di notte {A} scopre che il proprio braccio cromato ha una funzione vibrante. Passa una notte di solitudine molto meno solitaria del solito.
1 trait:A=sonnambulo s:A=ferito | Nel sonno {A} cammina fino a una finestra del Megablocco, la apre e si sporge. Si sveglia appes[A:o/a] a un cavo, con il braccio slogato e il pigiama strappato.
1 trait:A=vendicativo mo:A+8 | Di notte {A} affila un coltello e ripete ad alta voce, con dovizia di dettagli anatomici, cosa farà ai propri nemici. Si addormenta seren[A:o/a].
2 grudge:A>B k:A>B @agg | Di notte {A} trova {B} e [B:gli/le] cava gli occhi cibernetici con un cucchiaio, prima di chiudere il conto. Gli occhi restano accesi per un'ora, sul pavimento.
3 couple:AB friend:AC friend:BC single:C mo:A+10 mo:B+10 mo:C+12 | Di notte {A} e {B} invitano {C} nella loro capsula «per stare più caldi». Fa effettivamente molto caldo.
`,
      f: `
1 +arma:A star:A | Alla consegna, {A} trova nella cassa {arma} e una scatola di preservativi cromati con il logo di Nonna Kiku. La nonna pensa a tutto.
2 k:A>B @agg | Alla consegna, {A} e {B} afferrano la stessa cassa. {A} usa il coperchio come ghigliottina: la cassa arriva intera, {B} no.
2 k:A>B @agg w:A | Alla consegna, {A} spara a {B} in faccia da mezzo metro. Il fixer, che filmava, dovrà ripulire l'obiettivo.
1 d:A | Alla consegna, {A} apre la cassa con l'etichetta «Non aprire». Era una mina. Pezzi di {A} decorano il tendone di un banco del Mercato.
2 couple:AB mo:A+12 mo:B+12 | Alla consegna, {A} e {B} trovano nella cassa uno strano dispositivo vibrante con il manuale in sei lingue. Lo provano subito, nel retro di un banco. Funziona in tutte e sei.
3 k:A>BC *0.4 @agg | Alla consegna, {A} lancia nella calca la granata trovata nella cassa. {B} e {C} finiscono spalmat[BC:i/e] sul banco dei biscotti di Nonna Kiku, che si arrabbia moltissimo.
`,
      finale: `
2 k:A>B | Sotto la torre, {A} schiaccia la testa di {B} contro il basamento della statua finché la statua non è rossa fino alle ginocchia.
2 k:A>B w:A | {A} svuota {arma:A} nel petto di {B} e continua a sparare anche dopo. Il megaschermo inquadra tutto, al rallentatore.
2 k:A>B | {A} strappa a {B} il braccio cromato e lo usa per finirl[B:o/a]. Il braccio, per riflesso, fa ancora il pugno.
2 k:A>B | {A} infila le dita nelle prese neurali di {B} e tira. Viene via un mazzo di cavi, e quello che c'era attaccato.
2 k:A>B trait:A=spietato | {A} apre {B} dalla gola all'ombelico con un solo gesto, guardando dritto nel megaschermo. Poi sorride al pubblico.
2 k:A>B | {A} usa le barriere della Piazza come una pressa: {B} resta in mezzo mentre salgono, e il rumore si sente fino al Club.
2 k:A>B con:A=esplosivo esplosivo:A | {A} infila {esplosivo:A} nella giacca di {B} e la chiude con la zip. Il resto lo racconteranno i robot delle pulizie.
2 k:A>B stat:A<hp40 | Ferit[A:o/a] e piegat[A:o/a] in due, {A} affonda i denti nella gola di {B} e non molla finché il cuore di {B} non smette di pompare.
`,
      sponsor: `
1 +armatura:A mo:A+8 @gift | Nonna Kiku manda a {A} {armatura} e una confezione di preservativi al gusto di noodle. Il biglietto dice: «Proteggiti, in tutti i sensi».
1 +alcol:A mo:A+10 @gift | Un fixer anonimo manda a {A} {alcol} e un buono per un'ora alla casa delle bambole del Club. «Per rilassarti», dice il biglietto.
1 +arma:A star:A @gift | La Kagemura Dynamics manda a {A} {arma} con una richiesta precisa: «Più sangue in camera, grazie. Gli spettatori pagano a schizzo».
1 +med:A @gift | Doc Ferraglia manda a {A} {med} e una cartolina: «Per quando ti apriranno. Perché ti apriranno».
`,
      ds: `
1 s:A=ferito | {A} si salva, ma lascia sul marciapiede due dita e un orecchio.
1 d:A | {A} non si salva. Del corpo di {A} si trova solo il braccio cromato, che continua a muovere le dita.
2 k:A>B | Nel caos, {A} usa {B} come scudo umano. Funziona: {B} assorbe tutto, a pezzi.
`,
    },
    dis: `
Il tritacarne degli Scav | Gli Scav allestiscono una macelleria di organi in un parcheggio sotterraneo e vanno a caccia di donatori. | {A} viene caricat[A:o/a] su un furgone e svuotat[A:o/a] come un pesce, organo per organo. | {A} sfugge agli Scav con un rene in meno e una cicatrice da orecchio a orecchio. | {A} convince gli Scav di avere organi pessimi. Gli Scav controllano, e [A:gli/le] danno ragione.
La strage del cyberpsicotico al Mercato di Kabuki | Un uomo con quattro braccia cromate e due motoseghe al posto delle mani entra nel Mercato di Kabuki. | {A} viene tagliat[A:o/a] in sei pezzi, uno per ogni colpo. | {A} perde un braccio, ma lo recupera e se lo porta a casa sotto l'ascella. | {A} si finge mort[A:o/a] sotto un mucchio di corpi veri.
La pioggia di carne | Un drone delle consegne del Mercato si schianta mentre trasporta carne coltivata, e la carne piove sul distretto. Non tutta era coltivata. | {A} viene colpit[A:o/a] da un quarto di bue sintetico in caduta libera e resta schiacciat[A:o/a] sotto. | {A} viene centrat[A:o/a] da un fegato, non sintetico. | {A} apre l'ombrello e ascolta il rumore, molto pesante. | sconvolto
L'orgia della Velltech in Piazza della torre | La Velltech organizza in Piazza della torre una festa aziendale che degenera in un'orgia di dirigenti, vodka al neon e droni con le telecamere accese. | {A} si avvicina troppo al palco dei dirigenti, e la sicurezza spara prima di chiedere. | {A} si sveglia il giorno dopo su un tavolo da buffet, senza vestiti, con il logo della Velltech tatuato sul sedere. | {A} si gode l'open bar da lontano e prende appunti. | ubriaco
La braindance assassina del Club della braindance | Al Club della braindance circola una braindance che fa vivere a chi la prova la morte di trenta persone diverse. | {A} prova la registrazione e muore trenta volte di fila, l'ultima per davvero. | {A} strappa il visore alla quinta morte e vomita per ore. | {A} si rifiuta di indossare il visore e preferisce un cocktail. | sconvolto
Il mattatoio dei Maelstrom all'Officina dei Maelstrom | I Maelstrom organizzano all'Officina dei Maelstrom una gara a chi installa più cromo su un prigioniero vivo. | {A} viene scelt[A:o/a] come prigioniero. | {A} riesce a liberarsi con una vite conficcata nel ginocchio. | {A} vince la scommessa sulla gara e se la ride.
La febbre del piacere | Un lotto di impianti per il piacere difettosi manda in tilt mezzo distretto: la gente si spoglia per strada e non riesce a smettere di ridere. | {A} ride così tanto che il cuore non regge. | {A} si sveglia nud[A:o/a] in un'aiuola con una slogatura e tre numeri di telefono scritti sul braccio. | {A} non ha mai comprato impianti per il piacere a basso costo. | sconvolto
Il crollo del parcheggio multipiano | Un parcheggio multipiano pieno di auto blindate collassa su sé stesso. | {A} viene schiacciat[A:o/a] tra due piani di cemento, e di {A} resta solo una sagoma rossa. | {A} esce dalle macerie con una sbarra di ferro conficcata nella spalla. | {A} era parcheggiat[A:o/a] fuori. Per fortuna.
Gli esattori della Orbis Pharma | Gli esattori della Orbis Pharma recuperano gli impianti non pagati, direttamente dai corpi dei clienti. | {A} non aveva pagato le ultime rate, e gli esattori recuperano tutto, compresa la colonna vertebrale. | {A} viene alleggerit[A:o/a] di un occhio cibernetico, senza anestesia. | {A} aveva pagato in contanti.
La vasca dei liquami del Megablocco | La fossa biologica del Megablocco scoppia e un'onda di liquami invade i piani bassi. | {A} soffoca nei liquami del Megablocco. Il peggior modo di andarsene, per distacco. | {A} esce dai liquami con un'infezione e l'odore addosso per sempre. | {A} era al piano di sopra, e rideva. | malato
La retata nella casa delle bambole del Club della braindance | La sicurezza corporativa fa irruzione nella casa delle bambole del Club e spara a chiunque abbia i pantaloni abbassati. | {A} aveva i pantaloni abbassati. | {A} scappa dalla finestra senza pantaloni e si taglia sul vetro. | {A} era solo al bar a bere un succo.
Il sushi sbagliato del Mercato di Kabuki | Un ristorante di sushi del Mercato serve un pesce sintetico difettoso che liquefà gli intestini. | {A} si scioglie dall'interno, in un bagno chimico. | {A} passa tre giorni tra crampi e sudore freddo. | {A} aveva ordinato il ramen. | avvelenato
`,
  });
})(typeof window === 'object' ? window : globalThis);
