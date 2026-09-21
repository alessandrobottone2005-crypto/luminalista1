"""Render the approved Blender header animation for the web.

Run from the repository root:
  /Applications/Blender.app/Contents/MacOS/Blender \
    -b LogoLumina_Animazione.blend \
    --python scripts/export-blender-header.py
"""

from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "media"
FRAMES_DIR = ROOT / ".artifacts" / "lumina-header-frames"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
FRAMES_DIR.mkdir(parents=True, exist_ok=True)

scene = bpy.context.scene
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.resolution_percentage = 100
scene.render.fps = 24

if scene.render.engine == "CYCLES":
    scene.cycles.samples = 24
    scene.cycles.use_denoising = True

# Render a still frame for reduced-motion users and as the video poster.
scene.frame_set(54)
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.quality = 92
scene.render.filepath = str(OUTPUT_DIR / "lumina-header-poster.webp")
bpy.ops.render.render(write_still=True)

# Render the complete sequence. The Node wrapper encodes these frames to H.264.
scene.frame_set(scene.frame_start)
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.filepath = str(FRAMES_DIR / "frame-")
bpy.ops.render.render(animation=True)

print(f"Lumina header frames exported to {FRAMES_DIR}")
