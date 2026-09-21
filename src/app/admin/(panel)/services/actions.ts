"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "banners"; // shared public image bucket; service images live under services/
const MAX_BYTES = 5 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const IMAGE_PATH_RE = /^services\/[0-9a-f-]{36}\.(jpg|png|webp|avif)$/;
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface ServiceInput {
  title: string;
  slug: string;
  short_description: string;
  tagline: string;
  overview: string;
  who_for: string[];
  documents: string[];
  how_we_help: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  is_active: boolean;
  new_image_path?: string;
}

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

// Service content shows in the navbar, footer, home page and detail pages.
function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/services");
  revalidatePath("/admin");
}

const storagePathFromUrl = (url: string | null) => {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url ? url.indexOf(marker) : -1;
  return url && i >= 0 ? url.slice(i + marker.length) : null;
};

const tooLong = (v: string, max: number) => v.length > max;

function validate(input: ServiceInput): { error: string } | { value: Omit<ServiceInput, "new_image_path"> } {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const list = (v: unknown) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);

  const title = str(input.title);
  const slug = str(input.slug).toLowerCase();
  const short_description = str(input.short_description);
  const tagline = str(input.tagline);
  const overview = typeof input.overview === "string" ? input.overview.replace(/\r\n/g, "\n").trim() : "";
  const who_for = list(input.who_for);
  const documents = list(input.documents);
  const how_we_help = (Array.isArray(input.how_we_help) ? input.how_we_help : [])
    .map((s) => ({ title: str(s?.title), description: str(s?.description) }))
    .filter((s) => s.title || s.description);
  const faqs = (Array.isArray(input.faqs) ? input.faqs : [])
    .map((f) => ({ question: str(f?.question), answer: str(f?.answer) }))
    .filter((f) => f.question || f.answer);

  if (!title) return { error: "Please enter a title." };
  if (tooLong(title, 200)) return { error: "The title is too long (max 200 characters)." };
  if (!slug || !SLUG_RE.test(slug) || tooLong(slug, 100)) return { error: "The page address can only use lowercase letters, numbers and single hyphens." };
  if (tooLong(short_description, 400)) return { error: "The card text is too long (max 400 characters)." };
  if (tooLong(tagline, 300)) return { error: "The tagline is too long (max 300 characters)." };
  if (tooLong(overview, 20000)) return { error: "The overview is too long." };
  if (who_for.length > 30 || documents.length > 40 || how_we_help.length > 20 || faqs.length > 30) return { error: "Too many list items." };
  if ([...who_for, ...documents].some((v) => tooLong(v, 500))) return { error: "A list item is too long (max 500 characters)." };
  if (how_we_help.some((s) => !s.title || !s.description)) return { error: "Each step needs both a title and a description." };
  if (how_we_help.some((s) => tooLong(s.title, 200) || tooLong(s.description, 1000))) return { error: "A step is too long." };
  if (faqs.some((f) => !f.question || !f.answer)) return { error: "Each FAQ needs both a question and an answer." };
  if (faqs.some((f) => tooLong(f.question, 300) || tooLong(f.answer, 2000))) return { error: "An FAQ is too long." };

  return { value: { title, slug, short_description, tagline, overview, who_for, documents, how_we_help, faqs, is_active: !!input.is_active } };
}

