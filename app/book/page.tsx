import type { Metadata } from "next";
import Link from "next/link";

import { StatusCallout } from "@/src/components/ui/status-callout";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: pageMetadata.book.title,
  description: pageMetadata.book.description,
};

export default function BookPage() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <div className="page">
      <p className="eyebrow">Manual booking handoff</p>
      <h1>{pageMetadata.book.h1}</h1>
      <p className="lede">{pageCopy.bookIntro.text}</p>
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
      <div className="section">
        <StatusCallout
          title="Walk-ins are welcome"
          tone="info"
          action={
            <Link className="button-secondary" href="/visit">
              See address and hours
            </Link>
          }
        >
          <p>{pageCopy.walkIn.text}</p>
        </StatusCallout>
      </div>
    </div>
  );
}
