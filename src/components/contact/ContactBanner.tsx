import Image from "next/image";

export default function ContactBanner({ heading, subheading }: { heading: string; subheading: string }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", backgroundColor: "#101c16" }}>
      <Image
        src="/images/cta-desk-mug.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", opacity: 0.35 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(11,19,15,0.92) 0%, rgba(11,19,15,0.55) 100%)",
        }}
      />
      <div className="container-custom" style={{ position: "relative", paddingTop: "88px", paddingBottom: "96px" }}>
        <p style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#dfb87c", marginBottom: "14px" }}>
          Contact Us
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.15, color: "#ffffff", marginBottom: "10px", maxWidth: "720px" }}>
          VITT MANAGEMENT
        </h1>
        <p className="page-brand-attribution">A brand of VittEdge Global Advisory LLP</p>
        {heading && <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", lineHeight: 1.3, color: "#dfb87c", marginBottom: "18px", maxWidth: "720px" }}>{heading}</p>}
        {subheading && (
          <p style={{ fontSize: "1.2rem", lineHeight: 1.65, color: "#e3ebe6", maxWidth: "620px" }}>{subheading}</p>
        )}
      </div>
    </section>
  );
}
