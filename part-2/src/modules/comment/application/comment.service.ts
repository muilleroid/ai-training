import { Elysia } from 'elysia';

import { CommentDomain } from '../domain';

import type { CreateParams, DeleteParams, FindByIdParams, FindParams, UpdateParams } from './comment-service.types';

export const CommentService = new Elysia({ name: 'comment/service' })
  .use(CommentDomain)
  .resolve({ as: 'global' }, ({ commentDomain }) => {
    const commentService = {
      create: ({ comment }: CreateParams) => {
        return commentDomain.create({ comment });
      },
      delete: ({ commentId }: DeleteParams) => {
        return commentDomain.delete({ commentId });
      },
      find: ({ postId, userId }: FindParams = {}) => {
        return commentDomain.find({
          postId,
          userId,
        });
      },
      findById: ({ commentId }: FindByIdParams) => {
        return commentDomain.findById({ commentId });
      },
      update: ({ comment, commentId }: UpdateParams) => {
        return commentDomain.update({
          comment,
          commentId,
        });
      },
    };

    return { commentService };
  });
