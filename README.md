# AgriGuard — Farm Biosecurity & Compliance Platform

A full-stack agriculture compliance platform for small and mid-size U.S. farms. Includes a **Next.js web app**, **Expo iOS/Android app**, daily biosecurity checklists with streak tracking, audit-ready reports, AI compliance assistant, and complete coverage of all 50 U.S. state agricultural regulations.

## Monorepo Structure

```
agriguard/
├── apps/
│   ├── web/          # Next.js 15 App Router (web app + API)
│   └── mobile/       # Expo (iOS + Android)
├── packages/
│   └── compliance-data/   # All 50 state regulations + checklist items
├── turbo.json
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- A [Supabase](https://supabase.com) project (free tier works)
- An Anthropic API key (for AI assistant) — optional

### 1. Clone and install

```bash
git clone <repo-url>
cd "Agriculture Compliance"
npm install
```

### 2. Configure environment variables

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:

```env
# Required: Supabase PostgreSQL connection string
# From: Supabase Dashboard → Project Settings → Database → Connection string (Transaction mode)
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

# Required: Random 32-char secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-secret-here

# Required for production; use http://localhost:3000 for local dev
NEXTAUTH_URL=http://localhost:3000

# Optional: AI assistant (one of these)
AI_GATEWAY_API_KEY=your-vercel-ai-gateway-key
# or
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Set up the database

```bash
# Generate migrations
npm run db:generate

# Push schema to Neon
npm run db:push

# Optional: seed with sample data
# (visit /sign-up to create your first account)
```

### 4. Run the web app

```bash
npm run dev
# → http://localhost:3000
```

### 5. Run the mobile app

```bash
cd apps/mobile
npx expo start
# Scan QR with Expo Go app (iOS/Android)
# or press 'i' for iOS simulator, 'a' for Android emulator
```

In the mobile app's sign-in screen, tap **Server URL (advanced)** and enter `http://your-local-ip:3000` (e.g. `http://192.168.1.10:3000`) so the mobile app can reach your local Next.js server.

---

## Features

### Web App (`apps/web`)

| Feature | Description |
|---------|-------------|
| **Dashboard** | Streak counter, today's compliance score, 14-day bar chart |
| **Daily Checklists** | 35+ biosecurity tasks grouped by category, optimistic toggle |
| **50-State Compliance** | Full regulatory detail for all 50 states: laws, reportable diseases, pesticide rules |
| **AI Assistant** | Claude-powered chat with farm-specific regulatory context |
| **Audit Reports** | Date-range compliance reports with daily log table, print/PDF |
| **Visitor Log** | USDA APHIS-compliant visitor tracking with biosecurity fields |
| **Streak System** | Consecutive-day compliance tracking; resets on missed days |

### Mobile App (`apps/mobile`)

| Screen | Description |
|--------|-------------|
| **Dashboard** | Streak card, today's compliance %, weekly overview |
| **Checklists** | Full daily/weekly/monthly checklist with offline-first toggle |
| **Compliance** | Browse all 50 states, view regulations, reportable diseases |
| **Reports** | Generate reports, share summaries via native share sheet |
| **More** | Account info, server URL config, sync, external resources |

### Compliance Data (`packages/compliance-data`)

- All 50 U.S. states with state ag department contacts
- Key statutes per state (FSMA, EPA FIFRA, state-specific)
- Reportable disease lists with reporting timeframes
- Pesticide licensing requirements per state
- Biosecurity requirements per state
- 35+ daily checklist items with regulatory citations

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Web framework | Next.js 15 App Router |
| Mobile | Expo (React Native) with Expo Router |
| Database | Supabase PostgreSQL |
| ORM | Drizzle ORM |
| Auth | NextAuth v4 (credentials provider) |
| AI | Vercel AI SDK v6 + Anthropic Claude |
| Styling | Tailwind CSS (web), StyleSheet (mobile) |
| Charts | Recharts |
| Monorepo | Turborepo + npm workspaces |
| Deployment | Vercel (web), EAS Build (mobile) |

---

## Deployment

### Web (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL      # your production URL
vercel env add ANTHROPIC_API_KEY # optional
```

### Mobile (EAS Build)

```bash
cd apps/mobile

# Install EAS CLI
npm i -g eas-cli

# Log in to Expo
eas login

# Configure your project ID in app.json
# Then build:
eas build --platform ios
eas build --platform android

# Submit to stores:
eas submit --platform ios
eas submit --platform android
```

---

## Database Schema

```
users              — accounts (email + bcrypt password)
farms              — one farm per user (state, farmType, acreage, etc.)
checklist_completions — daily task completions (farmId + itemId + date)
streaks            — currentStreak, longestStreak, lastCompletedDate
compliance_notes   — farm-specific regulatory notes
audit_reports      — generated compliance reports with scores
visitor_log        — USDA APHIS visitor tracking records
```

---

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account + farm |
| POST | `/api/checklists/complete` | Mark checklist item done |
| DELETE | `/api/checklists/complete` | Unmark checklist item |
| GET | `/api/farm` | Get farm + streak + today's completions |
| POST | `/api/reports` | Generate + save compliance report |
| POST | `/api/visitor-log` | Log a farm visitor |
| DELETE | `/api/visitor-log?id=` | Delete visitor entry |
| POST | `/api/chat` | AI compliance assistant (streaming) |

---

## Regulatory Coverage

The platform covers federal and state requirements including:

- **USDA APHIS** — Animal disease reporting, premises registration, traceability
- **FDA FSMA** — Food Safety Modernization Act (Produce Safety Rule, Preventive Controls)
- **EPA FIFRA** — Federal Insecticide, Fungicide, and Rodenticide Act (pesticide records)
- **State ag departments** — All 50 states with specific statutes and contact information
- **Reportable diseases** — Including FMD, HPAI, ASF, Newcastle Disease, and 100+ others

> **Disclaimer:** AgriGuard provides informational guidance only. Always verify regulatory requirements with your State Veterinarian, State Department of Agriculture, or a licensed agricultural attorney before making compliance decisions.

---

## Development Commands

```bash
# Run all apps in dev mode
npm run dev

# Type-check all packages
npm run type-check

# Lint all packages
npm run lint

# Database operations (from repo root)
npm run db:generate   # Generate Drizzle migrations
npm run db:push       # Push schema changes to database
npm run db:studio     # Open Drizzle Studio (database GUI)
```
