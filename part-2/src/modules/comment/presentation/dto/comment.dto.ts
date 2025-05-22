import { t } from 'elysia';

export const CommentDto = t.Object(
  {
    body: t.String({
      description: 'The content of the comment',
      example: 'This is a great post!',
    }),
    id: t.String({
      description: 'Unique identifier for the comment',
      example: 'ck9x8v7b600001kp5hbd6g0q1',
    }),
    postId: t.String({
      description: 'ID of the post this comment belongs to',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    }),
    userId: t.String({
      description: 'ID of the user who created the comment',
      example: 'ck9x8v7b600001kp5hbd6g0q3',
    }),
  },
  {
    description: 'Data transfer object for a comment',
    title: 'Comment DTO',
  },
);
