/* Villa Maledetta — eventi aggiuntivi e disastri. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.horror = {
    extra: {
      b: `
1 +med:A | {A} si infila in tasca un flacone di sali da svenimento.
1 @stl | {A} sparisce dietro un arazzo che nasconde una porta.
1 s:A=malato | {A} beve dal calice al centro della tavola e sente un brivido gelido.
2 k:A>B @agg | {A} rovescia il lampadario su {B}.
2 al:AB @soc | {A} e {B} si stringono la mano sotto il tavolo: resteranno insieme.
3 | {A}, {B} e {C} si accusano a vicenda di aver spento le luci.
`,
      d: `
1 +arma:A | {A} stacca {arma} dalla parete della Biblioteca.
1 @int | {A} trova la pianta originale della villa dentro un libro.
1 s:A=ferito | {A} si taglia con le spine di una rosa nera nella Serra.
1 d:A | {A} apre la porta della Soffitta che nessuno doveva aprire.
1 d:A | {A} si specchia nell'acqua del pozzo e viene tirat[A:o/a] giù.
1 @mad | {A} apparecchia la tavola per gli ospiti che sono già morti.
1 +cibo:A | {A} trova {cibo} nella dispensa, stranamente fresco.
1 @luck | {A} trova una medaglietta benedetta e si sente protett[A:o/a].
1 | {A} sente il pianoforte suonare da solo in un'altra stanza.
1 +med:A | {A} trova l'armadietto del vecchio medico di famiglia.
1 s:A=malato | {A} trova un diario con il proprio nome scritto in ogni pagina.
2 k:A>B @agg | {A} chiude {B} nella cripta e getta via la chiave.
2 k:A>B w:A | {A} insegue {B} nel corridoio e l[B:o/a] colpisce con {arma:A}.
2 al:AB | {A} e {B} decidono di dormire nella stessa stanza.
2 need:B=* cure:B @heal | {A} veglia su {B} recitando preghiere.
2 s:B=ferito | {A} spinge {B} giù per le scale della Cantina.
2 steal:A<B @stl | {A} si prende {arma:B} di {B} mentre è distratt[B:o/a] da un rumore.
2 d:B | {A} vede {B} venire trascinat[B:o/a] dentro un quadro.
3 al:ABC @soc | {A}, {B} e {C} accendono tutte le candele del salone e restano insieme.
3 k:AB>C | {A} e {B} decidono che {C} è possedut[C:o/a] e l[C:o/a] chiudono fuori dalla villa.
`,
      n: `
1 | {A} sente qualcuno respirare sotto il letto.
1 d:A | {A} viene trovat[A:o/a] la mattina dopo sedut[A:o/a] al pianoforte, senza vita.
1 @stl | {A} resta nascost[A:o/a] nell'armadio fino all'alba.
2 ally:AB | {A} e {B} si tengono per mano finché il rumore di passi non si allontana.
2 k:A>B @stl | {A} entra nella camera di {B} con una candela e un coltello.
`,
      f: `
1 +arma:A | {A} apre la propria scatola nera e ci trova {arma}.
1 d:A | {A} si toglie la maschera e scopre di non avere più un volto.
2 k:A>B | {A} invita {B} a ballare e l[B:o/a] accoltella durante il valzer.
`,
    },
    dis: `
La porta rossa | Una porta rossa compare in fondo al corridoio. | {A} la apre ed entra: non torna più. | {A} la apre appena e qualcosa [A:gli/le] graffia la mano. | {A} la chiude con un chiodo e un crocifisso.
Il ritratto | Uno dei ritratti del salone si stacca dalla parete. | {A} viene trascinat[A:o/a] dentro il quadro. | {A} si ferisce cercando di distruggerlo. | {A} gira tutti i ritratti verso il muro.
La pioggia di sangue | Dal soffitto comincia a gocciolare sangue. | {A} scivola sulle scale e si rompe il collo. | {A} si ammala dopo esserne stat[A:o/a] toccat[A:o/a]. | {A} si chiude in Biblioteca. | malato
Il pozzo | Dal pozzo del giardino sale un canto. | {A} si sporge troppo e cade nel pozzo. | {A} viene graffiat[A:o/a] da mani che escono dal pozzo. | {A} copre il pozzo con una lastra di pietra.
Gli insetti | Uno sciame di mosche invade la villa. | {A} viene soffocat[A:o/a] dallo sciame. | {A} viene punt[A:o/a] da centinaia di insetti. | {A} accende un fuoco e lo sciame se ne va. | avvelenato
I manichini | I manichini della soffitta si muovono quando nessuno guarda. | {A} si volta e trova un manichino a un centimetro. | {A} viene ferit[A:o/a] da un manichino con le forbici. | {A} non distoglie mai lo sguardo.
Il carillon | Un carillon suona una melodia che fa addormentare. | {A} si addormenta e non si sveglia più. | {A} si addormenta e si risveglia con le mani legate. | {A} distrugge il carillon prima che finisca la canzone.
Il bambino | Un bambino pallido gira per i corridoi chiedendo di giocare. | {A} accetta di giocare a nascondino e sparisce. | {A} rifiuta e viene mors[A:o/a]. | {A} [A:gli/le] regala un giocattolo e il bambino se ne va.
L'alluvione della Cantina | La Cantina si allaga con acqua nera. | {A} annega nell'acqua nera. | {A} esce dalla Cantina con una febbre altissima. | {A} si trovava ai piani alti. | malato
La lista | Sul tavolo compare una lista di nomi, alcuni barrati. | {A} vede il proprio nome barrato e il cuore si ferma. | {A} vede il proprio nome e non dorme più. | {A} brucia la lista prima di leggerla. | malato
Il fuoco blu | Un fuoco blu si accende in tutti i camini e non scalda. | {A} si avvicina al fuoco e viene inghiottit[A:o/a]. | {A} si ustiona con il fuoco gelido. | {A} spegne il camino con la neve.
Il giardiniere | Un giardiniere senza volto pota le siepi del labirinto. | {A} si perde nel labirinto e incontra il giardiniere. | {A} viene ferit[A:o/a] dalle cesoie. | {A} esce dal labirinto seguendo la propria traccia di gesso.
Le ombre | Le ombre si staccano dai corpi e si muovono da sole. | {A} viene strangolat[A:o/a] dalla propria ombra. | {A} viene ferit[A:o/a] dalla propria ombra. | {A} accende tutte le luci e le ombre spariscono.
Il terremoto | La villa trema e i pavimenti si spaccano. | {A} cade in una crepa che porta sotto le fondamenta. | {A} viene colpit[A:o/a] da un pezzo di soffitto. | {A} si ripara sotto un tavolo di quercia.
La voce al telefono | Il vecchio telefono squilla: una voce dice a ognuno dove trovare la salvezza. | {A} segue le istruzioni e cade in una botola. | {A} segue le istruzioni e si ferisce. | {A} non risponde al telefono.
I corvi | Uno stormo di corvi sfonda le finestre. | {A} viene accecat[A:o/a] e cade dalla balaustra. | {A} viene beccat[A:o/a] a sangue. | {A} si chiude in un armadio.
La nebbia del giardino | Una nebbia densa sale dal cimitero e avvolge la villa. | {A} esce nella nebbia e scompare. | {A} viene graffiat[A:o/a] da qualcosa nella nebbia. | {A} chiude tutte le finestre. | malato
Lo specchio infranto | Tutti gli specchi della villa esplodono. | {A} viene trafitt[A:o/a] dalle schegge. | {A} viene ferit[A:o/a] al viso. | {A} si trovava in una stanza senza specchi.
Il banchetto dei morti | I morti si siedono a tavola e invitano i vivi. | {A} accetta l'invito e mangia il loro cibo. | {A} mangia un solo boccone e si ammala. | {A} rifiuta con educazione e viene lasciat[A:o/a] in pace. | avvelenato
La serra carnivora | Le piante della Serra si nutrono di chi entra. | {A} viene divorat[A:o/a] da una pianta enorme. | {A} viene punt[A:o/a] da spine velenose. | {A} chiude la porta della Serra a chiave. | avvelenato
Il prete | Un prete compare per un esorcismo, ma non ha riflesso. | {A} si confessa e non ne esce viv[A:o/a]. | {A} viene ferit[A:o/a] dal prete con un crocifisso. | {A} capisce il trucco e scappa.
L'orologio | L'orologio a pendolo si ferma: il tempo nella villa si blocca. | {A} resta bloccat[A:o/a] nel tempo per sempre. | {A} invecchia di colpo. | {A} riavvia l'orologio con la chiave. | malato
Le bambole | Decine di bambole di porcellana aprono gli occhi. | {A} viene circondat[A:o/a] dalle bambole. | {A} viene ferit[A:o/a] da cocci di porcellana. | {A} le chiude tutte in un baule.
La cripta | La cripta si apre e i sepolti si alzano. | {A} viene trascinat[A:o/a] in una bara. | {A} viene ferit[A:o/a] da un'unghia lunghissima. | {A} sigilla la cripta con il sale.
Il gas | Un odore dolciastro sale dalle tubature. | {A} si addormenta nel gas e non si sveglia più. | {A} si sente male per ore. | {A} apre le finestre in tempo. | avvelenato
La notte senza fine | Fuori dalle finestre il sole non sorge più. | {A} esce per vedere e non rientra. | {A} perde la cognizione del tempo e si ammala. | {A} tiene il conto delle ore con le candele. | malato
Il padrone di casa | Il padrone di casa scende finalmente a salutare i suoi ospiti. | {A} viene scelt[A:o/a] come ospite d'onore e sparisce con lui. | {A} viene ferit[A:o/a] dal suo bastone d'argento. | {A} si nasconde dietro una colonna.
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
