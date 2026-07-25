# Package & Dependency Safe Upgrade Plan

> **KMS Tech Next Platform (`kmstech-next`)**  
> *Architected for Next.js 16, React 19, Prisma 6, and TypeScript 5*

This document provides a comprehensive, risk-assessed, phased strategy to upgrade all project dependencies safely without breaking existing features, API contracts, database queries, animations, or unit test suites.

---

## 🎯 Upgrade Strategy & Risk Assessment Matrix

To ensure zero downtime and prevent breaking changes across Server Components, GSAP animations, SWR hooks, Prisma ORM queries, and Jest tests, packages are categorized into 4 Risk Tiers:

```mermaid
quadrantChart
    title Dependency Upgrade Risk vs Effort Matrix
    x-axis Low Effort --> High Effort
    y-axis Low Risk --> High Risk
    quadrant-1 High Risk / High Effort: Core Framework (Next.js / React 19)
    quadrant-2 High Risk / Low Effort: Database ORM (Prisma)
    quadrant-3 Low Risk / Low Effort: Tooling & Types (@types/*, Husky, TS)
    quadrant-4 Low Risk / High Effort: UI & Markdown Parsing (GSAP, React-Markdown)
```

| Tier | Category | Key Packages | Upgrade Policy | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Core Framework & Runtime** | `next`, `react`, `react-dom`, `@next/third-parties`, `eslint-config-next` | Strict alignment. Must upgrade `next` & `eslint-config-next` in lockstep. Maintain React 19 compatibility. | 🔴 High |
| **Tier 2** | **Database & Data Layer** | `@prisma/client`, `prisma`, `graphql`, `graphql-request`, `swr` | Synchronize `prisma` CLI & `@prisma/client`. Run `npx prisma generate` post-install. | 🟡 Medium |
| **Tier 3** | **UI, Animations & Icons** | `gsap`, `lucide-react`, `react-icons`, `@react-google-maps/api` | Minor/Patch updates. Verify GSAP timeline refs and Lucide icon exports. | 🟢 Low |
| **Tier 4** | **Content Parsing & Utilities** | `react-markdown`, `react-syntax-highlighter`, `rehype-raw`, `remark-gfm`, `sanitize-html`, `date-fns` | Compatible with ESM/CJS build. Verify Prism code highlighting and HTML sanitization. | 🟢 Low |
| **Tier 5** | **Testing & Dev Tooling** | `jest`, `@testing-library/*`, `@types/*`, `typescript`, `eslint`, `husky`, `puppeteer`, `tsx` | Safe for minor/major updates. Verify 23 Jest test suites pass cleanly. | 🟢 Low |

---

## 📦 Package-by-Package Comprehensive Analysis

### 1. Core Framework & Runtime (Tier 1)

#### `next` (`16.0.10` → `16.x.x` Latest) & `eslint-config-next` (`16.0.10` → `16.x.x`)
- **Current Pin**: `16.0.10`
- **Analysis**: Next.js 16 uses Webpack in this repository (`next dev --webpack` / `next build --webpack`). Upgrading to the latest patch release in the 16.x branch fixes upstream edge runtime bugs, memory leaks, and improves React Server Components (RSC) hydration.
- **Safety Protocol**: Must update `next`, `@next/third-parties`, and `eslint-config-next` simultaneously. Run `pnpm build` after upgrading.

#### `react` (`19.2.1`) & `react-dom` (`19.2.1`)
- **Current Pin**: `19.2.1`
- **Analysis**: React 19 is used alongside Next.js 16. Current setup handles strict mode double-invocations in `useViewCounter` via `localStorage` locks.
- **Safety Protocol**: Keep `react` and `react-dom` aligned to exact matching patch versions.

---

### 2. Database & Data Fetching (Tier 2)

#### `prisma` (`^6.19.2`) & `@prisma/client` (`^6.19.2`)
- **Current Pin**: `6.19.2`
- **Analysis**: Prisma handles PostgreSQL stats persistence (`Stats` model with composite key `[type, slug]`). `postinstall` script runs `prisma generate`.
- **Safety Protocol**: Upgrade CLI `prisma` and runtime `@prisma/client` together. Execute `npx prisma generate` immediately following installation. Verify `/api/view-count/[slug]` GET and POST routes.

#### `graphql-request` (`^7.4.0`) & `graphql` (`^16.12.0`)
- **Current Pin**: `7.4.0` / `16.12.0`
- **Analysis**: Used in `src/lib/hashnode.ts` with custom `fetch` transport executing Next.js ISR (`next: { revalidate: 60 }`).
- **Safety Protocol**: Ensure `graphql-request` 7.x range is maintained. Verify `getAllPosts` and `getPost` queries.

#### `swr` (`^2.3.8`)
- **Current Pin**: `2.3.8`
- **Analysis**: Drives client-side view counter state in `useViewCounter.ts` with optimistic UI updates.
- **Safety Protocol**: Minor patch updates in 2.x range are backward compatible. Run `useViewCounter.test.ts`.

---

### 3. UI, Animation & Iconography (Tier 3)

