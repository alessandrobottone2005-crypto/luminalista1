import { HeroAnimation } from "@/components/brand/HeroAnimation";

export function HeroSection() {
  return (
    <section id="inizio" className="hero">
      <div className="hero-art">
        <HeroAnimation />
        <span className="hero-art-caption" aria-hidden="true">
          ANIMAZIONE ORIGINALE · BLENDER
        </span>
      </div>
      <div className="hero-bottom hero-enter">
        <p>
          Il futuro della nostra scuola
          <br />
          inizia da un'idea. <strong>La tua.</strong>
        </p>
      </div>
    </section>
  );
}
