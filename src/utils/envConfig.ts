import { Configuration } from "@/schemas/ConfigSchema.js";

/**
 * Loads configuration from environment variables
 * This is useful for deployment on platforms like Render, Heroku, etc.
 */
export function loadConfigFromEnv(): Partial<Configuration> {
    const config: Partial<Configuration> = {
        token: process.env.DISCORD_TOKEN,
        guildID: process.env.GUILD_ID,
        channelID: process.env.CHANNEL_IDS?.split(",").map(id => id.trim()).filter(Boolean),
    };

    // Optional: Username (for display purposes)
    if (process.env.USERNAME) {
        config.username = process.env.USERNAME;
    }

    // Notification settings
    if (process.env.WAY_NOTIFY) {
        config.wayNotify = process.env.WAY_NOTIFY.split(",").map(way => way.trim()) as Configuration["wayNotify"];
    }

    if (process.env.WEBHOOK_URL) {
        config.webhookURL = process.env.WEBHOOK_URL;
    }

    if (process.env.ADMIN_ID) {
        config.adminID = process.env.ADMIN_ID;
    }

    if (process.env.MUSIC_PATH) {
        config.musicPath = process.env.MUSIC_PATH;
    }

    // Command prefix
    if (process.env.PREFIX) {
        config.prefix = process.env.PREFIX;
    }

    // Captcha settings
    if (process.env.CAPTCHA_API) {
        config.captchaAPI = process.env.CAPTCHA_API as Configuration["captchaAPI"];
    }

    if (process.env.CAPTCHA_API_KEY) {
        config.apiKey = process.env.CAPTCHA_API_KEY;
    }

    // Huntbot settings
    if (process.env.AUTO_HUNTBOT !== undefined) {
        config.autoHuntbot = process.env.AUTO_HUNTBOT === "true";
    }

    if (process.env.AUTO_TRAIT) {
        config.autoTrait = process.env.AUTO_TRAIT as Configuration["autoTrait"];
    }

    if (process.env.USE_ADOTF_API !== undefined) {
        config.useAdotfAPI = process.env.USE_ADOTF_API === "true";
    }

    // Auto pray settings
    if (process.env.AUTO_PRAY) {
        config.autoPray = process.env.AUTO_PRAY.split(",").map(p => p.trim()).filter(Boolean);
    }

    // Gem settings
    if (process.env.AUTO_GEM) {
        const autoGem = parseInt(process.env.AUTO_GEM);
        if ([0, -1, 1].includes(autoGem)) {
            config.autoGem = autoGem as Configuration["autoGem"];
        }
    }

    if (process.env.GEM_TIER) {
        config.gemTier = process.env.GEM_TIER.split(",").map(tier => tier.trim()) as Configuration["gemTier"];
    }

    if (process.env.USE_SPECIAL_GEM !== undefined) {
        config.useSpecialGem = process.env.USE_SPECIAL_GEM === "true";
    }

    // Lootbox settings
    if (process.env.AUTO_LOOTBOX !== undefined) {
        config.autoLootbox = process.env.AUTO_LOOTBOX === "true";
    }

    if (process.env.AUTO_FABLED_LOOTBOX !== undefined) {
        config.autoFabledLootbox = process.env.AUTO_FABLED_LOOTBOX === "true";
    }

    // Auto quote settings
    if (process.env.AUTO_QUOTE) {
        config.autoQuote = process.env.AUTO_QUOTE.split(",").map(q => q.trim()) as Configuration["autoQuote"];
    }

    // Auto RPP settings
    if (process.env.AUTO_RPP) {
        config.autoRPP = process.env.AUTO_RPP.split(",").map(r => r.trim()) as Configuration["autoRPP"];
    }

    // Boolean toggles
    if (process.env.AUTO_DAILY !== undefined) {
        config.autoDaily = process.env.AUTO_DAILY === "true";
    }

    if (process.env.AUTO_COOKIE !== undefined) {
        config.autoCookie = process.env.AUTO_COOKIE === "true";
    }

    if (process.env.AUTO_CLOVER !== undefined) {
        config.autoClover = process.env.AUTO_CLOVER === "true";
    }

    if (process.env.USE_CUSTOM_PREFIX !== undefined) {
        config.useCustomPrefix = process.env.USE_CUSTOM_PREFIX === "true";
    }

    if (process.env.AUTO_SLEEP !== undefined) {
        config.autoSleep = process.env.AUTO_SLEEP === "true";
    }

    if (process.env.AUTO_SELL !== undefined) {
        config.autoSell = process.env.AUTO_SELL === "true";
    }

    if (process.env.AUTO_RELOAD !== undefined) {
        config.autoReload = process.env.AUTO_RELOAD === "true";
    }

    if (process.env.AUTO_RESUME !== undefined) {
        config.autoResume = process.env.AUTO_RESUME === "true";
    }

    if (process.env.SHOW_RPC !== undefined) {
        config.showRPC = process.env.SHOW_RPC === "true";
    }

    return config;
}
