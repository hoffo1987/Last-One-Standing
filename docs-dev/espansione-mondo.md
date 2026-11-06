# Espansione dei repertori e continuità del mondo

## Obiettivo e ordine di lavoro

1. Conservare i repertori attuali, i replay completi e il percorso interno di confronto storico.
2. Aggiungere, per ciascuna delle nove arene, almeno 300 dialoghi, 300 eventi ordinari, 300 disastri, 300 oggetti, 300 eliminazioni, 300 eventi di tratto e 300 prove con due esiti.
3. Scrivere situazioni locali e famiglie di azioni. Comporre i repertori in modo deterministico: i conteggi distinguono situazioni di partenza, combinazioni giocabili e singoli esiti. Non contare come contenuti nuovi né nomi dei concorrenti né accordi di genere né mere numerazioni.
4. Vincolare scene e disastri alle zone reali; scegliere gli incidenti soltanto dove c'è qualcuno. Separare i repertori dei disastri, evitando che esiti di un altro incidente raccontino un secondo disastro non annunciato.
5. Collegare le scene a oggetti posseduti, stati, debiti, rancori, promesse, coppie e alleanze. I dialoghi specifici devono rispettare zona, rapporto e condizioni correnti.
6. Verificare quantità, unicità, sintassi, genere, compatibilità ambientale, raggiungibilità, selezionabilità, effetti e bilanciamento; eseguire regressioni, worker, replay, simulazioni, build e verifica visiva prima di pubblicare.

## Criteri editoriali

Il Liceo e l'Ufficio mantengono le proprie eliminazioni sociali: nessuna morte o violenza letale. Le caratteristiche non diventano superpoteri; ogni prova racconta una decisione concreta, con costi ed esiti distinti. Le battute possono proporre un'azione futura, ma non dichiarano un oggetto ottenuto, un percorso compiuto o una promessa registrata quando il motore non li applica.

Gli oggetti conservano le tredici famiglie e le meccaniche esistenti. I nuovi nomi non promettono poteri aggiuntivi: materiale, formato e provenienza identificano l'oggetto; qualità, usura e trasferimenti continuano a essere registrati dal motore.

L'espansione usa situazioni scritte per ogni arena e strutture di azione riutilizzabili. Le combinazioni devono essere accessibili e semanticamente valide, non soltanto differenti come stringhe. Il rapporto di verifica riporta separatamente questi due livelli editoriali.

## Repertori implementati

`world-scenes.js` contiene 270 situazioni locali, 30 per arena, distribuite in tutte le 59 zone. `zz-world.js` le compone con azioni, errori, sviluppi dei disastri, dialoghi e prove. Per arena risultano 300 eventi ordinari, 300 eventi riservati ai tratti (10 per ciascun tratto), 300 prove (30 per caratteristica, entrambe le conclusioni scritte), 300 eliminazioni, 300 disastri con tre esiti, 300 conversazioni a due battute e 300 reazioni brevi. `world-items.js` aggiunge 300 nomi d'oggetto per arena: sei modelli per dieci famiglie, ciascuno in cinque formati. I 21600 elementi complessivi sono combinazioni verificabili; il conteggio non significa 21600 scene indipendenti scritte a mano.

I cataloghi vengono compilati senza casualità e conservati in cache per arena. Le nuove partite li usano insieme ai contenuti precedenti; il percorso interno `mapVersion: 0` conserva l'estrazione storica. `worldVersion: 0` serve soltanto ai confronti interni con la geografia attiva. Gli ID dei contenuti vengono salvati negli eventi, senza ricalcolare i vecchi replay.

## Cause e seguiti

Un nuovo disastro è eleggibile solo in una zona aperta e occupata. Durante la sua fase vengono usati i suoi tre esiti, senza mescolarli alle scene di altri disastri. Fuori dalla zona colpita proseguono le azioni di ripiego; l'incidente non attribuisce danni o esperienze condivise a persone lontane.

La fase salva `worldIncident: {scene, exposed}` insieme a `affectedZones` e `contentId`. Le persone esposte sono quelle vive e presenti all'inizio. Trenta eventi e trenta conversazioni per arena sono seguiti specifici di queste situazioni: richiedono un incidente corrispondente nella storia precedente della partita, presenza corrente nella stessa zona e partecipazione di tutti gli interlocutori all'incidente originale. Non basta avere lo stesso tratto o trovarsi sul posto in seguito.

Cure, perdoni, debiti saldati, furti, giuramenti e discussioni fra coppie usano i requisiti e gli effetti reali. Una medicina usata su un'altra persona viene sottratta al soccorritore e registrata nel diario degli oggetti con proprietario e beneficiario distinti. Le trappole costruite vengono riposte: il testo non dichiara già piazzato un ostacolo che la simulazione non ha ancora messo sul terreno.

## Verifica ripetibile

`node tools/test-world.js` verifica quantità e unicità degli otto repertori, copertura di zone/tratti/caratteristiche, 18900 modelli eseguibili, 56700 accordi di genere, assenza di ripieghi geografici, condizioni dei dialoghi, antecedenti dei seguiti, determinismo, immutabilità dei cataloghi e importazione/esportazione dei nuovi replay. `tools/lint-content.js` include i modelli generati. Restano richiesti `node tools/check.js`, `node tools/test-engine.js 40`, `node tools/fuzz.js 1500` e la build riproducibile.
