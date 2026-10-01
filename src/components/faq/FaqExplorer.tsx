"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  FolderOpen,
  FileCheck,
  ShieldAlert,
  Coins,
  Building,
  Scale,
  Briefcase,
  FileSpreadsheet,
  Globe,
  Award,
  Layers,
} from "lucide-react";
import type { FaqTopic } from "@/lib/faq-topics";

interface FaqExplorerProps {
  topics: FaqTopic[];
  initialTopic: string;
}

// Icon mapper for service & global topics to give luxury visual cues
function getTopicIcon(key: string, kind: string) {
  if (kind === "fees") return <Coins size={22} className="faq-card-icon" />;
  if (kind === "general") return <Layers size={22} className="faq-card-icon" />;

  const lower = key.toLowerCase();
  if (lower.includes("iepf") || lower.includes("dividend")) return <Coins size={22} className="faq-card-icon" />;
  if (lower.includes("demat") || lower.includes("physical")) return <FileCheck size={22} className="faq-card-icon" />;
  if (lower.includes("transmission") || lower.includes("duplicate")) return <FolderOpen size={22} className="faq-card-icon" />;
  if (lower.includes("nri")) return <Globe size={22} className="faq-card-icon" />;
  if (lower.includes("tax") || lower.includes("gst") || lower.includes("itr")) return <FileSpreadsheet size={22} className="faq-card-icon" />;
  if (lower.includes("company") || lower.includes("roc") || lower.includes("llp")) return <Building size={22} className="faq-card-icon" />;
  if (lower.includes("advisory") || lower.includes("consulting")) return <Briefcase size={22} className="faq-card-icon" />;
  if (lower.includes("claim") || lower.includes("legal")) return <Scale size={22} className="faq-card-icon" />;
  if (lower.includes("pf") || lower.includes("provident")) return <ShieldAlert size={22} className="faq-card-icon" />;

  return <Award size={22} className="faq-card-icon" />;
}

