import Link from "next/link";

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
        <p className="eyebrow">Start with what you want</p>
        <h2 id="choose-heading">Find a service category</h2>
        <ul className="card-grid">
          {site.services.map((service) => (
            <li className="card" key={service.id}>
              <h3>{service.label}</h3>
              <Link href="/book">Ask about this service</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
