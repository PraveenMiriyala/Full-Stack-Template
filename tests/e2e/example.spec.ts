import { test, expect } from "@playwright/test";

test.describe("Homepage & Navigation E2E", () => {
  test("should display main heading and navigation links", async ({ page }) => {
    await page.goto("/");

    // Verify header title
    await expect(page.locator("h1")).toContainText("Modern Full-Stack Power");

    // Check Sign In button navigation
    const signInButton = page.getByRole("link", { name: /Sign In/i });
    await expect(signInButton).toBeVisible();

    // Check Sign Up button navigation
    const signUpButton = page.getByRole("link", { name: /Sign Up/i });
    await expect(signUpButton).toBeVisible();
  });

  test("should navigate to sign-in page", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(
      page.getByRole("heading", { name: /Welcome Back/i })
    ).toBeVisible();
  });
});
