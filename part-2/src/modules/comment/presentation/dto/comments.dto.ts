import { t } from 'elysia';

import { commentDto } from './comment.dto';

export const commentsDto = t.Array(commentDto, {
  title: 'Comments DTO',
});

export type CommentsDto = typeof commentsDto.static;
