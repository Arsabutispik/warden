import "reflect-metadata";
import { Client } from "stoatx";
import { env } from './config.js';
import { initI18n, t } from './i18n.js';
import { db } from './database/index.js';
import { guilds } from './database/schema.js';
import {getServerPrefix} from "./database/queries.js";
import { logger } from './lib/logger.js';

logger.info('🚀 Starting Warden...');

const client = new Client({
    prefix: async ({serverId}) => {
        return serverId ? await getServerPrefix(serverId) : "!";
    },
    //extensions: env.NODE_ENV === 'development' ? ['.ts'] : ['.js']
})
async function start() {
    await client.initCommands();

    try {
        await initI18n();
        logger.debug('i18n initialized');
    } catch (err) {
        logger.error({err}, 'Failed to initialize translations');
        process.exit(1);
    }

    try {
        await client.loginBot(env.STOAT_TOKEN);
        logger.debug('loginBot');
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
}

void start();