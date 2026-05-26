"use client";

import Image      from "next/image";
import Link       from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer     from "@/components/layout/Footer";
import { useLocale } from "@/lib/locale-context";
import { motion }    from "framer-motion";
import { useEffect } from "react";
import { lenisRef }  from "@/lib/lenis-ref";

const EASE = [0.16, 1, 0.3, 1] as const;

type BlogPost = {
  id: string; title: string; date: string; excerpt: string;
  body: string; image?: string; slug: string; linkedinUrl?: string; video?: string;
};

function formatDate(dateStr: string, locale: string) {
  const tag = locale === "en" ? "en-US" : locale === "de" ? "de-DE" : "es-UY";
  return new Date(dateStr).toLocaleDateString(tag, {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function BlogPostPageClient({ post }: { post: BlogPost }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => lenis.scrollTo(0, { immediate: true }));
    }
  }, []);

  const { locale } = useLocale();

  const body = post.body
    ? post.body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    : [];

  const backLabel    = locale === "de" ? "Zurück zum Blog" : locale === "en" ? "Back to blog" : "Volver al blog";
  const linkedinText = locale === "de" ? "Originalbeitrag auf LinkedIn anzeigen" : locale === "en" ? "View original post on LinkedIn" : "Ver publicación original en LinkedIn";

  return (
    <>
      <Navigation />

      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        {post.image ? (
          <div style={{ width: "100%", height: "clamp(340px, 55vh, 620px)", position: "relative", overflow: "hidden" }}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              quality={90}
              priority
              className="object-cover object-center"
              style={{ filter: "brightness(0.82)" }}
              sizes="100vw"
            />
            <div
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.55) 100%)" }}
            />
          </div>
        ) : (
          <div style={{ width: "100%", height: "clamp(200px, 30vh, 340px)", background: "linear-gradient(135deg, #1A2530 0%, #2C3E50 100%)" }} />
        )}

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "var(--color-surface)", paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(5rem, 10vw, 9rem)" }}>
          <div className="container-site" style={{ maxWidth: "780px" }}>

            {/* Back */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: "2.5rem" }}
            >
              <Link
                href="/blog"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-warm)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {backLabel}
              </Link>
            </motion.div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              style={{ marginBottom: "1.5rem" }}
            >
              <span style={{ color: "rgba(31,41,51,0.4)", fontSize: "0.75rem", letterSpacing: "0.04em" }}>
                {formatDate(post.date, locale)}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="font-normal text-ink"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "2rem" }}
            >
              {post.title}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              style={{ height: 1, backgroundColor: "rgba(31,41,51,0.1)", marginBottom: "2.5rem", transformOrigin: "left" }}
            />

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
              style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)", lineHeight: 1.7, color: "var(--color-ink)", fontWeight: 450, marginBottom: "2rem" }}
            >
              {post.excerpt}
            </motion.p>

            {/* Video */}
            {post.video && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.28 }}
                style={{ marginBottom: "2.5rem", borderRadius: 12, overflow: "hidden", backgroundColor: "#000", aspectRatio: "16/9" }}
              >
                <video
                  src={post.video}
                  controls
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </motion.div>
            )}

            {/* Body */}
            {body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.08 }}
                style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.8, color: "rgba(31,41,51,0.75)", marginBottom: "1.5rem" }}
              >
                {para}
              </motion.p>
            ))}

            {/* LinkedIn link */}
            {post.linkedinUrl && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
                style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(31,41,51,0.08)" }}
              >
                <a
                  href={post.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-warm)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}
                >
                  {linkedinText}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
