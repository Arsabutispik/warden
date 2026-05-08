import {CommandContext, SimpleCommand, Stoat} from "stoatx";
import {setServerLanguage} from "../database/queries.js";
import {t} from "../i18n.js";
import i18next from "i18next";

@Stoat()
export class SetLanguage {
    @SimpleCommand({
        name: "setLanguage",
        description: "Set the language",
    })
    async setLanguage(ctx: CommandContext) {
        if(!ctx.serverId) {
            await ctx.reply(t("This command can only be used in a server"));
            return;
        }
        const language = ctx.args[0];
        if (!language) {
            await ctx.reply(t("Please specify a language"));
            return;
        }
        if (!i18next.hasResourceBundle(language, 'translation')) {
            await ctx.reply(t("Unsupported language: {{language}}", {language}));
            return;
        }
        await setServerLanguage(ctx.serverId, language);
        await ctx.reply(t("Language has been set to {{language}}", { language }));
    }
}