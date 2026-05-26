import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colors ────────────────────────────────────────────────
      colors: {
        brand: {
          dark:  "#111F30",
          blue:  "#81A6B0",
          olive: "#AAA462",
          warm:  "#CCA87C",
        },
        surface: {
          DEFAULT: "#FAFAF8",
          muted:   "#F3F2EE",
          card:    "#FFFFFF",
        },
        ink: {
          DEFAULT: "#111F30",
          muted:   "#4A5568",
          subtle:  "#718096",
          ghost:   "#A0AEC0",
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      // Regola Pro ships: Regular (400) + Bold (700) + Oblique variants
      fontFamily: {
        sans:    ["var(--font-regola)", "Georgia", "serif"],
        display: ["var(--font-regola)", "Georgia", "serif"],
      },
      fontWeight: {
        light:    "400", // Regola has no 300 — light maps to Regular
        normal:   "400",
        medium:   "400",
        semibold: "700",
        bold:     "700",
      },
      fontSize: {
        "display-xl": ["4rem",    { lineHeight: "1.05", letterSpacing: "-0.03em" }], // 64px
        "display":    ["3.5rem",  { lineHeight: "1.05", letterSpacing: "-0.03em" }], // 56px — H1
        "h2":         ["2.5rem",  { lineHeight: "1.15", letterSpacing: "-0.02em" }], // 40px
        "h3":         ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }], // 28px
        "h4":         ["1.375rem",{ lineHeight: "1.3",  letterSpacing: "-0.01em" }], // 22px
        "body-lg":    ["1.25rem", { lineHeight: "1.65" }],                           // 20px
        "body":       ["1.125rem",{ lineHeight: "1.7"  }],                           // 18px
        "small":      ["0.875rem",{ lineHeight: "1.6"  }],                           // 14px
        "caption":    ["0.75rem", { lineHeight: "1.5",  letterSpacing: "0.06em" }],  // 12px
      },

      // ─── Spacing ─────────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },

      maxWidth: {
        "site":       "1440px",
        "prose-wide": "76ch",
        "prose":      "68ch",
      },

      // ─── Easing ──────────────────────────────────────────────────────
      transitionTimingFunction: {
        "premium":   "cubic-bezier(0.16, 1, 0.3, 1)",
        "soft-out":  "cubic-bezier(0.22, 1, 0.36, 1)",
        "editorial": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        "400":  "400ms",
        "600":  "600ms",
        "800":  "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
      },

      // ─── Keyframe Animations ─────────────────────────────────────────
      animation: {
        "fade-up":    "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":    "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-right":"slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        "card": "2px",
        "pill": "100px",
      },

      // ─── Shadows ─────────────────────────────────────────────────────
      boxShadow: {
        "card":    "0 1px 3px rgba(31,41,51,0.06), 0 8px 32px rgba(31,41,51,0.06)",
        "card-lg": "0 2px 8px rgba(31,41,51,0.06), 0 24px 64px rgba(31,41,51,0.10)",
        "nav":     "0 1px 0 rgba(31,41,51,0.08)",
        "glow":    "0 0 40px rgba(129,166,176,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
