import "server-only";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export const isAdminUser = (user: User | null | undefined) => user?.app_metadata?.role === "admin";

// Call at the top of every admin page, layout and server action.
// app_metadata can only be set with the service-role key, so users cannot grant it to themselves.
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!isAdminUser(data.user)) redirect("/admin/login");
  return data.user!;
}
