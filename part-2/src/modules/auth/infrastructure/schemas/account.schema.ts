import { createId } from '@paralleldrive/cuid2';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const accountSchema = pgTable('accounts', {
  email: varchar('email', { length: 255 }).notNull().unique(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
});

export type AccountSchema = typeof accountSchema.$inferSelect;
