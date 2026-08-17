import Link from "next/link";

import styles from "./site-shell.module.css";

type MobileActionBarProps = Readonly<{
  whatsappHref: string;
}>;

export function MobileActionBar({ whatsappHref }: MobileActionBarProps) {
  return (
    <nav className={styles.mobileActionBar} aria-label="Quick booking actions">
      <Link className="button" href="/book">
        Book
      </Link>
      <a className="button-secondary" href={whatsappHref}>
        WhatsApp
      </a>
    </nav>
  );
}
