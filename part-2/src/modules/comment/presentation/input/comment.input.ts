import { t } from 'elysia';

export const CommentInput = t.Object(
  {
    body: t.String({
      description: 'The content of the comment',
      example: 'This is a great post!',
      minLength: 1,
    }),
    postId: t.String({
      description: 'ID of the post this comment belongs to',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    }),
    userId: t.String({
      description: 'ID of the user who is creating the comment',
      example: 'ck9x8v7b600001kp5hbd6g0q3',
    }),
  },
  {
    description: 'Input data for creating a new comment',
    title: 'Comment Input',
  },
);
