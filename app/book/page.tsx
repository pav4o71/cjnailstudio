import type { Metadata } from "next";

import { BookingPage } from "@/src/components/booking/booking-page";
import { CanonicalLink } from "@/src/components/seo/canonical-link";
import { pageMetadata } from "@/src/content/pages";
import { createRouteMetadata } from "@/src/content/seo";
import { site } from "@/src/content/site";
import { createManualHandoffs, resolveBookingView } from "@/src/domain/booking";
import { createProductionAdapter } from "@/src/domain/booking-config";
import { parseBookingQuery } from "@/src/domain/booking-query";

export const metadata: Metadata = createRouteMetadata(pageMetadata.book);

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const search = await searchParams;
  const query = parseBookingQuery(search);
  const adapter = createProductionAdapter(site.phone.e164);
  const resolution = await resolveBookingView({
    adapter,
    hostedHosts: [],
    intent: query.intent,
    telE164: site.phone.e164,
    viewHint: query.viewHint,
  });
  const categoryLabel = site.services.find(
    (service) => service.id === query.intent.serviceCategoryId,
  )?.label;

  return (
    <>
      <CanonicalLink path={pageMetadata.book.path} />
      <BookingPage
        categoryLabel={categoryLabel}
        handoffs={createManualHandoffs(site.phone.e164)}
        intent={query.intent}
        view={resolution.view}
      />
    </>
  );
}
