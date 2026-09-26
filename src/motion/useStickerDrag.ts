import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
} from "react";

export type Offset = { x: number; y: number };
export type Box = { left: number; top: number; width: number; height: number };

// Col dito lo sticker si prende tenendolo premuto: un tocco rapido resta scroll.
const PRESS_DELAY = 300;
const TOUCH_SLOP = 10;
const MOUSE_SLOP = 4;
const KEY_STEP = 16;
const KEY_STEP_LARGE = 48;
const DESKTOP = "(min-width: 900px)";

const KEY_DIRECTIONS: Record<string, Offset> = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
};

/**
 * Limita lo spostamento in modo che il centro dello sticker resti dentro la
 * sezione: al massimo metà sticker esce dal bordo. `sticker` è il riquadro
 * nella posizione di partenza, senza spostamento.
 */
export function clampOffset(offset: Offset, sticker: Box, section: Box) {
  const centerX = sticker.left - section.left + sticker.width / 2;
  const centerY = sticker.top - section.top + sticker.height / 2;
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  return {
    x: clamp(offset.x, -centerX, section.width - centerX),
    y: clamp(offset.y, -centerY, section.height - centerY),
  };
}

type Gesture = {
  element: HTMLElement;
  pointerId: number;
  pointerType: string;
  startX: number;
  startY: number;
  origin: Offset;
  base: Box;
  section: Box;
  dragging: boolean;
  timer?: number;
};

// Riavvia un'animazione CSS legata a un attributo, anche se è ancora in corso.
function restart(element: HTMLElement, attribute: string) {
  element.removeAttribute(attribute);
  void element.offsetWidth;
  element.setAttribute(attribute, "");
}

export function useStickerDrag(section: RefObject<HTMLElement | null>) {
  // Spostamenti in frazioni della sezione, così sopravvivono al resize.
  const positions = useRef(new Map<HTMLElement, Offset>());
  const gesture = useRef<Gesture | null>(null);
  const layer = useRef(3);
  const justDragged = useRef(false);

  const sectionBox = (): Box => {
    const rect = section.current!.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const readOffset = (element: HTMLElement, box: Box): Offset => {
    const fraction = positions.current.get(element) ?? { x: 0, y: 0 };
    return { x: fraction.x * box.width, y: fraction.y * box.height };
  };

  const writeOffset = (element: HTMLElement, offset: Offset, box: Box) => {
    element.style.translate = `${offset.x}px ${offset.y}px`;
    positions.current.set(element, {
      x: offset.x / box.width,
      y: offset.y / box.height,
    });
  };

  const baseBox = (element: HTMLElement, offset: Offset): Box => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left - offset.x,
      top: rect.top - offset.y,
      width: rect.width,
      height: rect.height,
    };
  };

  const raise = (element: HTMLElement) => {
    layer.current += 1;
    element.style.zIndex = String(layer.current);
  };

  const lift = (current: Gesture) => {
    current.dragging = true;
    current.element.removeAttribute("data-drop");
    current.element.setAttribute("data-dragging", "");
    raise(current.element);
    if (current.pointerType === "touch") navigator.vibrate?.(10);
  };

  const release = (current: Gesture) => {
    window.clearTimeout(current.timer);
    gesture.current = null;
    if (!current.dragging) return;

    current.element.removeAttribute("data-dragging");
    restart(current.element, "data-drop");
    justDragged.current = true;
  };

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    // Una volta preso lo sticker, il dito lo sposta invece di scorrere.
    const blockScroll = (event: TouchEvent) => {
      if (gesture.current?.dragging) event.preventDefault();
    };
    root.addEventListener("touchmove", blockScroll, { passive: false });

    const desktop = window.matchMedia(DESKTOP);
    let wasDesktop = desktop.matches;
    const observer = new ResizeObserver(() => {
      const box = sectionBox();
      const layoutChanged = desktop.matches !== wasDesktop;
      wasDesktop = desktop.matches;

      positions.current.forEach((fraction, element) => {
        if (layoutChanged) {
          element.style.translate = "";
          return;
        }
        element.style.translate = `${fraction.x * box.width}px ${fraction.y * box.height}px`;
      });
      if (layoutChanged) positions.current.clear();
    });
    observer.observe(root);

    return () => {
      window.clearTimeout(gesture.current?.timer);
      root.removeEventListener("touchmove", blockScroll);
      observer.disconnect();
    };
  }, [section]);

  const handlers = {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (gesture.current) release(gesture.current);

      justDragged.current = false;
      const element = event.currentTarget;
      const box = sectionBox();
      const origin = readOffset(element, box);
      const current: Gesture = {
        element,
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        startX: event.clientX,
        startY: event.clientY,
        origin,
        base: baseBox(element, origin),
        section: box,
        dragging: false,
      };

      element.setPointerCapture(event.pointerId);
      if (event.pointerType === "touch") {
        current.timer = window.setTimeout(() => lift(current), PRESS_DELAY);
      }
      gesture.current = current;
    },

    onPointerMove(event: PointerEvent<HTMLElement>) {
      const current = gesture.current;
      if (!current || current.pointerId !== event.pointerId) return;

      const dx = event.clientX - current.startX;
      const dy = event.clientY - current.startY;

      if (!current.dragging) {
        const distance = Math.hypot(dx, dy);
        if (current.pointerType === "touch") {
          // Il dito si è mosso prima della presa: è uno scroll.
          if (distance > TOUCH_SLOP) release(current);
          return;
        }
        if (distance <= MOUSE_SLOP) return;
        lift(current);
      }

      const next = clampOffset(
        { x: current.origin.x + dx, y: current.origin.y + dy },
        current.base,
        current.section,
      );
      writeOffset(current.element, next, current.section);
    },

    onPointerUp(event: PointerEvent<HTMLElement>) {
      const current = gesture.current;
      if (current?.pointerId === event.pointerId) release(current);
    },

    onPointerCancel(event: PointerEvent<HTMLElement>) {
      const current = gesture.current;
      if (current?.pointerId === event.pointerId) release(current);
    },

    onKeyDown(event: KeyboardEvent<HTMLElement>) {
      const direction = KEY_DIRECTIONS[event.key];
      if (!direction) return;
      event.preventDefault();

      const element = event.currentTarget;
      const box = sectionBox();
      const offset = readOffset(element, box);
      const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
      const next = clampOffset(
        { x: offset.x + direction.x * step, y: offset.y + direction.y * step },
        baseBox(element, offset),
        box,
      );
      raise(element);
      writeOffset(element, next, box);
    },

    onContextMenu(event: MouseEvent<HTMLElement>) {
      event.preventDefault();
    },
  };

  // Il clic che chiude un trascinamento non deve accendere l'impulso.
  const consumeDrag = () => {
    const dragged = justDragged.current;
    justDragged.current = false;
    return dragged;
  };

  return { handlers, consumeDrag };
}
