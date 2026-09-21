import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export interface Banner {
  id: string;
  image_url: string;
  alt_text: string;
}

export const FALLBACK_BANNERS: Banner[] = [
  {
    id: "fallback",
    image_url: "/images/hero-investments.jpg",
    alt_text: "Your Investments Still Matter - Vitt Management",
  },
];

// Active banners in display order. Falls back to the static image if the DB is empty or unreachable.
export async function getActiveBanners(): Promise<Banner[]> {
  try {
    const { data, error } = await createAdminClient()
      .from("hero_banners")
      .select("id, image_url, alt_text")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return FALLBACK_BANNERS;
    return data;
  } catch {
    return FALLBACK_BANNERS;
  }
}
