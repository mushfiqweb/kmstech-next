# AGENTS.md - Multi-Agent Operating Specification

> **Sacred Intention Leads to Perfection**  
> *KMS Tech Next Platform (`kmstech-next`)*  
> *Trade License: TRAD/DNCC/131256/2022 | Official Domain: https://kmstech.co*

This document defines the system contracts, file structures, API schemas, and execution protocols for autonomous AI agents and subagents operating on the **KMS Tech** codebase.

---

## 🗺️ 1. Repository Subsystems & Architecture

```
kmstech-next/
├── prisma/
│   └── schema.prisma          # PostgreSQL Schema (Stats model: composite key [type, slug])
├── public/                    # PWA Service Worker (sw.js), Manifest, & OG Images
│   └── og-images/             # Puppeteer generated PNG screenshots (1200x630)
├── scripts/
│   ├── debug-net.ts           # Diagnostic network runner
│   └── generate-og-images.ts  # Puppeteer headless worker for post social previews
├── src/
│   ├── app/                   # Next.js App Router Architecture
│   │   ├── (blog)/            # SSR Route Group (blogs/ page & blog/[slug]/ page)
│   │   ├── [[...slug]]/       # Client SPA Catch-all Landing Page & Modal Router
│   │   ├── api/view-count/    # Atomic REST API handlers for view counter
│   │   ├── globals.css        # Core design system tokens, variables, & keyframes
│   │   └── layout.tsx         # Root HTML layout, Fonts (Geist, Atkinson), Vercel Analytics
│   ├── components/            # UI Component Library & Modal Views
│   │   ├── About.tsx          # KMS Tech background story & Sufi heritage details
│   │   ├── Blog.tsx           # Static article preview listing for modal view
│   │   ├── Concerns.tsx       # Sister concerns (KMS Marketplace, Beneath Green)
│   │   ├── Contact.tsx        # Phone, WhatsApp (+880 1711 741 953), Email, Address
│   │   ├── MainLogo.tsx       # GSAP path-drawing SVG corporate branding
│   │   ├── Modal.tsx          # Accessible modal dialog with body overflow lock
│   │   ├── OfflineIndicator.tsx# Reactive offline network status toast banner
│   │   ├── ServiceCard.tsx    # Accessible service offering card
│   │   ├── Services.tsx       # Core services grid & 4-step workflow process
│   │   ├── SVGLayer.tsx       # Background vector canvas with feTurbulence noise
│   │   ├── Tagline.tsx        # "Sacred Intention Leads to Perfection" SVG text
│   │   ├── TopQuote.tsx       # Dual-layer glowing quote header with text-shadow
│   │   ├── TransitionLink.tsx # Animated page navigation link (fade out + scale down)
│   │   ├── WorkflowStep.tsx   # 3D flip step card component
│   │   ├── blog/              # Specialized Blog components
│   │   │   ├── BlogCard.tsx   # Grid post item with stats & read time
│   │   │   ├── BlogContent.tsx# Markdown parser with Prism code formatting
│   │   │   ├── CodeBlock.tsx  # Copyable syntax highlighter block
│   │   │   ├── Pagination.tsx # Page controls for 6 posts/page grid
│   │   │   ├── ShareLinks.tsx # Social button bar (X, LinkedIn, FB, Copy)
│   │   │   └── ViewCountLabel.tsx # SWR-bound reactive view counter badge
│   │   └── __tests__/         # 22 Jest test suites (100% component coverage)
│   ├── data/
│   │   └── og-map.json        # Mapping of post slug -> /og-images/[slug].png
│   ├── hooks/
│   │   ├── useViewCounter.ts  # Client SWR hook with optimistic update & localStorage lock
│   │   └── __tests__/         # Hook test suite
│   └── lib/
│       ├── hashnode.ts        # GraphQL API Client (kmstech.hashnode.dev, ISR 60s)
│       └── prisma.ts          # Singleton PrismaClient DB connection manager
├── agent.md                   # Detailed Agent Blueprint File
├── AGENTS.md                  # THIS FILE: Multi-Agent Specification
├── GEMINI.md                  # Gemini & Antigravity System Context
└── README.md                  # Enterprise Software Architect Documentation
```

---

## ⚡ 2. Core Operational Protocols

### A. Database Modifications
- Database mutations MUST be declared in `prisma/schema.prisma`.
- Model `Stats` uses composite primary key `@@id([type, slug])` mapped to table `stats`.
- Always run `npx prisma generate` after modifying schema.

### B. Headless CMS Integration
- GraphQL client wrapper located in `src/lib/hashnode.ts`.
- Targets `https://gql.hashnode.com` (`kmstech.hashnode.dev`).
- Uses custom `fetch` transport executing Next.js Incremental Static Regeneration (`next: { revalidate: 60 }`).

### C. Testing Verification
- Every UI component in `src/components/` must have a corresponding `.test.tsx` file in `src/components/__tests__/`.
- Run verification before declaring completion:
  ```bash
  npx jest --watchAll=false
  ```
- Current baseline: 23 test suites, 87 tests passing, **97.45% statement coverage**.

---
*Maintained for autonomous AI agent collaboration.*
