import type { ReactNode } from "react";

import styles from "./ui.module.css";

type StatusCalloutProps = Readonly<{
  action?: ReactNode;
  children: ReactNode;
  title: string;
  tone?: "info" | "success" | "warning" | "danger";
}>;

const icons = {
  info: "i",
  success: "✓",
  warning: "!",
  danger: "×",
} as const;

export function StatusCallout({
  action,
  children,
  title,
  tone = "info",
}: StatusCalloutProps) {
  return (
    <aside className={`${styles.statusCallout} ${styles[tone]}`}>
      <span className={styles.statusIcon} aria-hidden="true">
        {icons[tone]}
      </span>
      <div>
        <h2>{title}</h2>
        <div className={styles.statusCopy}>{children}</div>
        {action ? <div className={styles.statusAction}>{action}</div> : null}
      </div>
    </aside>
  );
}
