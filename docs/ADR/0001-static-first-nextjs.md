# ADR-0001: Static-first Next.js foundation

- Status: Accepted
- Date: 2026-08-17
- Decision owners: Primary agent, informed by Specialist Agents 1–4

## Context

The phase-0 site is content-heavy and should pre-render for performance and local SEO. The approved architecture also anticipates a replaceable booking handoff, future isolated server routes/webhooks and strong TypeScript contracts. There is no approved CMS workflow, booking provider, database or production host.

## Decision

Use the current stable Next.js App Router release with strict TypeScript, React Server Components/static generation for public content, client components only for genuine interaction, CSS custom properties/modules, schema-validated repository content, Vitest unit/contract tests and Playwright critical-journey tests.

Use Node 24 for local/CI compatibility. Keep content schemas, canonical IDs, booking/analytics ports and behavior tests framework-neutral.

## Evaluation

| Option | Weighted specialist score | Decision |
| --- | ---: | --- |
| Next.js + TypeScript | 87.0 | Selected |
| Astro + TypeScript/islands | 83.4 | Strong fallback if the foundation spike shows unjustified runtime/client overhead |
| WordPress theme/headless | 60.8 | Rejected: no approved editor workflow; unnecessary admin/plugin/patch surface |
| Provider-specific site builder | Not scored | Rejected as default due content/SEO/booking coupling and exit risk |
| Custom scheduler/database | Out of phase | Rejected until operations/security/support requirements exist |

Next.js narrowly leads because it supports the static launch and a cohesive path to isolated server integration without a front-end migration. Astro remains deliberately viable.

## Validation required

The milestone-1 foundation must prove:

- static production build for representative routes;
- strict type checking and schema validation;
- responsive consent-safe media fallback;
- manual and fake-hosted adapters with invalid-origin/failure tests;
- no-JavaScript WhatsApp/phone links;
- accessibility coverage on `/book`;
- restrictive headers/CSP without a provider;
- a portable build artifact independent of a selected host.

If these fail materially, supersede this ADR with Astro rather than forcing the choice.

## Consequences

- Phase 0 needs no database or production API.
- Provider SDKs never enter page components.
- The site can add narrowly scoped server boundaries later.
- Framework upgrades require normal maintenance and reproducible lockfile checks.
- Future CMS/provider choices plug into validated repositories/adapters.

## References

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/guides/self-hosting
- https://playwright.dev/docs/intro
- https://vitest.dev/guide/
