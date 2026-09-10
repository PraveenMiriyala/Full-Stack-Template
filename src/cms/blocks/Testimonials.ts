import type { Block } from "payload";

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  labels: {
    singular: "Testimonials Section",
    plural: "Testimonials Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "What People Say",
    },
    {
      name: "items",
      type: "array",
      label: "Testimonials",
      minRows: 1,
      fields: [
        {
          name: "quote",
          type: "textarea",
          label: "Quote",
          required: true,
        },
        {
          name: "author",
          type: "text",
          label: "Author Name",
          required: true,
        },
        {
          name: "role",
          type: "text",
          label: "Author Role / Organization",
        },
      ],
    },
  ],
};
