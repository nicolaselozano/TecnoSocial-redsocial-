import { config } from 'dotenv';
import { z } from 'zod';
config({ path: process.env.NODE_ENV === 'test' ? './.env.test' : './.env' });

console.log();

const envsSchema = z.object({
  MODE: z.enum(['dev', 'prod']).default('dev'),
  PORT: z.coerce.number(),
  URL: z.string(),
  SEED: z.coerce.boolean(),
  UPLOAD_DIR: z.string(),
  DB: z.object({
    PORT: z.coerce.number(),
    HOST: z.string(),
    USER: z.string(),
    PASS: z.string(),
    NAME: z.string(),
  }),
  AUTH0: z.object({
    DOMAIN: z.string(),
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    CLIENT_HOST: z.string().url(),
  }),
});

export default envsSchema.parse({
  MODE: process.env.MODE,
  PORT: process.env.SERVER_PORT || 3000,
  URL: process.env.SERVER_URL || 'http://localhost',
  UPLOAD_DIR: process.env.UPLOAD_DIR,
  SEED: process.env.SEED || false,
  DB: {
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    NAME: process.env.DB_NAME,
    PASS: process.env.DB_PASS,
  },
  AUTH0: {
    DOMAIN: process.env.DOMAIN || '',
    CLIENT_ID: process.env.CLIENT_ID || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '',
    CLIENT_HOST: process.env.CLIENT_HOST || '',
  },
});
