import type { ReactNode } from "react";

import styles from "./ui.module.css";

type MediaFallbackProps = Readonly<{
  action?: ReactNode;
  description: string;
  title: string;
}>;

export function MediaFallback({
  action,
  description,
  title,
}: MediaFallbackProps) {
  return (
    <figure className={styles.mediaFallback}>
      <div className={styles.fallbackArtwork} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <figcaption>
        <p className="eyebrow">Consent-safe gallery</p>
        <h2>{title}</h2>
        <p>{description}</p>
        {action ? <div className={styles.fallbackAction}>{action}</div> : null}
      </figcaption>
    </figure>
  );
}
