import { Elysia } from 'elysia';

import { PostDomain } from '../domain';

import type { CreateParams, DeleteParams, FindParams, FindByIdParams, UpdateParams } from './post-service.types';

export const PostService = new Elysia({ name: 'post/service' })
  .use(PostDomain)
  .derive({ as: 'global' }, function derivePostService({ postDomain }) {
    const postService = {
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
    };

    return { postService };
  });
