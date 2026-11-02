/* Ufficio Open Space — eventi aggiuntivi e disastri (si viene licenziati, nessuno muore). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.ufficio = {
    extra: {
      b: `
1 +med:A | {A} si porta una scorta di caffè solubile nel cassetto.
1 @stl | {A} si mette le cuffie e finge di essere in call.
1 s:A=ferito | {A} sbaglia il nome del proprio capo nella prima mail.
2 al:AB @soc | {A} e {B} scoprono di aver fatto la stessa università.
2 k:A>B | {A} si prende il parcheggio di {B}, che arriva in ritardo e viene licenziat[B:o/a].
3 | {A}, {B} e {C} si contendono l'ultimo caricabatterie rimasto in sala riunioni.
`,
      d: `
1 @int | {A} scrive un report talmente chiaro che il capo lo inoltra a tutti.
1 +arma:A @stl | {A} trova {arma} nella stampante condivisa.
1 | {A} passa la mattina a sistemare le cartelle sul desktop.
1 s:A=malato | {A} lavora dodici ore di fila e comincia a vedere i fogli Excel anche a occhi chiusi.
1 need:A=malato cure:A *2 | {A} si prende un giorno di ferie e torna come nuov[A:o/a].
1 d:A | {A} risponde "a tutti" a una mail piena di insulti al Direttore.
1 d:A | {A} viene sorpres[A:o/a] a giocare al computer durante una riunione con il cliente.
1 @mad | {A} decora la propria scrivania con piante finte e lucine natalizie a luglio.
1 @soc | {A} organizza la colletta per il compleanno del capo e diventa indispensabile.
1 +med:A @luck | {A} riceve una lettera di encomio dal cliente più importante.
2 k:A>B @int | {A} convince il capo che il progetto fallito era tutta un'idea di {B}.
2 k:A>B w:A @agg | {A} presenta {arma:A} alla riunione: {B} viene licenziat[B:o/a] in giornata.
2 al:AB @heal | {A} copre un errore di {B} e diventano alleati.
2 ally:AB | {A} e {B} si alternano a rispondere al telefono durante la pausa pranzo.
2 s:B=ferito @stl | {A} prenota la sala riunioni proprio quando serviva a {B}.
2 need:B=* cure:B @heal | {A} aiuta {B} a chiudere una pratica in ritardo.
2 tr:A>B | {A} riferisce all'ufficio Risorse umane le battute di {B} sul Direttore.
3 k:AB>C | {A} e {B} spostano tutte le riunioni di {C} a orari impossibili.
3 al:ABC @soc | {A}, {B} e {C} formano il comitato per la festa di Natale.
2 | {A} e {B} discutono per mezz'ora sulla temperatura del condizionatore.
`,
      n: `
1 | {A} aggiorna il curriculum di nascosto.
1 d:A | {A} si addormenta durante una call notturna con il cliente ed è fuori.
2 ally:AB | {A} e {B} finiscono la presentazione a mezzanotte, mangiando pizza fredda.
2 k:A>B @stl | {A} manda dal computer di {B} una mail molto sincera al Direttore.
`,
      f: `
1 @soc | {A} fa un discorso alla cena aziendale che commuove tutti.
1 d:A | {A} si siede per sbaglio al tavolo del Consiglio di amministrazione e ne combina di tutti i colori.
2 k:A>B | {A} filma {B} mentre balla sul tavolo e manda il video al Direttore.
`,
    },
    dis: `
Il nuovo software | L'azienda introduce un nuovo gestionale che nessuno sa usare. | {A} cancella per sbaglio l'intero archivio clienti. | {A} perde una giornata intera di lavoro. | {A} legge il manuale e diventa l'esperto dell'ufficio.
La fusione | L'azienda viene acquisita da una multinazionale. | {A} scopre che il proprio ruolo esiste già nell'altra azienda. | {A} viene spostat[A:o/a] in un ufficio senza finestre. | {A} viene promoss[A:o/a] a coordinatore della fusione.
Taglio dei costi | Il Direttore annuncia un taglio del dieci per cento del personale. | {A} è nella lista dei tagli. | {A} si vede ridurre lo stipendio. | {A} dimostra di essere indispensabile.
Il trasloco | L'ufficio trasloca in un'altra sede in periferia. | {A} non regge il pendolarismo e si dimette. | {A} perde gli scatoloni con tutti i documenti. | {A} sceglie la scrivania migliore della nuova sede.
Lo smart working forzato | Tutti a casa per un mese, con controlli a sorpresa via webcam. | {A} viene sorpres[A:o/a] in pigiama durante una call con il cliente. | {A} non riesce a collegarsi e perde una riunione importante. | {A} lavora meglio da casa che in ufficio.
La valutazione annuale | Arrivano le valutazioni di fine anno. | {A} riceve il voto più basso dell'azienda ed è fuori. | {A} riceve una valutazione mediocre. | {A} riceve un aumento.
L'hackeraggio | Un attacco informatico blocca tutti i computer. | {A} aveva aperto il link sospetto: licenziat[A:o/a]. | {A} perde una settimana di lavoro. | {A} aveva un backup di tutto.
La gita di team building | L'azienda organizza un weekend di team building in montagna. | {A} perde la gara di orientamento e il gruppo l[A:o/a] abbandona. | {A} si fa male durante il percorso sugli alberi. | {A} guida il gruppo alla vittoria.
Il nuovo capo | Arriva un nuovo capo che vuole cambiare tutto. | {A} contraddice il nuovo capo davanti a tutti. | {A} viene mess[A:o/a] in un progetto senza speranza. | {A} diventa il braccio destro del nuovo capo.
Il guasto all'aria condizionata | L'aria condizionata si rompe a luglio. | {A} sviene in sala riunioni ed è fuori per mesi. | {A} lavora tutto il giorno in un bagno di sudore. | {A} si sposta nella sala server, l'unica fresca. | malato
L'ispezione della sicurezza | Arriva un'ispezione sulla sicurezza sul lavoro. | {A} viene trovat[A:o/a] a bloccare un'uscita di emergenza con gli scatoloni. | {A} riceve un richiamo per la scrivania disordinata. | {A} supera l'ispezione a pieni voti.
L'open space rumoroso | I lavori di ristrutturazione al piano di sopra durano tutto il giorno. | {A} perde la pazienza e lancia la tastiera contro un muro. | {A} non riesce a concentrarsi e sbaglia un report. | {A} si mette le cuffie e lavora benissimo. | malato
La riunione infinita | Il Direttore convoca una riunione di otto ore. | {A} si addormenta durante la riunione ed è fuori. | {A} perde tutte le scadenze del giorno. | {A} porta il portatile e lavora di nascosto.
Il cliente furioso | Il cliente più importante minaccia di andarsene. | {A} viene sacrificat[A:o/a] per calmare il cliente. | {A} viene incolpat[A:o/a] e si prende un richiamo. | {A} salva il contratto con una telefonata.
Le nuove regole | L'ufficio Risorse umane pubblica un regolamento di cento pagine. | {A} infrange una regola senza saperlo ed è fuori. | {A} riceve un richiamo scritto. | {A} legge tutto e non sbaglia nulla.
La festa di Natale | La festa di Natale aziendale finisce fuori controllo. | {A} dice al Direttore quello che pensa dopo il terzo brindisi. | {A} si sveglia con un terribile mal di testa e arriva in ritardo. | {A} beve solo acqua tutta la sera.
Il controllo delle note spese | Il controllo di gestione esamina tutte le note spese. | {A} ha messo in nota spese una vacanza ai Caraibi. | {A} deve restituire dei rimborsi. | {A} non ha mai chiesto un rimborso.
La sostituzione con l'intelligenza artificiale | L'azienda introduce un programma che fa il lavoro di metà dell'ufficio. | {A} viene sostituit[A:o/a] dal programma. | {A} viene spostat[A:o/a] a controllare il programma. | {A} impara a usare il programma meglio di chiunque.
L'influenza dell'ufficio | Un virus si diffonde in tutto l'open space. | {A} resta a casa troppo a lungo e viene sostituit[A:o/a]. | {A} lavora con la febbre e sbaglia tutto. | {A} non si ammala. | malato
La gara di vendite | Il Direttore lancia una gara: chi vende meno se ne va. | {A} arriva ultim[A:o/a] nella classifica delle vendite. | {A} vende pochissimo e viene mess[A:o/a] sotto osservazione. | {A} vince la gara.
Il blackout | Un blackout cancella tutto il lavoro non salvato. | {A} perde la presentazione del giorno e non si riprende. | {A} deve rifare tutto da capo. | {A} aveva salvato ogni cinque minuti.
L'audit esterno | Arrivano i revisori esterni. | {A} non trova i documenti richiesti ed è fuori. | {A} viene interrogat[A:o/a] per ore. | {A} consegna tutto in perfetto ordine.
Lo sciopero | I sindacati proclamano uno sciopero generale. | {A} viene scelt[A:o/a] come capro espiatorio. | {A} deve coprire il lavoro di tre colleghi. | {A} si schiera dalla parte giusta.
Il premio di produzione | Viene annunciato un premio di produzione per un solo dipendente. | {A} perde la testa per invidia e insulta il vincitore. | {A} lavora così tanto da ammalarsi. | {A} vince il premio. | malato
Il nuovo stagista | Arriva uno stagista più bravo di tutti. | {A} viene sostituit[A:o/a] dallo stagista. | {A} deve insegnare tutto allo stagista. | {A} fa da mentore allo stagista.
La macchinetta del caffè | La macchinetta del caffè si rompe per una settimana. | {A} non regge la crisi d'astinenza e se ne va. | {A} lavora a metà della velocità. | {A} porta la propria moka in ufficio. | malato
Il Consiglio di amministrazione | Il Consiglio di amministrazione visita l'ufficio. | {A} si presenta in tuta da ginnastica. | {A} balbetta durante la presentazione. | {A} fa la presentazione migliore della giornata.
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
