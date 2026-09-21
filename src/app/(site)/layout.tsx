import SiteShell from "@/components/layout/SiteShell";

// Navbar and footer list services from the database; refresh at most every 5 minutes.
export const revalidate = 300;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
