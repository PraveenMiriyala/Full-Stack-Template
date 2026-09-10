import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Fullstack Application",
    },
    {
      name: "siteDescription",
      type: "textarea",
      defaultValue:
        "Production-ready full-stack template with Payload CMS integration.",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Site Logo",
    },
  ],
};
