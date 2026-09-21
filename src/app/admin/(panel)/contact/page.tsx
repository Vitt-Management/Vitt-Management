import { requireAdmin } from "@/lib/auth";
import { getSiteSettingsRow } from "@/lib/contact";
import ContactSettingsForm from "./ContactSettingsForm";

export const dynamic = "force-dynamic";

export default async function ContactAdminPage() {
  await requireAdmin();
  const settings = await getSiteSettingsRow();
  return (
    <>
      <h1 className="admin-title">Contact details</h1>
      <p className="admin-sub">
        These are used across the website: the contact page, the footer, the floating WhatsApp and Call buttons, and each service page.
      </p>
      <ContactSettingsForm initial={settings} />
    </>
  );
}
