import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { StatusCallout } from "@/src/components/ui/status-callout";
import { StudioPhoto } from "@/src/components/ui/studio-photo";
import { instagramProfileUrl } from "@/src/content/navigation";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { mapsSearchUrl, site } from "@/src/content/site";
import { studioPhotos } from "@/src/content/studio-photos";
import { bookingHref, createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = createRouteMetadata(pageMetadata.visit);

export default function VisitPage() {
  const directions = mapsSearchUrl(site.location.address);
  const handoffs = createManualHandoffs(site.phone.e164);
  const instagramHref = instagramProfileUrl(site.business.instagramHandle);

  return (
    <div className="page">
      <CanonicalLink path={pageMetadata.visit.path} />
      <p className="eyebrow">Visit</p>
      <h1>{pageMetadata.visit.h1}</h1>
      <p className="lede">{pageCopy.visitIntro.text}</p>
      <div className="section">
        <StudioPhoto
          photo={studioPhotos.visitStorefront}
          sizes="(max-width: 48rem) 100vw, 52rem"
        />
      </div>
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
          <Link
            className="button-secondary"
            href={bookingHref({ entryPoint: "visit" })}
          >
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
