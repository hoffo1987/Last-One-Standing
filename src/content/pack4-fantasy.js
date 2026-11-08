/* Reame Incantato — quarto pacchetto: magia che funziona a metà, creature con cattivo carattere,
 * la corruzione che sale, fate dispettose e tributi che giocano a fare gli eroi. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'fantasy',
    ev: {
      b: `
1 test:A=agi13 ok:+arma:A ok:+amuleto:A ko:s:A=ferito | {A} raggiunge l'Altare delle armi per prim[A:o/a] e strappa dalla pietra {arma} e {amuleto}. || {A} raggiunge l'Altare delle armi, ma la spada che sceglie non vuole uscire dalla pietra. Qualcuno ne approfitta per colpirl[A:o/a].
1 +mappa:A @int | {A} ignora le spade luccicanti e prende una vecchia pergamena: {mappa}. Gli altri capiranno troppo tardi quanto vale.
1 @cow +cibo:A | {A} afferra un cesto di {cibo} e corre verso la Foresta elfica senza guardarsi indietro. Gli alberi si chiudono alle sue spalle.
2 al:AB @soc | {A} e {B} afferrano lo stesso scudo e, invece di litigare, si ritrovano a usarlo insieme per ripararsi dalle frecce. Nasce un'alleanza.
2 hit:A>B steal:A<B=amuleto @agg | {A} strappa {amuleto} dal collo di {B} durante la mischia all'Altare. {B} giura vendetta su tutti gli dei del reame.
1 test:A=fort12 ok:+esplosivo:A ko:pr:A+15 | {A} afferra una pergamena a caso: è {esplosivo}. Fortuna sfacciata. || {A} afferra una pergamena a caso e la legge ad alta voce. Era una maledizione minore: ora ha l'alito che sa di zolfo e un'ombra di corruzione addosso.
`,
      d: `
1 test:A=int13 ok:+med:A ko:pr:A+15 | {A} trova un fungo blu nella Foresta elfica e ricorda la filastrocca della nonna: «Blu che brilla, cura che zampilla». || {A} trova un fungo blu e ricorda la filastrocca sbagliata. Ha visioni per tutta la mattina e una macchia scura sul polso.
1 wx:pericolo pr:A+15 | Una pioggia nera cade sul Picco del drago e lascia sulle braccia di {A} chiazze che non vanno via con l'acqua.
1 stat:A>pr45 test:A=cor13 ok:pr:A-30 ko:pr:A+10 | {A} si immerge nella fonte sacra del Lago nebbioso, anche se l'acqua è gelida. La corruzione si scioglie come fango. || {A} si immerge nella fonte sacra, ma esce di corsa al primo brivido. La corruzione ride di l[A:ui/ei].
1 con:A=amuleto pr:A-20 | {A} recita la formula incisa su {amuleto:A}. La macchia scura sul polso si ritira di un dito.
1 @luck +cibo:A | Un corvo degli sponsor lascia cadere un fagotto ai piedi di {A}: {cibo} e un biglietto, «Da un ammiratore del reame».
1 test:A=car12 ok:+attrezzo:A ko:mo:A-10 | {A} incontra un nano scontroso all'ingresso delle Miniere e gli racconta una barzelletta. Il nano ride così tanto che gli regala {attrezzo}. || {A} racconta una barzelletta a un nano scontroso. Il nano non ride. Mai. {A} se ne va con l'autostima a pezzi.
1 test:A=furt13 ok:+valore:A ko:s:A=ferito | {A} si infila nelle Miniere e trova una vena di gemme. Ne stacca {valore} prima che il troll si svegli. || {A} si infila nelle Miniere a cercare gemme. Il troll di caverna si sveglia prima del previsto.
1 @mad mo:A+5 | {A} chiede a un albero della Foresta elfica di diventare suo alleato. L'albero non risponde. {A} lo considera un sì.
1 trait:A=superstizioso pr:A-15 mo:A+5 | {A} disegna un cerchio di sale attorno al proprio riparo e ci dorme dentro. Nessuno spirito oserebbe.
1 trait:A=romantico mo:A+15 | {A} trova una fata imprigionata in una bolla di rugiada e la libera. La fata, in cambio, [A:gli/le] canta una canzone d'amore fuori tempo.
1 trait:A=goloso food:A+25 s:A=ubriaco | {A} trova un barile di idromele nella Torre in rovina. Lo assaggia. Lo assaggia ancora. Alla fine il barile è mezzo vuoto e {A} è mezz[A:o/a] pien[A:o/a].
1 trait:A=ingegnoso +trap:A | {A} incide una runa di inciampo su una pietra del sentiero. È storta, ma funziona.
1 trait:A=cacciatore +cibo:A +cibo:A | {A} insegue un cinghiale dorato per tutta la Foresta elfica. Lo prende. Il cinghiale non era dorato: era solo molto sporco. Si mangia lo stesso.
1 stat:A<food25 test:A=sop12 ok:food:A+30 ko:s:A=avvelenato | {A} ha così fame che morde una mela del Lago nebbioso senza chiedersi perché fosse così rossa. || {A} ha così fame che morde una mela del Lago nebbioso. Era incantata, e non nel senso buono.
1 need:A=ferito test:A=int12 ok:hp:A+20 ko:hp:A-5 | {A} prepara un impiastro di erbe della Palude stregata e lo stende sulla ferita. Brucia, poi si chiude. || {A} prepara un impiastro di erbe e lo stende sulla ferita. Scopre di essere allergic[A:o/a] alla palude intera.
1 star:A @show | {A} improvvisa un duello contro la propria ombra davanti a uno specchio d'acqua. Il pubblico non capisce chi abbia vinto, ma applaude.
1 test:A=cor14 ok:+arma:A ok:star:A ko:hp:A-20 | {A} sale sul Picco del drago per rubare una lama dal tesoro della viverna. Torna giù con la lama e una cicatrice da raccontare. || {A} sale sul Picco del drago per rubare una lama dal tesoro della viverna. La viverna è in casa.
1 wx:abbondanza food:A+20 mo:A+5 | Il reame è generoso oggi: {A} trova un albero di mele dorate e ne mangia finché le guance non [A:gli/le] fanno male.
1 en:A+15 | {A} si addormenta in un cerchio di funghi e si sveglia riposat[A:o/a] come dopo una settimana. Il sole, però, si è mosso di poco: magia.
2 ally:AB test:A=int12 ok:+mappa:A ko:pr:A+10 ko:pr:B+10 | {A} e {B} decifrano insieme le rune di una lapide nella Torre in rovina: indicano i passaggi segreti del reame. || {A} e {B} leggono ad alta voce le rune di una lapide. Era una formula di corruzione. Ora brillano tutti e due di un viola poco rassicurante.
2 friend:AB give:A>B=cibo rel:AB+10 | {A} divide con {B} il pane elfico e [B:gli/le] insegna la preghiera del viandante prima del pasto.
2 save:A>B @heal | Una pianta carnivora afferra {B} per la caviglia. {A} la taglia con un colpo solo. {B} [A:gli/le] deve la vita, e una caviglia.
2 crush:A>B rel:AB+15 | {A} raccoglie per {B} un fiore che cresce solo dove è caduta una stella. Lo lascia sul suo mantello mentre dorme.
2 couple:AB pr:A-15 pr:B-15 mo:A+10 mo:B+10 | {A} e {B} si tengono per mano mentre attraversano la Palude stregata. La corruzione, a quanto pare, non sopporta le coppie felici.
2 hit:A>B @agg | {A} accusa {B} di aver[A:gli/le] rubato la razione di idromele e glielo fa capire con un pugno da taverna.
2 rival:AB @show rel:AB+5 | {A} e {B} si sfidano a chi solleva la spada più pesante dell'Altare. Le sollevano tutte e due, poi le lasciano cadere sui piedi. Pari.
2 enemy:AB test:A=int13 ok:pr:B+20 ko:pr:A+15 | {A} lascia una pergamena maledetta sul percorso di {B}. || {A} prepara una pergamena maledetta per {B}, ma la tocca per sbaglio. La maledizione non fa distinzioni.
2 test:A=car13 ok:al:AB ko:rel:AB-10 | {A} propone a {B} un patto giurato sulla pietra del giuramento. || {A} propone a {B} un patto giurato sulla pietra del giuramento. La pietra si crepa: brutto segno. {B} se ne va.
2 ally:AB test:A=cor12 ok:+cibo:A ok:+cibo:B ko:hp:A-15 | {A} e {B} affrontano insieme un troll che difende un ponte. Lo convincono a cedere il passo e un sacco di provviste. || {A} e {B} provano a passare il ponte del troll. Il troll dice no, con una clava.
2 debt:B>A give:A>B=med @heal | {A} trova {B} pallid[B:o/a] e tremante per il morso di un lupo mannaro, e [B:gli/le] lascia {med} con un cenno.
2 trust:A>B fid:A>B+10 rel:AB+10 | {A} rivela a {B} il proprio vero nome, quello magico. Nel reame è il gesto di fiducia più grande che esista.
2 fear:A>B en:A-15 | {A} vede {B} parlare con uno spettro e da quel momento le gambe non smettono più di tremare.
2 hit:A>B hit:B>A @agg | {A} e {B} litigano su chi abbia visto per primo l'unicorno. L'unicorno, nel frattempo, se ne va.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano nella stessa locanda abbandonata e decidono di essere una compagnia, come nelle ballate. Si danno anche un nome. Brutto.
3 hit:A>B hit:A>C @agg | {A} sorprende {B} e {C} a dividersi un tesoro nella Torre in rovina e decide che una parte spetta a l[A:ui/ei]. A modo suo.
3 ally:AB rel:AB+10 | {A} e {B} ascoltano {C} raccontare per la quarta volta di aver visto un drago. Si scambiano uno sguardo complice.
2 k:A>B w:A @agg | {A} sfida {B} a duello sotto la Torre in rovina. Il duello dura un respiro.
2 k:A>B grudge:A>B | {A} raggiunge {B} sul Lago nebbioso e regola il conto in sospeso. La nebbia nasconde il resto.
1 d:A @mad | {A} legge ad alta voce una pergamena trovata nelle Miniere. Era un incantesimo di fuoco. Mai leggere ad alta voce le pergamene trovate nelle Miniere.
1 d:A wx:pericolo | La viverna scende dal Picco del drago a cercare cibo e trova {A}.
`,
      n: `
1 pr:A+15 | Durante la notte gli spettri cantano nella Torre in rovina. {A} li sente fin dentro le ossa, e la corruzione si allarga.
1 test:A=cor13 ok:pr:A-10 ok:mo:A+10 ko:pr:A+20 | Uno spettro errante si siede accanto al fuoco di {A}. {A} lo guarda dritto negli occhi finché non svanisce. || Uno spettro errante si siede accanto al fuoco di {A}. {A} scappa urlando, e lo spettro l[A:o/a] segue nei sogni.
1 test:A=sop12 ok:en:A+15 ko:hp:A-15 | I lupi mannari ululano alla luna piena. {A} si arrampica su una quercia e dorme legat[A:o/a] a un ramo. || I lupi mannari ululano alla luna piena e uno di loro trova il nascondiglio di {A}.
1 @stl en:A+15 | {A} trova la tana abbandonata di un tasso gigante. È calda, asciutta, e puzza solo un pochino.
1 con:A=attrezzo en:A+10 pr:A-10 | {A} usa {attrezzo:A} per accendere un fuoco nel cerchio di pietre. La notte resta fuori.
1 @luck +amuleto:A | Una falena luminosa si posa sulla mano di {A} e lascia cadere {amuleto}. Gli sponsor del reame hanno un debole per l[A:ui/ei].
1 trait:A=sonnambulo en:A-10 pr:A+10 | {A} cammina nel sonno fino all'Altare delle armi e si sveglia abbracciat[A:o/a] a una statua. La statua non commenta.
1 trait:A=paranoico +trap:A en:A-10 | {A} non si fida della notte del reame e circonda il riparo di trappole di rovi. Dorme poco, ma dorme.
1 trait:A=folle mo:A+10 | {A} passa la notte a insegnare a una rana a dire il proprio nome. Alla fine, giura, la rana ci riesce.
1 mo:A-10 | Nel cielo del reame appaiono i volti dei caduti, disegnati dalle stelle. {A} ne riconosce uno e si copre gli occhi.
2 ally:AB pr:A-10 pr:B-10 en:A+10 | {A} e {B} accendono un fuoco di legno di sorbo, che tiene lontani gli spiriti. Dormono tranquilli.
2 couple:AB mo:A+15 mo:B+15 | {A} e {B} guardano le stelle cadenti sul Lago nebbioso e ognuno esprime un desiderio. È lo stesso.
2 crush:A>B rel:AB+10 mo:A+10 | {A} canta sottovoce una ballata d'amore mentre {B} dorme. {B} fa finta di dormire.
2 friend:AB give:A>B=amuleto rel:AB+15 | {A} dà a {B} {amuleto}: «Tienilo tu, stanotte. A me gli spiriti non fanno paura».
2 enemy:AB test:A=furt13 ok:steal:A<B=arma ko:hit:B>A | {A} si avvicina al riparo di {B} per rubar[B:gli/le] l'arma. || {A} prova a rubare l'arma di {B} nel sonno. {B} si sveglia, e l'arma la usa.
2 save:A>B @heal | Uno spettro urlante si avventa su {B}. {A} lancia un pugno di sale benedetto e lo spettro si dissolve con un grido.
2 trust:A>B fid:A>B+10 | {A} affida a {B} il turno di guardia e si addormenta subito. Nel reame è una prova di fiducia enorme.
2 owe:A>B repay:A>B give:A>B=cibo | {A} lascia a {B} il pane elfico migliore: il debito è saldato, e il pane era davvero buono.
3 al:ABC @soc | {A}, {B} e {C} si ritrovano attorno allo stesso fuoco fatato. Le fiamme diventano blu, il colore dei patti. Da stanotte sono alleati.
2 k:A>B @stl | Nella nebbia del Lago, {A} si avvicina a {B} senza fare rumore. La nebbia si richiude.
1 d:A pr:A+30 | {A} si addormenta nella Palude stregata. All'alba, al suo posto, c'è solo un salice nuovo.
2 k:A>B trap:A | {A} nasconde {trap:A} tra le radici vicino al riparo di {B}. Il reame fa il resto.
`,
      f: `
1 +med:A +cibo:A @luck | Al banchetto incantato {A} afferra un vassoio d'argento e scappa: sotto il coperchio, {med} e {cibo}.
2 hit:A>B steal:A<B=cibo @agg | Al banchetto incantato {A} e {B} si contendono un cosciotto di cinghiale. Lo vince {A}, con un colpo di caraffa.
2 al:AB @soc | Al banchetto {A} e {B} brindano con il calice dei patti. Il vino diventa oro: alleanza benedetta.
1 test:A=fort12 ok:+amuleto:A ok:+cibo:A ko:s:A=avvelenato | {A} sceglie un piatto a caso dal banchetto incantato: era quello giusto. || {A} sceglie un piatto a caso dal banchetto incantato: era quello avvelenato.
2 k:A>B w:A @agg | Al banchetto incantato {A} non lascia a {B} il tempo di sedersi.
`,
    },
  });
})(typeof window === 'object' ? window : globalThis);
