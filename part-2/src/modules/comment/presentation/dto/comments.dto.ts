import { t } from 'elysia';

import { commentDto } from './comment.dto';

export const commentsDto = t.Array(commentDto, {
  description: 'Array of comments',
  items: {
    description: 'A comment object',
  },
  title: 'Comments DTO',
});

export type CommentsDto = typeof commentsDto.static;
