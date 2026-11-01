/* Reame Incantato — eventi aggiuntivi e disastri. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.fantasy = {
    extra: {
      b: `
1 +med:A | {A} afferra una fiala di pozione rossa dall'Altare.
1 @stl | {A} si avvolge in un mantello elfico e diventa quasi invisibile.
1 s:A=malato | {A} tocca un'arma maledetta e sente un gelo nelle ossa.
2 k:A>B @agg | {A} solleva {arma} dall'Altare e abbatte {B} al primo colpo.
2 al:AB @soc | {A} e {B} pronunciano insieme un antico giuramento di alleanza.
3 | {A}, {B} e {C} si contendono un grimorio che alla fine si chiude da solo e svanisce.
`,
      d: `
1 +arma:A @int | {A} estrae {arma} da una roccia incantata.
1 @int | {A} decifra le rune incise sulla Torre in rovina.
1 +cibo:A | {A} raccoglie {cibo} in una radura fatata.
1 s:A=malato | {A} beve da una fonte stregata e la sua pelle diventa grigia.
1 need:A=malato cure:A @heal *2 | {A} prepara un infuso d'argento e sconfigge la maledizione.
1 d:A | {A} entra in un cerchio di funghi e non ne esce più.
1 d:A | {A} sfida un troll a un indovinello e perde.
1 s:A=ferito | {A} viene colpit[A:o/a] dalla coda di una viverna.
1 @luck | {A} libera una fata intrappolata, che in cambio [A:gli/le] promette fortuna.
1 @mad | {A} stringe un patto con un'ombra che parla con la sua stessa voce.
1 +med:A @soc | {A} aiuta un nano ferito, che [A:gli/le] regala un balsamo curativo.
2 k:A>B @int | {A} lancia una maledizione su {B}, che si trasforma in pietra.
2 k:A>B w:A | {A} sfida {B} a duello sul ponte della Torre e vince con {arma:A}.
2 al:AB | {A} e {B} cavalcano insieme un grifone ferito fino alla Foresta elfica.
2 steal:A<B @stl | {A} ruba {arma:B} a {B} usando un incantesimo di sonno.
2 hit:A>B @agg | {A} evoca un vento tagliente contro {B}.
2 need:B=* cure:B @heal | {A} canta un'antica ninna nanna elfica che guarisce {B}.
3 k:AB>C | {A} e {B} attirano {C} nella tana di un drago addormentato.
3 al:ABC @soc | {A}, {B} e {C} fondano una compagnia e scelgono uno stendardo.
2 | {A} e {B} si incontrano al Lago nebbioso e decidono di ignorarsi.
`,
      n: `
1 | {A} osserva le stelle cadenti ed esprime un desiderio.
1 d:A | {A} si addormenta nella Palude stregata e viene trascinat[A:o/a] sott'acqua dalle ninfe.
1 @int | {A} legge un libro di incantesimi alla luce di un fuoco blu.
2 ally:AB | {A} e {B} si raccontano leggende dei propri villaggi.
2 k:A>B @stl | {A} sussurra un incantesimo di sonno eterno sopra {B}.
`,
      f: `
1 s:A=avvelenato | {A} assaggia una portata del banchetto e si sente subito male.
1 +arma:A | {A} trova {arma} nascosta sotto la tovaglia del banchetto.
2 k:A>B | {A} offre a {B} un calice di vino avvelenato.
`,
    },
    dis: `
Pioggia di stelle | Frammenti di stelle cadenti precipitano sul reame. | {A} viene colpit[A:o/a] da una stella in fiamme. | {A} viene ustionat[A:o/a] da una scheggia luminosa. | {A} si ripara nelle Miniere.
Il risveglio dei giganti | I giganti di pietra si alzano dalle montagne. | {A} viene schiacciat[A:o/a] da un passo di gigante. | {A} viene sbalzat[A:o/a] lontano da un masso. | {A} si nasconde in una fessura della roccia.
La strega della palude | Una strega antica reclama un tributo dal reame. | {A} viene trasformat[A:o/a] in un rospo e sparisce nel fango. | {A} resiste all'incantesimo, ma resta indebolit[A:o/a]. | {A} offre alla strega un dono e viene risparmiat[A:o/a]. | malato
Sciame di pixie | Migliaia di pixie dispettose invadono il cielo. | {A} viene sollevat[A:o/a] in aria e lasciat[A:o/a] cadere. | {A} viene punzecchiat[A:o/a] fino a sanguinare. | {A} le distrae con un pezzo di pane dolce.
Il lago si ghiaccia | Il Lago nebbioso gela in un istante. | {A} resta intrappolat[A:o/a] sotto il ghiaccio. | {A} rompe il ghiaccio e ne esce congelat[A:o/a]. | {A} si trovava lontano dalla riva. | malato
Spettri della Torre | Gli spettri dei vecchi re escono dalla Torre in rovina. | {A} viene toccat[A:o/a] da uno spettro e il cuore si ferma. | {A} invecchia di colpo di dieci anni. | {A} si inchina agli spettri, che passano oltre. | malato
L'Idra | Un'idra a sette teste emerge dal Lago nebbioso. | {A} viene divorat[A:o/a] da una delle teste. | {A} taglia una testa, ma ne nascono due e deve fuggire ferit[A:o/a]. | {A} si nasconde dietro una cascata.
Nebbia dell'oblio | Una nebbia argentea fa dimenticare a tutti il proprio nome. | {A} vaga senza meta fino a perdersi per sempre. | {A} si ritrova senza sapere dove sia, con le mani ferite. | {A} incide il proprio nome su una pietra e lo ricorda. | malato
Piante strangolatrici | Le radici della Foresta elfica si animano. | {A} viene stritolat[A:o/a] dalle radici. | {A} si libera tagliando i rami, ma resta ferit[A:o/a]. | {A} brucia le radici con una torcia.
L'incendio del drago | Il drago sorvola la Foresta elfica sputando fuoco. | {A} viene avvolt[A:o/a] dalle fiamme. | {A} riporta ustioni su tutto il corpo. | {A} si tuffa nel Lago appena in tempo.
Il portale | Un portale viola si apre al centro del reame. | {A} viene risucchiat[A:o/a] in un'altra dimensione. | {A} viene sputat[A:o/a] fuori dal portale con le ossa doloranti. | {A} si aggrappa a una colonna e resiste.
Basilisco | Un basilisco striscia fuori dalle Miniere. | {A} incrocia lo sguardo del basilisco e diventa pietra. | {A} viene mors[A:o/a] mentre fugge a occhi chiusi. | {A} usa uno scudo lucido come specchio. | avvelenato
Pioggia di rane | Il cielo si apre e cadono migliaia di rane velenose. | {A} viene sepolt[A:o/a] da una valanga di rane. | {A} tocca una rana e la mano si gonfia. | {A} si copre con un mantello e aspetta. | avvelenato
Le campane maledette | Le campane del reame suonano senza sosta. | {A} impazzisce per il suono e si getta dalla Torre. | {A} perde l'udito e il senso dell'equilibrio. | {A} si tappa le orecchie con la cera. | malato
Il sole nero | Un sole nero sorge sul reame e assorbe ogni luce. | {A} si perde nel buio e cade in un crepaccio. | {A} viene ferit[A:o/a] da creature invisibili. | {A} accende una pietra luminosa e trova la strada.
Gli gnomi minatori | Un esercito di gnomi esce dalle Miniere armato di picconi. | {A} viene fatt[A:o/a] a pezzi dagli gnomi. | {A} viene colpit[A:o/a] da un piccone mentre scappa. | {A} paga gli gnomi con una moneta d'oro.
Specchio d'acqua | Il Lago mostra a ognuno il proprio futuro. | {A} vede la propria morte e si getta in acqua. | {A} resta sconvolt[A:o/a] dalla visione e non dorme. | {A} si rifiuta di guardare. | malato
Lupi d'ombra | Lupi fatti di ombra cacciano chiunque si trovi al buio. | {A} viene raggiunt[A:o/a] dai lupi d'ombra. | {A} viene morsicat[A:o/a] prima di raggiungere la luce. | {A} si siede accanto a un fuoco e i lupi non si avvicinano.
Terremoto magico | Le linee magiche del reame si spezzano. | {A} viene inghiottit[A:o/a] da una frattura luminosa. | {A} viene sbalzat[A:o/a] contro un albero. | {A} si mette al centro di un cerchio di pietre.
Fuochi fatui | Centinaia di fuochi fatui danzano nella Palude stregata. | {A} li segue fino a sprofondare nella palude. | {A} si ferisce cercando di tornare indietro. | {A} chiude gli occhi e resta immobile fino all'alba.
Il re dei goblin | Il re dei goblin reclama un ostaggio. | {A} viene trascinat[A:o/a] nel regno sotterraneo. | {A} riesce a fuggire, ma con un pugnale nella spalla. | {A} sfida il re a un indovinello e vince.
Vento di cenere | Un vento di cenere bollente scende dal Picco del drago. | {A} soffoca nella cenere. | {A} riporta bruciature ai polmoni. | {A} si copre il viso con un panno bagnato. | malato
Le sirene | Canti irresistibili si alzano dal Lago nebbioso. | {A} cammina verso l'acqua e non torna più. | {A} si risveglia nell'acqua gelata, quasi annegat[A:o/a]. | {A} si lega a un albero per resistere al canto.
Tempesta di rune | Le rune incise sulle rocce si attivano tutte insieme. | {A} viene colpit[A:o/a] da una runa di fuoco. | {A} viene sfiorat[A:o/a] da una runa di ghiaccio. | {A} legge le rune e le evita.
La caccia selvaggia | Cavalieri spettrali galoppano attraverso il reame. | {A} viene travolt[A:o/a] dalla cavalcata. | {A} viene ferit[A:o/a] da una lancia spettrale. | {A} si nasconde sotto un ponte di pietra.
Il cristallo crepato | Il cristallo che protegge il reame si incrina. | {A} viene trafitt[A:o/a] da una scheggia di cristallo. | {A} viene ferit[A:o/a] da una pioggia di frammenti. | {A} si ripara dietro uno scudo.
L'albero antico | L'albero più antico della Foresta elfica si risveglia e reclama sangue. | {A} viene inghiottit[A:o/a] dal tronco. | {A} viene ferit[A:o/a] da un ramo spinoso. | {A} pianta un seme come offerta e viene risparmiat[A:o/a].
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
