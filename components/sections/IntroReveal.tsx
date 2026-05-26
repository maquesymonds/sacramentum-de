"use client";

import { useEffect, useRef } from "react";
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisRef }      from "@/lib/lenis-ref";
import { useT } from "@/lib/locale-context";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// ── Mobile static hero (shown instead of the animation on < 1024px) ──────────
function MobileHero() {
  const copy   = useT();
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      window.dispatchEvent(new CustomEvent("intro-nav-ready"));
    }
  }, []);

  return (
    <div
      id="home"
      className="lg:!hidden"
      style={{
        position:           "relative",
        height:             "100vh",
        overflow:           "hidden",
        backgroundImage:    "url('/images/uruguay.webp')",
        backgroundSize:     "cover",
        backgroundPosition: "center 26%",
        display:            "flex",
        alignItems:         "center",
        justifyContent:     "center",
        textAlign:          "center",
        padding:            "0 clamp(1.25rem, 5vw, 4rem)",
      }}
    >
      {/* Dark overlay */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "min(90vw, 680px)", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "9rem" }}>

        {/* Title + subheadline */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontWeight:    300,
              color:         "white",
              lineHeight:    1.1,
              marginBottom:  "1.5rem",
              fontSize:      "clamp(2.2rem, 7vw, 3.5rem)",
              letterSpacing: "-0.03em",
              whiteSpace:    "pre-line",
            }}
          >
            {copy.hero.headline}
          </h1>

          <p
            style={{
              color:      "white",
              lineHeight: 1.65,
              fontSize:   "clamp(1rem, 3vw, 1.15rem)",
              maxWidth:   "560px",
              margin:     0,
              opacity:    0.9,
            }}
          >
            {copy.hero.subheadline}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/contact")}
          style={{
            display:      "inline-flex",
            alignItems:   "center",
            gap:          "0.5rem",
            padding:      "1.1rem 2.5rem",
            color:        "#111F30",
            fontWeight:   500,
            fontSize:     "1rem",
            fontFamily:   "inherit",
            borderRadius: "50px",
            background:   "white",
            border:       "none",
            cursor:       "pointer",
            boxShadow:    "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          {copy.hero.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
}

export default function IntroReveal() {
  const copy   = useT();
  const router = useRouter();

  const outerRef      = useRef<HTMLDivElement>(null);
  const bgRef         = useRef<HTMLDivElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const windowRef     = useRef<HTMLImageElement>(null);
  const textRef       = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const bg    = bgRef.current;
    const win   = windowRef.current;
    const text  = textRef.current;
    const hint  = scrollHintRef.current;
    if (!outer || !bg || !win || !text) return;

    const lenis = lenisRef.current;
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    // If arriving from Home link on another page, skip straight to outside state
    const skipIntro = sessionStorage.getItem("skipIntro") === "1";
    if (skipIntro) {
      sessionStorage.removeItem("skipIntro");
      // Scroll to the end of the intro section directly — double rAF ensures
      // layout is settled before we try to move the scroll position.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const target = outer.offsetTop + outer.offsetHeight - window.innerHeight;
        if (lenis) lenis.scrollTo(target, { immediate: true });
        else window.scrollTo({ top: target });
        window.dispatchEvent(new CustomEvent("intro-nav-ready"));
      }));
    }

    let navRevealed = false;
    let soundPlayed = false;
    const whoosh = new Audio("/sounds/whoosh.mp3");
    whoosh.volume = 0.55;
    whoosh.preload = "auto";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start:   "top top",
          end:     "bottom bottom",
          scrub:   true,
          onUpdate: (self) => {
            if (!soundPlayed && self.progress > 0.01) {
              soundPlayed = true;
              whoosh.play().catch(() => {});
            }
            if (!navRevealed && self.progress > 0.88) {
              navRevealed = true;
              window.dispatchEvent(new CustomEvent("intro-nav-ready"));
            }
          },
        },
      })
        .to(win, {
          scale:           2,
          z:               350,
          transformOrigin: "center center",
          ease:            "power1.inOut",
        }, 0)
        .to(bg, {
          scale:           1.1,
          transformOrigin: "center center",
          ease:            "power1.inOut",
        }, 0)
        .to(overlayRef.current, {
          opacity: 1,
          ease:    "power1.inOut",
        }, 0)
        .to(text, {
          opacity:  1,
          y:        0,
          ease:     "power2.out",
        }, 0.68);

      if (hint) tl.to(hint, { opacity: 0, y: 8, ease: "power1.in" }, 0);
    });

    return () => {
      ctx.revert();
      if (lenis) lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <>
    {/* ── Mobile static hero (< 1024px) ──────────────────────────────────── */}
    <MobileHero />

    {/* ── Desktop intro animation (≥ 1024px) ─────────────────────────────── */}
    <div ref={outerRef} className="hidden lg:block" style={{ height: "250vh", position: "relative" }}>
      {/* Anchor at the hero/landscape view — where the animation is at 100% */}
      <div id="home" style={{ position: "absolute", top: "150vh" }} />

      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Background landscape */}
        <div
          ref={bgRef}
          style={{
            position:           "absolute",
            inset:              0,
            backgroundImage:    "url('/images/uruguay.webp')",
            backgroundSize:     "cover",
            backgroundPosition: "center 26%",
          }}
        />

        {/* Dark overlay — fades in with scroll */}
        <div ref={overlayRef} aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1, opacity: 0 }} />

        {/* Window frame — zooms in with perspective */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, perspective: "500px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={windowRef}
            src="/images/Substract.png"
            alt=""
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          style={{
            position:       "absolute",
            bottom:         "2.5rem",
            left:           "50%",
            transform:      "translateX(-50%)",
            zIndex:         4,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            "0.5rem",
            color:          "rgba(255,255,255,0.7)",
            pointerEvents:  "none",
          }}
        >
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
            Scroll
          </span>
          <div style={{ width: 1, height: "2.5rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)", animation: "scrollPulse 1.8s ease-in-out infinite" }} />
        </div>

        {/* Hero text — fades in as window zooms away */}
        <div
          ref={textRef}
          style={{
            position:       "absolute",
            inset:          0,
            zIndex:         3,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            textAlign:      "center",
            padding:        "0 clamp(1.25rem, 5vw, 4rem)",
            opacity:        0,
            transform:      "translateY(32px)",
          }}
        >
          <div style={{ maxWidth: "min(90vw, 1080px)", width: "100%" }}>

            <h1
              style={{
                fontWeight:    300,
                color:         "white",
                lineHeight:    1.1,
                marginBottom:  "1.5rem",
                fontSize:      "clamp(2.5rem, 4.8vw, 4.8rem)",
                letterSpacing: "-0.03em",
                whiteSpace:    "pre-line",
              }}
            >
              {copy.hero.headline}
            </h1>

            <p
              style={{
                color:        "white",
                lineHeight:   1.65,
                fontSize:     "clamp(1.05rem, 1.5vw, 1.2rem)",
                maxWidth:     "680px",
                margin:       "0 auto 2.5rem",
              }}
            >
              {copy.hero.subheadline}
            </p>

            <button
              onClick={() => router.push("/contact")}
              className="hero-cta"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "0.5rem",
                padding:        "1.1rem 2.5rem",
                color:          "#111F30",
                fontWeight:     500,
                fontSize:       "1rem",
                letterSpacing:  "0",
                fontFamily:     "inherit",
                borderRadius:   "50px",
                background:     "white",
                border:         "none",
                cursor:         "pointer",
                transition:     "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease",
                boxShadow:      "0 4px 20px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform  = "scale(1.08)";
                el.style.boxShadow  = "0 8px 32px rgba(0,0,0,0.22)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform  = "scale(1)";
                el.style.boxShadow  = "0 4px 20px rgba(0,0,0,0.15)";
              }}
            >
              {copy.hero.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ transition: "transform 0.25s ease" }}>
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>
        </div>

      </div>
    </div>
    </>
  );
}
