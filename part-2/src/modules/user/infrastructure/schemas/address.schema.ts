import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { geoSchema } from './geo.schema';

export const addressSchema = pgTable('addresses', {
  id: varchar('id').$defaultFn(createId).primaryKey(),
  city: text('city').notNull(),
  street: text('street').notNull(),
  suite: text('suite').notNull(),
  zipcode: text('zipcode').notNull(),
  geoId: varchar('geo_id')
    .notNull()
    .references(() => geoSchema.id),
});

export type AddressSchema = typeof addressSchema.$inferSelect;
