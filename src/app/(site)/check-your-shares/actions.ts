"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteContact } from "@/lib/contact";

export interface CheckSharesFormState {
  status: "idle" | "success" | "error";
  message: string;
  mailtoUrl?: string;
  values: {
    shareholderName: string;
    companyName: string;
    folioNumber: string;
    addressOnRecord: string;
    phone: string;
    email: string;
    message: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitCheckShares(
  _prev: CheckSharesFormState,
  formData: FormData
): Promise<CheckSharesFormState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    shareholderName: get("shareholderName"),
    companyName: get("companyName"),
    folioNumber: get("folioNumber"),
    addressOnRecord: get("addressOnRecord"),
    phone: get("phone"),
    email: get("email"),
    message: get("message"),
  };
  const fail = (message: string): CheckSharesFormState => ({
    status: "error",
    message,
    values,
  });

  // Honeypot check
  if (get("website")) {
    return { status: "success", message: "", values: { ...values, message: "" } };
  }

  if (!values.shareholderName || values.shareholderName.length > 200) {
    return fail("Please enter the Shareholder Name.");
  }
  if (!values.companyName || values.companyName.length > 200) {
    return fail("Please enter the Company Name (e.g. Reliance, ITC, Tata Motors).");
  }
  if (!EMAIL_RE.test(values.email) || values.email.length > 320) {
    return fail("Please enter a valid email address.");
  }
  if (!/^[+\d][\d\s\-()]{4,29}$/.test(values.phone)) {
    return fail("Please enter a valid phone number.");
  }

  const combinedMessage = [
    `[Check Your Shares Request]`,
    `Shareholder Name: ${values.shareholderName}`,
    `Company Name: ${values.companyName}`,
    values.folioNumber ? `Folio Number: ${values.folioNumber}` : `Folio Number: Not Available / Needs Tracing`,
    values.addressOnRecord ? `Address as per Records: ${values.addressOnRecord}` : "",
    values.message ? `Additional Details: ${values.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // 1. Save to Database for Admin Dashboard (/admin/leads)
  const { error } = await createAdminClient()
    .from("contact_requests")
    .insert({
      name: values.shareholderName,
      email: values.email,
      phone: values.phone,
      service: `check_shares`,
      message: combinedMessage,
      source: "check_your_shares",
    });

  if (error) {
    console.error("Check shares inquiry insert failed:", error.message);
    return fail("Something went wrong. Please try again or call our helpline.");
  }

  // 2. Generate mailto URL for direct user mailbox redirection
  const contact = await getSiteContact();
  const recipient = contact.email || "info@vittmangement.in";
  const emailSubject = encodeURIComponent(`Share Check Request: ${values.shareholderName} - ${values.companyName}`);

  const emailBody = [
    `Hello Vitt Management Team,`,
    ``,
    `Please help me check and trace the following shareholding / investment records:`,
    ``,
    `• Name of Shareholder: ${values.shareholderName}`,
    `• Company Name: ${values.companyName}`,
    `• Folio Number: ${values.folioNumber || "Not Available / To be Traced"}`,
    values.addressOnRecord ? `• Address (As per Company Records): ${values.addressOnRecord}` : "",
    `• Contact Phone / WhatsApp: ${values.phone}`,
    `• Contact Email: ${values.email}`,
    values.message ? `• Additional Available Info:\n${values.message}` : "",
    ``,
    `Please check your database / company registrars and advise on the recovery path.`,
    ``,
    `Best regards,`,
    `${values.shareholderName}`,
  ]
    .filter((line) => line !== null && line !== undefined)
    .join("\n");

  const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;

  return {
    status: "success",
    message: "",
    mailtoUrl,
    values: {
      shareholderName: "",
      companyName: "",
      folioNumber: "",
      addressOnRecord: "",
      phone: "",
      email: "",
      message: "",
    },
  };
}
