# Codex Project Rules

This file becomes active only after it is downloaded into the repository root.

## Source authority

- Use PROJECT_CONTEXT.md and approved files in this pack.
- Research facts must remain traceable to source_id; images to media_id.
- Never invent booking, payment, service, pricing, staff or policy information.
- DECISIONS.md overrides proposals; unresolved items remain blocked or stubbed.

## Implementation discipline

- Implement only approved scope from IMPLEMENTATION_PLAN.md.
- Keep booking behind a replaceable integration boundary.
- Preserve WhatsApp/phone/walk-in fallbacks.
- Build mobile-first, accessible and performance-conscious components.
- Use semantic HTML, keyboard access, visible focus, sufficient contrast and reduced-motion support.
- Optimize images and provide intentional mobile crops and alt text.
- Do not publish consent-uncleared customer imagery.

## Multi-agent ownership

- One owner per file or subsystem at a time.
- Do not overwrite another agent's work without recording the decision.
- Shared changes must update DECISIONS.md and relevant acceptance tests.
- Integrate only reviewed outputs; prototypes and experiments stay isolated.

## Quality gates

- Run formatting, linting, type checking, unit tests and production build.
- Add end-to-end tests for navigation, primary CTA, booking handoff and contact paths.
- Verify responsive layouts and accessibility before handoff.
- Do not claim completion while P0 acceptance criteria fail.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
