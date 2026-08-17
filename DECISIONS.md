# Implementation Decisions

Status: ACTIVE

| ID | Status | Decision | Rationale / evidence | Affected interfaces |
| --- | --- | --- | --- | --- |
| D-001 | Approved owner decision | Treat Knightsbridge as the current public location | Official Facebook and Google Maps agree | Content, Visit, SEO, structured data |
| D-002 | Approved owner decision | Booking is the primary website conversion | Owner instruction | Navigation, CTA hierarchy, analytics |
| D-003 | Approved owner decision | Keep WhatsApp and walk-in paths visible | Current official channels use both | Booking adapter, footer, Visit |
| D-004 | Pending owner | Relationship to Beacon Tower/Medical Towers entries | Conflicting public listings | Redirects, location pages, schema |
| D-005 | Pending owner | Exact matcha-café status and menu | Promoted publicly; operations incomplete | Routes, navigation, content, media |
| D-006 | Approved architecture | Phase 0 uses a provider-neutral `manual-handoff` booking mode | Operating rules are incomplete; verified contact paths exist | `/book`, adapters, tests, rollback |
| D-007 | Approved architecture | Use static-first Next.js App Router with strict TypeScript | Highest integrated score; supports static launch and isolated future server boundaries | Framework, CI, deployment artifact |
| D-008 | Approved content | Launch the compact sitemap in `docs/SITEMAP.md`; omit blocked/thin routes | Specialist consensus and evidence gates | Routes, navigation, SEO |
| D-009 | Approved accessibility/design | Adopt the accessible blush/deep-rose system and system-font fallbacks | Preserves brand direction while meeting contrast/licensing constraints | Tokens, components |
| D-010 | Approved media safety | Publish no retained social asset by default | Manifest permits planning use only; consent not documented | Gallery, hero, Studio, Lashes |
| D-011 | Approved privacy | Phase 0 collects no first-party booking PII; analytics is no-op | Data minimization and missing provider/legal authority | Forms, storage, telemetry |
| D-012 | Approved integration boundary | Payments, notifications and uploads remain separate disabled capabilities | Owner inputs, credentials and security/legal gates are missing | Future ports/adapters |
| D-013 | Approved IA | Site chrome (header, mobile menu, footer and action bar) follows the approved compact sitemap in `docs/SITEMAP.md`, including links to Milestone 3 destinations that may still be honest 404s | Prevents navigation drift; Milestone 2 owns chrome, Milestone 3 owns page content | Header, menu, footer, tests |
| D-014 | Approved architecture | Post-release-candidate visual polish is authorized as original CSS/SVG studio art, conversion rearrangements of verified facts, a noindex Netlify preview URL, reduced-motion-safe micro-interactions, and an original Open Graph graphic. Live scheduling, payments, prices, retained social/customer photos, analytics destination, and production domain remain off. | Owner chose beauty-first sequence after the release candidate. D-010, ODR-011, ODR-024, and ODR-025 are unchanged. | Hero, `MediaFallback`, Home/Book copy, Netlify preview, motion, Open Graph image |

Pending decisions are never represented as final configuration. Any change to a shared decision requires a new row, rationale and affected acceptance-test update.
