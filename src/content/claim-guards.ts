/**
 * Shared invented-claim denylist for unit and Playwright checks.
 * Duration/hour matches require a leading quantity so verified “opening hours”
 * and “daily hours” copy stays allowed.
 * `\bcard\b` is singular so UI copy like “these cards” does not false-positive.
 */
const blockedClaimFragments = [
  "₱",
  String.raw`\bphp\b`,
  "gcash",
  "deposit",
  "matcha",
  "beacon tower",
  "medical towers",
  "autoclave",
  String.raw`\brufa\b`,
  String.raw`\bkris\b`,
  "loyalty",
  "gift card",
  "membership",
  String.raw`\b4\.8\b`,
  String.raw`\bstars?\b`,
  String.raw`\bsterile\b`,
  String.raw`medical[\s-]+grade`,
  String.raw`\b\d+(?:\.\d+)?\s*[-–]?\s*(?:min(?:ute)?s?|hrs?|hours?)\b`,
  String.raw`\bcancell?ation\b`,
  String.raw`\bno[\s-]?shows?\b`,
  String.raw`\brefunds?\b`,
  String.raw`\bcash\b`,
  String.raw`\bcard\b`,
  String.raw`same[\s-]day`,
] as const;

export const blockedClaimPattern = new RegExp(
  blockedClaimFragments.join("|"),
  "i",
);

export const inventedClaimSamples = [
  "Rated 4.8 on Google",
  "4.8 stars",
  "sterile tools",
  "medical-grade disinfection",
  "45-minute set",
  "2 hour appointment",
  "cancellation fee",
  "no-show policy",
  "no refunds",
  "cash only",
  "we accept card",
  "same-day availability",
] as const;

export const verifiedSafeClaimSamples = [
  "Open daily, 12:00 noon–9:00 PM",
  "See address and hours",
  "What are the opening hours?",
  "These cards summarize customer themes only.",
  "Choose a starting point, then contact the studio.",
  "Walk-ins are accepted. Availability is not guaranteed, so contact the studio if you want to check before arriving.",
] as const;

export const pinnedSourceBackedCopy = {
  hygieneSummary:
    "An official studio post says tools are cleaned, disinfected and sanitized after every client.",
  walkInCaveat:
    "Walk-ins are accepted. Availability is not guaranteed, so contact the studio if you want to check before arriving.",
  categoryLabels: [
    "Nail services",
    "Custom nail art",
    "Nail extensions",
    "BIAB and BIAB infill",
    "Soft gel",
    "Lash services",
  ],
  reviewThemeHeadings: [
    "Design guidance",
    "Inspiration matching",
    "Attention to detail",
    "Friendly service",
  ],
} as const;
