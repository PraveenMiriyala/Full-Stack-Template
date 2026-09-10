# Full-Stack Next.js 15 & Payload CMS v3 Starter Template

A production-ready, reusable full-stack web application starter template built with **TypeScript**, **Next.js 15 (App Router)**, **Payload CMS v3**, **Tailwind CSS**, **shadcn/ui**, **PostgreSQL**, **Prisma ORM**, **Better Auth**, **Zod**, **Vitest**, and **Playwright**.

---

## ⚡ Quick Start (Local Development)

Get your local development environment running in **5 simple steps**:

### Prerequisites

- **Node.js**: v20.x, v22.x, or v24.x LTS
- **npm**: v10.x or v11.x
- **Docker Desktop**: (Optional, for running PostgreSQL locally via Docker Compose) or an active local PostgreSQL server.

---

### Step 1: Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/PraveenMiriyala/Full-Stack-Template.git my-app
cd my-app

# Install exact dependencies using the committed lockfile
npm ci
```

---

### Step 2: Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

_(The default `.env.example` settings are pre-configured to work out of the box with the local Docker PostgreSQL container)._

You can validate your environment variables at any time:

```bash
npm run check-env
```

---

### Step 3: Start Local PostgreSQL Database

If using Docker Compose:

```bash
npm run db:up
```

_This starts a local PostgreSQL instance running on `localhost:5432` with database `my_app_db`._

---

### Step 4: Run Database Migrations & Seed CMS Data

Run Prisma database migrations for public application user accounts, generate the Prisma Client, and seed sample CMS pages, posts, and admin credentials:

```bash
# Run Prisma database migrations
npm run db:migrate

