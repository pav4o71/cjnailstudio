# Post-RC beauty-first design

Status: SPEC FOR REVIEW — not an implementation plan and not authorized feature work.

Date: 2026-08-17

Owner choice: **A. Beauty first** — art → conversion → preview URL → motion → share card.

This document is the design authority for five sequential post-release-candidate pull requests. It does not authorize application code, feature PRs, a production deploy, or `writing-plans`. Implementation planning starts only after the user reviews this file and asks for a plan.

## Goal

Make the phone-first first impression look like a Knightsbridge nail studio: distinctive, calm, and conversion-ready.

Impressive here means beauty on a 375px screen, clearer contact paths, restrained motion, and a shareable preview URL. It does not mean luxury copy, fake photography, live booking, prices, or a custom production domain.

The site stays honest. Verified facts stay source-pinned. Booking stays `manual-handoff`. Indexation stays fail-closed until ODR-024.

## Current baseline

Milestones 1–6 are on `main`. Annotated tag `release-candidate` is `8647cea9581e59ab6914a496d5aacf825a685117`. Production is not published. The site is `noindex, nofollow`. `/book` is WhatsApp, phone, and walk-in only.

The product is complete and honest, not impressive on a phone:

- Mobile Home spends the first screen on the hours bar, wordmark, headline, and three stacked contact buttons. The blush hero board is a reused two-dot CSS blob and sits below the fold.
- `MediaFallback` (Home gallery preview, `/gallery`, Custom Nail Art, Lashes) repeats a similar blob.
- `/gallery` correctly reports `0 looks published on this website.`
- `/book` works, but the eyebrow `Manual booking handoff` reads like an internal label.
- Open Graph has unique titles and descriptions and no `og:image`. Twitter card is `summary`.
- There is no shareable live URL. `approvedProductionOrigin` is `null`.

## Constraints that do not move

These are closed. No PR in this program relaxes them.

| Constraint | Rule |
| --- | --- |
| `AGENTS.md` | No invented booking, payment, service, pricing, staff, or policy information. Mobile-first, accessible, performance-conscious. Semantic HTML, keyboard access, visible focus, contrast, reduced-motion. No consent-uncleared customer imagery. |
| D-002 | Booking remains the primary website conversion. |
| D-003 | WhatsApp and walk-in paths stay visible (header, footer, `/book`, and the mobile action bar). |
| D-006 | Production booking mode is `manual-handoff` and fails closed to it. |
| D-010 | Publish no retained social asset by default. Manifest files are planning-only. |
| D-011 / ODR-019 | Analytics stays a no-op. No destination. |
| ODR-011 | Ship consent-safe graphic fallbacks. No retained social `media_id` becomes public. |
| ODR-024 | No production host, DNS, custom domain, `--prod`, or indexation flip. Keep `X-Robots-Tag: noindex, nofollow`, meta robots, `robots.txt` disallow `/`, and an empty sitemap. Flip checklist remains `docs/runbooks/INDEXATION.md`. |
| ODR-025 | No live scheduling, payments, notifications, or production secrets. |
| Design system | Approved blush/deep-rose tokens and system-font stacks only. No third-party font request. No bows, lace, essential script, or low-contrast pink-on-pink controls. DOM reading order matches visual order. |
| Media | Never hotlink social CDNs. Do not register new public art as a `media-manifest.json` id (`media-001`–`media-030`). |

## Approved sequence (five PRs)

Each step is one branch from the **updated** `main` after the previous PR merges. Do not stack the next branch on an unmerged PR.

After every step, in this order:

1. Run `npm run validate` and `npm run test:e2e`.
2. Request code review against `origin/main` (`superpowers:requesting-code-review`).
3. Open a **draft** PR to `main`.
4. Merge only if review findings that are Critical or Important are fixed and GitHub Actions `validate` + `e2e` are green.
5. Create the next branch from that updated `main`.

Owner of PRs 1, 2, 4, and 5 is the visual/UI subsystem. Owner of PR 3 is deployment/runbooks. One owner per file at a time.

### PR 1 — Phone-first consent-safe art

