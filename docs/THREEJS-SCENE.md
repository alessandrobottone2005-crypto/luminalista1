# Scena Three.js

## Fonte

La scena carica [`public/Logo.svg`](../public/Logo.svg) con `SVGLoader`. Ogni tracciato viene convertito in `Shape`, estruso e illuminato; non esiste una copia ridisegnata del simbolo.

## Pipeline

1. `useLoader` carica l’SVG dentro un `Suspense` interno al Canvas.
2. `SVGLoader.createShapes` produce le forme riutilizzabili.
3. `ExtrudeGeometry` aggiunge profondità e bevel controllato.
4. `useFrame` aggiorna solo riferimenti Three.js con `delta`.
5. Il cleanup elimina ogni geometria creata manualmente.

## Budget

- Pixel ratio limitato a `1–1.5`.
- Nessuna ombra dinamica o post-produzione.
- Quattro luci semplici e materiali standard.
- Rendering continuo solo quando la scena è visibile e il movimento è consentito.
- Nessuna allocazione e nessun `setState` dentro `useFrame`.

## Fallback

Se WebGL2 non è disponibile o il componente genera un errore, la pagina mostra direttamente `Logo.svg`. Il contenuto testuale e il modulo restano indipendenti dal Canvas.
