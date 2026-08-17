import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { MediaFallback } from "@/src/components/ui/media-fallback";
import { SectionIntro } from "@/src/components/ui/section-intro";
import { ServiceCard } from "@/src/components/ui/service-card";
import { StatusCallout } from "@/src/components/ui/status-callout";
import { StudioArt } from "@/src/components/ui/studio-art";
import {
  pageCopy,
  pageMetadata,
  resultChooser,
  reviewThemes,
  serviceCategoryAction,
  serviceCategoryHref,
} from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { mapsSearchUrl, site } from "@/src/content/site";
import { bookingHref } from "@/src/domain/booking";

export const metadata: Metadata = createRouteMetadata(pageMetadata.home);

export default function HomePage() {
  const directions = mapsSearchUrl(site.location.address);

  return (
    <div className="page">
      <CanonicalLink path={pageMetadata.home.path} />
      <section className="hero">
        <p className="eyebrow">Knightsbridge, Makati</p>
        <h1>{pageMetadata.home.h1}</h1>
        <p className="visually-hidden">
          Decorative studio artwork; no customer image is used.
        </p>
        <div className="hero-cta actions">
          <Link className="button" href={bookingHref({ entryPoint: "home" })}>
            Book or contact the studio
          </Link>
        </div>
        <div className="hero-art-slot">
          <StudioArt variant="hero" />
        </div>
        <p className="lede">{pageCopy.homeLede.text}</p>
      </section>

      <section className="section" aria-labelledby="choose-heading">
        <SectionIntro
          eyebrow="Start with what you want"
          heading="Find a service category"
          headingId="choose-heading"
        >
          <p>
            Choose a starting point, then contact the studio to confirm what
            suits the look you have in mind.
          </p>
        </SectionIntro>
        <div className="chooser" role="group" aria-labelledby="choose-heading">
          {resultChooser.map((option) => (
            <Link
              key={option.id}
              className="button-secondary"
              href={option.href}
            >
              {option.label}
            </Link>
          ))}
        </div>
        <ul className="card-grid">
          {site.services.map((service) => (
            <li key={service.id}>
              <ServiceCard
                actionLabel={serviceCategoryAction(service.id)}
                href={serviceCategoryHref(service.id)}
                label={service.label}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="gallery-preview-heading">
        <SectionIntro
          eyebrow="Gallery"
          heading="See the work when it is cleared to publish"
          headingId="gallery-preview-heading"
        />
        <MediaFallback
          eyebrow="Consent-safe gallery"
          title="Website gallery in preparation"
          description={pageCopy.galleryFallback.text}
          action={
            <Link className="button" href="/gallery">
              Open the gallery page
            </Link>
          }
        />
      </section>

      <section className="section">
        <StatusCallout
          title="Care between appointments"
          tone="info"
          action={
            <Link className="button-secondary" href="/studio">
              Read studio notes
            </Link>
          }
        >
          <p>{pageCopy.hygiene.text}</p>
        </StatusCallout>
      </section>

      <section className="section" aria-labelledby="proof-heading">
        <SectionIntro
          eyebrow="What customers mention"
          heading="Review themes, not quotations"
          headingId="proof-heading"
        >
          <p>
            These are attributed customer themes. They are not studio
            guarantees, and no review excerpt is published yet.
          </p>
        </SectionIntro>
        <ul className="card-grid">
          {reviewThemes.map((theme) => (
            <li key={theme.id}>
              <article className="card">
                <h3>{theme.heading}</h3>
                <p>{theme.text}</p>
                <p className="meta">{theme.attribution}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="visit-heading">
        <SectionIntro
          eyebrow="Visit"
          heading="Knightsbridge studio"
          headingId="visit-heading"
        />
        <div className="card">
          <address>{site.location.address}</address>
          <p>{site.location.hours}</p>
          <p>{pageCopy.walkIn.text}</p>
          <div className="actions">
            <a className="button" href={directions}>
              Search this address in Google Maps
            </a>
            <Link className="button-secondary" href="/visit">
              Visit details
            </Link>
            <Link
              className="button-secondary"
              href={bookingHref({ entryPoint: "home" })}
            >
              Book or contact the studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
