# Maintenance runbook

Ongoing work after Milestone 6 release readiness. This is not a production-launch authorization.

## Content

- Public facts stay in validated records (`src/content/site.ts`, page copy, gallery schema).
- Every public claim needs an allowed source ID or owner decision.
- Do not invent prices, durations, deposits, payment methods, staff schedules, Matcha operations, extra locations, or policies.
- Gallery publishes only D-015 owner-cleared `/media/` photographs. Retained social `media-001`–`media-030` stay blocked (D-010). Later assets still need per-item clearance (ODR-011).

## Capabilities that stay off

| Gate | Keep off until |
| --- | --- |
| Live scheduling / payments / notifications / production secrets | ODR-025 |
| Analytics destination | ODR-019 |
| Indexation and production domain | ODR-024 |
| Hosted booking adapter in production config | ODR-008 and ODR-025 |

`AnalyticsPort` stays no-op with the fixed event allowlist. Navigation must not depend on telemetry.

## Tooling

- Install with `npm ci` from the lockfile.
- Do not add large dependencies for QA. Lighthouse stays a manual/operator checklist (`MANUAL_QA.md`).
- After content or shell changes, regenerate milestone evidence screenshots locally with the matching `e2e/*-evidence.spec.ts` file. CI must not fail on screenshot byte diffs.

## Security and privacy

- No secrets in the repository, client bundle, logs, or screenshots.
- Keep HSTS, CSP `connect-src 'self'`, anti-framing, and `X-Robots-Tag` until an approved indexation change.
- Privacy and terms pages must match implemented behavior (no first-party booking form, no-op analytics).

## GitHub

ODR-023: GitHub Issues creation may be blocked. Do not invent issue links. Do not merge stacked milestone PRs from this runbook. Review and merge remain owner/parent gates.
