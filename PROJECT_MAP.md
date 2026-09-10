# Project Map & File Locations

This document lists the code structure and locations for Payload CMS, App Router routes, and core libraries.

---

## 📍 File Locations Map

### Payload CMS Definitions

- **Master Configuration**: [`payload.config.ts`](payload.config.ts)
- **Collections**:
  - CMS Users: [`src/cms/collections/Users.ts`](src/cms/collections/Users.ts)
  - Pages: [`src/cms/collections/Pages.ts`](src/cms/collections/Pages.ts)
  - Posts: [`src/cms/collections/Posts.ts`](src/cms/collections/Posts.ts)
  - Categories: [`src/cms/collections/Categories.ts`](src/cms/collections/Categories.ts)
  - Media: [`src/cms/collections/Media.ts`](src/cms/collections/Media.ts)
  - Redirects: [`src/cms/collections/Redirects.ts`](src/cms/collections/Redirects.ts)
- **Globals**:
  - Site Settings: [`src/cms/globals/SiteSettings.ts`](src/cms/globals/SiteSettings.ts)
  - Header Navigation: [`src/cms/globals/HeaderNavigation.ts`](src/cms/globals/HeaderNavigation.ts)
  - Footer: [`src/cms/globals/Footer.ts`](src/cms/globals/Footer.ts)
- **Page Blocks**:
  - Hero: [`src/cms/blocks/Hero.ts`](src/cms/blocks/Hero.ts) & [`src/cms/blocks/HeroComponent.tsx`](src/cms/blocks/HeroComponent.tsx)
  - Rich Text: [`src/cms/blocks/RichText.ts`](src/cms/blocks/RichText.ts) & [`src/cms/blocks/RichTextComponent.tsx`](src/cms/blocks/RichTextComponent.tsx)
  - Image: [`src/cms/blocks/ImageBlock.ts`](src/cms/blocks/ImageBlock.ts) & [`src/cms/blocks/ImageBlockComponent.tsx`](src/cms/blocks/ImageBlockComponent.tsx)
  - Call to Action: [`src/cms/blocks/CallToAction.ts`](src/cms/blocks/CallToAction.ts) & [`src/cms/blocks/CTAComponent.tsx`](src/cms/blocks/CTAComponent.tsx)
  - Columns: [`src/cms/blocks/Columns.ts`](src/cms/blocks/Columns.ts) & [`src/cms/blocks/ColumnsComponent.tsx`](src/cms/blocks/ColumnsComponent.tsx)
  - FAQ: [`src/cms/blocks/FAQ.ts`](src/cms/blocks/FAQ.ts) & [`src/cms/blocks/FAQComponent.tsx`](src/cms/blocks/FAQComponent.tsx)
  - Testimonials: [`src/cms/blocks/Testimonials.ts`](src/cms/blocks/Testimonials.ts) & [`src/cms/blocks/TestimonialsComponent.tsx`](src/cms/blocks/TestimonialsComponent.tsx)
- **SEO Fields**: [`src/cms/fields/seo.ts`](src/cms/fields/seo.ts)
- **Block Switcher Renderer**: [`src/cms/renderers/RenderBlocks.tsx`](src/cms/renderers/RenderBlocks.tsx)

### App Router Routes

- **Payload Admin UI**: [`src/app/(payload)/admin/[[...segments]]/page.tsx`](<src/app/(payload)/admin/[[...segments]]/page.tsx>) (`http://localhost:3000/admin`)
- **Payload REST API**: [`src/app/(payload)/api/[...slug]/route.ts`](<src/app/(payload)/api/[...slug]/route.ts>)
- **Payload GraphQL API**: [`src/app/(payload)/api/graphql/route.ts`](<src/app/(payload)/api/graphql/route.ts>)
- **Dynamic CMS Pages**: [`src/app/(site)/[...slug]/page.tsx`](<src/app/(site)/[...slug]/page.tsx>)
- **Blog Listing**: [`src/app/(site)/blog/page.tsx`](<src/app/(site)/blog/page.tsx>)
- **Single Blog Post**: [`src/app/(site)/blog/[slug]/page.tsx`](<src/app/(site)/blog/[slug]/page.tsx>)
- **Dynamic Sitemap**: [`src/app/sitemap.ts`](src/app/sitemap.ts)

### Core Libraries & Utilities

- **Payload Helper**: [`src/lib/payload.ts`](src/lib/payload.ts)
- **Prisma Singleton**: [`src/lib/prisma.ts`](src/lib/prisma.ts)
- **Better Auth Server**: [`src/lib/auth.ts`](src/lib/auth.ts)
- **Better Auth Client**: [`src/lib/auth-client.ts`](src/lib/auth-client.ts)
