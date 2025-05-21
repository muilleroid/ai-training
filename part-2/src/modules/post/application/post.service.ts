import { Elysia } from 'elysia';

import { postDomain } from '../domain';

import type {
  CreateParams,
  DeleteParams,
  FindByIdParams,
  FindByUserIdParams,
  UpdateParams,
} from './post-service.types';

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
        find: () => {
          return postDomain.find();
        },
        findById: ({ postId }: FindByIdParams) => {
          return postDomain.findById({ postId });
        },
        findByUserId: ({ userId }: FindByUserIdParams) => {
          return postDomain.findByUserId({ userId });
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
