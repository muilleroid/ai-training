import { createId } from '@paralleldrive/cuid2';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

import { companySchema } from './company.schema';

export const userSchema = pgTable('users', {
  companyId: varchar('company_id')
    .notNull()
    .references(() => companySchema.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  website: text('website').notNull(),
});

export type UserSchema = typeof userSchema.$inferSelect;
