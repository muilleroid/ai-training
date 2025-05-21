import { t } from 'elysia';

export const commentInput = t.Object({
  body: t.String(),
  postId: t.String(),
  userId: t.String(),
});

export type CommentInput = typeof commentInput.static;
