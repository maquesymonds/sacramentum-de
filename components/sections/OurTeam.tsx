"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useT } from "@/lib/locale-context";
import type { AdminTeamMember } from "@/lib/admin-content";
import { useCharReveal } from "@/hooks/useCharReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

// ── Unified person card (Inés/Pablo style for everyone) ───────────────────────
interface PersonCardProps {
  image:     string;
  name:      string;
  role:      string;
  bio:       string;
  index:     number;
  locale:    string;
  roleAbove?: boolean;
}

function PersonCard({ image, name, role, bio, index, locale, roleAbove }: PersonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const readMore = locale === "es" ? "Leer más" : locale === "de" ? "Mehr lesen" : "Read more";
  const readLess = locale === "es" ? "Leer menos" : locale === "de" ? "Weniger lesen" : "Read less";

  return (
    <motion.article {...fadeUp(index * 0.09)}>

      {/* ── Mobile compact card ── */}
      <div
        className="sm:hidden"
        style={{
          background:   "white",
          borderRadius: 16,
          boxShadow:    "0 2px 8px rgba(31,41,51,0.06), 0 8px 32px rgba(31,41,51,0.07)",
          overflow:     "hidden",
        }}
      >
        {/* Top row: image + name/role */}
        <div style={{ display: "flex", gap: "1rem", padding: "1.25rem 1.25rem 1rem" }}>
          <div style={{ position: "relative", width: 72, height: 88, flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
            <Image
              src={image} alt={name} fill quality={85}
              className="object-cover object-top"
              style={{ filter: "grayscale(100%) contrast(1.06) brightness(0.96)" }}
              sizes="72px"
            />
          </div>
          <div style={{ flex: 1, paddingTop: "0.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ display: "block", height: 1, width: "1.25rem", flexShrink: 0, backgroundColor: "var(--color-warm)" }} />
              <span className="text-eyebrow" style={{ color: "var(--color-warm)", fontSize: "0.6rem" }}>{role}</span>
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--color-ink)", margin: 0 }}>
              {name}
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "rgba(31,41,51,0.07)", marginLeft: "1.25rem", marginRight: "1.25rem" }} />

        {/* Bio */}
        <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
          <p
            style={expanded ? {
              fontSize:   "0.82rem",
              lineHeight: 1.65,
              color:      "var(--color-ink-muted)",
              margin:     0,
            } : {
              fontSize:        "0.82rem",
              lineHeight:      1.65,
              color:           "var(--color-ink-muted)",
              margin:          0,
              height:          "4.06rem", // exactly 3 lines: 3 × 0.82rem × 1.65
              overflow:        "hidden",
              display:         "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical" as const,
            }}
          >
            {bio}
          </p>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              marginTop:     "0.6rem",
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.3rem",
              color:         "var(--color-warm)",
              fontSize:      "0.68rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              fontWeight:    500,
              background:    "none",
              border:        "none",
              cursor:        "pointer",
              padding:       0,
              fontFamily:    "inherit",
            }}
          >
            {expanded ? readLess : readMore}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
              style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}>
              <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden sm:flex flex-col gap-4">
        {roleAbove && (
          <div className="flex items-center gap-3">
            <span className="block h-px w-7 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
            <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{role}</span>
          </div>
        )}
        <div className="grid gap-6 items-start" style={{ gridTemplateColumns: "180px 1fr" }}>
        <div className="relative overflow-hidden rounded-lg flex-shrink-0" style={{ aspectRatio: "3/4" }}>
          <Image src={image} alt={name} fill quality={90}
            className="object-cover object-top"
            style={{ filter: "grayscale(100%) contrast(1.06) brightness(0.96)" }}
            sizes="180px"
          />
        </div>
        <div className="flex flex-col pt-1" style={{ height: expanded ? "auto" : "240px", overflow: "hidden" }}>
          {!roleAbove && <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-7 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
            <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{role}</span>
          </div>}
          <h3 className="font-normal text-ink mb-3"
            style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            {name}
          </h3>
          <div
            className="text-ink-muted leading-relaxed"
            style={expanded ? {
              fontSize: "0.875rem", display: "flex", flexDirection: "column", gap: "0.75rem",
            } : {
              fontSize: "0.875rem", overflow: "hidden", flex: 1,
            }}
          >
            {bio.split("\n\n").map((para, i) => <p key={i} style={{ margin: 0 }}>{para}</p>)}
          </div>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              flexShrink: 0, marginTop: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.3rem",
              color: "var(--color-warm)", fontSize: "0.72rem", letterSpacing: "0.08em",
              textTransform: "uppercase" as const, fontWeight: 500,
              background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit",
            }}
          >
            {expanded ? readLess : readMore}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
              style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}>
              <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        </div>
      </div>

    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function OurTeam({ adminTeam }: { adminTeam?: AdminTeamMember[] | null }) {
  const { locale } = useLocale();
  const copy       = useT().team;

  const h1Ref = useRef<HTMLHeadingElement>(null);
  useCharReveal(h1Ref, copy.headline);

  const allTranslationIds = new Set([
    ...copy.leadership.map(m => m.id),
    ...copy.advisory.members.map(m => m.id),
  ]);

  const mergeGroup = (
    translationList: typeof copy.leadership,
    adminGroup: "leadership" | "advisory"
  ) => {
    const base = adminTeam
      ? translationList
          .map(m => {
            const override = adminTeam.find(a => a.id === m.id);
            if (override?.hidden) return null;
            // For Paulina (id "eleanor"), use translation as base.
            // Ignore stale blob data where name is still the old placeholder "Eleanor Parks".
            if (m.id === "eleanor") {
              if (!override || override.name === "Eleanor Parks") return m;
              return { ...m, name: override.name, role: override.role, bio: override.bio };
            }
            const adminImg = override?.image;
            const useAdminImg = adminImg && !adminImg.toLowerCase().includes("eleanor");
            return override ? { ...m, ...(useAdminImg ? { image: adminImg } : {}) } : m;
          })
          .filter(Boolean) as typeof translationList
      : translationList;

    // Only include truly new members (not in any translation list) with explicit group
    // Also deduplicate by name to guard against stale admin data with renamed entries
    const baseNames = new Set(base.map(m => m?.name?.trim().toLowerCase()).filter(Boolean));
    const extraFromAdmin = adminTeam
      ? adminTeam
          .filter(a => !a.hidden && a.group === adminGroup && !allTranslationIds.has(a.id))
          .map(a => ({ id: a.id, image: a.image, name: a.name, role: a.role, bio: a.bio }))
          .filter(a => !baseNames.has(a.name?.trim().toLowerCase()))
      : [];

    return [...base, ...extraFromAdmin];
  };

  const leadershipMembers = mergeGroup(copy.leadership, "leadership");
  const advisoryMembers   = mergeGroup(copy.advisory.members, "advisory");

  return (
    <section id="team" aria-label="Our Team" className="bg-surface section-padding" style={{ paddingBottom: "0.5rem" }}>
      <div className="container-site">

        {/* ── Our Team header ─────────────────────────────────────── */}
        <div
          className="grid lg:grid-cols-2 lg:items-end gap-10 pb-10 mb-12"
          style={{ borderBottom: "1px solid rgba(31,41,51,0.08)" }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
              <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{copy.eyebrow}</span>
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
        </div>

        {/* ── Leadership (Inés & Pablo) ────────────────────────────── */}
        {leadershipMembers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 mb-20">
            {leadershipMembers.map((person, i) => (
              <PersonCard key={person.id} image={person.image} name={person.name} role={person.role} bio={person.bio} index={i} locale={locale} />
            ))}
          </div>
        )}

        {/* ── Advisory Board ───────────────────────────────────────── */}
        {advisoryMembers.length > 0 && (
          <>
            <div
              className="pb-8 mb-12"
              style={{ borderBottom: "1px solid rgba(31,41,51,0.08)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="block h-px w-8 flex-shrink-0" style={{ backgroundColor: "var(--color-warm)" }} />
                <span className="text-eyebrow" style={{ color: "var(--color-warm)" }}>{copy.advisory.eyebrow}</span>
              </div>
              <h2 className="font-normal text-ink" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                {copy.advisory.headline}
              </h2>
              <p className="text-body text-ink-muted leading-relaxed mt-4" style={{ maxWidth: "60ch" }}>
                {copy.advisory.subheadline}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
              {advisoryMembers.map((person, i) => (
                <PersonCard key={person.id} image={person.image} name={person.name} role={person.role} bio={person.bio} index={i} locale={locale} roleAbove />
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
