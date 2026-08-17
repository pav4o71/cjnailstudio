# Agent 2 — UX, Visual and Media Report

- Status: **WORKING RECOMMENDATION — Agent 4 review and owner approvals required**
- Prepared: 2026-08-17
- Scope owner: responsive UX, information architecture, visual system, accessibility, media selection, photo placement, and editing directions

## 1. Decision summary

Build a mobile-first, booking-led experience with one stable `/book` route, a persistent mobile booking action, and WhatsApp, phone, and walk-in alternatives that remain usable if a future booking provider fails. The launch navigation should be deliberately compact: Home, Services, Gallery, Studio, Visit, and Book. Custom Nail Art and Lashes are focused child routes of Services rather than extra primary-navigation items. FAQ is a support route; Privacy and Terms live in the footer. Matcha must remain unpublished until D-005 is resolved, and no legacy-location route should be created while D-004 remains unresolved.

Visually, use a restrained blush-and-deep-rose editorial system rather than reproducing social graphics. The observed pink palette is evidence, not an approved kit. The implementation colors below preserve the observed direction while meeting WCAG contrast requirements. Romantic type belongs in short display headings only; practical booking, service, hygiene, and location information must use a highly readable sans serif.

No retained media asset is cleared for production merely because it was business-published. The manifest authorizes internal planning and explicitly requires owner approval and, where relevant, customer/model consent before public reuse. Every proposed placement below therefore has a hard consent gate and a non-photographic or newly commissioned fallback.

## 2. Source and evidence discipline

This report uses:

- `docs/source/SOURCE_RULES.md` and `docs/source/00_READ_ME_FIRST.md` for evidence and consent rules.
- `docs/source/DECISION_LOG.md`: D-001 Knightsbridge is current; D-002 booking is primary; D-003 WhatsApp and walk-ins remain visible; D-004 legacy-location relationship is unresolved; D-005 matcha status/menu is unresolved.
- `docs/source/beauty-nail-studio-by-cj-data.json` and the research dossier for facts and evidence classifications.
- `docs/source/media-manifest.json` for every `media_id`, dimensions, provenance, and reuse limitation.
- `docs/source/strategy/MASTER_BRIEF.md` and the Agent 2 strategy templates for required outputs.

Evidence labels used in this report:

| Label | Meaning | How it may be used |
|---|---|---|
| **Approved decision** | Recorded as approved in `DECISION_LOG.md` | May control UX and public structure unless superseded |
| **Verified fact** | Official-channel fact with a `source_id` | May inform copy; time-sensitive details still need a launch check |
| **Customer/third-party evidence** | Review, directory, or aggregate evidence | Attribute or paraphrase; never turn into an unqualified business promise |
| **Recommendation / inference** | Agent 2 design judgment | Requires Agent 4 approval; it is not a business fact |
| **Blocked** | Owner, legal, operational, or consent evidence is missing | Do not publish or imply a resolution |

The current address, hours, phone, public service categories, message channels, and walk-in path are supported by `facebook-profile` and/or `instagram-profile`. The Google rating and review themes are third-party evidence from `google-maps`, not verified business claims. Prices, durations, availability, staff capacity, payment methods, deposits, policies, detailed matcha operations, and legacy-location relationships are not resolved.

## 3. Experience principles

1. **Booking is always reachable.** D-002 makes booking the primary action. Every principal page has an in-flow Book CTA; mobile also has a persistent bottom action bar.
2. **Fallbacks are never hidden.** D-003 requires WhatsApp and walk-ins; phone is a verified contact path. Provider failure must reveal these options without losing the visitor's selected category.
3. **Choose by desired result.** Let visitors start with “custom nail art,” “nail care/strength,” “extensions,” or “lashes,” then explain the verified category without inventing appointment length or price.
4. **Proof sits next to the claim.** Gallery work supports artistry; process/hygiene imagery supports care; studio/storefront imagery supports place. Review themes remain attributed to customers or the source platform.
5. **One canonical place.** Show Knightsbridge under D-001. Do not create “other branches,” redirects, or legacy-location copy until D-004 is resolved.
6. **Soft does not mean faint.** Blush surfaces may be subtle; text, controls, state messaging, and focus must remain high contrast.
7. **Media truth is preserved.** Cropping and color correction are allowed after approval; nail results, lashes, skin, people, equipment, signage, and spatial facts must not be fabricated.
8. **Blocked content does not create dead ends.** Matcha, team details, pricing, policies, and unapproved imagery use omission, honest status copy, or a safe contact path—not invented placeholders.

## 4. Responsive conversion paths

### 4.1 Core journeys

| Visitor intent | Recommended path | Primary action | Safe alternative | Success signal |
|---|---|---|---|---|
| Knows the service | Search/social → Services or Lashes → Book | Open `/book` with a category hint | WhatsApp or call | Booking handoff starts with correct known category |
| Has an inspiration image but not the service name | Home → result chooser → Gallery → service explanation → Book | Book from the related category | WhatsApp with a generic “I have an inspiration image” message | Visitor reaches contact/provider without choosing invented complexity or duration |
| Wants custom art | Gallery landing/filter → item detail or lightbox → “Explore related service” → Book | Book custom nail-art category only if mapping is approved | WhatsApp | Gallery selection survives handoff as non-binding context |
| Wants lashes | Lashes → consent-cleared result/process proof → Book | Book lashes | WhatsApp or call | Book entry reached without an unapproved model image |
| First-time visitor seeking trust | Home → Studio (care, reviews, hygiene) → Services → Book | Book | Visit or WhatsApp | Trust content does not interrupt the primary action |
| Wants a walk-in | Home/Visit → Visit → hours, current address, directions | Get directions | Call or WhatsApp | Current Knightsbridge details are visible and legacy locations are absent |
| Provider unavailable | Any Book CTA → `/book` provider-error state | WhatsApp | Call; Visit for walk-in | No blank iframe, lost selection, or false confirmation |

