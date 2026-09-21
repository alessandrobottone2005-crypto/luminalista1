import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const collections = [
  { name: "FAI LUCE.", kind: "STICKER PACK", number: "01 / 02" },
  { name: "INDOSSA UN'IDEA.", kind: "SPILLETTE", number: "02 / 02" },
] as const;

function GadgetArtwork({ selected }: { selected: number }) {
  if (selected === 1) {
    return (
      <div className="pins-display">
        <div className="pin pin-1">
          <div className="pin-shape">
            <span className="pin-number">01</span>
          </div>
          <span className="pin-label">LUMINA</span>
        </div>
        <div className="pin pin-2">
          <div className="pin-shape">
            <span className="pin-text">FAI LUCE.</span>
          </div>
          <span className="pin-label">LISTA 01</span>
        </div>
        <div className="pin pin-3">
          <div className="pin-shape">
            <span className="pin-text">GENTILESCHI</span>
          </div>
          <span className="pin-label">NAPOLI</span>
        </div>
      </div>
    );
  }

  return (
    <div className="stickers-display">
      <div className="sticker-preview sticker-a">
        <span className="sticker-big-text">FAI LUCE.</span>
        <div className="sticker-mark" />
      </div>
      <div className="sticker-preview sticker-b">
        <span className="sticker-logo">LUMINA</span>
        <span className="sticker-sub">LISTA 01</span>
      </div>
      <div className="sticker-preview sticker-c">
        <span className="sticker-number">01</span>
        <span className="sticker-slogan">LA TUA VOCE CONTA</span>
      </div>
      <div className="sticker-preview sticker-d">
        <span className="sticker-quote">OGNI IDEA MERITA LUCE.</span>
      </div>
    </div>
  );
}

export function GadgetGallery() {
  const [selected, setSelected] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = collections[selected];

  const selectRelative = (delta: number) =>
    setSelected(
      (value) => (value + delta + collections.length) % collections.length,
    );

  return (
    <section
      id="irl"
      className="gadgets section-pad"
      aria-labelledby="gadgets-title"
    >
      <div className="section-top">
        <span>FUORI DALLO SCHERMO</span>
        <span>EDIZIONE 01</span>
      </div>
      <h2 id="gadgets-title">
        LUMINA <span className="yellow">IRL.</span>
      </h2>
      <p className="section-copy">
        Le idee escono dai corridoi.
        <br />E vengono con te.
      </p>
      <div className={`merch-stage merch-view-${selected}`}>
        <motion.div
          className="merch-scene"
          key={selected}
          initial={reduceMotion ? false : { opacity: 0.3, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
        >
          <GadgetArtwork selected={selected} />
        </motion.div>
        <span className="merch-concept">CONCEPT · IN ARRIVO</span>
      </div>
      <div className="merch-controls">
        <div>
          <span>{current.kind}</span>
          <h3>{current.name}</h3>
        </div>
        <div className="merch-arrows">
          <button
            aria-label="Gadget precedente"
            onClick={() => selectRelative(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            aria-label="Gadget successivo"
            onClick={() => selectRelative(1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        className="merch-pagination"
        role="group"
        aria-label="Seleziona un gadget"
      >
        {collections.map((item, index) => (
          <button
            key={item.kind}
            aria-label={item.kind}
            aria-pressed={selected === index}
            className={selected === index ? "is-active" : ""}
            onClick={() => setSelected(index)}
          >
            <span />
          </button>
        ))}
        <span aria-live="polite">{current.number}</span>
      </div>
    </section>
  );
}
