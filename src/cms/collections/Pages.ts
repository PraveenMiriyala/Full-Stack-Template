import type { CollectionConfig } from "payload";
import { HeroBlock } from "../blocks/Hero";
import { RichTextBlock } from "../blocks/RichText";
import { ImageBlock } from "../blocks/ImageBlock";
import { CallToActionBlock } from "../blocks/CallToAction";
import { ColumnsBlock } from "../blocks/Columns";
import { FAQBlock } from "../blocks/FAQ";
import { TestimonialsBlock } from "../blocks/Testimonials";
import { seoFields } from "../fields/seo";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
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
      name: "layout",
      type: "blocks",
      blocks: [
        HeroBlock,
        RichTextBlock,
        ImageBlock,
        CallToActionBlock,
        ColumnsBlock,
        FAQBlock,
        TestimonialsBlock,
      ],
      label: "Page Layout Blocks",
    },
    ...seoFields,
  ],
};
