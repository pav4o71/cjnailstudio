"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  desktopBookCta,
  desktopPrimaryNav,
  mobileMenuNav,
  type NavigationItem,
} from "@/src/content/navigation";

import styles from "./site-shell.module.css";

type SiteHeaderProps = Readonly<{
  businessName: string;
  hours: string;
  locationLabel: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
}>;

type MenuCloseReason = "dismiss" | "navigate";

function isCurrentRoute(pathname: string, href: string): boolean {
  return pathname === href;
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

function NavList({
  className,
  includeTrailingMark = false,
  items,
  onNavigate,
  pathname,
}: Readonly<{
  className?: string;
  includeTrailingMark?: boolean;
  items: readonly NavigationItem[];
  onNavigate?: () => void;
  pathname: string;
}>) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={
              isCurrentRoute(pathname, item.href) ? "page" : undefined
            }
            onClick={onNavigate}
          >
            {item.label}
            {includeTrailingMark ? <span aria-hidden="true">→</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader({
  businessName,
  hours,
  locationLabel,
  phoneDisplay,
  phoneHref,
  whatsappHref,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeReasonRef = useRef<MenuCloseReason>("dismiss");
  const moveFocusToMainRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      closeReasonRef.current = "navigate";
      moveFocusToMainRef.current = true;
      dialog.close();
    }
    if (moveFocusToMainRef.current) {
      moveFocusToMainRef.current = false;
      document.getElementById("main")?.focus();
    }
  }, [pathname]);

  function openMenu() {
    closeReasonRef.current = "dismiss";
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeMenu(reason: MenuCloseReason = "dismiss") {
    closeReasonRef.current = reason;
    if (reason === "navigate") moveFocusToMainRef.current = true;
    dialogRef.current?.close();
  }

  function handleClose() {
    const reason = closeReasonRef.current;
    closeReasonRef.current = "dismiss";
    setIsOpen(false);
    if (reason === "navigate") {
      document.getElementById("main")?.focus();
      return;
    }
    triggerRef.current?.focus();
  }

  return (
    <header className={styles.header}>
      <div className={styles.utilityBar}>
        <div className={styles.utilityInner}>
          <span>{hours}</span>
          <span className={styles.utilityLinks}>
            <a href={whatsappHref}>WhatsApp the studio</a>
            <a href={phoneHref}>Call {phoneDisplay}</a>
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
          <NavList
            className={styles.navList}
            items={desktopPrimaryNav}
            pathname={pathname}
          />
          <Link
            className="button button-small"
            href={desktopBookCta.href}
            aria-current={
              isCurrentRoute(pathname, desktopBookCta.href) ? "page" : undefined
            }
          >
            {desktopBookCta.label}
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
            onClick={() => closeMenu("dismiss")}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <NavList
            className={styles.mobileNavList}
            includeTrailingMark
            items={mobileMenuNav}
            onNavigate={() => closeMenu("navigate")}
            pathname={pathname}
          />
        </nav>
        <div className={styles.dialogActions}>
          <Link
            className="button"
            href={desktopBookCta.href}
            onClick={() => closeMenu("navigate")}
          >
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
