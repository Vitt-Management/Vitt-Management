"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { error: "" });
  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div>
        <label htmlFor="email" className="admin-label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className="admin-input" />
      </div>
      <div>
        <label htmlFor="password" className="admin-label">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="admin-input" />
      </div>
      {state.error && <p role="alert" className="admin-error">{state.error}</p>}
      <button type="submit" disabled={pending} className="admin-btn primary" style={{ padding: "14px", fontSize: "1.05rem" }}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
