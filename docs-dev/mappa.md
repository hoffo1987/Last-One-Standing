# Piano e contratto della mappa

La mappa delle nuove partite deve essere una parte della simulazione: un incontro fisico richiede presenza nello stesso luogo; ogni cambio di zona segue collegamenti reali ed è registrato. Non ricostruiamo percorsi che i replay precedenti non hanno salvato.

## Ordine di lavoro

1. Geografia delle nove arene: collegamenti bidirezionali, luoghi già esistenti conservati, aggiunta dei luoghi mancanti (Altare, Piazza, Salone, Deposito, Aule), risorse/pericolo/riparo e descrizioni.
2. Movimento: partenza coerente con l'apertura, percorsi raggiungibili, scelte guidate da bisogni e legami, costo in energia, fuga dalla tempesta e convergenza finale esplicite. Nessuna assegnazione di zona nascosta dentro un evento.
3. Presenza: incontri locali; cure, pasti, scambi, guardia, conforto e benefici del gruppo richiedono compagni presenti. Una relazione continua a esistere anche quando i due sono separati.
4. Narrazione: segnaposto di luogo legati alla scena, nomi propri vincolati alla geografia, spostamenti raccontati registrati davvero. Revisione dei repertori condivisi per le ambientazioni incompatibili, conservando requisiti, prove ed effetti.
5. Lettura: posizione a fine fase distinta dal luogo di un evento; collegamenti, percorsi con motivi e costi, eliminazioni nel punto effettivo, trappole e bottino disponibili; percorso personale senza eventi futuri.
6. Verifica e pubblicazione: controlli automatici sulle tracce di posizione e sugli incontri, casi mirati, tutte le arene, worker, replay vecchi/nuovi, desktop e mobile, build riproducibile e CI.

## Regole da verificare

1. Ogni zona ha un identificativo stabile all'interno del replay. Nomi, collegamenti e proprietà sono salvati nel risultato.
2. Un movimento ha fase, ordine, persona, origine, destinazione, percorso, motivo e costo. Ogni tratto è un collegamento del grafo. Una persona eliminata non si sposta.
3. Gli spostamenti ordinari hanno un budget limitato per fase. Il finale può richiedere un trasferimento più lungo, esplicitamente segnalato e pagato. Le zone chiuse non sono destinazioni valide.
4. Le posizioni degli eventi sono fotografate al momento dell'azione. Il tabellone riporta invece la fine della fase. Le due informazioni non sono intercambiabili.
5. Le persone che si toccano, combattono o si scambiano oggetti sono presenti nello stesso luogo. Autori di trappole, responsabili di ferite precedenti e persone nominate nei racconti possono essere altrove: il registro lo distingue.
6. Una zona non diventa pericolosa perché un partecipante a un evento è finito altrove dopo l'evento. Le eliminazioni hanno una posizione propria.
7. Le chiusure mantengono collegata l'area sicura. La fuga raggiunge il primo luogo aperto lungo un percorso, senza collocare un morente al sicuro dopo il colpo fatale.
8. Il seme resta riproducibile a parità di motore, contenuti e configurazione. I risultati delle nuove regole possono differire dai precedenti; i replay completi non vengono risimulati.
9. Nessuna informazione delle fasi successive compare nella mappa o nel percorso personale.

## Compatibilità

Il registro geografico è un'estensione opzionale del risultato versione 2. I replay senza registro mostrano solo le posizioni di fine fase effettivamente salvate e dichiarano l'assenza dei percorsi. La modalità interna `mapVersion: 0` resta disponibile per verificare i risultati storici del motore precedente; l'interfaccia genera sempre partite con la nuova geografia.

## Implementazione

`src/engine-geography.js` definisce il grafo e le proprietà di ogni luogo e prepara copie dei repertori. Non modifica i dati originali né i modelli condivisi nella cache. Le aggiunte conservano gli indici dei sei luoghi precedenti: l'Altare, la Piazza, il Salone, il Deposito e le Aule hanno indice 6 nelle rispettive arene.

