import type { Metadata } from "next";
import Link from "next/link";

import { pageCopy, pageMetadata, termsSections } from "@/src/content/pages";
import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: pageMetadata.terms.title,
  description: pageMetadata.terms.description,
};

export default function TermsPage() {
  return (
    <div className="page page-narrow">
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
