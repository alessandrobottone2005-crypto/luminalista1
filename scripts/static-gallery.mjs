import fs from "node:fs/promises";
const root = new URL("../", import.meta.url);
const { days } = JSON.parse(
  await fs.readFile(new URL("src/config/gallery.json", root), "utf8"),
);
const source = await fs.readFile(
  new URL("src/content/gallery.ts", root),
  "utf8",
);
const { galleryCopy } = await import(
  "data:text/javascript;base64," + Buffer.from(source).toString("base64")
);
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const photos = [...days]
  .sort((a, b) => b.number - a.number)
  .flatMap((day) => day.photos);
const html = `<!doctype html><html lang="it"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/><meta name="theme-color" content="#080808"/><title>${escape(galleryCopy.documentTitle)}</title><meta name="description" content="${escape(galleryCopy.subtitle)}"/><link rel="icon" type="image/svg+xml" href="/favicon.svg"/><style>@font-face{font-family:GalleryDisplay;src:url('/fonts/DxPlayhigh-Expanded.otf')}body{margin:0;background:#080808;color:#f5f4ef}.static-gallery{font:16px/1.6 sans-serif;height:100svh;min-height:400px;display:flex;flex-direction:column}.static-gallery header{padding:16px 20px 0}.static-gallery a{color:#ffcf02;display:inline-flex;min-height:44px;align-items:center}.static-gallery h1{font:400 clamp(30px,7vw,50px)/1 GalleryDisplay,sans-serif;margin:14px 0 0}.static-reel{display:flex;flex:1;min-height:0;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain}.static-photo{flex:0 0 100%;min-width:0;scroll-snap-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0}.static-photo>a{display:flex;width:min(82vw,640px);min-height:0;flex:1;overflow:hidden;justify-content:center}.static-photo img{width:100%;height:100%;object-fit:contain;align-self:center;max-height:calc(100svh - 240px)}.static-photo nav{display:flex;align-items:center;justify-content:center;gap:16px;margin:12px 0;font-variant-numeric:tabular-nums}.static-photo nav a{padding:0 12px;min-width:24px;justify-content:center;border:1px solid #4b4b45}.static-gallery footer{padding:4px 20px;font-size:12px;color:#b6b5b0}.static-gallery a:focus-visible,.static-reel:focus-visible{outline:2px solid #ffcf02;outline-offset:-2px}</style></head><body><div id="root"><main class="static-gallery"><header><a href="/">${escape(galleryCopy.back)}</a><h1>${escape(galleryCopy.title)}</h1></header><div class="static-reel" tabindex="0" role="region" aria-label="${escape(galleryCopy.title)}">${photos.map((photo, index) => `<figure class="static-photo" id="foto-${photo.id}"><a href="${photo.variants.at(-1).src}" aria-label="${escape(galleryCopy.openPhoto)} ${index + 1} ${escape(galleryCopy.of)} ${photos.length}"><img src="${photo.variants[0].src}" srcset="${photo.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ")}" sizes="(min-width:900px) 640px, 82vw" width="${photo.width}" height="${photo.height}" loading="lazy" alt="${escape(galleryCopy.photo)} ${index + 1}"/></a><nav aria-label="Navigazione foto"><a href="#foto-${photos[(index - 1 + photos.length) % photos.length].id}" aria-label="${escape(galleryCopy.previous)}">←</a><span>${String(index + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}</span><a href="#foto-${photos[(index + 1) % photos.length].id}" aria-label="${escape(galleryCopy.next)}">→</a></nav></figure>`).join("") || `<p>${escape(galleryCopy.empty)}</p>`}</div><footer>© 2026 LUMINA · <a href="/privacy">PRIVACY</a></footer></main></div><script type="module" src="/src/main.tsx"></script></body></html>`;
await fs.mkdir(new URL("gallery/", root), { recursive: true });
await fs.writeFile(new URL("gallery/index.html", root), html);
