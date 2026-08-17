# Acceptance Tests

Status: APPROVED

The build is not complete while any P0 item fails:

1. Every public fact has an allowed source ID or owner decision; inference is not presented as fact.
2. Public output contains no unapproved price, duration, availability, staff schedule, deposit, payment method, policy, Matcha or legacy-location claim.
3. Production contains no `TBD`, lorem ipsum, empty required label or disabled-feature teaser.
4. Name/address/phone/hours come from one canonical record and match visible pages, metadata and structured data.
5. Book is one activation from every primary page; `/book` always exposes manual fallbacks.
6. WhatsApp/tel URLs normalize to +63 961 740 0664 and have accessible names.
7. Manual handoff/provider return never displays an appointment confirmation, slot, price or policy.
8. Missing/invalid/timeout/blocked provider states show WhatsApp, call and Visit/walk-in without losing controlled context.
9. Core content and contact links remain usable without JavaScript.
10. Mobile/desktop navigation, modal focus/Escape/return and footer routes pass keyboard tests.
11. Automated axe scans report zero serious/critical first-party violations.
12. Manual focus, landmark, name, screen-reader state/error, zoom, reflow, forced-color and reduced-motion checks pass.
13. At 320, 375, 768, 1024 and 1440 CSS px, no CTA/content is clipped or covered and target sizes pass.
14. Every rendered image has approved media/rights/consent/derivative data and alt text, or the designed fallback renders.
15. Images have intrinsic dimensions, responsive crops/formats, LCP priority and below-fold lazy loading; no social CDN hotlink.
16. Every indexable page has unique title/description/H1/canonical; sitemap/robots/schema contain only visible verified facts.
17. Secret/dependency/unsafe-URL/origin/header/CSP/log-redaction checks pass for the active surface.
18. Analytics is no-op by default, accepts only fixed allowed fields and cannot block navigation.
19. Format, lint, strict type check, unit, integration, production build and Playwright journeys pass from a clean lockfile install.
20. Important pages/states are inspected at mobile/tablet/desktop and screenshots are retained as milestone evidence.
21. Diff inspection finds no secret, unrelated file, generated junk, private media or accidental large binary.
22. Rollback to `manual-handoff` and core contact smoke tests pass.

Critical E2E journeys include Home/Services/Custom Art/Lashes/Gallery fallback → Book → WhatsApp/call; Visit → directions/Book; missing/invalid/fake-hosted/failure booking modes; no-JS manual links; keyboard navigation; neutral provider return; analytics endpoint blocked; gallery empty/clear-filter behavior; and privacy/terms/404 routes.
