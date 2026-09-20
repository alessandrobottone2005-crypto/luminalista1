---
name: lumina-project
description: Applica il brief, il Design DNA, il sistema di movimento e le regole tecniche della landing Lumina Lista 1 quando si modifica questo repository.
---

# Lumina project skill

## Core framework

### Darkness → Light → Voice

Usa questa sequenza per valutare ogni sezione:

1. **Darkness** — crea attesa senza nascondere contenuto essenziale.
2. **Light** — rivela una sola idea visiva dominante.
3. **Voice** — termina con un contenuto o un’azione comprensibile.

### One owner per effect

Usa CSS per micro-feedback, Motion per stati React, GSAP per scroll e timeline, Three.js per la scena 3D. Non animare la stessa proprietà con due sistemi.

### Content truth

Preserva le etichette provvisorie. Non inventare persone, date, account o proposte ufficiali. Aggiorna prima `src/content/site.ts`, poi rimuovi le etichette demo solo dopo verifica.

### Performance envelope

Mantieni lazy loading del Canvas, DPR massimo 1.5, nessuna allocazione dentro `useFrame`, trasformazioni al posto di proprietà di layout e modalità ridotta completa.

## Topic index

- **Architettura** → [`docs/ARCHITECTURE.md`](../../../docs/ARCHITECTURE.md)
- **Contenuti** → [`docs/CONTENT-GUIDE.md`](../../../docs/CONTENT-GUIDE.md)
- **Design DNA** → [`docs/DESIGN-SYSTEM.md`](../../../docs/DESIGN-SYSTEM.md)
- **Form e dati** → [`docs/FORM-AND-DATA.md`](../../../docs/FORM-AND-DATA.md)
- **Motion** → [`docs/MOTION-SYSTEM.md`](../../../docs/MOTION-SYSTEM.md)
- **Three.js** → [`docs/THREEJS-SCENE.md`](../../../docs/THREEJS-SCENE.md)

## Definition of done

La modifica è pronta quando `npm run check` passa, l’esperienza ridotta resta completa, il contenuto è veritiero e il percorso mobile funziona da hero a invio.
