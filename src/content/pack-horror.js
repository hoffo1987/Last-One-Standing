/* Villa Maledetta — pacchetto esteso. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'horror',
    ev: {
      b: `
1 +amuleto:A | {A} si mette al collo {amuleto} trovato sotto il piatto. Era lì apposta? Meglio non chiederselo.
1 s:A=sconvolto | {A} si siede a tavola e trova il proprio nome inciso sul segnaposto. Con la data di oggi.
2 k:A>B | {A} infilza {B} con la forchetta da arrosto. A tavola. Davanti a tutti. Che maleducazione.
2 save:A>B | {A} tira via {B} dalla sedia un attimo prima che il lampadario ci cada sopra.
1 @show star:A | {A} si alza e fa un brindisi al padrone di casa. Il padrone di casa, da qualche parte, applaude.
2 al:AB @soc | {A} e {B} si scambiano uno sguardo al di sopra della zuppa e decidono di guardarsi le spalle a vicenda.
`,
      d: `
1 +cibo:A | {A} trova la dispensa piena di marmellate. Tutte con la stessa data: il giorno della sua nascita.
1 @mad | {A} organizza un tè con le bambole della Soffitta. Le bambole partecipano con entusiasmo.
1 s:A=ferito | {A} scivola sulle scale di servizio. Le scale hanno un gradino in più rispetto a ieri.
1 d:A *0.5 | {A} entra nella stanza chiusa a chiave "solo per dare un'occhiata". La porta si richiude da sola.
1 +arma:A | {A} trova {arma} appesa sopra il camino, accanto a un ritratto che somiglia a {A} in modo inquietante.
1 @show star:A | {A} fa una diretta dalla Cappella raccontando storie di fantasmi. Uno dei fantasmi corregge i dettagli.
1 +mappa:A @int | {A} trova in Biblioteca {mappa}, con un passaggio segreto segnato a matita.
1 s:A=sconvolto | {A} sente bussare dall'interno di un armadio. Tre volte. Poi una voce che dice il suo nome.
1 need:A=sconvolto cure:A @heal *2 | {A} accende tutte le luci della casa, mette su un disco jazz e torna a ragionare.
1 +veleno:A @stl | {A} trova in cucina {veleno} e lo nasconde in tasca. Non si sa mai.
1 @cow | {A} si chiude in bagno e ci resta tutto il giorno. Il bagno ha uno specchio. Sarebbe stato meglio di no.
2 k:A>B @stl | {A} spinge {B} dentro il montacarichi e taglia la corda. Il tonfo arriva dopo molto, molto tempo.
2 hit:A>B @agg | {A} colpisce {B} con un busto di marmo di qualche antenato. L'antenato sembra soddisfatto.
2 love:AB @soc | {A} e {B} si nascondono insieme nello stesso armadio e scoprono di avere molto in comune, tra cui il terrore.
2 couple:AB @show | {A} e {B} ballano un valzer nel salone vuoto mentre il pianoforte suona da solo per loro.
2 grudge:A>B k:A>B *3 | {A} chiude {B} nella cripta per {caro:A}, e poi butta la chiave nel pozzo.
2 grudge:A>B hit:A>B *2 | {A} manomette le candele della stanza di {B}, che passa la notte al buio con qualcosa che respira. Per {caro:A}.
2 save:A>B | {A} tira {B} fuori dallo specchio per i capelli. Una parte di {B} resta dall'altra parte, ma solo un po'.
2 steal:A<B @stl | {A} sostituisce {arma:B} di {B} con un mestolo. {B} se ne accorgerà nel momento peggiore.
2 repay:A>B give:A>B=amuleto | {A} regala a {B} un crocifisso d'argento: "Per quella volta".
2 feared:B @cow | {A} vede {B} pulire il sangue da un coltello fischiettando e decide di dormire in giardino.
2 traitor:B rel:AB-30 | {A} scopre che {B} parla di notte con il padrone di casa. Non è un buon segno.
2 enemy:AB | {A} e {B} si inseguono per tutta la villa come in una farsa: porte che sbattono, nessun colpo andato a segno.
3 al:ABC @soc | {A}, {B} e {C} organizzano una seduta spiritica per chiedere come uscire. Lo spirito risponde: "Non si esce."
3 k:AB>C | {A} distrae {C} con una storia di fantasmi mentre {B} apre la botola sotto i suoi piedi.
3 couple:AB hit:C>A | {C} nasconde una bambola maledetta nel letto di {A} per gelosia di {B}. La bambola fa il resto.
2 veleno:A k:A>B @stl *1.5 | {A} prepara a {B} una tazza di tè con {veleno:A}. Il tè è ottimo, a parte quello.
3 esplosivo:A k:A>BC | {A} lancia {esplosivo:A} nella stanza dove {B} e {C} cercano un passaggio segreto. Il passaggio lo trovano: verso l'alto.
1 need:A=affamato @mad | Affamat[A:o/a], {A} mangia la torta del banchetto rimasta in tavola da tre giorni. Ha un sapore di cera e di rimpianti.
2 friend:AB @show | {A} e {B} si fanno coraggio raccontandosi barzellette pessime. Anche i fantasmi ridono.
`,
      n: `
1 | {A} sente il pianoforte suonare la sua canzone preferita. Non l'ha mai detta a nessuno.
1 d:A *0.5 | {A} si sveglia con una mano fredda sulla spalla. Non si volta. Non serve.
2 couple:AB | {A} e {B} dormono abbracciat[AB:i/e] mentre qualcosa l[AB:i/e] guarda dai piedi del letto, con tenerezza.
2 grudge:A>B | {A} scrive il nome di {B} sullo specchio appannato. La scritta resta anche quando lo specchio si asciuga.
2 k:A>B @stl | {A} sussurra al buio la ninna nanna della villa vicino al letto di {B}. {B} non si sveglia più.
`,
      f: `
2 k:A>B | {A} toglie la maschera a {B} durante il ballo e scopre che sotto c'era qualcosa di vero. Poi l[B:o/a] uccide.
1 +amuleto:A | Dentro la scatola nera di {A} c'è {amuleto} e un biglietto: "Ti servirà".
`,
      ds: `
1 con:A=amuleto | {amuleto:A} diventa caldissimo: {A} capisce di dover restare ferm[A:o/a], e si salva.
2 save:A>B | {A} tira {B} dentro un passaggio segreto un attimo prima che succeda.
`,
    },
    dis: `
La cena dei dimenticati | La tavola si apparecchia da sola per gli ospiti morti negli anni passati. | {A} viene fatt[A:o/a] accomodare a capotavola e non si alza più. | {A} mangia un boccone per educazione e si sente malissimo. | {A} si scusa e dice di essere a dieta. | avvelenato
Le scale infinite | La scala principale diventa infinita: si sale e si sale e non si arriva mai. | {A} sale fino a non avere più forze. | {A} cade per tre piani e si rompe un braccio. | {A} scende invece di salire, e arriva.
Il giardino d'inverno | La neve cade dentro la villa, solo dentro. | {A} si addormenta nella neve del salone. | {A} si congela le mani. | {A} si chiude nella caldaia. | malato
Il circo | Un circo fantasma si accampa nel parco. I clown hanno i denti troppo lunghi. | {A} accetta un palloncino e viene portat[A:o/a] via. | {A} viene inseguit[A:o/a] da un clown e cade nel laghetto. | {A} non guarda i clown negli occhi. | sconvolto
La ragnatela | Ragni grandi come gatti tessono una tela su tutta l'ala ovest. | {A} resta impigliat[A:o/a] nella tela. | {A} viene mors[A:o/a] da un ragno peloso. | {A} brucia la tela con una candela. | avvelenato
Il telefono senza fili | Un vecchio telefono squilla in ogni stanza contemporaneamente. | {A} risponde e una voce l[A:o/a] convince ad aprire la finestra del terzo piano. | {A} risponde e sente per un'ora il proprio respiro. | {A} stacca tutti i fili. | sconvolto
La villa si allunga | I corridoi si allungano di notte e di giorno non tornano più. | {A} si perde in un corridoio che non finisce. | {A} vaga per ore e ne esce stremat[A:o/a]. | {A} segna il percorso con le briciole.
Il ritratto di famiglia | Tutti i concorrenti compaiono in un ritratto di famiglia appeso nel salone. Uno di loro è sbiadito. | {A} è la persona sbiadita. | {A} è un po' sbiadit[A:o/a], e si sente male. | {A} compare benissimo nel ritratto. | malato
La processione | Una processione di monaci incappucciati attraversa la villa cantando in latino. | {A} si unisce per sbaglio alla processione e non torna. | {A} viene colpit[A:o/a] da un turibolo. | {A} si nasconde dietro una tenda.
Il giardiniere ritorna | Il giardiniere senza volto è tornato e ha affilato le cesoie. | {A} viene potat[A:o/a]. | {A} perde una ciocca di capelli e un pezzo d'orecchio. | {A} si nasconde nella serra.
Le campane del cimitero | Le campane del cimitero suonano a morto per ognuno dei vivi. | {A} sente la propria campana e smette di respirare. | {A} sente la campana e sviene. | {A} non sente nulla: ha i tappi nelle orecchie. | sconvolto
Il pozzo dei desideri | Il pozzo esaudisce un desiderio a chi ci getta una moneta. Solo che è un pozzo maledetto. | {A} desidera "uscire dalla villa". Esce dal corpo. | {A} desidera essere più forte e si ritrova con un braccio di pietra. | {A} non esprime nessun desiderio.
La cantina dei vini | La cantina si apre: i vini hanno duecento anni e un retrogusto di sangue. | {A} beve fino a non svegliarsi più. | {A} beve un bicchiere e vede cose. | {A} beve solo acqua del rubinetto. | ubriaco
La notte di Valpurga | Streghe in volo sorvolano la villa e lanciano maledizioni a caso. | {A} viene trasformat[A:o/a] in un gatto nero, e il gatto scappa via. | {A} si ritrova con le orecchie a punta per un giorno. | {A} si nasconde in Cappella.
Gli specchi parlanti | Ogni specchio comincia a parlare e a dire verità crudeli. | {A} ascolta la verità su se stess[A:o/a] e non la regge. | {A} piange per ore. | {A} risponde a tono e lo specchio si scusa. | sconvolto
Il ballo dei morti | I morti si alzano e chiedono un ballo. Rifiutare è scortese. | {A} balla fino a sfinirsi e si unisce ai morti. | {A} balla un valzer e si sloga una caviglia. | {A} balla benissimo e i morti applaudono.
`,
  });
  D.packs.push({
    theme: 'horror', adult: true,
    ev: {
      d: `
2 k:A>B @agg | {A} squarta {B} con la falce del giardiniere. Il tappeto persiano assorbe tutto, ma non sarà mai più lo stesso.
1 s:A=ubriaco | {A} si scola l'assenzio della cantina. Vede una fata verde che [A:gli/le] dice cose sconce all'orecchio.
2 love:AB | {A} e {B} trovano la camera da letto padronale e decidono di "ispezionarla". La ispezionano a lungo.
1 d:A *0.5 | {A} viene inchiodat[A:o/a] alla porta della Cappella. Le assi scricchiolano per ore.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a] di brandy, {A} trascina {B} in un baldacchino polveroso. Il baldacchino crolla, ma non subito.
2 hit:A>B | {A} infila le dita negli occhi di {B} durante una colluttazione al buio. {B} vede le stelle, poi più niente da un occhio.
1 @mad | {A} ascolta i sussurri della villa che [A:gli/le] raccontano, nei dettagli, cosa succede agli ospiti. Non riesce più a smettere di ridere.
`,
      n: `
2 couple:AB | {A} e {B} si chiudono nella stanza rossa per tutta la notte. Al mattino il fantasma della stanza chiede di cambiare casa.
2 k:A>B @stl | {A} soffoca {B} con il cuscino ricamato. Il ricamo diceva "Dolce casa".
`,
    },
    dis: `
L'incubo | La villa entra nei sogni di tutti con le paure più intime e più sporche. | {A} non si sveglia dall'incubo. | {A} si sveglia urlando e graffiandosi la faccia. | {A} sogna una spiaggia e dorme benissimo. | sconvolto
Il macellaio della cucina | La cucina si riempie di ganci e di un uomo grasso con un grembiule insanguinato. | {A} finisce nello stufato. | {A} perde un dito sul tagliere. | {A} si siede e chiede la ricetta.
Il bordello dei fantasmi | L'ala est della villa torna a essere ciò che era cento anni fa: una casa di piacere per spiriti. | {A} entra in una stanza e non trova più l'uscita. | {A} esce dopo un'ora, pallid[A:o/a] e senza la giacca. | {A} declina l'invito con eleganza. | sconvolto
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
