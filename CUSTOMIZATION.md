# Project Customization & Maintenance Guide

This document outlines everything to customize when creating a new application from this template, as well as procedures for ongoing dependency maintenance.

---

## 🛠️ Customization Checklist for New Projects

When starting a new project, update the following configuration files:

### 1. Application Name & Metadata (`src/config/site.ts`)

Update the centralized site configuration file to reflect your new project's name, description, and repository URL:

```typescript
export const siteConfig = {
  name: "My New Application",
  shortName: "MyNewApp",
  description: "Description of my new application.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    github: "https://github.com/my-org/my-new-app",
  },
  author: "My Organization",
};
```

### 2. Package Configuration (`package.json`)

Change the project `name` field from `"fullstack-template"` to your unique project name:

```json
{
  "name": "my-new-app",
  "version": "0.1.0"
}
```

### 3. Isolated Database & Container (`docker-compose.yml` & `.env`)

Every project **must** use a unique local database name and container name to prevent data collisions:

- In `docker-compose.yml`:
  ```yaml
  container_name: my-new-app-postgres
  environment:
    POSTGRES_DB: my_new_app_db
  ```
- In `.env`:
  ```env
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_new_app_db?schema=public"
  ```

### 4. Authentication Secret (`.env`)

Every project **must** generate its own unique `BETTER_AUTH_SECRET` (at least 32 characters long):

```bash
# Generate secret command:
openssl rand -hex 32
```

Never reuse authentication secrets across projects or staging/production environments.

### 5. UI Branding & Theme (`src/app/globals.css` & `tailwind.config.ts`)

Customize design tokens, primary color palettes, and radius variables in `src/app/globals.css` to match your brand style.

---

## 🔄 Dependency Maintenance & Security Policy

### 1. Dependabot Automation

GitHub Dependabot is pre-configured in `.github/dependabot.yml` to:

- Check npm packages weekly (Mondays)
- Check GitHub Actions weekly (Mondays)
- Group patch and minor updates into single pull requests
- Limit open pull requests to a maximum of 5

### 2. Update Procedure Rules

1. **Security Vulnerability Alerts**:
   - Review and merge security patch pull requests **immediately**.
   - Run `npm audit` to inspect severity.

2. **Patch & Minor Updates**:
   - Review weekly grouped Dependabot PRs.
   - Verify that automated GitHub Actions CI passes before merging.

3. **Major Version Upgrades**:
   - Upgrade major dependency releases **individually** in dedicated feature branches.
   - Read migration guides and breaking change notes before upgrading.

4. **Post-Update Verification**:
   - Always execute `npm run check` locally after merging or applying dependency updates.

5. **Audit Fix Policy**:
   - ⚠️ **NEVER** run `npm audit fix --force` automatically. `--force` can install incompatible major breaking versions and disrupt project architecture.
