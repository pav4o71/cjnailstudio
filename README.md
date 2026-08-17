# Beauty Nail Studio by Cj

Production website for Beauty Nail Studio by Cj, built from the project's evidence-backed source package.

Implementation is organized into six reviewable milestones. See `docs/PROJECT_STATUS.md` for current status and `docs/OWNER_DECISIONS_REQUIRED.md` for business decisions that remain intentionally unconfigured.

## Setup

See `docs/runbooks/SETUP.md` for the clean-install validation path (`npm ci`, format, lint, typecheck, unit tests, production build, Playwright).

```bash
npm ci
npx playwright install --with-deps chromium
npm run validate
npm run test:e2e
```

Local development: `npm run dev`. Booking stays `manual-handoff`. The site stays non-indexable until ODR-024.

## Operations

| Topic                                                            | Document                             |
| ---------------------------------------------------------------- | ------------------------------------ |
| Deployment (portable; no production credentials)                 | `docs/runbooks/DEPLOYMENT.md`        |
| Rollback                                                         | `docs/runbooks/ROLLBACK.md`          |
| Maintenance                                                      | `docs/runbooks/MAINTENANCE.md`       |
| Indexation flip (ODR-024)                                        | `docs/runbooks/INDEXATION.md`        |
| Manual QA / Lighthouse                                           | `docs/runbooks/MANUAL_QA.md`         |
| `release-candidate` tag (on `main`; not a production publish)    | `docs/runbooks/RELEASE_CANDIDATE.md` |

Production deployment, custom domain, live scheduling, payments, and analytics destinations are owner-gated. This repository does not ship those capabilities.
