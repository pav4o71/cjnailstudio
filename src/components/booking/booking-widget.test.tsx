import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { BookingWidget } from "./booking-widget";

describe("Pavells booking widget markup", () => {
  it("renders the official widget snippet without a local booking UI", () => {
    const html = renderToStaticMarkup(
      <BookingWidget
        widget={{
          mountId: "pavells-booking",
          businessSlug: "beauty-nail-studio-by-cj2",
          scriptSrc: "https://booking.pavells.com/api/public/widget.js",
        }}
      />,
    );

    expect(html).toContain('id="pavells-booking"');
    expect(html).toContain('data-business="beauty-nail-studio-by-cj2"');
    expect(html).toContain(
      '<script src="https://booking.pavells.com/api/public/widget.js" async=""></script>',
    );
    expect(html).not.toContain("Request a time");
    expect(html).not.toContain("next/script");
    expect(html).not.toMatch(/<form|<input|<select/i);
  });
});
