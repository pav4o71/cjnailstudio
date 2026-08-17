import Link from "next/link";

import { SectionIntro } from "@/src/components/ui/section-intro";
import { ServiceCard } from "@/src/components/ui/service-card";
import { site } from "@/src/content/site";

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Knightsbridge, Makati</p>
          <h1>Bring the look you have in mind.</h1>
          <p className="lede">
            Explore custom nail art, BIAB, soft gel, nail extensions and lash
            services at {site.business.name}. {site.location.hours}.
          </p>
          <div className="actions">
            <Link className="button" href="/book">
              Book or contact the studio
            </Link>
            <Link className="button-secondary" href="/services">
              View services
            </Link>
          </div>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="Abstract blush artwork; no customer image is used"
        />
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
        <ul className="card-grid">
          {site.services.map((service) => (
            <li key={service.id}>
              <ServiceCard label={service.label} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
