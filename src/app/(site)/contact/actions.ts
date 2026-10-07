"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { serviceOptions } from "@/data/siteData";
import { getSiteContact } from "@/lib/contact";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  mailtoUrl?: string;
  values: {
    name: string;
    phone: string;
    email: string;
    city: string;
    service: string;
    message: string;
    howHeard: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    city: get("city"),
    service: get("service"),
    message: get("message"),
    howHeard: get("howHeard"),
  };
  const fail = (message: string): ContactFormState => ({ status: "error", message, values });

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (get("website")) return { status: "success", message: "", values: { ...values, message: "" } };

  // Only Name and Phone are mandatory
  if (!values.name || values.name.length > 200) return fail("Please enter your name.");
  if (!/^[+\d][\d\s\-()]{4,29}$/.test(values.phone)) return fail("Please enter a valid phone number.");

  // Email is optional, but if provided, validate format
  if (values.email && (!EMAIL_RE.test(values.email) || values.email.length > 320)) {
    return fail("Please enter a valid email address (or leave it blank).");
  }

  if (values.service && !serviceOptions.some((o) => o.value === values.service)) {
    return fail("Please choose a valid service.");
  }
  if (values.message.length > 5000) return fail("Your message is too long (max 5000 characters).");

  const combinedMessage = [
    values.city ? `City: ${values.city}` : "",
    values.howHeard ? `Heard Via: ${values.howHeard}` : "",
    values.message ? `Case Details: ${values.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // 1. Save to Database for Admin Dashboard (/admin/leads)
  const { error } = await createAdminClient()
    .from("contact_requests")
    .insert({
      name: values.name,
      email: values.email || null,
      phone: values.phone,
      service: values.service || null,
      message: combinedMessage || null,
      source: "contact_page",
    });

  if (error) {
    console.error("contact_requests insert failed:", error.message);
    return fail("Something went wrong. Please try again or call us.");
  }

  // 2. Generate mailto URL for direct user mailbox redirection
  const contact = await getSiteContact();
  const recipient = contact.email || "info@vittmangement.in";
  const sLabel = serviceOptions.find((o) => o.value === values.service)?.label || values.service || "Case Inquiry";
  const emailSubject = encodeURIComponent(`Case Details: ${values.name} - ${sLabel}`);

  const emailBody = [
    `Hello Vitt Management Team,`,
    ``,
    `Here are my case details:`,
    ``,
    `• Name: ${values.name}`,
    `• Phone: ${values.phone}`,
    values.email ? `• Email: ${values.email}` : "",
    values.city ? `• City: ${values.city}` : "",
    `• Service: ${sLabel}`,
    values.howHeard ? `• How did you hear about us: ${values.howHeard}` : "",
    values.message ? `• Case Details / Message:\n${values.message}` : "",
    ``,
    `Please review my case and advise on the next steps.`,
    ``,
    `Best regards,`,
    `${values.name}`,
  ]
    .filter((line) => line !== null && line !== undefined)
    .join("\n");

  const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;

  return {
    status: "success",
    message: "",
    mailtoUrl,
    values: { name: "", phone: "", email: "", city: "", service: "", message: "", howHeard: "" },
  };
}
