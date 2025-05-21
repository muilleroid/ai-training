import { Elysia } from 'elysia';

import { commentDomain } from '../domain';

import type {
  CreateParams,
  DeleteParams,
  FindByIdParams,
  FindByPostIdParams,
  FindByUserIdParams,
  UpdateParams,
} from './comment-service.types';

export const commentService = new Elysia({ name: 'comment/service' })
  .use(commentDomain)
  .resolve({ as: 'global' }, ({ commentDomain }) => {
    return {
      commentService: {
        create: ({ comment }: CreateParams) => {
          return commentDomain.create({ comment });
        },
        delete: ({ commentId }: DeleteParams) => {
          return commentDomain.delete({ commentId });
        },
        find: () => {
          return commentDomain.find();
        },
        findById: ({ commentId }: FindByIdParams) => {
          return commentDomain.findById({ commentId });
        },
        findByPostId: ({ postId }: FindByPostIdParams) => {
          return commentDomain.findByPostId({ postId });
        },
        findByUserId: ({ userId }: FindByUserIdParams) => {
          return commentDomain.findByUserId({ userId });
        },
        update: ({ comment, commentId }: UpdateParams) => {
          return commentDomain.update({
            comment,
            commentId,
          });
        },
      },
    };
  });
