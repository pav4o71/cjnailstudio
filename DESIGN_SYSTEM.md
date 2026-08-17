# Approved Design System

Status: APPROVED

Direction: soft editorial femininity with operational clarity. Use `#FFF9FA` canvas, `#24191D` ink, `#7B2E4B` primary actions, `#315A9A` focus and `#FBE9EE` blush surfaces. Softer observed rose colors are decorative only.

Phase-0 typography uses local Georgia/Times display and system UI fallbacks; no third-party font request or unlicensed asset. Body copy is at least 16px with a 68ch measure.

Spacing uses 4/8/12/16/24/32/48/64/96px; breakpoints are 36/48/64/80rem; main content max is 1120px. Primary controls are 48px high and all targets at least 44×44px.

Components define default, hover, focus-visible, active, loading, disabled, empty, error, offline/withheld and reduced-motion states where relevant. Server-rendered booking fallbacks work without JavaScript.

Target WCAG 2.2 AA: semantic landmarks/headings, skip link, keyboard completion, visible unclipped focus, 200% zoom, 320px reflow, sufficient text/control contrast, programmatic form errors and no color/hover/motion-only meaning.

Complete implementation tokens/contracts and media/performance rules are in `docs/DESIGN_SYSTEM.md`.
