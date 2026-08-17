# Project Status

Last updated: 2026-08-17

## Current state

Milestone 1 is validated on `codex/milestone-1-foundation` and is being packaged for review. The source package and Codex Build Pack are preserved locally, all four specialist reports have been reconciled, and the minimal `main` bootstrap commit has been pushed.

Local Milestone 1 evidence is green: formatting, lint, strict TypeScript, 6 unit tests, the Next.js production build, and 18 Playwright checks across mobile, tablet and desktop. The browser suite also found no serious or critical automated accessibility violations on the five implemented routes.

GitHub issue creation is currently blocked: the connected GitHub app returns HTTP 403 for Issues, and the local `gh` session is invalid. Git pushes work. Issue and PR links remain pending until GitHub authorization is repaired; this does not relax the required review gates.

## Milestones

| Milestone | Issue | Branch | PR | Status |
| --- | --- | --- | --- | --- |
| 1 — Research, architecture, foundation and CI | Blocked by GitHub Issues permission | `codex/milestone-1-foundation` | Pending | Locally validated |
| 2 — Design system, shell and components | Blocked by GitHub Issues permission | `codex/milestone-2-design-system` | Pending | Not started |
| 3 — Evidence-backed pages and content | Blocked by GitHub Issues permission | `codex/milestone-3-pages-content` | Pending | Not started |
| 4 — Booking-first UX and adapter | Blocked by GitHub Issues permission | `codex/milestone-4-booking` | Pending | Not started |
| 5 — SEO, analytics, accessibility, privacy and security | Blocked by GitHub Issues permission | `codex/milestone-5-quality` | Pending | Not started |
| 6 — QA, performance and deployment readiness | Blocked by GitHub Issues permission | `codex/milestone-6-release` | Pending | Not started |

## External blockers

1. GitHub Issues/PR workflow authorization must be repaired before milestone review/merge can be completed.
2. Owner decisions in `docs/OWNER_DECISIONS_REQUIRED.md` block live scheduling, payments, automated notifications and consent-dependent media.
3. Production deployment and domain changes require explicit authorization and credentials.
