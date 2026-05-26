"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   useScrollReveal
   Lightweight IntersectionObserver hook that applies sr-visible / sr-hidden
   CSS classes when elements enter the viewport.

   Usage:
     const ref = useScrollReveal<HTMLDivElement>()
     <div ref={ref} className="sr-hidden"> ... </div>

   Options:
     threshold  — how much of the element must be visible (default 0.15)
     rootMargin — viewport margin (default "-40px")
     once       — only trigger once (default true)
   ─────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  threshold?:  number;
  rootMargin?: string;
  once?:       boolean;
  variant?:    "up" | "left" | "scale";
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    threshold  = 0.15,
    rootMargin = "-40px",
    once       = true,
    variant    = "up",
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hiddenClass  = variant === "left"  ? "sr-hidden-left"
                       : variant === "scale" ? "sr-hidden-scale"
                       : "sr-hidden";
    const visibleClass = variant === "left"  ? "sr-visible-left"
                       : variant === "scale" ? "sr-visible-scale"
                       : "sr-visible";

    // Ensure element starts in hidden state
    el.classList.add(hiddenClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(hiddenClass);
            entry.target.classList.add(visibleClass);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove(visibleClass);
            entry.target.classList.add(hiddenClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, variant]);

  return ref;
}

/* ─── staggered reveal for multiple children ────────────────────────────────
   Usage:
     const containerRef = useStaggeredReveal<HTMLUListElement>({ childSelector: "li" })
     <ul ref={containerRef}> ...children </ul>
*/
export function useStaggeredReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions & { childSelector?: string; staggerMs?: number } = {}
) {
  const {
    threshold     = 0.1,
    rootMargin    = "-20px",
    once          = true,
    childSelector = "*",
    staggerMs     = 100,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(
      container.querySelectorAll<HTMLElement>(childSelector)
    );

    children.forEach((child, i) => {
      child.classList.add("sr-hidden");
      child.style.transitionDelay = `${i * staggerMs}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child) => {
              child.classList.remove("sr-hidden");
              child.classList.add("sr-visible");
            });
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, childSelector, staggerMs]);

  return ref;
}
