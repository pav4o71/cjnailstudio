import type { Metadata } from "next";
import Link from "next/link";

import { faqs } from "@/src/content/faq";
import { pageMetadata } from "@/src/content/pages";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export const metadata: Metadata = {
  title: pageMetadata.faq.title,
  description: pageMetadata.faq.description,
};

export default function FaqPage() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <div className="page page-narrow">
      <p className="eyebrow">FAQ</p>
      <h1>{pageMetadata.faq.h1}</h1>
      <p className="lede">
        These answers use verified location, hours, contact, walk-in and
        service-category facts only. Studio operating rules are not published
        here.
      </p>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.id} id={item.id}>
            <summary>
              <h2>{item.question}</h2>
            </summary>
            <p>{item.answer.text}</p>
          </details>
        ))}
      </div>
      <div className="actions">
        <Link className="button" href="/book">
          Book or contact the studio
        </Link>
        <a className="button-secondary" href={handoffs.whatsapp.href}>
          WhatsApp the studio
        </a>
      </div>
    </div>
  );
}
