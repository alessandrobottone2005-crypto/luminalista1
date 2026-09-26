import { useRef } from "react";
import { Link } from "react-router-dom";
import { CandidateSection } from "@/components/sections/CandidateSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IdeaSection } from "@/components/sections/IdeaSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { StickerSection } from "@/components/sections/StickerSection";
import { colophon } from "@/content/site";
import { useLandingMotion } from "@/motion/useLandingMotion";

export function LandingPage() {
  const root = useRef<HTMLElement>(null);
  useLandingMotion(root);

  return (
    <div className="site-shell">
      <main ref={root}>
        <HeroSection />
        <IntroSection />
        <CandidateSection />
        <CountdownSection />
        <ManifestoSection />
        <ProgramSection />
        <StickerSection />
        <IdeaSection />
        <p className="colophon section-pad">
          {colophon.copyright} · <Link to="/privacy">{colophon.privacy}</Link>
        </p>
      </main>
    </div>
  );
}
