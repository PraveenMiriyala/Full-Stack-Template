import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/cms/collections/Users";
import { Pages } from "./src/cms/collections/Pages";
import { Posts } from "./src/cms/collections/Posts";
import { Categories } from "./src/cms/collections/Categories";
import { Media } from "./src/cms/collections/Media";
import { Redirects } from "./src/cms/collections/Redirects";

import { SiteSettings } from "./src/cms/globals/SiteSettings";
import { HeaderNavigation } from "./src/cms/globals/HeaderNavigation";
import { FooterGlobal } from "./src/cms/globals/Footer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Pages, Posts, Categories, Media, Redirects],
  globals: [SiteSettings, HeaderNavigation, FooterGlobal],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.PAYLOAD_DATABASE_URI || process.env.DATABASE_URL || "",
    },
    schemaName: process.env.PAYLOAD_SCHEMA_NAME || "payload",
    migrationDir: path.resolve(dirname, "src/migrations"),
    push: false,
  }),
});