### 4.2 CTA hierarchy

- Primary: **Book** or **Book a visit** → stable first-party `/book` route. Never link page CTAs directly to a vendor URL.
- Secondary: **Message on WhatsApp** → verified number from `facebook-profile`.
- Tertiary: **Call the studio** and **Get directions**.
- Informational: **Walk-ins welcome** is supported by `instagram-profile`; it must not imply immediate availability.
- Do not use “instant confirmation,” “available today,” “from ₱…,” duration estimates, deposit language, or “choose your technician” until the relevant P0 decisions are approved.

### 4.3 Booking boundary and copy truth

`/book` is a presentation layer over the replaceable booking adapter owned by Agent 3. It accepts only a controlled `BookingIntent`: an allowlisted `entryPoint`, optional canonical `serviceCategoryId`, and optional public `galleryReferenceId`. These are non-authoritative hints, not free text or PII, and must not be forwarded from arbitrary query values. The adapter must not calculate duration, price, staffing, or availability from them.

Until a live provider is approved, `/book` should say: “Choose how you’d like to contact the studio.” The technical disclosure should state that the website does not confirm availability and that the studio must respond to the request. This describes the implemented state; it is not a new cancellation or confirmation policy.

Required states:

| State | UI behavior | Accessibility behavior |
|---|---|---|
| Default fallback | Book heading, short explanation, WhatsApp primary, Call secondary, Visit/walk-in link | Correct heading order; contact links expose destination in accessible name |
| Provider loading | Reserve the final widget space; show a short status, not an indeterminate full-page spinner | `aria-busy="true"`; status in `role="status"`; no focus trap |
| Provider ready | Render approved embedded or hosted handoff inside the adapter boundary | Focus moves only after user action; iframe needs a descriptive title |
| Provider error/timeout | Remove broken embed; show fallback panel and preserve category/media context | Error summary gets focus; message is in `role="alert"`; retry does not erase context |
| Offline | Explain that online booking cannot load; show call and cached address/hours if implemented | Do not depend on color or animation; links remain keyboard operable |
| Handoff success | If the provider can verify success, show provider-supplied confirmation reference only | Polite live region; never manufacture a confirmation number |

## 5. Final sitemap recommendation

### 5.1 Launch sitemap

| Route | Navigation label | Page responsibility | Primary CTA | Evidence/content dependency |
|---|---|---|---|---|
| `/` | Home | Position the studio, help visitors choose a result, show consent-cleared work and trust proof, surface current location | Book | D-001–D-003; `facebook-profile`; `instagram-profile`; approved media |
| `/services` | Services | Explain verified nail categories and how to choose; add prices/durations only after owner approval | Book | Official service catalog is P0; until then omit price/duration fields |
| `/services/custom-nail-art` | Custom Nail Art (Services child) | Serve custom-art intent with consent-cleared work, verified category copy, and a gallery-to-contact path | Book this kind of look | `instagram-profile`; cleared media; category/provider mapping remains gated |
| `/services/lashes` | Lashes (Services child) | Explain verified lash offering and show consent-cleared proof | Book lashes | `instagram-profile`; model releases; approved service details |
| `/gallery` | Gallery | Filterable, consent-cleared portfolio connected to verified categories | Book related category | Media rights/consent; approved taxonomy and service mappings |
| `/studio` | Studio | About/experience, hygiene process, attributed review themes, and team module when roster is approved | Book | Official hygiene content; `google-maps` attribution; staff details blocked |
| `/visit` | Visit | Current address, hours, phone/WhatsApp, map/directions, walk-in path | Get directions, then Book | D-001 and D-003; access/parking details remain blocked |
| `/faq` | FAQ | First-visit, service-selection, inspiration-image, contact, and approved policy answers | Book | Do not publish policy answers until owner-approved |
| `/book` | Book | Stable booking adapter and failure-safe contact handoff | Provider handoff or WhatsApp | Agent 3 integration boundary; P0 operations decisions |
| `/privacy` | Footer only | Explain actual website data processing and third parties | Contact | Must match implemented analytics/forms/provider behavior |
| `/terms` | Footer only | Website terms approved for the actual implementation | Contact | Owner/legal approval; do not invent salon policies here |

### 5.2 Consolidations and exclusions

- Merge preliminary **Reviews & Hygiene** into `/studio`. Current evidence supports a strong section, not a separate content-heavy destination. A separate route can be introduced later if original hygiene documentation and enough attributed reviews justify it.
- Merge **Contact & Directions** into `/visit`, a clearer mobile label and local-intent route.
- Keep **Custom Nail Art** and **Lashes** as focused Services child routes because both are verified offers with distinct search/user intent. They should be linked from Services and relevant gallery cards, not added to an already crowded primary navigation.
- Use nav label **Services**, not “Services & Pricing,” until an authoritative price list exists. The route and content model can reveal pricing without changing the URL later.
- Do not publish `/matcha` or put Matcha in navigation until D-005 confirms status, menu, hours, and appointment relationship. Keep the route ungenerated or `noindex` in preview; do not ship a thin “coming soon” local-search page.
- Do not publish `/locations`, Beacon Tower, Medical Towers, “Cj 2,” or cross-location schema until D-004 is resolved.
- Do not create additional service-detail routes beyond the two evidence-backed children above until the owner-approved catalog provides stable names and enough unique content. Use anchored sections or CMS IDs inside `/services` meanwhile.

### 5.3 Navigation behavior

