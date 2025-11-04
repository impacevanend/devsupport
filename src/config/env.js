// src/config/env.js
import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL es requerida'),
  LOG_LEVEL: z.string().optional().default('info'),
  CORS_ORIGIN: z.string().optional().default('*'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('Variables de entorno inválidas:\n', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  logLevel: env.LOG_LEVEL,
  corsOrigin: env.CORS_ORIGIN,
};
