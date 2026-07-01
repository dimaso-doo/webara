import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "./types";
import { getSupabaseAdmin } from "./supabase";

const contentPath = path.join(process.cwd(), "content", "site.json");
const contentKey = "site";

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("key", contentKey)
      .single();

    if (!error && data?.content) {
      return data.content as SiteContent;
    }
  }

  const file = await fs.readFile(contentPath, "utf8");
  return JSON.parse(file) as SiteContent;
}

export async function saveSiteContent(content: SiteContent) {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("site_content").upsert({
      key: contentKey,
      content,
      updated_at: new Date().toISOString()
    });

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}
