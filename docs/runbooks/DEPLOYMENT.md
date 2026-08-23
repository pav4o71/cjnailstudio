# Deployment runbook

Production origin is `https://cjnailstudio.netlify.app` (D-017 / ODR-024). DNS for that hostname is Netlify-managed. The accountable operator deploys with the Netlify CLI. Do not invent `cjnailstudio.com` or mutate a custom domain.

D-016 authorizes the Pavells embed only. First-party payments, notifications, analytics destinations, and production secrets stay off.

Do not store tokens in the repository. Do not commit `.netlify/`.

## Artifact

The production artifact is the Next.js App Router build:

```bash
npm ci
npm run validate
npm run test:e2e
npx netlify deploy --prod --build
```

`netlify.toml` records the portable Netlify mapping:

```toml
[build]
  command = "npm run build"
  publish = ".next"
```

Netlify detects Next.js and supplies the runtime. Preview and branch deploys stay `noindex`. See `INDEXATION.md`.

## Environment (non-secret)

Safe public configuration:

| Name | Required value until separately authorized |
| --- | --- |
| `BOOKING_MODE` | `embedded-widget` (rollback: `manual-handoff`) |

Do not set payment keys, analytics destinations, or webhook secrets. Invalid or missing booking configuration must fail closed to manual-handoff.

## Preview versus production

Production:

- Host: `https://cjnailstudio.netlify.app`
- Command: `npx netlify deploy --prod`
- Launch routes are indexable; deferred paths stay disallowed

Preview / branch / draft URLs (`*--*.netlify.app`):

- Keep `X-Robots-Tag: noindex, nofollow` via `netlify.toml` context headers and request-time `proxy.ts` when `Host` contains `--`
- Do not write a draft hostname as `approvedProductionOrigin`

Still forbidden:

- inventing `cjnailstudio.com` or attaching an unapproved custom domain
- DNS mutation outside Netlify's `*.netlify.app` zone
- analytics pixels (ODR-019)
- first-party payments or notifications

Operator login (outside git secrets):

```bash
npx netlify login
npx netlify link
```

## Rollback

See `ROLLBACK.md`. Restore the last known-good immutable deploy and smoke-test Home, Services, Book, Visit, and contact paths. Website rollback never deletes off-site WhatsApp, phone, or Pavells conversations.

Indexation rollback is `INDEXATION.md`.
