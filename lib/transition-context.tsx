"use client";

import React, { createContext, useContext, useRef, useCallback, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

type TransitionContextType = {
  navigate:    (href: string) => void;
  isRevealed:  boolean;
  overlayPathRef: React.RefObject<SVGPathElement>;
};

const TransitionContext = createContext<TransitionContextType>({
  navigate:    () => {},
  isRevealed:  true,
  overlayPathRef: { current: null } as React.RefObject<SVGPathElement>,
});

const P = {
  step1: {
    unfilled: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
    curve1:   "M 0 100 V 50 Q 50 0 100 50 V 100 z",
    filled:   "M 0 100 V 0 Q 50 0 100 0 V 100 z",
  },
  step2: {
    filled:   "M 0 0 V 100 Q 50 100 100 100 V 0 z",
    curve1:   "M 0 0 V 50 Q 50 0 100 50 V 0 z",
    unfilled: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
  },
};

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router         = useRouter();
  const pathname       = usePathname();
  const overlayPathRef = useRef<SVGPathElement>(null);
  const isAnimating    = useRef(false);
  const pendingReveal  = useRef(false);
  const [isRevealed, setIsRevealed] = useState(true);

  // Fires when Next.js has actually finished navigating and painted the new page.
  // Only then do we open the overlay — this prevents showing the old page underneath.
  useEffect(() => {
    if (!pendingReveal.current) return;
    pendingReveal.current = false;

    const el = overlayPathRef.current;
    if (!el) { setIsRevealed(true); isAnimating.current = false; return; }

    // One rAF to let React finish the first paint of the new page before revealing
    requestAnimationFrame(() => {
      gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
        .set(el, { attr: { d: P.step2.filled } })
        .to(el,  { duration: 0.2, ease: "sine.in",  attr: { d: P.step2.curve1 } })
        .to(el,  { duration: 1,   ease: "power4",   attr: { d: P.step2.unfilled },
          onComplete: () => setIsRevealed(true),
        });
    });
  }, [pathname]);

  const navigate = useCallback((href: string) => {
    if (isAnimating.current) return;
    const el = overlayPathRef.current;
    if (!el) { router.push(href); return; }

    isAnimating.current = true;
    setIsRevealed(false);

    gsap.timeline()
      .set(el, { attr: { d: P.step1.unfilled } })
      .to(el,  { duration: 0.8, ease: "power4.in", attr: { d: P.step1.curve1 } })
      .to(el,  {
        duration: 0.2, ease: "power1",
        attr: { d: P.step1.filled },
        onComplete: () => {
          pendingReveal.current = true;
          router.push(href);
        },
      });
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigate, isRevealed, overlayPathRef }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);
