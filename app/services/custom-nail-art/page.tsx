import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { StudioPhoto } from "@/src/components/ui/studio-photo";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { site } from "@/src/content/site";
import { studioPhotos } from "@/src/content/studio-photos";
import { bookingHref, createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = createRouteMetadata(
  pageMetadata.customNailArt,
);

export default function CustomNailArtPage() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <div className="page">
      <CanonicalLink path={pageMetadata.customNailArt.path} />
      <p className="eyebrow">Custom nail art</p>
      <h1>{pageMetadata.customNailArt.h1}</h1>
      <p className="lede">{pageCopy.customNailArtIntro.text}</p>
      <div className="actions">
        <Link
          className="button"
          href={bookingHref({
            entryPoint: "services",
            serviceCategoryId: "custom-nail-art",
          })}
        >
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
        <StudioPhoto
          photo={studioPhotos.customNailArt}
          sizes="(max-width: 48rem) 100vw, 48rem"
        />
      </div>
    </div>
  );
}
