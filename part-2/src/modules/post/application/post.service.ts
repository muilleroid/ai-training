import { Elysia } from 'elysia';

import { postDomain } from '../domain';

import type { CreateParams, DeleteParams, FindParams, FindByIdParams, UpdateParams } from './post-service.types';

export const postService = new Elysia({ name: 'post/service' })
  .use(postDomain)
  .resolve({ as: 'global' }, ({ postDomain }) => {
    return {
      postService: {
        create: ({ post }: CreateParams) => {
          return postDomain.create({ post });
        },
        delete: ({ postId }: DeleteParams) => {
          return postDomain.delete({ postId });
        },
        find: ({ userId }: FindParams = {}) => {
          return postDomain.find({ userId });
        },
        findById: ({ postId }: FindByIdParams) => {
          return postDomain.findById({ postId });
        },
        update: ({ post, postId }: UpdateParams) => {
          return postDomain.update({
            post,
            postId,
          });
        },
      },
    };
  });
