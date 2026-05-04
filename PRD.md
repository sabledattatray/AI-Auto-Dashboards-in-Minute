# PRODUCT REQUIREMENTS DOCUMENT
## Ultra Premium Analytics Dashboard
### Power BI–Inspired, Production-Ready SaaS Platform

---

**Document Version:** 1.0.0
**Status:** Final — Ready for Engineering Handoff
**Last Updated:** 2026-05-03
**Document Owner:** Product Team
**Target Deployment:** GitHub → Vercel (Production)

---

## TABLE OF CONTENTS

1. Executive Summary
2. Product Vision & Goals
3. Target Audience & Personas
4. Competitive Landscape
5. Technical Architecture
6. Repository & Project Structure
7. Tech Stack — Complete Specification
8. Environment Variables & Secrets
9. Database Schema — Complete
10. Authentication & Authorization
11. Feature Specifications — Complete
    - 11.1 Canvas & Layout Engine
    - 11.2 Visual Tile System
    - 11.3 Drag, Drop & Resize
    - 11.4 Chart & Visualization Library
    - 11.5 Data Source Connectors
    - 11.6 Filter & Slicer Engine
    - 11.7 Theme & Styling Engine
    - 11.8 Typography & Color Customization
    - 11.9 Dashboard Cards
    - 11.10 Report Pages & Navigation
    - 11.11 AI Insights Engine
    - 11.12 Export & Share
    - 11.13 Collaboration
    - 11.14 Workspace & Permissions
    - 11.15 Notifications
    - 11.16 Responsive Layout Engine
12. API Specification — Complete
13. UI/UX Specification
14. Component Library Specification
15. CI/CD Pipeline — GitHub → Vercel
16. Testing Strategy
17. Performance Requirements
18. Security Requirements
19. Accessibility Requirements
20. Observability & Monitoring
21. Deployment Runbook
22. Milestones & Timeline
23. Risks & Mitigations
24. Glossary

---

## 1. EXECUTIVE SUMMARY

**Product Name:** LuminaBI
**Tagline:** "Insight at the speed of thought."

LuminaBI is an ultra-premium, cloud-native business intelligence and analytics SaaS platform. It delivers Power BI–grade analytical power—interactive dashboards, drag-and-drop canvas editing, rich visualizations, AI-generated insights, multi-source data connectors—wrapped in a best-in-class developer and analyst experience. The platform is fully responsive, deeply customizable, and production-deployable from a single GitHub repository to Vercel with zero infrastructure toil.

**What it replaces:** Microsoft Power BI, Tableau, Looker, Metabase—for teams that want the power without the enterprise lock-in and pricing opacity.

---

## 2. PRODUCT VISION & GOALS

### Vision
Democratize enterprise analytics. Any team, any data source, any device—instant, beautiful, actionable dashboards.

### Primary Goals
| # | Goal | Success Metric |
|---|------|---------------|
| G1 | Best-in-class drag-and-drop dashboard builder | Time-to-first-dashboard < 5 minutes |
| G2 | Zero-config data connectivity | Support 15+ native connectors at launch |
| G3 | AI-assisted insights on every dataset | Every dashboard has ≥1 AI insight surfaced |
| G4 | Production-ready deployment in one click | Vercel deploy time < 3 minutes from fork |
| G5 | Sub-second dashboard load | P95 dashboard load < 800ms |
| G6 | Full mobile responsiveness | Lighthouse mobile score ≥ 90 |

### Non-Goals (v1)
- Native mobile apps (iOS/Android) — planned v2
- Real-time streaming data (WebSocket pipelines) — planned v2
- On-premise self-hosted edition — planned v3
- White-labeling/custom domain per workspace — planned v2

---

## 3. TARGET AUDIENCE & PERSONAS

### Persona 1 — "The Data Analyst" (Primary)
- **Name:** Priya, 29, Senior Data Analyst at a D2C brand
- **Skills:** SQL fluent, some Python, no coding for frontend
- **Pain:** Spends 4h/week in Excel making charts. Wants live dashboards.
- **Needs:** Fast chart creation, SQL editor, shareable dashboards
- **Success:** Creates a live revenue dashboard in under 10 minutes

### Persona 2 — "The Startup Founder" (Secondary)
- **Name:** Marcus, 35, Co-founder of a SaaS startup
- **Skills:** Non-technical. Reads dashboards, doesn't build them.
- **Pain:** Can't interpret raw CSV exports. Needs a live snapshot.
- **Needs:** Pre-built templates, auto-insights, mobile-friendly viewing
- **Success:** Wakes up, opens LuminaBI on phone, sees overnight metrics

### Persona 3 — "The Frontend-Savvy Engineer" (Tertiary)
- **Name:** Soo-Jin, 27, Full-stack engineer
- **Skills:** TypeScript, React, familiar with databases
- **Pain:** Builds dashboards from scratch for every internal tool
- **Needs:** Embeddable components, API access, custom chart hooks
- **Success:** Embeds a LuminaBI chart into their internal app in 20 lines

---

## 4. COMPETITIVE LANDSCAPE

| Feature | LuminaBI | Power BI | Tableau | Looker | Metabase |
|---------|----------|----------|---------|--------|----------|
| Drag-drop canvas | ✅ | ✅ | ✅ | ❌ | ❌ |
| AI Insights | ✅ | ✅ | Partial | ❌ | ❌ |
| Open source-friendly | ✅ | ❌ | ❌ | ❌ | ✅ |
| Vercel deployable | ✅ | ❌ | ❌ | ❌ | ❌ |
| GitHub native CI/CD | ✅ | ❌ | ❌ | ❌ | Partial |
| Custom themes | ✅ | ✅ | ✅ | Partial | ❌ |
| Embeddable | ✅ | Partial | ✅ | ✅ | ✅ |
| Free tier | ✅ | ✅ (limited) | ❌ | ❌ | ✅ |

**LuminaBI's Unique Differentiator:** The only BI tool that is 100% deployable from GitHub to Vercel in < 3 minutes, with AI insights built-in, open connectors, and no vendor lock-in.

---

## 5. TECHNICAL ARCHITECTURE

### System Architecture Diagram (Described)

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                  │
│   Next.js 14 App Router │ React 18 │ TailwindCSS │ Shadcn/UI        │
│   Canvas Engine (dnd-kit) │ ECharts/Recharts │ Framer Motion        │
└──────────────────────────────────────────────────────────────────────┘
                               │ HTTPS/REST/WebSocket
┌──────────────────────────────────────────────────────────────────────┐
│                        API LAYER                                     │
│   Next.js API Routes (App Router) │ tRPC v11 │ Zod Validation       │
│   Rate Limiting (Upstash Redis) │ Edge Middleware                    │
└──────────────────────────────────────────────────────────────────────┘
                               │
┌─────────────────┬─────────────────────┬────────────────────────────┐
│  AUTH LAYER     │   DATABASE LAYER     │    STORAGE LAYER           │
│  Clerk          │   Supabase Postgres  │    Supabase Storage / S3   │
│  (JWT+Sessions) │   Prisma ORM         │    (CSV, Exports, Assets)  │
└─────────────────┴─────────────────────┴────────────────────────────┘
                               │
