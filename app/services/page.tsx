import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Nail & Lash Services in Makati",
  description:
    "See the nail and lash service categories available at Beauty Nail Studio by Cj in Knightsbridge, Makati.",
};

export default function ServicesPage() {
  return (
    <div className="page">
      <p className="eyebrow">Services</p>
      <h1>Nail and lash services</h1>
      <p className="lede">
        Come with a saved look or start with a category. Current prices,
        durations and live availability are confirmed directly by the studio.
      </p>
      <ul className="card-grid">
        {site.services.map((service) => (
          <li className="card" key={service.id}>
            <h2>{service.label}</h2>
            <Link href="/book">Ask about this service</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
