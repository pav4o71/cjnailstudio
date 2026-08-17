import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MediaFallback } from "./media-fallback";
import { ServiceCard } from "./service-card";
import { StatusCallout } from "./status-callout";

describe("design-system components", () => {
  it("keeps service cards useful without optional commercial data", () => {
    render(<ServiceCard label="Custom nail art" />);

    expect(
      screen.getByRole("heading", { name: "Custom nail art", level: 3 }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /Ask about this service/ }),
    ).toHaveAttribute("href", "/book");
  });

  it("gives status callouts a non-color label and message", () => {
    render(
      <StatusCallout title="Manual handoff is available" tone="info">
        <p>Contact the studio before arriving.</p>
      </StatusCallout>,
    );

    expect(
      screen.getByRole("heading", { name: "Manual handoff is available" }),
    ).toBeVisible();
    expect(
      screen.getByText("Contact the studio before arriving."),
    ).toBeVisible();
  });

  it("renders an honest gallery fallback instead of an unapproved image", () => {
    const { container } = render(
      <MediaFallback
        eyebrow="Consent-safe gallery"
        title="Gallery in preparation"
        description="Images are being reviewed for consent."
      />,
    );

    expect(
      screen.getByText("Images are being reviewed for consent."),
    ).toBeVisible();
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