┌──────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                               │
│   OpenAI API (GPT-4o) │ Upstash Redis │ Resend (Email)              │
│   Vercel Analytics │ Sentry │ PostHog                               │
└──────────────────────────────────────────────────────────────────────┘
```

### Data Flow
1. User authenticates via Clerk → JWT issued
2. Client fetches dashboard config from Postgres via tRPC
3. Client queries data via connector APIs (direct SQL, REST, CSV parse)
4. Canvas renders tiles from config JSON
5. User edits → optimistic update → debounced save to DB
6. AI insight requests → OpenAI API → cached in Redis (24h TTL)
7. Exports → server-side render → stored in Supabase Storage → signed URL

---

## 6. REPOSITORY & PROJECT STRUCTURE

```
luminabi/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Lint, typecheck, test on PR
│   │   ├── preview.yml               # Vercel preview on PR
│   │   └── production.yml            # Deploy to prod on main merge
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── dependabot.yml
│
├── apps/
│   └── web/                          # Main Next.js application
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── sign-in/[[...sign-in]]/page.tsx
│       │   │   └── sign-up/[[...sign-up]]/page.tsx
│       │   ├── (dashboard)/
│       │   │   ├── layout.tsx        # App shell: sidebar + topbar
│       │   │   ├── page.tsx          # Home / workspace overview
│       │   │   ├── reports/
│       │   │   │   ├── page.tsx      # Reports list
│       │   │   │   └── [reportId]/
│       │   │   │       ├── page.tsx  # View mode
│       │   │   │       └── edit/
│       │   │   │           └── page.tsx  # Edit/builder mode
│       │   │   ├── datasets/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [datasetId]/page.tsx
│       │   │   ├── workspace/
│       │   │   │   ├── settings/page.tsx
│       │   │   │   └── members/page.tsx
│       │   │   ├── profile/page.tsx
│       │   │   └── billing/page.tsx
│       │   ├── api/
│       │   │   ├── trpc/[trpc]/route.ts
│       │   │   ├── webhooks/
│       │   │   │   ├── clerk/route.ts
│       │   │   │   └── stripe/route.ts
│       │   │   ├── export/
│       │   │   │   ├── pdf/route.ts
│       │   │   │   └── png/route.ts
│       │   │   └── ai/
│       │   │       └── insights/route.ts
│       │   ├── globals.css
│       │   ├── layout.tsx            # Root layout + providers
│       │   └── not-found.tsx
│       │
│       ├── components/
│       │   ├── ui/                   # Shadcn/UI base components
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── dropdown-menu.tsx
│       │   │   ├── input.tsx
│       │   │   ├── label.tsx
│       │   │   ├── popover.tsx
│       │   │   ├── select.tsx
│       │   │   ├── separator.tsx
│       │   │   ├── sheet.tsx
│       │   │   ├── slider.tsx
│       │   │   ├── switch.tsx
│       │   │   ├── tabs.tsx
│       │   │   ├── toast.tsx
│       │   │   ├── tooltip.tsx
│       │   │   └── ...
│       │   ├── canvas/
│       │   │   ├── Canvas.tsx        # Main drag-drop grid
│       │   │   ├── CanvasTile.tsx    # Individual resizable tile
│       │   │   ├── CanvasGrid.tsx    # Grid overlay/snapping
│       │   │   ├── CanvasToolbar.tsx # Edit toolbar
│       │   │   └── useCanvas.ts      # Canvas state hook
│       │   ├── tiles/
│       │   │   ├── ChartTile.tsx
│       │   │   ├── KPICardTile.tsx
│       │   │   ├── TableTile.tsx
│       │   │   ├── TextTile.tsx
│       │   │   ├── ImageTile.tsx
│       │   │   ├── MapTile.tsx
│       │   │   ├── FilterTile.tsx
│       │   │   └── TileWrapper.tsx
│       │   ├── charts/
│       │   │   ├── BarChart.tsx
│       │   │   ├── LineChart.tsx
│       │   │   ├── AreaChart.tsx
│       │   │   ├── PieChart.tsx
│       │   │   ├── DonutChart.tsx
│       │   │   ├── ScatterChart.tsx
│       │   │   ├── FunnelChart.tsx
│       │   │   ├── WaterfallChart.tsx
│       │   │   ├── GaugeChart.tsx
│       │   │   ├── TreemapChart.tsx
│       │   │   ├── HeatmapChart.tsx
│       │   │   ├── RadarChart.tsx
│       │   │   ├── SankeyChart.tsx
│       │   │   ├── BoxPlotChart.tsx
│       │   │   └── ComboChart.tsx
│       │   ├── panels/
│       │   │   ├── VisualizationPanel.tsx  # Right panel: visual props
│       │   │   ├── DataPanel.tsx           # Right panel: data binding
│       │   │   ├── FilterPanel.tsx         # Right panel: filters
│       │   │   ├── FormatPanel.tsx         # Right panel: formatting
│       │   │   └── AnalyticsPanel.tsx      # Right panel: AI insights
│       │   ├── layout/
│       │   │   ├── AppShell.tsx
│       │   │   ├── Sidebar.tsx
│       │   │   ├── Topbar.tsx
│       │   │   ├── PageTabs.tsx      # Report pages (like Power BI tabs)
│       │   │   └── CommandPalette.tsx
│       │   ├── modals/
│       │   │   ├── AddVisualModal.tsx
│       │   │   ├── DataSourceModal.tsx
│       │   │   ├── ShareModal.tsx
│       │   │   ├── ExportModal.tsx
│       │   │   └── ThemeModal.tsx
│       │   └── providers/
│       │       ├── TRPCProvider.tsx
│       │       ├── ThemeProvider.tsx
│       │       └── WorkspaceProvider.tsx
│       │
│       ├── hooks/
│       │   ├── useReport.ts
│       │   ├── useTiles.ts
│       │   ├── useFilters.ts
│       │   ├── useDataset.ts
│       │   ├── useTheme.ts
│       │   ├── useAIInsights.ts
│       │   ├── useExport.ts
│       │   └── useDebounce.ts
│       │
│       ├── lib/
│       │   ├── trpc/
│       │   │   ├── client.ts
│       │   │   ├── server.ts
│       │   │   └── router/
│       │   │       ├── index.ts      # Root router
│       │   │       ├── reports.ts
│       │   │       ├── tiles.ts
│       │   │       ├── datasets.ts
│       │   │       ├── workspace.ts
│       │   │       ├── insights.ts
│       │   │       └── exports.ts
│       │   ├── db/
│       │   │   └── index.ts          # Prisma client singleton
│       │   ├── ai/
│       │   │   ├── openai.ts         # OpenAI client
│       │   │   └── prompts.ts        # Insight generation prompts
│       │   ├── connectors/
│       │   │   ├── postgres.ts
│       │   │   ├── mysql.ts
│       │   │   ├── csv.ts
│       │   │   ├── rest-api.ts
│       │   │   ├── supabase.ts
│       │   │   └── google-sheets.ts
│       │   ├── export/
│       │   │   ├── pdf.ts            # Puppeteer PDF generation
│       │   │   └── image.ts          # Sharp image export
│       │   ├── redis.ts              # Upstash Redis client
│       │   ├── storage.ts            # Supabase Storage helpers
│       │   ├── utils.ts
│       │   └── validators/
│       │       ├── tile.schema.ts
│       │       ├── report.schema.ts
│       │       └── dataset.schema.ts
│       │
│       ├── store/
│       │   ├── useCanvasStore.ts     # Zustand canvas state
│       │   ├── useFilterStore.ts     # Active filter state
│       │   ├── useThemeStore.ts      # Active theme state
│       │   └── useWorkspaceStore.ts  # Workspace state
│       │
│       ├── types/
│       │   ├── tile.types.ts
│       │   ├── chart.types.ts
│       │   ├── dataset.types.ts
│       │   ├── report.types.ts
│       │   └── theme.types.ts
│       │
│       ├── styles/
│       │   └── themes/
│       │       ├── default.css
│       │       ├── dark.css
│       │       └── custom.ts         # Dynamic theme generator
│       │
│       ├── public/
│       │   ├── favicon.ico
│       │   ├── og-image.png
│       │   └── icons/
│       │
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seed.ts
│       │
│       ├── tests/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── e2e/
│       │       ├── auth.spec.ts
│       │       ├── canvas.spec.ts
│       │       └── export.spec.ts
│       │
│       ├── .env.example
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       └── playwright.config.ts
│
├── packages/
│   ├── ui/                           # Shared UI component library (future)
│   ├── config/
│   │   ├── eslint-config/
│   │   ├── typescript-config/
│   │   └── tailwind-config/
│   └── types/                        # Shared TypeScript types
│
├── scripts/
│   ├── setup.sh                      # One-command local setup
│   ├── seed-demo.ts                  # Seed demo workspace data
│   └── generate-types.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   └── CONNECTORS.md
│
├── vercel.json                       # Vercel config
├── turbo.json                        # Turborepo config
├── package.json                      # Root workspace package
├── pnpm-workspace.yaml
└── README.md
```

---

## 7. TECH STACK — COMPLETE SPECIFICATION

### Frontend
| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| Framework | next | 14.x | App Router, RSC, API Routes |
| UI | react, react-dom | 18.x | Component framework |
| Styling | tailwindcss | 3.4.x | Utility CSS |
| Components | @shadcn/ui | latest | Base component library |
| Animations | framer-motion | 11.x | Tile animations, transitions |
| Drag & Drop | @dnd-kit/core, @dnd-kit/sortable | 6.x | Canvas drag-drop |
| Resize | react-resizable-panels | 2.x | Tile resizing |
| Charts (Primary) | echarts, echarts-for-react | 5.x | All chart types |
| Charts (Secondary) | recharts | 2.x | Lightweight fallback |
| Maps | react-leaflet | 4.x | Map visualization |
| State | zustand | 4.x | Client state management |
| Data fetching | @trpc/client, @tanstack/react-query | 11.x / 5.x | Server state |
| Forms | react-hook-form, @hookform/resolvers | 7.x | All forms |
| Validation | zod | 3.x | Schema validation |
| Tables | @tanstack/react-table | 8.x | Data table tiles |
| Color picker | react-colorful | 5.x | Theme customization |
| Font picker | Custom (Google Fonts API) | — | Typography |
| Icons | lucide-react | 0.4x | Icon system |
| Date | date-fns | 3.x | Date formatting |
| Numbers | numeral | 2.x | Number formatting |
| Markdown | react-markdown | 9.x | Text tile |
| Hotkeys | @github/hotkey | 3.x | Keyboard shortcuts |
| Virtualization | @tanstack/react-virtual | 3.x | Large table performance |

### Backend & API
| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| API | @trpc/server | 11.x | Type-safe API |
| ORM | prisma | 5.x | Database ORM |
| Database | @supabase/supabase-js | 2.x | Postgres + Storage |
| Cache | @upstash/redis | 1.x | Rate limiting, cache |
| Auth | @clerk/nextjs | 5.x | Authentication |
| Email | resend | 3.x | Transactional email |
| AI | openai | 4.x | GPT-4o insights |
| PDF Export | puppeteer | 22.x (serverless) | PDF generation |
| Image Export | sharp | 0.33.x | PNG export |
| CSV | papaparse | 5.x | CSV parsing |
| Payments | stripe | 14.x | Billing |
| File upload | uploadthing | 6.x | Asset uploads |
| Logging | pino | 9.x | Structured logging |

### Infrastructure
| Service | Purpose | Tier |
|---------|---------|------|
| Vercel | Hosting, CDN, Edge Functions | Pro |
| Supabase | Postgres DB + Storage | Pro |
| Upstash | Redis (rate limiting + cache) | Pay-as-you-go |
| Clerk | Authentication | Pro |
| OpenAI | AI insights | Pay-per-use |
| Resend | Email | Free → Pro |
| Sentry | Error tracking | Free → Pro |
| PostHog | Product analytics | Free → Pro |
| Stripe | Payments | Pay-as-you-go |

### Development Tools
| Tool | Purpose |
|------|---------|
| pnpm | Package manager (workspace) |
| turborepo | Monorepo build system |
| TypeScript 5.x | Type safety |
| ESLint + Prettier | Code quality |
| Husky + lint-staged | Pre-commit hooks |
| Vitest | Unit + integration tests |
| Playwright | E2E tests |
| Storybook | Component development |

---

## 8. ENVIRONMENT VARIABLES & SECRETS

### `.env.example` — Complete

```env
# ─────────────────────────────────────────────
# APP
# ─────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=LuminaBI
NODE_ENV=development

# ─────────────────────────────────────────────
# DATABASE (Supabase)
# ─────────────────────────────────────────────
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ─────────────────────────────────────────────
# AUTHENTICATION (Clerk)
# ─────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
CLERK_WEBHOOK_SECRET=whsec_...

# ─────────────────────────────────────────────
# AI (OpenAI)
# ─────────────────────────────────────────────
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
AI_INSIGHT_CACHE_TTL=86400

# ─────────────────────────────────────────────
# CACHE (Upstash Redis)
# ─────────────────────────────────────────────
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60

# ─────────────────────────────────────────────
# EMAIL (Resend)
# ─────────────────────────────────────────────
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@luminabi.io

# ─────────────────────────────────────────────
# PAYMENTS (Stripe)
# ─────────────────────────────────────────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_PRICE_ID=price_...

# ─────────────────────────────────────────────
# MONITORING
# ─────────────────────────────────────────────
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# ─────────────────────────────────────────────
# FILE UPLOADS (UploadThing)
# ─────────────────────────────────────────────
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# ─────────────────────────────────────────────
# GOOGLE (OAuth + Sheets connector)
# ─────────────────────────────────────────────
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=...

