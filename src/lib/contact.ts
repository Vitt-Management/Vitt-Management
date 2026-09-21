import "server-only";
import { cache } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteContact, SiteSettingsRow } from "@/lib/contact-shared";

const SETTINGS_COLUMNS =
  "phone, whatsapp_number, whatsapp_message, email, address, working_hours, map_query, contact_heading, contact_subheading";

export async function getSiteSettingsRow(): Promise<SiteSettingsRow> {
  const { data, error } = await createAdminClient().from("site_settings").select(SETTINGS_COLUMNS).eq("id", true).maybeSingle();
  if (error || !data) throw new Error(`Could not load site settings: ${error?.message ?? "no row"}`);
  return data as SiteSettingsRow;
}

// Loaded once per request even if several components ask for it.
export const getSiteContact = cache(async (): Promise<SiteContact> => {
  const r = await getSiteSettingsRow();
  const message = r.whatsapp_message ? `?text=${encodeURIComponent(r.whatsapp_message)}` : "";
  return {
    phone: r.phone,
    phoneHref: `tel:${r.phone.replace(/[^\d+]/g, "")}`,
    whatsappHref: r.whatsapp_number ? `https://wa.me/${r.whatsapp_number}${message}` : null,
    email: r.email,
    address: r.address,
    hours: r.working_hours,
    mapQuery: r.map_query || r.address,
    heading: r.contact_heading,
    subheading: r.contact_subheading,
  };
});
