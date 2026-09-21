import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import ServiceForm, { type ServiceFormData } from "../ServiceForm";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const { data } = await createAdminClient()
    .from("services")
    .select("id, title, slug, short_description, tagline, overview, who_for, documents, how_we_help, faqs, is_active, image_url")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <>
      <h1 className="admin-title">Edit service</h1>
      <p className="admin-sub">{data.title}</p>
      <ServiceForm initial={data as ServiceFormData} />
    </>
  );
}
