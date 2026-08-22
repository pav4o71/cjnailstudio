import { approvedProductionOrigin } from "@/src/content/seo";

export function CanonicalLink({ path }: { path: string }) {
  const href = approvedProductionOrigin
    ? new URL(path, `${approvedProductionOrigin}/`).href
    : path;

  return <link rel="canonical" href={href} />;
}
