import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { getFullAdminContent } from "@/lib/admin-content";
import { t } from "@/data/translations";

const BLOB_PREFIX  = "admin/content";
const CONTENT_FILE = path.join(process.cwd(), "data/admin-content.json");
const USE_BLOB     = !!process.env.BLOB_READ_WRITE_TOKEN;

function isAuth(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "1";
}

// Always get the most recently uploaded blob — never hits CDN cache
async function readFromBlob(): Promise<object | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 500 });
    if (!blobs.length) return null;
    // Sort by uploadedAt descending, take newest
    const newest = blobs.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const res = await fetch(`${newest.url}?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

function enrichTeamGroups(data: Record<string, unknown>): Record<string, unknown> {
  const en = t("en");
  const leadershipIds = new Set((en.team.leadership as { id: string }[]).map(m => m.id));
  const advisoryIds   = new Set((en.team.advisory.members as { id: string }[]).map(m => m.id));

  const team = data.team as ({ id: string; group?: string } | undefined)[] | undefined;
  if (!team) return data;

  return {
    ...data,
    team: team.map(m => {
      if (!m) return m;
      if (m.group) return m;
      if (leadershipIds.has(m.id)) return { ...m, group: "leadership" };
      if (advisoryIds.has(m.id))   return { ...m, group: "advisory" };
      return m;
    }),
  };
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (USE_BLOB) {
    const data = await readFromBlob();
    if (data) return NextResponse.json(enrichTeamGroups(data as Record<string, unknown>));
  }

  return NextResponse.json(getFullAdminContent());
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  if (USE_BLOB) {
    // Save with random suffix → brand new URL, CDN has never seen it
    const filename = `${BLOB_PREFIX}-${Date.now()}.json`;
    const newBlob = await put(filename, JSON.stringify(body, null, 2), {
      access:      "public",
      contentType: "application/json",
    });
    // Clean up old blobs — use the exact URL we just got back, not a timestamp
    // sort, to avoid a race where list() returns before the new blob is indexed
    try {
      const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 500 });
      const toDelete = blobs.filter(b => b.url !== newBlob.url);
      for (const blob of toDelete) {
        try { await del(blob.url); } catch {}
      }
    } catch {}
  } else {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(body, null, 2));
  }

  return NextResponse.json({ ok: true });
}
