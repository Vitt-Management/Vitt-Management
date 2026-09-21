import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, FileText, Phone } from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/services";
import { getSiteContact } from "@/lib/contact";
import ServiceCard from "@/components/services/ServiceCard";
import OpenConsultationButton from "@/components/services/OpenConsultationButton";

// Content comes from the database; admin edits show up within this window.
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found | Vitt Management" };
  return {
    title: `${service.title} | Vitt Management`,
    description: service.tagline || service.short_description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, all, contact] = await Promise.all([getServiceBySlug(slug), getServices(), getSiteContact()]);
  if (!service) notFound();

  const others = all.filter((s) => s.slug !== service.slug);
  const paragraphs = service.overview.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      {/* Banner */}
      <section style={{ position: "relative", overflow: "hidden", backgroundColor: "#101c16" }}>
        {service.image_url && (
          <Image src={service.image_url} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", opacity: 0.35 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,19,15,0.94) 0%, rgba(11,19,15,0.6) 100%)" }} />
        <div className="container-custom" style={{ position: "relative", paddingTop: "64px", paddingBottom: "76px" }}>
          <nav aria-label="Breadcrumb" className="svc-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#services">Our Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.1rem, 4.6vw, 3.2rem)", fontWeight: 700, lineHeight: 1.15, color: "#ffffff", margin: "18px 0", maxWidth: "760px" }}>
            {service.title}
          </h1>
          {service.tagline && (
            <p style={{ fontSize: "1.2rem", lineHeight: 1.65, color: "#e3ebe6", maxWidth: "660px", marginBottom: "30px" }}>{service.tagline}</p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Link href="/contact" className="btn-primary-gold" style={{ padding: "14px 30px", fontSize: "1rem" }}>
              Contact Now
            </Link>
            <OpenConsultationButton className="svc-banner-outline">Book a Free Consultation</OpenConsultationButton>
          </div>
        </div>
      </section>

      {/* Details */}
      <section style={{ backgroundColor: "var(--bg-page)", padding: "64px 0 72px" }}>
        <div className="container-custom">
          <div className="svc-layout">
            <div className="svc-main">
              {paragraphs.length > 0 && (
                <div className="svc-block">
                  <h2 className="svc-h2">About this service</h2>
                  {paragraphs.map((p, i) => (
                    <p key={i} className="svc-text">{p}</p>
                  ))}
                </div>
              )}

              {service.who_for.length > 0 && (
                <div className="svc-block">
                  <h2 className="svc-h2">Who this is for</h2>
                  <ul className="svc-list">
                    {service.who_for.map((item) => (
                      <li key={item}>
                        <span className="svc-tick"><Check size={16} strokeWidth={3} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.how_we_help.length > 0 && (
                <div className="svc-block">
                  <h2 className="svc-h2">How we help</h2>
                  <ol className="svc-steps">
                    {service.how_we_help.map((s, i) => (
                      <li key={s.title}>
                        <span className="svc-step-num">{i + 1}</span>
                        <div>
                          <h3 className="svc-step-title">{s.title}</h3>
                          <p className="svc-step-desc">{s.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {service.documents.length > 0 && (
                <div className="svc-block">
                  <h2 className="svc-h2">Documents commonly needed</h2>
                  <p className="svc-text" style={{ marginBottom: "18px" }}>
                    The exact list depends on your case. We will confirm what applies to you.
                  </p>
                  <ul className="svc-list svc-docs">
                    {service.documents.map((d) => (
                      <li key={d}>
                        <span className="svc-doc-icon"><FileText size={18} /></span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.faqs.length > 0 && (
                <div className="svc-block">
                  <h2 className="svc-h2">Frequently asked questions</h2>
                  <div className="svc-faqs">
                    {service.faqs.map((f) => (
                      <details key={f.question} className="svc-faq">
                        <summary>{f.question}</summary>
                        <p>{f.answer}</p>
                      </details>
                    ))}
                  </div>
                  <p className="svc-disclaimer">
                    This page is general guidance, not legal or financial advice. Requirements differ between companies and cases, and we cannot guarantee any outcome.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="svc-side">
              <div className="svc-side-card">
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "10px" }}>
                  Need help with {service.title}?
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.65, color: "var(--text-body)", marginBottom: "22px" }}>
                  Tell us about your case and a recovery expert will get back to you within 24 hours.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Link href="/contact" className="btn-primary-gold" style={{ padding: "14px 24px", fontSize: "1rem" }}>
                    Contact Now
                  </Link>
                  <OpenConsultationButton className="btn-outline-gold svc-side-btn">Book a Free Consultation</OpenConsultationButton>
                  <a href={contact.phoneHref} className="svc-side-call">
                    <Phone size={18} /> {contact.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other services */}
      {others.length > 0 && (
        <section style={{ backgroundColor: "#ffffff", padding: "68px 0 76px", borderTop: "1px solid #e7dfcf" }}>
          <div className="container-custom">
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <h2 className="section-title">Explore Our Other Services</h2>
              <p className="section-subtitle" style={{ maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
                Complete support for all your unclaimed and forgotten financial assets.
              </p>
            </div>
            <div className="services-grid-layout services-grid-center">
              {others.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
