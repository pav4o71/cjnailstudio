# Project Status

Last updated: 2026-08-17

## Current state

Milestone 1 was merged through PR #1 at `8f06d44acbff79d2418200e4e64afa98c22e73ec`. The source package and Codex Build Pack are preserved locally, all four specialist reports have been reconciled, and the validated foundation is on `main`.

Local Milestone 1 evidence is green: formatting, lint, strict TypeScript, 6 unit tests, the Next.js production build, and 18 Playwright checks across mobile, tablet and desktop. The browser suite also found no serious or critical automated accessibility violations on the five implemented routes. GitHub Actions CI run #3 completed successfully. The requested external `@codex review` produced no findings because the repository's automated review bot is not enabled; the required local review against `main` found no actionable defects.

Milestone 2 is on draft PR [#2](https://github.com/pav4o71/cjnailstudio/pull/2) (`codex/milestone-2-design-system`, HEAD `f76ac28`). Review verdict was ready to merge when CI is green; GitHub Actions checks `validate` and `e2e` passed on that PR.

Milestone 3 page content is implemented on `codex/milestone-3-pages-content` (not merged). Draft PR [#3](https://github.com/pav4o71/cjnailstudio/pull/3) is stacked on Milestone 2 (`codex/milestone-2-design-system`), not `main`. Launch routes from `docs/SITEMAP.md` now have evidence-backed pages. Gallery is a consent-safe empty state. Deferred routes (`/matcha`, `/team`, extra locations, pricing) stay absent. Claim/media tests were hardened on that branch. Do not treat Milestone 3 as complete until review and CI on PR #3 are green, and do not merge it while PR #2 is the Milestone 2 vehicle.

Milestone 4 booking-first UX is implemented on `codex/milestone-4-booking` (not merged). `/book` keeps `manual-handoff` as the only production-eligible mode. Controlled intents, loading/unavailable/error/return states, no-JS contact links and URL security are covered. The fake hosted adapter exists for tests only and cannot be selected by production config, including `BOOKING_MODE=hosted-redirect`. No live scheduler, payments, notifications or false appointment confirmation were added.

GitHub issue creation is currently blocked: the connected GitHub app returns HTTP 403 for Issues, and the local `gh` session is invalid. Git pushes work, and PRs can be managed through the signed-in browser fallback. Issue links remain pending until GitHub authorization is repaired; this does not relax the required review gates.

## Milestones

| Milestone | Issue | Branch | PR | Status |
| --- | --- | --- | --- | --- |
| 1 — Research, architecture, foundation and CI | Blocked by GitHub Issues permission | `codex/milestone-1-foundation` | [#1](https://github.com/pav4o71/cjnailstudio/pull/1) | Merged; CI green |
| 2 — Design system, shell and components | Blocked by GitHub Issues permission | `codex/milestone-2-design-system` | [#2](https://github.com/pav4o71/cjnailstudio/pull/2) (draft) | Review passed; CI green |
| 3 — Evidence-backed pages and content | Blocked by GitHub Issues permission | `codex/milestone-3-pages-content` | [#3](https://github.com/pav4o71/cjnailstudio/pull/3) (draft, stacked on M2) | Implemented; not merged |
| 4 — Booking-first UX and adapter | Blocked by GitHub Issues permission | `codex/milestone-4-booking` | Pending | Implemented on branch; not merged |
| 5 — SEO, analytics, accessibility, privacy and security | Blocked by GitHub Issues permission | `codex/milestone-5-quality` | Pending | Not started |
| 6 — QA, performance and deployment readiness | Blocked by GitHub Issues permission | `codex/milestone-6-release` | Pending | Not started |

## External blockers

1. GitHub Issues and connector write authorization remain blocked; GitHub browser fallback is required for comments and PR state changes.
2. Owner decisions in `docs/OWNER_DECISIONS_REQUIRED.md` block live scheduling, payments, automated notifications and consent-dependent media.
3. Production deployment and domain changes require explicit authorization and credentials.
