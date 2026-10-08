import "server-only";
import { cache } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteContact, SiteSettingsRow } from "@/lib/contact-shared";

const SETTINGS_COLUMNS =
  "phone, whatsapp_number, whatsapp_message, email, address, working_hours, map_query, contact_heading, contact_subheading";

const PRIMARY_PHONE = "+91 92752 31114";
const PRIMARY_WHATSAPP_NUMBER = "919275231114";
const PRIMARY_ADDRESS =
  "VittEdge Global Advisory LLP. A-11, Fourth Floor, Lane No.18, Joga Bai Extension, Okhla, New Delhi, 110025. India.";
const PRIMARY_MAP_QUERY =
  "A-11, Fourth Floor, Lane No.18, Joga Bai Extension, Okhla, New Delhi, 110025, India";

const FALLBACK_SITE_SETTINGS: SiteSettingsRow = {
  phone: PRIMARY_PHONE,
  whatsapp_number: PRIMARY_WHATSAPP_NUMBER,
  whatsapp_message: "Hello Vitt Management, I would like to know more about recovering my investments.",
  email: "info@vittmanagement.in",
  address: PRIMARY_ADDRESS,
  working_hours: "Mon-Sat, 9 AM - 7 PM",
  map_query: PRIMARY_MAP_QUERY,
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
    const settings = data as SiteSettingsRow;
    // Replace the original placeholder while preserving any number configured later in admin.
    if (settings.phone === "+91 98765 43210") settings.phone = PRIMARY_PHONE;
    if (settings.whatsapp_number === "919876543210") settings.whatsapp_number = PRIMARY_WHATSAPP_NUMBER;
    if (
      settings.email === "info@vittmanagement.in" ||
      settings.email === "komal.goswami@vittmanagement.in" ||
      settings.email === "tara.juneja@vittmanagement.in"
    ) {
      settings.email = "info@vittmanagement.in";
    }
    if (!settings.address || settings.address === "Mumbai, India") {
      settings.address = PRIMARY_ADDRESS;
    }
    if (!settings.map_query || settings.map_query === "Mumbai, India") {
      settings.map_query = PRIMARY_MAP_QUERY;
    }
    return settings;
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
