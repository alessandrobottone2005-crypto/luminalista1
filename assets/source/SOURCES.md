# Fonti degli asset

Questa cartella conserva gli originali. Non viene pubblicata su Vercel (`.vercelignore`); il sito usa solo le versioni ottimizzate in `public/`.

| Cartella      | Origine                                                | Consumata da             | Output                                                      |
| ------------- | ------------------------------------------------------ | ------------------------ | ----------------------------------------------------------- |
| `RenderHero/` | Render di `LogoLumina_Animazione.blend` (non in Git)   | `npm run media:hero`     | `public/media/hero/{1920,960}/`, `src/config/heroFrames.ts` |
| `candidates/` | Fotografie fornite con il progetto                     | Conversione manuale      | `public/images/candidates/*.webp`                           |
| `stickers/`   | Grafiche ufficiali degli sticker e texture di sfondo   | `npm run media:stickers` | `public/media/stickers/`, `src/config/stickerWall.ts`       |
| `content/`    | `Lumina-testi-sito.docx`, testi consegnati dalla lista | Riferimento editoriale   | Copiati a mano in `src/content/site.ts` e nelle sezioni     |

## RenderHero

`0001.png … 0108.png`, 1920 × 1080. Si genera con `npm run media:hero:render` ([`scripts/render-hero.mjs`](../../scripts/render-hero.mjs) + [`scripts/export-blender-hero.py`](../../scripts/export-blender-hero.py)). Pesa circa 86 MB ed è escluso da Git. Dettagli in [`docs/HERO-ANIMATION.md`](../../docs/HERO-ANIMATION.md).

## Candidati

Le fotografie di Valeria Bottone, Luca Pagliarulo, Marco Mondiello e Giulia Bisceglia sono state fornite con il progetto. Gli originali (PNG o JPEG a seconda della consegna), comprese entrambe le versioni quando presenti, sono conservati qui; il sito usa copie WebP da 900 × 900 px, qualità 84, con lo stesso nome file indicato in `src/content/site.ts`. Fanno eccezione Valeria Bottone e Giulia Bisceglia, con ritagli verticali in qualità 82: `ValeriaBottone.jpeg` → 804 × 1125 px, inquadrato nella card con `position: "center 30%"`; `GiuliaBisceglia.jpeg` → 720 × 900 px (4:5, come la card), ritagliato sul soggetto a partire da `left 363, top 230`. Non c’è uno script dedicato: quando una fotografia viene sostituita, aggiorna sia la sorgente sia la versione ottimizzata.

Le classi dei candidati (`VCE`, `VAC`, `IVBSU`) sono confermate dai 4 design Figma delle card social.

## Sticker

`Sticker1.png`, `Sticker2.png`, `Sticker3.png` e `SfondoStickers.png` condividono la stessa tela (1376 × 768): ogni sticker è già nella sua posizione sulla texture. [`scripts/build-sticker-assets.mjs`](../../scripts/build-sticker-assets.mjs) ritaglia ogni sticker sui pixel non trasparenti, ne ricava posizione e dimensione in percentuale e produce:

- `sticker-candidati.webp`, `sticker-lumina.webp`, `sticker-voce.webp` (qualità 82);
- `sfondo.webp` (tela intera) e `sfondo-verticale.webp` (taglio centrale 3:4 per telefono);
- `src/config/stickerWall.ts`.

## Contenuti

`Lumina-testi-sito.docx` è il documento con i testi del sito consegnato dalla lista. È escluso da Vercel (`*.docx`).

## Gallery

Archivio completo della propaganda del **5–9 ottobre 2026: 274 fotografie in cinque giornate**.

`gallery/giorno1-lunedi5ottobre/` contiene le 72 fotografie consegnate per il primo giorno di propaganda.
`gallery/giorno2-martedi6ottobre/` contiene le 55 fotografie consegnate per il secondo giorno di propaganda.
`gallery/giorno3-mercoledi7ottobre/` contiene le 50 fotografie consegnate per il terzo giorno di propaganda.
`gallery/giorno4-giovedi8ottobre/` contiene le 40 fotografie consegnate per il quarto giorno di propaganda.
`gallery/giorno5-venerdi9ottobre/` contiene le 57 fotografie consegnate per il quinto e ultimo giorno di propaganda.

I due MP4 del quinto giorno restano nel repository come archivio sorgente; non sono elaborati dalla pipeline e non sono inclusi nel conteggio delle fotografie.

`npm run media:gallery` genera WebP responsive in `public/media/gallery/`, `src/config/gallery.json` e l’ingresso statico. Gli originali restano esclusi da Vercel. Procedura in [`GALLERY.md`](../../docs/GALLERY.md).
