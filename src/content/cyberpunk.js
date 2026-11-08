/* Night City — Zona Rossa: voci, conversazioni, azioni e diario propri dell'arena.
 * Sostituiscono i testi comuni che parlano di fuochi, boschi, stelle o sponsor;
 * le altre arene continuano a usare i testi di sempre. */
(function (G) {
  const D = G.LOS_DATA; if (!D) return;
  const ID = 'cyberpunk';
  const put = (kind, list) => { const v = D.voice && D.voice[kind]; if (!v) return; (v.arena = v.arena || {})[ID] = list; };
  put('kill', ['Biochip spento.', 'Contratto chiuso.', 'Niente di personale: solo eddie.', 'Il cromo non ti ha salvato.', 'Night City non si ricorda di nessuno.']);
  put('last', ['Dite al fixer che il lavoro non l’ho finito.', 'Almeno questa volta non mi hanno fregato gli impianti.', 'Speravo in un’uscita di scena più al neon.', 'Il mio backup... qualcuno ha fatto il backup?']);
  put('ally', ['Metà dei rischi, metà della paga.', 'Io controllo i droni, tu le porte.', 'Se ti friggono gli impianti, ti porto alla Clinica. Promesso.']);
  put('love', ['In tutta Night City, proprio tu.', 'Quando usciamo dal distretto, ti porto a vedere il mare vero.', 'Le insegne mentono. Tu no.']);
  put('taunt', ['Torna quando avrai il cromo giusto.', 'Gonk.', 'Hai l’ICE di un tostapane.']);
  put('disaster', ['Odio questa città.', 'Qualcuno spenga la rete, vi prego.', 'Ancora vivo, ancora senza eddie.']);
  if (D.chats) {
    const A = D.chats.arena || (D.chats.arena = {});
    A[ID] = (A[ID] || []).concat([
      ['Quanto sovraccarico hai?', 'Abbastanza da vedere le pubblicità anche a occhi chiusi.'],
      ['Ti fidi del fixer?', 'Mi fido degli eddie del fixer. Del fixer, no.'],
      ['Domani passiamo dal Mercato?', 'Domani passiamo dove non ci sono droni. Se esiste.'],
      ['Hai mai visto il cielo senza smog?', 'Una volta, in una braindance. Era finto anche quello.'],
      ['Senti anche tu quel ronzio?', 'Sono le insegne. O i miei impianti. Spero le insegne.'],
      ['Cosa farai con la tua parte?', 'Un biglietto per fuori città. Solo andata.'],
    ]);
  }
  const M = D.mind; if (!M) return;
  (M.actsArena = M.actsArena || {})[ID] = {
    recruit: ['{0} convince {1} a unirsi al gruppo: «A Night City da soli si dura una notte».', '{0} offre a {1} un posto nella capsula-letto e un’alleanza. {1} accetta.', '{0} parla con {1} per mezz’ora, sotto una tettoia. Alla fine si stringono la mano: ora fanno parte della stessa alleanza.'],
    show: ['{0} improvvisa una diretta per le telecamere dei fixer. Le visualizzazioni salgono.', '{0} fa un discorso commovente al drone più vicino. Chi guarda la diretta applaude.', '{0} si mette in posa sotto un’insegna al neon, per nessun motivo pratico. I fixer prendono nota.'],
    speech: ['{0} raduna l’alleanza e divide i compiti: chi controlla i droni, chi le porte, chi gli impianti. Il gruppo respira.', '{0} fa un discorso da film sulla fine delle corporazioni. Funziona: tutti dormono meglio.'],
    ritual: ['{0} tocca {i} tre volte prima di dormire. Non si sa mai.', '{0} recita a bassa voce la preghiera stampata su un santino del quartiere. Si sente subito meglio.', '{0} riavvia gli impianti nello stesso ordine di ogni sera. Il rito calma più del diagnostico.'],
    sleepwalk: ['{0} si alza nel sonno e cammina fino a {z}. Si sveglia lì, con le ottiche accese e nessun ricordo del percorso.', 'Gli altri vedono {0} passare nel buio, a occhi chiusi, in direzione di {z}. Nessuno ha il coraggio di fermarl[0:o/a].'],
    madness: ['{0} passa la notte a discutere con un distributore automatico. Il distributore, a quanto pare, ha torto.', '{0} dipinge una faccia sul proprio zaino e lo presenta a tutti come un nuovo socio.', '{0} ride da sol[0:o/a] per un’ora davanti a una pubblicità di impianti. Nessuno chiede perché.'],
    mishap: ['{0} inciampa nel buio e perde {i} in un tombino. Addio.', '{0} si siede su una presa di corrente scoperta. Non è una metafora.', '{0} usa {i} come cuscino. Al mattino {i} non c’è più.'],
    hunt: ['{0} torna da un giro tra i distributori con {cibo} per tutta l’alleanza.', '{0} esce all’alba e rientra con {cibo}. Nessuno chiede da dove venga.'],
    plan: ['{0} proietta la mappa del quartiere su un muro e ripassa il piano tre volte.', '{0} studia gli spostamenti degli altri dalle telecamere di un negozio e prende appunti. Domani sarà pront[0:o/a].', '{0} ripassa a mente le vie di fuga, una per una, finché non le sa a memoria.'],
    letter: ['{0} registra un messaggio per {1} e lo lascia sul suo zaino, in uno shard.', '{0} scrive a {1} un messaggio pieno di cancellature e lo infila nel suo zaino.'],
    paranoid: ['{0} dorme con le ottiche accese. Letteralmente.', '{0} cambia nascondiglio tre volte durante la notte.'],
    loner: ['{0} lascia l’alleanza: troppa gente, troppi biochip vicini. Meglio sol[0:o/a].', '{0} se ne va prima dell’alba. Non è niente di personale: a Night City funziona così.'],
    sponsorBonus: ['Nella consegna, per {0}, c’è anche {i}.', 'Il fixer aggiunge {i}: ha capito di cosa ha bisogno {0}.'],
    luckyFind: ['{0} inciampa su {i}. A volte la fortuna è solo guardare per terra.', '{0} trova {i} in un cassonetto dove nessuno aveva guardato.'],
  };
  (M.diaryArena = M.diaryArena || {})[ID] = {
    lonely: ['{0} non parla con nessuno da giorni. Ha iniziato a rispondere alle pubblicità.', '{0} guarda le luci di un’altra alleanza dalla finestra di un palazzo e non sa se sia invidia o sollievo.'],
    calm: ['{0} pensa a cosa farà fuori dal distretto e fa una lista. È una lista lunga.', '{0} guarda le insegne lampeggiare e prova a contarle per addormentarsi.', '{0} si chiede chi stia guardando la sua diretta, là fuori.'],
    crush: ['{0} guarda {1} dormire e si chiede se sia il momento giusto per dirglielo.', 'Ogni volta che {1} ride, {0} dimentica per un attimo dove si trova.', '{0} ha salvato una foto di {1} in un angolo della memoria delle ottiche. Imbarazzante.'],
    keepsakeDead: ['{0} stringe {i} tra le mani. È tutto quello che resta di {1}.', '{0} guarda {i} alla luce di un’insegna. {1} non c’è più, ma in quel ricordo sì.'],
    star: ['{0} ripassa le pose migliori per i droni dei fixer. Il pubblico, dopotutto, è un alleato.', '{0} ha capito come funziona: più fai notizia, più i fixer ti mandano roba.'],
    hungry: ['{0} sogna {cibo} e si sveglia masticando l’aria.', '{0} conta le razioni che non ha. Il conto è veloce.', 'Lo stomaco di {0} brontola così forte che teme di farsi sentire dai droni.'],
    trait: {
      superstizioso: ['{0} ha contato le insegne rotte sulla strada: sette. Sette è un buon numero. Forse.'],
      fortunato: ['{0} trova sempre un distributore funzionante. Sempre.'],
      romantico: ['{0} scrive poesie sul vetro appannato di una capsula-letto e le cancella prima dell’alba.'],
      sonnambulo: ['{0} si sveglia con le scarpe bagnate di pioggia acida e nessun ricordo della notte.'],
      ubriacone: ['{0} sogna un bancone del Club e un bicchiere pieno. Si sveglia con la bocca secca.'],
      folle: ['{0} ha dato un nome a tutti i droni della zona. Il preferito si chiama Gianfranco.'],
      traditore: ['{0} si esercita a sembrare sincer[0:o/a] davanti al riflesso di una vetrina.'],
      bruto: ['{0} fa flessioni nel buio per tenersi svegli[0:o/a] e per farsi sentire.'],
      guaritore: ['{0} controlla le scorte di colla chirurgica. Prima o poi serviranno.'],
      ingegnoso: ['{0} smonta e rimonta un vecchio cyberdeck per tutta la notte. Non si sa per fare cosa.'],
      cacciatore: ['{0} legge le tracce dei droni sul cemento bagnato come un libro aperto.'],
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