| Field | Value |
| --- | --- |
| Branch | `codex/post-rc-01-consent-safe-art` |
| PR title | Elevate consent-safe hero and gallery art for phone-first first impression |
| Outcome | On a ~375px Home screen, distinctive original CSS/SVG studio craft shares the first viewport with the H1 and one in-flow Book CTA. Desktop hero and every `MediaFallback` use the same art language instead of the two-dot blob. |
| Tests | `npm run validate`; `npm run test:e2e` (axe still clean on launch routes); StudioArt unit test (no `<img>`, no `media-001`–`media-030` src); `src/content/media-guard.test.ts` asserts public art is not a retained social id; `e2e/post-rc-evidence.spec.ts` regenerates Home and gallery-fallback PNGs under `docs/screenshots/post-rc/` without overwriting Milestone 6 RC shots. |
| Owner gates | None. Original graphics are the D-010 / ODR-011-safe path. Do not publish manifest social files. |

### PR 2 — Home and Book conversion storytelling

| Field | Value |
| --- | --- |
| Branch | `codex/post-rc-02-home-conversion` |
| PR title | Tighten Home and Book conversion without inventing offers |
| Outcome | Home reads look → category → contact. Gallery empty state stays honest and does not lead the story. `/book` eyebrow is customer-facing. Copy stays source-pinned. No confirmation, slots, or prices. |
| Tests | Existing Home → `/book` / WhatsApp / phone / Visit journeys still pass; claim/evidence tests still pin copy; `/book` e2e asserts the new eyebrow and still forbids confirmation; gallery published count remains 0. |
| Owner gates | None, provided the PR only rearranges verified facts and UI chrome. New factual claims are forbidden. |

### PR 3 — Noindex Netlify preview URL

| Field | Value |
| --- | --- |
| Branch | `codex/post-rc-03-netlify-preview` |
| PR title | Add a noindex Netlify preview so the studio can be shared |
| Outcome | Git-linked Netlify site. PR and draft deploys get a `*.netlify.app` URL. Indexation controls stay on. No custom domain. No `--prod`. No `approvedProductionOrigin`. Operator records Lighthouse against that URL in `docs/runbooks/MANUAL_QA.md`. |
| Tests | Existing SEO e2e still expect noindex, empty sitemap, and no invented canonical host; unit test still requires `X-Robots-Tag = "noindex, nofollow"` in `netlify.toml`; `.netlify/` stays gitignored. |
| Owner gates | Operator Netlify + GitHub login required to complete linking. **Not** ODR-024 (that decision is production host/DNS). |

### PR 4 — Reduced-motion-safe micro-interactions

| Field | Value |
| --- | --- |
| Branch | `codex/post-rc-04-motion` |
| PR title | Add reduced-motion-safe micro-interactions to shell and hero |
| Outcome | 160ms standard and 220ms dialog transitions, opacity and transform only: StudioArt/hero enter via `@starting-style`, button press, existing menu dialog. `prefers-reduced-motion: reduce` keeps the static PR-1/PR-2 layout with no enter or press motion. No parallax, autoplay, or looping decoration. |
| Tests | `npm run validate`; `npm run test:e2e` (axe still clean); `e2e/motion.spec.ts` asserts that under `prefers-reduced-motion: reduce` the hero/art enter and button-press transitions do not run; no new continuous `animation` except the existing busy-spinner, which already stops under reduced-motion. |
| Owner gates | None. |

### PR 5 — Consent-safe Open Graph share card

| Field | Value |
| --- | --- |
| Branch | `codex/post-rc-05-og-share-card` |
| PR title | Add a consent-safe Open Graph share card |
| Outcome | One original 1200×630 studio graphic in the PR-1 art language. `og:image` plus Twitter `summary_large_image`. Still no production canonical URL. |
| Tests | Update `src/content/seo.test.ts` (today it requires `openGraph.images` to be undefined); e2e asserts `og:image` and `twitter:card=summary_large_image` on launch routes; media guard that the file is not a retained social id; `approvedProductionOrigin` stays `null` and `openGraph.url` stays absent. |
| Owner gates | None. The asset must be original studio art. Do not use customer or social photos. |

