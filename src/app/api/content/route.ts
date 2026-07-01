import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { isAdminLoggedIn } from "@/lib/auth";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getSiteContent());
}

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "You are not signed in." }, { status: 401 });
  }

  const content = (await request.json()) as SiteContent;
  await saveSiteContent(content);
  return NextResponse.json({ ok: true });
}