#### `gsap` (`^3.14.2`)
- **Current Pin**: `3.14.2`
- **Analysis**: Drives SVG path drawing (`MainLogo.tsx`), background noise turbulence (`SVGLayer.tsx`), quote entrance & glow effects (`TopQuote.tsx`), and page transitions (`TransitionLink.tsx`).
- **Safety Protocol**: GSAP 3.x is highly stable. Ensure timeline `willChange` optimizations and cleanup `tl.kill()` function properly in React 19 `useEffect`.

#### `lucide-react` (`^0.378.0`) & `react-icons` (`^5.5.0`)
- **Current Pin**: `0.378.0` / `5.5.0`
- **Analysis**: Icon libraries used across `Contact.tsx`, `Services.tsx`, `WorkflowStep.tsx`, `BlogCard.tsx`, and `BlogPostPage`.
- **Safety Protocol**: Safe to upgrade to latest 0.x / 5.x releases.

---

### 4. Content Parsing & Automation (Tier 4)

#### `react-markdown` (`^10.1.0`), `remark-gfm` (`^4.0.1`), `rehype-raw` (`^7.0.0`), `sanitize-html` (`^2.17.0`)
- **Current Pin**: `10.1.0` / `4.0.1` / `7.0.0` / `2.17.0`
- **Analysis**: Renders Hashnode markdown content into HTML inside `BlogContent.tsx`.
- **Safety Protocol**: ESM module imports must remain consistent. Run `BlogContent.test.tsx`.

#### `puppeteer` (`^24.35.0`) & `tsx` (`^4.21.0`)
- **Current Pin**: `24.35.0` / `4.21.0`
- **Analysis**: Powers `scripts/generate-og-images.ts` for generating OpenGraph 1200x630 screenshots.
- **Safety Protocol**: Safe to upgrade. Verify headless Chrome launch flags (`--no-sandbox`).

---

### 5. Testing & Developer Tooling (Tier 5)

#### `jest` (`^30.2.0`), `@testing-library/react` (`^16.3.1`), `jest-environment-jsdom` (`^30.2.0`)
- **Current Pin**: `30.2.0` / `16.3.1` / `30.2.0`
- **Analysis**: Runs 23 test suites (87 tests) with 97.45% statement coverage.
- **Safety Protocol**: Maintain Jest 30.x alignment across `jest` and `jest-environment-jsdom`.

#### `@types/*` (`@types/node`, `@types/react`, `@types/react-dom`, `@types/jest`)
- **Current Pin**: `@types/node` `^20`, `@types/react` `^19`, `@types/react-dom` `^19`
- **Analysis**: Provides ambient TypeScript declarations.
- **Safety Protocol**: Safe to update to latest patch versions within major range.

---

## 🚀 Step-by-Step Safe Upgrade Execution Plan

### Phase 1: Pre-Upgrade Baseline Verification
Run the complete test suite and lint checks to establish a green baseline:
```bash
# 1. Run unit tests
npx jest --watchAll=false

# 2. Run linter
pnpm lint
```

---

### Phase 2: Safe Minor & Patch Upgrades (Non-Breaking)
Upgrade devDependencies, types, and utility libraries first:

```bash
# Upgrade type definitions and dev tools
pnpm update @types/node @types/react @types/react-dom @types/jest @types/sanitize-html @types/snazzy-info-window --latest

# Upgrade UI icon libraries & utilities
pnpm update lucide-react react-icons date-fns gsap tsx husky --latest

# Upgrade testing utilities
pnpm update @testing-library/react @testing-library/dom @testing-library/jest-dom --latest
```

**Verification Step**:
```bash
npx jest --watchAll=false
```

---

### Phase 3: Database & Data Fetching Layer Upgrades
Upgrade Prisma and GraphQL data dependencies:

```bash
# Upgrade Prisma ORM and client
pnpm update prisma @prisma/client --latest

# Re-generate Prisma Client types
npx prisma generate

# Upgrade SWR and GraphQL client
pnpm update swr graphql-request graphql --latest
```

**Verification Step**:
```bash
npx jest --watchAll=false
```

---

### Phase 4: Core Framework Alignment (Next.js & React 19)
Upgrade Next.js and its associated ecosystem dependencies:

```bash
# Upgrade Next.js core framework & third parties
pnpm update next @next/third-parties eslint-config-next --latest

# Ensure React 19 parity
pnpm update react react-dom --latest
```

**Verification Step**:
```bash
# 1. Run tests
npx jest --watchAll=false

# 2. Execute full production build test
pnpm build
```

---

### Phase 5: Final Validation & Sign-off Checklist

- [ ] **Unit Tests**: All 23 Jest test suites pass (`87/87 tests`).
- [ ] **Coverage**: Statement coverage remains at `97.45%+`.
- [ ] **Prisma Client**: `npx prisma generate` completes without warnings.
- [ ] **Build Validation**: `pnpm build` creates `.next` production bundle with zero Webpack / TypeScript compilation errors.
- [ ] **API Verification**: `/api/view-count/[slug]` GET & POST handlers respond cleanly.
- [ ] **OG Generator**: `npx tsx scripts/generate-og-images.ts` runs in headless mode.

---
*Maintained for safe dependency lifecycle management on the KMS Tech platform.*
