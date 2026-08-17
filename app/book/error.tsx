"use client";

import { BookingPage } from "@/src/components/booking/booking-page";
import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

export default function BookError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  void error;
  return (
    <BookingPage
      handoffs={createManualHandoffs(site.phone.e164)}
      intent={{ entryPoint: "book" }}
      onRetry={retry}
      view="error"
    />
  );
}
