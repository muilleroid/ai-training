import { drizzle } from 'drizzle-orm/node-postgres';

export const connection = drizzle(process.env.DATABASE_URL!);
