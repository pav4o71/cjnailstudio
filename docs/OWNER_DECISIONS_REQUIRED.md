# Owner Decisions Required

Last updated: 2026-08-17

This register keeps owner-dependent business rules out of production configuration. The public marketing experience may launch with the verified WhatsApp, phone and walk-in handoff while these decisions remain unresolved. No item below should be inferred from reviews, competitor sites or third-party listings.

## P0 — required before live scheduling or payments

| ID | Decision required | Current safe behavior | Evidence |
| --- | --- | --- | --- |
| ODR-001 | Complete service menu, prices, durations, add-ons, removals and complexity rules | Show evidence-backed service categories without prices or duration claims; hand off to WhatsApp | `SOURCE_RULES.md`; dataset `services_and_offers` |
| ODR-002 | Staff roster, specialties, schedules, resource limits and simultaneous capacity | Do not expose staff selection or availability | dataset `information_gaps` |
| ODR-003 | Lead time, buffers, walk-in allocation, overbooking and double-booking rules | Explain that walk-ins are welcome but availability is not guaranteed | dataset `booking_signals` |
| ODR-004 | Cancellation, rescheduling, late-arrival, no-show and deposit rules | Do not publish booking-policy promises | `BOOKING_REQUIREMENTS.md` |
| ODR-005 | Accepted payment methods, refunds and reconciliation | Do not collect payments or state the third-party cash/GCash claim as policy | dataset `booking_signals.third_party_claims` |
| ODR-006 | Inspiration-image formats, size, consent, retention and deletion rules | Do not upload or retain images; invite clients to share references during the verified messaging handoff | `SECURITY_AND_PRIVACY.md` |
| ODR-007 | Confirmation and reminder channels, templates and consent model | Do not send automated customer notifications | `BOOKING_REQUIREMENTS.md` |
| ODR-008 | Booking provider or approved hosted booking URL | Use the provider-neutral booking adapter in fallback mode | `BOOKING_ARCHITECTURE.md` |

## P1 — required for complete brand, media and local-SEO rollout

| ID | Decision required | Current safe behavior | Evidence |
| --- | --- | --- | --- |
| ODR-009 | Relationship among Knightsbridge, Beacon Tower 3, Medical Towers and “Beauty Nail Studio by Cj 2” | Publish only the approved Knightsbridge location; do not call other listings branches or create redirects | Decision D-001 approved; D-004 pending |
| ODR-010 | Current matcha-café status, menu, hours and relationship to appointments | Treat matcha only as an emerging concept in internal strategy; omit public operational claims | Decision D-005 pending |
| ODR-011 | Publication approval and model/customer releases for each retained media asset | Ship consent-safe graphic fallbacks; no retained social asset is public by default | media manifest `rights_note` |
| ODR-012 | Original logo files, formal brand colors and font licenses | Use a text wordmark and documented, accessible research-derived palette | dataset `brand_signals.visual_style` |
| ODR-013 | Official TikTok handle and content ownership | Do not publish a TikTok link | dataset `information_gaps` |
| ODR-014 | Google Business Profile ownership and canonical website update | Document launch-time update; do not mutate the profile | dataset `information_gaps` |
| ODR-015 | Parking, building entry, accessibility and landmark directions | Provide only the verified postal address and a neutral map link | dataset `information_gaps` |

## Additional publication, operations and external-authority gates

| ID | Decision required | Current safe behavior |
| --- | --- | --- |
| ODR-016 | Approved review excerpts, reviewer display/reuse policy and launch-current aggregate | Use attributed theme summaries or omit |
| ODR-017 | Owner-revalidated hygiene wording, procedure, equipment and frequency | Use only the limited dated official statement or omit |
| ODR-018 | Owner/legal approval of the implemented privacy notice, website terms and later booking policies | Keep routes implementation-accurate; collect no first-party customer data |
| ODR-019 | Analytics destination, consent model, retention, operator and baseline | Keep `AnalyticsPort` no-op with fixed event definitions |
| ODR-020 | Provider/admin/support roles, account access, incidents, customer-rights and continuity procedures | Use existing off-site studio channels only |
| ODR-021 | Provider data ownership/export, subprocessors/transfers, support/SLA, termination and retention | Keep the adapter provider-neutral; do not procure a provider |
| ODR-022 | Loyalty, gift-card, package and membership terms | Omit; treat `media-020` as reference only |
| ODR-023 | GitHub Issues/PR authorization and valid CLI/app access | Continue local branch work; do not invent links or bypass review/merge gates |
| ODR-024 | Production host/domain/DNS, credentials, deployment approval and accountable operator | Produce portable artifacts/runbooks only; keep fail-closed noindex. Flip checklist: `docs/runbooks/INDEXATION.md` |
| ODR-025 | Explicit authorization for live scheduling, payments, notifications and production secrets | Keep every external capability flag off |

## Confirmed decisions already safe to implement

- D-001: Knightsbridge is the current public location.
- D-002: Booking is the primary website conversion.
- D-003: WhatsApp and walk-in paths remain visible.
- Verified contact: +63 961 740 0664 and thenailstudiobycj@gmail.com.
- Verified hours: open daily, 12:00 noon–9:00 PM.
