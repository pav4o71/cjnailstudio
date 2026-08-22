# Rollback runbook

Matches `IMPLEMENTATION_PLAN.md` and `docs/ARCHITECTURE.md`. Website rollback does not cancel Pavells appointments.

## 1. Booking capability

Restore `BOOKING_MODE=manual-handoff`.

Smoke-test:

- `/book` heading "Book or contact the studio"
- WhatsApp `https://wa.me/639617400664`
- Call `tel:+639617400664`
- Visit/walk-in path `/visit`
- Untrusted `status=confirmed` does not show an appointment confirmation
- With default `embedded-widget`, `#pavells-booking` is present; after rollback it is absent

Production config cannot select the test-only fake hosted adapter.

## 2. Content and media

Unpublish by stable gallery/content ID. The designed consent-safe fallback must render (current published gallery count is zero). Do not restore uncleared customer imagery.

## 3. Release artifact

Restore the last known-good immutable host artifact (previous successful deploy or tagged git revision after that revision exists on `main`). Then smoke-test:

- Home
- Services
- Book (Pavells panel plus contact fallbacks, or manual handoff after rollback)
- Visit (address, hours, directions, Book)
- WhatsApp and phone links

## 4. Indexation

If an indexation flip is in doubt, restore fail-closed noindex:

- `src/content/seo.ts` `approvedProductionOrigin = null` and `robotsPolicy.index = false`
- `app/robots.ts` `disallow: "/"`
- empty `sitemapEntries()`
- `X-Robots-Tag: noindex, nofollow` in `src/security/headers.ts` and `netlify.toml`

See `INDEXATION.md`.

## 5. Post-merge failure

Revert or open an immediate corrective PR before the next milestone. Do not skip review gates. Do not force-push `main`.
