import { existsSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frames = path.join(root, ".artifacts", "lumina-header-frames");
const output = path.join(root, "public", "media", "lumina-header.mp4");
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

rmSync(frames, { force: true, recursive: true });

const render = spawnSync(
  blender,
  [
    "-b",
    source,
    "--python",
    path.join(root, "scripts", "export-blender-header.py"),
  ],
  { cwd: root, stdio: "inherit" },
);

if (render.status !== 0) process.exit(render.status ?? 1);
if (!ffmpegPath) throw new Error("Encoder FFmpeg non disponibile.");

const encode = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-framerate",
    "24",
    "-start_number",
    "1",
    "-i",
    path.join(frames, "frame-%04d.png"),
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "20",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    output,
  ],
  { cwd: root, stdio: "inherit" },
);

if (encode.status !== 0) process.exit(encode.status ?? 1);

rmSync(frames, { force: true, recursive: true });
console.log(`Animazione header pronta: ${output}`);
