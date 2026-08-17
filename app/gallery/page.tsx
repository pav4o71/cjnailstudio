import type { Metadata } from "next";
import Link from "next/link";

import { MediaFallback } from "@/src/components/ui/media-fallback";

export const metadata: Metadata = {
  title: "Nail Art Gallery",
  description:
    "Gallery information and a consent-safe contact path for Beauty Nail Studio by Cj.",
};

export default function GalleryPage() {
  return (
    <div className="page">
      <p className="eyebrow">Gallery</p>
      <h1>Nail art by Beauty Nail Studio by Cj</h1>
      <div className="section">
        <MediaFallback
          title="Website gallery in preparation"
          description="Portfolio images are being reviewed for website-use rights and customer consent. No social image is published here by default. You can still discuss the look you have in mind with the studio."
          action={
            <Link className="button" href="/book">
              Book or contact the studio
            </Link>
          }
        />
      </div>
    </div>
  );
}
