import type { Metadata } from "next";
import Link from "next/link";

import { MediaFallback } from "@/src/components/ui/media-fallback";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: pageMetadata.customNailArt.title,
  description: pageMetadata.customNailArt.description,
};

export default function CustomNailArtPage() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <div className="page">
      <p className="eyebrow">Custom nail art</p>
      <h1>{pageMetadata.customNailArt.h1}</h1>
      <p className="lede">{pageCopy.customNailArtIntro.text}</p>
      <div className="actions">
        <Link className="button" href="/book">
          Book this kind of look
        </Link>
        <a className="button-secondary" href={handoffs.whatsapp.href}>
          WhatsApp the studio
        </a>
        <Link className="button-secondary" href="/gallery">
          Gallery
        </Link>
      </div>
      <div className="section">
        <MediaFallback
          eyebrow="Consent-safe example"
          title="Portfolio images are not published here yet"
          description={pageCopy.galleryFallback.text}
          action={
            <Link className="button-secondary" href="/book">
              Book or contact the studio
            </Link>
          }
        />
      </div>
    </div>
  );
}
