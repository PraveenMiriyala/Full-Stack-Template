import type { CollectionConfig } from "payload";

export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: {
    useAsTitle: "from",
    defaultColumns: ["from", "to", "statusCode"],
  },
  fields: [
    {
      name: "from",
      type: "text",
      required: true,
      label: "From Path (e.g. /old-page)",
    },
    {
      name: "to",
      type: "text",
      required: true,
      label: "To URL or Path (e.g. /new-page)",
    },
    {
      name: "statusCode",
      type: "select",
      defaultValue: "301",
      options: [
        { label: "301 Permanent Redirect", value: "301" },
        { label: "302 Temporary Redirect", value: "302" },
      ],
    },
  ],
};
