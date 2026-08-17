# Manual QA and performance checklist

Automated gates are `npm run validate` and `npm run test:e2e` after `npm ci`. This page covers checks that stay operator/manual so the repository does not add Lighthouse or visual-regression dependencies.

Do not fail CI on screenshot diffs. Milestone evidence PNGs are regenerated locally by the `e2e/*-evidence.spec.ts` files.

## Viewports

Inspect at 320, 375, 768, 1024, and 1440 CSS px (ACCEPTANCE_TESTS P0-13). Playwright projects cover mobile, tablet, and desktop chromium.

Confirm:

- Primary Book CTA is one activation from Home, Services, Custom Nail Art, Lashes, Gallery fallback, and Visit
- No CTA or main copy is clipped or covered
- Targets stay at least 44×44 px
- Reduced-motion and forced-colors still expose text and focus

## Keyboard and no-JS

- Tab through header, Book CTA, footer, and `/book` contact links
- Mobile/tablet menu: Enter opens, Escape closes, focus returns to the Menu button
- With JavaScript disabled, WhatsApp, tel, Visit, and primary nav remain usable

## Booking states

On `/book`:

| State | How to open | Must show | Must not show |
| --- | --- | --- | --- |
| Manual | `/book` | WhatsApp, call, walk-in/Visit | Appointment confirmation |
| Unavailable | `/book?status=unavailable` | Contact fallbacks | Live slots |
| Error | `/book?status=timeout` | Contact fallbacks | Prices or policy |
| Untrusted return | `/book?status=confirmed` | Neutral “cannot confirm” | Appointment ID, confirmation |

Loading is the Next.js `app/book/loading.tsx` fallback and is covered by component tests. It is not a stable URL.

## Gallery

Current published count is zero. Confirm the consent-safe fallback, Instagram profile link, and Book handoff. There is no filter UI to clear until published items exist.

## Lighthouse (optional, operator machine)

If Chrome Lighthouse is available, run it against the **current preview host** (`*.netlify.app`) after Git is linked, or against `npm run build && npm run start` until that URL exists. Do not add `lighthouse` or `@netlify/plugin-lighthouse` to this repository.

**Current preview host:** `https://6a82ad69563075bdcaf6fff3--cjnailstudio.netlify.app` (draft deploy of Netlify project `cjnailstudio`; GitHub is not connected for PR previews yet). Local CLI is linked; `.netlify/` stays gitignored. Do not write this host as `approvedProductionOrigin`. Do not run `netlify deploy --prod`. To enable PR deploy previews, connect this GitHub repo in the Netlify project without treating a main-branch publish as production go-live.

Record, do not invent, scores. Expected intentional SEO warnings while ODR-024 is closed:

- `noindex` / robots disallow
- empty sitemap
- no production canonical host

Performance notes already in the app:

- No retained customer images; no social-CDN hotlink
- CSS hero fallback instead of a large LCP photograph
- No analytics or booking SDKs
- Static-first App Router pages

Accessibility: Playwright axe already fails the suite on serious/critical first-party violations. Manual screen-reader, zoom, reflow, and focus-visible checks remain operator-owned (P0-12).

## Contact smoke

- WhatsApp `https://wa.me/639617400664`
- Phone `tel:+639617400664`
- Email `thenailstudiobycj@gmail.com`
- Maps search uses the canonical Knightsbridge address only
