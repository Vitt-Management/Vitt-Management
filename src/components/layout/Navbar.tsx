"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";
import type { SiteContact } from "@/lib/contact-shared";
import SafeServiceImage from "@/components/services/SafeServiceImage";

export interface NavService {
  slug: string;
  title: string;
  image_url: string | null;
}

function ServiceThumb({ src, size }: { src: string | null; size: number }) {
  return (
    <span className="nav-svc-thumb" style={{ width: size, height: size }} aria-hidden="true">
      {src && <SafeServiceImage src={src} alt="" fill sizes={`${size}px`} style={{ objectFit: "cover" }} />}
    </span>
  );
}

export default function Navbar({
  services,
  contact,
}: {
  services: NavService[];
  contact?: SiteContact;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const phone = contact?.phone || "+91 92752 31114";
  const phoneHref = contact?.phoneHref || "tel:+919275231114";
  const email = contact?.email || "info@vittmanagement.in";

  const onHome = pathname === "/";
  const onServices = pathname.startsWith("/services");
  const onAbout = pathname === "/about";
  const onBlog = pathname.startsWith("/blog");
  const onFaq = pathname === "/faq";
  const onPartner = pathname === "/partner-with-us";
  const onContact = pathname === "/contact";
  const onCheckShares = pathname === "/check-your-shares";
  const numColumns = 3;
  const servicesPerColumn = Math.ceil(services.length / numColumns);
  const serviceColumns = [
    services.slice(0, servicesPerColumn),
    services.slice(servicesPerColumn, servicesPerColumn * 2),
    services.slice(servicesPerColumn * 2),
  ].filter((col) => col.length > 0);
  const cur = (active: boolean) => (active ? ({ "aria-current": "page" } as const) : {});

  const closeAll = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleNavigationClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeAll();

    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (pathname !== href || event.button !== 0 || isModifiedClick) {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <header className="site-header">
      {/* Top Bar with Phone & Email */}
      <div className="top-bar">
        <div className="container-custom top-bar-inner">
          <div className="top-bar-right">
            <a href={phoneHref} className="top-bar-link" aria-label={`Call us at ${phone}`}>
              <Phone size={13} className="top-bar-icon" />
              <span>{phone}</span>
            </a>
            <span className="top-bar-divider" aria-hidden="true" />
            <a href={`mailto:${email}`} className="top-bar-link" aria-label={`Email us at ${email}`}>
              <Mail size={13} className="top-bar-icon" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="container-custom nav-container">

        {/* Logo Section */}
        <Link href="/" className="brand-link" aria-label="Vitt Management - home" onClick={(event) => handleNavigationClick(event, "/")}>
          <span className="brand-row">
            <Image src="/images/final_logo.png" alt="Vitt Management" width={92} height={92} priority className="brand-logo" />
            <span className="brand-divider" aria-hidden="true" />
            <span className="brand-copy">
              <span className="brand-name">
                <span>VITT</span>
                <span className="brand-sub">MANAGEMENT</span>
              </span>
              <span className="brand-tagline">Recovering Wealth. Restoring Trust.</span>
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main">
          <Link href="/" className={`nav-link${onHome ? " active" : ""}`} onClick={(event) => handleNavigationClick(event, "/")} {...cur(onHome)}>
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
            onKeyDown={(e) => { if (e.key === "Escape") setServicesDropdownOpen(false); }}
          >
            <button
              type="button"
              className={`nav-link${onServices ? " active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}
              aria-haspopup="true"
              aria-expanded={servicesDropdownOpen}
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              {...cur(onServices)}
            >
              Our Services
              <ChevronDown size={16} style={{ transition: "transform 0.2s ease", transform: servicesDropdownOpen ? "rotate(180deg)" : "none" }} />
            </button>

            {servicesDropdownOpen && (
              <div className="nav-dropdown-wrap">
                <div className="nav-dropdown">
                  {serviceColumns.map((column, columnIndex) => (
                    <div key={columnIndex} className="nav-dropdown-column">
                      {column.map((svc) => {
                        const href = `/services/${svc.slug}`;
                        const active = pathname === href;
                        return (
                          <Link
                            key={svc.slug}
                            href={href}
                            className={`dropdown-item${active ? " active" : ""}`}
                            onClick={(event) => handleNavigationClick(event, href)}
                            {...cur(active)}
                          >
                            <ServiceThumb src={svc.image_url} size={36} />
                            <span>{svc.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className={`nav-link${onAbout ? " active" : ""}`} onClick={(event) => handleNavigationClick(event, "/about")} {...cur(onAbout)}>
            About Us
          </Link>
          <Link href="/blog" className={`nav-link${onBlog ? " active" : ""}`} onClick={(event) => handleNavigationClick(event, "/blog")} {...cur(onBlog)}>
            Blogs
          </Link>
          <Link href="/faq" className={`nav-link${onFaq ? " active" : ""}`} onClick={(event) => handleNavigationClick(event, "/faq")} {...cur(onFaq)}>
            FAQs
          </Link>
          <Link href="/partner-with-us" className={`nav-link${onPartner ? " active" : ""}`} onClick={(event) => handleNavigationClick(event, "/partner-with-us")} {...cur(onPartner)}>
            Partner with Us
          </Link>
          <Link href="/check-your-shares" className={`nav-link${onCheckShares ? " active" : ""}`} onClick={(event) => handleNavigationClick(event, "/check-your-shares")} {...cur(onCheckShares)}>
            Check Your Shares
          </Link>
          <div className="nav-contact-wrapper">
            <Link href="/contact" className={`nav-link${onContact ? " active" : ""}`} onClick={(event) => handleNavigationClick(event, "/contact")} {...cur(onContact)}>
              Contact Us
            </Link>
            <a href={phoneHref} className="nav-call-sub" aria-label={`Call us at ${phone}`}>
              <Phone size={10} />
              <span>Call Now</span>
            </a>
          </div>
          <Link href="/contact" className="btn-primary-gold nav-cta" onClick={(event) => handleNavigationClick(event, "/contact")}>
            Start Your Recovery
          </Link>
        </nav>

        {/* Mobile menu control */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="mobile-menu-toggle"
            style={{ display: "none", color: "#131f18" }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav className="mobile-drawer" aria-label="Mobile">
          <Link href="/" onClick={(event) => handleNavigationClick(event, "/")} className={`m-link${onHome ? " active" : ""}`} {...cur(onHome)}>
            <span>Home</span>
          </Link>

          {/* Our Services: expandable list, like the desktop dropdown */}
          <button
            type="button"
            className={`m-link${onServices ? " active" : ""}`}
            aria-expanded={mobileServicesOpen}
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            {...cur(onServices)}
          >
            <span>Our Services</span>
            <ChevronDown size={20} style={{ transition: "transform 0.2s ease", transform: mobileServicesOpen ? "rotate(180deg)" : "none" }} />
          </button>
          {mobileServicesOpen && (
            <div className="m-sublist">
              {services.map((svc) => {
                const href = `/services/${svc.slug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={svc.slug}
                    href={href}
                    onClick={(event) => handleNavigationClick(event, href)}
                    className={`m-subitem${active ? " active" : ""}`}
                    {...cur(active)}
                  >
                    <ServiceThumb src={svc.image_url} size={40} />
                    <span>{svc.title}</span>
                  </Link>
                );
              })}
            </div>
          )}

          <Link href="/about" onClick={(event) => handleNavigationClick(event, "/about")} className={`m-link${onAbout ? " active" : ""}`} {...cur(onAbout)}>
            <span>About Us</span>
          </Link>
          <Link href="/blog" onClick={(event) => handleNavigationClick(event, "/blog")} className={`m-link${onBlog ? " active" : ""}`} {...cur(onBlog)}>
            <span>Blogs</span>
          </Link>
          <Link href="/faq" onClick={(event) => handleNavigationClick(event, "/faq")} className={`m-link${onFaq ? " active" : ""}`} {...cur(onFaq)}>
            <span>FAQs</span>
          </Link>
          <Link href="/partner-with-us" onClick={(event) => handleNavigationClick(event, "/partner-with-us")} className={`m-link${onPartner ? " active" : ""}`} {...cur(onPartner)}>
            <span>Partner with Us</span>
          </Link>
          <Link href="/check-your-shares" onClick={(event) => handleNavigationClick(event, "/check-your-shares")} className={`m-link${onCheckShares ? " active" : ""}`} {...cur(onCheckShares)}>
            <span>Check Your Shares</span>
          </Link>
          <Link href="/contact" onClick={(event) => handleNavigationClick(event, "/contact")} className={`m-link${onContact ? " active" : ""}`} {...cur(onContact)}>
            <span>Contact Us</span>
          </Link>
          <a href={phoneHref} onClick={closeAll} className="m-link" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px", color: "var(--gold-dark)", fontWeight: 700 }}>
            <Phone size={18} style={{ color: "var(--gold-primary)" }} />
            <span>Call Now ({phone})</span>
          </a>
          <Link href="/contact" onClick={(event) => handleNavigationClick(event, "/contact")} className="btn-primary-gold m-cta">
            Start Your Recovery
          </Link>
        </nav>
      )}
    </header>
  );
}
