"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export interface BlogActionState {
  ok: boolean;
  error?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function saveBlog(
  id: string | null,
  formData: FormData
): Promise<BlogActionState> {
  const title = (formData.get("title") as string)?.trim() ?? "";
  const customSlug = (formData.get("slug") as string)?.trim() ?? "";
  const excerpt = (formData.get("excerpt") as string)?.trim() ?? "";
  const content = (formData.get("content") as string)?.trim() ?? "";
  const category = (formData.get("category") as string)?.trim() ?? "IEPF Recovery";
  const author = (formData.get("author") as string)?.trim() ?? "Vitt Legal Desk";
  const imageUrl = (formData.get("image_url") as string)?.trim() || null;
  const readTime = (formData.get("read_time") as string)?.trim() || "5 min read";
  const isPublished = formData.get("is_published") === "on";
  const isFeatured = formData.get("is_featured") === "on";
  const metaTitle = (formData.get("meta_title") as string)?.trim() || null;
  const metaDescription = (formData.get("meta_description") as string)?.trim() || null;

  if (!title) {
    return { ok: false, error: "Blog title is required." };
  }

  const slug = customSlug ? slugify(customSlug) : slugify(title);
  if (!slug) {
    return { ok: false, error: "A valid URL slug could not be generated." };
  }

  const payload = {
    title,
    slug,
    excerpt,
    content,
    category,
    author,
    image_url: imageUrl,
    read_time: readTime,
    is_published: isPublished,
    is_featured: isFeatured,
    meta_title: metaTitle,
    meta_description: metaDescription,
  };

  const supabase = createAdminClient();

  if (id) {
    const { error } = await supabase
      .from("blogs")
      .update(payload)
      .eq("id", id);

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Another blog post already exists with this slug. Please change the slug." };
      }
      return { ok: false, error: error.message };
    }
  } else {
    const { error } = await supabase.from("blogs").insert([payload]);
    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "A blog post already exists with this slug. Please change the slug." };
      }
      return { ok: false, error: error.message };
    }
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return { ok: true };
}

export async function deleteBlog(id: string): Promise<BlogActionState> {
  const { error } = await createAdminClient().from("blogs").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  return { ok: true };
}

export async function setBlogPublished(
  id: string,
  isPublished: boolean
): Promise<BlogActionState> {
  const { error } = await createAdminClient()
    .from("blogs")
    .update({ is_published: isPublished })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  return { ok: true };
}

export async function setBlogFeatured(
  id: string,
  isFeatured: boolean
): Promise<BlogActionState> {
  const { error } = await createAdminClient()
    .from("blogs")
    .update({ is_featured: isFeatured })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  return { ok: true };
}
