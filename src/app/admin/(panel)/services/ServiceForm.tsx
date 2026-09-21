"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, Plus, Trash2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { createService, createServiceImageUpload, updateService, type ServiceInput } from "./actions";

export interface ServiceFormData {
  id?: string;
  title: string;
  slug: string;
  short_description: string;
  tagline: string;
  overview: string;
  who_for: string[];
  documents: string[];
  how_we_help: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  is_active: boolean;
  image_url: string | null;
}

export const EMPTY_SERVICE: ServiceFormData = {
  title: "",
  slug: "",
  short_description: "",
  tagline: "",
  overview: "",
  who_for: [],
  documents: [],
  how_we_help: [{ title: "", description: "" }],
  faqs: [],
  is_active: true,
  image_url: null,
};

const MAX_BYTES = 5 * 1024 * 1024;
const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);
const toLines = (text: string) => text.split("\n").map((l) => l.trim()).filter(Boolean);

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const copy = [...arr];
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
}

export default function ServiceForm({ initial }: { initial: ServiceFormData }) {
  const router = useRouter();
  const isEdit = !!initial.id;
  const fileRef = useRef<HTMLInputElement>(null);

  const [f, setF] = useState({
    title: initial.title,
    slug: initial.slug,
    short_description: initial.short_description,
    tagline: initial.tagline,
    overview: initial.overview,
    who_for: initial.who_for.join("\n"),
    documents: initial.documents.join("\n"),
    how_we_help: initial.how_we_help,
    faqs: initial.faqs,
    is_active: initial.is_active,
  });
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof typeof f>(key: K, value: (typeof f)[K]) => setF((prev) => ({ ...prev, [key]: value }));

  const pickFile = (picked: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(picked);
    setPreview(picked ? URL.createObjectURL(picked) : null);
    setError("");
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (file && file.size > MAX_BYTES) return setError("Image must be 5 MB or smaller.");
    setBusy(true);
    try {
      let newImagePath: string | undefined;
      if (file) {
        const signed = await createServiceImageUpload(file.type, file.size);
        if (!signed.ok) return setError(signed.error);
        const up = await createClient().storage.from("banners").uploadToSignedUrl(signed.path, signed.token, file, { contentType: file.type });
        if (up.error) return setError("Image upload failed. Please try again.");
        newImagePath = signed.path;
      }

      const input: ServiceInput = {
        title: f.title,
        slug: f.slug,
        short_description: f.short_description,
        tagline: f.tagline,
        overview: f.overview,
        who_for: toLines(f.who_for),
        documents: toLines(f.documents),
        how_we_help: f.how_we_help,
        faqs: f.faqs,
        is_active: f.is_active,
        new_image_path: newImagePath,
      };
      const r = isEdit ? await updateService(initial.id!, input) : await createService(input);
      if (!r.ok) return setError(r.error);
      router.push("/admin/services");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const shownImage = preview ?? initial.image_url;

  return (
    <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Basics */}
      <div className="admin-card form-stack">
        <h2 className="admin-h2">Basics</h2>
        <Field label="Title" htmlFor="sv-title">
          <input
            id="sv-title"
            className="admin-input"
            required
            maxLength={200}
            value={f.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }}
          />
        </Field>
        <Field
          label="Page address"
          htmlFor="sv-slug"
          hint={isEdit ? "Changing this changes the page's web address, so old links to it will stop working." : "Used in the web address, e.g. /services/your-address"}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "1rem" }}>/services/</span>
            <input
              id="sv-slug"
              className="admin-input"
              required
              maxLength={100}
              value={f.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase());
              }}
            />
          </div>
        </Field>
        <Field label="Card text" htmlFor="sv-short" hint="A short line shown on the service card (home page and other services).">
          <textarea id="sv-short" className="admin-input" rows={2} maxLength={400} value={f.short_description} onChange={(e) => set("short_description", e.target.value)} />
        </Field>
        <Field label="Tagline" htmlFor="sv-tag" hint="Shown under the title at the top of the service page.">
          <textarea id="sv-tag" className="admin-input" rows={2} maxLength={300} value={f.tagline} onChange={(e) => set("tagline", e.target.value)} />
        </Field>
        <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.05rem", fontWeight: 600 }}>
          <input type="checkbox" checked={f.is_active} onChange={(e) => set("is_active", e.target.checked)} style={{ width: "20px", height: "20px" }} />
          Visible on the website
        </label>
      </div>

      {/* Image */}
      <div className="admin-card form-stack">
        <h2 className="admin-h2">Image</h2>
        <p className="admin-hint">Used on the service card and as the background of the page banner. JPG, PNG, WebP or AVIF, up to 5 MB.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", alignItems: "start" }}>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="admin-input" aria-label="Choose an image" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
          {shownImage && (
            <div className="banner-thumb" style={{ width: "100%", maxWidth: "320px" }}>
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Preview of the selected image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Image src={shownImage} alt="Current image" fill sizes="320px" style={{ objectFit: "cover" }} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="admin-card form-stack">
        <h2 className="admin-h2">Page content</h2>
        <Field label="About this service" htmlFor="sv-overview" hint="Leave a blank line between paragraphs.">
          <textarea id="sv-overview" className="admin-input" rows={10} maxLength={20000} value={f.overview} onChange={(e) => set("overview", e.target.value)} />
        </Field>
        <Field label="Who this is for" htmlFor="sv-who" hint="One point per line.">
          <textarea id="sv-who" className="admin-input" rows={6} value={f.who_for} onChange={(e) => set("who_for", e.target.value)} />
        </Field>
        <Field label="Documents commonly needed" htmlFor="sv-docs" hint="One item per line.">
          <textarea id="sv-docs" className="admin-input" rows={6} value={f.documents} onChange={(e) => set("documents", e.target.value)} />
        </Field>
      </div>

      {/* Steps */}
      <div className="admin-card form-stack">
        <h2 className="admin-h2">How we help (steps)</h2>
        {f.how_we_help.map((s, i) => (
          <div key={i} className="repeat-item">
            <div className="repeat-head">
              <strong>Step {i + 1}</strong>
              <RowButtons
                onUp={() => set("how_we_help", move(f.how_we_help, i, -1))}
                onDown={() => set("how_we_help", move(f.how_we_help, i, 1))}
                onRemove={() => set("how_we_help", f.how_we_help.filter((_, k) => k !== i))}
                first={i === 0}
                last={i === f.how_we_help.length - 1}
                label={`step ${i + 1}`}
              />
            </div>
            <input className="admin-input" placeholder="Step title" aria-label={`Step ${i + 1} title`} maxLength={200} value={s.title} onChange={(e) => set("how_we_help", f.how_we_help.map((x, k) => (k === i ? { ...x, title: e.target.value } : x)))} />
            <textarea className="admin-input" placeholder="What happens in this step" aria-label={`Step ${i + 1} description`} rows={2} maxLength={1000} value={s.description} onChange={(e) => set("how_we_help", f.how_we_help.map((x, k) => (k === i ? { ...x, description: e.target.value } : x)))} />
          </div>
        ))}
        <button type="button" className="admin-btn" style={{ alignSelf: "flex-start" }} onClick={() => set("how_we_help", [...f.how_we_help, { title: "", description: "" }])}>
          <Plus size={18} /> Add step
        </button>
      </div>

      {/* FAQs */}
      <div className="admin-card form-stack">
        <h2 className="admin-h2">Frequently asked questions</h2>
        {f.faqs.map((q, i) => (
          <div key={i} className="repeat-item">
            <div className="repeat-head">
              <strong>Question {i + 1}</strong>
              <RowButtons
                onUp={() => set("faqs", move(f.faqs, i, -1))}
                onDown={() => set("faqs", move(f.faqs, i, 1))}
                onRemove={() => set("faqs", f.faqs.filter((_, k) => k !== i))}
                first={i === 0}
                last={i === f.faqs.length - 1}
                label={`question ${i + 1}`}
              />
            </div>
            <input className="admin-input" placeholder="Question" aria-label={`Question ${i + 1}`} maxLength={300} value={q.question} onChange={(e) => set("faqs", f.faqs.map((x, k) => (k === i ? { ...x, question: e.target.value } : x)))} />
            <textarea className="admin-input" placeholder="Answer" aria-label={`Answer ${i + 1}`} rows={3} maxLength={2000} value={q.answer} onChange={(e) => set("faqs", f.faqs.map((x, k) => (k === i ? { ...x, answer: e.target.value } : x)))} />
          </div>
        ))}
        <button type="button" className="admin-btn" style={{ alignSelf: "flex-start" }} onClick={() => set("faqs", [...f.faqs, { question: "", answer: "" }])}>
          <Plus size={18} /> Add question
        </button>
      </div>

      {error && <p role="alert" className="admin-error" style={{ fontSize: "1.05rem" }}>{error}</p>}

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button type="submit" className="admin-btn primary" style={{ padding: "14px 28px", fontSize: "1.05rem" }} disabled={busy}>
          <Save size={18} /> {busy ? "Saving..." : isEdit ? "Save changes" : "Create service"}
        </button>
        <Link href="/admin/services" className="admin-btn" style={{ padding: "14px 24px", fontSize: "1.05rem" }}>
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="admin-label" htmlFor={htmlFor}>{label}</label>
      {hint && <p className="admin-hint" style={{ marginBottom: "8px" }}>{hint}</p>}
      {children}
    </div>
  );
}

function RowButtons({ onUp, onDown, onRemove, first, last, label }: { onUp: () => void; onDown: () => void; onRemove: () => void; first: boolean; last: boolean; label: string }) {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      <button type="button" className="admin-btn icon" aria-label={`Move ${label} up`} disabled={first} onClick={onUp}><ArrowUp size={18} /></button>
      <button type="button" className="admin-btn icon" aria-label={`Move ${label} down`} disabled={last} onClick={onDown}><ArrowDown size={18} /></button>
      <button type="button" className="admin-btn icon danger" aria-label={`Remove ${label}`} onClick={onRemove}><Trash2 size={18} /></button>
    </div>
  );
}
