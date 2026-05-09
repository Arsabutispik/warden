import { Stoat, SimpleCommand, CommandContext } from "stoatx";
import { t } from "../i18n.js";
import { logger } from "#lib";
import { getServerLanguage } from "#database";

@Stoat()
export class Ping {
    @SimpleCommand({
        name: "ping",
        description: "Ping the bot to check if it's responsive.",
    })
    async ping(ctx: CommandContext) {
        logger.debug({ user: ctx.message.author?.username }, "Ping command executed");
        const lng = await getServerLanguage(ctx.serverId || "");
        const start = Date.now();
        const msg = await ctx.reply(t("Pong! The bot is working", { lng }));
        const end = Date.now();
        const latency = end - start;
        await msg.edit(t("Pong! The bot is working. Latency: {{latency}}ms", { latency, lng }));
    }
}
