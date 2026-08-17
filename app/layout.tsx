import type { Metadata } from "next";
import type { ReactNode } from "react";

import { MobileActionBar } from "@/src/components/shell/mobile-action-bar";
import { SiteFooter } from "@/src/components/shell/site-footer";
import {
  type NavigationItem,
  SiteHeader,
} from "@/src/components/shell/site-header";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Beauty Nail Studio by Cj | Nail & Lash Studio in Makati",
    template: "%s | Beauty Nail Studio by Cj",
  },
  description:
    "Explore custom nail art, BIAB, soft gel, nail extensions and lash services at Knightsbridge, Makati. Book, WhatsApp or call the studio.",
};

const nav = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
] as const satisfies readonly NavigationItem[];

export default function RootLayout({ children }: { children: ReactNode }) {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <SiteHeader
          businessName={site.business.name}
          hours={site.location.hours}
          locationLabel="Knightsbridge · Makati"
          navItems={nav}
          phoneHref={handoffs.phone.href}
          whatsappHref={handoffs.whatsapp.href}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar whatsappHref={handoffs.whatsapp.href} />
      </body>
    </html>
  );
}
