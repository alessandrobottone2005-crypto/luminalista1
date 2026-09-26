import { ArrowDown } from "lucide-react";
import { HeroAnimation } from "@/components/brand/HeroAnimation";
import { hero } from "@/content/site";

export function HeroSection() {
  return (
    <section id="inizio" className="hero" aria-label="Lumina — Lista 1">
      <div className="hero-art">
        <HeroAnimation />
      </div>
      <a className="hero-scroll-cue" href={`#${hero.scrollTarget}`}>
        {hero.scrollCue}
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
