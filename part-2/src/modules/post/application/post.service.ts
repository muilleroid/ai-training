import { Elysia } from 'elysia';

import { NotFoundError } from 'core/errors';

import { PostDomain } from '../domain';
import type { TPostDomain } from '../domain/types';

import type { TPostService } from './types';

type PostServiceFactoryParams = {
  postDomain: TPostDomain;
};

export const postServiceFactory = ({ postDomain }: PostServiceFactoryParams) => {
  const postService: TPostService = {
    create: async ({ post }) => {
      const createdPost = await postDomain.create({ post });

      return createdPost!;
    },
    delete: async ({ postId }) => {
      const exists = await postDomain.exists({ postId });

      if (!exists) {
        throw new NotFoundError('Post not found');
      }

      const deletedPost = await postDomain.delete({ postId });

      return deletedPost!;
    },
    find: ({ userId } = {}) => {
      return postDomain.find({ userId });
    },
    findById: async ({ postId }) => {
      const exists = await postDomain.exists({ postId });

      if (!exists) {
        throw new NotFoundError('Post not found');
      }

      const foundPost = await postDomain.findById({ postId });

      return foundPost!;
    },
    update: async ({ post, postId }) => {
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

  return postService;
};

export const PostService = new Elysia({ name: 'post/service' })
  .use(PostDomain)
  .derive({ as: 'global' }, function derivePostService({ postDomain }) {
    const postService = postServiceFactory({ postDomain });

    return { postService };
  });
