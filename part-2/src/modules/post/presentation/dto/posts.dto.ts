import { t } from 'elysia';

import { postDto } from './post.dto';

export const postsDto = t.Array(postDto, {
  title: 'Posts DTO',
  description: 'Array of posts',
  items: {
    description: 'A post object',
  },
});

export type PostsDto = typeof postsDto.static;
