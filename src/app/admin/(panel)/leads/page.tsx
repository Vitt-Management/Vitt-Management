import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceOptions } from "@/data/siteData";
import LeadsTable from "./LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  await requireAdmin();
  const { data: leads, error } = await createAdminClient()
    .from("contact_requests")
    .select("id, created_at, name, email, phone, service, message, source, status")
    .order("created_at", { ascending: false })
    .limit(500);

  const serviceLabelMap: Record<string, string> = {};
  serviceOptions.forEach((o) => {
    serviceLabelMap[o.value] = o.label;
  });

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "6px" }}>
        <h1 className="admin-title" style={{ margin: 0 }}>Leads &amp; Inquiries</h1>
        <span style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>
          Total: {leads?.length || 0} leads
        </span>
      </div>
      <p className="admin-sub">All inquiries from Website Contact, Partner Network &amp; Check Shares form.</p>

      {error && <p className="admin-error">Could not load leads from database.</p>}

      <div className="admin-card" style={{ padding: 0 }}>
        {!leads?.length ? (
          <p style={{ padding: "32px", fontSize: "1.05rem", color: "var(--text-muted)", textAlign: "center" }}>
            No leads received yet.
          </p>
        ) : (
          <LeadsTable leads={leads} serviceLabelMap={serviceLabelMap} />
        )}
      </div>
    </>
  );
}
