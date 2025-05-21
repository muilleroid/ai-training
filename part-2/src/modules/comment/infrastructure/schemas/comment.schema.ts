import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { postSchema } from 'modules/post/infrastructure/schemas';
import { userSchema } from 'modules/user/infrastructure/schemas';

export const commentSchema = pgTable('comments', {
  body: text('body').notNull(),
  id: varchar('id').$defaultFn(createId).primaryKey(),
  postId: varchar('post_id')
    .notNull()
    .references(() => postSchema.id, { onDelete: 'cascade' }),
  userId: varchar('user_id')
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
});

export type CommentSchema = typeof commentSchema.$inferSelect;
