# KMS Tech - Next.js Enterprise Platform Architecture

![KMS Tech Header](https://kmstech.co/kmstech-next.png)

> **"Sacred Intention Leads to Perfection"**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748?logo=prisma)](https://www.prisma.io/)
[![GraphQL](https://img.shields.io/badge/GraphQL-Hashnode_v2-E10098?logo=graphql)](https://gql.hashnode.com)
[![Jest Coverage](https://img.shields.io/badge/Coverage-97.5%25-brightgreen?logo=jest)](https://jestjs.io/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple?logo=pwa)](https://web.dev/progressive-web-apps/)

---

## 🏛️ Executive Summary & Brand Heritage

**KMS Tech Next** is an enterprise-grade web application platform serving as the primary digital hub and tech presentation portal for **KMS Tech** (*Trade License: TRAD/DNCC/131256/2022*).

### Divine Naming & Spiritual Origin
The name **KMS Tech** carries a sacred spiritual history:
* **The KMS Initials**: The letters **K**, **M**, and **S** represent the core initials of the renowned sub-continental Sufi saint:  
  **'Hazrat Allama Shah Sufi Khwaja Mohammad Sayefuddin Naqshebondi Mujaddedi Enayetpuri Shamvugonji (R.)'**
* **Family & Team Lineage**: The founder is a direct descendant and disciple of the saint. Remarkably, the founder's father's name, the founder's own name, and key co-founders' names share the letters **K**, **M**, and **S**.
* **Evolution**: Founded in 2012 by CSE graduates as *Technoism IT*, the venture evolved into **KMS Tech**, providing cutting-edge IT solutions, software engineering, and business consultancy.

---

## 📐 System Topology & Data Flow

```mermaid
graph TD
    subgraph Client ["Client Layer (Browser / PWA)"]
        SPA["Client SPA Shell (/[[...slug]])\nModal Navigation & GSAP Animations"]
        BlogSSR["SSR Blog Engine (/(blog)/blogs & /blog/[slug])\nReact 19 Server Components"]
        SWR["SWR Hook (useViewCounter)\nOptimistic UI & LocalStorage Lock"]
    end

    subgraph Edge ["Next.js App Router & Edge Server"]
        ISR["ISR Layer (Revalidate: 60s)\nGraphQL Client Engine"]
        APIRoute["API Handler (/api/view-count/[slug])\nNextRequest / NextResponse"]
    end

    subgraph HeadlessCMS ["Headless CMS Layer"]
        Hashnode["Hashnode GraphQL v2 API\n(gql.hashnode.com)"]
    end

    subgraph DataStore ["Persistence Layer"]
        Prisma["Prisma ORM Client\n(Singleton Pattern)"]
        Postgres[(PostgreSQL Database\nTable: stats)]
    end

    subgraph Automation ["Automated Worker Pipeline"]
        Puppeteer["Headless Chrome (Puppeteer)\nOG Image Screenshot Service"]
        OGMap["Static Asset Mapping\npublic/og-images & og-map.json"]
    end

    SPA --> |Navigation| BlogSSR
    BlogSSR --> ISR
    ISR --> |GraphQL Queries| Hashnode
    BlogSSR --> SWR
    SWR --> |Fetch / Mutate| APIRoute
    APIRoute --> Prisma
    Prisma --> |Atomic Upsert & Increment| Postgres
    Puppeteer --> |Renders Blog URLs| BlogSSR
    Puppeteer --> |Outputs Screenshots| OGMap
```

---

## 🔬 Core Architectural Subsystems

### 1. Hybrid SPA / SSR Architecture
* **Single-Page Shell (`/[[...slug]]`)**: The main landing page behaves as a seamless SPA. Navigation triggers custom interactive modals ([Modal.tsx](file:///c:/Users/mushfiq/Documents/GitHub/kmstech-next/src/components/Modal.tsx)) containing deep-dive sections:
  - [About.tsx](file:///c:/Users/mushfiq/Documents/GitHub/kmstech-next/src/components/About.tsx): Corporate history, Sufi saint heritage, mission & vision.
  - [Services.tsx](file:///c:/Users/mushfiq/Documents/GitHub/kmstech-next/src/components/Services.tsx): 5 core service offerings & 4-step workflow process.
  - [Concerns.tsx](file:///c:/Users/mushfiq/Documents/GitHub/kmstech-next/src/components/Concerns.tsx): Portfolio & sister concerns (*KMS Marketplace*, *Beneath Green*).
  - [Contact.tsx](file:///c:/Users/mushfiq/Documents/GitHub/kmstech-next/src/components/Contact.tsx): Phone (+880 1911 256 358), WhatsApp (+880 1711 741 953), email (`info@kmstech.co`), address (*North Badda, Dhaka*).
  - [Blog.tsx](file:///c:/Users/mushfiq/Documents/GitHub/kmstech-next/src/components/Blog.tsx): Featured article previews.
* **Headless SSR Blog (`/(blog)/blogs`, `/(blog)/blog/[slug]`)**: Fully server-rendered routes providing search engine crawlers with clean semantic HTML5 markup, JSON-LD metadata, dynamic `generateMetadata`, and structured Open Graph tags.

### 2. Headless Content Engine (`src/lib/hashnode.ts`)
* **GraphQL Integration**: Built with `graphql-request` targeting `https://gql.hashnode.com` (`kmstech.hashnode.dev`).
* **ISR & Caching**: Custom `fetch` transport executing Next.js Incremental Static Regeneration (`next: { revalidate: 60 }`), striking an optimal balance between fast response times and up-to-date content.
* **Pagination**: Implements cursor-based recursive fetching (`getAllPosts`) alongside offset-based pagination (`getPosts`) for responsive 6 posts/page grid rendering.

### 3. Atomic Persistence & View Counting Subsystem

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser
    participant SWR as SWR Hook (useViewCounter)
    participant LS as Browser LocalStorage
    participant API as Next.js API (/api/view-count/[slug])
    participant DB as Prisma / PostgreSQL

    User->>SWR: Page Mount (/blog/[slug])
    SWR->>LS: Check 'viewed-[slug]' key
    alt Key exists in LocalStorage
        LS-->>SWR: Already viewed
        SWR->>API: GET /api/view-count/[slug]
        API->>DB: prisma.stats.findUnique()
        DB-->>API: Return views count
        API-->>SWR: { views: N }
    else Key absent
        LS-->>SWR: First view in session
        SWR->>LS: Set 'viewed-[slug]' = 'true'
        SWR->>SWR: Optimistic Update (views + 1)
        SWR->>API: POST /api/view-count/[slug]
        API->>DB: prisma.stats.upsert(increment: 1)
        DB-->>API: Updated Record
        API-->>SWR: { views: N + 1 }
        SWR->>API: Revalidate GET for source of truth
    end
```

* **Schema Definition**: Composite primary key `(type, slug)` stored in table `stats`.
```prisma
model Stats {
  type      String   @default("blog")
  slug      String
  views     Int      @default(0)
  loves     Int      @default(0)
  applauses Int      @default(0)
  ideas     Int      @default(0)
  bullseyes Int      @default(0)

  @@id([type, slug])
  @@map("stats")
}
```

### 4. Automated Headless OG Image Generator (`scripts/generate-og-images.ts`)
* **Worker Execution**: Node.js script powered by Puppeteer launching a headless Chrome instance (`deviceScaleFactor: 2`, viewport `1200x630`).
* **Workflow**: Navigates local post endpoints, waits for full DOM hydration (`networkidle0`), captures PNG screenshots, outputs static files to `/public/og-images/[slug].png`, and updates the lookup dictionary in `src/data/og-map.json`.

### 5. PWA & Offline Resilience
* Built using `next-pwa` with automatic service worker lifecycle management (`register: true`, `skipWaiting: true`).
* Integrated with a reactively rendered component ([OfflineIndicator.tsx](file:///c:/Users/mushfiq/Documents/GitHub/kmstech-next/src/components/OfflineIndicator.tsx)) monitoring `window.addEventListener('online' | 'offline')`.

---

## 🛠️ Technology Stack Matrix

| Category | Technology | Version | Architectural Purpose |
| :--- | :--- | :--- | :--- |
| **Core Framework** | Next.js | `16.0.10` | App Router, Server Components, Route Handlers, ISR |
| **UI Library** | React | `19.2.1` | Component Model & Server Actions |
| **Type Safety** | TypeScript | `5.x` | Strict type validation across components, hooks, & APIs |
| **Database & ORM** | Prisma / PostgreSQL | `6.19.2` | Relational persistence, composite index mapping, atomic queries |
| **Data Fetching** | GraphQL Request / SWR | `7.4.0` / `2.3.8` | CMS GraphQL integration & client-side SWR caching |
| **Animation Engine**| GSAP | `3.14.2` | Vector morphing, timeline transitions, interactive micro-effects |
| **Content Parser** | React Markdown / Rehype | `10.1.0` / `7.0.0` | Markdown AST parsing, HTML sanitization, GFM syntax support |
| **Syntax Highlight**| Syntax Highlighter | `16.1.0` | Prism-based code block formatting in technical blogs |
| **PWA & Offline** | next-pwa | `5.6.0` | Service worker generation, asset pre-caching, offline fallback |
| **Testing Suite** | Jest / React Testing Lib | `30.2.0` / `16.3.1` | Unit testing, DOM assertions, API mock assertions |
| **Automation** | Puppeteer | `24.35.0` | Viewport rendering & Open Graph image snapshot creation |

---

## 📂 System Architecture Directory Structure

```
kmstech-next/
├── .github/                   # GitHub Actions CI/CD workflows (test.yml)
├── .husky/                    # Git pre-commit & pre-push hooks
├── prisma/
│   └── schema.prisma          # Database models & PostgreSQL datasource definition
├── public/                    # Static web assets & PWA manifest
│   ├── og-images/             # Puppeteer-generated blog social previews
│   ├── fonts/                 # Local web fonts (segoepr.ttf)
│   ├── favicon.ico            # Site favicon
│   ├── manifest.json          # PWA web manifest
│   └── sw.js                  # Generated PWA service worker
├── scripts/
│   ├── debug-net.ts           # Network diagnostic script
│   └── generate-og-images.ts  # Puppeteer worker for OG screenshot generation
├── src/
│   ├── app/                   # Next.js App Router Architecture
│   │   ├── (blog)/            # SSR Route Group for Blog Engine
│   │   │   ├── layout.tsx     # Layout wrapper for blog routes
│   │   │   ├── blog/[slug]/   # Dynamic SSR single post page & metadata engine
│   │   │   └── blogs/         # Paginated blog grid index (6 posts/page)
│   │   ├── [[...slug]]/       # Client SPA Catch-all Landing Page & Modal Router
│   │   ├── api/
│   │   │   └── view-count/    # Atomic REST API handlers for stats persistence
│   │   ├── globals.css        # Global CSS variables, design tokens, & dark theme
│   │   ├── layout.tsx         # Root HTML layout, Web Fonts, & Analytics
│   │   └── page.module.css    # CSS Modules for main application shell
│   ├── components/            # Reusable UI Component Library
│   │   ├── About.tsx          # Modal content: Company history, Sufi saint heritage, mission/vision
│   │   ├── Blog.tsx           # Modal content: Featured blog preview list
│   │   ├── Concerns.tsx       # Modal content: Sister concerns (KMS Marketplace, Beneath Green)
│   │   ├── Contact.tsx        # Modal content: WhatsApp, Phone, Email, Location map
│   │   ├── MainLogo.tsx       # Animated SVG corporate branding logo (GSAP timeline)
│   │   ├── Modal.tsx          # Reusable accessible dialog overlay with body scroll lock
│   │   ├── OfflineIndicator.tsx# Reactive offline network status banner
│   │   ├── ServiceCard.tsx    # Accessible service item card
│   │   ├── Services.tsx       # Modal content: 5 service offerings & 4-step workflow
│   │   ├── SVGLayer.tsx       # Background vector canvas & feTurbulence noise animation
│   │   ├── Tagline.tsx        # Sacred Intention SVG animated text
│   │   ├── TopQuote.tsx       # Dual-layer glowing quote header with multi-stage text-shadow
│   │   ├── TransitionLink.tsx # Custom animated page navigation link (fade & scale)
│   │   ├── WorkflowStep.tsx   # 3D flip step card component
│   │   ├── blog/              # Specialized Blog UI components
│   │   │   ├── BlogCard.tsx   # Grid item card with read time & metrics
│   │   │   ├── BlogContent.tsx# Markdown parser with syntax highlighting
│   │   │   ├── CodeBlock.tsx  # Interactive copyable syntax highlighter
│   │   │   ├── Pagination.tsx # Dynamic pagination controls
│   │   │   ├── ShareLinks.tsx # Social share button suite (X, LinkedIn, Facebook, Copy)
│   │   │   └── ViewCountLabel.tsx # Reactive SWR-bound view counter badge
│   │   └── __tests__/         # Component Jest unit testing suite (22 files)
│   ├── data/
│   │   └── og-map.json        # Auto-generated mapping file for OG images
│   ├── hooks/
│   │   ├── useViewCounter.ts  # Custom SWR hook with optimistic update logic
│   │   └── __tests__/         # Hook unit testing suite
│   └── lib/
│       ├── hashnode.ts        # GraphQL API Client & query definitions
│       └── prisma.ts          # Singleton PrismaClient DB connection manager
├── agent.md                   # AI Agent Specification File
├── AGENT.md                   # AI Agent Blueprint Alias
├── AGENTS.md                  # Multi-Agent Specification File
├── GEMINI.md                  # Gemini & Antigravity System Context
├── eslint.config.mjs          # ESLint 9 Flat Configuration
├── jest.config.js             # Jest test environment & path alias mapping
├── next.config.ts             # Next.js & PWA compiler options
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript compiler rules
```

---

## ⚡ Quick Start & Development Setup

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `pnpm` (recommended) or `npm`
- **Database**: PostgreSQL server instance (local or hosted e.g., Supabase / Neon / AWS RDS)

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Hashnode Headless CMS Configuration
NEXT_PUBLIC_HASHNODE_ENDPOINT=https://gql.hashnode.com
NEXT_PUBLIC_HASHNODE_HOST=kmstech.hashnode.dev
HASHNODE_ACCESS_TOKEN=your_hashnode_personal_access_token

# PostgreSQL Database Connection String (Prisma ORM)
DATABASE_URL="postgresql://username:password@localhost:5432/kmstech?schema=public"

# Site Base URL (for OpenGraph & Metadata Resolution)
NEXT_PUBLIC_SITE_URL=https://kmstech.co
```

### 3. Installation & Database Migration
```bash
# Clone the repository
git clone https://github.com/your-org/kmstech-next.git
cd kmstech-next

# Install dependencies
pnpm install

# Generate Prisma Client & push schema to PostgreSQL
npx prisma generate
npx prisma db push
```

### 4. Running Local Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

---

## 🧪 Testing & Quality Assurance

The codebase enforces strict unit testing and code quality standards with **100% component coverage target** across 23 Jest test suites.

```bash
# Execute unit tests
pnpm test

# Run tests with complete coverage report
npx jest --coverage

# Run ESLint validation
pnpm lint
```

### Coverage Overview
```text
Test Suites: 23 passed, 23 total
Tests:       87 passed, 87 total
Coverage:    97.45% Statements | 98.78% Lines
```

---

## 🤖 Automated Background Workers

### Generating OpenGraph Screenshots
To generate high-resolution dynamic social preview images for all Hashnode blog posts:

1. Start the local server: `pnpm dev` (runs on `localhost:3000`)
2. Execute the headless Puppeteer script in a separate terminal:
```bash
npx tsx scripts/generate-og-images.ts
```
The script will inspect Hashnode posts, launch headless Chrome, save PNG previews under `/public/og-images/`, and automatically update `/src/data/og-map.json`.

---

## 🚀 Production Deployment (Vercel)

The platform is optimized for seamless deployment to **Vercel**:

1. Connect your repository to Vercel.
2. Configure environment variables (`DATABASE_URL`, `NEXT_PUBLIC_HASHNODE_HOST`, `HASHNODE_ACCESS_TOKEN`).
3. Set the build command: `pnpm run build` (runs `next build --webpack` with Prisma Client auto-generation via `postinstall`).
4. Deploy!

---

## 📄 License & Organization Contact

This software is released under the **MIT License**.

**KMS Tech**  
*Trade License: TRAD/DNCC/131256/2022*  
*Address: House# 231, Ward# 38, Satarkul Road, North Badda, Dhaka, Bangladesh*  
*WhatsApp: +880 1711 741 953 | Phone: +880 1911 256 358 | Email: info@kmstech.co*  
*Website*: [kmstech.co](https://kmstech.co)

---
*Architected & Maintained with ❤️ by KMS Tech Engineering Team*
