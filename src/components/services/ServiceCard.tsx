import Image from "next/image";
import Link from "next/link";
import type { ServiceSummary } from "@/lib/services";

// One card design, used on the home page grid and in "Other services" on each service page.
export default function ServiceCard({ service }: { service: ServiceSummary }) {
  return (
    <div className="service-card">
      {service.image_url && (
        <div className="service-card-img-wrapper">
          <Image
            src={service.image_url}
            alt={service.title}
            fill
            sizes="(max-width: 540px) 100vw, (max-width: 840px) 50vw, 33vw"
            className="service-card-img"
          />
        </div>
      )}

      <div className="service-card-content">
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-desc">{service.short_description}</p>

        <div className="service-card-actions">
          <Link href={`/services/${service.slug}`} className="btn-outline-gold">
            Learn More
          </Link>
          <Link href="/contact" className="btn-primary-gold">
            Contact Now
          </Link>
        </div>
      </div>
    </div>
  );
}
