import { useEffect, useRef } from "react";
import { HERO_FRAMES } from "@/config/heroFrames";

const LOAD_CONCURRENCY = 6;
const SIDE_GUTTER = 20;
// Space kept free under the logo for the scroll cue.
const BOTTOM_RESERVE = 96;

type Frame = ImageBitmap | HTMLImageElement;

async function loadFrame(url: string, signal: AbortSignal): Promise<Frame> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Frame non disponibile: ${url}`);
  const blob = await response.blob();
  if ("createImageBitmap" in window) return createImageBitmap(blob);
  const image = new Image();
  image.src = URL.createObjectURL(blob);
  await image.decode();
  return image;
}

function pickWidth() {
  const needed = window.innerWidth * Math.min(window.devicePixelRatio, 2);
  return needed > 1100 ? HERO_FRAMES.widths[0] : HERO_FRAMES.widths[1];
}

function headerHeight() {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-h",
  );
  return Number.parseFloat(value) || 0;
}

/**
 * Plays the Blender render as an image sequence on a canvas.
 * The frame covers the viewport unless that would crop the logo; in that case
 * it shrinks until the logo fits and the render's black blends into the page.
 */
export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const controller = new AbortController();
    const width = pickWidth();
    const frames: (Frame | undefined)[] = new Array(HERO_FRAMES.count);
    let current = 0;
    let ready = false;
    let visible = true;
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const frameDuration = 1000 / HERO_FRAMES.fps;

    const draw = () => {
      const frame = frames[current] ?? frames[0];
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      context.fillStyle = "#000";
      context.fillRect(0, 0, canvas.width, canvas.height);
      if (!frame || !cssWidth || !cssHeight) return;

      const { source, logo } = HERO_FRAMES;
      const top = headerHeight();
      const safeWidth = cssWidth - SIDE_GUTTER * 2;
      const safeHeight = cssHeight - top - BOTTOM_RESERVE;
      const scale = Math.min(
        Math.max(cssWidth / source.width, cssHeight / source.height),
        safeWidth / logo.width,
        safeHeight / logo.height,
      );
      const logoCenterX = (logo.x + logo.width / 2) * scale;
      const logoCenterY = (logo.y + logo.height / 2) * scale;
      const x = cssWidth / 2 - logoCenterX;
      const y = top + safeHeight / 2 - logoCenterY;
      const ratio = canvas.width / cssWidth;

      context.drawImage(
        frame,
        x * ratio,
        y * ratio,
        source.width * scale * ratio,
        source.height * scale * ratio,
      );
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      draw();
    };

    const tick = (time: number) => {
      raf = requestAnimationFrame(tick);
      if (!last) last = time;
      elapsed += time - last;
      last = time;
      if (elapsed < frameDuration) return;
      current =
        (current + Math.floor(elapsed / frameDuration)) % HERO_FRAMES.count;
      elapsed %= frameDuration;
      draw();
    };

    const update = () => {
      const shouldPlay = ready && visible && !document.hidden;
      if (shouldPlay && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!shouldPlay && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const load = async () => {
      frames[0] = await loadFrame(
        HERO_FRAMES.path(width, 0),
        controller.signal,
      );
      draw();
      let next = 1;
      const worker = async () => {
        while (next < HERO_FRAMES.count) {
          const index = next++;
          frames[index] = await loadFrame(
            HERO_FRAMES.path(width, index),
            controller.signal,
          );
        }
      };
      await Promise.all(Array.from({ length: LOAD_CONCURRENCY }, worker));
      ready = true;
      update();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", update);

    load().catch((error: unknown) => {
      if (!controller.signal.aborted) console.error(error);
    });

    return () => {
      controller.abort();
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", update);
      for (const frame of frames) {
        if (frame instanceof ImageBitmap) frame.close();
        else if (frame) URL.revokeObjectURL(frame.src);
      }
    };
  }, []);

  return (
    <div className="header-animation">
      <canvas
        ref={canvasRef}
        className="header-animation-media"
        aria-hidden="true"
      />
    </div>
  );
}
