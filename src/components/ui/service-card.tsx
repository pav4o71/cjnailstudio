import Link from "next/link";

import styles from "./ui.module.css";

type ServiceCardProps = Readonly<{
  actionLabel?: string;
  headingLevel?: "h2" | "h3";
  href?: string;
  label: string;
}>;

export function ServiceCard({
  actionLabel = "Ask about this service",
  headingLevel = "h3",
  href = "/book",
  label,
}: ServiceCardProps) {
  const Heading = headingLevel;

  return (
    <article className={styles.serviceCard}>
      <span className={styles.cardMark} aria-hidden="true">
        ✦
      </span>
      <Heading>{label}</Heading>
      <Link className={styles.cardLink} href={href}>
        {actionLabel}
        <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}
