/* Ufficio Open Space — quarto pacchetto: riunioni infinite, mail in copia a tutti, la macchinetta del caffè
 * come centro diplomatico, il Direttore che passa alle spalle e lo stress che sale. Nessuno muore: si viene licenziati. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'ufficio',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+armatura:A ko:pr:A+15 | Lunedì mattina {A} arriva alle 8:01 e si aggiudica la scrivania vicino alla finestra, più {arma} e {armatura} lasciati dal collega precedente. || Lunedì mattina {A} arriva alle 8:01 e trova la scrivania vicino alla finestra già occupata da un cartello: «Riservata al consulente».
1 +attrezzo:A @int | Mentre gli altri si contendono le scrivanie, {A} si procura {attrezzo}. Il lunedì vince chi ha gli strumenti giusti.
1 @cow +cibo:A | {A} si chiude nello sgabuzzino della cancelleria con {cibo} e il portatile, e lavora da lì «in modalità concentrazione».
2 al:AB @soc | {A} e {B} si ritrovano in ascensore con il Direttore. Si scambiano uno sguardo di puro terrore: da quel momento sono alleati.
2 hit:A>B steal:A<B=arma @agg | {A} si appropria della presentazione di {B} rinominando il file. Il lunedì è spietato.
1 test:A=car12 ok:+amuleto:A ko:mo:A-10 | {A} porta i cornetti a tutto il piano e conquista la simpatia della segretaria del Direttore: {amuleto}. || {A} porta i cornetti a tutto il piano, ma sono alla crema e la segretaria del Direttore è intollerante.
`,
      d: `
1 stat:A>pr45 test:A=res13 ok:pr:A-30 ko:pr:A+10 | {A} chiude il portatile, esce nel Parcheggio e fa il giro dell'isolato due volte. Torna con lo stress dimezzato. || {A} esce a fare una pausa nel Parcheggio e incontra il Direttore che fuma. La pausa diventa una riunione.
1 con:A=attrezzo pr:A-20 | {A} usa {attrezzo:A} per riordinare tutte le scadenze in un foglio ordinato. Vedere le cose in colonna aiuta a respirare.
1 wx:pericolo pr:A+20 | Il server di posta va giù per tre ore, poi torna su e consegna tutte le mail insieme. {A} ne riceve trecento.
1 test:A=int13 ok:+med:A ko:pr:A+10 | {A} trova sul server condiviso la vecchia guida alle procedure di un collega andato in pensione: {med}. || {A} cerca una guida sul server condiviso e trova solo una cartella chiamata «NON APRIRE». La apre.
1 test:A=furt13 ok:+valore:A ko:s:A=ferito | {A} si infila nell'ufficio delle Risorse umane durante la pausa pranzo e trova {valore} sul tavolo. || {A} si infila nell'ufficio delle Risorse umane durante la pausa pranzo. Le Risorse umane pranzano alla scrivania.
1 test:A=sop12 ok:+cibo:A ok:+cibo:A ko:food:A-10 | {A} scopre la riunione dei dirigenti con il catering e passa davanti alla porta al momento giusto. || {A} prova a prendere qualcosa dal catering dei dirigenti. Un dirigente l[A:o/a] nota, e [A:gli/le] chiede un parere sul budget.
1 @luck +cibo:A mo:A+5 | Il collega del compleanno porta una torta enorme in Cucina e lascia a {A} la fetta più grande: {cibo}.
1 @mad mo:A+10 | {A} partecipa a una riunione di due ore senza dire una parola, annuendo ogni tanto. Esce con una promozione verbale.
1 star:A @show | {A} presenta il report trimestrale con un videoclip musicale fatto in casa. Il consiglio di amministrazione non sa come reagire. Il pubblico sì.
1 en:A+15 | {A} prenota la sala riunioni più piccola per «call riservata» e dorme un'ora con la telecamera spenta.
1 stat:A<mo30 mo:A+15 | {A} riceve una mail di un cliente che dice soltanto «Grazie, ci avete salvato». La stampa e la appende alla scrivania.
1 need:A=ferito test:A=car12 ok:hp:A+20 ko:hp:A-8 | {A} chiede un colloquio al Direttore per spiegare l'errore di ieri e ne esce con un incarico nuovo. || {A} chiede un colloquio al Direttore per spiegare l'errore di ieri. Il Direttore non ricordava l'errore. Ora sì.
1 test:A=cor14 ok:+arma:A ok:star:A ko:hp:A-20 | {A} entra nell'Ufficio del direttore mentre è in riunione e fotografa la lavagna con il piano di riorganizzazione. || {A} entra nell'Ufficio del direttore per fotografare la lavagna. La riunione era in videochiamata, e l[A:o/a] inquadrano tutti.
1 wx:calma pr:A-10 mo:A+5 | Il Direttore è in ferie. L'Open space respira. {A} pranza in Cucina con calma, come una persona.
1 wx:abbondanza +cibo:A food:A+10 | È venerdì e qualcuno ha portato le brioche per tutti: {A} ne prende tre e una se la mette in tasca.
1 trait:A=superstizioso pr:A-20 | {A} tocca la stessa pianta grassa sulla scrivania prima di ogni call. La pianta è l'unica cosa che non l[A:o/a] ha mai delus[A:o/a].
1 trait:A=ingegnoso +trap:A | {A} prepara un sondaggio interno con domande molto, molto ambigue. Chi risponde male finirà nella lista sbagliata.
1 trait:A=goloso food:A+20 | {A} scopre che il cassetto del collega in ferie è pieno di cioccolatini. Il collega rientra tra due settimane. Problema di domani.
1 trait:A=paranoico pr:A-10 en:A-10 | {A} rilegge la mail sei volte prima di premere invio. Poi la mette in bozze. Poi la cancella.
1 trait:A=esibizionista star:A mo:A+10 | {A} si presenta al lavoro in completo elegante di venerdì, «per fare colpo sul cliente». Non c'è nessun cliente. Fa colpo lo stesso.
1 trait:A=leader mo:A+10 pr:A-10 | {A} organizza le attività del team su una lavagna con i post-it colorati. Per la prima volta in un anno, tutti sanno cosa fare.
1 trait:A=solitario mo:A+10 | {A} si chiude in sala server con le cuffie per tutto il giorno. Il ronzio delle macchine è la musica più bella del mondo.
1 trait:A=stratega pr:A-10 | {A} studia l'organigramma come una mappa di guerra e calcola chi verrà promosso. Sbaglia di poco.
2 ally:AB test:A=int12 ok:pr:A-15 ok:pr:B-15 ko:pr:A+10 ko:pr:B+10 | {A} e {B} chiudono insieme la pratica più temuta del reparto in un pomeriggio. || {A} e {B} provano a chiudere insieme la pratica più temuta. La pratica ha delle sottopratiche.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} porta a {B} un caffè della macchinetta senza che {B} lo chieda. In ufficio è una dichiarazione d'amicizia eterna.
2 save:A>B @heal | {B} sta per premere «Rispondi a tutti» su una mail molto personale. {A} [B:gli/le] blocca la mano all'ultimo istante.
2 debt:B>A give:A>B=med @heal | {A} passa a {B} il file che salva la presentazione delle tre. {B} non lo dimenticherà.
2 crush:A>B rel:AB+15 | {A} prenota la sala riunioni accanto alla scrivania di {B} solo per poterl[B:o/a] guardare attraverso il vetro.
2 couple:AB pr:A-15 pr:B-15 mo:A+10 mo:B+10 | {A} e {B} prendono il caffè insieme alla macchinetta del secondo piano, quella che nessuno usa. Per dieci minuti l'ufficio non esiste.
2 hit:A>B @agg | {A} scopre che {B} ha presentato come suo il lavoro di {A} in riunione e risponde con una mail in copia al Direttore, con gli allegati.
2 enemy:AB test:A=furt13 ok:pr:B+20 ko:pr:A+15 | {A} sposta la riunione di {B} alle 8 di lunedì senza avvisarl[B:o/a]. || {A} prova a spostare la riunione di {B}, ma sbaglia e la sposta a tutto il reparto.
2 test:A=car12 ok:al:AB ko:rel:AB-10 | {A} propone a {B} di lavorare in coppia sul nuovo progetto. || {A} propone a {B} di lavorare in coppia. {B} risponde «sentiamoci la settimana prossima», che in ufficio vuol dire mai.
2 rival:AB @show rel:AB+5 | {A} e {B} si sfidano a chi arriva prima alla Sala stampanti quando si sente partire la stampa del Direttore. Arrivano insieme. La stampa era di qualcun altro.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} condivide con {B} la password del proprio computer. In ufficio è un gesto quasi intimo.
2 fear:A>B en:A-15 | {A} vede {B} far licenziare un consulente in tre minuti e da quel giorno [B:gli/le] sorride sempre, anche troppo.
2 ally:AB test:A=cor13 ok:pr:A-15 ok:pr:B-15 ok:rel:AB+10 ko:pr:A+15 | {A} e {B} si presentano insieme dalle Risorse umane per chiedere più personale, e lo ottengono. || {A} e {B} si presentano dalle Risorse umane per chiedere più personale. Ottengono un corso di gestione del tempo.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano chiusi in sala riunioni durante un blackout e scoprono di odiare tutti lo stesso consulente esterno. Nasce un'alleanza.
3 hit:A>B hit:A>C @agg | {A} scopre che {B} e {C} hanno organizzato un pranzo di team senza invitarl[A:o/a] e si vendica prenotando la stessa sala per un'ora di più.
3 ally:AB rel:AB+10 | {A} e {B} si scambiano uno sguardo mentre {C} spiega, per la terza volta nella stessa riunione, cos'è la sinergia.
2 k:A>B w:A @agg | {A} manda in copia al Direttore {arma:A}, con le prove contro {B}. {B} viene convocat[B:o/a] alle cinque e non torna alla scrivania.
2 k:A>B grudge:A>B | {A} fa arrivare alle Risorse umane quello che sa su {B}, per {caro:A}. Alle sei la scrivania di {B} è vuota.
1 d:A @mad | {A} risponde a una mail del Direttore con il messaggio che aveva scritto «solo per sfogarsi». Il messaggio parte.
1 d:A wx:pericolo | La riorganizzazione aziendale cancella il reparto di {A} con una mail di tre righe, alle 17:59 di venerdì.
`,
      n: `
1 pr:A+15 | Alle 23 arriva una mail del Direttore con oggetto «Urgente». {A} la vede e non dorme più.
1 test:A=res12 ok:en:A+10 ko:pr:A+20 | {A} resta in ufficio fino a tardi e finisce il report prima della scadenza. || {A} resta in ufficio fino a tardi e si accorge alle due di aver lavorato sulla versione sbagliata del file.
1 test:A=int12 ok:en:A+15 ko:pr:A+15 | La chat di reparto si accende alle 22. {A} mette lo stato «non disponibile» e va a dormire. || La chat di reparto si accende alle 22 e {A} risponde a tutto, fino all'una.
1 @stl en:A+15 | {A} spegne il telefono aziendale e lo chiude in un cassetto. Dorme otto ore come un essere umano.
1 con:A=amuleto pr:A-15 | {A} stringe {amuleto:A} e si ricorda di aver superato anche il colloquio più difficile della sua vita.
1 @luck +med:A | Durante la notte un collega gentile carica sul server la soluzione al problema di {A}: {med}. Firmato: «Un amico del terzo piano».
1 trait:A=sonnambulo en:A-10 | {A} manda nel sonno una mail a tutto il reparto con scritto soltanto «ok». Al mattino ha diciassette risposte.
1 trait:A=codardo pr:A+10 | {A} passa la notte a scrivere e cancellare una mail di dimissioni. Al mattino è in ufficio alle otto, puntuale.
1 trait:A=folle mo:A+10 | {A} passa la notte a creare un foglio Excel che calcola la felicità dei colleghi. Il risultato è sempre zero.
1 mo:A-10 | La newsletter aziendale delle 22 annuncia i nomi dei licenziati con un «ringraziamo per il prezioso contributo». {A} ne conosceva uno.
2 ally:AB pr:A-10 pr:B-10 en:A+10 | {A} e {B} si dividono le scadenze in una call notturna e si danno il cambio. Al mattino è tutto pronto.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} restano in ufficio fino a tardi solo per guardare insieme la città illuminata dalla vetrata.
2 crush:A>B rel:AB+10 | {A} mette «mi piace» a un vecchio post di {B} su LinkedIn alle due di notte. Poi passa l'ora successiva a pentirsene.
2 friend:AB give:A>B=med @heal | {B} è nel panico per la presentazione di domani. {A} [B:gli/le] manda le sue slide migliori e resta in chiamata finché non si calma.
2 enemy:AB test:A=furt13 ok:pr:B+20 ko:pr:A+15 | Di notte {A} rinomina tutti i file di {B} sul server condiviso. || Di notte {A} prova a rinominare i file di {B}, ma il server registra chi lo fa, e il log arriva al Direttore.
2 save:A>B @heal | {B} sta per inviare il report con i numeri sbagliati. {A} se ne accorge a mezzanotte e [B:gli/le] scrive in tempo.
2 trust:A>B fid:A>B+10 | {A} delega a {B} la risposta alla mail del Direttore. In ufficio non c'è fiducia più grande.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia sulla scrivania di {B} una ciambella della sala riunioni: «Ora siamo pari».
3 al:ABC @soc | {A}, {B} e {C} creano un gruppo chat segreto per sopravvivere alla riorganizzazione. Il nome del gruppo è «Resistenza». Al mattino sono una squadra.
2 k:A>B @stl | Di notte {A} inoltra alle Risorse umane una mail che {B} non avrebbe mai dovuto scrivere. Al mattino il badge di {B} non funziona più.
1 d:A pr:A+25 | {A} lavora tutta la notte, risponde a ogni mail e non dorme. Al mattino il medico aziendale l[A:o/a] manda a casa. Per sempre.
2 k:A>B trap:A | {A} lascia {trap:A} sulla scrivania di {B}. Il giorno dopo {B} firma senza leggere e si licenzia da sol[B:o/a].
`,
      f: `
1 +med:A +cibo:A @luck | Alla cena aziendale {A} vince la lotteria interna: {med} e {cibo}.
2 hit:A>B steal:A<B=cibo @agg | Alla cena aziendale {A} e {B} si contendono l'ultimo piatto del buffet. Lo vince {A}, con un sorriso da riunione.
2 al:AB @soc | Alla cena aziendale {A} e {B} si ritrovano allo stesso tavolo del karaoke. Dopo un duetto stonato sono alleati.
1 test:A=car13 ok:star:A ok:+amuleto:A ko:pr:A+20 | {A} fa il discorso di fine anno al posto del Direttore, che è in ritardo. Applausi in piedi. || {A} prende il microfono alla cena aziendale. Il Direttore arriva proprio a metà della sua imitazione.
2 k:A>B w:A @agg | Alla cena aziendale {A} proietta sul maxischermo {arma:A}. {B} lascia la cena, e l'azienda.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
