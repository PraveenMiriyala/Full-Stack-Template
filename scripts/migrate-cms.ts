import fs from "fs";
import path from "path";

// Ensure non-interactive execution for migrations
if (!process.argv.includes("--force")) {
  process.argv.push("--force");
}

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

import "./patch-next-env.cjs";

async function runMigrations() {
  console.log("🔄 Running Payload CMS database migrations...");
  const config = (await import("../payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });
  if ("migrate" in payload.db && typeof payload.db.migrate === "function") {
    await (
      payload.db as unknown as {
        migrate: (opts?: { force?: boolean }) => Promise<void>;
      }
    ).migrate({ force: true });
    console.log("✅ Payload CMS migrations applied successfully!");
  } else {
    console.warn("⚠️ payload.db.migrate method not found.");
  }
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("❌ Payload migration error:", err);
  process.exit(1);
});
