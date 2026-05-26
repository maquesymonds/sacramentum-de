import fs from "fs";
import path from "path";
import { t } from "@/data/translations";
import { list } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";

const CONTENT_FILE = path.join(process.cwd(), "data/admin-content.json");

export type InlineImage = {
  url:            string;
  afterParagraph: number; // 0 = before first paragraph, 1 = after §1, etc.
  caption?:       string;
};

export type AdminArticle = {
  id:         string;
  image:      string;
  title:      string;
  link?:      string;
  published?: boolean; // undefined = published (backwards compat), false = draft
  category?:  string;
  excerpt?:   string;
  slug?:      string;
  date?:      string;
};

export type AdminTeamMember = {
  id: string;
  image: string;
  name: string;
  role: string;
  bio: string;
  hidden?: boolean;
  group?: "leadership" | "advisory";
};

export type AdminCategory = {
  id:    string;
  label: string;
  color: string;
};

export const DEFAULT_CATEGORIES: AdminCategory[] = [
  { id: "economy",    label: "Economy",    color: "#2980B9" },
  { id: "lifestyle",  label: "Lifestyle",  color: "#27AE60" },
  { id: "investment", label: "Investment", color: "#8E44AD" },
];

export type AdminBlogPost = {
  id:           string;
  title:        string;
  date:         string;
  excerpt:      string;
  body:         string;
  image?:       string;
  slug:         string;
  linkedinUrl?: string;
  published?:   boolean; // undefined = published (backwards compat), false = draft
  video?:       string;
};

export type AdminContent = {
  articles?:   AdminArticle[];
  team?:       AdminTeamMember[];
  categories?: AdminCategory[];
  blog?:       AdminBlogPost[];
  olasTop?:    number;
  olasHeight?: number;
};

export function readAdminContent(): AdminContent {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Object.keys(parsed).length > 0) return parsed;
    }
  } catch {}
  return {};
}

// Async version — reads from Vercel Blob on production, falls back to disk locally
export async function fetchAdminContent(): Promise<AdminContent> {
  noStore();
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "admin/content", limit: 500 });
      if (blobs.length) {
        const newest = blobs.sort((a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0];
        const res = await fetch(`${newest.url}?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) return await res.json();
      }
    } catch {}
  }
  return readAdminContent();
}

export function getAdminArticles(): AdminArticle[] | null {
  const content = readAdminContent();
  return content.articles ?? null;
}

export function getFullAdminContent(): AdminContent {
  const saved = readAdminContent();
  const en = t("en");
  const allMembers: AdminTeamMember[] = [
    ...(en.team.leadership as AdminTeamMember[]).map(m => ({ ...m, group: "leadership" as const })),
    ...(en.team.advisory.members as AdminTeamMember[]).map(m => ({ ...m, group: "advisory" as const })),
  ];

  const team = saved.team
    ? saved.team.map(m => {
        if (m.group) return m;
        const defaultGroup = allMembers.find(am => am.id === m.id)?.group;
        return { ...m, group: defaultGroup ?? "advisory" as const };
      })
    : allMembers;

  return {
    articles:   saved.articles   ?? (en.news.articles as AdminArticle[]),
    team,
    categories: saved.categories ?? DEFAULT_CATEGORIES,
    blog:       saved.blog       ?? [],
  };
}

export function getAdminTeam(): AdminTeamMember[] | null {
  const content = readAdminContent();
  return content.team ?? null;
}
