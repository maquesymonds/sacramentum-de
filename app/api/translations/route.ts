import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

const BLOB_PREFIX = "admin/translations";

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({});
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 10 });
    if (!blobs.length) return NextResponse.json({});
    const newest = blobs.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const res = await fetch(newest.url, { cache: "no-store" });
    if (res.ok) {
      return NextResponse.json(await res.json(), {
        headers: { "Cache-Control": "no-store, max-age=0" },
      });
    }
  } catch {}
  return NextResponse.json({}, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
