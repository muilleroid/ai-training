import { t } from 'elysia';

export const commentIdParams = t.Object({
  commentId: t.String(),
});

export type CommentIdParams = typeof commentIdParams.static;
