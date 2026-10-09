# Gallery fotografica

La pagina `/gallery` è indipendente dal percorso della landing. Si apre dal pulsante giallo **Gallery**, fisso in alto a destra. Titolo e testi vivono in `src/content/gallery.ts`.

## Archivio completo

La versione finale contiene **274 fotografie** dei cinque giorni di propaganda, da lunedì 5 a venerdì 9 ottobre 2026. Tutte le cartelle sono presenti e popolate; gli originali JPEG, PNG o WebP sono conservati nella cartella del giorno:

```text
assets/source/gallery/
├── giorno1-lunedi5ottobre/
├── giorno2-martedi6ottobre/
├── giorno3-mercoledi7ottobre/
├── giorno4-giovedi8ottobre/
└── giorno5-venerdi9ottobre/
```

| Giornata   | Data                     |    Foto |
| ---------- | ------------------------ | ------: |
| Giorno 1   | Lunedì 5 ottobre 2026    |      72 |
| Giorno 2   | Martedì 6 ottobre 2026   |      55 |
| Giorno 3   | Mercoledì 7 ottobre 2026 |      50 |
| Giorno 4   | Giovedì 8 ottobre 2026   |      40 |
| Giorno 5   | Venerdì 9 ottobre 2026   |      57 |
| **Totale** | **5–9 ottobre 2026**     | **274** |

I due video MP4 nella cartella del quinto giorno sono conservati come archivio, esclusi dalla generazione delle foto e dal conteggio.

Conta il prefisso `giorno1-` … `giorno5-`; una sola cartella per giornata. Le cartelle servono soltanto a organizzare gli originali: sul sito tutte le foto formano una sequenza unica, senza nomi, date o selettori dei giorni. Le foto del giorno più recente vengono prima.

Gli asset finali sono già generati e tracciati. Per riprodurli è disponibile `npm run media:gallery`, eseguito anche avviando `npm run dev` o `npm run build`. Un server già aperto non osserva gli originali: la rigenerazione richiede il comando oppure il riavvio. Componenti e manifesto non richiedono modifiche manuali.

Le fotografie seguono l'ordine naturale del nome, confrontato senza estensione: `foto.jpg`, `foto 2.jpg`, `foto 10.jpg`. Il nome non viene mostrato agli utenti. Per mantenere stabili gli identificativi, evita di rinominare le foto già inserite. Nessuna foto viene esclusa automaticamente per somiglianza o contenuto.

## Generazione

`scripts/build-gallery-assets.mjs` usa Sharp per correggere l'orientamento EXIF, eliminare i metadati dalle copie e produrre WebP in larghezze 480, 960 e 1600 px, limitate alla risoluzione originale. Non modifica gli originali. Immagini immutate riusano gli asset; file nascosti e metadati macOS vengono ignorati. Un'immagine illeggibile blocca la generazione prima di modificare il manifesto o gli asset pubblicati.

Output finali conservati insieme nel repository:

- `public/media/gallery/`: copie ottimizzate, con nomi basati su identificativo e contenuto.
- `src/config/gallery.json`: giorni, date, identificativi, dimensioni e varianti responsive.
- `gallery/index.html`: versione statica, generata da `scripts/static-gallery.mjs`.

Gli originali sono esclusi dal caricamento Vercel da `.vercelignore`. Se la cartella sorgente manca o non contiene fotografie supportate, la build valida e riusa gli output esistenti; se mancano anche questi, fallisce con un errore. Gli MP4 non vengono elaborati.

## Consultazione e accessibilità

La pagina mostra soltanto **LUMINA IN FOTO.**, il carosello a cascata e i controlli. Le foto intere si inseriscono in cornici 4:3 su fondo nero, con bordi squadrati. La foto centrale è dritta; le vicine sono inclinate di 20° per posizione, scendono lungo una diagonale e si riducono al 55%. La larghezza centrale è circa l'82% su mobile, fino a 640 px, limitata anche dall'altezza disponibile. Sono montate al massimo sette foto.

`useGalleryCarousel` usa due molle Motion: una segue lo spostamento orizzontale, l'altra segue inclinazione e scala. Non c'è animazione legata allo scroll. Swipe, trascinamento, trackpad orizzontale, frecce, Home ed End controllano una sequenza circolare. Una foto laterale viene portata al centro; quella centrale apre il visualizzatore.

L'autoplay avanza ogni tre secondi. Interazione manuale e focus da tastiera lo interrompono finché non si preme “Riprendi”. Mouse sopra il carosello, pagina nascosta e carosello fuori vista lo sospendono temporaneamente. Con movimento ridotto parte in pausa e i cambi sono immediati, senza oscillazioni.

Il dialogo a schermo intero riceve tutta la sequenza, senza suddivisioni giornaliere. Mostra foto e contatore globale, supporta swipe, frecce, pulsanti ed Escape. Alla chiusura, il carosello si posiziona sulla foto selezionata e ne recupera il focus. L'autoplay resta in pausa.

Vite produce due ingressi HTML; dev, preview e Vercel risolvono `/gallery` sull'ingresso dedicato. Senza JavaScript resta un carosello orizzontale CSS scroll-snap, con link precedente/successiva e apertura diretta della foto intera. Non compare una griglia. La landing non carica immagini o codice specifico della gallery finché non viene aperta.

## Verifica della versione finale

Esegui `npm run check`, poi controlla `/gallery` direttamente e dal pulsante della home. Prova telefono da 320/390 px, tablet, desktop e orientamento orizzontale, movimento ridotto e JavaScript disabilitato. Verifica autoplay, pausa/ripresa, sospensione fuori vista e in background, ciclo ultima/prima, trascinamento, swipe, trackpad, tastiera, dialogo, ripristino del focus e ritorno alla home. Non serve inviare il modulo idee.
