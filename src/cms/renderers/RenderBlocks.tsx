import React from "react";
import { HeroComponent, type HeroBlockProps } from "@/cms/blocks/HeroComponent";
import {
  RichTextComponent,
  type RichTextBlockProps,
} from "@/cms/blocks/RichTextComponent";
import {
  ImageBlockComponent,
  type ImageBlockProps,
} from "@/cms/blocks/ImageBlockComponent";
import { CTAComponent, type CTABlockProps } from "@/cms/blocks/CTAComponent";
import {
  ColumnsComponent,
  type ColumnsBlockProps,
} from "@/cms/blocks/ColumnsComponent";
import { FAQComponent, type FAQBlockProps } from "@/cms/blocks/FAQComponent";
import {
  TestimonialsComponent,
  type TestimonialsBlockProps,
} from "@/cms/blocks/TestimonialsComponent";

export interface BlockData {
  blockType: string;
  [key: string]: unknown;
}

export function RenderBlocks({ blocks }: { blocks?: BlockData[] }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block;

        switch (blockType) {
          case "hero":
            return (
              <HeroComponent
                key={index}
                {...(block as unknown as HeroBlockProps)}
              />
            );
          case "richText":
            return (
              <RichTextComponent
                key={index}
                {...(block as unknown as RichTextBlockProps)}
              />
            );
          case "imageBlock":
            return (
              <ImageBlockComponent
                key={index}
                {...(block as unknown as ImageBlockProps)}
              />
            );
          case "cta":
            return (
              <CTAComponent
                key={index}
                {...(block as unknown as CTABlockProps)}
              />
            );
          case "columns":
            return (
              <ColumnsComponent
                key={index}
                {...(block as unknown as ColumnsBlockProps)}
              />
            );
          case "faq":
            return (
              <FAQComponent
                key={index}
                {...(block as unknown as FAQBlockProps)}
              />
            );
          case "testimonials":
            return (
              <TestimonialsComponent
                key={index}
                {...(block as unknown as TestimonialsBlockProps)}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
