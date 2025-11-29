import { ConfigSchema } from "@/schemas/ConfigSchema.js";
import { BaseAgent } from "@/structure/BaseAgent.js";
import { ExtendedClient } from "@/structure/core/ExtendedClient.js";
import { logger } from "@/utils/logger.js";
import { loadConfigFromEnv } from "@/utils/envConfig.js";

export const command = "start-env";
export const desc = "Start bot using environment variables (for Render/Docker/Cloud deployment)";

export const handler = async () => {
    try {
        logger.info("Loading configuration from environment variables...");
        
        const config = loadConfigFromEnv();
        
        // Validate the configuration using Zod schema
        const validationResult = ConfigSchema.safeParse(config);
        
        if (!validationResult.success) {
            logger.error("Configuration validation failed:");
            logger.error(JSON.stringify(validationResult.error.format(), null, 2));
            logger.error("\nPlease check your environment variables and try again.");
            logger.error("Refer to .env.example for the correct format.");
            process.exit(1);
        }
        
        const validatedConfig = validationResult.data;
        logger.info("Configuration validated successfully");
        
        // Initialize client
        const client = new ExtendedClient();
        
        logger.info("Logging in to Discord...");
        await client.checkAccount(validatedConfig.token);
        
        // Initialize and start the bot
        logger.info("Initializing bot agent...");
        await BaseAgent.initialize(client, validatedConfig);
        
        logger.info("Bot started successfully!");
        
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to start bot: ${error.message}`);
            logger.error(error.stack || "");
        } else {
            logger.error(`Failed to start bot: ${error}`);
        }
        process.exit(1);
    }
};
