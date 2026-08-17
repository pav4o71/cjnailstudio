# Agent 4 — Integration, evidence audit, QA and implementation readiness

- Status: **WORKING INTEGRATION RECOMMENDATION — primary-agent adoption and owner gates required**
- Prepared: 2026-08-17
- Scope owner: Specialist Agent 4
- Activation status: **No provider, payment, notification, analytics, domain or deployment action is authorized by this report**

## 1. Integration verdict

The evidence package is sufficient to implement a complete phase-0 website: an accessible, mobile-first marketing experience with evidence-backed service categories, a consent-safe visual system, one stable `/book` route, and verified WhatsApp, phone and walk-in handoffs. Phase 0 must collect no first-party booking data, expose no live availability and treat `manual-handoff` as the fail-closed booking mode.

The package is **not** sufficient to activate automated scheduling, payments, customer notifications, inspiration-image upload, staff selection, operational Matcha content, legacy-location SEO, or retained customer imagery. Those capabilities remain stopped at explicit interfaces or publication gates.

The three specialist reports are substantively compatible. Their differences are reconcilable naming, priority and scope questions rather than incompatible strategies. The integrated recommendation is:

1. Adopt the compact launch sitemap shared by Agents 1 and 2.
2. Adopt Agent 2's accessible blush/rose design system as a recommendation, using a text wordmark and system font fallbacks until brand/font assets are licensed.
3. Adopt Agent 3's static-first Next.js/TypeScript architecture, manual booking adapter, security boundaries and future provider gates as the proposed ADR choice.
4. Use Agent 1's evidence protocol, claim library, content model and local-SEO constraints as the content authority.
5. Publish no retained media by default. Build every page to work with designed non-photographic fallbacks.
6. Keep all unapproved capability flags off. Missing or invalid configuration must degrade to the phase-0 experience rather than fail the site.

### Readiness by capability

| Capability | Readiness | Decision |
|---|---|---|
| Repository foundation, CI and documentation | **Ready to implement** | No business unknown is needed to create the typed foundation and quality gates. |
| Accessible shell, navigation, footer and design tokens | **Ready to implement** | Use the recommended system with text wordmark and fallback fonts. |
| Home, category-level Services, Lashes, Studio, Visit and limited FAQ | **Ready to implement** | Use only approved decisions and source-backed claims. |
| Gallery and image-bearing modules | **Ready to implement with fallbacks; media publication blocked** | Build data/components and empty/withheld states; publish no retained asset until its record clears. |
| `/book` and persistent booking UX | **Ready in `manual-handoff` mode** | WhatsApp, phone and walk-in only; no confirmation claim. |
| Live scheduling | **Blocked** | ODR-001–ODR-004 and ODR-008, plus the approved customer-data model, must clear. |
| Payments | **Blocked** | ODR-004–ODR-005 and separate payment/security authority must clear. |
| Automated notifications | **Blocked** | ODR-007 and privacy/consent/template decisions must clear. |
| Inspiration upload | **Blocked** | ODR-006 and private-storage/retention controls must clear. |
| Matcha page/module | **Blocked** | D-005 / ODR-010 must clear. |
| Team/staff content | **Blocked** | ODR-002 and individual publication consent must clear. |
| Additional locations or legacy redirects | **Blocked** | D-004 / ODR-009 must clear. |
| Production analytics | **Blocked by authority/configuration, not implementation** | Implement a no-op port and fixed event schema only. |
| Production deployment/domain changes | **Blocked by explicit authority and credentials** | Prepare artifacts/runbooks only. |
| Milestone issue/PR review and merge control | **Externally blocked** | GitHub Issues returns 403 and local `gh` auth is invalid per `docs/PROJECT_STATUS.md`; local branch work may continue, but merge gates may not be bypassed. |

## 2. Authority and evidence protocol

### 2.1 Precedence

Apply this order when sources disagree:

1. Repository-root `AGENTS.md` and the goal's explicit safety/activation rules.
2. Approved rows in `docs/source/DECISION_LOG.md` and later approved rows copied into root `DECISIONS.md`.
3. Authoritative evidence: research dossier, structured dataset and media manifest under `docs/source/`.
4. Approved build-pack documents after the primary agent changes their status from template/preliminary.
5. Specialist reports as recommendations.
6. Competitor/reference observations as inspiration only, never reusable facts or assets.

Root `DECISIONS.md`, `IMPLEMENTATION_PLAN.md`, `DESIGN_SYSTEM.md` and `ACCEPTANCE_TESTS.md` are currently templates, not approvals. This report recommends what the primary agent should adopt; it does not silently elevate recommendations into owner decisions.

### 2.2 Evidence classes

| Class | Meaning | Public use rule |
|---|---|---|
| Approved decision | Owner/cross-agent decision recorded as approved | May control implementation until superseded by another recorded decision. |
| Verified fact | Current official-channel evidence with `source_id` | May publish with internal traceability and launch freshness check. |
| Official content claim | Claim made in dated official content | Use no broader wording; revalidate operational claims before launch. |
| Customer opinion | Review/customer discussion | Attribute and paraphrase accurately, or use an approved excerpt; never turn into a guarantee. |
| Third-party observation | Directory, aggregate or curator content | Attribute/date or withhold; never use as policy. |
| Analyst inference/recommendation | Strategic or design judgment | May guide implementation only after primary-agent adoption; never present as a fact. |
| Blocker | Missing owner, legal, consent, credential or external authority | Omit the affected feature or stop at the documented interface. |

### 2.3 Approved decisions and verified phase-0 facts

| Item | Status | Authority | Safe implementation scope |
|---|---|---|---|
| Knightsbridge is the current public location | **Approved D-001** | `docs/source/DECISION_LOG.md`; `facebook-profile` | Publish only the approved Knightsbridge postal address. |
| Booking is the primary conversion | **Approved D-002** | `docs/source/DECISION_LOG.md` | Persistent Book CTA and one `/book` route. |
| WhatsApp and walk-in paths remain visible | **Approved D-003** | `docs/source/DECISION_LOG.md`; official channels | Keep them visible even after a provider is introduced. |
| Business name | **Verified fact** | `facebook-profile` | Beauty Nail Studio by Cj. |
| Address | **Verified fact + D-001** | `facebook-profile` | G/F Unit R19, Knightsbridge Residences, Makati City, Metro Manila, Philippines 1210. |
| Hours | **Verified fact** | `facebook-profile` | Open daily, 12:00 noon–9:00 PM; revalidate at launch. |
| Phone/WhatsApp | **Verified fact** | `facebook-profile` | +63 961 740 0664 from one canonical record. |
| Email | **Verified fact** | `facebook-profile` | thenailstudiobycj@gmail.com. |
| Instagram | **Verified fact** | `instagram-profile` | @beautynailstudiobycj. |
| Service categories | **Verified facts** | `facebook-profile`, `instagram-profile` | Nails, custom nail art, nail extensions, BIAB/BIAB infill, soft gel and lash services/extensions; no unverified details. |
| Walk-ins | **Verified fact** | `instagram-profile` | “Walk-ins accepted”; never promise immediate service. |
| Tool care statement | **Official content claim** | `facebook-profile` | May state only that the studio says tools are cleaned, disinfected and sanitized after every client, after launch freshness/content review. |