# ─────────────────────────────────────────────
# EXPORT
# ─────────────────────────────────────────────
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
MAX_EXPORT_ROWS=50000
```

### Vercel Environment Variables Setup
- Set all production env vars in Vercel Dashboard → Project → Settings → Environment Variables
- Use separate values for Preview and Production environments
- Never commit `.env.local` to git (enforced by `.gitignore`)
- Use Vercel's encrypted secret storage for sensitive values

---

## 9. DATABASE SCHEMA — COMPLETE

### Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ─────────────────────────────────────────────
// ORGANIZATION / WORKSPACE
// ─────────────────────────────────────────────

model Workspace {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  plan        Plan     @default(FREE)
  logoUrl     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members     WorkspaceMember[]
  reports     Report[]
  datasets    Dataset[]
  themes      Theme[]
  invitations Invitation[]
  subscription Subscription?

  @@map("workspaces")
}

model WorkspaceMember {
  id          String    @id @default(cuid())
  workspaceId String
  userId      String    // Clerk user ID
  role        MemberRole @default(VIEWER)
  joinedAt    DateTime  @default(now())

  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([workspaceId, userId])
  @@map("workspace_members")
}

model Invitation {
  id          String    @id @default(cuid())
  workspaceId String
  email       String
  role        MemberRole @default(VIEWER)
  token       String    @unique @default(cuid())
  expiresAt   DateTime
  acceptedAt  DateTime?
  createdAt   DateTime  @default(now())

  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@map("invitations")
}

// ─────────────────────────────────────────────
// REPORTS & PAGES
// ─────────────────────────────────────────────

model Report {
  id          String   @id @default(cuid())
  workspaceId String
  name        String
  description String?
  slug        String
  isPublic    Boolean  @default(false)
  thumbnail   String?
  themeId     String?
  createdBy   String   // Clerk user ID
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  theme       Theme?    @relation(fields: [themeId], references: [id])
  pages       ReportPage[]
  shares      ReportShare[]

  @@unique([workspaceId, slug])
  @@map("reports")
}

model ReportPage {
  id          String   @id @default(cuid())
  reportId    String
  name        String
  order       Int
  canvasConfig Json    // { width, height, background, gridSize }
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  report      Report @relation(fields: [reportId], references: [id], onDelete: Cascade)
  tiles       Tile[]

  @@map("report_pages")
}

// ─────────────────────────────────────────────
// TILES (Dashboard Visuals)
// ─────────────────────────────────────────────

model Tile {
  id          String   @id @default(cuid())
  pageId      String
  type        TileType
  title       String?
  
  // Position & Size (grid units)
  x           Int
  y           Int
  w           Int      // width in grid columns
  h           Int      // height in grid rows
  
  // Data binding
  datasetId   String?
  queryConfig Json?    // { sql, filters, aggregations, dimensions, measures }
  
  // Visual config
  visualConfig Json    // Chart type, colors, axes, legend, etc.
  
  // Style overrides
  styleConfig Json?    // { background, border, padding, font, etc. }
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  page        ReportPage @relation(fields: [pageId], references: [id], onDelete: Cascade)
  dataset     Dataset?   @relation(fields: [datasetId], references: [id])

  @@map("tiles")
}

// ─────────────────────────────────────────────
// DATASETS & CONNECTORS
// ─────────────────────────────────────────────

model Dataset {
  id          String        @id @default(cuid())
  workspaceId String
  name        String
  description String?
  type        DatasetType
  config      Json          // Connection config (encrypted for credentials)
  schema      Json?         // Discovered column schema
  lastSyncAt  DateTime?
  rowCount    Int?
  createdBy   String
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  tiles       Tile[]
  queryCache  QueryCache[]

  @@map("datasets")
}

model QueryCache {
  id          String   @id @default(cuid())
  datasetId   String
  queryHash   String   // MD5 of query config
  result      Json     // Cached query result
  rowCount    Int
  expiresAt   DateTime
  createdAt   DateTime @default(now())

  dataset     Dataset @relation(fields: [datasetId], references: [id], onDelete: Cascade)

  @@unique([datasetId, queryHash])
  @@map("query_cache")
}

// ─────────────────────────────────────────────
// THEMES
// ─────────────────────────────────────────────

model Theme {
  id          String   @id @default(cuid())
  workspaceId String
  name        String
  isDefault   Boolean  @default(false)
  config      Json     // Full theme config object
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  reports     Report[]

  @@map("themes")
}

// ─────────────────────────────────────────────
// SHARING & EXPORTS
// ─────────────────────────────────────────────

model ReportShare {
  id          String    @id @default(cuid())
  reportId    String
  shareToken  String    @unique @default(cuid())
  password    String?   // Hashed
  expiresAt   DateTime?
  viewCount   Int       @default(0)
  createdAt   DateTime  @default(now())

  report      Report @relation(fields: [reportId], references: [id], onDelete: Cascade)

  @@map("report_shares")
}

model Export {
  id          String    @id @default(cuid())
  reportId    String
  format      ExportFormat
  status      ExportStatus @default(PENDING)
  fileUrl     String?
  error       String?
  createdBy   String
  createdAt   DateTime  @default(now())
  completedAt DateTime?

  @@map("exports")
}

// ─────────────────────────────────────────────
// AI INSIGHTS
// ─────────────────────────────────────────────

model AIInsight {
  id          String   @id @default(cuid())
  tileId      String
  content     Json     // Array of insight objects
  model       String
  tokensUsed  Int
  createdAt   DateTime @default(now())
  expiresAt   DateTime

  @@map("ai_insights")
}

// ─────────────────────────────────────────────
// BILLING
// ─────────────────────────────────────────────

model Subscription {
  id                  String   @id @default(cuid())
  workspaceId         String   @unique
  stripeCustomerId    String   @unique
  stripeSubscriptionId String?  @unique
  stripePriceId       String?
  status              SubscriptionStatus
  currentPeriodStart  DateTime?
  currentPeriodEnd    DateTime?
  cancelAtPeriodEnd   Boolean  @default(false)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  workspace           Workspace @relation(fields: [workspaceId], references: [id])

  @@map("subscriptions")
}

// ─────────────────────────────────────────────
// AUDIT LOG
// ─────────────────────────────────────────────

model AuditLog {
  id          String   @id @default(cuid())
  workspaceId String
  userId      String
  action      String   // e.g., "report.created", "tile.deleted"
  resourceId  String?
  metadata    Json?
  ipAddress   String?
  createdAt   DateTime @default(now())

  @@index([workspaceId, createdAt])
  @@map("audit_logs")
}

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

enum Plan {
  FREE
  PRO
  TEAM
  ENTERPRISE
}

enum MemberRole {
  OWNER
  ADMIN
  EDITOR
  VIEWER
}

enum TileType {
  BAR_CHART
  LINE_CHART
  AREA_CHART
  PIE_CHART
  DONUT_CHART
  SCATTER_CHART
  FUNNEL_CHART
  WATERFALL_CHART
  GAUGE_CHART
  TREEMAP_CHART
  HEATMAP_CHART
  RADAR_CHART
  SANKEY_CHART
  BOX_PLOT
  COMBO_CHART
  MAP_CHART
  KPI_CARD
  DATA_TABLE
  TEXT
  IMAGE
  FILTER_SLICER
  DATE_SLICER
  IFRAME
}

enum DatasetType {
  POSTGRESQL
  MYSQL
  SQLITE
  MSSQL
  BIGQUERY
  CSV_FILE
  EXCEL_FILE
  JSON_FILE
  REST_API
  GRAPHQL_API
  SUPABASE
  GOOGLE_SHEETS
  AIRTABLE
  MONGODB
  DEMO
}

enum ExportFormat {
  PDF
  PNG
  CSV
  XLSX
  JSON
}

enum ExportStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  INCOMPLETE
  PAST_DUE
  TRIALING
  UNPAID
}
```

---

## 10. AUTHENTICATION & AUTHORIZATION

### Auth Provider: Clerk

#### Configuration
- Sign-in methods: Email/password, Google OAuth, GitHub OAuth
- MFA: TOTP (optional, recommended for Team/Enterprise)
- Session duration: 7 days (rolling)
- Webhook events consumed: `user.created`, `user.deleted`, `organization.created`

#### Route Protection (Middleware)

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/shared/(.*)",       // Public shared reports
  "/api/webhooks/(.*)", // Clerk + Stripe webhooks
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});
```

#### Authorization Matrix

| Action | OWNER | ADMIN | EDITOR | VIEWER |
|--------|-------|-------|--------|--------|
| View reports | ✅ | ✅ | ✅ | ✅ |
| Create reports | ✅ | ✅ | ✅ | ❌ |
| Edit reports | ✅ | ✅ | ✅ | ❌ |
| Delete reports | ✅ | ✅ | ❌ | ❌ |
| Manage datasets | ✅ | ✅ | ✅ | ❌ |
| Invite members | ✅ | ✅ | ❌ | ❌ |
| Change roles | ✅ | ✅ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ | ❌ |
| Delete workspace | ✅ | ❌ | ❌ | ❌ |
| Share externally | ✅ | ✅ | ✅ | ❌ |
| Export data | ✅ | ✅ | ✅ | ✅ |
| Manage themes | ✅ | ✅ | ✅ | ❌ |

#### tRPC Authorization Pattern
```typescript
// All authenticated procedures
const authedProcedure = t.procedure.use(isAuthed);
// Workspace-scoped procedures with role check
const editorProcedure = authedProcedure.use(hasWorkspaceRole(["OWNER","ADMIN","EDITOR"]));
const adminProcedure = authedProcedure.use(hasWorkspaceRole(["OWNER","ADMIN"]));
```

---

## 11. FEATURE SPECIFICATIONS — COMPLETE

### 11.1 CANVAS & LAYOUT ENGINE

#### Overview
The canvas is the core of the builder experience—a free-form, grid-snapping workspace where tiles are placed, moved, and resized. Inspired by Power BI's canvas but with superior UX.

#### Canvas Configuration (per page)
```typescript
interface CanvasConfig {
  width: number;           // Default: 1280px
  height: number;          // Default: 720px (16:9) or auto
  gridSize: number;        // Default: 20px snap grid
  background: {
    type: "solid" | "gradient" | "image" | "transparent";
    value: string;
  };
  padding: number;         // Canvas internal padding
  showGrid: boolean;
  snapToGrid: boolean;
  snapToElements: boolean; // Smart guides
  zoom: number;            // 10% - 400%
  fitToScreen: boolean;
}
```

#### Canvas Modes
- **View Mode:** Read-only, no controls, interactive filters active
- **Edit Mode:** Full builder controls, drag-drop enabled, panels visible
- **Presentation Mode:** Full-screen, no chrome, interactive filters active
- **Mobile Preview:** Simulates 375px viewport

#### Canvas Toolbar (Edit Mode)
- Zoom in/out/reset (+ keyboard shortcuts: `Ctrl +/-/0`)
- Fit to screen
- Toggle grid visibility
- Toggle snap to grid
- Canvas size picker (16:9, 4:3, A4, custom)
- Undo/Redo (50-step history via Zustand + immer)
- Select all, deselect
- Group/ungroup tiles
- Lock/unlock tile
- Alignment tools (left, center, right, top, middle, bottom)
- Distribute evenly (horizontal, vertical)
- Bring to front / Send to back / Bring forward / Send backward

#### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Ctrl+C` | Copy tile |
| `Ctrl+V` | Paste tile |
| `Ctrl+D` | Duplicate tile |
| `Delete` / `Backspace` | Delete selected |
| `Ctrl+A` | Select all |
| `Ctrl+G` | Group |
| `Ctrl+Shift+G` | Ungroup |
| `Ctrl+L` | Lock toggle |
| `Ctrl+Shift+H` | Bring to front |
| `Ctrl+Shift+L` | Send to back |
| `Ctrl+S` | Save (manual) |
| `Ctrl+E` | Export |
| `Ctrl+/` | Command palette |
| Arrow keys | Nudge tile 1px |
| `Shift+Arrow` | Nudge tile 10px |
| `Escape` | Deselect / close panel |
| `Space+drag` | Pan canvas |
| `Ctrl+scroll` | Zoom canvas |

