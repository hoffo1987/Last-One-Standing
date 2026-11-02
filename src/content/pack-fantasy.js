/* Reame Incantato — pacchetto esteso. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'fantasy',
    ev: {
      b: `
1 +amuleto:A @luck | {A} afferra dall'Altare {amuleto}. Brilla. Questo è sempre un buon segno, tranne quando non lo è.
1 s:A=malato @mad | {A} prende un bastone magico, pronuncia la prima parola che [A:gli/le] viene in mente e si trasforma per dieci secondi in una capra.
2 k:A>B | {A} lancia un incantesimo di fuoco contro {B}. Funziona fin troppo bene.
2 save:A>B @heal | {A} alza uno scudo di luce davanti a {B} appena in tempo.
1 @show star:A | {A} sale sull'Altare e grida "Per il reame!". Nessuno sa quale reame, ma il pubblico adora.
2 al:AB @soc | {A} e {B} si riconoscono: hanno studiato nella stessa accademia di magia, con una bocciatura a testa in Teletrasporto.
`,
      d: `
1 +cibo:A @soc | {A} aiuta un mercante gnomo a ritrovare il proprio cappello e viene pagat[A:o/a] in formaggio.
1 @mad | {A} parla con un albero per tre ore. L'albero risponde, ma solo in rime baciate.
1 s:A=malato | {A} bacia una rana sperando in un principe. Ottiene una verruca magica.
1 +arma:A @luck | Una dama del Lago nebbioso emerge e consegna {arma} a {A}. Poi chiede la ricevuta.
1 d:A *0.5 | {A} prova a cavalcare un unicorno. L'unicorno ha opinioni molto chiare al riguardo, e un corno molto appuntito.
1 +mappa:A @int | {A} ruba a un corvo parlante {mappa}. Il corvo giura vendetta, ma è un corvo.
1 @show star:A | {A} fa amicizia con un piccolo drago e lo chiama Biscotto. Il pubblico perde la testa.
1 need:A=malato cure:A @luck *2 | Una fata madrina compare, cura {A} e scompare chiedendo cinque stelle di recensione.
1 s:A=ferito | {A} prova a teletrasportarsi e si ritrova incastrat[A:o/a] per metà dentro un albero.
1 +veleno:A @int | {A} passa tre ore con i tappi nelle orecchie a spremere una mandragora urlante. Ne ricava {veleno}.
2 k:A>B @int | {A} trasforma {B} in un rospo e poi, per errore, ci si siede sopra.
2 hit:A>B @agg | {A} evoca uno sciame di api arcane contro {B}. Le api sbagliano bersaglio due volte su tre.
2 love:AB @soc | {A} e {B} bevono per sbaglio lo stesso filtro d'amore. Il risultato è un po' imbarazzante e molto sincero.
2 couple:AB @show | {A} e {B} danzano sotto le lucciole incantate. Il reame intero sospira.
2 couple:AB +amuleto:B | {A} regala a {B} un anello forgiato con un pezzo della propria armatura.
2 grudge:A>B k:A>B *3 | {A} evoca lo spirito di {caro:A} per un istante, giusto il tempo di indicare {B}. Poi fa il resto da sol[A:o/a].
2 grudge:A>B hit:A>B *2 | {A} maledice {B} con una sfortuna terribile per {caro:A}. {B} inciampa, cade e si rompe un dito.
2 save:A>B | {A} libera {B} dalla tela di un ragno gigante.
2 steal:A<B @stl | {A} si rende invisibile e sottrae {arma:B} a {B}, che passa l'ora successiva a cercare sotto ogni sasso.
2 owe:A>B repay:A>B give:A>B=amuleto | {A} paga il proprio debito con {B} donando[B:gli/le] un amuleto di famiglia.
2 enemy:AB | {A} e {B} si sfidano a un duello di insulti in rima. Pareggio. L'odio cresce.
2 feared:B @cow | {A} vede {B} e lancia un incantesimo di invisibilità. Su se stess[A:o/a]. Per tutto il giorno.
2 traitor:B rel:AB-30 | Una profezia annuncia a {A} che {B} l[A:o/a] tradirà. {A} decide di crederci.
3 al:ABC @show | {A}, {B} e {C} fondano una compagnia di avventurieri e litigano per due ore sul nome.
3 k:AB>C | {A} attira {C} vicino alla tana di un orco; {B} sveglia l'orco. Lavoro di squadra.
3 couple:AB hit:C>A | {C} lancia una maledizione di bruttezza su {A} per gelosia di {B}. Dura un'ora, ma l'umiliazione resta.
1 con:A=mappa | Seguendo {mappa:A}, {A} trova una sorgente di acqua guaritrice.
2 veleno:A k:A>B @stl *1.5 | {A} offre a {B} un calice di idromele corretto con {veleno:A}. "Alla tua salute", dice, senza ironia.
1 need:A=affamato @mad | Affamat[A:o/a], {A} morde un fungo luminoso. Vede la musica per sei ore.
`,
      n: `
1 | {A} dorme in un cerchio di funghi e sogna di essere re. O regina. O un fungo.
1 d:A *0.5 | {A} segue una luce nella palude credendo che sia una fata. Era la bocca di qualcosa.
2 couple:AB | {A} e {B} si giurano amore eterno sotto le due lune. Una delle lune sembra annoiata.
2 grudge:A>B | {A} affila la lama sotto la luna pensando a {B}. Le rune si accendono di rosso.
2 k:A>B @stl | {A} sussurra a {B}, nel sonno, un incantesimo che non si sveglia più.
`,
      f: `
2 k:A>B | {A} e {B} allungano la mano sulla stessa pozione. {A} è più veloce. {B} è più mort[B:o/a].
1 +amuleto:A | Nel piatto di {A}, al posto del dessert, c'è {amuleto}.
`,
      ds: `
1 con:A=amuleto | {amuleto:A} si illumina e avvolge {A} in una bolla di luce.
2 save:A>B | {A} evoca una barriera e la allarga anche a {B}, all'ultimo secondo.
`,
    },
    dis: `
Il mercato delle anime | Un mercante demoniaco offre potere in cambio di un anno di vita. Molti accettano. | {A} firma senza leggere: l'anno era quello corrente. | {A} cede tre giorni di vita e si sente subito più debole. | {A} legge il contratto, trova la clausola e se ne va. | malato
Il drago affamato | Il drago ha deciso che oggi si mangia fuori. | {A} viene inghiottit[A:o/a] inter[A:o/a], con tanto di zaino. | {A} viene sputat[A:o/a] fuori perché non era di suo gusto. | {A} offre al drago una pecora e se ne va.
La pioggia di rospi parlanti | Dal cielo piovono rospi che urlano insulti. | {A} viene sommers[A:o/a] da una valanga di rospi offensivi. | {A} viene ferit[A:o/a] nell'orgoglio e nel naso. | {A} insulta i rospi a sua volta e li mette in fuga. | sconvolto
Il ballo delle armature | Le armature vuote della Torre si animano e danzano un valzer mortale. | {A} viene trascinat[A:o/a] nel ballo e calpestat[A:o/a] a morte. | {A} balla un giro e ne esce con un piede rotto. | {A} si rifiuta di ballare: le armature sono offese ma rispettose.
L'incantesimo scambiato | Un mago pasticcione scambia i corpi di metà dei concorrenti per un'ora. | {A} non riesce a tornare nel proprio corpo e si dissolve. | {A} torna nel proprio corpo, ma con il raffreddore di qualcun altro. | {A} non viene coinvolt[A:o/a] e si gode lo spettacolo. | malato
Lo sciame di ombre | Ombre senza padrone cercano un corpo da abitare. | {A} viene possedut[A:o/a] e cammina dritt[A:o/a] nel Lago. | {A} resiste all'ombra, ma resta svuotat[A:o/a]. | {A} accende un fuoco e le ombre restano lontane. | sconvolto
La montagna che cammina | Il Picco del drago si alza e si sposta di dieci chilometri. | {A} viene schiacciat[A:o/a] da un passo della montagna. | {A} cade dalla montagna mentre si sposta. | {A} si fa dare un passaggio dalla montagna.
Il torneo del re | Un re spettrale indice un torneo: chi rifiuta viene giustiziato. | {A} perde al primo turno contro un cavaliere senza testa. | {A} perde in semifinale e viene ferit[A:o/a]. | {A} vince il torneo e riceve una corona arrugginita.
La gelata eterna | Una strega del ghiaccio congela il reame per un giorno. | {A} diventa una statua di ghiaccio molto espressiva. | {A} perde la punta del naso per il gelo. | {A} si scalda vicino al drago addormentato. | malato
Gli gnomi da giardino | Migliaia di gnomi di pietra si animano e circondano gli accampamenti. | {A} viene circondat[A:o/a] e pres[A:o/a] a picconate. | {A} viene morsicat[A:o/a] a una caviglia da uno gnomo. | {A} offre loro del tè e diventa loro amic[A:o/a].
La biblioteca infinita | Un'enorme biblioteca appare e risucchia chi entra a leggere. | {A} resta intrappolat[A:o/a] in un libro di contabilità elfica. | {A} esce dalla biblioteca con un'emicrania terribile. | {A} esce con un libro di incantesimi sotto il braccio.
La fontana dei desideri | Una fontana esaudisce i desideri, in modo molto letterale. | {A} chiede di "non avere più problemi". Esaudito. | {A} chiede di essere più forte e si ritrova con un braccio enorme e uno normale. | {A} chiede un panino ed è soddisfatt[A:o/a].
Il buco nel cielo | Il cielo si strappa e da lì cadono stelle, pezzi di luna e un pianoforte. | {A} viene colpit[A:o/a] dal pianoforte. | {A} viene colpit[A:o/a] da un pezzo di luna, piccolo ma deciso. | {A} si siede al pianoforte e suona.
La maledizione del sonno | Un incantesimo addormenta chiunque si sieda. | {A} si siede e non si sveglia più. | {A} si addormenta in piedi e cade di faccia. | {A} resta in piedi tutto il giorno ballando. | sconvolto
Il ritorno dei lich | Gli antichi lich si risvegliano e reclamano il reame. | {A} viene trasformat[A:o/a] in uno scheletro servitore. | {A} sfugge a un lich con metà dei capelli diventati bianchi. | {A} si finge già mort[A:o/a] e i lich l[A:o/a] ignorano. | sconvolto
Lo stagno delle sirene | Uno stagno compare in mezzo alla foresta, con dentro sirene molto affascinanti. | {A} si tuffa e non riemerge. | {A} riemerge con dei graffi e il cuore spezzato. | {A} ammira le sirene da una distanza ragionevole.
La pozione nel pozzo | Qualcuno versa una pozione di gigantismo nel pozzo. | {A} cresce fino a trenta metri e crolla sotto il proprio peso. | {A} cresce di un metro e poi torna normale, con le articolazioni a pezzi. | {A} beveva solo idromele.
La tempesta di petali | Petali di rosa taglienti come rasoi turbinano nel vento. | {A} viene fatt[A:o/a] a pezzi in modo molto poetico. | {A} si riempie di tagli sottilissimi. | {A} si avvolge nel mantello e aspetta.
Il re dei ratti | Un re dei ratti con sette code guida un esercito di ratti contro i concorrenti. | {A} viene sommers[A:o/a] dai ratti. | {A} viene mors[A:o/a] più volte. | {A} parla con il re dei ratti e ne ottiene il rispetto. | malato
Il mimic | I forzieri del reame si rivelano mimic affamati. | {A} apre il forziere sbagliato. | {A} perde una mano nel forziere. | {A} prende a calci ogni forziere prima di aprirlo.
L'eclissi delle due lune | Le due lune si sovrappongono e la magia impazzisce. | {A} esplode in una nuvola di farfalle. | {A} perde temporaneamente la voce, la vista e la dignità. | {A} si stende e guarda lo spettacolo. | sconvolto
`,
  });
  D.packs.push({
    theme: 'fantasy', adult: true,
    ev: {
      d: `
1 s:A=ubriaco @mad | {A} beve un'intera caraffa di idromele dei nani. Poi sfida i nani a bere. Poi si sveglia in una miniera senza pantaloni.
2 love:AB @show | {A} e {B} bevono un filtro d'amore molto, molto potente. Le telecamere elfiche si appannano da sole.
2 couple:AB | {A} e {B} scoprono che i funghi luminosi hanno effetti "interessanti". Passano la giornata in una grotta. Nessuno fa domande.
2 k:A>B @agg | {A} squarta {B} con l'ascia nanica come se tagliasse legna. Il sangue disegna rune sulla neve.
1 @mad s:A=ubriaco | {A} fuma l'erba pipa degli hobbit, scoperta molto più forte di quanto si dicesse. Passa ore a ridere di un sasso.
2 hit:A>B | {A} lancia a {B} una maledizione che [B:gli/le] fa spuntare un'escrescenza imbarazzante in mezzo alla fronte.
1 d:A *0.5 | {A} viene sorpres[A:o/a] da un troll affamato che l[A:o/a] mangia partendo dai piedi, molto lentamente.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a] di idromele, {A} canta a {B} una ballata così sconcia che {B} ne resta conquistat[B:o/a].
`,
      n: `
2 couple:AB | {A} e {B} passano la notte in una tenda elfica. Gli elfi dei dintorni si lamentano per il rumore.
2 k:A>B @stl | {A} entra nella tenda di {B} e [B:gli/le] taglia la gola senza svegliarl[B:o/a]. Molto professionale. Molto brutto.
`,
    },
    dis: `
La festa dei satiri | Una banda di satiri ubriachi organizza un baccanale nella foresta. | {A} viene travolt[A:o/a] dalla danza e calpestat[A:o/a] dagli zoccoli. | {A} si risveglia senza memoria e con un tatuaggio nuovo. | {A} beve un bicchiere, saluta e se ne va. | ubriaco
La succube | Una succube visita l'accampamento più vicino. | {A} non si sveglia più, con un sorriso ebete stampato in faccia. | {A} si sveglia esaust[A:o/a] e confus[A:o/a]. | {A} dorme con l'aglio sotto il cuscino, che a quanto pare funziona. | malato
Il macellaio orco | Un orco macellaio apre bottega in mezzo al reame, e cerca carne fresca. | {A} finisce appes[A:o/a] a un gancio. | {A} perde un orecchio nella colluttazione. | {A} vende all'orco un rospo spacciandolo per pollo.
Le piante vogliose | Le liane della Palude stregata diventano molto, molto affettuose. | {A} viene stritolat[A:o/a] in un abbraccio vegetale. | {A} riesce a liberarsi, ma con lividi in posti strani. | {A} cammina rasente la riva senza toccare nulla.
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
