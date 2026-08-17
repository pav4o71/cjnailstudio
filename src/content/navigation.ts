import { site } from "@/src/content/site";

export type NavigationItem = Readonly<{
  href: string;
  label: string;
}>;

export const desktopPrimaryNav = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/studio", label: "Studio" },
  { href: "/visit", label: "Visit" },
] as const satisfies readonly NavigationItem[];

export const desktopBookCta = {
  href: "/book",
  label: "Book",
} as const satisfies NavigationItem;

export const mobileMenuNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services/custom-nail-art", label: "Custom Nail Art" },
  { href: "/services/lashes", label: "Lashes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/studio", label: "Studio" },
  { href: "/visit", label: "Visit" },
  { href: "/faq", label: "FAQ" },
  { href: "/book", label: "Book" },
] as const satisfies readonly NavigationItem[];

export const footerDocumentNav = [
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const satisfies readonly NavigationItem[];

export const publicLocationLabel = `Knightsbridge Residences · ${site.location.locality}`;

export function instagramProfileUrl(handle: string): string {
  return `https://www.instagram.com/${handle.replace(/^@/, "")}/`;
}
