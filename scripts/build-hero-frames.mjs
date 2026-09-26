import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "assets", "source", "RenderHero");
const output = path.join(root, "public", "media", "hero");
const config = path.join(root, "src", "config", "heroFrames.ts");
const widths = [1920, 960];
const quality = 80;
// A pixel counts as "lit" when any 8-bit channel exceeds this value.
const litThreshold = 24;

const frames = (await readdir(source))
  .filter((name) => /^\d{4}\.png$/.test(name))
  .sort();

if (frames.length === 0) {
  throw new Error(`Nessun frame PNG trovato in ${source}`);
}

await rm(output, { force: true, recursive: true });
await Promise.all(
  widths.map((width) =>
    mkdir(path.join(output, String(width)), { recursive: true }),
  ),
);

let sourceWidth = 0;
let sourceHeight = 0;
const bounds = { left: Infinity, top: Infinity, right: 0, bottom: 0 };

for (const [index, name] of frames.entries()) {
  const input = sharp(path.join(source, name)).toColourspace("srgb");
  const { data, info } = await input
    .clone()
    .removeAlpha()
    .raw({ depth: "uchar" })
    .toBuffer({ resolveWithObject: true });

  sourceWidth = info.width;
  sourceHeight = info.height;

  for (let y = 0; y < info.height; y += 2) {
    for (let x = 0; x < info.width; x += 2) {
      const offset = (y * info.width + x) * info.channels;
      if (
        data[offset] > litThreshold ||
        data[offset + 1] > litThreshold ||
        data[offset + 2] > litThreshold
      ) {
        bounds.left = Math.min(bounds.left, x);
        bounds.top = Math.min(bounds.top, y);
        bounds.right = Math.max(bounds.right, x);
        bounds.bottom = Math.max(bounds.bottom, y);
      }
    }
  }

  const frame = String(index + 1).padStart(4, "0");
  await Promise.all(
    widths.map((width) =>
      input
        .clone()
        .resize({ width })
        .webp({ quality, effort: 5 })
        .toFile(path.join(output, String(width), `${frame}.webp`)),
    ),
  );
}

const logo = {
  x: bounds.left,
  y: bounds.top,
  width: bounds.right - bounds.left + 1,
  height: bounds.bottom - bounds.top + 1,
};

await writeFile(
  config,
  `// Generato da scripts/build-hero-frames.mjs — non modificare a mano.
export const HERO_FRAMES = {
  count: ${frames.length},
  fps: 24,
  widths: [${widths.join(", ")}],
  path: (width: number, frame: number) =>
    \`/media/hero/\${width}/\${String(frame + 1).padStart(4, "0")}.webp\`,
  source: { width: ${sourceWidth}, height: ${sourceHeight} },
  // Riquadro dei pixel illuminati in tutti i frame, in pixel del render.
  logo: { x: ${logo.x}, y: ${logo.y}, width: ${logo.width}, height: ${logo.height} },
} as const;
`,
);

console.log(
  `Frame hero pronti: ${frames.length} × ${widths.join("/")} px, logo ${JSON.stringify(logo)}`,
);
