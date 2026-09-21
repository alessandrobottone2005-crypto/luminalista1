# Animazione dell’header

## Fonte

[`LogoLumina_Animazione.blend`](../LogoLumina_Animazione.blend) è la sorgente approvata. Contiene 108 fotogrammi a 24 fps, una camera 16:9, il logo tridimensionale, due luci e nebbia volumetrica Cycles.

Il file `.blend1` generato automaticamente da Blender è escluso da Git. Non modificare manualmente gli output dentro `public/media`.

## Perché viene usato un video

La variazione luminosa è l’animazione principale. I materiali Cycles e la nebbia volumetrica non mantengono lo stesso aspetto in un’esportazione glTF/GLB. Il rendering video conserva la composizione originale e riduce il lavoro della GPU nel browser.

## Esportazione

Con Blender installato:

```bash
npm run media:header
```

Il comando usa `/Applications/Blender.app` su macOS. In un’altra posizione, imposta `BLENDER_BIN` con il percorso dell’eseguibile.

Lo script produce:

- `public/media/lumina-header.mp4` — 960 × 540, H.264, 24 fps.
- `public/media/lumina-header-poster.webp` — fotogramma statico usato durante il caricamento e con movimento ridotto.

## Comportamento nel browser

[`HeroAnimation.tsx`](../src/components/brand/HeroAnimation.tsx) riproduce il video senza audio, in loop e inline. Il controllo sotto il logo permette di fermarlo o riavviarlo. La riproduzione viene sospesa quando l’header esce dal viewport.

Con `prefers-reduced-motion: reduce`, il poster rimane fermo finché l’utente non sceglie esplicitamente di avviare l’animazione.

## Verifica

1. Controlla i fotogrammi iniziale, centrale e finale.
2. Verifica che il loop non mostri un flash o un cambio di scala.
3. Prova pausa e ripresa da tastiera.
4. Prova il poster con movimento ridotto.
5. Esegui `npm run check`.
