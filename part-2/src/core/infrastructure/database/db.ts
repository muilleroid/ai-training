import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { config } from 'config';

const pool = new Pool({
  connectionString: config.database.url,
  connectionTimeoutMillis: 5 * 1000,
  idleTimeoutMillis: 30 * 1000,
  max: 10,
  min: 1,
});

export const db = drizzle(pool);
