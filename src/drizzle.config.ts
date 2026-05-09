import { defineConfig } from "drizzle-kit";
import { env } from "#lib";

export default defineConfig({
    schema: "./src/database/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: { url: env.DATABASE_URL },
});
