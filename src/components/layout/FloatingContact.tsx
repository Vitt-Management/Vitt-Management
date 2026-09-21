import { Phone } from "lucide-react";
import type { SiteContact } from "@/lib/contact-shared";

function WhatsAppIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.19 1.6 6.02L4 28l7.15-1.87a12.03 12.03 0 0 0 4.89 1.03h.01C22.7 27.16 28 21.76 28 15.13 28 11.92 26.75 8.9 24.48 6.63A11.94 11.94 0 0 0 16.04 3Zm0 21.96h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-3.8 1 1.02-3.7-.24-.38a9.97 9.97 0 0 1-1.53-5.3c0-5.5 4.5-10 10.03-10 2.67 0 5.18 1.04 7.06 2.93a9.9 9.9 0 0 1 2.93 7.06c0 5.51-4.5 10.01-10 10.01Zm5.5-7.5c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export default function FloatingContact({ contact }: { contact: SiteContact }) {
  return (
    <div className="float-contact">
      {contact.whatsappHref && (
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn whatsapp"
          aria-label="Chat with us on WhatsApp"
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      )}
      <a href={contact.phoneHref} className="float-btn call" aria-label={`Call us on ${contact.phone}`} title={`Call ${contact.phone}`}>
        <Phone size={26} />
      </a>
    </div>
  );
}
