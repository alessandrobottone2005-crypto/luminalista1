import { afterEach, describe, expect, it } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";
import { buildGallery } from "./build-gallery-assets.mjs";

const roots = [];
async function fixture() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "lumina-gallery-"));
  roots.push(root);
  return root;
}
async function photo(root, folder, name, options = {}) {
  const directory = path.join(root, "assets/source/gallery", folder);
  await fs.mkdir(directory, { recursive: true });
  await sharp({
    create: {
      width: 80,
      height: 60,
      channels: 3,
      background: "#ffcf02",
      ...options,
    },
  })
    .jpeg()
    .toFile(path.join(directory, name));
}
const manifest = (root) =>
  fs.readFile(path.join(root, "src/config/gallery.json"), "utf8");
afterEach(async () => {
  await Promise.all(
    roots
      .splice(0)
      .map((root) => fs.rm(root, { recursive: true, force: true })),
  );
});

describe("gallery generation", () => {
  it("orders days and numbered files naturally, skips hidden files and empty days, and does not upscale", async () => {
    const root = await fixture();
    await photo(root, "giorno2-martedi6ottobre", "photo.jpg");
    for (const file of ["photo 10.jpg", "photo 2.jpg", "photo.jpg"])
      await photo(root, "giorno1-lunedi5ottobre", file);
    await fs.writeFile(
      path.join(
        root,
        "assets/source/gallery/giorno1-lunedi5ottobre/._photo.jpg",
      ),
      "metadata",
    );
    await fs.mkdir(
      path.join(root, "assets/source/gallery/giorno3-mercoledi7ottobre"),
    );
    const result = await buildGallery(root);
    expect(result.days.map((day) => day.number)).toEqual([1, 2]);
    expect(
      result.days[0].photos.map((item) => path.basename(item.source)),
    ).toEqual(["photo.jpg", "photo 2.jpg", "photo 10.jpg"]);
    expect(result.days[1].date).toBe("2026-10-06");
    expect(result.days[0].photos[0].variants.map((item) => item.width)).toEqual(
      [80],
    );
    expect(result.converted).toBe(4);
    expect((await buildGallery(root)).converted).toBe(0);
  });

  it("preserves published output when a later image is unreadable", async () => {
    const root = await fixture();
    await photo(root, "giorno1-lunedi5ottobre", "a.jpg");
    await buildGallery(root);
    const before = await manifest(root);
    const output = path.join(root, "public/media/gallery");
    const files = await fs.readdir(output);
    await photo(root, "giorno1-lunedi5ottobre", "b.jpg");
    await fs.writeFile(
      path.join(root, "assets/source/gallery/giorno1-lunedi5ottobre/z.jpg"),
      "not a photo",
    );
    await expect(buildGallery(root)).rejects.toThrow("immagine illeggibile");
    expect(await manifest(root)).toBe(before);
    expect(await fs.readdir(output)).toEqual(files);
  });

  it("validates generated assets without originals and rejects missing output", async () => {
    const root = await fixture();
    await photo(root, "giorno1-lunedi5ottobre", "a.jpg");
    const generated = await buildGallery(root);
    await fs.rm(path.join(root, "assets"), { recursive: true });
    expect((await buildGallery(root)).cached).toBe(true);
    await fs.unlink(
      path.join(root, "public", generated.days[0].photos[0].variants[0].src),
    );
    await expect(buildGallery(root)).rejects.toThrow();
  });

  it("rejects duplicate days and unknown folder names", async () => {
    const root = await fixture();
    await photo(root, "giorno1-lunedi5ottobre", "a.jpg");
    await photo(root, "giorno1-duplicato", "b.jpg");
    await expect(buildGallery(root)).rejects.toThrow("duplicato");
    await fs.rm(path.join(root, "assets/source/gallery/giorno1-duplicato"), {
      recursive: true,
    });
    await fs.mkdir(path.join(root, "assets/source/gallery/giorno6-sabato"));
    await expect(buildGallery(root)).rejects.toThrow(
      "cartella non riconosciuta",
    );
  });

  it("regenerates only changed photos, preserves IDs and removes stale variants", async () => {
    const root = await fixture();
    await photo(root, "giorno1-lunedi5ottobre", "a.jpg");
    const before = await buildGallery(root);
    await photo(root, "giorno1-lunedi5ottobre", "a.jpg", {
      background: "#080808",
    });
    const after = await buildGallery(root);
    expect(after.converted).toBe(1);
    expect(after.days[0].photos[0].id).toBe(before.days[0].photos[0].id);
    expect(after.days[0].photos[0].variants[0].src).not.toBe(
      before.days[0].photos[0].variants[0].src,
    );
    expect(
      (await fs.readdir(path.join(root, "public/media/gallery"))).length,
    ).toBe(1);
  });
});
