import { z } from "zod";

import {
  copyBlockSchema,
  customerOpinion,
  officialClaim,
  ownerConfirmation,
  verifiedFact,
} from "@/src/content/evidence";
import { site, type ServiceCategoryId } from "@/src/content/site";
import { bookingHref } from "@/src/domain/booking";

const pageMetaSchema = z.object({
  path: z.string().startsWith("/"),
  title: z.string().min(1),
  description: z.string().min(1),
  h1: z.string().min(1),
});

export const pageMetadata = z
  .object({
    home: pageMetaSchema,
    services: pageMetaSchema,
    customNailArt: pageMetaSchema,
    lashes: pageMetaSchema,
    gallery: pageMetaSchema,
    studio: pageMetaSchema,
    visit: pageMetaSchema,
    faq: pageMetaSchema,
    book: pageMetaSchema,
    privacy: pageMetaSchema,
    terms: pageMetaSchema,
  })
  .parse({
    home: {
      path: "/",
      title: "Beauty Nail Studio by Cj | Nail & Lash Studio in Makati",
      description:
        "Explore custom nail art, BIAB, soft gel, nail extensions and lash services at Knightsbridge, Makati. Book, WhatsApp or call the studio.",
      h1: "Bring the look you have in mind.",
    },
    services: {
      path: "/services",
      title: "Nail & Lash Services in Makati",
      description:
        "See the nail and lash service categories available at Beauty Nail Studio by Cj in Knightsbridge, Makati.",
      h1: "Nail and lash services",
    },
    customNailArt: {
      path: "/services/custom-nail-art",
      title: "Custom Nail Art in Makati",
      description:
        "Ask about custom nail art at Beauty Nail Studio by Cj in Knightsbridge, Makati, then book or message the studio about your look.",
      h1: "Custom nail art in Knightsbridge, Makati",
    },
    lashes: {
      path: "/services/lashes",
      title: "Lash Extensions in Makati",
      description:
        "Ask about lash services at Beauty Nail Studio by Cj in Knightsbridge, Makati. Book or message the studio.",
      h1: "Lash extensions in Makati",
    },
    gallery: {
      path: "/gallery",
      title: "Nail Art Gallery",
      description:
        "Website gallery information and a consent-safe contact path for Beauty Nail Studio by Cj in Knightsbridge, Makati.",
      h1: "Nail art by Beauty Nail Studio by Cj",
    },
    studio: {
      path: "/studio",
      title: "Our Knightsbridge Studio",
      description:
        "Visit Beauty Nail Studio by Cj at Knightsbridge Residences in Makati. See hours, care notes and how to book or message the studio.",
      h1: "Our Knightsbridge studio",
    },
    visit: {
      path: "/visit",
      title: "Visit the Knightsbridge Studio",
      description:
        "Find the address, daily hours, phone, WhatsApp, email and directions for Beauty Nail Studio by Cj in Makati.",
      h1: "Visit Beauty Nail Studio by Cj in Makati",
    },
    faq: {
      path: "/faq",
      title: "First-Visit Questions",
      description:
        "Verified location, hours, contact, walk-in and service-category answers for Beauty Nail Studio by Cj in Makati.",
      h1: "First-visit questions",
    },
    book: {
      path: "/book",
      title: "Book or Contact the Studio",
      description:
        "Contact Beauty Nail Studio by Cj by WhatsApp or phone, or view the Knightsbridge studio details.",
      h1: "Book or contact the studio",
    },
    privacy: {
      path: "/privacy",
      title: "Privacy",
      description:
        "How this phase-0 website handles information: no first-party booking forms, uploads or payments, and what external contact tools may collect.",
      h1: "Privacy on this website",
    },
    terms: {
      path: "/terms",
      title: "Website Terms",
      description:
        "Website-use terms for Beauty Nail Studio by Cj. Contacting the studio through this site does not confirm an appointment.",
      h1: "Website terms",
    },
  });

export const layoutMetadata = {
  title: {
    default: pageMetadata.home.title,
    template: "%s | Beauty Nail Studio by Cj",
  },
  description: pageMetadata.home.description,
} as const;

const pageCopySchema = z.object({
  homeLede: copyBlockSchema,
  servicesIntro: copyBlockSchema,
  customNailArtIntro: copyBlockSchema,
  lashesIntro: copyBlockSchema,
  galleryFallback: copyBlockSchema,
  lashesMedia: copyBlockSchema,
  studioIntro: copyBlockSchema,
  hygiene: copyBlockSchema,
  walkIn: copyBlockSchema,
  visitIntro: copyBlockSchema,
  bookIntro: copyBlockSchema,
  bookIntent: copyBlockSchema,
  bookLoading: copyBlockSchema,
  bookUnavailable: copyBlockSchema,
  bookError: copyBlockSchema,
  bookReturn: copyBlockSchema,
  privacyIntro: copyBlockSchema,
  termsIntro: copyBlockSchema,
});

