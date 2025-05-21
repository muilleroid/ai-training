import { Elysia } from 'elysia';

import { commentRepository } from '../infrastructure/repositories';

import type { CreateParams, DeleteParams, FindByIdParams, FindParams, UpdateParams } from './comment-domain.types';

export const commentDomain = new Elysia({ name: 'comment/domain' })
  .use(commentRepository)
  .resolve({ as: 'global' }, ({ commentRepository }) => {
    return {
      commentDomain: {
        create: ({ comment }: CreateParams) => {
          return commentRepository.create({ comment });
        },
        delete: ({ commentId }: DeleteParams) => {
          return commentRepository.delete({ commentId });
        },
        find: ({ postId, userId }: FindParams = {}) => {
          return commentRepository.find({
            postId,
            userId,
          });
        },
        findById: ({ commentId }: FindByIdParams) => {
          return commentRepository.findById({ commentId });
        },
        update: ({ comment, commentId }: UpdateParams) => {
          return commentRepository.update({
            comment,
            commentId,
          });
        },
      },
    };
  });
