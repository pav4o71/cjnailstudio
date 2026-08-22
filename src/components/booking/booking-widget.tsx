import Script from "next/script";

import type { PavellsWidgetMount } from "@/src/domain/pavells-booking";

type BookingWidgetProps = Readonly<{
  widget: PavellsWidgetMount;
}>;

export function BookingWidget({ widget }: BookingWidgetProps) {
  return (
    <section className="booking-widget" aria-label="Booking panel">
      <h2>Request a time</h2>
      <div id={widget.mountId} data-business={widget.businessSlug} />
      <Script src={widget.scriptSrc} strategy="afterInteractive" />
    </section>
  );
}
