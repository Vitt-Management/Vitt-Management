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
  BookOpen
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
          text: !currentStatus ? "Blog post is now published and visible live." : "Blog post set to draft (hidden).",
        });
      } else {
        setMessage({ ok: false, text: res.error || "Failed to update blog status." });
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
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deleteBlog(id);
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setMessage({ ok: true, text: "Blog post deleted successfully." });
      } else {
        setMessage({ ok: false, text: res.error || "Failed to delete post." });
      }
    });
  };

  return (
    <div>
      {/* Status feedback message */}
      {message && (
        <p
          role="status"
          className={message.ok ? "admin-ok" : "admin-error"}
          style={{
            margin: "0 0 16px",
            padding: "10px 14px",
            background: message.ok ? "#e8f5e9" : "#fde8e8",
            borderRadius: "8px",
          }}
        >
          {message.text}
        </p>
      )}

      {/* Top Filter & Action Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          marginBottom: "20px",
          background: "#fff",
          padding: "16px 20px",
          borderRadius: "12px",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Search & Category Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", flex: 1, minWidth: "280px" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "12px",
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
              className="admin-input"
              style={{ paddingLeft: "38px", height: "42px" }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="admin-input"
            style={{ width: "auto", height: "42px", minWidth: "180px", cursor: "pointer" }}
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
        </div>

        {/* New Post Button */}
        <Link
          href="/admin/blogs/new"
          className="admin-btn primary"
          style={{ height: "42px", whiteSpace: "nowrap" }}
        >
          <Plus size={18} /> New Post
        </Link>
      </div>

      {/* Table of Blog Posts */}
      <div className="admin-card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="table-scroll">
          <table className="leads-table">
            <thead>
              <tr style={{ background: "#faf8f5" }}>
                <th style={{ width: "40%" }}>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                    <BookOpen size={36} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                    <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>No blog posts found</p>
                    <p style={{ fontSize: "0.95rem" }}>
                      {searchQuery || selectedCategory !== "ALL"
                        ? "Try adjusting your search or category filter."
                        : "Click '+ New Post' to publish your first article."}
                    </p>
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
                    <tr key={blog.id} style={{ opacity: blog.is_published ? 1 : 0.7 }}>
                      {/* Title & Excerpt */}
                      <td>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          {blog.is_featured && (
                            <span
                              title="Featured Article"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "2px 6px",
                                background: "#fff8e1",
                                color: "#b78103",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                marginTop: "2px",
                              }}
                            >
                              <Star size={12} fill="#b78103" style={{ marginRight: "3px" }} /> Featured
                            </span>
                          )}
                          <div>
                            <Link
                              href={`/admin/blogs/${blog.id}`}
                              style={{
                                fontWeight: 700,
                                fontSize: "1.02rem",
                                color: "var(--text-headline)",
                                textDecoration: "none",
                              }}
                            >
                              {blog.title}
                            </Link>
                            {blog.excerpt && (
                              <p
                                style={{
                                  fontSize: "0.88rem",
                                  color: "var(--text-muted)",
                                  margin: "3px 0 0",
                                  lineHeight: 1.4,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {blog.excerpt}
                              </p>
                            )}
                            <span style={{ fontSize: "0.8rem", color: "var(--gold-primary)", marginTop: "3px", display: "inline-block" }}>
                              /blog/{blog.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            background: "rgba(184, 134, 70, 0.12)",
                            color: "var(--gold-dark, #8b622c)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {blog.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td style={{ fontSize: "0.95rem", color: "var(--text-body)", whiteSpace: "nowrap" }}>
                        {blog.author}
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`pill ${blog.is_published ? "on" : "off"}`}>
                          {blog.is_published ? "Published" : "Draft"}
                        </span>
                      </td>

                      {/* Date & Read time */}
                      <td style={{ fontSize: "0.9rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        <div>{formattedDate}</div>
                        <div style={{ fontSize: "0.8rem" }}>{blog.read_time}</div>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          {/* Toggle Featured */}
                          <button
                            type="button"
                            className="admin-btn icon"
                            title={blog.is_featured ? "Remove from Featured" : "Mark as Featured"}
                            disabled={pending}
                            onClick={() => handleToggleFeatured(blog.id, blog.is_featured)}
                            style={{ color: blog.is_featured ? "#b78103" : "inherit" }}
                          >
                            <Star size={16} fill={blog.is_featured ? "#b78103" : "none"} />
                          </button>

                          {/* Toggle Publish / Draft */}
                          <button
                            type="button"
                            className="admin-btn icon"
                            title={blog.is_published ? "Unpublish (Move to Draft)" : "Publish Live"}
                            disabled={pending}
                            onClick={() => handleTogglePublish(blog.id, blog.is_published)}
                          >
                            {blog.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>

                          {/* Edit */}
                          <Link
                            href={`/admin/blogs/${blog.id}`}
                            className="admin-btn icon"
                            title="Edit Blog"
                          >
                            <Pencil size={16} />
                          </Link>

                          {/* View Live */}
                          {blog.is_published && (
                            <Link
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              className="admin-btn icon"
                              title="View Public Page"
                            >
                              <ExternalLink size={16} />
                            </Link>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            className="admin-btn icon danger"
                            title="Delete Blog"
                            disabled={pending}
                            onClick={() => handleDelete(blog.id, blog.title)}
                          >
                            <Trash2 size={16} />
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