Time-varying social metrics, dated promotions and the Google rating are not evergreen phase-0 facts. If used, they require an explicit capture date and launch-day revalidation; omission is the safer default.

## 3. Explicit contradiction and ambiguity reconciliation

| Topic | Inputs in tension | Reconciled recommendation | Status/gate |
|---|---|---|---|
| Current location | `00_READ_ME_FIRST.md` says location was unconfirmed; later D-001 approves Knightsbridge, while D-004 leaves legacy relationships open | D-001 controls. Publish Knightsbridge only; do not infer that Beacon Tower 3 or Medical Towers is a branch, former branch or redirect target. | Knightsbridge approved; legacy relationship blocked. |
| Map/directions | Agent 1 blocks embed until exact pin; ODR-015 permits a neutral map link | Use the verified text address and a search-based external directions link derived from that address. Do not store coordinates or embed a pin until owner-confirmed. | Phase 0 ready; exact pin/access details blocked. |
| Matcha priority | Research calls Matcha a P0 unknown because it affects differentiation; `OWNER_DECISIONS_REQUIRED.md` lists it as P1 brand rollout; it is not required by the phase-0 booking adapter | Classify it as **P1 for phase-0 launch**, but P0 for any Matcha route, menu, appointment relation or campaign. Omit it entirely until D-005 clears. | Does not block phase 0. |
| “Services & Pricing” label | Preliminary sitemap includes pricing; no official catalog/prices exist | Navigation label and route are **Services** / `/services`; add prices later without changing the URL. | Phase 0 ready. |
| Review/hygiene route | Preliminary IA proposes a separate Reviews & Hygiene page; Agents 1–2 recommend consolidation | Consolidate into `/studio` at launch. Split only when approved excerpts and substantive owner-documented hygiene content exist. | Recommended. |
| Team route | Preliminary IA includes Studio & Team; current roster and consent are unknown | Use `/studio`; omit the team module. Add `/team` only when a substantive, consent-cleared roster exists. | Team blocked; Studio ready. |
| Walk-in wording | Official evidence supports “Walk-ins accepted”; reports variously say “welcome” or add availability caveats | Canonical fact is **“Walk-ins accepted.”** Pair with a contact option, not an invented capacity statement. Do not say “walk in anytime,” “no appointment needed” or “immediate service.” | Phase 0 ready. |
| Inspiration flow | Strategy wants “bring your inspiration”; on-site upload rules are unknown | “Bring your inspiration” is brand language. Phase 0 may pass a controlled category hint or invite discussion in the existing direct channel, but must not collect/store/upload the image. | Messaging ready; upload blocked. |
| Hygiene proof | Official post supports cleaning/disinfecting/sanitizing; reviews mention autoclave/sterility | Publish only the official limited statement after freshness review. Customer autoclave/sterility mentions may be attributed review themes but must not become business/equipment claims. | Limited copy ready; detailed procedure blocked. |
| Rating/reviews | Google aggregate is 4.8/5 from 135 reviews at capture; reviews are unverified and report contains paraphrases | Omit the aggregate by default. If revalidated, display the date and source. Use paraphrased attributed themes until approved exact excerpts/reuse exist; never put reconstructed paraphrases in quotation marks. | Optional and gated. |
| Media provenance | Images were business-published, but manifest says internal planning and consent review required | Social publication is not website consent. All 30 retained files start `publicationStatus=blocked`; page fallbacks are the launch baseline. | No retained image approved. |
| Font/brand identity | Research observes palette/type cues; no logo originals or font licenses exist | Use the accessible recommended token system, a text wordmark and system fallbacks. Self-host Fraunces/Inter only after licenses/assets are retained and reviewed. | Foundation ready; final brand asset blocked. |
| Design rose contrast | Observed `#B45D7A` is insufficient with white for normal text/buttons; Agent 2 proposes darker roses | Adopt `#7B2E4B` for primary CTA and `#943E5D` for strong accents; retain observed softer rose only for decorative use. | Recommended accessibility resolution. |
| Analytics event names | Agent 1 uses `book_cta_click`; Agent 2 uses `booking_cta_clicked`; Agent 3 defines `booking_cta_clicked` | Canonicalize on Agent 3's fixed taxonomy, including `booking_cta_clicked`. Do not implement aliases in production telemetry. | Recommended contract. |
| Booking “success” | UI requirements mention a success state, but manual handoff/provider return does not prove confirmation | Phase 0 may confirm only that a handoff link opened/was prepared, never an appointment. A `booking_confirmed` UI/event requires authenticated system-of-record evidence. | False-success path prohibited. |
| Booking provider category | Agent 3 scores hosted 77, widget 65, custom 66 but does not choose a vendor | Adopt hosted specialist flow as the preferred **evaluation category**, conditional on the P0 packet and conformance tests. Do not select/activate a vendor now. | Future recommendation, blocked. |
| Stack | Next.js scores 87.0 vs Astro 83.4; no root ADR is approved | Recommend Next.js App Router + strict TypeScript, subject to a foundation spike and primary-agent ADR approval. Keep schemas/adapters framework-neutral. | Proposed ADR, not yet approved. |
| Privacy/terms pages | Sitemap requires stable routes; actual provider, analytics and policy data flows are unresolved | Implement stable routes and repository content contracts. Phase 0 privacy copy must describe the actual no-form/no-op-analytics state and external contact links; owner/legal approval is a public-release gate. Do not write salon policies into generic website terms. | Implementation ready; public legal acceptance gated. |
| “No TBD in production” vs unknown business data | Templates instruct visible TBD during working content; acceptance forbids it in production | Unknown optional fields and blocked modules are absent in rendered production output. Preview tooling may show explicit editorial statuses outside public pages. | Required. |

## 4. Final strategy recommendation

### 4.1 Objective and value proposition

Turn social and local-search discovery into an informed contact/booking handoff on mobile. The recommended promise is:

> Bring the look you have in mind. Explore verified nail and lash categories, see consent-cleared work when available, and contact the Knightsbridge studio without friction.

This is proposed positioning, not a result guarantee. Do not claim that every design can be replicated exactly.

### 4.2 Audience hypotheses

Use as testable segments, not demographic facts:

1. Inspiration-led custom-art clients who do not know the service terminology.
2. Knightsbridge/Makati residents and workers seeking convenient local service information.
3. Lash clients seeking a focused, credible service page.
4. Visitors/travelers who need clear location, hours and contact information.
5. First-time clients who need a plain-language service chooser and human fallback.

Bridal/special-occasion demand is low-confidence and does not justify a launch page.

### 4.3 Messaging and conversion hierarchy

