import { useRef, type CSSProperties, type MouseEvent } from "react";
import { STICKER_WALL } from "@/config/stickerWall";
import { stickerSection } from "@/content/site";
import { useStickerDrag } from "@/motion/useStickerDrag";

// Riavvia l'impulso a ogni tap, anche se il precedente non è finito.
function pulse(event: MouseEvent<HTMLButtonElement>) {
  const sticker = event.currentTarget;
  sticker.removeAttribute("data-pulse");
  void sticker.offsetWidth;
  sticker.setAttribute("data-pulse", "");
}

export function GadgetGallery() {
  const { canvas, background, stickers } = STICKER_WALL;
  const sectionRef = useRef<HTMLElement>(null);
  const { handlers, consumeDrag } = useStickerDrag(sectionRef);

  return (
    <section
      ref={sectionRef}
      id={stickerSection.id}
      className="gadgets section-pad"
      aria-labelledby="gadgets-title"
    >
      <picture className="gadgets-backdrop" aria-hidden="true">
        <source media="(min-width: 900px)" srcSet={background.landscape} />
        <img src={background.portrait} alt="" loading="lazy" />
      </picture>

      <h2 id="gadgets-title">
        {stickerSection.title}{" "}
        <span className="yellow">{stickerSection.titleAccent}</span>
      </h2>
      <p className="section-copy">
        {stickerSection.copy[0]}
        <br />
        {stickerSection.copy[1]}
      </p>

      <p id="sticker-drag-hint" className="sr-only">
        {stickerSection.dragHint}
      </p>

      <div
        className="sticker-wall"
        role="group"
        aria-label="Gli sticker di Lumina Lista 1"
        style={
          {
            "--wall-ratio": `${canvas.width} / ${canvas.height}`,
          } as CSSProperties
        }
      >
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            type="button"
            className={`sticker sticker-${sticker.id}`}
            aria-label={stickerSection.stickers[sticker.id]}
            aria-roledescription="sticker trascinabile"
            aria-describedby="sticker-drag-hint"
            {...handlers}
            onClick={(event) => {
              if (!consumeDrag()) pulse(event);
            }}
            onAnimationEnd={(event) => {
              event.currentTarget.removeAttribute("data-pulse");
              event.currentTarget.removeAttribute("data-drop");
            }}
            style={
              {
                "--sticker-left": `${sticker.left}%`,
                "--sticker-top": `${sticker.top}%`,
                "--sticker-size": `${sticker.size}%`,
              } as CSSProperties
            }
          >
            <span className="sticker-body">
              <img
                src={sticker.src}
                alt=""
                width={sticker.width}
                height={sticker.height}
                loading="lazy"
                draggable={false}
              />
            </span>
          </button>
        ))}
      </div>

      <img
        src="/Stella.svg"
        alt=""
        aria-hidden="true"
        className="small-spark gadgets-spark"
      />
    </section>
  );
}
