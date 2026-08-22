import type { PavellsWidgetMount } from "@/src/domain/pavells-booking";

type BookingWidgetProps = Readonly<{
  widget: PavellsWidgetMount;
}>;

export function BookingWidget({ widget }: BookingWidgetProps) {
  return (
    <section className="booking-widget" aria-label="Booking panel">
      <div id={widget.mountId} data-business={widget.businessSlug} />
      <script src={widget.scriptSrc} async />
    </section>
  );
}
