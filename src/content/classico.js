/* Arena Classica — eventi aggiuntivi e disastri.
 * Disastri in formato compatto: Nome | introduzione | morte | danno | salvezza [| stato del danno] */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.classico = {
    extra: {
      b: `
1 | {A} afferra un rotolo di corda e sparisce tra gli alberi.
1 +cibo:A | {A} riempie una borraccia e se ne va prima che la mischia entri nel vivo.
1 s:A=ferito | {A} prende una gomitata in faccia nella calca, ma riesce a scappare.
2 al:AB @soc | {A} e {B}, compagni di allenamento, corrono verso il Bosco fianco a fianco.
2 k:A>B | {A} spinge {B} giù dalla piattaforma di partenza.
3 | {A}, {B} e {C} si fronteggiano sopra lo stesso zaino finché un'esplosione non l[ABC:i/e] fa scappare.
`,
      d: `
1 | {A} segue il corso del Fiume sperando di trovare un riparo.
1 +cibo:A @int | {A} riconosce una pianta commestibile grazie a quanto ha studiato prima dei giochi.
1 s:A=avvelenato | {A} mangia delle bacche sconosciute e sta male per ore.
1 need:A=avvelenato cure:A @int *2 | {A} trova le foglie giuste per curare l'avvelenamento.
1 @stl | {A} si mimetizza con il fango delle Paludi.
1 +arma:A | {A} fruga tra le Rovine e ne riemerge con {arma}.
1 d:A | {A} si avventura nelle Paludi e viene risucchiat[A:o/a] dalle sabbie mobili.
1 s:A=ferito | {A} cade da un albero mentre cerca nidi.
1 @soc | {A} dedica un saluto alla propria famiglia davanti alle telecamere.
1 +med:A @luck | Uno sponsor generoso manda a {A} un unguento per le ustioni.
2 k:A>B @stl | {A} si apposta su un ramo e piomba addosso a {B}.
2 al:AB @soc | {A} riconosce in {B} qualcuno del proprio quartiere e propone una tregua.
2 ally:AB +cibo:A | {A} e {B} pescano insieme nel Fiume.
2 k:A>B w:A | {A} ferma {B} sulla riva del Fiume e l[B:o/a] colpisce con {arma:A}.
2 hit:A>B @agg | {A} lancia un sasso con precisione e colpisce {B} alla tempia.
2 | {A} segue {B} per ore senza trovare il coraggio di attaccare.
2 need:B=* cure:B @heal | {A} prepara un impacco di erbe per {B}.
3 k:A>B @agg | {A} attira {B} in un'imboscata mentre {C} fa da esca.
3 al:ABC @soc | {A}, {B} e {C} si incontrano alle Rovine e decidono di non combattere tra loro.
2 k:A>B @int | {A} taglia la corda del ponte proprio mentre {B} lo sta attraversando.
`,
      n: `
1 | {A} dorme legat[A:o/a] a un ramo per non cadere.
1 @stl | {A} cammina tutta la notte per allontanarsi dalla Cornucopia.
1 d:A | {A} viene mors[A:o/a] da un serpente nel sonno.
1 @mad | {A} fischia la melodia dell'arena fino all'alba.
2 k:A>B @agg | {A} segue il fumo del fuoco di {B} e l[B:o/a] sorprende.
2 ally:AB | {A} e {B} si stringono sotto un'unica coperta.
`,
      f: `
1 +med:A | {A} recupera lo zaino con la medicina che [A:gli/le] serviva.
1 d:A | {A} corre verso il festino, ma viene travolt[A:o/a] da {mostro}.
2 k:A>B @stl | {A} si nasconde dentro la Cornucopia e aspetta che {B} si avvicini.
`,
    },
    dis: `
Grandinata | Chicchi di ghiaccio grandi come pugni cadono sull'arena. | {A} viene colpit[A:o/a] alla testa e non si rialza. | {A} si ripara come può, ma ne esce pien[A:o/a] di lividi. | {A} si infila sotto una sporgenza di roccia.
Terremoto | La terra trema e l'Altopiano si spacca in due. | {A} precipita in una crepa. | {A} viene colpit[A:o/a] da una frana. | {A} si stende in uno spazio aperto e aspetta che finisca.
Ondata di caldo | La temperatura sale a cinquanta gradi in poche ore. | {A} crolla per un colpo di calore. | {A} si disidrata e fatica a reggersi in piedi. | {A} resta all'ombra di una grotta fino a sera. | affamato
Gelo improvviso | In pochi minuti l'arena si copre di brina. | {A} muore assiderat[A:o/a]. | {A} perde la sensibilità alle dita dei piedi. | {A} accende un fuoco appena in tempo. | malato
Scimmie mutanti | Un branco di scimmie dalle unghie d'acciaio scende dagli alberi. | {A} viene sopraffatt[A:o/a] dalle scimmie. | {A} si libera dalle scimmie a colpi di bastone, ma resta ferit[A:o/a]. | {A} si getta in acqua: le scimmie non sanno nuotare.
Pioggia acida | Nuvole giallastre scaricano una pioggia che corrode tutto. | {A} resta allo scoperto troppo a lungo. | {A} si copre con delle foglie, ma la pelle si riempie di vesciche. | {A} trova riparo sotto una lastra di pietra.
Uccelli imitatori | Stormi di uccelli ripetono le grida dei caduti. | {A} segue una voce familiare fino a un dirupo. | {A} viene beccat[A:o/a] a sangue dallo stormo. | {A} si tappa le orecchie e resta immobile.
Valanga | Dall'Altopiano si stacca una valanga di neve artificiale. | {A} viene sepolt[A:o/a] dalla neve. | {A} viene trascinat[A:o/a] a valle, ma riesce a uscire. | {A} vede la valanga in tempo e si sposta di lato.
Tempesta di fulmini | Un temporale scarica centinaia di fulmini sul Bosco. | {A} viene centrat[A:o/a] da un fulmine. | {A} viene scaraventat[A:o/a] lontano da un fulmine caduto a pochi passi. | {A} si accovaccia lontano dagli alberi.
Nebbia allucinogena | Una nebbia dolciastra fa vedere a ognuno le proprie paure. | {A} fugge dalle proprie allucinazioni e cade da una scogliera. | {A} si ferisce combattendo contro nemici immaginari. | {A} si lega a un albero finché la nebbia non passa.
Formiche carnivore | Un fiume di formiche rosse divora tutto ciò che incontra. | {A} non riesce a togliersi le formiche di dosso. | {A} si salva, ma ha le gambe coperte di morsi. | {A} attraversa il Fiume a nuoto e le formiche si fermano.
Lupi dagli occhi umani | Lupi con occhi stranamente familiari escono dalle Rovine. | {A} viene raggiunt[A:o/a] dal branco. | {A} sale su un albero con una gamba sanguinante. | {A} si arrampica sulla Cornucopia, fuori dalla portata dei lupi.
Acqua avvelenata | Il Fiume cambia colore: qualcuno ha avvelenato la fonte. | {A} beve prima di accorgersene. | {A} beve solo un sorso e passa la giornata a stare male. | {A} nota il colore strano e non tocca l'acqua. | avvelenato
Incendio delle Paludi | Il gas delle Paludi prende fuoco. | {A} viene avvolt[A:o/a] dalle fiamme. | {A} si ustiona le braccia per uscire. | {A} si immerge nel fango e lascia passare il fuoco.
Alberi abbattuti | Gli alberi del Bosco vengono abbattuti dall'alto, uno dopo l'altro. | {A} viene schiacciat[A:o/a] da un tronco. | {A} viene colpit[A:o/a] di striscio da un ramo. | {A} corre verso la radura e resta illes[A:o/a].
Notte infinita | Gli organizzatori spengono il sole: l'arena resta al buio per un giorno intero. | {A} cammina al buio e cade in un burrone. | {A} si ferisce inciampando tra le rocce. | {A} resta immobile al riparo finché la luce non torna.
Cinghiali d'acciaio | Una mandria di cinghiali dalle zanne d'acciaio carica attraverso il Bosco. | {A} viene travolt[A:o/a] dalla carica. | {A} viene incornat[A:o/a] a una gamba. | {A} sale su un masso e guarda passare la mandria.
Sanguisughe giganti | Il Fiume si riempie di sanguisughe lunghe come un braccio. | {A} viene dissanguat[A:o/a] mentre attraversa il guado. | {A} si stacca le sanguisughe, ma ha perso molto sangue. | {A} decide di non attraversare il Fiume. | malato
Pioggia di aghi | Dal cielo cadono aghi di metallo sottili come capelli. | {A} non trova riparo in tempo. | {A} si protegge con lo zaino, ma si ferisce le mani. | {A} si rifugia in una grotta.
Rovine allagate | Le Rovine vengono allagate da una sorgente sotterranea. | {A} resta intrappolat[A:o/a] in un sotterraneo. | {A} riemerge tossendo acqua. | {A} si arrampica sul tetto di un vecchio edificio.
La gabbia | Delle sbarre si alzano dal terreno e dividono l'arena in recinti. | {A} resta chius[A:o/a] in un recinto con {mostro}. | {A} resta incastrat[A:o/a] tra le sbarre e si ferisce per liberarsi. | {A} scavalca le sbarre prima che si chiudano.
Ragni velenosi | Ragni grandi come mani escono dalle tane. | {A} viene mors[A:o/a] decine di volte. | {A} viene mors[A:o/a] una volta e la gamba si gonfia. | {A} brucia le tane con una torcia. | avvelenato
Mine riattivate | Gli organizzatori riattivano le mine attorno alla Cornucopia. | {A} mette il piede sulla mina sbagliata. | {A} viene ferit[A:o/a] da una scheggia. | {A} ricorda dov'erano le mine e passa in sicurezza.
Eco dei caduti | Le voci dei caduti risuonano in tutta l'arena, giorno e notte. | {A} impazzisce e si getta nel Fiume. | {A} non riesce a dormire e si indebolisce. | {A} canta a squarciagola per coprire le voci. | malato
Muro di vento | Un vento fortissimo spazza l'Altopiano. | {A} viene sollevat[A:o/a] e scagliat[A:o/a] contro le rocce. | {A} perde lo zaino e si ferisce a un braccio. | {A} si aggrappa a una radice finché il vento non cala.
Frutti trappola | In tutta l'arena compaiono alberi carichi di frutti perfetti. | {A} mangia un frutto e muore in pochi minuti. | {A} assaggia appena un frutto e passa la notte a stare male. | {A} non si fida e lascia i frutti agli altri. | avvelenato
Vortice nel Fiume | Il Fiume comincia a girare su se stesso in un vortice enorme. | {A} viene risucchiat[A:o/a] nel vortice. | {A} si aggrappa a un tronco e viene sbattut[A:o/a] contro la riva. | {A} si tiene lontan[A:o/a] dalle rive.
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
