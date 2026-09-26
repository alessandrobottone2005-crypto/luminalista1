import { useEffect, useRef } from "react";
import { HERO_FRAMES } from "@/config/heroFrames";

const LOAD_CONCURRENCY = 6;
const SIDE_GUTTER = 20;
// Respiro sotto il logo, uguale a quello sopra: il logo resta centrato.
const BOTTOM_RESERVE = 48;
// Respiro sopra il logo, ora che non c’è più l’header.
const TOP_RESERVE = 48;

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

// I frame a 1920 px servono solo agli schermi davvero larghi: un tablet
// 768 px a 2x (1536) resta sul set da 960 px.
// Il set 1920 pesa circa 900 MB decodificato: solo per schermi da desktop.
function pickWidth() {
  const needed = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  return window.innerWidth >= 1200 && needed > 1100
    ? HERO_FRAMES.widths[0]
    : HERO_FRAMES.widths[1];
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
      const safeWidth = cssWidth - SIDE_GUTTER * 2;
      const safeHeight = cssHeight - TOP_RESERVE - BOTTOM_RESERVE;
      const scale = Math.min(
        Math.max(cssWidth / source.width, cssHeight / source.height),
        safeWidth / logo.width,
        safeHeight / logo.height,
      );
      const logoCenterX = (logo.x + logo.width / 2) * scale;
      const logoCenterY = (logo.y + logo.height / 2) * scale;
      const x = cssWidth / 2 - logoCenterX;
      const y = TOP_RESERVE + safeHeight / 2 - logoCenterY;
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

    // Avanza al prossimo frame disponibile: quelli non scaricati si saltano.
    const advance = (steps: number) => {
      for (let tries = 0; tries < HERO_FRAMES.count; tries += 1) {
        current = (current + steps) % HERO_FRAMES.count;
        if (frames[current]) return;
        steps = 1;
      }
    };

    const tick = (time: number) => {
      raf = requestAnimationFrame(tick);
      if (!last) last = time;
      elapsed += time - last;
      last = time;
      if (elapsed < frameDuration) return;
      advance(Math.floor(elapsed / frameDuration));
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

    // Un frame mancante non blocca il loop: si parte con quelli arrivati.
    const loadAt = async (index: number) => {
      try {
        frames[index] = await loadFrame(
          HERO_FRAMES.path(width, index),
          controller.signal,
        );
      } catch (error) {
        if (!controller.signal.aborted) console.warn(error);
      }
    };

    const load = async () => {
      await loadAt(0);
      if (controller.signal.aborted) return;
      draw();
      let next = 1;
      const worker = async () => {
        while (next < HERO_FRAMES.count && !controller.signal.aborted) {
          await loadAt(next++);
        }
      };
      await Promise.all(Array.from({ length: LOAD_CONCURRENCY }, worker));
      if (controller.signal.aborted) return;
      const loaded = frames.filter(Boolean).length;
      if (!frames[current]) advance(1);
      ready = loaded > 1;
      if (loaded) draw();
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

    void load();

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
        role="img"
        aria-label="Lumina — Lista 1"
      />
    </div>
  );
}
