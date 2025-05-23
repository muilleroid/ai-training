import { Elysia } from 'elysia';

import { NotFoundError } from 'core/errors';

import { PostDomain } from '../domain';

import type { CreateParams, DeleteParams, FindParams, FindByIdParams, UpdateParams } from './post-service.types';

export const PostService = new Elysia({ name: 'post/service' })
  .use(PostDomain)
  .derive({ as: 'global' }, function derivePostService({ postDomain }) {
    const postService = {
      create: async ({ post }: CreateParams) => {
        const createdPost = await postDomain.create({ post });

        return createdPost!;
      },
      delete: async ({ postId }: DeleteParams) => {
        const exists = await postDomain.exists({ postId });

        if (!exists) {
          throw new NotFoundError('Post not found');
        }

        const deletedPost = await postDomain.delete({ postId });

        return deletedPost!;
      },
      find: ({ userId }: FindParams = {}) => {
        return postDomain.find({ userId });
      },
      findById: async ({ postId }: FindByIdParams) => {
        const exists = await postDomain.exists({ postId });

        if (!exists) {
          throw new NotFoundError('Post not found');
        }

        const foundPost = await postDomain.findById({ postId });

        return foundPost!;
      },
      update: async ({ post, postId }: UpdateParams) => {
        const exists = await postDomain.exists({ postId });

        if (!exists) {
          throw new NotFoundError('Post not found');
        }

        const updatedPost = await postDomain.update({
          post,
          postId,
        });

        return updatedPost!;
      },
    };

    return { postService };
  });
