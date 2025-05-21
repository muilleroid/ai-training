import { Elysia } from 'elysia';

import { postRepository } from '../infrastructure/repositories';

import type { CreateParams, DeleteParams, FindByIdParams, FindByUserIdParams, UpdateParams } from './post-domain.types';

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
        find: () => {
          return postRepository.find();
        },
        findById: ({ postId }: FindByIdParams) => {
          return postRepository.findById({ postId });
        },
        findByUserId: ({ userId }: FindByUserIdParams) => {
          return postRepository.findByUserId({ userId });
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
