// One-time: upload the initial hero banner images to Storage and register them in hero_banners.
// Usage: node scripts/seed-banners.mjs <image1> <image2> ...
import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])
);
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const TYPES = { ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".avif": "image/avif" };
const alts = [
  "Old share certificates with a magnifying glass beside a book reading Your Investments Still Matter",
  "A pile of unclaimed shares and old documents turning into an organised portfolio",
  "A box of lost investments beside a laptop showing recovered assets",
];

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Usage: node scripts/seed-banners.mjs <image files...>");
  process.exit(1);
}

const { count } = await db.from("hero_banners").select("*", { count: "exact", head: true });
let order = count ?? 0;

for (const [i, file] of files.entries()) {
  const ext = extname(file).toLowerCase();
  const type = TYPES[ext];
  if (!type) throw new Error(`Unsupported file type: ${file}`);
  const path = `${randomUUID()}.${ext === ".jpeg" ? "jpg" : ext.slice(1)}`;

  const up = await db.storage.from("banners").upload(path, readFileSync(file), { contentType: type });
  if (up.error) throw new Error(`Upload failed for ${basename(file)}: ${up.error.message}`);

  const ins = await db.from("hero_banners").insert({
    image_path: path,
    image_url: db.storage.from("banners").getPublicUrl(path).data.publicUrl,
    alt_text: alts[i] ?? "",
    sort_order: order++,
  });
  if (ins.error) throw new Error(`DB insert failed: ${ins.error.message}`);
  console.log(`Added ${basename(file)} -> ${path}`);
}