#### Canvas State (Zustand Store)
```typescript
interface CanvasState {
  tiles: TileConfig[];
  selectedTileIds: string[];
  history: CanvasSnapshot[];
  historyIndex: number;
  mode: "view" | "edit" | "presentation";
  zoom: number;
  canvasConfig: CanvasConfig;
  
  // Actions
  addTile: (type: TileType, position: Position) => void;
  removeTile: (id: string) => void;
  updateTile: (id: string, updates: Partial<TileConfig>) => void;
  moveTile: (id: string, position: Position) => void;
  resizeTile: (id: string, size: Size) => void;
  selectTile: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  undo: () => void;
  redo: () => void;
  saveSnapshot: () => void;
}
```

---

### 11.2 VISUAL TILE SYSTEM

#### Tile Base Configuration
```typescript
interface TileConfig {
  id: string;
  type: TileType;
  title: string;
  titleVisible: boolean;
  
  // Position (grid units)
  x: number;
  y: number;
  w: number;       // width in grid columns (1-24)
  h: number;       // height in grid rows
  
  // Constraints
  minW: number;
  minH: number;
  maxW: number;
  maxH: number;
  isLocked: boolean;
  isVisible: boolean;
  
  // Data
  datasetId?: string;
  queryConfig?: QueryConfig;
  
  // Visualization
  visualConfig: ChartConfig | KPIConfig | TableConfig | TextConfig | FilterConfig;
  
  // Style
  styleConfig: TileStyleConfig;
  
  // Interaction
  interactions: TileInteraction[];
  
  // Z-index
  zIndex: number;
}

interface TileStyleConfig {
  background: string;
  backgroundOpacity: number;
  border: {
    enabled: boolean;
    color: string;
    width: number;
    radius: number;
    style: "solid" | "dashed" | "dotted";
  };
  shadow: {
    enabled: boolean;
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
  };
  padding: { top: number; right: number; bottom: number; left: number };
  titleFont: FontConfig;
  titleColor: string;
  titleAlign: "left" | "center" | "right";
  titlePadding: number;
}
```

---

### 11.3 DRAG, DROP & RESIZE

#### Implementation: @dnd-kit

**Drag Behavior:**
- Tiles are draggable by clicking and holding the title bar or body (when not interacting with chart)
- Shows a shadow/ghost of original position during drag
- Snaps to grid (20px default, configurable)
- Smart guides appear when within 5px of another tile's edges/centers
- Multi-select drag: all selected tiles move together
- Locked tiles: not draggable (cursor shows lock icon)

**Drop Zones:**
- Canvas is the only drop zone
- Tiles cannot be dropped outside canvas bounds
- Auto-scroll canvas when dragging near edges

**Add New Visual (Drag from Panel):**
- Visual type panel (left sidebar) has draggable visual type chips
- Drag from panel → drop on canvas → tile appears at drop position
- Alternatively: click visual type → places in first available canvas space

**Resize Behavior:**
- Resize handles appear on hover (8 handles: 4 corners + 4 edges)
- Minimum size enforced per tile type (e.g., bar chart: 4×3 columns)
- Snaps to grid during resize
- Aspect ratio lock option (hold Shift)
- Double-click resize handle → auto-fit to content

**Implementation Details:**
```typescript
// Canvas.tsx — dnd-kit setup
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  MeasuringStrategy,
} from "@dnd-kit/core";

const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  useSensor(KeyboardSensor)
);
```

---

### 11.4 CHART & VISUALIZATION LIBRARY

#### Complete Chart Catalog

**Category: Comparison**
| Chart | Config Options |
|-------|---------------|
| Bar Chart (Vertical) | Grouped, stacked, 100% stacked; axis labels; data labels; reference lines |
| Bar Chart (Horizontal) | Same as vertical |
| Column Chart | Alias of vertical bar |
| Lollipop Chart | Dot radius, line weight |
| Bullet Chart | Target value, bands |

**Category: Trend**
| Chart | Config Options |
|-------|---------------|
| Line Chart | Smooth/step/straight; area fill; markers; multiple series |
| Area Chart | Stacked, normalized; gradient fill |
| Sparkline | Mini inline chart (for KPI cards) |

**Category: Part-to-Whole**
| Chart | Config Options |
|-------|---------------|
| Pie Chart | Inner radius, labels, legend position, sort |
| Donut Chart | Inner label, center text |
| Treemap | Label display, depth levels, color by value |
| Sunburst | Depth, animation |
| Waffle Chart | Grid size |

**Category: Correlation**
| Chart | Config Options |
|-------|---------------|
| Scatter Plot | Point size, color by dimension, regression line |
| Bubble Chart | Z-axis for bubble size |
| Box Plot | Outlier display, whisker style |
| Heatmap | Color scale, cell size, value display |

**Category: Distribution**
| Chart | Config Options |
|-------|---------------|
| Histogram | Bin size, density curve |
| Density Plot | Bandwidth |
| Radar Chart | Axis scale, fill, multiple series |

**Category: Flow**
| Chart | Config Options |
|-------|---------------|
| Funnel Chart | Direction, label position, conversion rate |
| Sankey Diagram | Node width, link opacity |
| Waterfall Chart | Positive/negative colors, total bar |

**Category: KPI & Summary**
| Component | Config Options |
|-----------|---------------|
| KPI Card | Primary value, sub-value, trend indicator, sparkline, comparison period, icon |
| Metric Card | Multiple metrics in one card, table layout |
| Progress Bar | Target line, color thresholds |
| Gauge Chart | Min/max/target, arc colors, needle style |

**Category: Tabular**
| Component | Config Options |
|-----------|---------------|
| Data Table | Sortable columns, pagination, row count, conditional formatting, sparkline columns, bar columns |
| Matrix Table | Row/column headers, sub-totals, grand totals |
| Pivot Table | Drag-and-drop rows/columns |

**Category: Geographic**
| Component | Config Options |
|-----------|---------------|
| Choropleth Map | Country/state fill, color scale |
| Bubble Map | Point size by metric |
| Point Map | Custom markers |

**Category: Content**
| Component | Config Options |
|-----------|---------------|
| Text Box | Markdown support, font, color, alignment |
| Image | URL or upload, fit modes |
| Iframe Embed | URL embed |
| Divider | Horizontal/vertical, color, weight |
| Shape | Rectangle, circle, custom |

#### Chart Visual Config Schema
```typescript
interface ChartVisualConfig {
  chartType: ChartSubtype;
  
  // Data mapping
  xAxis: { field: string; label: string; type: "category" | "time" | "value" };
  yAxis: { field: string; label: string; type: "value"; format: string };
  series: SeriesConfig[];
  groupBy?: string;
  sortBy?: { field: string; direction: "asc" | "desc" };
  limit?: number;
  
  // Axes
  xAxisConfig: AxisConfig;
  yAxisConfig: AxisConfig;
  y2AxisConfig?: AxisConfig; // Secondary Y axis for combo charts
  
  // Legend
  legend: {
    show: boolean;
    position: "top" | "bottom" | "left" | "right";
    orient: "horizontal" | "vertical";
    align: "left" | "center" | "right";
  };
  
  // Data labels
  dataLabels: {
    show: boolean;
    position: string;
    format: string;
    font: FontConfig;
    color: string;
  };
  
  // Tooltip
  tooltip: {
    show: boolean;
    format: string;
    shared: boolean;
  };
  
  // Colors
  colorScheme: string;       // Preset name or "custom"
  customColors: string[];    // Array of hex colors
  colorByPoint: boolean;
  
  // Reference lines
  referenceLines: ReferenceLineConfig[];
  
  // Animation
  animation: boolean;
  animationDuration: number;
  
  // Zoom & pan
  zoom: boolean;
  
  // Grid
  grid: {
    show: boolean;
    color: string;
    dashArray: string;
  };
  
  // Thresholds (conditional coloring)
  thresholds: ThresholdConfig[];
}

interface SeriesConfig {
  name: string;
  field: string;
  type: ChartSubtype;      // For combo charts
  color?: string;
  yAxisIndex?: number;
}

interface AxisConfig {
  show: boolean;
  label: string;
  labelFont: FontConfig;
  tickFont: FontConfig;
  tickColor: string;
  lineColor: string;
  gridLines: boolean;
  format: string;           // Number/date format string
  min?: number;
  max?: number;
  tickCount?: number;
  rotate?: number;          // Tick label rotation
}

interface ThresholdConfig {
  operator: ">" | "<" | ">=" | "<=" | "==" | "!=";
  value: number;
  color: string;
  label?: string;
}
```

---

### 11.5 DATA SOURCE CONNECTORS

#### Supported Connectors (v1)

**SQL Databases**
- PostgreSQL (connection string or individual fields)
- MySQL / MariaDB
- MS SQL Server
- SQLite (file upload)
- Supabase (native integration)
- BigQuery (service account JSON)
- Redshift (coming v1.1)

**Files**
- CSV Upload (up to 50MB)
- Excel (.xlsx) Upload (up to 20MB)
- JSON Upload
- Google Sheets (OAuth)

**APIs**
- REST API (GET endpoints, with header auth support)
- GraphQL (queries)
- Airtable (API key)

**Demo Dataset** (built-in, no config needed)
- E-commerce sales data (50k rows)
- SaaS metrics (MRR, churn, users)
- HR analytics

#### Connector Config UI Flow
1. Click "+ New Dataset" → modal opens
2. Select connector type (icon grid)
3. Fill connector-specific form (validated with Zod)
4. Test Connection → shows success/error + column preview
5. Name dataset → Save
6. Schema discovery runs in background
7. Dataset appears in "Datasets" panel

#### Connector Config Schemas
```typescript
interface PostgresConnectorConfig {
  host: string;
  port: number;           // Default: 5432
  database: string;
  username: string;
  password: string;       // Encrypted in DB
  ssl: boolean;
  schema: string;         // Default: "public"
}

interface CSVConnectorConfig {
  fileUrl: string;        // UploadThing URL
  fileName: string;
  delimiter: "," | ";" | "\t" | "|";
  hasHeaders: boolean;
  encoding: "utf-8" | "latin1";
}

interface RESTAPIConnectorConfig {
  url: string;
  method: "GET" | "POST";
  headers: Record<string, string>;
  body?: string;
  authType: "none" | "bearer" | "basic" | "api_key";
  authConfig?: Record<string, string>;
  jsonPath: string;       // JSONPath to data array, e.g. "$.data.items"
  refreshInterval?: number; // minutes
}
```

