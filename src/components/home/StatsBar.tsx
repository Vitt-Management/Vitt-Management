import { Smile, Coins, Award, Shield } from "lucide-react";
import { statsData, StatItem } from "@/data/siteData";

const icons: Record<string, React.ReactNode> = {
  smile: <Smile size={20} />,
  coins: <Coins size={20} />,
  award: <Award size={20} />,
  shield: <Shield size={20} />,
};

export default function StatsBar() {
  return (
    <section className="stats-section">
      <div className="container-custom">
        <div className="stats-grid">
          {statsData.map((stat: StatItem) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">{icons[stat.icon] ?? icons.award}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
