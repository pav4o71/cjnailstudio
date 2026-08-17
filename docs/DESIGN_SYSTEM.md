# Design System

Status: APPROVED FOR PHASE-0 IMPLEMENTATION

## Direction

Soft editorial femininity with operational clarity: warm blush surfaces, dark readable text, deep-rose actions, restrained decoration and spacious layouts. Craft and service information carry the hierarchy; scripts, bows, lace and low-contrast pink-on-pink controls do not.

## Tokens

```css
:root {
  --color-bg: #fff9fa;
  --color-surface: #ffffff;
  --color-surface-blush: #fbe9ee;
  --color-ink: #24191d;
  --color-muted: #66535a;
  --color-border: #d8c7cd;
  --color-border-strong: #8a747c;
  --color-rose-soft: #d899ab;
  --color-brand: #943e5d;
  --color-brand-strong: #7b2e4b;
  --color-brand-deep: #5d2037;
  --color-seasonal: #576d8c;
  --color-focus: #315a9a;
  --color-success: #1f6b4a;
  --color-warning: #8a5300;
  --color-danger: #a12d33;

  --font-display: Georgia, "Times New Roman", serif;
  --font-ui: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  --radius-control: 0.5rem;
  --radius-card: 0.75rem;
  --radius-feature: 1.25rem;
  --radius-pill: 999px;
  --shadow-card: 0 2px 12px rgb(36 25 29 / 8%);
  --shadow-dialog: 0 12px 36px rgb(36 25 29 / 14%);
  --content: 70rem;
  --content-wide: 80rem;
  --measure: 68ch;
}
```

Research suggested Fraunces/Inter, but no font assets or license packet is approved. Phase 0 uses the local fallback stacks above and makes no third-party font request.

## Type scale

- Eyebrow: 0.75rem/1rem, 600, 0.10em uppercase tracking.
- Metadata: 0.875rem/1.25rem.
- Body/control: 1rem/1.625rem.
- Intro: 1.125rem/1.75rem.
- H3: `clamp(1.375rem, 1.1rem + 0.8vw, 1.75rem)`, 1.2 line height.
- H2: `clamp(1.875rem, 1.3rem + 1.8vw, 2.75rem)`, 1.1.
- H1: `clamp(2.5rem, 1.65rem + 3.2vw, 4.5rem)`, 1.02.

Use one H1 per page. Display text is never essential script or all caps.

## Layout

- Gutters: 20px base, 32px from 48rem, 48px from 80rem.
- Breakpoints: 36rem, 48rem, 64rem and 80rem.
- Main content max: 1120px; wide media: 1280px; readable copy: 68ch.
- CSS Grid and logical properties; DOM reading order always matches visual order.
- Page bottom padding accounts for the rendered mobile action bar and safe-area inset.

## Component contracts

| Component | Contract and states |
| --- | --- |
| Header/navigation | Semantic landmarks, current-page indicator plus `aria-current`; accessible modal menu on small screens |
| Mobile action bar | Book + WhatsApp, safe-area aware, hidden while a dialog is open |
| Button | 48px preferred/44px minimum target; default, hover, focus-visible, active, loading and disabled states |
| Result chooser | Titled button group; selection suggests a category but never calculates a service |
| Service card | Verified label/summary; optional data slots are omitted when unknown |
| Gallery/filter | Real `aria-pressed` buttons, result count, stable fallback and clear-filters action |
| Media frame | Intrinsic size/aspect ratio, intentional alt text and consent-aware fallback |
| Review/proof card | Attribution and evidence class; no fabricated quotation |
| FAQ | Native `details/summary` with deep-linkable headings |
| Booking entry | Server-rendered contact fallback before optional provider JavaScript |
| Location card | Address, hours, contact and directions; map is optional enhancement |
| Status callout | Icon, heading, message and next action; never color alone |

## Accessibility

Target WCAG 2.2 AA:

- first-focus skip link;
- keyboard-complete operation and unclipped visible focus;
- 44×44px minimum pointer targets;
- body text at least 16px;
- 200% zoom and 320px reflow without page-level horizontal scrolling;
- 4.5:1 body-text contrast and 3:1 meaningful UI boundaries;
- labels/help/errors programmatically connected;
- no interaction depends on color, hover, motion, swipe or autoplay;
- reduced-motion and forced-colors checks;
- accessible contact-link names that state WhatsApp/phone purpose.

## Motion

Use 160ms standard and 220ms dialog transitions, limited to opacity/transform. Remove nonessential transitions and smooth scrolling under `prefers-reduced-motion: reduce`. No parallax, autoplay carousel or continuous animation.

## Media and performance

- Never hotlink social CDNs.
- Publication requires a rights/consent record keyed by `media_id`.
- Do not upscale; request approved originals.
- Use intrinsic dimensions, stable aspect ratios and modern derivatives.
- Lab budgets: mobile LCP image ≤150KB, desktop hero ≤250KB, gallery derivative ≤90KB.
- No third-party social-feed script at launch.
