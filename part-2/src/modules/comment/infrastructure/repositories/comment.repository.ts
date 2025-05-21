import { and, eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import omitEmpty from 'omit-empty-es';

import { setup } from 'core/setup';

import type { TCommentRepository } from 'modules/comment/domain/types';

import { commentSchema } from '../schemas';

import { toComment, toCommentList } from './comment-repository.mapper';

export const CommentRepository = new Elysia({ name: 'comment/repository' })
  .use(setup)
  .derive({ as: 'global' }, function deriveCommentRepository({ connection }) {
    const commentRepository: TCommentRepository = {
      create: async ({ comment }) => {
        const [createdComment] = await connection.insert(commentSchema).values(comment).returning();

        return toComment(createdComment);
      },
      delete: async ({ commentId }) => {
        const comment = await commentRepository.findById({ commentId });

        await connection.delete(commentSchema).where(eq(commentSchema.id, commentId));

        return comment;
      },
      find: async ({ postId, userId } = {}) => {
        const filters = [
          ...(postId ? [eq(commentSchema.postId, postId)] : []),
          ...(userId ? [eq(commentSchema.userId, userId)] : []),
        ];

        const comments = await connection
          .select()
          .from(commentSchema)
          .where(filters.length > 0 ? and(...filters) : undefined);

        return toCommentList(comments);
      },
      findById: async ({ commentId }) => {
        const [comment] = await connection.select().from(commentSchema).where(eq(commentSchema.id, commentId)).limit(1);

        return toComment(comment);
      },
      update: async ({ comment, commentId }) => {
        const commentUpdates = omitEmpty<object>(comment);

        if (Object.keys(commentUpdates).length > 0) {
          await connection.update(commentSchema).set(commentUpdates).where(eq(commentSchema.id, commentId));
        }

        return commentRepository.findById({ commentId });
      },
    };

    return { commentRepository };
  });
