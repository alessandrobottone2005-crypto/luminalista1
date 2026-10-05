import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCopy } from "@/content/gallery";
import { wrapPhoto } from "@/motion/galleryCarousel";
import { fullPhoto, type GalleryPhoto } from "./types";

export function GalleryLightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: GalleryPhoto[];
  initialIndex: number;
  onClose: (index: number) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const [failed, setFailed] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const photo = photos[index];
  const move = (delta: number) =>
    setIndex((current) => wrapPhoto(current + delta, photos.length));

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scrollY = window.scrollY;
    const previousStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      width: "100%",
      overflow: "hidden",
    });
    element.showModal();
    closeButton.current?.focus();
    return () => {
      element.close();
      Object.assign(document.body.style, previousStyle);
      window.scrollTo(0, scrollY);
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const adjacent = [
      photos[wrapPhoto(index - 1, photos.length)],
      photos[wrapPhoto(index + 1, photos.length)],
    ].filter(Boolean);
    const images = adjacent.map((item) => {
      const image = new Image();
      image.src = fullPhoto(item);
      return image;
    });
    return () => {
      images.forEach((image) => {
        image.src = "";
      });
    };
  }, [photos, index]);

  return (
    <dialog
      ref={dialog}
      className="gallery-dialog"
      aria-labelledby="gallery-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose(index);
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const buttons =
            event.currentTarget.querySelectorAll<HTMLButtonElement>(
              "button:not(:disabled)",
            );
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="gallery-dialog-header">
        <div>
          <h2 id="gallery-dialog-title" className="sr-only">
            {galleryCopy.title}
          </h2>
          <p aria-live="polite" aria-atomic="true">
            {index + 1} / {photos.length}
          </p>
        </div>
        <button
          ref={closeButton}
          type="button"
          className="gallery-icon-button"
          onClick={() => onClose(index)}
          aria-label={galleryCopy.close}
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <div
        className="gallery-viewer"
        onTouchStart={(event) => {
          const point = event.touches[0];
          touch.current =
            event.touches.length === 1
              ? { x: point.clientX, y: point.clientY }
              : null;
        }}
        onTouchEnd={(event) => {
          if (!touch.current) return;
          const point = event.changedTouches[0];
          const dx = point.clientX - touch.current.x;
          const dy = point.clientY - touch.current.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
            move(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
        onTouchCancel={() => {
          touch.current = null;
        }}
      >
        {failed === photo.id ? (
          <p role="status">{galleryCopy.error}</p>
        ) : (
          <motion.img
            key={photo.id}
            src={fullPhoto(photo)}
            width={photo.width}
            height={photo.height}
            alt={`${galleryCopy.title}, ${galleryCopy.photo} ${index + 1} ${galleryCopy.of} ${photos.length}`}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            onError={() => setFailed(photo.id)}
            draggable={false}
          />
        )}
      </div>
      <div className="gallery-dialog-controls">
        <button
          type="button"
          className="gallery-control"
          onClick={() => move(-1)}
          disabled={photos.length < 2}
          aria-label={galleryCopy.previous}
        >
          <ChevronLeft aria-hidden="true" />
          <span>{galleryCopy.previous}</span>
        </button>
        <button
          type="button"
          className="gallery-control"
          onClick={() => move(1)}
          disabled={photos.length < 2}
          aria-label={galleryCopy.next}
        >
          <span>{galleryCopy.next}</span>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
