import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StudioArt } from "./studio-art";

describe("StudioArt", () => {
  it("renders original inline SVG decoration without images or media ids", () => {
    const { container } = render(<StudioArt variant="hero" />);

    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toMatch(/media-0(0[1-9]|[12][0-9]|30)/);
    expect(container.querySelector("[aria-hidden='true']")).not.toBeNull();
  });

  it("keeps the fallback variant image-free", () => {
    const { container } = render(<StudioArt variant="fallback" />);

    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });
});
