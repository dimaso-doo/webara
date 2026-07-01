import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const content = JSON.parse(await readFile(new URL("../content/site.json", import.meta.url), "utf8"));
const supabase = createClient(url, serviceRoleKey, {
  auth: {
    persistSession: false
  }
});

const { error } = await supabase.from("site_content").upsert({
  key: "site",
  content,
  updated_at: new Date().toISOString()
});

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log("Seeded Supabase site_content row.");