export const pageCopy = pageCopySchema.parse({
  homeLede: {
    id: "home-lede",
    text: `Explore custom nail art, BIAB, soft gel, nail extensions and lash services at ${site.business.name} in Knightsbridge, Makati. ${site.location.hours}.`,
    evidence: verifiedFact(["facebook-profile", "instagram-profile", "D-001"]),
  },
  servicesIntro: {
    id: "services-intro",
    text: "Come with a saved look or start with a category. Ask the studio to confirm what suits the look you have in mind.",
    evidence: verifiedFact(["facebook-profile", "instagram-profile"]),
  },
  customNailArtIntro: {
    id: "custom-nail-art-intro",
    text: "Custom nail art is offered at the Knightsbridge studio. Come with the look you have in mind, then book or message the studio to talk it through. The website does not map a photo to a specific service.",
    evidence: verifiedFact(["instagram-profile", "D-001"]),
  },
  lashesIntro: {
    id: "lashes-intro",
    text: `Lash services are available at ${site.business.name} in Knightsbridge, Makati. Message or book with the studio to ask about the current options.`,
    evidence: verifiedFact(["instagram-profile", "facebook-profile", "D-001"]),
  },
  galleryFallback: {
    id: "gallery-fallback",
    text: "Portfolio images are being reviewed for website-use rights and customer consent. No social image is published here by default. You can still discuss the look you have in mind with the studio, or see official posts on Instagram.",
    evidence: ownerConfirmation(["D-010"]),
  },
  lashesMedia: {
    id: "lashes-media",
    text: "Lash services are offered, but no customer or model photo is published here. Ask the studio about current options.",
    evidence: ownerConfirmation(["D-010", "instagram-profile"]),
  },
  studioIntro: {
    id: "studio-intro",
    text: `Find ${site.business.name} at ${site.location.address}. ${site.location.hours}.`,
    evidence: verifiedFact(["facebook-profile", "D-001"]),
  },
  hygiene: {
    id: "hygiene-official-statement",
    text: "An official studio post says tools are cleaned, disinfected and sanitized after every client.",
    evidence: officialClaim(["facebook-profile"]),
  },
  walkIn: {
    id: "walk-ins-accepted",
    text: "Walk-ins are accepted. Availability is not guaranteed, so contact the studio if you want to check before arriving.",
    evidence: ownerConfirmation(["instagram-profile", "ODR-003"]),
  },
  visitIntro: {
    id: "visit-intro",
    text: "Use the verified Knightsbridge address, daily hours and studio contact paths below. Parking, building entry and landmark directions are not published yet.",
    evidence: verifiedFact(["facebook-profile", "D-001"]),
  },
  bookIntro: {
    id: "book-intro",
    text: "Choose how you'd like to contact the studio. The website does not show live availability or confirm an appointment.",
    evidence: ownerConfirmation(["D-006"]),
  },
  bookIntent: {
    id: "book-intent-note",
    text: "Ask the studio to check what is available. Choosing a category here is not an appointment.",
    evidence: ownerConfirmation(["D-006"]),
  },
  bookLoading: {
    id: "book-loading",
    text: "WhatsApp, phone and visit options stay available. A live booking service is not connected.",
    evidence: ownerConfirmation(["D-006", "ODR-008"]),
  },
  bookUnavailable: {
    id: "book-unavailable",
    text: "Online scheduling is not available on this website. Use WhatsApp, phone or a walk-in visit instead.",
    evidence: ownerConfirmation(["D-006", "D-012", "ODR-008", "ODR-025"]),
  },
  bookError: {
    id: "book-error",
    text: "The website could not complete an online booking step. WhatsApp, phone and walk-in options still work.",
    evidence: ownerConfirmation(["D-006", "ODR-008"]),
  },
  bookReturn: {
    id: "book-return",
    text: "If you came back from another site, this page still cannot confirm an appointment. Contact the studio to check your request.",
    evidence: ownerConfirmation(["D-006", "D-011"]),
  },
  privacyIntro: {
    id: "privacy-intro",
    text: "This notice describes the website as it is implemented now. It is not a substitute for a later owner-approved privacy policy if booking, payments, uploads or analytics are enabled.",
    evidence: ownerConfirmation(["D-011", "SECURITY_AND_PRIVACY"]),
  },
  termsIntro: {
    id: "terms-intro",
    text: "These terms describe website use and the current booking handoff. They are not a substitute for owner-approved salon operating rules.",
    evidence: ownerConfirmation(["D-006", "SECURITY_AND_PRIVACY"]),
  },
});

const reviewThemeSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  text: z.string().min(1),
  attribution: z.string().min(1),
  evidence: copyBlockSchema.shape.evidence,
});

export const reviewThemes = z
  .array(reviewThemeSchema)
  .length(4)
  .parse([
    {
      id: "theme-design-guidance",
      heading: "Design guidance",
      text: "Customers mention help choosing a look.",
      attribution:
        "Attributed Google review theme · captured 17 August 2026. Not a studio promise.",
      evidence: customerOpinion(["google-maps"]),
    },
    {
      id: "theme-inspiration-matching",
      heading: "Inspiration matching",
      text: "Customers mention bringing inspiration and having it matched.",
      attribution:
        "Attributed Google review theme · captured 17 August 2026. Not a studio promise.",
      evidence: customerOpinion(["google-maps"]),
    },
    {
      id: "theme-attention-to-detail",
      heading: "Attention to detail",
      text: "Customers mention careful, detailed work.",
      attribution:
        "Attributed Google review theme · captured 17 August 2026. Not a studio promise.",
      evidence: customerOpinion(["google-maps"]),
    },
    {
      id: "theme-friendly-service",
      heading: "Friendly service",
      text: "Customers mention a warm, welcoming visit.",
      attribution:
        "Attributed Google review theme · captured 17 August 2026. Not a studio promise.",
      evidence: customerOpinion(["google-maps"]),
    },
  ]);

const chooserOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  href: z.string().startsWith("/"),
});

export const resultChooser = z.array(chooserOptionSchema).parse([
  {
    id: "chooser-custom-nail-art",
    label: "I want custom nail art",
    href: "/services/custom-nail-art",
  },
  {
    id: "chooser-lashes",
    label: "I want lashes",
    href: "/services/lashes",
  },
  {
    id: "chooser-nail-services",
    label: "I want nail services",
    href: "/services",
  },
  {
    id: "chooser-unsure",
    label: "I'm not sure yet",
    href: bookingHref({ entryPoint: "home" }),
  },
]);

export const privacySections = z.array(copyBlockSchema).parse([
  {
    id: "privacy-no-first-party-collection",
    text: "This website does not include a first-party booking or contact form, customer database, inspiration-image upload, checkout or automated notification.",
    evidence: ownerConfirmation(["D-011", "SECURITY_AND_PRIVACY"]),
  },
  {
    id: "privacy-analytics",
    text: "Analytics is a no-op on this site. No marketing destination is configured, and navigation does not depend on tracking.",
    evidence: ownerConfirmation(["D-011", "SECURITY_AND_PRIVACY"]),
  },
  {
    id: "privacy-external-handoffs",
    text: "WhatsApp, phone, email, Instagram and Google Maps search are external services. If you use those links, their operators process the information you send them under their own terms.",
    evidence: ownerConfirmation(["D-003", "SECURITY_AND_PRIVACY"]),
  },
  {
    id: "privacy-contact",
    text: `Questions about this notice can be sent to ${site.business.email} or ${site.phone.display}.`,
    evidence: verifiedFact(["facebook-profile"]),
  },
]);

export const termsSections = z.array(copyBlockSchema).parse([
  {
    id: "terms-information-only",
    text: "This website provides studio information and contact paths. Using it does not create an appointment, reservation or contract for a salon service.",
    evidence: ownerConfirmation(["D-006"]),
  },
  {
    id: "terms-manual-handoff",
    text: "Booking on this site is a manual handoff to WhatsApp, a phone call or a walk-in visit. The website does not show live availability or confirm bookings.",
    evidence: ownerConfirmation(["D-006"]),
  },
  {
    id: "terms-unpublished-policies",
    text: "Studio operating rules for bookings are not published here because they are not owner-confirmed for the website.",
    evidence: ownerConfirmation(["D-006", "SECURITY_AND_PRIVACY"]),
  },
  {
    id: "terms-contact",
    text: `Ask the studio about a visit through the contact paths on this site, including ${site.phone.display} and ${site.business.email}.`,
    evidence: verifiedFact(["facebook-profile"]),
  },
]);

export function serviceCategoryHref(id: ServiceCategoryId): string {
  switch (id) {
    case "custom-nail-art":
      return "/services/custom-nail-art";
    case "lashes":
      return "/services/lashes";
    default:
      return bookingHref({
        entryPoint: "services",
        serviceCategoryId: id,
      });
  }
}

export function serviceCategoryAction(id: ServiceCategoryId): string {
  switch (id) {
    case "custom-nail-art":
      return "See custom nail art";
    case "lashes":
      return "See lash services";
    default:
      return "Ask about this service";
  }
}

export const publicPageList = Object.values(pageMetadata);