# Seed CMS admin user and sample content
npm run cms:seed
```

---

### Step 5: Launch Development Server

```bash
npm run dev
```

Your app is now running locally!

---

## 🔗 Default Local URLs & Credentials

| Resource                        | URL                                                                    | Credentials / Notes                                                 |
| :------------------------------ | :--------------------------------------------------------------------- | :------------------------------------------------------------------ |
| **Public Web Application**      | [http://localhost:3000](http://localhost:3000)                         | Main landing page & responsive layout                               |
| **Payload CMS Admin Dashboard** | [http://localhost:3000/admin](http://localhost:3000/admin)             | **Email:** `admin@example.com`<br>**Password:** `AdminPassword123!` |
| **Public App User Sign In**     | [http://localhost:3000/sign-in](http://localhost:3000/sign-in)         | Powered by Better Auth                                              |
| **Dynamic Blog**                | [http://localhost:3000/blog](http://localhost:3000/blog)               | Published blog posts from Payload                                   |
| **Dynamic Sitemap**             | [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml) | Automated SEO canonical sitemap                                     |
| **Robots Configuration**        | [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt)   | Automated robots.txt handler                                        |

---

## 🛠️ Core Tech Stack & Features

- **Next.js 15 App Router**: Server Components, streaming, nested layouts, dynamic routes (`/[...slug]`, `/blog/[slug]`).
- **Payload CMS v3**: Directly embedded into Next.js App Router under `(payload)/admin` and `(payload)/api`.
- **Dual Authentication System**:
  - **Better Auth**: Handles public application users, session management, and auth API endpoints (`/api/auth/*`).
  - **Payload Auth**: Isolated authentication system for CMS administrators (`Admin Users` collection).
- **Dual Database Schema Isolation**:
  - **Prisma ORM**: Manages application user models in the `public` PostgreSQL schema.
  - **Payload CMS (Drizzle Adapter)**: Manages CMS collections, globals, and media in the `payload` schema.
- **Payload Collections & Globals**:
  - **Collections**: Admin Users, Pages, Posts, Categories, Media, Redirects.
  - **Globals**: Site Settings, Header Navigation, Footer Navigation.
  - **Modular Page Blocks**: Hero, Rich Text, Image, Call To Action, Columns, FAQ, Testimonials.
- **Complete Built-in SEO**: Dynamic metadata, Open Graph & Twitter cards, JSON-LD structured data (`WebPage`, `BlogPosting`), `noindex`/`nofollow` fields, dynamic `sitemap.xml`, and `/robots.txt`.
- **Styling**: Tailwind CSS, `clsx`, `tailwind-merge`, and custom accessible shadcn/ui primitives.
- **Testing**: Vitest for unit testing and Playwright for browser end-to-end testing with automated dev server orchestration.

---

## 💻 NPM Scripts Reference

| Command                | Description                                                                                                    |
| :--------------------- | :------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Start Next.js development server on `http://localhost:3000`                                                    |
| `npm run build`        | Generate Prisma Client and build optimized Next.js + Payload production bundle                                 |
| `npm run start`        | Start Next.js production server                                                                                |
| `npm run check-env`    | Validate `.env` variables against Zod schema                                                                   |
| `npm run typecheck`    | Execute strict TypeScript type checker (`tsc --noEmit`)                                                        |
| `npm run lint`         | Run ESLint checks                                                                                              |
| `npm run format`       | Auto-format code with Prettier                                                                                 |
| `npm run format:check` | Verify code formatting with Prettier                                                                           |
| `npm run test`         | Run Vitest unit tests                                                                                          |
| `npm run test:e2e`     | Run Playwright end-to-end browser tests                                                                        |
| `npm run check`        | Run full automated quality suite (`check-env` -> `typecheck` -> `lint` -> `format:check` -> `test` -> `build`) |
| `npm run db:up`        | Start local PostgreSQL Docker container                                                                        |
| `npm run db:down`      | Stop local PostgreSQL Docker container                                                                         |
| `npm run db:migrate`   | Apply Prisma database migrations                                                                               |
| `npm run db:push`      | Push Prisma schema directly to DB                                                                              |
| `npm run db:studio`    | Launch Prisma Studio GUI                                                                                       |
| `npm run db:generate`  | Generate Prisma Client                                                                                         |
| `npm run cms:seed`     | Seed initial CMS admin user and sample content                                                                 |

---

## 📁 Project Directory Structure

```
├── .github/                  # GitHub Actions CI workflow & Dependabot config
├── prisma/
│   └── schema.prisma         # Prisma schema for application users & sessions
├── scripts/
│   ├── seed-cms.ts           # Payload CMS initial seed script
│   └── validate-env.ts       # Environment variable runtime validator
├── src/
│   ├── app/
│   │   ├── (auth)/           # Better Auth public user pages (sign-in, sign-up)
│   │   ├── (payload)/        # Payload CMS embedded admin & API routes
│   │   ├── (site)/           # Dynamic CMS public page & blog routes
│   │   ├── api/              # Better Auth & custom REST API endpoints
│   │   ├── globals.css       # Tailwind CSS design system & tokens
│   │   ├── layout.tsx        # Root HTML layout & Navbar integration
│   │   ├── robots.ts         # Automated robots.txt handler
│   │   └── sitemap.ts        # Dynamic canonical XML sitemap
│   ├── cms/
│   │   ├── blocks/           # Payload block definitions & frontend renderers
│   │   ├── collections/      # AdminUsers, Pages, Posts, Categories, Media, Redirects
│   │   ├── fields/           # Reusable fields (SEO metadata)
│   │   ├── globals/          # SiteSettings, Header, Footer globals
│   │   └── renderers/        # Page block renderer factory
│   ├── components/           # shadcn/ui components & layout Navbar
│   ├── config/               # Site configuration metadata
│   ├── lib/                  # Auth clients, Prisma client, Payload client, utils
│   └── server/               # Server-side auth & data helpers
├── tests/
│   ├── e2e/                  # Playwright end-to-end browser tests
│   └── unit/                 # Vitest unit test suites
├── docker-compose.yml        # Local PostgreSQL container configuration
├── payload.config.ts         # Payload CMS main configuration file
├── playwright.config.ts      # Playwright test runner configuration
└── vitest.config.ts          # Vitest unit test runner configuration
```

---

## 🧪 Testing & Validation

### Run Unit Tests

```bash
npm run test
```

### Run End-to-End Browser Tests

```bash
npm run test:e2e
```

### Run Full Quality Pipeline

Before pushing code or opening pull requests, run the comprehensive check pipeline:

```bash
npm run check
```

---

## 📖 Related Documentation

- [**ARCHITECTURE.md**](ARCHITECTURE.md) – Technical guide on dual authentication and database isolation architecture.
- [**PROJECT_MAP.md**](PROJECT_MAP.md) – Structural reference of CMS collections, page blocks, and renderers.
- [**SETUP.md**](SETUP.md) – Advanced guide for creating new projects from this template.

---

## 📄 License

Distributed under the MIT License. Free for commercial and non-commercial use.
