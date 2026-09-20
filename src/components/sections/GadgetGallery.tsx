import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrandAsset } from "@/components/brand/BrandAsset";

const collections = [
  { name: "LA LUCE SI ATTACCA.", kind: "STICKER PACK", number: "01 / 03" },
  { name: "INDOSSA UN’IDEA.", kind: "TOTE BAG", number: "02 / 03" },
  { name: "FACCIAMOCI VEDERE.", kind: "CAMPAIGN POSTER", number: "03 / 03" },
] as const;

function GadgetArtwork({ selected }: { selected: number }) {
  if (selected === 1) {
    return (
      <div className="tote">
        <div className="tote-handle" />
        <div className="tote-body">
          <BrandAsset alt="Concept tote bag Lumina Lista 1" />
          <small>PORTA CON TE UN’IDEA.</small>
        </div>
      </div>
    );
  }

  if (selected === 2) {
    return (
      <div className="campaign-poster">
        <span>LICEO GENTILESCHI · NAPOLI</span>
        <h3>
          OGNI
          <br />
          IDEA
          <br />
          MERITA
          <br />
          LUCE.
        </h3>
        <BrandAsset variant="wordmark" alt="Lumina" />
        <span>LISTA 01 / IL FUTURO SI ACCENDE</span>
      </div>
    );
  }

  return (
    <>
      <div className="merch-item sticker sticker-yellow">
        <span>
          FAI
          <br />
          LUCE.
        </span>
        <BrandAsset variant="mark" alt="" />
      </div>
      <div className="merch-item sticker sticker-black">
        <BrandAsset variant="wordmark" alt="Lumina" />
        <span>LISTA 01 — GENTILESCHI</span>
      </div>
      <div className="merch-item round-sticker">
        <span>01</span>
        <small>LA TUA VOCE CONTA</small>
      </div>
      <div className="merch-item sticker sticker-small">
        OGNI IDEA
        <br />
        MERITA LUCE.
      </div>
    </>
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
        <span className="merch-concept">CONCEPT GRAFICO · NON IN VENDITA</span>
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
