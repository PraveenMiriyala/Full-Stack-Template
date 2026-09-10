---
name: payload-cms
description: Payload CMS v3 collection schemas, custom blocks, globals, local API fetching, and Lexical richtext rendering rules.
---

# Payload CMS v3 Skill

When adding or modifying CMS collections, globals, or layout blocks:

## 1. Directory Structure (`src/cms/`)

- `collections/`: Entity definitions (`Pages.ts`, `Posts.ts`, `Categories.ts`, `Media.ts`, `AdminUsers.ts`, `Redirects.ts`).
- `globals/`: Site-wide settings (`SiteSettings.ts`, `HeaderNavigation.ts`, `Footer.ts`).
- `blocks/`: Layout block definitions (`Hero.ts`, `CallToAction.ts`, `RichText.ts`, `MediaBlock.ts`) and React renderers (`HeroComponent.tsx`, etc.).
- `fields/`: Reusable field schemas (e.g., `seoFields`).
- `renderers/`: Block factory (`RenderBlocks.tsx`) mapping block slugs to frontend React components.

## 2. Local API Data Fetching

- Always use the helper in `@/lib/payload`:
  ```ts
  import { getPayloadClient } from "@/lib/payload";

  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    draft: false,
    overrideAccess: false,
  });
  ```

## 3. Creating New Layout Blocks

1. Define the block schema in `src/cms/blocks/NewBlock.ts` (`slug`, `fields`).
2. Create frontend component in `src/cms/blocks/NewBlockComponent.tsx`.
3. Register block slug in `src/cms/renderers/RenderBlocks.tsx`.
4. Add block to `blocks` array in `src/cms/collections/Pages.ts`.
