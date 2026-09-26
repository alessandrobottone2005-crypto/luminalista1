# Sistema di movimento

## Tesi d’interazione

Lo scroll agisce come una sorgente luminosa su un palco nero continuo: rivela testi, porta i volti fuori dall’ombra, mette a fuoco le proposte e conduce al modulo finale. L’hero riproduce il passaggio di luce preparato nel file Blender originale.

Il manifesto è il climax: resta fermo per un tratto di pagina e le sue righe si accendono in sequenza in base allo scroll.

## Personalità

La personalità scelta è **energetica editoriale**: rapida nei feedback, controllata nelle entrate e più lenta solo nei reveal narrativi.

| Ritmo    | Durata      | Token / uso                                     |
| -------- | ----------- | ----------------------------------------------- |
| Standard | 320 ms      | `--motion-standard`: feedback e cambi di stato. |
| Lento    | 720 ms      | `--motion-slow`: transizioni narrative in CSS.  |
| Reveal   | 0,55–1,15 s | Durate GSAP in `useLandingMotion.ts`.           |

La curva ricorrente è `--ease-signature` (`cubic-bezier(0.2, 0, 0, 1)`).

## Responsabilità

- **CSS**: hover, focus, colori e feedback semplici, compreso il bagliore degli sticker (`drop-shadow` all’hover/focus, impulso `sticker-pulse` al tap, sollevamento in presa e rimbalzo al rilascio tramite `data-dragging` e `data-drop`).
- **Motion**: elementi montati o smontati da React, cioè il passaggio dal modulo alla conferma.
- **GSAP** (`src/motion/useLandingMotion.ts`): reveal di luce, candidati, proposte, manifesto sticky con scrub e “attacchinaggio” degli sticker.
- **Pointer events** (`src/motion/useStickerDrag.ts`): trascinamento degli sticker. Lo spostamento usa la proprietà CSS `translate`, che si somma alla rotazione CSS senza sovrascriverla. Col mouse la presa parte dopo 4 px di movimento; col dito richiede 300 ms di pressione e blocca lo scroll solo dopo la presa, mentre uno swipe rapido continua a scorrere la pagina. Da tastiera: frecce da 16 px, 48 px con Shift. Lo sticker spostato sale sopra gli altri; il centro resta sempre dentro la sezione. Le posizioni non vengono salvate.
- **Canvas** (`HeroAnimation.tsx`): sequenza di 108 fotogrammi a 24 fps con `requestAnimationFrame`, sospesa fuori viewport e con la scheda nascosta. Vedi [`HERO-ANIMATION.md`](HERO-ANIMATION.md).

## Regole GSAP

`useGSAP` limita selettori e cleanup alla pagina. ScrollTrigger vive solo su tween di primo livello. Gli spostamenti usano trasformazioni e `autoAlpha`; i refresh sono raggruppati dopo il caricamento dei font o i ridimensionamenti. Lenis aggiorna ScrollTrigger tramite lo stesso ticker GSAP.

## Accessibilità e prestazioni

Con `prefers-reduced-motion: reduce`:

- Lenis e le animazioni GSAP non partono; reveal, candidati e proposte sono subito visibili.
- Il manifesto torna a un blocco statico, senza tratto sticky.
- Le animazioni e transizioni CSS si riducono a 0,01 ms; gli sticker non si ingrandiscono e mantengono solo il bagliore statico, ma restano trascinabili.
- Motion rispetta la preferenza tramite `MotionConfig reducedMotion="user"`.
- Il loop dell’hero resta attivo per scelta concordata (vedi [`HERO-ANIMATION.md`](HERO-ANIMATION.md)).

Nessuna informazione dipende esclusivamente dal movimento.
