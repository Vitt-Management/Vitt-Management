import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import ServiceList, { type ServiceRow } from "./ServiceList";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  await requireAdmin();
  const { data } = await createAdminClient()
    .from("services")
    .select("id, slug, title, short_description, image_url, is_active")
    .order("sort_order")
    .order("created_at");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <h1 className="admin-title">Services</h1>
          <p className="admin-sub">
            These appear on the home page, in the menus and as their own pages. The order below is the order on the website.
          </p>
        </div>
        <Link href="/admin/services/new" className="admin-btn primary">
          <Plus size={18} /> Add service
        </Link>
      </div>
      <ServiceList services={(data ?? []) as ServiceRow[]} />
    </>
  );
}
