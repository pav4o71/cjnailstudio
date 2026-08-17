import { z } from "zod";

export const capturedAt = "2026-08-17T03:09:11+02:00";

export const allowedSourceIds = [
  "facebook-profile",
  "instagram-profile",
  "google-maps",
  "D-001",
  "D-002",
  "D-003",
  "D-006",
  "D-010",
  "D-011",
  "ODR-003",
  "SECURITY_AND_PRIVACY",
] as const;

export type AllowedSourceId = (typeof allowedSourceIds)[number];

export const evidenceSchema = z.object({
  evidenceClass: z.enum([
    "verified_fact",
    "owner_confirmation",
    "official_content_claim",
    "customer_opinion",
  ]),
  sourceIds: z.array(z.enum(allowedSourceIds)).min(1),
  capturedAt: z.string().min(1),
  publishability: z.enum(["publishable", "attribution_required"]),
});

export type Evidence = z.infer<typeof evidenceSchema>;

export const copyBlockSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  evidence: evidenceSchema,
});

export type CopyBlock = z.infer<typeof copyBlockSchema>;

export function verifiedFact(sourceIds: readonly AllowedSourceId[]): Evidence {
  return {
    evidenceClass: "verified_fact",
    sourceIds: [...sourceIds],
    capturedAt,
    publishability: "publishable",
  };
}

export function officialClaim(sourceIds: readonly AllowedSourceId[]): Evidence {
  return {
    evidenceClass: "official_content_claim",
    sourceIds: [...sourceIds],
    capturedAt,
    publishability: "attribution_required",
  };
}

export function customerOpinion(
  sourceIds: readonly AllowedSourceId[],
): Evidence {
  return {
    evidenceClass: "customer_opinion",
    sourceIds: [...sourceIds],
    capturedAt,
    publishability: "attribution_required",
  };
}

export function ownerConfirmation(
  sourceIds: readonly AllowedSourceId[],
): Evidence {
  return {
    evidenceClass: "owner_confirmation",
    sourceIds: [...sourceIds],
    capturedAt,
    publishability: "publishable",
  };
}
