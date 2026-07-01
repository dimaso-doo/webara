import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const submissionsPath = path.join(process.cwd(), "content", "contact-submissions.json");

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: String(payload.name),
    email: String(payload.email),
    phone: payload.phone ? String(payload.phone) : "",
    message: String(payload.message)
  };

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("contact_submissions").insert(submission);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  let existing: unknown[] = [];

  try {
    existing = JSON.parse(await fs.readFile(submissionsPath, "utf8")) as unknown[];
  } catch {
    existing = [];
  }

  await fs.writeFile(submissionsPath, `${JSON.stringify([submission, ...existing], null, 2)}\n`, "utf8");

  return NextResponse.json({ ok: true });
}
