// Generato da scripts/build-hero-frames.mjs — non modificare a mano.
export const HERO_FRAMES = {
  count: 108,
  fps: 24,
  widths: [1920, 960],
  path: (width: number, frame: number) =>
    `/media/hero/${width}/${String(frame + 1).padStart(4, "0")}.webp`,
  source: { width: 1920, height: 1080 },
  // Riquadro dei pixel illuminati in tutti i frame, in pixel del render.
  logo: { x: 406, y: 34, width: 1051, height: 899 },
} as const;
