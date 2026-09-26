# Fonti degli asset

Questa cartella conserva gli originali. Non viene pubblicata su Vercel (`.vercelignore`); il sito usa solo le versioni ottimizzate in `public/`.

| Cartella       | Origine                                                  | Consumata da                      | Output                                                        |
| -------------- | -------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| `RenderHero/`  | Render di `LogoLumina_Animazione.blend` (non in Git)      | `npm run media:hero`              | `public/media/hero/{1920,960}/`, `src/config/heroFrames.ts`   |
| `candidates/`  | Fotografie fornite con il progetto                       | Conversione manuale               | `public/images/candidates/*.webp`                             |
| `stickers/`    | Grafiche ufficiali degli sticker e texture di sfondo     | `npm run media:stickers`          | `public/media/stickers/`, `src/config/stickerWall.ts`         |
| `content/`     | `Lumina-testi-sito.docx`, testi consegnati dalla lista   | Riferimento editoriale            | Copiati a mano in `src/content/site.ts` e nelle sezioni       |

## RenderHero

`0001.png … 0108.png`, 1920 × 1080. Si genera con `npm run media:hero:render` ([`scripts/render-hero.mjs`](../../scripts/render-hero.mjs) + [`scripts/export-blender-hero.py`](../../scripts/export-blender-hero.py)). Pesa circa 86 MB ed è escluso da Git. Dettagli in [`docs/HERO-ANIMATION.md`](../../docs/HERO-ANIMATION.md).

## Candidati

Le fotografie di Valeria Bottone, Luca Pagliarulo, Marco Mondiello e Giulia Bisceglia sono state fornite con il progetto. Gli originali (PNG o JPEG a seconda della consegna) sono conservati qui; il sito usa copie WebP da 900 × 900 px, qualità 84, con lo stesso nome file indicato in `src/content/site.ts`. Non c’è uno script dedicato: quando una fotografia viene sostituita, aggiorna sia la sorgente sia la versione ottimizzata.

Le classi dei candidati (`VCE`, `VAC`, `IVBSU`) sono confermate dai 4 design Figma delle card social.

## Sticker

`Sticker1.png`, `Sticker2.png`, `Sticker3.png` e `SfondoStickers.png` condividono la stessa tela (1376 × 768): ogni sticker è già nella sua posizione sulla texture. [`scripts/build-sticker-assets.mjs`](../../scripts/build-sticker-assets.mjs) ritaglia ogni sticker sui pixel non trasparenti, ne ricava posizione e dimensione in percentuale e produce:

- `sticker-candidati.webp`, `sticker-lumina.webp`, `sticker-voce.webp` (qualità 82);
- `sfondo.webp` (tela intera) e `sfondo-verticale.webp` (taglio centrale 3:4 per telefono);
- `src/config/stickerWall.ts`.

## Contenuti

`Lumina-testi-sito.docx` è il documento con i testi del sito consegnato dalla lista. È escluso da Vercel (`*.docx`).
