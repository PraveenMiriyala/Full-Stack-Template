# Template Setup Guide

This guide walks you through instantiating a new application from this GitHub Template Repository.

---

## 🚀 1. Create a New Repository from this Template

### Option A: Via GitHub Web Interface

1. Click the **Use this template** button at the top right of this repository page on GitHub.
2. Select **Create a new repository**.
3. Choose your organization or account, enter your new repository name, and set visibility.
4. Clone your new repository locally:
   ```bash
   git clone https://github.com/your-username/your-new-repo.git
   cd your-new-repo
   ```

### Option B: Via GitHub CLI (`gh`)

```bash
gh repo create my-new-app --template your-org/fullstack-template --public --clone
cd my-new-app
```

---

## 📦 2. Install Dependencies

Install project dependencies using the committed `package-lock.json` file:

```bash
npm ci
```

---

## ⚙️ 3. Environment Variable Configuration

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Generate a secure 32+ character authentication secret for Better Auth:

   ```bash
   # On macOS/Linux or Git Bash:
   openssl rand -hex 32
   ```

3. Update `.env` with your project secrets and local database credentials:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_app_db?schema=public"
   BETTER_AUTH_SECRET="your-generated-32-char-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. Validate your environment variables:
   ```bash
   npm run check-env
   ```

---

## 🗄️ 4. Database Setup & Migration

1. Start your local PostgreSQL container:

   ```bash
   npm run db:up
   ```

2. Run initial Prisma database migrations:

   ```bash
   npm run db:migrate
   ```

3. Generate the Prisma Client:

   ```bash
   npm run db:generate
   ```

4. (Optional) Open Prisma Studio GUI to inspect your database:
   ```bash
   npm run db:studio
   ```

---

## 💻 5. Launch the Application

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your new application.

---

## 🛡️ 6. Pre-deployment Validation

Before committing code or deploying to production, run the full validation suite:

```bash
npm run check
```

This single command runs environment validation, TypeScript typechecking, ESLint, Prettier formatting check, Vitest unit tests, and production build verification.
