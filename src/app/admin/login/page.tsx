import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
          <Image src="/images/logo.png" alt="Vitt Management" width={56} height={47} style={{ height: "47px", width: "auto" }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.3rem" }}>VITT Admin</div>
            <div style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Sign in to manage your site</div>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
