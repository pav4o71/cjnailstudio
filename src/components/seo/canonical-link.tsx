export function CanonicalLink({ path }: { path: string }) {
  return <link rel="canonical" href={path} />;
}
