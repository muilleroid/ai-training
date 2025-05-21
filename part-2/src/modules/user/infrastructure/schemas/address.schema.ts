import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { userSchema } from './user.schema';

export const addressSchema = pgTable('addresses', {
  city: text('city').notNull(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  lat: text('lat').notNull(),
  lng: text('lng').notNull(),
  street: text('street').notNull(),
  suite: text('suite').notNull(),
  userId: varchar('user_id')
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
  zipcode: text('zipcode').notNull(),
});

export type AddressSchema = typeof addressSchema.$inferSelect;
