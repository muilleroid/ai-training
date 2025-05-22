import { t } from 'elysia';

export const UserIdUrlParams = t.Object(
  {
    userId: t.String({
      description: 'The unique identifier of the user',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    }),
  },
  {
    description: 'Parameters for identifying a specific user',
    title: 'User ID URL Parameters',
  },
);
