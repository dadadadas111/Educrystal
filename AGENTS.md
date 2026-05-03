# Educrystal - Agent Guide

## Quick Start

```bash
# Install deps (pnpm required - uses pnpm-lock.yaml)
pnpm install

# Dev server
pnpm dev

# Build for production
pnpm build
```

## Core Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS with custom crystal theme
- **Auth**: Supabase Auth (SSR)
- **Database**: Supabase (PostgreSQL)
- **PWA**: next-pwa for offline support
- **Package Manager**: pnpm (NOT npm or yarn)

## Key Commands

- `pnpm dev` - Start dev server with webpack (hot reload optimized)
- `pnpm build` - Production build
- `pnpm start` - Run production build

## Architecture

```
app/                    # Next.js App Router
├── (private)/          # Auth-protected routes (requires Supabase session)
│   ├── admin/          # Admin dashboard pages
│   ├── catalog/       # Program catalog & details
│   ├── diary/         # Private diary
│   ├── home/          # User dashboard
│   └── settings/      # User settings
├── api/               # API routes
│   ├── admin/        # Admin-only API (check admin-auth.ts first)
│   └── user/         # User API (requires Supabase session)
├── auth/              # OAuth callbacks
└── page.tsx           # Landing page

lib/                   # Shared logic
├── auth.ts            # getCurrentUser, requireCurrentUser, isCurrentUserAdmin
├── supabase-*.ts     # Supabase client (server, browser, admin variants)
├── progress.ts        # User progress tracking
└── courses.ts        # Program/course data

components/           # React components (co-located by feature)
```

## Auth Patterns

All protected routes expect Supabase session. Key patterns in `lib/auth.ts`:
- `getCurrentUser()` - cached, returns User | null
- `requireCurrentUser()` - throws if not authenticated  
- `isCurrentUserAdmin(userId)` - checks profiles.is_admin

Admin API routes use `lib/admin-auth.ts` for HTTP Basic auth (ADMIN_USERNAME/ADMIN_PASSWORD env vars).

## Database

Supabase schema in `supabase/schema.sql`. Key tables:
- `programs` - Crystal-growing programs
- `steps` - Individual steps within programs
- `milestones` - Achievement milestones
- `profiles` - User profiles (extends auth.users)
- `diary_entries` - Private user diary
- `showcase_posts` - Public posts (require moderation)
- `progress` - User step completion tracking

## Environment Variables

Copy from `.env.example`:
```
ADMIN_USERNAME=admin        # Admin dashboard access
ADMIN_PASSWORD=change_me    # Change in production!
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=   # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # Admin-only, never expose
```

## Styling

Custom Tailwind theme in `tailwind.config.ts`:
- Colors: `rose`, `gold`, `sky`, `coral`, `lavender`, `success`
- Fonts: `--font-body` (Be Vietnam Pro), `--font-display` (Baloo 2)
- Shadow: `crystal` (shimmer effect), `soft` (subtle)

The product is Vietnamese-language, mobile-first, child-friendly design.

## Important Context

- Product is defined in `01-product-memory.md` and `02-mvp-flows.md` (Google Doc is source of truth)
- "Programs" = guided crystal-growing journeys (not "courses")
- "Diary" = private-first personal journal
- "Showcase" = public posts requiring moderation (not "social feed")
- No tests currently configured in package.json

## No-Nos

- Never commit actual secrets (env files)
- Don't guess Supabase client variants - use correct lib/ file for context (server vs browser vs admin)
- Supabase session required for anything in `(private)/` routes