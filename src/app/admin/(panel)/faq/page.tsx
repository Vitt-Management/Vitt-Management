import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import GlobalFaqManager, { type GlobalFaqRow } from "./GlobalFaqManager";

export const dynamic = "force-dynamic";

export default async function FaqAdminPage() {
  await requireAdmin();
  const { data, error } = await createAdminClient()
    .from("global_faqs")
    .select("id, question, answer, is_active, category")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Could not load global FAQs: ${error.message}`);

  return (
    <>
      <h1 className="admin-title">Global FAQs</h1>
      <p className="admin-sub">
        General and Fees &amp; Privacy questions shown on the public FAQ page. FAQs for a specific service are edited inside that service (Services &rarr; Edit).
      </p>
      <GlobalFaqManager initialFaqs={(data ?? []) as GlobalFaqRow[]} />
    </>
  );
}