Desktop at `64rem` and above:

- Sticky 80 px header; logo/wordmark left; Services, Gallery, Studio, Visit in the center; high-contrast Book button right.
- FAQ, WhatsApp, phone, social links, hours, address, Privacy, and Terms live in the footer.
- Current page uses both a visual indicator and `aria-current="page"`.

Mobile/tablet below `64rem`:

- 64 px top bar with text/approved logo and a Menu button. The top bar may scroll away; persistent conversion is handled by the bottom bar to preserve screen space.
- Menu opens as a modal dialog with the same information order as desktop plus FAQ and contact shortcuts. Focus is trapped inside, Escape closes, close returns focus to Menu, and background scrolling is locked.
- A bottom action bar contains one full-weight Book action and a smaller WhatsApp action. Minimum height 64 px plus `env(safe-area-inset-bottom)`. It is hidden while the menu/dialog is open and must not cover page content; page bottom padding equals its rendered height.
- Phone and walk-in details remain visible on `/visit` and `/book`, not crowded into the persistent bar.

## 6. Page-level responsive UX

| Page/section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Home hero | Copy first, CTA pair, then 4:5 artwork; no overlaid paragraph text | 5/7 split if image quality permits | 6/6 split; image remains portrait so no fabricated horizontal extension |
| Result chooser | Single-column tap targets; selection expands inline | Two-column cards | Four concise cards with equal heading baselines |
| Service sections | Stacked summaries; unknown price/duration fields omitted entirely | Two-column categories | Two-column sticky section index plus content if catalog is long |
| Gallery | Two columns only when each card remains at least 152 px; otherwise one | Three columns | Three/four columns; preserve 4:5 media ratio |
| Gallery filters | Wrapping buttons with `aria-pressed`; no select-only hidden content | Same | Same plus result count |
| Studio proof | One proof theme at a time in normal document flow; no auto-carousel | Two-up | Three-up proof cards |
| Hygiene | Numbered vertical steps | Two-column media/text | Alternating media/text without changing DOM reading order |
| Visit | Details before map; directions buttons before optional embed | Split details/map | 5/7 split; map is supplemental and lazy-loaded |
| Book | Contact fallback first; embedded provider below short context | Centered max 720 px | Centered max 800 px; do not make widget width the page width |

Avoid horizontal carousels as the only way to access services, reviews, or gallery items. If a compact teaser rail is used, provide visible controls, allow native scrolling, and repeat all content on its destination page.

## 7. Visual design system

### 7.1 Design principles

- **Editorial softness, operational clarity:** generous blush space and refined display headings around practical dark text and obvious actions.
- **Craft is the decoration:** close-up work and fine line details replace ornamental clutter.
- **Romantic, not bridal-template generic:** no pervasive scripts, lace frames, bow icons, or low-contrast pink-on-pink controls.
- **Trust is calm:** hygiene and location sections use clean white surfaces, stable alignment, and restrained iconography.
- **Mobile density is deliberate:** one main decision per viewport; support text collapses only when the user can still discover it with semantic controls.

### 7.2 Color tokens

The observed palette in `brand_signals.visual_style` is research input. `#B45D7A` with white measures about 4.39:1 and must not be the normal-size primary button/text pair. The implementation shifts interactive rose darker.

| Token | Value | Use | Contrast note |
|---|---:|---|---|
| `--color-bg` | `#FFF9FA` | Page canvas | Warm near-white |
| `--color-surface` | `#FFFFFF` | Cards, form surfaces | Neutral |
| `--color-surface-blush` | `#FBE9EE` | Editorial bands, selected chips | Ink on it ≈14.61:1 |
| `--color-ink` | `#24191D` | Primary text | On canvas ≈16.38:1 |
| `--color-muted` | `#66535A` | Secondary text | On canvas ≈6.84:1 |
| `--color-border` | `#D8C7CD` | Decorative dividers and card outlines | Never a sole control/state boundary |
| `--color-border-strong` | `#8A747C` | Input and interactive boundaries | On white ≈4.31:1 |
| `--color-rose-soft` | `#D899AB` | Decorative fills only | Do not use for text or focus |
| `--color-brand` | `#943E5D` | Strong accents and large controls | White on it ≈6.76:1 |
| `--color-brand-strong` | `#7B2E4B` | Primary CTA and links | White on it ≈9.00:1 |
| `--color-brand-deep` | `#5D2037` | Hover/active, dark accents | High contrast |
| `--color-seasonal` | `#576D8C` | Optional slate accent | White on it ≈5.29:1 |
| `--color-focus` | `#315A9A` | Focus ring and skip link | On canvas ≈6.60:1; distinct from rose |
| `--color-success` | `#1F6B4A` | Success icon/text | On white ≈6.44:1 |
| `--color-warning` | `#8A5300` | Warning icon/text | On white ≈6.33:1 |
| `--color-danger` | `#A12D33` | Error icon/text | On white ≈7.15:1 |

Never encode status through color alone. Pair status colors with icon, heading, and plain-language text. Re-test actual component pairings in automated and manual contrast checks; the ratios above are reference pairings, not blanket approval for opacity variants.

### 7.3 Typography

Recommendation/inference: self-host a licensed WOFF2 variable subset of **Fraunces** for display headings and **Inter** for UI/body, with license files retained in the repository. Until font assets and licenses are present, use the fallback stacks; do not call third-party font CDNs.

```css
--font-display: "Fraunces", Georgia, "Times New Roman", serif;
--font-ui: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: ui-monospace, "SFMono-Regular", Consolas, monospace;
```

