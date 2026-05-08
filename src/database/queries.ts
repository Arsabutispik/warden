import { eq } from 'drizzle-orm';
import { db } from './index.js';
import { guilds } from './schema.js';
import {logger} from "../lib/logger.js";

export const getServerPrefix = async (serverId: string): Promise<string> => {
    try {
        const result = await db
            .select({ prefix: guilds.prefix })
            .from(guilds)
            .where(eq(guilds.guildId, serverId))
            .limit(1);

        return result[0]?.prefix ?? '!';
    } catch (error) {
        logger.error({ error, serverId }, 'Error fetching server prefix');
        return '!';
    }
};
export const getServerLanguage = async (serverId: string): Promise<string> => {
    try {
        const result = await db
            .select({ language: guilds.language })
            .from(guilds)
            .where(eq(guilds.guildId, serverId))
            .limit(1);
        return result[0]?.language ?? 'en';
    } catch (error) {
        logger.error({error, serverId}, "Error fetching server language")
        return 'en';
    }
}
export const setServerLanguage = async (serverId: string, language: string): Promise<void> => {
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

        logger.info({ serverId, language }, "Server language synchronized");
    } catch (error) {
        logger.error({ error, serverId, language }, "Error setting server language");
        throw error; 
    }
}