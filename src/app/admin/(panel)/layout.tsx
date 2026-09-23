import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import AdminNav from "./AdminNav";
import { signOut } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="brand">
          <Image src="/images/final_logo.png" alt="" width={40} height={34} style={{ height: "34px", width: "auto", background: "#fff", borderRadius: "6px", padding: "3px 5px" }} />
          VITT Admin
        </div>
        <AdminNav />
        <div className="spacer" style={{ flex: 1 }} />
        <div style={{ padding: "0 10px 8px", fontSize: "0.95rem", color: "#9fb0a5", wordBreak: "break-all" }}>{user.email}</div>
        <form action={signOut}>
          <button type="submit" className="admin-nav-link" style={{ width: "100%" }}>Sign out</button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
