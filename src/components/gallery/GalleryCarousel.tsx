import { motion, useTransform, type MotionValue } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { galleryCopy } from "@/content/gallery";
import { useGalleryCarousel } from "@/motion/useGalleryCarousel";
import {
  CASCADE_SPACING,
  photoWindow,
  wrapPhoto,
} from "@/motion/galleryCarousel";
import { GalleryLightbox } from "./GalleryLightbox";
import { photoSrcSet, type GalleryPhoto } from "./types";

function CarouselPhoto({
  photo,
  position,
  index,
  total,
  active,
  slide,
  tilt,
  select,
}: {
  photo: GalleryPhoto;
  position: number;
  index: number;
  total: number;
  active: boolean;
  slide: MotionValue<number>;
  tilt: MotionValue<number>;
  select: (position: number) => void;
}) {
  const transform = useTransform(() => {
    const dx = position - slide.get();
    const distance = position - tilt.get();
    const scale = 1 - 0.45 * Math.min(Math.abs(distance), 1);
    return `translate3d(${dx * CASCADE_SPACING * 100}%, ${distance * 40}%, 0) scale(${scale}) rotate(${distance * 20}deg)`;
  });
  const zIndex = useTransform(
    () => 100 - Math.round(Math.abs(position - tilt.get()) * 10),
  );
  return (
    <motion.button
      type="button"
      className="cascade-photo"
      data-active={active}
      style={{ transform, zIndex }}
      tabIndex={active ? 0 : -1}
      aria-label={`${galleryCopy.openPhoto} ${index + 1} ${galleryCopy.of} ${total}`}
      aria-current={active ? "true" : undefined}
      onClick={() => select(position)}
    >
      <img
        src={photo.variants[0].src}
        srcSet={photoSrcSet(photo)}
        sizes="(min-width: 900px) 640px, 82vw"
        width={photo.width}
        height={photo.height}
        alt=""
        draggable={false}
        decoding="async"
      />
    </motion.button>
  );
}

export function GalleryCarousel({ photos }: { photos: GalleryPhoto[] }) {
  const carousel = useGalleryCarousel(photos.length);
  return (
    <>
      <div
        ref={carousel.root}
        className="cascade"
        role="region"
        aria-roledescription="carosello"
        aria-label={galleryCopy.title}
        data-dragging={carousel.dragging || undefined}
        tabIndex={0}
        onKeyDown={carousel.keyDown}
        onFocusCapture={(event) => {
          if (event.target.matches(":focus-visible")) carousel.pause();
        }}
        onPointerDown={carousel.pointerDown}
        onPointerMove={carousel.pointerMove}
        onPointerUp={carousel.pointerUp}
        onPointerCancel={carousel.pointerUp}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") carousel.setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") carousel.setHovered(false);
        }}
      >
        <div className="cascade-stage" ref={carousel.stage}>
          {photoWindow(carousel.center, photos.length).map((position) => {
            const index = wrapPhoto(position, photos.length);
            return (
              <CarouselPhoto
                key={position}
                photo={photos[index]}
                position={position}
                index={index}
                total={photos.length}
                active={index === carousel.active}
                slide={carousel.slide}
                tilt={carousel.tilt}
                select={carousel.select}
              />
            );
          })}
        </div>
        <div className="cascade-controls" data-carousel-controls="">
          <div className="cascade-navigation">
            <button
              type="button"
              onClick={() => carousel.step(-1)}
              disabled={photos.length < 2}
              aria-label={galleryCopy.previous}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <span
              className="cascade-count"
              aria-live={carousel.paused ? "polite" : "off"}
              aria-atomic="true"
            >
              {String(carousel.active + 1).padStart(2, "0")} <span>/</span>{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => carousel.step(1)}
              disabled={photos.length < 2}
              aria-label={galleryCopy.next}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          {photos.length > 1 ? (
            <button
              className="cascade-playback"
              type="button"
              onClick={carousel.toggle}
              aria-label={
                carousel.paused ? galleryCopy.resume : galleryCopy.pause
              }
            >
              {carousel.paused ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
              {carousel.paused ? galleryCopy.resume : galleryCopy.pause}
            </button>
          ) : null}
          <p className="cascade-hint">{galleryCopy.hint}</p>
        </div>
      </div>
      {carousel.opened !== null ? (
        <GalleryLightbox
          photos={photos}
          initialIndex={carousel.opened}
          onClose={carousel.close}
        />
      ) : null}
    </>
  );
}
