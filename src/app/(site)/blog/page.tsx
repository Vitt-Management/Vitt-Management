import React from "react";
import type { Metadata } from "next";
import { getPublishedBlogs } from "@/lib/blogs";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Asset Recovery & IEPF Blogs | Vitt Management",
  description:
    "Educational blogs, step-by-step IEPF-5 filing procedures, demat conversion advice, and legal insights for recovering unclaimed investments in India.",
  openGraph: {
    title: "Asset Recovery & IEPF Blogs | Vitt Management",
    description:
      "Educational blogs, step-by-step IEPF-5 filing procedures, demat conversion advice, and legal insights for recovering unclaimed investments in India.",
    type: "website",
  },
};

export const revalidate = 60; // ISR cache revalidation every minute

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div style={{ background: "var(--bg-page, #faf8f5)", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Header Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #0e1813, #15241d)",
          color: "#fff",
          padding: "60px 0 50px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="container-custom">
          <span
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: "999px",
              background: "rgba(184, 134, 70, 0.22)",
              color: "#dfb87c",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "12px",
            }}
          >
            Blogs & Insights
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "14px",
            }}
          >
            Financial Asset & IEPF Recovery Blogs
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#c0ceca",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Master the legal procedures of claiming old physical shares, unpaid dividends, and IEPF authority funds with expert blogs from our legal advisory desk.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ paddingTop: "40px" }}>
        <div className="container-custom">
          <BlogListingClient blogs={blogs} />
        </div>
      </section>
    </div>
  );
}