## Step 1 detailed design

This is the only step specified at implementation fidelity. Steps 2–5 below are locked enough for a later plan. They are not implemented in this spec PR and they are not in feature PR 1.

### Decision D-014 (added in PR 1, not in this spec PR)

Append one row to `DECISIONS.md`:

| ID | Status | Decision | Rationale / evidence | Affected interfaces |
| --- | --- | --- | --- | --- |
| D-014 | Approved architecture | Post-release-candidate visual polish is authorized as original CSS/SVG studio art, conversion rearrangements of verified facts, a noindex Netlify preview URL, reduced-motion-safe micro-interactions, and an original Open Graph graphic. Live scheduling, payments, prices, retained social/customer photos, analytics destination, and production domain remain off. | Owner chose beauty-first sequence after the release candidate. D-010, ODR-011, ODR-024, and ODR-025 are unchanged. | Hero, `MediaFallback`, Home/Book copy, Netlify preview, motion, Open Graph image |

D-014 does not authorize publishing any `media-manifest.json` asset. Shared changes in later PRs cite D-014 plus the existing row they touch.

### Art language

Replace the current hero blob (`.hero-art` radial dots + rotated oval) and the `MediaFallback` three-span blob with one shared original motif.

**Motif name:** Almond set.

**Layers (all token-based):**

1. Field: linear gradient from `--color-surface-blush` to `--color-rose-soft`.
2. Five overlapping almond outlines (nail-plate silhouettes) at slight rotations. Strokes use `--color-brand-deep`, `--color-brand`, and one `--color-seasonal` accent. Translucent fills use `--color-surface` and `--color-rose-soft`. Not photorealistic nails: no skin, cuticle, fingertip, gem photograph, or shine map.
3. Two small highlight discs in white / `--color-surface`, secondary to the almonds.

Forbidden in the motif: hands, faces, photographed nails, bows, lace, script lettering, copied composition from `media-009` or any other manifest file, third-party fonts, and any raster derived from `docs/source/media-manifest.json`.

The graphic is decoration. It does not communicate a service, price, or result.

### Shared component

Add `src/components/ui/studio-art.tsx`. Put its frame/motif rules in `src/components/ui/ui.module.css` next to `MediaFallback`. Home column layout stays in `app/globals.css`.

```ts
type StudioArtProps = Readonly<{
  variant: "hero" | "fallback";
}>;
```

- `hero`: 4:5 frame, fills the Home hero art slot.
- `fallback`: same SVG, tighter crop, fills the `MediaFallback` artwork pane (current mobile min-height 16rem, desktop pane as today).

Implementation: inline SVG plus CSS gradient field. No `<img>`, no `next/image`, no file from the media library.

Provenance: a file-level comment states this is original studio decoration authorized by D-014, not a retained `media_id`. Do not add a `media-001`–`media-030` id for it.

**Accessibility:**

- The SVG/board is `aria-hidden="true"`.
- Do not put `role="img"` on a large silent block before the H1.
- Home keeps a visually-hidden sentence after the H1: `Decorative studio artwork; no customer image is used.`
- `MediaFallback` keeps its figcaption (eyebrow, title, description). That caption is the accessible name for the empty media state. The artwork pane stays `aria-hidden`.
- Forced-colors: 2px `CanvasText` / `ButtonText` border on the frame; almond strokes use `CanvasText`; field uses `Canvas`.
- Contrast: the board carries no text. Adjacent H1, lede, and caption text keep existing 4.5:1 body contrast against page surfaces, not against the decorative field.

**Performance:** Home LCP remains text or this inline SVG, not a photograph. Do not introduce a hero PNG. Lab budgets in `docs/DESIGN_SYSTEM.md` still apply if a later PR adds a raster; PR 1 must not.

### Home first viewport

Playwright mobile is the success viewport (375 CSS px wide). Account for the existing header and the sticky Book/WhatsApp action bar.

