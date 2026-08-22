# ODR-024 indexation flip checklist

Owner decision D-017 records the production origin as `https://cjnailstudio.netlify.app`. Do not invent `cjnailstudio.com`. Deploy-preview and branch-deploy hosts stay non-indexable.

## Current production controls (D-017)

| Control | Production behavior | File |
| --- | --- | --- |
| Production origin | `https://cjnailstudio.netlify.app` | `src/content/production-origin.ts` |
| Meta robots | `index: true`, `follow: true` on launch routes | `src/content/seo.ts` `robotsPolicy` / `createRouteMetadata` |
| `robots.txt` | `Allow: /`; disallow deferred paths; Sitemap + Host | `app/robots.ts` |
| Sitemap | `launchSitemapPaths` against the approved origin, including `/visit` | `app/sitemap.ts` + `sitemapEntries()` |
| `X-Robots-Tag` | omitted on the production surface | `src/security/headers.ts` |
| Netlify CDN header | `noindex, nofollow` on deploy-preview and branch-deploy only | `netlify.toml` |
| Visit assertion | `/visit` is indexable in production e2e | `e2e/seo.spec.ts` |

The sitemap still omits deferred routes (`/matcha`, `/team`, `/reviews`, `/pricing`, `/beacon-tower`). Analytics remains no-op (ODR-019).

## Rollback to fail-closed

If indexation must be withdrawn:

1. Set `approvedProductionOrigin = null` in `src/content/production-origin.ts` and `robotsPolicy.index = false` in `src/content/seo.ts`.
2. Restore `app/robots.ts` to `Disallow: /` with no Sitemap URL.
3. Keep `sitemapEntries()` empty.
4. Send `X-Robots-Tag: noindex, nofollow` from `src/security/headers.ts` and a global `netlify.toml` `[[headers]]` rule.
5. Invert `e2e/seo.spec.ts` back to noindex / empty sitemap.
6. Re-run `npm run validate` and `npm run test:e2e`.

## Flip record

Completed 22 August 2026 under D-017 / ODR-024:

1. **Owner decision:** HTTPS origin `https://cjnailstudio.netlify.app`; DNS owner is Netlify for `*.netlify.app`; deploy operator is the site owner via Netlify CLI.
2. **`approvedProductionOrigin`:** set in `src/content/production-origin.ts`. Not a preview hostname (`*--*.netlify.app`) and not an invented custom domain.
3. **`robots.txt`:** allow `/`; disallow deferred paths; Sitemap line to the approved origin.
4. **Sitemap:** emit only `launchSitemapPaths`, including `/visit`.
5. **Meta robots:** index/follow for public launch pages.
6. **`X-Robots-Tag`:** omitted when `CONTEXT` is not preview/branch and the deploy URL has no `--`.
7. **`netlify.toml`:** noindex only on `deploy-preview` and `branch-deploy`.
8. **Canonicals:** absolute URLs on the approved origin.
9. **JSON-LD:** NailSalon verified facts plus `url` set to the approved origin. No ratings, prices, extra locations, or `cjnailstudio.com`.
10. **E2E:** production artifact (`next start`) expects indexable `/visit`, sitemap locs, and no production `X-Robots-Tag: noindex`. Preview/branch noindex stays covered by unit tests.
11. **Analytics:** still no-op until ODR-019.
12. **Re-run:** `npm run validate`, `npm run test:e2e`, then `npx netlify deploy --prod`.
