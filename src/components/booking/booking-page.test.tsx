import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { pageCopy } from "@/src/content/pages";
import { createManualHandoffs } from "@/src/domain/booking";

import { BookingPage } from "./booking-page";

const handoffs = createManualHandoffs("+639617400664");
const confirmationPattern =
  /you(?:'re| are) booked|appointment (?:is |has been )?confirmed|booking confirmed/i;

afterEach(() => {
  cleanup();
});

function renderView(
  view: "manual" | "widget" | "loading" | "unavailable" | "error" | "return",
  categoryLabel?: string,
) {
  return render(
    <BookingPage
      categoryLabel={categoryLabel}
      handoffs={handoffs}
      intent={{
        entryPoint: "services",
        serviceCategoryId: categoryLabel ? "lashes" : undefined,
      }}
      view={view}
      widget={
        view === "widget" || view === "return"
          ? {
              mountId: "pavells-booking",
              businessSlug: "beauty-nail-studio-by-cj2",
              scriptSrc: "https://booking.pavells.com/api/public/widget.js",
            }
          : undefined
      }
    />,
  );
}

describe("booking page states", () => {
  it("always keeps no-JS contact links and never confirms a booking", () => {
    renderView("widget");

    expect(
      screen.getByRole("link", { name: "Message the studio on WhatsApp" }),
    ).toHaveAttribute("href", "https://wa.me/639617400664");
    expect(screen.getByRole("link", { name: /Call \+63/ })).toHaveAttribute(
      "href",
      "tel:+639617400664",
    );
    expect(
      screen.getByRole("link", { name: "Visit and walk-in information" }),
    ).toHaveAttribute("href", "/visit");
    expect(document.body.textContent).not.toMatch(confirmationPattern);
    expect(document.body.textContent).not.toContain("booking.test.invalid");
    expect(screen.getByText("Contact the studio")).toBeVisible();
    expect(document.body.textContent).not.toContain("Manual booking handoff");
    const mount = document.body.querySelector("#pavells-booking");
    expect(mount).not.toBeNull();
    expect(mount).toHaveAttribute("data-business", "beauty-nail-studio-by-cj2");
    expect(mount?.parentElement?.querySelector("h2")).toBeNull();
    expect(document.body.textContent).not.toContain(
      "Beauty Nail Studio by Cj 2",
    );
    expect(document.body.textContent).not.toContain("8 hr 20 min");
    expect(document.body.querySelector("form")).toBeNull();
  });

  it("hides the widget when online scheduling is unavailable", () => {
    renderView("unavailable");
    expect(document.body.querySelector("#pavells-booking")).toBeNull();
    expect(
      screen.getByRole("link", { name: "Message the studio on WhatsApp" }),
    ).toBeVisible();
  });

  it("shows loading, unavailable, error and return copy without a confirmation", () => {
    const { unmount: unmountLoading } = renderView("loading");
    expect(
      screen.getByRole("heading", { name: "Booking options stay available" }),
    ).toBeVisible();
    expect(screen.getByText(pageCopy.bookLoading.text)).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Message the studio on WhatsApp" }),
    ).toBeVisible();
    unmountLoading();

    const { unmount: unmountUnavailable } = renderView("unavailable");
    expect(
      screen.getByRole("heading", {
        name: "Online scheduling is not available",
      }),
    ).toBeVisible();
    expect(document.body.textContent).not.toMatch(confirmationPattern);
    unmountUnavailable();

    const { unmount: unmountError } = renderView("error");
    expect(
      screen.getByRole("heading", {
        name: "Online booking is unavailable right now",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Visit and walk-in information" }),
    ).toBeVisible();
    unmountError();

    renderView("return");
    expect(
      screen.getByRole("heading", {
        name: "This page cannot confirm an appointment",
      }),
    ).toBeVisible();
    expect(screen.getByText(pageCopy.bookReturn.text)).toBeVisible();
    expect(document.body.textContent).not.toMatch(confirmationPattern);
  });

  it("acknowledges a controlled category without collecting PII", () => {
    renderView("manual", "Lash services");
    expect(screen.getByText(/Starting point: Lash services/)).toBeVisible();
    expect(screen.getByText(/not an appointment/)).toBeVisible();
    expect(document.body.querySelector("form")).toBeNull();
    expect(document.body.querySelector("input")).toBeNull();
  });

  it("lets the error boundary retry without claiming a booking", () => {
    const onRetry = vi.fn();
    render(
      <BookingPage
        handoffs={handoffs}
        intent={{ entryPoint: "book" }}
        onRetry={onRetry}
        view="error"
      />,
    );
    screen.getByRole("button", { name: "Try the booking page again" }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(document.body.textContent).not.toMatch(confirmationPattern);
  });
});
