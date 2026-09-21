"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Phone, ChevronDown, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenConsultation, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e7dfcf", position: "sticky", top: 0, zIndex: 100 }}>
      <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
        
        {/* Logo Section */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {/* Brand mark diagonal bars */}
              <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <span style={{ width: "5px", height: "24px", background: "#b88646", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                <span style={{ width: "5px", height: "24px", background: "#131f18", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                <span style={{ width: "5px", height: "24px", background: "#b88646", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
              </div>
              <span style={{ fontSize: "1.55rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#131f18", fontFamily: "var(--font-sans)" }}>
                VITT
              </span>
            </div>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", color: "#6e7b73", textTransform: "uppercase", marginTop: "-3px" }}>
              MANAGEMENT
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} className="desktop-nav">
          <Link href="#" style={{ fontSize: "0.92rem", fontWeight: 600, color: "#b88646" }}>
            Home
          </Link>

          {/* Services Dropdown */}
          <div 
            style={{ position: "relative" }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button 
              style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.92rem", fontWeight: 500, color: "#131f18", cursor: "pointer" }}
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
            >
              Our Services
              <ChevronDown size={14} style={{ transition: "transform 0.2s ease", transform: servicesDropdownOpen ? "rotate(180deg)" : "none" }} />
            </button>

            {servicesDropdownOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: "-20px",
                paddingTop: "12px",
                zIndex: 200,
              }}>
                <div style={{
                  background: "#ffffff",
                  border: "1px solid #e7dfcf",
                  borderRadius: "10px",
                  boxShadow: "0 14px 28px rgba(0,0,0,0.1)",
                  padding: "12px 0",
                  minWidth: "260px",
                }}>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    IEPF Share & Dividend Recovery
                  </Link>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    Physical Shares to Demat
                  </Link>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    Transmission of Shares
                  </Link>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    Lost / Duplicate Share Certificates
                  </Link>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    Unpaid / Unclaimed Dividends
                  </Link>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    Old / Forgotten Shares Search
                  </Link>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    NRI Investment Recovery
                  </Link>
                  <Link href="#services" className="dropdown-item" onClick={() => setServicesDropdownOpen(false)}>
                    PF Recovery Assistance
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="#how-it-works" style={{ fontSize: "0.92rem", fontWeight: 500, color: "#131f18" }}>
            How It Works
          </Link>
          <Link href="#about" style={{ fontSize: "0.92rem", fontWeight: 500, color: "#131f18" }}>
            About Us
          </Link>
          <Link href="#resources" style={{ fontSize: "0.92rem", fontWeight: 500, color: "#131f18" }}>
            Resources
          </Link>
          <Link href="#contact" style={{ fontSize: "0.92rem", fontWeight: 500, color: "#131f18" }}>
            Contact
          </Link>
        </nav>

        {/* Right CTA Area */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Search Trigger */}
          <button 
            onClick={onOpenSearch} 
            aria-label="Search"
            style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#38473e",
              transition: "color 0.2s ease"
            }}
          >
            <Search size={18} />
          </button>

          {/* Assessment Button */}
          <button onClick={onOpenConsultation} className="btn-primary-gold" style={{ fontSize: "0.85rem", padding: "10px 20px" }}>
            Get a Free Assessment <ArrowRight size={14} />
          </button>

          {/* Phone Contact Block */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="phone-block">
            <div style={{ 
              width: "34px", 
              height: "34px", 
              borderRadius: "50%", 
              background: "#fbf6ec", 
              border: "1px solid rgba(184, 134, 70, 0.25)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#b88646" 
            }}>
              <Phone size={15} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#131f18", letterSpacing: "0.01em" }}>
                +91 98765 43210
              </span>
              <span style={{ fontSize: "0.68rem", color: "#748278" }}>
                Mon - Sat: 10AM - 7PM
              </span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="mobile-menu-toggle"
            style={{ display: "none", color: "#131f18" }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e7dfcf",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <Link href="#" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: "#b88646" }}>
            Home
          </Link>
          <Link href="#services" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: "#131f18" }}>
            Our Services
          </Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: "#131f18" }}>
            How It Works
          </Link>
          <Link href="#about" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: "#131f18" }}>
            About Us
          </Link>
          <Link href="#resources" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: "#131f18" }}>
            Resources
          </Link>
          <Link href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: "#131f18" }}>
            Contact
          </Link>
          <button onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }} className="btn-primary-gold" style={{ marginTop: "8px" }}>
            Book a Free Consultation
          </button>
        </div>
      )}

      <style jsx>{`
        .dropdown-item {
          display: block;
          padding: 8px 18px;
          font-size: 0.85rem;
          color: #38473e;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .dropdown-item:hover {
          background-color: #fcf8f0;
          color: #b88646;
        }
        @media (max-width: 1024px) {
          .phone-block {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
