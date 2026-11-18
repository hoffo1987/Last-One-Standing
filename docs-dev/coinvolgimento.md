# Coinvolgimento e interazione — piano delle nuove funzioni

Scelte dell'utente (18 nov 2026) dal form delle idee. Obiettivo unico: **coinvolgimento e interazione**.
Frequenza di interazione voluta: **4 su 5** — il gioco si ferma spesso a chiedere qualcosa, ma ogni pausa ha un timer e un «lascia fare» per chi vuole solo guardare.

| Codice | Funzione | Fase |
|---|---|---|
| A1 | Sponsor in diretta | 1 |
| B2 | Puntate live | 1 |
| A4 | Mentore | 1 |
| D2 | Interviste pre e post | 1 (pre) · 3 (post) |
| A2 | Modalità Regista | 2 |
| D1 | Telecronaca e chat del pubblico | 2 |
| A5 | Prove giocabili | 2 |
| D5 | Mappa viva | 2 |
| B5 | Obiettivi e trofei | 3 |
| C2 | Cicatrici e rivalità | 3 |
| C4 | Album dei concorrenti | 3 |
| E1 | Modalità festa (locale, poi **online**) | 4 |
| E2 | Cartoline condivisibili | 4 |

Nota dell'utente sulla festa: *un sistema online per giocare con gli amici e assistere alla partita insieme; l'host manda avanti, gli altri intervengono sul concorrente su cui hanno puntato o sulla propria squadra.*

---

## Fase 0 — Fondamenta (senza queste niente del resto funziona)

Oggi `simulate(cfg)` (src/engine.js) calcola **tutta** la partita in un colpo, deterministica dal `seed`; la Diretta poi la riproduce fase per fase. Per far contare le scelte del giocatore:

1. **Motore a interventi.** `cfg.interventi = [{ fase, tipo, chi, dati }]`. Il motore li applica quando arriva alla fase indicata (stesso punto in cui oggi gira `sponsorDrop`). Quando il giocatore interviene, si **rilancia la simulazione con lo stesso seed + la lista interventi**: il passato resta identico, il futuro cambia. La Diretta riprende dalla fase corrente. Da verificare: tempo di una simulazione completa (obiettivo < 150 ms; altrimenti simulazione a tappe con stato salvato per fase).
   - Regola d'oro: gli interventi consumano numeri casuali solo **da quel punto in poi** (rng dedicato `makeRng(seed+'|int|'+fase)`), così il passato non si sposta mai.
2. **Punti di decisione nella Diretta.** Un unico componente «cartello» stile Persona che ferma la riproduzione: titolo, 2–4 scelte, timer (10–20 s, regolabile), «lascia fare». Tutte le funzioni sotto lo riusano.
3. **Valuta della partita: i Crediti.** Si parte con 100; si spendono in doni (A1) e puntate (B2), si guadagnano con puntate vinte e spettacolo. Mostrati in alto nella Diretta con contatore animato.
4. **Profilo del giocatore** (localStorage, con esporta/importa): crediti totali, trofei, album, storico concorrenti. Base per la Fase 3.
5. **Impostazione «Ritmo»**: Spettatore (poche pause) · Giocatore (default, livello 4) · Regista (pause a ogni fase).

## Fase 1 — Spettatore attivo

### A1 Sponsor in diretta
- Pulsante «Sponsorizza» su ogni concorrente vivo nella Diretta e nella sua scheda.
- Catalogo per arena (usa i lessici/oggetti già esistenti: cibo, medicine, armi, mappa, amuleto…): 5–8 doni con prezzo.
- **Prezzo dinamico**: più il concorrente è famoso/favorito, più costa (`fame`, quote di B2).
- Il dono diventa un intervento `{tipo:'dono'}` → nel motore riusa `mkItem(..., 'sponsor')` + `addItem` + testo `sponsorBonus`; l'evento lo racconta («Un paracadute cade ai piedi di…») con firma «dono tuo».
- Limite: 1 dono per fase, per non rompere l'equilibrio.

### B2 Puntate live
- A ogni alba e tramonto: 2–3 puntate rapide generate dallo stato reale: «X sopravvive alla notte?», «chi cade prima tra X e Y?», «ci sarà un tradimento oggi?», «la squadra 3 resta intera?».
- **Quote** calcolate dalle probabilità del motore (simulazione «ombra» rapida o stima da forza/ferite/inventario).
- Puntata con i Crediti; esito mostrato quando l'evento accade, con animazione (vinto: pioggia di crediti; perso: timbro rosso).
- Riepilogo nell'Esito: bilancio, puntata migliore, «colpo di genio».

