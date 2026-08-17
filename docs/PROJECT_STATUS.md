# Project Status

Last updated: 2026-08-17

## Current state

Milestone 1 was merged through PR #1 at `8f06d44acbff79d2418200e4e64afa98c22e73ec`. The source package and Codex Build Pack are preserved locally, all four specialist reports have been reconciled, and the validated foundation is on `main`.

Local Milestone 1 evidence is green: formatting, lint, strict TypeScript, 6 unit tests, the Next.js production build, and 18 Playwright checks across mobile, tablet and desktop. The browser suite also found no serious or critical automated accessibility violations on the five implemented routes. GitHub Actions CI run #3 completed successfully. The requested external `@codex review` produced no findings because the repository's automated review bot is not enabled; the required local review against `main` found no actionable defects.

Milestone 2 is on draft PR [#2](https://github.com/pav4o71/cjnailstudio/pull/2) (`codex/milestone-2-design-system`, HEAD `f76ac28`). Review verdict was ready to merge when CI is green; GitHub Actions checks `validate` and `e2e` passed on that PR.

Milestone 3 page content is implemented on `codex/milestone-3-pages-content` (not merged). Draft PR [#3](https://github.com/pav4o71/cjnailstudio/pull/3) is stacked on Milestone 2 (`codex/milestone-2-design-system`), not `main`. Launch routes from `docs/SITEMAP.md` now have evidence-backed pages. Gallery is a consent-safe empty state. Deferred routes (`/matcha`, `/team`, extra locations, pricing) stay absent. Claim/media tests were hardened on that branch. Do not treat Milestone 3 as complete until review and CI on PR #3 are green, and do not merge it while PR #2 is the Milestone 2 vehicle.

Milestone 4 booking-first UX is implemented on `codex/milestone-4-booking` (not merged). Draft PR [#4](https://github.com/pav4o71/cjnailstudio/pull/4) is stacked on Milestone 3 (`codex/milestone-3-pages-content`), not `main`. `/book` keeps `manual-handoff` as the only production-eligible mode. Controlled intents, loading/unavailable/error/return states, no-JS contact links and URL security are covered. The fake hosted adapter exists for tests only and cannot be selected by production config, including `BOOKING_MODE=hosted-redirect`. No live scheduler, payments, notifications or false appointment confirmation were added.

Milestone 5 SEO, no-op analytics and security hardening is implemented on `codex/milestone-5-quality` (not merged). Draft PR [#5](https://github.com/pav4o71/cjnailstudio/pull/5) is stacked on Milestone 4 (`codex/milestone-4-booking`), not `main`. Launch routes have unique titles, descriptions, Open Graph tags and relative canonicals. Robots/sitemap stay non-indexable until ODR-024 approves a production origin. JSON-LD is a verified NailSalon record only. Analytics remains a no-op with a fixed event allowlist and no destination. Security headers now include HSTS and `X-Robots-Tag: noindex, nofollow`. Do not merge it while PRs #4/#3/#2 remain the stacked vehicles.

Milestone 6 release readiness is implemented on `codex/milestone-6-release` (not merged, no PR until parent review). Clean-install validation, Playwright journeys, mobile/tablet/desktop evidence screenshots, and portable setup/deploy/rollback/maintenance/indexation runbooks are on the branch. `main` is not tagged `release-candidate` because Milestones 2–5 are not merged. Production deployment remains separately authorized. Do not treat Milestone 6 as a production launch.

GitHub issue creation is currently blocked: the connected GitHub app returns HTTP 403 for Issues. Git pushes and draft PRs work through `gh`. Issue links remain pending until GitHub Issues authorization is repaired; this does not relax the required review gates.

## Milestones

| Milestone | Issue | Branch | PR | Status |
| --- | --- | --- | --- | --- |
| 1 — Research, architecture, foundation and CI | Blocked by GitHub Issues permission | `codex/milestone-1-foundation` | [#1](https://github.com/pav4o71/cjnailstudio/pull/1) | Merged; CI green |
| 2 — Design system, shell and components | Blocked by GitHub Issues permission | `codex/milestone-2-design-system` | [#2](https://github.com/pav4o71/cjnailstudio/pull/2) (draft) | Review passed; CI green |
| 3 — Evidence-backed pages and content | Blocked by GitHub Issues permission | `codex/milestone-3-pages-content` | [#3](https://github.com/pav4o71/cjnailstudio/pull/3) (draft, stacked on M2) | Implemented; not merged |
| 4 — Booking-first UX and adapter | Blocked by GitHub Issues permission | `codex/milestone-4-booking` | [#4](https://github.com/pav4o71/cjnailstudio/pull/4) (draft, stacked on M3) | Implemented; not merged |
| 5 — SEO, analytics, accessibility, privacy and security | Blocked by GitHub Issues permission | `codex/milestone-5-quality` | [#5](https://github.com/pav4o71/cjnailstudio/pull/5) (draft, stacked on M4) | Implemented; not merged |
| 6 — QA, performance and deployment readiness | Blocked by GitHub Issues permission | `codex/milestone-6-release` | Pending parent review | Implemented on branch; not merged; no production launch |

## External blockers

1. GitHub Issues and connector write authorization remain blocked; GitHub browser fallback is required for comments and PR state changes.
2. Owner decisions in `docs/OWNER_DECISIONS_REQUIRED.md` block live scheduling, payments, automated notifications and consent-dependent media.
3. Production deployment and domain changes require explicit authorization and credentials.
