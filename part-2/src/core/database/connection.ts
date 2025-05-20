import { drizzle } from 'drizzle-orm/node-postgres';

export const connection = drizzle(Bun.env.DATABASE_URL!);
