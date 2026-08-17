# Content Inventory

Status: APPROVED FOR PHASE-0 IMPLEMENTATION

## Canonical records

| Entity | Phase-0 fields | Owner-dependent fields |
| --- | --- | --- |
| Business identity | Name, phone, email, Instagram/Facebook URLs | Legal entity claims, final logo |
| Location | Knightsbridge address, daily hours, phone | Exact pin, parking, entry, accessibility, landmarks, legacy relationship |
| Service category | Verified public label, source IDs, CTA | Studio-approved description, mapping, price, duration, add-ons, availability |
| Gallery item | Stable ID, status, rights/consent fields, alt text | Publication approval, service/technique mapping, technician attribution |
| Review evidence | Platform, snapshot date, evidence class, approved attribution status | Reusable excerpt and permission; current rating |
| Hygiene content | Limited official cleaning/disinfection/sanitation statement | Detailed procedure, equipment and approved terminology |
| FAQ | Verified location, hours, contact, walk-in and category answers | Policies, payment, aftercare, repairs and guarantees |
| Policy | Status/effective date | Owner/legal-approved booking and privacy terms |
| Promotion | Source, start/end, status | Terms, eligibility and explicit approval |
| Matcha content | Blocked status only | Operating status, menu, price, allergens, hours, appointment relationship |

## Evidence metadata

Every factual or attributed content object carries:

- stable `id`;
- workflow `status`;
- `evidenceClass`;
- one or more `sourceIds`;
- `capturedAt` or `verifiedAt`;
- `ownerConfirmed` where applicable;
- `publishability`;
- `expiresAt` for time-sensitive content;
- notes describing conflicts or wording limits.

## Phase-0 page inventory

| Page | Required content | Safe fallback |
| --- | --- | --- |
| Home | Verified category/location/hours, result chooser, hygiene/customer-theme context, Book/WhatsApp/Visit | Typographic hero and abstract linework |
| Services | Six verified category labels and inquiry guidance | Omit price/duration slots entirely |
| Custom Nail Art | Category copy, process explanation, Book/WhatsApp | Text-led composition if gallery is uncleared |
| Lashes | Verified concise offering and contact path | Neutral line illustration, no generated result |
| Gallery | Consent-aware state, future filters and related category actions | Honest empty state linking to official Instagram |
| Studio | Location, hours, limited official hygiene statement, attributed review themes | Text-led proof cards |
| Visit | Address, hours, phone/WhatsApp/email/Instagram and neutral directions link | No embedded map or unverified access advice |
| FAQ | Verified location, hours, contact, walk-ins and categories | Omit unknown policy questions |
| Book | Manual handoff options and confirmation limitation | Always available without provider JavaScript |
| Privacy/Terms | Actual site behavior, external contact destinations and capability gates | No generic placeholder policy |

## Governance rules

- Unknown properties are absent, not false/zero/empty public labels.
- Promotions are separate from evergreen services and expire automatically.
- Service categories remain separate from bookable services.
- Review themes remain attributed and never become unqualified promises.
- Media rights and consent are first-class fields.
- Canonical contact and location data is imported, never duplicated as unrelated literals.
- Production pages contain no `TBD`, lorem ipsum or synthetic business policy.
