import { t } from 'elysia';

import { CommentDto } from './comment.dto';

export const CommentsDto = t.Array(CommentDto, {
  description: 'Array of comments',
  items: {
    description: 'A comment object',
  },
  title: 'Comments DTO',
});