#### Query Builder
Each tile that binds to a dataset has a query config:

```typescript
interface QueryConfig {
  datasetId: string;
  mode: "visual" | "sql";
  
  // Visual mode
  table?: string;
  select: SelectField[];
  filters: FilterConfig[];
  groupBy: string[];
  orderBy: OrderByConfig[];
  limit?: number;
  
  // SQL mode (for SQL connectors)
  sql?: string;
  
  // Computed columns
  computedFields: ComputedField[];
}

interface SelectField {
  field: string;
  alias?: string;
  aggregation?: "SUM" | "COUNT" | "AVG" | "MIN" | "MAX" | "COUNT_DISTINCT";
}

interface ComputedField {
  name: string;
  expression: string;   // e.g., "revenue / units" or "CASE WHEN..."
  type: "number" | "string" | "date";
}
```

---

### 11.6 FILTER & SLICER ENGINE

#### Filter Types
- **Dropdown Slicer:** Single or multi-select from distinct values
- **Search Slicer:** Text search with autocomplete
- **Date Range Picker:** Calendar date range
- **Relative Date Slicer:** "Last 7 days", "This month", "YTD", custom
- **Numeric Range Slider:** Min/max range slider
- **Checkbox List:** Multiple value select
- **Toggle Button:** Boolean filter
- **Tile Interaction Filter:** Click a chart bar/slice → filters other tiles

#### Cross-Tile Filtering
- By default, a filter tile affects all tiles on the page that share the same dataset
- Per-filter: editor can define which specific tiles a slicer affects
- Interaction filters: clicking a data point in Chart A → filters Chart B (configurable)

#### Filter State
```typescript
interface FilterState {
  pageFilters: FilterValue[];   // Page-level filters (from slicer tiles)
  tileFilters: Record<string, FilterValue[]>;  // Per-tile overrides
  interactionFilters: FilterValue[];  // From click interactions
  
  // Computed: merged filter set per tile
  getEffectiveFilters: (tileId: string) => FilterValue[];
}

interface FilterValue {
  field: string;
  operator: FilterOperator;
  value: string | number | string[] | DateRange;
  sourceId: string;   // Slicer tile ID or "interaction"
}

type FilterOperator = 
  | "eq" | "neq" | "in" | "not_in"
  | "gt" | "gte" | "lt" | "lte"
  | "between" | "contains" | "starts_with"
  | "is_null" | "is_not_null"
  | "date_range" | "relative_date";
```

#### Filter Slicer Tile Config
```typescript
interface FilterTileConfig {
  field: string;
  displayName: string;
  type: "dropdown" | "search" | "date_range" | "relative_date" | "numeric_range" | "checkbox" | "toggle";
  multiSelect: boolean;
  defaultValue?: FilterValue;
  affectsAllTiles: boolean;
  affectedTileIds?: string[];
  searchable: boolean;
  clearable: boolean;
  showSelectAll: boolean;
}
```

---

### 11.7 THEME & STYLING ENGINE

#### Built-in Themes (12 presets)
| Theme Name | Style |
|------------|-------|
| LuminaLight | Clean white, blue accents |
| LuminaDark | Deep charcoal, electric blue |
| Midnight | Pure black, neon accents |
| Executive | Navy blue, gold accents |
| Forest | Deep green, cream |
| Coral | Warm coral, sand |
| Slate | Gray, minimal |
| Candy | Bright, playful pastels |
| Monochrome | Black & white only |
| Solarized | Warm yellow-based |
| Arctic | Cool blue-white |
| Terminal | Green on black, monospace |

#### Theme Config Schema
```typescript
interface ThemeConfig {
  name: string;
  mode: "light" | "dark";
  
  colors: {
    // App chrome
    background: string;
    surface: string;
    surfaceHover: string;
    border: string;
    
    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textOnAccent: string;
    
    // Accent
    primary: string;
    primaryHover: string;
    secondary: string;
    
    // Status
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Chart palette (ordered list of colors for series)
    chartPalette: string[];   // 12 colors minimum
    
    // Canvas
    canvasBackground: string;
    gridColor: string;
    tileBackground: string;
    tileBorder: string;
    tileShadow: string;
  };
  
  typography: {
    fontFamily: string;        // Google Fonts family name
    headingFontFamily: string; // Can differ from body
    baseFontSize: number;      // px, default 14
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: number;
    letterSpacing: number;
  };
  
  shape: {
    borderRadius: number;       // Default: 8px
    tileRadius: number;
    buttonRadius: number;
    inputRadius: number;
  };
  
  spacing: {
    tileGap: number;           // Gap between tiles on canvas
    tilePadding: number;       // Inner tile padding
  };
  
  shadows: {
    tile: string;              // CSS box-shadow value
    dropdown: string;
    modal: string;
  };
  
  charts: {
    fontFamily: string;
    fontSize: number;
    axisColor: string;
    gridColor: string;
    tooltipBackground: string;
    tooltipBorder: string;
    animationDuration: number;
  };
}
```

#### Theme Customizer UI
- Opens as right-side panel or modal
- Live preview updates canvas as user edits
- Sections: Colors, Typography, Shapes, Spacing, Chart Defaults
- Color pickers for each color token
- Font picker: searchable Google Fonts dropdown (500+ fonts)
- Sliders for numeric values
- Import/Export theme as JSON
- Save as new theme or update existing

---

### 11.8 TYPOGRAPHY & COLOR CUSTOMIZATION

#### Per-Tile Font Controls
Every tile exposes these typography controls in the Format panel:
- **Title font family** (Google Fonts, 500+ options)
- **Title font size** (8–72px, slider + input)
- **Title font weight** (Thin/Light/Regular/Medium/SemiBold/Bold/ExtraBold)
- **Title font style** (Normal/Italic)
- **Title text color** (full color picker: hex, rgb, hsl, opacity)
- **Title text alignment** (Left/Center/Right)
- **Title text decoration** (None/Underline/Strikethrough)
- **Title padding** (individual sides)
- **Body/data font family**
- **Body font size**
- **Data label font size & color**
- **Axis label font size & color**
- **Axis tick font size & color**
- **Legend font size & color**
- **Tooltip font size**

#### Color Customization — Global
- Access: Theme panel → Colors section
- Full color picker with: Hex input, RGB sliders, HSL sliders, Opacity slider
- Eyedropper tool (where browser supports it)
- Saved color palette (workspace-level)
- Recent colors history (last 20)
- Named color presets per theme

#### Color Customization — Per Series
In any multi-series chart:
- Click legend item to open color picker for that series
- Individual data point color override (for pie/bar)
- Gradient color scales for continuous data
- Conditional coloring rules (see Thresholds in §11.4)

#### Google Fonts Integration
```typescript
// lib/fonts.ts
const FONT_CATEGORIES = {
  "Sans-Serif": ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", ...],
  "Serif": ["Playfair Display", "Merriweather", "Georgia", ...],
  "Monospace": ["JetBrains Mono", "Fira Code", "Source Code Pro", ...],
  "Display": ["Bebas Neue", "Oswald", "Raleway", ...],
};

// Dynamic font loading via Google Fonts API v2
function loadGoogleFont(family: string, weights: string[]) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights.join(";")}&display=swap`;
  // Inject <link> or use CSS @import
}
```

---

### 11.9 DASHBOARD CARDS (KPI Cards)

#### KPI Card Config Schema
```typescript
interface KPICardConfig {
  // Primary metric
  primaryValue: {
    field: string;
    aggregation: "SUM" | "COUNT" | "AVG" | "MIN" | "MAX";
    format: string;       // e.g., "$#,##0.00" or "0.0%" or "#,##0"
    prefix: string;
    suffix: string;
  };
  
  // Comparison
  comparison: {
    enabled: boolean;
    type: "period_over_period" | "target" | "custom_field";
    period?: "day" | "week" | "month" | "quarter" | "year";
    targetField?: string;
    targetValue?: number;
    showAbsolute: boolean;
    showPercentage: boolean;
  };
  
  // Trend indicator
  trendIndicator: {
    show: boolean;
    positiveColor: string;  // Default: success green
    negativeColor: string;  // Default: error red
    neutralColor: string;
    invertColors: boolean;  // For metrics where down is good (e.g., churn)
    icon: "arrow" | "triangle" | "chevron" | "none";
  };
  
  // Sparkline
  sparkline: {
    show: boolean;
    type: "line" | "bar" | "area";
    height: number;
    color: string;
    timeField: string;
    showDots: boolean;
  };
  
  // Progress bar
  progressBar: {
    show: boolean;
    targetValue: number;
    targetField?: string;
    color: string;
    trackColor: string;
    showLabel: boolean;
  };
  
  // Subtitle / description
  subtitle: string;
  description: string;
  
  // Icon
  icon: {
    show: boolean;
    name: string;          // Lucide icon name
    color: string;
    background: string;
    size: number;
    position: "left" | "right" | "top";
  };
  
