import { t } from 'elysia';

export const postInput = t.Object(
  {
    body: t.String({
      description: 'The content of the post',
      example: 'This is a detailed post content explaining something interesting.',
      minLength: 1,
    }),
    title: t.String({
      description: 'The title of the post',
      example: 'An Interesting Post Title',
      minLength: 1,
    }),
    userId: t.String({
      description: 'ID of the user who is creating the post',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    }),
  },
  {
    title: 'Post Input',
    description: 'Input data for creating a new post',
  },
);

export type PostInput = typeof postInput.static;
