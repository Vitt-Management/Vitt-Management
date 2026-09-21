import Link from "next/link";
import { getSiteContact } from "@/lib/contact";

export default async function CtaBanner() {
  const contact = await getSiteContact();
  return (
    <section className="cta-light">
      <div className="container-custom">
        <div className="cta-light-inner">
          <span className="section-tag" style={{ color: "#a47336" }}>TAKE THE FIRST STEP</span>
          <h2 className="cta-light-title">Ready to Recover Your Investments?</h2>
          <p className="cta-light-text">
            Tell us what you remember, even if it is only a company name or an old certificate. Our experts will help you find out what is yours.
          </p>
          <div className="cta-light-actions">
            <Link href="/contact" className="btn-primary-gold" style={{ fontSize: "1.02rem", padding: "15px 34px" }}>
              Get a Free Consultation
            </Link>
            <a href={contact.phoneHref} className="btn-outline-gold" style={{ fontSize: "1.02rem", padding: "14px 34px" }}>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
