import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceOptions } from "@/data/siteData";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic";

const serviceLabel = (v: string | null) => serviceOptions.find((o) => o.value === v)?.label ?? v ?? "—";

export default async function LeadsPage() {
  await requireAdmin();
  const { data: leads, error } = await createAdminClient()
    .from("contact_requests")
    .select("id, created_at, name, email, phone, service, message, source, status")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <>
      <h1 className="admin-title">Leads</h1>
      <p className="admin-sub">Messages sent from the website contact form, newest first.</p>

      {error && <p className="admin-error">Could not load leads.</p>}

      <div className="admin-card" style={{ padding: 0 }}>
        {!leads?.length ? (
          <p style={{ padding: "24px", fontSize: "1.05rem" }}>No leads yet.</p>
        ) : (
          <div className="table-scroll">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{l.name}</div>
                      <a href={`mailto:${l.email}`} style={{ color: "var(--gold-dark)", display: "block", wordBreak: "break-all" }}>{l.email}</a>
                      <a href={`tel:${l.phone}`} style={{ color: "var(--gold-dark)" }}>{l.phone}</a>
                    </td>
                    <td>{serviceLabel(l.service)}</td>
                    <td style={{ maxWidth: "340px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{l.message || "—"}</td>
                    <td><StatusSelect id={l.id} status={l.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