**Problem:** `.hero` is copy (eyebrow, H1, lede, three buttons) then `.hero-art`. At `max-width: 48rem` the grid is one column, so the art falls below the fold.

**Layout (DOM order = visual order):**

Mobile (`max-width: 48rem`):

1. Eyebrow `Knightsbridge, Makati`
2. H1 `Bring the look you have in mind.`
3. Exactly one in-flow primary control: `Book or contact the studio` → existing `bookingHref({ entryPoint: "home" })`
4. `StudioArt variant="hero"` — min-height 12rem, visible in the first 667px-tall screen together with items 1–3 (not a sliver). Do not shrink the H1 below the design-system scale. If chrome plus copy plus 12rem art would overflow 667px, reduce `.hero` block padding first, then cap art height, never below 12rem.
5. Existing lede (`pageCopy.homeLede`) below the art. No additional in-flow hero buttons.

Desktop (`min-width: 48rem`):

- Two-column grid as today: copy column then art column.
- Copy column: eyebrow, H1, lede, the same single Book CTA.
- Art column: `StudioArt variant="hero"`.

**CTA rule for PR 1:** the Home hero contains exactly one in-flow button, the Book link. WhatsApp remains in the header, footer, and mobile action bar (D-003). `View services` remains the next section (`Find a service category` chooser) and is not duplicated in the hero. This is a first-viewport requirement, not the full conversion rewrite (that is PR 2).

Do not overlay H1 on the decorative field (contrast risk; design system forbids low-contrast pink-on-pink).

### MediaFallback

`src/components/ui/media-fallback.tsx` keeps its public props (`eyebrow`, `title`, `description`, optional `action`). Replace the three empty `<span />` blobs with `<StudioArt variant="fallback" />`.

Call sites stay as they are in PR 1:

- Home gallery preview
- `/gallery` empty state (`Website gallery in preparation`, published count 0)
- `/services/custom-nail-art`
- `/services/lashes`

Unit test continues to assert no `<img>`. Gallery page source continues to match `published.length === 0` and `Website gallery in preparation`.

### Files PR 1 is expected to touch

- `DECISIONS.md` (D-014 row)
- `app/page.tsx` (hero structure, single Book CTA, visually-hidden art sentence)
- `app/globals.css` (remove `.hero-art` blob rules; mobile hero stacking)
- `src/components/ui/studio-art.tsx` (new)
- `src/components/ui/media-fallback.tsx`
- `src/components/ui/ui.module.css`
- `src/components/ui/ui.test.tsx` and a StudioArt test
- `src/content/media-guard.test.ts` (new): public `app/`, `src/`, and `public/` must not reference `media-001`–`media-030` as image sources
- `e2e/post-rc-evidence.spec.ts` writing `docs/screenshots/post-rc/{mobile,tablet,desktop}-home.png` and `-gallery-fallback.png`
- `docs/screenshots/post-rc/` (new PNGs)

Do not edit `docs/source/media-manifest.json`. Do not copy manifest pixels into `public/`.

### Explicitly not in PR 1

- Book eyebrow rewrite (PR 2)
- Home section reorder / gallery demotion (PR 2)
- Netlify link, site ID, preview URL (PR 3)
- Entrance animation (PR 4 ships motion; PR 1 is static)
- `og:image` (PR 5)
- Any change to `BOOKING_MODE`, prices, published gallery items, analytics, or `approvedProductionOrigin`

## Steps 2–5 (plan-ready fidelity)

### Step 2 — Conversion storytelling

**Home narrative:** look (PR-1 art) → category chooser and service cards → contact. Keep verified lede, hours, address, review themes, and walk-in caveat.

**Section order on Home:**

1. Hero (art + H1 + one Book CTA; already from PR 1)
2. `Find a service category` chooser + service cards (this is the “look you have in mind” next step)
3. Visit / Knightsbridge card (verified address, hours, walk-in caveat, maps + Visit + Book)
4. Review themes (attributed, not quotations)
5. Hygiene callout (official statement only)
6. Gallery preview last: existing honest `MediaFallback` plus “Open the gallery page”. The empty state remains; it must not sit above the category chooser.

