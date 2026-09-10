# Template & Payload CMS Setup Guide

This guide walks you through instantiating a new application from this GitHub Template Repository with embedded Payload CMS v3.

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

2. Generate secure 32+ character authentication secrets for Better Auth and Payload CMS:

   ```bash
   # On macOS/Linux or Git Bash:
   openssl rand -hex 32
   ```

3. Update `.env` with your project secrets and database connection strings:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_app_db?schema=public"
   PAYLOAD_DATABASE_URI="postgresql://postgres:postgres@localhost:5432/my_app_db?schema=payload"
   BETTER_AUTH_SECRET="your-generated-better-auth-secret"
   BETTER_AUTH_URL="http://localhost:3000"
   PAYLOAD_SECRET="your-generated-payload-cms-secret"
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

2. Run initial Prisma database migrations (for application user data):

   ```bash
   npm run db:migrate
   ```

3. Generate the Prisma Client:
   ```bash
   npm run db:generate
   ```

---

## 🔑 5. Payload CMS Administrator Creation & Seeding

### Option A: Automatic Seed Script

Run the built-in CMS seed script to automatically create the initial administrator user (`admin@example.com` / `AdminPassword123!`), sample categories, dynamic pages, and blog posts:

```bash
npm run cms:seed
```

### Option B: Manual UI First-Time Setup

1. Launch the application (`npm run dev`).
2. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).
3. The first-time setup screen will prompt you to register the first CMS Administrator email and password.

---

## 📝 6. Editing and Publishing Content in Payload CMS

1. Access the Admin Panel at [http://localhost:3000/admin](http://localhost:3000/admin).
2. **Creating & Publishing Pages**:
   - Go to **Collections** > **Pages** > **Create New**.
   - Enter Page Title and Slug (e.g. `about` or `services`).
   - Add layout blocks (Hero, Rich Text, Image, Call to Action, Columns, FAQ, Testimonials).
   - Fill out SEO title, meta description, and social sharing settings.
   - Click **Save Draft** for previewing, or **Publish** to make the page live on `http://localhost:3000/slug`.
3. **Creating Blog Posts**:
   - Go to **Collections** > **Posts** > **Create New**.
   - Add post content, excerpt, category tag, and cover image.
   - Click **Publish** to render the article live on `/blog` and `/blog/your-post-slug`.

---

## 🛡️ 7. Pre-deployment Validation

Before committing code or deploying to production, run the full validation suite:

```bash
npm run check
```

This single command runs environment validation, TypeScript typechecking, ESLint, Prettier formatting check, Vitest unit tests, and production build verification.
