/* Carattere e prove legati alla situazione nelle arene senza violenza (Liceo, Ufficio).
 * La salute qui è la reputazione, l'indicatore è l'ansia o lo stress. Ogni evento scatta solo
 * se la condizione è vera adesso, e il tratto decide come va. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: ['liceo', 'ufficio'],
    ev: {
      d: `
1 stat:A<hp40 test:A=car12 ok:hp:A+20 ko:hp:A-5 | Con la reputazione a pezzi, {A} decide di affrontare le voci a viso aperto: chiede scusa dove serve e smentisce il resto. Funziona. || Con la reputazione a pezzi, {A} prova a smentire le voci, ma più parla e più sembra colpevole.
1 stat:A<hp40 trait:A=esibizionista star:A hp:A+15 | Mentre tutti parlano male di l[A:ui/ei], {A} ribalta la situazione con un'uscita così plateale che la gente dimentica perché ce l'aveva con l[A:ui/ei].
1 stat:A<hp40 trait:A=codardo mo:A-15 | {A} sente il proprio nome sussurrato a ogni angolo e passa la giornata a fingere di essere invisibile. Non lo è.
1 stat:A<en20 test:A=res12 ok:en:A+25 ko:pr:A+15 | Sfinit[A:o/a], {A} si concede un'ora vera di pausa, senza telefono. Torna come nuov[A:o/a]. || Sfinit[A:o/a], {A} decide di tirare avanti con un altro caffè. Il caffè tira avanti {A}, ma solo fino a mezzogiorno.
1 stat:A<mo25 trait:A=romantico mo:A+20 | Nel momento peggiore {A} riceve un messaggio da una persona speciale. Dice solo «come stai?». Basta.
1 stat:A<mo25 test:A=cor13 ok:mo:A+20 ko:s:A=sconvolto | {A} si chiude in bagno, si guarda allo specchio e si fa un discorso motivazionale. Esce a testa alta. || {A} si chiude in bagno per farsi coraggio. Ci resta un'ora e mezza.
1 stat:A>pr55 test:A=int12 ok:pr:A-30 ko:pr:A+10 | L'ansia è alle stelle. {A} prende un foglio e scrive tutte le cose da fare, in ordine, con le crocette. La lista fa meno paura del caos. || L'ansia è alle stelle. {A} prova a fare una lista delle cose da fare, ma la lista diventa lunga quattro pagine.
1 stat:A>pr55 trait:A=solitario pr:A-25 | {A} trova un angolo dove nessuno l[A:o/a] cerca e ci resta un'ora in silenzio. Quando torna, il mondo è più piccolo.
1 stat:A>pr55 trait:A=superstizioso pr:A-20 | {A} rispetta tutti i suoi rituali: la penna fortunata, il passo con il piede destro, la stessa merenda di sempre. L'universo, per oggi, collabora.
1 stat:A>pr55 con:A=attrezzo pr:A-25 | {A} usa {attrezzo:A} per mettere ordine nel caos della giornata. Una cosa alla volta, il respiro torna normale.
1 stat:A<food30 trait:A=goloso test:A=furt12 ok:+cibo:A ok:+cibo:A ko:hp:A-10 | Affamat[A:o/a], {A} trova il punto debole della macchinetta degli snack. Due merendine al prezzo di zero. || Affamat[A:o/a], {A} prova a scuotere la macchinetta degli snack. La macchinetta resiste, e qualcuno filma tutto.
1 stat:A<food30 trait:A=generoso mo:A+10 food:A-5 | Anche se ha fame, {A} offre la propria merenda a chi sembra averne più bisogno. Lo stomaco protesta, la reputazione no.
1 wx:pericolo trait:A=stratega pr:A-15 | La giornata è un disastro per tutti, ma {A} l'aveva prevista: aveva preparato tutto la sera prima.
1 wx:calma trait:A=leader mo:A+10 pr:A-10 | Approfittando della giornata tranquilla, {A} organizza il proprio gruppo: chi fa cosa, quando, come. Tutti respirano meglio.
1 goal:A=spettacolo star:A test:A=car12 ok:mo:A+15 ko:hp:A-10 | {A} prepara un'entrata a effetto davanti a tutti. Riesce perfettamente. || {A} prepara un'entrata a effetto davanti a tutti. Inciampa sulla soglia.
1 goal:A=nascondersi test:A=furt12 ok:pr:A-15 ok:en:A+10 ko:pr:A+10 | {A} passa la giornata senza farsi notare da nessuno, nemmeno dalla persona che l[A:o/a] cercava. || {A} cerca di passare inosservat[A:o/a], ma tutti continuano a chiedere proprio a l[A:ui/ei].
1 trait:A=ingegnoso con:A=attrezzo +trap:A | {A} usa {attrezzo:A} per preparare una piccola trappola sociale: un documento perfetto, con un dettaglio sbagliato al punto giusto.
1 trait:A=fortunato test:A=fort10 ok:+valore:A ok:mo:A+5 ko:mo:A-5 | {A} trova per terra esattamente quello che serviva: {valore}. Sembra un segno. || {A} trova per terra un biglietto della lotteria. Perdente.
1 trait:A=sfortunato test:A=fort12 ok:mo:A+15 ko:hp:A-10 | Per una volta, tutto va dritto a {A}: nessuna figuraccia, nessun imprevisto. Quasi non ci crede. || A {A} cade il caffè sulla camicia due minuti prima del momento più importante della giornata. Ovviamente.
2 grudge:A>B trait:A=clemente test:A=emp12 ok:forgive:A>B ok:mo:A+10 ko:mo:A-10 | {A} va da {B} e [B:gli/le] dice semplicemente: «Ricominciamo». {B} non se lo aspettava. Il rancore si scioglie. || {A} prova a fare pace con {B}, ma {B} risponde con una battuta di troppo e tutto torna come prima.
2 grudge:A>B trait:A=vendicativo test:A=int13 ok:hit:A>B ok:mo:A+10 ko:hit:B>A | {A} aspetta il momento giusto e fa arrivare a tutti, con eleganza, la prova dell'ultimo errore di {B}. || {A} prova a mettere in difficoltà {B} davanti a tutti, ma {B} aveva previsto la mossa.
2 owe:A>B trait:A=leale give:A>B=cibo repay:A>B rel:AB+10 | {A} non dimentica il favore: porta a {B} la colazione e un biglietto. «Adesso siamo pari».
2 couple:AB stat:A>pr50 pr:A-20 mo:A+10 | {A} è nel panico. {B} se ne accorge e [A:gli/le] manda un messaggio stupido che l[A:o/a] fa ridere nel momento giusto.
2 couple:AB stat:B<hp40 test:A=car12 ok:hp:B+20 ko:hp:A-10 | {A} difende {B} davanti a tutti quando le voci si fanno pesanti. Le voci si fermano. || {A} difende {B} davanti a tutti, ma finisce nel mirino delle stesse voci.
2 crush:A>B trait:A=romantico test:A=car12 ok:love:AB ko:mo:A-15 | {A} trova il coraggio e chiede a {B} di uscire, dopo. {B} dice sì. || {A} trova il coraggio e chiede a {B} di uscire. {B} risponde «sei molto carin[A:o/a]», che vuol dire no.
2 ally:AB trait:A=traditore test:A=furt12 ok:hit:A>B ko:rel:AB-20 | {A} si prende il merito del lavoro di {B} davanti a tutti, con un sorriso innocente. || {A} prova a prendersi il merito del lavoro di {B}, ma {B} ha salvato la cronologia delle modifiche.
2 ally:AB trait:A=leader stat:B<mo30 test:A=car12 ok:mo:B+20 ko:mo:B-5 | {A} vede {B} crollare e [B:gli/le] affida un compito preciso, piccolo e possibile. {B} si rimette in moto. || {A} prova a tirare su {B} con un discorso motivazionale. {B} lo trova motivante come un lunedì mattina.
2 trust:A>B trait:A=generoso give:A>B=med rel:AB+10 | {A} passa a {B} {med}, il suo materiale migliore, senza chiedere niente in cambio.
2 fear:A>B test:A=cor12 ok:pau:A>B-20 ok:mo:A+10 ko:en:A-10 | {A} ha paura di {B} da giorni. Oggi va a parlarci, da persona a persona. {B} è molto meno terribile da vicino. || {A} va a parlare con {B} per superare la paura, ma all'ultimo cambia corridoio.
2 rival:AB test:A=int12 ok:ris:B>A+15 ok:mo:A+10 ko:mo:A-5 | {A} e {B} si sfidano a chi risolve per prim[A:o/a] lo stesso problema. Vince {A}, e {B} l[A:o/a] guarda con rispetto. || {A} e {B} si sfidano sullo stesso problema. {B} lo risolve mentre {A} sta ancora leggendo il testo.
2 enemy:AB trait:A=pacifista test:A=car13 ok:rel:AB+20 ko:hit:B>A | {A} offre a {B} un caffè e propone di chiudere la questione. {B} accetta. || {A} offre a {B} un caffè per fare pace. {B} lo accetta, e poi racconta a tutti che {A} ha cercato di corromperl[B:o/a].
2 trait:A=carismatico test:A=car11 ok:al:AB ko:mo:A-5 | {A} attacca bottone con {B} alla macchinetta e dopo dieci minuti sembrano amici da sempre. Alleanza. || {A} attacca bottone con {B} alla macchinetta, ma {B} ha le cuffie e non le toglie.
2 trait:A=guaritore stat:B<hp40 hp:B+20 debt:B>A | {A} vede {B} isolat[B:o/a] da tutti e [B:gli/le] siede accanto a pranzo. Il giorno dopo, nessuno parla più male di {B}.
2 trait:A=furtivo test:A=furt12 ok:steal:A<B=valore ko:rel:AB-10 | {A} si fa prestare da {B} {valore:B} «solo per un minuto». Il minuto dura per sempre. || {A} prova a farsi prestare {valore:B}, ma {B} ha già sentito parlare di l[A:ui/ei].
3 trait:A=leader ally:AB ally:AC test:A=car12 ok:mo:B+10 ok:mo:C+10 ok:rel:BC+10 ko:rel:BC-10 | {A} mette d'accordo {B} e {C}, che non si parlavano da giorni, con una divisione dei compiti chiarissima. || {A} prova a mettere d'accordo {B} e {C}, ma finisce per litigare con entrambi.
`,
      n: `
1 stat:A>pr55 test:A=res12 ok:pr:A-25 ok:en:A+10 ko:pr:A+15 | {A} spegne il telefono alle dieci e dorme davvero. Al mattino l'ansia è un ricordo lontano. || {A} si ripromette di spegnere il telefono alle dieci. Alle due sta ancora scorrendo.
1 stat:A<mo25 trait:A=romantico mo:A+15 | Di notte {A} rilegge i vecchi messaggi di qualcuno che l[A:o/a] faceva ridere. Si addormenta sorridendo.
1 stat:A<en20 en:A+25 | Sfinit[A:o/a], {A} va a letto alle nove come un bambino. È la decisione migliore della settimana.
1 trait:A=paranoico test:A=int12 ok:pr:A-10 ok:+trap:A ko:pr:A+15 | {A} prepara per domani una risposta pronta a ogni possibile accusa. Dorme tranquill[A:o/a]. || {A} prepara per domani una risposta a ogni possibile accusa, e si accorge alle tre di averne dimenticata una.
2 couple:AB mo:A+10 mo:B+10 pr:A-10 pr:B-10 | {A} e {B} si scrivono fino a tardi, solo cose stupide. È esattamente quello che serviva.
2 grudge:A>B trait:A=clemente test:A=emp12 ok:forgive:A>B ko:mo:A-10 | Di notte {A} scrive a {B} un messaggio lungo e sincero. La mattina dopo arriva la risposta: «Hai ragione». || Di notte {A} scrive a {B} un messaggio lungo e sincero. {B} lo visualizza e non risponde.
2 ally:AB trait:A=leale en:A-10 pr:B-15 | {A} resta svegli[A:o/a] fino a tardi per aiutare {B} a finire il lavoro di domani. {B} non dimenticherà.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
