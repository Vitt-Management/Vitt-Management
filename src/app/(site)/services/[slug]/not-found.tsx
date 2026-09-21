import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <section style={{ padding: "96px 0", textAlign: "center", backgroundColor: "var(--bg-page)" }}>
      <div className="container-custom">
        <h1 className="section-title" style={{ marginBottom: "12px" }}>Service not found</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-body)", marginBottom: "28px" }}>
          We could not find that service. It may have been moved or removed.
        </p>
        <Link href="/#services" className="btn-primary-gold" style={{ padding: "14px 30px", fontSize: "1rem" }}>
          View all services
        </Link>
      </div>
    </section>
  );
}
