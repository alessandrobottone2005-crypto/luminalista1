import { mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "assets", "source", "stickers");
const output = path.join(root, "public", "media", "stickers");
const config = path.join(root, "src", "config", "stickerWall.ts");
const quality = 82;
// A pixel belongs to a sticker when its alpha exceeds this value.
const alphaThreshold = 8;

// Ordine di impilamento: dal livello più basso al più alto, come in Esempio.png.
const stickers = [
  { id: "candidati", file: "Sticker3.png" },
  { id: "lumina", file: "Sticker2.png" },
  { id: "voce", file: "Sticker1.png" },
];

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });

const background = sharp(path.join(source, "SfondoStickers.png"))
  .toColourspace("srgb")
  .removeAlpha();
const { width: canvasWidth, height: canvasHeight } =
  await background.metadata();

// Il taglio verticale per telefono prende il centro della texture.
const portraitWidth = Math.round(canvasHeight * 0.75);
await Promise.all([
  background
    .clone()
    .webp({ quality, effort: 5 })
    .toFile(path.join(output, "sfondo.webp")),
  background
    .clone()
    .extract({
      left: Math.round((canvasWidth - portraitWidth) / 2),
      top: 0,
      width: portraitWidth,
      height: canvasHeight,
    })
    .webp({ quality, effort: 5 })
    .toFile(path.join(output, "sfondo-verticale.webp")),
]);

const pct = (value, total) => Number(((value / total) * 100).toFixed(3));
const entries = [];

for (const sticker of stickers) {
  const input = sharp(path.join(source, sticker.file)).ensureAlpha();
  const { data, info } = await input
    .clone()
    .raw({ depth: "uchar" })
    .toBuffer({ resolveWithObject: true });

  if (info.width !== canvasWidth || info.height !== canvasHeight) {
    throw new Error(`${sticker.file} non ha la stessa tela dello sfondo`);
  }

  const bounds = { left: Infinity, top: Infinity, right: 0, bottom: 0 };
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * info.channels + 3] > alphaThreshold) {
        bounds.left = Math.min(bounds.left, x);
        bounds.top = Math.min(bounds.top, y);
        bounds.right = Math.max(bounds.right, x);
        bounds.bottom = Math.max(bounds.bottom, y);
      }
    }
  }

  const box = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.right - bounds.left + 1,
    height: bounds.bottom - bounds.top + 1,
  };

  await input
    .clone()
    .extract(box)
    .webp({ quality, alphaQuality: 90, effort: 5 })
    .toFile(path.join(output, `sticker-${sticker.id}.webp`));

  entries.push(`  {
    id: "${sticker.id}",
    src: "/media/stickers/sticker-${sticker.id}.webp",
    width: ${box.width},
    height: ${box.height},
    // Posizione sulla tela ${canvasWidth}×${canvasHeight}, in percentuale.
    left: ${pct(box.left, canvasWidth)},
    top: ${pct(box.top, canvasHeight)},
    size: ${pct(box.width, canvasWidth)},
  },`);
}

await writeFile(
  config,
  `// Generato da scripts/build-sticker-assets.mjs — non modificare a mano.
export const STICKER_WALL = {
  canvas: { width: ${canvasWidth}, height: ${canvasHeight} },
  background: {
    landscape: "/media/stickers/sfondo.webp",
    portrait: "/media/stickers/sfondo-verticale.webp",
  },
  stickers: [
${entries.join("\n")}
  ],
} as const;

export type StickerId = (typeof STICKER_WALL.stickers)[number]["id"];
`,
);

console.log(`Sticker pronti: ${stickers.map(({ id }) => id).join(", ")}`);
