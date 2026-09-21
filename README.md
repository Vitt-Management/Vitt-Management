# Vitt Management

Marketing site for Vitt Management, built with Next.js (App Router), React, Tailwind CSS v4 and TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx            Fonts + <html>/<body> only
    (site)/               Public website (route group; adds Navbar/Footer/modals)
      page.tsx            Home
      contact/            Contact page + server action that saves leads
    admin/                Admin dashboard (noindex, guarded by proxy.ts + requireAdmin())
      login/
      (panel)/            Overview, banners, leads
  components/
    layout/  home/  contact/  modals/
  context/                ModalContext: useModals()
  lib/
    supabase/             admin.ts (service role, server only), server.ts, browser.ts
    auth.ts               requireAdmin()
    banners.ts            Loads home banners from the database
  data/                   Static content (siteData.ts)
  proxy.ts                Redirects non-admins away from /admin
supabase/migrations/      SQL for the database tables and storage bucket
scripts/                  create-admin.mjs, seed-banners.mjs, download_assets.py
docs/                     Design references
```

## Admin dashboard

1. Create an admin user: `npm run create-admin -- you@example.com "your-password"`
2. Sign in at `/admin/login`.
3. Banners (home page slider) and contact-form leads are managed there.

Admin access is granted by `app_metadata.role = "admin"`, which can only be set with the service-role key.
