import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "LogoLumina_Animazione.blend");
const blenderCandidates = [
  process.env.BLENDER_BIN,
  "/Applications/Blender.app/Contents/MacOS/Blender",
  "blender",
].filter(Boolean);
const blender = blenderCandidates.find(
  (candidate) => candidate === "blender" || existsSync(candidate),
);

if (!blender) {
  throw new Error("Blender non trovato. Imposta BLENDER_BIN e riprova.");
}

const render = spawnSync(
  blender,
  [
    "-b",
    source,
    "--python",
    path.join(root, "scripts", "export-blender-hero.py"),
  ],
  { cwd: root, stdio: "inherit" },
);

if (render.status !== 0) process.exit(render.status ?? 1);

const build = spawnSync(
  process.execPath,
  [path.join(root, "scripts", "build-hero-frames.mjs")],
  { cwd: root, stdio: "inherit" },
);

process.exit(build.status ?? 1);
