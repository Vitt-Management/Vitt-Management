"use client";

import React, { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Heading2, 
  Heading3, 
  Bold, 
  List, 
  Quote, 
  CheckSquare, 
  Link as LinkIcon,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  Check
} from "lucide-react";
import { saveBlog } from "./actions";
import { uploadImageAction } from "@/app/admin/image-actions";
import { BLOG_CATEGORIES, type BlogItem } from "@/lib/blogs-shared";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm({ blog }: { blog?: BlogItem | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(blog?.title ?? "");
  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [isSlugCustom, setIsSlugCustom] = useState(Boolean(blog));
  const [category, setCategory] = useState(blog?.category ?? "IEPF Recovery");
  const [author, setAuthor] = useState(blog?.author ?? "Vitt Legal Desk");
  const [readTime, setReadTime] = useState(blog?.read_time ?? "5 min read");
  const [imageUrl, setImageUrl] = useState(blog?.image_url ?? "/images/service-iepf.jpg");
  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? "");
  const [content, setContent] = useState(blog?.content ?? "");
  const [isPublished, setIsPublished] = useState(blog?.is_published ?? true);
  const [isFeatured, setIsFeatured] = useState(blog?.is_featured ?? false);
  const [metaTitle, setMetaTitle] = useState(blog?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(blog?.meta_description ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageKitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadMessage(null);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "/vitt-blogs");

    const res = await uploadImageAction(fd);
    setUploadingImage(false);

    if (res.ok && res.url) {
      setImageUrl(res.url);
      setUploadMessage({ ok: true, text: "Uploaded to ImageKit successfully!" });
    } else {
      setUploadMessage({ ok: false, text: res.error || "Image upload failed." });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugCustom) {
      setSlug(slugify(val));
    }
  };

  const insertMarkdown = (prefix: string, suffix = "") => {
    if (!contentRef.current) return;
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;

    const newContent =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected ? selected.length : 4)
      );
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("read_time", readTime);
    formData.append("image_url", imageUrl);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    if (isPublished) formData.append("is_published", "on");
    if (isFeatured) formData.append("is_featured", "on");
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);

    startTransition(async () => {
      const res = await saveBlog(blog?.id ?? null, formData);
      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setError(res.error ?? "Failed to save blog post.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/blogs" className="admin-btn icon" title="Back to blogs">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="admin-title" style={{ fontSize: "1.6rem", margin: 0 }}>
              {blog ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="admin-hint" style={{ margin: 0 }}>
              Publish educational articles and guides matched to Vitt&apos;s recovery services.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/blogs" className="admin-btn">
            Cancel
          </Link>
          <button type="submit" className="admin-btn primary" disabled={pending}>
            <Save size={18} /> {pending ? "Saving..." : blog ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>

      {error && (
        <div
          className="admin-error"
          style={{
            background: "#fde8e8",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {/* Main Form Fields */}
      <div className="form-stack">
        {/* Basic Details Card */}
        <div className="admin-card">
          <h2 className="admin-h2" style={{ marginBottom: "16px" }}>Post Details</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label className="admin-label" htmlFor="title">
                Blog Title <span style={{ color: "#b3261e" }}>*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. How to File Form IEPF-5: Complete Guide"
                className="admin-input"
                style={{ fontSize: "1.1rem", fontWeight: 600 }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label className="admin-label" htmlFor="slug">
                  URL Slug <span style={{ color: "#b3261e" }}>*</span>
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    id="slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setIsSlugCustom(true);
                      setSlug(slugify(e.target.value));
                    }}
                    placeholder="how-to-file-form-iepf-5"
                    className="admin-input"
                  />
                </div>
                <span className="admin-hint" style={{ fontSize: "0.85rem", marginTop: "4px", display: "block" }}>
                  URL preview: /blog/{slug || "your-slug"}
                </span>
              </div>

              <div>
                <label className="admin-label" htmlFor="category">
                  Service Category <span style={{ color: "#b3261e" }}>*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="admin-input"
                  style={{ height: "46px" }}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label className="admin-label" htmlFor="author">Author Name</label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="admin-input"
                  placeholder="Vitt Legal Desk"
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="readTime">Read Time</label>
                <input
                  id="readTime"
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="admin-input"
                  placeholder="5 min read"
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="imageUrl">Featured Image (ImageKit)</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    id="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="admin-input"
                    placeholder="https://ik.imagekit.io/... or /images/..."
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageKitUpload}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="admin-btn"
                    disabled={uploadingImage}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                    {uploadingImage ? "Uploading..." : "Upload"}
                  </button>
                </div>
                {uploadMessage && (
                  <span
                    style={{
                      fontSize: "0.82rem",
                      color: uploadMessage.ok ? "#2e7d32" : "#b3261e",
                      marginTop: "4px",
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
                    {uploadMessage.text}
                  </span>
                )}
              </div>
            </div>

            {/* Image Preview if URL exists */}
            {imageUrl && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px",
                  background: "#faf8f5",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "56px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "#eee",
                    flexShrink: 0,
                  }}
                >
                  <Image src={imageUrl} alt="Preview" fill sizes="80px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-headline)" }}>
                    Selected Image Preview
                  </span>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      margin: "2px 0 0",
                      wordBreak: "break-all",
                    }}
                  >
                    {imageUrl}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="admin-label" htmlFor="excerpt">
                Short Excerpt / Summary <span style={{ color: "#b3261e" }}>*</span>
              </label>
              <textarea
                id="excerpt"
                rows={2}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="2-3 sentence overview shown on blog cards and search engines..."
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Content Markdown Editor Card */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h2 className="admin-h2" style={{ margin: 0 }}>Article Content (Markdown)</h2>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                type="button"
                className="admin-btn icon"
                title="Heading 2"
                onClick={() => insertMarkdown("## ")}
              >
                <Heading2 size={16} />
              </button>
              <button
                type="button"
                className="admin-btn icon"
                title="Heading 3"
                onClick={() => insertMarkdown("### ")}
              >
                <Heading3 size={16} />
              </button>
              <button
                type="button"
                className="admin-btn icon"
                title="Bold Text"
                onClick={() => insertMarkdown("**", "**")}
              >
                <Bold size={16} />
              </button>
              <button
                type="button"
                className="admin-btn icon"
                title="Bullet List"
                onClick={() => insertMarkdown("- ")}
              >
                <List size={16} />
              </button>
              <button
                type="button"
                className="admin-btn icon"
                title="Callout Quote"
                onClick={() => insertMarkdown("> ")}
              >
                <Quote size={16} />
              </button>
            </div>
          </div>

          <textarea
            ref={contentRef}
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article using Markdown. Use ## for section headings, - for bullet lists, and **bold** for highlights..."
            className="admin-input"
            style={{ fontFamily: "monospace", fontSize: "0.95rem", lineHeight: 1.6 }}
          />
        </div>

        {/* SEO Meta Tags Card */}
        <div className="admin-card">
          <h2 className="admin-h2" style={{ marginBottom: "16px" }}>SEO & Meta Tags</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label className="admin-label" htmlFor="metaTitle">Custom Meta Title</label>
              <input
                id="metaTitle"
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Leave blank to use blog title"
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label" htmlFor="metaDescription">Meta Description</label>
              <textarea
                id="metaDescription"
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Leave blank to use short excerpt"
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Publish & Status Card */}
        <div className="admin-card">
          <h2 className="admin-h2" style={{ marginBottom: "16px" }}>Publishing Settings</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--gold-primary)" }}
              />
              <span style={{ fontWeight: 600 }}>Published (Visible on live website)</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--gold-primary)" }}
              />
              <span style={{ fontWeight: 600 }}>Featured Article (Show on top of blog page)</span>
            </label>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
          <Link href="/admin/blogs" className="admin-btn">
            Cancel
          </Link>
          <button type="submit" className="admin-btn primary" disabled={pending}>
            <Save size={18} /> {pending ? "Saving..." : blog ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
