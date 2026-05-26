/* ─────────────────────────────────────────────────────────────────────────────
   Utility helpers
   ─────────────────────────────────────────────────────────────────────────── */

/** Merge class names (lightweight alternative to clsx for this project) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Pad a number with leading zeros */
export function padStart(n: number, length = 2): string {
  return String(n).padStart(length, "0");
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Format a date string to a locale-aware string */
export function formatDate(dateStr: string, locale: "en" | "es" = "en"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "es" ? "es-UY" : "en-US", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

/** Scroll smoothly to a section by id.
 *  Uses Lenis when available (smooth, editorial feel) with a native fallback. */
export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  import("@/lib/lenis-ref").then(({ lenisRef }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset:   0,
        duration: 1.4,
        easing:   (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
}
