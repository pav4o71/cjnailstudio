import type { MetadataRoute } from "next";

import { approvedProductionOrigin, deferredPaths } from "@/src/content/seo";

export default function robots(): MetadataRoute.Robots {
  if (!approvedProductionOrigin) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...deferredPaths],
    },
    sitemap: `${approvedProductionOrigin}/sitemap.xml`,
    host: approvedProductionOrigin,
  };
}