| Token | Size / line-height | Weight | Use |
|---|---|---:|---|
| `--text-xs` | `0.75rem / 1rem` | 600 | Eyebrow; uppercase with `0.10em` tracking, never long copy |
| `--text-sm` | `0.875rem / 1.25rem` | 400/600 | Metadata and field help |
| `--text-base` | `1rem / 1.625rem` | 400 | Body and controls |
| `--text-lg` | `1.125rem / 1.75rem` | 400 | Intro copy |
| `--text-h3` | `clamp(1.375rem, 1.1rem + 0.8vw, 1.75rem) / 1.2` | 600 | Card/section heading |
| `--text-h2` | `clamp(1.875rem, 1.3rem + 1.8vw, 2.75rem) / 1.1` | 500/600 | Section heading |
| `--text-h1` | `clamp(2.5rem, 1.65rem + 3.2vw, 4.5rem) / 1.02` | 500/600 | Page title/hero |

Display faces are never used in all caps. Script/calligraphic text is restricted to an owner-approved logo asset or a short decorative word with an equivalent accessible text label; never use it for navigation, buttons, prices, form labels, or essential headings.

### 7.4 Spacing, grid, shape, and elevation

```text
spacing: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96 px
content max: 1120 px; wide media max: 1280 px; readable copy max: 68ch
gutters: 20 px base, 32 px from 48rem, 48 px from 80rem
breakpoints: 36rem, 48rem, 64rem, 80rem
radii: 8 px control, 12 px card, 20 px feature media, 999 px chip/pill
border: 1 px; selected/strong: 2 px without changing outer dimensions
shadow-1: 0 2px 12px rgb(36 25 29 / 0.08)
shadow-2: 0 12px 36px rgb(36 25 29 / 0.14) for dialogs only
```

Use CSS grid and logical properties. The DOM reading order must match the visual reading order. Never use `order` to make alternating desktop sections read incorrectly on mobile or to screen readers.

### 7.5 Motion

- Standard transition: 160 ms; dialog transition: 220 ms; `cubic-bezier(.2,.8,.2,1)`.
- Animate opacity and transform only. No parallax, continuous decorative animation, or autoplaying carousel.
- Under `prefers-reduced-motion: reduce`, remove smooth scrolling and nonessential transforms/transitions; content and state changes remain immediate.
- Never make a booking result, validation error, or toast disappear before the user dismisses it or moves on.

## 8. Component contracts and states

| Component | Implementation contract | Required states |
|---|---|---|
| `SiteHeader` | Semantic `header` + `nav`; one current-page indicator; logo has an accessible home label | Default, scrolled desktop, menu open, focus-within |
| `MobileActionBar` | Book + WhatsApp only; safe-area padding; not rendered over dialogs; content has matching bottom padding | Default, hidden in dialog, offline (WhatsApp/call still usable) |
| `Button` | 48 px default height, 44 px absolute minimum target; text label + optional leading icon; no icon-only primary actions | Default, hover, focus-visible, active, loading, disabled |
| `TextLink` | Underline in body copy; nav uses weight plus current indicator; external/contact purpose is clear | Default, hover, focus-visible, visited where useful |
| `ResultChooser` | Fieldset/legend or titled button group; selection only suggests category | Unselected, selected, focus, no-results mapping |
| `ServiceCard` | Heading, verified summary, optional approved price/duration slots, one action | Default, hover/focus, missing optional data (slot omitted) |
| `GalleryFilter` | Real buttons with `aria-pressed`; URL query reflects active filters; result count follows | Default, selected, focus, empty result |
| `GalleryCard` | Meaningful image, category text, related-service action; never a hover-only caption | Loading, ready, image error, consent-withheld fallback |
| `MediaFrame` | Intrinsic dimensions and `aspect-ratio`; `<picture>` sources; focal position token | Loading skeleton, loaded, error/fallback; reduced-data friendly |
| `ReviewCard` | Paraphrase/short approved quote, platform attribution, snapshot date when rating shown | Default; missing quote uses theme summary, not fabricated copy |
| `HygieneSteps` | Ordered list; official statements separated from customer review themes | Default; media-withheld version remains complete in text |
| `Accordion` | Native `details/summary` preferred; deep-linkable heading IDs | Closed, open, focus; no essential content hidden from search/print |
| `Field` | Persistent label, help/error IDs, `autocomplete`, correct input type; no placeholder-as-label | Empty, filled, focus, invalid, disabled, read-only |
| `StatusCallout` | Icon + heading + message + next action | Info, success, warning, error, offline |
| `BookingEntry` | Adapter shell; verified contact fallback is server-rendered before provider JS | Fallback, loading, ready, timeout/error, offline, success-if-verifiable |
| `LocationCard` | Address, hours, phone, directions; map is optional enhancement | Default, map loading/error, unverified access details omitted |
| `Dialog` | Native `dialog` or audited equivalent; labelled; focus management; close control | Opening, open, closing, reduced-motion |

State styling:

- Primary button: `#7B2E4B` / white; hover `#5D2037`; active ink-darkened; focus ring 3 px `#315A9A` with 2 px canvas offset.
- Secondary button: white / `#7B2E4B` text and 2 px border; blush hover; same focus ring.
- Disabled: neutral surface and muted text, no opacity below legibility; remove from tab order only when genuinely unavailable and explain why nearby.
- Input: 48 px minimum height, white fill, `#8A747C` border; focus 2 px `#315A9A`; invalid 2 px danger plus linked text; valid state should not celebrate on every keystroke.
- Loading: retain the control label (“Booking…”), add an adjacent spinner hidden from assistive tech, and set `aria-busy`.
- Empty gallery: state which filters produced no result, offer “Clear filters,” and never imply the studio lacks the service.
- Image failure/withheld: render stable blush geometry and the content label; never display a broken-image icon or model silhouette that could imply a result.

