import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: "Book or Contact the Studio",
  description:
    "Contact Beauty Nail Studio by Cj by WhatsApp or phone, or view the Knightsbridge studio details.",
};

export default function BookPage() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <div className="page">
      <p className="eyebrow">Manual booking handoff</p>
      <h1>Book or contact the studio</h1>
      <p className="lede">
        Choose how you&apos;d like to contact the studio. The website does not
        show live availability or confirm an appointment.
      </p>
      <div
        className="actions"
        role="group"
        aria-label="Booking contact options"
      >
        <a className="button" href={handoffs.whatsapp.href}>
          Message the studio on WhatsApp
        </a>
        <a className="button-secondary" href={handoffs.phone.href}>
          Call {site.phone.display}
        </a>
        <Link className="button-secondary" href={handoffs.visit.pathname}>
          Visit and walk-in information
        </Link>
      </div>
      <div className="callout section">
        <h2>Walk-ins accepted</h2>
        <p>
          Visit information is available below. Contact the studio if you want
          to ask about the current service options before arriving.
        </p>
      </div>
    </div>
  );
}
