/** Netlify unique/draft hosts look like `abc123--site.netlify.app`. */
export function previewHostnameNeedsNoindex(host: string): boolean {
  return host.includes("--");
}
