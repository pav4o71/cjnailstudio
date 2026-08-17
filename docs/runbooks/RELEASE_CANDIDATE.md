# Release-candidate tag checklist

`IMPLEMENTATION_PLAN.md` Milestone 6 exit includes tagging `release-candidate` on smoke-tested `main` after required PR/CI/review gates are green.

**Status:** annotated tag `release-candidate` exists on `8647cea9581e59ab6914a496d5aacf825a685117` (merge of PR [#6](https://github.com/pav4o71/cjnailstudio/pull/6)). Production deploy remains a **separate** ODR-024 authorization. The tag is not a go-live.

## Merged stack on main

| Milestone | Branch | PR | Merge commit |
| --- | --- | --- | --- |
| 2 | `codex/milestone-2-design-system` | [#2](https://github.com/pav4o71/cjnailstudio/pull/2) | `edb5efc69d16d08f07c49a3f8ba1375bd551d760` |
| 3 | `codex/milestone-3-pages-content` | [#3](https://github.com/pav4o71/cjnailstudio/pull/3) | `b7bc8d31151f8ae7cb63d8c85e89f208bc7154b5` |
| 4 | `codex/milestone-4-booking` | [#4](https://github.com/pav4o71/cjnailstudio/pull/4) | `b76d4e220c7c3af32fd7209914499171ec8e7f85` |
| 5 | `codex/milestone-5-quality` | [#5](https://github.com/pav4o71/cjnailstudio/pull/5) | `f188ae5db99ce9643d4160c854eba44a7bb2b55b` |
| 6 | `codex/milestone-6-release` | [#6](https://github.com/pav4o71/cjnailstudio/pull/6) | `8647cea9581e59ab6914a496d5aacf825a685117` |

## Completed operator steps

1. Merged stacked PRs in order (#2, then #3, then #4, then #5, then #6) after CI was green.
2. Smoke-tested tagged `main`: format, lint, typecheck, unit, production build, Playwright (Home, Services, Gallery fallback, Book manual-handoff, Visit, WhatsApp, phone).
3. Confirmed fail-closed indexation and no-op analytics (ODR-024 / ODR-019 unchanged).
4. Created annotated tag `release-candidate` on `8647cea9581e59ab6914a496d5aacf825a685117`.

## Out of scope for the tag

- Live booking provider, payments, notifications (ODR-025)
- Production domain/DNS (ODR-024)
- Search indexation flip (`INDEXATION.md`)
- Analytics destination (ODR-019)
- Consent-uncleared media (D-010)
- Netlify production publish
