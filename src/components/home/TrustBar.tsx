import { Award, Eye, Globe, ShieldCheck } from "lucide-react";

const items = [
  { icon: Award, label: "Trusted Experts" },
  { icon: Eye, label: "Transparent Process" },
  { icon: Globe, label: "Pan-India & NRI Support*" },
  { icon: ShieldCheck, label: "End-to-End Assistance" },
];

export default function TrustBar() {
  return (
    <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e7dfcf" }}>
      <div className="container-custom">
        <div className="trust-bar-grid">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="trust-bar-item">
              <span className="trust-bar-icon">
                <Icon size={22} />
              </span>
              <span className="trust-bar-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
