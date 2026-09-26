# Animazione dell’hero

## Fonte

[`LogoLumina_Animazione.blend`](../LogoLumina_Animazione.blend) è la sorgente approvata. Contiene 108 fotogrammi a 24 fps, una camera 16:9, il logo tridimensionale, due luci e nebbia volumetrica Cycles. Il primo e l’ultimo fotogramma sono quasi al buio, quindi la sequenza gira in loop senza stacchi.

Il file `.blend1` generato automaticamente da Blender è escluso da Git. Non modificare manualmente gli output dentro `public/media/hero`.

## Perché una sequenza di immagini

La variazione luminosa è l’animazione principale. I materiali Cycles e la nebbia volumetrica non mantengono lo stesso aspetto in un’esportazione glTF/GLB. La sequenza renderizzata conserva la composizione originale a 1920 × 1080 e, disegnata su `<canvas>`, permette di inquadrare il logo in modo diverso su desktop e su smartphone.

## Esportazione

I PNG del render (`0001.png … 0108.png`, 1920 × 1080) vivono in `assets/source/RenderHero/`. Quella cartella è esclusa da Git e da Vercel perché pesa circa 86 MB e si rigenera dal `.blend`.

Per renderizzare di nuovo da Blender e ricostruire i frame web:

```bash
npm run media:header
```

Il comando usa `/Applications/Blender.app` su macOS. In un’altra posizione, imposta `BLENDER_BIN` con il percorso dell’eseguibile.

Se hai già i PNG, ad esempio da un render lanciato a mano in Blender, basta:

```bash
npm run media:hero
```

[`scripts/build-hero-frames.mjs`](../scripts/build-hero-frames.mjs) produce:

- `public/media/hero/1920/0001.webp … 0108.webp` — circa 4 MB in totale, per schermi ampi.
- `public/media/hero/960/…` — circa 1,7 MB in totale, per smartphone.
- [`src/config/heroFrames.ts`](../src/config/heroFrames.ts) — numero di frame, fps e riquadro del logo calcolato dai pixel illuminati di tutti i fotogrammi.

## Comportamento nel browser

[`HeroAnimation.tsx`](../src/components/brand/HeroAnimation.tsx) disegna subito il primo fotogramma e scarica gli altri in parallelo. Il loop parte quando sono tutti decodificati e gira a 24 fps indipendentemente dalla frequenza dello schermo. Si sospende quando l’hero esce dal viewport o la scheda è nascosta.

L’hero occupa tutto lo schermo (`100svh`, a filo bordi) e passa sotto la barra di navigazione, che resta trasparente finché l’hero è visibile. Il fotogramma copre lo schermo, ma non taglia mai il logo: se la copertura lo taglierebbe, il render si riduce finché il logo entra nell’area libera tra la barra e l’indicatore “Scorri”. Il nero puro del render si fonde con il fondo.

**Eccezione concordata ad AGENTS.md:** su richiesta esplicita, il loop parte anche con `prefers-reduced-motion: reduce`. L’animazione è una variazione di luce lenta senza spostamenti. Resta ridotta l’oscillazione dell’indicatore “Scorri”.

## Verifica

1. Controlla i fotogrammi iniziale, centrale e finale.
2. Verifica che il loop non mostri un flash nel passaggio 108 → 1.
3. Controlla che su smartphone verticale (390 × 844) il logo sia intero e centrato.
4. Verifica che la barra torni scura dopo l’hero e che “Scorri” sia raggiungibile da tastiera.
5. Esegui `npm run check`.
