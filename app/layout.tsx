/* ─────────────────────────────────────────────────────────────────────────────
   Root Layout — Sacramentum Advisors
   Font: Regola Pro (Regular + Bold + Oblique variants)
   ─────────────────────────────────────────────────────────────────────────── */

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LocaleProvider }      from "@/lib/locale-context";
import SmoothScrollProvider   from "@/components/layout/SmoothScrollProvider";
import { TransitionProvider } from "@/lib/transition-context";
import TransitionOverlay      from "@/components/layout/TransitionOverlay";
import Loader                 from "@/components/layout/Loader";

// ── Regola Pro ────────────────────────────────────────────────────────────────
const regola = localFont({
  src: [
    {
      path:   "../public/fonts/Regola Pro Regular.otf",
      weight: "400",
      style:  "normal",
    },
    {
      path:   "../public/fonts/Regola Pro Regular Oblique.otf",
      weight: "400",
      style:  "italic",
    },
    {
      path:   "../public/fonts/Regola Pro Bold.otf",
      weight: "700",
      style:  "normal",
    },
    {
      path:   "../public/fonts/Regola Pro Bold Oblique.otf",
      weight: "700",
      style:  "italic",
    },
  ],
  variable:           "--font-regola",
  display:            "swap",
  fallback:           ["Georgia", "Times New Roman", "serif"],
  preload:            true,
  adjustFontFallback: "Times New Roman",
});

// ── Site Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  "Sacramentum Advisors",
    template: "%s | Sacramentum Advisors",
  },
  description:
    "Principled leadership for strategic asset acquisition in Uruguay. Protect your capital through lifestyle assets in Latin America's most stable market.",
  keywords: [
    "Uruguay real estate",
    "strategic assets Latin America",
    "wealth advisory Uruguay",
    "asset acquisition Uruguay",
    "luxury property Uruguay",
    "agricultural land Uruguay",
  ],
  authors:  [{ name: "Sacramentum Advisors" }],
  openGraph: {
    type:        "website",
    locale:      "en_US",
    siteName:    "Sacramentum Advisors",
    title:       "Sacramentum Advisors",
    description: "Principled leadership for strategic asset acquisition in Uruguay.",
  },
  twitter: {
    card:  "summary_large_image",
    title: "Sacramentum Advisors",
  },
  robots: {
    index:  true,
    follow: true,
  },
  icons: {
    icon: "/favicon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor:   "#111F30",
  width:        "device-width",
  initialScale: 1,
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${regola.variable} antialiased`}>
        <SmoothScrollProvider>
          <TransitionProvider>
            <LocaleProvider>
              <Loader />
              <TransitionOverlay />
              {children}
            </LocaleProvider>
          </TransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
