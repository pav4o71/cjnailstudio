import { approvedProductionOrigin } from "../content/production-origin";

export function shouldSendNoindexRobotsTag(
  env: NodeJS.Dict<string> = process.env,
): boolean {
  if (!approvedProductionOrigin) {
    return true;
  }

  const context = env.CONTEXT;
  if (context === "deploy-preview" || context === "branch-deploy") {
    return true;
  }

  const prime = env.DEPLOY_PRIME_URL ?? env.DEPLOY_URL ?? "";
  return prime.includes("--");
}

const alwaysOnHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      'camera=(), microphone=(), geolocation=(), payment=("https://booking.pavells.com"), clipboard-write=("https://booking.pavells.com")',
  },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://booking.pavells.com; frame-src https://booking.pavells.com; connect-src 'self'; object-src 'none'",
  },
] as const;

export function buildSecurityHeaders(
  env: NodeJS.Dict<string> = process.env,
): Array<{ key: string; value: string }> {
  if (!shouldSendNoindexRobotsTag(env)) {
    return [...alwaysOnHeaders];
  }

  return [
    ...alwaysOnHeaders,
    { key: "X-Robots-Tag", value: "noindex, nofollow" },
  ];
}

export const securityHeaders = buildSecurityHeaders();
