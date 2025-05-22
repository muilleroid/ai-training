import { t } from 'elysia';

export const PostIdUrlParams = t.Object(
  {
    postId: t.String({
      description: 'The unique identifier of the post',
      example: 'ck9x8v7b600001kp5hbd6g0q1',
    }),
  },
  {
    description: 'Parameters for operations that require a post ID',
    title: 'Post ID URL Parameters',
  },
);
