import { createId } from '@paralleldrive/cuid2';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const authSchema = pgTable('auth', {
  email: varchar('email', { length: 255 }).notNull().unique(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
});

export type AuthSchema = typeof authSchema.$inferSelect;
