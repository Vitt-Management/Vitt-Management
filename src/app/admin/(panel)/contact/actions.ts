"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteSettingsRow } from "@/lib/contact-shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Result = { ok: true } | { ok: false; error: string };

export async function saveContactSettings(input: SiteSettingsRow): Promise<Result> {
  await requireAdmin();
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const phone = str(input.phone);
  const whatsapp_number = str(input.whatsapp_number).replace(/[\s+\-()]/g, "");
  const email = str(input.email);

  if (!phone || phone.length > 30 || phone.replace(/\D/g, "").length < 8) return { ok: false, error: "Please enter a valid phone number." };
  if (whatsapp_number && !/^\d{8,15}$/.test(whatsapp_number)) return { ok: false, error: "The WhatsApp number should be digits only, with the country code (for example 919876543210)." };
  if (!EMAIL_RE.test(email) || email.length > 320) return { ok: false, error: "Please enter a valid email address." };

  const value = {
    phone,
    whatsapp_number,
    whatsapp_message: str(input.whatsapp_message),
    email,
    address: str(input.address),
    working_hours: str(input.working_hours),
    map_query: str(input.map_query),
    contact_heading: str(input.contact_heading),
    contact_subheading: str(input.contact_subheading),
  };

  const limits: [keyof typeof value, number, string][] = [
    ["whatsapp_message", 300, "The WhatsApp message"],
    ["address", 300, "The address"],
    ["working_hours", 100, "The working hours"],
    ["map_query", 300, "The map location"],
    ["contact_heading", 150, "The contact page heading"],
    ["contact_subheading", 300, "The contact page text"],
  ];
  for (const [key, max, label] of limits) {
    if (value[key].length > max) return { ok: false, error: `${label} is too long (max ${max} characters).` };
  }

  const { error } = await createAdminClient().from("site_settings").update(value).eq("id", true);
  if (error) return { ok: false, error: "Could not save the contact details." };

  // Contact details appear in the footer, floating buttons, contact page and service pages.
  revalidatePath("/", "layout");
  revalidatePath("/admin/contact");
  return { ok: true };
}
