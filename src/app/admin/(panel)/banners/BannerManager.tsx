"use client";

import React, { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { ArrowUp, ArrowDown, Trash2, Eye, EyeOff, Upload, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { addBanner, createUploadUrl, deleteBanner, moveBanner, updateBanner } from "./actions";

export interface BannerRow {
  id: string;
  image_url: string;
  alt_text: string;
  is_active: boolean;
}

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,image/avif";

export default function BannerManager({ banners }: { banners: BannerRow[] }) {
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, success?: string) =>
    startTransition(async () => {
      const r = await fn();
      setMessage(r.ok ? (success ? { ok: true, text: success } : null) : { ok: false, text: r.error ?? "Something went wrong." });
    });

  return (
    <>
      <UploadCard onMessage={setMessage} />

      {message && (
        <p role="status" className={message.ok ? "admin-ok" : "admin-error"} style={{ margin: "18px 0 0" }}>
          {message.text}
        </p>
      )}

      <div className="banner-list" style={{ marginTop: "24px" }}>
        {banners.length === 0 && (
          <div className="admin-card" style={{ fontSize: "1.05rem" }}>
            No banners yet. Until you add one, the website shows its default image.
          </div>
        )}
        {banners.map((b, i) => (
          <BannerCard
            key={`${b.id}:${b.alt_text}:${b.is_active}`}
            banner={b}
            isFirst={i === 0}
            isLast={i === banners.length - 1}
            disabled={pending}
            onMove={(dir) => run(() => moveBanner(b.id, dir))}
            onSave={(alt, active, text) => run(() => updateBanner(b.id, alt, active), text)}
            onDelete={() => {
              if (confirm("Delete this banner permanently?")) run(() => deleteBanner(b.id), "Banner deleted.");
            }}
          />
        ))}
      </div>
    </>
  );
}

function BannerCard({
  banner,
  isFirst,
  isLast,
  disabled,
  onMove,
  onSave,
  onDelete,
}: {
  banner: BannerRow;
  isFirst: boolean;
  isLast: boolean;
  disabled: boolean;
  onMove: (dir: "up" | "down") => void;
  onSave: (alt: string, active: boolean, message: string) => void;
  onDelete: () => void;
}) {
  const [alt, setAlt] = useState(banner.alt_text);
  const dirty = alt.trim() !== banner.alt_text;

  return (
    <div className="admin-card banner-row" style={{ opacity: banner.is_active ? 1 : 0.7 }}>
      <div className="banner-thumb">
        <Image src={banner.image_url} alt={banner.alt_text} fill sizes="200px" style={{ objectFit: "cover" }} />
      </div>

      <div>
        <span className={`pill ${banner.is_active ? "on" : "off"}`}>{banner.is_active ? "Visible" : "Hidden"}</span>
        <label className="admin-label" htmlFor={`alt-${banner.id}`} style={{ marginTop: "12px" }}>
          Image description (for accessibility)
        </label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <input
            id={`alt-${banner.id}`}
            className="admin-input"
            style={{ flex: "1 1 240px" }}
            maxLength={200}
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
          <button className="admin-btn" disabled={disabled || !dirty} onClick={() => onSave(alt, banner.is_active, "Description saved.")}>
            <Save size={18} /> Save
          </button>
        </div>
      </div>

      <div className="banner-actions">
        <button className="admin-btn icon" aria-label="Move up" title="Move up" disabled={disabled || isFirst} onClick={() => onMove("up")}>
          <ArrowUp size={20} />
        </button>
        <button className="admin-btn icon" aria-label="Move down" title="Move down" disabled={disabled || isLast} onClick={() => onMove("down")}>
          <ArrowDown size={20} />
        </button>
        <button
          className="admin-btn"
          disabled={disabled}
          onClick={() => onSave(banner.alt_text, !banner.is_active, banner.is_active ? "Banner hidden." : "Banner is now visible.")}
        >
          {banner.is_active ? <EyeOff size={18} /> : <Eye size={18} />} {banner.is_active ? "Hide" : "Show"}
        </button>
        <button className="admin-btn danger" disabled={disabled} onClick={onDelete}>
          <Trash2 size={18} /> Delete
        </button>
      </div>
    </div>
  );
}

function UploadCard({ onMessage }: { onMessage: (m: { ok: boolean; text: string } | null) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [busy, setBusy] = useState(false);

  const pick = (f: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
    onMessage(null);
  };

  const upload = async () => {
    if (!file) return;
    if (file.size > MAX_BYTES) return onMessage({ ok: false, text: "Image must be 5 MB or smaller." });
    setBusy(true);
    try {
      const signed = await createUploadUrl(file.type, file.size);
      if (!signed.ok) return onMessage({ ok: false, text: signed.error });

      const { error } = await createClient().storage.from("banners").uploadToSignedUrl(signed.path, signed.token, file, { contentType: file.type });
      if (error) return onMessage({ ok: false, text: "Upload failed. Please try again." });

      const saved = await addBanner(signed.path, alt);
      if (!saved.ok) return onMessage({ ok: false, text: saved.error });

      onMessage({ ok: true, text: "Banner added. It is now live on the home page." });
      pick(null);
      setAlt("");
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      onMessage({ ok: false, text: "Upload failed. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-card">
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "16px" }}>Add a new banner</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", alignItems: "start" }}>
        <div>
          <label className="admin-label" htmlFor="banner-file">Image (JPG, PNG, WebP or AVIF, up to 5 MB)</label>
          <input id="banner-file" ref={fileRef} type="file" accept={ACCEPT} className="admin-input" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
          <label className="admin-label" htmlFor="banner-alt" style={{ marginTop: "16px" }}>Image description</label>
          <input id="banner-alt" className="admin-input" maxLength={200} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="e.g. Old share certificates and a magnifying glass" />
          <button className="admin-btn primary" style={{ marginTop: "18px" }} disabled={!file || busy} onClick={upload}>
            <Upload size={18} /> {busy ? "Uploading..." : "Upload banner"}
          </button>
        </div>
        {preview && (
          <div className="banner-thumb" style={{ width: "100%", maxWidth: "320px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview of the selected image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>
    </div>
  );
}
