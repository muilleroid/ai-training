import { and, eq, sql } from 'drizzle-orm';
import { Elysia } from 'elysia';
import omitEmpty from 'omit-empty-es';

import { setup } from 'core/setup';

import type { TCommentRepository } from 'modules/comment/domain/types';

import { commentSchema } from '../schemas';

import { toComment, toCommentList } from './comment-repository.mapper';

export const CommentRepository = new Elysia({ name: 'comment/repository' })
  .use(setup)
  .derive({ as: 'global' }, function deriveCommentRepository({ db }) {
    const commentRepository: TCommentRepository = {
      create: async ({ comment }) => {
        const [createdComment] = await db
          .insert(commentSchema)
          .values({
            body: comment.body,
            postId: comment.postId,
            userId: comment.userId,
          })
          .returning();

        return toComment(createdComment);
      },
      delete: async ({ commentId }) => {
        const comment = await commentRepository.findById({ commentId });

        await db.delete(commentSchema).where(eq(commentSchema.id, commentId));

        return comment;
      },
      exists: async ({ commentId }) => {
        const { rows } = await db.execute<{ exists: boolean }>(sql`
          SELECT EXISTS (
            SELECT
              1
            FROM
              ${commentSchema}
            WHERE
              ${commentSchema.id} = ${commentId}
          ) as exists;`);

        const [{ exists }] = rows;

        return exists;
      },
      find: async ({ postId, userId } = {}) => {
        const filters = [
          ...(postId ? [eq(commentSchema.postId, postId)] : []),
          ...(userId ? [eq(commentSchema.userId, userId)] : []),
        ];

        const comments = await db
          .select()
          .from(commentSchema)
          .where(filters.length > 0 ? and(...filters) : undefined);

        return toCommentList(comments);
      },
      findById: async ({ commentId }) => {
        const [comment] = await db.select().from(commentSchema).where(eq(commentSchema.id, commentId)).limit(1);

        return toComment(comment);
      },
      update: async ({ comment, commentId }) => {
        const commentUpdates = omitEmpty<object>({ body: comment.body });

        if (Object.keys(commentUpdates).length > 0) {
          await db.update(commentSchema).set(commentUpdates).where(eq(commentSchema.id, commentId));
        }

        return commentRepository.findById({ commentId });
      },
    };

    return { commentRepository };
  });
