import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getPayloadClient } from "@/lib/payload";
import { Badge } from "@/components/ui/badge";
import { LexicalRichText } from "@/cms/renderers/LexicalRichText";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const isDraftMode = (await draftMode()).isEnabled;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: isDraftMode,
      overrideAccess: isDraftMode,
      limit: 1,
    });

    const post = result.docs[0];
    if (!post) {
      return { title: "Post Not Found" };
    }

    const seo = (post as Record<string, unknown>).seo as
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

    const title = seo?.title || post.title || siteConfig.name;
    const description =
      seo?.description || post.excerpt || siteConfig.description;

    return {
      title: `${title} | Blog`,
      description,
      alternates: {
        canonical: seo?.canonicalUrl || `${siteConfig.url}/blog/${slug}`,
      },
      robots: {
        index: !seo?.noIndex,
        follow: !seo?.noFollow,
      },
      openGraph: {
        title: seo?.ogTitle || title,
        description: seo?.ogDescription || description,
      },
    };
  } catch {
    return { title: siteConfig.name };
  }
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const isDraftMode = (await draftMode()).isEnabled;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: isDraftMode,
      overrideAccess: isDraftMode,
      limit: 1,
    });

    const post = result.docs[0];

    if (!post) {
      notFound();
    }

    const coverImage = post.coverImage as
      { url?: string; alt?: string } | undefined;
    const category = post.category as { title?: string } | undefined;

    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt || post.createdAt,
      url: `${siteConfig.url}/blog/${slug}`,
    };

    return (
      <article className="container max-w-4xl space-y-8 py-12">
        {/* Structured Data Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />

        <header className="space-y-4 text-center">
          {category?.title && <Badge variant="outline">{category.title}</Badge>}
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-sm text-muted-foreground">
              Published on {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          )}
        </header>

        {coverImage?.url && (
          <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg md:h-[450px]">
            <Image
              src={coverImage.url}
              alt={coverImage.alt || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <p className="border-l-4 border-primary py-1 pl-4 text-lg font-medium italic text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="pt-4">
          <LexicalRichText content={post.content} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
