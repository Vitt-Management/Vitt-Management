import React from "react";
import Link from "next/link";
import { Plus, Newspaper, CheckCircle, FileText, FolderKanban } from "lucide-react";
import { getAllBlogsAdmin, BLOG_CATEGORIES } from "@/lib/blogs";
import BlogList from "./BlogList";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await getAllBlogsAdmin();

  const publishedCount = blogs.filter((b) => b.is_published).length;
  const draftCount = blogs.filter((b) => !b.is_published).length;

  return (
    <div style={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 className="admin-title" style={{ fontSize: "1.8rem", margin: 0 }}>
            Blog Posts
          </h1>
          <p className="admin-sub" style={{ margin: "4px 0 0", fontSize: "0.95rem" }}>
            Manage educational articles, legal guides, and IEPF recovery resources.
          </p>
        </div>
        <Link href="/admin/blogs/new" className="admin-btn primary">
          <Plus size={18} /> New Post
        </Link>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px" }}>
          <div style={{ padding: "10px", background: "rgba(184, 134, 70, 0.12)", borderRadius: "8px", color: "var(--gold-primary)" }}>
            <Newspaper size={22} />
          </div>
          <div>
            <div className="stat-num" style={{ fontSize: "1.8rem" }}>{blogs.length}</div>
            <div className="stat-label" style={{ fontSize: "0.85rem" }}>Total Articles</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px" }}>
          <div style={{ padding: "10px", background: "#e8f5e9", borderRadius: "8px", color: "#2e7d32" }}>
            <CheckCircle size={22} />
          </div>
          <div>
            <div className="stat-num" style={{ fontSize: "1.8rem" }}>{publishedCount}</div>
            <div className="stat-label" style={{ fontSize: "0.85rem" }}>Published Live</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px" }}>
          <div style={{ padding: "10px", background: "#f5f5f5", borderRadius: "8px", color: "#666" }}>
            <FileText size={22} />
          </div>
          <div>
            <div className="stat-num" style={{ fontSize: "1.8rem" }}>{draftCount}</div>
            <div className="stat-label" style={{ fontSize: "0.85rem" }}>Drafts</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px" }}>
          <div style={{ padding: "10px", background: "#fff8e1", borderRadius: "8px", color: "#b78103" }}>
            <FolderKanban size={22} />
          </div>
          <div>
            <div className="stat-num" style={{ fontSize: "1.8rem" }}>{BLOG_CATEGORIES.length}</div>
            <div className="stat-label" style={{ fontSize: "0.85rem" }}>Categories</div>
          </div>
        </div>
      </div>

      {/* Blog List Component */}
      <BlogList initialBlogs={blogs} />
    </div>
  );
}
