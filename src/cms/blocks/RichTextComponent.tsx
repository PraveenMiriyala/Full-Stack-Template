import React from "react";

export interface RichTextBlockProps {
  content?: Record<string, unknown> | string;
}

export function RichTextComponent({ content }: RichTextBlockProps) {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <div className="prose dark:prose-invert container max-w-4xl py-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  return (
    <div className="prose dark:prose-invert container max-w-4xl py-8">
      {/* Fallback structured content viewer */}
      <pre className="overflow-auto rounded bg-muted p-4 text-xs">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}
