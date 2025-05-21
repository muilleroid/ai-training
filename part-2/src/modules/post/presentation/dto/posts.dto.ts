import { t } from 'elysia';

import { postDto } from './post.dto';

export const postsDto = t.Array(postDto, {
  description: 'Array of posts',
  items: {
    description: 'A post object',
  },
  title: 'Posts DTO',
});

export type PostsDto = typeof postsDto.static;
