import { BookingPage } from "@/src/components/booking/booking-page";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export default function BookLoading() {
  return (
    <BookingPage
      handoffs={createManualHandoffs(site.phone.e164)}
      intent={{ entryPoint: "book" }}
      view="loading"
    />
  );
}
