import { useReducedMotion } from "motion/react";

export function GadgetGallery() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="irl"
      className="gadgets section-pad"
      aria-labelledby="gadgets-title"
    >
      <h2 id="gadgets-title">
        FAI LUCE. <span className="yellow">ANCHE FUORI.</span>
      </h2>
      <p className="section-copy">
        Sticker pensati per stare ovunque
        <br />
        tu stia cambiando le cose.
      </p>

      <div
        className="tape-wall"
        aria-label="3 sticker Lumina Lista 01"
        data-reduced={reduceMotion ? "true" : undefined}
      >
        <div className="sticker-pin sticker-pin-candidates">
          <img
            src="/images/gadgets/sticker-candidates.webp"
            alt="Sticker con i nomi dei quattro candidati Lumina"
            loading="lazy"
            width={322}
            height={452}
          />
        </div>

        <div className="sticker-pin sticker-pin-lumina">
          <img
            src="/images/gadgets/sticker-lumina.webp"
            alt="Sticker Lumina Lista 01"
            loading="lazy"
            width={392}
            height={412}
          />
        </div>

        <div className="sticker-pin sticker-pin-voce">
          <img
            src="/images/gadgets/sticker-voce.webp"
            alt="Sticker La tua voce fa luce"
            loading="lazy"
            width={520}
            height={308}
          />
        </div>
      </div>
    </section>
  );
}
