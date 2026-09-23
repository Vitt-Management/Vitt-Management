"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Images, Briefcase, Inbox, Phone, CircleHelp, ExternalLink } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/banners", label: "Banners", icon: Images },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/faq", label: "Global FAQs", icon: CircleHelp },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/contact", label: "Contact details", icon: Phone },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={`admin-nav-link${active ? " active" : ""}`}>
            <Icon size={20} /> {label}
          </Link>
        );
      })}
      <Link href="/" target="_blank" className="admin-nav-link">
        <ExternalLink size={20} /> View website
      </Link>
    </nav>
  );
}