// Signed upload URL so the browser uploads straight to Storage (avoids the server-action size limit).
export async function createServiceImageUpload(contentType: string, size: number): Promise<Result<{ path: string; token: string }>> {
  await requireAdmin();
  const ext = EXT_BY_TYPE[contentType];
  if (!ext) return { ok: false, error: "Please choose a JPG, PNG, WebP or AVIF image." };
  if (!(size > 0) || size > MAX_BYTES) return { ok: false, error: "Image must be 5 MB or smaller." };
  const path = `services/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await createAdminClient().storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) return { ok: false, error: "Could not start the upload. Please try again." };
  return { ok: true, path, token: data.token };
}

async function resolveNewImage(path: string | undefined): Promise<Result<{ url: string | null }>> {
  if (!path) return { ok: true, url: null };
  if (!IMAGE_PATH_RE.test(path)) return { ok: false, error: "Invalid image." };
  const db = createAdminClient();
  const { data: exists } = await db.storage.from(BUCKET).exists(path);
  if (!exists) return { ok: false, error: "The image upload did not finish. Please try again." };
  return { ok: true, url: db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl };
}

export async function createService(input: ServiceInput): Promise<Result<{ id: string }>> {
  await requireAdmin();
  const v = validate(input);
  if ("error" in v) return { ok: false, error: v.error };
  const img = await resolveNewImage(input.new_image_path);
  if (!img.ok) return img;

  const db = createAdminClient();
  const { data: last } = await db.from("services").select("sort_order").order("sort_order", { ascending: false }).limit(1);
  const { data, error } = await db
    .from("services")
    .insert({ ...v.value, image_url: img.url, sort_order: (last?.[0]?.sort_order ?? -1) + 1 })
    .select("id")
    .single();
  if (error) {
    return { ok: false, error: error.code === "23505" ? "Another service already uses that page address." : "Could not save the service." };
  }
  refresh();
  return { ok: true, id: data.id };
}

export async function updateService(id: string, input: ServiceInput): Promise<Result> {
  await requireAdmin();
  const v = validate(input);
  if ("error" in v) return { ok: false, error: v.error };
  const img = await resolveNewImage(input.new_image_path);
  if (!img.ok) return img;

  const db = createAdminClient();
  const { data: before } = await db.from("services").select("image_url").eq("id", id).maybeSingle();
  if (!before) return { ok: false, error: "That service no longer exists." };

  const { error } = await db
    .from("services")
    .update({ ...v.value, ...(img.url ? { image_url: img.url } : {}) })
    .eq("id", id);
  if (error) {
    return { ok: false, error: error.code === "23505" ? "Another service already uses that page address." : "Could not save the service." };
  }

  // Best effort: remove the replaced image from Storage (static /images files are left alone).
  const oldPath = img.url ? storagePathFromUrl(before.image_url) : null;
  if (oldPath) await db.storage.from(BUCKET).remove([oldPath]);
  refresh();
  return { ok: true };
}

export async function setServiceActive(id: string, isActive: boolean): Promise<Result> {
  await requireAdmin();
  const { error } = await createAdminClient().from("services").update({ is_active: isActive }).eq("id", id);
  if (error) return { ok: false, error: "Could not update the service." };
  refresh();
  return { ok: true };
}

export async function moveService(id: string, direction: "up" | "down"): Promise<Result> {
  await requireAdmin();
  const db = createAdminClient();
  const { data: rows, error } = await db.from("services").select("id").order("sort_order").order("created_at");
  if (error || !rows) return { ok: false, error: "Could not reorder." };

  const i = rows.findIndex((r) => r.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= rows.length) return { ok: true };

  const ids = rows.map((r) => r.id);
  [ids[i], ids[j]] = [ids[j], ids[i]];
  const results = await Promise.all(ids.map((rid, idx) => db.from("services").update({ sort_order: idx }).eq("id", rid)));
  if (results.some((r) => r.error)) return { ok: false, error: "Could not reorder." };
  refresh();
  return { ok: true };
}

export async function deleteService(id: string): Promise<Result> {
  await requireAdmin();
  const db = createAdminClient();
  const { data: row } = await db.from("services").select("image_url").eq("id", id).maybeSingle();
  const { error } = await db.from("services").delete().eq("id", id);
  if (error) return { ok: false, error: "Could not delete the service." };
  const path = storagePathFromUrl(row?.image_url ?? null);
  if (path) await db.storage.from(BUCKET).remove([path]);
  refresh();
  return { ok: true };
}
