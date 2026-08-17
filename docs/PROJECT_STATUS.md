# Project Status

Last updated: 2026-08-17

## Current state

Milestones 1–6 are merged to `main`. Annotated tag `release-candidate` points at `8647cea9581e59ab6914a496d5aacf825a685117` (merge of PR [#6](https://github.com/pav4o71/cjnailstudio/pull/6)). That commit was smoke-tested locally (`npm ci`, format, lint, typecheck, 54 unit tests, production build, 165 Playwright checks with 6 intentional skips). GitHub Actions `validate` and `e2e` succeeded on PRs #2–#6 and on the corresponding `main` push runs.

**Production is not published.** ODR-024 and ODR-025 stay closed: no Netlify live deploy, no DNS/domain, no live booking provider, no payments, no analytics destination, and no indexation flip. The site remains `noindex, nofollow`. `/book` remains `manual-handoff` (WhatsApp, phone, walk-in). Do not treat the release-candidate tag as a go-live.

Milestone 1 was merged through PR #1 at `8f06d44acbff79d2418200e4e64afa98c22e73ec`.

Milestone 2 design system and site shell merged through PR [#2](https://github.com/pav4o71/cjnailstudio/pull/2) at `edb5efc69d16d08f07c49a3f8ba1375bd551d760`.

Milestone 3 evidence-backed public pages merged through PR [#3](https://github.com/pav4o71/cjnailstudio/pull/3) at `b7bc8d31151f8ae7cb63d8c85e89f208bc7154b5`. Launch routes from `docs/SITEMAP.md` are on `main`. Gallery is a consent-safe empty state. Deferred routes (`/matcha`, `/team`, extra locations, pricing) stay absent.

Milestone 4 booking-first UX merged through PR [#4](https://github.com/pav4o71/cjnailstudio/pull/4) at `b76d4e220c7c3af32fd7209914499171ec8e7f85`. `/book` keeps `manual-handoff` as the only production-eligible mode. The fake hosted adapter exists for tests only and cannot be selected by production config.

Milestone 5 SEO, no-op analytics and security hardening merged through PR [#5](https://github.com/pav4o71/cjnailstudio/pull/5) at `f188ae5db99ce9643d4160c854eba44a7bb2b55b`. Robots/sitemap stay non-indexable until ODR-024 approves a production origin. Analytics remains a no-op with no destination.

Milestone 6 release readiness merged through PR [#6](https://github.com/pav4o71/cjnailstudio/pull/6) at `8647cea9581e59ab6914a496d5aacf825a685117`. Clean-install validation, Playwright journeys, evidence screenshots, and portable runbooks are on `main`. Production deployment remains separately authorized.

GitHub issue creation is currently blocked: the connected GitHub app returns HTTP 403 for Issues. Issue links remain pending until GitHub Issues authorization is repaired.

## Milestones

| Milestone | Issue | Branch | PR | Status |
| --- | --- | --- | --- | --- |
| 1 — Research, architecture, foundation and CI | Blocked by GitHub Issues permission | `codex/milestone-1-foundation` | [#1](https://github.com/pav4o71/cjnailstudio/pull/1) | Merged; CI green |
| 2 — Design system, shell and components | Blocked by GitHub Issues permission | `codex/milestone-2-design-system` | [#2](https://github.com/pav4o71/cjnailstudio/pull/2) | Merged at `edb5efc`; CI green |
| 3 — Evidence-backed pages and content | Blocked by GitHub Issues permission | `codex/milestone-3-pages-content` | [#3](https://github.com/pav4o71/cjnailstudio/pull/3) | Merged at `b7bc8d3`; CI green |
| 4 — Booking-first UX and adapter | Blocked by GitHub Issues permission | `codex/milestone-4-booking` | [#4](https://github.com/pav4o71/cjnailstudio/pull/4) | Merged at `b76d4e2`; CI green |
| 5 — SEO, analytics, accessibility, privacy and security | Blocked by GitHub Issues permission | `codex/milestone-5-quality` | [#5](https://github.com/pav4o71/cjnailstudio/pull/5) | Merged at `f188ae5`; CI green |
| 6 — QA, performance and deployment readiness | Blocked by GitHub Issues permission | `codex/milestone-6-release` | [#6](https://github.com/pav4o71/cjnailstudio/pull/6) | Merged at `8647cea`; tagged `release-candidate`; not production-published |

## External blockers

1. GitHub Issues and connector write authorization remain blocked.
2. Owner decisions in `docs/OWNER_DECISIONS_REQUIRED.md` block live scheduling, payments, automated notifications and consent-dependent media.
3. Production deployment and domain changes require explicit authorization and credentials (ODR-024). The `release-candidate` tag is not that authorization.
