import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import BannerManager, { type BannerRow } from "./BannerManager";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
  await requireAdmin();
  const { data } = await createAdminClient()
    .from("hero_banners")
    .select("id, image_url, alt_text, is_active")
    .order("sort_order")
    .order("created_at");

  return (
    <>
      <h1 className="admin-title">Home page banners</h1>
      <p className="admin-sub">
        These images rotate on the home page banner in the order shown below. Hidden banners are not shown on the website.
      </p>
      <BannerManager banners={(data ?? []) as BannerRow[]} />
    </>
  );
}
