import { getPayload } from "payload";
import config from "../payload.config";

async function seed() {
  console.log("🌱 Seeding Payload CMS data...");
  const payload = await getPayload({ config });

  // Create initial Admin User if not existing
  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
  });

  if (existingUsers.docs.length === 0) {
    console.log("👤 Creating default CMS Administrator...");
    await payload.create({
      collection: "users",
      data: {
        email: "admin@example.com",
        password: "AdminPassword123!",
        name: "CMS Administrator",
        role: "admin",
      },
    });
    console.log("✅ Admin user created: admin@example.com / AdminPassword123!");
  } else {
    console.log("ℹ️ CMS Administrator already exists.");
  }

  // Create initial Category
  const categoryResult = await payload.create({
    collection: "categories",
    data: {
      title: "Announcements",
      slug: "announcements",
    },
  });

  // Create initial Sample Page
  await payload.create({
    collection: "pages",
    data: {
      title: "About Us",
      slug: "about",
      _status: "published",
      layout: [
        {
          blockType: "hero",
          badge: "Welcome",
          heading: "Empowering Modern Web Development",
          subheading:
            "Learn more about our scalable, type-safe full-stack architecture.",
          primaryButtonText: "Explore Features",
          primaryButtonLink: "/",
        },
        {
          blockType: "columns",
          heading: "Core Capabilities",
          columns: [
            {
              title: "Payload CMS v3",
              content:
                "Embedded directly in Next.js App Router for high-performance content management.",
            },
            {
              title: "Dual Auth System",
              content:
                "Better Auth for application users and Payload Auth for CMS editors.",
            },
            {
              title: "Isolated Database Schemas",
              content:
                "Prisma and Payload use distinct PostgreSQL schemas to prevent migration conflicts.",
            },
          ],
        },
      ],
    },
  });

  // Create initial Sample Blog Post
  await payload.create({
    collection: "posts",
    data: {
      title: "Welcome to Our New Platform",
      slug: "welcome-to-our-platform",
      excerpt: "An overview of our new Next.js 15 and Payload CMS platform.",
      content: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Welcome to our new application! Built with Next.js App Router, Tailwind CSS, Prisma, and Payload CMS.",
                },
              ],
            },
          ],
        },
      },
      category: categoryResult.id,
      _status: "published",
    },
  });

  console.log("✨ Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
