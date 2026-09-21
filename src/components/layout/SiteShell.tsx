import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import { ModalProvider } from "@/context/ModalContext";
import { getServices } from "@/lib/services";
import { getSiteContact } from "@/lib/contact";

export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const [allServices, contact] = await Promise.all([getServices(), getSiteContact()]);
  const services = allServices.map(({ slug, title, image_url }) => ({ slug, title, image_url }));
  return (
    <ModalProvider>
      <Navbar services={services} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer services={services} contact={contact} />
      <FloatingContact contact={contact} />
    </ModalProvider>
  );
}
