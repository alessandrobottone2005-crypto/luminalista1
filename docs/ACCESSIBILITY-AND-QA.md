# Accessibilità e QA

## Controlli obbligatori

- Navigazione completa con tastiera e focus sempre visibile, dagli sticker al link privacy nella riga finale.
- Un solo `h1` per pagina: in home è nella sezione Intro; sezioni successive con `h2`.
- Il canvas dell’hero è annunciato come immagine “Lumina — Lista 1”.
- Contrasto verificato per testi, CTA, errori e stato disabilitato.
- Touch target di almeno 44 px e testo funzionale di almeno 16 px su mobile.
- Esperienza completa con `prefers-reduced-motion: reduce`: niente Lenis né reveal GSAP, manifesto statico senza sticky, contenuti subito visibili.
- Countdown: le cifre sono nascoste ai lettori di schermo e il gruppo ha un’etichetta unica (“N giorni, N ore e N minuti alle elezioni”); a data passata compare “IL CONTO ALLA ROVESCIA È TERMINATO” e il timer si ferma.
- Form leggibile da screen reader: errori associati ai campi con `aria-describedby`, errore di invio in una regione `aria-live`, focus spostato sul titolo “IDEA RICEVUTA.” dopo l’invio riuscito.
- Sticker trascinabili: col mouse si spostano al primo movimento; col dito solo dopo una pressione di 0,3 s, mentre uno swipe veloce continua a far scorrere la pagina. Da tastiera si spostano con le frecce (Shift per passi lunghi); l’istruzione è letta dai lettori di schermo tramite un testo `.sr-only`. Va provato su iOS Safari e Android Chrome reali, controllando che non compaia il menu contestuale dell’immagine.
- Senza JavaScript la pagina statica generata da `scripts/static-page.mjs` mostra candidati, programma e un modulo nativo.

## Prestazioni

- La sequenza dell’hero mostra subito il primo fotogramma, scarica un solo set (960 px su telefoni e tablet) e viene sospesa fuori viewport e con la scheda nascosta.
- Immagini dei candidati e degli sticker usano WebP, dimensioni esplicite e lazy loading.
- Le animazioni privilegiano trasformazioni e opacità.
- ScrollTrigger viene aggiornato solo dopo cambi di layout significativi.
- La build segnala i chunk grandi: controllare la dimensione quando si aggiungono librerie o asset.

## Comando finale

```bash
npm run check
```

Il controllo automatico non sostituisce una prova visiva del percorso completo e un invio reale al foglio di test.
