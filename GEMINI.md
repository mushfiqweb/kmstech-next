# GEMINI.md - Persistent Memory & System Architecture Specification

> **Sacred Intention Leads to Perfection**  
> *KMS Tech App (`kmstech-next`)*  
> *Trade License: TRAD/DNCC/131256/2022 | Website: https://kmstech.co*

This file is automatically indexed by Google Antigravity / Gemini AI agent systems to provide immediate, zero-latency context for pair programming, code generation, refactoring, and debugging on this repository.

---

## 🏛️ 1. Project Naming & Brand Heritage

The name **KMS Tech** carries a sacred spiritual and historical background:
* **K-M-S Origin**: The core letters **K**, **M**, **S** represent the name of the revered sub-continental Sufi saint:  
  **'Hazrat Allama Shah Sufi Khwaja Mohammad Sayefuddin Naqshebondi Mujaddedi Enayetpuri Shamvugonji (R.)'**
* **Family & Founder Heritage**: Miraculously, the founder's father's name, the founder's own name, and key co-founders' names share the letters **K**, **M**, and **S**.
* **Corporate Lineage**: Originally casual IT startup *Technoism IT* (formed back in 2012 by CSE graduates), reformed into **KMS Tech**.

---

## 📐 2. Architecture & Subsystems Map

```mermaid
graph TD
    Client[Browser / PWA Client] --> |Modal Navigation & GSAP| SPAShell[Client SPA Landing Page\nsrc/app/[[...slug]]/page.tsx]
    Client --> |SSR Routes| SSRBlog[SSR Headless CMS Blog\nsrc/app/(blog)/blogs & /blog/[slug]]
    
    SSRBlog --> |graphql-request & ISR 60s| HashnodeAPI[Hashnode GraphQL v2 API\nkmstech.hashnode.dev]
    
    SSRBlog --> |View Counter Badge| ViewCounterHook[useViewCounter SWR Hook]
    ViewCounterHook --> |LocalStorage Lock| Deduplication[viewed-slug Storage Guard]
    ViewCounterHook --> |GET / POST| APIRoute[API Route\n/api/view-count/[slug]]
    
    APIRoute --> |Prisma Upsert & Increment| Postgres[(PostgreSQL Database\nTable: stats)]
    
    Automation[Puppeteer OG Worker\nscripts/generate-og-images.ts] --> |Headless Chrome 1200x630| LocalApp[Local Dev App\nlocalhost:3000]
    Automation --> |PNG Outputs & Mapping| OGMap[public/og-images/ & src/data/og-map.json]
```

### 2.1 SPA Landing Page Shell (`src/app/[[...slug]]/page.tsx`)
* **Catch-all Route**: Accepts optional slug path `[[...slug]]`.
* **State-Driven Modal System**: Modal state `activeModal` switches between `'about'`, `'blog'`, `'services'`, `'concerns'`, and `'contact'`.
* **Body Scroll Lock**: `Modal.tsx` locks `document.body.style.overflow = 'hidden'` when active, restores `'auto'` on unmount.
* **Responsive Layout**: Logo center group (`MainLogo.tsx`), vector canvas (`SVGLayer.tsx`), quote header (`TopQuote.tsx`), tagline (`Tagline.tsx`), transition links (`TransitionLink.tsx`).

### 2.2 Headless CMS SSR Blog Engine (`src/app/(blog)/`)
* **`src/app/(blog)/blogs/page.tsx`**: Paginated post grid (6 posts per page) fetching from Hashnode API. Accepts `searchParams: { page?: string }`.
* **`src/app/(blog)/blog/[slug]/page.tsx`**: Single post detail view.
  - Dynamically fetches post info and tags.
  - **Dynamic Metadata Generation (`generateMetadata`)**: Checks local `src/data/og-map.json` mapping for Puppeteer screenshots, falling back to Hashnode cover images.
  - Formats publication date with `date-fns`, read time, views via `ViewCountLabel`, author avatar, tag pill badges, copyable Prism code blocks (`CodeBlock.tsx`), and social share buttons (`ShareLinks.tsx`).

### 2.3 Persistence & Atomic View Counter (`prisma/schema.prisma` + `/api/view-count/[slug]`)
* **Prisma Model**:
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
* **API Handler (`src/app/api/view-count/[slug]/route.ts`)**:
  - `GET`: Returns `{ views: stats?.views ?? 0 }`. Safe error handling returns `{ views: 0 }`.
  - `POST`: Executes `prisma.stats.upsert({ where: { type_slug: { type: 'blog', slug } }, update: { views: { increment: 1 } }, create: { type: 'blog', slug, views: 1 } })`.
