import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export interface ServiceSummary {
  slug: string;
  title: string;
  short_description: string;
  image_url: string | null;
}

export interface Service extends ServiceSummary {
  tagline: string;
  overview: string;
  who_for: string[];
  how_we_help: { title: string; description: string }[];
  documents: string[];
  faqs: { question: string; answer: string }[];
}

// Active services in display order. Throws on a database error so a bad fetch fails loudly
// (a failed build or a kept-stale page) instead of publishing a site with no services.
export async function getServices(): Promise<ServiceSummary[]> {
  const { data, error } = await createAdminClient()
    .from("services")
    .select("slug, title, short_description, image_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Could not load services: ${error.message}`);
  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await createAdminClient()
    .from("services")
    .select("slug, title, short_description, image_url, tagline, overview, who_for, how_we_help, documents, faqs")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw new Error(`Could not load service "${slug}": ${error.message}`);
  return (data as Service | null) ?? null;
}
