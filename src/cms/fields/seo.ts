import type { Field } from "payload";

export const seoFields: Field[] = [
  {
    name: "seo",
    type: "group",
    label: "SEO & Social Sharing",
    fields: [
      {
        name: "title",
        type: "text",
        label: "SEO Title",
      },
      {
        name: "description",
        type: "textarea",
        label: "Meta Description",
      },
      {
        name: "canonicalUrl",
        type: "text",
        label: "Canonical URL",
      },
      {
        type: "row",
        fields: [
          {
            name: "noIndex",
            type: "checkbox",
            label: "Hide from Search Engines (noindex)",
            defaultValue: false,
          },
          {
            name: "noFollow",
            type: "checkbox",
            label: "Don't follow links (nofollow)",
            defaultValue: false,
          },
        ],
      },
      {
        name: "ogTitle",
        type: "text",
        label: "Open Graph Title",
      },
      {
        name: "ogDescription",
        type: "textarea",
        label: "Open Graph Description",
      },
      {
        name: "ogImage",
        type: "upload",
        relationTo: "media",
        label: "Open Graph Image",
      },
      {
        name: "schemaType",
        type: "select",
        label: "Structured Data Schema Type",
        defaultValue: "WebPage",
        options: [
          { label: "WebPage", value: "WebPage" },
          { label: "Article / BlogPosting", value: "Article" },
          { label: "Organization", value: "Organization" },
          { label: "FAQPage", value: "FAQPage" },
        ],
      },
      {
        name: "jsonLd",
        type: "code",
        label: "Custom JSON-LD (Optional)",
        admin: {
          language: "json",
        },
      },
    ],
  },
];
