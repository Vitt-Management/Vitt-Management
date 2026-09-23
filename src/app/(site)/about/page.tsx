import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, Eye, FileCheck2, Heart, Lock, Search, ShieldCheck, Target } from "lucide-react";
import StatsBar from "@/components/home/StatsBar";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "About Us | Vitt Management",
  description:
    "Vitt Management helps individuals, families and NRIs trace, recover and secure forgotten shares, unclaimed dividends and other financial assets. Recovering wealth. Restoring trust.",
};

const highlights = ["Specialized Expertise", "No Hidden Costs", "NRI Support", "End-to-End Assistance"];

const whatWeDo = [
  {
    icon: Search,
    title: "Trace",
    text: "We search company records, registrars and the IEPF for shares, dividends and other assets you may have forgotten about.",
  },
  {
    icon: FileCheck2,
    title: "Recover",
    text: "We work out who is entitled, prepare the paperwork and follow your claim with companies and authorities until it is resolved.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    text: "We help move your holdings into safe, easy-to-manage form and update your records so nothing is lost again.",
  },
];

const values = [
  { icon: Eye, title: "Transparency", text: "You always know what we are doing, what it needs and where your case stands." },
  { icon: Award, title: "Expertise", text: "We know how companies, registrars and the IEPF work, so your paperwork is right the first time." },
  { icon: Heart, title: "Care", text: "Behind every case is a family's savings or a loved one's memory. We treat each one that way." },
  { icon: Lock, title: "Confidentiality", text: "Your documents and financial details are handled privately and shared only as your case requires." },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section style={{ position: "relative", overflow: "hidden", backgroundColor: "#101c16" }}>
        <Image src="/images/hero-investments.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", opacity: 0.32 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,19,15,0.94) 0%, rgba(11,19,15,0.6) 100%)" }} />
        <div className="container-custom" style={{ position: "relative", paddingTop: "64px", paddingBottom: "84px" }}>
          <nav aria-label="Breadcrumb" className="svc-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">About Us</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.15, color: "#ffffff", margin: "18px 0 16px", maxWidth: "760px" }}>
            VITT MANAGEMENT
          </h1>
          <p className="page-brand-attribution">A brand of VittEdge Global Advisory LLP</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#dfb87c", marginBottom: "16px" }}>
            Recovering Wealth. Restoring Trust.
          </p>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.65, color: "#e3ebe6", maxWidth: "640px", marginBottom: "30px" }}>
            We help people find, claim and protect the financial assets that time, paperwork and distance have hidden from them.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Link href="/contact" className="btn-primary-gold" style={{ padding: "14px 30px", fontSize: "1rem" }}>
              Contact Now
            </Link>
            <Link href="/#services" className="svc-banner-outline">Our Services</Link>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section style={{ backgroundColor: "#ffffff", padding: "76px 0 80px", borderBottom: "1px solid #e7dfcf" }}>
        <div className="container-custom">
          <div className="about-split">
            <div>
              <span className="section-tag" style={{ color: "#a47336" }}>WHO WE ARE</span>
              <h2 className="section-title" style={{ marginBottom: "20px" }}>
                Helping families find what time has hidden
              </h2>
              <p className="about-text">
                Vitt Management helps individuals, families and NRIs trace, recover and secure forgotten shares, unclaimed dividends and other financial assets. Many people carry the worry of old investments they cannot locate, paperwork they do not understand, or claims that keep coming back with objections.
              </p>
              <p className="about-text">
                We take that weight off you. We find out what exists, work out who is entitled to it, prepare the documents, and follow the claim with companies, registrars and authorities until it is resolved.
              </p>
              <p className="about-text" style={{ marginBottom: "28px" }}>
                Our approach is simple: clear communication, honest guidance and careful paperwork, so you always know where your case stands.
              </p>
              <ul className="about-checks">
                {highlights.map((h) => (
                  <li key={h}>
                    <CheckCircle2 size={22} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-image">
              <Image
                src="/images/about-vitt.webp"
                alt="About Vitt Management: Recovering Wealth. Restoring Trust."
                width={1254}
                height={1254}
                sizes="(max-width: 860px) 100vw, 560px"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <StatsBar />

      {/* Trace / Recover / Secure */}
      <section style={{ backgroundColor: "#faf8f5", padding: "76px 0 80px", borderBottom: "1px solid #e7dfcf" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span className="section-tag" style={{ color: "#a47336" }}>WHAT WE DO</span>
            <h2 className="section-title">Trace. Recover. Secure.</h2>
            <p className="section-subtitle" style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
              From the first clue to the final credit, we handle the work so you do not have to.
            </p>
          </div>
          <div className="about-grid about-grid-3">
            {whatWeDo.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="about-card">
                <span className="about-card-num" aria-hidden="true">0{i + 1}</span>
                <span className="about-card-icon"><Icon size={26} /></span>
                <h3 className="about-card-title">{title}</h3>
                <p className="about-card-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ backgroundColor: "#ffffff", padding: "76px 0 80px", borderBottom: "1px solid #e7dfcf" }}>
        <div className="container-custom">
          <div className="about-grid about-grid-2">
            <div className="about-mv">
              <span className="about-card-icon"><Target size={26} /></span>
              <h2 className="about-mv-title">Our Mission</h2>
              <p className="about-card-text">
                To make recovering forgotten financial assets simple, transparent and stress-free for every family we work with.
              </p>
            </div>
            <div className="about-mv">
              <span className="about-card-icon"><Eye size={26} /></span>
              <h2 className="about-mv-title">Our Vision</h2>
              <p className="about-card-text">
                A future where no one loses hard-earned investments to lost paperwork, missed deadlines or unfamiliar processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: "#faf8f5", padding: "76px 0 80px", borderBottom: "1px solid #e7dfcf" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span className="section-tag" style={{ color: "#a47336" }}>OUR VALUES</span>
            <h2 className="section-title">What you can expect from us</h2>
          </div>
          <div className="about-grid about-grid-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="about-card about-card-center">
                <span className="about-card-icon"><Icon size={26} /></span>
                <h3 className="about-card-title">{title}</h3>
                <p className="about-card-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </>
  );
}
