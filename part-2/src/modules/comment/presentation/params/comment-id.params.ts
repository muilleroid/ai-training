import { t } from 'elysia';

export const commentIdParams = t.Object(
  {
    commentId: t.String({
      description: 'The unique identifier of the comment',
      example: 'ck9x8v7b600001kp5hbd6g0q1',
    }),
  },
  {
    description: 'Parameters for operations that require a comment ID',
    title: 'Comment ID Parameters',
  },
);

export type CommentIdParams = typeof commentIdParams.static;
