import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { fetchAdminContent } from "@/lib/admin-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Sacramentum Advisors",
  description: "Insights and perspectives from Sacramentum Advisors on Uruguay's investment landscape, real estate, and strategic relocation.",
};

export default async function BlogPage() {
  const content = await fetchAdminContent();
  const published = (content.blog ?? []).filter(p => p.published !== false);
  return <BlogPageClient posts={published} />;
}
