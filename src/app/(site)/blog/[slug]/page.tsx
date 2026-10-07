import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  ChevronRight, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck,
  ListFilter,
  FileText,
  BadgeCheck,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import { extractHeadings } from "@/lib/blogs-shared";
import BlogContentRenderer from "./BlogContentRenderer";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Article Not Found | Vitt Management" };
  }

  const title = blog.meta_title || `${blog.title} | Vitt Management`;
  const description = blog.meta_description || blog.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.published_at,
      authors: [blog.author],
      images: blog.image_url ? [blog.image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.image_url ? [blog.image_url] : [],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.slug, blog.category, 3);
  const headings = extractHeadings(blog.content);

  const formattedDate = new Date(blog.published_at || blog.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const shareUrl = `https://vittmanagement.in/blog/${blog.slug}`;
  const shareText = encodeURIComponent(`${blog.title} - Read this guide on Vitt Management`);

  // Structured Schema for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.published_at,
    dateModified: blog.updated_at,
    author: {
      "@type": "Organization",
      name: blog.author,
      url: "https://vittmanagement.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Vitt Management",
      logo: {
        "@type": "ImageObject",
        url: "https://vittmanagement.in/images/final_logo.png",
      },
    },
    image: blog.image_url || undefined,
  };

  return (
    <div style={{ background: "var(--bg-page, #faf8f5)", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========================================================================= */}
      {/* 🌟 IDEA 1: MODERN MAGAZINE 2-COLUMN HERO HEADER                           */}
      {/* ========================================================================= */}
      <header
        style={{
          background: "linear-gradient(145deg, #0d1712 0%, #172a20 100%)",
          color: "#fff",
          padding: "48px 0 54px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container-custom" style={{ maxWidth: "1200px" }}>
          {/* Breadcrumbs */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
              fontSize: "0.85rem",
              color: "#9bb0a8",
              marginBottom: "24px",
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: "#d1dcda", textDecoration: "none" }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/blog" style={{ color: "#d1dcda", textDecoration: "none" }}>
              Blogs
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "#dfb87c", fontWeight: 600 }}>{blog.category}</span>
          </nav>

          {/* 2-Column Hero Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 400px",
              gap: "48px",
              alignItems: "center",
            }}
            className="hero-2col-grid"
          >
            {/* Left Column: Title, Metadata, Author & Share */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.22,
                  marginBottom: "16px",
                }}
              >
                {blog.title}
              </h1>

              <p
                style={{
                  fontSize: "1.08rem",
                  color: "#d1dcda",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                {blog.excerpt}
              </p>

              {/* Author & Publish Date Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "18px",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "var(--gold-primary, #b88646)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff" }}>
                      Written by {blog.author}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#9bb0a8" }}>
                      {formattedDate} • {blog.read_time}
                    </div>
                  </div>
                </div>

                {/* Quick Share Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.8rem", color: "#9bb0a8", marginRight: "4px" }}>Share:</span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "rgba(37, 211, 102, 0.18)",
                      color: "#25D366",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "rgba(10, 102, 194, 0.2)",
                      color: "#70b5f9",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Magazine Thumbnail Card */}
            {blog.image_url && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "2px solid rgba(184, 134, 70, 0.3)",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
                  background: "#101c16",
                }}
                className="hero-thumb-wrap"
              >
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 📖 MAIN EDITORIAL READING SECTION                                         */}
      {/* ========================================================================= */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="container-custom" style={{ maxWidth: "1200px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: "40px",
              alignItems: "start",
            }}
            className="blog-layout-grid"
          >
            {/* Main Article Body Column */}
            <main
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "36px 40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                border: "1px solid var(--border-subtle, #e5ded3)",
              }}
            >
              {/* Executive TL;DR Summary Box */}
              <div
                style={{
                  background: "linear-gradient(135deg, #fdfbf8 0%, #f6efe6 100%)",
                  border: "1px solid #ebd9c2",
                  borderLeft: "5px solid var(--gold-primary, #b88646)",
                  borderRadius: "10px",
                  padding: "20px 24px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "var(--dark-forest, #101c16)",
                    marginBottom: "8px",
                  }}
                >
                  <ShieldCheck size={20} color="var(--gold-primary, #b88646)" />
                  Executive Summary & Takeaways
                </div>
                <p style={{ fontSize: "0.98rem", color: "var(--text-body, #423d33)", margin: 0, lineHeight: 1.6 }}>
                  {blog.excerpt}
                </p>
              </div>

              {/* Rendered Markdown Content */}
              <BlogContentRenderer content={blog.content} />

              {/* In-Article Help / Folio Assistance Callout */}
              <div
                style={{
                  margin: "40px 0",
                  padding: "24px 28px",
                  background: "linear-gradient(135deg, #101c16 0%, #1d3327 100%)",
                  borderRadius: "14px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "18px",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
                    Facing Issues with IEPF Claim or RTAs?
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "#c0ceca", margin: 0, maxWidth: "460px" }}>
                    Our team can verify your company folio, prepare Form IEPF-5, and resolve signature mismatch cases legally.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="btn-primary-gold"
                  style={{
                    padding: "10px 20px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  Get Free Assessment
                </Link>
              </div>

              {/* Author Bio Box */}
              <div
                style={{
                  marginTop: "44px",
                  padding: "24px 28px",
                  background: "#faf8f5",
                  borderRadius: "14px",
                  border: "1px solid var(--border-subtle, #e5ded3)",
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--dark-forest, #101c16)",
                      color: "var(--gold-light, #dfb87c)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <User size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 4px", color: "var(--dark-forest, #101c16)" }}>
                      About {blog.author}
                    </h4>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-body, #423d33)", lineHeight: 1.6, margin: "0 0 12px" }}>
                      Specialized legal documentation and recovery desk at Vitt Management (A brand of VittEdge Global Advisory LLP). Handling physical share dematerialization, IEPF-5 claims, succession transmissions, and NRI asset repatriation.
                    </p>
                    <Link
                      href="/contact"
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        color: "var(--gold-primary, #b88646)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      Talk to our legal recovery desk <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </main>

            {/* Sticky Sidebar */}
            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                position: "sticky",
                top: "145px",
                zIndex: 10,
              }}
            >
              {/* Quick Consultation Form Box */}
              <div
                style={{
                  background: "linear-gradient(135deg, #101c16, #1c3328)",
                  borderRadius: "18px",
                  padding: "26px 22px",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(184, 134, 70, 0.25)",
                    color: "#dfb87c",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  <PhoneCall size={14} /> Free Eligibility Check
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>
                  Need Help Claiming Your Shares?
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#c0ceca", lineHeight: 1.5, margin: "0 0 18px" }}>
                  Get our legal desk to verify your IEPF or physical share folio status for free with zero obligation.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link
                    href="/contact"
                    className="btn-primary-gold"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "12px",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                    }}
                  >
                    Request Free Assessment
                  </Link>

                  <a
                    href="tel:+919275231114"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "10px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    <PhoneCall size={14} /> Call: +91 92752 31114
                  </a>
                </div>
              </div>

              {/* Table of Contents Box (if headings exist) */}
              {headings.length > 0 && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "22px",
                    border: "1px solid var(--border-subtle, #e5ded3)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--dark-forest, #101c16)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "0 0 14px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid var(--border-light, #f0eae1)",
                    }}
                  >
                    <ListFilter size={17} color="var(--gold-primary, #b88646)" /> Table of Contents
                  </h4>

                  <nav style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {headings.map((h, i) => (
                      <a
                        key={i}
                        href={`#${h.id}`}
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--text-body, #423d33)",
                          textDecoration: "none",
                          paddingLeft: h.level === 3 ? "12px" : "0",
                          lineHeight: 1.4,
                          fontWeight: h.level === 2 ? 600 : 400,
                        }}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Back to Blogs link */}
              <Link
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "var(--gold-dark, #8b622c)",
                  textDecoration: "none",
                  padding: "6px 0",
                }}
              >
                <ArrowLeft size={16} /> Explore All Blogs
              </Link>
            </aside>
          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <section style={{ marginTop: "60px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--dark-forest, #101c16)", margin: 0 }}>
                  Related Blogs & Articles
                </h3>
                <Link
                  href="/blog"
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "var(--gold-primary, #b88646)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  View all <ArrowRight size={15} />
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "24px",
                }}
              >
                {relatedBlogs.map((rel) => (
                  <article
                    key={rel.id}
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid var(--border-subtle, #e5ded3)",
                      padding: "22px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          background: "rgba(184, 134, 70, 0.12)",
                          color: "var(--gold-dark, #8b622c)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          marginBottom: "10px",
                        }}
                      >
                        {rel.category}
                      </span>
                      <h4 style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 8px" }}>
                        <Link href={`/blog/${rel.slug}`} style={{ color: "var(--dark-forest, #101c16)", textDecoration: "none" }}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--text-muted, #736b5e)",
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          margin: 0,
                        }}
                      >
                        {rel.excerpt}
                      </p>
                    </div>

                    <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border-light, #f0eae1)" }}>
                      <Link
                        href={`/blog/${rel.slug}`}
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "var(--gold-primary, #b88646)",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Read Guide <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .hero-2col-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .hero-thumb-wrap {
            max-width: 440px;
          }
          .blog-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
