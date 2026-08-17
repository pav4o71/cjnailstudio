/**
 * Original studio decoration authorized by D-014. Not a retained media_id
 * and not derived from docs/source/media-manifest.json.
 */
import { useId } from "react";

import styles from "./ui.module.css";

type StudioArtProps = Readonly<{
  variant: "hero" | "fallback";
}>;

const almonds = [
  {
    cx: 78,
    cy: 118,
    rot: -22,
    stroke: "var(--color-brand-deep)",
    fill: "rgb(255 249 250 / 42%)",
  },
  {
    cx: 118,
    cy: 108,
    rot: -8,
    stroke: "var(--color-brand)",
    fill: "rgb(255 255 255 / 55%)",
  },
  {
    cx: 154,
    cy: 122,
    rot: 10,
    stroke: "var(--color-seasonal)",
    fill: "rgb(251 233 238 / 50%)",
  },
  {
    cx: 98,
    cy: 148,
    rot: 4,
    stroke: "var(--color-brand-strong)",
    fill: "rgb(255 255 255 / 28%)",
  },
  {
    cx: 138,
    cy: 158,
    rot: 16,
    stroke: "var(--color-rose-soft)",
    fill: "rgb(251 233 238 / 35%)",
  },
] as const;

function almondPath(cx: number, cy: number) {
  const w = 28;
  const h = 62;
  return `M ${cx} ${cy - h} C ${cx + w} ${cy - h * 0.55} ${cx + w} ${cy + h * 0.2} ${cx} ${cy + h} C ${cx - w} ${cy + h * 0.2} ${cx - w} ${cy - h * 0.55} ${cx} ${cy - h} Z`;
}

export function StudioArt({ variant }: StudioArtProps) {
  const fieldId = useId().replaceAll(":", "");
  const frameClass =
    variant === "hero" ? styles.studioArtHero : styles.studioArtFallback;

  return (
    <div className={`${styles.studioArt} ${frameClass}`} aria-hidden="true">
      <svg focusable="false" viewBox="0 0 240 280">
        <defs>
          <linearGradient id={fieldId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-surface-blush)" />
            <stop offset="1" stopColor="var(--color-rose-soft)" />
          </linearGradient>
        </defs>
        <rect fill={`url(#${fieldId})`} height="280" width="240" x="0" y="0" />
        {almonds.map((almond) => (
          <path
            d={almondPath(almond.cx, almond.cy)}
            fill={almond.fill}
            key={`${almond.cx}-${almond.rot}`}
            stroke={almond.stroke}
            strokeWidth="2.4"
            transform={`rotate(${almond.rot} ${almond.cx} ${almond.cy})`}
          />
        ))}
        <circle
          cx="64"
          cy="72"
          fill="var(--color-surface)"
          opacity="0.9"
          r="7"
        />
        <circle cx="176" cy="84" fill="#fff" opacity="0.72" r="4.5" />
      </svg>
    </div>
  );
}
