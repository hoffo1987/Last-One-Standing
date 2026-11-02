# Scrivere eventi coerenti

Il riferimento eseguibile è il parser in `src/engine.js`. Dopo ogni modifica:

```sh
node tools/lint-content.js
node tools/check.js
node tools/test-engine.js 40
```

## Riga e partecipanti

```text
2 con:A=cibo give:A>B=cibo @give *2 | {A} divide le provviste con {B}.
```

Il primo numero ammette da 1 a 6 partecipanti, indicati da A a F. Tutti i
riferimenti nel testo, nei requisiti e in entrambi gli esiti di una prova devono
esistere. Nei rapporti tra due persone non si può usare la stessa persona due
volte. Il peso `*2` aumenta la frequenza relativa, senza garantire l'estrazione;
deve essere positivo e finito. I requisiti restano obbligatori.

Le fasi dei cataloghi sono `b` (apertura), `d` (giorno), `n` (notte), `f`
(festino), `ds` (eventi durante un disastro), `finale`, `fallback`, `sponsor` e
`lovers`. Il modulo semplice nell'app espone soltanto un sottoinsieme del formato.

## Testi, lessico e genere

| Scrittura | Risultato |
| --- | --- |
| `{A}`, `{B}` | Nomi dei partecipanti, protetti come testo HTML. |
| `ferit[A:o/a/ə]` | Accordo maschile, femminile o neutro. La terza forma è facoltativa. |
| `amic[AB:i/he]` | Accordo di gruppo: maschile per gruppi misti, femminile se tutte donne, neutro se tutte persone neutre. |
| `[A:gli/le]`, `[A:lui/lei]` | Pronomi con ripiego neutro `lə` e `ləi`. Una terza alternativa esplicita prevale. |
| `{arma}`, `{cibo}`, `{luogo}` | Elemento del lessico dell'arena; i nomi comprendono già l'articolo. |
| `{arma:A}`, `{ricordo:B}` | Oggetto posseduto dalla persona, con possessivo quando il genere grammaticale è riconoscibile. |
| `{caro:A}` | Persona cara legata al rancore attuale di A. |

Altre voci del lessico: `mostro`, `trappola`, `rifugio`, `dono`, `med`, `trap`,
`veleno`, `esplosivo`, `amuleto`, `mappa`, `armatura`, `attrezzo`, `alcol`, `valore`,
`ricordo`. Evitare pronomi e aggettivi fissi dopo un oggetto casuale: una spada,
un arco e dei guanti non concordano allo stesso modo. Non inserire HTML nei testi.

## Eliminazioni, danni e aiuti

| Etichetta | Significato |
| --- | --- |
| `k:AB>CD` | A e B eliminano C e D; le vittime devono essere avversarie. |
| `d:AB` | Eliminazione ambientale di A e B. |
| `tr:A>B` | Tradimento letale di A contro l'alleato B. |
| `hit:A>B` | Attacco con danno, responsabile, ricordo e rancore; non è una morte diretta garantita. |
| `poison:A>B` | Avvelenamento attribuito ad A. Da abbinare a `veleno:A` se A usa una dose posseduta. |
| `save:A>B` | Salvataggio con gratitudine, debito, ricordo e contatore. |
| `cure:B` | Cura B; rimuove gli stati curabili, recupera salute e lascia le conseguenze dell'aiuto se c'è un altro partecipante vivo. Il lutto non viene cancellato. |
| `s:A=ferito` | Imposta una condizione. Altri stati: `avvelenato`, `malato`, `affamato`, `ubriaco`, `sconvolto`, `lutto`. |
| `need:A=ferito`, `need:A=*` | Richiede una condizione specifica o almeno una condizione fisica. |

Un amuleto, una protezione, la tempra o la pietà possono impedire la morte
descritta nel modello: il risultato registra le morti realmente avvenute e
l'eventuale salvataggio nelle conseguenze. La protezione dell'amuleto riguarda
le eliminazioni dirette degli eventi, non ogni forma di danno periodico.

`s:B=avvelenato` è un avvelenamento senza responsabile. `poison:A>B` mantiene
invece la responsabilità anche nei danni successivi e può attribuire un credito
postumo, senza far agire di nuovo una persona già eliminata.

## Oggetti: ottenere, perdere, consumare e trasferire

Tipi: `arma`, `armatura`, `med`, `cibo`, `attrezzo`, `mappa`, `trap`, `esplosivo`,
`veleno`, `amuleto`, `alcol`, `valore`, `ricordo`.

| Etichetta | Significato |
| --- | --- |
| `+cibo:A` | Crea un oggetto. Alcuni oggetti hanno qualità, usura o capienza propria. Il cibo può essere mangiato automaticamente se A ha molta fame. |
| `-cibo:A` | Rimuove un oggetto posseduto senza applicare il beneficio del consumo. |
| `cibo:A`, `med:A` | Consuma cibo o medicine applicando il beneficio previsto. |
| `con:A=attrezzo`, `w:A` | Richiede un tipo di oggetto; `w:A` è l'abbreviazione per un'arma. |
| `steal:A<B` | Trasferisce ad A l'arma reale di B. |
| `steal:A<B=med` | Trasferisce il tipo indicato, conservando nome, qualità e usura. |
| `@secret` | Con un furto evita di rivelare subito il responsabile alla vittima. |
| `give:A>B=cibo` | Trasferisce l'oggetto posseduto da A a B. Non crea un oggetto mancante e non nutre il donatore. |

