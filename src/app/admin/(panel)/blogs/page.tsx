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
  const featuredCount = blogs.filter((b) => b.is_featured).length;

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 className="admin-title">Blog Posts</h1>
          <p className="admin-sub" style={{ marginBottom: 0 }}>
            Manage educational articles, legal guides, and IEPF recovery resources.
          </p>
        </div>
        <Link href="/admin/blogs/new" className="admin-btn primary">
          <Plus size={18} /> New Post
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "24px" }}>
        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "rgba(184, 134, 70, 0.12)", borderRadius: "10px", color: "var(--gold-primary)" }}>
            <Newspaper size={24} />
          </div>
          <div>
            <div className="stat-num">{blogs.length}</div>
            <div className="stat-label">Total Articles</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "#e8f5e9", borderRadius: "10px", color: "#2e7d32" }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-num">{publishedCount}</div>
            <div className="stat-label">Published Live</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "#f5f5f5", borderRadius: "10px", color: "#666" }}>
            <FileText size={24} />
          </div>
          <div>
            <div className="stat-num">{draftCount}</div>
            <div className="stat-label">Drafts</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "#fff8e1", borderRadius: "10px", color: "#b78103" }}>
            <FolderKanban size={24} />
          </div>
          <div>
            <div className="stat-num">{BLOG_CATEGORIES.length}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>
      </div>

      {/* Blog List Component */}
      <BlogList initialBlogs={blogs} />
    </div>
  );
}
