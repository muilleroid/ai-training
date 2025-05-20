import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const geoSchema = pgTable('geos', {
  id: varchar('id').$defaultFn(createId).primaryKey(),
  lat: text('lat').notNull(),
  lng: text('lng').notNull(),
});

export type GeoSchema = typeof geoSchema.$inferSelect;
