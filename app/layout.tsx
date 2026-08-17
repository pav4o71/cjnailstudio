import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import { MobileActionBar } from "@/src/components/shell/mobile-action-bar";
import { SiteFooter } from "@/src/components/shell/site-footer";
import { SiteHeader } from "@/src/components/shell/site-header";
import { publicLocationLabel } from "@/src/content/navigation";
import { layoutMetadata } from "@/src/content/pages";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: layoutMetadata.title.default,
    template: layoutMetadata.title.template,
  },
  description: layoutMetadata.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <html
      lang="en"
      className="no-js"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Script
          id="enable-js"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove("no-js");`,
          }}
        />
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <SiteHeader
          businessName={site.business.name}
          hours={site.location.hours}
          locationLabel={publicLocationLabel}
          phoneDisplay={site.phone.display}
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
