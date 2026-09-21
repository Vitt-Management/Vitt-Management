"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { serviceOptions } from "@/data/siteData";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  values: { name: string; email: string; phone: string; service: string; message: string };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    service: get("service"),
    message: get("message"),
  };
  const fail = (message: string): ContactFormState => ({ status: "error", message, values });

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (get("website")) return { status: "success", message: "", values: { ...values, message: "" } };

  if (!values.name || values.name.length > 200) return fail("Please enter your name.");
  if (!EMAIL_RE.test(values.email) || values.email.length > 320) return fail("Please enter a valid email address.");
  if (!/^[+\d][\d\s\-()]{4,29}$/.test(values.phone)) return fail("Please enter a valid phone number.");
  if (values.service && !serviceOptions.some((o) => o.value === values.service)) return fail("Please choose a valid service.");
  if (values.message.length > 5000) return fail("Your message is too long (max 5000 characters).");

  const { error } = await createAdminClient()
    .from("contact_requests")
    .insert({
      name: values.name,
      email: values.email,
      phone: values.phone,
      service: values.service || null,
      message: values.message || null,
      source: "contact_page",
    });

  if (error) {
    console.error("contact_requests insert failed:", error.message);
    return fail("Something went wrong. Please try again or call us.");
  }
  return { status: "success", message: "", values: { name: "", email: "", phone: "", service: "", message: "" } };
}