### A4 Mentore
- Prima dei giochi scegli **il tuo concorrente** (o uno per squadra in modalità squadre).
- A ogni alba un cartello con 4 ordini: Nasconditi · Caccia · Cerca alleati · Fai provviste (+ ordini d'arena).
- L'ordine sposta i pesi delle azioni nel motore (`moveByGoals`, `spatialGoals`, scelta degli eventi).
- **Obbedienza** dai tratti: un testardo o un impulsivo può disobbedire, e l'evento lo dice («Pietro ignora il consiglio e…»).
- Legame mentore: obbedire e sopravvivere fa crescere la fiducia (più obbedienza nei giorni dopo).

### D2 Interviste (pre-partita)
- Prima dell'ingresso nell'arena: 3 domande per concorrente seguito (o per tutti, veloce): «Qual è la tua strategia?», «Di chi ti fidi?», «Cosa ti manca di casa?».
- Le risposte danno piccoli bonus (fama iniziale, simpatia del pubblico, legame con un altro concorrente) e vengono ricordate dalla telecronaca.

## Fase 2 — Regia e spettacolo

### A2 Modalità Regista
- Tra un giorno e l'altro: mano di 3 **carte evento** pescate da un mazzo per arena (tempesta, banchetto, zona che si chiude, notte senza luna, ondata di bestie, rifornimento).
- Ogni carta ha ricarica (giorni) e costo; diventa intervento `{tipo:'evento'}` che forza la fase o il meteo (riusa i blocchi del motore: `runPhase` con pool dedicati, meteo `W`).
- **Voto del Regista** nell'Esito: spettacolo (eliminazioni spettacolari, rimonte), ritmo (giorni senza morti = noia), colpi di scena.

### D1 Telecronaca e chat del pubblico
- Due commentatori (voce enfatica + voce cinica), battute legate al tipo di evento, a chi lo fa, ai tratti, alle risposte delle interviste.
- **Chat del pubblico** finta a lato (o sotto su telefono): messaggi veloci che reagiscono, sondaggi «chi è il tuo preferito», favorito del pubblico aggiornato in tempo reale → influenza gli sponsor del motore.
- Testi in italiano con lo stesso sistema di modelli e accordi grammaticali dei pacchetti di contenuto.

### A5 Prove giocabili
- Quando parte una prova (`stats.tests`), se riguarda il tuo concorrente: minigioco di 5–10 s.
  - **Tempismo**: ferma la barra nella zona giusta.
  - **Sequenza**: ripeti 4–6 tasti/tocchi.
  - **Scelta di via**: 3 porte, indizi dal testo.
- Risultato → bonus/malus sull'esito della prova. Con «lascia fare» decide il motore come oggi.
- Funziona con tastiera, mouse e tocco; rispetta il movimento ridotto.

### D5 Mappa viva (potenziamento di map-view.js)
- La mappa esiste già: la rendiamo il centro della Diretta su schermi larghi.
- Segnalini dei concorrenti che si spostano fase per fase, scontri con impatto, zone che si chiudono, doni che cadono (A1), eventi del Regista (A2).
- Clic su un segnalino → scheda + Sponsorizza/Punta.

## Fase 3 — Memoria tra le partite

### B5 Obiettivi e trofei
- 40–60 trofei, alcuni nascosti. Esempi: «Vinci con un concorrente con forza 1», «Partita senza tradimenti», «Tre puntate vinte di fila», «Il tuo dono salva una vita», «Il Regista crudele: 5 morti in un giorno».
- Bacheca nel profilo, notifica a cut-in quando se ne sblocca uno.

### C2 Cicatrici e rivalità
- Opzione «Rivincita»: il cast sopravvissuto torna nella partita dopo.
- Chi sopravvive porta: ferite permanenti (−1 a un attributo), nuovi tratti (Traumatizzato, Vendicativo, Veterano), **rivalità** con chi l'ha ferito o tradito, legami con chi l'ha salvato.
- Le rivalità generano eventi dedicati e frasi della telecronaca («Si ritrovano: l'ultima volta finì con un coltello»).

### C4 Album dei concorrenti
- Ogni concorrente giocato diventa una **carta** (stile Persona: volto con fascia sugli occhi, numero, tratti).
- Rarità che sale con le imprese: Comune → Rara (vittoria) → Epica (vittoria con molte eliminazioni) → Leggendaria (3 vittorie).
- Album sfogliabile, filtri, «riporta in gioco» con un clic.

### D2 Interviste (post-partita)
- Intervista al vincitore e all'ultimo eliminato, con risposte che citano i momenti veri della partita.

## Fase 4 — Festa e condivisione

### E1 Modalità festa
**Passo 1 — locale (passa-il-telefono):** 2–8 giocatori, ognuno sceglie un concorrente o una squadra; a ogni punto di decisione il cartello dice di chi è il turno. Classifica dei giocatori a fine partita.

**Passo 2 — online (richiesta dell'utente):**
- Stanza con codice di 4 lettere/QR; **l'host** crea la partita e la manda avanti; gli ospiti seguono la stessa Diretta e intervengono **solo** sul concorrente su cui hanno puntato o sulla propria squadra (doni, ordini da mentore, puntate, prove giocabili).
- Grazie al motore deterministico in rete viaggiano solo **seed + configurazione + lista interventi** (pochi byte): ogni dispositivo ricalcola la partita da solo. L'host è l'arbitro: riceve le richieste, le mette in ordine, le ritrasmette.
- Sincronia: l'host trasmette «fase corrente»; i cartelli degli ospiti hanno lo stesso timer.
- **Scelta tecnica da fare** (il sito è statico su GitHub Pages, serve un ripetitore):
  - *Firebase Realtime Database* (consigliato: gratuito per gruppi piccoli, affidabile, niente server nostro; richiede un progetto Firebase creato dall'utente);
  - *WebRTC con PeerJS* (zero account, connessione diretta tra dispositivi; può fallire su alcune reti);
  - *Cloudflare Workers/Durable Objects o PartyKit* (più controllo, serve account).
- Foto personalizzate: viaggiano compresse (webp piccolo) una volta sola all'ingresso nella stanza.

### E2 Cartoline condivisibili
- Immagini generate su canvas dalla grafica del sito: poster del vincitore, scheda di un'eliminazione, riepilogo della partita, carta dell'album (C4), trofeo sbloccato.
- Pulsante «Condividi» (`navigator.share` dove c'è, altrimenti scarica PNG) + link con il seed per rivedere la stessa partita.

---

## Ordine consigliato
0 → 1 → 2 → 3 → 4. Le Fasi 0 e 1 da sole cambiano già il modo di vivere la partita; la Fase 4 online arriva per ultima perché si appoggia su tutto il resto (interventi, cartelli, crediti).
