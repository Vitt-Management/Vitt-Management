import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { BlogSummary, BlogItem } from "./blogs-shared";

export * from "./blogs-shared";

// Fetch all published blogs with optional category & limit
export async function getPublishedBlogs(options?: {
  category?: string;
  limit?: number;
}): Promise<BlogSummary[]> {
  let query = createAdminClient()
    .from("blogs")
    .select("id, slug, title, excerpt, category, author, image_url, read_time, is_published, is_featured, published_at, created_at")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false });

  if (options?.category && options.category !== "All") {
    query = query.eq("category", options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Failed to load published blogs:", error.message);
    return [];
  }
  return data ?? [];
}

// Fetch single blog by slug for public detail page
export async function getBlogBySlug(slug: string): Promise<BlogItem | null> {
  const { data, error } = await createAdminClient()
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error(`Failed to load blog "${slug}":`, error.message);
    return null;
  }
  return data ?? null;
}

// Fetch related blogs in same category
export async function getRelatedBlogs(currentSlug: string, category: string, limit = 3): Promise<BlogSummary[]> {
  const { data, error } = await createAdminClient()
    .from("blogs")
    .select("id, slug, title, excerpt, category, author, image_url, read_time, is_published, is_featured, published_at, created_at")
    .eq("is_published", true)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to load related blogs:", error.message);
    return [];
  }
  return data ?? [];
}

// Admin: Fetch all blogs (both published and drafts)
export async function getAllBlogsAdmin(): Promise<BlogSummary[]> {
  const { data, error } = await createAdminClient()
    .from("blogs")
    .select("id, slug, title, excerpt, category, author, image_url, read_time, is_published, is_featured, published_at, created_at")
    .order("published_at", { ascending: false });

  if (error) throw new Error(`Could not load blogs for admin: ${error.message}`);
  return data ?? [];
}

// Admin: Fetch single blog by ID for edit form
export async function getBlogByIdAdmin(id: string): Promise<BlogItem | null> {
  const { data, error } = await createAdminClient()
    .from("blogs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Could not load blog "${id}": ${error.message}`);
  return data ?? null;
}
