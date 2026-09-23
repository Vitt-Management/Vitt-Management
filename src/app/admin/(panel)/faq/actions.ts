"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export interface GlobalFaqInput {
  id?: string;
  question: string;
  answer: string;
  is_active: boolean;
}

export type GlobalFaqActionResult = { ok: true } | { ok: false; error: string };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validate(input: GlobalFaqInput[]): { value: GlobalFaqInput[] } | { error: string } {
  if (!Array.isArray(input) || input.length > 30) return { error: "You can save up to 30 FAQs." };

  const value = input.map((faq) => ({
    id: typeof faq.id === "string" ? faq.id : undefined,
    question: typeof faq.question === "string" ? faq.question.trim() : "",
    answer: typeof faq.answer === "string" ? faq.answer.trim() : "",
    is_active: faq.is_active === true,
  }));

  if (value.some((faq) => !faq.question || !faq.answer)) return { error: "Each FAQ needs both a question and an answer." };
  if (value.some((faq) => faq.question.length > 300 || faq.answer.length > 2000)) return { error: "A question or answer is too long." };
  if (value.some((faq) => faq.id && !UUID_RE.test(faq.id))) return { error: "An FAQ could not be identified." };
  return { value };
}

function refreshFaqPages() {
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  revalidatePath("/admin");
}

export async function saveGlobalFaqs(input: GlobalFaqInput[]): Promise<GlobalFaqActionResult> {
  await requireAdmin();
  const validated = validate(input);
  if ("error" in validated) return { ok: false, error: validated.error };

  const db = createAdminClient();
  const { data: existing, error: existingError } = await db.from("global_faqs").select("id");
  if (existingError) return { ok: false, error: "Could not load the current FAQs." };

  const existingIds = new Set((existing ?? []).map((faq) => faq.id));
  const submittedIds = new Set(validated.value.flatMap((faq) => (faq.id ? [faq.id] : [])));
  if ([...submittedIds].some((id) => !existingIds.has(id))) return { ok: false, error: "An FAQ was changed by another session. Refresh and try again." };

  const removedIds = [...existingIds].filter((id) => !submittedIds.has(id));
  const deletes = await Promise.all(removedIds.map((id) => db.from("global_faqs").delete().eq("id", id)));
  if (deletes.some(({ error }) => error)) return { ok: false, error: "Could not remove the deleted FAQ." };

  const writes = await Promise.all(validated.value.map((faq, sortOrder) => {
    const values = { question: faq.question, answer: faq.answer, is_active: faq.is_active, sort_order: sortOrder };
    return faq.id
      ? db.from("global_faqs").update(values).eq("id", faq.id)
      : db.from("global_faqs").insert(values);
  }));
  if (writes.some(({ error }) => error)) return { ok: false, error: "Could not save the FAQs." };

  refreshFaqPages();
  return { ok: true };
}

export async function setGlobalFaqVisibility(id: string, isActive: boolean): Promise<GlobalFaqActionResult> {
  await requireAdmin();
  if (!UUID_RE.test(id)) return { ok: false, error: "An FAQ could not be identified." };

  const { error } = await createAdminClient().from("global_faqs").update({ is_active: isActive }).eq("id", id);
  if (error) return { ok: false, error: "Could not update the FAQ visibility." };
  refreshFaqPages();
  return { ok: true };
}

export async function deleteGlobalFaq(id: string): Promise<GlobalFaqActionResult> {
  await requireAdmin();
  if (!UUID_RE.test(id)) return { ok: false, error: "An FAQ could not be identified." };

  const { error } = await createAdminClient().from("global_faqs").delete().eq("id", id);
  if (error) return { ok: false, error: "Could not delete the FAQ." };
  refreshFaqPages();
  return { ok: true };
}

export async function moveGlobalFaq(id: string, direction: "up" | "down"): Promise<GlobalFaqActionResult> {
  await requireAdmin();
  if (!UUID_RE.test(id)) return { ok: false, error: "An FAQ could not be identified." };

  const db = createAdminClient();
  const { data: rows, error: readError } = await db
    .from("global_faqs")
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (readError || !rows) return { ok: false, error: "Could not reorder the FAQs." };

  const index = rows.findIndex((faq) => faq.id === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || targetIndex < 0 || targetIndex >= rows.length) return { ok: true };

  const current = rows[index];
  const target = rows[targetIndex];
  const results = await Promise.all([
    db.from("global_faqs").update({ sort_order: target.sort_order }).eq("id", current.id),
    db.from("global_faqs").update({ sort_order: current.sort_order }).eq("id", target.id),
  ]);
  if (results.some(({ error }) => error)) return { ok: false, error: "Could not reorder the FAQs." };
  refreshFaqPages();
  return { ok: true };
}
