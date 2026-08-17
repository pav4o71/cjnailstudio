import type { Metadata } from "next";
import Link from "next/link";

import { MediaFallback } from "@/src/components/ui/media-fallback";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: pageMetadata.lashes.title,
  description: pageMetadata.lashes.description,
};

export default function LashesPage() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <div className="page">
      <p className="eyebrow">Lashes</p>
      <h1>{pageMetadata.lashes.h1}</h1>
      <p className="lede">{pageCopy.lashesIntro.text}</p>
      <div className="actions">
        <Link className="button" href="/book">
          Ask or book lash services
        </Link>
        <a className="button-secondary" href={handoffs.whatsapp.href}>
          WhatsApp the studio
        </a>
      </div>
      <div className="section">
        <MediaFallback
          eyebrow="No model imagery"
          title="Lash results stay off the website until consent is cleared"
          description={pageCopy.lashesMedia.text}
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
