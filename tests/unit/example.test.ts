import { describe, it, expect } from "vitest";
import { signUpSchema, signInSchema } from "@/schemas/auth";
import { cn } from "@/lib/utils";

describe("Auth Zod Validation Schemas", () => {
  it("should validate valid sign up payload correctly", () => {
    const validData = {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "securepassword123",
    };
    const result = signUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email in sign up schema", () => {
    const invalidData = {
      name: "Jane Doe",
      email: "invalid-email-format",
      password: "securepassword123",
    };
    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should validate valid sign in payload correctly", () => {
    const validData = {
      email: "jane@example.com",
      password: "securepassword123",
    };
    const result = signInSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject short passwords in sign up schema", () => {
    const invalidData = {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "123",
    };
    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Tailwind cn Utility", () => {
  it("should merge class names correctly", () => {
    const result = cn("px-2 py-1", "bg-blue-500", { "font-bold": true });
    expect(result).toContain("px-2");
    expect(result).toContain("py-1");
    expect(result).toContain("bg-blue-500");
    expect(result).toContain("font-bold");
  });
});
