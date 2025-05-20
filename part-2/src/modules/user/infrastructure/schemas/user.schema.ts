import { createId } from '@paralleldrive/cuid2';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('users', {
  id: varchar('id').$defaultFn(createId).primaryKey(),
});

export type UserSchema = typeof userSchema.$inferSelect;
