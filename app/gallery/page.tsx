import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="callout">
        <h2>Website gallery in preparation</h2>
        <p>
          Portfolio images are being reviewed for website-use rights and
          customer consent. No social image is published here by default.
        </p>
        <p>You can still discuss the look you have in mind with the studio.</p>
        <Link className="button" href="/book">
          Book or contact the studio
        </Link>
      </div>
    </div>
  );
}
