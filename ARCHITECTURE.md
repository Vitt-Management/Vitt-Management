# Vitt Management - Application Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLIENT (Browser)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Home Page   │  │ Services     │  │  About/FAQ/  │  │  Admin Panel │   │
│  │  (SSR/ISR)   │  │  Pages       │  │  Contact     │  │  (Protected) │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
└─────────┼─────────────────┼─────────────────┼─────────────────┼────────────┘
          │                 │                 │                 │
          ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NEXT.JS 15 APP ROUTER                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        MIDDLEWARE (proxy.ts)                        │   │
│  │  • Session cookie refresh via @supabase/ssr                         │   │
│  │  • Optimistic admin gate for /admin/* routes                        │   │
│  │  • Redirects: non-admin → /login, admin on /login → /admin          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │  (site) Layout   │  │  Admin Layout    │  │  Server Components       │  │
│  │  • Navbar        │  │  • AdminNav      │  │  • fetch data at build   │  │
│  │  • Footer        │  │  • requireAdmin()│  │    or request time       │  │
│  │  • FloatingContact│ │  • Sidebar       │  │  • revalidate = 0        │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────────┬─────────────┘  │
└───────────┼─────────────────────┼─────────────────────────┼────────────────┘
            │                     │                         │
            ▼                     ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER (src/lib)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐ │
│  │  Server Client  │  │  Admin Client   │  │  Domain Modules             │ │
│  │  (createClient) │  │  (createAdmin)  │  │  • services.ts              │ │
│  │  • anon key     │  │  • service role │  │  • banners.ts               │ │
│  │  • user session │  │  • bypasses RLS │  │  • contact.ts               │ │
│  │  • RLS enforced │  │  • server-only  │  │  • global-faqs.ts           │ │
│  └────────┬────────┘  └────────┬────────┘  └──────────────┬──────────────┘ │
└───────────┼─────────────────────┼─────────────────────────┼────────────────┘
            │                     │                         │
            ▼                     ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE BACKEND                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Database   │  │    Auth      │  │   Storage    │  │   Realtime   │   │
│  │  (PostgreSQL)│  │  (Email/Pass)│  │   (Buckets)  │  │  (Optional)  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │                 │            │
│         ▼                 ▼                 ▼                 ▼            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                        TABLES & RLS POLICIES                         │  │
│  │  • hero_banners       (public read via storage, admin write)        │  │
│  │  • services           (public read, admin write)                    │  │
│  │  • contact_requests   (public insert, admin read)                   │  │
│  │  • site_settings      (public read, admin write)                    │  │
│  │  • global_faqs        (public read, admin write)                    │  │
│  │  • auth.users         (admin role in app_metadata)                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

### 1. **Dual Supabase Clients**
| Client | Key | Use Case | RLS |
|--------|-----|----------|-----|
| `createClient()` (server.ts) | Anon | User-facing pages, session-aware | Enforced |
| `createAdminClient()` (admin.ts) | Service Role | Admin panel, scripts, server actions | Bypassed |

### 2. **Route Groups**
```
src/app/
├── (site)/          # Public marketing site (SSR, revalidate=0)
│   ├── layout.tsx   # SiteShell with Navbar/Footer
│   ├── page.tsx     # Home with Hero, Services, Testimonials
│   ├── services/
│   ├── about/
│   ├── contact/
│   └── faq/
├── admin/           # Protected admin dashboard
│   ├── login/       # Public login page
│   ├── (panel)/     # Protected routes (requireAdmin)
│   │   ├── banners/
│   │   ├── services/
│   │   ├── leads/
│   │   ├── faq/
│   │   └── contact/
│   └── actions.ts   # Login server action
└── layout.tsx       # Root layout
```

### 3. **Admin Authentication Flow**
```
1. User visits /admin → middleware (proxy.ts)
2. proxy.ts checks session cookie via getUser()
3. If no admin role → redirect to /admin/login
4. User submits credentials → LoginForm → server action
5. Server action: supabase.auth.signInWithPassword()
6. On success: session cookie set → redirect to /admin
7. requireAdmin() called in every admin page/action (double-check)
```

### 4. **Data Fetching Strategy**
- **Public pages**: `revalidate = 0` (always fresh) + Admin client (bypasses RLS)
- **Admin pages**: Server components with `requireAdmin()` guard
- **Server Actions**: Used for mutations (create/update/delete)

### 5. **Database Schema**
```
hero_banners      → Home page slider images
services          → Service cards + detail pages
contact_requests  → Lead capture from contact form
site_settings     → Global config (phone, email, address, SEO)
global_faqs       → FAQ accordion on /faq page
```

### 6. **Storage Buckets**
- `banners` - Public bucket for hero banner images (5MB limit, image types only)

### 7. **Deployment Notes**
- **Vercel** recommended (Next.js native)
- Environment variables required:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Run migrations via Supabase CLI or dashboard
- Seed scripts: `scripts/seed-banners.mjs`, `scripts/seed-services.mjs`

## Component Architecture

```
src/components/
├── layout/
│   ├── Navbar.tsx           # Dynamic services from DB
│   ├── Footer.tsx           # Dynamic contact info from DB
│   ├── SiteShell.tsx        # Wrapper with Navbar/Footer
│   └── FloatingContact.tsx  # Sticky contact button
├── home/
│   ├── Hero.tsx             # HeroSlider with banners
│   ├── HeroSlider.tsx       # Auto-rotating banner carousel
│   ├── ServicesGrid.tsx     # Service cards from DB
│   ├── Testimonials.tsx     # Static testimonials
│   ├── ProcessStepper.tsx   # How it works steps
│   ├── PeaceOfMind.tsx      # Trust indicators
│   ├── CtaBanner.tsx        # Call to action
│   ├── ExpertCta.tsx        # Expert consultation CTA
│   ├── OldDocumentsBanner.tsx
│   ├── StatsBar.tsx         # Key metrics
│   └── TrustBar.tsx         # Trust badges
├── services/
│   └── ServiceCard.tsx      # Reusable service card
└── contact/
    ├── ContactForm.tsx      # Lead capture form
    ├── ContactDetails.tsx   # Contact info display
    └── ContactBanner.tsx    # Contact page hero
```

## Security Model

1. **Row Level Security (RLS)**: Enabled on all tables, no policies = only service role can access
2. **Admin Role**: Stored in `auth.users.app_metadata.role = 'admin'` (set via service role only)
3. **Double Auth Check**: Middleware (optimistic) + `requireAdmin()` (authoritative)
4. **Server-Only Imports**: Admin client and auth helpers marked `"server-only"`
5. **No Client-Side Secrets**: Only anon key exposed to browser