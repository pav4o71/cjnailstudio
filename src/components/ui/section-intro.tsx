import type { ReactNode } from "react";

import styles from "./ui.module.css";

type SectionIntroProps = Readonly<{
  eyebrow: string;
  heading: string;
  headingId?: string;
  children?: ReactNode;
}>;

export function SectionIntro({
  eyebrow,
  heading,
  headingId,
  children,
}: SectionIntroProps) {
  return (
    <div className={styles.sectionIntro}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{heading}</h2>
      {children ? <div className={styles.introCopy}>{children}</div> : null}
    </div>
  );
}
