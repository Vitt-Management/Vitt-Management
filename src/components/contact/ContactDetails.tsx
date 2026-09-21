import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { SiteContact } from "@/lib/contact-shared";

export default function ContactDetails({ contact }: { contact: SiteContact }) {
  const items = [
    { icon: Phone, label: "Call us", value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Visit us", value: contact.address },
    { icon: Clock, label: "Working hours", value: contact.hours },
  ].filter((i) => i.value);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--text-headline)", marginBottom: "12px" }}>
        Get in touch
      </h2>
      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-body)", marginBottom: "36px" }}>
        Reach us by phone or email, or fill in the form and we will contact you.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
        {items.map(({ icon: Icon, label, value, href }) => (
          <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "var(--gold-pale)",
                border: "1px solid var(--gold-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold-primary)",
                flexShrink: 0,
              }}
            >
              <Icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "2px" }}>{label}</div>
              {href ? (
                <a href={href} style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text-headline)", wordBreak: "break-word" }}>
                  {value}
                </a>
              ) : (
                <div style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text-headline)" }}>{value}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fills the remaining height so its bottom edge lines up with the form card */}
      {contact.mapQuery && (
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: "320px",
            marginTop: "36px",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <iframe
            title={`Map showing ${contact.mapQuery}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      )}
    </div>
  );
}
