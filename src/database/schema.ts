import { pgTable, text } from "drizzle-orm/pg-core";

export const guilds = pgTable("guilds", {
    guildId: text("guild_id").primaryKey(),
    prefix: text("prefix").default("!").notNull(),
    language: text("language").default("en").notNull(),
});
