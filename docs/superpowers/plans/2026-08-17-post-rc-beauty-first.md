# Post-RC Beauty-First Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the phone-first first impression look like a Knightsbridge nail studio through five sequential PRs: Almond-set art, Home/Book conversion, a noindex Netlify preview, reduced-motion micro-interactions, and an original Open Graph share card.

**Architecture:** Original CSS/SVG studio decoration (D-014) shared by Home hero and `MediaFallback`. Conversion rearranges verified facts only. Preview deploys stay `noindex`. Motion is opacity/transform only. The share card is original raster, not a media-manifest asset.

**Tech Stack:** Next.js 16 App Router, React 19, Vitest, Playwright, Netlify preview (no `--prod`).

## Global Constraints

- No invented booking, payment, service, pricing, staff, or policy information (`AGENTS.md`).
- Production booking stays `manual-handoff` (D-006). WhatsApp and walk-in stay visible (D-003).
- No retained social/`media-001`–`media-030` publication (D-010, ODR-011).
- Analytics stays no-op (D-011 / ODR-019).
- No production host, DNS, custom domain, `--prod`, or indexation flip (ODR-024).
- No live scheduling, payments, or notifications (ODR-025).
- Approved blush/deep-rose tokens and system-font stacks only.
- Each feature PR: branch from updated `main`, `npm run validate` + `npm run test:e2e`, requesting-code-review vs `origin/main`, draft PR, merge only if Critical/Important issues are fixed and CI is green.

Authority: `docs/superpowers/specs/2026-08-17-post-rc-beauty-first-design.md`.

---

### Task 0: Merge spec and land this plan

**Files:**
- Already on `codex/post-rc-spec`: `docs/superpowers/specs/2026-08-17-post-rc-beauty-first-design.md`
- Create: `docs/superpowers/plans/2026-08-17-post-rc-beauty-first.md`

- [ ] Merge GitHub PR #7 into `main`
- [ ] Commit this plan file on that lineage
- [ ] Pull updated `main` before PR 1

---

### Task 1: PR 1 — Consent-safe Almond-set art

**Branch:** `codex/post-rc-01-consent-safe-art`

**Files:**
- Create: `src/components/ui/studio-art.tsx`
- Create: `src/components/ui/studio-art.test.tsx`
- Create: `src/content/media-guard.test.ts`
- Create: `e2e/post-rc-evidence.spec.ts`
- Create: `docs/screenshots/post-rc/` PNGs
- Modify: `app/page.tsx`, `app/globals.css`, `src/components/ui/media-fallback.tsx`, `src/components/ui/ui.module.css`, `src/components/ui/ui.test.tsx`, `DECISIONS.md`

**Interfaces:**
- Consumes: existing `bookingHref`, `pageMetadata.home`, `pageCopy.homeLede`, `MediaFallback` props
- Produces: `StudioArt({ variant: "hero" | "fallback" })`

See spec section “Step 1 detailed design” for motif, a11y, Home viewport, D-014 table, and success criteria.

---

### Task 2: PR 2 — Home and Book conversion

**Branch:** `codex/post-rc-02-home-conversion`

**Files:**
- Modify: `app/page.tsx` (section order)
- Modify: `src/components/booking/booking-page.tsx` (eyebrow)
- Modify: e2e locators that expect `Manual booking handoff`

---

### Task 3: PR 3 — Noindex Netlify preview

**Branch:** `codex/post-rc-03-netlify-preview`

**Files:**
- Modify: `.gitignore` (add `.netlify/`)
- Modify: `docs/runbooks/DEPLOYMENT.md`, `docs/runbooks/MANUAL_QA.md`
- Keep: `netlify.toml` `X-Robots-Tag`, `approvedProductionOrigin = null`

Operator login may be required to link the site. Do not run `netlify deploy --prod`.

---

### Task 4: PR 4 — Reduced-motion-safe micro-interactions

**Branch:** `codex/post-rc-04-motion`

**Files:**
- Modify: `src/components/ui/ui.module.css` (`@starting-style` on StudioArt)
- Modify: `app/globals.css` (button `:active` scale)
- Create: `e2e/motion.spec.ts`

---

### Task 5: PR 5 — Consent-safe Open Graph share card

**Branch:** `codex/post-rc-05-og-share-card`

**Files:**
- Create: `public/og/studio-share.png` (1200×630, original Almond set)
- Modify: `src/content/seo.ts`, `src/content/seo.test.ts`, e2e SEO assertions, `src/content/media-guard.test.ts`

Do not set `openGraph.url` or `metadataBase`. JSON-LD still omits `image` / `logo` / `"url"`.
