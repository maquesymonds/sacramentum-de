import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function isAuth(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "1";
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Nur Bilder erlaubt" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Das Bild überschreitet das Limit von 5 MB" }, { status: 400 });

    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (token) {
      const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const blob     = await put(filename, file, { access: "public", token });
      return NextResponse.json({ url: blob.url });
    }

    // Local dev fallback — not available on Vercel production
    if (process.env.NODE_ENV !== "production") {
      const UPLOAD_DIR = path.join(process.cwd(), "public/images/uploads");
      if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      fs.writeFileSync(path.join(UPLOAD_DIR, filename), Buffer.from(await file.arrayBuffer()));
      return NextResponse.json({ url: `/images/uploads/${filename}` });
    }

    return NextResponse.json(
      { error: "Blob storage not configured. Add BLOB_READ_WRITE_TOKEN to Vercel environment variables." },
      { status: 503 }
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[upload] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