  // Layout
  layout: "standard" | "compact" | "prominent" | "minimal";
  valueSize: "sm" | "md" | "lg" | "xl" | "2xl";
}
```

#### KPI Card Layouts
- **Standard:** Icon top-left, big number center, trend below
- **Compact:** All in one row (for dense dashboards)
- **Prominent:** Full-bleed color background, large centered number
- **Minimal:** Just the number and label, no chrome

---

### 11.10 REPORT PAGES & NAVIGATION

#### Page System (Power BI–like tabs)
- Each report has 1–50 pages
- Pages displayed as tabs at the bottom of the canvas (like Power BI)
- Page operations: Add, rename, duplicate, delete, reorder (drag), hide
- Page thumbnail in tab (auto-generated from canvas)
- Page-level background, size, and theme override

#### Page Config
```typescript
interface ReportPageConfig {
  id: string;
  name: string;
  order: number;
  isHidden: boolean;    // Hidden in view mode (for internal pages)
  canvasConfig: CanvasConfig;
  themeOverride?: Partial<ThemeConfig>;
}
```

#### Navigation
- Tab click → instant page switch (no server round-trip; canvas re-renders from store)
- Hotkeys: `Ctrl+PgUp` / `Ctrl+PgDn` to switch pages
- Page navigation tile type: button that navigates to another page on click
- Breadcrumb in topbar: Workspace > Report Name > Page Name

---

### 11.11 AI INSIGHTS ENGINE

#### Overview
Every chart tile has an "AI Insights" button (sparkle icon). Clicking it triggers an OpenAI GPT-4o analysis of the tile's current data and returns 3–5 natural language insights.

#### Insight Types
- **Anomaly Detection:** "Revenue spiked 45% on March 15th—unusual compared to the 30-day average."
- **Trend Analysis:** "Sales have grown 12% month-over-month for the past 6 months."
- **Comparison:** "Category A outperforms Category B by 3.2x this quarter."
- **Forecast:** "Based on current trajectory, you'll hit 10k users by end of Q3."
- **Recommendation:** "Consider investigating the drop in conversion rate in the 18–24 age segment."

#### AI Insight Flow
1. User clicks "AI Insights" on tile
2. Check Redis cache (key: `insight:{tileId}:{dataHash}`) → return if hit
3. If miss: fetch tile data (up to 1000 rows summarized)
4. Build prompt with data summary + chart metadata
5. Call OpenAI GPT-4o with structured output
6. Parse response into InsightCard array
7. Cache in Redis (TTL: 24h)
8. Save to `ai_insights` table
9. Render InsightCard components below/beside chart

#### Prompt Engineering
```typescript
const INSIGHT_SYSTEM_PROMPT = `
You are an expert data analyst. Given a dataset summary and chart configuration,
generate 3-5 concise, actionable insights. Each insight should be:
- Specific (cite actual numbers)
- Actionable (suggest what to investigate or do)
- Non-obvious (don't state what's clearly visible)

Return JSON: { insights: [{ type, title, body, severity }] }
Types: "anomaly" | "trend" | "comparison" | "forecast" | "recommendation"
Severity: "info" | "warning" | "positive" | "negative"
`;
```

#### AI Insights UI
- Slide-out panel on right side
- Each insight card has: icon (type), title, body text, severity color
- "Refresh" button (bypasses cache)
- "Ask a question" text input (follow-up Q&A about the data)
- Insights can be pinned to the tile as an annotation
- Rate insights (👍/👎) — logged for quality improvement

#### AI Usage Controls (Plan-based)
| Plan | AI Insights/month | Follow-up questions |
|------|------------------|-------------------|
| FREE | 50 | 10 |
| PRO | 500 | 100 |
| TEAM | 2,000 | Unlimited |
| ENTERPRISE | Unlimited | Unlimited |

---

### 11.12 EXPORT & SHARE

#### Export Formats

**PDF Export**
- Full report (all pages) or current page only
- Paper sizes: A4, Letter, 16:9 slide
- Orientation: Portrait/Landscape
- Quality: Standard / High / Print
- Include/exclude: Title, date, page numbers, logo watermark
- Implementation: Puppeteer (headless Chrome on Vercel)

**PNG Export**
- Current page → high-res PNG
- Resolution: 1x, 2x, 3x
- Background: include/transparent
- Implementation: Sharp + Puppeteer screenshot

**CSV / Excel Export**
- Export data from a specific tile
- All visible columns and rows
- Applied filters reflected in export
- Excel: formatted with headers, auto column widths

**JSON Export**
- Report config (layout + tile configs, no data)
- Importable to another LuminaBI workspace

#### Sharing

**Public Link**
- Generates a public URL: `https://luminabi.io/shared/{shareToken}`
- Optional password protection
- Optional expiry date
- View-only (no edit, no data access beyond what's embedded)
- View count tracking

**Embed Code**
- `<iframe src="..." width="..." height="..."></iframe>`
- Embed with filters (pre-applied via URL params)
- Domain whitelist for embed

**Workspace Share**
- Invite specific workspace members to a report
- Set role per report: View Only, Can Edit

#### Scheduled Email Reports (PRO+)
- Set schedule: daily, weekly, monthly
- Select recipients (email list)
- Attach as PDF or PNG
- Customizable email body
- Implementation: Resend + Vercel Cron

---

### 11.13 COLLABORATION

#### Real-time Presence (PRO+)
- See who else is viewing/editing the report (avatar stack in topbar)
- Cursor positions shown (like Figma) when in edit mode
- Implementation: Supabase Realtime (presence channels)

#### Comments
- Users can add comments to any tile
- Thread structure (replies)
- @mention teammates (sends email notification)
- Resolve/unresolve comments
- Comments panel in right sidebar
- Comment marker visible on tile (bubble icon)

#### Activity Feed
- Per-report activity log: who changed what, when
- Accessible from report header "Activity" button
- Shows: tile added/removed, config changed, filter applied, shared, exported

#### Version History (PRO+)
- Auto-saves a snapshot every 30 minutes + on major changes
- Manual "Save version" with description
- View/restore any previous version
- Diff view: shows which tiles changed between versions
- 30-day retention on PRO, 90 days on TEAM

---

### 11.14 WORKSPACE & PERMISSIONS

#### Workspace Management
- Workspace creation during onboarding
- Workspace name, logo, slug (URL)
- Multiple workspaces per user (PRO+)
- Switch workspace from sidebar

#### Member Management UI
- Members page: table of all members + role + joined date
- Invite by email → sends invitation email (Resend)
- Pending invitations list (resend/cancel)
- Change role (OWNER/ADMIN only)
- Remove member
- Bulk actions

#### Onboarding Flow
1. Sign up → Clerk auth
2. Create workspace (name + slug)
3. Choose plan (or start free)
4. Import demo dataset or connect own data source
5. Use starter template or blank canvas
6. Invite teammates (optional, skippable)
7. First dashboard tour (interactive tooltip overlay)

---

### 11.15 NOTIFICATIONS

#### In-App Notifications
- Notification bell in topbar
- Types: comment mention, share received, export ready, AI insight complete, member joined
- Mark read/unread, mark all read
- Click → navigate to relevant report

#### Email Notifications
- Comment mention → immediate email
- Workspace invitation → immediate email
- Scheduled report delivery → per schedule
- Export ready (large exports) → email with download link
- Account: password change, new device sign-in

#### Notification Preferences
- Per user: toggle each notification type on/off
- Email digest option (daily summary instead of per-event)

---

### 11.16 RESPONSIVE LAYOUT ENGINE

#### Responsive Strategy
LuminaBI uses a **breakpoint-responsive canvas** approach:

| Breakpoint | Width | Canvas Columns | Tile Behavior |
|------------|-------|---------------|---------------|
| Desktop | ≥1280px | 24 columns | Full layout as designed |
| Laptop | 1024–1279px | 20 columns | Tiles scale proportionally |
| Tablet | 768–1023px | 12 columns | Tiles reflow to 2-column grid |
| Mobile | <768px | 6 columns | Tiles stack vertically |

#### Responsive Config
- Editor can define separate mobile layout (separate tile positions)
- If no mobile layout defined: auto-reflow algorithm runs
- Auto-reflow: tiles sorted by Y position → stacked vertically, full-width
- Mobile preview button in editor toolbar

#### Auto-Responsive Features
- All fonts scale with viewport (using `clamp()` CSS)
- Charts re-render at correct dimensions on resize (ECharts `resize()` API)
- Tables switch to horizontal scroll on mobile
- Sidebar collapses to icon-only on small screens
- Top navigation collapses to hamburger menu

---

## 12. API SPECIFICATION — COMPLETE

### tRPC Routers

#### Reports Router (`/lib/trpc/router/reports.ts`)
```typescript
reports.list({ workspaceId }) → Report[]
reports.get({ id }) → Report & { pages: ReportPage[] }
reports.create({ workspaceId, name, description }) → Report
reports.update({ id, name, description, themeId }) → Report
reports.delete({ id }) → { success: boolean }
reports.duplicate({ id, name }) → Report
reports.getSharedReport({ token, password? }) → PublicReport
reports.createShare({ reportId, password?, expiresAt? }) → ReportShare
reports.updateShare({ id, password?, expiresAt? }) → ReportShare
reports.deleteShare({ id }) → { success: boolean }
```

#### Pages Router
```typescript
pages.list({ reportId }) → ReportPage[]
pages.create({ reportId, name }) → ReportPage
pages.update({ id, name, canvasConfig, order }) → ReportPage
pages.delete({ id }) → { success: boolean }
pages.reorder({ reportId, pageIds: string[] }) → ReportPage[]
```

#### Tiles Router
```typescript
tiles.list({ pageId }) → Tile[]
tiles.create({ pageId, type, x, y, w, h }) → Tile
tiles.update({ id, ...partialTile }) → Tile
tiles.delete({ id }) → { success: boolean }
tiles.bulkUpdate({ tiles: { id, ...updates }[] }) → Tile[]
tiles.move({ id, x, y }) → Tile
tiles.resize({ id, w, h }) → Tile
tiles.duplicate({ id }) → Tile
```

#### Datasets Router
```typescript
datasets.list({ workspaceId }) → Dataset[]
datasets.get({ id }) → Dataset
datasets.create({ workspaceId, name, type, config }) → Dataset
datasets.update({ id, name, config }) → Dataset
datasets.delete({ id }) → { success: boolean }
datasets.testConnection({ type, config }) → { success, error?, columns? }
datasets.getSchema({ id }) → DatasetColumn[]
datasets.query({ datasetId, queryConfig }) → QueryResult
datasets.previewData({ datasetId, table, limit }) → QueryResult
```

#### Insights Router
```typescript
insights.generate({ tileId }) → AIInsight
insights.get({ tileId }) → AIInsight | null
insights.askQuestion({ tileId, question }) → string
insights.rate({ insightId, rating: "up" | "down" }) → void
```

#### Workspace Router
```typescript
workspace.get({ id }) → Workspace
workspace.update({ id, name, logoUrl }) → Workspace
workspace.getMembers({ id }) → WorkspaceMember[]
workspace.inviteMember({ workspaceId, email, role }) → Invitation
workspace.updateMemberRole({ memberId, role }) → WorkspaceMember
workspace.removeMember({ memberId }) → { success: boolean }
workspace.getInvitations({ workspaceId }) → Invitation[]
workspace.cancelInvitation({ id }) → { success: boolean }
workspace.acceptInvitation({ token }) → WorkspaceMember
```

#### Export Router
```typescript
exports.requestExport({ reportId, format, pageId?, options }) → Export
exports.getStatus({ exportId }) → Export
exports.list({ reportId }) → Export[]
```

#### Themes Router
```typescript
themes.list({ workspaceId }) → Theme[]
themes.get({ id }) → Theme
themes.create({ workspaceId, name, config }) → Theme
themes.update({ id, name, config }) → Theme
themes.delete({ id }) → { success: boolean }
themes.setDefault({ id }) → Theme
```

---

## 13. UI/UX SPECIFICATION

### Application Shell Layout

```
┌────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                        │
│  [Logo] [Report Name ▾] [Pages: P1 P2 P3 +]  [Share][Export]  │
│  [Edit/View toggle]      [Undo][Redo]          [AI][Avatar]    │
├──────────┬─────────────────────────────────────────┬──────────┤
│          │                                         │          │
│  LEFT    │         CANVAS                          │  RIGHT   │
│  PANEL   │         (drag-drop area)                │  PANEL   │
│          │                                         │          │
│  - Visuals│                                        │  - Data  │
│  - Data  │                                         │  - Visual│
│  - Filters│                                        │  - Format│
│          │                                         │  - AI    │
│          │                                         │          │
├──────────┴─────────────────────────────────────────┴──────────┤
│  PAGES TABS: [Page 1] [Page 2] [Page 3] [+]  [Canvas size]    │
└────────────────────────────────────────────────────────────────┘
```

### Left Panel (Builder Panel)
**Tab 1: Visuals**
- Grid of all available visual types (icon + label)
- Grouped by category with collapsible sections
- Search box to filter visual types
- Click or drag to add to canvas

**Tab 2: Data**
- List of connected datasets
- Per dataset: expand to see tables/columns
- Drag column to chart's data binding fields
- "+ Add Dataset" button

**Tab 3: Filters**
- List of active filters on this page
- Add/remove/edit filters

### Right Panel (Properties Panel)
Contextual based on selected tile. Tabs:

**Data Tab:** Data binding UI
- X-axis field selector
- Y-axis field selector
- Series/group-by field
- Aggregation selector
- Sort/Limit
- Computed fields editor

**Visual Tab:** Chart-specific settings
- Chart subtype switcher
- Color scheme
- Legend, labels, tooltip toggles
- Axis configuration

**Format Tab:** Style settings
- Title font, size, color, alignment
- Background, border, shadow
- Padding controls
- Z-index / layer

**AI Tab:** AI Insights
- Generate insights button
- Insight cards
- Ask a question input

### Topbar
- Left: Logo + workspace name
- Center: Report name (editable inline), page tabs
- Right: Share button, Export menu, Presentation mode, View/Edit toggle, Theme picker, Notification bell, User avatar

### Command Palette (`Ctrl+/`)
- Fuzzy search across: reports, datasets, actions, settings
- Recent items section
- Quick actions: New Report, New Dataset, Open Theme Editor, etc.

---

## 14. COMPONENT LIBRARY SPECIFICATION

### Core Components (Shadcn/UI base)
All Shadcn components are installed and customized to match the LuminaBI design system. Custom additions:

```
ColorPicker          — Full-featured color input (hex/rgb/hsl + opacity)
FontPicker           — Google Fonts searchable dropdown with preview
IconPicker           — Searchable Lucide icon grid
ChartTypePicker      — Visual grid of chart types with preview thumbnails
DataFieldSelector    — Drag-and-drop field binding UI
AggregationSelector  — Dropdown with aggregation options
FormatStringInput    — Number/date format string input with live preview
ThresholdEditor      — Add/edit/remove conditional coloring rules
SliderWithInput      — Combined slider + number input
ColorSwatchGrid      — Palette picker with swatch grid
GradientPicker       — Linear/radial gradient editor
ShadowEditor         — Box shadow visual editor
BorderEditor         — Border style/width/radius/color editor
```

### Canvas Components
```
Canvas              — DndContext wrapper, zoom/pan, grid overlay
CanvasTile          — Draggable/resizable tile container
TileHeader          — Title bar with drag handle, actions menu
TileBody            — Chart/content rendering area
ResizeHandle        — 8-direction resize handle
SelectionBox        — Multi-select rubber band rectangle
SmartGuide          — Alignment guide lines (appear on drag)
ContextMenu         — Right-click tile menu
```

### Chart Components
Each chart component accepts:
- `data: QueryResult`
- `config: ChartVisualConfig`
- `theme: ChartThemeConfig`
- `width: number`
- `height: number`
- `onDataPointClick: (point: DataPoint) => void`

All charts use ECharts under the hood (via `echarts-for-react`) wrapped in a standardized interface.

---

## 15. CI/CD PIPELINE — GITHUB → VERCEL

### GitHub Actions Workflows

#### `ci.yml` — Runs on every PR
```yaml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run build --filter=web

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm run test --coverage
      - uses: codecov/codecov-action@v4

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps
      - run: pnpm run test:e2e
      env:
        DATABASE_URL: ${{ secrets.CI_DATABASE_URL }}
        CLERK_SECRET_KEY: ${{ secrets.CI_CLERK_SECRET_KEY }}
```

#### `production.yml` — Runs on merge to main
```yaml
name: Deploy Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm run db:migrate
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Vercel Configuration (`vercel.json`)
```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install --frozen-lockfile",
  "outputDirectory": ".next",
  "functions": {
    "apps/web/app/api/export/pdf/route.ts": {
      "maxDuration": 60,
      "memory": 1024
    },
    "apps/web/app/api/ai/insights/route.ts": {
      "maxDuration": 30
    }
  },
  "regions": ["iad1", "syd1", "fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### GitHub Secrets Required
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
DATABASE_URL
DIRECT_URL
CLERK_SECRET_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
OPENAI_API_KEY
RESEND_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
SENTRY_AUTH_TOKEN
CI_DATABASE_URL        (separate CI database)
CI_CLERK_SECRET_KEY    (separate CI Clerk app)
```

### Branch Strategy
```
main           → Production (auto-deploy)
staging        → Staging (auto-deploy to preview)
dev            → Development (local only)
feature/*      → PR preview deployments
hotfix/*       → Emergency fixes → PR → main
```

---

## 16. TESTING STRATEGY

### Unit Tests (Vitest)
**Coverage target: 80% lines**

Files to test:
- `lib/connectors/*.ts` — Connector query builders
- `lib/ai/prompts.ts` — Prompt generation
- `lib/export/*.ts` — Export helpers
- `store/*.ts` — Zustand store actions
- `lib/validators/*.ts` — Zod schemas
- All utility functions in `lib/utils.ts`
- tRPC procedure logic (with mocked DB)

Example:
```typescript
// tests/unit/store/canvas.test.ts
describe("useCanvasStore", () => {
  it("adds a tile at specified position", () => { ... });
  it("undoes last action", () => { ... });
  it("prevents undo beyond history start", () => { ... });
  it("enforces minimum tile size on resize", () => { ... });
});
```

### Integration Tests (Vitest + Supertest)
- tRPC router integration (with test database)
- Database migrations
- Auth middleware
- Rate limiting behavior
- Export generation (PDF/PNG)

### E2E Tests (Playwright)

**Critical path tests:**
```
auth.spec.ts
  ✓ User can sign up
  ✓ User can sign in
  ✓ User is redirected to onboarding
  ✓ User can sign out

canvas.spec.ts
  ✓ User can add a bar chart tile
  ✓ User can drag tile to new position
  ✓ User can resize tile
  ✓ User can delete tile
  ✓ Undo/redo works correctly
  ✓ User can switch between pages

data.spec.ts
  ✓ User can connect a CSV dataset
  ✓ User can bind data to a chart
  ✓ Filters affect chart data
  ✓ Cross-tile filtering works

share.spec.ts
  ✓ User can generate a public share link
  ✓ Public link renders report (no auth)
  ✓ Password-protected link requires password
  ✓ Expired link shows error

export.spec.ts
  ✓ PDF export generates downloadable file
  ✓ PNG export generates downloadable file
  ✓ CSV export contains correct data
```

### Storybook
- Every UI component in `/components/ui/` has a story
- Every tile type has a story with sample data
- All chart types have stories with multiple data configurations
- Deployed to Chromatic for visual regression testing

---

## 17. PERFORMANCE REQUIREMENTS

### Targets
| Metric | Target | Measurement |
|--------|--------|-------------|
| Dashboard first load | < 1.5s | Lighthouse TTI |
| Tile render (data fetch) | < 800ms P95 | Custom metric |
| Canvas drag FPS | 60 FPS | Chrome DevTools |
| Filter apply latency | < 200ms P95 | Custom metric |
| Export (PDF, 1 page) | < 15s | Server metric |
| AI insights generation | < 8s | Server metric |
| Lighthouse Performance | ≥ 90 (desktop) | Lighthouse CI |
| Lighthouse Mobile | ≥ 85 | Lighthouse CI |

### Performance Strategies

**Frontend:**
- React Server Components for initial page shell
- Client components only for interactive canvas
- `React.lazy` + `Suspense` for panel components
- ECharts lazy-loaded per chart type
- `@tanstack/react-virtual` for tables > 100 rows
- Image optimization via `next/image`
- Font preloading for active theme font
- Canvas tiles use `React.memo` + `useMemo` for data transforms

**Data & Caching:**
- Query results cached in Redis (TTL: 5 minutes default, configurable)
- AI insights cached 24 hours
- Database query caching in `QueryCache` table
- `stale-while-revalidate` pattern for dashboard configs
- Prisma connection pooling via PgBouncer (Supabase)

**Build:**
- Turborepo build cache
- Vercel Edge Network CDN for static assets
- Bundle analysis via `@next/bundle-analyzer` (run in CI)
- Tree shaking for ECharts (import only used chart types)

---

## 18. SECURITY REQUIREMENTS

### Authentication
- All routes except public ones require Clerk JWT
- JWTs verified server-side on every API request
- CSRF protection via Clerk's built-in mechanisms

### Authorization
- Row-level security: all DB queries scoped to workspaceId
- tRPC middleware validates workspace membership before every procedure
- Connector credentials encrypted at rest (AES-256 via Supabase Vault or application-level encryption)

### Input Validation
- All inputs validated with Zod schemas on both client and server
- SQL injection prevention: parameterized queries only (Prisma)
- XSS prevention: all user content rendered via React (auto-escaping)
- Content Security Policy headers enforced

### Rate Limiting
```typescript
// Using Upstash Redis + @upstash/ratelimit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true,
});

// Per-endpoint limits:
// AI insights: 10 requests/minute/user
// Data queries: 60 requests/minute/workspace
// Exports: 5 concurrent/workspace
// Auth endpoints: 10 attempts/minute/IP
```

### Data Security
- Connector credentials stored encrypted (never in plaintext)
- Exported files stored in Supabase Storage with signed URLs (1h expiry)
- Audit log for all data access and configuration changes
- GDPR: User data deletion endpoint (cascade delete workspace + all data)
- SOC 2 alignment: access logs, encryption at rest, TLS in transit

### Security Headers
```
Strict-Transport-Security: max-age=63072000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Content-Security-Policy: [strict policy]
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 19. ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 AA Compliance
- All interactive elements keyboard-navigable
- Focus indicators visible (3px outline, high contrast)
- Color contrast ratio ≥ 4.5:1 for text, 3:1 for UI components
- All images have descriptive `alt` text
- Charts have accessible data table fallback (toggle button)
- Form inputs have associated labels
- Error messages associated with inputs (aria-describedby)
- Loading states announced to screen readers (aria-live)
- Modals: focus trap + `aria-modal` + `role="dialog"`
- Canvas: announces tile additions/removals to screen readers

### Keyboard Navigation
- Full app navigable without mouse
- Tab order follows visual layout
- Custom keyboard shortcuts documented and discoverable
- Focus visible on all interactive elements
- Skip navigation link (hidden until focused)

### Screen Reader Support
- Semantic HTML throughout
- ARIA roles where needed (toolbar, grid, dialog)
- ECharts charts: use `aria-label` with data summary
- Dynamic content changes announced via `aria-live="polite"`

---

## 20. OBSERVABILITY & MONITORING

### Error Tracking (Sentry)
```typescript
// app/layout.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  profilesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```
- Source maps uploaded on deploy
- Alerts: error rate > 1% → Slack notification
- Performance monitoring: slow transactions flagged

### Product Analytics (PostHog)
Key events tracked:
```typescript
posthog.capture("report_created", { reportId, workspaceId });
posthog.capture("tile_added", { tileType, reportId });
posthog.capture("tile_removed", { tileType });
posthog.capture("dataset_connected", { connectorType });
posthog.capture("ai_insight_generated", { tileType });
posthog.capture("export_completed", { format, pageCount });
posthog.capture("report_shared", { hasPassword, hasExpiry });
posthog.capture("filter_applied", { filterType });
posthog.capture("theme_changed", { themeName });
```

### Infrastructure Monitoring
- Vercel built-in: Function execution times, error rates, bandwidth
- Supabase dashboard: DB connections, query performance, storage
- Upstash: Redis hit rate, command rates
- Custom dashboard in LuminaBI itself (dog-fooding): shows platform metrics

### Alerting
| Condition | Alert Channel |
|-----------|---------------|
| Error rate > 2% (5min) | Slack #alerts |
| P99 response time > 5s | Slack #alerts |
| DB connection pool > 80% | PagerDuty |
| Failed exports > 5% | Slack #alerts |
| Stripe webhook failure | Slack #alerts |
| AI API error | Slack #alerts |

### Logging (Pino)
```typescript
// Structured JSON logs
logger.info({ userId, workspaceId, action, duration }, "API request");
logger.error({ error, context }, "Export failed");

// Log levels by environment:
// development: debug
// staging: info
// production: warn + error
```

---

## 21. DEPLOYMENT RUNBOOK

### First-Time Setup (from git clone to deployed)

#### Step 1: Clone & Install
```bash
git clone https://github.com/your-org/luminabi.git
cd luminabi
pnpm install
cp apps/web/.env.example apps/web/.env.local
```

#### Step 2: External Services Setup
1. **Supabase:** Create project → copy DATABASE_URL + DIRECT_URL + SUPABASE keys
2. **Clerk:** Create app → copy publishable key + secret key → enable Google + GitHub OAuth
3. **Upstash:** Create Redis database → copy REST_URL + REST_TOKEN
4. **Resend:** Create account → verify domain → copy API key
5. **OpenAI:** Create API key
6. **Stripe:** Create account → get keys → create Pro + Team products → get price IDs
7. **UploadThing:** Create app → get secret + app ID
8. **PostHog + Sentry:** Create projects → get keys

#### Step 3: Local Database Setup
```bash
# Fill in .env.local with Supabase credentials
cd apps/web
pnpm run db:push           # Push schema to Supabase
pnpm run db:seed           # Seed demo data
```

#### Step 4: Local Development
```bash
pnpm run dev               # Starts Next.js at localhost:3000
pnpm run storybook         # Starts Storybook at localhost:6006
```

#### Step 5: Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Set environment variables
vercel env add DATABASE_URL production
vercel env add CLERK_SECRET_KEY production
# ... (all env vars from .env.example)

# Deploy
vercel --prod
```

#### Step 6: Post-Deploy
```bash
# Run migrations on production DB
pnpm run db:migrate:deploy

# Verify deployment
curl https://your-app.vercel.app/api/health
```

#### Step 7: Set Up Webhooks
1. Clerk: Webhooks → Add endpoint → `https://your-app.vercel.app/api/webhooks/clerk`
   - Events: `user.created`, `user.deleted`
2. Stripe: Webhooks → Add endpoint → `https://your-app.vercel.app/api/webhooks/stripe`
   - Events: `customer.subscription.*`, `invoice.*`

### Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  const db = await prisma.$queryRaw`SELECT 1`;
  const redis = await redis.ping();
  return Response.json({
    status: "healthy",
    db: db ? "ok" : "error",
    redis: redis === "PONG" ? "ok" : "error",
    timestamp: new Date().toISOString(),
  });
}
```

---

## 22. MILESTONES & TIMELINE

### Phase 1 — Foundation (Weeks 1–4)
- [ ] Repo setup (monorepo, pnpm, turborepo)
- [ ] Next.js 14 app scaffold with App Router
- [ ] Clerk auth integration (sign in/up, middleware)
- [ ] Prisma schema + initial migrations
- [ ] tRPC setup with first routers (workspace, reports)
- [ ] App shell: sidebar, topbar, layout
- [ ] Basic canvas (static, no drag yet)
- [ ] Shadcn/UI components installed + themed
- [ ] CI pipeline (GitHub Actions: lint, typecheck, build)
- [ ] Vercel deployment configured

### Phase 2 — Core Canvas (Weeks 5–8)
- [ ] dnd-kit canvas drag and drop
- [ ] Tile resize with react-resizable-panels
- [ ] Zustand canvas store + undo/redo
- [ ] Canvas snap to grid + smart guides
- [ ] Canvas toolbar (zoom, align, layer controls)
- [ ] Tile type system + TileWrapper component
- [ ] KPI Card tile (complete)
- [ ] Bar/Line/Area chart tiles (complete)
- [ ] Pie/Donut chart tiles
- [ ] Report pages tabs system

### Phase 3 — Data Layer (Weeks 9–12)
- [ ] CSV file upload + parse connector
- [ ] PostgreSQL connector
- [ ] Query config builder (visual mode)
- [ ] SQL query editor (SQL mode)
- [ ] Data binding UI (field selector panels)
- [ ] Filter engine + filter state
- [ ] Dropdown slicer tile
- [ ] Date range slicer tile
- [ ] Cross-tile filtering
- [ ] Query result caching (Redis)
- [ ] Demo dataset seeded

### Phase 4 — Visualization & Styling (Weeks 13–16)
- [ ] All 20+ chart types implemented
- [ ] Data Table tile (TanStack Table)
- [ ] Map tile (react-leaflet)
- [ ] Text tile (Markdown)
- [ ] Right panel: Data, Visual, Format tabs
- [ ] Theme engine + 12 built-in themes
- [ ] Theme customizer UI
- [ ] Font picker (Google Fonts)
- [ ] Color picker (react-colorful)
- [ ] Per-tile styling controls (border, shadow, bg)
- [ ] Responsive canvas (breakpoint reflow)

### Phase 5 — AI & Export (Weeks 17–20)
- [ ] OpenAI integration (GPT-4o)
- [ ] AI insights generation + caching
- [ ] AI insights UI (cards, panel)
- [ ] Follow-up Q&A
- [ ] PDF export (Puppeteer)
- [ ] PNG export (Sharp)
- [ ] CSV/Excel export
- [ ] Public share link
- [ ] Embed code generation
- [ ] Password-protected shares

### Phase 6 — Collaboration & Billing (Weeks 21–24)
- [ ] Comments system (threads, @mentions)
- [ ] Activity feed
- [ ] Version history (PRO)
- [ ] Real-time presence (Supabase Realtime)
- [ ] Stripe billing integration
- [ ] Plan-based feature gating
- [ ] Workspace member management
- [ ] Invitation system (email)
- [ ] Notification system (in-app + email)

### Phase 7 — Polish & Launch (Weeks 25–28)
- [ ] Onboarding flow (complete)
- [ ] Command palette
- [ ] Keyboard shortcuts (complete)
- [ ] Storybook (all components documented)
- [ ] E2E tests (all critical paths)
- [ ] Accessibility audit + fixes
- [ ] Performance audit + optimization
- [ ] Security audit
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (PostHog) events instrumented
- [ ] Documentation site
- [ ] README complete with setup guide
- [ ] Launch 🚀

---

## 23. RISKS & MITIGATIONS

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Puppeteer PDF export too slow on Vercel (15s limit) | High | Medium | Use Vercel Pro (60s functions), or offload to background job queue |
| ECharts bundle too large | Medium | Medium | Dynamic imports per chart type; tree-shake |
| Supabase free tier rate limits during launch | High | High | Upgrade to Supabase Pro before launch |
| OpenAI API cost runaway | Medium | High | Per-workspace usage caps; Redis caching; free tier limits |
| dnd-kit performance on large canvases (50+ tiles) | Medium | Medium | Virtualize tiles outside viewport; memo optimization |
| Google Sheets OAuth complexity | Low | Low | Push to v1.1; use CSV as launch connector |
| Clerk pricing at scale | Low | Medium | Monitor MAU; evaluate alternative if hitting limits |
| Cross-browser canvas rendering differences | Medium | Low | Test matrix: Chrome, Firefox, Safari, Edge; ECharts handles most |
| GDPR compliance complexity | Medium | High | Implement data export + deletion endpoints before EU launch |
| Stripe webhook reliability | Low | High | Idempotency keys; webhook signature verification; retry logic |

---

## 24. GLOSSARY

| Term | Definition |
|------|------------|
| Canvas | The free-form workspace where tiles are placed |
| Tile | A single visual element on the canvas (chart, card, table, etc.) |
| Report | A collection of pages, each containing tiles |
| Page | A single canvas within a report (like a slide) |
| Dataset | A connected data source (database, CSV, API) |
| Connector | The adapter that connects LuminaBI to a data source |
| Slicer | An interactive filter tile (dropdown, date picker, etc.) |
| Theme | A complete visual style configuration for a workspace/report |
| Workspace | An organizational unit containing members, reports, and datasets |
| tRPC | Type-safe RPC library for TypeScript (client-server API) |
| Zustand | Lightweight React state management library |
| dnd-kit | Drag-and-drop toolkit for React |
| ECharts | Apache ECharts — the primary chart rendering library |
| RSC | React Server Components (Next.js 14 feature) |
| Edge Function | Vercel serverless function running at CDN edge nodes |
| PgBouncer | Postgres connection pooler (provided by Supabase) |
| AI Insight | Automatically generated natural language analysis of chart data |
| QueryResult | Standardized data structure returned by all connectors |
| TileConfig | JSON configuration object defining a tile's appearance and data |
| ThemeConfig | JSON configuration object defining a complete visual theme |

---

*End of Product Requirements Document*
*LuminaBI — Ultra Premium Analytics Dashboard*
*Version 1.0.0 | 2026-05-03*
*Total sections: 24 | Estimated implementation: 50,000–120,000 lines of TypeScript/React*