* **Frontend Hook (`src/hooks/useViewCounter.ts`)**:
  - Uses `useSWR` for state synchronization.
  - Synchronous `localStorage` lock (`viewed-${slug}`) prevents double-firing in React 19 / Strict Mode.
  - Optimistic UI update (`mutate({ views: count + 1 }, false)`).
  - Background `POST` call with automatic rollback on error.

### 2.4 Headless CMS Client (`src/lib/hashnode.ts`)
* **Target Endpoint**: `https://gql.hashnode.com` (`kmstech.hashnode.dev`).
* **ISR Strategy**: Custom fetch wrapper passing `next: { revalidate: 60 }`.
* **Functions**:
  - `getAllPosts(cursor?, accumulatedPosts?)`: Recursive cursor pagination handling `pageInfo.hasNextPage`.
  - `getPosts(page = 1, limit = 6)`: Offset-sliced pagination over `getAllPosts()`.
  - `getPost(slug)`: Queries post payload including HTML, Markdown, Author bio, and Tags.

### 2.5 Puppeteer Worker Script (`scripts/generate-og-images.ts`)
* Launches headless Chrome (`1200x630` viewport, `deviceScaleFactor: 2`).
* Renders `http://localhost:3000/blog/[slug]`.
* Waits for `networkidle0` and `h1` element presence.
* Saves screenshots to `public/og-images/[slug].png` and updates lookup dictionary in `src/data/og-map.json`.

---

## 🎨 3. Design System, Typography & Animations

* **Colors**:
  - Primary Green: `#009444` (`var(--primary-green)`)
  - Text Light: `#e0e0e0` (`var(--text-color)`)
  - Background Dark: `#020408` (`var(--bg-dark)`)
* **Fonts**:
  - `Geist` (`--font-geist-sans`)
  - `Geist Mono` (`--font-geist-mono`)
  - `Atkinson Hyperlegible` (`--font-atkinson`)
  - `Segoe Print` (Local `@font-face` from `/fonts/segoepr.ttf`)
* **GSAP Timelines**:
  - `MainLogo.tsx`: Calculates SVG total length, sets `strokeDasharray`/`strokeDashoffset`, draws paths over 1.5s with 0.05s stagger, fades fill in over 1s. Replays on click.
  - `SVGLayer.tsx`: Continuous GSAP tween on `<feTurbulence baseFrequency>` from `0.65` to `0.66` over 10s.
  - `TopQuote.tsx`: Dual-layer quote lines staggered entrance with floating container animation (`y: -10`, 4s duration).
  - `TransitionLink.tsx`: Main container fade out + scale down (`opacity: 0, scale: 0.98`, 0.4s) before `router.push(href)`.

---

## 🧪 4. Testing & Code Quality Specs

* **Jest Setup**: Next.js preset, `jsdom` environment, `@/` path alias mapping to `src/`.
* **Test Inventory**: 23 test files (87 unit tests) with **97.45% statement coverage**.
* **Commands**:
  - Execute test suite: `npx jest --watchAll=false`
  - Coverage report: `pnpm test --coverage`
  - Linting: `pnpm lint`

---

## ⚡ 5. Environment & Operational Rules

### Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_HASHNODE_ENDPOINT=https://gql.hashnode.com
NEXT_PUBLIC_HASHNODE_HOST=kmstech.hashnode.dev
HASHNODE_ACCESS_TOKEN=your_hashnode_personal_access_token
DATABASE_URL="postgresql://username:password@localhost:5432/kmstech?schema=public"
NEXT_PUBLIC_SITE_URL=https://kmstech.co
```

### Directives for AI Agents
1. **Zero-Guess Rule**: Do not guess schema fields or API signatures. Check `prisma/schema.prisma` and `src/lib/hashnode.ts`.
2. **Component Edits**: Maintain `tabIndex={0}`, `aria-label`, and `role` attributes for WCAG compliance.
3. **State Mutation**: Never alter `localStorage` keys or SWR mutate logic without consulting `useViewCounter.ts`.
4. **Verification**: Always run `npx jest --watchAll=false` after code edits to verify zero regressions.

---
*Maintained for instant Gemini & Antigravity AI pair programming context.*
