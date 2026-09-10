---
name: prisma-better-auth
description: Prisma ORM schema guidelines, PostgreSQL dual-schema isolation, and Better Auth authentication session rules.
---

# Prisma ORM & Better Auth Skill

Follow these guidelines for database models and public user authentication:

## 1. Dual Schema Isolation

- **Application Users**: Defined in `prisma/schema.prisma` using Prisma ORM (`public` PostgreSQL schema).
- **CMS Administrators**: Defined in Payload collections using Drizzle-backed Postgres adapter (`payload` PostgreSQL schema).
- **Do not mix** Prisma models with Payload collections. Keep user accounts isolated.

## 2. Prisma Database Workflow

- Edit `prisma/schema.prisma` for application tables (`User`, `Session`, `Account`, `VerificationToken`).
- Run migrations:
  ```bash
  npm run db:migrate
  ```
- Access Prisma client in server code:
  ```ts
  import { prisma } from "@/lib/prisma";
  ```

## 3. Better Auth Integration

- Server auth configuration: `@/lib/auth`
- Client auth hooks: `@/lib/auth-client` (`useSession()`, `signIn`, `signUp`, `signOut`)
- Client authentication state handling: check `isPending` state before rendering user profile/login buttons in navigation header to prevent layout flicker.
