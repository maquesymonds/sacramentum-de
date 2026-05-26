import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

const BLOB_PREFIX = "admin/translations";
const USE_BLOB    = !!process.env.BLOB_READ_WRITE_TOKEN;

function isAuth(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "1";
}

async function readFromBlob(): Promise<object | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 10 });
    if (!blobs.length) return null;
    const newest = blobs.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const res = await fetch(newest.url, { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (USE_BLOB) {
    const data = await readFromBlob();
    if (data) return NextResponse.json(data);
  }
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  if (USE_BLOB) {
    const filename = `${BLOB_PREFIX}-${Date.now()}.json`;
    await put(filename, JSON.stringify(body, null, 2), {
      access:      "public",
      contentType: "application/json",
    });
    try {
      const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 20 });
      const toDelete = blobs
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
        .slice(1);
      if (toDelete.length) await del(toDelete.map(b => b.url));
    } catch {}
  }

  return NextResponse.json({ ok: true });
}
