import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { quickLinks } from "@/data/siteData";
import type { SiteContact } from "@/lib/contact-shared";

export default function Footer({ services, contact }: { services: { slug: string; title: string }[]; contact: SiteContact }) {
  const registeredAddress =
    contact.address && contact.address !== "Mumbai, India"
      ? contact.address
      : "VittEdge Global Advisory LLP. A-11, Fourth Floor, Lane No.18, Joga Bai Extension, Okhla, New Delhi, 110025. India.";

  const contactItems = [
    { icon: Phone, label: "Call us", value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Registered Address", value: registeredAddress },
  ].filter((i) => i.value);

  return (
    <footer id="contact" className="site-footer">
      <div className="container-custom">
        {/* Tier 1: All Services Mega Grid */}
        {services && services.length > 0 && (
          <div className="footer-services-section">
            <div className="footer-services-header">
              <h4 className="footer-title">Our Services & Solutions</h4>
              <p className="footer-services-subtitle">
                Comprehensive financial asset tracing, recovery, dematerialization and advisory services
              </p>
            </div>
            <div className="footer-services-grid">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="footer-service-item">
                  <span className="footer-service-dot" />
                  <span className="footer-service-name">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tier 2: Brand, Quick Links & Contact Information */}
        <div className="footer-main-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="Vitt Management - home">
              <span className="footer-logo-badge">
                <Image src="/images/final_logo.png" alt="" width={100} height={100} className="footer-logo-image" />
              </span>
              <span className="footer-logo-copy">
                <span className="footer-logo-name">
                  <span className="footer-brand-vitt">VITT</span>
                  <span className="footer-brand-mgmt">MANAGEMENT</span>
                </span>
                <span className="footer-brand-attribution">A brand of VittEdge Global Advisory LLP</span>
              </span>
            </Link>
            <p className="footer-tagline">Recover Today.<br />Secure Tomorrow.</p>
            <p className="footer-about">
              We help you trace, recover and secure your forgotten shares, dividends and other financial assets, with expertise, transparency and care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-quicklinks">
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact (from Admin > Contact details) */}
          <div className="footer-contact-wrapper">
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="footer-contact-item">
                  <span className="footer-contact-icon"><Icon size={18} /></span>
                  <div>
                    <span className="footer-contact-label">{label}</span>
                    {href ? (
                      <a href={href} className="footer-link" style={{ wordBreak: "break-word" }}>{value}</a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> Vitt Management, A Brand of VittEdge Global Advisory LLP is a private consultancy firm and in any manner is not affiliated with, endorsed by, or part of SEBI, IEPF Authority or the Ministry of Corporate Affairs, Government of India. We provide advisory and facilitation services for recovery of Unclaimed Shares and Other Financial Assets on behalf of our clients. All information provided on this website is for general guidance and does not constitute legal or financial advice. Requirements may differ between intermediaries and cases, and we cannot guarantee any outcome. All completed cases are subject to approval by the relevant authorities.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vitt Management. All rights reserved.</span>
          <a href="https://nexa-solutions.in" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: "1rem" }}>
            Website by <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>Nexa Solutions</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
