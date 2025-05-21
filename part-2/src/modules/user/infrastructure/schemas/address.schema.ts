import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const addressSchema = pgTable('addresses', {
  city: text('city').notNull(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  lat: text('lat').notNull(),
  lng: text('lng').notNull(),
  street: text('street').notNull(),
  suite: text('suite').notNull(),
  zipcode: text('zipcode').notNull(),
});

export type AddressSchema = typeof addressSchema.$inferSelect;
