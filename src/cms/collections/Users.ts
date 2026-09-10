import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role", "createdAt"],
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Full Name",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      required: true,
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        update: ({ req }) => req.user?.role === "admin",
      },
    },
  ],
};
