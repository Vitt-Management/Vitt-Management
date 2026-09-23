import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { quickLinks } from "@/data/siteData";
import type { SiteContact } from "@/lib/contact-shared";

export default function Footer({ services, contact }: { services: { slug: string; title: string }[]; contact: SiteContact }) {
  const lastPrimaryServiceIndex = services.findIndex((service) => service.slug === "forgotten-shares-search");
  const footerServices = services.filter(
    (service, index) => index <= lastPrimaryServiceIndex || service.slug === "other-financial-asset-assistance"
  );
  const contactItems = [
    { icon: Phone, label: "Call us", value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Visit us", value: contact.address },
    { icon: Clock, label: "Working hours", value: contact.hours },
  ].filter((i) => i.value);

  return (
    <footer id="contact" className="site-footer">
      <div className="container-custom">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="Vitt Management - home">
              <span className="footer-logo-badge">
                <Image src="/images/final_logo.png" alt="" width={80} height={80} className="footer-logo-image" />
              </span>
              <span>
                <span className="footer-logo-name">VITT MANAGEMENT</span>
                <span className="footer-brand-attribution">A brand of VittEdge Global Advisory LLP</span>
              </span>
            </Link>
            <p className="footer-tagline">Recover Today.<br />Secure Tomorrow.</p>
            <p className="footer-about">
              We help you trace, recover and secure your forgotten shares, dividends and other financial assets, with expertise, transparency and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-title">Our Services</h4>
            <div className="footer-links">
              {footerServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="footer-link">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact (from Admin > Contact details) */}
          <div>
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