**Copy:** rearrange and restack existing `pageCopy` / `pageMetadata` strings. Do not add prices, durations, staff names, Matcha, extra locations, or review excerpts. If a heading changes, pin it to the same evidence class as the copy it restacks. The `/book` eyebrow change is UI chrome pinned to D-006 (`owner_confirmation`). Do not invent a new evidence class.

**`/book` eyebrow:** replace `Manual booking handoff` with `Contact the studio`. That string is UI chrome, not a business claim; pin the change to D-006. Keep H1 `Book or contact the studio`, keep `pageCopy.bookIntro` (no live availability, no confirmation), keep WhatsApp, phone, and walk-in. Do not add a form.

**CTA density:** Home hero stays at one in-flow Book (from PR 1). Do not reintroduce a second in-flow WhatsApp on Home. Sticky action bar, header, footer, and `/book` remain the WhatsApp surfaces. Primary Book links keep `bookingHref` with controlled `entryPoint`.

**Tests:** update any locator that still expects the old `/book` eyebrow; journeys from Home, Services, Gallery, and Visit still reach `/book`; axe still clean; claim denylist unchanged.

### Step 3 — Shareable noindex preview

**In git:**

- Add `.netlify/` to `.gitignore`.
- Extend `docs/runbooks/DEPLOYMENT.md`: Git-linked **preview** is authorized for this step; `netlify deploy --prod`, custom domain, DNS, and indexation flip remain forbidden until ODR-024.
- Record in `docs/runbooks/MANUAL_QA.md` that Lighthouse is run against the `*.netlify.app` preview URL after it exists, scores are written as observed, and no `lighthouse` package is added to CI. Until that URL exists, operators may still use local `npm run build && npm run start` as today.
- Keep `netlify.toml` build mapping (`command = "npm run build"`, `publish = ".next"`) and `X-Robots-Tag = "noindex, nofollow"` for `/*`. Do not add a production site ID, auth token, or `[[redirects]]` that invent `cjnailstudio.com`.

**Operator (outside git secrets):**

- `npx netlify login`, then `npx netlify link` if a site already exists for this repo, otherwise create a new Netlify site and link it. Use the operator’s Netlify and GitHub accounts.
- Enable Git-based deploy previews for PRs. Draft deploys are enough; production deploys are not.
- After the first successful preview, write the hostname into `docs/runbooks/MANUAL_QA.md` as “current preview host”, not as `approvedProductionOrigin`.

**Hard no:** `approvedProductionOrigin` stays `null`. Canonical tags stay relative. Sitemap stays empty. `/visit` stays noindex. Do not run `netlify deploy --prod`.

### Step 4 — Motion

Follow `docs/DESIGN_SYSTEM.md` Motion: 160ms standard, 220ms dialog, opacity and transform only.

**Add:**

- StudioArt/hero: a single 160ms opacity/transform **transition** using CSS `@starting-style` (opacity 0→1, translateY 8px→0), once on first paint, no loop, no JavaScript class toggle, no `@keyframes`. The existing global `prefers-reduced-motion` rule already forces `transition-duration: 0.01ms`.
- Buttons: press feedback via `transform: scale(0.98)` on `:active`, 160ms transition.
- Keep the existing native-dialog menu enter.

**Do not add:** parallax, scroll-linked animation, autoplay carousel, looping almond drift, new `@keyframes` (the busy spinner remains the only looping animation), smooth-scroll changes, or motion that is required to understand the UI.

**Reduced motion:** under `prefers-reduced-motion: reduce`, the new enter and press transitions do not run because they are transitions under the existing 0.01ms override. The page looks like the merged PR 1+2 UI. The busy spinner continues to opt out as it already does.

**Tests:** `e2e/motion.spec.ts` emulates reduced-motion and asserts the hero/art board does not use a running enter animation; axe still clean; gallery empty-state art uses the same transition rules as the hero, not a second animation system.

### Step 5 — Share card

