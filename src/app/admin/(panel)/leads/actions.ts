"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const STATUSES = ["new", "contacted", "closed"];

export async function setLeadStatus(id: string, status: string): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status." };
  const { error } = await createAdminClient().from("contact_requests").update({ status }).eq("id", id);
  if (error) return { ok: false, error: "Could not update the lead." };
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { ok: true };
}
