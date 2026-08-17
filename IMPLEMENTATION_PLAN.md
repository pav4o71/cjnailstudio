# Implementation Plan

Status: APPROVED

The primary agent owns integration and merge readiness. Each milestone has one subsystem owner at a time. Shared decisions update `DECISIONS.md` and affected acceptance tests.

## Milestone 1 — research, architecture, foundation and CI

- Preserve evidence and specialist reports.
- Adopt final strategy, content model, sitemap, media plan, booking architecture and stack ADR.
- Scaffold the typed static-first application, schemas, manual booking contract, no-op analytics and CI.
- Verify clean install, format, lint, type check, unit tests and production build.

Exit: decision-complete docs, foundation tests green, reviewed PR merged, smoke-tested and tagged `checkpoint/milestone-1`.

## Milestone 2 — design system and shell

- Implement tokens, typography fallbacks, header/menu/footer/mobile CTA and reusable component states.
- Add responsive/keyboard/accessibility tests and screenshots.

Exit: mobile/tablet/desktop shell and states verified; reviewed PR merged, smoked and tagged.

## Milestone 3 — pages and evidence-backed content

- Implement Home, Services children, Gallery fallback/data model, Studio, Visit, FAQ and public route content.
- Add metadata/claim/media traceability tests for implemented pages.

Exit: no invented claim or unapproved media; route/browser tests and visual evidence pass; reviewed PR merged/tagged.

## Milestone 4 — booking-first UX

- Implement `/book`, controlled intents, `ManualHandoffAdapter` and fake hosted adapter for tests only.
- Cover loading/unavailable/error/return states, no-JS links and URL security.

Exit: no false confirmation or provider activation; critical handoff/failure tests pass; reviewed PR merged/tagged.

## Milestone 5 — SEO, analytics prep, accessibility, privacy and security

- Finalize metadata, Open Graph, sitemap, robots and verified structured data.
- Implement no-op fixed analytics taxonomy.
- Harden accessibility, security headers, privacy/terms-as-implemented and repository scans.

Exit: SEO/security/accessibility audits clean; reviewed PR merged/tagged.

## Milestone 6 — full QA and release readiness

- Run full clean-install validation and Playwright journeys.
- Inspect mobile/tablet/desktop important pages/states and capture screenshots.
- Optimize performance and finish setup, deployment, rollback and maintenance docs.
- Produce final report and release candidate.

Exit: all required PR/CI/review gates green, main smoke-tested, tag `release-candidate` created. Production deployment remains separately authorized.

## Rollback

1. Booking capability: set validated mode to `manual-handoff` and smoke-test contact paths.
2. Content/media: unpublish by stable ID and render the designed fallback.
3. Release: restore last known-good artifact and smoke-test Home, Services, Book, Visit and contact.
4. Post-merge failure: revert or issue an immediate corrective PR before the next milestone.
