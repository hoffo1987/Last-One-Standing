/* Liceo Spietato — eventi aggiuntivi e disastri (si viene eliminati, nessuno muore). */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.liceo = {
    extra: {
      b: `
1 +med:A | {A} si porta dietro le risposte dell'anno scorso, per sicurezza.
1 @stl | {A} si siede dietro al compagno più alto della classe.
1 s:A=ferito | {A} arriva in ritardo il primo giorno e si prende subito una nota.
2 al:AB @soc | {A} e {B} si ritrovano nello stesso gruppo per la gita di benvenuto.
2 k:A>B | {A} fa cadere il vassoio di {B} davanti a tutta la mensa: {B} chiede di cambiare scuola.
3 | {A}, {B} e {C} litigano per il posto vicino alla finestra finché non arriva la professoressa.
`,
      d: `
1 @int | {A} prepara degli schemi di storia così belli che tutti li vogliono.
1 +arma:A @stl | {A} sente per caso una conversazione e ottiene {arma}.
1 | {A} passa la ricreazione a giocare a carte in cortile.
1 s:A=malato | {A} passa la notte prima della verifica senza dormire.
1 need:A=malato cure:A *2 | {A} dorme durante l'ora buca e si riprende.
1 d:A | {A} viene sorpres[A:o/a] a usare il telefono durante la verifica.
1 d:A | {A} si fa beccare mentre falsifica la firma dei genitori.
1 @mad | {A} risponde a un'interrogazione di filosofia citando un cartone animato.
1 @soc | {A} viene elett[A:o/a] rappresentante di classe.
1 +med:A @luck | {A} trova una giustificazione già firmata nel diario.
2 k:A>B @int | {A} convince la professoressa che il tema di {B} è stato copiato da internet.
2 k:A>B w:A @agg | {A} pubblica {arma:A} su {B} nel gruppo di istituto.
2 al:AB @heal | {A} difende {B} da una presa in giro e diventano amic[AB:i/he].
2 ally:AB | {A} e {B} saltano l'ora di ginnastica insieme.
2 s:B=ferito @stl | {A} nasconde il libro di {B} prima dell'interrogazione.
2 need:B=* cure:B @heal | {A} fa ripetizioni a {B} durante la pausa pranzo.
2 tr:A>B | {A} rivela alla Preside chi ha scritto sul muro del bagno: era {B}.
3 k:AB>C | {A} e {B} organizzano una festa e non invitano {C}, che non si riprende.
3 al:ABC @soc | {A}, {B} e {C} formano una band per la festa di fine anno.
2 | {A} e {B} si sfidano a braccio di ferro durante la ricreazione.
`,
      n: `
1 | {A} ripassa matematica sul bus del ritorno.
1 d:A | {A} si addormenta durante una videochiamata con la professoressa ed è fuori.
2 ally:AB | {A} e {B} si scambiano gli appunti per il giorno dopo.
2 k:A>B @stl | {A} cambia la password del profilo di {B} e pubblica qualcosa al suo posto.
`,
      f: `
1 @soc | {A} viene incoronat[A:o/a] star della festa.
1 d:A | {A} si presenta alla festa vestit[A:o/a] identic[A:o/a] alla Preside.
2 k:A>B | {A} fa partire il video sbagliato sul maxischermo: protagonista {B}.
`,
    },
    dis: `
La circolare | Arriva una circolare: telefoni sequestrati per una settimana. | {A} non sopravvive senza telefono e chiede il trasferimento. | {A} perde tutti i contatti e resta isolat[A:o/a]. | {A} aveva già un telefono di riserva.
Lo sciopero dei bus | I bus scioperano proprio il giorno della verifica. | {A} arriva con due ore di ritardo e viene bocciat[A:o/a]. | {A} arriva in ritardo e prende una nota. | {A} arriva a piedi con largo anticipo.
L'interrogazione a tappeto | La professoressa di latino interroga tutti, nessuno escluso. | {A} scena muta: è fuori. | {A} prende un quattro. | {A} risponde a tutto e prende otto.
La gita disastrosa | La gita di classe finisce in un disastro. | {A} si perde in un museo e non torna in tempo. | {A} viene richiamat[A:o/a] davanti a tutti. | {A} resta vicino al professore per tutta la gita.
Il crollo della rete | La rete della scuola crolla durante il compito online. | {A} perde tutto il compito ed è fuori. | {A} consegna in ritardo e perde punti. | {A} aveva salvato tutto in tempo.
L'assemblea di istituto | L'assemblea di istituto degenera in una rissa verbale. | {A} dice la cosa sbagliata al microfono. | {A} viene fischiat[A:o/a] da tutta la scuola. | {A} resta in silenzio e osserva.
L'epidemia di influenza | Metà della classe si ammala. | {A} salta troppe lezioni e perde l'anno. | {A} si ammala e resta indietro con il programma. | {A} non si ammala mai. | malato
La perquisizione | I professori controllano tutti gli zaini. | {A} viene sorpres[A:o/a] con le soluzioni della verifica. | {A} viene sorpres[A:o/a] con un fumetto sotto il banco. | {A} ha lo zaino in perfetto ordine.
Il consiglio di classe | Il consiglio di classe decide chi è a rischio bocciatura. | {A} viene bocciat[A:o/a] all'unanimità. | {A} riceve un ultimo avvertimento. | {A} viene lodat[A:o/a] davanti a tutti.
Il professore nuovo | Arriva un supplente che boccia chiunque. | {A} risponde male al supplente ed è fuori. | {A} prende un due al primo compito. | {A} conquista il supplente con una domanda intelligente.
La foto di classe | La foto di classe finisce sui social con commenti terribili. | {A} viene trasformat[A:o/a] in un meme e lascia la scuola. | {A} riceve un soprannome che non [A:gli/le] piace. | {A} aveva chiuso gli occhi e nessuno l[A:o/a] riconosce.
Il compito di gruppo | La professoressa assegna gruppi a caso per un progetto. | {A} finisce in un gruppo che non lavora e viene bocciat[A:o/a]. | {A} fa tutto il lavoro da sol[A:o/a] e si esaurisce. | {A} trova il gruppo perfetto. | malato
L'allarme antincendio | L'allarme antincendio suona durante la verifica. | {A} viene sorpres[A:o/a] a copiare nella confusione. | {A} perde il foglio della verifica. | {A} consegna prima di uscire.
L'olimpiade di matematica | Tutti devono partecipare all'olimpiade di matematica. | {A} prende zero punti ed è umiliat[A:o/a]. | {A} prende un punteggio imbarazzante. | {A} arriva in finale nazionale.
Il ballo della scuola | Si apre la caccia agli inviti per il ballo. | {A} viene rifiutat[A:o/a] da tutti e non si fa più vedere. | {A} va al ballo da sol[A:o/a]. | {A} riceve tre inviti.
La verifica di chimica | La verifica di chimica è la più difficile dell'anno. | {A} fa esplodere una provetta e viene sospes[A:o/a]. | {A} prende un tre. | {A} prende nove.
I genitori a colloquio | Arrivano i colloqui con i genitori. | {A} viene mess[A:o/a] in punizione per un mese. | {A} perde il telefono per una settimana. | {A} riceve solo complimenti.
La gara di corsa | Il professore di ginnastica organizza una gara di resistenza. | {A} sviene a metà gara ed è fuori. | {A} arriva ultim[A:o/a] e tutti ridono. | {A} vince la gara. | malato
Il registro elettronico | Il registro elettronico pubblica per errore tutti i voti. | {A} vede i propri voti esposti e non regge la vergogna. | {A} scopre di avere tre insufficienze. | {A} ha solo voti alti.
Il corso di recupero | La scuola obbliga i peggiori a seguire un corso di recupero. | {A} non supera il corso ed è fuori. | {A} deve passare tutti i pomeriggi a scuola. | {A} non deve seguire il corso.
La gita sulla neve | La gita sulla neve è un caos di sci e slittini. | {A} si rompe una gamba e resta fuori per il resto dell'anno. | {A} cade e si fa male al polso. | {A} scia benissimo.
Il gruppo social | Un profilo anonimo inizia a pubblicare i segreti di tutti. | {A} vede il proprio segreto pubblicato e lascia la scuola. | {A} viene pres[A:o/a] in giro per giorni. | {A} scopre chi c'è dietro al profilo.
L'esame di guida | Mezza classe fa l'esame della patente lo stesso giorno. | {A} investe un cono e si vergogna troppo per tornare. | {A} viene bocciat[A:o/a] all'esame. | {A} prende la patente al primo colpo.
Il torneo di calcetto | Il torneo di calcetto tra classi degenera. | {A} viene espuls[A:o/a] dalla scuola dopo una rissa. | {A} si fa male a una caviglia. | {A} segna il gol decisivo.
La nuova Preside | Arriva una nuova Preside con regole durissime. | {A} infrange una regola il primo giorno ed è fuori. | {A} riceve una nota disciplinare. | {A} diventa il cocco della Preside.
L'esame finale | Tutti devono affrontare una simulazione d'esame. | {A} non si presenta ed è fuori. | {A} consegna metà del compito. | {A} consegna con un'ora di anticipo.
La neve | Una nevicata chiude la scuola per tre giorni. | {A} si dimentica i compiti assegnati online e viene bocciat[A:o/a]. | {A} si ammala giocando a palle di neve. | {A} si porta avanti con il programma. | malato
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