## 9. Accessibility acceptance contract

Target WCAG 2.2 AA as the implementation baseline.

- A skip link is the first focusable element and targets `main`.
- Exactly one descriptive `h1` per page; headings do not skip levels for styling.
- All functionality is available by keyboard with a visible focus indicator that is not clipped by overflow.
- Pointer targets are at least 44×44 CSS px; primary controls are 48 px high.
- Body text is at least 16 px; zoom to 200% and reflow at 320 CSS px without two-dimensional scrolling except an intentionally scrollable map/table.
- Text contrast is at least 4.5:1; large text at least 3:1; controls, focus, and meaningful non-text boundaries at least 3:1.
- Contact links use `tel:` and an approved WhatsApp deep link; accessible names include “WhatsApp” or “phone,” not only an icon.
- Meaningful images receive concise, context-specific alt text. Decorative texture uses `alt=""`. Do not repeat nearby captions verbatim.
- Forms expose label, help, error, and required state programmatically; errors are summarized and linked to fields; entered data survives validation failure.
- Dialog/menu focus behavior follows the contracts above. Page scroll and focus cannot escape an open modal.
- No content depends solely on hover, color, swipe, autoplay, or motion.
- `prefers-reduced-motion`, high zoom, forced-colors, dark text on light surfaces, and screen-reader announcements are manually checked.
- The bottom action bar is included in keyboard order after page content rather than being the first repeated obstacle; a landmark label distinguishes it.

## 10. Image delivery and performance rules

- Publication requires a media-rights record keyed by `media_id`: approver, approval date, ownership basis, allowed channels, expiration/revocation notes, identifiable people, and release reference.
- Store approved originals separately from generated derivatives. Derivative filenames start with the `media_id` and placement, for example `media-009-home-hero-443x554.webp`.
- Strip location/device metadata from public derivatives while preserving manifest provenance in the repository/CMS.
- Use AVIF and WebP with a JPEG fallback. Do not upscale beyond native dimensions without explicit visual QA; request originals instead.
- Suggested responsive widths: 320, 480, 640, 768, 960, 1280, and 1600, but never generate sizes larger than the source can support.
- The LCP hero is eager with `fetchpriority="high"`; all below-fold images use native lazy loading and async decoding. Do not lazy-load the LCP image.
- Give every image intrinsic width/height and a stable `aspect-ratio` to prevent layout shift.
- Art-direct mobile and desktop crops with `<picture>` when focal needs differ. Never use a CSS background for meaningful work, hygiene, studio, or location proof.
- Initial performance budgets: mobile LCP image ≤150 KB, desktop hero ≤250 KB, gallery card derivative ≤90 KB, and no third-party social-feed script at launch. Budgets are recommendations to validate against actual visual quality.
- Do not hotlink expiring social CDN URLs. Use the retained Drive original or a newly supplied approved original.

## 11. Media governance and selection audit

### 11.1 Global launch gate

The manifest states that all 30 files are internal planning copies and public reuse requires confirmation. Therefore **none of `media-001` through `media-030` is production-approved by this report**. “Selected” below means compositionally recommended after rights and consent are documented, not approved now.

Risk tiers:

- **R1 — business/location object:** owner must confirm ownership/publication rights and current accuracy; check the frame for people.
- **R2 — hand/service result or process:** owner rights plus customer/technician consent or a documented policy/release covering the depicted hands/person.
- **R3 — identifiable face/body or multiple clients:** explicit model/customer/technician release required; do not infer consent from social publication.
- **R4 — composite/promotional/reference/IP:** internal style reference only unless every embedded element, person, artwork, font, and trademark has reuse clearance.

### 11.2 All-asset disposition

| Media | Risk | Disposition | Rationale |
|---|---|---|---|
| `media-001` | R1/R3 check | Conditional: Visit/location | Best retained exterior proof; opening balloons and any people may date the scene |
| `media-002`–`media-006` | R4 | Reference only | Low-resolution fashion/moodboard composites; unknown embedded rights; use palette/mood, not pixels |
| `media-007` | R2/R3 | Alternate process; not primary | Vertical technician/client process frame; consent and frame quality required |
| `media-008` | R2 | Alternate precision process | Useful gloved-detail proof; selected only if clearer than `media-026` after original review |
| `media-009` | R2 | Conditional: Home hero + gallery | Strong mixed custom-art candidate but only 443×590 and customer-hand consent is unresolved |
| `media-010` | R2 | Reject for responsive production | 160×160 is too small; request original if the set is strategically important |
| `media-011`–`media-013` | R2 | Conditional: gallery | Distinct portfolio range; originals are modest resolution and consent is unresolved |
| `media-014` | R2 | Conditional: hygiene detail | Actual cleaning action; must not be used to imply unshown equipment or certification |
| `media-015` | R2 | Conditional: gallery | Softer manicure style balances bold sets; modest source resolution |
| `media-016` | R3 | Conditional: Studio only | Real studio experience, but clients/technicians may be identifiable |
| `media-017` | R2/R4 | Hold | Retention comparison can become an overbroad performance claim; use only as an attributed case with consent and approved wording, never a guarantee |
| `media-018` | R2/R4 | Hold from launch | Spider-Man artwork adds character/IP risk; consent and promotional-use clearance required |
| `media-019` | R4 | Reference only | Brand/CTA reference; text may date quickly and should be live HTML |
| `media-020` | R4 | Reference only | Loyalty terms are unverified; do not publish the graphic or imply a current program |
| `media-021` | R3 | Alternate lashes; blocked | Identifiable client portrait; explicit model release required |
| `media-022` | R1/R3/R4 | Alternate Visit/Studio | Video-cover collage may contain people and outdated frames; fresh stills are preferable |
| `media-023` | R3 | Conditional: Lashes | Strong result proof, strictly blocked pending explicit model release |
| `media-024` | R3 | Hold | Multiple clients; cannot be used to infer staffing or capacity; releases required |
| `media-025` | R2/R3 | Alternate process | Use only if consented and composition is cleaner than `media-026` |
| `media-026` | R2/R3 check | Conditional: craftsmanship/process | Highest-resolution process candidate; review full frame for identifiable technician/client |
| `media-027` | R3 | Alternate lashes; blocked | Identifiable lash close-up; explicit model release required |
| `media-028` | R2/R3 check | Conditional: hygiene feature | High-resolution sanitation/process cover; verify visible action and people before wording |
| `media-029` | R2 | Conditional: gallery | High-resolution manicure detail; customer-hand consent required |
| `media-030` | R2/R4 | Hold from launch | Higher-resolution Spider-Man collage but same consent/IP issue as `media-018` |

