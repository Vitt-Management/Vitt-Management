// Safe to import from client components (no server-only code here).

// Raw row, exactly as edited in the admin dashboard.
export interface SiteSettingsRow {
  phone: string;
  whatsapp_number: string;
  whatsapp_message: string;
  email: string;
  address: string;
  working_hours: string;
  map_query: string;
  contact_heading: string;
  contact_subheading: string;
}

// Ready-to-render contact details for the public pages.
export interface SiteContact {
  phone: string;
  phoneHref: string;
  whatsappHref: string | null; // null when no WhatsApp number is set
  email: string;
  address: string;
  hours: string;
  mapQuery: string;
  heading: string;
  subheading: string;
}
