# Release-candidate tag checklist

`IMPLEMENTATION_PLAN.md` Milestone 6 exit includes tagging `release-candidate` on smoke-tested `main` after required PR/CI/review gates are green.

**Do not create that tag now.** Milestones 2–5 are not merged to `main`. Tagging `main` at `8f06d44` (Milestone 1 only) would mislabel the release.

## Current stack (not on main)

| Milestone | Branch | PR | Merge status |
| --- | --- | --- | --- |
| 2 | `codex/milestone-2-design-system` | [#2](https://github.com/pav4o71/cjnailstudio/pull/2) | Draft; not merged |
| 3 | `codex/milestone-3-pages-content` | [#3](https://github.com/pav4o71/cjnailstudio/pull/3) | Draft; stacked on #2 |
| 4 | `codex/milestone-4-booking` | [#4](https://github.com/pav4o71/cjnailstudio/pull/4) | Draft; stacked on #3 |
| 5 | `codex/milestone-5-quality` | [#5](https://github.com/pav4o71/cjnailstudio/pull/5) | Draft; stacked on #4 |
| 6 | `codex/milestone-6-release` | None until parent review | Branch only |

## When a later operator may tag

1. Merge the stacked PRs in order (#2, then #3, then #4, then #5) after their reviews and CI are green.
2. Review Milestone 6 against Milestone 5 HEAD `6505fdd96ff302b3b95650f91c87093ea96e069d`, then merge M6 to the updated `main`.
3. Smoke-test `main`: Home, Services, Gallery fallback, Book manual-handoff, Visit, WhatsApp, phone.
4. Confirm fail-closed indexation and no-op analytics unless ODR-024 / ODR-019 have flipped.
5. Create annotated tag `release-candidate` on that `main` commit only.
6. Production deploy remains a **separate** ODR-024 authorization. The tag is not a go-live.

## Out of scope for the tag

- Live booking provider, payments, notifications (ODR-025)
- Production domain/DNS (ODR-024)
- Search indexation flip (`INDEXATION.md`)
- Analytics destination (ODR-019)
- Consent-uncleared media (D-010)
