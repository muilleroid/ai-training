import { Elysia } from 'elysia';

import { PostRepository } from '../infrastructure/repositories';

import type { TPostDomain, TPostRepository } from './types';

type PostDomainFactoryParams = {
  postRepository: TPostRepository;
};

export const postDomainFactory = ({ postRepository }: PostDomainFactoryParams) => {
  const postDomain: TPostDomain = {
    create: ({ post }) => {
      return postRepository.create({ post });
    },
    delete: ({ postId }) => {
      return postRepository.delete({ postId });
    },
    exists: ({ postId }) => {
      return postRepository.exists({ postId });
    },
    find: (params = {}) => {
      return postRepository.find(params);
    },
    findById: ({ postId }) => {
      return postRepository.findById({ postId });
    },
    update: ({ post, postId }) => {
      return postRepository.update({
        post,
        postId,
      });
    },
  };

  return postDomain;
};

export const PostDomain = new Elysia({ name: 'post/domain' })
  .use(PostRepository)
  .derive({ as: 'global' }, function derivePostDomain({ postRepository }) {
    const postDomain = postDomainFactory({ postRepository });

    return { postDomain };
  });
