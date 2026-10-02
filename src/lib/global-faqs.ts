import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type GlobalFaqCategory = "general" | "fees";

export interface GlobalFaq {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  category: GlobalFaqCategory;
}

export async function getGlobalFaqs(): Promise<GlobalFaq[]> {
  try {
    const { data, error } = await createAdminClient()
      .from("global_faqs")
      .select("id, question, answer, sort_order, is_active, category")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.warn(`Could not load global FAQs: ${error.message}`);
      return [];
    }
    return (data ?? []) as GlobalFaq[];
  } catch (err) {
    console.warn("Failed to load global FAQs:", err);
    return [];
  }
}
