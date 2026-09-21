import type { Metadata } from "next";
import ContactBanner from "@/components/contact/ContactBanner";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import { getSiteContact } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us | Vitt Management",
  description:
    "Get in touch with Vitt Management. Call, email or send us a message and our recovery expert will respond within 24 hours.",
};

export default async function ContactPage() {
  const contact = await getSiteContact();
  return (
    <>
      <ContactBanner heading={contact.heading} subheading={contact.subheading} />
      <section style={{ padding: "72px 0 88px", backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div className="contact-grid">
            <ContactDetails contact={contact} />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
