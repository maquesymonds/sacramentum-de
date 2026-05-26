"use client";

import React, { useRef, useEffect } from "react";
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/lib/locale-context";
import { padStart } from "@/lib/utils";
import { useRouter }    from "next/navigation";
import { useCharReveal } from "@/hooks/useCharReveal";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeSupport() {
  const router = useRouter();
  const copy  = useT().howWeSupport;
  const cards = copy.cards;

  const outerRef       = useRef<HTMLDivElement>(null);
  const stickyRef      = useRef<HTMLElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const h1MobileRef    = useRef<HTMLHeadingElement>(null);
  const h1DesktopRef   = useRef<HTMLHeadingElement>(null);
  useCharReveal(h1MobileRef, copy.headline);
  useCharReveal(h1DesktopRef, copy.headline);

  // Mobile scroll-reveal for each step card
  useEffect(() => {
    const items = mobileCardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (items.length === 0) return;

    items.forEach((el, i) => {
      el.style.opacity   = "0";
      el.style.transform = "translateX(-28px)";
      el.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement;
            el.style.opacity   = "1";
            el.style.transform = "translateX(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    const track  = trackRef.current;
    if (!outer || !sticky || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const setHeight = () => {
        const scrollDist = track.scrollWidth - window.innerWidth;
        outer.style.height = `${scrollDist + window.innerHeight}px`;
      };

      setHeight();
      window.addEventListener("resize", setHeight);
      ScrollTrigger.refresh();

      const anim = gsap.to(track, {
        x:    () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger:             outer,
          start:               "top top",
          end:                 "bottom bottom",
          scrub:               1.2,
          invalidateOnRefresh: true,
          snap: {
            snapTo:   1 / (cards.length - 1),
            duration: { min: 0.3, max: 0.7 },
            delay:    0.05,
            ease:     "power2.inOut",
          },
        },
      });

      return () => {
        window.removeEventListener("resize", setHeight);
        anim.scrollTrigger?.kill();
        anim.kill();
        outer.style.height = "";
      };
    });

    return () => mm.revert();
  }, [cards.length]);

  return (
    <div ref={outerRef} id="how-we-support">

      {/* ── Mobile layout (< 1024px) ──────────────────────────────────────── */}
      <div
        className="lg:hidden bg-surface-muted"
        style={{ paddingTop: "clamp(3rem, 5vw, 5rem)", paddingBottom: "4rem" }}
      >
        <div className="container-site">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
              <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{copy.eyebrow}</span>
            </div>
            <h1
              key={copy.headline}
              ref={h1MobileRef}
              className="font-normal text-ink"
              style={{ fontSize: "clamp(2.2rem, 8vw, 3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
            >
              {copy.headline}
            </h1>
          </div>

          {/* Timeline path + cards */}
          <div style={{ position: "relative", paddingLeft: "2.75rem" }}>

            {/* Vertical path line */}
            <div style={{
              position:   "absolute",
              left:       "0.85rem",
              top:        "1.5rem",
              bottom:     "1.5rem",
              width:      "1.5px",
              background: "linear-gradient(to bottom, var(--color-warm) 0%, rgba(204,168,124,0.15) 100%)",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cards.map((card, i) => (
                <div
                  key={card.id}
                  ref={el => { mobileCardRefs.current[i] = el; }}
                  style={{ position: "relative" }}
                >
                  {/* Step dot on the line */}
                  <div style={{
                    position:     "absolute",
                    left:         "calc(-2.75rem + 0.85rem - 6px)",
                    top:          "50%",
                    transform:    "translateY(-50%)",
                    width:        13,
                    height:       13,
                    borderRadius: "50%",
                    background:   "var(--color-warm)",
                    border:       "2.5px solid var(--color-surface-muted)",
                    zIndex:       1,
                  }} />

                  <article
                    onClick={() => router.push("/contact")}
                    style={{
                      display:       "flex",
                      flexDirection: "row",
                      borderRadius:  16,
                      overflow:      "hidden",
                      background:    "white",
                      boxShadow:     "0 4px 24px rgba(0,0,0,0.07)",
                      cursor:        "pointer",
                      height:        "200px",
                    }}
                  >
                    {/* Square image — left side */}
                    <div style={{ flexShrink: 0, width: "38%", position: "relative", height: "100%" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.image}
                        alt={card.title}
                        draggable={false}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>

                    {/* Text — right side */}
                    <div style={{ flex: 1, padding: "1.1rem 1.1rem 1.1rem 1rem", display: "flex", flexDirection: "column", gap: "0.4rem", justifyContent: "center" }}>
                      <span className="text-eyebrow" style={{ color: "var(--color-warm)", fontSize: "0.65rem" }}>
                        Step {padStart(i + 1)}
                      </span>
                      <h3 className="font-normal text-ink" style={{ fontSize: "1rem", letterSpacing: "-0.015em", lineHeight: 1.25, margin: 0 }}>
                        {card.title}
                      </h3>
                      <p className="text-ink-muted" style={{ fontSize: "0.8rem", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {card.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop layout (≥ 1024px) — horizontal scroll ────────────────── */}
      <section
        ref={stickyRef}
        aria-label="How We Support Your Move"
        className="hidden lg:flex bg-surface-muted"
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", flexDirection: "column" }}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div
          className="container-site flex-shrink-0"
          style={{ paddingTop: "clamp(3rem, 5vw, 5rem)", paddingBottom: "2rem" }}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
                <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{copy.eyebrow}</span>
              </div>
              <h1
                key={copy.headline}
                ref={h1DesktopRef}
                className="font-normal text-ink"
                style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
              >
                {copy.headline}
              </h1>
            </div>
            <div className="hidden lg:flex items-end">
              <p className="text-body text-ink-muted leading-relaxed">{copy.subheadline}</p>
            </div>
          </div>
        </div>

        {/* ── Track — GSAP animates x ─────────────────────────────────────── */}
        <div
          ref={trackRef}
          style={{
            display:      "flex",
            flexShrink:   0,
            gap:          "clamp(1rem, 1.5vw, 1.5rem)",
            paddingLeft:  "clamp(1.25rem, 3.5vw, 3rem)",
            paddingRight: "clamp(1.25rem, 3.5vw, 3rem)",
            width:        "max-content",
            flex:         1,
            alignItems:   "flex-start",
            paddingBottom:"clamp(2.5rem, 4vw, 4rem)",
          }}
        >
          {cards.map((card, i) => (
            <article
              key={card.id}
              onClick={() => router.push("/contact")}
              style={{
                width:         "clamp(300px, 50vw, 580px)",
                height:        "clamp(360px, 55vh, 480px)",
                flexShrink:    0,
                borderRadius:  16,
                overflow:      "hidden",
                background:    "white",
                display:       "flex",
                flexDirection: "column",
                boxShadow:     "0 4px 24px rgba(0,0,0,0.07)",
                cursor:        "pointer",
              }}
            >
              {/* Image — height capped in vh so it never overflows the sticky 100vh container */}
              <div style={{ position: "relative", height: "clamp(160px, 30vh, 290px)", overflow: "hidden", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  draggable={false}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                />
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, background: "linear-gradient(175deg, rgba(31,41,51,0.0) 0%, rgba(31,41,51,0.18) 100%)", pointerEvents: "none" }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.75rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ display: "block", height: 1, width: "1.5rem", flexShrink: 0, backgroundColor: "var(--color-warm)" }} />
                  <span className="text-eyebrow" style={{ color: "var(--color-warm)", fontSize: "0.68rem" }}>
                    Step {padStart(i + 1)}
                  </span>
                </div>
                <h3 className="font-normal text-ink" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.375rem)", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                  {card.title}
                </h3>
                <p className="text-ink-muted" style={{ fontSize: "0.9rem", lineHeight: 1.7, flex: 1 }}>
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* ── CTA — below the sticky section ─────────────────────────────────── */}
      <div className="bg-surface-muted">
        <div className="container-site lg:py-14 py-8">
          <div className="lg:pt-10 lg:border-t lg:border-ink/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-body text-ink-muted max-w-[440px]">
              Every engagement begins with a private, no-commitment conversation about your objectives.
            </p>
            <button onClick={() => router.push("/contact")} className="btn-primary whitespace-nowrap flex-shrink-0">
              {copy.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile-only section divider */}
        <div className="lg:hidden container-site">
          <hr style={{ border: "none", borderTop: "1px solid rgba(31,41,51,0.1)", marginTop: "0.5rem" }} />
        </div>
      </div>

    </div>
  );
}
