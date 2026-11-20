import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";

// Required for route handlers under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
