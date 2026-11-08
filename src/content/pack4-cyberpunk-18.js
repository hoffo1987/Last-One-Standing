/* Night City — Zona Rossa, secondo pacchetto per adulti (solo con il filtro 18+ attivo).
 * Stesse regole di pack3-cyberpunk-18.js: sesso solo tra adulti consenzienti e lucidi,
 * gore senza freni ma mai a sfondo sessuale, ogni fatto con il suo effetto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'cyberpunk', adult: true,
    ev: {
      b: `
2 at:6 k:A>B @agg | {A} spinge {B} sotto le eliche di una volante che decolla. La nebbia rossa si vede dall'ultimo piano della torre.
2 at:6 k:A>B @agg w:A | {A} spara a {B} con {arma:A} a bruciapelo, così da vicino che il colpo esce dall'altra parte con metà della spina dorsale.
1 at:6 s:A=sconvolto | Nella fuga {A} scivola su qualcosa di caldo e molle. Guarda per terra, e si pente subito di aver guardato.
2 at:6 couple:AB mo:A+10 mo:B+10 | Mentre la Piazza brucia, {A} e {B} si baciano come in un film catastrofico. Poi si ricordano che le serrande stanno scendendo e corrono, ancora abbracciat[AB:i/e].
`,
      d: `
2 at:0 couple:AB mo:A+12 mo:B+12 | Al Mercato, {A} e {B} scoprono un banco che vende lubrificante al gusto di ramen piccante. Lo comprano per scherzo. Lo usano non per scherzo. Se ne pentono per tutt'altro motivo.
1 at:0 test:A=car12 ok:+valore:A ok:star:A ko:mo:A-8 | Al Mercato, {A} fa da modell[A:o/a] nud[A:o/a] per un pittore di ritratti olografici. Il ritratto viene venduto in un'ora, e il pittore divide l'incasso: {valore}. || Al Mercato, {A} posa nud[A:o/a] per un pittore olografico, che alla fine si rifiuta di pagare perché «la luce non era giusta».
2 at:0 enemy:AB k:A>B @agg | Al Mercato, {A} affoga {B} nel pentolone del brodo di ossa. Il brodo, da quel giorno, ha un sapore più ricco.
2 at:0 k:A>B @agg | Al Mercato, {A} infila {B} nel tritaghiaccio di un banco di granite. La granita del giorno è alla fragola. Non è fragola.
1 at:0 s:A=ferito | Al Mercato, {A} prova un paio di labbra cibernetiche «autoregolanti» al banco delle prove gratuite. Le labbra si regolano su una sola posizione: il morso.
1 at:1 mo:A+10 | Al Megablocco, {A} scopre che il palazzo ha un canale interno che trasmette solo le telecamere degli ascensori. A quest'ora, il canale è più spinto del Club.
2 at:1 love:AB | Al Megablocco, {A} e {B} si chiudono nella lavanderia comune e fanno partire tutte le lavatrici per coprire il rumore. Escono con i vestiti puliti, ma non quelli che avevano addosso. Da oggi sono una coppia.
2 at:1 couple:AB test:A=agi12 ok:mo:A+12 ok:mo:B+12 ko:s:A=ferito | Al Megablocco, {A} e {B} fanno l'amore sulla scala antincendio al cinquantesimo piano, legati a una ringhiera con un cavo. È la cosa più romantica e più stupida che abbiano mai fatto. || Al Megablocco, {A} e {B} provano a fare l'amore sulla scala antincendio. La ringhiera cede di un piano e {A} atterra sul gomito.
2 at:1 k:A>B @agg | Al Megablocco, {A} butta {B} nel trituratore dei rifiuti del seminterrato. Il trituratore si inceppa a metà lavoro, e {A} lo sblocca a calci.
1 at:1 d:A | Al Megablocco, {A} rimane incastrat[A:o/a] nelle porte dell'ascensore mentre la cabina riparte. La parte di sopra arriva al trentesimo piano, quella di sotto resta al pianterreno.
2 at:2 couple:AB mo:A+10 mo:B+10 | Alla Clinica, mentre Doc Ferraglia è in pausa, {A} e {B} provano il lettino regolabile in tutte le sue posizioni. Il lettino ne ha ventisei. Arrivano alla diciannove.
1 at:2 test:A=res12 ok:mo:A+12 ok:pr:A-10 ko:s:A=ferito | Alla Clinica, {A} si fa rifare il seno, o il petto, con un impianto in offerta. Doc Ferraglia approfitta dell'anestesia per una diagnosi completa degli impianti: il sovraccarico scende. || Alla Clinica, {A} si fa rifare il petto con un impianto in offerta. Uno dei due impianti esplode durante la convalescenza.
2 at:2 k:A>B @agg | Alla Clinica, {A} infila {B} nella macchina per il lavaggio degli impianti e preme «ciclo intensivo». Ne esce un sacchetto di ossa pulitissime.
2 at:2 enemy:AB test:A=int12 ok:k:A>B ko:hit:B>A | Alla Clinica, {A} riprogramma il braccio chirurgico per un'amputazione completa e lo punta su {B}. Il braccio è molto accurato. || Alla Clinica, {A} prova a riprogrammare il braccio chirurgico contro {B}, ma il braccio sceglie {A} e [A:gli/le] taglia un dito, per correttezza.
1 at:2 s:A=sconvolto | Alla Clinica, {A} assiste a un intervento di Doc Ferraglia: un trapianto di faccia, senza anestesia, mentre il Doc canta. La faccia nuova sorride. Quella vecchia, nel secchio, pure.
1 at:3 con:A=valore -valore:A mo:A+15 | Al Club, {A} paga con {valore:A} uno spettacolo privato di un androide ballerino con otto braccia. Tutte e otto molto occupate.
1 at:3 test:A=car11 ok:mo:A+15 ok:en:A+10 ko:mo:A-10 | Al Club, {A} si fa invitare nell'ala privata della casa delle bambole da una ragazza che dice di trovarl[A:o/a] simpatic[A:o/a]. Lo trova davvero, e non fa nemmeno pagare. || Al Club, {A} prova a farsi invitare nell'ala privata della casa delle bambole, ma il buttafuori [A:gli/le] mostra il listino. Il listino è lungo.
2 at:3 couple:AB s:A=ubriaco s:B=ubriaco mo:A+12 mo:B+12 | Al Club, {A} e {B} vincono la gara di ballo sensuale bevendo shottini tra un giro e l'altro. Il premio è una bottiglia. La bottiglia non arriva a mezzanotte.
2 at:3 k:A>B @agg | Al Club, {A} spinge {B} sulla pista allagata e butta nell'acqua un cavo delle luci scoperto. {B} balla l'ultimo pezzo, fumando.
1 at:3 pr:A+15 s:A=sconvolto | Al Club, {A} prova per sbaglio la braindance di un serial killer. Per un'ora ha nelle mani la sensazione del manico del coltello. Gli impianti bruciano.
2 at:3 single:A single:B friend:AB amo:A>B+12 amo:B>A+12 mo:A+12 mo:B+12 | Al Club, {A} e {B} giocano a obbligo o verità con le regole della casa. Nessuno dei due sceglie mai verità.
2 at:4 couple:AB mo:A+12 mo:B+12 | All'Officina, {A} e {B} si chiudono nella cabina di verniciatura. Ne escono due ore dopo, verniciat[AB:i/e] di rosso fiamma dalla testa ai piedi, tranne due impronte di mani nei posti giusti.
2 at:4 k:A>B @agg | All'Officina, {A} tiene la faccia di {B} sulla mola accesa finché la faccia non è più una faccia.
2 at:4 k:A>B @agg | All'Officina, {A} usa la saldatrice al plasma su {B}, partendo dai piedi. I Maelstrom fanno il tifo.
1 at:4 test:A=cor13 ok:star:A ok:+arma:A ko:s:A=ferito | All'Officina, i Maelstrom sfidano {A} a mangiare un occhio cibernetico crudo. {A} lo mastica guardandoli dritti negli occhi e vince {arma}. || All'Officina, i Maelstrom sfidano {A} a mangiare un occhio cibernetico crudo. {A} ci prova, si spacca un dente e vomita sulle scarpe del capo.
1 at:4 d:A | All'Officina, {A} inciampa nella catena del cane cibernetico. Il cane decide che la catena serve a portarsi a cuccia la cena.
2 at:5 k:A>B @agg | Al Nodo dati, {A} trascina {B} nella sala server e l[B:o/a] chiude dentro mentre parte il gas di raffreddamento. Attraverso il vetro, {B} si copre lentamente di brina, dagli occhi in giù.
2 at:5 enemy:AB test:A=int13 ok:k:A>B ko:pr:A+12 | Al Nodo dati, {A} collega la presa di {B} al terminale e carica nel cervello di {B} un intero archivio aziendale in un secondo. La testa di {B} fuma dalle orecchie. || Al Nodo dati, {A} prova a sovraccaricare il cervello di {B} dal terminale, ma l'archivio si scarica negli impianti sbagliati.
1 at:5 test:A=int12 ok:star:A ok:mo:A+10 ko:pr:A+10 | Al Nodo dati, {A} si collega al terminale e sostituisce tutti gli sfondi aziendali della Velltech con le foto del sedere del loro amministratore delegato, trovate nel suo archivio privato. || Al Nodo dati, {A} prova a cambiare gli sfondi della Velltech dal terminale, ma l'ICE [A:gli/le] rimanda le foto direttamente negli impianti, con una scarica.
2 at:6 k:A>B @agg | In Piazza, {A} impala {B} su una delle barriere di sicurezza che salgono dal selciato. La barriera continua a salire, e {B} con lei.
2 at:6 couple:AB mo:A+10 mo:B+10 star:A star:B | In Piazza, {A} e {B} fanno sesso dentro la cabina della metropolitana sopraelevata ferma, con il treno vuoto. Le telecamere del treno trasmettono tutto sul megaschermo. Il quartiere applaude.
1 at:6 d:A | In Piazza, {A} viene travolt[A:o/a] da una volante corporativa che atterra. Il carrello d'atterraggio [A:gli/le] passa sulla testa, che si apre come un melone.
2 couple:AB mo:A+12 mo:B+12 en:A-8 en:B-8 | {A} e {B} trovano un motel a ore ancora aperto, con il letto vibrante a gettoni. Finiscono i gettoni. Continuano senza.
2 couple:AB test:A=int11 ok:mo:A+12 ok:mo:B+12 ko:mo:A-6 | {A} hackera gli impianti tattili di {B}, con il consenso di {B} e il cavo collegato, per farl[B:o/a] sentire tutto dieci volte più forte. {B} chiede il bis. || {A} prova a potenziare gli impianti tattili di {B} con il cavo, ma sbaglia parametro: {B} sente tutto dieci volte più piano e si addormenta.
2 couple:AB s:B=ferito mo:A+8 | {A} e {B} provano una posizione vista in una braindance per acrobati. {B} si stira un muscolo che non sapeva di avere.
2 couple:AB mo:A+12 mo:B+12 | {A} e {B} trovano in un appartamento abbandonato un armadio pieno di costumi in lattice. Ne provano undici. Il dodicesimo lo tengono.
2 single:A single:B friend:AB amo:A>B+10 amo:B>A+10 mo:A+12 mo:B+12 | Bloccat[AB:i/e] in un vagone della metropolitana fermo, {A} e {B} si annoiano per dieci minuti. Poi smettono di annoiarsi.
2 crush:A>B test:A=car12 ok:love:AB ko:mo:A-10 | {A} manda a {B} un messaggio olografico in cui si vede in mutande a dichiarare il proprio amore. {B} lo guarda tre volte, poi corre da {A}: sono una coppia. || {A} manda a {B} un messaggio olografico in mutande per dichiararsi. {B} lo inoltra per sbaglio a tutto il distretto.
1 mo:A+10 | {A} trova in un negozio di elettronica abbandonato una scatola di giocattoli per adulti con la batteria ancora carica. Li prova tutti, per scrupolo scientifico.
1 s:A=ubriaco mo:A+10 | {A} beve al bancone di un bar uno shot chiamato «Pompino cromato». Non ha nessun ingrediente cromato. Ha moltissimo alcol.
1 s:A=malato | {A} si fa un tatuaggio olografico sul sedere in un garage, con un ago non sterilizzato. Il tatuaggio è bellissimo. L'infezione pure.
1 test:A=fort12 ok:mo:A+15 ko:s:A=sconvolto | {A} trova in una cabina pubblica una braindance erotica abbandonata. È fantastica. || {A} trova in una cabina pubblica una braindance erotica abbandonata. Il protagonista è un vecchio vicino di casa.
2 enemy:AB k:A>B @agg w:A | {A} rompe le gambe di {B} con {arma:A}, poi le braccia, poi aspetta. {B} non ha più niente da rompere quando arriva la fine.
2 enemy:AB k:A>B @agg | {A} schiaccia la testa di {B} sotto lo sportello di un'auto blindata, aprendo e chiudendo, aprendo e chiudendo.
2 enemy:AB k:A>B @agg | {A} spinge {B} sotto un treno della metropolitana sopraelevata. Il treno si ferma con quattro minuti di ritardo, per lavare il muso.
2 enemy:AB k:A>B @agg | {A} costringe {B} a ingoiare una granata a impulso e conta fino a tre. Al tre, gli impianti di {B} si spengono, e anche tutto il resto.
2 enemy:AB hit:A>B | {A} strappa a {B} un'ottica dall'orbita con due dita. L'ottica continua a trasmettere da terra.
2 enemy:AB hit:A>B | {A} morde {B} sul naso così forte da staccarne la punta. La sputa per terra e sorride con i denti rossi.
2 grudge:A>B k:A>B @agg | {A} lega {B} a un'insegna al neon e la accende. L'insegna diceva «Hot Dog». Adesso è vero.
2 k:A>B @agg | {A} usa un tirapugni elettrificato su {B}. Al decimo pugno, la mascella di {B} finisce dall'altra parte della strada.
2 k:A>B @agg | {A} schiaccia {B} sotto un distributore automatico rovesciato. Il distributore, prima di spegnersi, dice: «Grazie per l'acquisto».
2 k:A>B @agg | {A} usa una motosega da cantiere su {B}. Ci vuole un po', e il rumore copre le urla solo in parte.
3 k:AB>C @agg | {A} e {B} prendono {C} per le braccia e tirano in direzioni opposte, finché le braccia cromate di {C} non vengono via. Il resto di {C} resta in mezzo.
3 couple:AB friend:AC friend:BC single:C mo:A+12 mo:B+12 mo:C+12 | {A} e {B} propongono a {C} un'avventura a tre in un motel a ore. {C} accetta, e per una notte la parola «alleanza» assume un significato nuovo.
1 trait:A=esibizionista star:A mo:A+10 | {A} trasmette la propria doccia in diretta su un canale pirata, per «ringraziare i fan». Gli spettatori ringraziano a loro volta, con insistenza.
1 trait:A=goloso s:A=malato | {A} mangia un panino con «carne di fonte non specificata» da un banco degli Scav. La fonte, a giudicare dal tatuaggio trovato dentro, era specificabile.
1 trait:A=pacifista s:A=sconvolto | {A} trova il corpo di uno sconosciuto smontato pezzo per pezzo dagli Scav e allineato sul marciapiede come in un catalogo. Vomita, poi piange, poi vomita ancora.
1 trait:A=spietato star:A | {A} fa un tatuaggio con l'inchiostro mescolato al sangue dell'ultima vittima. I fixer lo chiamano «il Pittore».
1 trait:A=furtivo test:A=furt12 ok:+valore:A ko:s:A=ferito | {A} si infila nella stanza di un dirigente corporativo all'hotel di lusso mentre lui è distratto da tre accompagnatrici. Ne esce con {valore}. || {A} si infila nella stanza di un dirigente corporativo all'hotel, ma una delle accompagnatrici era la guardia del corpo.
1 trait:A=bruto star:A | {A} sfonda a testate la vetrina di un sexy shop per prendere un giocattolo gigante e usarlo come mazza. Vince la rissa successiva e l'ammirazione del quartiere.
1 trait:A=romantico mo:A+12 | {A} registra per la persona amata una braindance in cui si spoglia lentamente al tramonto artificiale di un megaschermo. Non la manda mai, ma riguardarla dà coraggio.
1 trait:A=folle mo:A+10 | {A} sposa con una cerimonia ufficiale un'insegna olografica a forma di donna che fa l'occhiolino. Il prete è un distributore. Gino, invitato, non viene.
`,
      n: `
2 couple:AB mo:A+12 mo:B+12 en:A-8 en:B-8 | Di notte {A} e {B} fanno l'amore sopra un'insegna gigante a forma di bottiglia di birra, a sessanta metri da terra. L'insegna, dopo, sembra più brillante.
2 couple:AB pr:A+6 pr:B+6 mo:A+12 mo:B+12 | Di notte {A} e {B} collegano gli impianti a una braindance erotica e sincronizzano i battiti. Si addormentano esausti, con gli impianti ancora caldi.
2 love:AB | Di notte {A} e {B} si ritrovano nella stessa vasca idromassaggio di un hotel abbandonato. L'acqua è fredda, loro no. Al mattino escono coppia, e un po' raggrinzit[AB:i/e].
2 single:A single:B friend:AB amo:A>B+10 amo:B>A+10 mo:A+10 mo:B+10 | Di notte {A} e {B} non riescono a dormire, e trovano un modo creativo per stancarsi.
2 k:A>B @stl @agg | Di notte {A} entra nella capsula di {B} e [B:gli/le] infila nella bocca il tubo di scarico di un generatore acceso. Al mattino la capsula è piena di fumo, e di silenzio.
2 k:A>B @stl @agg | Di notte {A} trova {B} addormentat[B:o/a] e [B:gli/le] taglia la gola così in profondità che la testa resta attaccata per un filo, di quelli monomolecolari.
1 d:A | Di notte {A} si addormenta in un vagone abbandonato. Un branco di ratti cibernetici [A:gli/le] mangia la faccia prima che si svegli, e poi non si sveglia.
1 s:A=sconvolto | Di notte {A} sente nel muro della capsula un rumore di unghie. Dietro il muro, scopre, c'è una stanza piena di teste conservate sotto vetro, tutte con gli occhi aperti.
1 mo:A+10 | Di notte {A} guarda dalla finestra il palazzo di fronte, dove trenta finestre su trenta sono occupate da coppie impegnate. Sembra un calendario dell'avvento per adulti.
2 enemy:AB test:A=furt13 ok:k:A>B ko:hit:B>A | Di notte {A} si cala dal condotto dell'aria sopra la capsula di {B} con una corda e un coltello. Il coltello arriva prima della corda. || Di notte {A} si cala dal condotto dell'aria sopra {B}, ma la corda si spezza e {A} atterra sulla faccia di {B}, che [A:gli/le] spacca il naso.
`,
      finale: `
2 k:A>B | {A} infila il pollice nell'occhio di {B} fino alla nocca, e gira.
2 k:A>B | {A} strappa la mandibola cromata di {B} e la tiene in mano come un trofeo davanti al megaschermo.
2 k:A>B w:A | {A} decapita {B} con {arma:A} e solleva la testa davanti ai droni. La diretta, per la prima volta, va in pausa pubblicitaria.
2 k:A>B | {A} e {B} rotolano sul selciato della Piazza, si mordono, si accecano. Alla fine si rialza solo {A}, con un orecchio in meno, ma si rialza.
`,
      ds: `
1 s:A=ferito | {A} si salva, ma una scheggia [A:gli/le] apre la guancia fino all'orecchio.
2 k:A>B | Nel caos, {A} lancia {B} contro la minaccia per guadagnare tempo. Il tempo guadagnato è di tre secondi. Quello che resta di {B} è meno.
`,
    },
    dis: `
I ratti cibernetici del Megablocco | Dalle fogne del Megablocco salgono migliaia di ratti cibernetici affamati, con denti di titanio. | {A} viene ricopert[A:o/a] dai ratti in un corridoio. Quando si disperdono, resta uno scheletro pulito, con i vestiti. | {A} scappa con mezzo polpaccio in meno. | {A} si chiude in un frigorifero e aspetta che passino.
La festa delle mutande al Club della braindance | Il Club della braindance organizza una notte a tema «solo biancheria intima»; la sicurezza corporativa fa irruzione cercando un ricercato in mutande leopardate. | {A} indossa mutande leopardate. | {A} viene trascinat[A:o/a] fuori in mutande e pres[A:o/a] a manganellate sul marciapiede. | {A} indossa mutande a pois e viene ignorat[A:o/a].
Le lame impazzite dell'Officina dei Maelstrom | Un prototipo di lame da avambraccio dei Maelstrom si attiva da solo e taglia tutto quello che si muove nell'Officina dei Maelstrom. | {A} si muove. In molte direzioni, dopo. | {A} perde due dita e una ciocca di capelli. | {A} resta immobile come una statua per tre ore.
Il gas esilarante della Clinica del ripperdoc | Un serbatoio di gas esilarante della Clinica del ripperdoc si rompe, e tutti ridono mentre il braccio chirurgico opera chi capita. | {A} ride mentre il braccio chirurgico [A:gli/le] asporta tutto quello che trova. | {A} si sveglia con un impianto in più che non ha chiesto e una cicatrice che ride. | {A} trattiene il respiro e trascina fuori Doc Ferraglia, che canta ancora.
La caccia al trofeo | Una squadra di dirigenti annoiati della Kagemura Dynamics compra un permesso di caccia nel distretto e va in giro su un furgone blindato con fucili di precisione. | {A} finisce appes[A:o/a] alla parete di un ufficio corporativo, come trofeo. | {A} viene colpit[A:o/a] a una gamba mentre si nasconde dietro un cassonetto. | {A} si traveste da dirigente e chiede di partecipare alla caccia.
L'esplosione del furgone dei preservativi | Un furgone delle consegne carico di preservativi cromati esplode in mezzo al distretto e copre tutto di lattice fuso. | {A} resta incollat[A:o/a] al marciapiede dal lattice fuso mentre arriva il resto dell'incendio. | {A} si ustiona le braccia staccandosi dal lattice. | {A} raccoglie una scorta per i giorni migliori.
`,
  });
})(typeof window === 'object' ? window : globalThis);
