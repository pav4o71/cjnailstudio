import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { proxy } from "../../proxy";

describe("preview-host noindex proxy", () => {
  it("adds X-Robots-Tag on Netlify unique and draft hosts", () => {
    const request = new NextRequest(
      "https://abc123--cjnailstudio.netlify.app/book",
      {
        headers: { host: "abc123--cjnailstudio.netlify.app" },
      },
    );

    expect(proxy(request).headers.get("X-Robots-Tag")).toBe(
      "noindex, nofollow",
    );
  });

  it("does not add X-Robots-Tag on the approved production host", () => {
    const request = new NextRequest("https://cjnailstudio.netlify.app/", {
      headers: { host: "cjnailstudio.netlify.app" },
    });

    expect(proxy(request).headers.get("X-Robots-Tag")).toBeNull();
  });
});
