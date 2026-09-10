export const siteConfig = {
  name: "Fullstack App",
  shortName: "FullstackApp",
  description:
    "A production-ready full-stack application template built with Next.js, TypeScript, Tailwind CSS, Prisma, and Better Auth.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    github: "https://github.com",
  },
  author: "Your Organization",
};

export type SiteConfig = typeof siteConfig;
