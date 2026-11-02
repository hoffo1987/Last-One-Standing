/* Isola Battle Royale — pacchetto esteso. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.packs = D.packs || [];
  D.packs.push({
    theme: 'royale',
    ev: {
      b: `
1 +amuleto:A | {A} atterra su un tetto e trova subito {amuleto}. Inizio da professionista.
1 s:A=ferito | {A} apre il paracadute a un metro da terra. Si rompe due dita e un po' di autostima.
2 k:A>B | {A} atterra direttamente in testa a {B}. Eliminazione da manuale, anche se non intenzionale.
2 save:A>B | {A} trascina {B} dietro un muro mentre una granata esplode dove si trovava un attimo prima.
1 @show star:A | {A} atterra facendo un balletto in aria. Le visualizzazioni esplodono.
1 @cow | {A} atterra in mezzo al mare e passa il resto della mattina a nuotare verso la riva.
`,
      d: `
1 +cibo:A | {A} trova un frigorifero pieno di energy drink. Ne beve sei. Il cuore fa cose strane.
1 @mad | {A} costruisce una torre di legno alta venti metri nel mezzo di un campo. Nessuno capisce perché. Nemmeno {A}.
1 s:A=ferito | {A} prova a ricaricare in corsa e inciampa nella propria granata. Sicura inserita, per fortuna. Ginocchio no.
1 d:A *0.5 | {A} si mette a ballare in mezzo alla strada dopo aver trovato un'arma leggendaria. Un cecchino apprezza il balletto.
1 +arma:A @luck | {A} apre una cassa abbandonata e trova {arma} con tutti gli accessori.
1 @show star:A | {A} fa un tiro impossibile con un sasso a un uccello in volo. Va in tendenza ovunque.
1 +mappa:A @int | {A} capisce in anticipo dove si chiuderà la zona e segna tutto su {mappa}.
1 +esplosivo:A | {A} trova {esplosivo} in un magazzino. Si sente invincibile per tre minuti.
1 need:A=ferito +med:A cure:A *2 | {A} si cura dietro una roccia con calma imperiale mentre intorno piovono proiettili.
1 @cow | {A} si nasconde in un bagno chimico per due ore. Nessuno ci entra, per ovvi motivi.
2 k:A>B @stl | {A} si mimetizza in un cespuglio. {B} si siede proprio sopra quel cespuglio.
2 hit:A>B @agg | {A} spara a {B} da cinquecento metri e l[B:o/a] prende al primo colpo. Al braccio. Ottimo comunque.
2 love:AB @soc | {A} e {B} si trovano a curarsi a vicenda dietro la stessa roccia. Nasce qualcosa tra una benda e l'altra.
2 couple:AB @show | {A} e {B} si fanno una foto davanti al tramonto sopra un'auto blindata. Copertina di tutte le riviste.
2 grudge:A>B k:A>B *3 | {A} segue le tracce di {B} per tutta l'isola. Quando l[B:o/a] trova, non spreca un colpo. Per {caro:A}.
2 grudge:A>B hit:A>B *2 | {A} lancia una granata nella casa di {B} per {caro:A}. {B} esce da una finestra in fiamme, ma viv[B:o/a].
2 save:A>B | {A} rianima {B} a terra mentre tutto intorno piovono colpi.
2 steal:A<B @stl | {A} saccheggia lo zaino di {B} mentre {B} si allaccia le scarpe.
2 repay:A>B give:A>B=med | {A} lascia a {B} il proprio kit di cura: "Siamo pari".
2 feared:B @cow | {A} vede il numero di uccisioni di {B} sul tabellone e decide di vivere in un fienile per sempre.
2 traitor:B rel:AB-30 | {A} manda in chat a tutta l'isola la posizione di {B}, "a titolo informativo".
2 enemy:AB | {A} e {B} si sparano da due colline opposte per un'ora. Nessuno dei due vuole cedere. Finisce quando arriva la zona.
3 al:ABC @soc | {A}, {B} e {C} formano una squadra improvvisata e scelgono un nome orribile: "I Campioni".
3 k:AB>C | {A} distrae {C} facendo rumore con una pentola; {B} fa il resto.
3 couple:AB hit:C>A | {C} spara a {A} per gelosia di {B}. Mira al cuore, prende il gomito.
2 veleno:A k:A>B @stl *1.5 | {A} lancia {veleno:A} dentro la casa dove si è chius[B:o/a] {B}.
3 esplosivo:A k:A>BC | {A} fa saltare {esplosivo:A} sotto il ponte proprio mentre lo attraversano {B} e {C}.
1 need:A=affamato @mad | Affamat[A:o/a], {A} mangia l'erba di un campo da golf. Non ha niente da dire al riguardo.
2 friend:AB @show | {A} e {B} si mettono d'accordo per non spararsi e fanno a gara a chi colpisce più lattine.
`,
      n: `
1 | {A} dorme con un occhio aperto e il visore notturno sull'altro.
1 d:A *0.5 | {A} accende una sigaretta di notte su un tetto. Il cecchino ringrazia.
2 couple:AB | {A} e {B} si alternano a vegliare. Nessuno dei due riesce davvero a dormire, e va bene così.
2 grudge:A>B | {A} conta i colpi rimasti e prepara un colpo solo, con il nome di {B} sopra.
2 k:A>B @stl | {A} si avvicina strisciando nell'erba alta e sorprende {B} nel sacco a pelo.
`,
      f: `
2 k:A>B | {A} e {B} arrivano alla cassa leggendaria nello stesso istante. Uno dei due la apre.
1 +amuleto:A | Nella cassa leggendaria c'è anche {amuleto}. {A} ne approfitta prima che qualcuno se ne accorga.
`,
      ds: `
1 con:A=mappa | Grazie a {mappa:A}, {A} era già nella zona sicura da un'ora.
2 save:A>B | {A} carica {B} sul quad e accelera fuori dal pericolo.
`,
    },
    dis: `
La zona che si espande | Per errore, la zona sicura si allarga invece di stringersi. Poi si ristringe di colpo. | {A} non capisce più niente e resta fuori. | {A} rientra appena in tempo, con la salute al minimo. | {A} non si era mai spostat[A:o/a] dal centro: ottima scelta.
I bot di livello massimo | Entrano in gioco bot con mira perfetta. | {A} viene centrat[A:o/a] da un bot da un chilometro. | {A} viene colpit[A:o/a] alla gamba. | {A} si nasconde in un cassonetto.
La pioggia di granate | Granate cadono dal cielo come confetti. | {A} viene colpit[A:o/a] in pieno. | {A} viene sbalzat[A:o/a] lontano da un'esplosione. | {A} si rifugia in un bunker.
Il lag | La realtà dell'isola rallenta per un'ora, poi accelera di colpo. | {A} viene teletrasportat[A:o/a] dentro un muro. | {A} si ritrova cinque metri più in là, con un dente rotto. | {A} non si muove finché tutto non torna normale. | sconvolto
Il camion dei rifornimenti | Un camion senza conducente attraversa l'isola a tutta velocità. | {A} viene investit[A:o/a] dal camion. | {A} si aggrappa al camion e viene trascinat[A:o/a] per un chilometro. | {A} salta sul camion e si fa un giro.
La stagione degli uragani | Tre uragani contemporaneamente attraversano l'isola. | {A} viene sollevat[A:o/a] e lanciat[A:o/a] nel mare. | {A} viene colpit[A:o/a] da una mucca in volo. | {A} si chiude in una cantina.
La notte dei visori rotti | I visori notturni smettono di funzionare tutti insieme. | {A} cade da un tetto al buio. | {A} sbatte contro un albero a tutta velocità. | {A} aveva sempre preferito il buio.
L'evento speciale | Gli organizzatori lanciano un evento a tempo con armi dorate e trappole ovunque. | {A} corre verso le armi dorate e trova solo trappole. | {A} prende un'arma dorata e una pallottola in una spalla. | {A} guarda tutti correre e resta al sicuro.
Il gas della Centrale | La Centrale elettrica rilascia un gas verde. | {A} non trova la maschera. | {A} tossisce per ore. | {A} indossa la maschera. | avvelenato
Squalo di terra | Uno squalo meccanico nuota sotto il terreno dell'isola. | {A} viene inghiottit[A:o/a] dal terreno. | {A} perde una scarpa e un pezzo di piede. | {A} salta su un tetto.
La pioggia di monete | Il cielo piove monete d'oro. Pesanti. | {A} viene colpit[A:o/a] in testa da una moneta enorme. | {A} si rompe un dito raccogliendone troppe. | {A} si ripara sotto un tetto e ride.
La cancellazione | Una parte dell'isola viene cancellata per un aggiornamento. | {A} si trovava nella parte cancellata. | {A} riesce a scappare, ma perde metà dello zaino. | {A} non si trovava lì.
Il torneo di emote | Gli organizzatori premiano chi balla meglio. Ma chi balla, si ferma. | {A} si mette a ballare in mezzo a una strada sotto tiro. | {A} balla e prende un colpo di striscio. | {A} balla al riparo e vince il torneo.
Il terremoto della Base | La Base militare collassa su se stessa. | {A} resta sepolt[A:o/a] sotto il cemento. | {A} viene colpit[A:o/a] da una trave. | {A} era uscit[A:o/a] per prendere un panino.
Gli elicotteri giocattolo | Migliaia di droni giocattolo invadono l'isola. Sono armati. | {A} viene sopraffatt[A:o/a] dai droni. | {A} viene ferit[A:o/a] da un drone a un orecchio. | {A} spegne i droni con una radio.
L'isola galleggiante | L'isola si stacca dal fondale e comincia a ondeggiare. | {A} cade in mare da una scogliera. | {A} si fa male cadendo da un tetto inclinato. | {A} si sdraia e si gode l'onda.
`,
  });
  D.packs.push({
    theme: 'royale', adult: true,
    ev: {
      d: `
2 k:A>B @agg | {A} riempie {B} di piombo con un caricatore intero. Del corpo resta poco più di un'impressione.
1 s:A=ubriaco | {A} trova una cassa di birra e la finisce tutta prima di mezzogiorno. Spara a un'auto convinto che sia un orso.
2 love:AB @show | {A} e {B} spariscono in un fienile per "fare una ricognizione". La ricognizione dura un'ora e la regia passa ad altra inquadratura.
1 @mad | {A} insulta in diretta il pubblico, gli sponsor e gli sviluppatori, con un repertorio di bestemmie che la regia non riesce a coprire.
2 need:A=ubriaco love:AB @drunk | Ubriac[A:o/a] fradic[A:io/ia], {A} si dichiara a {B} con un megafono. Tutta l'isola sente. {B} accetta comunque.
1 d:A *0.4 | {A} viene colpit[A:o/a] da un razzo in pieno petto. La telecamera inquadra un cratere e un paio di scarpe.
2 hit:A>B | {A} spara a {B} nel sedere con un fucile a pompa. Per giorni {B} non potrà sedersi.
`,
      n: `
2 couple:AB | {A} e {B} passano la notte in una casa abbandonata. I vicini virtuali si lamentano del rumore.
2 k:A>B @stl | {A} accoltella {B} nel sacco a pelo e si prende la sua birra.
`,
    },
    dis: `
Il festival | Gli organizzatori aprono un festival musicale al centro dell'isola, con alcol gratis. | {A} va al festival e viene sorpres[A:o/a] ubriac[A:o/a] da un cecchino. | {A} si sveglia il giorno dopo con un tatuaggio e una ferita. | {A} beve una birra e se ne va presto. | ubriaco
La pioggia di sangue | Una tempesta artificiale rende rosso il mare e le strade. Pura scena. | {A} scivola sul sangue finto e si rompe la testa. Il sangue diventa vero. | {A} vomita per lo shock. | {A} trova il tutto molto artistico. | sconvolto
`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