Il luogo scritto per nome, anche con un nome generico come «palude» o «classe», vincola la scena; `{luogo}` viene risolto sulla posizione effettiva. Le corrispondenze più lunghe hanno precedenza: «Aula magna» resta distinta da «aula». Anche rifugi e trappole scelti dal lessico vengono filtrati per luogo e ambiente, evitando per esempio una torre estratta a caso nella Foresta. Le azioni sull'acqua o sugli alberi richiedono luoghi compatibili. I viaggi verso un luogo nominato richiedono un collegamento diretto e budget disponibile per tutti i partecipanti. Le prove verificano la possibilità di entrambi gli esiti prima della scelta.

Le nuove varianti ambientali conservano requisiti, pesi, prove, tag ed effetti del modello originale. Le locuzioni editoriali esplicite mantengono il tono delle frasi, per esempio sfere divinatorie al posto delle telecamere nel Reame e passerelle o pannelli al posto degli alberi nella stazione. Se una situazione non si può trasferire coerentemente, il testo alternativo descrive gli stessi effetti. Gli eventi personalizzati non vengono riscritti.

Per gli eventi avanzati, `at:2` richiede che la scena inizi nella zona di indice 2; `to:1` trasferisce il gruppo nella zona 1, se adiacente e raggiungibile. Gli indici sono quelli del registro, a partire da zero. Un indice inesistente negli eventi personalizzati genera un errore esplicito. I movimenti all'interno di una zona non hanno coordinate in metri: il grafo descrive macroaree e passaggi, non una pianta architettonica.

### Scelte e costi

- Al massimo due collegamenti ordinari per persona e fase. Un tratto costa 5 energie nelle arene con morti, 3 nelle arene senza morti, con sovraccosto del 20% sotto 20 energie. La mappa riduce il costo del 25%, conservando i centesimi.
- La ricerca di provviste e ripari considera anche il viaggio necessario. I bersagli vengono cercati lungo i percorsi; non vengono trasportati da un incontro.
- Di notte il gruppo sceglie un riparo comune, valutando copertura, pericolo, risorse e distanze. Il punto comune evita che due alleati si scambino continuamente di posto senza incontrarsi.
- Al festino e nel finale i trasferimenti possono superare il budget ordinario: ogni tratto viene comunque registrato e pagato. Nel finale gli altri accessi vengono chiusi solo dopo l'arrivo.
- La tempesta conserva collegata l'area aperta. Se due chiusure isolano chi è ancora fuori, la fuga può attraversare un tratto già chiuso e subisce danni aggiuntivi. Chi muore si ferma nel punto effettivo.
- Le trappole vengono controllate entrando nella zona e, per chi non è passato, alla fine della fase. La stessa trappola non effettua due tentativi sulla stessa persona nella stessa fase. Il suo autore viene citato come responsabile anche se è altrove o già eliminato; non figura come persona tornata ad agire.

### Dati del replay

`spatial` contiene `version`, `zones`, `start`, `moves`, `deaths`, `closures`. Ogni fatto ha fase e ordine (`ph`, `seq`). `place` fotografa il luogo e le posizioni delle persone coinvolte in un evento; le posizioni dei responsabili citati a distanza restano distinguibili. `snap.terrain` conserva trappole attive e quantità di bottino alla fine della fase. Una chiusura distingue `tempesta` e `finale`.

La validazione ripercorre movimenti, eventi, chiusure ed eliminazioni in ordine reale e confronta ogni istantanea. Rifiuta salti senza collegamento, movimenti dopo l'eliminazione, attori già eliminati, sequenze duplicate, presenze inventate, indici fuori mappa e istantanee inconciliabili. Per i dati vecchi senza registro restano i controlli precedenti.

`src/map-view.js` legge esclusivamente la fase selezionata: grafo, presenti a fine fase, fatti localizzati, percorsi, eliminazioni, trappole e bottino. La scheda personale distingue i compagni presenti dagli alleati lontani. Nessun dato delle fasi successive viene aggiunto alla mappa o al percorso personale.

### Verifiche

`node tools/test-geography.js` controlla grafi, percorsi, budget, fatica, riduzione del costo con la mappa, attraversamento della tempesta, incontro dei gruppi, varianti dei repertori e dei disastri, continuità delle partite in tutte le arene, replay corrotti, assenza di anticipazioni e testo importato inerte. La configurazione del caso casuale 467 è conservata in `tools/fixtures/geography-regression.json`.

La suite generale aggiunge confronti completi con i 36 risultati storici in modalità precedente, 360 partite con determinismo e archiviazione, 1.500 casi casuali e parità tra worker e motore principale.
