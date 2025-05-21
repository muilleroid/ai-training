import { t } from 'elysia';

export const postIdParams = t.Object(
  {
    postId: t.String({
      description: 'The unique identifier of the post',
      example: 'ck9x8v7b600001kp5hbd6g0q1',
    }),
  },
  {
    title: 'Post ID Parameters',
    description: 'Parameters for operations that require a post ID',
  },
);
