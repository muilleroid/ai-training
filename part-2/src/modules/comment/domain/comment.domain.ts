import { Elysia } from 'elysia';

import { commentRepository } from '../infrastructure/repositories';

import type {
  CreateParams,
  DeleteParams,
  FindByIdParams,
  FindByPostIdParams,
  FindByUserIdParams,
  UpdateParams,
} from './comment-domain.types';

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
        find: () => {
          return commentRepository.find();
        },
        findById: ({ commentId }: FindByIdParams) => {
          return commentRepository.findById({ commentId });
        },
        findByPostId: ({ postId }: FindByPostIdParams) => {
          return commentRepository.findByPostId({ postId });
        },
        findByUserId: ({ userId }: FindByUserIdParams) => {
          return commentRepository.findByUserId({ userId });
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
