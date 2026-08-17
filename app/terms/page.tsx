import type { Metadata } from "next";
import Link from "next/link";

import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { pageCopy, pageMetadata, termsSections } from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { site } from "@/src/content/site";

export const metadata: Metadata = createRouteMetadata(pageMetadata.terms);

export default function TermsPage() {
  return (
    <div className="page page-narrow">
      <CanonicalLink path={pageMetadata.terms.path} />
      <p className="eyebrow">Terms</p>
      <h1>{pageMetadata.terms.h1}</h1>
      <p className="lede">{pageCopy.termsIntro.text}</p>
      {termsSections.map((section) => (
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
