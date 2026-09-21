"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowDown, Eye, EyeOff, Pencil, Trash2, ExternalLink } from "lucide-react";
import { deleteService, moveService, setServiceActive } from "./actions";

export interface ServiceRow {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  image_url: string | null;
  is_active: boolean;
}

export default function ServiceList({ services }: { services: ServiceRow[] }) {
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, success?: string) =>
    startTransition(async () => {
      const r = await fn();
      setMessage(r.ok ? (success ? { ok: true, text: success } : null) : { ok: false, text: r.error ?? "Something went wrong." });
    });

  return (
    <>
      {message && (
        <p role="status" className={message.ok ? "admin-ok" : "admin-error"} style={{ margin: "0 0 16px" }}>
          {message.text}
        </p>
      )}

      <div className="banner-list">
        {services.length === 0 && <div className="admin-card" style={{ fontSize: "1.05rem" }}>No services yet. Click “Add service” to create one.</div>}

        {services.map((s, i) => (
          <div key={s.id} className="admin-card banner-row" style={{ opacity: s.is_active ? 1 : 0.7 }}>
            <div className="banner-thumb">
              {s.image_url && <Image src={s.image_url} alt="" fill sizes="200px" style={{ objectFit: "cover" }} />}
            </div>

            <div>
              <span className={`pill ${s.is_active ? "on" : "off"}`}>{s.is_active ? "Visible" : "Hidden"}</span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "8px 0 4px" }}>{s.title}</h2>
              <p style={{ fontSize: "1rem", color: "var(--text-body)", marginBottom: "4px" }}>{s.short_description}</p>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>/services/{s.slug}</p>
            </div>

            <div className="banner-actions">
              <button className="admin-btn icon" aria-label="Move up" title="Move up" disabled={pending || i === 0} onClick={() => run(() => moveService(s.id, "up"))}>
                <ArrowUp size={20} />
              </button>
              <button className="admin-btn icon" aria-label="Move down" title="Move down" disabled={pending || i === services.length - 1} onClick={() => run(() => moveService(s.id, "down"))}>
                <ArrowDown size={20} />
              </button>
              <Link href={`/admin/services/${s.id}`} className="admin-btn">
                <Pencil size={18} /> Edit
              </Link>
              <button
                className="admin-btn"
                disabled={pending}
                onClick={() => run(() => setServiceActive(s.id, !s.is_active), s.is_active ? "Service hidden from the website." : "Service is now visible.")}
              >
                {s.is_active ? <EyeOff size={18} /> : <Eye size={18} />} {s.is_active ? "Hide" : "Show"}
              </button>
              {s.is_active && (
                <Link href={`/services/${s.slug}`} target="_blank" className="admin-btn" aria-label={`View ${s.title} page`}>
                  <ExternalLink size={18} /> View
                </Link>
              )}
              <button
                className="admin-btn danger"
                disabled={pending}
                onClick={() => {
                  if (confirm(`Delete “${s.title}” permanently? Its page will stop working.`)) run(() => deleteService(s.id), "Service deleted.");
                }}
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
