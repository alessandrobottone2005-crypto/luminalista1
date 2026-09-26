"""Render the approved Blender hero animation as a PNG sequence.

Run from the repository root:
  /Applications/Blender.app/Contents/MacOS/Blender \
    -b LogoLumina_Animazione.blend \
    --python scripts/export-blender-header.py
"""

from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
FRAMES_DIR = ROOT / "assets" / "source" / "RenderHero"
FRAMES_DIR.mkdir(parents=True, exist_ok=True)

scene = bpy.context.scene
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100
scene.render.fps = 24

# Render the complete sequence as 0001.png … 0108.png.
# scripts/build-hero-frames.mjs turns these into the WebP frames served on the web.
scene.frame_set(scene.frame_start)
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.filepath = str(FRAMES_DIR / "####")
bpy.ops.render.render(animation=True)

print(f"Lumina hero frames exported to {FRAMES_DIR}")
