import type { Block } from "payload";

export const ColumnsBlock: Block = {
  slug: "columns",
  labels: {
    singular: "Columns Section",
    plural: "Columns Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
    },
    {
      name: "columns",
      type: "array",
      label: "Columns",
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Column Title",
          required: true,
        },
        {
          name: "content",
          type: "textarea",
          label: "Column Content",
          required: true,
        },
      ],
    },
  ],
};
