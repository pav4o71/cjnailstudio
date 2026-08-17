# Sitemap

Status: APPROVED FOR PHASE-0 IMPLEMENTATION

## Launch routes

| Route | Responsibility | Primary CTA | Publication gate |
| --- | --- | --- | --- |
| `/` | Category, location, result chooser, proof, visit summary and conversion | Book | Verified facts; consent-safe graphic fallback |
| `/services` | Evidence-backed category overview without invented prices or durations | Ask/book | Verified category labels |
| `/services/custom-nail-art` | Custom-art intent and gallery-to-contact path | Book this kind of look | Cleared media optional; category mapping stays non-binding |
| `/services/lashes` | Concise lash offering and inquiry path | Ask/book | No unapproved model imagery or style claims |
| `/gallery` | Portfolio discovery and related booking intent | Book related category | Cleared media; honest empty state until then |
| `/studio` | Studio, care, hygiene claim and attributed review themes | Book | No staff roster or overbroad hygiene claims |
| `/visit` | Canonical address, hours, contact, directions and walk-in path | Get directions / Book | D-001; map pin/access details remain gated |
| `/faq` | Verified first-visit questions only | Book/contact | No invented policy answers |
| `/book` | Stable provider-neutral booking/contact handoff | WhatsApp / call | Manual-handoff is the safe default |
| `/privacy` | Actual phase-0 privacy behavior and future integration gates | Contact | Must change with implemented data flows |
| `/terms` | Website-use terms and booking-status limitations | Contact | Not a substitute for owner-approved salon policy |

## Navigation

Desktop primary: Services · Gallery · Studio · Visit · Book.

Mobile menu: Home · Services · Custom Nail Art · Lashes · Gallery · Studio · Visit · FAQ · Book, with a persistent Book/WhatsApp action bar.

Footer: FAQ · WhatsApp · Call · Email · Instagram · Privacy · Terms · canonical address and hours.

## Deferred routes

- `/matcha`: absent until D-005 and the operating/menu/legal details are confirmed.
- `/team`: absent until roster, roles, specialties, biographies and media consent are confirmed.
- `/reviews`: use attributed modules until approved excerpts support a substantive page.
- Additional location routes: prohibited until D-004 is resolved.
- Pricing, packages, loyalty, gift-card, membership and bridal routes: deferred until official offers and terms exist.

## URL and indexation rules

- Use lowercase, stable, descriptive paths.
- Canonical URLs point to the production origin only after the deployment domain is approved.
- Preview/staging environments must be non-indexable.
- Do not create empty pages for blocked content.
