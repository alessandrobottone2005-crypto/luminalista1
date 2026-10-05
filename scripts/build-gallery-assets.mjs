import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const weekdays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
const version = 2;
const natural = new Intl.Collator("it", { numeric: true });
const exists = async (file) =>
  fs.access(file).then(
    () => true,
    () => false,
  );
const hash = (value) => createHash("sha256").update(value).digest("hex");

export async function buildGallery(root = projectRoot) {
  const source = path.join(root, "assets/source/gallery");
  const output = path.join(root, "public/media/gallery");
  const config = path.join(root, "src/config/gallery.json");
  const previous = await fs
    .readFile(config, "utf8")
    .then(JSON.parse, () => null);
  if (!(await exists(source))) {
    if (
      !previous ||
      previous.version !== version ||
      !Array.isArray(previous.days)
    ) {
      throw new Error(
        "Gallery: originali assenti e manifesto generato non disponibile.",
      );
    }
    for (const day of previous.days) {
      for (const photo of day.photos) {
        for (const variant of photo.variants) {
          if (
            !variant.src.startsWith("/media/gallery/") ||
            variant.src.includes("..")
          ) {
            throw new Error("Gallery: percorso generato non valido.");
          }
          const metadata = await sharp(
            path.join(root, "public", variant.src),
          ).metadata();
          if (
            metadata.width !== variant.width ||
            metadata.height !== variant.height
          ) {
            throw new Error(`Gallery: asset non valido ${variant.src}`);
          }
        }
      }
    }
    return { days: previous.days, converted: 0, cached: true };
  }

  const entries = (await fs.readdir(source, { withFileTypes: true }))
    .filter((entry) => !entry.name.startsWith(".") && entry.isDirectory())
    .sort((a, b) => natural.compare(a.name, b.name));
  const folders = new Map();
  for (const entry of entries) {
    const match = /^giorno([1-5])-/.exec(entry.name);
    if (!match)
      throw new Error(`Gallery: cartella non riconosciuta ${entry.name}`);
    const number = Number(match[1]);
    if (folders.has(number))
      throw new Error(`Gallery: giorno ${number} duplicato.`);
    folders.set(number, entry.name);
  }
  const oldPhotos = new Map(
    (previous?.version === version ? previous.days : []).flatMap((day) =>
      day.photos.map((photo) => [photo.id, photo]),
    ),
  );
  await fs.mkdir(path.dirname(output), { recursive: true });
  const staging = await fs.mkdtemp(
    path.join(path.dirname(output), ".gallery-stage-"),
  );
  const days = [];
  let converted = 0;
  try {
    for (const [number, folder] of folders) {
      const files = (
        await fs.readdir(path.join(source, folder), { withFileTypes: true })
      )
        .filter(
          (entry) =>
            entry.isFile() &&
            !entry.name.startsWith(".") &&
            /\.(jpe?g|png|webp)$/i.test(entry.name),
        )
        .map((entry) => entry.name)
        .sort(
          (a, b) =>
            natural.compare(path.parse(a).name, path.parse(b).name) ||
            natural.compare(a, b),
        );
      const photos = [];
      for (const file of files) {
        const relative = `${folder}/${file}`;
        const input = await fs.readFile(path.join(source, relative));
        const id = `g${number}-${hash(relative).slice(0, 16)}`;
        const fingerprint = hash(input);
        const old = oldPhotos.get(id);
        if (
          old?.fingerprint === fingerprint &&
          (
            await Promise.all(
              old.variants.map((v) => exists(path.join(root, "public", v.src))),
            )
          ).every(Boolean)
        ) {
          photos.push(old);
          continue;
        }
        let metadata;
        try {
          metadata = await sharp(input)
            .rotate()
            .raw()
            .toBuffer({ resolveWithObject: true });
        } catch {
          throw new Error(`Gallery: immagine illeggibile ${relative}`);
        }
        const { width, height } = metadata.info;
        const widths = [
          ...new Set([
            Math.min(480, width),
            Math.min(960, width),
            Math.min(1600, width),
          ]),
        ];
        const variants = [];
        for (const size of widths) {
          const name = `${id}-${fingerprint.slice(0, 16)}-${size}.webp`;
          const info = await sharp(metadata.data, { raw: metadata.info })
            .resize({ width: size, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile(path.join(staging, name));
          variants.push({
            src: `/media/gallery/${name}`,
            width: info.width,
            height: info.height,
          });
        }
        photos.push({
          id,
          source: relative,
          fingerprint,
          width,
          height,
          variants,
        });
        converted++;
      }
      if (photos.length)
        days.push({
          id: `giorno${number}`,
          number,
          date: `2026-10-${String(number + 4).padStart(2, "0")}`,
          label: `Giorno ${number} · ${weekdays[number - 1]} ${number + 4} ottobre`,
          photos,
        });
    }
    // Nessun asset pubblicato viene toccato finché tutte le conversioni riescono.
    await fs.mkdir(output, { recursive: true });
    for (const file of await fs.readdir(staging))
      await fs.rename(path.join(staging, file), path.join(output, file));
    const next = JSON.stringify({ version, days }, null, 2) + "\n";
    await fs.mkdir(path.dirname(config), { recursive: true });
    if (next !== JSON.stringify(previous, null, 2) + "\n") {
      await fs.writeFile(config + ".tmp", next);
      await fs.rename(config + ".tmp", config);
    }
    const active = new Set(
      days.flatMap((day) =>
        day.photos.flatMap((photo) =>
          photo.variants.map((v) => path.basename(v.src)),
        ),
      ),
    );
    for (const file of await fs.readdir(output)) {
      if (/^g[1-5]-.*\.webp$/.test(file) && !active.has(file))
        await fs.unlink(path.join(output, file));
    }
    return { days, converted, cached: false };
  } finally {
    await fs.rm(staging, { recursive: true, force: true });
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const result = await buildGallery();
  console.log(
    `Gallery: ${result.days.length} giorni, ${result.days.reduce((sum, day) => sum + day.photos.length, 0)} foto, ${result.converted} convertite${result.cached ? " (asset già generati)" : ""}.`,
  );
}
