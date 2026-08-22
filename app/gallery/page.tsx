import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { MediaFallback } from "@/src/components/ui/media-fallback";
import { StudioPhoto } from "@/src/components/ui/studio-photo";
import { galleryItems, publishedGalleryItems } from "@/src/content/gallery";
import { instagramProfileUrl } from "@/src/content/navigation";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { site } from "@/src/content/site";
import { publishedPhotoById } from "@/src/content/studio-photos";
import { bookingHref } from "@/src/domain/booking";

export const metadata: Metadata = createRouteMetadata(pageMetadata.gallery);

export default function GalleryPage() {
  const published = publishedGalleryItems(galleryItems);
  const instagramHref = instagramProfileUrl(site.business.instagramHandle);

  return (
    <div className="page">
      <CanonicalLink path={pageMetadata.gallery.path} />
      <p className="eyebrow">Gallery</p>
      <h1>{pageMetadata.gallery.h1}</h1>
      <p className="lede" aria-live="polite">
        {published.length} look{published.length === 1 ? "" : "s"} published on
        this website.
      </p>
      {published.length === 0 ? (
        <div className="section">
          <MediaFallback
            eyebrow="Consent-safe gallery"
            title="Website gallery in preparation"
            description={pageCopy.galleryFallback.text}
            action={
              <div className="actions">
                <Link
                  className="button"
                  href={bookingHref({ entryPoint: "gallery" })}
                >
                  Book or contact the studio
                </Link>
                <a className="button-secondary" href={instagramHref}>
                  Instagram {site.business.instagramHandle}
                </a>
              </div>
            }
          />
        </div>
      ) : (
        <div className="section">
          <p>{pageCopy.galleryPublished.text}</p>
          <ul className="gallery-grid">
            {published.map((item) => {
              const photo = publishedPhotoById(item.mediaId);

              return photo ? (
                <li data-gallery-item={item.id} key={item.id}>
                  <StudioPhoto
                    photo={photo}
                    sizes="(max-width: 48rem) 100vw, 36rem"
                  />
                </li>
              ) : null;
            })}
          </ul>
          <div className="actions">
            <Link
              className="button"
              href={bookingHref({ entryPoint: "gallery" })}
            >
              Book or contact the studio
            </Link>
            <a className="button-secondary" href={instagramHref}>
              Instagram {site.business.instagramHandle}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
