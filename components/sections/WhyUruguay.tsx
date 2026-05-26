"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/lib/locale-context";
import StatItem          from "@/components/ui/StatItem";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useCharReveal }   from "@/hooks/useCharReveal";
import { lenisRef }      from "@/lib/lenis-ref";

gsap.registerPlugin(ScrollTrigger);

// ── Card icon map ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, string> = {
  shield:   "/images/Trust.png",
  circuit:  "/images/Rayo.png",
  people:   "/images/Human.png",
  leaf:     "/images/Heart.png",
  globe:    "/images/Location.png",
  document: "/images/Money.png",
};

function CardIcon({ id }: { id: string }) {
  const src = ICON_MAP[id];
  if (!src) return null;
  return <Image src={src} alt="" width={28} height={28} className="flex-shrink-0" aria-hidden />;
}

// ── Individual card ───────────────────────────────────────────────────────────
interface CardProps {
  icon:        string;
  title:       string;
  description: string;
  cardRef:     React.RefCallback<HTMLElement>;
}

function PillarCard({ icon, title, description, cardRef }: CardProps) {
  return (
    <article
      ref={cardRef}
      className={[
        "group relative flex flex-col gap-5",
        "p-8 bg-white border border-ink/[0.06] rounded-2xl",
        "shadow-card",
        "transition-shadow transition-colors duration-500",
        "hover:border-brand-blue/30 hover:shadow-card-lg",
      ].join(" ")}
      style={{ willChange: "transform", minHeight: "280px" }}
    >

      <div className="flex items-start">
        <CardIcon id={icon} />
      </div>

      <h3 className="text-h4 font-normal text-ink leading-snug">
        {title}
      </h3>

      <p className="text-small text-ink-subtle leading-relaxed flex-1">
        {description}
      </p>
    </article>
  );
}

// ── Mobile carousel (< 640px only) ───────────────────────────────────────────
function IconPause() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="4" height="13" rx="1" fill="currentColor"/>
      <rect x="7.5" y="0.5" width="4" height="13" rx="1" fill="currentColor"/>
    </svg>
  );
}
function IconPlay() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <path d="M1 1l10 6-10 6V1z" fill="currentColor"/>
    </svg>
  );
}

interface CarouselCard { id: string; icon: string; title: string; description: string }

