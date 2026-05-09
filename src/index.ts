import "reflect-metadata";
import { Client } from "stoatx";
import { initI18n } from "./i18n.js";
import { getServerPrefix } from "#database";
import { logger, initRedis, env } from "#lib";

logger.info("🚀 Starting Warden...");

const client = new Client({
    prefix: async ({ serverId }) => {
        return serverId ? await getServerPrefix(serverId) : "!";
    },
    extensions: env.NODE_ENV === "development" ? [".ts"] : [".js"],
});

async function start() {
    try {
        logger.info("🚀 Starting Warden...");

        await initI18n();
        await initRedis();
        await client.initCommands();
        await client.loginBot(env.STOAT_TOKEN);
    } catch (err) {
        logger.fatal({ err }, "Failed to start Warden");
        process.exit(1);
    }
}

void start();
