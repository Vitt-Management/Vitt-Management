import SiteShell from "@/components/layout/SiteShell";

// Navbar and footer list services from the database and must reflect admin changes immediately.
export const revalidate = 0;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