I trasferimenti richiedono che l'oggetto sia ricevibile: capienza e protezioni
migliori non vanno scartate. Gli effetti sono applicati nell'ordine scritto.
Un oggetto appena ricevuto può essere consumato nella stessa riga. Per esempio:

```text
2 steal:A<B=cibo cibo:A | {A} ruba le provviste di {B} e mangia prima di scappare.
1 -med:A hp:A+35 | {A} usa le medicine per medicarsi con molta attenzione.
```

La seconda riga applica soltanto il recupero esplicito di 35, senza aggiungere
anche la cura standard di `med:A`.

## Relazioni e condizioni personali

| Requisito | Condizione richiesta |
| --- | --- |
| `ally:AB`, `friend:AB`, `enemy:AB` | Alleanza, amicizia o ostilità già presenti. |
| `couple:AB`, `single:A` | Coppia attuale o assenza di partner. |
| `grudge:A>B`, `owe:A>B` | Rancore o debito di A verso B. |
| `fame:A`, `feared:A`, `traitor:A`, `lost:A` | Fama, reputazione temuta, tradimento o perdita di una persona cara. |
| `crush:A>B`, `plot:A>B` | Cotta o complotto segreto già presenti. |
| `trust:A>B`, `distrust:A>B`, `fear:A>B`, `respect:A>B`, `attract:A>B` | Soglia prevista della dimensione direzionale del legame. Non rende reciproco il sentimento. |
| `rival:AB`, `ex:AB`, `close:AB`, `promise:A>B` | Rivalità, ex, legame stretto o promessa ancora attiva. |
| `trait:A=generoso`, `notrait:A=avido` | Presenza o assenza di un tratto valido. |
| `att:A>int8`, `att:A<res3` | Caratteristica almeno 8 o al massimo 3: per `att` la soglia è inclusiva. |
| `stat:A<hp40`, `stat:A>mo75` | Valore vitale strettamente sotto 40 o sopra 75. |
| `goal:A=vendetta` | Obiettivo attuale. Gli ID sono quelli di `D.mind.goals`. |
| `wx:buio`, `wx:abbondanza`, `wx:pericolo`, `wx:calma` | Condizione meteo effettiva della fase. |

| Effetto | Cambiamento |
| --- | --- |
| `al:ABC`, `br:A` | Forma un'alleanza compatibile o fa uscire A dalla propria. |
| `love:AB`, `breakup:AB`, `reunite:AB` | Crea una coppia, la scioglie o riunisce due ex. |
| `rel:AB+20` | Affinità comune tra A e B. |
| `fid:A>B+20`, `ris:A>B-10`, `pau:A>B+15`, `amo:A>B+10` | Fiducia, rispetto, paura e attrazione da A verso B. Il carattere può modulare la variazione. |
| `debt:A>B`, `repay:A>B`, `forgive:A>B`, `grudge:A>B` | Crea un debito, salda un debito, perdona un rancore o richiede un rancore. Quest'ultima etichetta non ne crea uno. |
| `promise:A>B=protezione` | Crea una promessa. Tipi: `fedelta`, `protezione`, `vendetta`, `cibo`. |
| `star:A` | Aumenta la fama. |
| `hp:A-20`, `en:A+10`, `mo:A+15`, `food:A+20`, `pr:A-30` | Modifica salute, energia, morale, sazietà o indicatore dell'arena. Un danno anonimo non eredita l'aggressore precedente. |

## Prove con due esiti

```text
2 test:A=int12 ok:steal:A<B ko:rel:BA-30 | {A} distrae {B} e prende la sua arma. || {B} scopre il tentativo di {A}.
```

`test:A=int` usa soglia 11; una soglia esplicita segue l'ID della caratteristica.
Il tiro usa caratteristica, **2d6 reali (2–12)**, fortuna, tratti e condizione.
I tag senza prefisso valgono per entrambi gli esiti; `ok:` e `ko:` aggiungono
soltanto gli effetti dell'esito scelto. I due testi sono obbligatori e separati
da ` || `. Non usare effetti di ramo senza una prova. Gli oggetti e gli altri
requisiti introdotti dal parser devono comunque essere disponibili.

Le caratteristiche sono `for`, `agi`, `int`, `car`, `fort`, `res`, `furt`, `cor`,
`emp`, `sop`. Tratti e valori ammessi si leggono in `D.traits` e `D.attrs`.

## Indole e frequenza

I tag `@agg`, `@soc`, `@stl`, `@int`, `@heal`, `@luck`, `@mad`, `@cow`, `@gift`,
`@show`, `@drunk`, `@food` influenzano i pesi tramite carattere, bisogni, arena e
meteo. Non sostituiscono gli effetti: `@heal` da solo non registra un salvataggio.
Il motore applica anche tag impliciti, per esempio agli eventi di furto o coppia.

La varietà usa una penalità progressiva delle ripetizioni e prova a escludere gli
ultimi otto modelli eseguiti. Se i requisiti rendono troppo piccolo il catalogo,
l'esclusione viene rilassata: la partita deve poter continuare. Nessuna frequenza
è una garanzia e il catalogo di un disastro può avere soltanto tre esiti.

## Disastri compatti

```text
Nome | Introduzione | Esito di eliminazione | Esito di danno | Esito di salvezza [| stato]
```

Lo stato facoltativo riguarda l'esito di danno, altrimenti vale `ferito`.
Mantenere diversi e plausibili tutti e tre gli esiti. Il testo deve raccontare
soltanto ciò che gli effetti registrano; una battuta non deve promettere un
oggetto, una cura o una relazione che il modello non applica.
