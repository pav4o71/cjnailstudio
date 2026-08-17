# Image Edit Prompts

Status: APPROVED FOR USE ONLY AFTER THE MATCHING MEDIA CONSENT GATE CLEARS

## Universal instruction

Edit the supplied asset only after its `media_id` has documented website-use approval and every visible customer, model, technician or hand has the required release. Treat it as documentary business photography. Crop, straighten and make restrained exposure/white-balance corrections only. Preserve the exact nail/lash result, skin texture/tone, identity, tools, PPE, equipment, signage, furniture, spatial layout and occupancy. Do not add, remove, rebuild, beautify, extend or relight service results, people, branded elements, facilities or hygiene practices. Do not synthesize out-of-frame content, retouch bodies/skin/cuticles, add promotional copy, or use generative upscaling. Export at or below native resolution in sRGB, strip public EXIF and visually compare the derivative with the original at 100%.

## Placement-specific prompts

- **`media-009` — Home hero:** produce a 443×554 4:5 crop without upscaling. Keep the complete mixed set and fingertip/black-pad context. Neutralize cast, recover highlights and lift pad shadows slightly. Do not alter nail length, shape, color, linework, gems, cuticles, skin or pose.
- **`media-001` — Visit:** produce 957×638 3:2 and 851×638 4:3 crops from the native frame. Keep sign, entrance and façade context. Correct perspective/light mildly; preserve words, logo, decorations, reflections and architecture.
- **`media-011` — Gallery:** produce a 443×554 4:5 crop centered on the full embellished set. Correct exposure/white balance and control gem highlights. Do not invent sparkle, repair gems or retouch hand/nails.
- **`media-012` — Gallery:** crop to 417×521 4:5 around the greatest number of complete nails. Preserve actual turquoise hue and plausible skin/neutral colors. Do not recolor toward brand pink or fill missing content.
- **`media-013` — Gallery:** produce a 443×554 4:5 crop preserving every legible motif and complete nail. Lift pad shadows gently. Do not redraw, interpret or change motif/linework.
- **`media-015` — Gallery:** produce a 443×554 4:5 crop retaining delicate accents and hand context. Recover pale-pink highlight separation without deepening color or retouching polish/skin.
- **`media-029` — Gallery:** produce a 1215×1519 4:5 crop focused on the complete manicure. Remove platform overlay only when it is separate UI with real underlying pixels. Preserve manicure, hand, jewelry and scene.
- **`media-026` — Process:** produce a 1215×1519 4:5 crop containing active tool/technician hand and client nail area without awkward body crops. Balance mixed light and noise only. Do not change PPE, grip, technique, tool or nail state.
- **`media-014` — Hygiene:** crop to 640×800 4:5 around the gloved hand, tools and sink/action. Apply a neutral grade. Do not add equipment, labels, gloves, water or “clean” effects or hide real wear.
- **`media-028` — Hygiene:** crop to 1290×1613 4:5 around the clearest visible sanitation action. Crop/remove UI only where genuine scene pixels remain. Do not whiten reality or add missing steps/equipment.
- **`media-016` — Studio:** crop to 640×800 4:5 with room/station context and respectful people crops. Balance mixed light and modest verticals. Do not alter any person, occupancy, furniture or activity.
- **`media-023` — Lashes:** crop to 720×900 4:5 with the real eye/lashes as focal point and respectful surrounding context. Global light/color correction only; no lash, eye, brow, makeup, skin or identity alteration.

If a gate does not clear, use the matching fallback in `docs/PHOTO_PLACEMENT_PLAN.md`. Never synthesize a service result as a substitute.
