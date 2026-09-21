import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  await requireAdmin();
  const db = createAdminClient();
  const head = { count: "exact" as const, head: true };

  const [total, fresh, active, banners, svcActive, svcTotal] = await Promise.all([
    db.from("contact_requests").select("*", head),
    db.from("contact_requests").select("*", head).eq("status", "new"),
    db.from("hero_banners").select("*", head).eq("is_active", true),
    db.from("hero_banners").select("*", head),
    db.from("services").select("*", head).eq("is_active", true),
    db.from("services").select("*", head),
  ]);

  const stats = [
    { n: fresh.count ?? 0, label: "New leads", href: "/admin/leads" },
    { n: total.count ?? 0, label: "Total leads", href: "/admin/leads" },
    { n: active.count ?? 0, label: "Active banners", href: "/admin/banners" },
    { n: banners.count ?? 0, label: "Total banners", href: "/admin/banners" },
    { n: svcActive.count ?? 0, label: "Visible services", href: "/admin/services" },
    { n: svcTotal.count ?? 0, label: "Total services", href: "/admin/services" },
  ];

  return (
    <>
      <h1 className="admin-title">Overview</h1>
      <p className="admin-sub">A quick look at your website.</p>
      <div className="admin-grid">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="admin-card">
            <div className="stat-num">{s.n}</div>
            <div className="stat-label">{s.label}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
