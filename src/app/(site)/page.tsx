import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import ExpertCta from "@/components/home/ExpertCta";
import ProcessStepper from "@/components/home/ProcessStepper";
import PeaceOfMind from "@/components/home/PeaceOfMind";
import OldDocumentsBanner from "@/components/home/OldDocumentsBanner";
import StatsBar from "@/components/home/StatsBar";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import { getActiveBanners } from "@/lib/banners";
import { getServices } from "@/lib/services";

// Safety net; admin edits also call revalidatePath("/") so changes show immediately.
export const revalidate = 300;

export default async function HomePage() {
  const [banners, services] = await Promise.all([getActiveBanners(), getServices()]);
  return (
    <>
      <Hero banners={banners} />
      <TrustBar />
      <ServicesGrid services={services} />
      <ExpertCta />
      <ProcessStepper />
      <PeaceOfMind />
      <OldDocumentsBanner />
      <StatsBar />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
