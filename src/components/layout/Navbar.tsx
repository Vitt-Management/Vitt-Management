"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

export interface NavService {
  slug: string;
  title: string;
  image_url: string | null;
}

function ServiceThumb({ src, size }: { src: string | null; size: number }) {
  return (
    <span className="nav-svc-thumb" style={{ width: size, height: size }} aria-hidden="true">
      {src && <Image src={src} alt="" fill sizes={`${size}px`} style={{ objectFit: "cover" }} />}
    </span>
  );
}

export default function Navbar({ services }: { services: NavService[] }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const onHome = pathname === "/";
  const onServices = pathname.startsWith("/services");
  const onAbout = pathname === "/about";
  const onFaq = pathname === "/faq";
  const onContact = pathname === "/contact";
  const cur = (active: boolean) => (active ? ({ "aria-current": "page" } as const) : {});

  const closeAll = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e7dfcf", position: "sticky", top: 0, zIndex: 100 }}>
      <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>

        {/* Logo Section */}
        <Link href="/" className="brand-link" aria-label="Vitt Management - home" onClick={closeAll}>
          <span className="brand-row">
            <Image src="/images/final_logo.png" alt="" width={66} height={56} priority className="brand-logo" />
            <span className="brand-divider" aria-hidden="true" />
            <span className="brand-name">VITT</span>
          </span>
          <span className="brand-sub">MANAGEMENT</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main">
          <Link href="/" className={`nav-link${onHome ? " active" : ""}`} {...cur(onHome)}>
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
                  {services.map((svc) => {
                    const active = pathname === `/services/${svc.slug}`;
                    return (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className={`dropdown-item${active ? " active" : ""}`}
                        onClick={closeAll}
                        {...cur(active)}
                      >
                        <ServiceThumb src={svc.image_url} size={40} />
                        <span>{svc.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link href="/#how-it-works" className="nav-link">How It Works</Link>
          <Link href="/about" className={`nav-link${onAbout ? " active" : ""}`} {...cur(onAbout)}>
            About Us
          </Link>
          <Link href="/faq" className={`nav-link${onFaq ? " active" : ""}`} {...cur(onFaq)}>
            FAQs
          </Link>
          <Link href="/contact" className={`nav-link${onContact ? " active" : ""}`} {...cur(onContact)}>
            Contact
          </Link>
        </nav>

        {/* Right CTA Area */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/contact" className="btn-primary-gold nav-cta" style={{ fontSize: "0.95rem", padding: "11px 22px" }} onClick={closeAll}>
            Get a Free Assessment
          </Link>

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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav className="mobile-drawer" aria-label="Mobile">
          <Link href="/" onClick={closeAll} className={`m-link${onHome ? " active" : ""}`} {...cur(onHome)}>
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
                const active = pathname === `/services/${svc.slug}`;
                return (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    onClick={closeAll}
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

          <Link href="/#how-it-works" onClick={closeAll} className="m-link"><span>How It Works</span></Link>
          <Link href="/about" onClick={closeAll} className={`m-link${onAbout ? " active" : ""}`} {...cur(onAbout)}>
            <span>About Us</span>
          </Link>
          <Link href="/faq" onClick={closeAll} className={`m-link${onFaq ? " active" : ""}`} {...cur(onFaq)}>
            <span>FAQs</span>
          </Link>
          <Link href="/contact" onClick={closeAll} className={`m-link${onContact ? " active" : ""}`} {...cur(onContact)}>
            <span>Contact</span>
          </Link>

          <Link href="/contact" onClick={closeAll} className="btn-primary-gold" style={{ marginTop: "14px", padding: "14px 24px", fontSize: "1rem" }}>
            Book a Free Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
