import { t } from 'elysia';

export const userIdParams = t.Object(
  {
    userId: t.String({
      description: 'The unique identifier of the user',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    }),
  },
  {
    title: 'User ID Parameters',
    description: 'Parameters for identifying a specific user',
  },
);

export type UserIdParams = typeof userIdParams.static;
