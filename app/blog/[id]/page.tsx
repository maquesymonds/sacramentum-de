import type { Metadata } from "next";
import { notFound }      from "next/navigation";
import BlogPostPageClient from "./BlogPostPageClient";
import { fetchAdminContent } from "@/lib/admin-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const content = await fetchAdminContent();
  const post    = (content.blog ?? []).find(p => p.id === params.id);
  if (!post) return {};
  return {
    title:       `${post.title} | Sacramentum Advisors`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const content = await fetchAdminContent();
  const posts   = content.blog ?? [];
  const post    = posts.find(p => p.id === params.id);

  if (!post) notFound();

  return <BlogPostPageClient post={post} />;
}
