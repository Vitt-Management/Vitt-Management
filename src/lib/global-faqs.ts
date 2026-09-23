import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export interface GlobalFaq {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

export async function getGlobalFaqs(): Promise<GlobalFaq[]> {
  const { data, error } = await createAdminClient()
    .from("global_faqs")
    .select("id, question, answer, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Could not load global FAQs: ${error.message}`);
  return (data ?? []) as GlobalFaq[];
}
