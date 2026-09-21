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
      gsap.from(select(".hero-enter"), {
        y: 18,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.14,
        delay: 0.3,
        ease: "power3.out",
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
        const portrait = candidate.querySelector(".portrait");
        const number = candidate.querySelector(".candidate-number");
        const name = candidate.querySelector(".candidate-name");
        const info = candidate.querySelector(".candidate-info");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: candidate,
            start: "top 84%",
            once: true,
          },
        });

        timeline
          .from(portrait, {
            clipPath: "inset(0 0 16% 0)",
            filter: "brightness(0.42) grayscale(1)",
            y: 22,
            duration: 1.05,
            ease: "power3.out",
          })
          .from(
            number,
            {
              autoAlpha: 0,
              scale: 0.72,
              duration: 0.45,
              ease: "back.out(1.8)",
            },
            "-=0.7",
          )
          .from(
            name,
            {
              autoAlpha: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.46",
          )
          .from(
            info,
            {
              autoAlpha: 0,
              y: 12,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.38",
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

      select(".manifesto-line").forEach((element: HTMLElement) => {
        gsap.from(element, {
          color: "#5a5018",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            end: "top 56%",
            scrub: true,
          },
        });
      });

      gsap.from(select(".merch-stage"), {
        y: 35,
        autoAlpha: 0.2,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".merch-stage",
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
