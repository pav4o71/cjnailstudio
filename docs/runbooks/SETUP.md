# Setup and clean-install validation

Portable local path for Beauty Nail Studio by Cj. This does not select a production host, invent a domain, or require secrets.

## Prerequisites

- Node.js 24 or newer (`engines.node` in `package.json`)
- npm 11 (`packageManager` in `package.json`)
- Git
- Chromium for Playwright (`npx playwright install --with-deps chromium`)

Phase 0 does not need production credentials. Copy `.env.example` only if you want a local reminder that booking stays `manual-handoff`. Missing or invalid booking configuration must remain manual-handoff.

```
BOOKING_MODE=manual-handoff
```

Do not add live scheduler, payment, analytics-destination, or notification variables.

## Clean install

From a clone of this repository:

```bash
npm ci
npx playwright install --with-deps chromium
```

`npm ci` is the required lockfile install. Do not use `npm install` for release validation.

`npx playwright install --with-deps chromium` needs OS package privileges. If that step cannot use `sudo`, install Chromium with `npx playwright install chromium` when the browser is already present, then run `npm run test:e2e`.

## Validation gates

These match GitHub Actions in `.github/workflows/ci.yml`.

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

Or the combined script:

```bash
npm run validate
```

Then browser journeys:

```bash
npm run test:e2e
```

Playwright builds the production server on `127.0.0.1:3017` before the suite. Evidence screenshot tests write under `docs/screenshots/` locally and to the Playwright output directory in CI so CI does not fail on screenshot bytes.

## Local development

```bash
npm run dev
```

Use `npm run start` only after `npm run build`. Do not point a public hostname at a development server.

## Release validation note

Milestone 6 records a clean-install run of the commands above on `codex/milestone-6-release`. Production deployment remains separately authorized (ODR-024). Live scheduling and payments remain off (ODR-025).
