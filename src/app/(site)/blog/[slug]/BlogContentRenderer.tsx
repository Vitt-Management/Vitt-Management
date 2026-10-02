"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight, Lightbulb } from "lucide-react";

export default function BlogContentRenderer({ content }: { content: string }) {
  const renderedContent = useMemo(() => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let inList = false;

    const flushList = (keyPrefix: number) => {
      if (inList && currentList.length > 0) {
        elements.push(
          <div
            key={`list-${keyPrefix}`}
            style={{
              margin: "20px 0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {currentList}
          </div>
        );
        currentList = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Heading 2 (##)
      if (trimmed.startsWith("## ")) {
        flushList(index);
        const text = trimmed.replace("## ", "").trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        elements.push(
          <div key={index} style={{ marginTop: "40px", marginBottom: "18px" }}>
            <h2
              id={id}
              style={{
                fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                fontSize: "1.65rem",
                fontWeight: 700,
                color: "var(--dark-forest, #101c16)",
                lineHeight: 1.3,
                scrollMarginTop: "150px",
                display: "inline-block",
                position: "relative",
              }}
            >
              {text}
            </h2>
            <div
              style={{
                width: "48px",
                height: "3px",
                background: "var(--gold-primary, #b88646)",
                borderRadius: "2px",
                marginTop: "6px",
              }}
            />
          </div>
        );
        return;
      }

      // Heading 3 (###)
      if (trimmed.startsWith("### ")) {
        flushList(index);
        const text = trimmed.replace("### ", "").trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        elements.push(
          <h3
            key={index}
            id={id}
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--dark-forest, #101c16)",
              marginTop: "28px",
              marginBottom: "12px",
              lineHeight: 1.4,
              scrollMarginTop: "150px",
            }}
          >
            {text}
          </h3>
        );
        return;
      }

      // Horizontal Rule (---)
      if (trimmed === "---" || trimmed === "***") {
        flushList(index);
        elements.push(
          <hr
            key={index}
            style={{
              border: "none",
              borderTop: "1px solid var(--border-subtle, #e5ded3)",
              margin: "36px 0",
            }}
          />
        );
        return;
      }

      // Callout quote (> text)
      if (trimmed.startsWith("> ")) {
        flushList(index);
        const quoteText = trimmed.replace("> ", "").trim();
        elements.push(
          <div
            key={index}
            style={{
              margin: "24px 0",
              padding: "18px 22px",
              background: "linear-gradient(135deg, #faf7f2 0%, #f4ede2 100%)",
              borderLeft: "4px solid var(--gold-primary, #b88646)",
              borderRadius: "0 12px 12px 0",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <Lightbulb size={20} color="var(--gold-primary, #b88646)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p
              style={{
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--text-body, #423d33)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {quoteText}
            </p>
          </div>
        );
        return;
      }

      // Bullet List (- or *)
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        const itemText = trimmed.replace(/^[-*]\s+/, "");
        currentList.push(
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "1.02rem",
              lineHeight: 1.6,
              color: "var(--text-body, #423d33)",
            }}
          >
            <CheckCircle2
              size={18}
              style={{ color: "var(--gold-primary, #b88646)", flexShrink: 0, marginTop: "3px" }}
            />
            <div dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </div>
        );
        return;
      }

      // Numbered List (1. text)
      if (/^\d+\.\s+/.test(trimmed)) {
        flushList(index);
        const num = trimmed.match(/^\d+/)?.[0] || "1";
        const itemText = trimmed.replace(/^\d+\.\s+/, "");
        elements.push(
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              margin: "14px 0",
              padding: "12px 16px",
              background: "#faf8f5",
              borderRadius: "10px",
              border: "1px solid var(--border-subtle, #e5ded3)",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "var(--dark-forest, #101c16)",
                color: "var(--gold-light, #dfb87c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {num}
            </span>
            <div
              style={{ fontSize: "1.02rem", lineHeight: 1.6, color: "var(--text-body, #423d33)" }}
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }}
            />
          </div>
        );
        return;
      }

      // Normal Paragraph
      if (trimmed !== "") {
        flushList(index);
        elements.push(
          <p
            key={index}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--text-body, #423d33)",
              marginBottom: "18px",
            }}
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
          />
        );
        return;
      }
    });

    flushList(lines.length);
    return elements;
  }, [content]);

  return <div className="blog-content-body">{renderedContent}</div>;
}

// Simple inline markdown formatting (bold, italic, code)
function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong style='color:var(--dark-forest, #101c16);font-weight:700;'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code style='background:#f0eae1;padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:monospace;'>$1</code>");
}
