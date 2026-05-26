"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useT } from "@/lib/locale-context";
import { scrollToSection } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Splits text into chars, each masked from below
function MaskedChars({
  text,
  startDelay,
  stagger = 0.026,
  duration = 0.52,
  className = "",
}: {
  text: string;
  startDelay: number;
  stagger?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration, ease: EASE, delay: startDelay + i * stagger }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const copy = useT();

  const headline = copy.hero.headline;
  // Rough end time of headline animation: delay + chars * stagger + duration
  const headlineEnd = 0.1 + headline.length * 0.026 + 0.52;

  // ── Scroll parallax ──────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  // ── Water hover effect ───────────────────────────────────────────────────
  const hoverScale = useSpring(1.08, { stiffness: 60, damping: 22 });
  const hoverY     = useSpring(0,    { stiffness: 60, damping: 22 });

  const onEnter = () => { hoverScale.set(1.13); hoverY.set(-10); };
  const onLeave = () => { hoverScale.set(1.08); hoverY.set(0);   };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden"
      aria-label="Hero"
    >

      {/* ── Background Image ────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: hoverScale, translateY: hoverY }}
      >
        <Image
          src="/images/hero.png"
          alt="Uruguay landscape"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Dark overlay ────────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-site w-full">
          <div>

            {/* 1. Headline — letter by letter from mask */}
            <h1
              className={[
                "font-light text-white leading-[1.06] mb-5 max-w-[720px]",
                "text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4rem]",
                "tracking-[-0.03em]",
              ].join(" ")}
            >
              <MaskedChars text={headline} startDelay={0.1} />
            </h1>

            {/* 2. Subheadline — mask reveal after title */}
            <div className="overflow-hidden mb-10">
              <motion.p
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%",   opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: headlineEnd }}
                style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: "72ch" }}
              >
                {copy.hero.subheadline}
              </motion.p>
            </div>

            {/* 3. CTA — appears after subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.8, ease: EASE, delay: headlineEnd + 0.55 }}
            >
              <button
                onClick={() => scrollToSection("contact")}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className={[
                  "group relative inline-flex items-center",
                  "px-8 py-4 text-white font-medium text-base tracking-[0.02em]",
                  "transition-all duration-500 overflow-hidden",
                ].join(" ")}
                style={{
                  borderRadius:         "50px",
                  backdropFilter:       "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  background:           "rgba(255,255,255,0.10)",
                  border:               "1px solid rgba(255,255,255,0.22)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ borderRadius: "50px", background: "rgba(255,255,255,0.15)" }}
                  aria-hidden="true"
                />
                <span className="relative z-10">Schedule a call</span>
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: headlineEnd + 1.0, duration: 0.8, ease: EASE }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-base text-white font-medium">
          {copy.hero.scrollLabel}
        </span>
        <ScrollChevron />
      </motion.div>

    </section>
  );
}

function ScrollChevron() {
  return (
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M5 8l5 5 5-5"
          stroke="rgba(255,255,255,0.40)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
