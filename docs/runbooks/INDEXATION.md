# ODR-024 indexation flip checklist

Fail-closed until the owner approves a production host, domain, DNS, credentials, deployment, and accountable operator.

Do not invent `cjnailstudio.com` or any other production origin. `approvedProductionOrigin` is `null`. `/visit` must stay non-indexable in e2e until this checklist is completed under ODR-024.

## Current fail-closed controls

| Control | Current safe behavior | File |
| --- | --- | --- |
| Production origin | `null`; no absolute canonical host | `src/content/seo.ts` |
| Meta robots | `index: false`, `follow: false` | `src/content/seo.ts` `robotsPolicy` / `createRouteMetadata` |
| `robots.txt` | `Disallow: /`; no Sitemap URL | `app/robots.ts` |
| Sitemap | empty; no `<loc>` / `<url>` | `app/sitemap.ts` + `sitemapEntries()` |
| `X-Robots-Tag` | `noindex, nofollow` on all responses | `src/security/headers.ts` |
| Netlify CDN header | `X-Robots-Tag = "noindex, nofollow"` | `netlify.toml` |
| Visit assertion | `/visit` response and meta stay noindex | `e2e/seo.spec.ts` |

The sitemap also omits deferred routes (`/matcha`, `/team`, `/reviews`, `/pricing`, `/beacon-tower`). `/visit` is a launch route but is still absent from the empty sitemap on purpose.

## Flip only after ODR-024

Complete every row. Do not index previews.

1. **Owner decision:** record the approved HTTPS origin, DNS owner, and deploy operator. Update `docs/OWNER_DECISIONS_REQUIRED.md` / `DECISIONS.md`.
2. **`approvedProductionOrigin`:** set the approved origin in `src/content/seo.ts`. Never use an example or preview hostname.
3. **`robots.txt`:** allow launch routes only; add a `Sitemap:` line to the approved origin. Keep deferred paths disallowed.
4. **Sitemap:** emit only `launchSitemapPaths` against the approved origin. Include `/visit`. Continue omitting deferred paths, unpublished gallery items, prices, and Matcha.
5. **Meta robots:** set `robotsPolicy.index` / `follow` only for pages that are actually public on that origin.
6. **`X-Robots-Tag`:** remove `noindex, nofollow` from `src/security/headers.ts` for the approved production surface. Keep noindex on preview/branch contexts.
7. **`netlify.toml`:** stop sending `X-Robots-Tag: noindex, nofollow` on the production context. Keep it for deploy-preview / branch-deploy until those hostnames should stay hidden.
8. **Canonicals:** absolute canonicals may use the approved origin only. Relative canonicals are the safe default until then.
9. **JSON-LD:** still NailSalon verified facts only. Do not add ratings, prices, extra locations, or a guessed `url` until that URL is the approved origin.
10. **E2E:** invert the `/visit` noindex assertion for production-origin tests only. Preview tests must continue to expect noindex. Update `e2e/seo.spec.ts` so `/visit` is listed in the sitemap when the origin exists, and still omitted from robots/sitemap when it does not.
11. **Analytics:** remains no-op until ODR-019. Indexation does not authorize pixels.
12. **Re-run:** `npm ci`, `npm run validate`, `npm run test:e2e`, plus a production-header check on the approved host.

If any row is incomplete, keep the fail-closed controls.
