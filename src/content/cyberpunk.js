/* Night City — Zona Rossa: voci, conversazioni, azioni, diario e testi automatici propri.
 * Sostituiscono o affiancano i testi comuni che parlano di fuochi, boschi, stelle o sponsor;
 * le altre arene continuano a usare i testi di sempre.
 * Personaggi di contorno ricorrenti (originali): Nonna Kiku (fixer), Doc Ferraglia (ripperdoc),
 * DJ Saetta (Radio Zona Rossa), Gino (distributore parlante), Pixel (gatto olografico). */
(function (G) {
  const D = G.LOS_DATA; if (!D) return;
  const ID = 'cyberpunk';
  const more = (o, k, l) => { o[k] = (o[k] || []).concat(l); };

  /* ---------- battute sotto gli eventi ---------- */
  const put = (kind, list) => { const v = D.voice && D.voice[kind]; if (!v) return; (v.arena = v.arena || {})[ID] = list; };
  put('kill', ['Biochip spento.', 'Contratto chiuso.', 'Niente di personale: solo eddie.', 'Il cromo non ti ha salvato.', 'Night City non si ricorda di nessuno.', 'Disconnessione completata.', 'Ti avevo detto di aggiornare il firmware.', 'Saluta Gino da parte mia.', 'Riavvio negato.', 'Un nome in meno sul megaschermo.']);
  put('last', ['Dite al fixer che il lavoro non l’ho finito.', 'Almeno questa volta non mi hanno fregato gli impianti.', 'Speravo in un’uscita di scena più al neon.', 'Il mio backup... qualcuno ha fatto il backup?', 'Avevo ancora tre rate da pagare. Ah, ah.', 'DJ Saetta, metti qualcosa di bello.', 'Ditelo a Nonna Kiku. Con delicatezza.', 'Errore 404: futuro non trovato.']);
  put('revenge', ['Questo è per {2}. Con gli interessi.', '{2} ti manda i suoi saluti. Dal cloud.', 'Ho scaricato tutto quello che sapevi su {2}. Ora tocca a te.']);
  put('betray', ['Era un contratto a tempo. È scaduto.', 'Night City insegna una cosa sola, e te l’ho appena insegnata.', 'Non prenderla male: ho solo cambiato fixer.', 'L’alleanza era in prova. Non hai superato il periodo di prova.']);
  put('ally', ['Metà dei rischi, metà della paga.', 'Io controllo i droni, tu le porte.', 'Se ti friggono gli impianti, ti porto alla Clinica. Promesso.', 'Affare fatto. Niente clausole scritte in piccolo.', 'Tu porti il cromo, io porto il cervello.', 'Se Nonna Kiku chiede, siamo cugini.']);
  put('love', ['In tutta Night City, proprio tu.', 'Quando usciamo dal distretto, ti porto a vedere il mare vero.', 'Le insegne mentono. Tu no.', 'Ti salverei anche il backup.', 'Hai il battito più bello che le mie ottiche abbiano mai misurato.', 'Neanche in braindance mi sono mai sentit[0:o/a] così.']);
  put('saved', ['Te ne devo una. In eddie o in favori, scegli tu.', 'Stavo per riavviarmi definitivamente. Grazie.', 'Il mio diagnostico dice che sei una brava persona. È la prima volta che lo dice.', 'Ok. Ok. Respiro. Gli impianti respirano.']);
  put('taunt', ['Torna quando avrai il cromo giusto.', 'Gonk.', 'Hai l’ICE di un tostapane.', 'Le tue ottiche sono di seconda mano. Si vede.', 'Ti ha installato gli impianti tuo cugino, vero?', 'Ci vediamo sul megaschermo. Tu in versione «ricercat[1:o/a]».']);
  put('sponsor', ['Grazie, Nonna Kiku! Mangio, mangio.', 'Un regalo dal fixer? Ora sono preoccupat[0:o/a].', 'Lo apro piano. Non si sa mai.', 'Ringrazio i fixer, la Clinica e il mio ripperdoc di fiducia.']);
  put('disaster', ['Odio questa città.', 'Qualcuno spenga la rete, vi prego.', 'Ancora viv[0:o/a], ancora senza eddie.', 'Questo non era nel contratto.', 'DJ Saetta, se mi senti: aiuto.', 'Mi rimborsa qualcuno? No? Immaginavo.']);
  put('feast', ['Prima i biscotti di Nonna Kiku, poi le armi.', 'Prendo la cassa più piccola: nessuno la guarda mai.', 'Se è una trappola, almeno è una trappola gratis.']);

  /* ---------- conversazioni notturne ---------- */
  if (D.chats) {
    const A = D.chats.arena || (D.chats.arena = {});
    more(A, ID, [
      ['Quanto sovraccarico hai?', 'Abbastanza da vedere le pubblicità anche a occhi chiusi.'],
      ['Ti fidi del fixer?', 'Mi fido degli eddie del fixer. Del fixer, no.'],
      ['Domani passiamo dal Mercato?', 'Domani passiamo dove non ci sono droni. Se esiste.'],
      ['Hai mai visto il cielo senza smog?', 'Una volta, in una braindance. Era finto anche quello.'],
      ['Senti anche tu quel ronzio?', 'Sono le insegne. O i miei impianti. Spero le insegne.'],
      ['Cosa farai con la tua parte?', 'Un biglietto per fuori città. Solo andata.'],
      ['Hai sentito DJ Saetta stasera?', 'Ha dedicato una canzone «a chi non ce la farà». Simpatico.'],
      ['Secondo te Gino ce l’ha con me?', 'Gino ce l’ha con tutti. È un distributore con dei sentimenti.'],
      ['Chi è questa Nonna Kiku?', 'Una che ha ottantadue anni, un braccio cromato e una lista. Non vuoi essere sulla lista.'],
      ['Doc Ferraglia sa davvero quello che fa?', 'Sa cantare. Sul resto, diciamo che è ottimista.'],
      ['Se esco di qui mi tolgo tutti gli impianti.', 'E poi come fai a sapere che ore sono?'],
      ['Hai mai provato a toccare Pixel?', 'Tutti ci hanno provato. Pixel vince sempre.'],
      ['Perché la chiamano Zona Rossa?', 'Per le insegne. Almeno, all’inizio era per le insegne.'],
      ['Mi presti il cyberdeck?', 'Ti presto un rene, prima. Il cyberdeck no.'],
      ['Secondo te ci stanno guardando?', 'In diretta su tre canali, con le quote delle scommesse in sovrimpressione.'],
      ['Ti ricordi com’era prima della chiusura?', 'Uguale. Ma con il permesso di uscire.'],
    ]);
  }

  /* ---------- azioni dei concorrenti ---------- */
  const M = D.mind; if (!M) return;
  (M.actsArena = M.actsArena || {})[ID] = {
    recruit: ['{0} convince {1} a unirsi al gruppo: «A Night City da soli si dura una notte».', '{0} offre a {1} un posto nella capsula-letto e un’alleanza. {1} accetta.', '{0} parla con {1} per mezz’ora sotto una tettoia. Alla fine si stringono la mano: ora fanno parte della stessa alleanza.', '{0} mostra a {1} un contratto scritto su un tovagliolo del Mercato. Clausola unica: «Non tradirsi prima di domani». {1} firma.'],
    mediate: ['{0} si mette in mezzo tra {1} e {2} e li obbliga a dividere una scatola di noodle. A metà scatola smettono di guardarsi male.', '{0} costringe {1} e {2} a parlarsi davanti a Gino il distributore, che commenta ogni frase. Ridono, e la lite finisce.'],
    bully: ['{0} si piazza davanti a {1}, fa scrocchiare le nocche cromate e allunga la mano. {1} consegna {i} senza fiatare.', '{0} spiega a {1} che nel quartiere c’è una nuova tassa, e che si paga in {i}. {1} paga.'],
    brawl: ['{0} e {1} si incrociano in {z} e finisce a pugni sotto un’insegna che lampeggia. Nessuno vince, il sangue sì.', 'Una parola di troppo tra {0} e {1}, e volano pugni cromati. Si separano tra lividi e scintille.'],
    healStranger: ['{0} trova {1} ferit[1:o/a] in un vicolo e, senza chiedere niente, l[1:o/a] medica con la colla chirurgica.', '{0} non conosce {1}, ma non riesce a lasciarl[1:o/a] sanguinare sotto la pioggia acida. L[1:o/a] ricuce in silenzio.'],
    gift: ['{0} regala {i} a {1}, che ha l’aria di averne bisogno.', '{0} lascia {i} accanto a {1} che dorme, con un post-it olografico: «Offre la casa».'],
    show: ['{0} improvvisa una diretta per le telecamere dei fixer. Le visualizzazioni salgono.', '{0} fa un discorso commovente al drone più vicino. Chi guarda la diretta applaude.', '{0} si mette in posa sotto un’insegna al neon, per nessun motivo pratico. I fixer prendono nota.', '{0} commenta la partita in diretta come un telecronista, compreso il proprio nome. Il canale pirata che l[0:o/a] trasmette raddoppia gli spettatori.'],
    speech: ['{0} raduna l’alleanza e divide i compiti: chi controlla i droni, chi le porte, chi gli impianti. Il gruppo respira.', '{0} fa un discorso da film sulla fine delle corporazioni. Funziona: tutti dormono meglio.', '{0} legge all’alleanza le regole della notte, scritte a pennarello sul braccio: «Niente luci, niente nomi, niente eroi».'],
    ritual: ['{0} tocca {i} tre volte prima di dormire. Non si sa mai.', '{0} recita a bassa voce la preghiera stampata su un santino del quartiere. Si sente subito meglio.', '{0} riavvia gli impianti nello stesso ordine di ogni sera. Il rito calma più del diagnostico.', '{0} accende per un minuto l’insegna di un tempio di quartiere e chiede una cosa sola. Non la dice a nessuno.'],
    sleepwalk: ['{0} si alza nel sonno e cammina fino a {z}. Si sveglia lì, con le ottiche accese e nessun ricordo del percorso.', 'Gli altri vedono {0} passare nel buio, a occhi chiusi, in direzione di {z}. Nessuno ha il coraggio di fermarl[0:o/a].'],
    madness: ['{0} passa la notte a discutere con un distributore automatico. Il distributore, a quanto pare, ha torto.', '{0} dipinge una faccia sul proprio zaino e lo presenta a tutti come un nuovo socio.', '{0} ride da sol[0:o/a] per un’ora davanti a una pubblicità di impianti. Nessuno chiede perché.', '{0} prova a convincere Pixel, il gatto olografico, a fondare un partito politico.'],
    mishap: ['{0} inciampa nel buio e perde {i} in un tombino. Addio.', '{0} si siede su una presa di corrente scoperta. Non è una metafora.', '{0} usa {i} come cuscino. Al mattino {i} non c’è più.', '{0} appoggia {i} su un robot delle pulizie che passava. Il robot se lo porta via, con efficienza.'],
    glutton: ['{0} si mangia {i} in un boccone, anche se non aveva fame. Domani se ne pentirà.', '{0} «assaggia» {i} davanti a un’insegna di ramen. Ne resta solo il ricordo.'],
    drink: ['{0} svuota {i} fino all’ultima goccia. La notte diventa più calda, più rumorosa e più al neon.', '{0} brinda alla salute del distretto con {i}. Anche delle parti del distretto che vorrebbe veder bruciare.'],
    disinfect: ['{0} versa {i} sulla ferita infetta di {1}. Urla, ma la febbre scende.'],
    loner: ['{0} lascia l’alleanza: troppa gente, troppi biochip vicini. Meglio sol[0:o/a].', '{0} se ne va prima dell’alba. Non è niente di personale: a Night City funziona così.'],
    plan: ['{0} proietta la mappa del quartiere su un muro e ripassa il piano tre volte.', '{0} studia gli spostamenti degli altri dalle telecamere di un negozio e prende appunti. Domani sarà pront[0:o/a].', '{0} ripassa a mente le vie di fuga, una per una, finché non le sa a memoria.', '{0} disegna il piano per domani sul vetro appannato di una capsula-letto, con le frecce.'],
    craftPoison: ['{0} carica il veleno nell’impugnatura di {ip}, con molta, molta attenzione.', '{0} passa la notte a trattare {ip} con una tossina del Mercato. Ora basta un graffio.'],
    craftBomb: ['{0} combina la trappola con l’esplosivo e un timer preso da una sveglia a forma di gatto. Il risultato è piccolo, brutto e pericolosissimo.'],
    craftRepair: ['{0} rimette in sesto {ip} con l’attrezzo giusto e un aggiornamento scaricato da una rete pubblica. Quasi come nuov[0:o/a].', '{0} pulisce, regola e ricalibra {ip} per tutta la notte.'],
    craftTrap: ['{0} costruisce una trappola con {i} e due batterie prese da un monopattino.', 'Con {i} e quello che trova nei cassonetti, {0} si fa una trappola. Non è elegante, ma funziona.'],
    trade: ['{0} cede {i} a {1} in cambio di {j}. Affare fatto, senza ricevuta.', '{0} e {1} contrattano per un’ora come al Mercato: alla fine {0} dà {i} e ottiene {j}.'],
    tradeGreedy: ['{1} vende {j} a {0} a prezzo da corporazione: {0} deve dare {i} e anche {k}.'],
    tradeFree: ['{1} vede la fame di {0} e [0:gli/le] regala {j}. «Me lo restituirai in un altro modo.»', '{1} lascia {j} a {0} senza chiedere niente in cambio. A Night City, è quasi un miracolo.'],
    nightTheft: ['{0} sfila {i} dallo zaino di {1} mentre dorme. Mattina amara per {1}.', 'Nel buio di un blackout, {0} alleggerisce lo zaino di {1}: sparisce {i}.'],
    confessYes: ['{0} trova il coraggio e confessa tutto a {1} sotto un’insegna rosa. {1} sorride: era ora.', '{0} dice a {1} quello che prova. {1} non risponde: l[0:o/a] bacia mentre le insegne cambiano colore.'],
    confessNo: ['{0} confessa i suoi sentimenti a {1}. {1} risponde che preferisce un rapporto di amicizia. Gino il distributore, in sottofondo, dice «Ahia».', '{0} si dichiara a {1}, che arrossisce e cambia argomento. Molto, molto in fretta.'],
    letter: ['{0} registra un messaggio per {1} e lo lascia sul suo zaino, in uno shard.', '{0} scrive a {1} un messaggio pieno di cancellature e lo infila nel suo zaino.'],
    jealous: ['{0} vede {1} e {2} insieme sotto le luci del Club, e qualcosa si rompe. Non dice niente. Per ora.', 'La notizia di {1} e {2} arriva anche a {0}, in diretta su un canale pirata. Da quel momento, {0} guarda {2} in un altro modo.'],
    oath: ['{0} giura a {1} che nessuno l[1:o/a] toccherà finché c’è l[0:ui/ei], e se lo scrive sul braccio con il pennarello.', '{0} si mette di guardia davanti alla capsula di {1} tutta la notte, senza che nessuno glielo chieda.'],
    hunt: ['{0} torna da un giro tra i distributori con {cibo} per tutta l’alleanza.', '{0} esce all’alba e rientra con {cibo}. Nessuno chiede da dove venga.', '{0} convince Gino il distributore a fare uno sconto all’alleanza. Gino cede, e sputa {cibo}.'],
    paranoid: ['{0} dorme con le ottiche accese. Letteralmente.', '{0} cambia nascondiglio tre volte durante la notte.', '{0} copre con il nastro adesivo tutte le telecamere visibili dalla capsula. Poi anche quelle che non vede.'],
    stalk: ['{0} segue il segnale del biochip di {1} fino a {z}.', '{0} segue le tracce di {1} fino a {z}, leggendo le ricevute dei distributori.'],
    hide: ['{0} trova un vano tecnico dietro le insegne in {z} e decide di non uscire per un po’.'],
    armorSave: ['{0} viene colpit[0:o/a] in pieno, ma {ip} regge: {0} si rialza ammaccat[0:o/a], ma viv[0:o/a].', 'Il colpo era mortale, ma {ip} si spacca al posto di {0}. Il cromo ringrazia.'],
    sponsorBonus: ['Nella consegna, per {0}, c’è anche {i}.', 'Il fixer aggiunge {i}: ha capito di cosa ha bisogno {0}.', 'Nonna Kiku infila nella cassa anche {i}, con un biglietto: «Mangia».'],
    luckyFind: ['{0} inciampa su {i}. A volte la fortuna è solo guardare per terra.', '{0} trova {i} in un cassonetto dove nessuno aveva guardato.', 'Pixel il gatto olografico si siede sopra {i}. {0} lo raccoglie: nessuno lo reclama.'],
  };

  /* ---------- diario segreto ---------- */
  (M.diaryArena = M.diaryArena || {})[ID] = {
    lonely: ['{0} non parla con nessuno da giorni. Ha iniziato a rispondere alle pubblicità.', '{0} guarda le luci di un’altra alleanza dalla finestra di un palazzo e non sa se sia invidia o sollievo.', '{0} saluta Gino il distributore ogni mattina. Gino risponde. È già qualcosa.'],
    calm: ['{0} pensa a cosa farà fuori dal distretto e fa una lista. È una lista lunga.', '{0} guarda le insegne lampeggiare e prova a contarle per addormentarsi.', '{0} si chiede chi stia guardando la sua diretta, là fuori.', '{0} ascolta la pioggia sul tetto della capsula. Per un momento sembra il suono di casa.'],
    crush: ['{0} guarda {1} dormire e si chiede se sia il momento giusto per dirglielo.', 'Ogni volta che {1} ride, {0} dimentica per un attimo dove si trova.', '{0} ha salvato una foto di {1} in un angolo della memoria delle ottiche. Imbarazzante.'],
    keepsakeDead: ['{0} stringe {i} tra le mani. È tutto quello che resta di {1}.', '{0} guarda {i} alla luce di un’insegna. {1} non c’è più, ma in quel ricordo sì.'],
    star: ['{0} ripassa le pose migliori per i droni dei fixer. Il pubblico, dopotutto, è un alleato.', '{0} ha capito come funziona: più fai notizia, più i fixer ti mandano roba.'],
    hungry: ['{0} sogna {cibo} e si sveglia masticando l’aria.', '{0} conta le razioni che non ha. Il conto è veloce.', 'Lo stomaco di {0} brontola così forte che teme di farsi sentire dai droni.'],
    fear: ['{0} trema per tutta la notte, e non è per il freddo dei condizionatori.', '{0} sussulta a ogni drone che passa. Ne passano tanti.', '{0} si chiede, per la prima volta, se vale la pena continuare.'],
    grief: ['Di notte, {0} parla a bassa voce con {1}, come se fosse ancora lì.', '{0} riguarda per l’ennesima volta la registrazione delle ottiche in cui {1} ride.', '{0} manda un messaggio al numero di {1}. Il messaggio resta lì, senza la seconda spunta.'],
    pride: ['{0} tiene il conto: {n}. Il numero non l[0:o/a] spaventa più.', '{0} dorme benissimo. È questo, forse, il dettaglio più inquietante.'],
    guilt: ['{0} sogna {1}. Nel sogno, {1} non dice niente. Guarda e basta, con le ottiche spente.', '{0} si chiede se {1} avesse qualcuno ad aspettarl[1:o/a] fuori dal distretto.'],
    suspicion: ['{0} non si fida di {1}. Non c’è un motivo preciso, ed è proprio questo il punto.', '{0} ha controllato il registro dei biochip: {1} era nel posto sbagliato al momento sbagliato. Due volte.'],
    trait: {
      leale: ['{0} ripete i nomi degli alleati prima di dormire, come una password da non dimenticare.'],
      traditore: ['{0} si esercita a sembrare sincer[0:o/a] davanti al riflesso di una vetrina.'],
      codardo: ['{0} ha trovato un nascondiglio perfetto dietro un’insegna e non lo dirà a nessuno.'],
      spietato: ['{0} pulisce l’arma alla luce di un’insegna, con una calma che mette i brividi.'],
      pacifista: ['{0} si chiede se ci sia un modo per uscirne senza fare del male a nessuno. Anche solo uno.'],
      stratega: ['{0} ha un piano. E un piano di riserva. E uno per quando il fixer cambia idea.'],
      impulsivo: ['{0} ha deciso di cambiare piano tre volte in un’ora, ogni volta per colpa di un’insegna diversa.'],
      cacciatore: ['{0} legge le tracce dei droni sul cemento bagnato come un libro aperto.'],
      guaritore: ['{0} controlla le scorte di colla chirurgica. Prima o poi serviranno.'],
      sopravvissuto: ['{0} ha visto di peggio. Davvero. Una volta il distretto è rimasto senza caffè per una settimana.'],
      carismatico: ['{0} sa già chi convincerà domani. E con quale battuta.'],
      paranoico: ['{0} ha sentito dei passi. Erano i suoi. Il diagnostico conferma.'],
      fortunato: ['{0} trova sempre un distributore funzionante. Sempre.'],
      sfortunato: ['A {0} piove acido addosso. Solo a {0}.'],
      furtivo: ['{0} ha passato la notte a osservare gli altri dai tetti. Sa più cose di quante ne dirà.'],
      bruto: ['{0} fa flessioni nel buio per tenersi svegli[0:o/a] e per farsi sentire.'],
      ingegnoso: ['{0} smonta e rimonta un vecchio cyberdeck per tutta la notte. Non si sa per fare cosa.'],
      folle: ['{0} ha dato un nome a tutti i droni della zona. Il preferito si chiama Gianfranco.'],
      romantico: ['{0} scrive poesie sul vetro appannato di una capsula-letto e le cancella prima dell’alba.'],
      vendicativo: ['{0} ha una lista salvata nelle ottiche. Non è la lista della spesa.'],
      clemente: ['{0} prova a ricordare il viso di tutti, anche di quelli che l[0:o/a] hanno ferit[0:o/a]. Non porta rancore. Quasi mai.'],
      generoso: ['{0} pensa a chi ha meno di l[0:ui/ei]. A Night City è un pensiero scomodo.'],
      avido: ['{0} conta e riconta le cose nello zaino. [0:Gli/Le] piace sentirle pesare.'],
      esibizionista: ['{0} prova le battute per l’intervista finale con DJ Saetta. È sicur[0:o/a] che ci sarà.'],
      ubriacone: ['{0} sogna un bancone del Club e un bicchiere pieno. Si sveglia con la bocca secca.'],
      superstizioso: ['{0} ha contato le insegne rotte sulla strada: sette. Sette è un buon numero. Forse.'],
      goloso: ['{0} nasconde un pezzo di {cibo} per i tempi difficili. Lo mangia subito.'],
      sonnambulo: ['{0} si sveglia con le scarpe bagnate di pioggia acida e nessun ricordo della notte.'],
      leader: ['{0} non dorme finché tutta l’alleanza non dorme. Poi controlla i droni. Poi forse dorme.'],
      solitario: ['{0} finalmente ha un po’ di silenzio, sul tetto, tra le antenne. Lo assapora.'],
    },
  };

  /* ---------- testi automatici dell'ecosistema: più varianti ---------- */
  const T = D.eco && D.eco.arenas[ID] && D.eco.arenas[ID].txt; if (!T) return;
  more(T, 'meterUp', ['Le ottiche di {0} cominciano a sottotitolare i pensieri degli altri. Sono tutti sbagliati: è il sovraccarico neurale.', '{0} sente il proprio braccio cromato fare un commento sarcastico. Il sovraccarico neurale ha superato la soglia.', 'Il diagnostico di {0} mostra un messaggio nuovo: «Consigliamo una vacanza». Il sovraccarico neurale è alto.']);
  more(T, 'meterDeath', ['Gli impianti di {0} mandano un ultimo messaggio di errore e si spengono tutti insieme. Il biochip segue poco dopo.']);
  more(T, 'meterRest', ['{0} dorme mentre {1} tiene il diagnostico sulle ginocchia e spegne i moduli che scaldano, uno alla volta. Il sovraccarico neurale scende.']);
  more(T, 'forage', ['{0} convince Gino il distributore che è un ispettore della qualità. Gino, terrorizzato, consegna {cibo}.', '{0} aiuta un cuoco di strada a riaccendere la piastra e viene pagat[0:o/a] in natura: {cibo}.']);
  more(T, 'beastHit', ['{mostro} passa per il vicolo dove dorme {0}. {0} si sveglia in tempo per scappare, ma non per scappare indenne.']);
  more(T, 'beastFend', ['{mostro} ronda intorno al riparo del gruppo di {0}. Il gruppo spegne tutto, trattiene il fiato e aspetta: passa oltre.']);
  more(T, 'nurse', ['{0} ricuce {1} seguendo un tutorial in diretta di Doc Ferraglia. Il Doc canta anche durante il tutorial.']);
  more(T, 'watch', ['{0} fa la guardia a {1} con una radiolina sintonizzata su Radio Zona Rossa, a volume bassissimo.']);
  more(T, 'exhausted', ['{0} si addormenta in piedi in fila davanti a un distributore. Il distributore aspetta educatamente.']);
  more(T, 'comfort', ['{0} fa vedere a {1} una vecchia registrazione di Pixel il gatto olografico che rincorre un raggio laser. {1} ride per la prima volta da giorni.']);
  more(T, 'remorse', ['{0} cancella la registrazione delle proprie ottiche. Poi la recupera dal cestino. Poi la cancella di nuovo.']);
  more(T, 'bloodlust', ['{0} ha cominciato a segnare le proprie vittime con piccoli adesivi sul braccio cromato. Sono adesivi a forma di stella.']);
  more(T, 'share', ['{0} divide {i} con {1} sul tetto, sotto la pioggia, con una cerimonia degna di un ristorante stellato.']);
  more(T, 'greed', ['{0} mangia {i} nascost[0:o/a] dietro un distributore. Il distributore lo racconta a {1}.']);
  more(T, 'trapSet', ['{0} nasconde {i} in {z}, dietro la pubblicità olografica di un materasso. Nessuno guarda mai le pubblicità dei materassi.']);
  more(T, 'scavenge', ['{0} trova in {z} lo zaino di {1}, abbandonato accanto a un distributore, e ci recupera {i}.']);
  more(T, 'starveDeath', ['{0} muore di fame davanti a una vetrina piena di ramen olografici. Nessuno di quei ramen era vero.']);
})(typeof window !== 'undefined' ? window : globalThis);
