import { requireAdmin } from "@/lib/auth";
import ServiceForm, { EMPTY_SERVICE } from "../ServiceForm";

export default async function NewServicePage() {
  await requireAdmin();
  return (
    <>
      <h1 className="admin-title">Add a service</h1>
      <p className="admin-sub">Fill in the details below. The service gets its own page and appears in the menus and on the home page.</p>
      <ServiceForm initial={EMPTY_SERVICE} />
    </>
  );
}
