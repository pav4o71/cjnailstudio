import type { ReactNode } from "react";

import Image, { getImageProps } from "next/image";

import {
  publishedPhotoById,
  type StudioPhotoRecord,
} from "@/src/content/studio-photos";

import styles from "./ui.module.css";

type StudioPhotoProps = Readonly<{
  photo: StudioPhotoRecord;
  priority?: boolean;
  sizes: string;
}>;

type PageStudioPhotoProps = Readonly<{
  fallback: ReactNode;
  photoId: string;
  priority?: boolean;
  sizes: string;
}>;

export function StudioPhoto({
  photo,
  priority = false,
  sizes,
}: StudioPhotoProps) {
  if (photo.portrait) {
    const common = {
      alt: photo.alt,
      sizes,
      ...(priority ? { fetchPriority: "high" as const } : {}),
    };
    const {
      props: { srcSet: landscapeSrcSet },
    } = getImageProps({
      ...common,
      height: photo.height,
      src: photo.src,
      width: photo.width,
    });
    const { props: rest } = getImageProps({
      ...common,
      height: photo.portrait.height,
      src: photo.portrait.src,
      width: photo.portrait.width,
    });

    return (
      <figure className={styles.studioPhoto}>
        <picture>
          <source media="(min-width: 48rem)" srcSet={landscapeSrcSet} />
          <img {...rest} alt={photo.alt} />
        </picture>
      </figure>
    );
  }

  return (
    <figure className={styles.studioPhoto}>
      <Image
        alt={photo.alt}
        height={photo.height}
        priority={priority}
        sizes={sizes}
        src={photo.src}
        width={photo.width}
      />
    </figure>
  );
}

export function PageStudioPhoto({
  fallback,
  photoId,
  priority = false,
  sizes,
}: PageStudioPhotoProps) {
  const photo = publishedPhotoById(photoId);

  if (!photo) {
    return fallback;
  }

  return <StudioPhoto photo={photo} priority={priority} sizes={sizes} />;
}
