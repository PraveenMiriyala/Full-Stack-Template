import React from "react";
import { LexicalRichText } from "../renderers/LexicalRichText";

export interface RichTextBlockProps {
  content?: Record<string, unknown> | string;
}

export function RichTextComponent({ content }: RichTextBlockProps) {
  if (!content) return null;

  return (
    <div className="container max-w-4xl py-8">
      <LexicalRichText content={content} />
    </div>
  );
}
