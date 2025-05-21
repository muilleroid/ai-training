import type { Post } from 'modules/post/domain/types';

import type { PostSchema } from '../schemas';

export const toPost = (post?: PostSchema | null): Post | null => {
  if (!post) {
    return null;
  }

  return {
    body: post.body,
    id: post.id,
    title: post.title,
    userId: post.userId,
  };
};

export const toPostList = (posts: PostSchema[]): Post[] => {
  return posts.map(toPost).filter(Boolean);
};