**Asset:** `public/og/studio-share.png`, exactly 1200×630, original Almond-set motif (same strokes/tokens as PR 1). Export from a dedicated SVG (not a Playwright screenshot of the live page) and commit the PNG. Do not reuse a manifest JPEG.

**Metadata:** `createRouteMetadata` in `src/content/seo.ts` adds:

- `openGraph.images`: one image, `url` path `/og/studio-share.png`, `width` 1200, `height` 630, `alt` `Decorative studio artwork for Beauty Nail Studio by Cj; no customer image is used`
- `twitter.card`: `summary_large_image` (replaces `summary`)
- `twitter.images`: same path

Do not set `openGraph.url`. Do not set `metadataBase` to a production origin. Relative `/og/studio-share.png` is enough for a Netlify preview host; it is not a claim that a custom domain exists.

**JSON-LD:** `localBusinessJsonLd` still omits `image` / `logo` / `"url"`. The share card is Open Graph only.

**Tests:** invert the current `expect(route.openGraph?.images).toBeUndefined()` assertion; e2e checks `og:image` contains `/og/studio-share.png` and `twitter:card` is `summary_large_image`; robots remain noindex; `media-guard.test.ts` treats `public/og/studio-share.png` as original decoration, not `media-001`–`media-030`.

## Process

```text
spec review (this file)
  → writing-plans (only after the user approves this spec)
  → PR 1 branch from main → review vs origin/main → draft PR → merge if green
  → PR 2 branch from updated main → same gates
  → PR 3 → PR 4 → PR 5
```

- This spec PR (`codex/post-rc-spec`) is docs-only. It must not contain application feature code.
- `writing-plans` is the next skill after the user approves this file. Do not start PR 1 until that plan exists. `AGENTS.md` still requires implementation to follow an approved plan.
- Code review is `superpowers:requesting-code-review` against `origin/main` after each step, before merge.
- Draft PR first; un-draft only when the author is ready for merge review. Merge to `main` only with green `validate` and `e2e`.
- Next branch always from the merged `main`, not from the previous feature branch.

## Success criteria for step 1

PR 1 is complete only when all of the following are true:

1. On Playwright mobile Home, the first screen shows the Almond-set `StudioArt`, the H1, and the Book CTA together. The art is not below the fold.
2. Home hero has exactly one in-flow CTA, labeled `Book or contact the studio`, linking to the existing booking href with `entryPoint: "home"`.
3. Desktop Home still shows the same motif in the hero art column.
4. `MediaFallback` on Home, Gallery, Custom Nail Art, and Lashes uses `StudioArt variant="fallback"`. No call site still renders the three-span blob.
5. No `<img>` or `next/image` in `StudioArt` or `MediaFallback`. Gallery published count remains 0. Copy still says website gallery is in preparation.
6. No public file references `media-001` through `media-030` as a served image. `docs/source/media-manifest.json` is unchanged.
7. `DECISIONS.md` contains D-014 as specified above.
8. Forced-colors still expose the art frame. Adjacent text contrast is unchanged. Keyboard and focus rings are unchanged.
9. `prefers-reduced-motion` has no new entrance animation (PR 1 is static).
10. `npm run validate` and `npm run test:e2e` pass, including axe serious/critical on launch routes.
11. `docs/screenshots/post-rc/` contains regenerated mobile, tablet, and desktop Home and gallery-fallback PNGs. Milestone 6 screenshots are not overwritten.
12. Draft PR is reviewed against `origin/main` and GitHub Actions is green before merge.

## Out of scope (entire five-PR program)

- Live booking provider, hosted-redirect, embedded widget, slots, staff selection, deposits, or confirmation
- Prices, durations, add-ons, or a `/pricing` route
- Customer, model, or retained social photographs; any `media-manifest.json` publication
- Analytics destination, pixels, or enabling `AnalyticsPort`
- Custom production domain, DNS, `netlify deploy --prod`, or clearing noindex (ODR-024)
- Matcha café route, extra locations, team roster, review quotations
- Third-party webfonts, logo files, or TikTok
- Lighthouse as a CI dependency
- This spec is not a substitute for `writing-plans`; no feature work starts from this file alone
