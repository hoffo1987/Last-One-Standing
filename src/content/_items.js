/* Oggetti, carattere e vita interiore dei concorrenti.
 *
 * - D.items: catalogo dei tipi di oggetto (cosa fanno, come si chiamano in
 *   ogni arena), usato dal motore e spiegato nell'interfaccia.
 * - D.mind: obiettivi, pensieri, azioni notturne guidate dai tratti,
 *   diario segreto e ricordi dei rapporti.
 *
 * Segnaposto: {0} {1} {2} concorrenti, [0:o/a] accordo, {i} {j} oggetti,
 * {ip} oggetto con possessivo, {z} zona, {n} numero, {cibo} dal lessico. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});

  D.items = {
    order: ['arma', 'armatura', 'med', 'cibo', 'attrezzo', 'mappa', 'trap', 'esplosivo', 'veleno', 'amuleto', 'alcol', 'valore', 'ricordo'],
    types: {
      arma: { label: 'Arma', desc: 'Più forza negli scontri, in base alla qualità (★). Si consuma a ogni colpo e alla fine si rompe; con un attrezzo si può riparare. Chi è ingegnoso può intingerla nel veleno.' },
      armatura: { label: 'Protezione', desc: 'Riduce i danni e a volte para un colpo mortale. Si consuma a ogni colpo incassato.' },
      med: { label: 'Cure', desc: 'Si usa da soli o sugli alleati: richiude le ferite gravi, ferma veleni e infezioni presi in tempo, abbassa l\'indicatore dell\'arena.' },
      cibo: { label: 'Cibo', desc: 'Si mangia quando la sazietà cala. Si può dividere con gli alleati, regalare o scambiare.' },
      attrezzo: { label: 'Attrezzo', desc: 'Più cibo trovato, fughe più facili da tempeste e trappole, difesa migliore di notte, armi riparate.' },
      mappa: { label: 'Mappa', desc: 'Più cibo, meno disastri, trappole scoperte in anticipo e vie di fuga sicure.' },
      trap: { label: 'Trappola', desc: 'Di notte chi la sa usare la piazza nella sua zona. Chi ci passa rischia grosso, e l\'uccisione va a chi l\'ha piazzata.' },
      esplosivo: { label: 'Esplosivo', desc: 'Più forza negli scontri. Chi è ingegnoso ci costruisce trappole esplosive. Da ubriachi è un pessimo compagno.' },
      veleno: { label: 'Veleno', desc: 'Apre la strada agli avvelenamenti; chi è ingegnoso ci intinge l\'arma, che poi avvelena a ogni colpo.' },
      amuleto: { label: 'Portafortuna', desc: 'Può salvare una volta da morte certa (sempre, per chi è superstizioso). Calma Terrore e Corruzione.' },
      alcol: { label: 'Alcol', desc: 'Scalda, fa dimenticare, disinfetta le ferite infette. E ubriaca.' },
      valore: { label: 'Merce di scambio', desc: 'Non serve a niente, tranne che a comprare cibo e cure da chi ne ha.' },
      ricordo: { label: 'Ricordo', desc: 'Un pezzo di casa: ogni notte tiene su il morale. Se è di qualcuno che non c\'è più, ancora di più.' },
    },
    /* nomi dei tipi nuovi per ogni arena (gli altri vengono dal lessico dell'arena) */
    names: {
      _: {
        armatura: ['un giubbotto imbottito', 'uno scudo improvvisato', 'dei parastinchi di fortuna'],
        attrezzo: ['una corda', 'una torcia', 'un coltellino multiuso'],
        valore: ['una manciata di monete', 'un orologio d\'oro'],
        alcol: ['una fiaschetta di whisky'],
        ricordo: ['una foto di famiglia', 'una lettera mai spedita', 'il braccialetto di una sorella', 'un disegno fatto da un bambino', 'un medaglione con una ciocca di capelli', 'una cartolina di casa'],
      },
      classico: { armatura: ['un giubbotto di cuoio', 'uno scudo di legno', 'dei parastinchi di corteccia'], attrezzo: ['una corda di canapa', 'un acciarino', 'un binocolo da caccia'], valore: ['una manciata di monete d\'oro', 'un orologio da taschino'], alcol: ['una fiaschetta di whisky'] },
      fantasy: { armatura: ['una cotta di maglia elfica', 'uno scudo runico', 'un mantello di scaglie di drago'], attrezzo: ['una lanterna fatata', 'una corda incantata', 'una bussola che indica i desideri'], valore: ['un sacchetto di monete d\'argento', 'una gemma che canta'], alcol: ['una fiaschetta di idromele', 'una pozione di coraggio liquido'] },
      scifi: { armatura: ['una tuta corazzata', 'uno scudo energetico portatile'], attrezzo: ['un multiattrezzo', 'una torcia al plasma', 'un tablet di diagnostica'], valore: ['una chiavetta di crediti', 'un chip di accesso dorato'], alcol: ['una bottiglia di vodka sintetica'] },
      zombie: { armatura: ['un giubbotto antiproiettile', 'delle protezioni da hockey', 'un casco da motociclista'], attrezzo: ['una torcia a manovella', 'un piede di porco', 'un walkie-talkie'], valore: ['una stecca di sigarette', 'una scatola di batterie'], alcol: ['una bottiglia di vodka'] },
      royale: { armatura: ['un giubbotto tattico di livello 2', 'un elmetto da paracadutista', 'uno zaino corazzato'], attrezzo: ['un drone esploratore', 'un binocolo', 'un rampino'], valore: ['un sacchetto di monete dell\'evento', 'una skin leggendaria'], alcol: ['una lattina di birra calda'] },
      horror: { armatura: ['l\'armatura del cavaliere nel salone', 'un vassoio d\'argento usato come scudo'], attrezzo: ['un candelabro', 'una chiave che apre tutte le porte', 'una tavola ouija'], valore: ['dei gioielli di famiglia', 'un anello con lo stemma della villa'], alcol: ['una bottiglia di vino del 1890'] },
      wasteland: { armatura: ['un\'armatura di copertoni', 'uno scudo ricavato da un cartello stradale', 'una maschera antigas'], attrezzo: ['un contatore Geiger', 'una chiave inglese', 'una borraccia filtrante'], valore: ['una manciata di tappi di bottiglia', 'una tanica di benzina'], alcol: ['una bottiglia di distillato di cactus'] },
      liceo: { armatura: ['un alibi di ferro', 'una felpa col cappuccio'], attrezzo: ['gli appunti di tutto l\'anno', 'una calcolatrice scientifica', 'un caricabatterie di riserva'], valore: ['dei buoni pasto', 'le risposte del compito di domani'], alcol: ['una lattina di energy drink'], ricordo: ['un portachiavi dell\'amicizia', 'il quaderno delle confidenze', 'il biglietto del primo concerto', 'una foto di classe delle medie'] },
      ufficio: { armatura: ['una scrivania d\'angolo strategica', 'delle cuffie antirumore'], attrezzo: ['una chiavetta USB con tutte le password', 'una macro di Excel miracolosa'], valore: ['dei buoni pasto', 'delle ferie arretrate'], alcol: ['un amaro della cena aziendale'], ricordo: ['la foto del gatto', 'una tazza con scritto «Il capo migliore del mondo»', 'il badge del primo giorno'] },
    },
    how: { casa: 'Portato da casa', trovato: 'Trovato', sponsor: 'Dono degli sponsor', festino: 'Preso al festino', rubato: 'Rubato a {1}', bottino: 'Preso a {1}', eredita: 'Ereditato da {1}', dono: 'Regalo di {1}', scambio: 'Scambiato con {1}', costruito: 'Costruito', zaino: 'Trovato tra le cose di {1}', lettera: 'Scritto da {1}' },
  };

  /* ---------------- la mente dei concorrenti ---------------- */
  D.mind = {
    goals: {
      vendetta: { label: 'Vendetta su {1}', th: ['Ha un solo nome in testa: {1}.', 'Sta cercando {1}, e prima o poi l[1:o/a] troverà.'] },
      proteggere: { label: 'Proteggere {1}', th: ['Deve tenere al sicuro {1}, a ogni costo.', 'Dorme poco: veglia su {1}.'] },
      tradire: { label: 'Tradire {1}', secret: true, th: ['Sorride a {1}, ma sta già scegliendo il momento.', 'Ha studiato lo zaino di {1}. Sa cosa prendere, dopo.'] },
      cibo: { label: 'Trovare cibo', th: ['Ha fame, e la fame decide per l[0:ui/ei].', 'Pensa solo a cosa mettere sotto i denti.'] },
      curarsi: { label: 'Curarsi', th: ['Deve curarsi, o non arriverà lontano.', 'Ogni passo fa male. Cerca un posto tranquillo e qualcosa per le ferite.'] },
      nascondersi: { label: 'Nascondersi', th: ['Vuole solo sparire per un po\'.', 'Meno si fa vedere, meglio è.'] },
      caccia: { label: 'Andare a caccia', th: ['Cerca la prossima preda.', 'Ha preso gusto alla caccia.'] },
      spettacolo: { label: 'Conquistare il pubblico', th: ['Pensa alle telecamere più che ai nemici.', 'Sa che gli sponsor amano chi dà spettacolo.'] },
      reclutare: { label: 'Trovare alleati', th: ['Cerca qualcuno di cui fidarsi.', 'Da sol[0:o/a] non si va lontano: cerca compagnia.'] },
      cotta: { label: 'Conquistare {1}', secret: true, th: ['Non smette di pensare a {1}.', 'Cerca il coraggio di parlare a {1}.'] },
      sopravvivere: { label: 'Sopravvivere', th: ['Un giorno alla volta.', 'Vuole solo arrivare a domani.', 'Tiene la testa bassa e gli occhi aperti.'] },
    },
    /* etichette dei rapporti, dal più forte */
    rel: { amore: 'Amore', cotta: 'Cotta segreta', vendetta: 'Vendetta', amico: 'Amico fidato', simpatia: 'Simpatia', alleato: 'Alleato', debito: 'In debito', nemico: 'Nemico', diffida: 'Diffidenza', conoscente: 'Conoscente', complotto: 'Bersaglio segreto' },
    /* ricordi dei rapporti, in prima persona (dal punto di vista di chi ricorda) */
    mem: {
      saved: 'Mi ha salvato la vita.', cured: 'Mi ha curato.', shared: 'Ha diviso il cibo con me.', denied: 'Mi ha negato il cibo.', robbed: 'Mi ha derubato.',
      hit: 'Mi ha ferito.', killedDear: 'Ha ucciso {2}.', allied: 'Abbiamo stretto un\'alleanza.', betrayed: 'Mi ha tradito.', gift: 'Mi ha fatto un regalo.',
      love: 'Ci siamo innamorati.', repaid: 'Ha saldato il suo debito.', forgave: 'Ho deciso di perdonare.', traded: 'Abbiamo fatto affari.', fleeced: 'Mi ha spennato.',
      warned: 'Mi ha avvisato di un tradimento.', exposed: 'Ha svelato il mio piano.', mediated: 'Ha messo pace tra noi.', trap: 'La sua trappola mi ha quasi ucciso.',
      expelled: 'Mi ha cacciato dal gruppo.', comforted: 'Mi è stato vicino nel momento peggiore.', tried: 'Ha cercato di uccidermi.', bullied: 'Mi ha preso le cose con la forza.',
      brawl: 'Ci siamo presi a botte.', rejected: 'Mi ha detto di no.', healedStranger: 'Mi ha aiutato senza chiedere niente.', letter: 'Mi ha scritto una lettera.',
      jealous: 'Sta con la persona che amo.', nightTheft: 'Mi ha svuotato lo zaino di notte.', oath: 'Ha giurato di proteggermi.', recruited: 'Mi ha voluto nel suo gruppo.',
    },
    memSoft: { hit: 'Mi ha umiliato.', killedDear: 'Ha fatto fuori {2}.', tried: 'Ha cercato di farmi fuori.', brawl: 'Abbiamo litigato davanti a tutti.', trap: 'Ci sono cascato in pieno.' },

    /* azioni notturne guidate da tratti e caratteristiche */
    acts: {
      recruit: ['{0} convince {1} a unirsi al gruppo: «Da soli non si va lontano.»', '{0} offre a {1} un posto vicino al fuoco e un\'alleanza. {1} accetta.', '{0} parla con {1} per mezz\'ora. Alla fine si stringono la mano: ora sono alleati.'],
      mediate: ['{0} si mette in mezzo tra {1} e {2}: dopo un\'ora di parole, si stringono la mano.', '{0} costringe {1} e {2} a parlarsi. Non diventano amici, ma smettono di cercarsi.'],
      bully: ['{0} si piazza davanti a {1} e allunga la mano. {1} consegna {i} senza fiatare.', '{0} spiega a {1} che da oggi {i} cambia proprietario. {1} non trova argomenti validi.'],
      brawl: ['{0} e {1} si incrociano a {z} e finisce a botte. Nessuno vince, entrambi sanguinano.', 'Una parola di troppo tra {0} e {1}, e volano i pugni. Si separano ammaccati e furiosi.'],
      healStranger: ['{0} trova {1} ferit[1:o/a] e, senza chiedere niente, l[1:o/a] medica.', '{0} non conosce {1}, ma non riesce a lasciarl[1:o/a] sanguinare. L[1:o/a] ricuce in silenzio.'],
      gift: ['{0} regala {i} a {1}, che ha l\'aria di averne bisogno.', '{0} lascia {i} accanto a {1} che dorme. Nessun biglietto.'],
      show: ['{0} improvvisa uno spettacolo per le telecamere. Gli sponsor prendono appunti.', '{0} fa un discorso commovente alla telecamera più vicina. Il pubblico applaude.', '{0} si allena a torso nudo all\'alba, per nessun motivo pratico. Lo share sale.'],
      speech: ['{0} raduna l\'alleanza e fa un discorso da film. Funziona: tutti dormono meglio.', '{0} assegna i turni, divide le razioni e dà a ognuno un compito. Il gruppo respira.'],
      ritual: ['{0} dispone sassi in cerchio e recita una formula imparata dalla nonna. Si sente subito meglio.', '{0} bacia {i} tre volte prima di dormire. Non si sa mai.'],
      sleepwalk: ['{0} si alza nel sonno e cammina fino a {z}. Si sveglia lì, senza sapere come.', 'Gli altri vedono {0} passare nel buio, a occhi chiusi, diretto a {z}. Nessuno ha il coraggio di fermarl[0:o/a].'],
      madness: ['{0} passa la notte a discutere con un sasso. Il sasso, a quanto pare, ha torto.', '{0} dipinge una faccia sul proprio zaino e lo presenta a tutti come un nuovo alleato.', '{0} ride da sol[0:o/a] per un\'ora. Nessuno chiede perché.'],
      mishap: ['{0} inciampa nel buio e perde {i}. Addio.', '{0} si siede su un formicaio. Non è una metafora.', '{0} usa {i} come cuscino. Al mattino {i} non c\'è più.'],
      glutton: ['{0} si mangia {i} in un boccone, anche se non aveva fame. Domani se ne pentirà.', '{0} «assaggia» {i}. Ne resta solo il ricordo.'],
      drink: ['{0} svuota {i} fino all\'ultima goccia. La notte diventa più calda e molto più rumorosa.', '{0} brinda alla salute di tutti i presenti con {i}. Anche di quelli che vorrebbe morti.'],
      disinfect: ['{0} versa {i} sulla ferita infetta di {1}. Urla, ma la febbre scende.'],
      loner: ['{0} lascia l\'alleanza: troppa gente, troppe voci. Meglio sol[0:o/a].', '{0} se ne va prima dell\'alba. Non è niente di personale: è proprio fatto così.'],
      plan: ['{0} disegna una mappa nella polvere e ripassa il piano tre volte.', '{0} studia gli spostamenti degli altri e prende appunti mentali. Domani sarà pront[0:o/a].'],
      craftPoison: ['{0} intinge {ip} nel veleno, con molta, molta attenzione.', '{0} passa la notte a trattare {ip} col veleno. Ora basta un graffio.'],
      craftBomb: ['{0} combina la trappola con l\'esplosivo. Il risultato è piccolo, brutto e pericolosissimo.'],
      craftRepair: ['{0} rimette in sesto {ip} con l\'attrezzo giusto. Quasi come nuovo.', '{0} affila e sistema {ip} per tutta la notte.'],
      craftTrap: ['{0} costruisce una trappola con {i} e un po\' di ingegno.', 'Con {i} e quello che trova in giro, {0} si fa una trappola. Non è elegante, ma funziona.'],
      trade: ['{0} cede {i} a {1} in cambio di {j}. Affare fatto.', '{0} e {1} contrattano per un\'ora: alla fine {0} dà {i} e ottiene {j}.'],
      tradeGreedy: ['{1} vende {j} a {0} a peso d\'oro: {0} deve dare {i} e anche {k}.'],
      tradeFree: ['{1} vede la fame di {0} e [0:gli/le] regala {j}. «Me lo restituirai in un altro modo.»', '{1} lascia {j} a {0} senza chiedere niente in cambio.'],
      spyExpose: ['{0} sente {1} borbottare nel sonno come liberarsi di {2}. All\'alba lo racconta a tutti: {1} viene cacciat[1:o/a] dal gruppo.', '{0} scopre i piani di {1} contro {2} e li svela al gruppo. Per {1} non c\'è più posto.'],
      nightTheft: ['{0} sfila {i} dallo zaino di {1} mentre dorme. Mattina amara per {1}.', 'Nel buio, {0} alleggerisce lo zaino di {1}: sparisce {i}.'],
      confessYes: ['{0} trova il coraggio e confessa tutto a {1}. {1} sorride: era ora.', '{0} dice a {1} quello che prova. {1} non risponde: l[0:o/a] bacia.'],
      confessNo: ['{0} confessa i suoi sentimenti a {1}. {1} risponde che preferisce restare amic[1:o/a]. Silenzio imbarazzato fino all\'alba.', '{0} si dichiara a {1}, che arrossisce e cambia argomento. Molto, molto in fretta.'],
      letter: ['{0} scrive una lettera per {1} e la lascia sul suo zaino.', '{0} scrive a {1} una lettera piena di cancellature e la infila nel suo zaino.'],
      jealous: ['{0} vede {1} e {2} insieme e qualcosa si rompe. Non dice niente. Per ora.', 'La notizia di {1} e {2} arriva anche a {0}. Da quel momento, {0} guarda {2} in un altro modo.'],
      oath: ['{0} giura a {1} che nessuno l[1:o/a] toccherà finché c\'è l[0:ui/ei].', '{0} si mette di guardia davanti a {1} tutta la notte, senza che nessuno glielo chieda.'],
      hunt: ['{0} torna dalla caccia con {cibo} per tutta l\'alleanza.', '{0} esce all\'alba e rientra con {cibo}. Nessuno chiede come.'],
      paranoid: ['{0} dorme con un occhio aperto. Letteralmente.', '{0} sposta il proprio giaciglio tre volte durante la notte.'],
      forgiveQuiet: ['{0} decide di perdonare {1}. Non lo dice a nessuno, ma smette di cercarl[1:o/a].'],
      stalk: ['{0} segue le tracce di {1} fino a {z}.'],
      hide: ['{0} trova un nascondiglio a {z} e decide di non uscire per un po\'.'],
      armorSave: ['{0} viene colpit[0:o/a] in pieno, ma {ip} regge: {0} si rialza ammaccat[0:o/a], ma viv[0:o/a].', 'Il colpo era mortale, ma {ip} si spacca al posto di {0}.'],
      sponsorBonus: ['Nella cassa, per {0}, c\'è anche {i}.', 'Gli sponsor aggiungono {i}: hanno notato di cosa ha bisogno {0}.'],
      luckyFind: ['{0} inciampa su {i}. A volte la fortuna è solo guardare per terra.', '{0} trova {i} esattamente dove nessuno aveva guardato.'],
    },
    actsSoft: {
      bully: ['{0} convince {1} con le cattive a cedere {i}.'],
      brawl: ['{0} e {1} litigano a voce altissima a {z}. Ne escono male entrambi.'],
      healStranger: ['{0} difende {1} dalle chiacchiere di corridoio. Non erano nemmeno amici.'],
      nightTheft: ['{0} fa sparire {i} dall\'armadietto di {1}. Nessuno ha visto niente.'],
      craftPoison: ['{0} prepara un pettegolezzo velenosissimo da usare con {ip}.'],
      sleepwalk: ['{0} si addormenta in {z} e si sveglia lì, con l\'impronta della tastiera in faccia.'],
      plan: ['{0} scrive il piano per domani con tre evidenziatori diversi.', '{0} studia gli spostamenti degli altri e prende appunti. Domani sarà pront[0:o/a].'],
      paranoid: ['{0} controlla chi ha visualizzato le sue storie. Due volte.'],
    },

    /* il diario segreto: ciò che la diretta non racconta */
    diary: {
      grief: ['Di notte, {0} parla a bassa voce con {1}, come se fosse ancora lì.', '{0} conserva qualcosa che apparteneva a {1}. Non lo mostra a nessuno.', '{0} sogna {1}. Si sveglia piangendo e finge che sia il fumo.'],
      revenge: ['{0} ripassa ogni dettaglio della faccia di {1}. Non vuole sbagliare persona.', '{0} ha capito le abitudini di {1}: dove dorme, quando mangia, quando abbassa la guardia.', '{0} non ha più paura. Ha solo un nome in testa: {1}.'],
      crush: ['{0} guarda {1} dormire e si chiede se sia il momento giusto per dirglielo.', 'Ogni volta che {1} ride, {0} dimentica per un attimo dove si trova.', '{0} ha scritto il nome di {1} su un sasso, poi l\'ha nascosto. Imbarazzante.'],
      plot: ['{0} ha deciso: quando sarà il momento, {1} sarà il primo.', '{0} sorride a {1} durante la cena. Dentro, sta già contando i giorni.', '{0} ha studiato lo zaino di {1}: sa esattamente cosa prendere, dopo.'],
      guilt: ['{0} sogna {1}. Nel sogno, {1} non dice niente. Guarda e basta.', '{0} si lava le mani nel buio, anche se sono pulite.', '{0} si chiede se {1} avesse qualcuno ad aspettarl[1:o/a] a casa.'],
      pride: ['{0} tiene il conto: {n}. Il numero non l[0:o/a] spaventa più.', '{0} dorme benissimo. È questo, forse, il dettaglio più inquietante.'],
      hungry: ['{0} sogna {cibo} e si sveglia masticando l\'aria.', '{0} conta le provviste che non ha. Il conto è veloce.', 'La pancia di {0} brontola così forte che teme di farsi scoprire.'],
      fear: ['{0} trema per tutta la notte, e non è per il freddo.', '{0} sussulta a ogni rumore. Ce ne sono tanti.', '{0} si chiede, per la prima volta, se vale la pena continuare.'],
      hurt: ['{0} stringe i denti per non far sentire quanto fa male.', '{0} controlla la ferita ogni ora. Non migliora.'],
      debt: ['{0} sa di dovere qualcosa a {1}. Prima o poi ripagherà, e lo sa anche {1}.', '{0} non sopporta di essere in debito con {1}. Ci pensa più di quanto vorrebbe.'],
      grateful: ['{0} non l\'ha detto a voce alta, ma deve la vita a {1}. Ci pensa spesso.'],
      couple: ['{0} e {1} si raccontano come sarà dopo, se ci sarà un dopo.', '{0} tiene la mano di {1} mentre dorme. Solo per un minuto, dice.', '{0} ha già deciso: se resteranno in due, non alzerà un dito contro {1}.'],
      keepsake: ['{0} stringe {i} e per un attimo è di nuovo a casa.', '{0} guarda {i} a lungo prima di addormentarsi.'],
      keepsakeDead: ['{0} stringe {i} tra le mani. È tutto quello che resta di {1}.', '{0} rilegge {i} alla luce del fuoco. {1} non c\'è più, ma lì dentro sì.'],
      lonely: ['{0} non parla con nessuno da giorni. Ha iniziato a rispondersi da sol[0:o/a].', '{0} guarda il fuoco di un\'altra alleanza in lontananza e non sa se sia invidia o sollievo.'],
      star: ['{0} ripassa le pose migliori per le telecamere. Il pubblico, dopotutto, è un alleato.', '{0} ha capito come funziona: più fai spettacolo, più ti mandano regali.'],
      suspicion: ['{0} non si fida di {1}. Non c\'è un motivo preciso, ed è proprio questo il punto.', '{0} tiene d\'occhio {1}, che negli ultimi giorni è troppo gentile.'],
      rejected: ['{0} ripensa al no di {1}. Fa più male di qualunque ferita.'],
      jealousy: ['{0} non riesce a guardare {1} e {2} insieme. Si gira dall\'altra parte.'],
      calm: ['{0} pensa a casa e fa una lista di cose da fare quando uscirà. È una lista lunga.', '{0} guarda le stelle e prova a contarle per addormentarsi.', '{0} si chiede chi stia facendo il tifo per l[0:ui/ei], là fuori.', '{0} ripassa i nomi di chi è ancora in gara. Ogni sera la lista è più corta.', '{0} si rammenda i calzini con un filo d\'erba. Bisogna pur tenersi occupati.'],
      trait: {
        goloso: ['{0} nasconde un pezzo di {cibo} per i tempi difficili. Lo mangia subito.'],
        stratega: ['{0} ha un piano. E un piano di riserva. E uno per quando falliscono entrambi.'],
        codardo: ['{0} ha trovato un nascondiglio perfetto e non lo dirà a nessuno.'],
        ubriacone: ['{0} sogna una locanda calda e un bicchiere pieno. Si sveglia con la bocca secca.'],
        folle: ['{0} ha dato un nome a tutti i sassi della zona. Il preferito si chiama Gianfranco.'],
        superstizioso: ['{0} ha contato i corvi: sette. Sette è un buon numero. Forse.'],
        vendicativo: ['{0} ha una lista. Non è una lista della spesa.'],
        clemente: ['{0} prova a ricordare il viso di tutti, anche di quelli che l[0:o/a] hanno ferito. Non porta rancore. Quasi mai.'],
        leale: ['{0} ripete i nomi degli alleati prima di dormire, come una preghiera.'],
        traditore: ['{0} si esercita a sembrare sincer[0:o/a] davanti a una pozzanghera.'],
        esibizionista: ['{0} prova le battute per l\'intervista finale. È sicur[0:o/a] che ci sarà.'],
        paranoico: ['{0} ha sentito dei passi. Erano i suoi.'],
        romantico: ['{0} scrive poesie nella polvere e le cancella prima dell\'alba.'],
        solitario: ['{0} finalmente ha un po\' di silenzio. Lo assapora.'],
        sonnambulo: ['{0} si sveglia con le scarpe infangate e nessun ricordo della notte.'],
        pacifista: ['{0} si chiede se ci sia un modo per uscirne senza fare del male a nessuno.'],
        spietato: ['{0} affila l\'arma con una calma che mette i brividi.'],
        avido: ['{0} conta e riconta le cose nello zaino. Gli piace sentirle pesare.'],
        generoso: ['{0} pensa a chi ha meno di l[0:ui/ei]. È un pensiero scomodo, nell\'arena.'],
        leader: ['{0} non dorme finché tutti gli altri non dormono.'],
        guaritore: ['{0} prepara bende con quello che trova. Prima o poi serviranno.'],
        ingegnoso: ['{0} smonta e rimonta qualcosa per tutta la notte. Non si sa cosa.'],
        cacciatore: ['{0} legge le tracce degli altri concorrenti come un libro aperto.'],
        fortunato: ['{0} trova un quadrifoglio. Lo trova sempre.'],
        sfortunato: ['A {0} piove addosso. Solo a {0}.'],
        furtivo: ['{0} ha passato la notte a osservare gli altri senza farsi vedere. Sa più cose di quante ne dirà.'],
        impulsivo: ['{0} ha deciso di cambiare piano tre volte in un\'ora.'],
        bruto: ['{0} fa flessioni nel buio per tenersi caldo. E per farsi sentire.'],
        carismatico: ['{0} sa già chi convincerà domani. E come.'],
        sopravvissuto: ['{0} ha visto di peggio. Davvero.'],
      },
    },
    diarySoft: {
      pride: ['{0} aggiorna la lista dei rivali fatti fuori: {n}. Non le fa più effetto.'],
      guilt: ['{0} si sente in colpa per {1}. Un po\'.'],
      hurt: ['{0} rilegge i commenti cattivi su di sé, uno per uno.'],
      grief: ['{0} scrive un messaggio a {1}, che non è più nei giochi. Non lo invia.'],
      trait: { spietato: ['{0} aggiorna la sua lista di nemici. Con una certa soddisfazione.'], bruto: ['{0} fa flessioni davanti allo specchio del bagno. Per farsi sentire.'] },
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);

/* testi delle conseguenze legate agli oggetti, accanto a quelli dell'ecosistema */
(function (G) {
  const D = G.LOS_DATA; if (!D || !D.eco) return;
  D.eco.txt.armorBreak = ['{0} incassa il colpo: {ip} si sfascia, ma ha fatto il suo dovere.', '{0} ha parato l\'ultimo colpo con {ip}, che ora è da buttare.'];
  if (D.eco.txtSoft) D.eco.txtSoft.armorBreak = ['{0} incassa l\'ennesima frecciata: {ip} non regge più.'];
})(typeof window !== 'undefined' ? window : globalThis);
