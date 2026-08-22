import type { ReactNode } from "react";

import Image from "next/image";

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
