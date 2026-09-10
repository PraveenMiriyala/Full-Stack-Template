# Application & Payload CMS Architecture

This document describes the hybrid full-stack architecture combining Next.js App Router, Prisma ORM, Better Auth, and Payload CMS.

---

## 🏛️ Architecture Overview

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js 15 App Router                           │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   Public App Routes   │  │        Payload CMS Admin (/admin)     │  │
│  │  (/, /dashboard, etc) │  │  (Collections, Globals, Page Blocks)  │  │
│  └───────────┬───────────┘  └───────────────────┬───────────────────┘  │
└──────────────│──────────────────────────────────│──────────────────────┘
               │                                  │
      ┌────────┴────────┐                ┌────────┴────────┐
      │   Better Auth   │                │   Payload Auth  │
      │  (Public Users) │                │  (Admins/Editors)
      └────────┬────────┘                └────────┬────────┘
               │                                  │
      ┌────────┴────────┐                ┌────────┴────────┐
      │    Prisma ORM   │                │ Payload Postgres│
      │ (public schema) │                │ (payload schema)│
      └────────┬────────┘                └────────┬────────┘
               └────────────────┬─────────────────┘
                                │
                     ┌──────────┴──────────┐
                     │ PostgreSQL Database │
                     └─────────────────────┘
```

---

## 🔐 Dual Authentication Strategy

1. **Better Auth (`src/lib/auth.ts`)**:
   - Authenticates end users for application routes (e.g. user sign-up, sign-in, user dashboard).
   - Data stored in Prisma `user`, `session`, `account`, and `verification` tables (`public` schema).

2. **Payload Auth (`src/cms/collections/Users.ts`)**:
   - Authenticates CMS Administrators and Content Editors for `/admin`.
   - Data stored in Payload `users` table (`payload` schema).

---

## 🗄️ Database & Migration Isolation

To prevent Payload database migrations from interfering with Prisma ORM migrations:

- **Prisma Connection (`DATABASE_URL`)**: Uses the `public` PostgreSQL schema.
- **Payload Connection (`PAYLOAD_DATABASE_URI`)**: Uses an isolated PostgreSQL schema (`schema=payload`) or a dedicated PostgreSQL database.

---

## 🧱 CMS Collections, Globals & Blocks Structure

### Collections (`src/cms/collections/`)

- `Users.ts`: CMS admin/editor accounts.
- `Pages.ts`: Dynamic CMS pages with blocks, versions, and SEO fields.
- `Posts.ts`: Blog articles with excerpts, cover image, and category links.
- `Categories.ts`: Categories for taxonomy tagging.
- `Media.ts`: Local media uploads (`public/media`).
- `Redirects.ts`: URL redirects management.

### Globals (`src/cms/globals/`)

- `SiteSettings.ts`: Site-wide branding and metadata.
- `HeaderNavigation.ts`: Dynamic header link menu.
- `Footer.ts`: Dynamic footer columns and copyright notice.

### Reusable Page Blocks (`src/cms/blocks/`)

- `Hero.ts` / `HeroComponent.tsx`: Hero banner section.
- `RichText.ts` / `RichTextComponent.tsx`: WYSIWYG rich text block.
- `ImageBlock.ts` / `ImageBlockComponent.tsx`: Image asset with caption.
- `CallToAction.ts` / `CTAComponent.tsx`: CTA callout card.
- `Columns.ts` / `ColumnsComponent.tsx`: Multi-column card layout.
- `FAQ.ts` / `FAQComponent.tsx`: Accordion/card Q&A list.
- `Testimonials.ts` / `TestimonialsComponent.tsx`: Quote cards layout.
