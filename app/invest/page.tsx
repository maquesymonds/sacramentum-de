import type { Metadata } from "next";
import InvestPageClient from "./InvestPageClient";

export const metadata: Metadata = {
  title: "Invest in Uruguay",
  description:
    "Discover Uruguay's most compelling investment sectors — real estate, technology, agriculture, and special situations. Premium advisory for discerning investors.",
  openGraph: {
    title: "Invest in Uruguay | Sacramentum Advisors",
    description:
      "Four asset classes. One stable sovereign. Premium advisory for strategic acquisition in Latin America's most trusted market.",
  },
};

export default function InvestPage() {
  return <InvestPageClient />;
}
