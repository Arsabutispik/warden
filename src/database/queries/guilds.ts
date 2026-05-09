import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { guilds } from "../schema.js";
import { logger } from "#lib";
import { redis } from "#lib";

export const getServerPrefix = async (serverId: string): Promise<string> => {
    const cacheKey = `guild:${serverId}:prefix`;

    const cachedPrefix = await redis.get(cacheKey);
    if (cachedPrefix) return cachedPrefix.toString();

    try {
        const result = await db
            .select({ prefix: guilds.prefix })
            .from(guilds)
            .where(eq(guilds.guildId, serverId))
            .limit(1);

        const prefix = result[0]?.prefix || "!";

        await redis.setEx(cacheKey, 86400, prefix);

        return prefix;
    } catch (error) {
        logger.error({ error, serverId }, "Error fetching server prefix");
        return "!";
    }
};
export const getServerLanguage = async (serverId: string): Promise<string> => {
    const cacheKey = `guild:${serverId}:language`;

    const cachedLanguage = await redis.get(cacheKey);
    if (cachedLanguage) return cachedLanguage.toString();

    try {
        const result = await db
            .select({ language: guilds.language })
            .from(guilds)
            .where(eq(guilds.guildId, serverId))
            .limit(1);

        const language = result[0]?.language || "en";

        await redis.setEx(cacheKey, 86400, language);

        return language;
    } catch (error) {
        logger.error({ error, serverId }, "Error fetching server language");
        return "en";
    }
};
export const setServerLanguage = async (serverId: string, language: string): Promise<void> => {
    const cacheKey = `guild:${serverId}:language`;

    try {
        await db
            .insert(guilds)
            .values({
                guildId: serverId,
                language: language,
            })
            .onConflictDoUpdate({
                target: guilds.guildId,
                set: { language: language },
            });

        await redis.setEx(cacheKey, 86400, language);

        logger.info({ serverId, language }, "Server language synchronized");
    } catch (error) {
        logger.error({ error, serverId, language }, "Error setting server language");
        throw error;
    }
};
