import { Elysia } from 'elysia';

import { NotFoundError } from 'core/errors';

import { CommentDomain } from '../domain';

import type { CreateParams, DeleteParams, FindByIdParams, FindParams, UpdateParams } from './comment-service.types';

export const CommentService = new Elysia({ name: 'comment/service' })
  .use(CommentDomain)
  .derive({ as: 'global' }, function deriveCommentService({ commentDomain }) {
    const commentService = {
      create: async ({ comment }: CreateParams) => {
        const createdComment = await commentDomain.create({ comment });

        return createdComment!;
      },
      delete: async ({ commentId }: DeleteParams) => {
        const exists = await commentDomain.exists({ commentId });

        if (!exists) {
          throw new NotFoundError('Comment not found');
        }

        const deletedComment = await commentDomain.delete({ commentId });

        return deletedComment!;
      },
      find: ({ postId, userId }: FindParams = {}) => {
        return commentDomain.find({
          postId,
          userId,
        });
      },
      findById: async ({ commentId }: FindByIdParams) => {
        const exists = await commentDomain.exists({ commentId });

        if (!exists) {
          throw new NotFoundError('Comment not found');
        }

        const foundComment = await commentDomain.findById({ commentId });

        return foundComment!;
      },
      update: async ({ comment, commentId }: UpdateParams) => {
        const exists = await commentDomain.exists({ commentId });

        if (!exists) {
          throw new NotFoundError('Comment not found');
        }

        const updatedComment = await commentDomain.update({
          comment,
          commentId,
        });

        return updatedComment!;
      },
    };

    return { commentService };
  });
