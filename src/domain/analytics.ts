export type AnalyticsEvent =
  | Readonly<{
      name: "booking_cta_clicked";
      properties: {
        entryPoint: string;
        channel: "book" | "whatsapp" | "phone";
      };
    }>
  | Readonly<{
      name:
        | "booking_handoff_started"
        | "booking_handoff_failed"
        | "booking_fallback_selected";
      properties: {
        mode: "manual-handoff" | "hosted-redirect" | "embedded-widget";
        channel?: "whatsapp" | "phone" | "walk-in" | "hosted";
      };
    }>;

export interface AnalyticsPort {
  track(event: AnalyticsEvent): void;
}

export const noOpAnalytics: AnalyticsPort = {
  track() {
    // Deliberately inactive until an analytics destination and privacy model
    // are explicitly approved.
  },
};
