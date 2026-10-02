"use client";

import React, { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import { 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Plus, 
  Search, 
  Star,
  BookOpen,
  ChevronDown
} from "lucide-react";
import { deleteBlog, setBlogPublished, setBlogFeatured } from "./actions";
import { BLOG_CATEGORIES, type BlogSummary } from "@/lib/blogs-shared";

export default function BlogList({ initialBlogs }: { initialBlogs: BlogSummary[] }) {
  const [blogs, setBlogs] = useState<BlogSummary[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const handleTogglePublish = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await setBlogPublished(id, !currentStatus);
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, is_published: !currentStatus } : b))
        );
        setMessage({
          ok: true,
          text: !currentStatus ? "Blog published." : "Blog moved to drafts.",
        });
      } else {
        setMessage({ ok: false, text: res.error || "Failed to update status." });
      }
    });
  };

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    startTransition(async () => {
      const res = await setBlogFeatured(id, !currentFeatured);
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, is_featured: !currentFeatured } : b))
        );
        setMessage({
          ok: true,
          text: !currentFeatured ? "Article pinned as Featured." : "Featured tag removed.",
        });
      } else {
        setMessage({ ok: false, text: res.error || "Failed to update featured flag." });
      }
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deleteBlog(id);
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setMessage({ ok: true, text: "Blog post deleted." });
      } else {
        setMessage({ ok: false, text: res.error || "Failed to delete." });
      }
    });
  };

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      {/* Status feedback message */}
      {message && (
        <p
          role="status"
          className={message.ok ? "admin-ok" : "admin-error"}
          style={{
            margin: "0 0 14px",
            padding: "8px 12px",
            background: message.ok ? "#e8f5e9" : "#fde8e8",
            borderRadius: "6px",
            fontSize: "0.9rem",
          }}
        >
          {message.text}
        </p>
      )}

      {/* Top Filter & Action Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "14px",
          background: "#fff",
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid var(--border-subtle)",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* Search & Category Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
          <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: "11px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search title, category, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                paddingLeft: "34px",
                paddingRight: "10px",
                fontSize: "0.88rem",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                background: "#faf8f5",
                color: "var(--text-headline)",
                boxSizing: "border-box",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div style={{ position: "relative", display: "inline-block" }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                height: "38px",
                padding: "0 32px 0 12px",
                fontSize: "0.88rem",
                fontWeight: 500,
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                background: "#faf8f5",
                color: "var(--text-headline)",
                cursor: "pointer",
                outline: "none",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                lineHeight: "36px",
                boxSizing: "border-box",
                fontFamily: "inherit",
                minWidth: "170px",
              }}
            >
              <option value="ALL">All Categories ({blogs.length})</option>
              {BLOG_CATEGORIES.map((cat) => {
                const count = blogs.filter((b) => b.category === cat).length;
                return (
                  <option key={cat} value={cat}>
                    {cat} ({count})
                  </option>
                );
              })}
            </select>
            <ChevronDown
              size={15}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--text-muted)",
              }}
            />
          </div>
        </div>

        {/* New Post Button */}
        <Link
          href="/admin/blogs/new"
          className="admin-btn primary"
          style={{ height: "38px", padding: "0 16px", whiteSpace: "nowrap", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {/* Table of Blog Posts */}
      <div className="admin-card" style={{ padding: "0", overflow: "hidden", width: "100%", boxSizing: "border-box" }}>
        <div className="table-scroll" style={{ width: "100%", overflowX: "auto" }}>
          <table className="leads-table" style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
              <tr style={{ background: "#faf8f5" }}>
                <th style={{ width: "35%", padding: "10px 14px" }}>Title</th>
                <th style={{ width: "21%", padding: "10px 14px" }}>Category</th>
                <th style={{ width: "17%", padding: "10px 14px 10px 24px" }}>Author</th>
                <th style={{ width: "9%", padding: "10px 10px" }}>Status</th>
                <th style={{ width: "9%", padding: "10px 10px" }}>Date</th>
                <th style={{ width: "9%", textAlign: "right", padding: "10px 14px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                    <BookOpen size={30} style={{ margin: "0 auto 8px", opacity: 0.4 }} />
                    <p style={{ fontSize: "0.95rem", fontWeight: 600, margin: 0 }}>No blog posts found</p>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => {
                  const formattedDate = new Date(blog.published_at || blog.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr key={blog.id} style={{ opacity: blog.is_published ? 1 : 0.65 }}>
                      {/* Title & Truncated Subtitle */}
                      <td style={{ padding: "10px 14px", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
                          {blog.is_featured && (
                            <span title="Featured" style={{ display: "inline-flex", flexShrink: 0 }}>
                              <Star size={13} fill="#b78103" color="#b78103" />
                            </span>
                          )}
                          <div style={{ minWidth: 0, overflow: "hidden" }}>
                            <Link
                              href={`/admin/blogs/${blog.id}`}
                              style={{
                                fontWeight: 700,
                                fontSize: "0.92rem",
                                color: "var(--text-headline)",
                                textDecoration: "none",
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              title={blog.title}
                            >
                              {blog.title}
                            </Link>
                            {blog.excerpt && (
                              <div
                                style={{
                                  fontSize: "0.8rem",
                                  color: "var(--text-muted)",
                                  marginTop: "1px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                                title={blog.excerpt}
                              >
                                {blog.excerpt}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: "10px 14px", verticalAlign: "middle", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            background: "rgba(184, 134, 70, 0.12)",
                            color: "var(--gold-dark, #8b622c)",
                          }}
                        >
                          {blog.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td 
                        style={{ 
                          padding: "10px 14px 10px 24px", 
                          verticalAlign: "middle", 
                          fontSize: "0.85rem", 
                          color: "var(--text-body)", 
                          whiteSpace: "nowrap", 
                          overflow: "hidden", 
                          textOverflow: "ellipsis" 
                        }} 
                        title={blog.author}
                      >
                        {blog.author}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "10px 10px", verticalAlign: "middle", whiteSpace: "nowrap" }}>
                        <span className={`pill ${blog.is_published ? "on" : "off"}`} style={{ fontSize: "0.75rem", padding: "2px 7px" }}>
                          {blog.is_published ? "Published" : "Draft"}
                        </span>
                      </td>

                      {/* Date */}
                      <td style={{ padding: "10px 10px", verticalAlign: "middle", fontSize: "0.82rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {formattedDate}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "10px 14px", verticalAlign: "middle", textAlign: "right", whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-flex", gap: "2px" }}>
                          {/* Toggle Featured */}
                          <button
                            type="button"
                            className="admin-btn icon"
                            title={blog.is_featured ? "Remove from Featured" : "Mark as Featured"}
                            disabled={pending}
                            onClick={() => handleToggleFeatured(blog.id, blog.is_featured)}
                            style={{ color: blog.is_featured ? "#b78103" : "#888", padding: "5px", border: "none", background: "transparent" }}
                          >
                            <Star size={15} fill={blog.is_featured ? "#b78103" : "none"} />
                          </button>

                          {/* Toggle Publish / Draft */}
                          <button
                            type="button"
                            className="admin-btn icon"
                            title={blog.is_published ? "Hide (Move to Draft)" : "Publish Live"}
                            disabled={pending}
                            onClick={() => handleTogglePublish(blog.id, blog.is_published)}
                            style={{ color: blog.is_published ? "var(--gold-primary)" : "#999", padding: "5px", border: "none", background: "transparent" }}
                          >
                            {blog.is_published ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>

                          {/* Edit */}
                          <Link
                            href={`/admin/blogs/${blog.id}`}
                            className="admin-btn icon"
                            title="Edit Blog"
                            style={{ color: "#2563eb", padding: "5px", border: "none", background: "transparent" }}
                          >
                            <Pencil size={15} />
                          </Link>

                          {/* View Live */}
                          {blog.is_published && (
                            <Link
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              className="admin-btn icon"
                              title="View Public Page"
                              style={{ color: "#059669", padding: "5px", border: "none", background: "transparent" }}
                            >
                              <ExternalLink size={15} />
                            </Link>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            className="admin-btn icon danger"
                            title="Delete Blog"
                            disabled={pending}
                            onClick={() => handleDelete(blog.id, blog.title)}
                            style={{ color: "#dc2626", padding: "5px", border: "none", background: "transparent" }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
