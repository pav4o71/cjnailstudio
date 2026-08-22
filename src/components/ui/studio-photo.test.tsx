import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { studioPhotos } from "@/src/content/studio-photos";

import { PageStudioPhoto, StudioPhoto } from "./studio-photo";

afterEach(cleanup);

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // Test double for next/image; not a production <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
  getImageProps: ({
    alt,
    src,
    sizes,
  }: {
    alt: string;
    src: string;
    sizes: string;
  }) => ({
    props: { alt, src, srcSet: src, sizes },
  }),
}));

describe("StudioPhoto", () => {
  it("renders the owner-cleared photograph with its alt text", () => {
    render(
      <StudioPhoto
        photo={studioPhotos.customNailArt}
        sizes="(max-width: 48rem) 100vw, 48rem"
      />,
    );

    expect(
      screen.getByRole("img", { name: studioPhotos.customNailArt.alt }),
    ).toHaveAttribute("src", studioPhotos.customNailArt.src);
  });

  it("uses a portrait source for phone art direction", () => {
    render(
      <StudioPhoto
        photo={studioPhotos.hero}
        sizes="(max-width: 48rem) 100vw, 42vw"
      />,
    );

    const image = screen.getByRole("img", { name: studioPhotos.hero.alt });
    expect(image).toHaveAttribute("src", "/media/hero-branded-set-4x5.jpg");
    expect(image.closest("picture")?.querySelector("source")).toHaveAttribute(
      "media",
      "(min-width: 48rem)",
    );
    expect(image.closest("picture")?.querySelector("source")).toHaveAttribute(
      "srcset",
      "/media/hero-branded-set.jpg",
    );
  });

  it("renders the designed fallback when a page photo is withdrawn", () => {
    render(
      <PageStudioPhoto
        fallback={<p>Photograph withdrawn</p>}
        photoId="media-023"
        sizes="100vw"
      />,
    );

    expect(screen.getByText("Photograph withdrawn")).toBeVisible();
    expect(screen.queryByRole("img")).toBeNull();
  });
});
