import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "_status", "updatedAt"],
    preview: (doc) => {
      const slug = typeof doc?.slug === "string" ? doc.slug : "";
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      return `${baseUrl}/api/draft?secret=${process.env.PREVIEW_SECRET}&slug=${slug}&collection=posts`;
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Short Excerpt",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Cover Image",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Category",
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Publication Date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    ...seoFields,
  ],
};
