import React from "react";

export interface LexicalNode {
  type: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: "bullet" | "number";
  fields?: {
    url?: string;
    newTab?: boolean;
  };
  children?: LexicalNode[];
  [key: string]: unknown;
}

export interface LexicalContent {
  root?: {
    children?: LexicalNode[];
  };
}

// Lexical Text Format Bitmasks
const IS_BOLD = 1;
const IS_ITALIC = 1 << 1;
const IS_STRIKETHROUGH = 1 << 2;
const IS_UNDERLINE = 1 << 3;
const IS_CODE = 1 << 4;

function renderTextNode(node: LexicalNode, key: string | number) {
  let element: React.ReactNode = node.text || "";
  const format = node.format || 0;

  if (format & IS_CODE) {
    element = (
      <code
        key={key}
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
      >
        {element}
      </code>
    );
  }
  if (format & IS_BOLD) {
    element = <strong key={key}>{element}</strong>;
  }
  if (format & IS_ITALIC) {
    element = <em key={key}>{element}</em>;
  }
  if (format & IS_UNDERLINE) {
    element = <u key={key}>{element}</u>;
  }
  if (format & IS_STRIKETHROUGH) {
    element = <s key={key}>{element}</s>;
  }

  return <React.Fragment key={key}>{element}</React.Fragment>;
}

export function renderLexicalNode(
  node: LexicalNode,
  index: number
): React.ReactNode {
  const key = `${node.type}-${index}`;
  const children = node.children
    ? node.children.map((child, i) => renderLexicalNode(child, i))
    : null;

  switch (node.type) {
    case "text":
      return renderTextNode(node, key);

    case "paragraph":
      return (
        <p key={key} className="mb-4 leading-relaxed">
          {children}
        </p>
      );

    case "heading": {
      const tag = node.tag || "h2";
      if (tag === "h1") {
        return (
          <h1
            key={key}
            className="mb-4 mt-8 text-3xl font-extrabold tracking-tight md:text-4xl"
          >
            {children}
          </h1>
        );
      }
      if (tag === "h3") {
        return (
          <h3
            key={key}
            className="mb-3 mt-5 text-xl font-bold tracking-tight md:text-2xl"
          >
            {children}
          </h3>
        );
      }
      if (tag === "h4") {
        return (
          <h4 key={key} className="mb-2 mt-4 text-lg font-semibold">
            {children}
          </h4>
        );
      }
      if (tag === "h5") {
        return (
          <h5 key={key} className="mb-2 mt-3 text-base font-semibold">
            {children}
          </h5>
        );
      }
      if (tag === "h6") {
        return (
          <h6 key={key} className="mb-2 mt-3 text-sm font-semibold">
            {children}
          </h6>
        );
      }
      return (
        <h2
          key={key}
          className="mb-3 mt-6 text-2xl font-bold tracking-tight md:text-3xl"
        >
          {children}
        </h2>
      );
    }

    case "list": {
      if (node.listType === "number") {
        return (
          <ol key={key} className="mb-4 ml-6 list-decimal space-y-1">
            {children}
          </ol>
        );
      }
      return (
        <ul key={key} className="mb-4 ml-6 list-disc space-y-1">
          {children}
        </ul>
      );
    }

    case "listitem":
      return <li key={key}>{children}</li>;

    case "quote":
      return (
        <blockquote
          key={key}
          className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
        >
          {children}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={key}
          className="my-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
        >
          <code>{children}</code>
        </pre>
      );

    case "link": {
      const url = node.fields?.url || "#";
      const target = node.fields?.newTab ? "_blank" : undefined;
      const rel = node.fields?.newTab ? "noopener noreferrer" : undefined;
      return (
        <a
          key={key}
          href={url}
          target={target}
          rel={rel}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </a>
      );
    }

    default:
      if (children) {
        return <div key={key}>{children}</div>;
      }
      return null;
  }
}

export function LexicalRichText({
  content,
}: {
  content?: LexicalContent | Record<string, unknown> | string;
}) {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const lexicalObj = content as LexicalContent;
  const nodes = lexicalObj?.root?.children;

  if (!nodes || !Array.isArray(nodes)) {
    return null;
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      {nodes.map((node, index) => renderLexicalNode(node, index))}
    </div>
  );
}
