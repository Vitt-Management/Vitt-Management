import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import GlobalFaqManager, { type GlobalFaqRow } from "./GlobalFaqManager";

export const dynamic = "force-dynamic";

export default async function FaqAdminPage() {
  await requireAdmin();
  const { data, error } = await createAdminClient()
    .from("global_faqs")
    .select("id, question, answer, is_active")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Could not load global FAQs: ${error.message}`);

  return (
    <>
      <h1 className="admin-title">Global FAQs</h1>
      <p className="admin-sub">These questions appear on the public FAQ page. You can add, edit, show, hide, reorder, or delete them here.</p>
      <GlobalFaqManager initialFaqs={(data ?? []) as GlobalFaqRow[]} />
    </>
  );
}
