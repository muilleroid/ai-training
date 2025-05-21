import { t } from 'elysia';

export const commentDto = t.Object(
  {
    body: t.String(),
    id: t.String(),
    postId: t.String(),
    userId: t.String(),
  },
  {
    title: 'Comment DTO',
  },
);

export type CommentDto = typeof commentDto.static;
