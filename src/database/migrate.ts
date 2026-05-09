import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

const runMigrations = async () => {
    console.log("⏳ Running database migrations...");

    const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 });
    const db = drizzle(migrationClient);

    try {
        await migrate(db, { migrationsFolder: "./drizzle" });
        console.log("✅ Migrations applied successfully!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    } finally {
        await migrationClient.end();
    }
};

void runMigrations();
