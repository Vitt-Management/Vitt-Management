"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import type { SiteSettingsRow } from "@/lib/contact-shared";
import { saveContactSettings } from "./actions";

export default function ContactSettingsForm({ initial }: { initial: SiteSettingsRow }) {
  const [f, setF] = useState<SiteSettingsRow>(initial);
  const [mapShown, setMapShown] = useState(initial.map_query || initial.address);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const set = (key: keyof SiteSettingsRow) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((prev) => ({ ...prev, [key]: e.target.value }));
    setMsg(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const r = await saveContactSettings(f);
      setMsg(r.ok ? { ok: true, text: "Saved. The website now shows these details." } : { ok: false, text: r.error });
      if (r.ok) setMapShown(f.map_query || f.address);
    } catch {
      setMsg({ ok: false, text: "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="admin-card form-stack">
        <h2 className="admin-h2">Contact details</h2>
        <Field label="Phone number" id="cs-phone" hint="Shown on the website. The Call button dials this number.">
          <input id="cs-phone" className="admin-input" required maxLength={30} value={f.phone} onChange={set("phone")} />
        </Field>
        <Field label="Email" id="cs-email">
          <input id="cs-email" type="email" className="admin-input" required maxLength={320} value={f.email} onChange={set("email")} />
        </Field>
        <Field label="Address" id="cs-address" hint="Shown under “Visit us”.">
          <input id="cs-address" className="admin-input" maxLength={300} value={f.address} onChange={set("address")} />
        </Field>
        <Field label="Working hours" id="cs-hours">
          <input id="cs-hours" className="admin-input" maxLength={100} value={f.working_hours} onChange={set("working_hours")} />
        </Field>
      </div>

      <div className="admin-card form-stack">
        <h2 className="admin-h2">WhatsApp</h2>
        <Field label="WhatsApp number" id="cs-wa" hint="Digits with the country code, for example 919876543210. Leave empty to hide the WhatsApp button.">
          <input id="cs-wa" className="admin-input" inputMode="numeric" maxLength={20} value={f.whatsapp_number} onChange={set("whatsapp_number")} />
        </Field>
        <Field label="Message that opens with the chat" id="cs-wamsg" hint="Visitors can change it before sending.">
          <textarea id="cs-wamsg" className="admin-input" rows={2} maxLength={300} value={f.whatsapp_message} onChange={set("whatsapp_message")} />
        </Field>
      </div>

      <div className="admin-card form-stack">
        <h2 className="admin-h2">Map</h2>
        <Field label="Map location" id="cs-map" hint="Type an address or a place name, as you would in Google Maps. If empty, the address above is used. The preview updates when you leave the field.">
          <input
            id="cs-map"
            className="admin-input"
            maxLength={300}
            value={f.map_query}
            onChange={set("map_query")}
            onBlur={() => setMapShown(f.map_query || f.address)}
          />
        </Field>
        {mapShown && (
          <div style={{ position: "relative", height: "260px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
            <iframe
              title="Map preview"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapShown)}&output=embed`}
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
        )}
      </div>

      <div className="admin-card form-stack">
        <h2 className="admin-h2">Contact page text</h2>
        <Field label="Banner heading" id="cs-heading">
          <input id="cs-heading" className="admin-input" maxLength={150} value={f.contact_heading} onChange={set("contact_heading")} />
        </Field>
        <Field label="Banner text" id="cs-sub" hint="The line under the heading.">
          <textarea id="cs-sub" className="admin-input" rows={2} maxLength={300} value={f.contact_subheading} onChange={set("contact_subheading")} />
        </Field>
      </div>

      {msg && (
        <p role="status" className={msg.ok ? "admin-ok" : "admin-error"} style={{ fontSize: "1.05rem" }}>
          {msg.text}
        </p>
      )}

      <div>
        <button type="submit" className="admin-btn primary" style={{ padding: "14px 28px", fontSize: "1.05rem" }} disabled={busy}>
          <Save size={18} /> {busy ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, id, hint, children }: { label: string; id: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="admin-label" htmlFor={id}>{label}</label>
      {hint && <p className="admin-hint" style={{ marginBottom: "8px" }}>{hint}</p>}
      {children}
    </div>
  );
}
