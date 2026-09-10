import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      label: "Badge Text",
    },
    {
      name: "heading",
      type: "text",
      label: "Main Heading",
      required: true,
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Subheading / Description",
    },
    {
      name: "primaryButtonText",
      type: "text",
      label: "Primary Button Text",
    },
    {
      name: "primaryButtonLink",
      type: "text",
      label: "Primary Button Link",
    },
    {
      name: "secondaryButtonText",
      type: "text",
      label: "Secondary Button Text",
    },
    {
      name: "secondaryButtonLink",
      type: "text",
      label: "Secondary Button Link",
    },
  ],
};
