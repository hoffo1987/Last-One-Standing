/* Le voci dei concorrenti: battute brevi che compaiono sotto gli eventi
 * («Marco: …») e conversazioni notturne tra alleati, coppie e rivali.
 * Ogni situazione ha frasi comuni, frasi per tratto e frasi per arena.
 * {0} chi parla, {1} l'altra persona, {2} una terza (per le vendette),
 * [0:o/a] accordo, lessico dell'arena ({arma}, {cibo}, {mostro}…). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {});

  D.voice = {
    kill: {
      _: ['Niente di personale.', 'Mi dispiace. Davvero.', 'Uno in meno.', 'Dovevi correre più veloce.', 'Te l\'avevo detto di stare lontano.', 'Non guardarmi così.', 'Era tu o io.', 'Scusa. Cioè, no.', 'Qualcuno doveva farlo.', 'Ricordati di me, lassù.'],
      trait: {
        spietato: ['Il prossimo.', 'Troppo facile.', 'Ne voglio ancora.', 'Silenzio, finalmente.'],
        esibizionista: ['Avete visto? Rallentatela al replay!', 'Questa va nel trailer.', 'Applausi, grazie, grazie.'],
        folle: ['Ops.', 'Era vivo? Ah, era vivo.', 'Ahahah! No, aspetta. Ahahah!'],
        bruto: ['Più grosso è, più rumore fa.', 'Ecco fatto.'],
        stratega: ['Esattamente come previsto.', 'Fase due completata.'],
        cacciatore: ['Le tracce non mentono mai.', 'Ti ho seguito per due giorni. Ne valeva la pena.'],
        codardo: ['Non volevo! Cioè, sì, ma non volevo!', 'Mi ha spaventato lui!'],
        pacifista: ['Perdonami. Ti prego, perdonami.', 'Non doveva andare così.'],
        sopravvissuto: ['Io resto in piedi. Sempre.'],
        impulsivo: ['Ho pensato dopo. Come sempre.'],
        avido: ['E ora, vediamo cosa c\'è nel tuo zaino.'],
        superstizioso: ['Lo dicevano le stelle.'],
      },
      arena: {
        classico: ['Il cannone suonerà per te.', 'Che il Bosco ti accolga.'],
        fantasy: ['Che le rune ti siano lievi.', 'Il drago ringrazia per la cena.'],
        scifi: ['Disconnesso.', 'Fine della trasmissione.', 'Ti ho tolto l\'ossigeno per farti un favore.'],
        zombie: ['Meglio così che diventare uno di loro.', 'Almeno non ti rialzerai. Spero.'],
        royale: ['GG.', 'Eliminato. Prossimo cerchio.', 'Rimani pure a guardare dagli spalti.'],
        horror: ['Ora fai parte della villa.', 'Saluta i fantasmi da parte mia.'],
        wasteland: ['Il deserto si prende tutto.', 'I tuoi stivali sono miei.'],
      },
    },
    last: {
      _: ['Dite a mia madre che... no, non ditele niente.', 'Proprio adesso che stavo vincendo.', 'Che giornata.', 'Avevo ancora un panino nello zaino.', 'Non è giusto.', 'Ci vediamo dall\'altra parte.', 'Almeno sono durat[0:o/a] più di qualcuno.', 'Lo sapevo che non dovevo uscire oggi.', 'Ditemi che almeno ero in favore di telecamera.', 'Mi è sempre piaciuto il mare.'],
      trait: {
        esibizionista: ['Fatemi un primo piano, almeno.', 'Che uscita di scena, però.'],
        romantico: ['Dite a {2} che l\'ho amat[2:o/a] davvero.', 'Avrei voluto un ultimo bacio.'],
        vendicativo: ['Tornerò a perseguitarti, {1}.', 'Non finisce qui, {1}.'],
        folle: ['Finalmente, un po\' di silenzio!', 'Ahah. Ah. Oh.'],
        codardo: ['Lo sapevo. Lo sapevo!'],
        sfortunato: ['Ovviamente. Ovviamente a me.'],
        clemente: ['Ti perdono, {1}. Più o meno.'],
        goloso: ['Il panino... qualcuno finisca il mio panino.'],
        superstizioso: ['Lo sapevo che era un brutto segno.'],
        traditore: ['Bella mossa, {1}. L\'avrei fatta anch\'io.'],
      },
      arena: {
        zombie: ['Se mi rialzo, non prendetela sul personale.', 'Mirate alla testa, eh.'],
        royale: ['Lag! Era lag!', 'Ma ero in zona sicura!'],
        horror: ['Le voci... adesso le sento chiaramente.', 'Non lasciatemi qui al buio.'],
        fantasy: ['Seppellitemi sotto un albero che parla.'],
        scifi: ['Spedite il mio corpo nello spazio. Con stile.'],
        wasteland: ['Bevetevi la mia acqua. Non sprecatela.'],
        classico: ['Ditelo al mio distretto. Ditegli che ci ho provato.'],
      },
    },
    revenge: { _: ['Questo è per {2}.', '{2} ti saluta.', 'Hai finito di contare, {1}. Per {2}.', 'Me l\'ero giurato. Per {2}.', 'Guardami negli occhi, {1}. Per {2}.'] },
    betray: { _: ['È stato un piacere. Davvero.', 'Non c\'è niente di personale nell\'arena.', 'Pensavi davvero che saremmo usciti in due?', 'Mi dispiace, ma solo un po\'.', 'Le alleanze finiscono. Io no.'], trait: { traditore: ['Te l\'avevo detto, il primo giorno: non fidarti di me.', 'Era scritto dal primo momento.'] } },
    ally: {
      _: ['Ti copro le spalle. Tu coprile a me.', 'Fino alla fine. O quasi.', 'Insieme si mangia meglio.', 'Allora è deciso: si dorme a turno.', 'Patto?', 'Se tradisci, ti trovo.'],
      trait: { leader: ['Da ora si fa a modo mio. E si sopravvive.'], paranoico: ['Va bene. Ma dormi lontano da me.'], leale: ['Hai la mia parola. E io la mantengo.'] },
      arena: { royale: ['Duo? Duo.', 'Tu prendi i rifornimenti, io copro.'], zombie: ['Se ti mordono, ti sparo. Se mi mordono, mi spari. D\'accordo?'], horror: ['Mai dormire da soli. Mai.'], fantasy: ['Che il giuramento sia sigillato dal sangue. Poco, per favore.'] },
    },
    love: {
      _: ['Non avevo previsto te.', 'Se usciamo di qui, ti porto a cena. Una vera.', 'Sei l\'unica cosa buona di questo posto.', 'Promettimi che non morirai stupidamente.', 'Ti ho visto il primo giorno e ho pensato: problemi.', 'Restiamo in due. Poi si vedrà.'],
      trait: { romantico: ['Ti ho scritto tre poesie. Te le leggo stanotte.', 'Ti amavo già prima di conoscerti.'], esibizionista: ['Baciami. No, girati, c\'è la telecamera.'], paranoico: ['Se è un trucco, è il trucco più bello del mondo.'] },
      arena: { zombie: ['Se mi trasformo, sarai il mio unico pasto. Romantico, no?'], horror: ['Anche se la villa ci divide, ti ritrovo.'], royale: ['Ti lascio l\'ultima cassa. Questo è amore.'] },
    },
    saved: { _: ['Te ne devo una. Anzi, tante.', 'Perché l\'hai fatto?', 'Non lo dimenticherò.', 'Ok. Ok. Respiro.', 'Mi hai salvato la vita. Che imbarazzo.'] },
    taunt: {
      _: ['Tutto qui?', 'Ritenta, sarai più fortunat[1:o/a].', 'La prossima volta mirerò meglio.', 'Questo è solo un assaggio.', 'Corri, {1}, corri.', 'Ci rivediamo presto.'],
      trait: { bruto: ['Ti piego in due.'], esibizionista: ['Sorridi, {1}, ti stanno riprendendo mentre perdi.'], spietato: ['La prossima volta non mi fermo.'], impulsivo: ['Non so perché l\'ho fatto. Ma lo rifarei.'] },
      arena: { royale: ['Sei rimasto senza scudo, eh?'], fantasy: ['Il tuo incantesimo era scaduto.'], wasteland: ['Benvenuto nel deserto.'] },
    },
    sponsor: { _: ['Grazie, grazie, vi amo tutti!', 'Lo sapevo che mi volevate bene.', 'Mamma, se mi guardi: hanno mandato un regalo!', 'Ringrazio gli sponsor e anche il mio parrucchiere.'], trait: { esibizionista: ['Il pubblico ha parlato. E ha buon gusto.'], avido: ['Solo questo? Ne voglio un altro.'] } },
    disaster: {
      _: ['Non oggi.', 'Sono ancora qui!', 'Ma chi le progetta queste cose?', 'Ok. Ok. Respiro.', 'Mai più. Mai più!'],
      arena: {
        classico: ['Il prossimo che mi parla di natura incontaminata, lo mordo.'], fantasy: ['La magia mi odia. Personalmente.'], scifi: ['Chi ha progettato questa stazione? Lo voglio conoscere.'],
        zombie: ['Ne ho visti troppi oggi. Troppi.'], royale: ['Bug. È sicuramente un bug.'], horror: ['La villa ride. Lo sento.'], wasteland: ['Il deserto non perdona. Ma oggi si è distratto.'],
      },
    },
    feast: { _: ['Prendo e scappo. Prendo e scappo.', 'È una trappola. Vado lo stesso.', 'C\'è il mio nome sopra, lo giuro.'] },
  };

  /* versioni senza sangue per il Liceo e l'Ufficio */
  D.voiceSoft = {
    kill: { _: ['Niente di personale, eh.', 'Ci vediamo a ricreazione. Ah, no.', 'Scusa, era necessario.', 'Saluti alla tua carriera.', 'Bye bye.', 'Lo dico con affetto: addio.'], arena: { liceo: ['Ti scrivo su WhatsApp. Forse.', 'Era una questione di media.'], ufficio: ['Ti mando un\'email di aggiornamento.', 'Restructuring. Nulla di personale.', 'Come da mia precedente email.'] } },
    last: { _: ['Non è finita qui.', 'Me ne ricorderò.', 'Va bene, vado. Ma con stile.', 'Almeno ho la giornata libera.'], arena: { liceo: ['Mia madre non deve saperlo.', 'Lo dico alla preside!'], ufficio: ['Ho ancora tre settimane di ferie da smaltire!', 'E il mio TFR?'] } },
    revenge: { _: ['Questo è per {2}.', 'Ti ricordi di {2}? Io sì.'] },
    taunt: { _: ['Tutto qui?', 'Che figura.', 'Bel tentativo.', 'Ci rivediamo in corridoio.'], arena: { ufficio: ['Mettiamolo a verbale.'], liceo: ['Screenshot fatto.'] } },
    disaster: { _: ['Non oggi.', 'Ce l\'ho fatta. Credo.', 'Mai più.'], arena: { liceo: ['La preside ce l\'ha con me.'], ufficio: ['Lo metto nel report del trimestre.'] } },
    feast: { _: ['Prendo un pezzo di torta e scappo.', 'Gratis? Arrivo.'] },
  };

  /* conversazioni notturne: due battute, secondo il rapporto */
  D.chats = {
    alleati: [
      ['Domani dove andiamo?', 'Dove non c\'è nessuno. Cioè, da nessuna parte.'],
      ['Secondo te ci tradiremo?', 'Sì. Ma non stasera.'],
      ['Fai tu il primo turno?', 'Faccio io il primo e anche il secondo, tanto non dormo.'],
      ['Hai ancora da mangiare?', 'Ho una cosa che sembrava {cibo} due giorni fa.'],
      ['Se resto indietro, non aspettarmi.', 'Non dirlo neanche per scherzo.'],
      ['Chi pensi che vinca?', 'Uno di noi due. Ovviamente.'],
    ],
    coppia: [
      ['Raccontami una cosa bella.', 'Tu. Fine della cosa bella.'],
      ['Quando usciamo, che facciamo?', 'Dormiamo. Per una settimana.'],
      ['Hai paura?', 'Solo di perderti. E di {mostro}. Soprattutto di {mostro}.'],
      ['Promettimi che non farai l\'eroe.', 'Prometto. Più o meno.'],
    ],
    rivali: [
      ['Ti tengo d\'occhio.', 'Anch\'io. Guarda che occhi.'],
      ['Questa zona è mia.', 'Mettici una bandierina, allora.'],
      ['La prossima volta non mi scappi.', 'La prossima volta porta qualcuno che sappia mirare.'],
      ['Dormi bene stanotte.', 'Detto da te suona come una minaccia.'],
    ],
    sconosciuti: [
      ['Tregua per stanotte?', 'Tregua. Ma tieni le mani dove posso vederle.'],
      ['Da dove vieni?', 'Da un posto dove si dormiva in un letto.'],
      ['Ti va di dividere il fuoco?', 'Il fuoco sì. Il cibo no.'],
      ['Hai visto passare qualcuno?', 'Solo te. E non mi sei piaciut[0:o/a].'],
    ],
    arena: {
      classico: [['Senti anche tu il cannone?', 'Lo sento sempre. Anche quando non suona.'], ['Domani attraversiamo il Fiume?', 'Domani attraversiamo il Fiume. Se il Fiume è d\'accordo.']],
      fantasy: [['Quell\'albero ci sta ascoltando.', 'Allora parla piano, che è permaloso.'], ['Sai leggere le rune?', 'So leggere i menu. È un inizio.']],
      scifi: [['Quanto ossigeno ti resta?', 'Abbastanza per lamentarmi fino a domani.'], ['Hai sentito quel rumore nei condotti?', 'Era il mio stomaco. Spero.']],
      zombie: [['Hai controllato se hai morsi?', 'Due volte. Controlla tu le mie spalle.'], ['Quanti colpi ti restano?', 'Tre. Più uno per me, se serve.']],
      royale: [['La zona si stringe verso nord.', 'Allora noi andiamo a sud. Per principio.'], ['Hai visto dove è caduta la cassa?', 'Sì. Anche altri dieci, però.']],
      horror: [['Anche tu senti il pianoforte?', 'Non c\'è nessun pianoforte nella villa.'], ['Chi ha spostato la sedia?', 'Non lo chiedere. Non lo chiedere mai.']],
      wasteland: [['Quanta acqua ci resta?', 'Mezza tanica e tanta speranza.'], ['Senti i motori?', 'Predoni. Spegni il fuoco. Subito.']],
      liceo: [['Hai fatto i compiti?', 'Ho fatto un\'alleanza. È uguale.'], ['Chi uscirà domani?', 'Chi ha parlato male di noi, spero.']],
      ufficio: [['Hai visto la mail delle 23?', 'L\'ho vista. Ho finto di non vederla.'], ['Ti fermi anche stasera?', 'Mi fermo da tre anni. Che differenza fa.']],
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);

/* più battute e conversazioni, per non sentire mai due volte la stessa frase */
(function (G) {
  const D = G.LOS_DATA; if (!D || !D.voice) return;
  const more = (o, k, l) => { o[k] = (o[k] || []).concat(l); };
  more(D.voice.kill, '_', ['Non me ne vanto. Ma neanche mi dispiace.', 'Dovevi restare a casa.', 'Un giorno racconterò questa storia. Non oggi.', 'Spero che ne sia valsa la pena. Per me.', 'Chiudi gli occhi. Ecco.']);
  more(D.voice.last, '_', ['Ho lasciato il gas acceso, a casa.', 'Ma io ero simpatic[0:o/a]!', 'Almeno esco di scena da protagonista.', 'Questa non la metto nel curriculum.', 'Salutatemi il mio gatto.', 'Era il mio giorno fortunato, secondo l\'oroscopo.']);
  more(D.voice.taunt, '_', ['Vuoi la rivincita? Mettiti in fila.', 'Ti è piaciuto? Ne ho ancora.', 'Questa te la ricorderai.', 'Sei più lent[1:o/a] di come pensavo.']);
  more(D.voice.saved, '_', ['Chiedimi qualunque cosa. Quasi qualunque.', 'Perché proprio io?', 'Adesso siamo legati, lo sai?']);
  more(D.voice.ally, '_', ['Io guardo a destra, tu a sinistra.', 'Se ci separiamo, ci troviamo al tramonto.', 'D\'accordo. Ma il cibo si divide a metà esatta.']);
  more(D.voice.love, '_', ['Non dirlo a nessuno. Anzi, dillo a tutti.', 'Quando tutto questo finisce, cucino io.', 'Ti avrei trovato anche fuori di qui.']);
  more(D.voice.disaster, '_', ['Che qualcuno spenga tutto questo!', 'Lo sapevo che oggi andava storto.', 'Sono viv[0:o/a]! Sono... sì, viv[0:o/a].']);
  const C = D.chats;
  more(C, 'alleati', [['Hai dormito?', 'Due ore. Le ho contate.'], ['Mi fido di te, sai?', 'Non dirlo ad alta voce. Porta sfortuna.'], ['Quanto manca alla fine?', 'Meno di ieri, più di domani.'], ['Se vinco io, ti dedico la vittoria.', 'Se vinco io, ti dedico il tuo funerale. Scherzo. Più o meno.'], ['Chi ci segue da stamattina?', 'Nessuno. Spero. Dormi con un occhio aperto.'], ['Hai un piano?', 'Ho mezzo piano. L\'altra metà la improvviso.']]);
  more(C, 'coppia', [['Ti ricordi il primo giorno?', 'Mi hai guardato come si guarda un nemico.'], ['Ho paura di perderti.', 'Allora non perdermi di vista.'], ['Cosa ti manca di più di casa?', 'Prima ti avrei detto il letto. Adesso niente: sei qui.'], ['Se domani va male...', 'Domani non va male. Dormi.']]);
  more(C, 'rivali', [['Sento ancora il tuo odore da qui.', 'È l\'odore della vittoria. Abituati.'], ['Hai fame?', 'Non abbastanza da accettare qualcosa da te.'], ['Prima o poi ci troveremo da soli.', 'Lo spero. Così la smettiamo con le chiacchiere.'], ['Hai paura di me?', 'Ho paura per te. È diverso.']]);
  more(C, 'sconosciuti', [['Non ci conosciamo, vero?', 'Ancora no. E forse è meglio così.'], ['Hai visto chi ha vinto ieri sera?', 'Ho visto chi ha perso. Bastava quello.'], ['Bel fuoco.', 'Grazie. Non è in vendita.'], ['Posso sedermi qui?', 'Puoi. Ma se russi, ti sposto.']]);
  const A = C.arena || (C.arena = {});
  more(A, 'classico', [['Quanto pesa il tuo zaino?', 'Meno di ieri. Mi preoccupa.'], ['Che fine ha fatto il festino?', 'È finito com\'era iniziato: male.']]);
  more(A, 'fantasy', [['Hai visto il drago, oggi?', 'L\'ho sentito. È bastato.'], ['Credi alle profezie?', 'Credo a quelle che mi fanno vincere.']]);
  more(A, 'scifi', [['Guarda la Terra da qui.', 'È piccola. Come le nostre possibilità.'], ['Chi ha programmato questa stazione?', 'Qualcuno che ci odiava. Molto.']]);
  more(A, 'zombie', [['Ti ricordi com\'era la città prima?', 'Rumorosa. Ora è solo rumorosa in un altro modo.'], ['Hai sentito? Qualcuno chiede aiuto.', 'Sì. È una trappola. È sempre una trappola.']]);
  more(A, 'royale', [['Hai visto la classifica?', 'Siamo nella top ten. Non dirlo, porta male.'], ['Quante munizioni hai?', 'Abbastanza per vincere, se nessuno sbaglia. Cioè, no.']]);
  more(A, 'horror', [['Hai chiuso la porta?', 'Sì. Ma non è la porta che mi preoccupa.'], ['Chi ha suonato il campanello?', 'Nessuno. Non c\'è un campanello.']]);
  more(A, 'wasteland', [['Hai mai visto il mare?', 'In foto. Era blu, credo.'], ['Domani si va verso la Diga?', 'Domani si va dove c\'è acqua. Cioè, verso la Diga.']]);
  more(A, 'liceo', [['Hai visto chi c\'era in Mensa?', 'Sì. E ho visto con chi parlava.'], ['Domani c\'è la verifica?', 'Domani c\'è la verifica e la mia fine.']]);
  more(A, 'ufficio', [['Ti hanno chiamato dalle risorse umane?', 'Due volte. Non ho risposto.'], ['Il Direttore ti ha salutato oggi?', 'Sì. Mi preoccupa moltissimo.']]);
})(typeof window !== 'undefined' ? window : globalThis);
