import type { Metadata } from "next";
import Link from "next/link";
import { getFaqTopics } from "@/lib/faq-topics";
import FaqExplorer from "@/components/faq/FaqExplorer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Vitt Management",
  description: "Answers to common questions about Vitt Management and financial asset recovery.",
};

export const revalidate = 300;
export const dynamic = "force-dynamic";

interface FaqPageProps {
  searchParams: Promise<{ topic?: string }>;
}

export default async function FaqPage({ searchParams }: FaqPageProps) {
  const topics = await getFaqTopics();
  const resolvedSearchParams = await searchParams;
  const topicParam = resolvedSearchParams?.topic;

  const validTopic = topicParam && topics.some((t) => t.key === topicParam)
    ? topicParam
    : topics.find((t) => t.kind === "general")?.key ?? topics[0]?.key ?? "general";

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #101c16 0%, #182820 100%)", padding: "76px 0 82px" }}>
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="svc-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">FAQs</span>
          </nav>
          <h1 className="faq-page-title">Frequently asked questions</h1>
          <p className="faq-page-intro">
            Find clear answers about recovering and securing your financial assets.
          </p>
        </div>
      </section>

      <section className="faq-page-section">
        <div className="container-custom">
          {topics.length > 0 ? (
            <FaqExplorer topics={topics} initialTopic={validTopic} />
          ) : (
            <p className="faq-page-empty">Questions and answers will be available here shortly.</p>
          )}
        </div>
      </section>
    </>
  );
}
