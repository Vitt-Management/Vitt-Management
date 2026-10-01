import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { GlobalFaqCategory } from "@/lib/global-faqs";

export interface FaqItem {
  question: string;
  answer: string;
}

// One entry per sidebar/dropdown item on the public FAQ page.
export interface FaqTopic {
  key: string; // "general" | "fees" | service slug
  kind: "general" | "fees" | "service";
  label: string;
  faqs: FaqItem[];
}

const GLOBAL_LABELS: Record<GlobalFaqCategory, string> = {
  general: "General",
  fees: "Fees, Documents & Privacy",
};

function cleanFaqs(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((f) => {
    const question = typeof f?.question === "string" ? f.question.trim() : "";
    const answer = typeof f?.answer === "string" ? f.answer.trim() : "";
    return question && answer ? [{ question, answer }] : [];
  });
}

// Order: General, then each active service (website order) that has FAQs, then Fees/Documents/Privacy.
export async function getFaqTopics(): Promise<FaqTopic[]> {
  const db = createAdminClient();
  const [globalRes, serviceRes] = await Promise.all([
    db
      .from("global_faqs")
      .select("question, answer, category")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
    db
      .from("services")
      .select("slug, title, faqs")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);
  if (globalRes.error) throw new Error(`Could not load global FAQs: ${globalRes.error.message}`);
  if (serviceRes.error) throw new Error(`Could not load service FAQs: ${serviceRes.error.message}`);

  const globalByCategory = (category: GlobalFaqCategory): FaqTopic[] => {
    const faqs = (globalRes.data ?? [])
      .filter((f) => f.category === category)
      .map((f) => ({ question: f.question as string, answer: f.answer as string }));
    return faqs.length ? [{ key: category, kind: category, label: GLOBAL_LABELS[category], faqs }] : [];
  };

  const services: FaqTopic[] = (serviceRes.data ?? []).flatMap((s) => {
    const faqs = cleanFaqs(s.faqs);
    return faqs.length ? [{ key: s.slug as string, kind: "service" as const, label: s.title as string, faqs }] : [];
  });

  return [...globalByCategory("general"), ...services, ...globalByCategory("fees")];
}
