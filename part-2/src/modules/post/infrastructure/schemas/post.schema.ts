import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { userSchema } from 'modules/user/infrastructure/schemas';

export const postSchema = pgTable('posts', {
  body: text('body').notNull(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  title: varchar('title').notNull(),
  userId: varchar('user_id')
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
});

export type PostSchema = typeof postSchema.$inferSelect;
