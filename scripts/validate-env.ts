import fs from "fs";
import path from "path";
import { z } from "zod";

// Load .env manually if process.env is missing values (when run outside Next.js runtime)
const envFilePath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      if (key && values.length > 0) {
        const val = values
          .join("=")
          .replace(/^["']|["']$/g, "")
          .trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    }
  });
}

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is missing in environment variables."),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters long."),
  BETTER_AUTH_URL: z
    .string()
    .url("BETTER_AUTH_URL must be a valid URL.")
    .optional()
    .default("http://localhost:3000"),
  PAYLOAD_SECRET: z
    .string()
    .min(32, "PAYLOAD_SECRET must be at least 32 characters long."),
  PAYLOAD_DATABASE_URI: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

try {
  envSchema.parse(process.env);
  console.log("✅ Environment variable validation passed!");
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("❌ Environment Variable Validation Errors:");
    error.errors.forEach((err) => {
      console.error(` - ${err.path.join(".")}: ${err.message}`);
    });
  } else {
    console.error("❌ Unexpected error during environment validation:", error);
  }
  process.exit(1);
}