## 12. Photo placement plan

Every row is blocked until its stated release gate is satisfied.

| Page / section | `media_id` | Purpose | Desktop / mobile crop | Edit direction | Alt-text direction | Consent status and fallback |
|---|---|---|---|---|---|---|
| Home / hero | `media-009` | Immediate custom-art proof | 4:5 / 4:5, center the complete set and fingertips | Neutralize cast, recover highlight detail, keep black pad true | Describe the visible mixed nail-art set; do not claim technique not visible | **Blocked R2.** Fallback: blush editorial panel with abstract linework and service text |
| Visit / storefront | `media-001` | Establish the real place | 3:2 / 4:3; keep sign and entrance | Straighten perspective lightly; preserve signage and balloon truth | “Storefront of Beauty Nail Studio by Cj…” plus only visible location cues | **Blocked R1/R3 check.** Fallback: address card + map link; commission current empty exterior |
| Gallery / embellished | `media-011` | Show detailed embellishment | 4:5 both; keep all ten visible nails if present | Correct exposure only; no sparkle generation | Describe length, color, and embellishment only after visual QA | **Blocked R2.** Fallback: omit card, not a synthetic result |
| Gallery / bright color | `media-012` | Broaden palette/style range | 4:5 both; crop from landscape around full set | Tame cyan cast only if skin/pad remains natural | Describe visible turquoise set without naming unverified service | **Blocked R2.** Fallback: omit card |
| Gallery / monochrome | `media-013` | Demonstrate graphic custom art | 4:5 both; preserve every design motif | Lift shadows carefully; do not redraw linework | Describe visible monochrome motifs, not copyrighted meaning unless cleared | **Blocked R2.** Fallback: omit card |
| Gallery / delicate pink | `media-015` | Provide a restrained alternative | 4:5 both; retain fingertip context | Subtle white-balance and exposure correction | Describe visible pink manicure and accents | **Blocked R2.** Fallback: omit card |
| Gallery / recent detail | `media-029` | High-resolution manicure proof | 4:5 both; focus on complete result | Remove video-cover compression color cast only | Describe the visible manicure; do not infer product | **Blocked R2.** Fallback: omit card |
| Services or Studio / process | `media-026` | Show craftsmanship in progress | 4:5 both; hands/tool/action remain visible | Correct mixed light; remove only transient dust outside the work area | Describe the visible manicure step, tool only if unmistakable | **Blocked R2/R3 check.** Fallback: numbered text process + simple line icon |
| Studio / hygiene detail | `media-014` | Show real cleaning action | 4:5 both; preserve sink/tools/glove context | Cool/neutral clean grade without making surfaces unnaturally white | Describe the actual visible cleaning action | **Blocked R2.** Fallback: official hygiene statement in ordered steps, no equipment icon that implies more |
| Studio / hygiene feature | `media-028` | Support sanitation narrative | 4:5 both; select the clearest actual action from cover | Remove platform overlay only if it is not part of the scene; correct exposure | Name only the visible action/equipment after inspection | **Blocked R2/R3 check.** Fallback: same as above; commission process stills |
| Studio / experience | `media-016` | Establish real interior and atmosphere | 4:5 both; avoid cropping bodies at joints | Balance mixed lighting; retain layout, people, stations, and occupancy | Describe visible salon interior and activity; never infer capacity | **Blocked R3.** Fallback: text-led Studio section or approved empty-interior reshoot |
| Lashes / service proof | `media-023` | Show an actual lash result | 4:5 both; eye/lash result is focal, keep respectful face crop | Correct exposure only; no skin retouch or lash alteration | Describe visible lash result without style/length claims unless approved | **Blocked R3 explicit release.** Fallback: lash service text and non-result line illustration |

### 12.1 Required new photography

Prioritize these consent-cleared, high-resolution originals before launch:

1. Current exterior in daylight, no opening balloons, no bystanders, readable sign, wide and portrait frames.
2. Empty studio wide, one reception/detail frame, and accessible-entry details if applicable.
3. Hero custom-art set on a neutral surface, landscape 3:2 and portrait 4:5, documented customer/hand release.
4. At least 12 portfolio sets with consistent light and tags confirmed by the service owner.
5. Lash result close-ups with explicit model releases and no beauty-filter processing.
6. Hygiene sequence showing only actual approved practices and equipment; photograph each step separately.
7. Team portraits only after roster, role names, and releases are approved.
8. Matcha imagery only after D-005 and rights/menu verification; never stage a service not operationally confirmed.

## 13. Exact image-edit prompts

### 13.1 Universal instruction prefix

Apply this prefix to every prompt below:

