import type { Metadata } from "next";
import Link from "next/link";

import { SectionIntro } from "@/src/components/ui/section-intro";
import { StatusCallout } from "@/src/components/ui/status-callout";
import { pageCopy, pageMetadata, reviewThemes } from "@/src/content/pages";
import { mapsSearchUrl, site } from "@/src/content/site";
import { bookingHref } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: pageMetadata.studio.title,
  description: pageMetadata.studio.description,
};

export default function StudioPage() {
  const directions = mapsSearchUrl(site.location.address);

  return (
    <div className="page">
      <p className="eyebrow">Studio</p>
      <h1>{pageMetadata.studio.h1}</h1>
      <p className="lede">{pageCopy.studioIntro.text}</p>
      <div className="actions">
        <Link className="button" href={bookingHref({ entryPoint: "studio" })}>
          Book or contact the studio
        </Link>
        <a className="button-secondary" href={directions}>
          Search this address in Google Maps
        </a>
        <Link className="button-secondary" href="/visit">
          Visit details
        </Link>
      </div>

      <section className="section">
        <StatusCallout title="Care between appointments" tone="info">
          <p>{pageCopy.hygiene.text}</p>
          <p>
            This is the limited official statement. Detailed procedure,
            equipment and frequency are not published.
          </p>
        </StatusCallout>
      </section>

      <section className="section" aria-labelledby="studio-proof-heading">
        <SectionIntro
          eyebrow="What customers mention"
          heading="Attributed review themes"
          headingId="studio-proof-heading"
        >
          <p>
            Team names, roles and portraits are not published. These cards
            summarize customer themes only.
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
    </div>
  );
}
