import "server-only";
import { cache } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteContact, SiteSettingsRow } from "@/lib/contact-shared";

const SETTINGS_COLUMNS =
  "phone, whatsapp_number, whatsapp_message, email, address, working_hours, map_query, contact_heading, contact_subheading";

const FALLBACK_SITE_SETTINGS: SiteSettingsRow = {
  phone: "+91 98765 43210",
  whatsapp_number: "919876543210",
  whatsapp_message: "Hello Vitt Management, I would like to know more about recovering my investments.",
  email: "info@vittmanagement.in",
  address: "Mumbai, India",
  working_hours: "Mon-Sat, 9 AM - 7 PM",
  map_query: "Mumbai, India",
  contact_heading: "We're here to help you recover what's yours",
  contact_subheading: "Tell us about your case and a recovery expert will get back to you within 24 hours.",
};

export async function getSiteSettingsRow(): Promise<SiteSettingsRow> {
  try {
    const { data, error } = await createAdminClient().from("site_settings").select(SETTINGS_COLUMNS).eq("id", true).maybeSingle();
    if (error || !data) {
      if (error) console.warn("Could not load site settings from Supabase, using fallback:", error.message);
      return FALLBACK_SITE_SETTINGS;
    }
    return data as SiteSettingsRow;
  } catch (err) {
    console.warn("Failed to fetch site settings, using fallback:", err);
    return FALLBACK_SITE_SETTINGS;
  }
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
