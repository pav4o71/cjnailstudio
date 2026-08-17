import Link from "next/link";

import { desktopBookCta } from "@/src/content/navigation";

import styles from "./site-shell.module.css";

type MobileActionBarProps = Readonly<{
  whatsappHref: string;
}>;

export function MobileActionBar({ whatsappHref }: MobileActionBarProps) {
  return (
    <nav className={styles.mobileActionBar} aria-label="Quick booking actions">
      <Link className="button" href={desktopBookCta.href}>
        {desktopBookCta.label}
      </Link>
      <a className="button-secondary" href={whatsappHref}>
        WhatsApp the studio
      </a>
    </nav>
  );
}
