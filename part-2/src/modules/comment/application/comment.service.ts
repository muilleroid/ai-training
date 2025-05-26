import { Elysia } from 'elysia';

import { NotFoundError } from 'core/errors';

import { CommentDomain } from '../domain';
import type { TCommentDomain } from '../domain/types';

import type { TCommentService } from './types';

type CommentServiceFactoryParams = {
  commentDomain: TCommentDomain;
};

export const commentServiceFactory = ({ commentDomain }: CommentServiceFactoryParams) => {
  const commentService: TCommentService = {
    create: async ({ comment }) => {
      const createdComment = await commentDomain.create({ comment });

      return createdComment!;
    },
    delete: async ({ commentId }) => {
      const exists = await commentDomain.exists({ commentId });

      if (!exists) {
        throw new NotFoundError('Comment not found');
      }

      const deletedComment = await commentDomain.delete({ commentId });

      return deletedComment!;
    },
    find: ({ postId, userId } = {}) => {
      return commentDomain.find({
        postId,
        userId,
      });
    },
    findById: async ({ commentId }) => {
      const exists = await commentDomain.exists({ commentId });

      if (!exists) {
        throw new NotFoundError('Comment not found');
      }

      const foundComment = await commentDomain.findById({ commentId });

      return foundComment!;
    },
    update: async ({ comment, commentId }) => {
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

  return commentService;
};

export const CommentService = new Elysia({ name: 'comment/service' })
  .use(CommentDomain)
  .derive({ as: 'global' }, function deriveCommentService({ commentDomain }) {
    const commentService = commentServiceFactory({ commentDomain });

    return { commentService };
  });
