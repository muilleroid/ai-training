import { Elysia } from 'elysia';

import { PostRepository } from '../infrastructure/repositories';

import type {
  CreateParams,
  DeleteParams,
  ExistsParams,
  FindByIdParams,
  FindParams,
  UpdateParams,
} from './post-domain.types';

export const PostDomain = new Elysia({ name: 'post/domain' })
  .use(PostRepository)
  .derive({ as: 'global' }, function derivePostDomain({ postRepository }) {
    const postDomain = {
      create: ({ post }: CreateParams) => {
        return postRepository.create({ post });
      },
      delete: ({ postId }: DeleteParams) => {
        return postRepository.delete({ postId });
      },
      exists: ({ postId }: ExistsParams) => {
        return postRepository.exists({ postId });
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
    };

    return { postDomain };
  });
