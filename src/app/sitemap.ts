import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { getPosts } from "@/lib/insights";

// The home page, plus the Insights pages once posts are published. Drafts
// never appear on the live site, so they are never listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...(posts.length > 0
      ? [
          { url: `${SITE_URL}/insights`, changeFrequency: "weekly" as const, priority: 0.7 },
          ...posts.map((post) => ({
            url: `${SITE_URL}/insights/${post.slug}`,
            lastModified: new Date(`${post.date}T00:00:00Z`),
            priority: 0.6,
          })),
        ]
      : []),
  ];
}
