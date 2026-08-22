import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { studioPhotos } from "@/src/content/studio-photos";

import { StudioPhoto } from "./studio-photo";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // Test double for next/image; not a production <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

describe("StudioPhoto", () => {
  it("renders the owner-cleared photograph with its alt text", () => {
    render(
      <StudioPhoto
        photo={studioPhotos.hero}
        sizes="(max-width: 48rem) 100vw, 42vw"
      />,
    );

    expect(
      screen.getByRole("img", { name: studioPhotos.hero.alt }),
    ).toHaveAttribute("src", studioPhotos.hero.src);
  });
});
