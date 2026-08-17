import type { Metadata } from "next";
import Link from "next/link";

import { MediaFallback } from "@/src/components/ui/media-fallback";
import { galleryItems, publishedGalleryItems } from "@/src/content/gallery";
import { instagramProfileUrl } from "@/src/content/navigation";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: pageMetadata.gallery.title,
  description: pageMetadata.gallery.description,
};

export default function GalleryPage() {
  const published = publishedGalleryItems(galleryItems);
  const instagramHref = instagramProfileUrl(site.business.instagramHandle);

  return (
    <div className="page">
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
                <Link className="button" href="/book">
                  Book or contact the studio
                </Link>
                <a className="button-secondary" href={instagramHref}>
                  Instagram {site.business.instagramHandle}
                </a>
              </div>
            }
          />
        </div>
      ) : null}
    </div>
  );
}
