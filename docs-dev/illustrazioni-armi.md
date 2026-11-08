# Illustrazioni delle armi

Il catalogo copre 132 modelli delle dieci arene, sia nel lessico storico sia nelle nuove famiglie del mondo. Ogni modello ha una propria illustrazione generata con `image_gen`, con sfondo alfa trasparente. Lo stile è quello di un oggetto d'inventario: sagoma netta, contorno scuro, piani di colore, materiali dipinti e piccoli riflessi chiari. Materiali e accenti cromatici seguono l'arena. Nel Liceo e nell'Ufficio i soggetti sono documenti, dispositivi e strumenti di competizione sociale.

`assets/armi-manifest.json` registra nome, arena, percorso e prompt finale di ciascuna immagine. I file ottimizzati sono in `assets/arene/<arena>/armi/<modello>.webp`. `tools/import-weapon-art.py` converte e riduce gli originali PNG generati a un massimo di 384 pixel, preservando e verificando l'alfa. Non applica rimozioni automatiche dello sfondo.

La funzione `LOS_ATLAS.weaponKey` risolve anche apostrofi tipografici e le varianti di impugnatura o documentazione del repertorio modulare. Queste conservano l'illustrazione del modello: il nome completo, la qualità, l'usura e la provenienza rimangono nello zaino. Le immagini non modificano inventario o simulazione. I nomi personalizzati non riconosciuti mantengono l'icona di riserva.

La guida mostra le armi storiche e, in un pannello espandibile, gli altri modelli del mondo. Le schede dei concorrenti mostrano l'immagine dell'arma effettivamente posseduta nella fase consultata. Tutte le immagini sono decorative accanto al nome testuale, caricate in modo differito e contenute nel riquadro senza ritagli della sagoma. La build web crea URL con impronta del contenuto; il file portatile incorpora le sole armi dell'atlante come data URI.

`tools/test-weapon-art.js` controlla la copertura dei 377 nomi d'arma (77 storici e 300 varianti), l'alfa dei file WebP, le dimensioni, il peso, i percorsi web e le immagini incorporate nel file portatile. La conversione degli originali richiede Python e Pillow; build e verifiche del sito richiedono soltanto Node come il resto del progetto.
