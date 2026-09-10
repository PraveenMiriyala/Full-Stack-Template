import type { Block } from "payload";

export const FAQBlock: Block = {
  slug: "faq",
  labels: {
    singular: "FAQ Section",
    plural: "FAQ Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Frequently Asked Questions",
    },
    {
      name: "questions",
      type: "array",
      label: "Questions & Answers",
      minRows: 1,
      fields: [
        {
          name: "question",
          type: "text",
          label: "Question",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          label: "Answer",
          required: true,
        },
      ],
    },
  ],
};
