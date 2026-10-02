"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Calendar, ArrowRight, User, Star, BookOpen, ShieldCheck } from "lucide-react";
import { BLOG_CATEGORIES, type BlogSummary } from "@/lib/blogs-shared";

export default function BlogListingClient({ blogs }: { blogs: BlogSummary[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const featuredPost = useMemo(() => {
    return blogs.find((b) => b.is_featured) || blogs[0];
  }, [blogs]);

  // Exclude featured post from the main grid if we are on "All" without search
  const gridPosts = useMemo(() => {
    if (selectedCategory === "All" && searchQuery === "" && featuredPost) {
      return filteredBlogs.filter((b) => b.id !== featuredPost.id);
    }
    return filteredBlogs;
  }, [filteredBlogs, selectedCategory, searchQuery, featuredPost]);

  return (
    <div>
      {/* Search & Filter Bar */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "20px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid var(--border-subtle, #e5ded3)",
          marginBottom: "40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Search Box */}
          <div style={{ position: "relative" }}>
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted, #736b5e)",
              }}
            />
            <input
              type="text"
              placeholder="Search guides by title, company (e.g. Reliance, IEPF), or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px 14px 48px",
                borderRadius: "10px",
                border: "1px solid var(--border-subtle, #e5ded3)",
                fontSize: "1rem",
                outline: "none",
                background: "#faf8f5",
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                fontSize: "0.92rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid",
                borderColor: selectedCategory === "All" ? "var(--gold-primary, #b88646)" : "var(--border-subtle, #e5ded3)",
                background: selectedCategory === "All" ? "var(--gold-primary, #b88646)" : "#fff",
                color: selectedCategory === "All" ? "#fff" : "var(--text-body, #423d33)",
                transition: "all 0.2s ease",
              }}
            >
              All Articles ({blogs.length})
            </button>
            {BLOG_CATEGORIES.map((cat) => {
              const count = blogs.filter((b) => b.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: isSelected ? "var(--gold-primary, #b88646)" : "var(--border-subtle, #e5ded3)",
                    background: isSelected ? "var(--gold-primary, #b88646)" : "#fff",
                    color: isSelected ? "#fff" : "var(--text-body, #423d33)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Spotlight Card (Shown when on "All" & no active search) */}
      {selectedCategory === "All" && searchQuery === "" && featuredPost && (
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid var(--border-subtle, #e5ded3)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            }}
          >
            {/* Image Side */}
            <div style={{ position: "relative", minHeight: "320px", background: "#101c16" }}>
              {featuredPost.image_url ? (
                <Image
                  src={featuredPost.image_url}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <BookOpen size={64} opacity={0.3} />
                </div>
              )}
            </div>

            {/* Content Side */}
            <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: "rgba(184, 134, 70, 0.14)",
                      color: "var(--gold-dark, #8b622c)",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem", color: "var(--text-muted, #736b5e)" }}>
                    <Clock size={14} /> {featuredPost.read_time}
                  </span>
                </div>

                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--dark-forest, #101c16)", lineHeight: 1.3, marginBottom: "14px" }}>
                  <Link href={`/blog/${featuredPost.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p style={{ fontSize: "1.05rem", color: "var(--text-body, #423d33)", lineHeight: 1.6, marginBottom: "20px" }}>
                  {featuredPost.excerpt}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border-light, #f0eae1)",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--gold-primary, #b88646)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  >
                    <User size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-headline, #101c16)" }}>
                      {featuredPost.author}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted, #736b5e)" }}>
                      {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="btn-primary-gold"
                  style={{
                    padding: "10px 22px",
                    fontSize: "0.95rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Read Full Guide <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div style={{ marginBottom: "60px" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--dark-forest, #101c16)", marginBottom: "24px" }}>
          {selectedCategory === "All" && searchQuery === ""
            ? "Recent Articles & Guides"
            : `Showing results (${filteredBlogs.length})`}
        </h3>

        {gridPosts.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "60px 24px",
              textAlign: "center",
              border: "1px solid var(--border-subtle, #e5ded3)",
            }}
          >
            <BookOpen size={48} style={{ margin: "0 auto 16px", opacity: 0.3, color: "var(--gold-primary)" }} />
            <h4 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--dark-forest, #101c16)", marginBottom: "8px" }}>
              No articles found
            </h4>
            <p style={{ color: "var(--text-muted, #736b5e)", maxWidth: "400px", margin: "0 auto 20px" }}>
              We couldn&apos;t find any guides matching your criteria. Try adjusting your search query or explore all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="btn-primary-gold"
              style={{ padding: "10px 20px" }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {gridPosts.map((post) => {
              const postDate = new Date(post.published_at || post.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <article
                  key={post.id}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle, #e5ded3)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {/* Thumbnail */}
                  <Link href={`/blog/${post.slug}`} style={{ position: "relative", height: "200px", display: "block", background: "#f0eae1" }}>
                    {post.image_url ? (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                        }}
                      >
                        <BookOpen size={40} opacity={0.3} />
                      </div>
                    )}
                  </Link>

                  {/* Body */}
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(184, 134, 70, 0.12)",
                            color: "var(--gold-dark, #8b622c)",
                            padding: "3px 10px",
                            borderRadius: "5px",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                          }}
                        >
                          {post.category}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.8rem",
                            color: "var(--text-muted, #736b5e)",
                          }}
                        >
                          <span>{postDate}</span>
                          <span>•</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                            <Clock size={12} /> {post.read_time}
                          </span>
                        </div>
                      </div>

                      <h4
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          lineHeight: 1.4,
                          marginBottom: "10px",
                          color: "var(--dark-forest, #101c16)",
                        }}
                      >
                        <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                          {post.title}
                        </Link>
                      </h4>

                      <p
                        style={{
                          fontSize: "0.95rem",
                          color: "var(--text-body, #423d33)",
                          lineHeight: 1.5,
                          marginBottom: "18px",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "16px",
                        borderTop: "1px solid var(--border-light, #f0eae1)",
                      }}
                    >
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted, #736b5e)" }}>
                        {post.author}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          color: "var(--gold-primary, #b88646)",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Read More <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Free Assessment Banner CTA */}
      <div
        style={{
          background: "linear-gradient(135deg, #101c16, #1c3328)",
          borderRadius: "20px",
          padding: "40px 32px",
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              background: "rgba(184, 134, 70, 0.25)",
              color: "#dfb87c",
              borderRadius: "999px",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <ShieldCheck size={16} /> Free Eligibility & Claim Search
          </div>
          <h3 style={{ fontSize: "1.7rem", fontWeight: 800, marginBottom: "8px", color: "#fff" }}>
            Stuck with Unclaimed Shares, IEPF or Physical Certificates?
          </h3>
          <p style={{ fontSize: "1.05rem", color: "#d1dcda", lineHeight: 1.6, margin: 0 }}>
            Our legal desk provides end-to-end recovery assistance for IEPF claims, Demat conversion, and succession cases with zero upfront hidden fees.
          </p>
        </div>

        <div>
          <Link
            href="/contact"
            className="btn-primary-gold"
            style={{
              padding: "14px 28px",
              fontSize: "1.05rem",
              fontWeight: 700,
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Get Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
