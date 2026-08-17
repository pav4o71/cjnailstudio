import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { site } from "@/src/content/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Beauty Nail Studio by Cj | Nail & Lash Studio in Makati",
    template: "%s | Beauty Nail Studio by Cj",
  },
  description:
    "Explore custom nail art, BIAB, soft gel, nail extensions and lash services at Knightsbridge, Makati. Book, WhatsApp or call the studio.",
};

const nav = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <header className="site-header">
          <div className="header-inner">
            <Link
              className="wordmark"
              href="/"
              aria-label="Beauty Nail Studio by Cj home"
            >
              Beauty Nail Studio by Cj
            </Link>
            <nav className="primary-nav" aria-label="Primary navigation">
              {nav.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link className="button" href="/book">
                Book
              </Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <strong>{site.business.name}</strong>
              <div>{site.location.address}</div>
              <div>{site.location.hours}</div>
            </div>
            <div className="footer-links" aria-label="Contact links">
              <a href="https://wa.me/639617400664">WhatsApp the studio</a>
              <a href="tel:+639617400664">Call {site.phone.display}</a>
              <a href={`mailto:${site.business.email}`}>Email the studio</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
