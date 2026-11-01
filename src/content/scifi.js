/* Stazione Orbitale — eventi aggiuntivi e disastri. */
(function (G) {
  const D = (G.LOS_DATA = G.LOS_DATA || {}); D.more = D.more || {};
  D.more.scifi = {
    extra: {
      b: `
1 +med:A | {A} afferra un iniettore di nanomedicina dal ripiano dell'Hangar.
1 @stl | {A} si infila in un condotto di ventilazione prima che le capsule si aprano del tutto.
1 s:A=ferito | {A} viene colpit[A:o/a] da una scarica mentre forza un armadietto.
2 k:A>B | {A} chiude il portellone della capsula su {B}.
2 al:AB @soc | {A} e {B} si scambiano le frequenze radio e fanno squadra.
3 | {A}, {B} e {C} tirano dalla stessa cassa finché il sistema non la blocca.
`,
      d: `
1 @int | {A} ricostruisce la planimetria della stazione su un tablet rotto.
1 +cibo:A | {A} raccoglie {cibo} dalla Serra idroponica.
1 s:A=avvelenato | {A} respira un gas refrigerante uscito da un tubo rotto.
1 need:A=avvelenato cure:A @int *2 | {A} usa il depuratore della Serra per pulirsi i polmoni.
1 d:A | {A} viene schiacciat[A:o/a] da un ascensore merci impazzito.
1 d:A | {A} esce in passeggiata spaziale e il cavo di sicurezza si sgancia.
1 +trap:A @int | {A} collega un cavo ad alta tensione alla maniglia di una porta.
1 @luck +arma:A | {A} trova {arma} in un armadietto lasciato aperto.
1 @mad | {A} convince il computer di bordo a chiamarl[A:o/a] "capitano".
1 s:A=ferito | {A} si ustiona le mani su una conduttura del Reattore.
1 +med:A @soc | Un drone di soccorso riconosce {A} come paziente e [A:gli/le] lascia un medikit.
2 k:A>B @int | {A} disattiva la gravità artificiale mentre {B} è sospes[B:o/a] sopra un pozzo.
2 k:A>B w:A | {A} insegue {B} nei Condotti di servizio e l[B:o/a] colpisce con {arma:A}.
2 steal:A<B @int | {A} hackera il blocco di sicurezza e si prende {arma:B} di {B}.
2 al:AB @int | {A} e {B} uniscono le loro conoscenze per riattivare un terminale.
2 s:B=ferito @agg | {A} spinge {B} contro una paratia elettrificata.
2 need:B=* cure:B @heal | {A} usa uno scanner medico per curare {B}.
3 k:AB>C @int | {A} e {B} attirano {C} nella camera di decompressione.
3 al:ABC @soc | {A}, {B} e {C} si barricano sul Ponte di comando.
2 | {A} e {B} si incrociano in un corridoio e si puntano le armi senza sparare.
`,
      n: `
1 | {A} dorme in un tubo criogenico spento.
1 d:A | {A} si addormenta in un modulo e l'ossigeno finisce durante la notte.
1 @int | {A} ascolta le conversazioni degli altri intercettando le radio.
2 ally:AB | {A} e {B} si alternano a sorvegliare le telecamere.
2 k:A>B @stl | {A} manomette il sistema di riciclo dell'aria nel modulo di {B}.
`,
      f: `
1 +arma:A | {A} apre la propria cassa e ci trova {arma} di ultima generazione.
1 d:A | {A} arriva al rifornimento proprio mentre si attivano le difese automatiche.
2 k:A>B @stl | {A} si nasconde dentro la navetta e sorprende {B} alle spalle.
`,
    },
    dis: `
Tempesta solare | Una tempesta solare investe la stazione: le schermature cedono. | {A} assorbe una dose letale di radiazioni. | {A} si ritrova con la pelle arrossata e la nausea. | {A} si chiude nel modulo schermato. | malato
Pioggia di micrometeoriti | Una pioggia di micrometeoriti crivella lo scafo. | {A} viene trapassat[A:o/a] da un frammento. | {A} viene ferit[A:o/a] da schegge di metallo. | {A} si rifugia nel nucleo centrale.
Incendio nella Serra | Le piante della Serra idroponica prendono fuoco. | {A} resta intrappolat[A:o/a] tra le fiamme. | {A} riporta ustioni sulle braccia. | {A} attiva gli estintori in tempo.
Blackout totale | La stazione resta senza energia: buio, freddo e niente ossigeno nuovo. | {A} soffoca in un modulo sigillato. | {A} sviene per la mancanza d'aria, ma si risveglia. | {A} trova una bombola d'emergenza. | malato
Virus nell'IA | L'intelligenza artificiale della stazione impazzisce e chiude le porte a caso. | {A} resta chius[A:o/a] in un modulo che viene depressurizzato. | {A} resta schiacciat[A:o/a] per un braccio da una porta automatica. | {A} disattiva il proprio badge e diventa invisibile ai sensori.
Spore aliene | Un container della Serra si apre e libera spore aliene. | {A} respira le spore e non si sveglia più. | {A} comincia a tossire una polvere verde. | {A} indossa una tuta sigillata. | avvelenato
Il parassita | Un parassita alieno cerca un ospite. | {A} diventa l'ospite del parassita. | {A} si strappa il parassita di dosso, ma resta ferit[A:o/a]. | {A} si chiude in una cella frigorifera e il parassita si allontana.
Rotazione impazzita | La stazione inizia a ruotare troppo velocemente. | {A} viene schiacciat[A:o/a] contro una parete. | {A} sviene per la forza centrifuga e si risveglia con il naso rotto. | {A} si lega a una cuccetta.
Collisione | Un satellite abbandonato si schianta contro il modulo abitativo. | {A} viene travolt[A:o/a] dall'impatto. | {A} viene sbalzat[A:o/a] contro una paratia. | {A} si trovava dall'altra parte della stazione.
Androidi ribelli | Gli androidi di servizio si rivoltano contro gli umani. | {A} viene strangolat[A:o/a] da un androide. | {A} viene ferit[A:o/a] mentre distrugge un androide. | {A} si finge un androide e passa inosservat[A:o/a].
Perdita di plasma | Una conduttura di plasma si rompe nei Condotti di servizio. | {A} viene vaporizzat[A:o/a] dal getto di plasma. | {A} viene ustionat[A:o/a] di striscio. | {A} chiude la valvola d'emergenza.
Allarme quarantena | Il computer di bordo dichiara la quarantena e spara gas sterilizzante. | {A} viene sterilizzat[A:o/a] insieme al resto del modulo. | {A} respira il gas e passa ore a tossire. | {A} si chiude in una capsula di salvataggio. | avvelenato
Pioggia di detriti | Un'esplosione esterna proietta detriti contro le finestre. | {A} viene risucchiat[A:o/a] da un oblò sfondato. | {A} viene ferit[A:o/a] dai vetri. | {A} si allontana dalle finestre appena sente il primo colpo.
Reattore a gravità | Il reattore a gravità crea un buco nero in miniatura. | {A} viene inghiottit[A:o/a] dal buco nero. | {A} resiste aggrappat[A:o/a] a una ringhiera, con le braccia slogate. | {A} corre nella direzione opposta.
Nanobot affamati | Uno sciame di nanobot comincia a smontare tutto ciò che è metallico. | {A} viene smontat[A:o/a] insieme alla propria tuta. | {A} perde la tuta e riporta graffi profondi. | {A} si nasconde in una stanza di legno della Serra.
Il clone | Le vasche di clonazione si aprono e ne escono copie dei concorrenti. | {A} viene uccis[A:o/a] dal proprio clone. | {A} combatte contro il proprio clone e vince a fatica. | {A} convince il clone a lavorare per [A:lui/lei/loro].
Cortocircuito | Un cortocircuito elettrifica tutti i pavimenti metallici. | {A} viene fulminat[A:o/a]. | {A} viene sbalzat[A:o/a] da una scarica. | {A} sale su una cassa di plastica.
Ghiaccio criogenico | Il sistema criogenico si guasta e congela i corridoi. | {A} viene congelat[A:o/a] all'istante. | {A} perde la sensibilità alle mani. | {A} trova riparo vicino al Reattore. | malato
Crollo di pressione | La pressione dell'intera stazione crolla di colpo. | {A} non riesce a infilarsi il casco in tempo. | {A} sanguina dal naso e dalle orecchie, ma sopravvive. | {A} aveva già indossato la tuta.
Sciame di droni | Il sistema di sicurezza lancia tutti i droni contro gli intrusi. | {A} viene abbattut[A:o/a] dai droni. | {A} viene colpit[A:o/a] da un laser di striscio. | {A} disattiva il drone più vicino e si nasconde.
Esperimento fuggito | Dal laboratorio scappa un esperimento genetico. | {A} viene sbranat[A:o/a] dalla creatura. | {A} viene graffiat[A:o/a] dalla creatura. | {A} chiude la creatura in una cella frigorifera. | avvelenato
Navetta impazzita | Una navetta senza pilota sfreccia nell'Hangar. | {A} viene travolt[A:o/a] dalla navetta. | {A} viene colpit[A:o/a] da una lamiera. | {A} si getta a terra.
Allucinazioni da isolamento | Dopo giorni di buio e silenzio, tutti iniziano a vedere cose. | {A} apre un portellone convint[A:o/a] che fuori ci sia la Terra. | {A} si ferisce lottando contro un nemico immaginario. | {A} si concentra sul proprio respiro e resiste. | malato
Il campo magnetico | Il campo magnetico della stazione si inverte. | {A} viene schiacciat[A:o/a] dagli oggetti metallici attratti da ogni lato. | {A} viene colpit[A:o/a] da una chiave inglese volante. | {A} si toglie ogni oggetto metallico di dosso.
Infestazione | Delle creature simili a insetti escono dalle tubature. | {A} viene sommers[A:o/a] dagli insetti. | {A} viene punt[A:o/a] mentre fugge. | {A} usa un estintore per tenerli lontani. | avvelenato
Fuga di idrogeno | Una fuga di idrogeno riempie i Moduli abitativi. | {A} accende una scintilla nel momento sbagliato. | {A} viene investit[A:o/a] da una fiammata. | {A} avverte l'odore e se ne va subito.
Sabotaggio | Qualcuno ha sabotato i sistemi di supporto vitale. | {A} non si sveglia più nel proprio modulo. | {A} si sveglia con un mal di testa feroce. | {A} ripara il guasto con le proprie mani. | malato
`,
  };
})(typeof window !== 'undefined' ? window : globalThis);
