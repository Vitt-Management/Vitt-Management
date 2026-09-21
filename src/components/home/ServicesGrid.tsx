import ServiceCard from "@/components/services/ServiceCard";
import type { ServiceSummary } from "@/lib/services";

export default function ServicesGrid({ services }: { services: ServiceSummary[] }) {
  return (
    <section id="services" style={{ backgroundColor: "#ffffff", paddingTop: "68px", paddingBottom: "76px", borderBottom: "1px solid #e7dfcf" }}>
      <div className="container-custom">

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle" style={{ maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            Complete support for all your unclaimed and forgotten financial assets.
          </p>
        </div>

        {/* Services Grid (3 per row on desktop) */}
        <div className="services-grid-layout">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}