1. Nail and lash studio at Knightsbridge, Makati.
2. Bring your inspiration / find the relevant category.
3. Verified category proof: custom nail art, nail extensions, BIAB/infill, soft gel and lashes.
4. Limited care/hygiene proof and attributed customer themes.
5. Exact address, daily hours and contact details.
6. Primary **Book**; secondary **WhatsApp us**, **Call the studio**, **View services**, **Get directions**.
7. Walk-ins accepted, without capacity or immediate-service language.

### 4.4 Claim controls

Prohibit unqualified “best,” “luxury,” “affordable,” “guaranteed,” “long-lasting,” “sterile,” “medical-grade,” “instant confirmation,” “same-day availability,” price, duration, payment method, staff availability, Matcha operations and promotion claims without their required evidence/approval.

### 4.5 Success criteria

- Every public factual claim maps to a `source_id` or dated owner decision.
- Every public image maps to a `media_id`, derivative record, rights decision and consent record.
- Book is reachable in one activation from every principal page.
- WhatsApp and phone remain functional with JavaScript or provider code blocked.
- No blocked content renders as a guess, blank label or `TBD`.
- No retained media, customer data collection or external integration activates by default.

## 5. Final sitemap and navigation recommendation

### 5.1 Launch routes

| Route | Primary responsibility | Primary action | Phase-0 content status |
|---|---|---|---|
| `/` | Category/location, proposition, result chooser, proof, visit summary | Book | Ready with graphic fallbacks. |
| `/services` | Verified service-category overview and plain-language chooser | Book / ask | Ready at category level; omit prices/durations/technical definitions. |
| `/services/custom-nail-art` | Custom-art intent and gallery-to-contact journey | Book this kind of look | Ready with text/fallback; media and precise booking mapping gated. |
| `/services/lashes` | Verified lash offering in Makati | Book / ask | Ready as concise page; detailed menu and customer images gated. |
| `/gallery` | Consent-cleared visual proof linked to approved categories | Book related category | Component/empty state ready; retained assets gated. |
| `/studio` | Real-place story, limited hygiene statement, attributed review themes | Book | Ready without team or photos; detailed procedure/reviews gated. |
| `/visit` | Canonical address, hours, phone, WhatsApp, neutral directions and walk-in path | Get directions / Book | Ready; pin, parking, entry and accessibility details gated. |
| `/faq` | Verified pre-visit subset | Book / contact | Ready only for location, hours, contact, walk-ins and verified categories. |
| `/book` | Stable first-party booking boundary and fallback state | WhatsApp / call / visit | Ready in `manual-handoff`; scheduler disabled. |
| `/privacy` | Actual first-party/third-party data practices | Contact | Route/model ready; copy must match implementation and clear owner/legal review before public release. |
| `/terms` | Website terms only; later link to approved booking policies | Contact | Route/model ready; do not invent booking terms. |

### 5.2 Deferred or prohibited routes

- `/matcha`: omit/un-generate until D-005 clears. Do not ship “coming soon.”
- `/team`: omit until roster, roles, biographies and publication consent clear.
- `/reviews`: consolidate into Studio until substantive approved source material exists.
- `/locations` and legacy-location pages: prohibited until D-004 clears.
- Bridal, loyalty, promotions, packages, membership, gift card and detailed service pages: defer until authoritative offers/terms exist.

### 5.3 Navigation

- Desktop primary: Services, Gallery, Studio, Visit, Book.
- Mobile menu: same order plus FAQ and contact shortcuts.
- Persistent mobile action bar: Book + WhatsApp only, with safe-area padding and matching content bottom padding.
- Footer: FAQ, WhatsApp, phone, Instagram, hours, address, Privacy and Terms.
- Use `aria-current="page"`, visible focus and semantic navigation landmarks.

## 6. Design-system recommendation

### 6.1 Core tokens

| Token | Value | Rule |
|---|---:|---|
| `--color-bg` | `#FFF9FA` | Warm page canvas. |
| `--color-surface` | `#FFFFFF` | Cards/forms. |
| `--color-surface-blush` | `#FBE9EE` | Editorial bands/selected chips. |
| `--color-ink` | `#24191D` | Primary text. |
| `--color-muted` | `#66535A` | Secondary text. |
| `--color-border` | `#D8C7CD` | Decorative boundary only. |
| `--color-border-strong` | `#8A747C` | Interactive boundary. |
| `--color-rose-soft` | `#D899AB` | Decorative only, not text/focus. |
| `--color-brand` | `#943E5D` | Strong accent/control. |
| `--color-brand-strong` | `#7B2E4B` | Primary CTA/link. |
| `--color-brand-deep` | `#5D2037` | Hover/active. |
| `--color-seasonal` | `#576D8C` | Optional decorative accent. |
| `--color-focus` | `#315A9A` | 3 px focus indicator with 2 px offset. |
| `--color-success` | `#1F6B4A` | Always pair with text/icon. |
| `--color-warning` | `#8A5300` | Always pair with text/icon. |
| `--color-danger` | `#A12D33` | Always pair with text/icon. |

### 6.2 Typography, layout and motion

- Phase-0 font stacks: display `Georgia, "Times New Roman", serif`; UI `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.
- Optional later self-hosted faces: Fraunces and Inter only with retained license/source records.
- Body: at least 16 px, about 1.625 line height; readable line length no more than 68ch.
- Fluid H1 `clamp(2.5rem, 1.65rem + 3.2vw, 4.5rem)`; preserve one semantic H1.
- Spacing scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Content max 1120 px; media max 1280 px; gutters 20/32/48 px.
- Breakpoints: 36rem, 48rem, 64rem, 80rem. Components must respond to available space; breakpoints are not device claims.
- Minimum pointer target 44×44 CSS px; primary controls 48 px high.
- Motion: opacity/transform only, 160 ms standard and 220 ms dialog; remove nonessential motion under `prefers-reduced-motion`.
- DOM order equals reading order. No CSS reordering that changes meaning.

### 6.3 Required component contracts

`SiteHeader`, `MobileMenuDialog`, `MobileActionBar`, `Button`, `TextLink`, `ResultChooser`, `ServiceCard`, `GalleryFilter`, `GalleryCard`, `MediaFrame`, `ReviewCard`, `HygieneSteps`, `Accordion`, `Field`, `StatusCallout`, `BookingEntry`, `LocationCard` and `ConsentSafeFallback` must define default, focus, loading, empty, error, disabled/withheld and reduced-motion behavior where applicable.

The first-party booking fallbacks must render server-side and remain operable without client JavaScript. A provider iframe, if ever approved, needs a descriptive title, reserved space, timeout, focus review and a fallback before it in reading order.

## 7. Content inventory and model

### 7.1 Canonical records

Keep one canonical record for business identity, location, hours and contact data. Page components, metadata, structured data and link generators consume that record; they must not duplicate literal NAP strings.

### 7.2 Evidence envelope

Every publishable content entity should carry:

```ts
type EvidenceClass =
  | "verified_fact"
  | "official_content_claim"
  | "customer_opinion"
  | "third_party_observation"
  | "analyst_inference"
  | "owner_confirmation";

