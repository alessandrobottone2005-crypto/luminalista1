# Accessibilità e QA

## Controlli obbligatori

- Navigazione completa con tastiera, focus sempre visibile e menu richiudibile con Escape.
- Contrasto verificato per testi, CTA, errori e stato disabilitato.
- Touch target di almeno 44 px e testo funzionale di almeno 16 px su mobile.
- Esperienza completa con `prefers-reduced-motion: reduce`.
- Form leggibile da screen reader con errori associati e stato annunciato.

## Prestazioni

- La scena 3D è caricata in lazy loading e usa DPR limitato.
- Immagini dei candidati usano WebP, dimensioni esplicite e lazy loading.
- Le animazioni privilegiano trasformazioni e opacità.
- ScrollTrigger viene aggiornato solo dopo cambi di layout significativi.
- La build segnala i chunk grandi: controllare la dimensione quando si aggiungono librerie o asset.

## Comando finale

```bash
npm run check
```

Il controllo automatico non sostituisce una prova visiva del percorso completo e un invio reale al foglio di test.
