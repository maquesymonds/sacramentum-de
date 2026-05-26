"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisRef } from "@/lib/lenis-ref";

gsap.registerPlugin(ScrollTrigger);

const expoOut = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t));

interface Props { children: ReactNode }

export default function SmoothScrollProvider({ children }: Props) {
  const pathname = usePathname();

  // Reset scroll to top on every route change.
  // Exception: when navigating to "/" with skipIntro set, IntroReveal will
  // handle the scroll position itself — don't fight it.
  useEffect(() => {
    if (pathname === "/" && sessionStorage.getItem("skipIntro") === "1") return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration:           isTouch ? 1.0 : 1.2,
      easing:             expoOut,
      orientation:        "vertical",
      gestureOrientation: "vertical",
      smoothWheel:        !isTouch,
      wheelMultiplier:    isTouch ? 1.0 : 0.88,
      touchMultiplier:    1.0,
      infinite:           false,
    });

    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so ScrollTrigger stays in sync
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
