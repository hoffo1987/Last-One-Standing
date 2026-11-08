/* Le relazioni: dimensioni dei legami, etichette, effetti dei ricordi, promesse,
 * voci di corridoio, pietà, rotture e ritorni, coalizioni, mentori, lutti.
 *
 * Ogni legame va da A verso B (può non essere ricambiato) e ha sei dimensioni:
 * f fiducia, l affetto, r rispetto (da -100 a 100), p paura, t attrazione,
 * k conoscenza (da 0 a 100). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});

  D.bonds = {
    dims: { f: 'Fiducia', l: 'Affetto', r: 'Rispetto', p: 'Paura', t: 'Attrazione', k: 'Conoscenza' },
    /* etichette da A verso B, dalla più forte; c = colore nella mappa */
    labels: {
      amore: { n: 'Amore', c: 'love', d: 'Fanno coppia.' },
      ex: { n: 'Ex', c: 'love', d: 'Erano una coppia. Ora non lo sono più.' },
      cotta: { n: 'Cotta segreta', c: 'love', d: 'Prova un\'attrazione segreta.' },
      complotto: { n: 'Bersaglio segreto', c: 'plot', d: 'Sta tramando contro questa persona.' },
      nemesi: { n: 'Nemesi', c: 'hate', d: 'La odia e la rispetta: è la sfida della sua vita.' },
      vendetta: { n: 'Vendetta', c: 'hate', d: 'Ha giurato di fargliela pagare.' },
      rivaleAmore: { n: 'Rivale in amore', c: 'hate', d: 'Amano la stessa persona.' },
      terrore: { n: 'Terrore', c: 'fear', d: 'Ne ha una paura folle.' },
      paura: { n: 'Paura', c: 'fear', d: 'Ne ha paura, e cerca di starle lontano.' },
      gratitudine: { n: 'Gratitudine', c: 'friend', d: 'Le deve la vita.' },
      fratelli: { n: 'Fratelli d\'armi', c: 'friend', d: 'Hanno combattuto e sono sopravvissuti insieme.' },
      amico: { n: 'Amico fidato', c: 'friend', d: 'Si fida e le vuole bene.' },
      mentore: { n: 'Mentore', c: 'friend', d: 'Ha imparato molto da questa persona.' },
      protetto: { n: 'Da proteggere', c: 'friend', d: 'Ha promesso di proteggerla.' },
      complice: { n: 'Complice', c: 'ally', d: 'La fiducia è reciproca, senza troppe smancerie.' },
      alleatoComodo: { n: 'Alleato di comodo', c: 'ally', d: 'Condividono il gruppo, senza vera fiducia.' },
      alleato: { n: 'Alleato', c: 'ally', d: 'Fanno parte dello stesso gruppo.' },
      rivale: { n: 'Rivale', c: 'rival', d: 'Non si piacciono, ma si rispettano.' },
      ammirazione: { n: 'Ammirazione', c: 'rival', d: 'La rispetta moltissimo.' },
      debito: { n: 'In debito', c: 'ally', d: 'Le deve un favore.' },
      colpa: { n: 'Senso di colpa', c: 'plot', d: 'Le ha fatto del male, e non se lo perdona.' },
      odio: { n: 'Odio', c: 'hate', d: 'Non la sopporta.' },
      diffidenza: { n: 'Diffidenza', c: 'rival', d: 'Non si fida per niente.' },
      antipatia: { n: 'Antipatia', c: 'rival', d: 'Le sta antipatica.' },
      simpatia: { n: 'Simpatia', c: 'friend', d: 'Le sta simpatica.' },
      conoscente: { n: 'Conoscente', c: 'none', d: 'Si conoscono, poco più.' },
    },
    /* quanto ogni ricordo sposta il legame di chi ricorda */
    memfx: {
      saved: { f: 30, l: 15, r: 10 }, cured: { f: 20, l: 12 }, shared: { f: 15, l: 10 }, denied: { f: -20, l: -10 }, robbed: { f: -40, l: -15 },
      hit: { f: -25, l: -15, p: 18 }, killedDear: { f: -60, l: -40, p: 10 }, allied: { f: 10, l: 5 }, betrayed: { f: -80, l: -40 }, gift: { f: 15, l: 12 },
      love: { t: 40, l: 20, f: 20 }, repaid: { f: 15 }, forgave: { l: 15 }, traded: { f: 6 }, fleeced: { f: -10, l: -8 }, warned: { f: 30, l: 15 },
      exposed: { l: -40, f: -30 }, mediated: { f: 10, l: 10, r: 10 }, trap: { f: -30, p: 15, l: -15 }, expelled: { f: -40, l: -25 }, comforted: { l: 20, f: 15 },
      tried: { f: -40, p: 30, l: -25 }, bullied: { p: 30, f: -30, l: -20 }, brawl: { l: -10, r: 8 }, rejected: { t: -15, l: -5 }, healedStranger: { f: 25, l: 20 },
      letter: { t: 15, l: 10 }, jealous: { l: -25 }, nightTheft: { f: -50 }, oath: { f: 20 }, recruited: { f: 10, l: 8 },
      sawKill: { p: 20, l: -8, r: 5 }, sawSave: { r: 8, l: 8 }, rumorBad: { f: -15, l: -10 }, rumorGood: { f: 10, l: 8 }, rumorFear: { p: 15 },
      promise: { f: 10 }, promiseKept: { f: 35, l: 15 }, promiseBroken: { f: -60, l: -30 }, spared: { r: 25, f: 10, l: 10 }, sparedThem: { l: 10 },
      breakup: { t: -30, l: -25, f: -15 }, reunion: { t: 30, l: 20, f: 10 }, rivalLove: { l: -20, r: 5 }, coalition: { f: 20, l: 10 }, mentor: { f: 20, l: 15, r: 20 },
      student: { l: 15 }, fought: { f: 15, l: 10 }, submitted: { p: 20, f: 5 }, protector: { l: 8 }, liedTo: { f: -30, l: -10 }, hardship: { l: 15, f: 10 },
      split: { f: -30, l: -20 }, guilt: { l: 5 },
    },
    /* nuovi ricordi, in prima persona */
    mem: {
      sawKill: 'Ho visto questa persona uccidere {2}.', sawSave: 'Ho visto questa persona salvare {2}.', rumorBad: 'Ho sentito cose brutte sul suo conto.', rumorGood: 'Tutti ne parlano bene.',
      rumorFear: 'Mi hanno detto di starle alla larga.', promise: 'Abbiamo fatto una promessa.', promiseKept: 'Ha mantenuto la promessa.', promiseBroken: 'Mi aveva promesso una cosa. Non l\'ha mantenuta.',
      spared: 'Poteva uccidermi. Non l\'ha fatto.', sparedThem: 'Ho avuto la sua vita in mano. L\'ho lasciata andare.', breakup: 'La nostra storia è finita.', reunion: 'La nostra coppia si è ricomposta.',
      rivalLove: 'Ci piace la stessa persona.', coalition: 'Abbiamo fatto fronte comune contro {2}.', mentor: 'Mi ha insegnato come sopravvivere.', student: 'Ho insegnato tutto quello che so.',
      fought: 'Abbiamo combattuto fianco a fianco.', submitted: 'Ho chiesto la sua protezione.', protector: 'Mi ha chiesto protezione.', liedTo: 'Mi ha raccontato una bugia.',
      hardship: 'Abbiamo superato insieme il peggio.', split: 'Per colpa sua il gruppo si è spaccato.', guilt: 'Il male che ho fatto non me lo perdono.',
    },
    memSoft: { sawKill: 'Ho visto questa persona far fuori {2}.', spared: 'Poteva farmi fuori. Non l\'ha fatto.', sparedThem: 'Potevo mettere fine alla sua gara. Ho scelto di fermarmi.', fought: 'Ci siamo coperti a vicenda.' },

    promises: {
      kinds: { fedelta: 'Fedeltà', protezione: 'Protezione', vendetta: 'Vendetta', cibo: 'Dividere il cibo' },
      make: {
        fedelta: ['{0} e {1} si giurano fedeltà con una stretta di mano lunghissima.', '{0} guarda {1} negli occhi: «Io non ti tradirò. Mai». {1} ci crede.'],
        protezione: ['{0} giura a {1} che l[1:o/a] proteggerà, costi quel che costi.', '{0} promette a {1}: «Finché ci sono io, nessuno ti tocca».'],
        vendetta: ['{1} fa promettere a {0}: «Se mi succede qualcosa, vendicami». {0} promette.', '{0} e {1} si fanno una promessa cupa: chi resta, vendicherà l\'altro.'],
        cibo: ['{0} promette a {1} che, finché avrà qualcosa da mangiare, lo dividerà.', '{0} e {1} si promettono di non mangiare mai da soli.'],
      },
      broken: {
        fedelta: ['Aveva giurato fedeltà a {1}. Il giuramento è durato {n}.'],
        protezione: ['{0} aveva promesso di proteggere {1}. Non c\'era, quando serviva.'],
        cibo: ['{0} aveva promesso di dividere il cibo con {1}. Stanotte mangia da sol[0:o/a].'],
      },
      kept: {
        protezione: ['Promessa mantenuta: {0} si è mess[0:o/a] tra {1} e il pericolo.'],
        vendetta: ['Promessa mantenuta: {0} ha vendicato {1}.', '{0} sussurra il nome di {1}. La promessa è mantenuta.'],
        cibo: ['{0} mantiene la parola: divide quel poco che ha con {1}.'],
      },
      trigger: ['{0} si ricorda della promessa fatta a {1}. Ora ha un nome da cercare: {2}.', 'Prima di andarsene, {1} aveva fatto promettere qualcosa a {0}. {0} non ha dimenticato: ora cerca {2}.'],
    },

    acts: {
      gossipBad: ['{0} racconta a {1} quello che ha fatto {2}. {1} non guarderà più {2} allo stesso modo.', 'Attorno al fuoco, {0} spiega a {1} perché di {2} non ci si può fidare.', '{0} abbassa la voce: «Te lo dico solo perché sei tu: su {2} ne ho sentite di tutti i colori». {1} prende nota.', '{0} elenca a {1}, uno per uno, i torti di {2}. La lista è lunga, e {1} la ascolta tutta.'],
      gossipGood: ['{0} parla benissimo di {2} con {1}. {1} comincia a fidarsi.', '{0} racconta a {1} di quando {2} l[0:o/a] ha aiutat[0:o/a]. {1} ascolta con attenzione.', '«Se devi fidarti di qualcuno, fidati di {2}», dice {0} a {1}. {1} ci pensa su.'],
      gossipFear: ['{0} avverte {1}: «Stai lontano da {2}. Ho visto cosa sa fare».', '{0} racconta a {1} cosa ha visto fare a {2}. {1} non dorme tranquill[1:o/a], dopo.', '{0} disegna una croce sulla mappa di {1}: «Lì c\'è {2}. Non andarci».'],
      gossipLie: ['{0} sussurra a {1} una storia su {2}. Non è vera, ma {1} ci crede.', '{0} inventa di sana pianta un tradimento di {2} e lo racconta a {1}. Funziona.', '{0} mostra a {1} un «indizio» contro {2}: un sasso, un nodo, una parola sentita a metà. A {1} basta.'],
      gossipCaught: ['{0} prova a mettere {1} contro {2}, ma {1} non ci casca. E se lo segna.', '{1} ascolta la storia di {0} su {2} e sorride: «Bella. Peccato che non sia vera».'],
      spare: ['Ma all\'ultimo {0} abbassa l\'arma: non riesce a uccidere {1}.', '{0} ha {1} in pugno. Poi l[1:o/a] lascia andare. Non sanno bene perché.', '{0} si ferma a un passo dal colpo finale. «Vattene», dice a {1}. {1} non se lo fa ripetere.'],
      breakup: ['{0} e {1} si lasciano. Nessuno grida: è peggio.', '{0} restituisce a {1} quello che {1} [0:gli/le] aveva regalato. È finita.', 'Dopo l\'ennesimo litigio, {0} dice a {1} che non ce la fa più. Si lasciano.'],
      breakupJealous: ['{0} ha visto come {1} guarda {2}. Basta così: si lasciano.'],
      reunion: ['{0} e {1} tornano insieme dopo giorni di sguardi. Il pubblico applaude.', '{0} trova {1} da sol[1:o/a] al buio. Restano in silenzio. Poi si abbracciano: sono di nuovo una coppia.'],
      triangle: ['{0} e {1} scoprono di avere una cotta per la stessa persona: {2}. Da ora sono rivali.'],
      coalition: ['{0} e {1} si mettono d\'accordo: insieme contro {2}. Da soli non avrebbero speranze.', '{0} e {1} hanno paura della stessa persona, {2}. La paura, a volte, unisce.'],
      submit: ['{0} ha troppa paura di {1}: si mette sotto la sua protezione e [1:gli/le] cede {i}.', '{0} si presenta da {1} a testa bassa, con {i} come offerta. {1} accetta il tributo.'],
      mentor: ['{0} insegna a {1} come sopravvivere: dove dormire, cosa mangiare, quando scappare.', '{0} passa la notte a insegnare a {1} tutto quello che sa. {1} prende appunti mentali.'],
      tribute: ['{0} si ferma dove è cadut[1:o/a] {1}. Erano rivali, ma l[1:o/a] rispettava.', '{0} lascia un sasso sul punto in cui è cadut[1:o/a] {1}. È il saluto tra rivali.'],
      split: ['{0} e {1} litigano davanti a tutto il gruppo. L\'alleanza si spacca in due.', 'Troppa diffidenza: {0} se ne va dall\'alleanza portandosi dietro chi la pensa come l[0:ui/ei], e lascia {1} con gli altri.'],
      drift: ['{0} raccoglie le sue cose e lascia {1}. Dopo quello che è successo, dormire nello stesso posto non è più possibile.', '{0} e {1} non si rivolgono più la parola. Al mattino prendono strade diverse: l\'alleanza è finita.', '{0} dice a {1} che non si fida più. Nessuna scenata: si separano e basta.'],
      leave: ['{0} lascia il gruppo: finché c\'è {1}, non può restare.', '{0} se ne va dall\'alleanza. Il motivo ha un nome solo: {1}.'],
      hardship: ['{0} e {1} hanno superato insieme il peggio di oggi. Il rancore tra loro sembra una cosa piccola.'],
      fadeGrudge: ['{0} si accorge di non pensare più a {1} con rabbia. Il rancore si è consumato da solo.'],
      guilt: ['{0} non riesce a guardare in faccia {1}. Quello che è successo pesa.'],
    },
    actsSoft: {
      spare: ['Ma all\'ultimo {0} ci ripensa: non se la sente di far fuori {1}.', '{0} potrebbe distruggere {1} con un messaggio. Lo cancella prima di inviarlo.'],
      tribute: ['{0} scrive due righe di saluto per {1}, che è uscit[1:o/a] dai giochi. Erano rivali, ma l[1:o/a] stimava.'],
    },
    diary: {
      sawKill: ['{0} ha visto {1} uccidere {2}. Non riesce a smettere di pensarci.', '{0} rivede la scena ogni volta che chiude gli occhi: {1}, {2}, e quel rumore.'],
      sawSave: ['{0} ha visto {1} salvare {2}. Forse non tutti, qui, sono mostri.'],
      relief: ['{0} sente la notizia: {1} non c\'è più. Per la prima volta da giorni, dorme.', '{0} non dirà mai ad alta voce di essere content[0:o/a] che {1} sia uscit[1:o/a] di scena. Ma lo è.'],
      fearless: ['{0} non deve più guardarsi le spalle da {1}. Si sente più legger[0:o/a].'],
      unrequited: ['{0} guarda {1} ridere con altri. Lo sa che non è ricambiat[0:o/a]. Lo sa benissimo.'],
      distrust: ['{0} sorride a {1}, ma non [1:gli/le] volta mai le spalle.', '{0} conta quante volte {1} ha mentito. Ha smesso di contare a cinque.'],
      admire: ['{0} osserva {1} combattere e pensa: «Vorrei essere così».'],
      guiltDiary: ['{0} pensa a {1} e a quello che è successo. Non riesce a perdonarsi.'],
      promiseWeight: ['{0} ripensa alla promessa fatta a {1}. Pesa più dello zaino.'],
      exThoughts: ['{0} vede {1} da lontano e fa finta di niente. Non [0:gli/le] riesce bene.'],
      rumorHeard: ['{0} ha sentito dire certe cose su {1}. Non sa se crederci. Ci crede un po\'.'],
    },
  };

  /* le voci per le nuove situazioni (unite a quelle di _voices.js dal motore) */
  D.bonds.voice = {
    spare: { _: ['Vattene. Prima che cambi idea.', 'Non oggi. Non tu.', 'Ti devo qualcosa. Ora siamo pari.', 'Vai. E non farti più vedere.'] },
    promise: { _: ['Giuramelo.', 'Promesso. Su quello che ho di più caro.', 'Una promessa è una promessa.', 'Se manco alla parola, sei liber[1:o/a] di odiarmi.'] },
    breakup: { _: ['Non è colpa tua. Cioè, un po\' sì.', 'Ci siamo voluti bene. Basta così.', 'Restiamo amici? No, eh?'] },
  };
  D.bonds.voiceSoft = { spare: { _: ['Per stavolta ti salvi.', 'Non ne vale la pena.', 'Mi stai simpatic[1:o/a]. Purtroppo.'] } };
})(typeof window !== 'undefined' ? window : globalThis);
