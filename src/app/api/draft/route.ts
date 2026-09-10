import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const collection = searchParams.get("collection") || "pages";

  // Validate preview secret token using dedicated PREVIEW_SECRET
  if (
    !secret ||
    !process.env.PREVIEW_SECRET ||
    secret !== process.env.PREVIEW_SECRET
  ) {
    return new Response("Invalid draft preview token", { status: 401 });
  }

  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl =
    collection === "posts"
      ? `/blog/${slug}`
      : slug === "home" || slug === "index"
        ? "/"
        : `/${slug}`;

  redirect(redirectUrl);
}
