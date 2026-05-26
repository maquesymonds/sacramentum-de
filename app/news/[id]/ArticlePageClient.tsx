"use client";

import Image       from "next/image";
import Link        from "next/link";
import Navigation  from "@/components/layout/Navigation";
import Footer      from "@/components/layout/Footer";
import CategoryPill from "@/components/ui/CategoryPill";
import { useLocale, useT } from "@/lib/locale-context";
import { articleBodies } from "@/data/article-bodies";
import { motion }    from "framer-motion";
import { useEffect }  from "react";
import { lenisRef }   from "@/lib/lenis-ref";

const EASE = [0.16, 1, 0.3, 1] as const;

type InlineImage = { url: string; afterParagraph: number; caption?: string };
type RawArticle = { id: string; image: string; category?: string; title: string; excerpt?: string; body?: string; slug?: string; date?: string; inlineImages?: InlineImage[]; link?: string };

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : locale === "de" ? "de-DE" : "es-UY", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function ArticlePageClient({
  id,
  adminArticles,
}: {
  id: string;
  adminArticles?: RawArticle[] | null;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      // Second call after a frame in case Lenis restores position after first call
      requestAnimationFrame(() => lenis.scrollTo(0, { immediate: true }));
    }
  }, []);

  const { locale } = useLocale();
  const copy       = useT().news;

  const source  = adminArticles ?? (copy.articles as RawArticle[]);
  const article = source.find(a => a.id === id) as RawArticle | undefined;

  if (!article) return null;

  // Admin-authored body: split on blank lines into paragraphs
  const body: string[] = article.body
    ? article.body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    : (articleBodies[id]?.[locale] ?? articleBodies[id]?.["en"] ?? []);

  return (
    <>
      <Navigation />

      <main>

        {/* ── Hero image ──────────────────────────────────────────────────── */}
        <div
          style={{
            width:    "100%",
            height:   "clamp(340px, 55vh, 620px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            quality={90}
            priority
            className="object-cover object-center"
            style={{ filter: "brightness(0.82)" }}
            sizes="100vw"
          />
          {/* Gradient overlay bottom */}
          <div
            aria-hidden="true"
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.55) 100%)",
            }}
          />
        </div>

        {/* ── Article body ────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            paddingTop:      "clamp(3rem, 6vw, 5rem)",
            paddingBottom:   "clamp(5rem, 10vw, 9rem)",
          }}
        >
          <div
            className="container-site"
            style={{ maxWidth: "780px" }}
          >

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: "2.5rem" }}
            >
              <Link
                href="/news"
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           "0.5rem",
                  color:         "var(--color-warm)",
                  fontSize:      "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight:    500,
                  textDecoration:"none",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {locale === "de" ? "Zurück zu den Nachrichten" : "Back to news"}
              </Link>
            </motion.div>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
            >
              {article.category && <CategoryPill category={article.category} />}
              {article.date && (
                <span
                  style={{
                    color:         "rgba(31,41,51,0.4)",
                    fontSize:      "0.75rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {formatDate(article.date, locale)}
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="font-normal text-ink"
              style={{
                fontSize:      "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
                lineHeight:    1.1,
                marginBottom:  "2rem",
              }}
            >
              {article.title}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              style={{
                height:          1,
                backgroundColor: "rgba(31,41,51,0.1)",
                marginBottom:    "2.5rem",
                transformOrigin: "left",
              }}
            />

            {/* Excerpt (lead) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
              style={{
                fontSize:     "clamp(1.05rem, 1.6vw, 1.2rem)",
                lineHeight:   1.7,
                color:        "var(--color-ink)",
                fontWeight:   450,
                marginBottom: "2rem",
              }}
            >
              {article.excerpt}
            </motion.p>

            {/* Body paragraphs + inline images */}
            {(() => {
              const inline = article.inlineImages ?? [];
              const imgsAt = (n: number) => inline.filter(img => img.afterParagraph === n);
              const renderImg = (img: InlineImage, key: string) => (
                <motion.figure
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  style={{ margin: "2rem 0", padding: 0 }}
                >
                  <div style={{ position: "relative", width: "100%", borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
                    <Image src={img.url} alt={img.caption ?? ""} fill quality={85} className="object-cover object-center" sizes="(max-width: 780px) 100vw, 780px" />
                  </div>
                  {img.caption && (
                    <figcaption style={{ marginTop: "0.6rem", fontSize: "0.78rem", color: "rgba(31,41,51,0.4)", textAlign: "center", fontStyle: "italic" }}>
                      {img.caption}
                    </figcaption>
                  )}
                </motion.figure>
              );

              const elements: React.ReactNode[] = [];
              // Images before paragraph 1 (afterParagraph === 0)
              imgsAt(0).forEach((img, j) => elements.push(renderImg(img, `pre-${j}`)));

              body.forEach((para, i) => {
                elements.push(
                  <motion.p
                    key={`p-${i}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.08 }}
                    style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.8, color: "rgba(31,41,51,0.75)", marginBottom: "1.5rem" }}
                  >
                    {para}
                  </motion.p>
                );
                imgsAt(i + 1).forEach((img, j) => elements.push(renderImg(img, `after-${i}-${j}`)));
              });
              return elements;
            })()}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
