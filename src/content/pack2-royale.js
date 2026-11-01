/* Isola Battle Royale — secondo pacchetto. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'royale',
    ev: {
      b: `
1 +armatura:A @luck | {A} atterra su un tetto e trova subito {armatura}. Lo stream esplode di emoji.
1 +attrezzo:A @int | {A} salta in un punto deserto e trova {attrezzo}. Strategia o fortuna? Il pubblico vota «fortuna».
2 al:AB @soc | {A} e {B} atterrano sullo stesso tetto, si puntano le armi, si guardano e scoppiano a ridere. Duo formato.
2 k:A>B @agg | {A} e {B} atterrano sulla stessa cassa. Solo uno dei due si rialza.
1 test:A=agi12 ok:+arma:A ko:s:A=ferito | {A} apre il paracadute all'ultimo secondo e atterra accanto a un'arma leggendaria. || {A} apre il paracadute all'ultimo secondo. Troppo all'ultimo.
`,
      d: `
1 stat:A<hp45 con:A=med -med:A hp:A+40 | {A} si ferma dietro una roccia per curarsi. Animazione lunghissima, ma nessuno l[A:o/a] interrompe.
1 stat:A<food30 +cibo:A | {A} apre un frigorifero del Villaggio costiero. Dentro c'è una pizza surgelata. La mangia surgelata.
1 stat:A>mo75 @show star:A | {A} fa un balletto sopra una cassa appena aperta. Il pubblico l[A:o/a] adora, i nemici se l[A:o/a] segnano.
1 stat:A<mo25 s:A=sconvolto | {A} guarda la tempesta avvicinarsi e si chiede se ne valga la pena. Lo stream mette un filtro triste.
1 con:A=attrezzo +mappa:A @int | {A} fa volare {attrezzo:A} sopra l'isola e disegna la mappa delle prossime zone sicure.
1 con:A=valore -valore:A +armatura:A | {A} spende {valore} al distributore automatico della Base militare. Esce {armatura}.
1 con:A=ricordo mo:A+15 | {A} guarda {ricordo:A} mentre ricarica. Si ricorda perché sta giocando.
1 wx:buio @stl | Sotto la pioggia tropicale, {A} si avvicina a una squadra intera senza che nessuno l[A:o/a] senta.
1 wx:abbondanza +cibo:A +armatura:A | Una cassa leggendaria cade a due passi da {A}: razioni e {armatura}. Il cielo esiste ancora.
1 wx:pericolo s:A=ferito | La tempesta accelera e {A} la attraversa di corsa. Arriva in zona sicura con mezza vita.
1 trait:A=esibizionista star:A | {A} gioca un\'intera fase solo con il coltello, per lo spettacolo. Funziona. Non dovrebbe funzionare.
1 trait:A=ingegnoso con:A=attrezzo +trap:A | {A} piazza una trappola esplosiva dentro una cassa dei rifornimenti. Chi la apre avrà una sorpresa.
2 crush:A>B rel:AB+15 @soc | {A} lascia a {B} l'ultimo kit medico della cassa e fa finta di non averne bisogno.
2 crush:A>B love:AB *2 | {A} e {B} si ritrovano nello stesso fienile durante la tempesta. Nessuno dei due spara. Uno dei due bacia l'altro.
2 plot:A>B rel:AB+10 | {A} copre {B} durante la cura. Copre benissimo. Studia anche dove tiene le munizioni.
2 plot:A>B -armatura:B +armatura:A @stl | {A} scambia la protezione di {B} con una rotta, mentre {B} guarda la mappa.
2 goal:A=vendetta grudge:A>B hit:A>B | {A} riconosce {B} dalla skin e [B:gli/le] spara senza pensarci. Per {caro:A}. L[B:o/a] manca di poco.
2 goal:A=caccia k:A>B @agg | {A} segue i passi di {B} col binocolo per mezza isola. Poi preme il grilletto.
1 goal:A=spettacolo star:A @show | {A} si arrampica sull'antenna più alta dell'isola e si fa inquadrare. Il pubblico impazzisce.
2 con:A=armatura hit:B>A | {B} colpisce {A} con un fucile a pompa, ma {armatura:A} incassa tutto. Lo stream urla.
2 con:A=alcol give:A>B=alcol rel:AB+20 | {A} e {B} si dividono {alcol} su un tetto, aspettando il prossimo cerchio. Tregua da bar.
2 test:A=agi13 ok:save:A>B ko:s:A=ferito | {A} trascina {B} dentro la zona sicura un secondo prima che la tempesta si chiuda. || {A} prova a trascinare {B} dentro la zona sicura. Ci riesce, ma la tempesta l[A:o/a] morde.
2 owe:A>B repay:A>B rel:AB+10 | {A} rianima {B}, abbattut[B:o/a] dietro una roccia. Debito saldato.
2 enemy:AB hit:A>B | {A} e {B} si incrociano alla Centrale elettrica. Si sparano per dieci minuti e non si colpiscono quasi mai.
3 plot:A>B ally:ABC rel:AC+20 | {A} dice a {C} che {B} ha nascosto la cassa leggendaria. Non è vero. {C} però ora guarda {B} in un altro modo.
`,
      n: `
1 stat:A<en25 s:A=ferito | {A} si addormenta in un cespuglio. Un cespuglio a fuoco, si scoprirà.
1 con:A=ricordo | {A} guarda {ricordo:A} prima di dormire. Domani l'isola sarà più piccola.
1 wx:pericolo s:A=sconvolto | Di notte la tempesta si sente arrivare: un ronzio che non si ferma. {A} non chiude occhio.
2 crush:A>B @soc | {A} fa la guardia sulla torre per tutta la notte, puntando il binocolo verso {B} più spesso del necessario.
2 plot:A>B tr:A>B *2 | {A} aspetta che {B} si addormenti. Poi si ricorda che il duo, dal prossimo cerchio, conta come solo.
2 plot:A>B br:A | {A} parte di notte con il veicolo del duo. {B} si sveglia a piedi, in una zona che sta per chiudersi.
2 couple:AB stat:B<hp40 save:A>B -med:A hp:B+40 | {A} usa l'ultimo kit medico su {B} e resta senza. Ne valeva la pena.
2 hit:A>B trait:A=sonnambulo | {A} si alza nel sonno e prende {B} per un nemico. Colpo di calcio, poi le scuse.
`,
      f: `
2 crush:A>B save:A>B | Alla cassa leggendaria, {A} si mette tra {B} e un cecchino. Lo stream crea un nuovo hashtag.
2 plot:A>B k:A>B *2 | Alla cassa leggendaria, {A} si libera di {B} mentre tutti guardano la cassa. Era il piano.
1 con:A=valore -valore:A +arma:A | Alla cassa leggendaria, {A} scambia {valore} con un'arma di livello oro.
`,
      sponsor: `
1 +armatura:A @gift | Un drone degli sponsor lascia cadere {armatura} per {A}. Con un adesivo: «Sei il nostro preferito».
1 +attrezzo:A @gift | Gli sponsor regalano a {A} {attrezzo} e cinque minuti di celebrità.
1 +ricordo:A mo:A+20 @gift | Gli sponsor mandano a {A} un videomessaggio della famiglia e {ricordo}.
`,
      finale: `
2 k:A>B | Ultimo cerchio, grande come un campo da tennis. {A} e {B} si guardano. Il resto è un clip da dieci milioni di visualizzazioni.
2 k:A>B con:A=armatura | {B} spara per prim[B:o/a], ma {armatura:A} regge l'ultimo colpo. {A} vince la partita.
`,
    },
    dis: `
Il bombardamento a tappeto | Una zona rossa compare sulla mappa: arrivano le bombe. | {A} era al centro della zona rossa. | {A} viene sbalzat[A:o/a] da un'esplosione. | {A} vede l'avviso e corre fuori in tempo. | ferito
L'elicottero da caccia | Un elicottero degli organizzatori sorvola l'isola sparando a caso. | {A} viene inquadrat[A:o/a] dal mirino. | {A} prende un colpo di striscio. | {A} si sdraia sotto un'auto finché l'elicottero non passa. | ferito
Lo tsunami | Un'onda gigante si abbatte sul Villaggio costiero. | {A} viene trascinat[A:o/a] in mare. | {A} viene sbattut[A:o/a] contro un muro. | {A} è già sulla collina, a guardare. | ferito
I lupi bionici | Branchi di lupi con occhi rossi escono dalla Foresta. | {A} viene circondat[A:o/a]. | {A} viene mors[A:o/a] mentre scappa. | {A} si chiude in un silos. | ferito
La zona tossica | Una nube verde copre la Fattoria. | {A} respira troppa nube. | {A} tossisce per ore. | {A} indossa una maschera antigas presa a un soldato. | malato
Il crollo del ponte | Il ponte principale dell'isola crolla mentre tutti lo attraversano. | {A} cade con il ponte. | {A} si aggrappa ai cavi e risale ferit[A:o/a]. | {A} aveva scelto di nuotare. | ferito
La pioggia di casse | Cento casse cadono dal cielo in un minuto. | {A} viene colpit[A:o/a] da una cassa. | {A} viene sfiorat[A:o/a] e perde un dente. | {A} raccoglie tre casse senza un graffio. | ferito
Il blackout del server | L'arena «laggha»: per qualche minuto tutto si muove a scatti. | {A} si teletrasporta dentro un muro. | {A} cade da un tetto per un errore di calcolo. | {A} resta immobile finché tutto torna normale. | sconvolto
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
