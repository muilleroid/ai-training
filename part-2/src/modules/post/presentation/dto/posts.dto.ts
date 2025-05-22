import { t } from 'elysia';

import { PostDto } from './post.dto';

export const PostsDto = t.Array(PostDto, {
  description: 'Array of posts',
  items: {
    description: 'A post object',
  },
  title: 'Posts DTO',
});
