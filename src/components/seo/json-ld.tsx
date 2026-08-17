import { localBusinessJsonLd } from "@/src/content/seo";
import { site } from "@/src/content/site";

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessJsonLd(site)).replaceAll(
          "<",
          "\\u003c",
        ),
      }}
    />
  );
}
