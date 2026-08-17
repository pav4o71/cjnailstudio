import Link from "next/link";

import { site } from "@/src/content/site";
import { createManualHandoffs } from "@/src/domain/booking";

import styles from "./site-shell.module.css";

export function SiteFooter() {
  const handoffs = createManualHandoffs(site.phone.e164);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerIdentity}>
          <strong>{site.business.name}</strong>
          <p>Custom nail art, nail and lash services in Makati.</p>
        </div>
        <div>
          <h2 className={styles.footerHeading}>Explore</h2>
          <ul className={styles.footerList}>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/visit">Visit</Link>
            </li>
            <li>
              <Link href="/book">Book or contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={styles.footerHeading}>Contact</h2>
          <ul className={styles.footerList}>
            <li>
              <a href={handoffs.whatsapp.href}>WhatsApp the studio</a>
            </li>
            <li>
              <a href={handoffs.phone.href}>Call {site.phone.display}</a>
            </li>
            <li>
              <a href={`mailto:${site.business.email}`}>Email the studio</a>
            </li>
            <li>
              <a href="https://www.instagram.com/beautynailstudiobycj/">
                Instagram {site.business.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={styles.footerHeading}>Visit</h2>
          <address>{site.location.address}</address>
          <p>{site.location.hours}</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>
          © {new Date().getFullYear()} {site.business.name}
        </span>
        <span>Website booking does not confirm an appointment.</span>
      </div>
    </footer>
  );
}
