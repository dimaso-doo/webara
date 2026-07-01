import { NextResponse } from "next/server";
import { adminCookieName, adminToken, isAdminConfigured, isValidPassword } from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin is not configured. Set ADMIN_PASSWORD and AUTH_SECRET." },
      { status: 503 }
    );
  }

  const { password } = (await request.json()) as { password?: string };

  if (!password || !isValidPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
