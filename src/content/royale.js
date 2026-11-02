/* Isola Battle Royale — eventi aggiuntivi e disastri. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.royale = {
    extra: {
      b: `
1 +med:A | {A} atterra su un tetto e trova subito un kit medico.
1 @stl | {A} atterra lontano da tutti, ai margini della mappa.
1 +arma:A @luck | {A} apre la prima cassa e trova {arma}.
2 k:A>B | {A} atterra accanto a {B} e trova un'arma una frazione di secondo prima.
2 al:AB @soc | {A} e {B} atterrano insieme e decidono di dividersi il bottino.
3 k:A>BC @agg *0.5 | {A} lancia una granata nella stanza dove {B} e {C} stanno saccheggiando.
`,
      d: `
1 +arma:A | {A} trova {arma} nella Base militare.
1 +cibo:A | {A} riempie lo zaino di {cibo}.
1 @int | {A} studia il percorso della zona sicura e si muove per tempo.
1 s:A=ferito | {A} cade dal secondo piano di una casa e si fa male.
1 @stl | {A} si nasconde in un cespuglio e aspetta.
1 +med:A @luck | {A} trova uno zaino pieno di bende e una siringa adrenalinica.
1 d:A | {A} prova a raggiungere la zona sicura a nuoto e non ci riesce.
1 @mad | {A} balla davanti a un'auto per festeggiare un'uccisione che non ha fatto.
1 | {A} guida un'auto rubata attraverso l'isola.
1 +trap:A @int | {A} piazza una mina di prossimità vicino a una porta.
2 k:A>B w:A @stl | {A} colpisce {B} dalla collina con {arma:A}.
2 k:A>B @agg | {A} entra nella casa di {B} con una granata già senza sicura.
2 k:A>B | {A} investe {B} con un'auto.
2 hit:A>B | {A} colpisce {B}, che riesce a curarsi dietro un muro.
2 steal:A<B | {A} recupera {arma:B} dallo zaino di {B} mentre è distratt[B:o/a].
2 need:B=* cure:B @heal | {A} rianima {B} quando sta per cadere.
2 al:AB | {A} e {B} fanno squadra per prendere la Base militare.
2 | {A} e {B} si sparano da lontano per dieci minuti senza colpirsi.
3 k:AB>C @agg | {A} e {B} attaccano {C} da due lati.
3 al:ABC @soc | {A}, {B} e {C} formano una squadra improvvisata.
`,
      n: `
1 | {A} si nasconde in una torre di guardia e osserva con il visore.
1 d:A | {A} viene sorpres[A:o/a] mentre ricarica nel buio.
1 +cibo:A | {A} mangia una razione militare in un fienile.
2 k:A>B @stl | {A} vede il bagliore del visore di {B} e spara per prim[A:o/a].
2 ally:AB | {A} e {B} si dividono i proiettili e fanno la guardia a turno.
`,
      f: `
1 +arma:A | {A} apre la cassa leggendaria e trova {arma} in edizione d'oro.
1 d:A | {A} corre verso la cassa leggendaria e finisce sotto il fuoco incrociato.
2 k:A>B @stl | {A} aspetta in silenzio che {B} apra la cassa e poi la prende.
`,
    },
    dis: `
Bombardamento di artiglieria | L'artiglieria colpisce a caso una zona dell'isola. | {A} viene colpit[A:o/a] da una granata d'artiglieria. | {A} si ripara dietro una cassa, ma una scheggia attraversa il legno. | {A} raggiunge un bunker prima della seconda salva.
Uragano | Un uragano si abbatte sull'isola. | {A} viene trascinat[A:o/a] via dal vento. | {A} viene colpit[A:o/a] da un pezzo di tetto. | {A} si chiude nella cantina di una casa.
Gas tossico | Un gas tossico si diffonde dalla Centrale elettrica. | {A} non trova la maschera in tempo. | {A} respira il gas e tossisce per ore. | {A} stringe la maschera antigas sul viso e attraversa la nube senza respirarla. | avvelenato
Tsunami | Un'onda gigante colpisce il Villaggio costiero. | {A} viene travolt[A:o/a] dall'onda. | {A} si aggrappa a un balcone dopo che l'onda ha reso la strada irriconoscibile. | {A} corre verso la collina in tempo.
Il cerchio rosso | Un cerchio rosso compare sulla mappa: bombardamento in arrivo. | {A} non esce dal cerchio in tempo. | {A} esce dal cerchio ferit[A:o/a] alle gambe. | {A} esce dal cerchio di corsa.
Incendio nella Foresta | Un incendio si propaga nella Foresta. | {A} resta intrappolat[A:o/a] dal fuoco. | {A} si ustiona per scappare. | {A} guida un'auto fuori dalla Foresta.
Elicotteri d'assalto | Elicotteri armati pattugliano l'isola. | {A} viene colpit[A:o/a] dall'elicottero. | {A} viene ferit[A:o/a] da una raffica. | {A} si nasconde sotto un ponte.
Black-out del radar | Il radar si spegne e nessuno sa più dov'è la zona sicura. | {A} resta fuori dalla zona senza saperlo. | {A} si accorge tardi della zona e rientra ferit[A:o/a]. | {A} indovina la direzione giusta.
Cecchini automatici | Delle torrette automatiche si attivano sui tetti. | {A} viene colpit[A:o/a] da una torretta. | {A} viene ferit[A:o/a] mentre la disattiva. | {A} evita i tetti.
Nebbia fitta | Una nebbia densa scende sull'isola. | {A} va dritt[A:o/a] contro un altro giocatore armato. | {A} cade in un fosso nella nebbia. | {A} aspetta che la nebbia si diradi.
Terremoto | Un terremoto scuote l'isola. | {A} viene schiacciat[A:o/a] da una casa crollata. | {A} viene colpit[A:o/a] da calcinacci. | {A} si mette in mezzo a un campo aperto.
Squali | Gli squali circondano l'isola e il mare diventa un pericolo. | {A} prova ad attraversare a nuoto e viene attaccat[A:o/a]. | {A} viene mors[A:o/a] a una gamba ma risale sulla barca. | {A} sceglie di passare dal ponte.
Mine nel campo | Un campo minato si rivela sotto il grano della Fattoria. | {A} mette il piede su una mina. | {A} viene ferit[A:o/a] da una mina esplosa vicino. | {A} segue le orme degli altri.
Pioggia di casse | Le casse di rifornimento cadono a decine. | {A} viene colpit[A:o/a] da una cassa in caduta. | {A} viene colpit[A:o/a] di striscio da una cassa. | {A} raccoglie una cassa intatta.
Cani da guardia | I cani della Base militare vengono liberati. | {A} viene raggiunt[A:o/a] dai cani. | {A} viene mors[A:o/a] a un braccio. | {A} si arrampica su una torre.
Zona ridotta | La zona si riduce a metà in un minuto. | {A} non fa in tempo a rientrare. | {A} rientra con la salute a un filo. | {A} era già al centro della zona.
Esplosione della Centrale | La Centrale elettrica esplode. | {A} resta dietro il cancello della Centrale quando il reattore esplode. | {A} viene sbalzat[A:o/a] dall'onda d'urto. | {A} era dall'altra parte dell'isola.
Il cecchino fantasma | Un cecchino controllato dagli organizzatori colpisce chi resta fermo. | {A} viene centrat[A:o/a] mentre si cura. | {A} vede il mirino troppo tardi: la spalla paga il ritardo. | {A} continua a muoversi a zig zag.
Interferenza | Un'interferenza disattiva i visori e le radio. | {A} cade da un tetto per la mancanza di visibilità. | {A} si ferisce cadendo. | {A} non aveva mai usato il visore.
Il ponte crolla | Il ponte che collega le due metà dell'isola crolla. | {A} cade in acqua con il ponte. | {A} si aggrappa al bordo e risale ferit[A:o/a]. | {A} aveva già attraversato.
Ondata di calore | Il sole picchia sull'isola senza un filo d'ombra. | {A} muore per un colpo di calore. | {A} si disidrata e perde forza. | {A} trova una bottiglia d'acqua fresca. | affamato
Squadra di bot | Una squadra di bot armati entra in gioco. | {A} viene eliminat[A:o/a] dai bot. | {A} viene ferit[A:o/a] combattendo i bot. | {A} elimina i bot da sol[A:o/a].
Allagamento | La pioggia allaga le zone basse dell'isola. | {A} annega in un sottopassaggio allagato. | {A} perde lo zaino nella corrente. | {A} sale sulla collina.
Granate a grappolo | Dal cielo cadono granate a grappolo. | {A} sceglie il fosso su cui cade la prima granata. | {A} viene ferit[A:o/a] alle gambe. | {A} si getta in un fosso.
Il drone kamikaze | Un drone kamikaze punta il giocatore più vicino. | {A} non riesce a sfuggire al drone. | {A} abbatte il drone, ma viene ferit[A:o/a] dall'esplosione. | {A} si nasconde in un edificio.
Il faro | Il faro dell'isola illumina chiunque si trovi all'aperto di notte. | {A} viene individuat[A:o/a] e colpit[A:o/a]. | {A} viene colpit[A:o/a] di striscio. | {A} resta all'ombra di un muro.
Tempesta di sabbia | Una tempesta di sabbia avvolge l'Aeroporto. | {A} si perde e finisce fuori dalla zona. | {A} perde l'orientamento e si ferisce. | {A} si chiude in un hangar.
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
