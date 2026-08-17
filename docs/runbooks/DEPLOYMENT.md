# Deployment runbook

Portable artifacts only. This file does not authorize a production deploy, DNS change, or credential.

ODR-024 still owns production host, domain, DNS, credentials, deployment approval, and the accountable operator. ODR-025 still owns live scheduling, payments, notifications, and production secrets.

Do not run `netlify deploy --prod`, mutate DNS, or store tokens in the repository.

## Artifact

The production artifact is the Next.js App Router build:

```bash
npm ci
npm run build
```

`netlify.toml` records the portable Netlify mapping:

```toml
[build]
  command = "npm run build"
  publish = ".next"
```

Netlify detects Next.js and supplies the runtime. Do not add a production site ID, account token, or custom domain in this repository.

## Environment (non-secret)

Safe public configuration:

| Name | Required value until separately authorized |
| --- | --- |
| `BOOKING_MODE` | `manual-handoff` |

Do not set hosted booking URLs, payment keys, analytics destinations, or webhook secrets. Invalid or missing booking configuration must fail closed to manual-handoff.

## Preview versus production

Until ODR-024:

- Keep every deploy non-indexable (`X-Robots-Tag`, meta robots, `robots.txt` disallow `/`, empty sitemap). See `INDEXATION.md`.
- Treat Git branch deploys and draft-site URLs as previews.
- Do not attach a custom domain or request search-engine indexing.

Git-linked **preview** deploys are authorized for post-RC sharing (`*.netlify.app`). Draft and pull-request deploys are enough.

Still forbidden until ODR-024 is written and approved:

- `netlify deploy --prod`
- custom domain / DNS
- setting `approvedProductionOrigin`
- clearing `noindex` (follow `INDEXATION.md` first)

If an operator links Git to Netlify, use Git-based deploys so preview PRs stay separate from production. CLI `netlify deploy` without `--prod` is a preview only.

Operator login (outside git secrets):

```bash
npx netlify login
npx netlify sites:create
npx netlify link
```

If a site already exists for this repo, skip `sites:create` and run `npx netlify link` only.

After the first successful preview, record the hostname in `MANUAL_QA.md` as “current preview host”, never as a production origin. Do not commit `.netlify/` (gitignored) or a site ID.

## Rollback

See `ROLLBACK.md`. Restore the last known-good immutable deploy and smoke-test Home, Services, Book, Visit, and contact paths. Website rollback never deletes off-site WhatsApp or phone conversations.

## After a future authorized production attach

1. Confirm ODR-024 (host/domain/DNS/operator) in writing.
2. Confirm ODR-025 remains closed unless live scheduling/payments are separately approved.
3. Follow `INDEXATION.md` before allowing indexation.
4. Keep `BOOKING_MODE=manual-handoff` unless a later owner decision replaces it.
5. Store credentials in the host's secret store, never in git.
