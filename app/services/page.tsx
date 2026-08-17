import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { ServiceCard } from "@/src/components/ui/service-card";
import {
  pageCopy,
  pageMetadata,
  serviceCategoryAction,
  serviceCategoryHref,
} from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { site } from "@/src/content/site";
import { bookingHref } from "@/src/domain/booking";

export const metadata: Metadata = createRouteMetadata(pageMetadata.services);

export default function ServicesPage() {
  return (
    <div className="page">
      <CanonicalLink path={pageMetadata.services.path} />
      <p className="eyebrow">Services</p>
      <h1>{pageMetadata.services.h1}</h1>
      <p className="lede">{pageCopy.servicesIntro.text}</p>
      <ul className="card-grid">
        {site.services.map((service) => (
          <li key={service.id}>
            <ServiceCard
              actionLabel={serviceCategoryAction(service.id)}
              headingLevel="h2"
              href={serviceCategoryHref(service.id)}
              label={service.label}
            />
          </li>
        ))}
      </ul>
      <div className="actions">
        <Link className="button" href={bookingHref({ entryPoint: "services" })}>
          Book or contact the studio
        </Link>
        <Link className="button-secondary" href="/gallery">
          Gallery
        </Link>
      </div>
    </div>
  );
}
