import type { Metadata } from "next";
import Link from "next/link";

import { StatusCallout } from "@/src/components/ui/status-callout";
import { instagramProfileUrl } from "@/src/content/navigation";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { mapsSearchUrl, site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: pageMetadata.visit.title,
  description: pageMetadata.visit.description,
};

export default function VisitPage() {
  const directions = mapsSearchUrl(site.location.address);
  const handoffs = createManualHandoffs(site.phone.e164);
  const instagramHref = instagramProfileUrl(site.business.instagramHandle);

  return (
    <div className="page">
      <p className="eyebrow">Visit</p>
      <h1>{pageMetadata.visit.h1}</h1>
      <p className="lede">{pageCopy.visitIntro.text}</p>
      <div className="card section">
        <h2>Knightsbridge studio</h2>
        <address>{site.location.address}</address>
        <p>{site.location.hours}</p>
        <ul className="contact-list">
          <li>
            <a href={handoffs.whatsapp.href}>WhatsApp the studio</a>
          </li>
          <li>
            <a href={handoffs.phone.href}>Call {site.phone.display}</a>
          </li>
          <li>
            <a href={`mailto:${site.business.email}`}>
              Email {site.business.email}
            </a>
          </li>
          <li>
            <a href={instagramHref}>
              Instagram {site.business.instagramHandle}
            </a>
          </li>
        </ul>
        <div className="actions">
          <a className="button" href={directions}>
            Search this address in Google Maps
          </a>
          <Link className="button-secondary" href="/book">
            Book or contact the studio
          </Link>
        </div>
      </div>
      <div className="section">
        <StatusCallout title="Walk-ins are accepted" tone="info">
          <p>{pageCopy.walkIn.text}</p>
        </StatusCallout>
      </div>
    </div>
  );
}
