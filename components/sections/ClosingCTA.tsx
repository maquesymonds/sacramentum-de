"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   ClosingCTA — final invitation section before the footer
   ─────────────────────────────────────────────────────────────────────────────
   Design intent:
     • Calm, trust-driven close — not a sales push
     • Generous whitespace, editorial type scale
     • Light cream background (surface-muted) transitions cleanly into the
       dark footer below
     • Single centred column: eyebrow → headline → body → CTA
     • Framer Motion whileInView stagger — unhurried, unhurried, unhurried
   ─────────────────────────────────────────────────────────────────────────── */

import { motion }    from "framer-motion";
import { useT } from "@/lib/locale-context";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.9, ease: EASE, delay },
});


export default function ClosingCTA() {
  const copy       = useT().closingCta;

  return (
    <section
      id="contact"
      aria-label="Contact invitation"
      className="bg-[#111F30] lg:bg-transparent"
      style={{
        position:   "relative",
        overflow:   "hidden",
        borderTop:  "1px solid rgba(255,255,255,0.28)",
      }}
    >
      <div
        className="container-site"
        style={{
          position:      "relative",
          zIndex:        1,
          paddingTop:    "clamp(7rem, 11vw, 10rem)",
          paddingBottom: "clamp(10rem, 18vw, 15rem)",
        }}
      >
        {/* ── Centred column ────────────────────────────────── */}
        <div
          className="mx-auto flex flex-col items-center text-center"
          style={{ maxWidth: "680px" }}
        >
          {/* Headline */}
          <motion.h2
            {...fadeUp(0.07)}
            className="font-normal mb-12"
            style={{
              color:         "rgba(250,250,248,0.95)",
              fontSize:      "clamp(2.25rem, 5vw, 3.5rem)",
              letterSpacing: "-0.025em",
              lineHeight:    1.12,
            }}
          >
            {copy.headline}
          </motion.h2>

          {/* CTA button — glassmorphism */}
          <motion.div {...fadeUp(0.22)}>
            <a
              href="/contact"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                minWidth:       "220px",
                padding:        "0.875rem 2rem",
                borderRadius:   "50px",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                background:     "rgba(255,255,255,0.12)",
                border:         "1px solid rgba(255,255,255,0.22)",
                color:          "rgba(255,255,255,0.9)",
                fontSize:       "0.875rem",
                fontWeight:     500,
                letterSpacing:  "0.04em",
                textTransform:  "uppercase",
                textDecoration: "none",
                transition:     "background 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
            >
              {copy.cta}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
