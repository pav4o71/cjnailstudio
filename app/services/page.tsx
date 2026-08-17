import type { Metadata } from "next";
import Link from "next/link";

import { ServiceCard } from "@/src/components/ui/service-card";
import {
  pageCopy,
  pageMetadata,
  serviceCategoryAction,
  serviceCategoryHref,
} from "@/src/content/pages";
import { site } from "@/src/content/site";
import { bookingHref } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
};

export default function ServicesPage() {
  return (
    <div className="page">
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
