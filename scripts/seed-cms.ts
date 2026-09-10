import { getPayload } from "payload";
import config from "../payload.config";

async function seed() {
  console.log("🌱 Seeding Payload CMS data...");
  const payload = await getPayload({ config });

  const adminEmail = process.env.CMS_ADMIN_EMAIL || "admin@template.local";
  const adminPassword = process.env.CMS_ADMIN_PASSWORD || "ChangeMe123!";

  // 1. Idempotent Admin User creation
  const existingUsers = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: adminEmail,
      },
    },
    limit: 1,
  });

  if (existingUsers.docs.length === 0) {
    console.log(`👤 Creating CMS Administrator (${adminEmail})...`);
    await payload.create({
      collection: "users",
      data: {
        email: adminEmail,
        password: adminPassword,
        name: "CMS Administrator",
        role: "admin",
      },
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`ℹ️ CMS Administrator (${adminEmail}) already exists.`);
  }

  // 2. Idempotent Category creation
  const existingCategories = await payload.find({
    collection: "categories",
    where: {
      slug: {
        equals: "announcements",
      },
    },
    limit: 1,
  });

  let categoryId = existingCategories.docs[0]?.id;
  if (!categoryId) {
    console.log("📁 Creating initial category...");
    const categoryResult = await payload.create({
      collection: "categories",
      data: {
        title: "Announcements",
        slug: "announcements",
      },
    });
    categoryId = categoryResult.id;
  } else {
    console.log("ℹ️ Announcements category already exists.");
  }

  // 3. Idempotent Page creation
  const existingPages = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "about",
      },
    },
    limit: 1,
  });

  if (existingPages.docs.length === 0) {
    console.log("📄 Creating sample page ('about')...");
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
  } else {
    console.log("ℹ️ About page already exists.");
  }

  // 4. Idempotent Post creation
  const existingPosts = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: "welcome-to-our-platform",
      },
    },
    limit: 1,
  });

  if (existingPosts.docs.length === 0) {
    console.log("📝 Creating sample blog post...");
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
        category: categoryId,
        _status: "published",
      },
    });
  } else {
    console.log("ℹ️ Welcome blog post already exists.");
  }

  console.log("✨ Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
