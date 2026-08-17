import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/services",
}));

beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    },
  });
});

afterEach(cleanup);

const props = {
  businessName: "Beauty Nail Studio by Cj",
  hours: "Open daily, 12:00 noon–9:00 PM",
  locationLabel: "Knightsbridge Residences · Makati City",
  phoneDisplay: "+63 961 740 0664",
  phoneHref: "tel:+639617400664",
  whatsappHref: "https://wa.me/639617400664",
} as const;

describe("SiteHeader", () => {
  it("marks the current route in desktop and mobile navigation", () => {
    render(<SiteHeader {...props} />);

    for (const link of screen.getAllByRole("link", { name: "Services" })) {
      expect(link).toHaveAttribute("aria-current", "page");
    }
  });

  it("opens and closes the modal menu and returns focus to its trigger", () => {
    render(<SiteHeader {...props} />);
    const trigger = screen.getByRole("button", { name: /Menu/ });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toHaveAttribute("open");

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("moves focus to main after choosing a menu destination", () => {
    render(
      <>
        <SiteHeader {...props} />
        <main id="main" tabIndex={-1}>
          Main
        </main>
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Menu/ }));
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("link", { name: "Gallery" }),
    );

    expect(document.getElementById("main")).toHaveFocus();
    expect(screen.getByRole("button", { name: /Menu/ })).not.toHaveFocus();
  });
});
