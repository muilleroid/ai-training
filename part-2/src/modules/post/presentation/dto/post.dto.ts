import { t } from 'elysia';

export const postDto = t.Object(
  {
    body: t.String({
      description: 'The content of the post',
      example: 'This is a detailed post content explaining something interesting.',
    }),
    id: t.String({
      description: 'Unique identifier for the post',
      example: 'ck9x8v7b600001kp5hbd6g0q1',
    }),
    title: t.String({
      description: 'The title of the post',
      example: 'An Interesting Post Title',
    }),
    userId: t.String({
      description: 'ID of the user who created the post',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    }),
  },
  {
    title: 'Post DTO',
    description: 'Data transfer object for a post',
  },
);

export type PostDto = typeof postDto.static;
