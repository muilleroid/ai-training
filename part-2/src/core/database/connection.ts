import { drizzle } from 'drizzle-orm/node-postgres';

import { config } from 'config';

export const connection = drizzle(config.database.url);
