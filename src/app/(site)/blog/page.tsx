import Link from "next/link";
import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Latest news, articles, and updates.",
};

export default async function BlogIndexPage() {
  try {
    const payload = await getPayloadClient();
    const postsResult = await payload.find({
      collection: "posts",
      where: {
        _status: {
          equals: "published",
        },
      },
      sort: "-publishedAt",
    });

    const posts = postsResult.docs;

    return (
      <div className="container space-y-8 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Blog & Updates
          </h1>
          <p className="text-muted-foreground">
            Articles and insight published directly from Payload CMS.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No published blog posts found. Add posts in the Payload Admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const coverImage = post.coverImage as
                { url?: string; alt?: string } | undefined;
              const category = post.category as { title?: string } | undefined;

              return (
                <Card
                  key={post.id}
                  className="flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {coverImage?.url && (
                      <div className="relative h-48 w-full bg-muted">
                        <Image
                          src={coverImage.url}
                          alt={coverImage.alt || post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <CardHeader>
                      {category?.title && (
                        <Badge variant="outline" className="mb-2 w-fit">
                          {category.title}
                        </Badge>
                      )}
                      <CardTitle className="text-xl">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition-colors hover:text-primary"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>

                    {post.excerpt && (
                      <CardContent>
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  } catch {
    return (
      <div className="container py-12 text-center text-muted-foreground">
        Blog content requires a running PostgreSQL database connection. Start
        your database and refresh.
      </div>
    );
  }
}
