import type { GlobalConfig } from "payload";

export const FooterGlobal: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  fields: [
    {
      name: "copyrightText",
      type: "text",
      defaultValue: "All rights reserved.",
    },
    {
      name: "columns",
      type: "array",
      label: "Footer Link Columns",
      fields: [
        {
          name: "columnTitle",
          type: "text",
          required: true,
        },
        {
          name: "links",
          type: "array",
          label: "Links",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
