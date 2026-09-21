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

- **CSS**: hover, focus, colori e feedback semplici.
- **Motion**: elementi montati o smontati da React, come menu e conferma del form.
- **GSAP**: sequenze iniziali, reveal e animazioni legate allo scroll.
- **Video Blender**: animazione principale dell’header, con controllo esplicito e pausa fuori viewport.

## Regole GSAP

`useGSAP` limita selettori e cleanup alla pagina. ScrollTrigger vive solo su tween di primo livello. Gli spostamenti usano trasformazioni e `autoAlpha`; i refresh sono raggruppati dopo font o ridimensionamenti. Lenis aggiorna ScrollTrigger tramite lo stesso ticker GSAP.

## Accessibilità e prestazioni

Con `prefers-reduced-motion: reduce`, Lenis e le animazioni GSAP non partono, la linea di avanzamento viene nascosta e il manifesto torna a un blocco statico senza tratto sticky. Motion usa la preferenza dell’utente e l’header resta sul poster finché l’utente non sceglie di avviarlo. Nessuna informazione dipende esclusivamente dal movimento.
