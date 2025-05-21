import { Elysia } from 'elysia';

import { postRepository } from '../infrastructure/repositories';

import type { CreateParams, DeleteParams, FindByIdParams, FindParams, UpdateParams } from './post-domain.types';

export const postDomain = new Elysia({ name: 'post/domain' })
  .use(postRepository)
  .resolve({ as: 'global' }, ({ postRepository }) => {
    return {
      postDomain: {
        create: ({ post }: CreateParams) => {
          return postRepository.create({ post });
        },
        delete: ({ postId }: DeleteParams) => {
          return postRepository.delete({ postId });
        },
        find: ({ userId }: FindParams = {}) => {
          return postRepository.find({ userId });
        },
        findById: ({ postId }: FindByIdParams) => {
          return postRepository.findById({ postId });
        },
        update: ({ post, postId }: UpdateParams) => {
          return postRepository.update({
            post,
            postId,
          });
        },
      },
    };
  });