type Publishability =
  | "publishable"
  | "attribution_required"
  | "time_sensitive"
  | "blocked";

type EvidenceMeta = Readonly<{
  sourceIds: readonly string[];
  evidenceClass: EvidenceClass;
  capturedAt?: string;
  verifiedAt?: string;
  ownerDecisionId?: string;
  publishability: Publishability;
  expiresAt?: string;
  notes?: string;
}>;
```

Validate content at build time. A blocked entity must be rejected from production page data, not merely hidden with CSS.

### 7.3 Entity inventory

| Entity | Phase-0 required fields | Gated fields |
|---|---|---|
| `BusinessIdentity` | stable ID, public name, phone, email, official social links, evidence | logo, legal entity claims. |
| `Location` | stable ID, approved address, hours, phone, evidence | coordinates, exact pin, parking, entry, accessibility, legacy relationships. |
| `ServiceCategory` | canonical ID, verified public label, source-backed summary, status, CTA | operational description/mapping and owner-defined order. |
| `Service` | none required for phase 0 | name, price, duration, add-ons, removals, complexity, availability, preparation/aftercare. |
| `TeamMember` | none | roster, role, specialty, biography, schedule, image/release. |
| `GalleryItem` | stable ID, `media_id`, rights status, consent status, alt text, publication status | technique, shape, length, technician, service relation unless owner-confirmed. |
| `MediaDerivative` | source `media_id`, placement, crop, dimensions, format, hash, editor, QA status | publication URL only after release. |
| `Review` | platform, date/capture, evidence class, attribution status | approved excerpt, display name, current aggregate/reuse approval. |
| `HygieneStep` | approved wording, source, status | detailed procedure/equipment/frequency. |
| `FAQ` | question, answer, evidence, status | policy answers. |
| `Policy` | type, status, effective date, approver | owner/legal-approved text and provider-specific terms. |
| `Promotion` | stable ID, start/end, source, terms, status | all public fields require owner confirmation and automatic expiry. |
| `BookingConfig` | mode=`manual-handoff`, verified channels, allowlists | provider mappings, capabilities, secrets. |
| `MatchaItem` | none | status, menu, price, allergens, hours and appointment relation. |
| `SEOPage` | route, title, description, H1, canonical, index state, evidence | owner-dependent claims and social image. |

### 7.4 Content controls

- Promotions are separate from evergreen services and automatically expire.
- Unknown fields are absent, not zero/false/empty or public `TBD`.
- Reviews remain attributed content, not generic testimonials.
- Matcha is a publication-gated collection.
- Gallery/service relationships require approved taxonomy; visual inspection alone cannot assign technique or complexity.
- Every route has a unique title, description, H1 and substantive body before it becomes indexable.
- Structured data uses only current, visible, verified fields. At implementation, validate the most-specific supported nail/beauty business type; omit rating, price range, payment methods, coordinates, amenities, staff and extra locations unless cleared.

## 8. Consent-safe photo and image-edit plan

### 8.1 Launch rule

The media manifest's `rights_note` controls: all 30 retained files are internal planning copies. **No retained `media_id` is approved for website publication.** Phase 0 must ship with designed fallbacks and must not hotlink expiring social CDN URLs.

### 8.2 Priority conditional candidates

| Placement | Candidate | Risk | Publication gate | Fallback |
|---|---|---|---|---|
| Home hero | `media-009` | Customer hand/result; 443×590 source | Business rights + depicted-hand consent + crop QA | Blush typographic hero with abstract linework. |
| Visit exterior | `media-001` | Current-accuracy/person check | Rights + current-scene review + any necessary releases | Address card and neutral directions link. |
| Gallery | `media-011`, `media-012`, `media-013`, `media-015`, `media-029` | Customer hands/results | Per-asset rights/consent + truthful tags/alt | Omit individual cards; show honest consent-withheld/Instagram text state. |
| Process | `media-026` | Client/technician hands/identity | Rights + all depicted-person consent + full-frame QA | Numbered text process with generic line icon. |
| Hygiene | `media-014`, `media-028` | Person/action/claim context | Rights + person consent + copy-to-visible-action review | Limited official statement; no equipment-specific icon. |
| Studio | `media-016` | Multiple identifiable people/capacity implication | Explicit releases for everyone + current-layout review | Text-led Studio section or newly commissioned empty interior. |
| Lashes | `media-023` | Identifiable face/result | Explicit model release + no-retouch derivative QA | Text-led lash section and neutral non-result icon. |

Keep `media-002`–`media-006`, `media-019` and `media-020` as visual references only; embedded composite/font/program rights and dated claims make them unsuitable defaults. Hold `media-017` because it can imply a retention guarantee; hold `media-018` and `media-030` because customer consent and third-party character/IP use require review. Reject `media-010` at its 160×160 retained resolution unless an approved original is supplied. Other assets remain alternate candidates under the same rights/consent gates in Agent 2's complete disposition table.

### 8.3 Required media record

Before any derivative is eligible for production, record:

- `media_id`, SHA-256 and source/original path;
- rights owner, approver, approval date, allowed channels and expiry/revocation terms;
- every identifiable person/hand and release reference;
- placement, art direction, focal point, crop and source dimensions;
- edit prompt/version, editor/tool, output dimensions/format/hash;
- alt text and claim/linkage review;
- visual QA approver and publication status.

Revocation must be actionable by `media_id` so every derivative and placement can be found and removed.

### 8.4 Image-edit governance

Allowed after clearance: crop, mild straightening/perspective correction, removal of separable platform UI, restrained exposure/white-balance correction, modest noise reduction and export optimization.

Prohibited: changing nail/lash results, skin/identity/body, nail shape/length, tools/PPE/equipment, signage/text, facility layout, occupancy, hygiene action, products or background facts; generative extension; synthetic results; skin smoothing; fabricated sparkle; fake bokeh; heavy HDR; unreviewed generative upscaling; removal that changes documentary meaning.

Every edit prompt must begin with Agent 2's universal documentary-preservation instruction and include placement, exact ratio/resolution no larger than the native source, focal crop, allowed corrections, prohibited changes, release gate and output formats. Compare derivative to source at 100% before approval.

### 8.5 Delivery budgets

- Generate AVIF and WebP with JPEG fallback from the approved original.
- Preserve intrinsic width/height and stable `aspect-ratio`.
- Use `<picture>` for intentional mobile/desktop art direction; meaningful proof is not a CSS background.
- Eager-load only the LCP image with high priority; lazy-load below-fold media.
- Target mobile LCP image ≤150 KB, desktop hero ≤250 KB and gallery derivative ≤90 KB, subject to visual QA.
- Strip public EXIF/location/device metadata while keeping internal provenance.
- Commission new current exterior, empty interior, consistent custom-art portfolio, consented lash results and accurate hygiene sequence before relying on low-resolution social frames.

## 9. Booking architecture recommendation

### 9.1 Phase-0 contract

`/book` is a stable first-party page over a typed `BookingAdapter`. Its default and fail-closed mode is `manual-handoff`.

Allowed phase-0 intent fields:

- controlled `entryPoint` enum;
- optional canonical verified `serviceCategoryId`;
- optional public `galleryReferenceId` only when that item is approved;
- optional sanitized allowlisted campaign value.

No name, phone, email, desired date/time, free text or upload is collected by the first-party site. Intent hints do not calculate price, duration, staffing or availability.

### 9.2 Architecture invariants

1. Marketing components depend on `BookingGateway`, never provider SDKs/URLs/globals.
2. The site owns canonical public IDs; adapter-owned versioned mapping owns provider IDs.
3. Provider destinations come only from schema-validated configuration and origin allowlists.
4. Missing, invalid, disabled or unhealthy configuration returns manual fallbacks.
5. The server-rendered fallback exists before optional provider JavaScript.
6. Starting or returning from a handoff is not confirmation.
7. Only authenticated provider/system-of-record evidence can produce `confirmed`.
8. Scheduling, payment and notifications own separate states/interfaces.
9. Analytics is no-op by default and never blocks conversion.
10. No PII/free text/private image URL enters a query string, analytics event or log.

### 9.3 Capability phases

| Phase | Capability | Gate |
|---|---|---|
| 0 | Manual WhatsApp/phone/walk-in handoff | Current verified channels and phase-0 tests. |
| 1 | Synthetic provider sandbox evaluation | Complete owner-approved P0 operations packet, due diligence and provider conformance tests. |
| 2 | Real scheduling pilot | Explicit activation authority, privacy/policies, operator training, rollback/export drill. |
| 3 | Optional payment | Separate owner/payment/legal/security decision, sandbox and reconciliation tests. |
| 4 | Custom scheduling only if justified | Measured provider gap, funded operational ownership and separate ADR/threat model. |

Preferred first automation category: a branded hosted specialist page, if it passes mobile, accessibility, security/privacy, export, failure and lifecycle testing. An embed is conditional because cross-origin accessibility, performance, CSP and failure recovery are harder to control. A custom scheduler is deferred.

### 9.4 Manual-handoff wording

Use a heading such as **“Book or contact the studio”** and explain: **“Choose how you'd like to contact the studio. The website does not show live availability or confirm an appointment.”** This is a description of the implemented phase-0 state, not a business policy.

Expose WhatsApp and Call using the canonical verified number and Visit/walk-in information. A generic controlled WhatsApp prefill may mention a verified broad category, but not identity, private media, price, slot or confirmation language.

## 10. Proposed stack ADR

### 10.1 Proposed decision

**Recommendation for primary-agent ADR approval:** static-first Next.js App Router on the stable version selected during implementation, strict TypeScript, React Server Components/static generation for public content, client components only for real interaction, CSS custom properties/modules, schema-validated repository content and provider-neutral ports/adapters.

This is not approved until recorded in a root ADR/`DECISIONS.md` by the primary agent.

### 10.2 Decision rationale

| Option | Integrated assessment | Disposition |
|---|---|---|
| Next.js + TypeScript | Strong static/local SEO/image/test support and one path to isolated server routes/webhooks later; Agent 3 weighted score 87.0 | **Recommend**, subject to spike. |
| Astro + TypeScript/islands | Best static performance posture and strong runner-up; Agent 3 score 83.4; especially attractive if booking remains only a hosted link | **Retain fallback** if spike shows Next overhead without application need. |
| WordPress/theme/headless | Editing benefit, but no approved editor workflow and adds admin/plugin/patch surface; score 60.8 | Reject for foundation. |
| Provider-specific all-in-one builder | Couples content/SEO/booking and exit; no named platform evaluated | Reject as architectural default. |
| Custom scheduler/database | Operational rules and security/support ownership unresolved | Reject for current phase. |

### 10.3 Foundation spike acceptance

Before making the ADR accepted, prove with synthetic/local data:

- static generation of Home, Services, Gallery, Book and Visit;
- design tokens and responsive art-directed image/fallback component;
- manual and fake-hosted adapters with failure/invalid-origin tests;
- no-JavaScript WhatsApp/phone paths;
- keyboard, screen-reader smoke and automated axe coverage on `/book`;
- restrictive headers/CSP with no provider and a fake hosted handoff;
- production build and portable artifact without choosing a production host.

Preserve framework-neutral content schemas, canonical IDs, event names, adapter contracts and Playwright journeys so the Astro fallback remains viable.

## 11. Security and privacy boundary

### 11.1 Phase-0 data boundary

- No first-party booking/contact form or booking database.
- No file upload.
- No payment or customer notification.
- Analytics port is a no-op unless separately approved; event payloads use fixed keys and no PII.
- The website can record only operational, non-sensitive errors locally/at build time until an observability destination is approved.
- WhatsApp/phone/Instagram are external handoffs; privacy copy must clearly describe that boundary.

### 11.2 Mandatory controls

| Surface | Control |
|---|---|
| Content/config | Build/startup runtime schemas; blocked content rejected; invalid booking config fails closed. |
| Browser | No secrets; semantic output; restrictive CSP; safe external links; no PII in URL/storage. |
| Redirects | Fixed/allowlisted HTTPS destinations; reject unsafe schemes and open redirects. |
| Forms/API (future) | Server validation, body limits, rate limiting, accessible abuse control, CSRF where browser credentials exist and generic public errors. |
| Secrets | Server-only environment/secret store, least privilege, environment separation, rotation/revocation runbook; never repository/client/log/screenshot. |
| Webhooks (future) | Raw-body signature and timestamp/replay verification, unique event IDs, idempotent processing, transition validation and recoverable queue. |
| Admin (future) | Named least-privilege accounts, MFA where supported, no shared credentials, audit, session expiry and deprovisioning. |
| Uploads (future) | Private storage, MIME/content/size validation, scanning, random keys, expiring access and approved retention deletion. |
| Logs | Structured coarse metadata; redact identifiers, contacts, free text, URLs/query strings, tokens, image contents and payment data. |
| Dependencies | Lockfile, reproducible install, vulnerability/license/secret checks and minimal third-party scripts. |
| Transport/headers | HTTPS/HSTS in production, content-type protection, appropriate referrer/permissions/anti-framing policy and CSP. |
| Resilience | Timeouts, bounded retries, fallback/circuit behavior and tested export/recovery where data exists. |

Apply a current OWASP ASVS subset proportional to the active surface. Reassess before live booking, upload, payment, notifications or custom administration.

### 11.3 Future payment and notification isolation

Payment and notification interfaces remain absent or disabled in phase 0. If later approved:

- use server-side integer minor units, idempotency keys and signed webhook evidence;
- never collect card credentials in the site;
- keep payment state distinct from appointment state;
- reconcile mismatch cases through an operator queue/runbook;
- route notifications from normalized transactional events with approved templates, consent/legal basis, deduplication, delivery state and failure escalation;
- never enroll transactional recipients in marketing without separate consent.

## 12. Acceptance-test plan

### 12.1 P0 release criteria

The build must not be called complete while any P0 criterion fails.

| ID | Criterion | Observable pass condition |
|---|---|---|
| P0-01 | Evidence integrity | 100% of public factual content has an allowed `source_id`/owner decision; zero inference presented as fact. |
| P0-02 | Forbidden data | Repository/build scan finds no unapproved price, duration, availability, staff schedule, deposit, payment method, policy or Matcha/legacy claim in public fixtures/output. |
| P0-03 | No placeholders | Production pages contain no `TBD`, lorem ipsum, empty required labels or disabled-feature teaser implying availability. |
| P0-04 | Canonical NAP | Name/address/phone/hours come from one record and match across visible pages, metadata and structured data. |
| P0-05 | Booking reachability | One activation from every principal page reaches `/book`; manual fallbacks appear on `/book`. |
| P0-06 | Contact correctness | Generated WhatsApp and `tel:` destinations normalize to +63 961 740 0664 and have accessible names. |
| P0-07 | Truthful state | Manual handoff/provider return never displays appointment confirmation, slot, price or policy. |
| P0-08 | Failure fallback | Missing/invalid/timeout/blocked provider state shows WhatsApp, call and walk-in/Visit without losing controlled category context. |
| P0-09 | No JavaScript | Navigation to core content and WhatsApp/phone manual handoff remain usable with JavaScript disabled. |
| P0-10 | Navigation | Mobile and desktop nav, current state, menu focus trap/Escape/return and footer routes pass keyboard tests. |
| P0-11 | Accessibility automation | Automated first-party axe scans report zero serious/critical violations on all indexable routes/states. |
| P0-12 | Accessibility manual | Visible unclipped focus, headings/landmarks, accessible names, screen-reader state/error announcements, 200% zoom, 320 px reflow, forced colors and reduced motion pass. |
| P0-13 | Touch/layout | At 320, 375, 768, 1024 and 1440 CSS px, targets are ≥44×44, primary controls ≥48 px and no CTA/content is clipped or covered. |
| P0-14 | Media safety | Every rendered image has approved `media_id`/rights/consent/derivative record and appropriate alt; otherwise the designed fallback renders. Zero uncleared retained imagery ships. |
| P0-15 | Image delivery | Intrinsic dimensions/aspect ratio, mobile crop, modern formats, no expired CDN URL, LCP priority and below-fold lazy loading validate. |
| P0-16 | SEO | Unique title/description/H1/canonical; sitemap/robots correct for environment; no deferred route indexable; schema validates with only visible verified facts. |
| P0-17 | Security | Secret scan, dependency review, unsafe URL/origin tests, CSP/header checks and log-redaction tests pass for active surface. |
| P0-18 | Analytics isolation | Analytics is no-op by default, accepts only fixed event/property allowlists and cannot delay or fail navigation. |
| P0-19 | Engineering gates | Formatting, lint, strict type check, unit, integration, production build and Playwright critical journeys pass from a clean lockfile install. |
| P0-20 | Visual QA | Home, Services, Gallery fallback, Studio, Visit and Book are inspected on mobile/tablet/desktop; screenshots are attached to milestone evidence. |
| P0-21 | Diff/repository hygiene | No secret, unrelated file, generated junk, private media or accidental large binary enters the PR. |
| P0-22 | Rollback | Staging drill proves provider configuration can return to `manual-handoff` without page rewrite and core contact smoke tests pass. |

### 12.2 Unit and contract tests

- Content/evidence schema and blocked-entity rejection.
- Canonical NAP/link normalization.
- Booking mode/config validation and manual safe default.
- URL origin/scheme allowlisting and open-redirect rejection.
- Controlled intent parsing; arbitrary query/free text is rejected or ignored.
- Capability gating prevents upload/payment/notification/scheduler UI from rendering.
- Manual/fake-hosted adapter conformance.
- Media publication gate, derivative provenance and alt-text requirement.
- Analytics event/property allowlist and forbidden-field serialization tests.
- Promotion expiration and deferred-route index controls.

### 12.3 Integration and E2E journeys

- Home, Services, Custom Art, Lashes and Gallery fallback → Book → WhatsApp/call.
- Visit → neutral directions and Book; walk-in copy has no capacity promise.
- Missing/invalid provider config; fake hosted success; timeout; malformed response; invalid origin; blocked/slow script.
- JavaScript-disabled manual handoff.
- Keyboard-only navigation/menu/filter/accordion/error recovery.
- Provider return with fake `success` query remains neutral.
- Analytics endpoint blocked without journey interruption.
- Gallery filters: selected state, URL state, result count, empty/clear-filter and withheld-image behavior.
- Privacy/Terms and 404/error routes are reachable and do not expose preview/TBD content.

### 12.4 Performance budgets

- Target current “good” field thresholds when data exists: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the 75th percentile.
- Establish reproducible mobile lab budgets in the foundation spike; do not claim field compliance from lab data.
- Enforce media budgets from Section 8 and no third-party social-feed script at launch.
- Test provider-disabled and any future provider-enabled path separately; a vendor failure may not block first-party content.

## 13. Phased implementation and single-owner plan

The primary agent owns final decisions, integration and merge readiness. Assign exactly one implementation owner per subsystem/file group during each milestone; reviewers may comment but must not overwrite the owner. If ownership changes, record the handoff. Shared decision changes update root `DECISIONS.md` and affected acceptance tests.

| Milestone / PR | Single-owner subsystem | Scope | Entry gate | Exit evidence |
|---|---|---|---|---|
| 1 — Foundation | Primary/integration owner: decisions, schemas, ADR, build/CI | Approve stack ADR after spike; create app foundation, content/evidence schemas, canonical IDs, no-op analytics, manual adapter contract, CI and docs | This integration report reviewed | Clean install; all foundation gates pass; ADR/decisions/plan/tests are decision-complete. |
| 2 — Design system/shell | Frontend-system owner: tokens, shell and shared components | Accessible tokens, typography fallbacks, header/menu/footer/mobile CTA, component states, fallback media components | Milestone 1 merged and smoked | Responsive/keyboard/axe/visual tests and screenshots pass. |
| 3 — Pages/content | Content/page owner: route data and page composition; media owner remains separate if derivatives enter | Home, Services children, Gallery fallback/data, Studio, Visit, FAQ, Privacy/Terms route content, metadata/schema | Milestone 2 merged; claim inventory approved | Traceability audit, NAP/SEO/media-safety tests and page E2E pass. |
| 4 — Booking | Booking-boundary owner: gateway/adapters and `/book` states | `manual-handoff`, controlled intent, canonical links, fake hosted adapter for tests only, fault states | Milestone 3 merged; no live provider required | No-JS, failure, false-success, URL security and fallback journeys pass. |
| 5 — Quality/security/SEO | Quality/security owner: policies-as-implemented, analytics preparation, scanners/headers | Full metadata/sitemap/robots/schema, accessibility hardening, privacy/security checks, no-op events and launch checklist | Earlier milestones merged | P0-01–P0-21 clean; no external service activated. |
| 6 — Release readiness | Release owner: full QA evidence, artifacts and runbooks | Browser/device visual QA, performance, rollback/deployment docs, release-candidate evidence | All prior gates green; GitHub auth repaired for review flow | Required reviews/CI clean, staging smoke/rollback drill, RC tag only after authorized merge; no production deploy without authority. |

Owner-blocked content enters later scoped changes; it must not be mixed into phase 0 as speculative data.

## 14. CI, deployment and rollback readiness

### 14.1 CI stages

Run on every milestone PR from a frozen lockfile:

1. repository hygiene, secret and forbidden-content/media scan;
2. formatting and lint;
3. strict type checking and schema/content validation;
4. unit and adapter contract tests;
5. integration tests with fakes only;
6. production build and generated-route/indexability inspection;
7. Playwright critical journeys at mobile/tablet/desktop, including no-JS/failure/reduced-motion profiles;
8. automated accessibility and production header/CSP checks;
9. dependency/license/security review;
10. screenshot/visual and performance evidence review.

PR descriptions must include scope, source/decision changes, screenshots, complete test results, risks, rollback, unresolved decisions and a secrets/media-diff declaration. Fix all valid P0/P1/P2 review findings and rerun the relevant full suite.

### 14.2 Current GitHub constraint

Per `docs/PROJECT_STATUS.md`, issue creation is blocked by GitHub Issues HTTP 403 and local `gh` authentication is invalid, although pushes work. Continue reversible local implementation and test evidence on the current milestone branch. Do **not** invent issue/PR links, mark review complete, merge, tag a milestone or bypass the required workflow. Repairing GitHub authorization is an external authority gate.

### 14.3 Deployment preparation only

The production host and domain are not approved. Produce a portable, documented build with:

- environment schema and example names without secrets;
- local setup, CI build, staging verification and artifact provenance;
- proposed security headers/CSP per booking mode;
- cache/revalidation rules for content and emergency contact changes;
- monitoring event definitions without an account;
- launch checklist for NAP/hours, legal copy, consent/media, robots/canonical, provider flags and smoke tests;
- deployment and rollback procedures parameterized for the later selected host.

Do not publish, change DNS/domain settings, connect an analytics account or create production credentials under this report.

### 14.4 Rollback hierarchy

1. **Capability rollback:** set validated booking mode to `manual-handoff`; verify `/book`, WhatsApp, call and Visit; retain provider records for reconciliation.
2. **Content/media rollback:** unpublish by stable content/media ID; invalidate derivatives/caches; preserve audit record; use designed fallback.
3. **Release rollback:** redeploy the last known-good immutable artifact; run Home/Services/Book/Visit/contact smoke; record incident and decide revert/corrective PR.
4. **Post-merge failure:** revert through a reviewable corrective change or approved platform rollback; do not begin the next milestone until smoke is green.

Never delete external booking/payment records as part of a website rollback.

## 15. Complete unresolved business and authority register

Every item below is isolated so that it does not prevent phase-0 implementation. “Blocked surface” states what must remain absent/disabled.

| ID | Priority | Missing decision/authority | Blocked surface | Phase-0 seam/default |
|---|---|---|---|---|
| ODR-001 | P0 automation | Service menu, descriptions, prices, durations, add-ons, removals, repair/complexity rules | Detailed catalog, price/duration, accurate booking mapping | Verified broad categories only. |
| ODR-002 | P0 automation / P1 content | Staff roster, roles, specialties, schedules, leave, selection/substitution and concurrent capacity | Staff UI, availability and team profiles | Omit staff. |
| ODR-003 | P0 automation | Lead time, horizon, buffers, cleanup, walk-in allocation, manual blocks, overbooking/double-booking | Slot generation/live availability | Manual handoff; walk-ins accepted without guarantee. |
| ODR-004 | P0 automation | Appointment states, rescheduling, cancellation, late/no-show, service-correction and deposit policies | Confirmation/change/cancel/policy UI and policy FAQ | No appointment state/policy claim. |
| ODR-005 | P0 payment | Accepted methods, deposit rules, fees/taxes, refunds, disputes, receipts, reconciliation owner | Any payment copy or processing | Payment port absent/disabled; ignore third-party claim. |
| ODR-006 | P0 upload/privacy | Inspiration formats, size/count, rights notice, access, moderation, retention/deletion and failure behavior | On-site upload/storage | Discuss inspiration through existing handoff; site stores nothing. |
| ODR-007 | P0 notification | Confirmation/reminder channels, templates, timing, consent/legal basis, sender, opt-out and delivery escalation | Automated customer messages | Notification port absent/disabled. |
| ODR-008 | P0 automation | Provider or approved hosted URL, provider contract/security/export/support evaluation | Live provider handoff | `manual-handoff`; fake adapters tests only. |
| ODR-009 / D-004 | P1 | Relationship among Knightsbridge, Beacon Tower 3, Medical Towers and “Cj 2” | Legacy redirects, branch pages, listing mutations, multi-location schema | Knightsbridge only. |
| ODR-010 / D-005 | P1 phase 0; P0 Matcha feature | Current Matcha status/name/menu/prices/hours/allergens and appointment relation | Matcha route/nav/copy/media/schema | Omit completely. |
| ODR-011 | P1 media | Per-asset business rights and customer/model/technician/hand releases | All retained-media publication | Consent-safe designed fallbacks. |
| ODR-012 | P1 brand | Original logo, formal palette, font files/licenses | Final wordmark/type assets | Text wordmark, accessible recommended tokens, system fonts. |
| ODR-013 | P1 social | Official TikTok handle and content ownership | TikTok link/embed/attribution | Omit TikTok. |
| ODR-014 | P1 launch/local SEO | Google Business Profile ownership and canonical-site update authority | Profile mutation | Document later update; site can build. |
| ODR-015 | P1/P2 visit | Exact map pin, parking, entry, accessibility, landmarks, Grab/Waze details | Embed/coordinates/detailed arrival guide | Verified address + neutral search-based directions. |
| ODR-016 | P1 proof | Approved review excerpts, reviewer display/reuse policy and launch-fresh aggregate | Quotes, aggregate display/schema | Attributed paraphrased themes or omit. |
| ODR-017 | P1 proof | Owner-revalidated hygiene wording, detailed procedure/equipment/frequency and supporting releases | Detailed hygiene steps/equipment claims | Limited dated official statement or omit. |
| ODR-018 | P1 legal/release | Owner/legal approval of privacy notice, website terms and any later booking policies | Public legal acceptance and any data-collecting feature | Implement actual phase-0 data inventory/routes; no collection. |
| ODR-019 | P1 measurement | Analytics provider/account, consent model, retention, operator and KPI baseline | Production telemetry | No-op `AnalyticsPort`; fixed event definitions only. |
| ODR-020 | P1 operations | Named provider/admin/data-support roles, account access, MFA/deprovisioning, incidents, correction/deletion and business continuity | Automated booking administration | Existing off-site direct channels only. |
| ODR-021 | P1 procurement | Data ownership/export format/cadence, subprocessor/transfers, SLA/support, termination and retention | Provider commitment | Provider-neutral adapter and conformance checklist. |
| ODR-022 | P2 growth | Loyalty-card terms, gift cards, packages and memberships | Retention-offer modules/routes | Omit; `media-020` reference only. |
| ODR-023 | External workflow | GitHub Issues/PR permission and valid CLI/app authorization | Issue links, formal review/merge/tag flow | Local branch work and evidence only; do not bypass gate. |
| ODR-024 | External release | Production host, domain/DNS, credentials, deployment authorization and accountable operator | Deployment/domain mutation | Portable artifact/runbooks only. |
| ODR-025 | External activation | Explicit authority to enable real scheduling, payments, notifications or production secrets | All live external integrations | All capability flags off. |

None of ODR-001–ODR-025 requires phase-0 code to stop: every item has an omission, static fallback, disabled adapter/port or documentation-only seam. Public production release still requires its applicable legal, media, GitHub-review and deployment-authority gates; that is distinct from implementing and validating phase 0.

## 16. Source-to-implementation traceability audit

### 16.1 Traceability matrix

| Authority/evidence | Integrated requirement | Planned artifact/interface | Acceptance evidence |
|---|---|---|---|
| `DECISION_LOG.md` D-001; `facebook-profile` address | One canonical Knightsbridge entity; no legacy branch inference | `BusinessIdentity`, `Location`, `/visit`, footer, metadata/schema | P0-02, P0-04, P0-16; absence test for legacy routes/schema. |
| D-002 | Booking is primary | `/book`, global Book CTA, `MobileActionBar` | P0-05; route journey E2E. |
| D-003; `facebook-profile`; `instagram-profile` | WhatsApp/phone/walk-in stay visible | `ManualHandoffAdapter`, canonical link builder, Visit/Book | P0-06, P0-08, P0-09. |
| Official service entries in dataset | Broad service categories only | `ServiceCategory`, Services/Lashes/Custom Art pages | P0-01, P0-02; content-schema tests. |
| Dataset `booking_signals.unresolved_requirements`; `BOOKING_REQUIREMENTS.md` | No inferred scheduler/business rules; replaceable boundary | `BookingGateway`, modes/capabilities, provider mapping seam | P0-02, P0-07; capability-gating/adapter tests. |
| D-004; `legacy-directory` | No legacy/multi-location claims | Deferred routes and schema fields | Route/output forbidden-content test. |
| D-005; Matcha evidence limitation | No operational Matcha claim | Gated `MatchaItem`; no route generation | P0-02, P0-16. |
| `facebook-profile` official hygiene content | Limited care claim only | `HygieneStep` with `official_content_claim` evidence | Claim snapshot/evidence tests; P0-01. |
| `google-maps` aggregate/reviews | Attributed, dated third-party/customer proof | `Review` with attribution/freshness/reuse status | Stale aggregate omission; no reconstructed quote test. |
| `SOURCE_RULES.md` | Facts/images stay traceable; no invention | `EvidenceMeta`, build validation, review checklist | P0-01–P0-03. |
| `media-manifest.json` rights note and `media_id`s | No retained image without rights/consent | `GalleryItem`, `MediaDerivative`, `ConsentSafeFallback` | P0-14, P0-15; public-output media audit. |
| Agent 2 accessible design recommendation; root `AGENTS.md` | Mobile-first, semantic, keyboard/focus/contrast/reduced motion | Tokens and component contracts | P0-10–P0-13, P0-20. |
| Preliminary `SECURITY_AND_PRIVACY.md`; Agent 3 threats | Minimal data, server-only secrets, allowlists and future secure interfaces | env schema, URL builder, no-op ports, headers/CSP | P0-17, P0-18 and security test suite. |
| Goal milestone workflow | Reviewable staged delivery with tests, screenshots and rollback | Six milestone branches/PR evidence, status/changelog, tags | CI/PR checklist; P0-19–P0-22. |

### 16.2 Audit findings

- **Evidence coverage:** verified identity, address, hours, contact channels, broad services and walk-in status have direct source IDs. No authoritative price, duration, staffing, booking policy or payment data exists.
- **Decision coverage:** D-001–D-003 are the only approved cross-agent business decisions. D-004–D-005 remain correctly gated.
- **Media coverage:** all 30 assets have stable `media_id`, dimensions and hashes, but none has a website-use approval/release record. Five Facebook CDN captures failed; they are not usable assets and must not be silently reacquired/published.
- **Report convergence:** Agents 1–3 agree on compact IA, mobile conversion, category-level content, consent gates, stable `/book`, provider neutrality and manual fallback. No unresolved specialist disagreement blocks phase 0.
- **Build-pack gap:** root decision, plan, design and acceptance documents are templates. The primary agent must adopt/revise this report into those repository authorities before claiming foundation approval.
- **Repository state:** no application source is present in the inspected tree; implementation and automated-gate results do not yet exist. This report establishes readiness, not completion.

### 16.3 Required ongoing audit

For each PR, generate or review a ledger with: route/component, public claim text or content ID, evidence class, `source_id`/owner decision, freshness, media IDs, blocker status and covering test. Fail CI for unknown source/media IDs, blocked production entities, expired promotions, deferred indexable routes, public `TBD`, unsafe booking modes or secrets/private media.

## 17. Primary-agent adoption checklist

Before implementation is described as decision-ready, the primary agent should:

1. Review and record the accepted integrated recommendations in root `DECISIONS.md`, without relabeling owner-blocked choices as approved.
2. Run the foundation spike and create the stack ADR; keep Astro as the documented fallback if the spike fails.
3. Finalize root `IMPLEMENTATION_PLAN.md`, `DESIGN_SYSTEM.md`, `ACCEPTANCE_TESTS.md`, `SECURITY_AND_PRIVACY.md` and booking/content/media architecture documents from this report.
4. Reconcile `docs/OWNER_DECISIONS_REQUIRED.md` with ODR-016–ODR-025 so the full authority register persists.
5. Keep `docs/PROJECT_STATUS.md` and `docs/CHANGELOG.md` synchronized with real—not invented—issue, PR, review and test evidence.
6. Begin phase 0 with all external capability flags off, no production media, no customer data and no deployment mutation.
7. Repair GitHub authorization before claiming milestone issue/PR/review/merge completion.

## 18. Final QA conclusion

The project has a coherent and safe implementation path. The phase-0 product is not a diminished placeholder: it can provide strong service discovery, local information, accessible conversion paths and a truthful manual booking experience. The unresolved business inputs are contained behind typed adapters, gated content entities, omitted modules and consent-safe visual fallbacks.

Proceed with unblocked foundation and phase-0 implementation after the primary agent adopts the recommendations into the authoritative build-pack files. Do not activate scheduling, payments, notifications, uploads, analytics, domains or deployment; do not publish retained media; and do not relax milestone review gates because external GitHub authorization is currently unavailable.
