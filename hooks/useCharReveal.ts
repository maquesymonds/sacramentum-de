"use client";

import { useEffect, useLayoutEffect, useRef, RefObject } from "react";
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCharReveal(ref: RefObject<HTMLElement | null>, resetKey?: unknown) {
  const splitRef = useRef<import("split-type").default | null>(null);
  const ctxRef   = useRef<gsap.Context | null>(null);

  // Synchronous cleanup before React commits DOM mutations.
  // This reverts SplitType spans back to a plain text node BEFORE React tries
  // to update the h1 text on locale switch — preventing the removeChild error.
  useLayoutEffect(() => {
    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, [resetKey]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    async function init() {
      const SplitType = (await import("split-type")).default;
      if (cancelled) return;

      splitRef.current = new SplitType(el as HTMLElement, { types: "chars,words" });
      const chars = splitRef.current.chars;
      if (!chars || chars.length === 0) return;

      ctxRef.current = gsap.context(() => {
        gsap.set(el as HTMLElement, { perspective: 800 });
        gsap.set(chars, {
          transformStyle:     "preserve-3d",
          display:            "inline-block",
          backfaceVisibility: "hidden",
          willChange:         "transform, opacity",
        });
        gsap.fromTo(
          chars,
          { opacity: 0, rotateX: 18, z: -30, y: 10 },
          {
            opacity: 1, rotateX: 0, z: 0, y: 0,
            stagger: 0.018,
            ease:    "power2.out",
            scrollTrigger: {
              trigger: el,
              start:   "top 88%",
              end:     "top 42%",
              scrub:   0.6,
            },
          }
        );
      });
    }

    init();

    return () => { cancelled = true; };
  }, [ref, resetKey]);
}
