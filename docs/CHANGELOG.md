# Changelog

All notable project changes are recorded here. Milestone merge commits and tags will be added as they are verified.

## Unreleased

### Added

- Minimal GitHub `main` bootstrap.
- Repository-root Codex Build Pack and active `AGENTS.md`.
- Preserved source-of-truth research, structured dataset, media manifest, strategy templates and specialist briefs under `docs/source/`.
- Owner-decision register and milestone status tracking.
- Four specialist reports and an integrated strategy, sitemap, content inventory, visual system, media plan, architecture, booking design and ADR.
- Static-first Next.js foundation with Zod-validated facts, a manual booking adapter, no-op analytics port and launch-safe fallback pages.
- Pinned toolchain, strict TypeScript, ESLint, Prettier, Vitest, Playwright and GitHub Actions validation.
- Responsive header, native-dialog mobile menu, footer and fixed mobile booking actions.
- Approved color, typography, spacing, focus, motion and forced-color design tokens.
- Reusable section-intro, service-card, status-callout and consent-safe media-fallback components.
- Regenerable mobile, tablet and desktop Milestone 2 screenshots from the production server.
- Evidence-backed Home, Services, Custom Nail Art, Lashes, Gallery, Studio, Visit, FAQ, Privacy and Terms pages.
- Gallery item schema with blocked planning assets and an honest empty published state.
- Unique page metadata, claim/media traceability tests and Playwright coverage for launch and deferred routes.

### Changed

- Header, menu, footer and action bar now follow the approved compact sitemap, including honest links to unbuilt Milestone 3 routes.
- Book/WhatsApp action bar is shown for the same `64rem` range as the hamburger so tablet does not lose a persistent Book CTA.
- `/book` walk-in copy uses an info callout: walk-ins are welcome, availability is not guaranteed, and visit details live on `/visit`.
- Public pages now render from a validated content layer with source IDs; unknown prices, policies, Matcha, extra locations and uncleared photos stay omitted.

### Validated

- Formatting, lint, strict type checking and production build pass.
- 20 unit and component tests pass.
- 102 Playwright checks pass across mobile, tablet and desktop; 6 intentional skips are the hamburger/no-JS tests on desktop and the 64rem breakpoint probe on mobile/tablet. The suite includes serious/critical axe checks on 11 launch routes × 3 viewports, plus the open mobile/tablet menu.
- GitHub Actions CI run #3 passes on merged PR #1; Milestone 2 PR #2 `validate` and `e2e` checks passed. Milestone 3 is implemented on branch and is not merged.

### Security

- No credentials, customer data or production integrations added.
- Retained social media remains planning evidence only and is not approved for publication.
