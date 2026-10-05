import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  CASCADE_SPACING,
  nearestPhoto,
  releasePhoto,
  wrapPhoto,
} from "./galleryCarousel";

type Drag = {
  id: number;
  x: number;
  y: number;
  start: number;
  moved: boolean;
  samples: { x: number; time: number }[];
};

export function useGalleryCarousel(count: number) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = Boolean(useReducedMotion());
  const target = useMotionValue(0);
  const slide = useSpring(target, { stiffness: 180, damping: 25, mass: 1 });
  const tilt = useSpring(slide, { stiffness: 190, damping: 21, mass: 1 });
  const [active, setActive] = useState(0);
  const [center, setCenter] = useState(0);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [foreground, setForeground] = useState(!document.hidden);
  const [dragging, setDragging] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);
  const drag = useRef<Drag | null>(null);
  const blocked = useRef(false);
  const unblock = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pause = useCallback(() => setPaused(true), []);

  const go = useCallback(
    (position: number, instant = false) => {
      target.set(position);
      if (instant || reduced) {
        slide.jump(position);
        tilt.jump(position);
      }
      setActive(wrapPhoto(position, count));
    },
    [count, reduced, slide, target, tilt],
  );

  useMotionValueEvent(slide, "change", (position) => {
    setCenter((current) =>
      Math.round(position) === current ? current : Math.round(position),
    );
    if (drag.current?.moved) setActive(wrapPhoto(position, count));
    if (reduced) tilt.jump(position);
  });

  useEffect(() => {
    if (reduced) {
      setPaused(true);
      slide.jump(target.get());
      tilt.jump(target.get());
    }
  }, [reduced, slide, target, tilt]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(element);
    const onVisibility = () => setForeground(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing =
    !paused &&
    !hovered &&
    visible &&
    foreground &&
    !dragging &&
    opened === null &&
    count > 1;
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => go(Math.round(target.get()) + 1), 3000);
    return () => clearTimeout(timer);
  }, [playing, active, go, target]);

  const step = useCallback(
    (direction: number) => {
      pause();
      go(Math.round(target.get()) + direction);
    },
    [go, pause, target],
  );

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let accumulated = 0,
      last = 0,
      lastStep = -Infinity;
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      pause();
      const now = performance.now();
      if (now - last > 160) accumulated = 0;
      last = now;
      accumulated +=
        event.deltaX *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element.clientWidth
            : 1);
      if (Math.abs(accumulated) >= 50 && now - lastStep > 320) {
        step(Math.sign(accumulated));
        accumulated = 0;
        lastStep = now;
      }
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [pause, step]);

  useEffect(
    () => () => {
      if (unblock.current) clearTimeout(unblock.current);
    },
    [],
  );

  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      (event.target as Element).closest("[data-carousel-controls]")
    )
      return;
    pause();
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      start: slide.get(),
      moved: false,
      samples: [{ x: event.clientX, time: event.timeStamp }],
    };
  };
  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.moved) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        drag.current = null;
        return;
      }
      if (Math.abs(dx) < 6) return;
      current.moved = true;
      setDragging(true);
      root.current?.setPointerCapture(event.pointerId);
    }
    const width = (stage.current?.offsetWidth || 300) * CASCADE_SPACING;
    const position = current.start - dx / width;
    target.set(position);
    slide.jump(position);
    if (reduced) tilt.jump(position);
    current.samples.push({ x: event.clientX, time: event.timeStamp });
    current.samples = current.samples.filter(
      (sample) => event.timeStamp - sample.time <= 100,
    );
  };
  const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    drag.current = null;
    if (root.current?.hasPointerCapture(event.pointerId))
      root.current.releasePointerCapture(event.pointerId);
    if (!current.moved) return;
    setDragging(false);
    blocked.current = true;
    if (unblock.current) clearTimeout(unblock.current);
    unblock.current = setTimeout(() => {
      blocked.current = false;
    }, 0);
    const first = current.samples[0];
    const last = current.samples[current.samples.length - 1];
    const width = (stage.current?.offsetWidth || 300) * CASCADE_SPACING;
    const velocity =
      event.type === "pointercancel" || event.timeStamp - last.time > 120
        ? 0
        : ((-(last.x - first.x) / Math.max(1, last.time - first.time)) * 1000) /
          width;
    go(releasePhoto(slide.get(), velocity));
  };
  const select = (position: number) => {
    if (blocked.current) return;
    pause();
    const index = wrapPhoto(position, count);
    if (index === active) setOpened(index);
    else go(position);
  };
  const close = useCallback(
    (index: number) => {
      go(nearestPhoto(index, target.get(), count), true);
      setOpened(null);
      requestAnimationFrame(() =>
        root.current
          ?.querySelector<HTMLButtonElement>("[data-active='true']")
          ?.focus({ preventScroll: true }),
      );
    },
    [count, go, target],
  );
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    pause();
    if ((event.target as Element).closest(".cascade-photo"))
      root.current?.focus({ preventScroll: true });
    if (event.key === "Home" || event.key === "End")
      go(
        nearestPhoto(event.key === "Home" ? 0 : count - 1, target.get(), count),
      );
    else step(event.key === "ArrowRight" ? 1 : -1);
  };

  return {
    root,
    stage,
    slide,
    tilt,
    active,
    center,
    paused,
    playing,
    dragging,
    opened,
    step,
    select,
    close,
    pause,
    keyDown,
    pointerDown,
    pointerMove,
    pointerUp,
    setHovered,
    toggle: () => setPaused((value) => !value),
  };
}
