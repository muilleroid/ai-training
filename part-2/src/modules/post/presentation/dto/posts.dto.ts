import { t } from 'elysia';

import { postDto } from './post.dto';

export const postsDto = t.Array(postDto, {
  title: 'Posts DTO',
});

export type PostsDto = typeof postsDto.static;
