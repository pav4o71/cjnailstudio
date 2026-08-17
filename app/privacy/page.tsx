import type { Metadata } from "next";
import Link from "next/link";

import { pageCopy, pageMetadata, privacySections } from "@/src/content/pages";
import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: pageMetadata.privacy.title,
  description: pageMetadata.privacy.description,
};

export default function PrivacyPage() {
  return (
    <div className="page page-narrow">
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
