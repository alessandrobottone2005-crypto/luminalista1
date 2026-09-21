import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BRAND_ASSETS } from "@/config/assets";

export function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [motionEnabled, setMotionEnabled] = useState(!prefersReducedMotion);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) setMotionEnabled(false);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = video.current;
    if (!media) return;

    if (!motionEnabled || !visible) {
      media.pause();
      return;
    }

    void media.play().catch(() => setMotionEnabled(false));
  }, [motionEnabled, visible]);

  return (
    <div
      ref={container}
      className={`header-animation ${motionEnabled ? "" : "is-paused"}`}
    >
      <video
        ref={video}
        className="header-animation-media"
        autoPlay={!prefersReducedMotion}
        loop
        muted
        playsInline
        preload="metadata"
        poster={BRAND_ASSETS.headerPoster}
        aria-hidden="true"
      >
        <source src={BRAND_ASSETS.headerVideo} type="video/mp4" />
      </video>
    </div>
  );
}
