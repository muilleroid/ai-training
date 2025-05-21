import { t } from 'elysia';

export const findQueryParams = t.Object(
  {
    userId: t.Optional(t.String({
      description: 'Filter posts by user ID',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    })),
  },
  {
    title: 'Find Query Parameters',
    description: 'Query parameters for filtering posts',
  },
);
