/* Meteo aggiuntivo per ogni arena: più varietà da un giorno all'altro. */
(function (G) {
  const D = G.LOS_DATA; if (!D || !D.eco) return;
  const add = (id, list) => { const a = D.eco.arenas[id]; if (a) a.meteo = (a.meteo || []).concat(list); };
  add('classico', [
    { n: 'Temporale estivo', d: 'Lampi sul Bosco e tuoni che coprono ogni passo.', fx: { stl: 1.4, lethal: 1.1, en: 1.15 } },
    { n: 'Vento caldo dal sud', d: 'Un vento secco asciuga il Fiume e la pazienza di tutti.', fx: { food: 1.25, tb: { cor: -1 } } },
    { n: 'Sciame di lucciole', d: 'La notte si accende di lucciole: è bellissimo, e si vede tutto.', fx: { stl: 0.75, pr: -4 } },
  ]);
  add('fantasy', [
    { n: 'Eclissi di sangue', d: 'La luna diventa rossa e la magia oscura si fa più forte.', fx: { pr: 6, lethal: 1.15, beast: 1.4 } },
    { n: 'Giorno della fiera', d: 'Mercanti fatati montano bancarelle ai margini della Foresta.', fx: { forage: 1.6, fame: 1.3 } },
    { n: 'Pioggia di petali', d: 'Petali profumati cadono dal cielo e calmano gli animi.', fx: { pr: -5, tb: { emp: 1 } } },
  ]);
  add('scifi', [
    { n: 'Allineamento planetario', d: 'I pianeti vicini si allineano e la stazione vibra.', fx: { lethal: 1.1, tb: { agi: -1 } } },
    { n: 'Sole artificiale', d: 'I pannelli della Serra lavorano al massimo: cibo e ossigeno per tutti.', fx: { forage: 1.5, pr: -5 } },
    { n: 'Silenzio radio', d: 'Le comunicazioni sono interrotte: nessuno sa dove sono gli altri.', fx: { stl: 1.5, fame: 0.7 } },
  ]);
  add('zombie', [
    { n: 'Nebbia del porto', d: 'Una nebbia densa sale dal mare e nasconde vivi e morti.', fx: { stl: 1.5, beast: 1.3 } },
    { n: 'Trasmissione radio', d: 'Una radio annuncia un rifugio sicuro. Forse è vero.', fx: { pr: -3, fame: 1.3, tb: { car: 1 } } },
    { n: 'Notte dei lamenti', d: 'L\'orda geme tutta la notte. Nessuno dorme.', fx: { en: 1.3, beast: 1.5 } },
  ]);
  add('royale', [
    { n: 'Evento a tempo', d: 'Per un giorno, le armi d\'oro sono ovunque.', fx: { lethal: 1.2, forage: 1.2 } },
    { n: 'Nebbia sull\'isola', d: 'La nebbia copre l\'isola: i cecchini restano a mani vuote.', fx: { stl: 1.5, lethal: 0.9 } },
    { n: 'Diretta speciale', d: 'Il torneo viene trasmesso in prima serata: tutti vogliono farsi notare.', fx: { fame: 1.8, tb: { car: 1 } } },
  ]);
  add('horror', [
    { n: 'Notte di Ognissanti', d: 'I morti escono dalle tombe del Cimitero per una notte.', fx: { pr: 7, beast: 1.8, lethal: 1.15 } },
    { n: 'Mattina di sole', d: 'Il sole entra dalle finestre e la villa, per qualche ora, è solo una casa.', fx: { pr: -7, heal: 1.2 } },
    { n: 'Sussurri nei muri', d: 'I muri parlano. Dicono cose vere.', fx: { pr: 5, tb: { int: -1 } } },
  ]);
  add('wasteland', [
    { n: 'Aurora radioattiva', d: 'Il cielo si accende di verde e di viola. Bellissimo e letale.', fx: { pr: 8, stl: 0.8 } },
    { n: 'Vento fresco', d: 'Un raro vento fresco porta via la polvere per un giorno.', fx: { en: 0.8, pr: -3 } },
    { n: 'Gara dei motori', d: 'I predoni organizzano una gara: tutti guardano, nessuno spara. Quasi.', fx: { fame: 1.5, lethal: 0.9 } },
  ]);
  add('liceo', [
    { n: 'Giornata dello sport', d: 'Tutta la scuola in Palestra: chi corre, chi si nasconde in infermeria.', fx: { en: 1.3, tb: { agi: 1 } } },
    { n: 'Settimana dello studente', d: 'Attività alternative e pochissime lezioni: il paradiso.', fx: { pr: -6, fame: 1.3 } },
    { n: 'Consegna delle pagelle', d: 'Le famiglie leggono i voti. Tensione in tutte le chat.', fx: { pr: 8, lethal: 1.1 } },
  ]);
  add('ufficio', [
    { n: 'Lunedì di inventario', d: 'Si conta tutto: penne, risme, persone.', fx: { pr: 6, en: 1.2 } },
    { n: 'Ponte festivo', d: 'Mezzo ufficio è in ferie: chi resta, comanda.', fx: { pr: -5, stl: 1.3 } },
    { n: 'Valutazione annuale', d: 'Oggi si decidono i premi. E i licenziamenti.', fx: { pr: 8, lethal: 1.15, tb: { car: 1 } } },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
