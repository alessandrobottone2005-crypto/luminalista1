# Animazione dell’hero

## Fonte

[`LogoLumina_Animazione.blend`](../LogoLumina_Animazione.blend) è la sorgente approvata. Contiene 108 fotogrammi a 24 fps, una camera 16:9, il logo tridimensionale, due luci e nebbia volumetrica Cycles. Il primo e l’ultimo fotogramma sono quasi al buio, quindi la sequenza gira in loop senza stacchi.

Il file `.blend1` generato automaticamente da Blender è escluso da Git. Non modificare a mano gli output in `public/media/hero` né `src/config/heroFrames.ts`.

## Perché una sequenza di immagini

La variazione luminosa è l’animazione principale. I materiali Cycles e la nebbia volumetrica non mantengono lo stesso aspetto in un’esportazione glTF/GLB. La sequenza renderizzata conserva la composizione originale a 1920 × 1080 e, disegnata su `<canvas>`, permette di inquadrare il logo in modo diverso su desktop e su smartphone.

## Esportazione

I PNG del render (`0001.png … 0108.png`, 1920 × 1080) vivono in `assets/source/RenderHero/`. Quella cartella è esclusa da Git e da Vercel perché pesa circa 86 MB e si rigenera dal `.blend`.

Per renderizzare di nuovo da Blender e ricostruire i frame web:

```bash
npm run media:hero:render
```

[`scripts/render-hero.mjs`](../scripts/render-hero.mjs) lancia Blender in background con [`scripts/export-blender-hero.py`](../scripts/export-blender-hero.py), poi esegue la conversione. Usa `/Applications/Blender.app` su macOS o `blender` nel `PATH`; in un’altra posizione, imposta `BLENDER_BIN` con il percorso dell’eseguibile.

Se hai già i PNG, ad esempio da un render lanciato a mano in Blender, basta:

```bash
npm run media:hero
```

[`scripts/build-hero-frames.mjs`](../scripts/build-hero-frames.mjs) produce:

- `public/media/hero/1920/0001.webp … 0108.webp` — circa 4 MB in totale, per schermi da desktop.
- `public/media/hero/960/…` — circa 1,7 MB in totale, per smartphone e tablet.
- [`src/config/heroFrames.ts`](../src/config/heroFrames.ts) — numero di frame, fps, larghezze e riquadro del logo calcolato dai pixel illuminati di tutti i fotogrammi.

## Comportamento nel browser

[`HeroAnimation.tsx`](../src/components/sections/HeroAnimation.tsx) sceglie un solo set: 1920 px solo se la finestra è larga almeno 1200 px e servono più di 1100 px reali (larghezza × densità, massimo 2x); altrimenti 960 px. Un tablet da 768 px a 2x resta quindi sul set leggero.

Il primo fotogramma viene disegnato appena arriva; gli altri si scaricano con sei richieste in parallelo. Il loop parte quando il caricamento è concluso e usa i fotogrammi arrivati: quelli mancanti vengono saltati invece di bloccare l’hero. Gira a 24 fps indipendentemente dalla frequenza dello schermo e si sospende quando l’hero esce dal viewport o la scheda è nascosta.

L’hero occupa tutto lo schermo (`100svh`, a filo bordi). Il fotogramma copre lo schermo ma non taglia mai il logo: se la copertura lo taglierebbe, il render si riduce finché il logo entra nell’area libera, con 20 px ai lati e 48 px sopra e sotto, restando centrato. Il nero puro del render sfuma nel fondo della pagina. Il canvas ha `role="img"` e `aria-label="Lumina — Lista 1"`.

**Eccezione concordata ad AGENTS.md:** su richiesta esplicita, il loop parte anche con `prefers-reduced-motion: reduce`. L’animazione è una variazione di luce lenta, senza spostamenti.

## Verifica

1. Controlla i fotogrammi iniziale, centrale e finale.
2. Verifica che il loop non mostri un flash nel passaggio 108 → 1.
3. Controlla che su smartphone verticale (390 × 844) il logo sia intero e centrato.
4. Nel pannello Network, verifica che tablet e smartphone scarichino solo il set 960.
5. Esegui `npm run check`.
