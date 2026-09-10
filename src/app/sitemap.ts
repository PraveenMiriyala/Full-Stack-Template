import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    const payload = await getPayloadClient();

    // Fetch published, indexable pages
    const pagesResult = await payload.find({
      collection: "pages",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    const pageRoutes: MetadataRoute.Sitemap = pagesResult.docs
      .filter((page) => {
        const seo = (page as Record<string, unknown>).seo as
          { noIndex?: boolean } | undefined;
        return !seo?.noIndex && page.slug !== "home" && page.slug !== "index";
      })
      .map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    // Fetch published, indexable blog posts
    const postsResult = await payload.find({
      collection: "posts",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    const postRoutes: MetadataRoute.Sitemap = postsResult.docs
      .filter((post) => {
        const seo = (post as Record<string, unknown>).seo as
          { noIndex?: boolean } | undefined;
        return !seo?.noIndex;
      })
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    return [...staticRoutes, ...pageRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
