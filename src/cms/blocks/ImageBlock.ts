import type { Block } from "payload";

export const ImageBlock: Block = {
  slug: "imageBlock",
  labels: {
    singular: "Image",
    plural: "Images",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image Asset",
    },
    {
      name: "caption",
      type: "text",
      label: "Image Caption",
    },
  ],
};
