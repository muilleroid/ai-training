import { createId } from '@paralleldrive/cuid2';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

import { addressSchema } from './address.schema';
import { companySchema } from './company.schema';

export const userSchema = pgTable('users', {
  id: varchar('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: text('phone').notNull(),
  website: text('website').notNull(),
  addressId: varchar('address_id')
    .notNull()
    .references(() => addressSchema.id, { onDelete: 'cascade' }),
  companyId: varchar('company_id')
    .notNull()
    .references(() => companySchema.id, { onDelete: 'cascade' }),
});

export type UserSchema = typeof userSchema.$inferSelect;