> Edit the supplied asset only after its `media_id` has a documented website-use approval and every visible customer, model, technician, or hand has the required release. Treat the image as documentary business photography. Crop, straighten, remove platform UI, and make restrained global/local exposure and white-balance corrections only. Preserve the exact nail or lash result, skin texture and tone, hands, body, face and identity, tools, PPE, equipment, signage, text, furniture, spatial layout, and occupancy. Do not add, remove, rebuild, beautify, extend, or relight any service result, person, branded element, facility, product, decoration, or hygiene practice. Do not synthesize out-of-frame content. Do not remove scars, wrinkles, cuticles, texture, or distinguishing features. Do not add logos or promotional copy. Avoid heavy sharpening, HDR, fake bokeh, filters, skin smoothing, and generative upscaling. Export at or below native resolution in sRGB, strip public EXIF metadata, and visually compare the derivative with the original at 100% before approval.

### 13.2 Placement prompts

**`media-009` — Home hero**

> Target: Home split hero and gallery lead. Produce one 4:5 crop at 443×554 px (do not upscale). Keep the entire mixed nail-art set and enough fingertip/black-pad context to read as real work; place the visual center near 55% horizontal and 48% vertical so both mobile and desktop object positioning remain stable. Neutralize any green/magenta cast, recover specular highlights without dulling gloss, and lift black-pad shadow detail slightly. Remove only loose dust on the background pad if it is clearly not nail decoration. Do not change nail length, shape, polish, linework, gems, color, cuticles, skin, or hand pose. Output master TIFF/PNG plus AVIF/WebP/JPEG web derivatives.

**`media-001` — Visit storefront**

> Target: Visit location proof. Produce a desktop 3:2 crop at 957×638 px and a mobile 4:3 crop at 851×638 px, both from the native frame and without upscaling. Keep the studio sign, entrance, and enough façade context for recognition. Apply only mild vertical/perspective correction; do not make the building geometrically perfect if that cuts off the sign. Balance daylight and lift entrance shadows. Preserve every word, logo, balloon, reflection, neighboring storefront element, and architectural feature exactly; do not remove people unless they are unidentifiable accidental background figures and a rights reviewer explicitly approves removal. Do not make the opening decorations look current in the caption.

**`media-011` — Embellished gallery set**

> Target: Gallery card. Produce a 4:5 crop at 443×554 px from the 443×590 source. Center the full embellished set and retain fingertip context; crop only surplus pad/background. Correct exposure and white balance so polish color remains faithful, control clipped gem highlights, and apply minimal capture sharpening. Do not invent sparkle, repair gems, smooth skin/cuticles, change nail shape/length, or reconstruct a cropped nail.

**`media-012` — Turquoise gallery set**

> Target: Gallery card. Crop the 590×521 source to 417×521 px at 4:5 without upscaling. Select the crop that preserves the greatest number of complete nails and does not cut through the focal design. Correct overall color only enough that skin and neutral surfaces look plausible while preserving the actual turquoise polish hue. Reduce compression noise subtly. Do not shift the polish toward the brand pink palette, alter saturation selectively, retouch the hand, or fill missing lateral content.

**`media-013` — Monochrome gallery set**

> Target: Gallery card. Produce a 4:5 crop at 443×554 px. Keep all legible graphic motifs within the crop and favor complete nails over a perfectly centered hand. Lift black-pad shadows slightly while maintaining true black/white separation; reduce color cast and compression artifacts. Do not redraw, sharpen into, interpret, replace, or remove any motif; do not change line thickness, nail shape, skin, or pose.

**`media-015` — Pink gallery set**

> Target: Gallery card. Produce a 4:5 crop at 443×554 px, retaining the full delicate accents and enough hand context for authenticity. Make a restrained neutral white-balance adjustment and recover pale-pink highlight separation. Do not deepen pink to match UI tokens, add decorative accents, clean up polish boundaries, smooth skin/cuticles, or reshape nails.

**`media-029` — Manicure-detail gallery card**

> Target: Gallery card and optional Home teaser. From the 1215×2160 vertical source, produce a 4:5 crop at 1215×1519 px focused on the complete manicure result. Remove platform/video-cover UI only if it is a separate overlay and removal does not replace scene detail. Correct mixed light and exposure globally; retain natural skin texture and true polish color. Do not change the manicure, hand, jewelry, background objects, or apparent result quality.

**`media-026` — Craftsmanship process**

> Target: Services/Studio process feature. From the 1215×2160 source, produce a 4:5 crop at 1215×1519 px that includes both the active tool/technician hand and the client nail area, without cropping a visible body at a joint. Balance mixed salon lighting, protect skin and tool highlights, and reduce only obvious video-frame noise. Remove loose background dust only if it is unrelated to the procedure. Do not change grip, technique, PPE, tool, nail state, workstation, identity, or sequence implication; do not add gloves or equipment.

**`media-014` — Cleaning-tools hygiene detail**

> Target: Studio hygiene step card. Crop the 640×1136 source to 640×800 px at 4:5 around the gloved hand, actual tools, and sink/action context. Apply a clean neutral grade while preserving the real material colors; recover water/metal highlights and modest shadow detail. Do not add an autoclave, disinfectant label, sterile pouch, glove, water, sparkle, or “clean” effect. Do not remove stains/wear that are part of the actual facility or imply certification not shown.

**`media-028` — Sanitation feature**

> Target: Studio hygiene feature. From the 1290×2294 cover, produce a 4:5 crop at 1290×1613 px around the clearest genuinely visible sanitation action. Remove social-video control graphics only where underlying pixels exist or a non-semantic solid edge can be cropped; do not content-fill over tools, hands, or facilities. Correct exposure and white balance without whitening surfaces beyond reality. Preserve every visible tool, container, label, hand, glove, and workstation condition. Do not add missing sanitation steps or equipment.

