import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const PASS = process.env.ADMIN_PASSWORD ?? "sacramentum2024";

  if (password !== PASS) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_auth", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
  });
  // Non-httpOnly cookie so client JS can detect admin UI mode
  res.cookies.set("admin_ui", "1", {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
  });
  return res;
}
