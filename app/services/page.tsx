import type { Metadata } from "next";

import { ServiceCard } from "@/src/components/ui/service-card";
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
          <li key={service.id}>
            <ServiceCard headingLevel="h2" label={service.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}
