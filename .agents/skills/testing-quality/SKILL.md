---
name: testing-quality
description: Vitest unit testing, Playwright E2E browser testing, and automated environment checking guidelines.
---

# Testing & Quality Assurance Skill

When writing unit tests, end-to-end tests, or verifying code quality in this repository:

## 1. Automated Validation Suite

Run the full quality pipeline before committing changes:

```bash
npm run check
```

This executes: `check-env` -> `typecheck` -> `lint` -> `format:check` -> `test` -> `build`.

## 2. Unit Testing (Vitest)

- Place unit tests in `tests/unit/` (e.g. `tests/unit/example.test.ts`).
- Execute unit tests:
  ```bash
  npm run test
  ```

## 3. End-to-End Testing (Playwright)

- Place E2E browser tests in `tests/e2e/` (e.g. `tests/e2e/example.spec.ts`).
- `playwright.config.ts` includes `webServer` orchestration to auto-spawn `npm run dev` on port 3000.
- Execute E2E tests:
  ```bash
  npm run test:e2e
  ```
- **Locator Best Practice**: For client components that fetch session state asynchronously (such as `useSession()`), use `.first()` or `.toBeVisible({ timeout: 10000 })` to allow hydration to complete gracefully.
