/* ─────────────────────────────────────────────────────────────────────────────
   /contact — Private Consultation page
   Server component: owns the <head> metadata.
   All interactive UI lives in ContactPageClient (client component).
   ─────────────────────────────────────────────────────────────────────────── */

import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title:       "Private Consultation",
  description: "Connect with the Sacramentum Advisors team to discuss residency, strategic asset acquisition, lifestyle assets, or long-term positioning in Uruguay.",
  robots: {
    index:  false, // intake page — intentionally unlisted
    follow: false,
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
