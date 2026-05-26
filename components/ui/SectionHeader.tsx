"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   SectionHeader
   Reusable editorial section header:
     eyebrow — small uppercase label
     headline — large display text
     subheadline — body paragraph (optional)

   Props:
     align    — "left" | "center" (default "left")
     theme    — "light" | "dark"  (default "light")
     animate  — wire to useScrollReveal (default true)
   ─────────────────────────────────────────────────────────────────────────── */

import React from "react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?:    string;
  headline:    string;
  subheadline?: string;
  align?:      "left" | "center";
  theme?:      "light" | "dark";
  className?:  string;
  maxWidth?:   string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subheadline,
  align     = "left",
  theme     = "light",
  className,
  maxWidth  = "max-w-[640px]",
}: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  const isDark = theme === "dark";

  return (
    <div
      ref={ref}
      className={cn(
        "sr-hidden",
        align === "center" ? "text-center mx-auto" : "",
        maxWidth,
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-4 mb-5",
            align === "center" ? "justify-center" : ""
          )}
        >
          <span
            className="block h-px w-8 flex-shrink-0"
            style={{ backgroundColor: "var(--color-warm)" }}
          />
          <span
            className={cn(
              "text-eyebrow",
              isDark ? "text-brand-warm/80" : "text-brand-warm"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "text-h2 font-light mb-5",
          isDark ? "text-white" : "text-ink"
        )}
      >
        {headline}
      </h2>

      {subheadline && (
        <p
          className={cn(
            "text-body-lg font-light",
            isDark ? "text-white/65" : "text-ink-muted"
          )}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}
