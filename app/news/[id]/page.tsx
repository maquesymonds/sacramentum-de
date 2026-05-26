import type { Metadata } from "next";
import { notFound }      from "next/navigation";
import ArticlePageClient from "./ArticlePageClient";
import { t }             from "@/data/translations";
import { fetchAdminContent } from "@/lib/admin-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const content  = await fetchAdminContent();
  const articles = content.articles ?? (t("en").news.articles as { id: string; title: string; excerpt: string }[]);
  const article  = articles.find(a => a.id === params.id);
  if (!article) return {};
  return {
    title:       `${article.title} | Sacramentum Advisors`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const content       = await fetchAdminContent();
  const adminArticles = content.articles ?? null;
  const enArticles    = t("en").news.articles as { id: string }[];
  const allIds        = [
    ...enArticles.map(a => a.id),
    ...(adminArticles?.map(a => a.id) ?? []),
  ];

  if (!allIds.includes(params.id)) notFound();

  return <ArticlePageClient id={params.id} adminArticles={adminArticles} />;
}
