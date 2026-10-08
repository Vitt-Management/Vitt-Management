import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface PartnerLeadEmailPayload {
  name: string;
  email: string;
  phone: string;
  profession: string;
  city?: string;
  message?: string;
}

export interface GeneralLeadEmailPayload {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
}

/**
 * Sends an instant notification email to Admin when a new lead or partner inquiry arrives.
 */
export async function sendLeadNotificationEmail(
  type: "partner" | "contact",
  data: PartnerLeadEmailPayload | GeneralLeadEmailPayload
) {
  const recipientEmail =
    process.env.NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "info@vittmanagement.in";

  const isPartner = type === "partner";
  const partnerData = data as PartnerLeadEmailPayload;
  const generalData = data as GeneralLeadEmailPayload;

  const subject = isPartner
    ? `🤝 New Partner Application: ${data.name} (${partnerData.profession || "Partner"})`
    : `📩 New Website Lead: ${data.name} - ${generalData.service || "General Inquiry"}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 24px 12px; color: #1a2a20; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5dcce; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { background: #101c16; padding: 24px 28px; border-bottom: 3px solid #b88646; }
    .logo-text { color: #dfb87c; font-size: 20px; font-weight: 700; letter-spacing: 0.08em; margin: 0; }
    .sub-text { color: #a5b4ac; font-size: 12px; margin-top: 2px; }
    .badge { display: inline-block; padding: 4px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 999px; background: #fdf5ea; color: #8c5d24; border: 1px solid #dfb87c; margin-top: 14px; }
    .content { padding: 28px; }
    .title { font-size: 18px; font-weight: 700; color: #101c16; margin: 0 0 20px; }
    .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .field-table td { padding: 10px 12px; border-bottom: 1px solid #f0ebe1; font-size: 14px; }
    .field-label { font-weight: 600; color: #5f6e65; width: 130px; }
    .field-value { color: #101c16; font-weight: 500; }
    .message-box { background: #faf8f5; border-left: 3px solid #b88646; padding: 14px 16px; font-size: 14px; color: #334239; line-height: 1.6; white-space: pre-wrap; margin-bottom: 24px; }
    .cta-btn { display: inline-block; background: #b88646; color: #ffffff !important; text-decoration: none; padding: 12px 24px; font-weight: 600; font-size: 14px; border-radius: 6px; }
    .footer { padding: 18px 28px; background: #faf8f5; font-size: 12px; color: #88968e; border-top: 1px solid #ede5d8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo-text">VITT MANAGEMENT</div>
      <div class="sub-text">A brand of VittEdge Global Advisory LLP</div>
      <div class="badge">${isPartner ? "🤝 PARTNER INQUIRY" : "📩 CLIENT LEAD"}</div>
    </div>
    <div class="content">
      <h2 class="title">${isPartner ? "New Partner Registration Received" : "New Website Inquiry Received"}</h2>
      
      <table class="field-table">
        <tr>
          <td class="field-label">Full Name:</td>
          <td class="field-value"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td class="field-label">Phone / WhatsApp:</td>
          <td class="field-value"><a href="tel:${data.phone}" style="color:#b88646; text-decoration:none; font-weight:600;">${data.phone}</a></td>
        </tr>
        <tr>
          <td class="field-label">Email Address:</td>
          <td class="field-value"><a href="mailto:${data.email}" style="color:#b88646; text-decoration:none;">${data.email}</a></td>
        </tr>
        ${
          isPartner
            ? `
        <tr>
          <td class="field-label">Profession / Role:</td>
          <td class="field-value"><strong>${partnerData.profession || "—"}</strong></td>
        </tr>
        <tr>
          <td class="field-label">City / Location:</td>
          <td class="field-value">${partnerData.city || "—"}</td>
        </tr>
        `
            : `
        <tr>
          <td class="field-label">Requested Service:</td>
          <td class="field-value"><strong>${generalData.service || "General Inquiry"}</strong></td>
        </tr>
        `
        }
      </table>

      ${
        data.message
          ? `
        <div style="font-weight: 600; font-size: 13px; color: #5f6e65; margin-bottom: 6px;">Notes / Case Details:</div>
        <div class="message-box">${data.message}</div>
      `
          : ""
      }

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://vittmanagement.in/admin/leads" class="cta-btn">View All Leads in Admin Panel</a>
      </div>
    </div>
    <div class="footer">
      This is an automated notification from the Vitt Management website lead generation engine.
    </div>
  </div>
</body>
</html>
`;

  // 1. If RESEND_API_KEY is available, use Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromAddress =
        process.env.EMAIL_FROM || "Vitt Management <onboarding@resend.dev>";
      await resend.emails.send({
        from: fromAddress,
        to: recipientEmail,
        subject,
        html,
      });
      return { success: true, provider: "resend" };
    } catch (err) {
      console.error("[Email Error - Resend]:", err);
    }
  }

  // 2. If SMTP environment variables are available, use Nodemailer
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from:
          process.env.EMAIL_FROM || `"Vitt Management" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        subject,
        html,
      });
      return { success: true, provider: "smtp" };
    } catch (err) {
      console.error("[Email Error - SMTP]:", err);
    }
  }

  // 3. Fallback: Log when email credentials are not yet set
  console.info(
    `[Lead Email Notification]: New ${type} lead from ${data.name} (${data.phone}, ${data.email}). Set RESEND_API_KEY or SMTP_HOST in .env to deliver inbox emails.`
  );
  return { success: false, reason: "No email provider configured" };
}
