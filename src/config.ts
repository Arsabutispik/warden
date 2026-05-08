import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
    STOAT_TOKEN: z.string(),
    DATABASE_URL: z.url(),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    LOG_LEVEL: z.enum([
        'fatal',
        'error',
        'warn',
        'info',
        'debug',
        'trace',
        'silent'
    ]).default('info'),
});

export const env = envSchema.parse(process.env);