"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteContact } from "@/lib/contact";

export interface PartnerFormState {
  status: "idle" | "success" | "error";
  message: string;
  mailtoUrl?: string;
  values: {
    name: string;
    email: string;
    phone: string;
    profession: string;
    city: string;
    message: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitPartnerInquiry(
  _prev: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    profession: get("profession"),
    city: get("city"),
    message: get("message"),
  };
  const fail = (message: string): PartnerFormState => ({
    status: "error",
    message,
    values,
  });

  // Honeypot check
  if (get("website")) {
    return { status: "success", message: "", values: { ...values, message: "" } };
  }

  if (!values.name || values.name.length > 200) {
    return fail("Please enter your name.");
  }
  if (!EMAIL_RE.test(values.email) || values.email.length > 320) {
    return fail("Please enter a valid email address.");
  }
  if (!/^[+\d][\d\s\-()]{4,29}$/.test(values.phone)) {
    return fail("Please enter a valid phone number.");
  }
  if (!values.profession) {
    return fail("Please select your profession.");
  }

  const combinedMessage = [
    `[Partnership Request]`,
    `Profession: ${values.profession}`,
    values.city ? `City: ${values.city}` : "",
    values.message ? `Details / Notes: ${values.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // 1. Save lead to Database for Admin Dashboard (/admin/leads)
  const { error } = await createAdminClient()
    .from("contact_requests")
    .insert({
      name: values.name,
      email: values.email,
      phone: values.phone,
      service: `partner_program`,
      message: combinedMessage,
      source: "partner_with_us",
    });

  if (error) {
    console.error("Partner application insert failed:", error.message);
    return fail("Something went wrong. Please try again or reach out to us directly.");
  }

  // 2. Generate mailto URL for direct user mailbox redirection
  const contact = await getSiteContact();
  const recipient = contact.email || "info@vittmanagement.in";
  const emailSubject = encodeURIComponent(`Partnership Request: ${values.name} (${values.profession})`);
  
  const emailBody = [
    `Hello Vitt Management Team,`,
    ``,
    `I would like to explore a professional collaboration with Vitt Management. Below are my details:`,
    ``,
    `• Full Name: ${values.name}`,
    `• Phone / WhatsApp: ${values.phone}`,
    `• Email: ${values.email}`,
    `• Profession: ${values.profession}`,
    values.city ? `• City / Location: ${values.city}` : "",
    values.message ? `• Case Overview / Notes:\n${values.message}` : "",
    ``,
    `Please share the referral process, collaboration terms, and next steps.`,
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
    values: { name: "", email: "", phone: "", profession: "", city: "", message: "" },
  };
}
