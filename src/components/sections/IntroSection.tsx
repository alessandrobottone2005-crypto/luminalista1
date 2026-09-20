import { LightReveal } from "@/components/motion/LightReveal";

export function IntroSection() {
  return (
    <section id="intro" className="intro section-pad">
      <div className="intro-line" />
      <LightReveal>
        <h2>
          LA LUCE
          <br />
          RENDE
          <br />
          VISIBILI
          <br />
          <span className="yellow">LE IDEE.</span>
        </h2>
      </LightReveal>
      <div className="intro-copy">
        <span className="small-spark" aria-hidden="true" />
        <p>
          Ci sono idee che aspettano solo di essere viste. Voci che meritano
          spazio. Una scuola che possiamo immaginare, insieme.
        </p>
        <p>
          Per questo nasce <strong>Lumina.</strong>
          <br />
          Per accendere quello che siamo.
        </p>
      </div>
    </section>
  );
}
