import type { Metadata } from "next";
import Link from "next/link";
import { getGlobalFaqs } from "@/lib/global-faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Vitt Management",
  description: "Answers to common questions about Vitt Management and financial asset recovery.",
};

export const revalidate = 300;
export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getGlobalFaqs();

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
        <div className="container-custom faq-page-content">
          {faqs.length > 0 ? (
            <div className="svc-faqs">
              {faqs.map((faq) => (
                <details key={faq.id} className="svc-faq">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          ) : (
            <p className="faq-page-empty">Questions and answers will be available here shortly.</p>
          )}
        </div>
      </section>
    </>
  );
}
