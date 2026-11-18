# Festa online: impostare il server Firebase (5 minuti, gratis)

La festa online usa un **Realtime Database** di Firebase come «bacheca» condivisa della stanza:
l'host ci scrive configurazione e stato della diretta, gli amici le loro scelte. Non serve installare nulla
e il piano gratuito (Spark) basta e avanza per giocare tra amici.

## 1. Crea il progetto
1. Vai su **https://console.firebase.google.com** ed entra con un account Google.
2. **Crea un progetto** (o «Aggiungi progetto») → dagli un nome, per esempio `last-one-standing-festa`.
3. Google Analytics: **disattivalo** (non serve) → **Crea progetto**.

## 2. Aggiungi il Realtime Database
1. Nel menu a sinistra: **Build** (o «Crea») → **Realtime Database** → **Crea database**.
2. Posizione: **Belgio (europe-west1)**, la più vicina all'Italia.
3. Regole di sicurezza: scegli **Avvia in modalità bloccata** (le impostiamo noi al passo 3) → **Attiva**.

## 3. Le regole: solo le stanze, niente altro
Nella pagina del database apri la scheda **Regole**, sostituisci tutto con questo e premi **Pubblica**:

```json
{
  "rules": {
    "stanze": {
      "$codice": {
        ".read": "$codice.matches(/^[A-Z]{4}$/)",
        ".write": "$codice.matches(/^[A-Z]{4}$/)"
      }
    }
  }
}
```

Così si possono leggere e scrivere **solo** le stanze con un codice di quattro lettere; il resto del database è chiuso.
Diversamente dalla «modalità di prova», queste regole non scadono dopo 30 giorni.

> Attenzione: chi conosce l'indirizzo del database e il codice di una stanza può leggerla. Nelle stanze ci sono solo
> i nomi che scrivete e la partita (senza foto): non usate nomi o dati privati.

## 4. Copia l'indirizzo nel gioco
1. Nella scheda **Dati** del Realtime Database, in alto, c'è l'indirizzo del database, del tipo
   `https://last-one-standing-festa-default-rtdb.europe-west1.firebasedatabase.app`
2. Nel gioco: **Arena** → **Festa con gli amici** → scheda **Online** → apri **Server della festa** → incolla l'indirizzo → **Salva l'indirizzo**.
3. **Tutti i giocatori** devono incollare lo stesso indirizzo sul proprio dispositivo (una volta sola: resta salvato nel browser).

## 5. Giocare
- **Chi fa da host**: Online → **Crea la stanza** → legge ad alta voce il codice di 4 lettere; può aggiungere anche giocatori
  sul proprio dispositivo; quando tutti hanno scelto il campione → **Inizia la festa**. L'host manda avanti la diretta.
- **Gli amici**: Online → nome + codice → **Entra** → scelgono il campione → aspettano. Le domande (ordini, puntate, prove)
  arrivano sul loro telefono quando è il loro turno; possono mandare doni dal pulsante Dono.
- Tutti devono avere **la stessa versione del gioco** (se no compare un avviso): basta ricaricare la pagina.

## Manutenzione
- **Chiudi la stanza** (host) cancella la stanza dal server. Se una stanza resta lì (pagina chiusa di colpo),
  puoi cancellarla a mano: scheda **Dati** → nodo `stanze` → icona del cestino.
- Limiti del piano gratuito: 100 collegamenti contemporanei, 1 GB di dati, 10 GB scaricati al mese. Una stanza pesa pochi kB.

## Se qualcosa non va
- «Indirizzo non valido»: deve iniziare con `https://` e finire con `firebasedatabase.app` (o `firebaseio.com`).
- Nessuno vede la stanza: controlla le **Regole** (passo 3) e che tutti abbiano lo stesso indirizzo.
- Per provare senza server su un solo computer: nella console del browser `LOS_FESTA.setServer('locale')` e due schede.
