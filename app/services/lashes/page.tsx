import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { StudioPhoto } from "@/src/components/ui/studio-photo";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { site } from "@/src/content/site";
import { studioPhotos } from "@/src/content/studio-photos";
import { bookingHref, createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = createRouteMetadata(pageMetadata.lashes);

export default function LashesPage() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <div className="page">
      <CanonicalLink path={pageMetadata.lashes.path} />
      <p className="eyebrow">Lashes</p>
      <h1>{pageMetadata.lashes.h1}</h1>
      <p className="lede">{pageCopy.lashesIntro.text}</p>
      <div className="actions">
        <Link
          className="button"
          href={bookingHref({
            entryPoint: "services",
            serviceCategoryId: "lashes",
          })}
        >
          Ask or book lash services
        </Link>
        <a className="button-secondary" href={handoffs.whatsapp.href}>
          WhatsApp the studio
        </a>
      </div>
      <div className="section">
        <StudioPhoto
          photo={studioPhotos.lashes}
          sizes="(max-width: 48rem) 100vw, 48rem"
        />
        <p>{pageCopy.lashesMedia.text}</p>
      </div>
    </div>
  );
}
