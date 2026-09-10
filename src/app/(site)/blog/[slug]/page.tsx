import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    draft?: string;
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { draft } = await searchParams;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: draft === "true",
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
        canonical: seo?.canonicalUrl,
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

export default async function BlogPostPage({
  params,
  searchParams,
}: PostPageProps) {
  const { slug } = await params;
  const { draft } = await searchParams;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: draft === "true",
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

        <div className="prose dark:prose-invert max-w-none pt-4">
          {typeof post.content === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <pre className="overflow-auto rounded bg-muted p-4 text-xs">
              {JSON.stringify(post.content, null, 2)}
            </pre>
          )}
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
