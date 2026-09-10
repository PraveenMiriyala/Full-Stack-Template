import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const collection = searchParams.get("collection") || "pages";

  // Validate preview secret token
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return new Response("Invalid draft preview token", { status: 401 });
  }

  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl =
    collection === "posts"
      ? `/blog/${slug}?draft=true`
      : slug === "home" || slug === "index"
        ? "/?draft=true"
        : `/${slug}?draft=true`;

  redirect(redirectUrl);
}