function FaqExplorerContent({ topics, initialTopic }: FaqExplorerProps) {
  // If initialTopic was explicitly passed in query params and is not default "general", open that topic
  const [activeKey, setActiveKey] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const topicParam = params.get("topic");
      if (topicParam && topics.some((t) => t.key === topicParam)) {
        return topicParam;
      }
      return null;
    }
    // Server / initial check:
    if (initialTopic && initialTopic !== "general" && topics.some((t) => t.key === initialTopic)) {
      return initialTopic;
    }
    return null;
  });

  const [query, setQuery] = useState<string>("");

  const selectTopic = (key: string | null) => {
    setActiveKey(key);
    const url = key ? `/faq?topic=${encodeURIComponent(key)}` : "/faq";
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", url);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const topicParam = params.get("topic");
      if (topicParam && topics.some((t) => t.key === topicParam)) {
        setActiveKey(topicParam);
      } else {
        setActiveKey(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [topics]);

  const generalTopics = useMemo(() => topics.filter((t) => t.kind === "general"), [topics]);
  const serviceTopics = useMemo(() => topics.filter((t) => t.kind === "service"), [topics]);
  const feesTopics = useMemo(() => topics.filter((t) => t.kind === "fees"), [topics]);

  const currentTopic = useMemo(() => {
    if (!activeKey) return null;
    return topics.find((t) => t.key === activeKey) ?? null;
  }, [topics, activeKey]);

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length >= 2;

  const searchResults = useMemo(() => {
    if (!isSearching) return null;
    const q = trimmedQuery.toLowerCase();
    return topics
      .map((topic) => ({
        ...topic,
        faqs: topic.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(q) ||
            faq.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((topic) => topic.faqs.length > 0);
  }, [isSearching, trimmedQuery, topics]);

  const totalSearchResultsCount = useMemo(() => {
    return searchResults?.reduce((sum, t) => sum + t.faqs.length, 0) ?? 0;
  }, [searchResults]);

  const totalFaqsCount = useMemo(() => {
    return topics.reduce((sum, t) => sum + t.faqs.length, 0);
  }, [topics]);

  return (
    <div className="faq-center-container">
      {/* Search Bar (Centered at Top - Option 1) */}
      <div className="faq-hero-search">
        <h2 className="faq-search-headline">How can we help you today?</h2>
        <p className="faq-search-subline">
          Search across {totalFaqsCount > 0 ? `${totalFaqsCount}+` : "all"} answers or browse by category below.
        </p>
        <label htmlFor="faq-search-input" className="sr-only">
          Search questions across all topics
        </label>
        <div className="faq-search-input-box">
          <Search size={20} className="faq-search-icon" aria-hidden="true" />
          <input
            id="faq-search-input"
            type="text"
            className="faq-search-input"
            placeholder="Type a keyword, e.g. IEPF claim, duplicate shares, fees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length > 0 && (
            <button
              type="button"
              className="faq-search-clear-btn"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 1. Live Search Results View */}
      {isSearching ? (
        <div className="faq-search-view">
          <div className="faq-search-status" aria-live="polite">
            Found {totalSearchResultsCount} {totalSearchResultsCount === 1 ? "question" : "questions"} matching &ldquo;{trimmedQuery}&rdquo;
          </div>

          {totalSearchResultsCount === 0 ? (
            <div className="faq-search-no-results">
              <HelpCircle size={44} style={{ color: "var(--gold-primary)", marginBottom: "12px" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>No answers found</h3>
              <p style={{ color: "var(--text-body)", marginBottom: "18px" }}>
                Can&apos;t find what you are looking for? Our recovery consultants are here to help.
              </p>
              <Link href="/contact" className="btn-primary-gold" style={{ padding: "10px 22px" }}>
                Ask Our Specialists
              </Link>
            </div>
          ) : (
            <div className="faq-search-results-list">
              {searchResults!.map((topic) => (
                <div key={topic.key} className="faq-search-topic-group">
                  <button
                    type="button"
                    className="faq-search-topic-btn"
                    onClick={() => {
                      selectTopic(topic.key);
                      setQuery("");
                    }}
                  >
                    <span className="faq-search-topic-title">{topic.label}</span>
                    <span className="faq-search-topic-badge">{topic.faqs.length}</span>
                    <span className="faq-search-topic-switch">
                      Open Topic <ArrowRight size={14} />
                    </span>
                  </button>
                  <div className="svc-faqs">
                    {topic.faqs.map((faq, fIdx) => (
                      <details key={`${topic.key}-${fIdx}`} className="svc-faq">
                        <summary>{faq.question}</summary>
                        <p>{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeKey && currentTopic ? (
        /* 2. Single Topic Detail View */
        <div className="faq-detail-view">
          {/* Back to all topics button */}
          <button
            type="button"
            className="faq-back-btn"
            onClick={() => selectTopic(null)}
          >
            <ArrowLeft size={16} /> Back to all FAQ categories
          </button>

          <div className="faq-detail-header">
            <div className="faq-detail-header-main">
              <div className="faq-detail-icon-wrap">
                {getTopicIcon(currentTopic.key, currentTopic.kind)}
              </div>
              <div>
                <h2 className="faq-detail-title">{currentTopic.label}</h2>
                <span className="faq-topic-badge">
                  {currentTopic.faqs.length} {currentTopic.faqs.length === 1 ? "Question" : "Questions"}
                </span>
              </div>
            </div>

            {currentTopic.kind === "service" && (
              <Link href={`/services/${currentTopic.key}`} className="faq-about-svc-link">
                About this service <ArrowRight size={15} />
              </Link>
            )}
          </div>

          {/* FAQs Accordion */}
          <div key={currentTopic.key} className="svc-faqs faq-detail-list">
            {currentTopic.faqs.map((faq, idx) => (
              <details key={idx} className="svc-faq">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          {/* High-converting Help / Consultation Card */}
          <div className="faq-help-card">
            <div className="faq-help-content">
              <h3 className="faq-help-title">Still have questions about {currentTopic.label}?</h3>
              <p className="faq-help-desc">
                Our recovery specialists are ready to review your case and provide personalized guidance.
              </p>
            </div>
            <Link href="/contact" className="btn-primary-gold faq-help-btn">
              Get Free Assessment
            </Link>
          </div>
        </div>
      ) : (
        /* 3. Category Card Grid View (Apple / Intercom Style) */
        <div className="faq-grid-view">
          {/* Section: General & Key Topics */}
          <div className="faq-grid-section">
            <div className="faq-grid-section-header">
              <h2 className="faq-grid-section-title">General &amp; Essential Inquiries</h2>
              <p className="faq-grid-section-desc">Understand our recovery process, charges, timeline, and privacy guarantees.</p>
            </div>
            <div className="faq-cards-grid">
              {generalTopics.map((topic) => (
                <button
                  key={topic.key}
                  type="button"
                  className="faq-topic-card"
                  onClick={() => selectTopic(topic.key)}
                >
                  <div className="faq-card-head">
                    <div className="faq-card-icon-box">{getTopicIcon(topic.key, topic.kind)}</div>
                    <span className="faq-card-count-badge">{topic.faqs.length} FAQs</span>
                  </div>
                  <h3 className="faq-card-title">{topic.label}</h3>
                  <p className="faq-card-preview">
                    Overview of Vitt Management, onboarding, credibility, and overall asset recovery flow.
                  </p>
                  <span className="faq-card-action">
                    Explore questions <ArrowRight size={15} className="faq-card-arrow" />
                  </span>
                </button>
              ))}

              {feesTopics.map((topic) => (
                <button
                  key={topic.key}
                  type="button"
                  className="faq-topic-card"
                  onClick={() => selectTopic(topic.key)}
                >
                  <div className="faq-card-head">
                    <div className="faq-card-icon-box">{getTopicIcon(topic.key, topic.kind)}</div>
                    <span className="faq-card-count-badge">{topic.faqs.length} FAQs</span>
                  </div>
                  <h3 className="faq-card-title">{topic.label}</h3>
                  <p className="faq-card-preview">
                    Details regarding fees structure, document security, agreement terms, and privacy protocols.
                  </p>
                  <span className="faq-card-action">
                    Explore questions <ArrowRight size={15} className="faq-card-arrow" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Service-Wise FAQs */}
          {serviceTopics.length > 0 && (
            <div className="faq-grid-section" style={{ marginTop: "44px" }}>
              <div className="faq-grid-section-header">
                <h2 className="faq-grid-section-title">Service-Specific FAQs</h2>
                <p className="faq-grid-section-desc">Detailed answers regarding IEPF claims, share transfers, dematerialization, and tax filings.</p>
              </div>
              <div className="faq-cards-grid">
                {serviceTopics.map((topic) => (
                  <button
                    key={topic.key}
                    type="button"
                    className="faq-topic-card"
                    onClick={() => selectTopic(topic.key)}
                  >
                    <div className="faq-card-head">
                      <div className="faq-card-icon-box">{getTopicIcon(topic.key, topic.kind)}</div>
                      <span className="faq-card-count-badge">{topic.faqs.length} FAQs</span>
                    </div>
                    <h3 className="faq-card-title">{topic.label}</h3>
                    <p className="faq-card-preview">
                      Procedures, required documentation, timelines, and solutions for {topic.label}.
                    </p>
                    <span className="faq-card-action">
                      Explore questions <ArrowRight size={15} className="faq-card-arrow" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Help Banner */}
          <div className="faq-help-card" style={{ marginTop: "48px" }}>
            <div className="faq-help-content">
              <h3 className="faq-help-title">Can&apos;t find your specific question?</h3>
              <p className="faq-help-desc">
                Every recovery case is unique. Contact our team directly for immediate personal assistance.
              </p>
            </div>
            <Link href="/contact" className="btn-primary-gold faq-help-btn">
              Talk to an Expert
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FaqExplorer(props: FaqExplorerProps) {
  return (
    <Suspense fallback={null}>
      <FaqExplorerContent {...props} />
    </Suspense>
  );
}
