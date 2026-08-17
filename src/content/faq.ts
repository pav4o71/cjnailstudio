import { z } from "zod";

import {
  copyBlockSchema,
  ownerConfirmation,
  verifiedFact,
} from "@/src/content/evidence";
import { site } from "@/src/content/site";

const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: copyBlockSchema,
});

export const faqs = z
  .array(faqItemSchema)
  .length(5)
  .parse([
    {
      id: "where-is-the-studio",
      question: "Where is the studio?",
      answer: {
        id: "faq-where",
        text: site.location.address,
        evidence: verifiedFact(["facebook-profile", "D-001"]),
      },
    },
    {
      id: "what-are-the-opening-hours",
      question: "What are the opening hours?",
      answer: {
        id: "faq-hours",
        text: site.location.hours,
        evidence: verifiedFact(["facebook-profile"]),
      },
    },
    {
      id: "how-can-i-contact-the-studio",
      question: "How can I contact the studio?",
      answer: {
        id: "faq-contact",
        text: `Phone or WhatsApp ${site.phone.display}, email ${site.business.email}, or Instagram ${site.business.instagramHandle}.`,
        evidence: verifiedFact(["facebook-profile", "instagram-profile"]),
      },
    },
    {
      id: "are-walk-ins-accepted",
      question: "Are walk-ins accepted?",
      answer: {
        id: "faq-walk-ins",
        text: "Yes, walk-ins are accepted. Availability is not guaranteed, so you can contact the studio if you want to check before arriving.",
        evidence: ownerConfirmation(["instagram-profile", "ODR-003"]),
      },
    },
    {
      id: "what-services-are-offered",
      question: "What services are offered?",
      answer: {
        id: "faq-services",
        text: `${site.services.map((service) => service.label).join(", ")}.`,
        evidence: verifiedFact(["facebook-profile", "instagram-profile"]),
      },
    },
  ]);