function MobileCarousel({ cards }: { cards: CarouselCard[] }) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const [active, setActive]  = useState(0);
  const [paused, setPaused]  = useState(false);
  const pausedRef = useRef(false);
  const activeRef = useRef(0);

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { activeRef.current = active; }, [active]);

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    // Each card is 82vw wide + 0.75rem gap, first card offset by 1.25rem padding
    const cardW = track.children[0]?.getBoundingClientRect().width ?? track.scrollWidth / cards.length;
    const gap   = 12; // 0.75rem
    track.scrollTo({ left: idx * (cardW + gap), behavior: "smooth" });
  }, [cards.length]);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.children[0]?.getBoundingClientRect().width ?? track.scrollWidth / cards.length;
    const gap   = 12;
    const idx   = Math.min(Math.round(track.scrollLeft / (cardW + gap)), cards.length - 1);
    setActive(idx);
  }, [cards.length]);

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const next = (activeRef.current + 1) % cards.length;
      scrollTo(next);
    }, 5000);
    return () => clearInterval(id);
  }, [cards.length, scrollTo]);

  return (
    <div>
      {/* Track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={{
          display:                  "flex",
          overflowX:                "auto",
          scrollSnapType:           "x mandatory",
          WebkitOverflowScrolling:  "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          scrollbarWidth:           "none",
          gap:                      "1rem",
          paddingLeft:              "1.25rem",
          scrollPaddingLeft:        "1.25rem",
          paddingBottom:            "0.5rem",
        }}
      >
        {cards.map((card) => (
          <article
            key={card.id}
            style={{
              flexShrink:      0,
              width:           "76vw",
              scrollSnapAlign: "start",
              borderRadius:   16,
              background:     "white",
              border:         "1px solid rgba(31,41,51,0.07)",
              boxShadow:      "0 4px 24px rgba(0,0,0,0.07)",
              padding:        "2.25rem 1.75rem 2.5rem",
              display:        "flex",
              flexDirection:  "column",
              gap:            "1.5rem",
              minHeight:      "460px",
            }}
          >
            <CardIcon id={card.icon} />
            <h3 style={{ fontSize: "1.35rem", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.25, color: "var(--color-ink)", margin: 0 }}>
              {card.title}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--color-ink-subtle)", margin: 0, flex: 1 }}>
              {card.description}
            </p>
          </article>
        ))}
      </div>

      {/* Controls: dots + pause */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "1.25rem" }}>
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to card ${i + 1}`}
            style={{
              width:        i === active ? "1.5rem" : "0.5rem",
              height:       "0.5rem",
              borderRadius: "9999px",
              background:   i === active ? "white" : "rgba(255,255,255,0.45)",
              border:       "none",
              cursor:       "pointer",
              padding:      0,
              transition:   "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}

        {/* Pause / play */}
        <button
          onClick={() => setPaused(p => !p)}
          aria-label={paused ? "Play" : "Pause"}
          style={{
            marginLeft:      "0.5rem",
            width:           "2rem",
            height:          "2rem",
            borderRadius:    "50%",
            background:      "white",
            border:          "none",
            cursor:          "pointer",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            color:           "var(--color-ink)",
            flexShrink:      0,
          }}
        >
          {paused ? <IconPlay /> : <IconPause />}
        </button>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function WhyUruguay() {
  const copy = useT().whyUruguay;

  const statsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const gridRef  = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const h1Ref    = useRef<HTMLHeadingElement>(null);
  useCharReveal(h1Ref, copy.headline);

  useEffect(() => {
    const cards = cardRefs.current.filter((c): c is HTMLElement => c !== null);
    const grid  = gridRef.current;
    if (!grid || cards.length < 1) return;

    const lenis = lenisRef.current;
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    /*
     * Index2-inspired column-fan effect.
     *
     * Each column has a distinct transform-origin that acts as a "pivot base":
     *   Left  col — origin near lower-left  ("18% 95%")
     *               rotates negative, shifts left → top fans outward-left
     *   Center col — origin at dead center   ("50% 50%")
     *               barely moves, mild Y drift — stays "calm"
     *   Right col — origin near lower-right  ("82% 95%")
     *               rotates positive, shifts right → top fans outward-right
     *
     * from = natural position (no jump when card enters view)
     * to   = fully fanned state (reached as section scrolls through viewport)
     *
     * scrub: 1.5 gives the premium lag feel without losing responsiveness.
     */

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop — full index2 fan ─────────────────────────────────────────
      mm.add("(min-width: 1024px)", () => {

        const DESKTOP = [
          {
            // Left column: pivot lower-left, fans outward-left
            origin: "18% 95%",
            from: { x:   0, y: 0, rotation:  0   },
            to:   { x: -28, y: -22, rotation: -7.5 },
          },
          {
            // Center column: calm, mild vertical drift
            origin: "50% 50%",
            from: { x: 0, y: 0,  rotation: 0 },
            to:   { x: 0, y: -18, rotation: 0 },
          },
          {
            // Right column: pivot lower-right, fans outward-right
            origin: "82% 95%",
            from: { x:  0, y: 0, rotation: 0   },
            to:   { x: 28, y: -22, rotation:  7.5 },
          },
        ];

        const ST = {
          trigger: grid,
          start:   "top bottom",
          end:     "bottom top",
          scrub:   1.5,
        };

        cards.forEach((card, i) => {
          const cfg = DESKTOP[i % 3];
          gsap.set(card, { transformOrigin: cfg.origin });
          gsap.fromTo(card, cfg.from, { ...cfg.to, ease: "none", scrollTrigger: ST });
        });
      });

      // ── Tablet — simplified two-column fan ───────────────────────────────
      mm.add("(min-width: 640px) and (max-width: 1023px)", () => {

        const TABLET = [
          {
            origin: "20% 95%",
            from: { x:   0, y: 0, rotation:  0   },
            to:   { x: -16, y: -14, rotation: -4.5 },
          },
          {
            origin: "80% 95%",
            from: { x:  0, y: 0, rotation: 0   },
            to:   { x: 16, y: -14, rotation:  4.5 },
          },
        ];

        const ST = {
          trigger: grid,
          start:   "top bottom",
          end:     "bottom top",
          scrub:   1.5,
        };

        cards.forEach((card, i) => {
          const cfg = TABLET[i % 2];
          gsap.set(card, { transformOrigin: cfg.origin });
          gsap.fromTo(card, cfg.from, { ...cfg.to, ease: "none", scrollTrigger: ST });
        });
      });

      // ── Mobile — very subtle Y drift only ───────────────────────────────
      mm.add("(max-width: 639px)", () => {
        gsap.set(cards, { transformOrigin: "50% 50%" });
        gsap.fromTo(
          cards,
          { y: 0 },
          {
            y: -10,
            ease: "none",
            scrollTrigger: {
              trigger: grid,
              start:   "top bottom",
              end:     "bottom top",
              scrub:   2,
            },
          }
        );
      });

    }, gridRef);

    return () => {
      ctx.revert();
      if (lenis) lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <section
      id="why-uruguay"
      aria-label="Why Uruguay"
      className="bg-surface"
      style={{ paddingTop: "var(--section-padding-y)" }}
    >
      {/* ── Header + Stats inside the container ─────────────────────── */}
      <div className="container-site">

        <div className="grid lg:grid-cols-2 lg:items-end gap-10 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-8 bg-brand-warm flex-shrink-0" />
              <span className="text-eyebrow text-brand-warm">{copy.eyebrow}</span>
            </div>
            <h1
              key={copy.headline}
              ref={h1Ref}
              className="font-normal text-ink"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
            >
              {copy.headline}
            </h1>
          </div>
          <p className="text-body text-ink-muted leading-relaxed lg:pb-2">
            {copy.subheadline}
          </p>
        </div>

        <div ref={statsRef} className="sr-hidden mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 pt-4 pb-12">
            {copy.stats.map((stat, i) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                index={i}
                theme="light"
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── Card grid — full-bleed background ────────────────────────── */}
      <div
        style={{
          backgroundImage:    "url('/images/OlasLanding.webp')",
          backgroundSize:     "cover",
          backgroundPosition: "center top",
          marginTop:          "-8rem",
          paddingTop:         "10.5rem",
          paddingBottom:      "var(--section-padding-y)",
        }}
      >
        <div className="container-site">
          {/* Mobile carousel — only below 640px */}
          <div className="sm:hidden" style={{ marginRight: "calc(-1 * var(--container-padding-x))" }}>
            <MobileCarousel cards={copy.cards} />
          </div>

          {/* Tablet + desktop grid — hidden on mobile */}
          <div ref={gridRef} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.cards.map((card, i) => (
              <PillarCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
                cardRef={el => { cardRefs.current[i] = el; }}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
