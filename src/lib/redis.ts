import { createClient } from "redis";
import { env } from "./config.js";
import { logger } from "./logger.js";

export const redis = createClient({
    url: env.REDIS_URL || "redis://localhost:6379",
});

redis.on("error", (err) => logger.error({ err }, "Redis Client Error"));
redis.on("ready", () => logger.info("📦 Connected to Redis"));

// We export this to call it during boot
export const initRedis = async () => {
    await redis.connect();
};
