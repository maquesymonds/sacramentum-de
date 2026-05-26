import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const maxDuration = 120; // allow up to 2 min for large video uploads

const MAX_BYTES = 200 * 1024 * 1024; // 200 MB

function isAuth(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "1";
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (!file.type.startsWith("video/")) return NextResponse.json({ error: "Nur Videos erlaubt" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Das Video überschreitet das Limit von 200 MB" }, { status: 400 });

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return NextResponse.json({ error: "Blob-Speicher nicht konfiguriert" }, { status: 503 });

    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "mp4";
    const filename = `uploads/videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const blob     = await put(filename, file, { access: "public", token });
    return NextResponse.json({ url: blob.url });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
