import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useLandingMotion(root: RefObject<HTMLElement | null>) {
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -76 },
    });
    const update = (time: number) => lenis.raf(time * 1_000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useGSAP(
    () => {
      if (reduceMotion) return;

      const select = gsap.utils.selector(root);
      gsap.to(select(".story-progress-fill"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      select(".light-reveal").forEach((element: HTMLElement) => {
        gsap.from(element, {
          clipPath: "inset(0 100% 0 0)",
          filter: "brightness(2)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });

      select(".candidate").forEach((candidate: HTMLElement) => {
        const photo = candidate.querySelector(".candidate-photo");
        const footer = candidate.querySelector(".candidate-footer");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: candidate,
            start: "top 84%",
            once: true,
          },
        });

        timeline
          .from(photo, {
            clipPath: "inset(0 0 16% 0)",
            filter: "brightness(0.42) grayscale(1)",
            y: 22,
            duration: 1.05,
            ease: "power3.out",
          })
          .from(
            footer,
            {
              autoAlpha: 0,
              y: 16,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.5",
          );
      });

      select(".program-item").forEach((element: HTMLElement) => {
        gsap.from(element, {
          autoAlpha: 0.2,
          filter: "blur(7px)",
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 83%", once: true },
        });
      });

      const manifesto = select(".manifesto")[0];
      const manifestoLines = select(".manifesto-line");
      if (manifesto && manifestoLines.length) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: manifesto,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.65,
            },
          })
          .from(manifestoLines, {
            autoAlpha: 0.12,
            y: 26,
            stagger: 0.16,
            duration: 0.52,
            ease: "none",
          })
          .from(
            select(".manifesto-star"),
            {
              autoAlpha: 0.2,
              rotation: -45,
              scale: 0.35,
              duration: 0.7,
              ease: "none",
            },
            0,
          );
      }

      gsap.from(select(".sticker-pin"), {
        y: 35,
        autoAlpha: 0.2,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tape-wall",
          start: "top 80%",
          once: true,
        },
      });

      let mounted = true;
      const refresh = gsap.delayedCall(0.12, ScrollTrigger.refresh).pause();
      const requestRefresh = () => refresh.restart(true);
      document.fonts.ready.then(() => {
        if (mounted) requestRefresh();
      });

      const resizeObserver = new ResizeObserver(requestRefresh);
      if (root.current) resizeObserver.observe(root.current);

      return () => {
        mounted = false;
        resizeObserver.disconnect();
        refresh.kill();
      };
    },
    { scope: root, dependencies: [reduceMotion], revertOnUpdate: true },
  );
}
