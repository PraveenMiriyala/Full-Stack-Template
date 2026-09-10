# Full-Stack Next.js GitHub Template Repository

A production-ready, reusable full-stack web application template built with **TypeScript**, **Next.js 15 (App Router)**, **Tailwind CSS**, **shadcn/ui**, **PostgreSQL**, **Prisma ORM**, **Better Auth**, **Zod**, **Vitest**, and **Playwright**.

---

## 📖 Quick Links

- [**SETUP.md**](SETUP.md) – Step-by-step instructions to create a new project from this template.
- [**CUSTOMIZATION.md**](CUSTOMIZATION.md) – Guide for changing branding, colors, secrets, and dependency maintenance policy.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router with `src/app`)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & custom shadcn/ui components
- **Database**: PostgreSQL (via Docker Compose) & Prisma ORM
- **Authentication**: Better Auth with Email & Password provider + Prisma adapter
- **Validation**: Zod schema validation for runtime env vars and forms
- **Testing**: Vitest (Unit) & Playwright (End-to-End)
- **Code Quality**: ESLint 9 & Prettier
- **CI/CD**: GitHub Actions CI & Dependabot weekly update automation

---

## 📁 Directory Structure

```text
├── .github/
│   ├── dependabot.yml     # Dependabot configuration (weekly npm & actions updates)
│   └── workflows/
│       └── ci.yml         # Continuous Integration workflow (typecheck, lint, test, build)
├── docker-compose.yml     # PostgreSQL container configuration
├── prisma/
│   └── schema.prisma      # Prisma schema models (User, Session, Account, Verification)
├── scripts/
│   └── validate-env.ts    # Environment variable validation script
├── src/
│   ├── app/
│   │   ├── (auth)/        # Auth pages (sign-in, sign-up)
│   │   ├── api/           # API routes (Better Auth handler, protected routes)
│   │   ├── dashboard/     # Protected user dashboard (Server Component auth check)
│   │   ├── error.tsx      # App error boundary
│   │   ├── globals.css    # Global Tailwind styles & CSS variables
│   │   ├── layout.tsx     # Root application layout
│   │   ├── loading.tsx    # Global suspense loading UI
│   │   ├── not-found.tsx  # Accessible 404 page
│   │   └── page.tsx       # Responsive marketing homepage
│   ├── components/        # Reusable UI component library (shadcn/ui, Navbar, Footer)
│   ├── config/
│   │   └── site.ts        # Centralized application name & metadata configuration
│   ├── lib/               # Singleton utilities (prisma, auth, auth-client, env, utils)
│   ├── schemas/           # Zod validation schemas
│   ├── server/            # Server actions & DB helpers
│   └── types/             # Shared TypeScript type definitions
├── tests/
│   ├── unit/              # Vitest unit test suites
│   └── e2e/               # Playwright E2E browser test suites
├── .env.example           # Placeholder environment variables
├── CUSTOMIZATION.md       # Rename & customization checklist
├── SETUP.md               # Template setup guide
├── next.config.mjs
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vitest.config.ts
```

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
| `npm run check-env`    | Validate environment variables                                                                |
| `npm run check`        | Run full validation suite (`check-env`, `typecheck`, `lint`, `format:check`, `test`, `build`) |
