"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import styles from "./site-shell.module.css";

export type NavigationItem = Readonly<{
  href: string;
  label: string;
}>;

type SiteHeaderProps = Readonly<{
  businessName: string;
  hours: string;
  locationLabel: string;
  navItems: readonly NavigationItem[];
  phoneHref: string;
  whatsappHref: string;
}>;

function isCurrentRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function SiteHeader({
  businessName,
  hours,
  locationLabel,
  navItems,
  phoneHref,
  whatsappHref,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, [pathname]);

  function openMenu() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  function handleClose() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  const navigation = (className: string | undefined, includeHome = false) => (
    <ul className={className}>
      {includeHome ? (
        <li>
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
      ) : null}
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={
              isCurrentRoute(pathname, item.href) ? "page" : undefined
            }
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={styles.header}>
      <div className={styles.utilityBar}>
        <div className={styles.utilityInner}>
          <span>{hours}</span>
          <span className={styles.utilityLinks}>
            <a href={whatsappHref}>WhatsApp</a>
            <a href={phoneHref}>Call</a>
          </span>
        </div>
      </div>
      <div className={styles.headerInner}>
        <Link
          className={styles.wordmark}
          href="/"
          aria-label={`${businessName} home`}
        >
          <span>{businessName}</span>
          <small>{locationLabel}</small>
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation(styles.navList)}
          <Link className="button button-small" href="/book">
            Book
          </Link>
        </nav>
        <button
          className={styles.menuTrigger}
          type="button"
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={openMenu}
        >
          <MenuIcon />
          Menu
        </button>
      </div>
      <dialog
        className={styles.mobileDialog}
        ref={dialogRef}
        aria-labelledby="mobile-menu-title"
        onClose={handleClose}
      >
        <div className={styles.dialogHeader}>
          <div>
            <p className="eyebrow">Navigate</p>
            <h2 id="mobile-menu-title">Explore the studio</h2>
          </div>
          <button
            className={styles.closeButton}
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation(styles.mobileNavList, true)}
        </nav>
        <div className={styles.dialogActions}>
          <Link className="button" href="/book" onClick={closeMenu}>
            Book or contact
          </Link>
          <a className="button-secondary" href={whatsappHref}>
            WhatsApp the studio
          </a>
        </div>
      </dialog>
    </header>
  );
}
