import type { GlobalConfig } from "payload";

export const HeaderNavigation: GlobalConfig = {
  slug: "header-navigation",
  label: "Header Navigation",
  fields: [
    {
      name: "navItems",
      type: "array",
      label: "Navigation Links",
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
        {
          name: "newTab",
          type: "checkbox",
          label: "Open in new tab",
          defaultValue: false,
        },
      ],
    },
  ],
};
