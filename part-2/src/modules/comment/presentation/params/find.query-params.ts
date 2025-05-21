import { t } from 'elysia';

export const findQueryParams = t.Object(
  {
    postId: t.Optional(t.String({
      description: 'Filter comments by post ID',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    })),
    userId: t.Optional(t.String({
      description: 'Filter comments by user ID',
      example: 'ck9x8v7b600001kp5hbd6g0q3',
    })),
  },
  {
    title: 'Find Query Parameters',
    description: 'Query parameters for filtering comments',
  },
);
