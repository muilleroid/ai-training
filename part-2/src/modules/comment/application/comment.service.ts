import { Elysia } from 'elysia';

import { commentDomain } from '../domain';

import type { CreateParams, DeleteParams, FindByIdParams, FindParams, UpdateParams } from './comment-service.types';

export const commentService = new Elysia({ name: 'comment/service' })
  .use(commentDomain)
  .resolve({ as: 'global' }, ({ commentDomain }) => {
    const service = {
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

    return { commentService: service };
  });
