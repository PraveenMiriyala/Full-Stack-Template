import type { Block } from "payload";

export const CallToActionBlock: Block = {
  slug: "cta",
  labels: {
    singular: "Call to Action",
    plural: "Call to Actions",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "CTA Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "buttonText",
      type: "text",
      label: "Button Text",
      required: true,
    },
    {
      name: "buttonLink",
      type: "text",
      label: "Button Link",
      required: true,
    },
  ],
};
