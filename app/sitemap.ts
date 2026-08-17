import type { MetadataRoute } from "next";

import { sitemapEntries } from "@/src/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
