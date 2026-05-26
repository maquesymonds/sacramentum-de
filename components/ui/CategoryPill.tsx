/* ─────────────────────────────────────────────────────────────────────────────
   CategoryPill — reusable category label
   Used in: NewsGrid section, future News filter page, article cards
   ─────────────────────────────────────────────────────────────────────────── */

interface CategoryPillProps {
  /** Category string, e.g. "Economy", "Lifestyle", "Investment" */
  category:  string;
  className?: string;
}

// ── Color map — extend as new categories are added ────────────────────────────
const PILL_COLORS: Record<string, { bg: string; color: string }> = {
  // EN
  Economy:    { bg: "rgba(204,168,124,0.13)", color: "var(--color-warm)"       },
  Lifestyle:  { bg: "rgba(129,166,176,0.13)", color: "var(--color-blue)"       },
  Investment: { bg: "rgba(170,164,98,0.13)",  color: "var(--color-olive)"      },
  // ES
  "Economía":         { bg: "rgba(204,168,124,0.13)", color: "var(--color-warm)"  },
  "Estilo de Vida":   { bg: "rgba(129,166,176,0.13)", color: "var(--color-blue)"  },
  "Inversión":        { bg: "rgba(170,164,98,0.13)",  color: "var(--color-olive)" },
};

const DEFAULT_PILL = { bg: "rgba(31,41,51,0.07)", color: "var(--color-ink-muted)" };

export default function CategoryPill({ category, className = "" }: CategoryPillProps) {
  const { bg, color } = PILL_COLORS[category] ?? DEFAULT_PILL;

  return (
    <span
      className={className}
      style={{
        display:         "inline-block",
        backgroundColor: bg,
        color,
        padding:         "0.28em 0.85em",
        borderRadius:    "9999px",
        fontSize:        "0.65rem",
        fontWeight:      500,
        letterSpacing:   "0.1em",
        textTransform:   "uppercase",
        lineHeight:      1.6,
        whiteSpace:      "nowrap",
      }}
    >
      {category}
    </span>
  );
}
