import type { ReactNode } from "react";

import { StudioArt } from "./studio-art";
import styles from "./ui.module.css";

type MediaFallbackProps = Readonly<{
  action?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}>;

export function MediaFallback({
  action,
  description,
  eyebrow,
  title,
}: MediaFallbackProps) {
  return (
    <figure className={styles.mediaFallback}>
      <div className={styles.fallbackArtwork} aria-hidden="true">
        <StudioArt variant="fallback" />
      </div>
      <figcaption>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        {action ? <div className={styles.fallbackAction}>{action}</div> : null}
      </figcaption>
    </figure>
  );
}
