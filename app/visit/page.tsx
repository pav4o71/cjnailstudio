import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Visit the Knightsbridge Studio",
  description:
    "Find the address, daily hours, phone and directions for Beauty Nail Studio by Cj in Makati.",
};

export default function VisitPage() {
  const directions = new URL("https://www.google.com/maps/search/");
  directions.searchParams.set("api", "1");
  directions.searchParams.set("query", site.location.address);

  return (
    <div className="page">
      <p className="eyebrow">Visit</p>
      <h1>Visit Beauty Nail Studio by Cj in Makati</h1>
      <div className="card section">
        <h2>Knightsbridge studio</h2>
        <address>{site.location.address}</address>
        <p>{site.location.hours}</p>
        <p>
          <a href={`tel:${site.phone.e164}`}>Call {site.phone.display}</a>
        </p>
        <div className="actions">
          <a className="button" href={directions.href}>
            Search this address in Google Maps
          </a>
          <Link className="button-secondary" href="/book">
            Book or contact the studio
          </Link>
        </div>
      </div>
    </div>
  );
}
