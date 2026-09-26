# Accessibilità e QA

## Controlli obbligatori

- Navigazione completa con tastiera, focus sempre visibile e menu richiudibile con Escape.
- Contrasto verificato per testi, CTA, errori e stato disabilitato.
- Touch target di almeno 44 px e testo funzionale di almeno 16 px su mobile.
- Esperienza completa con `prefers-reduced-motion: reduce`.
- Il manifesto resta leggibile e perde sticky e scrub quando il movimento è ridotto.
- Form leggibile da screen reader con errori associati e stato annunciato.
- Sticker trascinabili: col mouse si spostano al primo movimento; col dito solo dopo una pressione di 0,3 s, mentre uno swipe veloce continua a far scorrere la pagina. Da tastiera si spostano con le frecce (Shift per passi lunghi). Va provato su iOS Safari e Android Chrome reali, controllando che non compaia il menu contestuale dell’immagine.

## Prestazioni

- La sequenza dell’hero mostra subito il primo fotogramma, viene sospesa fuori viewport e con la scheda nascosta; l’indicatore “Scorri” è un link da 44 px verso `#intro`.
- Immagini dei candidati usano WebP, dimensioni esplicite e lazy loading.
- Le animazioni privilegiano trasformazioni e opacità.
- Il progresso dello scroll usa una sola trasformazione `scaleX` e non modifica il layout.
- ScrollTrigger viene aggiornato solo dopo cambi di layout significativi.
- La build segnala i chunk grandi: controllare la dimensione quando si aggiungono librerie o asset.

## Comando finale

```bash
npm run check
```

Il controllo automatico non sostituisce una prova visiva del percorso completo e un invio reale al foglio di test.
