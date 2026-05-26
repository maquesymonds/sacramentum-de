import type { Metadata } from "next";
import { Suspense }       from "react";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "From market intelligence and transaction structuring to residency, local establishment, and long-term capital positioning — discover how Sacramentum Advisors supports every stage of your move into Uruguay.",
};

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesPageClient />
    </Suspense>
  );
}
