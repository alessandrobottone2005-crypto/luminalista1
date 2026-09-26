# Sistema di movimento

## Tesi d’interazione

Lo scroll agisce come una sorgente luminosa su un palco nero continuo: rivela testi, porta i volti fuori dall’ombra, mette a fuoco le proposte e conduce al modulo finale. L’header riproduce il passaggio di luce preparato nel file Blender originale.

La linea gialla fissa in cima alla viewport misura l’avanzamento dell’intero racconto. Il manifesto è il climax: resta fermo per un tratto di pagina e le sue righe si accendono in sequenza in base allo scroll.

## Personalità

La personalità scelta è **energetica editoriale**: rapida nei feedback, controllata nelle entrate e più lenta solo nei reveal narrativi.

| Ritmo    | Durata       | Uso                              |
| -------- | ------------ | -------------------------------- |
| Rapido   | 140 ms       | Press, focus e micro-feedback.   |
| Standard | 320 ms       | Menu, galleria e cambi di stato. |
| Lento    | 720–1.150 ms | Hero e rivelazioni narrative.    |

## Responsabilità

- **CSS**: hover, focus, colori e feedback semplici, compreso il bagliore degli sticker (`drop-shadow` all’hover/focus e impulso `sticker-pulse` al tap).
- **Motion**: elementi montati o smontati da React, come menu e conferma del form.
- **GSAP**: sequenze iniziali, reveal e animazioni legate allo scroll.
- **Pointer events** (`src/motion/useStickerDrag.ts`): trascinamento degli sticker. Lo spostamento usa la proprietà CSS `translate`, che si somma alla rotazione CSS senza sovrascriverla. Col dito la presa richiede una pressione prolungata e blocca lo scroll solo dopo la presa. Le posizioni non vengono salvate.
- **Video Blender**: animazione principale dell’header, con controllo esplicito e pausa fuori viewport.

## Regole GSAP

`useGSAP` limita selettori e cleanup alla pagina. ScrollTrigger vive solo su tween di primo livello. Gli spostamenti usano trasformazioni e `autoAlpha`; i refresh sono raggruppati dopo font o ridimensionamenti. Lenis aggiorna ScrollTrigger tramite lo stesso ticker GSAP.

## Accessibilità e prestazioni

Con `prefers-reduced-motion: reduce`, Lenis e le animazioni GSAP non partono, la linea di avanzamento viene nascosta e il manifesto torna a un blocco statico senza tratto sticky. Gli sticker non si ingrandiscono e mantengono solo il bagliore statico. Motion usa la preferenza dell’utente. Il loop dell’hero resta attivo per scelta concordata (vedi [`HEADER-ANIMATION.md`](HEADER-ANIMATION.md)). Nessuna informazione dipende esclusivamente dal movimento.
