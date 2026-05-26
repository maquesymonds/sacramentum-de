"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion }          from "framer-motion";
import { useT } from "@/lib/locale-context";
import { useRouter }       from "next/navigation";
import { useCharReveal }   from "@/hooks/useCharReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

type Article = { id: string; image: string; title: string; link?: string; category?: string; excerpt?: string; slug?: string; date?: string };

function ArticleCard({ article, visitLabel }: { article: Article; visitLabel: string }) {
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
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE } }}
      onMouseEnter={setPos}
      onMouseMove={setPos}
      onMouseLeave={() => setCursor(null)}
      style={{ cursor: href ? "none" : "default", borderRadius: 16, overflow: "hidden", width: "100%", backgroundColor: "#f0ede6" }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
            transform: cursor ? "scale(1.05)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
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

function MobileNewsCard({ article, visitLabel }: { article: Article; visitLabel: string }) {
  const href = article.link ?? null;

  const inner = (
    <article style={{ borderRadius: 12, overflow: "hidden", background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: href ? "pointer" : "default" }}>
      <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      </div>
      <div style={{ padding: "0.75rem 0.85rem 1rem" }}>
        <h3 style={{ fontSize: "0.82rem", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--color-ink)", margin: 0,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
          {article.title}
        </h3>
        {href && (
          <span style={{ marginTop: "0.5rem", display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "var(--color-warm)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 500 }}>
            {visitLabel}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>
    </article>
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

export default function UruguayInTheNews({ adminArticles }: { adminArticles?: Article[] | null }) {
  const copy       = useT().news;
  const router     = useRouter();

  const source        = (adminArticles ?? copy.articles) as Article[];
  const preview       = source.slice(0, 3);
  const mobilePreview = source.slice(0, 4);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useCharReveal(h1Ref, copy.headline);

  const visitLabel = copy.readArticle ?? "Visit article";

  return (
    <section id="news" aria-label="Uruguay News" className="section-padding" style={{ background: "linear-gradient(to bottom, var(--color-surface) 30%, transparent 75%)" }}>
      <div className="container-site">

        <div className="grid lg:grid-cols-2 lg:items-end gap-10 mb-16 pb-12" style={{ borderBottom: "1px solid rgba(31,41,51,0.08)" }}>
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
              <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{copy.eyebrow}</span>
            </div>
            <h1 key={copy.headline} ref={h1Ref} className="font-normal text-ink" style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}>{copy.headline}</h1>
          </div>
          <p className="text-body text-ink-muted leading-relaxed lg:pb-2">{copy.subtitle}</p>
        </div>

        {/* Mobile 2×2 grid */}
        <div className="sm:hidden grid grid-cols-2 gap-3 mb-10">
          {mobilePreview.map((article) => (
            <MobileNewsCard key={article.id} article={article} visitLabel={visitLabel} />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10" style={{ alignItems: "stretch" }}
        >
          {preview.map((article) => (
            <ArticleCard key={article.id} article={article} visitLabel={visitLabel} />
          ))}
        </motion.div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={() => router.push("/news")}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              justifyContent:"center",
              gap:           "0.5rem",
              minWidth:      "220px",
              padding:       "0.875rem 2rem",
              borderRadius:  "50px",
              background:    "#111F30",
              border:        "1px solid #111F30",
              color:         "white",
              fontSize:      "0.875rem",
              fontWeight:    500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              cursor:        "pointer",
              transition:    "background 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#1e2e40";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#111F30";
            }}
          >
            {copy.viewAll}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
