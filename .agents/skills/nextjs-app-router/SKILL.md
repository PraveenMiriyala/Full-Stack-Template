---
name: nextjs-app-router
description: Next.js 15 App Router guidelines, React 19 Server Components, streaming, metadata, and dynamic routing patterns.
---

# Next.js 15 App Router Skill

When writing or modifying page routes and components in this repository, follow these conventions:

## 1. Directory Structure (`src/app/`)
- `(site)/`: Public dynamic website routes (e.g., `/[...slug]`, `/blog`, `/blog/[slug]`).
- `(auth)/`: Authentication pages (`/sign-in`, `/sign-up`).
- `(payload)/`: Embedded Payload CMS admin (`/admin`) and API handlers (`/api/[...slug]`).
- `api/`: Public REST endpoints (e.g., `/api/auth/[...all]`, `/api/protected`).

## 2. Server Components vs Client Components
- Prefer **Server Components** by default for page layouts, data fetching, and SEO rendering.
- Add `"use client";` directive at the top of files ONLY for interactive components requiring React state (`useState`, `useEffect`), event handlers (`onClick`), or client hooks (`usePathname`, `useSession`).

## 3. Database & Dynamic Prerendering Safety
- When creating dynamic CMS pages, export:
  ```ts
  export const dynamic = "force-dynamic";
  ```
- Always wrap database queries in `try/catch` blocks to provide graceful fallback rendering if the database connection is offline during static generation.

## 4. Metadata & SEO
- Implement `generateMetadata()` on dynamic routes to compute page title, description, canonical URL, and Open Graph tags dynamically.
