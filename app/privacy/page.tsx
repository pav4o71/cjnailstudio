import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { pageCopy, pageMetadata, privacySections } from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { site } from "@/src/content/site";

export const metadata: Metadata = createRouteMetadata(pageMetadata.privacy);

export default function PrivacyPage() {
  return (
    <div className="page page-narrow">
      <CanonicalLink path={pageMetadata.privacy.path} />
      <p className="eyebrow">Privacy</p>
      <h1>{pageMetadata.privacy.h1}</h1>
      <p className="lede">{pageCopy.privacyIntro.text}</p>
      {privacySections.map((section) => (
        <p key={section.id}>{section.text}</p>
      ))}
      <div className="actions">
        <Link className="button" href="/book">
          Book or contact the studio
        </Link>
        <a className="button-secondary" href={`mailto:${site.business.email}`}>
          Email the studio
        </a>
      </div>
    </div>
  );
}
