# Registro degli oggetti e simulazione controllata

## Fatti registrati

`result.itemFacts` è un campo aggiuntivo: i vecchi risultati possono non averlo.
Ogni fatto contiene `ph` (indice della fase), `seq` (ordine totale), `owner`
(proprietario), `who` (destinatario), `item`, `kind`, `before`, `after`, `detail`
e `context` (testo dell'evento, quando l'uso avviene nel suo svolgimento).

`item` conserva tipo, nome, modalità di acquisizione, persona di provenienza e
giorno. Non è un identificatore fisico universale: due oggetti identici della
stessa provenienza rimangono indistinguibili, ma ogni uso ha una sequenza propria.

I tipi sono `consume`, `heal`, `protect`, `absorb`, `bonus`, `craft`, `deploy`,
`attack`, `poison`, `accident` e `comfort`. Il registro osserva le azioni reali;
non usa RNG, non modifica stato, non genera eventi aggiuntivi e non presume
che un oggetto sia stato usato solo perché presente nello zaino.

I valori prima/dopo rispettano 0–100 e le condizioni derivate vengono calcolate
su copie. Le variazioni riguardano l'azione osservata: non sono una stima di
quello che sarebbe successo togliendo l'oggetto dall'intera partita. Per esempio:

- `protect` registra una morte diretta evitata dall'amuleto o dalla protezione.
  Non promette sopravvivenza ai danni delle fasi successive.
- `absorb` descrive la riduzione nel calcolo del danno, prima dei limiti alla
  salute. Non la presenta come salute recuperata.
- `bonus` e `comfort` descrivono il termine realmente applicato a una prova,
  probabilità o calcolo del morale; non dichiarano che abbia deciso l'esito.
- `heal` distingue proprietario del kit e destinatario e conserva anche cure
  automatiche, infezione rimossa e medicine usate prima di una possibile morte.
- Una perdita o un trasferimento non è un consumo. Gli oggetti entrati e usciti
  nella stessa fase possono produrre un fatto anche senza comparire nello
  snapshot finale. Lo storico dello zaino continua a mostrare separatamente
  i confronti di fine fase.

La copertura riguarda le azioni strumentate esplicitamente nel codice. I pesi
passivi di scelta degli eventi e le valutazioni di candidati non diventano usi:
un'arma che influenza una selezione non viene raccontata come un colpo effettivo.
Per nuovi meccanismi, aggiungere il fatto nel ramo che applica l'effetto.

## Separazione dei sistemi e parità

`engine-systems.js` espone factory con dipendenze esplicite. Nessuna factory
conserva un RNG globale o stato condiviso tra partite. La memoria riceve giorno
e fase; l'inventario riceve lessico, regole e RNG; i valori vitali ricevono
responsabilità, stati e notifiche; gli snapshot ricevono le funzioni di lettura.
L'ordine di chiamata resta nel coordinatore `engine.js`.

`tools/fixtures/engine-baseline.json` contiene le configurazioni e le impronte
dei risultati precedenti all'estrazione (commit `b3c8f3b`). La serializzazione
canonica distingue `undefined`, `-0`, buchi negli array e ordine degli elementi.
Il test confronta tutti i campi storici ed esclude solo `itemFacts`, che prima
non esisteva. Non rigenerare la fixture per far passare un refactoring: prima
spiegare ogni variazione e verificare il comportamento precedente.

Il test worker confronta anche i nuovi fatti. Determinismo significa stessa
configurazione, stessi contenuti e stessa versione, non soltanto stesso seme.

## Esperimento controllato

`experiments.js` acquisisce una copia della configurazione prima del primo await.
Per la coppia `i`, entrambi i rami usano `<seme>-controllo-<i>`. Solo il campo
`cast[concorrente].attr[caratteristica]` assume il valore basso o alto. Il cast
non viene rigenerato e nessuna caratteristica degli altri partecipanti cambia.

L'unità sperimentale è la coppia completa. Se il calcolo fallisce o si interrompe
dopo il primo ramo, la coppia non entra nelle statistiche. I dati parziali restano
copiabili. Nessun risultato sostituisce o archivia la partita aperta.

La differenza di vittoria è `100 × (vittorie_alto - vittorie_basso) / coppie`.
La differenza di posizione è la media di `posizione_alto - posizione_basso`:
un numero negativo indica un miglior piazzamento con il valore alto. I conteggi
distinguono vittorie soltanto nel ramo basso, soltanto alto, in entrambi o in
nessuno. Con vittoria di squadra, ogni componente vincente conta una vittoria.

L'intervento può cambiare bersagli, scelte ed estrazioni successive: non impone
gli stessi eventi ai due rami. Si misura l'effetto complessivo nel modello e su
quei semi, non il contributo isolato a un singolo tiro. Le differenze non vengono
accompagnate da significatività, intervalli di confidenza o generalizzazioni a
cast diversi. La tabella osservazionale per fasce resta distinta dall'esperimento.
