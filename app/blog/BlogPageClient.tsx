"use client";

import React from "react";
import Image from "next/image";
import Link  from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer     from "@/components/layout/Footer";
import { useLocale } from "@/lib/locale-context";

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

type BlogPost = {
  id: string; title: string; date: string; excerpt: string;
  body: string; image?: string; slug: string; linkedinUrl?: string;
};

function formatDate(dateStr: string, locale: string) {
  const tag = locale === "en" ? "en-US" : locale === "de" ? "de-DE" : "es-UY";
  return new Date(dateStr).toLocaleDateString(tag, {
    year: "numeric", month: "long", day: "numeric",
  });
}

function BlogCard({ post, readLabel, locale }: { post: BlogPost; readLabel: string; locale: string }) {
  return (
    <Link href={`/blog/${post.id}`} style={{ textDecoration: "none", display: "flex", height: "100%" }}>
      <motion.article
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.55, ease: EASE }}
        whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE } }}
        className="group flex flex-col bg-surface-card"
        style={{ cursor: "pointer", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: "100%" }}
      >
        {post.image ? (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              quality={85}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div
            className="w-full"
            style={{ aspectRatio: "16 / 10", background: "linear-gradient(135deg, #1A2530 0%, #2C3E50 100%)" }}
          />
        )}

        <div className="flex flex-col flex-grow" style={{ padding: "1.75rem 1.75rem 2rem" }}>
          <span
            style={{ fontSize: "0.7rem", color: "rgba(31,41,51,0.4)", letterSpacing: "0.06em", marginBottom: "0.75rem", display: "block" }}
          >
            {formatDate(post.date, locale)}
          </span>

          <h3
            className="font-normal text-ink mb-3 leading-snug"
            style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)", letterSpacing: "-0.015em", lineHeight: 1.3 }}
          >
            {post.title}
          </h3>

          <span
            aria-hidden="true"
            className="block mb-4"
            style={{ height: 1, width: "2.5rem", backgroundColor: "rgba(31,41,51,0.1)" }}
          />

          <p
            className="text-small text-ink-subtle leading-relaxed flex-grow"
            style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {post.excerpt}
          </p>

          <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(31,41,51,0.07)" }}>
            <span
              className="inline-flex items-center gap-1.5 text-eyebrow group-hover:gap-2.5 transition-all duration-300"
              style={{ color: "var(--color-warm)", fontSize: "0.7rem", letterSpacing: "0.08em" }}
            >
              {readLabel}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function MobileBlogCard({ post, readLabel, locale }: { post: BlogPost; readLabel: string; locale: string }) {
  return (
    <Link href={`/blog/${post.id}`} style={{ textDecoration: "none", display: "block" }}>
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{ borderRadius: 12, overflow: "hidden", background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: "pointer" }}
      >
        {post.image ? (
          <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
            <Image src={post.image} alt={post.title} fill quality={80} className="object-cover object-center" sizes="50vw" />
          </div>
        ) : (
          <div style={{ aspectRatio: "1 / 1", background: "linear-gradient(135deg, #1A2530 0%, #2C3E50 100%)" }} />
        )}
        <div style={{ padding: "0.75rem 0.85rem 1rem" }}>
          <span style={{ fontSize: "0.62rem", color: "rgba(31,41,51,0.4)", letterSpacing: "0.05em", display: "block", marginBottom: "0.2rem" }}>
            {formatDate(post.date, locale)}
          </span>
          <h3 style={{
            fontSize: "0.82rem", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3,
            color: "var(--color-ink)", marginBottom: "0.35rem",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.title}
          </h3>
          <span style={{ marginTop: "0.4rem", display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "var(--color-warm)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
            {readLabel}
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const { locale } = useLocale();

  const eyebrow   = locale === "de" ? "Einblicke" : "Insights";
  const headline  = "Blog";
  const subtitle  = locale === "de"
    ? "Perspektiven des Sacramentum-Teams zur Investitionslandschaft, Immobilien und strategischer Verlagerung nach Uruguay."
    : "Perspectives on Uruguay's investment landscape, real estate, and strategic relocation from the Sacramentum team.";
  const readLabel = locale === "de" ? "BEITRAG LESEN" : "READ POST";
  const emptyMsg  = locale === "de" ? "Noch keine Beiträge — bald verfügbar." : "No posts yet — check back soon.";

  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
                  <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{eyebrow}</span>
                </motion.div>
                <motion.h1
                  {...fadeUp(0.06)}
                  className="font-normal text-ink"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
                >
                  {headline}
                </motion.h1>
              </div>
              <motion.p {...fadeUp(0.12)} className="text-body text-ink-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
                {subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        <div className="container-site">
          <div style={{ height: 1, backgroundColor: "rgba(31,41,51,0.08)" }} />
        </div>

        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(2.5rem, 4vw, 3.5rem)", paddingBottom: "clamp(5rem, 9vw, 8rem)" }}>
          <div className="container-site">
            {sorted.length === 0 ? (
              <p style={{ color: "rgba(31,41,51,0.35)", fontSize: "0.9rem", paddingTop: "3rem" }}>{emptyMsg}</p>
            ) : (
              <>
                {/* Mobile */}
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="sm:hidden grid grid-cols-2 gap-3">
                    {sorted.map(post => (
                      <MobileBlogCard key={post.id} post={post} readLabel={readLabel} locale={locale} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Desktop */}
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10" style={{ alignItems: "stretch" }}>
                    {sorted.map(post => (
                      <BlogCard key={post.id} post={post} readLabel={readLabel} locale={locale} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
