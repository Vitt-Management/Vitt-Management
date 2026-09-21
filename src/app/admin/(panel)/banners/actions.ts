"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "banners";
const MAX_BYTES = 5 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const PATH_RE = /^[0-9a-f-]{36}\.(jpg|png|webp|avif)$/;

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/banners");
  revalidatePath("/admin");
}

// Step 1: issue a one-time signed upload URL so the browser can upload the file straight
// to Storage (avoids the server-action body-size limit).
export async function createUploadUrl(contentType: string, size: number): Promise<Result<{ path: string; token: string }>> {
  await requireAdmin();
  const ext = EXT_BY_TYPE[contentType];
  if (!ext) return { ok: false, error: "Please choose a JPG, PNG, WebP or AVIF image." };
  if (!(size > 0) || size > MAX_BYTES) return { ok: false, error: "Image must be 5 MB or smaller." };

  const path = `${crypto.randomUUID()}.${ext}`;
  const { data, error } = await createAdminClient().storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) return { ok: false, error: "Could not start the upload. Please try again." };
  return { ok: true, path, token: data.token };
}

// Step 2: after the upload, register the image as a banner (added last, active).
export async function addBanner(path: string, altText: string): Promise<Result> {
  await requireAdmin();
  if (!PATH_RE.test(path)) return { ok: false, error: "Invalid image." };
  const alt = altText.trim().slice(0, 200);

  const db = createAdminClient();
  const { data: exists } = await db.storage.from(BUCKET).exists(path);
  if (!exists) return { ok: false, error: "The upload did not finish. Please try again." };

  const { data: last } = await db.from("hero_banners").select("sort_order").order("sort_order", { ascending: false }).limit(1);
  const { error } = await db.from("hero_banners").insert({
    image_path: path,
    image_url: db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl,
    alt_text: alt,
    sort_order: (last?.[0]?.sort_order ?? -1) + 1,
  });
  if (error) return { ok: false, error: "Could not save the banner." };
  refresh();
  return { ok: true };
}

export async function updateBanner(id: string, altText: string, isActive: boolean): Promise<Result> {
  await requireAdmin();
  const { error } = await createAdminClient()
    .from("hero_banners")
    .update({ alt_text: altText.trim().slice(0, 200), is_active: isActive })
    .eq("id", id);
  if (error) return { ok: false, error: "Could not update the banner." };
  refresh();
  return { ok: true };
}

// Swap display order with the neighbouring banner.
export async function moveBanner(id: string, direction: "up" | "down"): Promise<Result> {
  await requireAdmin();
  const db = createAdminClient();
  const { data: rows, error } = await db.from("hero_banners").select("id, sort_order").order("sort_order").order("created_at");
  if (error || !rows) return { ok: false, error: "Could not reorder." };

  const i = rows.findIndex((r) => r.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= rows.length) return { ok: true };

  // Renumber everything 0..n-1 with the two swapped, so duplicate sort_order values can't stick.
  const ids = rows.map((r) => r.id);
  [ids[i], ids[j]] = [ids[j], ids[i]];
  const results = await Promise.all(ids.map((rid, idx) => db.from("hero_banners").update({ sort_order: idx }).eq("id", rid)));
  if (results.some((r) => r.error)) return { ok: false, error: "Could not reorder." };
  refresh();
  return { ok: true };
}

export async function deleteBanner(id: string): Promise<Result> {
  await requireAdmin();
  const db = createAdminClient();
  const { data: row } = await db.from("hero_banners").select("image_path").eq("id", id).single();
  const { error } = await db.from("hero_banners").delete().eq("id", id);
  if (error) return { ok: false, error: "Could not delete the banner." };
  if (row?.image_path) await db.storage.from(BUCKET).remove([row.image_path]);
  refresh();
  return { ok: true };
}