**`media-016` — Studio experience**

> Target: Studio page interior feature. Produce a 4:5 crop at 640×800 px. Keep enough room/station context to establish place; do not crop any visible person at the neck, elbow, wrist, knee, or ankle. Balance mixed indoor light, gently correct verticals, and reduce video-frame noise. Preserve every person’s face, body, identity, clothing, activity, furniture, station, and occupancy; no skin retouch, face replacement, object removal, decluttering, or capacity-enhancing duplicates. If releases do not cover every recognizable person, do not export for publication.

**`media-023` — Lash result**

> Target: Lashes page result proof. Produce a respectful 4:5 crop at 720×900 px with the real eye/lashes as focal point and sufficient surrounding face context to avoid a disembodied extreme crop. Make global exposure/white-balance corrections only; preserve natural skin texture and actual lash contrast. Do not add, thicken, lengthen, separate, curl, darken, or repair lashes; do not alter eye color/shape, brows, makeup, skin, face, identity, or catchlights. No beauty filter. Export only after the depicted client’s explicit website/model release is linked to `media-023`.

## 14. Consent-safe fallbacks

Fallbacks must be real designed states, not temporary broken-image placeholders:

- Home hero: blush surface, typographic value proposition, thin abstract nail-curve line art, and a Book CTA. The line art must not depict a specific service result.
- Gallery teaser: hide unapproved cards; if no portfolio is cleared, show an honest text panel with a link to the official Instagram profile rather than embedding its feed.
- Lashes: text-led service introduction with a neutral lash-curve icon; do not use stock before/after imagery or a generated model result.
- Hygiene: ordered official text steps supported by simple generic icons. Never use an autoclave icon unless the approved copy actually names that equipment.
- Studio: typographic story plus current location facts; commission an empty-interior still instead of blurring customers.
- Visit: address, hours, phone, WhatsApp, and directions remain fully usable without a storefront image or embedded map.
- Team: omit the module until names, roles, specialties, and portraits are approved. Do not use anonymous avatars that imply staff count.
- Matcha: omit the entire module/route until D-005; do not use stock matcha photography.

## 15. Measurement and validation recommendations

These are analytics event definitions, not approval of an analytics vendor or account:

- `booking_cta_clicked` with controlled entry point, channel, and optional approved category key; this follows Agent 3's booking contract.
- `whatsapp_click`, `phone_click`, and `directions_click` with source page/component.
- `service_result_select` with controlled taxonomy key.
- `gallery_filter_apply` with filter key; never send free-form user content.
- `booking_handoff_started`, `booking_handoff_failed`, and `booking_fallback_selected` with only Agent 3's allowlisted coarse properties and no personal data.

UX acceptance checks:

1. At 320, 375, 768, 1024, and 1440 CSS px, no primary content or action is clipped, overlapped, or dependent on horizontal scrolling.
2. Book is reachable within one action from every principal page; WhatsApp and phone remain reachable if provider JavaScript is blocked.
3. The mobile action bar respects safe-area insets and does not cover the footer, validation errors, cookie controls, or dialog actions.
4. Navigation, filters, accordions, dialogs, booking fallback, and forms complete by keyboard alone with visible focus.
5. A screen reader announces menu state, selected filters, validation errors, provider loading/error/success, and result counts appropriately.
6. Reduced motion removes nonessential transitions; 200% zoom and 320 px reflow remain usable.
7. All foreground/background and non-text UI pairings pass contrast tests in their actual states.
8. Images use approved `media_id` records, correct intrinsic sizes/crops, meaningful alt, modern formats, and no expiring URLs.
9. There is no public route, navigation link, schema, or image claim for unresolved legacy locations or matcha operations.
10. No price, duration, availability, staff selection, capacity, policy, deposit, payment, or guarantee appears without approved evidence.

## 16. Decisions required before implementation/publication

| Priority | Decision/evidence needed | What remains blocked |
|---|---|---|
| P0 | Official service catalog, categories, prices, durations, add-ons, and complexity/removal rules | Final service UI, labels, mappings, and any price/duration display |
| P0 | Booking/staff/capacity/policy/payment decisions | Provider flow, availability language, deposits/payments, confirmation states |
| P0/P1 | Rights approval and release record for each selected `media_id` | All retained media publication |
| P1 | Current high-resolution originals | Retina-quality hero/gallery and faithful mobile art direction |
| P1 | D-004 legacy-location relationship | Legacy redirects, branch pages, multi-location schema |
| P0 | D-005 matcha status/menu/hours/appointment relationship | Matcha route/module/media |
| P1 | Staff roster, roles, specialties, and portrait releases | Team module and staff-selection UI |
| P1/P2 | Parking, entry, accessibility, landmark, and map-pin details | Detailed first-visit/directions content |
| P1 | Original logo, font files/licenses, and formal brand kit | Final wordmark treatment; observed system may proceed only as approved recommendation |

## 17. Agent 4 handoff

Agent 4 should reconcile this report with Agent 1’s final content/SEO strategy and Agent 3’s booking boundary. When approved, copy the relevant decisions into repository-owned `docs/SITEMAP.md`, `docs/DESIGN_SYSTEM.md`, `docs/PHOTO_PLACEMENT_PLAN.md`, and `docs/IMAGE_EDIT_PROMPTS.md`, preserving the evidence labels and consent gates. If a shared decision changes—especially sitemap, booking handoff, media approval, or matcha/location treatment—record it in the decision log and update acceptance tests before implementation.

This report recommends structure and implementation rules; it does not approve business operations, legal copy, customer imagery, or a production booking/payment provider.
