import { t } from 'elysia';

import { commentDto } from './comment.dto';

export const commentsDto = t.Array(commentDto, {
  title: 'Comments DTO',
  description: 'Array of comments',
  items: {
    description: 'A comment object',
  },
});

export type CommentsDto = typeof commentsDto.static;
