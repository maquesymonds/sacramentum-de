"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence }  from "framer-motion";
import Navigation                   from "@/components/layout/Navigation";
import Footer                       from "@/components/layout/Footer";
import { useT } from "@/lib/locale-context";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.8, ease: EASE, delay },
});

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.75, ease: EASE, delay },
});

type AdminArticle = { id: string; image: string; title: string; link?: string; category?: string; excerpt?: string; slug?: string; date?: string };

function ArticleCard({ article, visitLabel }: { article: AdminArticle; visitLabel: string }) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const href = article.link ?? null;

  const setPos = (e: React.MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });

  const tooltip = cursor && typeof document !== "undefined"
    ? createPortal(
        <div style={{
          position: "fixed", left: cursor.x + 14, top: cursor.y,
          transform: "translateY(-50%)",
          pointerEvents: "none", zIndex: 9999,
          backgroundColor: "#111F30", color: "white",
          padding: "0.4rem 1rem", borderRadius: 50,
          fontSize: "0.7rem", fontWeight: 600,
          letterSpacing: "0.08em", textTransform: "uppercase",
          whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
          {visitLabel}
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>,
        document.body
      )
    : null;

  const inner = (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.55, ease: EASE }}
      onMouseEnter={setPos}
      onMouseMove={setPos}
      onMouseLeave={() => setCursor(null)}
      style={{ cursor: href ? "none" : "default", borderRadius: 16, overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: "100%", backgroundColor: "#f0ede6" }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
            transform: cursor ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </div>
      <div style={{ padding: "1.1rem 1.25rem 1.35rem" }}>
        <h3 style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.35,
          color: "var(--color-ink)", margin: 0,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
          {article.title}
        </h3>
      </div>
    </motion.article>
  );

  return (
    <>
      {tooltip}
      {href
        ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", height: "100%", cursor: "none" }}>{inner}</a>
        : <div style={{ display: "flex", height: "100%" }}>{inner}</div>
      }
    </>
  );
}

function MobileNewsCard({ article, visitLabel }: { article: AdminArticle; visitLabel: string }) {
  const href = article.link ?? null;

  const inner = (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      style={{ borderRadius: 12, overflow: "hidden", background: "white",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: href ? "pointer" : "default" }}
    >
      <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      </div>
      <div style={{ padding: "0.75rem 0.85rem 1rem" }}>
        <h3 style={{ fontSize: "0.82rem", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3,
          color: "var(--color-ink)", margin: 0,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
          {article.title}
        </h3>
        {href && (
          <span style={{ marginTop: "0.5rem", display: "inline-flex", alignItems: "center", gap: "0.3rem",
            color: "var(--color-warm)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 500 }}>
            {visitLabel}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>
    </motion.article>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}

export default function NewsPageClient({ adminArticles }: { adminArticles?: AdminArticle[] | null }) {
  const copy = useT().news;

  const articles: AdminArticle[] = adminArticles ?? (copy.articles as AdminArticle[]);

  return (
    <>
      <Navigation />
      <main>

        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(8rem, 14vw, 12rem)", paddingBottom: "clamp(3.5rem, 6vw, 5rem)" }}>
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
              <div>
                <motion.div {...fadeIn(0)} className="flex items-center gap-4 mb-6">
                  <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
                  <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{copy.eyebrow}</span>
                </motion.div>
                <motion.h1
                  {...fadeUp(0.06)}
                  className="font-normal text-ink"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
                >
                  {copy.headline}
                </motion.h1>
              </div>
              <motion.p {...fadeUp(0.12)} className="text-body text-ink-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
                {copy.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        <div className="container-site">
          <div style={{ height: 1, backgroundColor: "rgba(31,41,51,0.08)" }} />
        </div>

        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(2.5rem, 4vw, 3.5rem)", paddingBottom: "clamp(5rem, 9vw, 8rem)" }}>
          <div className="container-site">

            {/* Mobile: compact 2-col grid */}
            <AnimatePresence mode="popLayout">
              <motion.div layout className="sm:hidden grid grid-cols-2 gap-3">
                {articles.map(article => (
                  <MobileNewsCard key={article.id} article={article} visitLabel={copy.readArticle} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Tablet + desktop: full cards */}
            <AnimatePresence mode="popLayout">
              <motion.div layout className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10" style={{ alignItems: "stretch" }}>
                {articles.map(article => (
                  <ArticleCard key={article.id} article={article} visitLabel={copy.readArticle} />
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
