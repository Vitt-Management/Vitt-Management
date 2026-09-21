// Create (or promote) an admin user for /admin.
// Usage: npm run create-admin                       (uses ADMIN_EMAIL / ADMIN_PASSWORD from .env)
//        npm run create-admin -- you@example.com "a-strong-password"
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])
);

const [argEmail, argPassword] = process.argv.slice(2);
const email = argEmail ?? env.ADMIN_EMAIL;
const password = argPassword ?? env.ADMIN_PASSWORD;
if (!email || !password || password.length < 8) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD (min 8 chars) in .env, or pass: npm run create-admin -- <email> "<password>"');
  process.exit(1);
}

const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// app_metadata can only be written with the service-role key, so users can't make themselves admin.
const { data, error } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  app_metadata: { role: "admin" },
});

if (error) {
  if (!/already|registered|exists/i.test(error.message)) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!existing) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
  const { error: upErr } = await admin.auth.admin.updateUserById(existing.id, {
    password,
    app_metadata: { ...existing.app_metadata, role: "admin" },
  });
  if (upErr) {
    console.error("Failed:", upErr.message);
    process.exit(1);
  }
  console.log(`Updated existing user ${email}: password reset and admin role granted.`);
} else {
  console.log(`Admin user created: ${data.user.email}`);
}
