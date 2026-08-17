# Final Website Strategy

Status: APPROVED FOR PHASE-0 IMPLEMENTATION

Last updated: 2026-08-17

## Objective

Turn social and local-search discovery into a confident mobile booking handoff for Beauty Nail Studio by Cj while keeping WhatsApp, phone and walk-in paths visible.

## Evidence policy

Public facts must map to a dataset `source_id` or a dated owner decision. Customer opinions remain attributed opinions; third-party observations remain attributed and time-bound; analyst inferences remain recommendations. Unknown values are omitted, never guessed or rendered as `TBD`.

## Approved launch proposition

**Bring the look you have in mind.** Explore evidence-backed nail and lash categories, understand the next step, and contact the Knightsbridge studio without friction.

This is proposed brand language, not a guarantee that every design can be reproduced.

## Verified public baseline

| Topic | Approved public value | Evidence |
| --- | --- | --- |
| Business | Beauty Nail Studio by Cj | `facebook-profile` |
| Location | G/F Unit R19, Knightsbridge Residences, Makati City, Metro Manila, Philippines 1210 | `facebook-profile`, D-001 |
| Hours | Open daily, 12:00 noon–9:00 PM | `facebook-profile` |
| Phone/WhatsApp | +63 961 740 0664 | `facebook-profile` |
| Email | thenailstudiobycj@gmail.com | `facebook-profile` |
| Instagram | @beautynailstudiobycj | `instagram-profile` |
| Categories | Nails, custom nail art, nail extensions, BIAB/BIAB infill, soft gel and lash services | `facebook-profile`, `instagram-profile` |
| Walk-ins | Accepted, without an availability guarantee | `instagram-profile` |

## Priority audiences

Audience definitions are hypotheses to validate, not demographic facts:

1. Inspiration-led nail clients who need help translating a saved look into a service conversation.
2. Makati and Knightsbridge residents/workers looking for a convenient studio.
3. Lash clients looking for a clear inquiry path.
4. Visitors near Makati who need trustworthy location and contact information.
5. First-time clients who do not know salon terminology.

## Conversion hierarchy

1. Book through the stable first-party `/book` route.
2. Message on WhatsApp.
3. Call the studio.
4. View services, gallery or directions.
5. Explain that walk-ins are accepted without promising immediate capacity.

Every primary route includes a Book action. Manual contact is a booking request/handoff, not a confirmed appointment.

## Experience principles

- Help visitors choose by desired result rather than jargon alone.
- Place proof beside the claim it supports.
- Keep one canonical Knightsbridge location.
- Preserve fallbacks when a future provider is unavailable.
- Use soft editorial styling with operationally clear typography and controls.
- Treat media rights and consent as required content fields.
- Omit blocked content instead of shipping thin or speculative pages.

## Launch scope

Indexable routes: Home, Services, Custom Nail Art, Lashes, Gallery, Studio, Visit, FAQ and Book. Privacy and Terms routes disclose the actual phase-0 site behavior and stay in the footer.

Matcha, team, detailed pricing, policies, staff selection, availability, payments, automated notifications, additional locations and consent-dependent media remain gated by `docs/OWNER_DECISIONS_REQUIRED.md`.

## Content rules

- Voice: warm, feminine, welcoming, concise and clear.
- Use plain English and descriptive calls to action.
- Attribute review themes; do not reconstruct quotations from research paraphrases.
- Treat ratings, promotions and social metrics as dated snapshots.
- Do not use unsupported superlatives, guarantees, outcome promises or medical claims.
- Keep name, address, phone and hours in one canonical content record.

## Local SEO strategy

- One canonical page per intent; no keyword doorway pages.
- Use Knightsbridge and Makati naturally in titles, headings and visit information.
- Populate local structured data only from verified facts.
- Omit price range, payment methods, coordinates, amenities, rating schema, menu, staff and extra locations until confirmed and policy-eligible.
- Resolve D-004 before creating legacy-location redirects, branches or schema.
- Revalidate hours, services and contact details immediately before production launch.

## Measurement

Instrumentation is provider-neutral and inactive/no-op without an approved analytics destination. Allowed events include `book_cta_click`, `whatsapp_click`, `phone_click`, `directions_click`, `service_view`, `gallery_filter`, `gallery_to_book`, `booking_handoff_started` and `booking_handoff_failed`.

No event may contain names, phone numbers, email, messages, image URLs, arbitrary query strings or other personal content.

## Success criteria

- Every factual public claim is traceable.
- No guessed price, duration, availability, staff, policy, payment, map, matcha or location detail appears.
- Book is reachable from every primary page; contact fallbacks remain usable without JavaScript.
- Every indexable route has a unique title, description, H1 and substantive copy.
- No unapproved media, review quotation or promotion is published.
- Critical journeys pass automated and manual accessibility/responsive checks.
