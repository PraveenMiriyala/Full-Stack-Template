import { notFound, redirect, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getPayloadClient } from "@/lib/payload";
import { RenderBlocks, type BlockData } from "@/cms/renderers/RenderBlocks";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugString = slug.join("/");
  const isDraftMode = (await draftMode()).isEnabled;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: slugString,
        },
      },
      draft: isDraftMode,
      overrideAccess: isDraftMode,
      limit: 1,
    });

    const page = result.docs[0];
    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    const seo = (page as Record<string, unknown>).seo as
      | {
          title?: string;
          description?: string;
          canonicalUrl?: string;
          noIndex?: boolean;
          noFollow?: boolean;
          ogTitle?: string;
          ogDescription?: string;
        }
      | undefined;

    const title = seo?.title || (page.title as string) || siteConfig.name;
    const description = seo?.description || siteConfig.description;
    const robots = {
      index: !seo?.noIndex,
      follow: !seo?.noFollow,
    };

    return {
      title,
      description,
      alternates: {
        canonical: seo?.canonicalUrl || `${siteConfig.url}/${slugString}`,
      },
      robots,
      openGraph: {
        title: seo?.ogTitle || title,
        description: seo?.ogDescription || description,
      },
    };
  } catch {
    return {
      title: siteConfig.name,
    };
  }
}

export default async function DynamicCMSPage({ params }: PageProps) {
  const { slug } = await params;
  const slugString = slug.join("/");
  const currentPath = `/${slugString}`;
  const isDraftMode = (await draftMode()).isEnabled;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: slugString,
        },
      },
      draft: isDraftMode,
      overrideAccess: isDraftMode,
      limit: 1,
    });

    const page = result.docs[0];

    // If page is not found, check Payload Redirects collection
    if (!page) {
      const redirectMatches = await payload.find({
        collection: "redirects",
        where: {
          from: {
            equals: currentPath,
          },
        },
        limit: 1,
      });

      const redirectDoc = redirectMatches.docs[0];
      if (redirectDoc) {
        let destinationUrl: string | undefined;

        if (typeof redirectDoc.to === "string") {
          destinationUrl = redirectDoc.to;
        } else if (
          typeof redirectDoc.to === "object" &&
          redirectDoc.to !== null
        ) {
          const toObj = redirectDoc.to as Record<string, unknown>;
          if (typeof toObj.url === "string") {
            destinationUrl = toObj.url;
          } else if (toObj.reference && typeof toObj.reference === "object") {
            const ref = toObj.reference as {
              relationTo?: string;
              value?: unknown;
            };
            if (
              typeof ref.value === "object" &&
              ref.value &&
              "slug" in ref.value
            ) {
              const slugVal = (ref.value as { slug: string }).slug;
              destinationUrl =
                ref.relationTo === "posts" ? `/blog/${slugVal}` : `/${slugVal}`;
            }
          }
        }

        // Prevent infinite redirect loops if destination matches current path
        if (destinationUrl && destinationUrl !== currentPath) {
          const isPermanent = redirectDoc.statusCode === "301";
          if (isPermanent) {
            permanentRedirect(destinationUrl);
          } else {
            redirect(destinationUrl);
          }
        }
      }

      notFound();
    }

    const seo = (page as Record<string, unknown>).seo as
      | {
          schemaType?: string;
          jsonLd?: string;
        }
      | undefined;

    const schemaType = seo?.schemaType || "WebPage";
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: page.title,
      url: `${siteConfig.url}/${slugString}`,
    };

    return (
      <article className="pb-16">
        {/* Structured Data Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        {seo?.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: seo.jsonLd }}
          />
        )}

        {/* Render Page Layout Blocks */}
        <RenderBlocks blocks={(page.layout as unknown as BlockData[]) || []} />
      </article>
    );
  } catch (error) {
    // Re-throw Next.js redirect/notFound exceptions so Next.js handles navigation correctly
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest?: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_")
    ) {
      throw error;
    }
    notFound();
  }
}
