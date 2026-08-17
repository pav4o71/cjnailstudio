import Link from "next/link";

import { StatusCallout } from "@/src/components/ui/status-callout";
import { pageCopy, pageMetadata } from "@/src/content/pages";
import { site } from "@/src/content/site";
import {
  type BookingIntent,
  type BookingView,
  type ManualHandoffs,
} from "@/src/domain/booking";

type BookingPageProps = Readonly<{
  categoryLabel?: string;
  handoffs: ManualHandoffs;
  intent: BookingIntent;
  onRetry?: () => void;
  view: BookingView;
}>;

function statusForView(view: BookingView) {
  switch (view) {
    case "loading":
      return {
        title: "Booking options stay available",
        tone: "info" as const,
        copy: pageCopy.bookLoading.text,
      };
    case "unavailable":
      return {
        title: "Online scheduling is not available",
        tone: "warning" as const,
        copy: pageCopy.bookUnavailable.text,
      };
    case "error":
      return {
        title: "Online booking is unavailable right now",
        tone: "danger" as const,
        copy: pageCopy.bookError.text,
      };
    case "return":
      return {
        title: "This page cannot confirm an appointment",
        tone: "info" as const,
        copy: pageCopy.bookReturn.text,
      };
    default:
      return null;
  }
}

export function BookingPage({
  categoryLabel,
  handoffs,
  intent,
  onRetry,
  view,
}: BookingPageProps) {
  const status = statusForView(view);
  const showIntent =
    Boolean(categoryLabel) || Boolean(intent.galleryReferenceId);

  return (
    <div className="page">
      <p className="eyebrow">Manual booking handoff</p>
      <h1>{pageMetadata.book.h1}</h1>
      <p className="lede">{pageCopy.bookIntro.text}</p>
      {showIntent ? (
        <p>
          {categoryLabel
            ? `Starting point: ${categoryLabel}. ${pageCopy.bookIntent.text}`
            : pageCopy.bookIntent.text}
        </p>
      ) : null}
      {status ? (
        <div className="section" role="status" aria-live="polite">
          <StatusCallout
            title={status.title}
            tone={status.tone}
            action={
              onRetry ? (
                <button
                  className="button-secondary"
                  onClick={onRetry}
                  type="button"
                >
                  Try the booking page again
                </button>
              ) : undefined
            }
          >
            <p>{status.copy}</p>
          </StatusCallout>
        </div>
      ) : null}
      <div
        className="actions"
        role="group"
        aria-label="Booking contact options"
      >
        <a className="button" href={handoffs.whatsapp.href}>
          Message the studio on WhatsApp
        </a>
        <a className="button-secondary" href={handoffs.phone.href}>
          Call {site.phone.display}
        </a>
        <Link className="button-secondary" href={handoffs.visit.pathname}>
          Visit and walk-in information
        </Link>
      </div>
      <div className="section">
        <StatusCallout
          title="Walk-ins are welcome"
          tone="info"
          action={
            <Link className="button-secondary" href="/visit">
              See address and hours
            </Link>
          }
        >
          <p>{pageCopy.walkIn.text}</p>
        </StatusCallout>
      </div>
    </div>
  );
}
