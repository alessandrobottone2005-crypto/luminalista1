import { useRef } from "react";
import { CandidateSection } from "@/components/sections/CandidateSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { GadgetGallery } from "@/components/sections/GadgetGallery";
import { HeroSection } from "@/components/sections/HeroSection";
import { IdeaSection } from "@/components/sections/IdeaSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { useLandingMotion } from "@/motion/useLandingMotion";

export function LandingPage() {
  const root = useRef<HTMLElement>(null);
  useLandingMotion(root);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#intro">
        Vai al contenuto
      </a>
      <main ref={root}>
        <div className="story-progress" aria-hidden="true">
          <span className="story-progress-fill" />
        </div>
        <HeroSection />
        <IntroSection />
        <CandidateSection />
        <CountdownSection />
        <ManifestoSection />
        <ProgramSection />
        <GadgetGallery />
        <div className="daybreak" aria-hidden="true">
          <span className="small-spark" />
          <span>ORA TOCCA A TE.</span>
        </div>
        <IdeaSection />
      </main>
    </div>
  );
}
