import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page page-narrow">
      <p className="eyebrow">Not found</p>
      <h1>This page is not available</h1>
      <p className="lede">
        The address you opened is not a public page on this website. Use the
        studio pages below, or contact the studio to plan a visit.
      </p>
      <div className="actions">
        <Link className="button" href="/">
          Back to home
        </Link>
        <Link className="button-secondary" href="/book">
          Book or contact the studio
        </Link>
      </div>
    </div>
  );
}
