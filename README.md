# Full-Stack Next.js 15 & Payload CMS v3 Template

A production-ready, reusable full-stack web application template built with **TypeScript**, **Next.js 15 (App Router)**, **Payload CMS v3**, **Tailwind CSS**, **shadcn/ui**, **PostgreSQL**, **Prisma ORM**, **Better Auth**, **Zod**, **Vitest**, and **Playwright**.

---

## 📖 Key Documentation Links

- [**ARCHITECTURE.md**](ARCHITECTURE.md) – Hybrid architecture guide (Better Auth + Payload Auth, Prisma + Payload Postgres schema isolation).
- [**PROJECT_MAP.md**](PROJECT_MAP.md) – Comprehensive map of CMS collections, page blocks, renderers, and routes.
- [**SETUP.md**](SETUP.md) – Step-by-step instructions to create a new project from this template and setup Payload CMS.
- [**CUSTOMIZATION.md**](CUSTOMIZATION.md) – Guide for changing branding, colors, secrets, and dependency maintenance policy.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router with `src/app`)
- **CMS**: Payload CMS v3 (Embedded in Next.js App Router at `/admin`)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & custom shadcn/ui components
- **Database**: PostgreSQL & Prisma ORM (Application users in `public` schema, CMS data in `payload` schema)
- **Authentication**: Better Auth (App users) & Payload Auth (CMS Admins)
- **Validation**: Zod schema validation for runtime env vars and forms
- **Testing**: Vitest (Unit) & Playwright (End-to-End)
- **CI/CD**: GitHub Actions CI & Dependabot weekly update automation

---

## 💻 NPM Scripts Reference

| Command                | Description                                                                                   |
| :--------------------- | :-------------------------------------------------------------------------------------------- |
| `npm run dev`          | Start Next.js development server on `http://localhost:3000`                                   |
| `npm run build`        | Create optimized production build                                                             |
| `npm run start`        | Start Next.js production server                                                               |
| `npm run typecheck`    | Run strict TypeScript compiler verification                                                   |
| `npm run lint`         | Run ESLint checks                                                                             |
| `npm run format`       | Format project files with Prettier                                                            |
| `npm run format:check` | Verify formatting with Prettier                                                               |
| `npm run test`         | Run Vitest unit tests                                                                         |
| `npm run test:e2e`     | Run Playwright end-to-end browser tests                                                       |
| `npm run db:up`        | Start PostgreSQL Docker container                                                             |
| `npm run db:down`      | Stop PostgreSQL Docker container                                                              |
| `npm run db:migrate`   | Execute Prisma database migrations                                                            |
| `npm run db:push`      | Push Prisma schema changes directly to DB                                                     |
| `npm run db:studio`    | Open interactive Prisma Studio GUI                                                            |
| `npm run cms:seed`     | Seed initial CMS admin user and sample content                                                |
| `npm run check-env`    | Validate environment variables                                                                |
| `npm run check`        | Run full validation suite (`check-env`, `typecheck`, `lint`, `format:check`, `test`, `build`) |
