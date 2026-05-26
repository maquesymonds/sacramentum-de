"use client";

import React, { useRef, useEffect } from "react";
import { motion }          from "framer-motion";
import { gsap }            from "gsap";
import { ScrollTrigger }   from "gsap/ScrollTrigger";
import { useSearchParams } from "next/navigation";
import Navigation          from "@/components/layout/Navigation";
import Footer              from "@/components/layout/Footer";
import { useLocale, useT } from "@/lib/locale-context";
import { lenisRef }        from "@/lib/lenis-ref";

gsap.registerPlugin(ScrollTrigger);

const EASE        = [0.16, 1, 0.3, 1] as const;
const CARD_W      = 500;
const CARD_H      = 530;
const RADIUS      = 800;
const ANGLE_STEP  = 45;

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.85, ease: EASE, delay },
});

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.8, ease: EASE, delay },
});

// ── Mobile Timeline ───────────────────────────────────────────────────────────
function MobileServiceTimeline({ cards, locale }: { cards: { id: string; image: string; title: string; description: string }[]; locale: string }) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
    items.forEach(el => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(36px)";
      el.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLDivElement;
          // Stagger via the data-index attribute
          const i = Number(el.dataset.index ?? 0);
          setTimeout(() => {
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
          }, i * 80);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="lg:hidden"
      style={{
        backgroundColor: "var(--color-surface-muted)",
        padding: "3.5rem 0 5rem",
      }}
    >
      <div className="container-site">
        {/* Vertical path */}
        <div style={{ position: "relative", paddingLeft: "3.5rem" }}>

          {/* The line */}
          <div style={{
            position:   "absolute",
            left:       "1.1rem",
            top:        "1.8rem",
            bottom:     "1.8rem",
            width:      "1px",
            background: "linear-gradient(to bottom, var(--color-warm) 0%, rgba(204,168,124,0.12) 100%)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {cards.map((card, i) => {
              const stepLabel = locale === "de"
                ? `Schritt ${String(i + 1).padStart(2, "0")}`
                : `Step ${String(i + 1).padStart(2, "0")}`;

              return (
                <div
                  key={card.id}
                  ref={el => { itemRefs.current[i] = el; }}
                  data-index={i}
                  style={{ position: "relative" }}
                >
                  {/* Timeline node */}
                  <div style={{
                    position:     "absolute",
                    left:         "calc(-3.5rem + 1.1rem - 8px)",
                    top:          "1.6rem",
                    width:        17,
                    height:       17,
                    borderRadius: "50%",
                    background:   "var(--color-surface-muted)",
                    border:       "1.5px solid var(--color-warm)",
                    zIndex:       1,
                  }}>
                    {/* Inner dot */}
                    <div style={{
                      position:     "absolute",
                      inset:        3,
                      borderRadius: "50%",
                      background:   "var(--color-warm)",
                    }} />
                  </div>

                  {/* Card */}
                  <div style={{
                    background:   "white",
                    borderRadius: 18,
                    overflow:     "hidden",
                    boxShadow:    "0 2px 8px rgba(31,41,51,0.05), 0 12px 40px rgba(31,41,51,0.07)",
                  }}>
                    {/* Image */}
                    <div style={{ position: "relative", paddingBottom: "58%", overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.image}
                        alt={card.title}
                        draggable={false}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      {/* Step label over image */}
                      <div style={{
                        position:     "absolute",
                        bottom:       "1rem",
                        left:         "1.25rem",
                        display:      "inline-flex",
                        alignItems:   "center",
                        gap:          "0.5rem",
                        background:   "rgba(17,31,48,0.72)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        borderRadius: "50px",
                        padding:      "0.3rem 0.85rem",
                        border:       "1px solid rgba(255,255,255,0.15)",
                      }}>
                        <span style={{ color: "var(--color-warm)", fontSize: "0.62rem", letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 500 }}>
                          {stepLabel}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "1.5rem 1.75rem 2rem" }}>
                      <h3 style={{
                        fontSize:      "1.2rem",
                        fontWeight:    400,
                        letterSpacing: "-0.015em",
                        lineHeight:    1.25,
                        color:         "var(--color-ink)",
                        marginBottom:  "0.75rem",
                      }}>
                        {card.title}
                      </h3>
                      <span style={{ display: "block", height: 1, width: "2rem", backgroundColor: "rgba(204,168,124,0.5)", marginBottom: "0.75rem" }} />
                      <p style={{
                        fontSize:   "0.9rem",
                        lineHeight: 1.72,
                        color:      "var(--color-ink-muted)",
                        margin:     0,
                      }}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3D Carousel ───────────────────────────────────────────────────────────────
function ServiceCarousel({ cards, locale, initialCard }: { cards: { id: string; image: string; title: string; description: string }[]; locale: string; initialCard?: string | null }) {
  const outerRef    = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const cardColors  = useRef<string[]>([]);
  const bgY = 400;

  // Clone last card at start and first card at end for loop illusion
  const extendedCards = [
    { ...cards[cards.length - 1], originalIndex: cards.length - 1 },
    ...cards.map((c, i) => ({ ...c, originalIndex: i })),
    { ...cards[0], originalIndex: 0 },
  ];

  // Extract dominant color from each card image, muted to stay premium
  useEffect(() => {
    cards.forEach((card, i) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 40; canvas.height = 40;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, 40, 40);
          const data = ctx.getImageData(0, 0, 40, 40).data;
          let r = 0, g = 0, b = 0;
          const n = data.length / 4;
          for (let j = 0; j < data.length; j += 4) {
            r += data[j]; g += data[j + 1]; b += data[j + 2];
          }
          // Mix 20% image color with 80% surface-muted (#F3F2EE) — subtle premium tint
          const br = 243, bg2 = 242, bb = 238;
          const mix = 0.7;
          cardColors.current[i] = `rgb(${Math.round(r/n*mix + br*(1-mix))},${Math.round(g/n*mix + bg2*(1-mix))},${Math.round(b/n*mix + bb*(1-mix))})`;
        } catch {
          cardColors.current[i] = "#F3F2EE";
        }
      };
      img.src = card.image;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const outer   = outerRef.current;
    const carousel = carouselRef.current;
    const section  = sectionRef.current;
    if (!outer || !carousel || !section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      carousel.style.transform = `translateZ(-${RADIUS}px) rotateY(0deg)`;

      const totalArc  = (cards.length - 1) * ANGLE_STEP;
      let lastIdx = 0;

      const st = ScrollTrigger.create({
        trigger:  outer,
        start:    "top top",
        end:      "bottom bottom",
        scrub:    1.3,
        snap: {
          snapTo:   1 / (cards.length - 1),
          duration: { min: 0.2, max: 0.4 },
          delay:    0.02,
          ease:     "power2.inOut",
        },
        onUpdate: (self) => {
          const angle = -self.progress * totalArc;
          carousel.style.transform = `translateZ(-${RADIUS}px) rotateY(${angle}deg)`;

          // Adapt background to active card's dominant color
          const idx = Math.round(self.progress * (cards.length - 1));
          if (idx !== lastIdx && cardColors.current[idx]) {
            lastIdx = idx;
            section.style.backgroundColor = cardColors.current[idx];
          }
        },
      });

      return () => {
        st.kill();
        carousel.style.transform = "";
      };
    });

    return () => mm.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to the requested card once the page is ready
  useEffect(() => {
    if (!initialCard) return;
    const idx = cards.findIndex(c => c.id === initialCard);
    if (idx < 0) return;

    const doScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;
      const progress   = idx / (cards.length - 1);
      const scrollDist = outer.offsetHeight - window.innerHeight;
      const target     = outer.offsetTop + progress * scrollDist;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { immediate: true });
      } else {
        window.scrollTo({ top: target, behavior: "instant" as ScrollBehavior });
      }
    };

    // Wait for ScrollTrigger to initialise
    const id = setTimeout(doScroll, 120);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCard]);

  return (
    <div ref={outerRef} style={{ height: "350vh" }}>
      <section
        ref={sectionRef}
        aria-label="How We Support Your Move"
        style={{
          position:        "sticky",
          top:             0,
          height:          "100vh",
          overflow:        "hidden",
          display:         "flex",
          flexDirection:   "column",
          transition: "background-color 0.7s ease",
        }}
      >
        {/* ── Background image ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/RocasExtendido.webp"
          alt=""
          aria-hidden="true"
          style={{
            position:  "absolute",
            top:       `${bgY}px`,
            left:      0,
            width:     "100%",
            height:    "auto",
            minWidth:  "100%",
            pointerEvents:      "none",
            userSelect:         "none",
            zIndex:             0,
            WebkitMaskImage:    "linear-gradient(to bottom, transparent 0%, black 18%)",
            maskImage:          "linear-gradient(to bottom, transparent 0%, black 18%)",
          }}
        />

        {/* ── Gradient fade from hero into carousel ── */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     "200px",
            background: "linear-gradient(to bottom, #F3F2EE 0%, rgba(243,242,238,0.6) 40%, transparent 100%)",
            pointerEvents: "none",
            zIndex:     5,
          }}
        />

        {/* ── Scene ── */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        >
          {/* Carousel ring — GSAP rotates this */}
          <div
            ref={carouselRef}
            style={{
              position:       "relative",
              width:          CARD_W,
              height:         CARD_H,
              transformStyle: "preserve-3d",
              transform:      `translateZ(-${RADIUS}px) rotateY(0deg)`,
              willChange:     "transform",
            }}
          >
            {extendedCards.map((card, i) => {
              const angle = (i - 1) * ANGLE_STEP; // -45, 0, 45, 90, 135, 180
              return (
                <article
                  key={`${card.id}-${i}`}
                  style={{
                    position:           "absolute",
                    inset:              0,
                    transform:          `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    borderRadius:       16,
                    overflow:           "hidden",
                    background:         "white",
                    display:            "flex",
                    flexDirection:      "column",
                    boxShadow:          "0 4px 24px rgba(0,0,0,0.07)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", paddingBottom: "56%", overflow: "hidden", flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.title}
                      draggable={false}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                    />
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", inset: 0, background: "linear-gradient(175deg, rgba(31,41,51,0.02) 0%, rgba(31,41,51,0.55) 100%)", pointerEvents: "none" }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.75rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ display: "block", height: 1, width: "1.5rem", flexShrink: 0, backgroundColor: "var(--color-warm)" }} />
                      <span style={{ color: "var(--color-warm)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
                        {locale === "de" ? `Schritt ${String(card.originalIndex + 1).padStart(2, "0")}` : `Step ${String(card.originalIndex + 1).padStart(2, "0")}`}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.375rem)", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.25, color: "var(--color-ink)", margin: 0 }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-ink-muted)", flex: 1 }}>
                      {card.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>


      </section>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPageClient() {
  const { locale }  = useLocale();
  const copy        = useT();
  const searchParams = useSearchParams();
  const initialCard  = searchParams.get("card");

  return (
    <>
      <Navigation />

      <main>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--color-surface-muted)",
            paddingTop:      "clamp(8rem, 14vw, 12rem)",
            paddingBottom:   "0",
          }}
        >
          <div className="container-site">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-end">
              <div>
                <motion.div {...fadeIn(0)} className="flex items-center gap-4 mb-7">
                  <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
                  <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>
                    {copy.howWeSupport.eyebrow}
                  </span>
                </motion.div>
                <motion.h1
                  {...fadeUp(0.06)}
                  className="font-normal text-ink"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  {copy.howWeSupport.headline}
                </motion.h1>
              </div>
              <motion.p
                {...fadeUp(0.12)}
                className="text-body text-ink-muted leading-relaxed lg:pt-2"
                style={{ maxWidth: "52ch" }}
              >
                {copy.howWeSupport.subheadline}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Mobile timeline ─────────────────────────────────────────────── */}
        <MobileServiceTimeline cards={copy.howWeSupport.cards} locale={locale} />

        {/* ── 3D Carousel (desktop only) ──────────────────────────────────── */}
        <div className="hidden lg:block">
          <ServiceCarousel cards={copy.howWeSupport.cards} locale={locale} initialCard={initialCard} />
        </div>


      </main>

      <Footer />
    </>
  );
}
