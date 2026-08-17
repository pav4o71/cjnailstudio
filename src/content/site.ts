import { z } from "zod";

const evidenceSchema = z.object({
  evidenceClass: z.enum(["verified_fact", "owner_confirmation"]),
  sourceIds: z.array(z.string().min(1)).min(1),
  capturedAt: z.string().min(1),
  publishability: z.literal("publishable"),
});

const contactSchema = z.object({
  display: z.string().min(1),
  e164: z.string().regex(/^\+[1-9]\d{7,14}$/),
  evidence: evidenceSchema,
});

const serviceCategorySchema = z.object({
  id: z.enum([
    "nails",
    "custom-nail-art",
    "nail-extensions",
    "biab",
    "soft-gel",
    "lashes",
  ]),
  label: z.string().min(1),
  evidence: evidenceSchema,
});

const siteSchema = z.object({
  business: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    instagramHandle: z.string().startsWith("@"),
    evidence: evidenceSchema,
  }),
  location: z.object({
    address: z.string().min(1),
    locality: z.literal("Makati City"),
    hours: z.literal("Open daily, 12:00 noon–9:00 PM"),
    evidence: evidenceSchema,
  }),
  phone: contactSchema,
  walkIns: z.object({
    accepted: z.literal(true),
    evidence: evidenceSchema,
  }),
  services: z.array(serviceCategorySchema).length(6),
});

const capturedAt = "2026-08-17T03:09:11+02:00";

export const site = siteSchema.parse({
  business: {
    name: "Beauty Nail Studio by Cj",
    email: "thenailstudiobycj@gmail.com",
    instagramHandle: "@beautynailstudiobycj",
    evidence: {
      evidenceClass: "verified_fact",
      sourceIds: ["facebook-profile", "instagram-profile"],
      capturedAt,
      publishability: "publishable",
    },
  },
  location: {
    address:
      "G/F Unit R19, Knightsbridge Residences, Makati City, Metro Manila, Philippines 1210",
    locality: "Makati City",
    hours: "Open daily, 12:00 noon–9:00 PM",
    evidence: {
      evidenceClass: "owner_confirmation",
      sourceIds: ["facebook-profile", "D-001"],
      capturedAt,
      publishability: "publishable",
    },
  },
  phone: {
    display: "+63 961 740 0664",
    e164: "+639617400664",
    evidence: {
      evidenceClass: "verified_fact",
      sourceIds: ["facebook-profile"],
      capturedAt,
      publishability: "publishable",
    },
  },
  walkIns: {
    accepted: true,
    evidence: {
      evidenceClass: "verified_fact",
      sourceIds: ["instagram-profile"],
      capturedAt,
      publishability: "publishable",
    },
  },
  services: [
    {
      id: "nails",
      label: "Nail services",
      evidence: {
        evidenceClass: "verified_fact",
        sourceIds: ["facebook-profile"],
        capturedAt,
        publishability: "publishable",
      },
    },
    {
      id: "custom-nail-art",
      label: "Custom nail art",
      evidence: {
        evidenceClass: "verified_fact",
        sourceIds: ["instagram-profile"],
        capturedAt,
        publishability: "publishable",
      },
    },
    {
      id: "nail-extensions",
      label: "Nail extensions",
      evidence: {
        evidenceClass: "verified_fact",
        sourceIds: ["instagram-profile"],
        capturedAt,
        publishability: "publishable",
      },
    },
    {
      id: "biab",
      label: "BIAB and BIAB infill",
      evidence: {
        evidenceClass: "verified_fact",
        sourceIds: ["instagram-profile"],
        capturedAt,
        publishability: "publishable",
      },
    },
    {
      id: "soft-gel",
      label: "Soft gel",
      evidence: {
        evidenceClass: "verified_fact",
        sourceIds: ["instagram-profile"],
        capturedAt,
        publishability: "publishable",
      },
    },
    {
      id: "lashes",
      label: "Lash services",
      evidence: {
        evidenceClass: "verified_fact",
        sourceIds: ["instagram-profile"],
        capturedAt,
        publishability: "publishable",
      },
    },
  ],
});

export type SiteContent = z.infer<typeof siteSchema>;
export type ServiceCategoryId = SiteContent["services"][number]["id"];

export function mapsSearchUrl(address: string): string {
  const url = new URL("https://www.google.com/maps/search/");
  url.searchParams.set("api", "1");
  url.searchParams.set("query", address);
  return url.href;
}
